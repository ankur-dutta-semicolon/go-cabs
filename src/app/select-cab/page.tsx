"use client";

import React from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";

/* ================== TYPES ================== */

type Tab = "ONE WAY" | "ROUND TRIP" | "LOCAL" | "AIRPORT";

type LocalPackageKey = "PKG_4_40" | "PKG_8_80" | "PKG_12_120";
type LocalPackage = { key: LocalPackageKey; label: string; hoursIncluded: number; kmIncluded: number };

const LOCAL_PACKAGES: LocalPackage[] = [
  { key: "PKG_4_40", label: "4 hrs | 40 km", hoursIncluded: 4, kmIncluded: 40 },
  { key: "PKG_8_80", label: "8 hrs | 80 km", hoursIncluded: 8, kmIncluded: 80 },
  { key: "PKG_12_120", label: "12 hrs | 120 km", hoursIncluded: 12, kmIncluded: 120 },
];

type VehicleKey = "HATCHBACK" | "SEDAN" | "SUV" | "INNOVA";

type LocalPricing = {
  baseByPackage: Record<LocalPackageKey, number>;
  postKmRate: number;
  postHrRate: number;
};

type Vehicle = {
  key: VehicleKey;
  name: string;
  ratePerKm: number;
  baseFare: number;
  minFare: number;
  local: LocalPricing;
};

const VEHICLES: Vehicle[] = [
  {
    key: "HATCHBACK",
    name: "Hatchback",
    ratePerKm: 12,
    baseFare: 150,
    minFare: 499,
    local: {
      baseByPackage: { PKG_4_40: 1299, PKG_8_80: 1999, PKG_12_120: 2699 },
      postKmRate: 12,
      postHrRate: 120,
    },
  },
  {
    key: "SEDAN",
    name: "Sedan",
    ratePerKm: 14,
    baseFare: 200,
    minFare: 599,
    local: {
      baseByPackage: { PKG_4_40: 1399, PKG_8_80: 2199, PKG_12_120: 2999 },
      postKmRate: 14,
      postHrRate: 150,
    },
  },
  {
    key: "SUV",
    name: "SUV",
    ratePerKm: 18,
    baseFare: 250,
    minFare: 799,
    local: {
      baseByPackage: { PKG_4_40: 1799, PKG_8_80: 2799, PKG_12_120: 3899 },
      postKmRate: 18,
      postHrRate: 200,
    },
  },
  {
    key: "INNOVA",
    name: "Innova / Crysta",
    ratePerKm: 22,
    baseFare: 300,
    minFare: 999,
    local: {
      baseByPackage: { PKG_4_40: 2299, PKG_8_80: 3499, PKG_12_120: 4799 },
      postKmRate: 22,
      postHrRate: 250,
    },
  },
];

function calcFare(distanceKm: number, v: Vehicle) {
  const raw = v.baseFare + distanceKm * v.ratePerKm;
  return Math.ceil(Math.max(raw, v.minFare));
}

type Quote =
  | { kind: "OUTSTATION"; key: VehicleKey; name: string; price: number; distanceKm: number }
  | {
      kind: "LOCAL";
      key: VehicleKey;
      name: string;
      packageKey: LocalPackageKey;
      packageLabel: string;
      hoursIncluded: number;
      kmIncluded: number;
      basePrice: number;
      postKmRate: number;
      postHrRate: number;
    };

type LocalGroup = {
  pkg: LocalPackage;
  quotes: Quote[]; // LOCAL quotes only
};

/* ================== GOOGLE MAPS LOADER ================== */

let mapsPromise: Promise<void> | null = null;

function loadGoogleMaps() {
  if (!mapsPromise) {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!key) throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_KEY in .env.local");
    setOptions({ key });

    mapsPromise = (async () => {
      await importLibrary("core");
      await importLibrary("routes");
      await importLibrary("places");
    })();
  }
  return mapsPromise;
}

async function getDrivingDistanceKm(origin: string, destination: string) {
  await loadGoogleMaps();

  return new Promise<number>((resolve, reject) => {
    const service = new google.maps.DirectionsService();

    service.route(
      { origin, destination, travelMode: google.maps.TravelMode.DRIVING },
      (result, status) => {
        const leg = result?.routes?.[0]?.legs?.[0];
        if (status !== "OK" || !leg?.distance?.value) {
          reject(new Error(`Directions failed: ${status}`));
          return;
        }
        resolve(leg.distance.value / 1000);
      }
    );
  });
}

/* ================== PAGE ================== */

