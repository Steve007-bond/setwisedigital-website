import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "How to Print from iPhone, Android, Windows or Mac | Setwise Digital",
  description:
    "Select your device and printer brand — get the exact steps for your combination. iPhone AirPrint, Android print service, Windows Ctrl+P, Mac ⌘+P — 28 combinations covered in plain English.",
  keywords: [
    "how to print from iPhone",
    "how to print from Android phone",
    "how to print from Windows laptop",
    "how to print from Mac",
    "print from phone to printer",
    "iPhone AirPrint setup",
    "how to print from Samsung phone",
    "print from Google Pixel to HP printer",
    "how to print from iPad",
    "print from Chromebook",
    "Android print service plugin",
    "print from phone wirelessly",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/how-to-print-from-phone-or-laptop" },
  openGraph: {
    title: "Print from Phone or Laptop — Exact Steps for Your Device | Setwise Digital",
    description: "28 device and printer brand combinations. Pick yours — get the exact steps. iPhone, Android, Windows, Mac, Chromebook.",
    url: "https://setwisedigital.com/tools/how-to-print-from-phone-or-laptop",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Print from Phone or Laptop Guide by Setwise Digital",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Free interactive guide covering 28 device and printer brand combinations. Select your device (iPhone, Android, Windows, Mac, Chromebook) and printer brand (HP, Canon, Epson, Brother) for exact wireless printing steps.",
    featureList: [
      "iPhone AirPrint instructions",
      "Android HP Smart print service setup",
      "Samsung print plugin guide",
      "Windows Add Printer steps",
      "Mac System Settings printer setup",
      "Chromebook IPP printing guide",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I print from my iPhone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To print from iPhone: 1) Make sure your iPhone and printer are on the same WiFi network. 2) Open the document, photo, or webpage. 3) Tap the Share button (square with upward arrow). 4) Scroll down and tap Print. 5) Tap Printer, select your printer from the AirPrint list. 6) Tap Print in the top right. AirPrint works automatically with most HP, Canon, Epson, and Brother printers made after 2015.",
        },
      },
      {
        "@type": "Question",
        name: "How do I print from an Android phone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To print from Android: 1) Ensure phone and printer are on the same WiFi. 2) Install your brand's print plugin — HP Print Service Plugin, Canon PRINT, Epson Smart Panel, or Brother iPrint&Scan — from Google Play. 3) Open your document in any app. 4) Tap the three-dot menu or Share button and select Print. 5) Choose your printer from the list and tap the print button.",
        },
      },
      {
        "@type": "Question",
        name: "How do I print from Windows without installing a driver?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Windows 10 and 11 install printer drivers automatically — no manual download needed for most printers. Go to Settings → Bluetooth & devices → Printers & scanners → Add device. Windows discovers the printer on your WiFi and installs the driver automatically within 60 seconds. Press Ctrl+P in any application to print.",
        },
      },
      {
        "@type": "Question",
        name: "Why can't my iPhone find my printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The most common reason an iPhone can't find a printer is that they are on different WiFi networks. Check: Settings → WiFi on your iPhone must show the same network name as your printer. If your router has both 2.4GHz and 5GHz networks with different names, make sure both devices are on the same one. If the printer still doesn't appear, download your brand's free print app — HP Smart, Canon PRINT, or Epson Smart Panel.",
        },
      },
      {
        "@type": "Question",
        name: "How do I print from a Mac?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To print from Mac: 1) Open Apple menu → System Settings → Printers & Scanners → click +. 2) Select your printer from the discovered list (it appears via AirPrint). 3) Click Add. This is a one-time setup. After that, press ⌘+P (Command+P) in any application to print. Select your printer from the dropdown and click Print.",
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
      { "@type": "ListItem", position: 3, name: "Print from Phone or Laptop", item: "https://setwisedigital.com/tools/how-to-print-from-phone-or-laptop" },
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
