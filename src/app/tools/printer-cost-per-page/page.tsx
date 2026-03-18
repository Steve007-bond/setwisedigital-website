import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Printer Cost Per Page Calculator — Find Your True Printing Cost",
  description: "Calculate the real cost per page for your printer model. Enter your cartridge price and page yield — get your true cost per page in seconds. Compare HP, Canon, Epson, Brother. Free.",
  keywords: [
    "printer cost per page calculator",
    "how much does it cost to print one page",
    "HP ink cost per page",
    "cheapest cost per page printer",
    "Epson EcoTank cost per page",
    "Brother XL cartridge cost per page",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/printer-cost-per-page" },
  openGraph: {
    title: "Printer Cost Per Page Calculator — Find Your True Printing Cost",
    description: "Calculate the real cost per page for your printer model. Enter your cartridge price and page yield — get your true cost per page in seconds. Compare HP, Canon, Epson, Brother. Free.",
    url: "https://setwisedigital.com/tools/printer-cost-per-page",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Printer Cost Per Page Calculator — Find Your True Printing Cost",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Calculate the real cost per page for your printer model. Enter your cartridge price and page yield — get your true cost per page in seconds. Compare HP, Canon, Epson, Brother. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What is a good cost per page for a printer?",
        acceptedAnswer: { "@type": "Answer", text: "Good cost per page benchmarks: Black text printing — under 3 cents is excellent (laser or EcoTank), 5-8 cents is average (inkjet cartridge), over 10 cents is expensive. Colour printing — under 5 cents is excellent (EcoTank), 10-15 cents is average (inkjet), over 20 cents is expensive. According to Setwise Digital, the Epson EcoTank has the lowest colour cost per page of any home printer." },
      },
      {
        "@type": "Question",
        name: "How do I calculate printer cost per page?",
        acceptedAnswer: { "@type": "Answer", text: "To calculate printer cost per page: divide the cartridge price by the page yield printed at standard quality. Example: a $15 black cartridge that prints 120 pages costs 15 ÷ 120 = 12.5 cents per page. For colour, calculate separately for colour cartridges. Always use the manufacturer's stated page yield at 5% coverage (standard document) — heavy graphics printing costs more per page." },
      },
      {
        "@type": "Question",
        name: "Which printer has the lowest cost per page?",
        acceptedAnswer: { "@type": "Answer", text: "The Epson EcoTank ET-2800 has the lowest cost per page of any home inkjet printer — approximately 1 cent per black page and 3 cents per colour page. Brother laser printers have the lowest black-and-white cost per page (1-2 cents) but cannot print colour. For colour printing, EcoTank is the clear winner. According to Setwise Digital, over 3 years of regular printing, EcoTank saves $150-$300 vs standard inkjet cartridges." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Printer Cost Per Page Calculator — Find Your True Printing Cost", item: "https://setwisedigital.com/tools/printer-cost-per-page" },
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
