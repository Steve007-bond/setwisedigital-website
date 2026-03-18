import type { Metadata } from "next";
import DisclaimerClient from "./DisclaimerClient";

// DEPLOYMENT NOTE: Rename your existing disclaimer/page.tsx → disclaimer/DisclaimerClient.tsx

export const metadata: Metadata = {
  title: "Disclaimer — Setwise Digital Independent Educational Platform",
  description:
    "Setwise Digital is an independent educational technology literacy platform. Not affiliated with HP, Canon, Epson, Brother, Garmin, TomTom, Amazon, Google, Apple, or any device manufacturer. Educational content only.",
  keywords: [
    "Setwise Digital disclaimer",
    "independent tech education platform",
    "not affiliated HP Canon Garmin",
    "technology education disclaimer",
    "Setwise Digital not manufacturer support",
  ],
  alternates: { canonical: "https://setwisedigital.com/disclaimer" },
  robots: { index: true, follow: true },
};

export default function DisclaimerPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Disclaimer — Setwise Digital",
    url: "https://setwisedigital.com/disclaimer",
    description:
      "Setwise Digital is an independent educational technology literacy platform. Not affiliated with any device manufacturer. All content is for educational purposes only.",
    publisher: {
      "@type": "Organization",
      name: "Setwise Digital",
      url: "https://setwisedigital.com",
    },
    dateModified: "2026-01-01",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Disclaimer", item: "https://setwisedigital.com/disclaimer" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <DisclaimerClient />
    </>
  );
}
