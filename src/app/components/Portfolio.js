"use client";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const services = [
  {
    title: "Fast",
    image: "/images/image-removebg-preview (33).png",
  },

  {
    title: "Affordable",
    image: "/images/image-removebg-preview (35).png",
  },

  {
    title: "Safe",
    image: "/images/image-removebg-preview (38).png",
  },

  {
    title: "Reliable",
    image: "/images/image-removebg-preview (36).png",
  },

  {
    title: "Clean",
    image: "/images/image-removebg-preview (37).png",
  },
];


export default function Portfolio() {
  return (
    <section className="w-full">
      <div className=" text-center">
        <Swiper
          modules={[Navigation, Pagination, Autoplay]}
          spaceBetween={20}
          slidesPerView={1}
          breakpoints={{
            200: { slidesPerView: 2 },
            550: { slidesPerView: 2 },
            768: { slidesPerView: 3 },
            950: { slidesPerView: 3 },
            1024: { slidesPerView: 4 },
          }}
          autoplay={{ delay: 3000, disableOnInteraction: false }}
          navigation
          pagination={{ clickable: true }}
          className="pb-10"
        >
          {services.map((service, index) => (
            <SwiperSlide key={index}>
              <div className="service-card bg-gray-100 rounded-lg shadow-lg border p-2 border-orange-400">
                <div className="flex justify-center mb-4">
                  <img src={service.image} alt={service.title} className="w-24 h-20 border border-orange-500" />
                </div>
                <h3 className="font-semibold mb-2 text-orange-700">
                  {service.title}
                </h3>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </section>
  );
}