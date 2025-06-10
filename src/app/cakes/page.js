"use client";
import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { cakes, getAllOccasions, getCakesByOccasion } from "@/data/cakes";
import { useRouter } from "next/navigation";

export default function Cakes() {
  const occasions = getAllOccasions();
  const router = useRouter();

  useEffect(() => {
    // Track page view
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: 'Cakes Catalog',
        content_category: 'Cakes',
        content_type: 'Catalog',
        content_ids: ['cakes-catalog-2025'],
        value: 0,
        currency: 'MYR'
      });
    }
  }, []);

  const handleCakeClick = (cake) => {
    if (typeof window !== 'undefined' && window.fbq) {
      window.fbq('track', 'ViewContent', {
        content_name: cake.name,
        content_category: 'Cake',
        content_type: 'Product',
        content_ids: [`cake-${cake.id}`],
        value: parseInt(cake.sizes["6-inch"].replace(/[^0-9]/g, '')),
        currency: 'MYR'
      });
    }
    router.push(`/order?cakeId=${cake.id}`);
  };

  return (
    <div className="bg-pink-50 min-h-screen p-8">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-10 bg-gradient-to-r from-pink-200 to-red-200 rounded-xl shadow-lg"
      >
        <h1 className="text-5xl font-bold text-gray-800">Our Cakes</h1>
        <p className="text-lg text-gray-600 mt-4">
          Handcrafted with love for every occasion
        </p>
      </motion.div>

      {/* Cake Categories */}
      <div className="py-12 max-w-6xl mx-auto space-y-10">
        {occasions.map((occasion, catIndex) => {
          const occasionCakes = getCakesByOccasion(occasion);
          return (
            <div key={occasion}>
              <h2 className="text-3xl font-semibold text-gray-800 mb-4">
                {occasion}
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {occasionCakes.map((cake, index) => (
                  <motion.div
                    key={cake.id}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      delay: (catIndex + index) * 0.2,
                      duration: 0.5,
                    }}
                    className="bg-white rounded-xl shadow-lg p-4 text-center hover:scale-105 transition-transform"
                  >
                    <div className="relative aspect-[3/2] mb-4">
                      <img
                        src={cake.img}
                        alt={cake.name}
                        className="rounded-xl shadow-md w-full h-full object-cover"
                      />
                    </div>
                    <h2 className="mt-3 text-lg font-semibold">{cake.name}</h2>
                    {/* <p className="text-red-500 font-bold">{cake.sizes["6-inch"]}</p> */}
                    <div className="mt-2 text-sm text-gray-500">
                      {cake.occasions.filter(o => o !== occasion).join(" • ")}
                    </div>
                    <Link href={`/order?cakeId=${cake.id}`} onClick={() => handleCakeClick(cake)}>
                      <Button className="mt-4 bg-red-500 text-white px-6 py-2 rounded-xl hover:bg-red-600 transition-colors">
                        Order Now
                      </Button>
                    </Link>
                  </motion.div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
      {/* Back to Home Button */}
      <div className="text-center mt-8">
        <Link href="/">
          <button className="bg-blue-500 text-white px-6 py-2 rounded-xl shadow-lg hover:bg-blue-600 transition">
            Back to Home
          </button>
        </Link>
      </div>
    </div>
  );
}
