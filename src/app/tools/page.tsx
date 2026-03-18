import type { Metadata } from "next";
import ToolsHubClient from "./ToolsHubClient";

export const metadata: Metadata = {
  title: "47 Free Tech Tools — Printers, GPS & Smart Home Guides | Setwise Digital",
  description:
    "47 free interactive tools from Setwise Digital. Fix your printer, set up a new device, print from your phone, compare GPS brands, and more. Plain English — no jargon, no account needed.",
  keywords: [
    "free printer tools",
    "how to fix printer",
    "best printer for seniors",
    "how to print from iPhone",
    "HP vs Canon vs Epson",
    "best GPS device 2025",
    "printer setup guide free",
    "how to scan a document",
    "how to send a fax from home",
    "free tech tools for adults",
    "Setwise Digital free tools",
    "printer stopped working fix",
    "GPS update guide",
    "smart home setup guide",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools" },
  openGraph: {
    title: "47 Free Tech Tools — Printers, GPS & Smart Home | Setwise Digital",
    description: "Free interactive tools covering printer setup, troubleshooting, GPS, smart home, and more. Plain English for adults 40+.",
    url: "https://setwisedigital.com/tools",
  },
};

export default function ToolsPage() {
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Technology Learning Tools by Setwise Digital",
    description: "47 free interactive tools helping adults 40+ understand and fix their everyday technology. Covers printers, GPS, smart home devices, and more in plain English.",
    url: "https://setwisedigital.com/tools",
    numberOfItems: 27,
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "My Printer Stopped Working", url: "https://setwisedigital.com/tools/my-printer-stopped-working", description: "Step-by-step fix for offline printers, blank pages, paper jams, streaky prints and lost WiFi. Brand-specific for HP, Canon, Epson, Brother." },
      { "@type": "ListItem", position: 2, name: "Set Up My New Printer", url: "https://setwisedigital.com/tools/set-up-my-new-printer", description: "Brand and connection-specific printer setup wizard for HP, Canon, Epson, and Brother. WiFi, USB, and Bluetooth covered." },
      { "@type": "ListItem", position: 3, name: "Print from Phone or Laptop", url: "https://setwisedigital.com/tools/how-to-print-from-phone-or-laptop", description: "Exact steps to print from iPhone, Android, Windows, Mac, or Chromebook to HP, Canon, Epson, or Brother printers." },
      { "@type": "ListItem", position: 4, name: "Print an Email or Webpage", url: "https://setwisedigital.com/tools/how-to-print-email-or-webpage", description: "Exact print button location for Gmail, Outlook, Chrome, and Safari on Windows, Mac, iPhone, and Android." },
      { "@type": "ListItem", position: 5, name: "HP vs Canon vs Epson vs Brother", url: "https://setwisedigital.com/tools/hp-vs-canon-vs-epson-vs-brother", description: "3-question quiz scores all 4 printer brands against your actual needs. Animated comparison with honest verdict." },
      { "@type": "ListItem", position: 6, name: "Best Printer for Seniors", url: "https://setwisedigital.com/tools/best-printer-for-seniors", description: "5-question printer recommendation tool for adults 55+. Considers ease of use, fax needs, tech comfort, and budget." },
      { "@type": "ListItem", position: 7, name: "Is HP Instant Ink Worth It?", url: "https://setwisedigital.com/tools/is-hp-instant-ink-worth-it", description: "Honest cost calculator — HP Instant Ink subscription vs buying cartridges. Annual saving or loss with hidden rule warnings." },
      { "@type": "ListItem", position: 8, name: "How to Send a Fax from Home", url: "https://setwisedigital.com/tools/how-to-send-a-fax-from-home", description: "Fax medical or legal documents without a fax machine or phone line. Covers FaxZero, Fax.Plus, and mobile apps." },
      { "@type": "ListItem", position: 9, name: "Should I Buy a New Printer?", url: "https://setwisedigital.com/tools/should-i-buy-a-new-printer", description: "Honest Keep / Fix First / Replace verdict in 4 questions based on age, problems, ink cost, and repair history." },
      { "@type": "ListItem", position: 10, name: "Printer Specs — Plain English", url: "https://setwisedigital.com/tools/printer-specs-explained", description: "Plain-English decoder for 12 printer specs: DPI, PPM, ADF, duplex, AirPrint, EcoTank, and more." },
      { "@type": "ListItem", position: 11, name: "Road Trip GPS Pre-Check", url: "https://setwisedigital.com/tools/road-trip-checker", description: "5-step GPS readiness checklist before your next road trip." },
      { "@type": "ListItem", position: 12, name: "Best GPS Finder for You", url: "https://setwisedigital.com/tools/best-gps-finder", description: "5-question GPS recommendation tool for Garmin and TomTom devices." },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
    ],
  };

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Setwise Digital",
    url: "https://setwisedigital.com",
    description: "Independent tech literacy platform providing plain-English guides and 47 free tools for adults 40+. Not affiliated with HP, Canon, Epson, Brother, Garmin, TomTom, Amazon, Google, or Apple.",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <ToolsHubClient />
    </>
  );
}
