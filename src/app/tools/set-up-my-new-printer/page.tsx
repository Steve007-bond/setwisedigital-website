import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "How to Set Up a New Printer — Step-by-Step Wizard | Setwise Digital",
  description:
    "Just got a new HP, Canon, Epson, or Brother printer? Choose your brand and connection type — Wi-Fi, USB, or Bluetooth. Get the exact setup steps for your specific combination. Free interactive guide.",
  keywords: [
    "how to set up a new printer",
    "how to connect printer to WiFi",
    "HP printer setup guide",
    "Canon printer wireless setup",
    "Epson printer setup WiFi",
    "Brother printer setup",
    "connect printer to laptop",
    "printer setup step by step",
    "new printer won't connect",
    "how to install a printer Windows 11",
    "how to add printer to iPhone",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/set-up-my-new-printer" },
  openGraph: {
    title: "Set Up My New Printer — Step-by-Step Guide | Setwise Digital",
    description: "Brand and connection-specific setup wizard. Choose HP, Canon, Epson, or Brother + Wi-Fi, USB, or Bluetooth — get the exact steps.",
    url: "https://setwisedigital.com/tools/set-up-my-new-printer",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "New Printer Setup Wizard by Setwise Digital",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Interactive printer setup wizard covering 15 brand and connection combinations. Select your printer brand (HP, Canon, Epson, Brother) and connection type (Wi-Fi, USB, Bluetooth) for exact step-by-step setup instructions in plain English.",
    featureList: [
      "HP printer WiFi setup steps",
      "Canon printer wireless setup",
      "Epson printer USB setup",
      "Brother printer Bluetooth setup",
      "15 brand and connection combinations",
      "Brand-specific app recommendations",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I set up a new HP printer on WiFi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To set up an HP printer on WiFi: 1) Unbox the printer and install ink cartridges. 2) On the printer screen, tap Wireless Setup Wizard. 3) Select your WiFi network name. 4) Enter your WiFi password. 5) On your computer or phone, add the printer — Windows: Settings → Printers → Add. Mac: System Settings → Printers → +. iPhone: uses AirPrint automatically once on the same WiFi.",
        },
      },
      {
        "@type": "Question",
        name: "How do I connect my Canon printer to WiFi without a WPS button?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Without WPS: on your Canon printer screen, go to Settings → Wireless LAN Setup → Standard Setup. Select your WiFi network from the list and enter your password using the printer keypad. The printer will connect and show a solid WiFi indicator light. Then add the printer on your computer via Settings → Printers.",
        },
      },
      {
        "@type": "Question",
        name: "What app do I need to set up an Epson printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To set up an Epson printer wirelessly, download the Epson Smart Panel app (free, available on iPhone, Android, Windows, and Mac). Open the app, tap Set Up Printer, and follow the on-screen steps. The app handles WiFi setup, ink level monitoring, and scanning from one place.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a CD to install a printer in 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. In 2025, no printer requires a CD for setup. Windows 10 and 11 download printer drivers automatically when you add a printer over WiFi. For the best experience, download your brand's free app: HP Smart, Canon PRINT, Epson Smart Panel, or Brother iPrint&Scan — all available from the Microsoft Store, App Store, or Google Play.",
        },
      },
      {
        "@type": "Question",
        name: "Why won't my new printer connect to WiFi?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Common causes: 1) The printer is on a different WiFi network than your phone or computer — both must be on the same network. 2) You entered the WiFi password incorrectly — passwords are case-sensitive. 3) Your router has both 2.4GHz and 5GHz networks — most printers only connect to 2.4GHz. Try connecting the printer to the 2.4GHz network specifically.",
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
      { "@type": "ListItem", position: 3, name: "Set Up My New Printer", item: "https://setwisedigital.com/tools/set-up-my-new-printer" },
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