export default function SelectCabPage() {
  const sp = useSearchParams();
  const router = useRouter();

  const tab = (sp.get("tab") as Tab) ?? "ONE WAY";

  const origin = (sp.get("origin") ?? "").trim();
  const destination = (sp.get("destination") ?? "").trim();

  const city = (sp.get("city") ?? "").trim();
  const localPkg = (sp.get("localPkg") as LocalPackageKey) ?? "PKG_4_40";

  const pickupDate = sp.get("pickupDate") ?? "";
  const pickupTime = sp.get("pickupTime") ?? "";
  const returnDate = sp.get("returnDate") ?? "";

  const [loading, setLoading] = React.useState(true);
  const [error, setError] = React.useState<string | null>(null);

  // OUTSTATION quotes
  const [quotes, setQuotes] = React.useState<Quote[]>([]);

  // LOCAL grouped quotes (3 slabs)
  const [localGroups, setLocalGroups] = React.useState<LocalGroup[]>([]);

  // ✅ Local package tabs state
  const [activeLocalPkg, setActiveLocalPkg] = React.useState<LocalPackageKey>(localPkg);

  // keep in sync if URL changes
  React.useEffect(() => {
    setActiveLocalPkg(localPkg);
  }, [localPkg]);

  React.useEffect(() => {
    if (tab !== "LOCAL") {
      loadGoogleMaps().catch(() => {});
    }
  }, [tab]);

  React.useEffect(() => {
    let cancelled = false;

    async function run() {
      setLoading(true);
      setError(null);
      setQuotes([]);
      setLocalGroups([]);

      try {
        // ✅ LOCAL: build all 3 slabs always (for tabs)
        if (tab === "LOCAL") {
          if (!city) throw new Error("Please enter/select a city.");

          const groups: LocalGroup[] = LOCAL_PACKAGES.map((pkg) => {
            const computed: Quote[] = VEHICLES.map((v) => ({
              kind: "LOCAL" as const,
              key: v.key,
              name: v.name,
              packageKey: pkg.key,
              packageLabel: pkg.label,
              hoursIncluded: pkg.hoursIncluded,
              kmIncluded: pkg.kmIncluded,
              basePrice: v.local.baseByPackage[pkg.key],
              postKmRate: v.local.postKmRate,
              postHrRate: v.local.postHrRate,
            })).sort((a, b) =>
              a.kind === "LOCAL" && b.kind === "LOCAL" ? a.basePrice - b.basePrice : 0
            );

            return { pkg, quotes: computed };
          });

          if (!cancelled) setLocalGroups(groups);
          return;
        }

        // ✅ OUTSTATION / ROUND TRIP / AIRPORT
        if (!origin || !destination) throw new Error("Please fill Pickup and Drop correctly.");

        let distanceKm = await getDrivingDistanceKm(origin, destination);
        if (tab === "ROUND TRIP") distanceKm = distanceKm * 2;

        const computed: Quote[] = VEHICLES.map((v) => ({
          kind: "OUTSTATION" as const,
          key: v.key,
          name: v.name,
          distanceKm,
          price: calcFare(distanceKm, v),
        })).sort((a, b) => (a.kind === "OUTSTATION" && b.kind === "OUTSTATION" ? a.price - b.price : 0));

        if (!cancelled) setQuotes(computed);
      } catch (e: any) {
        if (!cancelled) setError(e?.message || "Something went wrong");
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    run();
    return () => {
      cancelled = true;
    };
  }, [tab, origin, destination, city]);

  function goToBooking(q: Quote) {
    const params = new URLSearchParams(window.location.search);

    params.set("vehicle", q.key);
    params.set("vehicleName", q.name);

    if (q.kind === "OUTSTATION") {
      params.set("price", String(q.price));
      params.set("distanceKm", String(q.distanceKm));
    } else {
      params.set("price", String(q.basePrice));
      params.set("packageKey", q.packageKey);
      params.set("packageLabel", q.packageLabel);
      params.set("localPkg", q.packageKey);
    }

    router.push(`/booking?${params.toString()}`);
  }

  const activeLocalGroup = localGroups.find((g) => g.pkg.key === activeLocalPkg);

  return (
    <section className="min-h-screen bg-black text-white pt-32 pb-24">
      <div className="mx-auto max-w-5xl px-6">
        {/* HEADER */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-extrabold">Select Cab</h1>

            <div className="mt-3 space-y-1 text-sm text-neutral-400">
              <div>
                Trip Type: <span className="font-semibold text-white">{tab}</span>
              </div>

              {tab === "LOCAL" ? (
                <div>
                  City: <span className="font-semibold text-white">{city || "-"}</span>
                </div>
              ) : (
                <div>
                  Route:{" "}
                  <span className="font-semibold text-white">
                    {origin || "-"} → {destination || "-"}
                  </span>
                </div>
              )}

              <div>
                Pickup:{" "}
                <span className="font-semibold text-white">
                  {pickupDate || "-"} • {pickupTime || "-"}
                </span>
                {tab === "ROUND TRIP" ? (
                  <>
                    {" "}
                    • Return: <span className="font-semibold text-white">{returnDate || "-"}</span>
                  </>
                ) : null}
              </div>
            </div>
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => router.back()}
              className="rounded-lg border border-white/30 px-4 py-2 text-sm font-semibold hover:bg-white hover:text-black transition"
            >
              Modify Booking
            </button>

            {/* <button
              onClick={() => router.push("/")}
              className="rounded-full bg-yellow-400 px-6 py-2 text-sm font-bold text-black hover:opacity-90 transition"
            >
              Home
            </button> */}
          </div>
        </div>

        {/* BODY */}
        <div className="mt-12 space-y-5">
          {loading ? (
            <div className="rounded-xl border border-white/20 p-6 text-neutral-300">Calculating prices…</div>
          ) : error ? (
            <div className="rounded-xl border border-red-500/40 bg-red-500/10 p-6 text-red-400">{error}</div>
          ) : tab === "LOCAL" ? (
            localGroups.length === 0 ? (
              <div className="rounded-xl border border-white/20 p-6 text-neutral-300">No quotes.</div>
            ) : (
              <>
                {/* ✅ LOCAL PACKAGE TABS */}
                <div className="mt-6 flex justify-center">
                  <div className="flex w-full max-w-md overflow-hidden rounded-xl border border-white/20 bg-white/5">
                    {LOCAL_PACKAGES.map((p) => {
                      const active = p.key === activeLocalPkg;
                      return (
                        <button
                          key={p.key}
                          type="button"
                          onClick={() => setActiveLocalPkg(p.key)}
                          className={[
                            "flex-1 px-4 py-3 text-xs font-extrabold tracking-widest transition",
                            "border-r border-white/10 last:border-r-0",
                            active ? "bg-yellow-400 text-black" : "text-white hover:bg-white/10",
                          ].join(" ")}
                        >
                          {p.label}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* ✅ ACTIVE PACKAGE LIST */}
                <div className="mt-10 space-y-5">
                  {(activeLocalGroup?.quotes ?? []).map((q) => {
                    if (q.kind !== "LOCAL") return null;

                    return (
                      <div
                        key={`${q.packageKey}-${q.key}`}
                        className="group rounded-xl border border-white/20 p-6 transition hover:border-yellow-400 hover:bg-white/5"
                      >
                        <div className="flex items-center justify-between gap-4">
                          <div>
                            <div className="text-lg font-bold">{q.name}</div>
                            <div className="mt-1 text-sm text-neutral-400">Package: {q.packageLabel}</div>
                            <div className="text-xs text-neutral-500 mt-1">
                              Post limit: ₹{q.postKmRate}/km • ₹{q.postHrRate}/hr
                            </div>
                          </div>

                          <div className="text-right">
                            <div className="text-xs tracking-widest text-neutral-500">TOTAL</div>
                            <div className="text-xl font-extrabold text-yellow-400">₹{q.basePrice}</div>

                            <button
                              onClick={() => goToBooking(q)}
                              className="mt-3 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-black hover:opacity-90 transition"
                            >
                              SELECT CAR
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </>
            )
          ) : quotes.length === 0 ? (
            <div className="rounded-xl border border-white/20 p-6 text-neutral-300">No quotes.</div>
          ) : (
            <div className="space-y-5">
              {quotes.map((q) => {
                if (q.kind !== "OUTSTATION") return null;

                return (
                  <div
                    key={q.key}
                    className="group rounded-xl border border-white/20 p-6 transition hover:border-yellow-400 hover:bg-white/5"
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div>
                        <div className="text-lg font-bold">{q.name}</div>
                        <div className="mt-1 text-sm text-neutral-400">AC • Verified driver • Safe ride</div>
                        <div className="text-xs text-neutral-500 mt-1">Est. distance: {q.distanceKm.toFixed(1)} km</div>
                      </div>

                      <div className="text-right">
                        <div className="text-xs tracking-widest text-neutral-500">TOTAL</div>
                        <div className="text-xl font-extrabold text-yellow-400">₹{q.price}</div>

                        <button
                          onClick={() => goToBooking(q)}
                          className="mt-3 rounded-lg bg-yellow-400 px-4 py-2 text-sm font-bold text-black hover:opacity-90 transition"
                        >
                          SELECT CAR
                        </button>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        <div className="mt-10 text-xs text-neutral-500">
          Final fare may vary due to route changes, tolls, or waiting time (if applicable).
        </div>
      </div>
    </section>
  );
}