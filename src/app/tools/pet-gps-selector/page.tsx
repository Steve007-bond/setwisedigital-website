import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";
export const metadata: Metadata = {
  title: "Best Pet GPS Tracker 2026 — Dog & Cat Tracker Comparison | Setwise Digital",
  description: "Compare the 5 best pet GPS trackers: Fi Series 3, Whistle Go, Tractive GPS, Garmin, and Apple AirTag. Honest subscription cost breakdown. Free plain-English guide.",
  keywords: ["best dog GPS tracker 2026","best cat GPS tracker","Fi collar review","Whistle GPS dog","Tractive GPS review","pet GPS tracker comparison","dog GPS with no subscription"],
  alternates: { canonical: "https://setwisedigital.com/tools/pet-gps-selector" },
};
export default function Page() { return <Suspense fallback={"<div className=\"min-h-screen bg-[#0d1117]\" />"}><Client /></Suspense>; }
