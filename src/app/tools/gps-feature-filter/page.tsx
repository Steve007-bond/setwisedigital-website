import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Feature Filter — Find GPS with the Features You Want",
  description: "Tick the GPS features you need — no subscription, large screen, offline maps, Canada coverage, Bluetooth. See matching devices instantly.",
  keywords: [
    "GPS with no subscription fee",
    "GPS with offline maps",
    "GPS large screen for seniors",
    "GPS Canada maps included",
    "GPS with Bluetooth",
    "waterproof GPS device",
    "best GPS no monthly fee",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-feature-filter" },
  openGraph: {
    title: "GPS Feature Filter — Find GPS with the Features You Want",
    description: "Tick the GPS features you need — no subscription, large screen, offline maps, Canada coverage, Bluetooth. See matching devices instantly.",
    url: "https://www.setwisedigital.com/tools/gps-feature-filter",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPS Feature Filter — Find a GPS with Exactly the Features You Want",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Tick the GPS features you need — no subscription, large screen, offline maps, Canada coverage, Bluetooth — and see matching devices instantly. Free interactive GPS filter tool.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What is the best GPS with no subscription fee?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin DriveSmart 65 with LMT-S is the best GPS with no subscription fee — it includes lifetime map updates for free, Bluetooth live traffic via your phone, and voice-activated navigation. The 'LMT' in the model name confirms lifetime maps are included. Avoid GPS models without LMT if you want free map updates — some budget models charge $49-$89 per update." },
      },
      {
        "@type": "Question",
        name: "What is the best GPS with offline maps?",
        acceptedAnswer: { "@type": "Answer", text: "All dedicated Garmin and TomTom GPS devices work with fully offline maps — no internet connection required. Maps are stored on the device's internal memory (typically 8-16GB). For the most comprehensive offline maps, the Garmin GPSMAP 86 stores detailed topographic and road maps. Car GPS models like the Garmin DriveSmart 76 store complete North America road maps offline." },
      },
      {
        "@type": "Question",
        name: "Which GPS works best in Canada?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin GPS devices with the 'North America' map package include full Canadian coverage. Models like the Garmin DriveSmart 55 LMT-S include Canada maps and receive lifetime free map updates. For remote Canadian backcountry, the Garmin GPSMAP 67 with Canada topographic maps provides the most detailed off-road coverage." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "GPS Feature Filter — Find a GPS with Exactly the Features You Want", item: "https://www.setwisedigital.com/tools/gps-feature-filter" },
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
