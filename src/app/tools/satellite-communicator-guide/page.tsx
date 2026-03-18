import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Garmin inReach vs ZOLEO vs SPOT — Which Satellite Communicator?",
  description: "Garmin inReach Mini 2, ZOLEO, or SPOT Gen4? 4 questions about your adventures, your family, and your budget. Honest plain-English comparison of all three. Free.",
  keywords: [
    "Garmin inReach vs SPOT vs ZOLEO",
    "best satellite communicator 2025",
    "inReach Mini 2 review",
    "ZOLEO satellite communicator",
    "satellite messenger for hikers",
    "backcountry SOS device comparison",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/satellite-communicator-guide" },
  openGraph: {
    title: "Garmin inReach vs ZOLEO vs SPOT — Which Satellite Communicator?",
    description: "Garmin inReach Mini 2, ZOLEO, or SPOT Gen4? 4 questions about your adventures, your family, and your budget. Honest plain-English comparison of all three. Free.",
    url: "https://setwisedigital.com/tools/satellite-communicator-guide",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Garmin inReach vs ZOLEO vs SPOT — Which Satellite Communicator?",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Garmin inReach Mini 2, ZOLEO, or SPOT Gen4? 4 questions about your adventures, your family, and your budget. Honest plain-English comparison of all three. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Is Garmin inReach worth it?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin inReach is worth it for anyone who regularly spends time in areas without cell coverage — remote hiking, backcountry camping, offshore fishing, or international travel. The inReach Mini 2 ($349 + $11.95-$64.99/month subscription) provides two-way satellite messaging, SOS emergency alert with 24/7 monitoring, and GPS tracking. According to Setwise Digital, the peace of mind for family members when a loved one is in a remote area is the primary value for most users." },
      },
      {
        "@type": "Question",
        name: "What is the difference between Garmin inReach and SPOT?",
        acceptedAnswer: { "@type": "Answer", text: "Key differences: Garmin inReach allows two-way messaging (you can receive replies from family). SPOT Gen4 sends one-way messages only (family can see your location but cannot respond). Garmin inReach has better GPS accuracy and more detailed tracking. SPOT has a lower device cost ($149 vs $349 for inReach Mini 2) and slightly cheaper subscription plans. For most users, inReach's two-way messaging capability is worth the higher cost." },
      },
      {
        "@type": "Question",
        name: "How much does Garmin inReach cost per month?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin inReach subscription plans: Safety plan (10 messages/month, tracking) — $11.95/month. Recreation plan (40 messages/month) — $24.95/month. Expedition plan (unlimited messages) — $64.99/month. Annual plans provide approximately 20% savings. You can pause the subscription during months when not in the field. The annual Safety plan costs $143/year — less than two nights in a hotel for emergency communication capability anywhere on Earth." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Garmin inReach vs ZOLEO vs SPOT — Which Satellite Communicator?", item: "https://setwisedigital.com/tools/satellite-communicator-guide" },
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
