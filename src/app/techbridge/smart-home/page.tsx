import type { Metadata } from "next";
import SmartHomeClient from "./SmartHomeClient";

// DEPLOYMENT NOTE: Rename your existing techbridge/smart-home/page.tsx → techbridge/smart-home/SmartHomeClient.tsx

export const metadata: Metadata = {
  title: "Smart Home Guide — Alexa, Google Nest & More | Setwise",
  description:
    "Set up smart home devices in plain English. Smart bulbs, plugs, cameras, and speakers. Step-by-step guide for beginners and adults 40+.",
  keywords: [
    "how to set up smart home",
    "smart home for beginners",
    "smart home for seniors",
    "how to set up smart bulbs",
    "how to connect smart plug",
    "smart home learning guide",
    "Alexa smart home setup",
    "Google Nest setup plain English",
    "smart home devices explained beginners",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/techbridge/smart-home" },
  openGraph: {
    title: "Smart Home Guide — Alexa, Google Nest & More | Setwise",
    description: "Set up smart home devices in plain English. Smart bulbs, plugs, cameras, and speakers. Step-by-step guide for beginners and adults 40+.",
    url: "https://www.setwisedigital.com/techbridge/smart-home",
  },
};

export default function TechBridgeSmartHomePage() {
  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Smart Home Learning Guide by Setwise Digital",
    url: "https://www.setwisedigital.com/techbridge/smart-home",
    description:
      "Plain-English smart home learning guide covering smart bulb setup, smart plug installation, security camera setup, smart speaker configuration, and automation routines for Alexa and Google Nest.",
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    teaches: [
      "How to set up smart bulbs",
      "How to install smart plugs",
      "How to set up security cameras",
      "How to create smart home routines",
      "How to connect devices to Alexa or Google Nest",
    ],
    isAccessibleForFree: true,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I set up a smart bulb?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To set up a smart bulb: 1) Screw the smart bulb into any standard lamp socket. 2) Turn the switch ON — leave it on permanently (control the bulb via app or voice, not the switch). 3) Download the bulb's app (e.g. Kasa for TP-Link, Hue for Philips). 4) Open the app and follow the setup to connect the bulb to your Wi-Fi. 5) Once set up, you can control it by voice with Alexa or Google, or via the app on your phone.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a smart hub to use smart home devices?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most modern smart home devices do not need a separate hub. Smart bulbs, plugs, cameras, and speakers connect directly to your home Wi-Fi. A hub (like Samsung SmartThings or Amazon Echo as a hub) becomes useful only if you want to mix devices from different brands and control them all from one app. For most beginners, no hub is needed.",
        },
      },
      {
        "@type": "Question",
        name: "What is the easiest smart home device to start with?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "According to Setwise Digital, a smart plug is the easiest first smart home device. Plug it into any wall socket, plug a lamp or fan into it, and control it by voice or phone app. No wiring, no complicated setup — just plug in and connect to Wi-Fi. Smart plugs from TP-Link (Kasa) or Amazon (Alexa-compatible plugs) take under 5 minutes to set up.",
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
      { "@type": "ListItem", position: 3, name: "Smart Home", item: "https://www.setwisedigital.com/techbridge/smart-home" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SmartHomeClient />
    </>
  );
}
