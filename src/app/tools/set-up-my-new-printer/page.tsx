import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Set Up My New Printer — Step-by-Step Wizard | Setwise Digital",
  description: "Just got a new printer? Walk through our calm 5-step setup wizard for HP, Canon, Epson or Brother. Wi-Fi, USB or Bluetooth — plain English, no jargon, no stress.",
  keywords: [
    "how to set up new printer",
    "new printer setup guide",
    "printer wifi setup",
    "HP printer setup",
    "Canon printer setup",
    "Epson printer setup",
    "Brother printer setup",
    "connect printer to wifi",
    "printer setup wizard",
    "set up printer step by step",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/set-up-my-new-printer" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <Client />
    </Suspense>
  );
}
