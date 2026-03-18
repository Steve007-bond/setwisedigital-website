import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Setwise Digital — Technology Simplified | Plain-English Tech Learning",
  description:
    "Setwise Digital teaches everyday technology in plain English — printers, GPS, smart home, and more. 47 free interactive tools plus step-by-step learning guides for adults 40+. No jargon. No pressure.",
  keywords: [
    "technology simplified",
    "plain English tech guides",
    "how to set up printer",
    "how to update GPS",
    "tech learning for seniors",
    "Setwise Digital",
    "printer setup guide",
    "GPS update guide",
    "smart home for beginners",
    "technology education adults",
    "free tech tools",
    "how to print from iPhone",
    "printer stopped working fix",
  ],
  alternates: { canonical: "https://setwisedigital.com" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://setwisedigital.com",
    siteName: "Setwise Digital",
    title: "Setwise Digital — Technology Simplified",
    description:
      "Plain-English tech learning for adults 40+. 47 free interactive tools covering printers, GPS, smart home, and more. Learn at your own pace — no prior knowledge needed.",
    images: [{ url: "https://setwisedigital.com/og-image.png", width: 1200, height: 630, alt: "Setwise Digital — Technology Simplified" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Setwise Digital — Technology Simplified",
    description: "Plain-English tech learning for adults 40+. 47 free tools covering printers, GPS, smart home and more.",
  },
};

export default function HomePage() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Setwise Digital",
    url: "https://setwisedigital.com",
    logo: "https://setwisedigital.com/logo-dark.png",
    description:
      "Setwise Digital is an independent tech literacy and education platform. We provide plain-English learning guides and free interactive tools for adults 40+ covering printers, GPS, smart home devices, and more.",
    sameAs: [],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: "https://setwisedigital.com/contact",
    },
  };

  const websiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Setwise Digital",
    url: "https://setwisedigital.com",
    description: "Plain-English technology learning platform with 47 free interactive tools for adults 40+.",
    potentialAction: {
      "@type": "SearchAction",
      target: { "@type": "EntryPoint", urlTemplate: "https://setwisedigital.com/tools?q={search_term_string}" },
      "query-input": "required name=search_term_string",
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What is Setwise Digital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Setwise Digital is an independent tech literacy and education platform that teaches everyday technology in plain English. We offer step-by-step guides and 47 free interactive tools for adults 40+ covering printers, GPS, smart home devices, and more. Not affiliated with HP, Canon, Garmin, Amazon, Google, or Apple.",
        },
      },
      {
        "@type": "Question",
        name: "Does Setwise Digital have free tools?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Setwise Digital offers 47 free interactive tools at setwisedigital.com/tools. Tools cover printer setup, printer troubleshooting, printing from iPhone and Android, GPS guides, smart home setup, and more. All tools are free with no account required.",
        },
      },
      {
        "@type": "Question",
        name: "Who are Setwise Digital's guides designed for?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Setwise Digital's guides are designed for adults 40 and over who prefer plain-English explanations without technical jargon. All guides are step-by-step, can be used at your own pace, and require no prior technical knowledge.",
        },
      },
      {
        "@type": "Question",
        name: "How do I fix my printer when it stops working?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Setwise Digital's free 'My Printer Stopped Working' tool walks you through the fix step by step. Select your problem — offline, blank pages, paper jam, streaky prints, or lost Wi-Fi — then your printer brand. You get the exact steps for your specific combination. Available free at setwisedigital.com/tools/my-printer-stopped-working.",
        },
      },
      {
        "@type": "Question",
        name: "How do I print from my iPhone or Android phone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Setwise Digital's free 'Print from Phone or Laptop' tool gives you the exact steps for your device and printer brand. Covers iPhone AirPrint, Android, Samsung, Windows, Mac, and Chromebook — with specific steps for HP, Canon, Epson, and Brother printers. Free at setwisedigital.com/tools/how-to-print-from-phone-or-laptop.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#FDFDFD]" />}>
        <Client />
      </Suspense>
    </>
  );
}
