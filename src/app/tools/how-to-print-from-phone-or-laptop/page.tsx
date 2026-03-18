import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "How to Print from iPhone, Android or Laptop — Pick Your Device | Setwise Digital",
  description: "Select your phone or computer and your printer brand. Get the exact steps written for your combination — nothing else. iPhone AirPrint, Android, Windows, Mac — plain English.",
  keywords: [
    "how to print from iPhone",
    "how to print from Android",
    "print from phone to printer",
    "how to print from laptop",
    "how to print from Mac",
    "how to print from Windows",
    "AirPrint how to use",
    "print from Samsung phone",
    "print from Google Pixel",
    "print from iPad",
    "how to print from phone wirelessly",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/how-to-print-from-phone-or-laptop" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <Client />
    </Suspense>
  );
}
