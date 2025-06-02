"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import Link from "next/link";
import Image from 'next/image';
import { promotions } from "@/data/promotions";
import { events } from "@/data/events";

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

export default function Home() {
  const [isMounted, setIsMounted] = useState(false);
  const [Swiper, setSwiper] = useState(null);
  const [SwiperSlide, setSwiperSlide] = useState(null);
  const [SwiperModules, setSwiperModules] = useState(null);

  useEffect(() => {
    setIsMounted(true);
    // Dynamically import Swiper components
    import('swiper/react').then((mod) => {
      setSwiper(() => mod.Swiper);
      setSwiperSlide(() => mod.SwiperSlide);
    });
    // Dynamically import Swiper modules
    import('swiper/modules').then((mod) => {
      setSwiperModules({
        Autoplay: mod.Autoplay,
        Pagination: mod.Pagination,
        Navigation: mod.Navigation
      });
    });
  }, []);

  if (!isMounted) {
    return null; // or a loading spinner
  }

  return (
    <div className="bg-pink-50 min-h-screen">
      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-20 bg-gradient-to-r from-pink-200 to-red-200"
      >
        <h1 className="text-5xl font-bold text-gray-800">
          Sweet Delights Bakery
        </h1>
        <p className="text-lg text-gray-600 mt-4">
          More Than Cakes – We Create Sweet Memories
        </p>
        <motion.div whileHover={{ scale: 1.1 }}>
          <Link href="/order">
            <Button className="mt-6 bg-red-500 text-white px-6 py-3 rounded-xl">
              Order Now
            </Button>
          </Link>
        </motion.div>
      </motion.div>

      {/* Promotion Carousel */}
      <div className="max-w-4xl mx-auto mb-10">
        <h2 className="text-2xl font-bold text-center text-gray-800 mb-4">🎉 This Month&apos;s Promotions 🎉</h2>
        {Swiper && SwiperSlide && SwiperModules && (
          <Swiper
            modules={[SwiperModules.Autoplay, SwiperModules.Pagination, SwiperModules.Navigation]}
            spaceBetween={20}
            slidesPerView={1}
            loop={true}
            autoplay={{ delay: 3000 }}
            pagination={{ clickable: true }}
            navigation={true}
            className="rounded-xl shadow-lg"
          >
            {events.map((promo, index) => (
              <SwiperSlide key={index}>
                <div className="relative aspect-[16/9]">
                  <Image
                    src={promo.img}
                    alt={`Promotion ${index + 1}`}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover rounded-xl"
                    priority={index === 0}
                  />
                  <div className="absolute bottom-0 left-0 right-0 text-center bg-black bg-opacity-100 text-white py-2 text-lg font-semibold">
                    {promo.text}
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>

      {/* Product Categories */}
      <div className="py-16 max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
        {[
          { name: "Cakes", img: "/images/cakes.jpg", link: "/cakes" },
          { name: "Gifts", img: "/images/gifts/gifts.jpg", link: "/gifts" },
          { name: "Flowers", img: "/images/flowers/flowers.jpg", link: "/flowers" },
          { name: "Catering", img: "/images/catering/catering.jpg", link: "/catering" },
        ].map((category, index) => (
          <motion.div
            key={category.name}
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.2, duration: 0.5 }}
            className="text-center"
          >
            <Link href={category.link}>
              <Image
                src={category.img}
                alt={category.name}
                width={300}
                height={200}
                className="rounded-xl shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              />
            </Link>
            <h2 className="mt-3 text-lg font-semibold">{category.name}</h2>
          </motion.div>
        ))}
      </div>

      {/* Order & Delivery Section */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="text-center py-12 bg-white"
      >
        <h2 className="text-3xl font-semibold">Order & Delivery</h2>
        <p className="mt-2 text-gray-600">
          Pre-order required | Same-day delivery available
        </p>
        <p className="mt-4 text-sm text-gray-500 italic">
          * Same-day delivery subject to certain cake options. Please contact us for more details.
        </p>
      </motion.div>

      {/* Testimonials */}
      <div className="py-16 bg-gray-100">
        <h2 className="text-center text-3xl font-semibold">
          What Our Customers Say
        </h2>
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto mt-6"
        >
          <p className="text-center text-lg italic">
            &quot;Best cake shop in Klang Valley! The surprise gift delivery was
            perfect!&quot; – Sarah L.
          </p>
        </motion.div>
      </div>

      {/* Contact Section */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-center py-16 bg-pink-100"
      >
        <h2 className="text-3xl font-semibold">Get in Touch</h2>
        <p className="mt-2">📍 Klang Valley, Malaysia | 📞 +60 12-345 6789</p>
      </motion.div>
    </div>
  );
}
