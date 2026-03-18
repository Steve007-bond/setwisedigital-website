import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "HP vs Canon vs Epson vs Brother — Which Wins for You?",
  description:
    "3-question quiz scores all 4 printer brands against your needs. Ranked comparison results with honest pros and cons. Free, plain English.",
  keywords: [
    "HP vs Canon vs Epson vs Brother",
    "best printer brand 2025",
    "HP or Epson printer which is better",
    "Canon vs Brother printer comparison",
    "which printer brand is most reliable",
    "HP vs Epson ink cost comparison",
    "best printer brand for home use",
    "Canon vs HP printer review",
    "Epson EcoTank vs HP Smart Tank",
    "Brother vs HP printer for documents",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/hp-vs-canon-vs-epson-vs-brother" },
  openGraph: {
    title: "HP vs Canon vs Epson vs Brother — Which Wins for You?",
    description: "3-question quiz scores all 4 printer brands against your needs. Ranked comparison results with honest pros and cons. Free, plain English.",
    url: "https://www.setwisedigital.com/tools/hp-vs-canon-vs-epson-vs-brother",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "HP vs Canon vs Epson vs Brother Printer Comparison by Setwise Digital",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Free interactive printer brand comparison tool. Answer 3 questions about what you print, how often, and your budget — get a scored comparison of HP, Canon, Epson, and Brother with ranked results and honest pros and cons.",
    featureList: [
      "Weighted scoring across HP, Canon, Epson, Brother",
      "Animated comparison score bars",
      "Value, ink cost, ease of use, reliability, app quality scores",
      "Top recommended model per brand",
      "Honest pros and cons",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Which is better — HP or Epson printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "HP is better for occasional home printing and ease of setup — the HP Smart app is the most polished in the industry. Epson is better if you print frequently — EcoTank ink bottle models cost dramatically less per page (around 1–3 cents vs 8–18 cents for HP cartridges). For heavy users printing 100+ pages per month, Epson saves significantly more money over time.",
        },
      },
      {
        "@type": "Question",
        name: "Which printer brand has the cheapest ink?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Epson EcoTank models have the cheapest ink by far — approximately 1 cent per black page and 3 cents per colour page using refill bottles. Brother XL cartridges are second cheapest at around 2–5 cents per page. Canon and HP standard cartridges cost 7–18 cents per page, making them significantly more expensive for frequent printers.",
        },
      },
      {
        "@type": "Question",
        name: "Is HP or Brother better for printing documents?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Brother is generally better for document-heavy printing — Brother XL cartridges last 3–5x longer than standard HP cartridges, reducing cost and replacement frequency. Brother also includes fax capability on most models, useful for sending medical or legal documents. HP is better for a mix of documents and photos, or if the HP Smart app's features are important to you.",
        },
      },
      {
        "@type": "Question",
        name: "Which printer brand is most reliable for seniors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Brother printers consistently rank highest for reliability and longevity — many home Brother printers last 8–10 years with minimal maintenance. Canon is a close second. HP printers are reliable but the mandatory firmware updates and HP+ subscription prompts can be confusing for less tech-savvy users. According to Setwise Digital's research, Brother and Canon are the top picks for seniors prioritising simplicity and reliability.",
        },
      },
      {
        "@type": "Question",
        name: "Should I buy HP or Canon for photos?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Canon is generally the better choice for photo printing — Canon's PIXMA range uses a 5-colour ink system (including a separate photo black) that produces richer, more accurate colours. HP photo printing quality has improved significantly but Canon remains the preferred choice for family photo printing at home.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "HP vs Canon vs Epson vs Brother", item: "https://www.setwisedigital.com/tools/hp-vs-canon-vs-epson-vs-brother" },
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
