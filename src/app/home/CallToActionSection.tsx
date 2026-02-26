"use client";

import React from "react";
import { motion } from "framer-motion";

export const CallToActionSection = () => {
  return (
    <section className="bg-[#facc15] py-20 px-4">
      <div className="max-w-5xl mx-auto text-center">
        {/* Main Heading */}
        <motion.h3
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-black font-black text-2xl md:text-4xl uppercase tracking-wide mb-4"
        >
          Travel Smart. Travel Safe. Travel with Go Cab.
        </motion.h3>

        {/* Sub Heading */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-black font-semibold text-lg md:text-2xl tracking-wide mb-10"
        >
          Durgapur’s Most Trusted Cab Service with 5 Star Rating.
        </motion.p>

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
          onClick={() => {
            document.getElementById("booking")?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }}
          className="bg-black text-[#facc15] px-10 py-4 rounded-xl font-black text-sm md:text-base uppercase tracking-[0.2em] shadow-xl hover:bg-neutral-800 transition-colors"
        >
          Reserve Your Ride
        </motion.button>
      </div>
    </section>
  );
};