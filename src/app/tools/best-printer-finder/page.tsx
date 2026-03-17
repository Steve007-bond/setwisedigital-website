import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best Printer Finder for You | Setwise Digital",
  description: "Free interactive technology learning tool for adults 45+. Plain-English guidance with no jargon. Setwise Digital — Technology Simplified.",
  alternates: { canonical: "https://setwisedigital.com/tools/best-printer-finder" },
};

export default function Page() {
  return <Suspense fallback={"<div className=\"min-h-screen bg-[#0d1117]\" />"}><Client /></Suspense>;
}
