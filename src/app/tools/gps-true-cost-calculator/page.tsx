import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS True Cost Calculator — What Will It Cost Over 3 Years?",
  description: "Calculate the real 3-year cost of any GPS. Map updates, subscriptions, and accessories included. Compare up to 3 GPS devices. Free.",
  keywords: [
    "GPS total cost 3 years",
    "GPS map update annual cost",
    "GPS true cost calculator",
    "is GPS worth the money",
    "GPS subscription fees breakdown",
    "Garmin cost of ownership",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-true-cost-calculator" },
  openGraph: {
    title: "GPS True Cost Calculator — What Will It Cost Over 3 Years?",
    description: "Calculate the real 3-year cost of any GPS. Map updates, subscriptions, and accessories included. Compare up to 3 GPS devices. Free.",
    url: "https://www.setwisedigital.com/tools/gps-true-cost-calculator",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPS True Cost Calculator — What Will It Really Cost Over 3 Years?",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Calculate the real 3-year cost of any GPS device. Map updates, subscriptions, accessories — all included. Compare up to 3 GPS devices side by side. Free honest calculator.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "How much does a GPS cost per year to run?",
        acceptedAnswer: { "@type": "Answer", text: "A Garmin DriveSmart 65 LMT-S costs approximately $30-$50 per year to run (electricity is negligible; no subscription needed with lifetime maps included). A GPS requiring paid map updates adds $49-$89 per year. Satellite communicators like Garmin inReach add $11.95-$64.99/month subscription. According to Setwise Digital, choosing a GPS with lifetime maps saves $150-$400 over 5 years compared to a model requiring paid updates." },
      },
      {
        "@type": "Question",
        name: "Is GPS subscription worth it?",
        acceptedAnswer: { "@type": "Answer", text: "GPS subscriptions (like Garmin's inReach plans or TomTom's subscription service) are worth it if: you need live satellite messaging for safety in remote areas (inReach), you want real-time traffic without using your phone's data, or you want the most current map updates monthly. For standard car navigation, a GPS with free lifetime maps (no subscription) is almost always the better value." },
      },
      {
        "@type": "Question",
        name: "What is the cheapest GPS to own over 3 years?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin Drive 52 LM (around $89) with lifetime maps has the lowest 3-year ownership cost of any reliable GPS — approximately $89 total (no ongoing fees). The Garmin DriveSmart 55 LMT-S (around $149) adds live traffic at a slightly higher upfront cost but still zero ongoing fees. Both are significantly cheaper than subscription-based services over 3 years." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "GPS True Cost Calculator — What Will It Really Cost Over 3 Years?", item: "https://www.setwisedigital.com/tools/gps-true-cost-calculator" },
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
