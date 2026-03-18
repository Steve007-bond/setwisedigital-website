import type { Metadata } from "next";
import PricingClient from "./PricingClient";

// DEPLOYMENT NOTE: Rename your existing pricing/page.tsx → pricing/PricingClient.tsx
// Then drop this file in as the new pricing/page.tsx

export const metadata: Metadata = {
  title: "Setwise Digital Pricing — Live Tech Lesson Sessions from $49",
  description:
    "Technology learning sessions for adults 40+. Single lesson from $49. Skill-Builder Course (3 sessions) from $97. Family Plan (5 sessions) from $147. All 27 free tools always free. No monthly fees.",
  keywords: [
    "Setwise Digital pricing",
    "tech lesson cost",
    "technology tutoring price",
    "how much does tech lesson cost",
    "book technology lesson",
    "printer lesson cost",
    "GPS lesson booking",
    "technology learning session price adults",
  ],
  alternates: { canonical: "https://setwisedigital.com/pricing" },
  openGraph: {
    title: "Setwise Digital Pricing — Tech Lesson Sessions from $49",
    description: "Single lesson from $49, 3-session course from $97, family plan from $147. 27 free tools always included.",
    url: "https://setwisedigital.com/pricing",
  },
};

export default function PricingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Technology Learning Sessions by Setwise Digital",
    serviceType: "Technology Education",
    provider: {
      "@type": "Organization",
      name: "Setwise Digital",
      url: "https://setwisedigital.com",
    },
    description:
      "Live video technology learning sessions for adults 40+. Covers printers, GPS, smart home, cameras. Plain English, step by step. No technical jargon.",
    offers: [
      {
        "@type": "Offer",
        name: "Single Lesson Session",
        price: "49",
        priceCurrency: "USD",
        description: "1-hour live video lesson session covering one device or topic of your choice",
      },
      {
        "@type": "Offer",
        name: "Skill-Builder Course",
        price: "97",
        priceCurrency: "USD",
        description: "3 live video lesson sessions with personalised learning roadmap across multiple topics",
      },
      {
        "@type": "Offer",
        name: "Family Learning Plan",
        price: "147",
        priceCurrency: "USD",
        description: "Up to 5 lesson sessions covering multiple devices for the whole household",
      },
    ],
    areaServed: { "@type": "Country", name: "United States" },
    audience: { "@type": "Audience", audienceType: "Adults 40+" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How much does a Setwise Digital lesson session cost?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Setwise Digital live lesson sessions start from $49 for a single 1-hour session. The Skill-Builder Course (3 sessions with a personalised learning roadmap) starts from $97. The Family Learning Plan (up to 5 sessions covering multiple devices) starts from $147. All 27 interactive tools on the website are completely free with no account required.",
        },
      },
      {
        "@type": "Question",
        name: "Does Setwise Digital have a monthly subscription fee?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Setwise Digital has no monthly subscriptions, ongoing fees, or recurring charges. You pay only for the lesson sessions you book. The 27 free tools are always free with no sign-up required.",
        },
      },
      {
        "@type": "Question",
        name: "What is included in a Setwise Digital lesson session?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Each Setwise Digital lesson session includes a 1-hour live video session with an educator, plain-English step-by-step explanations, coverage of one device or topic of your choice, and a lesson summary PDF to keep for reference.",
        },
      },
      {
        "@type": "Question",
        name: "Can Setwise Digital help with printer setup?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Printer setup is one of Setwise Digital's most popular lesson topics. Sessions cover HP, Canon, Epson, and Brother printers — including wireless setup, printing from iPhone or Android, ink management, and maintenance. A single lesson session covers complete printer setup from start to finish.",
        },
      },
      {
        "@type": "Question",
        name: "Are the Setwise Digital free tools really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. All 27 interactive tools at setwisedigital.com/tools are completely free, with no account, no email address, and no payment required. Tools cover printer troubleshooting, printer setup, GPS guides, smart home setup, and more.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Pricing", item: "https://setwisedigital.com/pricing" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PricingClient />
    </>
  );
}
