import { Fraunces, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FacebookPixel from "@/components/FacebookPixel";
import WhatsAppButton from "@/components/layout/whatsapp-button";
import { siteUrl, bakeryJsonLd } from "@/lib/site";
import { Suspense } from "react";

const heading = Fraunces({ subsets: ["latin"], variable: "--font-heading", weight: ["500", "600", "700"] });
const body = DM_Sans({ subsets: ["latin"], variable: "--font-body" });

export const metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "VBake.KL - Custom Cakes in Kuala Lumpur",
    template: "%s | VBake.KL",
  },
  description: "Custom cakes for birthdays, weddings and celebrations in Kuala Lumpur. Signature Coriander, Flaming and Mahjong cakes. Order easily via WhatsApp.",
  openGraph: {
    siteName: "VBake.KL",
    locale: "en_MY",
    type: "website",
  },
  icons: {
    icon: [
      {
        url: '/images/logos/vbakelogo.png',
        href: '/images/logos/vbakelogo.png',
      },
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <meta name="facebook-domain-verification" content="ctw4i2zalbteixmeo6z9qqauaqyzz0" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(bakeryJsonLd) }}
        />
      </head>
      <body className={`${heading.variable} ${body.variable}`}>
        <Suspense>
          <FacebookPixel />
        </Suspense>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer />
        <WhatsAppButton />
      </body>
    </html>
  );
}
