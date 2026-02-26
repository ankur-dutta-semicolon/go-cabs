"use client";

import React, { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { setOptions, importLibrary } from "@googlemaps/js-api-loader";
import { useRouter } from "next/navigation";

type Tab = "ONE WAY" | "ROUND TRIP" | "LOCAL" | "AIRPORT";

/* ================== LOCAL PACKAGES ================== */

type LocalPackageKey = "PKG_4_40" | "PKG_8_80" | "PKG_12_120";

type LocalPackage = {
  key: LocalPackageKey;
  label: string; // "4 hrs | 40 km"
  hoursIncluded: number;
  kmIncluded: number;
};

const LOCAL_PACKAGES: LocalPackage[] = [
  { key: "PKG_4_40", label: "4 hrs | 40 km", hoursIncluded: 4, kmIncluded: 40 },
  { key: "PKG_8_80", label: "8 hrs | 80 km", hoursIncluded: 8, kmIncluded: 80 },
  { key: "PKG_12_120", label: "12 hrs | 120 km", hoursIncluded: 12, kmIncluded: 120 },
];

/* ================== VEHICLES + PRICING ================== */

type VehicleKey = "HATCHBACK" | "SEDAN" | "SUV" | "INNOVA";

type LocalPricing = {
  baseByPackage: Record<LocalPackageKey, number>;
  postKmRate: number; // ₹ per extra km
  postHrRate: number; // ₹ per extra hour
};

type Vehicle = {
  key: VehicleKey;
  name: string;

  // Outstation
  ratePerKm: number;
  baseFare: number;
  minFare: number;

  // Local
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

/* ================== QUOTES (OUTSTATION + LOCAL) ================== */

type Quote =
  | {
      kind: "OUTSTATION";
      key: VehicleKey;
      name: string;
      price: number;
      distanceKm: number;
    }
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

/* ================== GOOGLE MAPS LOADER (SIMPLE + CACHED) ================== */

let mapsPromise: Promise<void> | null = null;

function loadGoogleMaps() {
  if (!mapsPromise) {
    const key = process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY;
    if (!key) throw new Error("Missing NEXT_PUBLIC_GOOGLE_MAPS_KEY in .env.local");

    // ✅ only 'key' supported in your APIOptions type
    setOptions({ key });

    mapsPromise = (async () => {
      await importLibrary("core");
      await importLibrary("routes");
      await importLibrary("places"); // for Autocomplete
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

/* ================== COMPONENT ================== */

export default function BookingSection() {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<Tab>("ONE WAY");

  // ONE WAY
  const [oneWayFrom, setOneWayFrom] = useState("");
  const [oneWayTo, setOneWayTo] = useState("");

  // ROUND TRIP
  const [roundFrom, setRoundFrom] = useState("");
  const [roundTo, setRoundTo] = useState("");

  // LOCAL
  const [city, setCity] = useState("");
  const [localPkg, setLocalPkg] = useState<LocalPackageKey>("PKG_4_40");

  // AIRPORT
  const [pickupAddress, setPickupAddress] = useState("");
  const [dropAirport, setDropAirport] = useState("");

  const [pickupDate, setPickupDate] = useState("2026-02-26");
  const [returnDate, setReturnDate] = useState("2026-02-26");
  const [pickupTime, setPickupTime] = useState("07:00");

  const [airportTrip, setAirportTrip] = useState<"Drop to Airport" | "Pickup from Airport">(
    "Drop to Airport"
  );

  const tabs: Tab[] = useMemo(() => ["ONE WAY", "ROUND TRIP", "LOCAL", "AIRPORT"], []);

  const onSwap = () => {
    if (activeTab === "ONE WAY") {
      const a = oneWayFrom;
      const b = oneWayTo;
      setOneWayFrom(b);
      setOneWayTo(a);
      return;
    }

    if (activeTab === "ROUND TRIP") {
      const a = roundFrom;
      const b = roundTo;
      setRoundFrom(b);
      setRoundTo(a);
      return;
    }
  };

  React.useEffect(() => {
    loadGoogleMaps().catch(console.error);
  }, []);

  function buildOriginDestination(): { origin: string; destination: string } {
    if (activeTab === "ONE WAY") return { origin: oneWayFrom.trim(), destination: oneWayTo.trim() };
    if (activeTab === "ROUND TRIP") return { origin: roundFrom.trim(), destination: roundTo.trim() };

    if (activeTab === "AIRPORT") {
      const a = pickupAddress.trim();
      const b = dropAirport.trim();

      // (for now same mapping as your current code)
      if (airportTrip === "Drop to Airport") {
        return { origin: a, destination: b };
      } else {
        return { origin: a, destination: b };
      }
    }

    return { origin: "", destination: "" };
  }

  function goToResultsPage() {
    const params = new URLSearchParams();
    params.set("tab", activeTab);

    params.set("pickupDate", pickupDate);
    params.set("pickupTime", pickupTime);
    params.set("returnDate", returnDate);

    if (activeTab === "LOCAL") {
      params.set("city", city.trim());
      params.set("localPkg", localPkg);
    } else {
      const { origin, destination } = buildOriginDestination();
      params.set("origin", origin);
      params.set("destination", destination);
    }

    router.push(`/select-cab?${params.toString()}`);
  }

  /* ================== PLACES INPUT ================== */

  function PlacesAutocompleteInput({
    value,
    onChange,
    placeholder,
    className = "",
    options,
  }: {
    value: string;
    onChange: (v: string) => void;
    placeholder?: string;
    className?: string;
    options?: google.maps.places.AutocompleteOptions;
  }) {
    const inputRef = React.useRef<HTMLInputElement | null>(null);
    const acRef = React.useRef<google.maps.places.Autocomplete | null>(null);

    React.useEffect(() => {
      let cancelled = false;

      async function setup() {
        await loadGoogleMaps();
        if (cancelled) return;
        if (!inputRef.current) return;

        // If already created, just return
        if (acRef.current) return;

        acRef.current = new google.maps.places.Autocomplete(inputRef.current, {
          fields: ["formatted_address", "name"],
          ...(options ?? {}),
        });

        acRef.current.addListener("place_changed", () => {
          const place = acRef.current?.getPlace();
          const text = place?.formatted_address || place?.name || inputRef.current?.value || "";
          onChange(text);
        });
      }

      setup();
      return () => {
        cancelled = true;
      };
    }, [onChange, options]);

    // keep input DOM in sync (uncontrolled input)
    React.useEffect(() => {
      if (inputRef.current && value !== inputRef.current.value) {
        inputRef.current.value = value;
      }
    }, [value]);

    return (
      <>
        <input
          ref={inputRef}
          defaultValue={value}
          placeholder={placeholder}
          autoComplete="off"
          className={[
            "w-full bg-transparent pb-2 text-[15px] font-semibold text-neutral-900 outline-none",
            "placeholder:text-neutral-400",
            className,
          ].join(" ")}
        />
        <div className="h-[1px] w-full bg-neutral-300" />
      </>
    );
  }

  /* ================== TAB CONTENT ================== */

  const content = (() => {
    // ✅ Common wrapper styles like ROUND TRIP (mobile + desktop)
    const swapButton = (
      <button
        type="button"
        onClick={onSwap}
        className="group inline-flex h-11 w-11 items-center justify-center rounded-full bg-black text-yellow-400 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-neutral-800"
        aria-label="Swap"
      >
        <SwapIcon className="transition-transform duration-300 group-hover:rotate-180" />
      </button>
    );

    if (activeTab === "ONE WAY") {
      return (
        <div className="flex flex-wrap items-end gap-x-10 gap-y-8">
          <div className="min-w-[180px] flex-1">
            <Label text="FROM" />
            <div className="relative pl-7">
              <PlacesAutocompleteInput
                value={oneWayFrom}
                onChange={setOneWayFrom}
                placeholder="Enter Pickup Location"
              />
              <span className="absolute left-0 top-1.5 text-neutral-600">
                <SearchIcon />
              </span>
            </div>
          </div>

          {swapButton}

          <div className="min-w-[180px] flex-1">
            <Label text="TO" />
            <div className="relative pl-7">
              <PlacesAutocompleteInput value={oneWayTo} onChange={setOneWayTo} placeholder="Enter Drop Location" />
              <span className="absolute left-0 top-1.5 text-neutral-600">
                <SearchIcon />
              </span>
            </div>
          </div>

          <div className="min-w-[150px] flex-1">
            <Label text="PICK UP DATE" />
            <InputWithUnderline type="date" value={pickupDate} onChange={setPickupDate} rightIcon={<ChevronDownIcon />} />
          </div>

          <div className="min-w-[130px] flex-1">
            <Label text="PICK UP TIME" />
            <InputWithUnderline type="time" value={pickupTime} onChange={setPickupTime} rightIcon={<ChevronDownIcon />} />
          </div>
        </div>
      );
    }

    if (activeTab === "ROUND TRIP") {
      return (
        <div className="flex flex-wrap items-end gap-x-10 gap-y-8">
          <div className="min-w-[180px] flex-1">
            <Label text="FROM" />
            <div className="relative pl-7">
              <PlacesAutocompleteInput value={roundFrom} onChange={setRoundFrom} placeholder="Mumbai, Maharashtra" />
              <span className="absolute left-0 top-1.5 text-neutral-600">
                <SearchIcon />
              </span>
            </div>
          </div>

          {swapButton}

          <div className="min-w-[180px] flex-1">
            <Label text="TO" />
            <div className="relative pl-7 pr-7">
              <PlacesAutocompleteInput value={roundTo} onChange={setRoundTo} placeholder="Pune, Maharashtra" />
              <span className="absolute left-0 top-1.5 text-neutral-600">
                <SearchIcon />
              </span>
              <span className="absolute right-0 top-1.5 text-neutral-600">
                <Plus size={16} />
              </span>
            </div>
          </div>

          <div className="min-w-[150px] flex-1">
            <Label text="PICK UP DATE" />
            <InputWithUnderline type="date" value={pickupDate} onChange={setPickupDate} rightIcon={<ChevronDownIcon />} />
          </div>

          <div className="min-w-[150px] flex-1">
            <Label text="RETURN DATE" />
            <InputWithUnderline type="date" value={returnDate} onChange={setReturnDate} rightIcon={<ChevronDownIcon />} />
          </div>

          <div className="min-w-[130px] flex-1">
            <Label text="PICK UP TIME" />
            <InputWithUnderline type="time" value={pickupTime} onChange={setPickupTime} rightIcon={<ChevronDownIcon />} />
          </div>
        </div>
      );
    }

    if (activeTab === "LOCAL") {
      return (
        <div className="flex flex-wrap items-end gap-x-10 gap-y-8">
          <div className="min-w-[220px] flex-1">
            <Label text="CITY" />
            <div className="relative pl-7">
              <PlacesAutocompleteInput
                value={city}
                onChange={setCity}
                placeholder="Enter City"
                options={{ types: ["(cities)"], componentRestrictions: { country: "in" } }}
              />
              <span className="absolute left-0 top-1.5 text-neutral-600">
                <SearchIcon />
              </span>
            </div>
          </div>

          <div className="min-w-[150px] flex-1">
            <Label text="PICK UP DATE" />
            <InputWithUnderline type="date" value={pickupDate} onChange={setPickupDate} rightIcon={<ChevronDownIcon />} />
          </div>

          <div className="min-w-[130px] flex-1">
            <Label text="PICK UP TIME" />
            <InputWithUnderline type="time" value={pickupTime} onChange={setPickupTime} rightIcon={<ChevronDownIcon />} />
          </div>
        </div>
      );
    }

    // AIRPORT
    const isDropToAirport = airportTrip === "Drop to Airport";

    return (
      <div className="flex flex-wrap items-end gap-x-10 gap-y-8">
        <div className="min-w-[170px] flex-1">
          <Label text="TRIP" />
          <div className="relative pr-7">
            <select
              value={airportTrip}
              onChange={(e) => {
                const newValue = e.target.value as "Drop to Airport" | "Pickup from Airport";
                setAirportTrip(newValue);

                // ✅ Clear fields when switching trip type
                setPickupAddress("");
                setDropAirport("");
              }}
              className="w-full bg-transparent pb-2 text-[15px] font-semibold text-neutral-900 outline-none"
            >
              <option value="Drop to Airport">Drop to Airport</option>
              <option value="Pickup from Airport">Pickup from Airport</option>
            </select>
            <span className="absolute right-0 top-1.5 text-neutral-600">
              <ChevronDownIcon />
            </span>
            <div className="h-[1px] w-full bg-neutral-300" />
          </div>
        </div>

        <div className="min-w-[220px] flex-1">
          <Label text={isDropToAirport ? "PICKUP ADDRESS" : "PICKUP AIRPORT"} />
          <div className="relative pl-7">
            <PlacesAutocompleteInput
              value={pickupAddress}
              onChange={setPickupAddress}
              placeholder={isDropToAirport ? "Enter Pickup Location" : "Select Airport"}
            />
            <span className="absolute left-0 top-1.5 text-neutral-600">
              <SearchIcon />
            </span>
          </div>
        </div>

        <div className="min-w-[220px] flex-1">
          <Label text={isDropToAirport ? "DROP AIRPORT" : "DROP ADDRESS"} />
          <div className="relative pl-7 pr-7">
            <PlacesAutocompleteInput
              value={dropAirport}
              onChange={setDropAirport}
              placeholder={isDropToAirport ? "Select Airport" : "Enter Drop Location"}
            />
            <span className="absolute left-0 top-1.5 text-neutral-600">
              <SearchIcon />
            </span>
            <span className="absolute right-0 top-1.5 text-neutral-600">
              <XIcon />
            </span>
          </div>
        </div>

        <div className="min-w-[150px] flex-1">
          <Label text="PICK UP DATE" />
          <InputWithUnderline type="date" value={pickupDate} onChange={setPickupDate} rightIcon={<ChevronDownIcon />} />
        </div>

        <div className="min-w-[130px] flex-1">
          <Label text="PICK UP TIME" />
          <InputWithUnderline type="time" value={pickupTime} onChange={setPickupTime} rightIcon={<ChevronDownIcon />} />
        </div>
      </div>
    );
  })();

  return (
    <section className="w-full bg-yellow-400" id="booking">
      <div className="mx-auto max-w-[1400px] px-4 py-10 md:py-20">
        <div className="flex justify-center">
          <span className="rounded-md bg-black px-6 py-3 text-base sm:text-xl font-extrabold tracking-widest text-yellow-400 shadow-lg">
            BEST IN CITY
          </span>
        </div>

        <h2 className="mt-8 text-center text-3xl font-bold tracking-tight text-black sm:text-5xl">
          TRUSTED CAB SERVICES IN DURGAPUR
        </h2>

        <div className="mx-auto mt-10 max-w-[1400px] rounded-2xl bg-white px-6 py-10 shadow-2xl sm:px-10">
          <div className="flex justify-center">
            <div className="flex w-full max-w-3xl overflow-hidden rounded-md border border-neutral-300 bg-white">
              {tabs.map((t) => {
                const active = t === activeTab;
                return (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTab(t)}
                    className={[
                      "flex-1 px-3 py-3 text-xs font-extrabold tracking-widest transition",
                      "border-r border-neutral-300 last:border-r-0",
                      active ? "bg-black text-yellow-400" : "bg-white text-black hover:bg-neutral-50",
                    ].join(" ")}
                  >
                    {t}
                  </button>
                );
              })}
            </div>
          </div>

          <div className="mt-10">{content}</div>
        </div>

        <div className="mt-10 flex justify-center gap-4">
          <button
            type="button"
            onClick={goToResultsPage}
            className="rounded-xl bg-black px-16 py-5 text-base font-extrabold tracking-widest text-yellow-400 shadow-xl hover:opacity-95"
          >
            EXPLORE CABS
          </button>
        </div>
      </div>
    </section>
  );
}

/* ---------------- helpers ---------------- */

function Field({
  label,
  children,
  icon,
  rightIcon,
  col,
}: {
  label: string;
  children: React.ReactNode;
  icon?: React.ReactNode;
  rightIcon?: React.ReactNode;
  col: string;
}) {
  return (
    <div className={`${col} min-h-[92px]`}>
      <div className="text-[13px] font-extrabold tracking-widest text-neutral-900">{label}</div>

      <div className="relative mt-2">
        {icon ? <span className="absolute left-0 top-1.5 text-neutral-600">{icon}</span> : null}
        {rightIcon ? <span className="absolute right-0 top-1.5 text-neutral-600">{rightIcon}</span> : null}

        <div className={icon ? "pl-7" : ""}>{children}</div>
      </div>
    </div>
  );
}

function UnderlineInput({
  value,
  onChange,
  placeholder,
  type = "text",
  className = "",
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  className?: string;
}) {
  return (
    <>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "w-full bg-transparent pb-2 text-[15px] font-semibold text-neutral-900 outline-none",
          "placeholder:text-neutral-400",
          className,
        ].join(" ")}
      />
      <div className="h-[1px] w-full bg-neutral-300" />
    </>
  );
}

function HelperError({ text }: { text: string }) {
  return <div className="mt-2 text-[11px] font-medium text-red-500">{text}</div>;
}

/* ---------------- icons ---------------- */

function SearchIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15Z" stroke="currentColor" strokeWidth="2" />
      <path d="M16.5 16.5 21 21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function SwapIcon({ className = "" }: { className?: string }) {
  return (
    <svg className={className} width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M7 7h11l-2-2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M17 17H6l2 2"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function ChevronDownIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="m6 9 6 6 6-6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function XIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path d="M18 6 6 18M6 6l12 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
    </svg>
  );
}

function Label({ text }: { text: string }) {
  return <div className="mb-2 text-[13px] font-extrabold tracking-widest text-neutral-900">{text}</div>;
}

function InputWithUnderline({
  value,
  onChange,
  placeholder,
  type = "text",
  leftIcon,
  rightIcon,
}: {
  value: string;
  onChange: (v: string) => void;
  placeholder?: string;
  type?: string;
  leftIcon?: React.ReactNode;
  rightIcon?: React.ReactNode;
}) {
  return (
    <div className="relative">
      {leftIcon ? <span className="absolute left-0 top-1.5 text-neutral-600">{leftIcon}</span> : null}
      {rightIcon ? <span className="absolute right-0 top-1.5 text-neutral-600">{rightIcon}</span> : null}

      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className={[
          "w-full bg-transparent pb-2 text-[15px] font-semibold text-neutral-900 outline-none",
          leftIcon ? "pl-7" : "",
          rightIcon ? "pr-7" : "",
        ].join(" ")}
      />

      <div className="h-[1px] w-full bg-neutral-300" />
    </div>
  );
}