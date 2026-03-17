import type { Metadata } from "next";
import { Suspense } from "react";
import BestGPSFinderClient from "./BestGPSFinderClient";
export const metadata: Metadata = {
  title: "Best GPS Device for Seniors 2026 — Find Yours Free | Setwise Digital",
  description: "Not sure which GPS to buy? Answer 5 simple questions — we match you to the best Garmin or TomTom for your lifestyle and budget. Free, plain English.",
  keywords: ["best GPS for seniors","best GPS device for older adults","which GPS should I buy","Garmin vs TomTom","easy GPS for beginners"],
  alternates: { canonical: "https://setwisedigital.com/tools/best-gps-finder" },
};
export default function Page() { return <BestGPSFinderClient/>; }
