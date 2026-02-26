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
          <div className="relative z-20 mx-auto max-w-6xl px-4 pt-24 lg:pt-32 text-center">
            <p className="text-lg sm:text-xl lg:text-4xl font-bold tracking-[0.05em] text-yellow-400">
              BOOK CAB NOW
            </p>

            <h1 className="mt-2 text-2xl sm:text-4xl lg:text-6xl font-extrabold tracking-tight text-white">
              +123 4567 8900
            </h1>

            <p className="mt-3 text-base sm:text-lg lg:text-xl tracking-[0.2em] sm:tracking-[0.4em] lg:tracking-[1em] text-white/80">
              WWW.GOCABS.COM
            </p>
          </div>

          {/* ================= TAXI ================= */}
          <div className="pointer-events-none absolute inset-x-0 top-[52%] lg:top-[80vh] z-30 -translate-y-1/2 lg:-translate-y-[60%]">
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