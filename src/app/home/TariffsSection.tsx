"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

interface Tariff {
  id: string;
  title: string;
  description: string;
  price: string;
  image: string;
  isFeatured?: boolean;
}

const tariffs: Tariff[] = [
  {
    id: "economy",
    title: "ECONOMY CLASS",
    description: "Quisque sollicitudin feugiat risus, eu posuere ex euismod eu. Phasellus hendrerit, massa efficitur.",
    price: "$1,5/MI",
    image: "/images/hero-taxi1.webp",
  },
  {
    id: "standard",
    title: "STANDARD CLASS",
    description: "Quisque sollicitudin feugiat risus, eu posuere ex euismod eu. Phasellus hendrerit, massa efficitur.",
    price: "$1,5/MI",
    image: "/images/hero-taxi1.webp",
    isFeatured: true,
  },
  {
    id: "business",
    title: "BUSINESS CLASS",
    description: "Quisque sollicitudin feugiat risus, eu posuere ex euismod eu. Phasellus hendrerit, massa efficitur.",
    price: "$1,5/MI",
    image: "/images/hero-taxi1.webp",
  }
];

export const TariffsSection = () => {
  return (
    <section className="bg-white py-24 px-4 overflow-hidden">
      <div className="max-w-[1400px] mx-auto">
        {/* Section Header */}
        <div className="text-center mb-24">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#facc15] font-black text-lg md:text-xl lg:text-2xl tracking-[0.4em] uppercase block"
          >
            Our
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-black font-black text-5xl md:text-6xl uppercase tracking-tight mt-1"
          >
            Tariffs
          </motion.h2>
        </div>

        {/* Tariffs Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-y-40 md:gap-y-0 md:gap-x-0 items-stretch pt-32">
          {tariffs.map((tariff, index) => (
            <motion.div
              key={tariff.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className={`relative flex flex-col items-center text-center px-10 pb-16 pt-48 transition-all duration-500 ${
                tariff.isFeatured 
                  ? "bg-[#facc15] z-10 shadow-2xl md:scale-110" 
                  : "bg-neutral-50"
              }`}
            >
              {/* Protruding Car Image */}
              <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-full max-w-[420px] px-6">
                <img 
                  src={tariff.image} 
                  alt={tariff.title}
                  className="w-full h-auto drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
              </div>

              {/* Content */}
              <h3 className="text-black font-black text-2xl md:text-3xl uppercase tracking-tight mb-6">
                {tariff.title}
              </h3>
              <p className={`text-base md:text-lg leading-relaxed mb-10 max-w-sm ${
                tariff.isFeatured ? "text-black/70" : "text-neutral-500"
              }`}>
                {tariff.description}
              </p>

              {/* Price */}
              <div className={`text-5xl md:text-6xl font-black mb-12 ${
                tariff.isFeatured ? "text-black" : "text-[#facc15]"
              }`}>
                {tariff.price}
              </div>

              {/* Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`px-12 py-4 rounded-sm font-black text-sm uppercase tracking-[0.2em] shadow-lg transition-colors ${
                  tariff.isFeatured 
                    ? "bg-black text-white hover:bg-neutral-800" 
                    : "bg-[#facc15] text-black hover:bg-yellow-400"
                }`}
              >
                Read More
              </motion.button>

              {/* Featured Badge (Star) */}
              {tariff.isFeatured && (
                <div className="absolute bottom-0 right-0 w-16 h-16 bg-black flex items-center justify-center" style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}>
                  <Star className="w-5 h-5 text-[#facc15] absolute bottom-2 right-2 fill-current" />
                </div>
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
