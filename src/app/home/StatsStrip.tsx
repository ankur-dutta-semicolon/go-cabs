import React from "react";

export default function StatsSplitSection() {
  return (
    <section className="w-full">
      {/* Background split: top yellow, bottom white */}
      <div className="relative">
        {/* Match reference proportions */}
        <div className="h-32 bg-yellow-400" />
        <div className="h-28 bg-white" />

        {/* Content overlay */}
        <div className="absolute inset-0 flex items-start justify-center">
          <div className="w-full max-w-6xl px-4 pt-8">
            {/* Top line with laurels */}
            <div className="flex items-center justify-center gap-4">
              <Laurel />
              <p className="text-center text-sm font-extrabold tracking-[0.18em] text-black">
                INDIA&apos;S TOP RATED CAR RENTAL SERVICE
              </p>
              <Laurel className="scale-x-[-1]" />
            </div>

            {/* Stats pill */}
            <div className="mt-6 flex justify-center">
              <div className="w-full max-w-4xl rounded-full bg-white px-10 py-7 shadow-[0_18px_35px_rgba(0,0,0,0.15)]">
                <div className="grid grid-cols-1 items-center text-center sm:grid-cols-3">
                  <StatStack
                    icon={<SmileIcon />}
                    value="450+"
                    label="HAPPY CUSTOMERS"
                  />

                  <Divider />

                  <StatStack
                    icon={<CarIcon />}
                    value="8000+"
                    label="RIDES COMPLETED"
                  />

                  <Divider className="sm:hidden" />

                  <StatStack
                    icon={<ClockIcon />}
                    value="24/7"
                    label="SERVICE AVAILABILITY"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* extra bottom spacing so pill doesn't clip */}
        <div className="h-16 bg-white" />
      </div>
    </section>
  );
}

function Divider({ className = "" }: { className?: string }) {
  return (
    <div className={`hidden sm:flex items-center justify-center ${className}`}>
      <span className="h-12 w-[1px] bg-neutral-200" />
    </div>
  );
}

function StatStack({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center justify-center gap-2 py-2">
      {/* Icon circle (light gray) */}
      <div className="flex h-11 w-11 items-center justify-center rounded-full bg-neutral-100 text-black">
        {icon}
      </div>

      {/* Number */}
      <div className="text-2xl font-extrabold text-black">{value}</div>

      {/* Label */}
      <div className="text-[11px] font-extrabold tracking-widest text-black/70">
        {label}
      </div>
    </div>
  );
}

/* ---------- Icons (no libs) ---------- */

function SmileIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M8 14c1 2 3 3 4 3s3-1 4-3"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M9 10h.01M15 10h.01"
        stroke="currentColor"
        strokeWidth="3"
        strokeLinecap="round"
      />
    </svg>
  );
}

function CarIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 13l2-6a2 2 0 0 1 2-1h10a2 2 0 0 1 2 1l2 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M5 13h14v5a1 1 0 0 1-1 1h-1"
        stroke="currentColor"
        strokeWidth="2"
      />
      <path
        d="M5 19H4a1 1 0 0 1-1-1v-5"
        stroke="currentColor"
        strokeWidth="2"
      />
      <circle cx="7.5" cy="19" r="1.5" fill="currentColor" />
      <circle cx="16.5" cy="19" r="1.5" fill="currentColor" />
    </svg>
  );
}

function ClockIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
      <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2" />
      <path
        d="M12 7v6l4 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
}

/* Laurel icon to match reference */
function Laurel({ className = "" }: { className?: string }) {
  return (
    <span className={className}>
      <svg width="26" height="18" viewBox="0 0 26 18" fill="none">
        <path
          d="M14 16c-4-2-7-6-7-10 3 1 6 4 7 7 1-3 4-6 7-7 0 4-3 8-7 10Z"
          fill="black"
          opacity="0.85"
        />
      </svg>
    </span>
  );
}