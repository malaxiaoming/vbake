import { ChevronDown } from "lucide-react";
import { faqs } from "@/data/faqs";
import { contactInfo } from "@/data/contact";

// Expandable questions and answers (native <details>, no JavaScript needed)
export default function Faq() {
  return (
    <div>
      <div className="space-y-3">
        {faqs.map((faq) => (
          <details key={faq.question} className="card group px-5 py-4 open:pb-5">
            <summary className="flex cursor-pointer list-none items-center justify-between gap-4 font-semibold [&::-webkit-details-marker]:hidden">
              {faq.question}
              <ChevronDown
                size={20}
                aria-hidden="true"
                className="shrink-0 text-rose transition-transform group-open:rotate-180"
              />
            </summary>
            <p className="mt-3 text-cocoa-soft">{faq.answer}</p>
          </details>
        ))}
      </div>
      <p className="mt-6 text-center text-sm text-cocoa-soft">
        Still have a question?{" "}
        <a
          href={contactInfo.phone.whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold text-rose hover:underline"
        >
          WhatsApp us at {contactInfo.phone.number}
        </a>
      </p>
    </div>
  );
}
