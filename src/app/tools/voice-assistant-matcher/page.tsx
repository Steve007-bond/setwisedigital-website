import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best Voice Assistant — Alexa vs Google vs Siri Comparison",
  description: "Alexa, Google Assistant, or Siri? 5 questions about your phone and daily habits match you to the best voice assistant. Free, plain English.",
  keywords: [
    "Alexa vs Google Assistant vs Siri",
    "best voice assistant 2025",
    "which voice assistant should I use",
    "Alexa or Google for seniors",
    "Siri vs Alexa vs Google comparison",
    "smart speaker buying guide",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/voice-assistant-matcher" },
  openGraph: {
    title: "Best Voice Assistant — Alexa vs Google vs Siri Comparison",
    description: "Alexa, Google Assistant, or Siri? 5 questions about your phone and daily habits match you to the best voice assistant. Free, plain English.",
    url: "https://www.setwisedigital.com/tools/voice-assistant-matcher",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Best Voice Assistant for You — Alexa vs Google vs Siri",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Alexa, Google Assistant, or Siri? 5 questions about your phone, daily habits, and home devices match you to the best voice assistant for your life. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Is Alexa better than Google Assistant?",
        acceptedAnswer: { "@type": "Answer", text: "Alexa is better for: smart home device control (widest compatibility), shopping, audio books (Audible integration), and users who primarily use Amazon services. Google Assistant is better for: Android phone integration, Google Calendar and Gmail, complex questions requiring web searches, and users who rely on Google services. For smart speaker use at home, Alexa has more third-party skills and smart home device compatibility." },
      },
      {
        "@type": "Question",
        name: "Should I get Alexa or Siri for an iPhone?",
        acceptedAnswer: { "@type": "Answer", text: "If you have an iPhone, you already have Siri — it works on iPhone, iPad, Mac, Apple Watch, and HomePod. For smart home control from your iPhone, Siri with Apple HomeKit-compatible devices is seamless. However, if you want a dedicated smart speaker in your home, an Amazon Echo with Alexa or Google Nest provides significantly more smart home device compatibility and better hands-free room audio. Most iPhone users use both Siri (on the phone) and Alexa (for the home speaker)." },
      },
      {
        "@type": "Question",
        name: "What can Alexa do that Google Assistant can't?",
        acceptedAnswer: { "@type": "Answer", text: "Alexa-exclusive capabilities: Audible audiobook playback, Amazon shopping with one-click ordering, drop-in calling between Echo devices in different rooms, Alexa Guard (listens for glass breaking or smoke alarms), and Alexa Skills (third-party apps for Alexa — over 100,000 available). Google Assistant is better at answering factual questions and integrating with Google services, but has a smaller third-party skill library." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Best Voice Assistant for You — Alexa vs Google vs Siri", item: "https://www.setwisedigital.com/tools/voice-assistant-matcher" },
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
