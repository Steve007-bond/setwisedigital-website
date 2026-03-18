import type { Metadata } from "next";
import ToolsHubClient from "./ToolsHubClient";

export const metadata: Metadata = {
  title: "Free Tech Tools & Printer Guides for Seniors | Setwise Digital",
  description:
    "26 free interactive tools to help you understand your technology. Printer setup, troubleshooting, GPS, smart home — plain-English guides with no jargon.",
  keywords: [
    "free tech tools for seniors",
    "printer setup guide",
    "how to fix printer",
    "best printer for seniors",
    "best GPS for seniors",
    "printer cost calculator",
    "smart home guide for beginners",
    "technology tools for adults over 50",
    "plain english tech guides",
    "how to scan a document",
    "how to print from iPhone",
    "HP vs Canon vs Epson vs Brother",
  ],
  openGraph: {
    title: "Free Tech Learning Tools for Seniors | Setwise Digital",
    description:
      "26 interactive tools to find the best technology for your lifestyle. Printer guides, GPS finders, smart home advisors — all in plain English.",
    url: "https://setwisedigital.com/tools",
  },
};

export default function ToolsPage() {
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Technology Learning Tools",
    description:
      "Interactive tools to help seniors and adults 45+ understand and choose the right technology for their needs.",
    url: "https://setwisedigital.com/tools",
    numberOfItems: 26,
    itemListElement: [
      {
        "@type": "ListItem", position: 1,
        name: "My Printer Stopped Working",
        url: "https://setwisedigital.com/tools/my-printer-stopped-working",
        description: "Step-by-step fix guide for offline printers, blank pages, paper jams, and more.",
      },
      {
        "@type": "ListItem", position: 2,
        name: "Set Up My New Printer",
        url: "https://setwisedigital.com/tools/set-up-my-new-printer",
        description: "Brand and connection-specific printer setup wizard for HP, Canon, Epson, and Brother.",
      },
      {
        "@type": "ListItem", position: 3,
        name: "Print from Phone or Laptop",
        url: "https://setwisedigital.com/tools/how-to-print-from-phone-or-laptop",
        description: "Exact steps to print from iPhone, Android, Windows, Mac, or Chromebook.",
      },
      {
        "@type": "ListItem", position: 4,
        name: "Print an Email or Webpage",
        url: "https://setwisedigital.com/tools/how-to-print-email-or-webpage",
        description: "Exact print button location for Gmail, Outlook, Chrome, and Safari on every device.",
      },
      {
        "@type": "ListItem", position: 5,
        name: "HP vs Canon vs Epson vs Brother",
        url: "https://setwisedigital.com/tools/hp-vs-canon-vs-epson-vs-brother",
        description: "3-question quiz scores all 4 printer brands against your actual needs.",
      },
      {
        "@type": "ListItem", position: 6,
        name: "Best Printer for Seniors",
        url: "https://setwisedigital.com/tools/best-printer-for-seniors",
        description: "Find the easiest-to-use printer for your needs in 5 simple questions.",
      },
      {
        "@type": "ListItem", position: 7,
        name: "Is HP Instant Ink Worth It?",
        url: "https://setwisedigital.com/tools/is-hp-instant-ink-worth-it",
        description: "Honest cost calculator — HP Instant Ink subscription vs buying cartridges.",
      },
      {
        "@type": "ListItem", position: 8,
        name: "How to Send a Fax from Home",
        url: "https://setwisedigital.com/tools/how-to-send-a-fax-from-home",
        description: "Fax medical or legal documents without a fax machine or phone line.",
      },
      {
        "@type": "ListItem", position: 9,
        name: "Should I Buy a New Printer?",
        url: "https://setwisedigital.com/tools/should-i-buy-a-new-printer",
        description: "Honest Keep / Fix First / Replace verdict in 4 questions.",
      },
      {
        "@type": "ListItem", position: 10,
        name: "Printer Specs — Plain English",
        url: "https://setwisedigital.com/tools/printer-specs-explained",
        description: "Plain-English decoder for DPI, PPM, ADF, duplex, AirPrint, and EcoTank.",
      },
      {
        "@type": "ListItem", position: 11,
        name: "Road Trip GPS Pre-Check",
        url: "https://setwisedigital.com/tools/road-trip-checker",
        description: "5-step GPS readiness checklist before your next road trip.",
      },
      {
        "@type": "ListItem", position: 12,
        name: "Best GPS Finder for You",
        url: "https://setwisedigital.com/tools/best-gps-finder",
        description: "Answer 5 questions and get a personalized GPS recommendation.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />
      <ToolsHubClient />
    </>
  );
}
