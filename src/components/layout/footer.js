"use client";

import Link from "next/link";
import { Facebook, Instagram, Twitter, Mail, Phone, MapPin, Clock } from "lucide-react";

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
                <Link href="/about" className="text-gray-400 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/cakes" className="text-gray-400 hover:text-white transition-colors">
                  Our Cakes
                </Link>
              </li>
              <li>
                <Link href="/gifts" className="text-gray-400 hover:text-white transition-colors">
                  Gifts
                </Link>
              </li>
              <li>
                <Link href="/flowers" className="text-gray-400 hover:text-white transition-colors">
                  Flowers
                </Link>
              </li>
              <li>
                <Link href="/catering" className="text-gray-400 hover:text-white transition-colors">
                  Catering
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
              <li className="flex items-center space-x-2 text-gray-400">
                <MapPin size={20} />
                <span>Klang Valley, Malaysia</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Phone size={20} />
                <span>+60 12-345 6789</span>
              </li>
              <li className="flex items-center space-x-2 text-gray-400">
                <Mail size={20} />
                <span>info@vbake.com</span>
              </li>
            </ul>

            <div className="flex items-start space-x-4">
              <MapPin className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold">Location</h3>
                <p className="text-gray-600">Sri Petaling, Kuala Lumpur, Malaysia</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <Clock className="w-5 h-5 text-red-500 mt-1" />
              <div>
                <h3 className="font-semibold">Business Hours</h3>
                <div className="text-gray-600">
                  <p>Monday - Sunday: 8:00 AM - 10:00 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Social Links */}
        <div className="mt-8 pt-8 border-t border-gray-800">
          <div className="flex justify-center space-x-6">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Facebook size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Instagram size={24} />
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              <Twitter size={24} />
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