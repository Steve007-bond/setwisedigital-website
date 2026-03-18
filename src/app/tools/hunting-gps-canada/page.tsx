import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best GPS for Hunting in Canada — Boreal Forest, Mountains, Backcountry",
  description: "Hunting GPS guide built specifically for Canadian conditions. Boreal forest, mountain terrain, dog hunting, remote backcountry. Garmin GPSMAP 67, 66i, Alpha, and Montana compared. Free.",
  keywords: [
    "best GPS for hunting Canada",
    "hunting GPS backcountry Canada",
    "GPS for deer hunting Ontario",
    "GPS with topo maps hunting",
    "Garmin GPSMAP hunting",
    "handheld GPS for deer hunting Canada",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/hunting-gps-canada" },
  openGraph: {
    title: "Best GPS for Hunting in Canada — Boreal Forest, Mountains, Backcountry",
    description: "Hunting GPS guide built specifically for Canadian conditions. Boreal forest, mountain terrain, dog hunting, remote backcountry. Garmin GPSMAP 67, 66i, Alpha, and Montana compared. Free.",
    url: "https://setwisedigital.com/tools/hunting-gps-canada",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Best GPS for Hunting in Canada — Boreal Forest, Mountains, Backcountry",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Hunting GPS guide built specifically for Canadian conditions. Boreal forest, mountain terrain, dog hunting, remote backcountry. Garmin GPSMAP 67, 66i, Alpha, and Montana compared. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What is the best GPS for hunting in the Canadian boreal forest?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin GPSMAP 67 is the best GPS for hunting in the Canadian boreal forest — it uses multi-band GPS and GLONASS for accuracy under heavy tree canopy, has a 16-day battery life, IPX7 waterproofing, and supports detailed Canadian topo maps. The Garmin inReach Mini 2 adds satellite messaging for emergency communication in areas without cell coverage, which is strongly recommended for remote Canadian hunting trips." },
      },
      {
        "@type": "Question",
        name: "Does Garmin GPS work in northern Canada?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Garmin GPS devices receive satellite signals anywhere on Earth — cell towers are not required. However, map coverage for remote northern Canada varies. The Garmin GPSMAP series supports downloadable topographic maps for all Canadian provinces and territories including the Yukon, Northwest Territories, and Nunavut via the Garmin BirdsEye subscription service. For safety in remote northern Canada, a satellite communicator like Garmin inReach is strongly recommended alongside any GPS." },
      },
      {
        "@type": "Question",
        name: "How do I mark a waypoint on my Garmin GPS for hunting?",
        acceptedAnswer: { "@type": "Answer", text: "To mark a waypoint on Garmin GPS: press the Mark Waypoint button (the flag icon) or navigate to Mark Waypoint in the main menu. Your current location is saved automatically. Give it a name (e.g. 'Stand 1', 'Truck', 'Camp') by selecting the name field and entering text. To return to a saved waypoint, go to Where To → Waypoints → select the name → Navigate." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Best GPS for Hunting in Canada — Boreal Forest, Mountains, Backcountry", item: "https://setwisedigital.com/tools/hunting-gps-canada" },
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
