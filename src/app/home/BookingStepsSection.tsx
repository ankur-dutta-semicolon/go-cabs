"use client";

import React from 'react';
import { motion } from 'framer-motion';
import { Edit3, Car, ThumbsUp } from 'lucide-react';

const steps = [
  {
    id: "01",
    title: "Make a Reservation",
    description: "Book your ride with Go Cab in just a few clicks. Booking available from our website. WhatsApp or over the call. Choose your pickup location, destination, date, and preferred vehicle - it’s quick and easy.",
    icon: Edit3,
  },
  {
    id: "02",
    title: "Vehicle Confirmation",
    description: "Receive instant confirmation with all your trip details. Go Cab ensures your driver and vehicle are ready right on time.",
    icon: Car,
  },
  {
    id: "03",
    title: "Enjoy Your Trip",
    description: "Relax and enjoy a safe, comfortable, and smooth journey. With Go Cab, your ride is always reliable and stress-free. (Satisfaction guarantee)",
    icon: ThumbsUp,
  }
];

export const BookingStepsSection = () => {
  return (
    <section className="relative bg-[#facc15] py-20 px-6 overflow-hidden">
      {/* Background Pattern - Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-black/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-3 py-1 bg-black text-[#facc15] text-[16px] font-black tracking-[0.3em] uppercase rounded-full mb-4"
          >
            How it works
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-black font-black text-4xl md:text-5xl uppercase tracking-tighter mb-4 leading-[0.9]"
          >
            Get Booking In <br className="hidden md:block" />
            <span className="inline-block bg-black text-[#facc15] px-4 py-1.5 mt-1 rounded-lg transform -rotate-1 text-3xl md:text-4xl">
              3 Simple Steps
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-black font-bold text-lg md:text-xl max-w-xl mx-auto leading-tight"
          >
            Fast, secure, and hassle-free rides with Go Cab
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-14 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-black/10 -z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon Container with Layered Effect */}
              <div className="relative mb-8 z-10">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-28 h-28 rounded-[2rem] bg-black flex items-center justify-center shadow-xl relative overflow-hidden group-hover:shadow-black/20 transition-all duration-500"
                >
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <step.icon className="w-10 h-10 text-[#facc15] relative z-10" />
                </motion.div>
                
                {/* Number Badge - Floating Style */}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-white rounded-xl flex items-center justify-center text-black text-base font-black shadow-lg border-2 border-[#facc15] transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  {step.id}
                </div>
              </div>

              {/* Content with Better Hierarchy */}
              <div className="space-y-3">
                <h3 className="text-black font-black text-xl uppercase tracking-tight leading-none">
                  {step.title}
                </h3>
                <div className="w-8 h-1 bg-black mx-auto rounded-full opacity-20 group-hover:w-16 group-hover:opacity-100 transition-all duration-500" />
                <p className="text-black/70 text-base leading-relaxed max-w-xs font-bold px-2">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
