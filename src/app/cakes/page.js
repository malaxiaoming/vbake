"use client";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";
import { cakes, getAllOccasions, getStartingPrice } from "@/data/cakes";

export default function Cakes() {
  const occasions = getAllOccasions();
  const [activeOccasion, setActiveOccasion] = useState("All");
  const visibleCakes =
    activeOccasion === "All" ? cakes : cakes.filter((cake) => cake.occasions.includes(activeOccasion));

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Cakes Catalog',
        content_category: 'Cakes',
        content_type: 'Catalog',
        content_ids: ['cakes-catalog-2025'],
        value: 0,
        currency: 'MYR'
      });
    }
  }, []);

  const handleCakeClick = (cake) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: cake.name,
        content_category: 'Cake',
        content_type: 'Product',
        content_ids: [`cake-${cake.id}`],
        value: parseInt(cake.sizes["6-inch"].replace(/[^0-9]/g, '')),
        currency: 'MYR'
      });
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 pb-20 pt-10 sm:px-6 md:pt-14">
      {/* Header */}
      <div className="text-center">
        <p className="eyebrow">Handcrafted to order</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Our Cakes</h1>
        <p className="mx-auto mt-4 max-w-xl text-lg text-cocoa-soft">
          Pick a design you love. Every cake is made fresh for your date, in sizes from 5 to 10 inch.
        </p>
      </div>

      {/* Occasion filter */}
      <div className="-mx-4 mt-8 overflow-x-auto px-4 pb-2 no-scrollbar">
        <div className="flex w-max gap-2 md:mx-auto">
          {["All", ...occasions].map((occasion) => (
            <button
              key={occasion}
              onClick={() => setActiveOccasion(occasion)}
              aria-pressed={activeOccasion === occasion}
              className={`whitespace-nowrap rounded-full border px-4 py-2 text-sm font-medium transition-colors ${
                activeOccasion === occasion
                  ? "border-rose bg-rose text-white"
                  : "border-cocoa/15 bg-white text-cocoa hover:border-rose hover:text-rose"
              }`}
            >
              {occasion}
            </button>
          ))}
        </div>
      </div>

      {/* Cake grid */}
      <div className="mt-8 grid grid-cols-2 gap-4 sm:gap-6 lg:grid-cols-3">
        {visibleCakes.map((cake, index) => (
          <Link
            key={cake.id}
            href={`/order?cakeId=${cake.id}`}
            onClick={() => handleCakeClick(cake)}
            className="card group flex flex-col overflow-hidden transition-transform hover:-translate-y-1"
          >
            <div className="relative aspect-[4/5] overflow-hidden">
              <Image
                src={cake.img}
                alt={cake.name}
                fill
                sizes="(max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                priority={index < 4}
              />
            </div>
            <div className="flex flex-1 flex-col p-4 sm:p-6">
              <h2 className="text-base font-semibold leading-snug sm:text-xl">{cake.name}</h2>
              <p className="mt-2 hidden text-sm text-cocoa-soft sm:line-clamp-2">{cake.description}</p>
              <div className="mt-auto flex flex-wrap items-center justify-between gap-2 pt-3">
                <p className="text-sm text-cocoa-soft">
                  from <span className="font-semibold text-rose">{getStartingPrice(cake)}</span>
                </p>
                <span className="hidden items-center gap-1 text-sm font-semibold text-rose sm:inline-flex">
                  Order <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>

      {/* Custom design prompt */}
      <div className="mt-14 rounded-[2rem] bg-sage/70 px-6 py-10 text-center">
        <h2 className="text-2xl font-semibold sm:text-3xl">Have your own design in mind?</h2>
        <p className="mx-auto mt-3 max-w-lg text-cocoa-soft">
          Send us a photo or idea and we&apos;ll make it happen.
        </p>
        <Link href="/order" className="btn-primary mt-6">
          Start a custom order
        </Link>
      </div>
    </div>
  );
}
