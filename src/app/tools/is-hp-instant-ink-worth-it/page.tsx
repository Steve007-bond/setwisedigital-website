import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Is HP Instant Ink Worth It? — Honest Ink Subscription Cost Calculator | Setwise Digital",
  description: "Find out in 60 seconds if an HP, Canon, Epson or Brother ink subscription will save you money — or quietly drain it. Honest calculator based on your monthly printing.",
  keywords: [
    "is HP Instant Ink worth it",
    "HP Instant Ink calculator",
    "ink subscription worth it",
    "HP Instant Ink cost comparison",
    "Epson ReadyPrint worth it",
    "printer ink subscription calculator",
    "should I get HP Instant Ink",
    "ink subscription vs buying cartridges",
    "HP Instant Ink cancel",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/is-hp-instant-ink-worth-it" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <Client />
    </Suspense>
  );
}
