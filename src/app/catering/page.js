"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { catering } from "@/data/catering";

export default function Catering() {
  return (
    <div className="bg-pink-50 min-h-screen p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-6 sm:py-10 bg-gradient-to-r from-pink-200 to-red-200"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Catering</h1>
        <p className="text-base sm:text-lg text-gray-600 mt-2 sm:mt-4">
          Delicious food for your special events
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {catering.map((package_, index) => (
            <motion.div
              key={package_.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={package_.img}
                  alt={package_.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{package_.name}</h3>
                <p className="text-gray-600 mt-2">{package_.description}</p>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-red-600">{package_.price}</p>
                  <p className="text-sm text-gray-500 mt-1">
                    Minimum {package_.minGuests} guests, maximum {package_.maxGuests} guests
                  </p>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800">Menu Includes:</h4>
                  <ul className="mt-2 space-y-1">
                    {package_.menu.map((item) => (
                      <li key={item} className="text-gray-600 text-sm">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={`https://wa.me/601111283937?text=I&apos;m interested in the ${package_.name} catering package`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-6 block w-full text-center bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors"
                >
                  Inquire Now
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Need a Custom Menu?</h2>
          <p className="mt-4 text-gray-600">
            Contact us to discuss your specific catering requirements and create a customized menu for your event.
          </p>
          <a
            href="https://wa.me/601111283937"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block mt-6 bg-red-500 text-white px-6 py-3 rounded-xl hover:bg-red-600 transition-colors"
          >
            Contact Us
          </a>
        </div>
      </div>
    </div>
  );
} 