"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Smile, Clock, Car, ChevronDown } from 'lucide-react';

export const StatsSection = () => {
  const stats = [
    {
      icon: <Smile className="w-6 h-6" />,
      value: "450+",
      label: "HAPPY CUSTOMERS",
      delay: 0.1,
    },
    {
      icon: <Clock className="w-6 h-6" />,
      value: "24/7",
      label: "SERVICE AVAILABILITY",
      delay: 0.2,
    },
    {
      icon: <Car className="w-6 h-6" />,
      value: "8000+",
      label: "RIDES COMPLETED",
      delay: 0.3,
    },
  ];

  return (
    <section className="relative w-full">
      {/* Background Split */}
      <div className="absolute inset-0 flex flex-col pointer-events-none">
        <div className="h-1/2 bg-[#facc15]" />
        <div className="h-1/2 bg-white" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 py-10 sm:py-12">
        {/* Header */}
        <div className="flex items-center justify-center gap-3 sm:gap-4 mb-8 sm:mb-12">
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
          <h3 className="text-black font-black text-[10px] sm:text-xs md:text-sm tracking-[0.28em] sm:tracking-[0.3em] uppercase text-center">
            India's Top Rated Car Rental Service
          </h3>
          <ChevronDown className="w-4 h-4 sm:w-5 sm:h-5 text-black" />
        </div>

        {/* Stats Pill */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-white rounded-[44px] sm:rounded-[70px] lg:rounded-[100px] shadow-[0_30px_60px_rgba(0,0,0,0.12)] px-4 py-10 sm:p-10 lg:p-16"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 gap-y-10 gap-x-2 sm:gap-x-4 md:gap-0 items-stretch">
            {stats.map((s, idx) => (
              <div
                key={s.label}
                className={[
                  "relative",
                  "flex items-center justify-center",
                  // Grid positioning
                  idx === 2 ? "col-span-2 md:col-span-1" : "col-span-1",
                  // desktop alignments
                  idx === 0 ? "md:justify-end md:pr-16" : "",
                  idx === 1 ? "md:justify-center" : "",
                  idx === 2 ? "md:justify-start md:pl-16" : "",
                ].join(" ")}
              >
                <div className="flex flex-col lg:flex-row items-center gap-3 sm:gap-5">
                  <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-full bg-neutral-50 flex items-center justify-center text-black shadow-sm shrink-0">
                    {s.icon}
                  </div>

                  <div className="text-center lg:text-left">
                    <div className="text-xl sm:text-3xl md:text-4xl font-black text-black leading-none tracking-tighter">
                      {s.value}
                    </div>
                    <div className="text-[8px] sm:text-[10px] font-black text-neutral-400 tracking-[0.1em] sm:tracking-[0.2em] mt-1 sm:mt-2">
                      {s.label}
                    </div>
                  </div>
                </div>

                {/* Desktop vertical dividers */}
                {idx < 2 && (
                  <div className="hidden md:block absolute right-0 top-1/2 -translate-y-1/2 w-[1px] bg-neutral-100 h-16" />
                )}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};
