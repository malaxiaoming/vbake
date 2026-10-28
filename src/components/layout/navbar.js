"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navItems = [
  { name: "Home", href: "/" },
  { name: "Our Cakes", href: "/cakes" },
  { name: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = (href) => (href === "/" ? pathname === "/" : pathname.startsWith(href));

  return (
    <nav className="sticky top-0 z-40 border-b border-cocoa/10 bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:h-20 sm:px-6">
        <Link href="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <Image
            src="/images/logos/vbakelogo.png"
            alt="VBake logo"
            width={56}
            height={56}
            className="h-11 w-11 object-contain sm:h-14 sm:w-14"
            priority
          />
          <span className="font-display text-xl font-semibold text-cocoa sm:text-2xl">VBake.KL</span>
        </Link>

        {/* Desktop Navigation */}
        <div className="hidden items-center gap-8 md:flex">
          {navItems.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`text-sm font-medium transition-colors hover:text-rose ${
                isActive(item.href) ? "text-rose" : "text-cocoa"
              }`}
            >
              {item.name}
            </Link>
          ))}
          <Link href="/order" className="btn-primary px-5 py-2.5 text-sm">
            Order a cake
          </Link>
        </div>

        {/* Mobile Navigation Button */}
        <div className="flex items-center gap-2 md:hidden">
          <Link href="/order" className="btn-primary px-4 py-2 text-sm" onClick={() => setIsOpen(false)}>
            Order
          </Link>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="rounded-full p-2 text-cocoa transition-colors hover:bg-blush"
            aria-label={isOpen ? "Close menu" : "Open menu"}
            aria-expanded={isOpen}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="overflow-hidden border-t border-cocoa/10 bg-cream md:hidden"
          >
            <div className="space-y-1 px-4 py-3">
              {[...navItems, { name: "Order a cake", href: "/order" }].map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`block rounded-xl px-3 py-3 font-medium transition-colors hover:bg-blush ${
                    isActive(item.href) ? "text-rose" : "text-cocoa"
                  }`}
                  onClick={() => setIsOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
