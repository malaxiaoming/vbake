"use client";

import { ReactCompareSlider, ReactCompareSliderImage } from "react-compare-slider";

// Drag to compare the Flaming Cake before and after the top layer burns away
export default function FlamingReveal() {
  return (
    <ReactCompareSlider
      className="aspect-[3/4] w-full overflow-hidden rounded-3xl shadow-[0_2px_20px_rgba(74,46,34,0.12)]"
      itemOne={
        <ReactCompareSliderImage
          src="/images/cakes/flaming-reveal-before.webp"
          alt="Flaming Cake before lighting, with a written message on top"
        />
      }
      itemTwo={
        <ReactCompareSliderImage
          src="/images/cakes/flaming-reveal-after.webp"
          alt="Flaming Cake after the top burns away, revealing a printed photo"
        />
      }
    />
  );
}
