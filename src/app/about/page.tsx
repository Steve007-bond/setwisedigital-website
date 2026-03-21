import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Setwise Digital — Patient Tech Education for Adults 45+ | Since 2016",
  description:
    "Trusted by adults 45+ across the US & Canada since 2016. Setwise Digital teaches printer setup, GPS navigation, smart home & Alexa — in plain English. 47 free tools. No jargon. No subscriptions. Independent — not affiliated with any brand.",
  keywords: [
    "about Setwise Digital",
    "who is Setwise Digital",
    "technology education for seniors",
    "tech help for adults over 45",
    "printer help for seniors",
    "GPS help for older adults",
    "plain English tech guides",
    "tech learning for seniors US Canada",
    "independent tech education company",
    "patient technology tutoring",
    "Setwise Digital story",
    "Setwise Digital founded 2016",
    "technology literacy platform adults",
    "smart home help for seniors",
    "Alexa setup help for older adults",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/about" },
  openGraph: {
    title: "About Setwise Digital — Patient Tech Education for Adults 45+",
    description:
      "Since 2016, we've helped adults 45+ master everyday technology — printers, GPS, Alexa, smart home — with patience, plain English, and zero pressure. 47 free tools. Serving the US & Canada.",
    url: "https://www.setwisedigital.com/about",
    type: "website",
    locale: "en_US",
    siteName: "Setwise Digital",
    images: [{ url: "https://www.setwisedigital.com/og-image.png", width: 1200, height: 630, alt: "About Setwise Digital — Technology Made Simple Since 2016" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Setwise Digital — Patient Tech Education for Adults 45+",
    description: "Since 2016 — plain English tech education. Printers, GPS, smart home. 47 free tools. No jargon. US & Canada.",
    images: ["https://www.setwisedigital.com/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function Page() {
  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Setwise Digital",
    url: "https://www.setwisedigital.com",
    logo: "https://www.setwisedigital.com/logo-light.png",
    foundingDate: "2016",
    description: "Independent technology education platform helping adults 45+ across the United States and Canada learn everyday technology — printers, GPS, smart home, cameras — in plain English with patience and zero pressure.",
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    address: { "@type": "PostalAddress", streetAddress: "137 Mazzeo Drive", addressLocality: "Glassboro", addressRegion: "NJ", postalCode: "08028", addressCountry: "US" },
    email: "support@setwisedigital.com",
    knowsAbout: ["Printer setup", "GPS navigation", "Smart home devices", "Alexa setup", "Technology literacy", "Camera setup", "Wi-Fi troubleshooting", "Online safety for seniors"],
    numberOfEmployees: { "@type": "QuantitativeValue", minValue: 2, maxValue: 10 },
    slogan: "Technology Made Simple",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is Setwise Digital?", acceptedAnswer: { "@type": "Answer", text: "Setwise Digital is an independent technology education platform founded in 2016. We help adults aged 45 and older learn everyday technology — printers, GPS, smart home, Alexa, cameras, and more — through plain-English guides, 47 free interactive tools, and live 1-on-1 video lessons with patient educators." } },
      { "@type": "Question", name: "Is Setwise Digital affiliated with any manufacturer?", acceptedAnswer: { "@type": "Answer", text: "No. Setwise Digital is completely independent. We are not affiliated with HP, Canon, Epson, Brother, Garmin, TomTom, Amazon, Google, Apple, Samsung, Ring, or any device brand. We are an education company." } },
      { "@type": "Question", name: "Where does Setwise Digital serve customers?", acceptedAnswer: { "@type": "Answer", text: "Setwise Digital serves adults 45+ across both the United States and Canada through online video learning sessions. We operate from hubs in Colorado and New Jersey." } },
      { "@type": "Question", name: "How much does Setwise Digital cost?", acceptedAnswer: { "@type": "Answer", text: "Our 47 interactive tools are completely free. Live lesson sessions start from $49 for a single session, $97 for the 3-session Skill-Builder Course, and $147 for the 5-session Family Plan. No subscriptions or hidden fees." } },
      { "@type": "Question", name: "What makes Setwise Digital different from tech support?", acceptedAnswer: { "@type": "Answer", text: "We are an education company, not tech support. We don't access your devices or perform repairs. Instead, we teach you step-by-step how to use your own technology confidently through structured, patient learning sessions." } },
      { "@type": "Question", name: "Who is Setwise Digital best for?", acceptedAnswer: { "@type": "Answer", text: "Setwise Digital is designed for adults aged 45 and older who want to understand everyday technology like printers, GPS navigation, Alexa, smart home devices, and security cameras — without jargon, pressure, or feeling rushed." } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "About Us", item: "https://www.setwisedigital.com/about" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <AboutClient />
    </>
  );
}
