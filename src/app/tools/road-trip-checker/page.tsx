import type { Metadata } from "next";
import { Suspense } from "react";
import RoadTripCheckerClient from "./RoadTripCheckerClient";

export const metadata: Metadata = {
  title: "Road Trip GPS Pre-Check — Is Your GPS Ready Before You Leave?",
  description: "Free 5-step GPS road trip checklist. Make sure your Garmin, TomTom, or in-car GPS is updated, charged, and route-ready before your next trip. Plain English — takes 3 minutes.",
  keywords: [
    "GPS road trip checklist",
    "is my GPS ready for road trip",
    "check GPS before long drive",
    "Garmin GPS road trip preparation",
    "GPS pre-trip check",
    "GPS charged and updated for travel",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/road-trip-checker" },
  openGraph: {
    title: "Road Trip GPS Pre-Check — Is Your GPS Ready Before You Leave?",
    description: "Free 5-step GPS road trip checklist. Make sure your Garmin, TomTom, or in-car GPS is updated, charged, and route-ready before your next trip. Plain English — takes 3 minutes.",
    url: "https://setwisedigital.com/tools/road-trip-checker",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Road Trip GPS Pre-Check — Is Your GPS Ready Before You Leave?",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Free 5-step GPS road trip checklist. Make sure your Garmin, TomTom, or in-car GPS is updated, charged, and route-ready before your next trip. Plain English — takes 3 minutes.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "How do I prepare my GPS for a road trip?",
        acceptedAnswer: { "@type": "Answer", text: "To prepare your GPS for a road trip: 1) Update your maps via Garmin Express or Wi-Fi — check for updates at least a week before departure. 2) Charge your GPS or verify it works when plugged into the car power outlet. 3) Test the route at home by entering your destination and reviewing the suggested route. 4) Clean the windshield mount suction cup. 5) Confirm your GPS has North America maps if traveling to Canada or Mexico. 6) Download any additional regional maps needed for your destination." },
      },
      {
        "@type": "Question",
        name: "Should I update GPS before a road trip?",
        acceptedAnswer: { "@type": "Answer", text: "Yes — always update your GPS maps before a road trip, especially to unfamiliar areas. New roads, changed speed limits, and closed routes will not appear on outdated maps. Garmin releases map updates quarterly. Start the update at least 3-5 days before your trip — large map downloads (North America is 10-15GB) can take several hours. According to Setwise Digital, map updates prevent the majority of 'wrong directions' complaints." },
      },
      {
        "@type": "Question",
        name: "What should I check on my GPS before a long drive?",
        acceptedAnswer: { "@type": "Answer", text: "Before a long drive, check: 1) Map version and date (Settings → About → Map). 2) Route preferences are correct — highway vs avoiding tolls, fastest vs shortest. 3) Volume is audible over road noise. 4) Speed camera alerts are enabled if available. 5) Home address and destination are correctly entered. 6) GPS mounts securely and the screen is visible without obstructing your view. 7) Car power cable is working." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Road Trip GPS Pre-Check — Is Your GPS Ready Before You Leave?", item: "https://setwisedigital.com/tools/road-trip-checker" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
        <RoadTripCheckerClient />
      </Suspense>
    </>
  );
}
