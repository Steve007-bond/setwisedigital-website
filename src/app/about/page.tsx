import type { Metadata } from "next";
import AboutClient from "./AboutClient";

export const metadata: Metadata = {
  title: "About Setwise Digital — Independent Tech Education Platform Since 2016",
  description: "Setwise Digital is an independent technology literacy platform founded in 2016. We teach printer setup, GPS, smart home, and camera use in plain English for adults 40+. Not affiliated with any manufacturer.",
  keywords: [
    "about Setwise Digital",
    "technology literacy platform",
    "plain English tech guides",
    "tech learning for seniors",
    "Setwise Digital Colorado",
    "technology education adults over 40",
  ],
  alternates: { canonical: "https://setwisedigital.com/about" },
  openGraph: {
    title: "About Setwise Digital — Independent Tech Education Platform Since 2016",
    description: "Setwise Digital is an independent technology literacy platform founded in 2016. We teach printer setup, GPS, smart home, and camera use in plain English for adults 40+. Not affiliated with any manufacturer.",
    url: "https://setwisedigital.com/about",
  },
};

export default function Page() {

  const orgSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Setwise Digital",
    url: "https://setwisedigital.com",
    foundingDate: "2016",
    description: "Independent technology literacy platform for adults 40+. Covers printers, GPS, smart home, and more in plain English.",
    areaServed: { "@type": "Country", name: "United States" },
    knowsAbout: ["Printer setup", "GPS navigation", "Smart home devices", "Technology literacy"],
  };
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "What is Setwise Digital?", acceptedAnswer: { "@type": "Answer", text: "Setwise Digital is an independent technology literacy platform founded in 2016. We provide plain-English guides and 47 free tools for adults 40+ covering printers, GPS, smart home, and more. Not affiliated with HP, Canon, Garmin, Amazon, Google, or Apple." } },
      { "@type": "Question", name: "Is Setwise Digital affiliated with any manufacturer?", acceptedAnswer: { "@type": "Answer", text: "No. Setwise Digital is completely independent — not affiliated with HP, Canon, Epson, Brother, Garmin, TomTom, Amazon, Google, Apple, Samsung, or any device brand. We are an education company." } },
      { "@type": "Question", name: "Where is Setwise Digital located?", acceptedAnswer: { "@type": "Answer", text: "Setwise Digital operates from physical hubs in Colorado and New Jersey and serves customers nationwide across the United States." } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "About", item: "https://setwisedigital.com/about" },
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
