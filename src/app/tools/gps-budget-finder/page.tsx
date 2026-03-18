import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best GPS for Your Budget 2025 — Under $100, $150, $200",
  description: "Best GPS devices at every price point. Features you get and features you miss. Garmin and TomTom compared honestly at each budget. Free.",
  keywords: [
    "best GPS under 100",
    "best GPS under 200",
    "best GPS for the money 2025",
    "affordable GPS device",
    "cheap GPS that works well",
    "GPS value for money",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-budget-finder" },
  openGraph: {
    title: "Best GPS for Your Budget 2025 — Under $100, $150, $200",
    description: "Best GPS devices at every price point. Features you get and features you miss. Garmin and TomTom compared honestly at each budget. Free.",
    url: "https://www.setwisedigital.com/tools/gps-budget-finder",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Best GPS for Your Budget 2025 — Under $100, $150, $200",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Pick your budget and see the best GPS devices at each price point — features you get, features you miss, and honest top picks. Garmin and TomTom compared. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What is the best cheap GPS device?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin Drive 52 is the best budget GPS device — it provides reliable navigation, voice turn-by-turn directions, speed limit alerts, and covers North America for around $89-$99. For lifetime map updates at a budget price, look for the Garmin Drive 52 with LMT suffix (approximately $20 more). Avoid GPS devices under $60 from unknown brands — map data quality is significantly worse." },
      },
      {
        "@type": "Question",
        name: "Is it worth buying a GPS when I have Google Maps?",
        acceptedAnswer: { "@type": "Answer", text: "A GPS device is worth buying if: you regularly drive in areas with poor cell signal, you want offline maps for road trips, you make long road trips and phone battery drain is a concern, or you prefer a dedicated windshield-mounted screen. For everyday local driving with consistent 4G coverage, Google Maps or Apple Maps on your phone is sufficient and free." },
      },
      {
        "@type": "Question",
        name: "What GPS features matter most at each price point?",
        acceptedAnswer: { "@type": "Answer", text: "Under $100: basic navigation, speed alerts, offline maps. $100-$150: adds live traffic, Bluetooth calling, larger screen. $150-$200: adds lifetime maps free, larger display, faster routing processor. $200+: adds digital assistant integration, parking assist, driver alerts, larger 7-inch screens. According to Setwise Digital, the $150-$200 range (Garmin DriveSmart 55 or 65) offers the best balance of features for most drivers." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Best GPS for Your Budget 2025 — Under $100, $150, $200", item: "https://www.setwisedigital.com/tools/gps-budget-finder" },
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
