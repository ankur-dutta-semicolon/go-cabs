"use client";

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

type CarType = "HATCHBACK" | "SEDAN" | "SUV" | "7 SEATER" | "PREMIUM";

interface CarData {
  id: CarType;
  image: string;
  description: string;
}

const fleetData: CarData[] = [
  {
    id: "HATCHBACK",
    image: "/images/hatchback.webp",
    description: "Standard family size HATCHBACK car can accommodate 4 passengers and 2 cases"
  },
  {
    id: "SEDAN",
    image: "/images/sedan.webp",
    description: "Ideal for extra luggage, can accommodate 4 passengers and 4 cases"
  },
  {
    id: "SUV",
    image: "/images/suv.webp",
    description: "Perfect for larger groups, can accommodate 6 passengers and 4 cases"
  },
  {
    id: "7 SEATER",
    image: "/images/7-seater.webp",
    description: "Maximum capacity for groups, can accommodate 8 passengers and 6 cases"
  },
  {
    id: "PREMIUM",
    image: "/images/premium.webp",
    description: "Premium travel experience, can accommodate 3 passengers and 2 cases"
  }
];

export const FleetSection = () => {
  const [activeTab, setActiveTab] = useState<CarType>("HATCHBACK");

  const currentCar = fleetData.find(car => car.id === activeTab)!;

  return (
    <section className="bg-white py-20 px-4">
      <div className="max-w-7xl mx-auto">
        {/* Title */}
        <h2 className="text-center text-neutral-500 font-bold text-xl md:text-2xl uppercase tracking-widest mb-12">
          Minicab For Your Daily Essential Travel
        </h2>

        {/* Tabs Container */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-0 mb-16">
          {fleetData.map((car) => {
            const isActive = car.id === activeTab;
            return (
              <button
                key={car.id}
                onClick={() => setActiveTab(car.id)}
                className={`
                  px-6 py-4 text-xs md:text-sm font-black tracking-widest transition-all border
                  ${isActive 
                    ? "bg-black text-taxi-yellow border-black shadow-lg z-10" 
                    : "bg-white text-black border-neutral-200 hover:bg-neutral-50"
                  }
                  first:rounded-l-sm last:rounded-r-sm
                  w-full sm:w-auto
                `}
              >
                {car.id}
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <div className="relative min-h-[300px] md:min-h-[450px] flex flex-col items-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, ease: "easeInOut" }}
              className="w-full flex flex-col items-center"
            >
              {/* Car Image */}
              <div className="relative w-full max-w-4xl aspect-[16/9] mb-8">
                <img
                  src={currentCar.image}
                  alt={currentCar.id}
                  className="w-full h-full object-contain drop-shadow-2xl"
                  referrerPolicy="no-referrer"
                />
                
                {/* Logo/Phone Overlay (Simulating the sticker in the image) */}
                {/* <div className="absolute bottom-[20%] left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-neutral-200 flex items-center gap-4 shadow-lg scale-75 md:scale-100">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                      <div className="w-2 h-2 bg-taxi-yellow rounded-full" />
                    </div>
                    <span className="text-[10px] font-black tracking-tighter text-black">minicabs</span>
                  </div>
                  <div className="h-4 w-[1px] bg-neutral-300" />
                  <span className="text-[10px] font-black text-black">44 208 204 4444</span>
                </div> */}
              </div>

              {/* Description */}
              <motion.p 
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="text-center text-neutral-500 text-sm md:text-base max-w-2xl leading-relaxed"
              >
                {currentCar.description}
              </motion.p>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};