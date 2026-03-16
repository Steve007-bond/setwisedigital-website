import type { Metadata } from "next";
import Client from "./Client";
export const metadata: Metadata = {
  title: "Ink Cartridge vs Ink Tank Printer — Which is Right for You? | Setwise Digital",
  description: "Should you buy a regular ink cartridge printer or switch to an Epson EcoTank or Canon MegaTank? 5 honest questions give you a clear answer based on how you actually print.",
  keywords: ["ink cartridge vs ink tank printer","Epson EcoTank vs regular printer","should I buy EcoTank","inkjet vs ink tank","best ink tank printer 2026","printer ink cost savings"],
  alternates: { canonical: "https://setwisedigital.com/tools/printer-ink-vs-tank" },
};
export default function Page() { return <Client />; }
