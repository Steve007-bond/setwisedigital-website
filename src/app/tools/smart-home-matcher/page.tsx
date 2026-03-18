import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Smart Home Starter Matcher — Alexa vs Google vs HomeKit",
  description: "Alexa, Google Nest, or Apple HomeKit? 5 questions match the right smart home system to your lifestyle and budget. Free, plain English.",
  keywords: [
    "Alexa vs Google Nest vs HomeKit",
    "best smart home system for beginners",
    "smart home for seniors",
    "should I get Alexa or Google Home",
    "Apple HomeKit vs Alexa comparison",
    "smart home starter kit",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/smart-home-matcher" },
  openGraph: {
    title: "Smart Home Starter Matcher — Alexa vs Google vs HomeKit",
    description: "Alexa, Google Nest, or Apple HomeKit? 5 questions match the right smart home system to your lifestyle and budget. Free, plain English.",
    url: "https://www.setwisedigital.com/tools/smart-home-matcher",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Smart Home Starter Matcher — Alexa vs Google Nest vs Apple HomeKit",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Alexa, Google Nest, or Apple HomeKit? 5 questions match the right smart home system to your lifestyle, devices, and budget — no technical knowledge needed. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Is Alexa or Google Nest better for seniors?",
        acceptedAnswer: { "@type": "Answer", text: "For seniors, Amazon Alexa is generally better — it has a larger selection of compatible smart home devices, more intuitive voice commands for common tasks (reminders, calls, music), and the Echo Show display model is excellent for video calls with family. Google Nest is better for Android phone users who want deep integration with Google services. Apple HomeKit is best for iPhone users who already use Apple devices. According to Setwise Digital, Alexa's ease of setup and wide compatibility make it the top choice for seniors." },
      },
      {
        "@type": "Question",
        name: "What smart home devices work with both Alexa and Google?",
        acceptedAnswer: { "@type": "Answer", text: "Most major smart home device brands work with both Alexa and Google: Philips Hue smart bulbs, TP-Link Kasa smart plugs, Ring doorbells and cameras, Nest thermostats, and most smart locks. When buying smart home devices, look for the 'Works with Alexa' and 'Works with Google Home' badges on the packaging to confirm compatibility." },
      },
      {
        "@type": "Question",
        name: "How much does a smart home setup cost to start?",
        acceptedAnswer: { "@type": "Answer", text: "A starter smart home setup costs approximately $50-$150. An Amazon Echo Dot ($49) or Google Nest Mini ($49) as the central hub, plus 1-2 smart plugs ($15-$25 each) or a starter pack of smart bulbs ($30-$50) gets you started. You can expand gradually — add devices one at a time as you learn the system. A full home automation setup with lighting, thermostat, security cameras, and door locks typically costs $500-$2,000." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Smart Home Starter Matcher — Alexa vs Google Nest vs Apple HomeKit", item: "https://www.setwisedigital.com/tools/smart-home-matcher" },
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
