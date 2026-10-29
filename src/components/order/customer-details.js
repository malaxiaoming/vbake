const inputClass =
  "w-full rounded-xl border bg-white px-4 py-3 focus:outline-none focus:ring-2 focus:ring-rose/40";

const optionalFields = [
  { key: "occasion", label: "Occasion", placeholder: "e.g., Birthday, Wedding, Anniversary" },
  { key: "address", label: "Address / Area", placeholder: "Delivery Address" },
  { key: "notes", label: "Notes", placeholder: "Urgent!" },
];

export default function CustomerDetails({ values, onChange, phoneError, phoneRef }) {
  const update = (key) => (e) => onChange({ ...values, [key]: e.target.value });

  return (
    <div className="space-y-4">
      <div>
        <label htmlFor="customer-phone" className="mb-1.5 block text-sm font-semibold">
          Contact Number <span className="text-rose">*</span>
        </label>
        <input
          ref={phoneRef}
          type="tel"
          id="customer-phone"
          autoComplete="tel"
          required
          placeholder="e.g., 012-345 6789"
          aria-invalid={!!phoneError}
          aria-describedby={phoneError ? "customer-phone-error" : undefined}
          className={`${inputClass} ${phoneError ? "border-rose" : "border-cocoa/15"}`}
          value={values.phone}
          onChange={update("phone")}
        />
        {phoneError && (
          <p id="customer-phone-error" className="mt-1.5 text-sm text-rose">
            {phoneError}
          </p>
        )}
      </div>

      {optionalFields.map(({ key, label, placeholder }) => (
        <div key={key}>
          <label htmlFor={`customer-${key}`} className="mb-1.5 block text-sm font-semibold">
            {label}
          </label>
          <input
            type="text"
            id={`customer-${key}`}
            placeholder={placeholder}
            className={`${inputClass} border-cocoa/15`}
            value={values[key]}
            onChange={update(key)}
          />
        </div>
      ))}
    </div>
  );
}
