import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Feature Filter — Find a GPS with Exactly What You Need | Setwise Digital",
  description: "Tick the GPS features you want — no subscription, large screen, offline maps, Canada coverage, Bluetooth — and see matching devices instantly. Free plain-English GPS filter tool.",
  keywords: ["GPS with no subscription,GPS with offline maps,GPS large screen,GPS Canada maps,GPS with Bluetooth calling,best GPS no monthly fee,waterproof GPS device"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-feature-filter" },
};

export default function Page() {
  return <Client />;
}
