import { Caveat } from "next/font/google";
import CakeBuilder from "@/components/cake-builder/cake-builder";

// Handwritten font for the crayon-style builder only
const crayon = Caveat({ subsets: ["latin"], variable: "--font-caveat", weight: ["500", "700"] });

// Experimental page: not linked from the site, kept out of search results and the sitemap
export const metadata = {
  title: "Build your cake (experiment)",
  robots: { index: false, follow: false },
};

export default function CakeBuilderPage() {
  return (
    <div className={`${crayon.variable} min-h-screen bg-[#f7efe2]`}>
      <CakeBuilder />
    </div>
  );
}
