import { Suspense } from "react";
import BookingClient from "./BookingClient";

// export const dynamic = "force-dynamic";

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-black text-white pt-32 px-6">Loading...</div>}>
      <BookingClient />
    </Suspense>
  );
}