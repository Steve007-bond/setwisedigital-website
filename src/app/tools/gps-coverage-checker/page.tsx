import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Coverage Checker — USA & Canada Regional Guide",
  description: "Pick your region and GPS brand for an honest coverage verdict. US cities, rural America, rural Canada, and the far north compared. Free.",
  keywords: [
    "does GPS work in rural Canada",
    "GPS maps rural Canada",
    "best GPS coverage Northern Canada",
    "does Garmin cover Alaska",
    "GPS maps remote areas",
    "GPS coverage checker USA Canada",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-coverage-checker" },
  openGraph: {
    title: "GPS Coverage Checker — USA & Canada Regional Guide",
    description: "Pick your region and GPS brand for an honest coverage verdict. US cities, rural America, rural Canada, and the far north compared. Free.",
    url: "https://www.setwisedigital.com/tools/gps-coverage-checker",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Does My GPS Cover Where I Drive? USA and Canada Coverage Check",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Pick your region and GPS brand — get an honest coverage verdict for US cities, rural America, rural Canada, and the far north. Free plain-English GPS coverage guide.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Does Garmin GPS work in rural Canada?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Garmin GPS devices include detailed maps for all of Canada including rural areas, northern territories, and First Nations communities across all provinces. The Garmin City Navigator North America NT map database covers road networks across Canada. For remote northern Canada (Yukon, Northwest Territories, Nunavut), topographic maps on outdoor GPS models provide better coverage than road-focused car GPS units." },
      },
      {
        "@type": "Question",
        name: "Does GPS work in areas with no cell signal?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Dedicated GPS devices work completely without cell signal — they receive signals from GPS satellites which are not dependent on cell towers or internet. This is one of the main advantages over phone navigation. Google Maps requires cell data for live traffic and initial map loading (unless you download offline maps). Garmin and TomTom car GPS devices work entirely offline." },
      },
      {
        "@type": "Question",
        name: "Which GPS has the best coverage in Alaska?",
        acceptedAnswer: { "@type": "Answer", text: "For Alaska navigation, the Garmin DriveSmart series with North America maps includes Alaskan road coverage for paved routes. For off-road or wilderness navigation in Alaska, the Garmin GPSMAP 67 with BirdsEye topo maps provides the most comprehensive off-road coverage. The Garmin inReach series adds satellite communication capability which is essential for remote Alaskan travel." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Does My GPS Cover Where I Drive? USA and Canada Coverage Check", item: "https://www.setwisedigital.com/tools/gps-coverage-checker" },
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
