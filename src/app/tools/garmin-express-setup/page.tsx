import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "How to Update Garmin GPS Maps — Wi-Fi & Garmin Express",
  description: "Step-by-step guide to updating your Garmin GPS via Wi-Fi or Garmin Express. Tick off each step as you go. All models covered. Free.",
  keywords: [
    "how to update Garmin GPS",
    "Garmin Express step by step guide",
    "update Garmin GPS WiFi",
    "Garmin map update 2025",
    "how to use Garmin Express",
    "Garmin GPS update stuck",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/garmin-express-setup" },
  openGraph: {
    title: "How to Update Garmin GPS Maps — Wi-Fi & Garmin Express",
    description: "Step-by-step guide to updating your Garmin GPS via Wi-Fi or Garmin Express. Tick off each step as you go. All models covered. Free.",
    url: "https://www.setwisedigital.com/tools/garmin-express-setup",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "How to Update Garmin GPS Maps — Wi-Fi & Garmin Express Step-by-Step",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Clickable step-by-step guide to updating your Garmin GPS using Wi-Fi or Garmin Express on a computer. Tick off each step as you go. Covers all Garmin models. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,

,
      {
        "@type": "Question",
        name: "How do I install Garmin Express?",
        acceptedAnswer: { "@type": "Answer", text: "To install Garmin Express: go to garmin.com/express on your computer. Click Download for Windows or Mac. Open the downloaded file and follow the installation steps (takes about 2 minutes). Once installed, connect your Garmin GPS to your computer using the USB cable that came with it. Garmin Express opens automatically and detects your device, showing available map and software updates." },
      },
      {
        "@type": "Question",
        name: "Why is Garmin Express not detecting my GPS?",
        acceptedAnswer: { "@type": "Answer", text: "If Garmin Express is not detecting your GPS: 1) Try a different USB port on your computer. 2) Try a different USB cable — cables often fail before the GPS does. 3) Make sure your GPS is turned ON before connecting. 4) On your Garmin GPS screen, check if a 'Connected to Computer' message appears. 5) Restart Garmin Express and reconnect. 6) Temporarily disable antivirus software, which sometimes blocks Garmin Express." },
      },
      {
        "@type": "Question",
        name: "How long does a Garmin map update take?",
        acceptedAnswer: { "@type": "Answer", text: "A Garmin map update typically takes 30 minutes to 3 hours depending on: your internet speed, the size of the map region (North America is larger than Europe), and the age of your current maps. Downloading the update to your computer takes 15-60 minutes. Transferring to the GPS device takes an additional 15-60 minutes. Do not disconnect the GPS during the update." },
      },
      {
        "@type": "Question",
        name: "Are Garmin map updates free?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin map updates are free on most GPS models that include 'LM' (Lifetime Maps) or 'LMT' (Lifetime Maps and Traffic) in the model name. Examples: Garmin DriveSmart 55LMT, Garmin Drive 52LM. If your model does not include LM, a single map update costs approximately $49-$89 per region. Check your model's packaging or garmin.com/updates to confirm." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "How to Update Garmin GPS Maps — Wi-Fi & Garmin Express Step-by-Step", item: "https://www.setwisedigital.com/tools/garmin-express-setup" },
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
