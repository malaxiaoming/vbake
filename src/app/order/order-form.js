"use client";

import { useEffect, useRef, useState } from "react";
import { cakes } from "@/data/cakes";
import { flavors } from "@/data/flavors";
import { contactInfo } from "@/data/contact";
import { buildOrderMessage, calculateTotal, getDefaultDate, isValidPhone } from "@/lib/order";
import { trackPixelEvent } from "@/lib/pixel";
import CakePicker from "@/components/order/cake-picker";
import FlavorSelect from "@/components/order/flavor-select";
import SizePicker from "@/components/order/size-picker";
import AddonsPicker from "@/components/order/addons-picker";
import OrderSummary from "@/components/order/order-summary";
import DeliveryDate from "@/components/order/delivery-date";
import CustomerDetails from "@/components/order/customer-details";

// Switch on once the add-on product photos are ready
const SHOW_ADDONS = false;

const trackPixel = (event, cake, value) => {
  trackPixelEvent(event, {
    content_name: cake.name,
    content_category: "Cakes",
    content_type: "Product",
    content_ids: [`cakes-${cake.name.toLowerCase().replace(/\s+/g, "-")}`],
    value,
    currency: "MYR",
  });
};

function StepHeading({ number, children }) {
  return (
    <h2 className="mb-5 text-2xl font-semibold">
      <span className="mr-3 inline-flex h-9 w-9 items-center justify-center rounded-full bg-blush align-middle text-lg text-rose">
        {number}
      </span>
      {children}
    </h2>
  );
}

// cakeId comes from the ?cakeId= link, read on the server so the form renders immediately.
// blockedDates ({ "YYYY-MM-DD": "Closed" | "Full" }) come from the bakery's Google Sheet.
export default function OrderForm({ cakeId, blockedDates = {} }) {
  const [cake, setCake] = useState(() => cakes.find((c) => c.id === cakeId) || cakes[0]);
  const [size, setSize] = useState(cake.defaultSize);
  const [flavorId, setFlavorId] = useState(cake.fixedFlavor || "");
  const [addonIds, setAddonIds] = useState([]);
  const [date, setDate] = useState(() => getDefaultDate(blockedDates));
  const [customer, setCustomer] = useState({ phone: "", occasion: "", address: "", notes: "" });
  const [phoneError, setPhoneError] = useState("");
  const phoneRef = useRef(null);

  const order = { cake, size, flavorId, addonIds };

  // Track which cake (and price) the customer is looking at
  useEffect(() => {
    trackPixel("ViewContent", cake, calculateTotal({ cake, size, flavorId, addonIds }));
  }, [cake, size, flavorId, addonIds]);

  const selectCake = (next) => {
    setCake(next);
    // Keep the chosen size if the new cake has it (Flaming and Baka are 6-inch only)
    setSize((current) => (next.sizes[current] ? current : next.defaultSize));
    // Lock single-flavour cakes; drop a cake-specific flavour (Coriander) when leaving that cake
    setFlavorId((current) => {
      if (next.fixedFlavor) return next.fixedFlavor;
      return flavors.special.some((flavor) => flavor.id === current) ? "" : current;
    });
  };

  const toggleAddon = (id) =>
    setAddonIds((current) => (current.includes(id) ? current.filter((x) => x !== id) : [...current, id]));

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

    trackPixel("InitiateCheckout", cake, calculateTotal(order));
    const message = buildOrderMessage({ ...order, date, customer });
    window.open(`${contactInfo.phone.whatsappUrl}?text=${encodeURIComponent(message)}`, "_blank");
  };

  return (
    <div className="px-3 pb-12 pt-8 sm:px-6 sm:pt-12">
      <div className="text-center">
        <p className="eyebrow">Made fresh for your date</p>
        <h1 className="mt-3 text-4xl font-semibold sm:text-5xl">Order your cake</h1>
        <p className="mx-auto mt-3 max-w-md text-base text-cocoa-soft sm:text-lg">
          Choose your cake, pick a date and send your order to us on WhatsApp.
        </p>
      </div>

      <div className="card mx-auto mt-6 max-w-3xl p-5 sm:mt-8 sm:p-10">
        <section className="mb-10">
          <StepHeading number={1}>Choose your cake</StepHeading>
          <CakePicker selectedCake={cake} onSelect={selectCake} />
          <div className="mt-6 space-y-6">
            <FlavorSelect cake={cake} value={flavorId} onChange={setFlavorId} />
            <SizePicker cake={cake} value={size} onChange={setSize} />
          </div>
        </section>

        {SHOW_ADDONS && (
          <section className="mb-10">
            <h2 className="mb-5 text-2xl font-semibold">Add-ons</h2>
            <AddonsPicker selectedIds={addonIds} onToggle={toggleAddon} />
          </section>
        )}

        <div className="mb-10">
          <OrderSummary {...order} />
        </div>

        <section className="mb-10">
          <StepHeading number={2}>Choose delivery date</StepHeading>
          <DeliveryDate value={date} onChange={setDate} blockedDates={blockedDates} />
        </section>

        <section>
          <StepHeading number={3}>Your details</StepHeading>
          <CustomerDetails values={customer} onChange={updateCustomer} phoneError={phoneError} phoneRef={phoneRef} />
          <button type="button" onClick={placeOrder} className="btn-primary mt-8 w-full py-4 text-lg">
            Place Order
          </button>
          <p className="mt-2 text-sm text-cocoa-soft">Payments should only be made to VBake Baker</p>
        </section>
      </div>
    </div>
  );
}
