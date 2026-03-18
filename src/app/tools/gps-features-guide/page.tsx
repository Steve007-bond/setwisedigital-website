import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Features Explained in Plain English — Live Traffic, Lane Assist & More",
  description: "What does Live Traffic, Lane Assist, LMT, or Bluetooth mean on a GPS? Plain-English explanations of every GPS spec — who needs it and whether it's worth paying more for. Free guide.",
  keywords: [
    "what is live traffic GPS",
    "GPS lane assist explained",
    "GPS LMT meaning",
    "Garmin features explained",
    "what GPS features do I need",
    "GPS buying guide 2025",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-features-guide" },
  openGraph: {
    title: "GPS Features Explained in Plain English — Live Traffic, Lane Assist & More",
    description: "What does Live Traffic, Lane Assist, LMT, or Bluetooth mean on a GPS? Plain-English explanations of every GPS spec — who needs it and whether it's worth paying more for. Free guide.",
    url: "https://setwisedigital.com/tools/gps-features-guide",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPS Features Explained in Plain English — Live Traffic, Lane Assist & More",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "What does Live Traffic, Lane Assist, LMT, or Bluetooth mean on a GPS? Plain-English explanations of every GPS spec — who needs it and whether it's worth paying more for. Free guide.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What does LMT mean on a GPS?",
        acceptedAnswer: { "@type": "Answer", text: "LMT stands for Lifetime Maps and Traffic — it means the GPS comes with free map updates for the life of the device (as long as the manufacturer supports it, typically 7-10 years) and includes a traffic receiver for live traffic data. LM means Lifetime Maps only (no traffic receiver). Always look for LMT or LM in the GPS model name to avoid paying for map updates separately." },
      },
      {
        "@type": "Question",
        name: "What is GPS lane assist?",
        acceptedAnswer: { "@type": "Answer", text: "Lane assist is a GPS feature that shows a graphic of the actual highway lanes at complex junctions and shows exactly which lane you need to be in before a turn or exit. Without lane assist, the GPS just says 'take exit 42A' — with lane assist it shows a realistic view of the road ahead with your lane highlighted. Lane assist significantly reduces the stress of navigating unfamiliar multi-lane interchanges." },
      },
      {
        "@type": "Question",
        name: "What does live traffic on GPS mean?",
        acceptedAnswer: { "@type": "Answer", text: "Live traffic means the GPS receives real-time data about traffic congestion, accidents, and road closures, and automatically reroutes you to avoid delays. On Garmin devices, live traffic works either via a built-in cellular receiver (in LMT-S models) or via Bluetooth from your phone's internet connection (in standard LMT models). Live traffic updates every 2-5 minutes." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "GPS Features Explained in Plain English — Live Traffic, Lane Assist & More", item: "https://setwisedigital.com/tools/gps-features-guide" },
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
