"use client";

import React from "react";
import { motion } from "framer-motion";
import { Users, ShieldCheck, MapPin, Route, IndianRupee, Tag, Package, Car, Clock, CheckCircle, Phone } from "lucide-react";

export const ServicesSection = () => {
  const services = [
    {
      title: "ROUNDTRIP CABS",
      image:
        "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80&w=800",
      description:
        "Enjoy comfortable roundtrip journeys with Go Cab. Whether it’s a family vacation, business travel, or a weekend getaway, our well-maintained vehicles and professional chauffeurs ensure a smooth ride from pickup to drop and back. Travel stress-free with transparent pricing and reliable service.",
      features: [
        { icon: <Users className="w-4 h-4" />, label: "Expert Chauffeurs" },
        { icon: <ShieldCheck className="w-4 h-4" />, label: "Safety Certified" },
        { icon: <MapPin className="w-4 h-4" />, label: "Multiple Stops" },
      ],
    },
    {
      title: "ONEWAY DROPS",
      image:
        "https://images.unsplash.com/photo-1449965408869-eaa3f722e40d?auto=format&fit=crop&q=80&w=800",
      description:
        "Travel smart with Go Cab one-way drop services. Pay only for the distance you travel without worrying about return charges. Perfect for outstation travel, relocations, or single-route trips. Affordable fares, comfortable rides, and timely service guaranteed.",
      features: [
        { icon: <Route className="w-4 h-4" />, label: "Extensive Route Coverage" },
        { icon: <IndianRupee className="w-4 h-4" />, label: "Budget-Friendly Fares" },
        { icon: <Tag className="w-4 h-4" />, label: "Transparent Pricing" },
      ],
    },
    {
      title: "LOCAL RENTALS",
      image:
        "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=800",
      description:
        "Book flexible hourly rental packages with Go Cab for city travel. Ideal for meetings, shopping, events, or personal errands. Choose from customizable packages and enjoy the convenience of having a cab at your disposal.",
      features: [
        { icon: <Package className="w-4 h-4" />, label: "Flexible Packages" },
        { icon: <Car className="w-4 h-4" />, label: "Cab at Your Disposal" },
        { icon: <Clock className="w-4 h-4" />, label: "Multiple Stops" },
      ],
    },
    {
      title: "AIRPORT TRANSFERS",
      image:
        "https://images.unsplash.com/photo-1542296332-2e4473faf563?auto=format&fit=crop&q=80&w=800",
      description:
        "Experience punctual and hassle-free airport transfers with Go Cab. We track your flight timings to ensure on-time pickups and smooth drop-offs. Start or end your journey with comfort and reliability.",
      features: [
        { icon: <CheckCircle className="w-4 h-4" />, label: "On-Time Pickup" },
        { icon: <IndianRupee className="w-4 h-4" />, label: "Affordable Rates" },
        { icon: <Users className="w-4 h-4" />, label: "Professional Drivers" },
      ],
    },
  ];

  return (
    <section className="bg-white py-24 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <motion.span
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="inline-flex items-center justify-center 
           bg-[#facc15] text-black 
           font-black text-lg md:text-xl 
           tracking-[0.15em] uppercase 
           px-7 py-2.5 rounded-lg shadow-lg shadow-yellow-500/30"
          >
            OUR
          </motion.span>

          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-black font-black text-4xl md:text-5xl uppercase tracking-tight mt-3"
          >
            SERVICES
          </motion.h2>
        </div>

        {/* Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.05)] border border-neutral-100 flex flex-col h-full group hover:shadow-2xl transition-all duration-500 relative"
            >
              {/* Service Image */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={service.image}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </div>

              {/* Icon Badge */}
              <div className="absolute top-[175px] right-6 w-12 h-12 bg-[#facc15] rounded-full flex items-center justify-center text-black shadow-xl z-10 border-4 border-white group-hover:scale-110 transition-transform">
                <Car className="w-5 h-5" />
              </div>

              {/* Service Content */}
              <div className="p-6 pt-10 flex flex-col flex-grow">
                <h3 className="text-black font-black text-xl md:text-2xl uppercase tracking-tight mb-4 text-center">
                  {service.title}
                </h3>
                <p className="text-neutral-500 text-sm md:text-base leading-relaxed mb-8 text-center">
                  {service.description}
                </p>

                {/* Features Grid */}
                <div className="mt-auto grid grid-cols-3 gap-6 border-t border-neutral-100 pt-6">
                  {service.features.map((feature, fIndex) => (
                    <div key={fIndex} className="flex flex-col items-center text-center gap-4">

                      {/* Bigger Icon - Black Circle, Yellow Icon */}
                      <div className="w-14 h-14 rounded-full bg-black flex items-center justify-center text-[#facc15] shadow-md transition-transform duration-300 group-hover:scale-110">
                        {React.cloneElement(feature.icon, { className: "w-6 h-6 text-[#facc15]" })}
                      </div>

                      <span className="text-[10px] md:text-[11px] font-semibold text-neutral-600 uppercase leading-tight tracking-wide">
                        {feature.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom Actions */}
        <div className="mt-16 flex flex-col md:flex-row items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => {
              document.getElementById("booking")?.scrollIntoView({
                behavior: "smooth",
                block: "start",
              });
            }}
            className="bg-black text-taxi-yellow px-12 py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-xl hover:bg-neutral-800 transition-colors"
          >
            Book Your Cab
          </motion.button>

          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="bg-white text-black border-2 border-neutral-200 px-12 py-4 rounded-xl font-black text-sm uppercase tracking-[0.2em] shadow-lg hover:border-black transition-all flex items-center gap-3"
          >
            <Phone className="w-4 h-4 text-black" /> 9568856576
          </motion.button>
        </div>
      </div>
    </section>
  );
};