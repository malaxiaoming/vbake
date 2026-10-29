import Image from "next/image";
import { Check } from "lucide-react";
import { addons } from "@/data/addons";

const sections = [
  { title: "Flowers", items: addons.flowers },
  { title: "Decorations", items: addons.decorations },
];

// Optional extras (balloons, bouquets, candles). Switched off on the order page until product photos are ready.
export default function AddonsPicker({ selectedIds, onToggle }) {
  return (
    <div className="space-y-6">
      {sections.map((section) => (
        <div key={section.title}>
          <h3 className="mb-3 text-lg font-semibold">{section.title}</h3>
          <div className="-mx-5 overflow-x-auto px-5 pb-2 no-scrollbar sm:-mx-10 sm:px-10">
            <div className="flex w-max gap-2">
              {section.items.map((addon) => {
                const isSelected = selectedIds.includes(addon.id);
                return (
                  <button
                    key={addon.id}
                    type="button"
                    onClick={() => onToggle(addon.id)}
                    aria-pressed={isSelected}
                    className={`w-36 flex-none rounded-2xl border-2 p-2 text-left transition-all sm:w-48 sm:p-3 ${
                      isSelected ? "border-rose bg-blush/40" : "border-cocoa/15 bg-white hover:border-blush-deep"
                    }`}
                  >
                    <div className="relative mb-2 aspect-square overflow-hidden rounded-xl">
                      <Image src={addon.img} alt="" fill sizes="192px" className="object-cover" />
                    </div>
                    <p className="text-xs font-medium sm:text-sm">{addon.name}</p>
                    <p className="mt-0.5 text-[10px] text-cocoa-soft sm:text-xs">{addon.description}</p>
                    <div className="mt-1 flex items-center justify-between">
                      <p className="text-xs font-medium text-rose">{addon.price}</p>
                      <span
                        className={`flex h-4 w-4 items-center justify-center rounded-full border-2 ${
                          isSelected ? "border-rose bg-rose text-white" : "border-cocoa/15"
                        }`}
                      >
                        {isSelected && <Check size={10} strokeWidth={3} />}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
