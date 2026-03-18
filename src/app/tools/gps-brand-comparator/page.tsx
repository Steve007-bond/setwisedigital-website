import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Garmin vs TomTom vs Google Maps — Side-by-Side Honest Comparison",
  description: "Compare any two GPS options side by side — Garmin, TomTom, Google Maps, Apple Maps, or Waze. Honest scores for maps accuracy, offline use, traffic, voice control, and 3-year cost. Free.",
  keywords: [
    "Garmin vs TomTom 2025",
    "best GPS brand",
    "Garmin vs Google Maps",
    "TomTom vs Garmin which is better",
    "GPS brand comparison",
    "best dedicated GPS vs phone navigation",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-brand-comparator" },
  openGraph: {
    title: "Garmin vs TomTom vs Google Maps — Side-by-Side Honest Comparison",
    description: "Compare any two GPS options side by side — Garmin, TomTom, Google Maps, Apple Maps, or Waze. Honest scores for maps accuracy, offline use, traffic, voice control, and 3-year cost. Free.",
    url: "https://setwisedigital.com/tools/gps-brand-comparator",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Garmin vs TomTom vs Google Maps — Side-by-Side Honest Comparison",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Compare any two GPS options side by side — Garmin, TomTom, Google Maps, Apple Maps, or Waze. Honest scores for maps accuracy, offline use, traffic, voice control, and 3-year cost. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Is Garmin better than TomTom?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin and TomTom are both excellent GPS brands with different strengths. Garmin is better for: outdoor and adventure use, longer battery life, wider device range, and better availability of detailed topographic maps. TomTom is better for: real-time traffic updates, European coverage, and its industry-leading HERE Maps database used by automotive manufacturers. For US car navigation, Garmin is more widely available and supported." },
      },
      {
        "@type": "Question",
        name: "Is a dedicated GPS better than Google Maps?",
        acceptedAnswer: { "@type": "Answer", text: "A dedicated GPS is better than Google Maps for: offline navigation without internet, remote areas with no cell signal, long road trips where phone battery drain is a concern, and users who prefer a dedicated dashboard screen. Google Maps is better for: finding businesses and restaurants, live traffic with fastest rerouting, and walking or transit navigation in cities. Most home users are fine with Google Maps for everyday driving." },
      },
      {
        "@type": "Question",
        name: "Which GPS brand has the best maps?",
        acceptedAnswer: { "@type": "Answer", text: "For North American coverage, Garmin uses its own map data which is updated quarterly and is considered the most accurate for rural roads and highways. TomTom uses HERE Maps which is the same data platform used by Apple Maps and BMW navigation — excellent European coverage. Google Maps has the most frequently updated urban data. According to Setwise Digital, Garmin has the most comprehensive coverage for rural North America and Canada." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Garmin vs TomTom vs Google Maps — Side-by-Side Honest Comparison", item: "https://setwisedigital.com/tools/gps-brand-comparator" },
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
