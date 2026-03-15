import type { Metadata } from "next";
import BestGPSFinderClient from "./BestGPSFinderClient";

export const metadata: Metadata = {
  title: "Best GPS Device for Seniors 2026 — Find Yours Free | Setwise Digital",
  description:
    "Not sure which GPS to buy? Answer 5 simple questions about your budget, driving habits, and comfort level. We'll match you to the best Garmin or TomTom for your lifestyle — free, no jargon.",
  keywords: [
    "best GPS for seniors 2026",
    "best GPS device for older adults",
    "which GPS should I buy",
    "Garmin vs TomTom for seniors",
    "easy to use GPS navigator",
    "GPS buying guide for beginners",
    "large screen GPS for seniors",
    "best GPS for road trips",
    "affordable GPS navigator",
    "GPS recommendation tool",
  ],
  openGraph: {
    title: "Best GPS Finder for Seniors — Free Personalized Recommendation",
    description:
      "Answer 5 questions and find the perfect GPS for your lifestyle and budget. Garmin, TomTom, and more — explained in plain English.",
    url: "https://setwisedigital.com/tools/best-gps-finder",
  },
  alternates: {
    canonical: "https://setwisedigital.com/tools/best-gps-finder",
  },
};

export default function BestGPSFinderPage() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Best GPS Finder for Seniors",
    description:
      "Free personalized GPS recommendation tool. Answer 5 questions about your driving habits, budget, and preferences to find the perfect GPS device.",
    url: "https://setwisedigital.com/tools/best-gps-finder",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: {
      "@type": "Organization",
      name: "Setwise Digital",
      url: "https://setwisedigital.com",
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <BestGPSFinderClient />
    </>
  );
}
