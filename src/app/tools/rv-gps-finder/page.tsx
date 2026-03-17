import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best GPS for RV and Motorhome 2026 — Garmin RV 795, 895, 1095 | Setwise Digital",
  description: "Which Garmin RV GPS is right for your rig? 4 questions about your motorhome type, size, and travel style. Height routing, campground database, and RV-specific navigation explained in plain English.",
  keywords: ["best GPS for RV,RV GPS with height restrictions,GPS for motorhome Canada USA,Garmin RV GPS review,RV navigation with campground maps,GPS for large motorhome"],
  alternates: { canonical: "https://setwisedigital.com/tools/rv-gps-finder" },
};

export default function Page() {
  return <Client />;
}
