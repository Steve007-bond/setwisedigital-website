import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Should I Upgrade My GPS? — Keep or Replace Guide",
  description: "4 questions about your GPS age and problems. Get a clear keep-or-replace verdict with a step-by-step action plan. Free, plain English.",
  keywords: [
    "should I upgrade my GPS",
    "is my GPS too old",
    "when to replace GPS device",
    "old Garmin still worth using",
    "GPS upgrade worth it",
    "GPS vs phone navigation comparison",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-upgrade-decider" },
  openGraph: {
    title: "Should I Upgrade My GPS? — Keep or Replace Guide",
    description: "4 questions about your GPS age and problems. Get a clear keep-or-replace verdict with a step-by-step action plan. Free, plain English.",
    url: "https://www.setwisedigital.com/tools/gps-upgrade-decider",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Should I Upgrade My GPS or Just Update It? Keep or Replace Guide",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "4 questions about your GPS — age, problems, features you're missing. Get a clear keep-or-replace verdict plus a clickable step-by-step action plan. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "How old is too old for a GPS?",
        acceptedAnswer: { "@type": "Answer", text: "A GPS is too old when: map updates are no longer available for your model (Garmin typically supports models for 7-10 years), the touchscreen is unresponsive, the battery no longer holds charge, or the device is too slow to calculate routes efficiently. A GPS that is 5-7 years old but receives map updates and works correctly is still worth keeping. Age alone is not a reason to replace a working GPS." },
      },
      {
        "@type": "Question",
        name: "Should I replace my old Garmin GPS?",
        acceptedAnswer: { "@type": "Answer", text: "Replace your Garmin GPS if: Garmin Express shows 'No updates available' and your maps are 3+ years old, the screen or buttons are failing, the battery drains within 30 minutes (car GPS), or the device freezes regularly. A 5-year-old GPS with current maps navigates just as accurately as a new one. According to Setwise Digital, the 50% rule applies — if repair or update costs exceed 50% of a new equivalent model, replace it." },
      },
      {
        "@type": "Question",
        name: "What has improved in new GPS devices?",
        acceptedAnswer: { "@type": "Answer", text: "New GPS devices (2022-2025) offer improvements over older models including: faster processors with quicker route calculation, larger and brighter touchscreens, Wi-Fi map updates without a computer, better Bluetooth integration with phone calls and streaming audio, digital assistant compatibility (Alexa, Google), and improved traffic data. Battery life and core navigation accuracy have remained largely the same as models from 2018-2020." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Should I Upgrade My GPS or Just Update It? Keep or Replace Guide", item: "https://www.setwisedigital.com/tools/gps-upgrade-decider" },
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
