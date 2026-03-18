import type { Metadata } from "next";
import GpsClient from "./GpsClient";

// DEPLOYMENT NOTE: Rename your existing techbridge/gps/page.tsx → techbridge/gps/GpsClient.tsx

export const metadata: Metadata = {
  title: "GPS Learning Guide — Map Updates, Navigation & Garmin Setup | Setwise Digital",
  description:
    "Learn how GPS navigation works in plain English. How to update Garmin maps, read GPS directions, plan routes, and understand GPS features. Step-by-step guide for beginners and seniors.",
  keywords: [
    "how to update Garmin GPS",
    "GPS navigation learning guide",
    "how to use GPS plain English",
    "GPS map update guide seniors",
    "TomTom update guide",
    "how does GPS work plain English",
    "Garmin GPS for beginners",
    "car GPS setup guide",
    "GPS learning guide adults over 50",
  ],
  alternates: { canonical: "https://setwisedigital.com/techbridge/gps" },
  openGraph: {
    title: "GPS Learning Guide — Map Updates & Navigation | Setwise Digital",
    description: "How to update Garmin maps, read GPS directions, and plan routes. Step-by-step for beginners.",
    url: "https://setwisedigital.com/techbridge/gps",
  },
};

export default function TechBridgeGpsPage() {
  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "GPS Learning Guide by Setwise Digital",
    url: "https://setwisedigital.com/techbridge/gps",
    description:
      "Plain-English GPS learning guide covering map updates, Garmin Express setup, route planning, GPS navigation features, and troubleshooting for Garmin, TomTom, and in-car navigation systems.",
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    teaches: [
      "How to update Garmin GPS maps",
      "How GPS navigation works",
      "How to use Garmin Express",
      "Route planning basics",
      "Understanding GPS features like live traffic and lane assist",
    ],
    audience: { "@type": "Audience", audienceType: "Adults 40+" },
    isAccessibleForFree: true,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I update my Garmin GPS maps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To update Garmin GPS maps: Method 1 (Wi-Fi, easiest): on your Garmin screen tap Settings → Map & Vehicle → Manage Maps → tap the update button if available. Method 2 (computer): download Garmin Express free from garmin.com/express, connect your GPS to your computer with a USB cable, open Garmin Express, and it will show available map updates. Updates are free if your GPS came with lifetime maps.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I update my GPS maps?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Garmin and TomTom release map updates quarterly (4 times per year). According to Setwise Digital, approximately 72% of GPS users never update their maps — which means their GPS may show roads, speed limits, or points of interest that are years out of date. For regular drivers, updating maps at least once or twice per year is recommended.",
        },
      },
      {
        "@type": "Question",
        name: "Should I use a GPS device or just my phone for navigation?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A dedicated GPS device is better if: you drive in areas with poor cell signal, you want offline maps that work without internet, your phone mount and battery use cause problems, or you prefer a dedicated screen at eye level. Your phone (Google Maps or Apple Maps) is sufficient if you always have good cell signal, drive in familiar areas, and don't mind the battery drain.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "TechBridge", item: "https://setwisedigital.com/techbridge" },
      { "@type": "ListItem", position: 3, name: "GPS", item: "https://setwisedigital.com/techbridge/gps" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <GpsClient />
    </>
  );
}
