"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Phone } from "lucide-react";

export const HelpSection = () => {
  const tags = [
    "Best Cab Service in Durgapur",
    "Durgapur Airport Taxi",
    "Outstation Cab from Durgapur",
    "Local Cab Booking Durgapur",
    "Durgapur to Kolkata Taxi",
    "Affordable Taxi in Durgapur",
    "24/7 Cab Service Durgapur",
    "Durgapur Railway Station Taxi",
    "Safe & Reliable Cab Durgapur"
  ];

  return (
    <section className="bg-white py-10 px-6">
      <div className="max-w-[1400px] mx-auto text-center">
        {/* Top Label */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex items-center justify-center gap-3 mb-8"
        >
          <div className="flex gap-1.5">
            <div className="w-1.5 h-5 bg-[#facc15] -skew-x-12" />
            <div className="w-1.5 h-5 bg-black -skew-x-12" />
          </div>
          <span className="text-[#facc15] font-black text-sm tracking-[0.4em] uppercase">
            Need Assistance?
          </span>
        </motion.div>

        {/* Main Heading */}
        <motion.h2 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="text-black font-black text-4xl md:text-6xl uppercase tracking-tight mb-10"
        >
          Looking For The Best Cab Service In Durgapur?
        </motion.h2>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="text-neutral-500 text-base md:text-xl leading-relaxed mb-16 max-w-5xl mx-auto"
        >
          Go Cab provides reliable, affordable, and safe taxi services across Durgapur and nearby cities. 
          Whether you need a local city ride, airport transfer, railway station pickup, or an outstation trip, 
          our professional drivers and well-maintained vehicles ensure a smooth travel experience. 
          Available 24/7, we are committed to delivering punctual service with transparent pricing and maximum comfort.
        </motion.p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-black text-white px-10 py-5 rounded-xl font-black text-base flex items-center justify-center gap-4 shadow-xl hover:bg-neutral-800 transition-colors uppercase tracking-widest"
          >
            <MapPin className="w-5 h-5 text-[#facc15]" /> Find Us On Google
          </motion.button>
          
          <motion.a
            href="tel:+919568856576"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="w-full sm:w-auto bg-black text-white px-10 py-5 rounded-xl font-black text-base flex items-center justify-center gap-4 shadow-xl hover:bg-neutral-800 transition-colors uppercase tracking-widest"
          >
            <Phone className="w-5 h-5 text-[#facc15]" /> Call Us @ 9568856576
          </motion.a>
        </div>

        {/* Tags Cloud */}
        <div className="flex flex-wrap justify-center gap-4">
          {tags.map((tag, index) => (
            <motion.div
              key={tag}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="px-6 py-3 border-2 border-neutral-100 rounded-xl text-sm font-black text-neutral-600 hover:border-[#facc15] hover:text-black transition-all cursor-default uppercase tracking-wider"
            >
              {tag}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};