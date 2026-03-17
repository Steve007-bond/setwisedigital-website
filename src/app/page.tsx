import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "My Printer Stopped Working — What's Going On? (Learning Guide) | Setwise Digital",
  description: "Printer offline? Blank pages? Paper jam? Tap your problem and learn exactly what causes it — and what to do next. Plain English, step by step.",
  keywords: [
    "printer not printing",
    "printer stopped working",
    "printer offline fix",
    "why is my printer not working",
    "printer printing blank pages",
    "paper jam wont clear",
    "printer says offline",
    "printer connected but wont print",
    "HP printer not printing",
    "Canon printer offline",
    "printer troubleshooting guide",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/my-printer-stopped-working" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <Client />
    </Suspense>
  );
}
