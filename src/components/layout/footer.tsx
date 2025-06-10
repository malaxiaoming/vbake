"use client";

import Link from "next/link";
import { Facebook, Instagram, Mail, Phone, MapPin, Clock } from "lucide-react";
import { contactInfo } from "@/data/contact";

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* About Section */}
          <div>
            <h3 className="text-xl font-bold mb-4">VBake</h3>
            <p className="text-gray-400">
              Creating sweet memories with our custom cakes and bakery delights.
              Perfect for all your special occasions.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-400 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/cakes" className="text-gray-400 hover:text-white transition-colors">
                  Our Cakes
                </Link>
              </li>
              <li>
                <Link href="/order" className="text-gray-400 hover:text-white transition-colors">
                  Custom Order
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-gray-400 hover:text-white transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-4">Contact Us</h3>
            <ul className="space-y-2">
              <li className="flex items-start space-x-2 text-gray-400">
                <MapPin size={20} className="mt-1" />
                <a 
                  href={contactInfo.location.googleMapsUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {contactInfo.location.address}
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={20} />
                <a 
                  href={contactInfo.phone.whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-white transition-colors"
                >
                  {contactInfo.phone.number}
                </a>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={20} />
                <a 
                  href={`mailto:${contactInfo.email}`}
                  className="hover:text-white transition-colors"
                >
                  {contactInfo.email}
                </a>
              </li>
              <li className="flex items-start space-x-2 text-gray-400">
                <Clock size={20} className="mt-1" />
                <div>
                  <p>Monday - Sunday: {contactInfo.businessHours.weekdays}</p>
                  <p className="text-sm text-gray-500 mt-1">{contactInfo.businessHours.note}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex justify-center space-x-6">
            <a 
              href="https://facebook.com/VBake.KL" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Facebook size={24} />
            </a>
            <a 
              href="https://instagram.com/vbake.kl" 
              target="_blank" 
              rel="noopener noreferrer" 
              className="text-gray-400 hover:text-white transition-colors"
            >
              <Instagram size={24} />
            </a>
          </div>
        </div>

        {/* Copyright */}
        <div className="mt-8 text-center text-gray-400">
          <p>&copy; {new Date().getFullYear()} VBake. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
} 