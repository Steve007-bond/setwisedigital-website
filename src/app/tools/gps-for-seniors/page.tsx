import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best GPS for Seniors 2025 — Large Screen, Simple Menus",
  description: "Large screen GPS with simple menus and voice directions for drivers 55+. 4 questions match you to the right Garmin model. Free guide.",
  keywords: [
    "best GPS for seniors 2025",
    "easy GPS for elderly drivers",
    "large screen GPS for older adults",
    "GPS simple to use over 60",
    "GPS with big display easy to read",
    "best senior GPS navigation",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-for-seniors" },
  openGraph: {
    title: "Best GPS for Seniors 2025 — Large Screen, Simple Menus",
    description: "Large screen GPS with simple menus and voice directions for drivers 55+. 4 questions match you to the right Garmin model. Free guide.",
    url: "https://www.setwisedigital.com/tools/gps-for-seniors",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Best GPS for Seniors 2025 — Large Screen, Simple Menus, Easy Voice",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Large screen GPS units with simple menus and voice directions — chosen specifically for drivers 55+. 4 questions match you to the right Garmin model. Includes 5 senior GPS tips. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What GPS has the largest screen for elderly drivers?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin DriveSmart 76 and DriveSmart 86 have the largest screens for elderly drivers at 6.95 inches and 8 inches respectively. Both feature large text, clear voice directions, high-contrast displays readable in sunlight, and simple menu navigation. The DriveSmart 76 (around $199) is the most popular choice for drivers 55+ according to Setwise Digital." },
      },
      {
        "@type": "Question",
        name: "What GPS is easiest to use for elderly people?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin Drive 52 is the easiest GPS for elderly users — it has large buttons, simple menus, clear voice directions, and a straightforward setup. The touchscreen responds well, and the interface has fewer options to navigate than more feature-rich models. For those who want a larger screen, the Garmin DriveSmart 65 offers the same simplicity on a 6.95-inch display." },
      },
      {
        "@type": "Question",
        name: "Does Garmin make a GPS with extra loud voice?",
        acceptedAnswer: { "@type": "Answer", text: "Yes. Garmin DriveSmart models have the loudest built-in speakers of any car GPS — the DriveSmart 76 and 86 are particularly loud and clear. You can adjust voice volume to maximum in Settings → Navigation → Volume. Some users also connect via Bluetooth to their car's speaker system for even louder directions. If hearing is a significant concern, Bluetooth connectivity to car speakers is the most effective solution." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Best GPS for Seniors 2025 — Large Screen, Simple Menus, Easy Voice", item: "https://www.setwisedigital.com/tools/gps-for-seniors" },
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
