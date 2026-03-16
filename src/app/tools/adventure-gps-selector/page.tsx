import type { Metadata } from "next";
import Client from "./Client";
export const metadata: Metadata = {
  title: "Adventure GPS Selector — Hiking, Hunting, Fishing, Boating | Setwise Digital",
  description: "Find the perfect GPS for your outdoor adventure. Compare Garmin devices for hiking, hunting, fishing, boating, off-road and cycling. Free plain-English guide.",
  keywords: ["best hiking GPS","best hunting GPS","best fishing GPS","Garmin adventure GPS","off-road GPS","boating GPS"],
  alternates: { canonical: "https://setwisedigital.com/tools/adventure-gps-selector" },
};
export default function Page() { return <Client />; }
