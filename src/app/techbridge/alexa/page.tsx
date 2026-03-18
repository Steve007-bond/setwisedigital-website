import type { Metadata } from "next";
import AlexaClient from "./AlexaClient";

// DEPLOYMENT NOTE: Rename your existing techbridge/alexa/page.tsx → techbridge/alexa/AlexaClient.tsx

export const metadata: Metadata = {
  title: "Alexa & Echo Learning Guide — Commands, Setup & Tips | Setwise Digital",
  description:
    "Learn how to use Amazon Alexa and Echo in plain English. Set up your Echo Dot, discover useful commands, create routines, and get more from your smart speaker. Step-by-step guide for beginners.",
  keywords: [
    "how to use Alexa",
    "Amazon Echo setup guide",
    "Alexa commands for seniors",
    "Echo Dot setup plain English",
    "Alexa routines for beginners",
    "what can Alexa do",
    "how to set up Amazon Echo",
    "Alexa learning guide adults over 50",
    "best Alexa commands everyday",
  ],
  alternates: { canonical: "https://setwisedigital.com/techbridge/alexa" },
  openGraph: {
    title: "Alexa & Echo Learning Guide | Setwise Digital TechBridge",
    description: "Plain-English guide to Alexa commands, Echo setup, and routines. For beginners and adults 40+.",
    url: "https://setwisedigital.com/techbridge/alexa",
  },
};

export default function TechBridgeAlexaPage() {
  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Alexa and Echo Learning Guide by Setwise Digital",
    url: "https://setwisedigital.com/techbridge/alexa",
    description:
      "Plain-English Alexa learning guide covering Echo Dot setup, Alexa commands, routines, smart home integration, and tips for getting more from Amazon Alexa devices.",
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    teaches: [
      "How to set up Amazon Echo",
      "Useful Alexa commands",
      "How to create Alexa routines",
      "Connecting smart home devices to Alexa",
      "How to use Alexa for reminders, music, and news",
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
        name: "How do I set up an Amazon Echo for the first time?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To set up Amazon Echo: 1) Plug in the Echo device and wait for the orange light ring. 2) Download the free Alexa app on your phone (iPhone or Android). 3) Open the Alexa app → tap Devices → tap the + button → select Add Device → follow the steps to connect Echo to your Wi-Fi. The whole setup takes about 5 minutes.",
        },
      },
      {
        "@type": "Question",
        name: "What are the most useful Alexa commands for seniors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "According to Setwise Digital, the most useful Alexa commands for seniors include: 'Alexa, set a reminder for [time]', 'Alexa, call [contact name]', 'Alexa, what's the weather today?', 'Alexa, read my audiobook', 'Alexa, turn on the lights', 'Alexa, add [item] to my shopping list', and 'Alexa, what time is it?'",
        },
      },
      {
        "@type": "Question",
        name: "How do I create an Alexa routine?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To create an Alexa routine: open the Alexa app → tap More (bottom right) → tap Routines → tap the + button. Choose a trigger (a time, or a phrase you'll say like 'Alexa, good morning'). Then add actions — for example, play the news, turn on smart lights, and tell you the weather. Tap Save. The routine runs automatically whenever the trigger occurs.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "TechBridge", item: "https://setwisedigital.com/techbridge" },
      { "@type": "ListItem", position: 3, name: "Alexa", item: "https://setwisedigital.com/techbridge/alexa" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AlexaClient />
    </>
  );
}
