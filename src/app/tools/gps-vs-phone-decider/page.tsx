import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Device vs Phone Navigation — Which Do You Need?",
  description: "Do you need a dedicated GPS or is your phone enough? 4 questions about how you drive and where you go. Honest plain-English verdict. Free.",
  keywords: [
    "do I need a GPS device",
    "GPS or Google Maps",
    "dedicated GPS vs smartphone navigation",
    "should I buy a GPS device",
    "GPS device vs phone which is better",
    "Garmin vs Google Maps 2025",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-vs-phone-decider" },
  openGraph: {
    title: "GPS Device vs Phone Navigation — Which Do You Need?",
    description: "Do you need a dedicated GPS or is your phone enough? 4 questions about how you drive and where you go. Honest plain-English verdict. Free.",
    url: "https://www.setwisedigital.com/tools/gps-vs-phone-decider",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPS Device vs Phone Navigation — Which is Right for You?",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Do you actually need a dedicated GPS or is your phone enough? 4 questions about how you drive, where you go, and your phone habits. Honest plain-English verdict. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Do I still need a GPS if I have a smartphone?",
        acceptedAnswer: { "@type": "Answer", text: "You still need a dedicated GPS if: you drive frequently in areas with poor cell coverage, you make long road trips and phone battery drain is a concern, you want offline maps without using phone storage, you prefer a dedicated windshield-mounted screen, or you are over 60 and find a larger dedicated GPS screen easier to use. For urban everyday driving with consistent 4G coverage, a smartphone is sufficient." },
      },
      {
        "@type": "Question",
        name: "Is Google Maps as good as Garmin?",
        acceptedAnswer: { "@type": "Answer", text: "Google Maps is better than Garmin for: finding businesses and restaurants, real-time traffic accuracy in cities, walking and transit directions, and up-to-date map data in urban areas. Garmin is better for: remote and rural navigation, offline use without cell signal, dedicated display at eye level, and not draining your phone battery. For road trips to remote areas, Garmin is significantly more reliable." },
      },
      {
        "@type": "Question",
        name: "What are the disadvantages of using phone navigation?",
        acceptedAnswer: { "@type": "Answer", text: "Disadvantages of using your phone for navigation: battery drains significantly faster during navigation (30-50% per hour), requires cell data for live traffic and map loading, phone calls interrupt navigation audio, mounting the phone can obstruct your view if not done carefully, and accuracy drops significantly in areas without 4G coverage. A dedicated GPS device addresses all of these issues." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "GPS Device vs Phone Navigation — Which is Right for You?", item: "https://www.setwisedigital.com/tools/gps-vs-phone-decider" },
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
