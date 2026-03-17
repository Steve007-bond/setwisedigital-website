import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Battery Life Checker — Which GPS Lasts Your Whole Trip? | Setwise Digital",
  description: "Tell us how long you'll be away from a charger — see exactly which GPS devices have the battery life for your trip. Day hike to week-long expedition. Free, plain English.",
  keywords: ["GPS with longest battery life,handheld GPS battery life comparison,GPS for multi day hiking battery,GPS that lasts all day hunting,best GPS battery life outdoor,GPS solar charging"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-battery-checker" },
};

export default function Page() {
  return <Client />;
}
