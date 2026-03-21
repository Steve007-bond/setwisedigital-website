import type { Metadata } from "next";
import PricingClient from "./PricingClient";

export const metadata: Metadata = {
  title: "Pricing — Live Tech Lessons from $49 | Setwise Digital",
  description:
    "Transparent pricing for personalized tech education. Single Lesson from $49, Skill-Builder Course from $97, Family Plan from $147. No subscriptions. 47 free tools included. Serving adults 45+ across the US & Canada.",
  keywords: [
    "Setwise Digital pricing",
    "tech lesson cost",
    "technology tutoring price",
    "how much does tech lesson cost",
    "book technology lesson",
    "printer lesson cost",
    "GPS lesson booking",
    "technology learning session price adults",
    "tech help for seniors pricing",
    "technology education cost US Canada",
    "live tech tutor for adults over 45",
    "no subscription tech lessons",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/pricing" },
  openGraph: {
    title: "Pricing — Live Tech Lessons from $49 | Setwise Digital",
    description:
      "Transparent pricing. Single Lesson from $49. Skill-Builder Course from $97. Family Plan from $147. No subscriptions, no hidden fees. Adults 45+ across US & Canada.",
    url: "https://www.setwisedigital.com/pricing",
    type: "website",
    locale: "en_US",
    siteName: "Setwise Digital",
    images: [{ url: "https://www.setwisedigital.com/og-image.png", width: 1200, height: 630, alt: "Setwise Digital Pricing Plans" }],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Live Tech Lessons from $49 | Setwise Digital",
    description: "No subscriptions. Single Lesson $49. Skill-Builder $97. Family Plan $147. 47 free tools included.",
    images: ["https://www.setwisedigital.com/og-image.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true, "max-video-preview": -1, "max-image-preview": "large", "max-snippet": -1 } },
};

export default function PricingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Technology Learning Sessions by Setwise Digital",
    serviceType: "Technology Education",
    provider: {
      "@type": "Organization",
      name: "Setwise Digital",
      url: "https://www.setwisedigital.com",
      foundingDate: "2016",
    },
    description: "Live video technology learning sessions for adults 45+. Covers printers, GPS, smart home, cameras. Plain English, step by step.",
    offers: [
      { "@type": "Offer", name: "Single Lesson Session", price: "49", priceCurrency: "USD", description: "1-hour live video lesson covering one device or topic of your choice." },
      { "@type": "Offer", name: "Skill-Builder Course", price: "97", priceCurrency: "USD", description: "3 live video lesson sessions with personalised learning roadmap across multiple topics." },
      { "@type": "Offer", name: "Family Learning Plan", price: "147", priceCurrency: "USD", description: "Up to 5 lesson sessions covering multiple devices for the whole household." },
    ],
    areaServed: [
      { "@type": "Country", name: "United States" },
      { "@type": "Country", name: "Canada" },
    ],
    audience: { "@type": "Audience", audienceType: "Adults 45+" },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      { "@type": "Question", name: "How much does a Setwise Digital lesson session cost?", acceptedAnswer: { "@type": "Answer", text: "Live lesson sessions start from $49 for a single 1-hour session. The Skill-Builder Course (3 sessions) is $97. The Family Plan (5 sessions) is $147. All 47 interactive tools are free." } },
      { "@type": "Question", name: "Does Setwise Digital have a monthly subscription?", acceptedAnswer: { "@type": "Answer", text: "No. No subscriptions, recurring charges, or hidden fees. You pay only for the sessions you book. The 47 free tools are always free." } },
      { "@type": "Question", name: "What is included in each lesson session?", acceptedAnswer: { "@type": "Answer", text: "Each session includes a 1-hour live video call with an educator, plain-English explanations, coverage of one topic, and a lesson summary PDF." } },
      { "@type": "Question", name: "Can I get a refund if I'm not satisfied?", acceptedAnswer: { "@type": "Answer", text: "Yes. If your first session doesn't meet expectations, contact us within 24 hours for a full refund. No questions asked." } },
      { "@type": "Question", name: "Do you serve customers in Canada?", acceptedAnswer: { "@type": "Answer", text: "Yes. Setwise Digital serves adults 45+ across both the United States and Canada through online video sessions." } },
      { "@type": "Question", name: "Are the 47 free tools really free?", acceptedAnswer: { "@type": "Answer", text: "Yes. All 47 interactive tools are completely free with no account, no email, and no payment required." } },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Pricing", item: "https://www.setwisedigital.com/pricing" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PricingClient />
    </>
  );
}
