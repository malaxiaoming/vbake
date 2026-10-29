"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";
import { cakes, getStartingPrice } from "@/data/cakes";

// Scrollable strip of cake photos; tap one to choose it
export default function CakePicker({ selectedCake, onSelect }) {
  const stripRef = useRef(null);
  const selectedRef = useRef(null);

  // Centre the chosen cake in the strip (e.g. one linked through ?cakeId=) without scrolling the page
  useEffect(() => {
    const strip = stripRef.current;
    const card = selectedRef.current;
    if (!strip || !card) return;
    strip.scrollTo({ left: card.offsetLeft - (strip.clientWidth - card.clientWidth) / 2, behavior: "smooth" });
  }, [selectedCake.id]);

  return (
    <div>
      <div ref={stripRef} className="relative -mx-5 overflow-x-auto px-5 pb-3 no-scrollbar sm:-mx-10 sm:px-10">
        <div className="flex w-max gap-3" role="group" aria-label="Cakes">
          {cakes.map((cake) => {
            const isSelected = cake.id === selectedCake.id;
            return (
              <button
                key={cake.id}
                ref={isSelected ? selectedRef : null}
                type="button"
                onClick={() => onSelect(cake)}
                aria-pressed={isSelected}
                className={`w-28 shrink-0 overflow-hidden rounded-2xl border-2 bg-white text-left transition-all sm:w-32 ${
                  isSelected ? "border-rose shadow-md" : "border-cocoa/10 hover:border-blush-deep"
                }`}
              >
                <div className="relative aspect-square">
                  <Image src={cake.img} alt="" fill sizes="128px" className="object-cover" />
                </div>
                <div className="p-2">
                  <p className="text-sm font-semibold leading-tight">{cake.name}</p>
                  <p className="mt-0.5 text-xs text-cocoa-soft">from {getStartingPrice(cake)}</p>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      <div className="mt-4 rounded-2xl bg-cream p-4">
        <p className="font-display text-xl font-semibold">{selectedCake.name}</p>
        <p className="mt-1 text-sm text-cocoa-soft">{selectedCake.description}</p>
        <Link href={`/cakes/${selectedCake.id}`} className="mt-2 inline-block text-sm font-semibold text-rose hover:underline">
          View photos &amp; details
        </Link>
      </div>

      {selectedCake.id === "flaming" && (
        <div className="mx-auto mt-4 w-full max-w-md">
          <p className="mb-2 text-sm font-medium">Before &amp; after the flame</p>
          <ReactCompareSlider
            itemOne={<ReactCompareSliderImage src="/images/slider/s1-before.png" alt="Flaming Cake before lighting" />}
            itemTwo={<ReactCompareSliderImage src="/images/slider/s1-after1.png" alt="Flaming Cake after the top burns away" />}
            className="rounded-2xl"
            style={{ height: "300px", width: "100%" }}
          />
        </div>
      )}
    </div>
  );
}
