"use client";
import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { gifts } from "@/data/gifts";
import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function Gifts() {
  return (
    <div className="bg-pink-50 min-h-screen p-3 sm:p-6">
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-6 sm:py-10 bg-gradient-to-r from-pink-200 to-red-200"
      >
        <h1 className="text-4xl sm:text-5xl font-bold text-gray-800">Gifts</h1>
        <p className="text-base sm:text-lg text-gray-600 mt-2 sm:mt-4">
          Thoughtful gift collections for every occasion
        </p>
      </motion.div>

      <div className="max-w-7xl mx-auto mt-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {gifts.map((gift, index) => (
            <motion.div
              key={gift.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className="relative aspect-square">
                <Image
                  src={gift.img}
                  alt={gift.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-gray-800">{gift.name}</h3>
                <p className="text-gray-600 mt-2">{gift.description}</p>
                <div className="mt-4">
                  <p className="text-lg font-semibold text-red-600">{gift.price}</p>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {gift.occasions.map((occasion) => (
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
                  <h4 className="font-medium text-gray-800">Contents:</h4>
                  <ul className="mt-2 space-y-1">
                    {gift.contents.map((item) => (
                      <li key={item} className="text-gray-600 text-sm">
                        • {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <div className="mt-4">
                  <Link href={`/order?productType=gifts&productId=${gift.id}`}>
                    <Button className="w-full bg-red-500 text-white hover:bg-red-600">
                      Order Now
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 text-center">
          <h2 className="text-2xl font-semibold text-gray-800">Need a Custom Gift?</h2>
          <p className="mt-4 text-gray-600">
            Contact us to create a personalized gift collection tailored to your needs.
          </p>
          <div className="mt-8 text-center">
            <Link href="/order?productType=gifts">
              <Button className="bg-red-500 text-white hover:bg-red-600">
                Order Custom Gift
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 