import { contactInfo } from "@/data/contact";

// Public site address, used for the sitemap, share previews and Google structured data.
// NEXT_PUBLIC_SITE_URL can override it (e.g. for testing on another domain).
export const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://www.vbakekl.com";

// schema.org Bakery details for Google search results
export const bakeryJsonLd = {
  "@context": "https://schema.org",
  "@type": "Bakery",
  name: "VBake.KL",
  url: siteUrl,
  image: `${siteUrl}/images/logos/vbakelogo.png`,
  telephone: contactInfo.phone.number.replace(/[\s-]/g, ""),
  email: contactInfo.email,
  priceRange: "RM 130 - RM 270",
  servesCuisine: "Cakes",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Sri Petaling, Kuala Lumpur",
    addressCountry: "MY",
  },
  openingHoursSpecification: {
    "@type": "OpeningHoursSpecification",
    dayOfWeek: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    opens: "08:00",
    closes: "22:00",
  },
  sameAs: ["https://facebook.com/VBake.KL", "https://instagram.com/vbake.kl"],
};
