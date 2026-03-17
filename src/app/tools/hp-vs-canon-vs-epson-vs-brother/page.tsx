import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "HP vs Canon vs Epson vs Brother — Which Printer Wins for You? | Setwise Digital",
  description: "Stop guessing. Answer 3 questions and get a plain-English side-by-side comparison of HP, Canon, Epson and Brother printers — matched to how you actually print.",
  keywords: [
    "HP vs Canon printer 2025",
    "Epson vs Brother printer",
    "best printer brand comparison",
    "HP or Canon which is better",
    "printer brand comparison",
    "which printer brand is most reliable",
    "Canon vs Epson printer",
    "best printer for home use 2025",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/hp-vs-canon-vs-epson-vs-brother" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <Client />
    </Suspense>
  );
}
