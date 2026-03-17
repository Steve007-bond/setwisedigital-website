import type { Metadata } from "next";
import { Suspense } from "react";
import RoadTripCheckerClient from "./RoadTripCheckerClient";
export const metadata: Metadata = {
  title: "Road Trip GPS Pre-Check — Is Your GPS Ready? | Setwise Digital",
  description: "Free 5-step GPS road trip checklist. Make sure your Garmin, TomTom or in-car GPS is updated, charged, and route-ready before you leave. Plain English — takes 3 minutes.",
  keywords: ["GPS road trip checklist","is my GPS ready for road trip","Garmin GPS before road trip","check GPS before long drive"],
  alternates: { canonical: "https://setwisedigital.com/tools/road-trip-checker" },
};
export default function Page() { return <RoadTripCheckerClient/>; }
