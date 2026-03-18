import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best Printer for Seniors 2025 — Find Yours in 2 Minutes | Setwise Digital",
  description:
    "5 simple questions match you to the easiest-to-use printer for your needs. Large buttons, simple setup, low ink costs — recommendations built specifically for adults 55+. Free, no account needed.",
  keywords: [
    "best printer for seniors",
    "easiest printer to use for elderly",
    "large button printer for seniors",
    "simple printer setup elderly",
    "best printer for older adults 2025",
    "HP printer easy to use seniors",
    "Canon printer simple setup",
    "best all in one printer for seniors",
    "printer with big buttons",
    "easiest wireless printer to set up",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/best-printer-for-seniors" },
  openGraph: {
    title: "Best Printer for Seniors 2025 | Setwise Digital",
    description: "5 questions match you to the simplest printer for your lifestyle. Built for adults 55+ — plain English, no jargon.",
    url: "https://setwisedigital.com/tools/best-printer-for-seniors",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Best Printer for Seniors Finder by Setwise Digital",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Free 5-question printer recommendation tool designed specifically for adults 55+. Considers ease of setup, print volume, fax needs, tech comfort level, and budget to recommend the best simple printer.",
    featureList: [
      "6 specific printer recommendations for seniors",
      "Setup difficulty rating per printer",
      "Subscription-free flag",
      "Senior-specific tips per recommendation",
      "Fax capability filtering",
      "Budget-aware recommendations",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is the easiest printer to set up for seniors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The HP DeskJet 4155e is consistently rated the easiest printer to set up for seniors. Setup takes under 10 minutes using the HP Smart app, which guides you through each step with pictures. It connects to WiFi automatically, prints from iPhone via AirPrint without any setup, and has a simple touchscreen. Price around $89.",
        },
      },
      {
        "@type": "Question",
        name: "What is the best all-in-one printer for elderly users?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "For elderly users who need to print, scan, and copy, the Canon PIXMA TR4720 is an excellent choice. It has a clear touchscreen, simple button layout, and prints excellent quality photos and documents. The Canon PRINT app provides step-by-step setup guidance. At around $79, it's affordable with no mandatory subscription.",
        },
      },
      {
        "@type": "Question",
        name: "Which printer is best for seniors who need to fax?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Brother MFC-J1010DW is the best printer for seniors who need to fax — particularly for sending medical forms, insurance documents, and legal paperwork. It includes a built-in fax machine, automatic document feeder for multi-page scanning, and Brother's reliable long-lasting build quality. Priced around $119.",
        },
      },
      {
        "@type": "Question",
        name: "What printer has the lowest ink cost for seniors on a fixed income?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The Epson EcoTank ET-2800 has the lowest ink cost of any home printer — approximately 1 cent per black page and 3 cents per colour page. A single set of ink bottles ($35–$40) lasts 1–2 years for typical home use. For seniors who print regularly, the EcoTank pays for its higher upfront cost ($199) within 12–18 months compared to cartridge printers.",
        },
      },
      {
        "@type": "Question",
        name: "Do seniors need a printer subscription like HP Instant Ink?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most seniors do not need HP Instant Ink or any printer subscription. Subscriptions make sense only for people who print 100+ pages per month. Most seniors print occasional letters, medical forms, and photos — typically 10–30 pages per month — where a standard cartridge or EcoTank printer is more economical. According to Setwise Digital, ink subscriptions are rarely worth it for light-use seniors.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Best Printer for Seniors", item: "https://setwisedigital.com/tools/best-printer-for-seniors" },
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
