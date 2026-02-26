"use client";

import React from "react";
import { motion } from "framer-motion";
import { MapPin, Hourglass, IndianRupee, Navigation, PhoneCall } from "lucide-react";

export const FeaturesSection = () => {
  const features = [
    {
      icon: <MapPin className="w-6 h-6" />,
      title: "RELIABLE HOME PICKUP & DROP",
      description:
        "Go Cab offers fast and dependable doorstep pickup and drop services across the city. If you’re looking for the best cab services in Durgapur, our punctual drivers and well-maintained vehicles ensure you reach your destination safely and on time — every time.",
    },
    {
      icon: <Hourglass className="w-6 h-6" />,
      title: "QUICK & EASY BOOKING",
      description:
        "Book your ride in minutes with our simple and hassle-free process. Whether you need a local ride, airport transfer, or outstation trip, Go Cab makes travel planning effortless. Experience why we are rated among the best cab services in Durgapur for convenience and reliability.",
    },
    {
      icon: <IndianRupee className="w-6 h-6" />,
      title: "AFFORDABLE & TRANSPARENT PRICING",
      description:
        "No hidden charges, no last-minute surprises. We provide competitive fares with complete pricing transparency. Our affordable rates combined with premium service make Go Cab a preferred choice for customers searching for the best cab services in Durgapur.",
    },
    {
      icon: <Navigation className="w-6 h-6" />,
      title: "ADVANCED GPS TRACKING & SAFETY",
      description:
        "Your safety is our priority. All Go Cab rides are supported with real-time GPS tracking and professional drivers to ensure secure travel. When it comes to safety and comfort, we stand out as one of the best cab services in Durgapur.",
    },
  ];

  return (
    <section className="relative min-h-[600px] flex items-center py-20 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 z-0 bg-cover bg-center bg-fixed"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=2000)",
        }}
      >
        <div className="absolute inset-0 bg-black/80" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 w-full">
        {/* Header */}
        <div className="text-center mb-20">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-[#facc15] font-black text-sm tracking-[0.4em] uppercase"
          >
            Experience the Best Cab Services in Durgapur with Go Cab
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-white font-black text-4xl md:text-6xl uppercase tracking-tight mt-3"
          >
            Your Trusted Partner for the Best Cab Services in Durgapur
          </motion.h2>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-16 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="flex items-start gap-8 group"
            >
              <div className="flex-shrink-0 w-20 h-20 rounded-full bg-[#facc15] flex items-center justify-center text-black shadow-lg group-hover:scale-110 transition-transform duration-300">
                <div className="scale-125">{feature.icon}</div>
              </div>

              <div className="space-y-3">
                <h3 className="text-[#facc15] font-black text-xl md:text-2xl tracking-wider uppercase">
                  {feature.title}
                </h3>
                <p className="text-neutral-200 text-base md:text-lg leading-relaxed max-w-xl">
                  {feature.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Action Button */}
        <div className="flex justify-center">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
    document.getElementById("booking")?.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }}
            className="bg-[#facc15] text-black px-10 py-4 rounded-sm font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-yellow-400 transition-colors inline-flex items-center gap-3"
          >
            <PhoneCall className="w-4 h-4" />
            Book Your Cab Now
          </motion.button>
        </div>
      </div>
    </section>
  );
};