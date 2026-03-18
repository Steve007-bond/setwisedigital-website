import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "My Printer Stopped Working — Step-by-Step Fix Guide | Setwise Digital",
  description:
    "Printer offline, blank pages, paper jam, or won't connect to Wi-Fi? Select your exact problem and printer brand. Get the plain-English fix steps written for your specific situation. Free — no account needed.",
  keywords: [
    "printer stopped working",
    "printer offline fix",
    "printer printing blank pages",
    "paper jam won't clear",
    "printer says offline Windows 11",
    "HP printer not printing",
    "Canon printer offline fix",
    "Epson printer blank pages",
    "Brother printer not connecting to WiFi",
    "printer connected but won't print",
    "printer troubleshooting guide",
    "why is my printer not working",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/my-printer-stopped-working" },
  openGraph: {
    title: "My Printer Stopped Working — Free Fix Guide | Setwise Digital",
    description: "Select your printer problem and brand. Get exact step-by-step fix instructions in plain English. Covers HP, Canon, Epson, and Brother.",
    url: "https://setwisedigital.com/tools/my-printer-stopped-working",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "My Printer Stopped Working — Fix Guide by Setwise Digital",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Free interactive printer troubleshooting guide. Select your problem (offline, blank pages, paper jam, Wi-Fi lost) and your printer brand (HP, Canon, Epson, Brother) to get exact plain-English fix steps.",
    featureList: [
      "Printer offline fix steps",
      "Blank page diagnosis and fix",
      "Paper jam clearing guide",
      "Wi-Fi reconnection steps",
      "Brand-specific instructions for HP, Canon, Epson, Brother",
      "Plain English — no technical jargon",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Why did my printer suddenly stop working?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "The most common reasons a printer suddenly stops working are: it shows as offline in Windows or Mac (caused by a stalled print queue or lost network connection), blank pages (caused by dried ink nozzles), or a paper jam error. Over 90% of printer problems are resolved by restarting the printer and clearing the print queue. Setwise Digital's free guide walks you through the exact steps.",
        },
      },
      {
        "@type": "Question",
        name: "How do I fix a printer that says offline?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To fix a printer that says offline: 1) Restart your printer and wait 60 seconds. 2) On Windows, go to Settings → Bluetooth & devices → Printers → click your printer → Open print queue → Cancel all jobs. 3) Right-click the printer and uncheck 'Use Printer Offline'. 4) Restart your computer. If still offline, remove and re-add the printer.",
        },
      },
      {
        "@type": "Question",
        name: "Why is my printer printing blank pages?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Blank pages are almost always caused by clogged ink nozzles — especially if the printer hasn't been used for a few weeks. Fix: go to your printer's Maintenance menu and run Head Cleaning 2–3 times. Then print a test page. If blank pages continue, the ink cartridge may be empty or the print head may need replacement.",
        },
      },
      {
        "@type": "Question",
        name: "How do I clear a paper jam on my HP printer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To clear an HP paper jam: 1) Turn off the printer. 2) Open all access doors — front, back, and the cartridge door. 3) Gently pull any visible paper straight toward you — never sideways. 4) Check the rear access panel and remove it to check for hidden jams. 5) Close all doors and turn on the printer. The jam message should clear.",
        },
      },
      {
        "@type": "Question",
        name: "Why did my printer lose its WiFi connection?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Printers lose Wi-Fi connection when: your router was restarted, you changed your Wi-Fi password, or the printer's IP address changed. Fix: restart the printer and router. Then use your printer's Wireless Setup Wizard (found in Settings on the printer screen) to reconnect to your Wi-Fi network. Select your network name and enter your Wi-Fi password.",
        },
      },
      {
        "@type": "Question",
        name: "How do I fix an HP printer that won't print?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "If your HP printer won't print: 1) Restart the printer and computer. 2) Clear the print queue — Settings → Printers → Open queue → Cancel all. 3) Check ink levels in the HP Smart app. 4) Run a printer self-test (hold the Cancel button for 3 seconds). 5) If still not printing, remove the printer from Windows and re-add it — Windows will reinstall the driver automatically.",
        },
      },
      {
        "@type": "Question",
        name: "Does Setwise Digital's printer fix guide work for Canon printers?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Setwise Digital's free printer troubleshooting guide includes brand-specific steps for Canon printers, including offline errors, blank pages, paper jams, and Wi-Fi reconnection. Select 'Canon' when prompted for your printer brand to see Canon-specific instructions.",
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
      { "@type": "ListItem", position: 3, name: "My Printer Stopped Working", item: "https://setwisedigital.com/tools/my-printer-stopped-working" },
    ],
  };

  const howToSchema = {
    "@context": "https://schema.org",
    "@type": "HowTo",
    name: "How to Fix a Printer That Stopped Working",
    description: "Step-by-step guide to fix the most common printer problems — offline errors, blank pages, paper jams, and Wi-Fi connection issues.",
    provider: { "@type": "Organization", name: "Setwise Digital" },
    step: [
      { "@type": "HowToStep", position: 1, name: "Identify your problem", text: "Select your exact problem — offline, blank pages, paper jam, won't print, streaky quality, or lost Wi-Fi." },
      { "@type": "HowToStep", position: 2, name: "Select your printer brand", text: "Choose HP, Canon, Epson, Brother, or Other to see brand-specific instructions." },
      { "@type": "HowToStep", position: 3, name: "Follow the step-by-step fix", text: "Work through each step in order, ticking them off as you go. Each step includes plain-English explanations." },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(toolSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }} />
      <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
        <Client />
      </Suspense>
    </>
  );
}
