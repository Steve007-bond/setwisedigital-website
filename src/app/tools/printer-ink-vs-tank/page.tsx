import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Ink Cartridge vs Ink Tank Printer — Which is Right?",
  description: "Regular inkjet or EcoTank/MegaTank? 5 honest questions give you a clear answer based on how you actually print. Free, plain English.",
  keywords: [
    "ink cartridge vs ink tank printer",
    "Epson EcoTank vs regular printer",
    "should I buy EcoTank",
    "Canon MegaTank vs cartridges",
    "ink tank printer worth it",
    "how much does EcoTank save",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/printer-ink-vs-tank" },
  openGraph: {
    title: "Ink Cartridge vs Ink Tank Printer — Which is Right?",
    description: "Regular inkjet or EcoTank/MegaTank? 5 honest questions give you a clear answer based on how you actually print. Free, plain English.",
    url: "https://www.setwisedigital.com/tools/printer-ink-vs-tank",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Ink Cartridge vs Ink Tank Printer — Which is Right for You?",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Should you buy a regular inkjet printer or switch to an Epson EcoTank or Canon MegaTank? 5 honest questions give you a clear answer based on how you actually print. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Is an EcoTank printer worth it?",
        acceptedAnswer: { "@type": "Answer", text: "An Epson EcoTank is worth it if you print more than 50 pages per month. At that volume, the ink savings pay back the higher upfront cost ($199 vs $89 for a standard inkjet) within 12-18 months. For light users printing under 20 pages per month, the savings take too long to materialise and a standard cartridge printer is a better choice. According to Setwise Digital, EcoTank is particularly good value for families who print school projects and photos regularly." },
      },
      {
        "@type": "Question",
        name: "How long does EcoTank ink last?",
        acceptedAnswer: { "@type": "Answer", text: "Epson EcoTank ink bottles last approximately 1-2 years for typical home use (50-100 pages per month). One set of EcoTank bottles ($35-$40) prints approximately 4,500 black pages and 7,500 colour pages. Compared to standard inkjet cartridges that print 100-300 pages each, EcoTank ink lasts 15-20x longer before needing to be refilled." },
      },
      {
        "@type": "Question",
        name: "Can EcoTank ink run out?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. EcoTank ink tanks do eventually run empty and need refilling. The transparent tanks allow you to see the ink level at a glance — no guessing when you will run out. When low, you purchase a bottle of Epson EcoTank ink ($12-$15 per colour bottle) and pour it into the appropriate tank. The refill process takes about 2 minutes and creates no mess if done carefully." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Ink Cartridge vs Ink Tank Printer — Which is Right for You?", item: "https://www.setwisedigital.com/tools/printer-ink-vs-tank" },
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
