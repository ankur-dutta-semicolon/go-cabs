'use client';
// export const dynamic = 'force-dynamic'
import React from "react";
import { useRouter, useSearchParams } from "next/navigation";


type Tab = "ONE WAY" | "ROUND TRIP" | "LOCAL" | "AIRPORT";
type VehicleKey = "HATCHBACK" | "SEDAN" | "SUV" | "INNOVA";

type PaymentMode = "BOOK_AT_ZERO" | "PART_PAY" | "FULL_PAY";

type Addon = {
  id: string;
  title: string;
  priceLabel: string;
  priceValue: number; // for total calc (simple)
  note?: string;
  tag?: string; // "Most Popular"
};

const ADDONS: Addon[] = [
  { id: "expressway", title: "Expressway", priceLabel: "₹415", priceValue: 415, tag: "Most Popular" },
  { id: "luggage", title: "Cab with Luggage Carrier", priceLabel: "₹149", priceValue: 149 },
  { id: "diesel", title: "Diesel Car Guarantee", priceLabel: "₹1.1/km", priceValue: 0, note: "Charged per km (shown at final bill)" },
  { id: "newcar", title: "New Car Promise (2023 or newer)", priceLabel: "₹249", priceValue: 249 },
  { id: "language", title: "Driver who knows your language", priceLabel: "₹199", priceValue: 199 },
];

function formatINR(n: number) {
  return `₹${Math.round(n)}`;
}

