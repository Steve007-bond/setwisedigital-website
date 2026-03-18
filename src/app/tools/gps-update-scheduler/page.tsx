import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Update Scheduler — How Outdated Are Your Maps?",
  description: "Find out how outdated your GPS maps are and get a personalised step-by-step update guide. Garmin and TomTom covered. Free, plain English.",
  keywords: [
    "how to update GPS maps",
    "GPS map update schedule",
    "when to update GPS",
    "Garmin map update guide",
    "TomTom update guide",
    "GPS maps out of date fix",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-update-scheduler" },
  openGraph: {
    title: "GPS Update Scheduler — How Outdated Are Your Maps?",
    description: "Find out how outdated your GPS maps are and get a personalised step-by-step update guide. Garmin and TomTom covered. Free, plain English.",
    url: "https://www.setwisedigital.com/tools/gps-update-scheduler",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPS Update Scheduler — How Outdated Are Your Maps? Step-by-Step Guide",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Find out how outdated your GPS maps are and get a personalised step-by-step update guide specific to your device. Garmin and TomTom covered. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "How do I know if my GPS maps need updating?",
        acceptedAnswer: { "@type": "Answer", text: "To check if your GPS maps need updating: on your Garmin GPS, go to Settings → About → Map to see the current map version and date. Compare this to the current version available at garmin.com/mapupdates by entering your device's model number. If your maps are more than 6 months old, an update is recommended. Garmin Express also automatically notifies you when updates are available when you connect your GPS to your computer." },
      },
      {
        "@type": "Question",
        name: "How often should I update my GPS?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin recommends updating GPS maps when a new update is available — typically quarterly (4 times per year). For most users, updating once or twice per year is sufficient. Update more frequently if: you have moved to a new area, you plan a road trip to an unfamiliar region, or you have noticed routing errors. Maps in rapidly developing areas (new suburbs, major construction zones) become outdated fastest." },
      },
      {
        "@type": "Question",
        name: "Can I set up automatic GPS map updates?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin does not support fully automatic map updates — you need to manually initiate them via Garmin Express or your GPS's Wi-Fi menu. However, Garmin Express will send you email notifications when new maps are available. On compatible Wi-Fi models, you can tap Update directly on the GPS screen without connecting to a computer. Set a calendar reminder every 3-6 months to check for updates." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "GPS Update Scheduler — How Outdated Are Your Maps? Step-by-Step Guide", item: "https://www.setwisedigital.com/tools/gps-update-scheduler" },
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
