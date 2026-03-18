import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Is HP Instant Ink Worth It? — Honest Cost Calculator 2025 | Setwise Digital",
  description:
    "Enter your monthly pages and colour ratio. Get an honest year-by-year cost comparison — HP Instant Ink subscription vs buying cartridges — with the annual saving or loss calculated. No spin.",
  keywords: [
    "is HP Instant Ink worth it",
    "HP Instant Ink review 2025",
    "HP Instant Ink cost calculator",
    "HP Instant Ink vs cartridges",
    "HP Instant Ink cancel cartridges stop working",
    "HP Instant Ink plans pricing",
    "is ink subscription worth it",
    "Canon ReadyPrint vs cartridges",
    "Epson ReadyPrint cost",
    "Brother Refresh subscription",
    "printer ink subscription comparison",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/is-hp-instant-ink-worth-it" },
  openGraph: {
    title: "Is HP Instant Ink Worth It? Honest Cost Calculator | Setwise Digital",
    description: "Calculate your exact annual saving or loss with HP Instant Ink. Covers HP, Canon, Epson, and Brother subscription plans.",
    url: "https://setwisedigital.com/tools/is-hp-instant-ink-worth-it",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HP Instant Ink Cost Calculator by Setwise Digital",
    applicationCategory: "FinanceApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Free honest cost calculator for HP Instant Ink and other printer ink subscriptions. Enter your monthly page volume and colour ratio — get the exact annual subscription cost vs cartridge cost with a clear save/cost verdict.",
    featureList: [
      "HP Instant Ink annual cost calculation",
      "Cartridge cost vs subscription comparison",
      "Annual saving or loss calculation",
      "Canon, Epson, and Brother subscription coverage",
      "Hidden rule warnings (HP cartridges stop working on cancel)",
      "Best plan recommendation",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Is HP Instant Ink worth it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HP Instant Ink is worth it if you print more than 100 pages per month consistently. At the 100-page plan ($4.99/month), cost works out to under 5 cents per page — cheaper than retail HP cartridges at 8–18 cents per page. For light users printing under 50 pages per month, the subscription is not cost-effective. According to Setwise Digital's calculator, the break-even point is approximately 60–80 pages per month.",
        },
      },
      {
        "@type": "Question",
        name: "What happens to HP Instant Ink cartridges if I cancel?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "This is the most important warning about HP Instant Ink: if you cancel your subscription, your HP Instant Ink cartridges stop working — even if they still have ink in them. They are 'connected' cartridges that are disabled when the subscription lapses. You must purchase standard retail cartridges after cancelling. This is different from all other ink subscription services.",
        },
      },
      {
        "@type": "Question",
        name: "How much does HP Instant Ink cost per month?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HP Instant Ink plans in 2025: 10 pages/month for $0.99, 50 pages/month for $2.99, 100 pages/month for $4.99, 300 pages/month for $9.99, 700 pages/month for $19.99. Overage pages cost $1.00 per 10 additional pages. Unused pages roll over for one month only.",
        },
      },
      {
        "@type": "Question",
        name: "Is Canon ReadyPrint better than HP Instant Ink?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Canon ReadyPrint has fewer restrictions than HP Instant Ink — Canon does not disable cartridges on cancellation. However, Canon's overage rate ($1.50 per 10 pages) is higher than HP's ($1.00 per 10 pages). For light-to-moderate users who want a subscription without the cancellation risk, Canon ReadyPrint is a safer choice.",
        },
      },
      {
        "@type": "Question",
        name: "Should I get HP Instant Ink if I have an Epson EcoTank?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No — if you own an Epson EcoTank, you should not use any ink subscription. EcoTank ink bottles already cost approximately 1–3 cents per page, which is significantly cheaper than any ink subscription plan. Epson EcoTank owners have no incentive to subscribe to ReadyPrint or any other ink service.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Is HP Instant Ink Worth It?", item: "https://setwisedigital.com/tools/is-hp-instant-ink-worth-it" },
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
