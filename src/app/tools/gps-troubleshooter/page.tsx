import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Not Working? Plain-English Fix Guide for Common GPS Problems | Setwise Digital",
  description: "GPS lost signal, wrong directions, frozen screen, no voice, battery draining? Plain-English step-by-step guidance for car GPS, phone navigation, outdoor GPS and built-in car navigation. Free.",
  keywords: ["GPS not working,GPS lost signal fix,GPS giving wrong directions,GPS frozen screen,why is my GPS not working,GPS navigation problems"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-troubleshooter" },
};

export default function Page() {
  return <Client />;
}
