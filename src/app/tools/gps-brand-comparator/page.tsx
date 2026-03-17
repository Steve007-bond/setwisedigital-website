import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Garmin vs TomTom vs Google Maps — Side-by-Side Comparison | Setwise Digital",
  description: "Compare any two GPS options side-by-side — Garmin, TomTom, Google Maps, Apple Maps, or Waze. Honest scores for maps, traffic, offline use, voice control, and running cost. Free, plain English.",
  keywords: ["Garmin vs TomTom,best GPS brand 2026,GPS brand comparison,Garmin vs Google Maps,TomTom vs Garmin which is better,best GPS for North America"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-brand-comparator" },
};

export default function Page() {
  return <Client />;
}
