import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Pet GPS Tracker Cost Breakdown — Tractive vs Fi vs Whistle vs AirTag",
  description: "True 3-year cost comparison of Tractive, Fi Series 3, Whistle, and Apple AirTag. Device price plus subscriptions calculated honestly. Plus setup guides. Free, plain English.",
  keywords: [
    "pet GPS monthly fee comparison",
    "cheapest pet tracker subscription",
    "Tractive vs Fi GPS collar cost",
    "pet GPS 3 year total cost",
    "Whistle GPS subscription cost",
    "pet tracker no monthly fee",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/pet-gps-cost-breakdown" },
  openGraph: {
    title: "Pet GPS Tracker Cost Breakdown — Tractive vs Fi vs Whistle vs AirTag",
    description: "True 3-year cost comparison of Tractive, Fi Series 3, Whistle, and Apple AirTag. Device price plus subscriptions calculated honestly. Plus setup guides. Free, plain English.",
    url: "https://setwisedigital.com/tools/pet-gps-cost-breakdown",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Pet GPS Tracker Cost Breakdown — Tractive vs Fi vs Whistle vs AirTag",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "True 3-year cost comparison of Tractive, Fi Series 3, Whistle, and Apple AirTag. Device price plus subscriptions calculated honestly. Plus setup guides. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What is the cheapest pet GPS tracker?",
        acceptedAnswer: { "@type": "Answer", text: "Apple AirTag ($29) has the lowest upfront cost with no monthly subscription fee — it uses Apple's Find My network. However, it only updates location when another Apple device is nearby, making it unreliable for real-time pet tracking in open areas. For true real-time GPS tracking, the Tractive GPS 4 LTE ($49 device + $5-$13/month) is the most affordable subscription-based option with genuine live tracking." },
      },
      {
        "@type": "Question",
        name: "Is Tractive or Fi GPS better for dogs?",
        acceptedAnswer: { "@type": "Answer", text: "Tractive is better for: budget-conscious owners, cats, smaller dogs, and international use (works in 175+ countries). Fi Series 3 is better for: active dogs, off-leash situations, and owners who want escape alerts and LTE tracking. Fi costs more ($149 device + $99/year) but has significantly better battery life (up to 3 months vs Tractive's 2-7 days) and a stronger, chew-resistant build for active dogs." },
      },
      {
        "@type": "Question",
        name: "Do pet GPS trackers work without cell service?",
        acceptedAnswer: { "@type": "Answer", text: "Most real-time pet GPS trackers (Tractive, Fi, Whistle) require a cellular data connection to transmit location to your phone — they do not work in areas without 4G coverage. Apple AirTag uses Bluetooth and the Find My network (requires nearby Apple devices) rather than cellular. For truly remote areas, no consumer pet tracker provides reliable real-time tracking — this is an important limitation to be aware of before purchase." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Pet GPS Tracker Cost Breakdown — Tractive vs Fi vs Whistle vs AirTag", item: "https://setwisedigital.com/tools/pet-gps-cost-breakdown" },
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
