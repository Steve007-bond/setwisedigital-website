import type { Metadata } from "next";
import { Suspense } from "react";
import PrinterCostClient from "./PrinterCostClient";

export const metadata: Metadata = {
  title: "Printer True Cost Calculator 2025 — HP, Canon, Epson",
  description: "How much does your printer cost per year? Ink, paper, and electricity all included. Free annual cost calculator. Plain English comparison.",
  keywords: [
    "printer true cost calculator",
    "how much does a printer cost per year",
    "HP printer annual ink cost",
    "Canon printer running costs",
    "Epson EcoTank vs cartridge cost",
    "printer cost comparison",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/printer-cost-calculator" },
  openGraph: {
    title: "Printer True Cost Calculator 2025 — HP, Canon, Epson",
    description: "How much does your printer cost per year? Ink, paper, and electricity all included. Free annual cost calculator. Plain English comparison.",
    url: "https://www.setwisedigital.com/tools/printer-cost-calculator",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Printer True Cost Calculator 2025 — HP, Canon, Epson, Brother",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Find out exactly how much your printer costs per year — ink, paper, and electricity all included. Free annual cost calculator for HP, Canon, Epson, and Brother. Plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "How much does it cost to run a printer per year?",
        acceptedAnswer: { "@type": "Answer", text: "Average annual printer running costs: HP DeskJet 4155e (light use, 50 pages/month) — approximately $120/year in ink and paper. Epson EcoTank ET-2800 (same usage) — approximately $25/year. Brother MFC-J4335DW with XL cartridges — approximately $60/year. HP LaserJet (black only, 100 pages/month) — approximately $90/year. According to Setwise Digital, switching from a standard cartridge printer to an EcoTank saves an average of $80-$150 per year." },
      },
      {
        "@type": "Question",
        name: "How much does printer ink cost per year?",
        acceptedAnswer: { "@type": "Answer", text: "Annual ink cost varies dramatically by printer type. Standard HP or Canon inkjet cartridges: $100-$250/year for regular home use. Brother XL cartridges: $50-$100/year. Epson EcoTank refill bottles: $20-$40/year (bottles last 1-2 years). HP Instant Ink subscription: $35-$120/year depending on plan. The type of printer you buy has a far greater impact on annual ink cost than the brand alone." },
      },
      {
        "@type": "Question",
        name: "Is it cheaper to buy a new printer or refill ink?",
        acceptedAnswer: { "@type": "Answer", text: "For most standard inkjet printers, buying new cartridges from the manufacturer is cheaper than refill kits, which can damage print heads if used incorrectly. Third-party compatible cartridges are 40-60% cheaper and generally reliable for document printing. For the cheapest long-term printing, an Epson EcoTank is the most cost-effective option — refill bottles cost a fraction of any cartridge type." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Printer True Cost Calculator 2025 — HP, Canon, Epson, Brother", item: "https://www.setwisedigital.com/tools/printer-cost-calculator" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
        <PrinterCostClient />
      </Suspense>
    </>
  );
}
