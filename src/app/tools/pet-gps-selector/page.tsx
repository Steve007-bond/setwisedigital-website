import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best Pet GPS Tracker 2025 — Dog and Cat Comparison",
  description: "Compare Fi Series 3, Whistle Go, Tractive GPS, Garmin T5, and Apple AirTag. Honest subscription cost breakdown. Free plain-English guide.",
  keywords: [
    "best dog GPS tracker 2025",
    "best cat GPS tracker",
    "Fi collar review",
    "Whistle GPS dog",
    "Tractive GPS review",
    "pet GPS tracker comparison",
    "dog GPS no subscription",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/pet-gps-selector" },
  openGraph: {
    title: "Best Pet GPS Tracker 2025 — Dog and Cat Comparison",
    description: "Compare Fi Series 3, Whistle Go, Tractive GPS, Garmin T5, and Apple AirTag. Honest subscription cost breakdown. Free plain-English guide.",
    url: "https://www.setwisedigital.com/tools/pet-gps-selector",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Best Pet GPS Tracker 2025 — Dog and Cat Tracker Comparison",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Compare the 5 best pet GPS trackers: Fi Series 3, Whistle Go, Tractive GPS, Garmin T5, and Apple AirTag. Honest subscription cost breakdown. Free plain-English guide.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What is the best GPS tracker for dogs?",
        acceptedAnswer: { "@type": "Answer", text: "The Fi Series 3 is the best GPS tracker for dogs — it has a 3-month battery life (dramatically longer than competitors), LTE real-time tracking, escape alerts when your dog leaves a safe zone, and a very durable build. At $149 upfront plus $99/year subscription, it is not the cheapest option but has the best combination of battery life, tracking accuracy, and durability. For budget buyers, Tractive GPS ($49 + $5-$13/month) is the best value." },
      },
      {
        "@type": "Question",
        name: "Is there a pet GPS tracker with no monthly fee?",
        acceptedAnswer: { "@type": "Answer", text: "Apple AirTag ($29) has no monthly fee and uses Apple's Find My network. However, it only updates location when another Apple device is nearby — it is not a true real-time GPS tracker. For genuine real-time tracking with no ongoing subscription, there are no reliable options currently on the market. All real-time GPS pet trackers require a monthly cellular data subscription." },
      },
      {
        "@type": "Question",
        name: "What is the best GPS tracker for cats?",
        acceptedAnswer: { "@type": "Answer", text: "The Tractive GPS CAT is designed specifically for cats — it is very lightweight (at just 35g including harness), waterproof, and has a safe zone feature to alert you when your cat leaves home. The $49 device plus $5/month subscription is the most affordable cat tracker available. Apple AirTag is an alternative for cats who stay in neighbourhoods with many Apple users, but is not reliable for cats who roam widely." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Best Pet GPS Tracker 2025 — Dog and Cat Tracker Comparison", item: "https://www.setwisedigital.com/tools/pet-gps-selector" },
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
