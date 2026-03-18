import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best GPS for RV and Motorhome 2025 — Garmin RV Guide",
  description: "Which Garmin RV GPS fits your rig? 4 questions about your motorhome type, size, and travel style. Height routing and campgrounds covered.",
  keywords: [
    "best GPS for RV",
    "RV GPS with height restrictions",
    "GPS for motorhome",
    "Garmin RV GPS review",
    "RV navigation campground maps",
    "GPS for large motorhome Class A",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/rv-gps-finder" },
  openGraph: {
    title: "Best GPS for RV and Motorhome 2025 — Garmin RV Guide",
    description: "Which Garmin RV GPS fits your rig? 4 questions about your motorhome type, size, and travel style. Height routing and campgrounds covered.",
    url: "https://www.setwisedigital.com/tools/rv-gps-finder",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Best GPS for RV and Motorhome 2025 — Garmin RV 795, 895, 1095",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Which Garmin RV GPS fits your rig? 4 questions about your motorhome type, size, and travel style. Height routing, campground database, and RV navigation explained in plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What is the best GPS for an RV?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin RV 795 is the best GPS for most RVs — it accepts your motorhome's height, weight, and length to calculate routes that avoid low bridges, weight-restricted roads, and tight turns. It includes a campground database, RV park reviews, and fuel stop locations. The Garmin RV 895 adds a larger 8-inch screen for even easier reading on long drives. Both include lifetime North America map updates free." },
      },
      {
        "@type": "Question",
        name: "Can a regular car GPS be used in an RV?",
        acceptedAnswer: { "@type": "Answer", text: "A regular car GPS can be used in an RV but is not recommended for large motorhomes. Car GPS units do not account for height restrictions, weight limits, or propane restrictions in tunnels — which can result in routing a Class A motorhome under a low bridge. Garmin RV GPS units accept your specific vehicle dimensions and route accordingly. For smaller RVs under 25 feet without height or weight concerns, a standard car GPS works adequately." },
      },
      {
        "@type": "Question",
        name: "What GPS features does an RV need?",
        acceptedAnswer: { "@type": "Answer", text: "Key RV GPS features: vehicle profile (enter height, weight, length, propane status), height restriction routing, weight limit routing, campground database, RV-specific points of interest (dump stations, RV parks, propane fill locations), large screen for easy reading, and loud voice guidance. The Garmin RV 795 and 895 include all of these features. Standard car GPS models lack RV-specific routing." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Best GPS for RV and Motorhome 2025 — Garmin RV 795, 895, 1095", item: "https://www.setwisedigital.com/tools/rv-gps-finder" },
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
