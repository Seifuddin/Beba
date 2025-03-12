"use client";
import Link from "next/link";
import Image from 'next/image';
import { motion } from 'framer-motion';
import Portfolio from './Portfolio';

// components/Hero.js
export default function Hero() {
  return (
    <section className="overflow mx-auto w-full relative bg-gray-800 text-white pt-24 md:pt-30">
      <div className=" inset-0 bg-cover bg-center bg-opacity-50">
        <Image
          src="/images/images.jpg"
          alt="Hero Image"
          layout="fill"
          objectFit="cover"
          className="opacity-30"
        />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 lg:grid-cols-2 p-5">
      <div  className="service-card relative">
      <motion.h2
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1, ease: "easeOut" }}
        className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4 text-orange-500"
      >
        Introducing Beba Ride: Your Ultimate Ride Experience
      </motion.h2>
        <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-4">
          
        </h1>
        <motion.p
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
         className="text-lg sm:text-xl mb-6">
          Premium rides for every journey. Experience comfort, safety and convenience like never before. Travel stress-free with professional drivers and reliable service. Book your ride now!
        </motion.p>

          <Link
  href="../book"
  className="bg-blue-600 text-white px-6 p-2 rounded-md text-lg font-semibold hover:bg-orange-600 transition-all duration-300"
>
  Book a Ride
</Link>

<Link
  href="/login"
  className="bg-orange-700 mx-2 text-white px-6 p-2 rounded-md text-lg font-semibold hover:bg-orange-600 transition-all duration-300"
>
  Login
</Link>

          <div className='flex relative mt-5 gap-1'>
            <Portfolio />
        </div>
        
        

        </div>
        

        <div className="service-card relative rounded-md mt-5 p-3">
        <img
                src="/images/image-removebg-preview (31).png" // Example icon image
                alt="Brand Identity Icon"
                className="w-full"
              />
        </div>
      </div>

    </section>
  );
}