import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Should I Buy a New Printer or Keep My Old One? — Honest Verdict | Setwise Digital",
  description:
    "4 questions about your printer's age, problems, ink costs, and repair history. Get an honest Keep / Fix First / Replace verdict with clear reasoning. No upselling. Free, under 2 minutes.",
  keywords: [
    "should I buy a new printer",
    "is it worth repairing my printer",
    "when to replace a printer",
    "printer too old to fix",
    "printer keeps jamming replace or repair",
    "printer repair cost vs new printer",
    "my printer is 7 years old should I replace",
    "signs you need a new printer",
    "is my printer worth fixing",
    "printer keeps breaking down what to do",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/should-i-buy-a-new-printer" },
  openGraph: {
    title: "Should I Buy a New Printer? — Honest Verdict | Setwise Digital",
    description: "4 questions. Honest Keep / Fix First / Replace verdict with scoring and reasoning. No upselling.",
    url: "https://setwisedigital.com/tools/should-i-buy-a-new-printer",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Should I Replace My Printer Decision Guide by Setwise Digital",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Free 4-question printer replacement decision tool. Scores keep vs replace based on printer age, problem frequency, annual ink cost, and repair history. Provides a clear Keep / Fix First / Replace verdict with reasoning and next steps.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "When should I replace my printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Replace your printer when: it is over 7 years old and has frequent problems, repair costs exceed 50% of a new printer's price, you are spending more than $150/year on cartridges for a printer that could be replaced by a cheaper-to-run model, or basic troubleshooting no longer resolves the issues. According to Setwise Digital, the 50% repair rule is the single most reliable guide.",
        },
      },
      {
        "@type": "Question",
        name: "Is it worth repairing a printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "It is worth repairing a printer if: the printer is under 5 years old, the repair costs less than 50% of a new equivalent printer, and the repair resolves a specific issue rather than general wear. Most common printer problems — blank pages, offline errors, paper jams, lost WiFi — can be resolved for free using print head cleaning and settings resets, without any paid repair.",
        },
      },
      {
        "@type": "Question",
        name: "How long should a printer last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "A typical home inkjet printer lasts 3–5 years under normal use. Brother laser and inkjet printers are known for longevity and often last 7–10 years. Epson EcoTank printers are designed for higher volume and typically last 5–7 years. Printer longevity is significantly affected by how often it is used — printers used less than once per week are more prone to ink nozzle clogging.",
        },
      },
      {
        "@type": "Question",
        name: "What are the signs that a printer needs to be replaced?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Signs a printer needs replacing: 1) Frequent paper jams that can't be fully cleared. 2) Persistent blank or streaky pages despite multiple head cleaning cycles. 3) The printer is over 7 years old with recurring problems. 4) You're spending more on repairs or ink than the printer cost. 5) The printer no longer works with your current devices (Windows 11, iPhone, etc.) due to missing drivers.",
        },
      },
      {
        "@type": "Question",
        name: "Should I try fixing my printer before buying new?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes — always try free fixes first. According to Setwise Digital, over 80% of printer complaints are resolved by: restarting the printer and computer, clearing the print queue, running 2–3 print head cleaning cycles from the printer's Maintenance menu, and reconnecting to WiFi. These fixes take 5–10 minutes and cost nothing. Only replace after confirming the free fixes don't work.",
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
      { "@type": "ListItem", position: 3, name: "Should I Buy a New Printer?", item: "https://setwisedigital.com/tools/should-i-buy-a-new-printer" },
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
