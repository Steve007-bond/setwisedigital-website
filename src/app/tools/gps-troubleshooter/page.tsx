import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Not Working? Plain-English Fix Guide for Every GPS Problem",
  description: "GPS lost signal, wrong directions, frozen screen, no voice, battery draining? Step-by-step fix guidance for car GPS, phone navigation, outdoor GPS, and built-in navigation. Free.",
  keywords: [
    "GPS not working fix",
    "GPS lost signal",
    "GPS giving wrong directions",
    "GPS frozen screen",
    "why is my GPS not working",
    "GPS navigation problems step by step fix",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-troubleshooter" },
  openGraph: {
    title: "GPS Not Working? Plain-English Fix Guide for Every GPS Problem",
    description: "GPS lost signal, wrong directions, frozen screen, no voice, battery draining? Step-by-step fix guidance for car GPS, phone navigation, outdoor GPS, and built-in navigation. Free.",
    url: "https://setwisedigital.com/tools/gps-troubleshooter",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPS Not Working? Plain-English Fix Guide for Every GPS Problem",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "GPS lost signal, wrong directions, frozen screen, no voice, battery draining? Step-by-step fix guidance for car GPS, phone navigation, outdoor GPS, and built-in navigation. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Why does my GPS keep losing signal?",
        acceptedAnswer: { "@type": "Answer", text: "GPS signal loss is most often caused by: obstructions between the antenna and sky (tunnels, parking garages, tall buildings, dense tree canopy), a weak satellite lock after being moved to a new location (wait 2-3 minutes for signal to acquire), screen protectors or metallic window tinting blocking satellite signal, or a software issue requiring a device restart. For persistent signal loss in open areas, a factory reset or software update often resolves it." },
      },
      {
        "@type": "Question",
        name: "Why is my GPS showing wrong location?",
        acceptedAnswer: { "@type": "Answer", text: "If your GPS shows wrong location: 1) Wait 2-3 minutes after turning on for satellite lock to stabilise. 2) Check the map date — outdated maps may show incorrect road positions. 3) Verify you haven't accidentally set a manual GPS position (reset location in Settings). 4) In a city, GPS accuracy can drop to 10-20 metres due to signal bounce off buildings (urban canyon effect). 5) Update your GPS software and maps via Garmin Express." },
      },
      {
        "@type": "Question",
        name: "Why does my GPS give wrong directions?",
        acceptedAnswer: { "@type": "Answer", text: "Wrong GPS directions are almost always caused by outdated maps — the GPS is routing based on old road data. The fix is a map update via Garmin Express or Wi-Fi. Other causes: the GPS is set to avoid highways or tolls when you don't want it to (check route preferences in Settings), or the destination was entered incorrectly. Update your maps and verify your route preferences before reporting the device as faulty." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "GPS Not Working? Plain-English Fix Guide for Every GPS Problem", item: "https://setwisedigital.com/tools/gps-troubleshooter" },
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
