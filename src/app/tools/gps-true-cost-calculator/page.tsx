import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS True Cost Calculator — What Will It Really Cost Over 3 Years? | Setwise Digital",
  description: "Calculate the real 3-year cost of any GPS device. Map updates, subscriptions, accessories — all included. Compare up to 3 GPS devices side by side. Free calculator, no jargon.",
  keywords: ["GPS total cost per year,GPS map update cost,GPS true cost,is GPS worth the money,GPS subscription fees,Garmin cost of ownership"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-true-cost-calculator" },
};

export default function Page() {
  return <Client />;
}