export default function BookingClient() {
  const sp = useSearchParams();
  const router = useRouter();

  const tab = (sp.get("tab") as Tab) ?? "ONE WAY";

  const origin = sp.get("origin") ?? "";
  const destination = sp.get("destination") ?? "";

  const pickupDate = sp.get("pickupDate") ?? "";
  const pickupTime = sp.get("pickupTime") ?? "";
  const returnDate = sp.get("returnDate") ?? "";

  const city = sp.get("city") ?? "";
  const localPkg = sp.get("localPkg") ?? "";

  const vehicle = (sp.get("vehicle") as VehicleKey) ?? "SEDAN";
  const vehicleName = sp.get("vehicleName") ?? "Sedan";
  const price = Number(sp.get("price") ?? 0);

  const distanceKm = Number(sp.get("distanceKm") ?? 0);

  const packageLabel = sp.get("packageLabel") ?? "";
  const packageKey = sp.get("packageKey") ?? "";

  // Form
  const [fullName, setFullName] = React.useState("");
  const [phone, setPhone] = React.useState("");
  const [email, setEmail] = React.useState("");
  const [pickupLocation, setPickupLocation] = React.useState(origin || "");
  const [dropLocation, setDropLocation] = React.useState(destination || "");

  // Addons
  const [selectedAddons, setSelectedAddons] = React.useState<Record<string, boolean>>({});

  // Coupon (dummy for now)
  const [coupon, setCoupon] = React.useState("");
  const [couponMsg, setCouponMsg] = React.useState<string | null>(null);
  const [discount, setDiscount] = React.useState(0);

  // Payment
  const [paymentMode, setPaymentMode] = React.useState<PaymentMode>("PART_PAY");

  const addonsTotal = React.useMemo(() => {
    return ADDONS.reduce((sum, a) => (selectedAddons[a.id] ? sum + a.priceValue : sum), 0);
  }, [selectedAddons]);

  const grandTotal = Math.max(0, price + addonsTotal - discount);

  const payNow = React.useMemo(() => {
    if (paymentMode === "BOOK_AT_ZERO") return 0;
    if (paymentMode === "FULL_PAY") return grandTotal;
    // PART_PAY: 25% now (simple)
    return Math.round(grandTotal * 0.25);
  }, [paymentMode, grandTotal]);

  function toggleAddon(id: string) {
    setSelectedAddons((p) => ({ ...p, [id]: !p[id] }));
  }

  function applyCoupon() {
    const code = coupon.trim().toUpperCase();
    if (!code) {
      setCouponMsg("Enter a coupon code.");
      setDiscount(0);
      return;
    }

    // dummy logic for now
    if (code === "GOCAB50") {
      setDiscount(50);
      setCouponMsg("Coupon applied: ₹50 off");
      return;
    }
    if (code === "GOCAB100") {
      setDiscount(100);
      setCouponMsg("Coupon applied: ₹100 off");
      return;
    }

    setDiscount(0);
    setCouponMsg("Invalid coupon.");
  }

  function proceed() {
    // no backend yet – just basic validation + placeholder
    if (!fullName.trim()) return alert("Please enter full name.");
    if (!phone.trim()) return alert("Please enter mobile number.");
    if (!pickupLocation.trim()) return alert("Please enter pickup location.");
    if (!dropLocation.trim()) return alert("Please enter drop location.");

    alert(
      `Proceeding...\n\nVehicle: ${vehicleName}\nTotal: ${formatINR(grandTotal)}\nPay now: ${formatINR(payNow)}\nPayment: ${paymentMode}`
    );
  }

  return (
    <section className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="mx-auto max-w-7xl px-6">
        {/* Top bar */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <div className="text-sm font-extrabold tracking-widest text-yellow-400">REVIEW YOUR BOOKING</div>
            <h1 className="mt-2 text-3xl font-extrabold">Booking</h1>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="rounded-lg border border-white/25 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-black transition"
            >
              Back
            </button>
            {/* <button
              onClick={() => router.push("/")}
              className="rounded-full bg-yellow-400 px-6 py-2 text-sm font-bold text-black hover:opacity-90 transition"
            >
              Home
            </button> */}
          </div>
        </div>

        {/* Layout */}
        <div className="mt-10 grid grid-cols-1 gap-8 lg:grid-cols-3">
          {/* LEFT: Summary + form + addons */}
          <div className="lg:col-span-2 space-y-6">
            {/* Summary */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div>
                  <div className="text-lg font-extrabold">
                    {tab === "LOCAL" ? `${city || "Local"} (Local)` : `${origin} → ${destination}`}{" "}
                    <span className="text-sm text-neutral-400 font-semibold">({tab})</span>
                  </div>

                  <div className="mt-2 text-sm text-neutral-300 space-y-1">
                    <div>
                      Car Type: <span className="font-semibold text-white">{vehicleName}</span>
                    </div>
                    <div>
                      Pickup: <span className="font-semibold text-white">{pickupDate}</span> •{" "}
                      <span className="font-semibold text-white">{pickupTime}</span>
                      {tab === "ROUND TRIP" ? (
                        <>
                          {" "}
                          • Return: <span className="font-semibold text-white">{returnDate}</span>
                        </>
                      ) : null}
                    </div>

                    {tab === "LOCAL" && packageLabel ? (
                      <div>
                        Package: <span className="font-semibold text-white">{packageLabel}</span>{" "}
                        <span className="text-neutral-500">({packageKey})</span>
                      </div>
                    ) : null}

                    {distanceKm ? (
                      <div>
                        Est. distance: <span className="font-semibold text-white">{distanceKm.toFixed(1)} km</span>
                      </div>
                    ) : null}
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs tracking-widest text-neutral-400">BASE FARE</div>
                  <div className="mt-1 text-2xl font-extrabold text-yellow-400">{formatINR(price)}</div>
                </div>
              </div>
            </div>

            {/* Contact & pickup details */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <div className="text-lg font-extrabold">Contact & Pickup Details</div>

              <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2">
                <Input label="Full Name" value={fullName} onChange={setFullName} placeholder="Your name" />
                <Input label="Mobile No." value={phone} onChange={setPhone} placeholder="10-digit number" />
                <Input label="Email ID" value={email} onChange={setEmail} placeholder="Optional" />
                <div className="hidden md:block" />

                <Input
                  label="Pickup Location"
                  value={pickupLocation}
                  onChange={setPickupLocation}
                  placeholder="Enter pickup location"
                  full
                />
                <Input
                  label="Drop Location"
                  value={dropLocation}
                  onChange={setDropLocation}
                  placeholder="Enter drop location"
                  full
                />
              </div>
            </div>

            {/* Addons */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <div className="flex items-center justify-between">
                <div className="text-lg font-extrabold">Personalize Your Journey</div>
                <div className="text-sm text-neutral-400">Optional add-ons</div>
              </div>

              <div className="mt-5 divide-y divide-white/10">
                {ADDONS.map((a) => {
                  const checked = !!selectedAddons[a.id];
                  return (
                    <label key={a.id} className="flex items-start justify-between gap-4 py-4 cursor-pointer">
                      <div className="flex items-start gap-3">
                        <input
                          type="checkbox"
                          checked={checked}
                          onChange={() => toggleAddon(a.id)}
                          className="mt-1 h-4 w-4 accent-yellow-400"
                        />
                        <div>
                          <div className="font-semibold">
                            {a.title}{" "}
                            {a.tag ? (
                              <span className="ml-2 rounded-full bg-yellow-400/15 px-2 py-0.5 text-xs font-bold text-yellow-400">
                                {a.tag}
                              </span>
                            ) : null}
                          </div>
                          {a.note ? <div className="text-xs text-neutral-500 mt-1">{a.note}</div> : null}
                        </div>
                      </div>

                      <div className="text-sm font-bold text-white">{a.priceLabel}</div>
                    </label>
                  );
                })}
              </div>
            </div>

            {/* Inclusions/Exclusions (placeholder content like reference) */}
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <div className="text-lg font-extrabold">Inclusions / Exclusions</div>

              <div className="mt-4 grid grid-cols-1 gap-6 md:grid-cols-2 text-sm">
                <div>
                  <div className="font-bold text-yellow-400">Inclusions</div>
                  <ul className="mt-2 space-y-1 text-neutral-300 list-disc list-inside">
                    <li>Base Fare & Fuel Charges</li>
                    <li>Driver Allowance</li>
                    <li>GST (if applicable)</li>
                  </ul>
                </div>
                <div>
                  <div className="font-bold text-red-400">Exclusions</div>
                  <ul className="mt-2 space-y-1 text-neutral-300 list-disc list-inside">
                    <li>Toll / Parking (if applicable)</li>
                    <li>Waiting charges (if applicable)</li>
                    <li>Route deviation charges</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: Payment */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-white/15 bg-white/5 p-6">
              <div className="text-lg font-extrabold">Payment Options</div>

              <div className="mt-4 space-y-3">
                <PaymentRow
                  title="Book at zero"
                  subtitle="Pay later"
                  value={0}
                  active={paymentMode === "BOOK_AT_ZERO"}
                  onClick={() => setPaymentMode("BOOK_AT_ZERO")}
                />
                <PaymentRow
                  title="Part Pay"
                  subtitle="Pay 25% now and rest to driver"
                  value={Math.round(grandTotal * 0.25)}
                  active={paymentMode === "PART_PAY"}
                  onClick={() => setPaymentMode("PART_PAY")}
                />
                <PaymentRow
                  title="Full Pay"
                  subtitle="Pay full amount now"
                  value={grandTotal}
                  active={paymentMode === "FULL_PAY"}
                  onClick={() => setPaymentMode("FULL_PAY")}
                />
              </div>

              <div className="mt-6 border-t border-white/10 pt-5">
                <div className="text-sm font-bold">Coupon & Offers</div>
                <div className="mt-3 flex gap-2">
                  <input
                    value={coupon}
                    onChange={(e) => setCoupon(e.target.value)}
                    placeholder="Enter a coupon"
                    className="flex-1 rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm outline-none focus:border-yellow-400"
                  />
                  <button
                    onClick={applyCoupon}
                    className="rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-black hover:opacity-90 transition"
                  >
                    Apply
                  </button>
                </div>
                {couponMsg ? <div className="mt-2 text-xs text-neutral-400">{couponMsg}</div> : null}
              </div>

              {/* Fare summary */}
              <div className="mt-6 border-t border-white/10 pt-5 space-y-2 text-sm">
                <Row label="Base fare" value={formatINR(price)} />
                <Row label="Add-ons" value={formatINR(addonsTotal)} />
                <Row label="Discount" value={`- ${formatINR(discount)}`} />
                <div className="h-px bg-white/10 my-2" />
                <Row label="Total" value={formatINR(grandTotal)} strong />
                <Row label="Pay now" value={formatINR(payNow)} />
              </div>

              <button
                onClick={proceed}
                className="mt-6 w-full rounded-xl bg-yellow-400 px-5 py-3 text-sm font-extrabold tracking-widest text-black hover:opacity-90 transition"
              >
                PROCEED
              </button>

              <div className="mt-3 text-xs text-neutral-500">
                Free cancellation till 1 hour of departure (example text).
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------- small components ---------- */

function Input({
  label,
  value,
  onChange,
  placeholder,
  full,
}: {
  label: string;
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  full?: boolean;
}) {
  return (
    <div className={full ? "md:col-span-2" : ""}>
      <div className="text-xs font-bold tracking-widest text-neutral-400">{label}</div>
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-2 w-full rounded-lg border border-white/15 bg-black/40 px-3 py-2 text-sm text-white outline-none focus:border-yellow-400"
      />
    </div>
  );
}

function PaymentRow({
  title,
  subtitle,
  value,
  active,
  onClick,
}: {
  title: string;
  subtitle: string;
  value: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={[
        "w-full rounded-xl border p-4 text-left transition",
        active ? "border-yellow-400 bg-yellow-400/10" : "border-white/15 hover:border-white/35 hover:bg-white/5",
      ].join(" ")}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <div className="font-extrabold">{title}</div>
          <div className="mt-1 text-xs text-neutral-400">{subtitle}</div>
        </div>
        <div className="text-right font-extrabold text-yellow-400">{`₹${Math.round(value)}`}</div>
      </div>
    </button>
  );
}

function Row({ label, value, strong }: { label: string; value: string; strong?: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className={strong ? "font-extrabold" : "text-neutral-300"}>{label}</div>
      <div className={strong ? "font-extrabold text-yellow-400" : "text-neutral-200"}>{value}</div>
    </div>
  );
}