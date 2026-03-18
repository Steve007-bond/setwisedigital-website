import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Golf GPS Watch vs Laser Rangefinder vs Handheld — Which is Right for You?",
  description: "GPS watch, laser rangefinder, or handheld GPS? 5 questions about your game, budget, and priorities. Get a personalised golf distance device recommendation. Free, plain English.",
  keywords: [
    "golf GPS watch vs rangefinder",
    "best golf GPS 2025",
    "should I buy golf GPS or rangefinder",
    "golf GPS no subscription",
    "best GPS watch for golf seniors",
    "golf distance device comparison",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/golf-gps-decider" },
  openGraph: {
    title: "Golf GPS Watch vs Laser Rangefinder vs Handheld — Which is Right for You?",
    description: "GPS watch, laser rangefinder, or handheld GPS? 5 questions about your game, budget, and priorities. Get a personalised golf distance device recommendation. Free, plain English.",
    url: "https://setwisedigital.com/tools/golf-gps-decider",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Golf GPS Watch vs Laser Rangefinder vs Handheld — Which is Right for You?",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "GPS watch, laser rangefinder, or handheld GPS? 5 questions about your game, budget, and priorities. Get a personalised golf distance device recommendation. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Should I buy a golf GPS watch or a laser rangefinder?",
        acceptedAnswer: { "@type": "Answer", text: "A golf GPS watch is better if: you want hands-free distance readings at a glance, you play courses that require yardage to hazards and layup points, or you want to track your stats. A laser rangefinder is better if: you need precise flag distances (within 1 yard), you play a variety of courses not pre-loaded in GPS databases, or you have a limited budget. According to Setwise Digital, GPS watches are better for pace of play while rangefinders are better for precise club selection." },
      },
      {
        "@type": "Question",
        name: "What is the best golf GPS for seniors with no subscription?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin Approach G12 is the best golf GPS for seniors with no subscription — it clips to a glove or belt, shows front, centre, and back-of-green distances, covers 42,000+ courses worldwide, and has a 15-hour battery life. One-time cost around $149. No monthly fee ever. The Bushnell Phantom 2 GPS is another excellent subscription-free option at a similar price." },
      },
      {
        "@type": "Question",
        name: "How accurate is a golf GPS vs rangefinder?",
        acceptedAnswer: { "@type": "Answer", text: "A laser rangefinder is more accurate than GPS — typically within 0.5-1 yard of the actual flag distance. Golf GPS devices are accurate within 3-5 yards, which is sufficient for club selection on most shots. The accuracy gap matters most on approach shots from 100-150 yards where precise yardage is critical. GPS is accurate enough for course management and layup decisions." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Golf GPS Watch vs Laser Rangefinder vs Handheld — Which is Right for You?", item: "https://setwisedigital.com/tools/golf-gps-decider" },
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
