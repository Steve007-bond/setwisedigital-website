import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Do I Have to Pay for GPS Map Updates? Free vs Paid Maps Explained | Setwise Digital",
  description: "GPS lifetime maps, paid updates, subscriptions — explained in plain English. Find out exactly what map updates cost for your GPS over 3 years. Free guide, no jargon.",
  keywords: ["GPS lifetime maps free,do I have to pay for GPS map updates,GPS no subscription maps,Garmin lifetime maps worth it,TomTom map update cost,GPS map subscription fees"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-maps-explained" },
};

export default function Page() {
  return <Client />;
}
