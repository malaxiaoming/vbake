"use client";

import { useRef, useState } from "react";
import { cakeBodies, cakeFillings, singleTierSizes, twoTierSizes } from "@/data/cake-builder";
import { sizeServings } from "@/data/cakes";
import { contactInfo } from "@/data/contact";
import { formatDate, getDefaultDate, isValidPhone } from "@/lib/order";
import DeliveryDate from "@/components/order/delivery-date";
import CustomerDetails from "@/components/order/customer-details";
import { CakePreview, CakeTile, CrayonDefs } from "./cake-art";
import CoverFlow from "./cover-flow";

const neutralFilling = cakeFillings[0];
const inches = (size) => size.replace("-inch", '"');

function Step({ number, title, children }) {
  return (
    <section className="mt-12">
      <h2 className="mb-2 text-center font-crayon text-3xl text-cocoa">
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

// Rounded toggle button used for the tier and size choices
function Choice({ selected, onClick, children, className = "" }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-pressed={selected}
      className={`rounded-2xl border-2 px-3 py-2 text-center transition-colors ${
        selected ? "border-rose bg-rose text-white" : "border-cocoa/15 bg-white text-cocoa hover:border-blush-deep"
      } ${className}`}
    >
      {children}
    </button>
  );
}

// The pre-filled WhatsApp message the bakery receives
function buildMessage({ tiers, sizeLabel, price, date, customer }) {
  const describe = (tier) => `${tier.body.name} sponge, ${tier.filling.name} filling`;
  const [bottom, top] = tiers;
  const orNotMentioned = (value) => value.trim() || "Not mentioned";
  return [
    "Hello, I would like to order (from the cake builder):",
    "",
    `  - Cake: ${sizeLabel}`,
    ...(top
      ? [`  - Top tier (${inches(top.size)}): ${describe(top)}`, `  - Bottom tier (${inches(bottom.size)}): ${describe(bottom)}`]
      : [`  - Flavour: ${describe(bottom)}`]),
    `  - Total Amount: RM ${price}`,
    `  - Delivery Date: ${formatDate(date)}`,
    "  - Time: 12 PM - 3 PM",
    `  - Contact Number: ${customer.phone.trim()}`,
    `  - Occasion: ${orNotMentioned(customer.occasion)}`,
    `  - Address: ${orNotMentioned(customer.address)}`,
    `  - Notes: ${orNotMentioned(customer.notes)}`,
  ].join("\n");
}

export default function CakeBuilder({ blockedDates = {} }) {
  const [tierCount, setTierCount] = useState(1);
  const [singleSizeId, setSingleSizeId] = useState("6-inch");
  const [twoTierId, setTwoTierId] = useState("6+8");
  // Chosen sponge/filling (as list positions) for each tier; a one-tier cake uses "bottom"
  const [flavours, setFlavours] = useState({ top: { body: 0, filling: 0 }, bottom: { body: 0, filling: 0 } });
  const [activeTier, setActiveTier] = useState("top");
  const [date, setDate] = useState(() => getDefaultDate(blockedDates));
  const [customer, setCustomer] = useState({ phone: "", occasion: "", address: "", notes: "" });
  const [phoneError, setPhoneError] = useState("");
  const phoneRef = useRef(null);

  const single = singleTierSizes.find((s) => s.id === singleSizeId);
  const twoTier = twoTierSizes.find((s) => s.id === twoTierId);
  const isTwoTier = tierCount === 2;
  const price = isTwoTier ? twoTier.price : single.price;
  const sizeLabel = isTwoTier ? `Two tiers, ${inches(twoTier.top)} on top of ${inches(twoTier.bottom)}` : `One tier, ${single.id}`;

  const tierOf = (name, size) => ({
    size,
    body: cakeBodies[flavours[name].body],
    filling: cakeFillings[flavours[name].filling],
  });
  // Listed bottom first
  const tiers = isTwoTier ? [tierOf("bottom", twoTier.bottom), tierOf("top", twoTier.top)] : [tierOf("bottom", single.id)];
  const editing = isTwoTier ? activeTier : "bottom";
  const editingTier = flavours[editing];

  const choose = (part) => (index) =>
    setFlavours((current) => ({ ...current, [editing]: { ...current[editing], [part]: index } }));

  const updateCustomer = (values) => {
    setCustomer(values);
    if (phoneError && isValidPhone(values.phone)) setPhoneError("");
  };

  const placeOrder = () => {
    if (!isValidPhone(customer.phone)) {
      setPhoneError(
        customer.phone.trim()
          ? "Please check your contact number, e.g. 012-345 6789."
          : "Please enter your contact number so we can confirm your order."
      );
      phoneRef.current?.focus();
      return;
    }
    const message = buildMessage({ tiers, sizeLabel, price, date, customer });
    window.open(`${contactInfo.phone.whatsappUrl}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="mx-auto max-w-3xl px-4 pb-20 pt-8 sm:px-6">
      <CrayonDefs />

      <div className="text-center">
        <p className="eyebrow">Experiment · not live yet</p>
        <h1 className="mt-2 font-crayon text-5xl text-cocoa sm:text-6xl">Build your cake</h1>
        <p className="mx-auto mt-2 max-w-md text-cocoa-soft">Choose a size, then a sponge and filling for each tier.</p>
      </div>

      {/* Live preview, kept in view while choosing size and flavour */}
      <div>
      <div className="sticky top-16 z-[300] mt-6 rounded-[2rem] border-2 border-dashed border-cocoa/20 bg-[#fffaf1] px-2 py-3 shadow-sm sm:top-20">
        <CakePreview tiers={tiers} className="mx-auto max-h-[28vh] w-full max-w-xl" />
        <p className="text-center font-crayon text-xl text-cocoa">
          {isTwoTier ? twoTier.label : single.label} · RM {price}
        </p>
      </div>

      <Step number={1} title="Choose your size">
        <div className="mx-auto mt-4 flex max-w-sm gap-2" role="group" aria-label="Number of tiers">
          {[1, 2].map((count) => (
            <Choice key={count} selected={tierCount === count} onClick={() => setTierCount(count)} className="flex-1 font-semibold">
              {count === 1 ? "One tier" : "Two tiers"}
            </Choice>
          ))}
        </div>
        <div className="mt-4 flex flex-wrap justify-center gap-2" role="group" aria-label="Size">
          {isTwoTier
            ? twoTierSizes.map((option) => (
                <Choice key={option.id} selected={twoTierId === option.id} onClick={() => setTwoTierId(option.id)} className="min-w-[6.5rem]">
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-sm">RM {option.price}</div>
                </Choice>
              ))
            : singleTierSizes.map((option) => (
                <Choice key={option.id} selected={singleSizeId === option.id} onClick={() => setSingleSizeId(option.id)} className="min-w-[4.5rem]">
                  <div className="font-semibold">{option.label}</div>
                  <div className="text-sm">RM {option.price}</div>
                  <div className={`text-xs ${singleSizeId === option.id ? "text-white" : "text-cocoa-soft"}`}>{sizeServings[option.id]}</div>
                </Choice>
              ))}
        </div>
      </Step>

      <Step number={2} title="Choose your flavour">
        {isTwoTier && (
          <div className="mx-auto mt-4 flex max-w-sm gap-2" role="group" aria-label="Tier">
            {[
              ["top", `Top tier · ${inches(twoTier.top)}`],
              ["bottom", `Bottom tier · ${inches(twoTier.bottom)}`],
            ].map(([name, text]) => (
              <Choice key={name} selected={activeTier === name} onClick={() => setActiveTier(name)} className="flex-1 font-crayon text-lg">
                {text}
              </Choice>
            ))}
          </div>
        )}
        <h3 className="mt-6 text-center font-crayon text-2xl text-cocoa">Sponge</h3>
        <CoverFlow
          key={`sponge-${editing}`}
          label="Sponge"
          items={cakeBodies}
          selectedIndex={editingTier.body}
          onSelect={choose("body")}
          getLabel={(item) => item.name}
          renderItem={(item, selected) => (
            <TileCard body={item} filling={neutralFilling} title={item.name} subtitle={item.chinese} selected={selected} />
          )}
        />
        <h3 className="mt-2 text-center font-crayon text-2xl text-cocoa">Filling</h3>
        <CoverFlow
          key={`filling-${editing}`}
          label="Filling"
          items={cakeFillings}
          selectedIndex={editingTier.filling}
          onSelect={choose("filling")}
          getLabel={(item) => item.name}
          renderItem={(item, selected) => (
            <TileCard body={cakeBodies[editingTier.body]} filling={item} title={item.name} subtitle={item.chinese} selected={selected} />
          )}
        />
      </Step>
      </div>

      <Step number={3} title="Choose delivery date">
        <div className="card mt-4 p-4 sm:p-6">
          <DeliveryDate value={date} onChange={setDate} blockedDates={blockedDates} />
        </div>
      </Step>

      <Step number={4} title="Your details">
        <div className="card mt-4 p-5 sm:p-6">
          <CustomerDetails values={customer} onChange={updateCustomer} phoneError={phoneError} phoneRef={phoneRef} />
        </div>
      </Step>

      <div className="mt-10 rounded-[2rem] bg-blush/60 p-6 text-center">
        <p className="font-crayon text-2xl text-cocoa">{sizeLabel}</p>
        <p className="mt-1 text-3xl font-bold text-rose">RM {price}</p>
        <button type="button" onClick={placeOrder} className="btn-primary mt-4 w-full max-w-sm py-4 text-lg">
          Place Order
        </button>
        <p className="mt-2 text-sm text-cocoa-soft">Payments should only be made to VBake Baker</p>
      </div>
    </div>
  );
}
