import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best Printer for Seniors — Find Yours in 2 Minutes | Setwise Digital",
  description: "Large buttons. Simple app. No subscription tricks. Answer 5 easy questions and find the perfect printer for adults 55+ — matched to how you actually print.",
  keywords: [
    "best printer for seniors 2025",
    "easy to use printer for elderly",
    "simple printer for older adults",
    "best printer for over 55",
    "senior friendly printer",
    "easiest printer to set up for seniors",
    "large button printer for elderly",
    "best home printer for seniors",
    "printer for retirees",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/best-printer-for-seniors" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <Client />
    </Suspense>
  );
}
