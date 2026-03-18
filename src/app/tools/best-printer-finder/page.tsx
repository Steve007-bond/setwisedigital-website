import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best Printer Finder — Photos, Documents or Both? Free 5-Question Match",
  description: "Answer 5 questions about what you print, how often, and your budget. Setwise Digital matches you to the best HP, Canon, Epson, or Brother printer for your home. Free, plain English.",
  keywords: [
    "best printer for home use 2025",
    "best home printer",
    "which printer should I buy",
    "HP vs Canon vs Epson printer",
    "best printer for documents",
    "best printer under 100",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/best-printer-finder" },
  openGraph: {
    title: "Best Printer Finder — Photos, Documents or Both? Free 5-Question Match",
    description: "Answer 5 questions about what you print, how often, and your budget. Setwise Digital matches you to the best HP, Canon, Epson, or Brother printer for your home. Free, plain English.",
    url: "https://setwisedigital.com/tools/best-printer-finder",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Best Printer Finder — Photos, Documents or Both? Free 5-Question Match",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Answer 5 questions about what you print, how often, and your budget. Setwise Digital matches you to the best HP, Canon, Epson, or Brother printer for your home. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What is the best home printer for beginners?",
        acceptedAnswer: { "@type": "Answer", text: "The HP DeskJet 4155e is the best home printer for beginners — setup takes under 10 minutes using the HP Smart app, it connects to Wi-Fi automatically, and prints from iPhone via AirPrint without any additional setup. Priced around $89, it includes wireless printing, scanning, and copying. According to Setwise Digital, HP's setup process is the most beginner-friendly of all major printer brands." },
      },
      {
        "@type": "Question",
        name: "Should I buy inkjet or laser printer for home use?",
        acceptedAnswer: { "@type": "Answer", text: "For most home users, an inkjet printer is the better choice. Inkjets print photos beautifully, cost less upfront ($60-$200), and handle the mix of documents, forms, and photos that most families print. A laser printer is better if you print exclusively black-and-white documents at high volume (200+ pages per month) — laser toner is cheaper per page and never dries out." },
      },
      {
        "@type": "Question",
        name: "What is the cheapest printer to run?",
        acceptedAnswer: { "@type": "Answer", text: "The Epson EcoTank ET-2800 has the cheapest running cost of any home printer — approximately 1 cent per black page and 3 cents per colour page using refill ink bottles. One set of bottles ($35-$40) lasts 1-2 years. While the upfront cost is higher ($199), the EcoTank pays for itself within 12-18 months compared to standard cartridge printers." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Best Printer Finder — Photos, Documents or Both? Free 5-Question Match", item: "https://setwisedigital.com/tools/best-printer-finder" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
        <Client />
      </Suspense>
    </>
  );
}
