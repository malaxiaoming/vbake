"use client";

import { useState } from "react";
import { cakeBodies, cakeFillings } from "@/data/cake-builder";
import { contactInfo } from "@/data/contact";
import { CakePreview, CakeTile, CrayonDefs } from "./cake-art";
import CoverFlow from "./cover-flow";

const neutralFilling = cakeFillings[0];

function Step({ number, title, children }) {
  return (
    <section className="mt-10">
      <h2 className="text-center font-crayon text-3xl text-cocoa">
        <span className="mr-2 inline-flex h-9 w-9 items-center justify-center rounded-full border-2 border-cocoa align-middle font-crayon text-xl">
          {number}
        </span>
        {title}
      </h2>
      {children}
    </section>
  );
}

function TileCard({ body, filling, title, subtitle, selected }) {
  return (
    <div
      className={`rounded-2xl border-2 bg-[#fffdf8] p-2 text-center shadow-sm transition-colors ${
        selected ? "border-rose" : "border-cocoa/15"
      }`}
    >
      <CakeTile body={body} filling={filling} className="mx-auto h-24 w-24" />
      <p className="font-crayon text-lg leading-tight text-cocoa">{title}</p>
      <p className="text-xs text-cocoa-soft">{subtitle}</p>
    </div>
  );
}

export default function CakeBuilder() {
  const [bodyIndex, setBodyIndex] = useState(0);
  const [fillingIndex, setFillingIndex] = useState(0);
  const body = cakeBodies[bodyIndex];
  const filling = cakeFillings[fillingIndex];

  const message = `Hi VBake! I'd like a cake with ${body.name} sponge and ${filling.name} filling. Could you share the sizes and price?`;

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
      <CrayonDefs />

      <div className="text-center">
        <p className="eyebrow">Experiment · not live yet</p>
        <h1 className="mt-2 font-crayon text-5xl text-cocoa sm:text-6xl">Build your cake</h1>
        <p className="mx-auto mt-2 max-w-md text-cocoa-soft">
          Pick a sponge and a filling. Swipe, tap or use the arrows.
        </p>
      </div>

      {/* Live preview */}
      <div className="mt-6 rounded-[2rem] border-2 border-dashed border-cocoa/20 bg-[#fffaf1] px-2 py-4">
        <CakePreview body={body} filling={filling} className="mx-auto w-full max-w-xl" />
      </div>

      <Step number={1} title="Choose your sponge">
        <CoverFlow
          label="Sponge"
          items={cakeBodies}
          selectedIndex={bodyIndex}
          onSelect={setBodyIndex}
          getLabel={(item) => item.name}
          renderItem={(item, selected) => (
            <TileCard body={item} filling={neutralFilling} title={item.name} subtitle={item.chinese} selected={selected} />
          )}
        />
      </Step>

      <Step number={2} title="Choose your filling">
        <CoverFlow
          label="Filling"
          items={cakeFillings}
          selectedIndex={fillingIndex}
          onSelect={setFillingIndex}
          getLabel={(item) => item.name}
          renderItem={(item, selected) => (
            <TileCard body={body} filling={item} title={item.name} subtitle={item.chinese} selected={selected} />
          )}
        />
      </Step>

      <div className="mt-10 rounded-[2rem] bg-blush/60 p-6 text-center">
        <p className="font-crayon text-3xl text-cocoa">
          {body.name} sponge + {filling.name}
        </p>
        <a
          href={`${contactInfo.phone.whatsappUrl}?text=${encodeURIComponent(message)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary mt-4"
        >
          Ask us on WhatsApp
        </a>
      </div>
    </div>
  );
}
