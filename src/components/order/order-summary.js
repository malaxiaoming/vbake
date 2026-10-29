import { getFlavorById } from "@/data/flavors";
import { calculateTotal, getAddons } from "@/lib/order";

export default function OrderSummary({ cake, size, flavorId, addonIds }) {
  const flavor = flavorId ? getFlavorById(flavorId) : null;
  const rows = [
    [`${cake.name} (${size})`, cake.sizes[size]],
    ...(flavor ? [[`Flavor (${flavor.name})`, flavor.price]] : []),
    ...getAddons(addonIds).map((addon) => [addon.name, addon.price]),
  ];

  return (
    <div className="rounded-2xl bg-cream p-5">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-medium">Total Amount:</h3>
        <span className="text-2xl font-bold text-rose">RM {calculateTotal({ cake, size, flavorId, addonIds })}</span>
      </div>
      <div className="mt-2 text-sm text-cocoa-soft">
        {rows.map(([label, price]) => (
          <div key={label} className="flex justify-between">
            <span>{label}</span>
            <span>{price}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
