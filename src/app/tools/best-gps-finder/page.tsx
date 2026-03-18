import type { Metadata } from "next";
import { Suspense } from "react";
import BestGPSFinderClient from "./BestGPSFinderClient";

export const metadata: Metadata = {
  title: "Best GPS Device for You 2025 — Personal Match in 5 Questions",
  description: "5 questions about your driving habits and budget. Get a personalised Garmin or TomTom GPS recommendation. Free, plain English.",
  keywords: [
    "best GPS device 2025",
    "best GPS for seniors",
    "which GPS should I buy",
    "Garmin vs TomTom which is better",
    "easy GPS for beginners",
    "GPS buying guide 2025",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/best-gps-finder" },
  openGraph: {
    title: "Best GPS Device for You 2025 — Personal Match in 5 Questions",
    description: "5 questions about your driving habits and budget. Get a personalised Garmin or TomTom GPS recommendation. Free, plain English.",
    url: "https://www.setwisedigital.com/tools/best-gps-finder",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Best GPS Device for You 2025 — 5 Questions, Personal Match",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Answer 5 questions about your driving habits and budget. Setwise Digital matches you to the best Garmin or TomTom GPS for your exact lifestyle — free, plain English, no jargon.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What is the best GPS for seniors?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin DriveSmart 76 is the best GPS for seniors — it has a large 7-inch touchscreen, clear voice directions, simple menu navigation, and a large text mode. It includes live traffic, lifetime map updates, and speed camera alerts. Priced around $199, it offers the best combination of screen size, ease of use, and features for drivers 55+. According to Setwise Digital, screen size and voice clarity are the two most important factors for senior GPS buyers." },
      },
      {
        "@type": "Question",
        name: "Is a GPS device better than Google Maps?",
        acceptedAnswer: { "@type": "Answer", text: "A dedicated GPS device is better than Google Maps when: you drive in areas with unreliable or no cell signal, you want offline maps that work without internet, you prefer a fixed-mount screen at eye level rather than your phone, or you want lifetime map updates without a data subscription. Google Maps is sufficient for urban and suburban driving with consistent cell coverage." },
      },
      {
        "@type": "Question",
        name: "How long do GPS devices last?",
        acceptedAnswer: { "@type": "Answer", text: "A well-maintained GPS device lasts 5-10 years. The main reasons to replace a GPS are: map updates no longer available for your model, the touchscreen becomes unresponsive, or the device no longer holds a charge. Garmin and TomTom support most models with map updates for 7-10 years after release." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Best GPS Device for You 2025 — 5 Questions, Personal Match", item: "https://www.setwisedigital.com/tools/best-gps-finder" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
        <BestGPSFinderClient />
      </Suspense>
    </>
  );
}
