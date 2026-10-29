"use client";

import { useCallback, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Items overlap their neighbours by this much (px) so the side items stack up like Cover Flow
const OVERLAP = 70;
// How many items stay visible on each side of the centre
const VISIBLE_EACH_SIDE = 2;
// Distance (px) from the centre to the first side item, and between further side items
const FIRST_SIDE_GAP = 100;
const STACK_GAP = 36;
// Tilt (degrees) of the nearest side items and of the items further out
const NEAR_TILT = 40;
const FAR_TILT = 70;

// iPod-style "Cover Flow" picker: a horizontal strip that snaps an item to the centre, where it
// faces the viewer; items to the sides tilt away. Swipe on phones; arrows, clicks on side items
// and the keyboard work everywhere (a mouse can't swipe a strip).
export default function CoverFlow({ items, selectedIndex, onSelect, renderItem, getLabel, label }) {
  const stripRef = useRef(null);
  const itemRefs = useRef([]);
  const frame = useRef(0);
  const settleTimer = useRef(0);
  // Item an arrow/tap/key asked for while the strip is still gliding to it; null after a swipe
  const pendingTarget = useRef(null);
  // Latest selection and callback, for timers that fire after a later render
  const latest = useRef({ selectedIndex, onSelect });
  useEffect(() => {
    latest.current = { selectedIndex, onSelect };
  });

  // Tilt and shrink each item by its distance from the centre of the strip
  const updateTransforms = useCallback(() => {
    const strip = stripRef.current;
    if (!strip) return;
    const centre = strip.scrollLeft + strip.clientWidth / 2;
    itemRefs.current.forEach((el) => {
      if (!el) return;
      // How many item-steps this item is from the centre (0 = selected)
      const offset = (el.offsetLeft + el.offsetWidth / 2 - centre) / (el.offsetWidth - OVERLAP);
      const clamped = Math.max(-1, Math.min(1, offset));
      const distance = Math.abs(clamped);
      const beyond = Math.max(0, Math.abs(offset) - 1);
      // Where the item should appear: the first side item just clear of the centre card, the
      // rest stacked closely behind it. Shift from its natural (overlapping) layout position.
      const target = Math.sign(offset) * (distance * FIRST_SIDE_GAP + beyond * STACK_GAP);
      const shift = target - offset * (el.offsetWidth - OVERLAP);
      // The nearest side items turn gently (~40°), the ones further out turn ~70°; each item has
      // its own perspective so both sides match
      const angle = distance * NEAR_TILT + Math.min(beyond, 1) * (FAR_TILT - NEAR_TILT);
      el.style.transform = `translateX(${shift}px) perspective(700px) rotateY(${-Math.sign(offset) * angle}deg) scale(${1 - distance * 0.2})`;
      el.style.zIndex = String(100 - Math.round(Math.abs(offset) * 10));
      // Show two items each side; fade out the rest
      const fade = Math.max(0, Math.min(1, VISIBLE_EACH_SIDE + 1 - Math.abs(offset)));
      el.style.opacity = String(fade);
      el.style.pointerEvents = fade < 0.5 ? "none" : "";
    });
  }, []);

  const indexAtCentre = useCallback(() => {
    const strip = stripRef.current;
    const centre = strip.scrollLeft + strip.clientWidth / 2;
    let closest = 0;
    let closestDistance = Infinity;
    itemRefs.current.forEach((el, i) => {
      const distance = Math.abs(el.offsetLeft + el.offsetWidth / 2 - centre);
      if (distance < closestDistance) [closest, closestDistance] = [i, distance];
    });
    return closest;
  }, []);

  const scrollToIndex = useCallback((index, behavior = "smooth") => {
    const strip = stripRef.current;
    const el = itemRefs.current[index];
    if (!strip || !el) return;
    strip.scrollTo({ left: el.offsetLeft + el.offsetWidth / 2 - strip.clientWidth / 2, behavior });
  }, []);

  // Start with the selected item centred
  useEffect(() => {
    scrollToIndex(selectedIndex, "instant");
    updateTransforms();
    // Only on first render; later selections scroll themselves
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const onResize = () => {
      scrollToIndex(selectedIndex, "instant");
      updateTransforms();
    };
    window.addEventListener("resize", onResize);
    return () => window.removeEventListener("resize", onResize);
  }, [selectedIndex, scrollToIndex, updateTransforms]);

  // Don't let a pending timer act on a strip that has gone (e.g. after switching cake tiers)
  useEffect(
    () => () => {
      clearTimeout(settleTimer.current);
      cancelAnimationFrame(frame.current);
    },
    []
  );

  const handleScroll = () => {
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(updateTransforms);
    // When scrolling stops, glide to the nearest item and select it. (We snap ourselves: the
    // browser's CSS scroll-snap lands between items because they overlap.)
    clearTimeout(settleTimer.current);
    settleTimer.current = setTimeout(() => {
      const index = indexAtCentre();
      // An arrow/tap already chose the item: keep gliding to it rather than selecting whatever
      // is in the centre if the animation paused (slow phones)
      if (pendingTarget.current !== null) {
        if (index === pendingTarget.current) pendingTarget.current = null;
        else scrollToIndex(pendingTarget.current);
        return;
      }
      scrollToIndex(index);
      if (index !== latest.current.selectedIndex) latest.current.onSelect(index);
    }, 120);
  };

  // A hand swipe or wheel takes over from any arrow/tap target
  const cancelPendingTarget = () => {
    pendingTarget.current = null;
  };

  const go = (index) => {
    const next = Math.max(0, Math.min(items.length - 1, index));
    pendingTarget.current = next;
    scrollToIndex(next);
    onSelect(next);
  };

  const handleKeyDown = (e) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      go(selectedIndex - 1);
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      go(selectedIndex + 1);
    }
  };

  return (
    <div className="relative">
      <div
        ref={stripRef}
        onScroll={handleScroll}
        onKeyDown={handleKeyDown}
        onTouchStart={cancelPendingTarget}
        onPointerDown={cancelPendingTarget}
        onWheel={cancelPendingTarget}
        tabIndex={0}
        role="listbox"
        aria-label={label}
        aria-activedescendant={`${label}-${selectedIndex}`}
        className="no-scrollbar relative flex overflow-x-auto py-6 outline-none focus-visible:ring-2 focus-visible:ring-rose/40"
        // Padding lets the first and last items reach the centre (item is 128px wide). The scroll
        // margin keeps the strip clear of a sticky preview above it when focused or scrolled to.
        style={{ paddingInline: `calc(50% - ${64 - OVERLAP / 2}px)`, scrollMarginTop: "calc(28vh + 9rem)" }}
      >
        {items.map((item, index) => (
          <div
            key={getLabel(item)}
            id={`${label}-${index}`}
            ref={(el) => (itemRefs.current[index] = el)}
            role="option"
            aria-selected={index === selectedIndex}
            aria-label={getLabel(item)}
            onClick={() => go(index)}
            style={{ marginInline: -OVERLAP / 2 }}
            className="w-32 shrink-0 cursor-pointer [will-change:transform]"
          >
            {renderItem(item, index === selectedIndex)}
          </div>
        ))}
      </div>

      <button
        type="button"
        onClick={() => go(selectedIndex - 1)}
        disabled={selectedIndex === 0}
        aria-label={`Previous ${label.toLowerCase()}`}
        className="absolute -left-2 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-cocoa shadow-md transition-opacity hover:text-rose disabled:opacity-0"
      >
        <ChevronLeft size={22} />
      </button>
      <button
        type="button"
        onClick={() => go(selectedIndex + 1)}
        disabled={selectedIndex === items.length - 1}
        aria-label={`Next ${label.toLowerCase()}`}
        className="absolute -right-2 top-1/2 z-[200] -translate-y-1/2 rounded-full bg-white/90 p-1.5 text-cocoa shadow-md transition-opacity hover:text-rose disabled:opacity-0"
      >
        <ChevronRight size={22} />
      </button>
    </div>
  );
}
