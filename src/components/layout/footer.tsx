/** @jsxImportSource react */
"use client";

import Link from "next/link";
import Image from "next/image";
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";
import { contactInfo } from "@/data/contact";

export default function Footer() {
  return (
    <footer className="bg-cocoa text-cream">
      <div className="mx-auto max-w-6xl px-4 py-12 sm:px-6">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3">
          {/* About Section */}
          <div>
            <div className="mb-4 flex items-center gap-3">
              <span className="rounded-full bg-cream p-1">
                <Image src="/images/logos/vbakelogo.png" alt="" width={40} height={40} className="h-10 w-10" />
              </span>
              <h3 className="text-xl font-semibold">VBake.KL</h3>
            </div>
            <p className="text-cream/70">
              A home bakery in Sri Petaling making custom cakes for birthdays, weddings and every
              celebration in between.
            </p>
            <div className="mt-5 flex gap-3">
              <a
                href="https://facebook.com/VBake.KL"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VBake on Facebook"
                className="rounded-full bg-cream/10 p-2 transition-colors hover:bg-cream/20"
              >
                <Facebook size={20} />
              </a>
              <a
                href="https://instagram.com/vbake.kl"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="VBake on Instagram"
                className="rounded-full bg-cream/10 p-2 transition-colors hover:bg-cream/20"
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Explore</h3>
            <ul className="space-y-2 text-cream/70">
              <li>
                <Link href="/cakes" className="transition-colors hover:text-cream">
                  Our Cakes
                </Link>
              </li>
              <li>
                <Link href="/order" className="transition-colors hover:text-cream">
                  Order a Cake
                </Link>
              </li>
              <li>
                <Link href="/contact" className="transition-colors hover:text-cream">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-lg font-semibold">Visit &amp; Contact</h3>
            <ul className="space-y-3 text-cream/70">
              <li className="flex items-start gap-3">
                <MapPin size={18} className="mt-0.5 shrink-0" />
                <a
                  href={contactInfo.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  {contactInfo.location.address}
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone size={18} className="shrink-0" />
                <a
                  href={contactInfo.phone.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors hover:text-cream"
                >
                  {contactInfo.phone.number} (WhatsApp)
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Mail size={18} className="shrink-0" />
                <a href={`mailto:${contactInfo.email}`} className="transition-colors hover:text-cream">
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Clock size={18} className="mt-0.5 shrink-0" />
                <div>
                  <p>Mon - Sun: {contactInfo.businessHours.weekdays}</p>
                  <p className="text-sm text-cream/50">{contactInfo.businessHours.note}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-10 border-t border-cream/10 pt-6 text-center text-sm text-cream/50">
          <p>
            &copy; {new Date().getFullYear()} VBakeBaker (SSM: {contactInfo.ssm}). All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
