import { getFlavorById } from "@/data/flavors";
import { allAddons } from "@/data/addons";

export const parsePrice = (price) => parseInt(price.replace(/[^0-9]/g, ""), 10) || 0;

// YYYY-MM-DD in the customer's local time. toISOString() would convert to UTC and
// shift Malaysian dates back a day.
export const formatDate = (date) =>
  `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;

// Default delivery date: three days from today, or the next day after that which isn't closed or full
export const getDefaultDate = (blockedDates = {}) => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  while (blockedDates[formatDate(date)]) date.setDate(date.getDate() + 1);
  return date;
};

// Malaysian numbers are 9-11 digits (or up to 13 with the 60 country code)
export const isValidPhone = (value) => {
  const digits = value.replace(/\D/g, "");
  return digits.length >= 9 && digits.length <= 13;
};

export const getAddons = (addonIds) => addonIds.map((id) => allAddons.find((addon) => addon.id === id));

export function calculateTotal({ cake, size, flavorId, addonIds }) {
  const flavor = flavorId ? getFlavorById(flavorId) : null;
  return (
    parsePrice(cake.sizes[size]) +
    (flavor ? parsePrice(flavor.price) : 0) +
    getAddons(addonIds).reduce((sum, addon) => sum + parsePrice(addon.price), 0)
  );
}

// The pre-filled WhatsApp message the bakery receives
export function buildOrderMessage({ cake, size, flavorId, addonIds, date, customer }) {
  const flavor = flavorId ? getFlavorById(flavorId) : null;
  const addons = getAddons(addonIds);
  const orNotMentioned = (value) => value.trim() || "Not mentioned";

  // Only include optional lines when they apply, so the message has no blank gaps
  const lines = [
    "Hello, I would like to order:",
    "",
    `  - Cake: ${cake.name} (${size})`,
    `  - Flavor: ${flavor ? flavor.name : "Not selected"}`,
    `  - Price: ${cake.sizes[size]}`,
  ];
  if (flavor && flavor.price !== "RM 0") {
    lines.push(`  - Flavor Adjustment: ${flavor.price}`);
  }
  if (addons.length > 0) {
    lines.push("", "  Add-ons:", ...addons.map((addon) => `  - ${addon.name}: ${addon.price}`), "");
  }
  lines.push(
    `  - Total Amount: RM ${calculateTotal({ cake, size, flavorId, addonIds })}`,
    `  - Delivery Date: ${formatDate(date)}`,
    "  - Time: 12 PM - 3 PM",
    `  - Contact Number: ${customer.phone.trim()}`,
    `  - Occasion: ${orNotMentioned(customer.occasion)}`,
    `  - Address: ${orNotMentioned(customer.address)}`,
    `  - Notes: ${orNotMentioned(customer.notes)}`,
  );
  return lines.join("\n");
}
