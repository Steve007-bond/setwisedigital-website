import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Home Wi-Fi Overload Checker — Is Your Router Struggling?",
  description: "Count your connected devices and find out if your router can handle the load. Get a plain-English plan to fix slow Wi-Fi at home. Free.",
  keywords: [
    "home WiFi overload checker",
    "too many devices on WiFi router",
    "slow WiFi fix",
    "how many devices can WiFi handle",
    "router overloaded symptoms",
    "best router for many devices 2025",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/wifi-checker" },
  openGraph: {
    title: "Home Wi-Fi Overload Checker — Is Your Router Struggling?",
    description: "Count your connected devices and find out if your router can handle the load. Get a plain-English plan to fix slow Wi-Fi at home. Free.",
    url: "https://www.setwisedigital.com/tools/wifi-checker",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Home Wi-Fi Overload Checker — Is Your Router Struggling?",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Count your connected devices and find out if your router can handle the load. Get a plain-English plan to fix slow Wi-Fi, upgrade your router, or reduce congestion. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "How many devices can a WiFi router handle?",
        acceptedAnswer: { "@type": "Answer", text: "A standard home router can handle 20-30 devices simultaneously before performance degrades. High-end mesh routers handle 40-50+ devices. Common devices that use Wi-Fi include: phones, tablets, laptops, smart TVs, streaming sticks, smart speakers, smart bulbs, thermostats, security cameras, and game consoles. A family of four with 3-4 devices each plus smart home devices can easily have 20-30 connected devices." },
      },
      {
        "@type": "Question",
        name: "Why is my home WiFi slow?",
        acceptedAnswer: { "@type": "Answer", text: "The most common causes of slow home Wi-Fi: too many devices connected simultaneously, router is too far from devices you are using (walls and floors significantly reduce signal), router is more than 3-4 years old and cannot handle modern Wi-Fi speeds, internet service provider throttling at peak times, or a neighbour's Wi-Fi using the same channel. Restarting your router resolves temporary slowdowns in most cases." },
      },
      {
        "@type": "Question",
        name: "Should I upgrade to a mesh WiFi router?",
        acceptedAnswer: { "@type": "Answer", text: "Upgrade to a mesh Wi-Fi system if: your home is larger than 2,000 square feet, you have rooms with weak or no signal, you have more than 25 connected devices, or your current router is more than 4 years old. Mesh systems (Eero, Google Nest Wi-Fi, TP-Link Deco) use multiple nodes to create a seamless network throughout your home. Starting price for a 2-unit mesh system is $150-$250." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Home Wi-Fi Overload Checker — Is Your Router Struggling?", item: "https://www.setwisedigital.com/tools/wifi-checker" },
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
