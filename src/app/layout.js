import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FacebookPixel from "@/components/FacebookPixel";
import { Suspense } from "react";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VBake - Custom Cakes & Gifts",
  description: "Order custom cakes, flowers, and gifts for all occasions. Free delivery in Klang Valley.",
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
      <body className={inter.className}>
        <Suspense>
          <FacebookPixel />
        </Suspense>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
