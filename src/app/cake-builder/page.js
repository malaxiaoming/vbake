import { Caveat } from "next/font/google";
import CakeBuilder from "@/components/cake-builder/cake-builder";
import { getBlockedDates } from "@/lib/blocked-dates";

// Handwritten font for the crayon-style builder only
const crayon = Caveat({ subsets: ["latin"], variable: "--font-caveat", weight: ["500", "700"] });

// Render on each request so blocked delivery dates stay current (the sheet itself is cached 5 minutes)
export const dynamic = "force-dynamic";

// Experimental page: not linked from the site, kept out of search results and the sitemap
export const metadata = {
  title: "Build your cake (experiment)",
  robots: { index: false, follow: false },
};

export default async function CakeBuilderPage() {
  const blockedDates = await getBlockedDates();
  return (
    <div className={`${crayon.variable} min-h-screen bg-[#f7efe2]`}>
      <CakeBuilder blockedDates={blockedDates} />
    </div>
  );
}
