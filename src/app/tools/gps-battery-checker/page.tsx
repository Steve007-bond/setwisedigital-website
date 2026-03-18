import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Battery Life Checker — Which GPS Lasts Your Trip?",
  description: "How long will you be away from a charger? Get a battery life verdict for every major GPS model — day hike to week expedition. Free.",
  keywords: [
    "GPS with longest battery life",
    "handheld GPS battery life comparison",
    "GPS for multi-day hiking battery",
    "best GPS battery outdoor adventures",
    "GPS solar charging",
    "Garmin battery life comparison",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-battery-checker" },
  openGraph: {
    title: "GPS Battery Life Checker — Which GPS Lasts Your Trip?",
    description: "How long will you be away from a charger? Get a battery life verdict for every major GPS model — day hike to week expedition. Free.",
    url: "https://www.setwisedigital.com/tools/gps-battery-checker",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPS Battery Life Checker — Which GPS Lasts Your Whole Trip?",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Tell us how long you'll be away from a charger and get a battery life verdict for every major GPS model. Day hike to week-long expedition. Garmin, Spot, and handheld GPS compared. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Which GPS has the longest battery life?",
        acceptedAnswer: { "@type": "Answer", text: "For outdoor handheld GPS, the Garmin inReach Mini 2 lasts up to 14 days in tracking mode and 24 hours with 10-minute tracking. The Garmin GPSMAP 67i lasts up to 165 hours in standard GPS mode. For car GPS, all Garmin DriveSmart models have 1-2 hours of internal battery and are designed to run continuously while plugged into the car's power outlet. Satellite communicators like SPOT have the longest battery life for emergency use — up to 7 days." },
      },
      {
        "@type": "Question",
        name: "How do I extend my GPS battery life?",
        acceptedAnswer: { "@type": "Answer", text: "To extend GPS battery life: 1) Reduce screen brightness — the display is the biggest battery drain. 2) Turn off Bluetooth if not needed. 3) Disable live traffic (uses cellular data and processing). 4) Set the map refresh rate to slower (less frequent GPS polling). 5) Use battery save mode when available. 6) Carry a portable USB power bank for day hikes. Garmin's battery save mode can extend life by 30-50%." },
      },
      {
        "@type": "Question",
        name: "How long does a Garmin GPS battery last?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin handheld GPS battery life: eTrex 32x lasts 25 hours on 2 AA batteries. GPSMAP 67 lasts 16 hours on a rechargeable battery. inReach Mini 2 lasts up to 14 days in tracking mode. Car GPS models (DriveSmart, Drive series) have 1-2 hours of internal battery — they are designed to run while plugged into the car." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "GPS Battery Life Checker — Which GPS Lasts Your Whole Trip?", item: "https://www.setwisedigital.com/tools/gps-battery-checker" },
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
