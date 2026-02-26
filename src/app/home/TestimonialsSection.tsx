"use client";

import React from 'react';
import { motion } from 'framer-motion';

interface Testimonial {
  id: number;
  name: string;
  role: string;
  content: string;
  avatar: string;
}

const testimonials: Testimonial[] = [
  {
    id: 1,
    name: "JOHN DOE",
    role: "BUSINESS MAN",
    content: "Quisque sollicitudin feugiat risus, eu posuere ex euismod eu. Phasellus hendrerit, massa efficitur. Quisque sollicitudin feugiat risus.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=200"
  },
  {
    id: 2,
    name: "JOHN DOE",
    role: "BUSINESS MAN",
    content: "Quisque sollicitudin feugiat risus, eu posuere ex euismod eu. Phasellus hendrerit, massa efficitur. Quisque sollicitudin feugiat risus.",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&q=80&w=200"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="relative py-24 px-4 overflow-hidden min-h-[600px] flex items-center">
      {/* Background with Faces Grid Pattern */}
      <div 
        className="absolute inset-0 z-0 bg-cover bg-center grayscale opacity-20"
        style={{ 
          backgroundImage: 'url(images/testimonial-bg.webp)',
        }}
      >
        {/* <div className="absolute inset-0 bg-black/90" /> */}
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#facc15] font-black text-sm tracking-[0.4em] uppercase block"
          >
            Happy Client's
          </motion.span>
          <motion.h2 
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white font-black text-5xl md:text-6xl uppercase tracking-tight mt-1"
          >
            Testimonials
          </motion.h2>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 lg:gap-20">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, scale: 0.95, y: 20 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.2 }}
              className="relative"
            >
              {/* Speech Bubble Card */}
              <div className="bg-black/80 backdrop-blur-sm border border-white/5 p-10 md:p-14 rounded-[3rem] shadow-2xl">
                <p className="text-white/90 text-lg md:text-2xl leading-relaxed mb-10 italic font-medium">
                  "{testimonial.content}"
                </p>
                
                {/* User Info */}
                <div className="flex items-center gap-6">
                  <div className="w-16 h-16 md:w-20 md:h-20 rounded-full overflow-hidden border-2 border-[#facc15] shadow-lg">
                    <img 
                      src={testimonial.avatar} 
                      alt={testimonial.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="text-[#facc15] font-black text-xl md:text-3xl tracking-wider">
                      {testimonial.name}
                    </h4>
                    <p className="text-white/50 text-sm md:text-base font-bold uppercase tracking-[0.2em] mt-1">
                      {testimonial.role}
                    </p>
                  </div>
                </div>
              </div>

              {/* Speech Bubble Tail */}
              <div 
                className="absolute -bottom-6 left-20 w-12 h-12 bg-black/80 rotate-45 border-r border-b border-white/5 -z-10"
                style={{ clipPath: 'polygon(100% 0, 100% 100%, 0 100%)' }}
              />
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};
