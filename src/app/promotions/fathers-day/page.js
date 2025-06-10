"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock, Gift, Play } from "lucide-react";
import { useState, useEffect } from "react";
import { trackEvent, trackViewContent } from "@/utils/analytics";

export default function FathersDayPage() {
  const [selectedBundle, setSelectedBundle] = useState("Luxury Bundle");

  useEffect(() => {
    // Track page view with standard parameters
    trackViewContent(158, 'MYR', {
      content_name: "Father's Day Promotion",
      content_category: "Promotion",
      content_type: "Bundle",
      content_ids: ["fathers-day-2025"]
    });
  }, []);

  const handleOrder = () => {
    if (!selectedBundle) {
      alert("Please select a bundle first");
      return;
    }

    const bundleDetails = {
      "Delicious Bundle": {
        price: "RM 128",
        items: [
          "6 inch Deluxe Dubai Chocolate cake",
          "Message Card (Worth RM5)",
          "Fireworks Candle (Worth RM10)"
        ]
      },
      "Luxury Bundle": {
        price: "RM 158",
        items: [
          "6 inch Deluxe Dubai Chocolate cake",
          "Message Card (Worth RM5)",
          "Fireworks Candle (Worth RM10)",
          "Pop-up Balloon gadget with Strings of Money (Worth RM55)"
        ]
      },
      "Royal Bundle": {
        price: "RM 198",
        items: [
          "6 inch Deluxe Dubai Chocolate cake",
          "Message Card (Worth RM5)",
          "Fireworks Candle (Worth RM10)",
          "12 Mini Fruit Tarts + 13 Mini Chocolate Tarts (Worth RM110)"
        ]
      }
    };

    const bundle = bundleDetails[selectedBundle];
    const message = `Hi, I would like to order the ${selectedBundle} for Father's Day.\n\nPrice: ${bundle.price}\n\nIncluded items:\n${bundle.items.join('\n')}`;
    const whatsappUrl = `https://wa.me/60149308327?text=${encodeURIComponent(message)}`;
    
    // Track the order event with standard parameters
    trackEvent('InitiateCheckout', {
      content_name: selectedBundle,
      content_category: "Father's Day Bundle",
      content_type: "Bundle",
      content_ids: [`fathers-day-${selectedBundle.toLowerCase().replace(/\s+/g, '-')}`],
      value: parseInt(bundle.price.replace(/[^0-9]/g, '')),
      currency: 'MYR'
    });
    
    window.open(whatsappUrl, '_blank');
  };

  const handleBundleSelect = (bundle) => {
    setSelectedBundle(bundle);
    // Track bundle selection with standard parameters
    trackEvent('ViewContent', {
      content_name: bundle,
      content_category: "Father's Day Bundle",
      content_type: "Bundle",
      content_ids: [`fathers-day-${bundle.toLowerCase().replace(/\s+/g, '-')}`]
    });
  };

  return (
    <div className="bg-pink-50">
      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Featured Video Section */}
        <div className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            

            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative w-full max-w-[400px] mx-auto aspect-[9/16] rounded-xl overflow-hidden shadow-2xl"
            >
              <video
                src="https://res.cloudinary.com/xiaomiao/video/upload/v1749462016/fathers-day-2025-video_lqiixm.mp4"
                className="w-full h-full object-contain"
                controls
                poster="/images/promotions/fathers-day-4.png"
              />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="space-y-6"
            >
              <h2 className="text-4xl font-bold text-gray-900">Be the Magic for Dad This Father's Day</h2>
              <p className="text-lg text-gray-600">
                Remember when Dad always had "magic" — pulling out pocket money like it was no big deal?
                Now it's our turn to surprise him.
              </p>
              <h3 className="text-2xl font-bold text-gray-900">A Taste of Luxury</h3>
              <p className="text-lg text-gray-600">
                Treat him to something truly indulgent — a rich, handcrafted chocolate pistachio cake fit for royalty.
              </p>
              <h3 className="text-2xl font-bold text-gray-900">Let Him Be King for a Day</h3>
              <p className="text-lg text-gray-600">
                This Father's Day, celebrate the man who's always been your hero — with a cake he'll never forget.
              </p>
              <div className="flex items-center space-x-4">
                <button
                  onClick={handleOrder}
                  className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-xl text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                >
                  Order Now
                </button>
                <span className="text-sm text-gray-500">Limited time offer</span>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Additional Image Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mb-20 w-full"
        >
          <div className="w-full">
            <img
              src="/images/promotions/fathers-day-1.jpg"
              alt="Father's Day Special"
              className="w-full h-auto object-cover"
            />
          </div>
        </motion.div>

        

        {/* Pricing Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="bg-white rounded-xl shadow-lg p-8 mb-16"
        >
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-8">Special Father&apos;s Day Bundle</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div 
              className={`text-center p-6 border rounded-lg cursor-pointer transition-all duration-200 ${selectedBundle === "Delicious Bundle" ? 'border-red-500 shadow-lg' : 'border-gray-200 hover:border-red-300'}`}
              onClick={() => handleBundleSelect("Delicious Bundle")}
            >
              <div className="flex items-center justify-center mb-4">
                <input
                  type="radio"
                  name="bundle"
                  value="Delicious Bundle"
                  checked={selectedBundle === "Delicious Bundle"}
                  onChange={(e) => setSelectedBundle(e.target.value)}
                  className="w-5 h-5 text-red-500"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Delicious Bundle</h3>
              <h3 className="text-md font-semibold text-gray-900 mb-2">Simply Delicious</h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <p className="text-3xl font-bold text-red-600">RM 128</p>
                <p className="text-lg text-gray-500 line-through decoration-2">RM 160</p>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>6 inch Deluxe Dubai Chocolate cake</li>
                <li>Message Card (Worth RM5)</li>
                <li>Fireworks Candle (Worth RM10)</li>
              </ul>
              <div className="mt-6">
                <img
                  src="/images/promotions/fathers-day-7.jpg"
                  alt="Delicious Bundle"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <div 
              className={`text-center p-6 border rounded-lg relative cursor-pointer transition-all duration-200 ${
                selectedBundle === "Luxury Bundle" 
                ? 'border-red-500 shadow-lg ring-4 ring-red-200' 
                : 'border-gray-200 hover:border-red-300'
              }`}
              onClick={() => handleBundleSelect("Luxury Bundle")}
            >
              <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-red-500 text-white px-4 py-1 rounded-full text-sm">
                Best Value
              </div>
              <div className="flex items-center justify-center mb-4">
                <input
                  type="radio"
                  name="bundle"
                  value="Luxury Bundle"
                  checked={selectedBundle === "Luxury Bundle"}
                  onChange={(e) => setSelectedBundle(e.target.value)}
                  className="w-5 h-5 text-red-500"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Luxury Bundle</h3>
              <h3 className="text-md font-semibold text-gray-900 mb-2">A Touch of Luxury</h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <p className="text-3xl font-bold text-red-600">RM 158</p>
                <p className="text-lg text-gray-500 line-through decoration-2">RM 215</p>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>6 inch Deluxe Dubai Chocolate cake</li>
                <li>Message Card (Worth RM5)</li>
                <li>Fireworks Candle (Worth RM10)</li>
                <li>Pop-up Balloon gadget with Strings of Money (Worth RM55)</li>
              </ul>
              <div className="mt-6">
                <img
                  src="/images/promotions/fathers-day-2.jpg"
                  alt="Luxury Bundle"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
            <div 
              className={`text-center p-6 border rounded-lg cursor-pointer transition-all duration-200 ${selectedBundle === "Royal Bundle" ? 'border-red-500 shadow-lg' : 'border-gray-200 hover:border-red-300'}`}
              onClick={() => handleBundleSelect("Royal Bundle")}
            >
              <div className="flex items-center justify-center mb-4">
                <input
                  type="radio"
                  name="bundle"
                  value="Royal Bundle"
                  checked={selectedBundle === "Royal Bundle"}
                  onChange={(e) => setSelectedBundle(e.target.value)}
                  className="w-5 h-5 text-red-500"
                />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">Royal Bundle</h3>
              <h3 className="text-md font-semibold text-gray-900 mb-2">Fit for a King</h3>
              <div className="flex items-center justify-center space-x-2 mb-4">
                <p className="text-3xl font-bold text-red-600">RM 198</p>
                <p className="text-lg text-gray-500 line-through decoration-2">RM 270</p>
              </div>
              <ul className="text-gray-600 space-y-2">
                <li>6 inch Deluxe Dubai Chocolate cake</li>
                <li>Message Card (Worth RM5)</li>
                <li>Fireworks Candle (Worth RM10)</li>
                <li>12 Mini Fruit Tarts + 13 Mini Chocolate Tarts (Worth RM110)</li>
              </ul>
              <div className="mt-6">
                <img
                  src="/images/promotions/fathers-day-3.jpg"
                  alt="Royal Bundle"
                  className="w-full h-auto rounded-lg"
                />
              </div>
            </div>
          </div>
        </motion.div>

        {/* CTA Section */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="text-center mb-20"
        >
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Make Your Father&apos;s Day Special</h2>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Order now to ensure your father receives a delicious, custom-made cake on his special day.
            Limited slots available!
          </p>
          <button
            onClick={handleOrder}
            className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-lg font-medium rounded-xl text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
          >
            Order Now
          </button>
        </motion.div>
      </div>
    </div>
  );
} 