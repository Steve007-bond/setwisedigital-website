import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Printer Specs Explained in Plain English — DPI, PPM, ADF & More | Setwise Digital",
  description:
    "Confused by DPI, PPM, ADF, duplex, AirPrint, or EcoTank? Tap any printer specification and get a plain-English explanation — what it means, whether you need it, and what value to look for.",
  keywords: [
    "what does DPI mean printer",
    "what is duplex printing",
    "what is ADF on printer",
    "printer PPM meaning",
    "what is AirPrint",
    "what is EcoTank printer",
    "printer specs explained",
    "what does duplex printing mean",
    "wireless direct printing explained",
    "printer monthly duty cycle meaning",
    "what is scan resolution DPI",
    "inkjet vs laser printer difference explained",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/printer-specs-explained" },
  openGraph: {
    title: "Printer Specs Explained in Plain English | Setwise Digital",
    description: "DPI, PPM, ADF, duplex, AirPrint, EcoTank — tap any spec for a plain-English explanation and whether you need it.",
    url: "https://setwisedigital.com/tools/printer-specs-explained",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Printer Specs Plain English Decoder by Setwise Digital",
    applicationCategory: "EducationalApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Free interactive printer specifications decoder. Explains 12 printer specs in plain English — DPI, PPM, ADF, duplex, AirPrint, Wi-Fi Direct, EcoTank, scan resolution, paper tray capacity, monthly duty cycle, print head, and inkjet vs laser — with need level ratings and good value benchmarks.",
    featureList: [
      "12 printer specifications explained",
      "Plain-English analogies for each spec",
      "Need level rating per spec",
      "Good value benchmarks",
      "Search and category filter",
      "Quick reference table by use case",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "What does DPI mean on a printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "DPI stands for Dots Per Inch — it measures how many ink dots a printer places per inch of paper. Higher DPI means sharper, more detailed output. For documents and letters, 600 DPI is perfectly fine. For photos, 1200+ DPI gives better quality. Most home printers advertise 4800 DPI — this refers to the maximum photo printing mode, which uses more ink and prints slower.",
        },
      },
      {
        "@type": "Question",
        name: "What is duplex printing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Duplex printing means the printer automatically prints on both sides of a sheet of paper. 'Automatic duplex' flips the paper on its own — you don't have to reload it manually. This halves your paper usage. 'Manual duplex' prompts you to flip the paper yourself, which is less useful. Look for 'Automatic Duplex Printing' when buying a printer.",
        },
      },
      {
        "@type": "Question",
        name: "What is an ADF on a printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "ADF stands for Automatic Document Feeder — the slot on top of the printer where you stack multiple pages for scanning or copying. The printer feeds each page through automatically. Without an ADF, you scan one page at a time by lifting the lid. An ADF is essential if you regularly scan multi-page documents like contracts, medical forms, or statements.",
        },
      },
      {
        "@type": "Question",
        name: "What is AirPrint and do I need it?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "AirPrint is Apple's built-in wireless printing system. If your printer supports AirPrint, your iPhone or iPad finds and connects to it automatically — no app or setup needed. If you have an iPhone or iPad, AirPrint support is essential. Most HP, Canon, Epson, and Brother printers made after 2015 support AirPrint — it is listed on the printer box and product listing.",
        },
      },
      {
        "@type": "Question",
        name: "What is an EcoTank printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "EcoTank is Epson's name for their ink tank printer range — printers that use large refillable ink bottles instead of small cartridges. You pour ink from a bottle into a built-in tank, like refilling a water jug. One bottle fills enough ink for hundreds to thousands of pages. EcoTank printers cost more upfront ($150–$250) but have dramatically lower running costs — approximately 1–3 cents per page vs 8–18 cents for standard cartridge printers.",
        },
      },
      {
        "@type": "Question",
        name: "What does PPM mean on a printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "PPM stands for Pages Per Minute — how many pages the printer can produce in one minute at draft quality. For home use printing occasional documents, PPM is not a critical spec. For home offices printing 10+ pages at a time, look for 10+ PPM. Note: manufacturers measure PPM in draft mode — actual standard-quality printing is typically 30–50% slower than the advertised figure.",
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
      { "@type": "ListItem", position: 3, name: "Printer Specs Explained", item: "https://setwisedigital.com/tools/printer-specs-explained" },
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
