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
    <section className="relative bg-[#facc15] py-32 px-6 overflow-hidden">
      {/* Background Pattern - Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }} 
      />
      
      {/* Decorative Elements */}
      <div className="absolute top-0 left-0 w-64 h-64 bg-black/5 rounded-full -translate-x-1/2 -translate-y-1/2 blur-3xl" />
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-black/5 rounded-full translate-x-1/3 translate-y-1/3 blur-3xl" />

      <div className="relative z-10 max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-block px-4 py-1.5 bg-black text-[#facc15] text-[10px] font-black tracking-[0.3em] uppercase rounded-full mb-6"
          >
            How it works
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-black font-black text-5xl md:text-7xl uppercase tracking-tighter mb-6 leading-[0.9]"
          >
            Get Booking In <br className="hidden md:block" />
            <span className="inline-block bg-black text-[#facc15] px-6 py-2 mt-2 rounded-xl transform -rotate-1">
              3 Simple Steps
            </span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="text-black font-bold text-xl md:text-2xl max-w-2xl mx-auto leading-tight"
          >
            Fast, secure, and hassle-free rides with Go Cab
          </motion.p>
        </div>

        {/* Steps Grid */}
        <div className="relative grid grid-cols-1 md:grid-cols-3 gap-12 lg:gap-20">
          {/* Connecting Line (Desktop) */}
          <div className="hidden md:block absolute top-24 left-[15%] right-[15%] h-0.5 border-t-2 border-dashed border-black/10 -z-0" />

          {steps.map((step, index) => (
            <motion.div
              key={step.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="relative flex flex-col items-center text-center group"
            >
              {/* Icon Container with Layered Effect */}
              <div className="relative mb-12 z-10">
                <motion.div 
                  whileHover={{ scale: 1.05, rotate: 5 }}
                  className="w-40 h-40 rounded-[2.5rem] bg-black flex items-center justify-center shadow-2xl relative overflow-hidden group-hover:shadow-black/20 transition-all duration-500"
                >
                  {/* Inner Glow */}
                  <div className="absolute inset-0 bg-gradient-to-br from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
                  <step.icon className="w-16 h-16 text-[#facc15] relative z-10" />
                </motion.div>
                
                {/* Number Badge - Floating Style */}
                <div className="absolute -top-4 -right-4 w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-black text-xl font-black shadow-xl border-4 border-[#facc15] transform rotate-12 group-hover:rotate-0 transition-transform duration-500">
                  {step.id}
                </div>
              </div>

              {/* Content with Better Hierarchy */}
              <div className="space-y-4">
                <h3 className="text-black font-black text-3xl uppercase tracking-tight leading-none">
                  {step.title}
                </h3>
                <div className="w-12 h-1 bg-black mx-auto rounded-full opacity-20 group-hover:w-24 group-hover:opacity-100 transition-all duration-500" />
                <p className="text-black/70 text-lg leading-relaxed max-w-sm font-bold px-4">
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
