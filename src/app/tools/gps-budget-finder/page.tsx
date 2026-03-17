import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best GPS for Your Budget 2026 — Under $100, $150, $200 | Setwise Digital",
  description: "Pick your budget and see the best GPS devices available — what features you get, what you miss, and our honest top picks. Garmin and TomTom compared at every price point. Free, plain English.",
  keywords: ["best GPS under 100,best GPS under 200,best GPS for the money,affordable GPS device,cheap GPS that works,GPS device value"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-budget-finder" },
};

export default function Page() {
  return <Client />;
}
