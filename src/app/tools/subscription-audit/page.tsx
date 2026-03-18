import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Tech Subscription Audit — Find Overlaps and Cancel Extras",
  description: "List your digital subscriptions — Netflix, Amazon Prime, Apple Music. Calculate your true monthly cost and see exactly what to cancel. Free.",
  keywords: [
    "tech subscription audit",
    "cancel unused subscriptions",
    "how much am I spending on subscriptions",
    "Netflix Hulu Amazon Prime overlap",
    "streaming service audit",
    "save money on subscriptions",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/subscription-audit" },
  openGraph: {
    title: "Tech Subscription Audit — Find Overlaps and Cancel Extras",
    description: "List your digital subscriptions — Netflix, Amazon Prime, Apple Music. Calculate your true monthly cost and see exactly what to cancel. Free.",
    url: "https://www.setwisedigital.com/tools/subscription-audit",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Tech Subscription Audit — Find Overlaps and Cancel What You Don't Need",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "List your digital subscriptions — Netflix, Hulu, Amazon Prime, Apple Music, and more. Calculate your true monthly cost, find overlaps, and see exactly what to cancel. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "How do I find all my digital subscriptions?",
        acceptedAnswer: { "@type": "Answer", text: "To find all digital subscriptions: 1) Check your email for receipts — search 'subscription', 'renewal', 'billing'. 2) Check your bank and credit card statements for recurring monthly charges. 3) iPhone users: Settings → Your Name → Subscriptions. 4) Android users: Google Play → Account → Payments & subscriptions. 5) Check PayPal for recurring payments. Most people discover 3-5 subscriptions they forgot about when they do this audit." },
      },
      {
        "@type": "Question",
        name: "How much do most people spend on subscriptions per month?",
        acceptedAnswer: { "@type": "Answer", text: "The average US household spends $219 per month on digital subscriptions according to market research — significantly more than most people estimate. Common subscriptions include: streaming (Netflix, Hulu, Disney+, Amazon Prime), music (Spotify, Apple Music), cloud storage (iCloud, Google One), news, fitness apps, gaming, and security software. Most people underestimate their total by 40-60%." },
      },
      {
        "@type": "Question",
        name: "Which streaming subscriptions overlap the most?",
        acceptedAnswer: { "@type": "Answer", text: "The most common streaming subscription overlaps: Netflix and Hulu (both have original content but significant overlap in library). Amazon Prime Video and Netflix (most households with both watch primarily Netflix). Disney+ and Hulu (both owned by Disney — a Disney Bundle includes both at lower cost). ESPN+ and cable sports packages. Cancelling one of any overlapping pair typically reduces what you watch by less than 10%." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Tech Subscription Audit — Find Overlaps and Cancel What You Don't Need", item: "https://www.setwisedigital.com/tools/subscription-audit" },
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
