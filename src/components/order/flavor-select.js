import { flavors, getFlavorById } from "@/data/flavors";

const groups = [
  { label: "Standard Flavors", items: flavors.standard },
  { label: "Premium Flavors - 3 days advance booking", items: flavors.premium },
  { label: "Luxury Flavors - 5 days advance booking", items: flavors.luxury },
];

const optionLabel = (flavor) => (flavor.price !== "RM 0" ? `${flavor.name} (+${flavor.price})` : flavor.name);

export default function FlavorSelect({ cake, value, onChange }) {
  const fixedFlavor = cake.fixedFlavor ? getFlavorById(cake.fixedFlavor) : null;
  const selected = value ? getFlavorById(value) : null;

  return (
    <div>
      <label htmlFor="flavor-select" className="mb-2 block text-sm font-semibold">
        Select Flavor
      </label>
      <select
        id="flavor-select"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        disabled={!!fixedFlavor}
        className={`w-full rounded-xl border border-cocoa/15 px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose/40 ${
          fixedFlavor ? "cursor-not-allowed bg-cream-deep" : "bg-white"
        }`}
      >
        {fixedFlavor ? (
          <option value={fixedFlavor.id}>{fixedFlavor.name}</option>
        ) : (
          <>
            <option value="">Select a flavor</option>
            {groups.map((group) => (
              <optgroup key={group.label} label={group.label}>
                {group.items.map((flavor) => (
                  <option key={flavor.id} value={flavor.id}>
                    {optionLabel(flavor)}
                  </option>
                ))}
              </optgroup>
            ))}
          </>
        )}
      </select>

      <div className="mt-2 space-y-1 text-sm text-cocoa-soft">
        {fixedFlavor && (
          <p>
            {cake.name} is only available in {fixedFlavor.name}
          </p>
        )}
        {selected && <p>{selected.description}</p>}
        {selected?.bookingRequirement && <p className="text-rose">Note: {selected.bookingRequirement}</p>}
        {selected && selected.price !== "RM 0" && <p className="text-rose">Additional cost: {selected.price}</p>}
      </div>
    </div>
  );
}
