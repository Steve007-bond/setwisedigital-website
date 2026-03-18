import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Home Security Audit — Find Out How Protected Your Home Really Is",
  description: "10 yes/no questions reveal your home's true security rating (A–F) and which affordable devices would make the biggest difference. Ring, SimpliSafe, ADT compared. Free, plain English.",
  keywords: [
    "home security audit free",
    "how secure is my home",
    "best home security system 2025",
    "Ring vs SimpliSafe vs ADT",
    "home security checklist",
    "smart home security for seniors",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/home-security-audit" },
  openGraph: {
    title: "Home Security Audit — Find Out How Protected Your Home Really Is",
    description: "10 yes/no questions reveal your home's true security rating (A–F) and which affordable devices would make the biggest difference. Ring, SimpliSafe, ADT compared. Free, plain English.",
    url: "https://setwisedigital.com/tools/home-security-audit",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Home Security Audit — Find Out How Protected Your Home Really Is",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "10 yes/no questions reveal your home's true security rating (A–F) and which affordable devices would make the biggest difference. Ring, SimpliSafe, ADT compared. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What is the best home security system for seniors?",
        acceptedAnswer: { "@type": "Answer", text: "The SimpliSafe Home Security Kit is the best home security system for seniors — it has no contracts, easy DIY installation with no wiring, a simple keypad, and professional monitoring starting at $19.99/month. Ring Alarm is excellent for those who already have Ring doorbells and want a unified system. ADT is the most recognised brand but requires a contract. According to Setwise Digital, SimpliSafe's no-contract flexibility is ideal for seniors." },
      },
      {
        "@type": "Question",
        name: "Do I need professional monitoring for home security?",
        acceptedAnswer: { "@type": "Answer", text: "Professional monitoring is optional but recommended — it means a human operator calls you when an alarm triggers and contacts emergency services if you don't respond. Without monitoring, the alarm siren sounds but no one calls. Professional monitoring costs $10-$45/month. For seniors living alone or in remote areas, professional monitoring provides significant peace of mind." },
      },
      {
        "@type": "Question",
        name: "What is the easiest security camera to install?",
        acceptedAnswer: { "@type": "Answer", text: "The Ring Indoor Cam is the easiest security camera to install — plug it into any wall socket, download the Ring app, scan the QR code on the camera, and it connects to your Wi-Fi in under 5 minutes. No drilling, no wiring, no professional installation needed. View live footage from anywhere on your phone. For outdoor use, the Ring Stick Up Cam Battery requires no wiring and mounts with two screws." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Home Security Audit — Find Out How Protected Your Home Really Is", item: "https://setwisedigital.com/tools/home-security-audit" },
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
