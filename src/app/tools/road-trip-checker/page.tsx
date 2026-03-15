import type { Metadata } from "next";
import RoadTripCheckerClient from "./RoadTripCheckerClient";

export const metadata: Metadata = {
  title: "Road Trip GPS Pre-Check — Is Your GPS Ready? | Setwise Digital",
  description:
    "Free 5-step GPS road trip checklist. Make sure your Garmin, TomTom or in-car GPS is updated, charged, and route-ready before you leave. Plain English — takes 3 minutes.",
  keywords: [
    "GPS road trip checklist",
    "is my GPS ready for road trip",
    "Garmin GPS before road trip",
    "how to prepare GPS for long drive",
    "GPS map update before trip",
    "road trip GPS preparation",
    "GPS ready check for seniors",
    "Garmin TomTom road trip tips",
    "check GPS before driving",
    "GPS pre-trip checklist",
  ],
  openGraph: {
    title: "Road Trip GPS Pre-Check — Free 5-Step Checklist | Setwise Digital",
    description:
      "Free interactive tool: make sure your GPS is ready before your next road trip. Maps updated, battery charged, route saved. Takes 3 minutes.",
    url: "https://setwisedigital.com/tools/road-trip-checker",
  },
  alternates: {
    canonical: "https://setwisedigital.com/tools/road-trip-checker",
  },
};

export default function RoadTripCheckerPage() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: "Road Trip GPS Pre-Check Assistant",
    description:
      "Free interactive GPS road trip readiness checker. Covers map updates, battery, device health, route planning, and emergency tips.",
    url: "https://setwisedigital.com/tools/road-trip-checker",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    provider: {
      "@type": "Organization",
      name: "Setwise Digital",
      url: "https://setwisedigital.com",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I know if my GPS maps are up to date?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Connect your Garmin or TomTom to your computer using its USB cable and open the manufacturer's update software (Garmin Express or MyDrive Connect). It will automatically check if a new map update is available and guide you through the download process.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I update my GPS maps before a road trip?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "GPS map providers like Garmin and TomTom release updates quarterly. If you drive frequently, updating every 3-6 months is ideal. At minimum, check for an update before any long road trip, especially to an unfamiliar area.",
        },
      },
      {
        "@type": "Question",
        name: "What should I check on my GPS before a long road trip?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Before a road trip, check: (1) Your maps are updated, (2) Battery is fully charged or charger is packed, (3) Mount is secure and windshield is clean, (4) Destination and waypoints are saved as Favorites, (5) Volume is set correctly and you can hear it while driving.",
        },
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <RoadTripCheckerClient />
    </>
  );
}
