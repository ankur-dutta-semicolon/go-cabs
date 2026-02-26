"use client";

import Image from "next/image";

export default function HeroSection() {
  return (
    <section className="w-full">
      <div className="relative isolate overflow-hidden">
        {/* Hero Height */}
        <div className="relative h-[620px] sm:h-[700px] lg:h-screen bg-yellow-400">
          {/* ================= BLACK PART ================= */}
          <div className="absolute inset-x-0 top-0 h-[52%] lg:h-[80vh] bg-neutral-950" />

          {/* Background image (black only) */}
          <div
            className="absolute inset-x-0 top-0 h-[52%] lg:h-[80vh] opacity-40 grayscale"
            style={{
              backgroundImage: "url(/images/hero-bg.webp)",
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
          />

          {/* Overlay */}
          {/* <div className="absolute inset-x-0 top-0 h-[52%] lg:h-[62%] bg-black/50" /> */}

          {/* ================= YELLOW PART (mobile reduced) ================= */}
          <div className="absolute inset-x-0 top-[52%] h-[38%] sm:h-[42%] lg:top-[80vh] lg:h-[20vh] bg-yellow-400" />

          {/* ================= TEXT ================= */}
          <div className="relative z-20 mx-auto max-w-7xl px-6 pt-24 lg:pt-32 text-center">
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-tight">
              Need a Cab in Durgapur<span className="whitespace-nowrap">?</span>
            </h1>

            <p className="mt-4 text-lg sm:text-xl lg:text-2xl font-semibold text-yellow-400">
              Book Your Ride with Go Cab – Anytime. Anywhere.
            </p>

            <p className="mt-3 text-base sm:text-lg lg:text-xl tracking-wide text-white/80">
              Best Cab Services in Durgapur & Nearby Areas
            </p>
          </div>

          {/* ================= TAXI ================= */}
          <div className="pointer-events-none absolute inset-x-0 top-[52%] lg:top-[80vh] z-30 -translate-y-[35%] sm:-translate-y-[45%] lg:-translate-y-[60%]">
            <div className="mx-auto w-[96%] max-w-6xl">
              <div className="relative aspect-[16/8] w-full">
                <Image
                  src="/images/hero-cab-image.png"
                  alt="Taxi"
                  fill
                  priority
                  className="object-contain "
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}