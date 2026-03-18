import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "What Does That Printer Spec Actually Mean? — Plain English Decoder | Setwise Digital",
  description: "Confused by DPI, PPM, ADF, duplex, or wireless direct? Tap any printer spec and get a plain-English explanation in seconds — plus whether you actually need it.",
  keywords: [
    "what is duplex printing",
    "what does DPI mean printer",
    "printer specs explained",
    "what is ADF on printer",
    "what does PPM mean",
    "what is wireless direct printing",
    "printer features explained plain English",
    "what is AirPrint",
    "inkjet vs laser printer difference",
    "what is auto document feeder",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/printer-specs-explained" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <Client />
    </Suspense>
  );
}
