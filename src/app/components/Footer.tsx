"use client";

import React from "react";
import { motion } from "framer-motion";
import {
  Facebook,
  Twitter,
  Instagram,
  MapPin,
  Smartphone,
  Mail,
  MousePointer2,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="relative bg-[#050505] text-white pt-32 pb-12 overflow-hidden">
      {/* Background Pattern - Subtle Grid */}
      <div className="absolute inset-0 opacity-[0.05] pointer-events-none"
        style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '40px 40px' }}
      />

      {/* Decorative Glows */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-taxi-yellow/5 rounded-full -translate-y-1/2 blur-[120px]" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-taxi-yellow/5 rounded-full translate-y-1/2 blur-[120px]" />

      {/* Background Image Overlay */}
      <div
        className="absolute inset-0 opacity-10 grayscale pointer-events-none mix-blend-overlay"
        style={{
          backgroundImage:
            "url(https://images.unsplash.com/photo-1511632765486-a01980e01a18?auto=format&fit=crop&q=80&w=2000)",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/90 to-transparent" />

      <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-24 mb-32">

          {/* About Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="space-y-12 flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div className="relative inline-block">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
                About Go Cab
              </h3>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-20 h-1.5 bg-taxi-yellow rounded-full" />
            </div>

            <p className="text-white/80 text-lg leading-relaxed font-medium max-w-md">
              Go Cab is one of the most trusted cab services in Durgapur,
              providing safe, affordable, and reliable transportation.
              Whether you need local city rides, airport transfers, or
              outstation trips, our professional drivers and well-maintained
              vehicles ensure a smooth and comfortable journey every time.
            </p>

            <div className="flex items-center gap-5">
              {[
                { icon: Facebook, href: "#" },
                { icon: Twitter, href: "#" },
                { icon: Instagram, href: "#" }
              ].map((social, i) => (
                <motion.a
                  key={i}
                  href={social.href}
                  whileHover={{ y: -5, scale: 1.1 }}
                  className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-taxi-yellow hover:border-taxi-yellow hover:bg-white/10 transition-all duration-300 shadow-lg"
                >
                  <social.icon size={20} />
                </motion.a>
              ))}
            </div>
          </motion.div>

          {/* Services Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="space-y-12 flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div className="relative inline-block">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
                Our Services
              </h3>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-20 h-1.5 bg-taxi-yellow rounded-full" />
            </div>

            <ul className="space-y-5 w-full">
              {[
                "Local City Rides",
                "Airport Transfers",
                "Railway Station Pickup & Drop",
                "Outstation Trips",
                "Hourly Rental Packages"
              ].map((service, i) => (
                <li key={i} className="flex items-center justify-center md:justify-start gap-3 text-white/90 font-bold text-lg group cursor-default">
                  <div className="w-2 h-2 rounded-full bg-taxi-yellow group-hover:scale-150 transition-transform" />
                  {service}
                </li>
              ))}
            </ul>

            <p className="text-white/60 text-base leading-relaxed font-medium italic border-l-2 md:border-l-2 border-taxi-yellow/30 pl-4 text-center md:text-left">
              Available 24/7 across Durgapur and nearby cities with transparent pricing and professional drivers.
            </p>
          </motion.div>

          {/* Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="space-y-12 flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div className="relative inline-block">
              <h3 className="text-3xl font-black uppercase tracking-tighter mb-4">
                Contact Us
              </h3>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 md:left-0 md:translate-x-0 w-20 h-1.5 bg-taxi-yellow rounded-full" />
            </div>

            <ul className="space-y-10 w-full">
              <li className="flex flex-col md:flex-row items-center md:items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-taxi-yellow group-hover:border-taxi-yellow group-hover:bg-white/10 transition-all duration-300">
                  <MapPin size={22} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Location</p>
                  <span className="text-white text-lg font-bold">Durgapur, West Bengal, India</span>
                </div>
              </li>

              <li className="flex flex-col md:flex-row items-center md:items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-taxi-yellow group-hover:border-taxi-yellow group-hover:bg-white/10 transition-all duration-300">
                  <Smartphone size={22} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Phone</p>
                  <a href="tel:+919568856576" className="text-white text-lg font-bold hover:text-taxi-yellow transition-colors">
                    +91 9568856576
                  </a>
                </div>
              </li>

              <li className="flex flex-col md:flex-row items-center md:items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-taxi-yellow group-hover:border-taxi-yellow group-hover:bg-white/10 transition-all duration-300">
                  <Mail size={22} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Email</p>
                  <a href="mailto:info@gocabdurgapur.com" className="text-white text-lg font-bold hover:text-taxi-yellow transition-colors">
                    info@gocabdurgapur.com
                  </a>
                </div>
              </li>

              <li className="flex flex-col md:flex-row items-center md:items-start gap-6 group">
                <div className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-taxi-yellow group-hover:border-taxi-yellow group-hover:bg-white/10 transition-all duration-300">
                  <MousePointer2 size={22} />
                </div>
                <div className="space-y-1">
                  <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40">Website</p>
                  <span className="text-white text-lg font-bold">www.gocabdurgapur.com</span>
                </div>
              </li>
            </ul>
          </motion.div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row items-center justify-center md:justify-between gap-6 text-center md:text-left">

          <p className="text-white/40 text-xs font-bold uppercase tracking-[0.3em]">
            © {new Date().getFullYear()} GO CAB DURGAPUR. ALL RIGHTS RESERVED.
          </p>

          <div className="flex items-center justify-center gap-8">
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-taxi-yellow transition-colors"
            >
              Privacy Policy
            </a>
            <a
              href="#"
              className="text-[10px] font-black uppercase tracking-widest text-white/30 hover:text-taxi-yellow transition-colors"
            >
              Terms of Service
            </a>
          </div>

        </div>
      </div>
    </footer>
  );
};
