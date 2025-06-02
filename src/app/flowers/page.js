"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { flowers } from "@/data/flowers";

export default function Flowers() {
  return (
    <div className="bg-pink-50 min-h-screen p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-6 sm:py-10 bg-gradient-to-r from-pink-200 to-red-200"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Flowers</h1>
        <p className="text-base sm:text-lg text-gray-600 mt-2 sm:mt-4">
          Beautiful flower arrangements for every occasion
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {flowers.map((flower, index) => (
            <motion.div
              key={flower.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={flower.img}
                  alt={flower.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{flower.name}</h3>
                <p className="text-gray-600 mt-2">{flower.description}</p>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-red-600">{flower.price}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {flower.occasions.map((occasion) => (
                      <span
                        key={occasion}
                        className="px-2 py-1 bg-pink-100 text-pink-800 rounded-full text-sm"
                      >
                        {occasion}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="mt-4">
                  <h4 className="font-medium text-gray-800">Features:</h4>
                  <ul className="mt-2 space-y-1">
                    {flower.features.map((feature) => (
                      <li key={feature} className="text-gray-600 text-sm">
                        • {feature}
                      </li>
                    ))}
                  </ul>
                </div>
                <a
                  href={`https://wa.me/601111283937?text=I&apos;m interested in the ${flower.name}`}
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
          <h2 className="text-2xl font-semibold text-gray-800">Need a Custom Arrangement?</h2>
          <p className="mt-4 text-gray-600">
            Contact us to discuss your specific requirements and create a unique flower arrangement for your special occasion.
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