import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";
export const metadata: Metadata = {
  title: "Printer Features Explained in Plain English — What They Mean | Setwise Digital",
  description: "What is Auto Duplex, ADF, PPM, or Wi-Fi printing? Plain-English explanations of every printer feature — who needs it and whether it's worth paying extra for.",
  keywords: ["printer features explained","what is auto duplex printer","ADF printer meaning","PPM printer speed","what printer features do I need","printer buying guide features explained"],
  alternates: { canonical: "https://setwisedigital.com/tools/printer-features-guide" },
};
export default function Page() { return <Suspense fallback={"<div className=\"min-h-screen bg-[#0d1117]\" />"}><Client /></Suspense>; }
