import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";
export const metadata: Metadata = {
  title: "Printer Cost Per Page Calculator — HP Canon Epson Brother | Setwise Digital",
  description: "Calculate the true cost per page for your printer. Ink, paper and electricity included. Compare HP, Canon, Epson EcoTank and Brother models. Free calculator, plain English.",
  keywords: ["printer cost per page calculator","how much does it cost to print one page","HP printer cost per page","cheapest printer per page","Epson EcoTank cost per page","printer running cost"],
  alternates: { canonical: "https://setwisedigital.com/tools/printer-cost-per-page" },
};
export default function Page() { return <Suspense fallback={"<div className=\"min-h-screen bg-[#0d1117]\" />"}><Client /></Suspense>; }
