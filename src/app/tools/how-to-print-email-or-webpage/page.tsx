import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "How to Print an Email or Webpage — Gmail, Outlook, Chrome & Safari | Setwise Digital",
  description:
    "Pick your email app or browser, then your device. Get the exact button location and step-by-step print instructions. Gmail, Outlook, Apple Mail, Chrome, Safari, Edge — on Windows, Mac, iPhone, or Android.",
  keywords: [
    "how to print an email",
    "how to print from Gmail",
    "how to print Outlook email",
    "how to print from Chrome",
    "how to print from Safari iPhone",
    "print email to paper",
    "print webpage from browser",
    "how to print Gmail on iPhone",
    "print from Edge browser",
    "how to print from Samsung Internet",
    "how to print a website page",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/how-to-print-email-or-webpage" },
  openGraph: {
    title: "Print Email or Webpage — Exact Steps for Your App | Setwise Digital",
    description: "Gmail, Outlook, Chrome, Safari, Edge — pick your app and device. Get the exact print button location for your combination.",
    url: "https://setwisedigital.com/tools/how-to-print-email-or-webpage",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Print Email or Webpage Guide by Setwise Digital",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Free interactive guide covering exact print button locations for Gmail, Outlook, Apple Mail, Yahoo Mail, Chrome, Safari, Edge, and Samsung Internet — on Windows, Mac, iPhone, and Android.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I print an email from Gmail?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To print a Gmail email on computer: open the email → click the three dots (⋮) in the top-right corner of the email → click Print. A print preview opens in a new tab. Select your printer from the dropdown and click the blue Print button. Keyboard shortcut: with the email open, press Ctrl+P (Windows) or ⌘+P (Mac) to go straight to print.",
        },
      },
      {
        "@type": "Question",
        name: "How do I print from Gmail on my iPhone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To print from Gmail on iPhone: open the Gmail app → open the email → tap the three dots (⋮) in the top-right corner → tap Print. Select your printer from the AirPrint list and tap Print in the top right. Your iPhone and printer must be on the same WiFi network for the printer to appear.",
        },
      },
      {
        "@type": "Question",
        name: "How do I print a webpage from Chrome?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To print from Chrome: press Ctrl+P (Windows) or ⌘+P (Mac) — this works on any webpage. A print preview appears on the right. Select your printer from the dropdown and click the blue Print button. On iPhone: tap the three dots at the bottom of Chrome → Share → Print. On Android: tap three dots at top → Share → Print.",
        },
      },
      {
        "@type": "Question",
        name: "How do I print from Safari on iPhone?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To print from Safari on iPhone: tap the Share button at the bottom of Safari (the square with upward arrow) → scroll down and tap Print → tap Printer and select your AirPrint printer → tap Print in the top right. For cleaner printing without ads, tap the 'AA' button in the Safari address bar and select Show Reader View before printing.",
        },
      },
      {
        "@type": "Question",
        name: "What is the keyboard shortcut to print on Windows?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The universal print keyboard shortcut on Windows is Ctrl+P. This works in every Windows application — Chrome, Edge, Outlook, Word, Excel, Photos, and every other program. Hold the Ctrl key and press P to instantly open the print dialog. On Mac, the equivalent shortcut is ⌘+P (Command+P).",
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
      { "@type": "ListItem", position: 3, name: "Print Email or Webpage", item: "https://setwisedigital.com/tools/how-to-print-email-or-webpage" },
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
