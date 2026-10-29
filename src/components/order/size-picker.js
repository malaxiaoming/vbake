import { sizeServings } from "@/data/cakes";

export default function SizePicker({ cake, value, onChange }) {
  return (
    <div>
      <p className="mb-2 text-sm font-semibold">Select Size</p>
      <div className="flex flex-wrap gap-2 sm:gap-3">
        {Object.entries(cake.sizes).map(([size, price]) => {
          const isSelected = value === size;
          return (
            <button
              key={size}
              type="button"
              onClick={() => onChange(size)}
              aria-pressed={isSelected}
              className={`min-w-[4.5rem] max-w-[8rem] flex-1 rounded-2xl border-2 px-2 py-3 text-center transition-all ${
                isSelected ? "border-rose bg-rose text-white" : "border-cocoa/15 bg-white text-cocoa hover:border-blush-deep"
              }`}
            >
              <div className="font-medium">{size}</div>
              <div className="text-sm">{price}</div>
              <div className={`text-xs ${isSelected ? "text-white" : "text-cocoa-soft"}`}>{sizeServings[size]}</div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
