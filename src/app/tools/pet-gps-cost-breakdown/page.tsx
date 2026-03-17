import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Pet GPS Tracker Cost Comparison — Tractive vs Fi vs Whistle vs AirTag | Setwise Digital",
  description: "True 3-year cost comparison of Tractive, Fi, Whistle, and Apple AirTag pet trackers including device price and subscriptions. Plus clickable setup guides. Free.",
  keywords: ["pet GPS monthly fee comparison,cheapest pet tracker subscription,Tractive vs Fi GPS collar,pet GPS total cost 3 years,Whistle GPS subscription cost,pet tracker no monthly fee worth it"],
  alternates: { canonical: "https://setwisedigital.com/tools/pet-gps-cost-breakdown" },
};

export default function Page() {
  return <Client />;
}
