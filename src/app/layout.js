import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/navbar";
import Footer from "@/components/layout/footer";
import FacebookPixel from "@/components/FacebookPixel";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "VBake - Custom Cakes & Bakery",
  description: "Custom cakes for all occasions. Wedding cakes, birthday cakes, and special event cakes.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <FacebookPixel />
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}
