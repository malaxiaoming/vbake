"use client";

import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import { events } from "@/data/events";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

export default function PromoCarousel() {
  return (
    <Swiper
      modules={[Autoplay, Pagination, Navigation]}
      spaceBetween={20}
      slidesPerView={1}
      loop={events.length > 1}
      autoplay={{ delay: 4000 }}
      pagination={{ clickable: true }}
      navigation={true}
      className="overflow-hidden rounded-3xl shadow-[0_2px_20px_rgba(74,46,34,0.10)]"
    >
      {events.map((promo, index) => (
        <SwiperSlide key={promo.img}>
          <div className="relative aspect-[3/2]">
            <Image
              src={promo.img}
              alt={promo.text}
              fill
              sizes="(max-width: 768px) 100vw, 768px"
              className="object-cover"
              priority={index === 0}
            />
          </div>
        </SwiperSlide>
      ))}
    </Swiper>
  );
}
