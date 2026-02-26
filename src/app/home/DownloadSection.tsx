"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Apple, PlayCircle } from 'lucide-react';

export const DownloadSection = () => {
  return (
    <section className="bg-white pt-12 pb-0 px-4 overflow-hidden">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#facc15] font-black text-lg md:text-xl lg:text-2xl tracking-[0.4em] uppercase block"
          >
            Download
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-black font-black text-4xl md:text-5xl uppercase tracking-tight mt-1"
          >
            Best Cab Services
          </motion.h2>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8 flex flex-col items-center text-center lg:items-start lg:text-left"
          >
            <div className="space-y-4">
              <h3 className="text-2xl md:text-3xl font-black text-black leading-tight">
                Download the Cab voucher app free!<br />
                Get Exciting New Offers
              </h3>
              <p className="text-neutral-500 text-base leading-relaxed max-w-lg mx-auto lg:mx-0">
                Quisque sollicitudin feugiat risus, eu posuere ex euismod eu. 
                Phasellus hendrerit, massa efficitur. Download our app today 
                and enjoy seamless booking experiences with exclusive rewards.
              </p>
            </div>

            {/* App Store Buttons */}
            <div className="flex flex-wrap justify-center lg:justify-start gap-4">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-3 shadow-xl hover:bg-neutral-800 transition-colors"
              >
                <div className="text-[#facc15]">
                  <PlayCircle className="w-8 h-8" />
                </div>
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 leading-none">Android App on</p>
                  <p className="text-lg font-black leading-none mt-1">Google play</p>
                </div>
              </motion.button>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="bg-black text-white px-8 py-3 rounded-xl flex items-center gap-3 shadow-xl hover:bg-neutral-800 transition-colors"
              >
                <Apple className="w-8 h-8 text-[#facc15]" />
                <div className="text-left">
                  <p className="text-[10px] font-bold uppercase tracking-wider opacity-60 leading-none">Download on</p>
                  <p className="text-lg font-black leading-none mt-1">App Store</p>
                </div>
              </motion.button>
            </div>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 30, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 0 }}
            viewport={{ once: true }}
            className="relative flex justify-center lg:justify-end"
          >
            <div className="relative w-full max-w-[400px]">
              {/* Phone Mockup Image */}
              <img 
                src="/images/mobile-in-hand.webp" 
                alt="Mobile App"
                className="w-full h-auto "
                referrerPolicy="no-referrer"
              />
              {/* Decorative elements */}
              <div className="absolute -top-10 -right-10 w-32 h-32 bg-[#facc15]/10 rounded-full blur-3xl -z-10" />
              <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-[#facc15]/20 rounded-full blur-3xl -z-10" />
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};
