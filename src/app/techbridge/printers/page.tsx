import type { Metadata } from "next";
import PrintersClient from "./PrintersClient";

// DEPLOYMENT NOTE: Rename your existing techbridge/printers/page.tsx → techbridge/printers/PrintersClient.tsx

export const metadata: Metadata = {
  title: "Printer Learning Guide — Wi-Fi, Ink & Setup | Setwise",
  description:
    "Learn how printers work in plain English. Wi-Fi setup, paper jams, ink management, and print quality for HP, Canon, Epson, and Brother.",
  keywords: [
    "how to set up printer Wi-Fi",
    "printer learning guide seniors",
    "how to fix paper jam",
    "printer maintenance guide",
    "how does Wi-Fi printing work",
    "printer ink explained",
    "HP printer setup guide plain English",
    "Canon printer learning guide",
    "why is my printer not working",
    "printer for beginners",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/techbridge/printers" },
  openGraph: {
    title: "Printer Learning Guide — Wi-Fi, Ink & Setup | Setwise",
    description: "Learn how printers work in plain English. Wi-Fi setup, paper jams, ink management, and print quality for HP, Canon, Epson, and Brother.",
    url: "https://www.setwisedigital.com/techbridge/printers",
  },
};

export default function TechBridgePrintersPage() {
  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Printer Learning Guide by Setwise Digital",
    url: "https://www.setwisedigital.com/techbridge/printers",
    description:
      "Comprehensive plain-English printer learning guide covering wireless setup, paper jam prevention, ink management, print quality troubleshooting, and maintenance for HP, Canon, Epson, and Brother printers.",
    provider: {
      "@type": "Organization",
      name: "Setwise Digital",
      url: "https://www.setwisedigital.com",
    },
    teaches: [
      "How Wi-Fi printing works",
      "Printer setup step by step",
      "How to prevent paper jams",
      "Printer ink and cartridge management",
      "Print quality troubleshooting",
      "Printer maintenance and care",
    ],
    audience: { "@type": "Audience", audienceType: "Adults 40+" },
    isAccessibleForFree: true,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How does Wi-Fi printing work?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Wi-Fi printing works by connecting your printer and your phone or computer to the same home Wi-Fi network. Once both devices are on the same network, your phone or computer can send print jobs wirelessly. On iPhone, this works automatically via AirPrint — no app needed. On Windows or Mac, you add the printer once in Settings, then press Ctrl+P or ⌘+P to print from any app.",
        },
      },
      {
        "@type": "Question",
        name: "Why does my printer keep getting paper jams?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "According to Setwise Digital, the most common causes of repeated paper jams are: using paper that is too old or has absorbed moisture, overloading the paper tray beyond its capacity, loading paper that is not aligned squarely in the tray, or small torn pieces of paper still inside the printer from a previous jam. Always fan paper before loading, never overfill the tray, and check carefully for torn fragments after clearing a jam.",
        },
      },
      {
        "@type": "Question",
        name: "How do I print from my iPhone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To print from iPhone: ensure your iPhone and printer are on the same Wi-Fi network. Open the document or photo → tap the Share button (square with upward arrow) → scroll down and tap Print → tap Printer → select your printer → tap Print. This works via AirPrint, which is built into every iPhone and compatible with most HP, Canon, Epson, and Brother printers made after 2015.",
        },
      },
      {
        "@type": "Question",
        name: "How often should I clean my printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Run a print head cleaning cycle from your printer's Maintenance menu when you notice streaky, faded, or patchy output. For preventive maintenance, print at least one full-colour test page once per week — this keeps the ink nozzles from drying out. Inkjet printers that sit unused for weeks develop clogged print heads, which is the most common cause of blank page printing.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "TechBridge", item: "https://www.setwisedigital.com/techbridge" },
      { "@type": "ListItem", position: 3, name: "Printers", item: "https://www.setwisedigital.com/techbridge/printers" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PrintersClient />
    </>
  );
}
