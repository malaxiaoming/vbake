"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Calendar, Clock } from "lucide-react";
import { motion } from "framer-motion";

export default function PromotionsPage() {
  const [activeTab, setActiveTab] = useState("current");

  const promotions = {
    current: [
      {
        id: 1,
        title: "Birthday Cake Special",
        description: "Get 15% off on all birthday cakes when you order 3 days in advance!",
        validUntil: "2024-12-31",
        img: "/images/promotions/birthday-special.jpg",
        terms: [
          "Valid for birthday cakes only",
          "Minimum order of 1kg",
          "Advance booking required",
          "Cannot be combined with other offers"
        ]
      },
      {
        id: 2,
        title: "Weekend Bundle",
        description: "Order any 2 cakes and get a free box of cookies!",
        validUntil: "2024-12-31",
        img: "/images/promotions/weekend-bundle.jpg",
        terms: [
          "Valid on weekends only",
          "Minimum order of 2 cakes",
          "While stocks last",
          "Limited to one free cookie box per order"
        ]
      },
      {
        id: 3,
        title: "Student Discount",
        description: "Show your student ID and get 10% off on all orders!",
        validUntil: "2024-12-31",
        img: "/images/promotions/student-discount.jpg",
        terms: [
          "Valid student ID required",
          "Not applicable on premium cakes",
          "Cannot be combined with other offers",
          "Valid for dine-in and takeaway"
        ]
      }
    ],
    upcoming: [
      {
        id: 4,
        title: "Holiday Season Special",
        description: "Coming soon: Special discounts for the holiday season!",
        startDate: "2024-12-01",
        img: "/images/promotions/holiday-special.jpg",
        terms: [
          "Details coming soon",
          "Stay tuned for more information"
        ]
      },
      {
        id: 5,
        title: "New Year Celebration",
        description: "Ring in the new year with our special celebration cakes!",
        startDate: "2024-12-15",
        img: "/images/promotions/new-year.jpg",
        terms: [
          "Pre-order required",
          "Limited edition designs",
          "Special packaging included",
          "Details to be announced"
        ]
      }
    ]
  };

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 bg-gradient-to-r from-pink-200 to-red-200"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center space-x-4">
            <Link href="/" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-5xl font-bold text-gray-800">Promotions</h1>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Tabs */}
        <div className="border-b border-gray-200 mb-8">
          <nav className="-mb-px flex space-x-8">
            <button
              onClick={() => setActiveTab("current")}
              className={`${
                activeTab === "current"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Current Promotions
            </button>
            <button
              onClick={() => setActiveTab("upcoming")}
              className={`${
                activeTab === "upcoming"
                  ? "border-red-500 text-red-600"
                  : "border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300"
              } whitespace-nowrap py-4 px-1 border-b-2 font-medium text-sm`}
            >
              Upcoming Promotions
            </button>
          </nav>
        </div>

        {/* Promotions Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {promotions[activeTab].map((promo) => (
            <motion.div
              key={promo.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
            >
              <div className="aspect-w-16 aspect-h-9 bg-gray-200">
                <img
                  src={promo.img}
                  alt={promo.title}
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{promo.title}</h3>
                <p className="text-gray-600 mb-4">{promo.description}</p>
                
                <div className="flex items-center space-x-4 text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <Calendar className="w-4 h-4 mr-1" />
                    <span>
                      {activeTab === "current" ? "Valid until" : "Starts"}: {promo.validUntil || promo.startDate}
                    </span>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-4">
                  <h4 className="font-semibold text-gray-900 mb-2">Terms & Conditions:</h4>
                  <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                    {promo.terms.map((term, index) => (
                      <li key={index}>{term}</li>
                    ))}
                  </ul>
                </div>

                {activeTab === "current" && (
                  <div className="mt-6">
                    <Link
                      href="/order"
                      className="inline-flex items-center justify-center px-6 py-3 border border-transparent text-sm font-medium rounded-xl text-white bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
                    >
                      Order Now
                    </Link>
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
} 