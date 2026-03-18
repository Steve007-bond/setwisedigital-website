import type { Metadata } from "next";
import TechBridgeClient from "./TechBridgeClient";

// DEPLOYMENT NOTE: Rename your existing techbridge/page.tsx → techbridge/TechBridgeClient.tsx

export const metadata: Metadata = {
  title: "TechBridge — Learn Technology in Plain English | Setwise",
  description:
    "Interactive tech lessons for adults 40+. Printers, GPS, smart home, Alexa, cameras, and online security — step-by-step, no jargon.",
  keywords: [
    "TechBridge Setwise Digital",
    "technology learning for seniors",
    "learn technology plain English",
    "printer learning guide",
    "GPS learning guide",
    "smart home learning for beginners",
    "Alexa learning guide seniors",
    "tech literacy platform adults",
    "how to learn technology step by step",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/techbridge" },
  openGraph: {
    title: "TechBridge — Learn Technology in Plain English | Setwise",
    description: "Interactive tech lessons for adults 40+. Printers, GPS, smart home, Alexa, cameras, and online security — step-by-step, no jargon.",
    url: "https://www.setwisedigital.com/techbridge",
  },
};

export default function TechBridgePage() {
  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "TechBridge by Setwise Digital",
    url: "https://www.setwisedigital.com/techbridge",
    description:
      "Interactive technology learning hub for adults 40+. Covers printers, GPS, Alexa, smart home, cameras, and security in plain English with step-by-step guidance.",
    provider: {
      "@type": "Organization",
      name: "Setwise Digital",
      url: "https://www.setwisedigital.com",
    },
    teaches: [
      "Printer setup and maintenance",
      "GPS navigation and updates",
      "Smart home device setup",
      "Alexa and voice assistant use",
      "Camera settings and firmware",
      "Online security basics",
    ],
    audience: { "@type": "Audience", audienceType: "Adults 40+" },
    inLanguage: "en-US",
    isAccessibleForFree: true,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is TechBridge?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TechBridge is Setwise Digital's interactive technology learning hub for adults 40+. It provides step-by-step guidance for setting up and using everyday devices including printers, GPS navigation, smart home systems, Alexa, cameras, and online security — all in plain English with no technical jargon.",
        },
      },
      {
        "@type": "Question",
        name: "Is TechBridge free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. TechBridge learning resources and all 47 free interactive tools at Setwise Digital are completely free with no account required. Live lesson sessions with an educator are available at paid pricing starting from $49.",
        },
      },
      {
        "@type": "Question",
        name: "What devices does TechBridge cover?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "TechBridge covers: HP, Canon, Epson, and Brother printers; Garmin and TomTom GPS devices; Amazon Alexa and Echo devices; Google Nest smart home; cameras and firmware updates; and online security basics including antivirus setup, email security, and password management.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "TechBridge", item: "https://www.setwisedigital.com/techbridge" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TechBridgeClient />
    </>
  );
}
