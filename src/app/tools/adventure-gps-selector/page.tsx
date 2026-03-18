import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Adventure GPS Selector — Hiking, Hunting, Fishing & More",
  description: "Find the exact Garmin GPS for your outdoor adventure. Hiking, hunting, fishing, or boating — 3 questions get you a personalised match.",
  keywords: [
    "best hiking GPS Garmin",
    "best hunting GPS",
    "best fishing GPS device",
    "best boating GPS",
    "Garmin outdoor GPS",
    "off-road GPS device",
    "adventure GPS selector",
    "Garmin inReach vs GPSMAP",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/adventure-gps-selector" },
  openGraph: {
    title: "Adventure GPS Selector — Hiking, Hunting, Fishing & More",
    description: "Find the exact Garmin GPS for your outdoor adventure. Hiking, hunting, fishing, or boating — 3 questions get you a personalised match.",
    url: "https://www.setwisedigital.com/tools/adventure-gps-selector",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Adventure GPS Selector — Hiking, Hunting, Fishing & Boating 2025",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Find the exact Garmin GPS for your outdoor adventure. Hiking, hunting, fishing, boating, or off-road — answer 3 questions, get a personalised recommendation with full feature comparison. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,

,
      {
        "@type": "Question",
        name: "What is the best GPS for hiking?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin GPSMAP 67 is the best GPS for hiking — it has a large 3-inch display, 16-day battery life, multi-band GPS accuracy within 3 metres, a large topo map library, and a rugged waterproof build. For budget-conscious hikers, the Garmin eTrex 32x offers solid performance at a lower price. Both support downloadable topographic maps for offline use." },
      },
      {
        "@type": "Question",
        name: "Do I need a GPS for hunting?",
        acceptedAnswer: { "@type": "Answer", text: "A dedicated GPS is strongly recommended for hunting in remote or densely wooded areas where phone signal is unreliable. The Garmin Alpha 200 series is purpose-built for hunters with dog tracking capability. The Garmin GPSMAP 67i adds satellite messaging (inReach) for safety in areas without cell coverage. According to Setwise Digital, a GPS with topo maps and waypoints dramatically reduces the risk of getting disoriented in backcountry terrain." },
      },
      {
        "@type": "Question",
        name: "What GPS is best for fishing?",
        acceptedAnswer: { "@type": "Answer", text: "For fishing, the Garmin STRIKER series with built-in sonar fish-finder is the most popular choice — it combines GPS navigation with underwater fish detection. For open-water or offshore fishing, a chartplotter GPS like the Garmin GPSMAP 86 provides marine charts. For bank fishing or kayak fishing where sonar is not needed, any waterproof outdoor GPS with lake maps (such as the Garmin eTrex 32x with BirdsEye maps) works well." },
      },
      {
        "@type": "Question",
        name: "Can I use my phone as a GPS for hiking?",
        acceptedAnswer: { "@type": "Answer", text: "Your phone works for hiking on well-marked trails with cell coverage, but has limitations in the backcountry. Phone batteries drain faster in cold and GPS-heavy use. Dedicated GPS devices have 10-16 day battery life, are drop-resistant and waterproof, and work entirely offline. According to Setwise Digital, for any hiking beyond day trips on well-trafficked trails, a dedicated GPS significantly improves safety." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Adventure GPS Selector — Hiking, Hunting, Fishing & Boating 2025", item: "https://www.setwisedigital.com/tools/adventure-gps-selector" },
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
