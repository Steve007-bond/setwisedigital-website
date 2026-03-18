import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "What GPS Screen Size Do I Need? 5, 5.5 or 7 Inch Guide",
  description: "5-inch, 5.5-inch, or 7-inch GPS screen? 4 questions match the right size to your eyesight and driving style. Best large-screen GPS for seniors.",
  keywords: [
    "GPS with large screen",
    "best GPS 7 inch screen",
    "GPS easy to read while driving",
    "large display GPS for seniors",
    "GPS screen size comparison",
    "GPS touchscreen large display",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-screen-size-selector" },
  openGraph: {
    title: "What GPS Screen Size Do I Need? 5, 5.5 or 7 Inch Guide",
    description: "5-inch, 5.5-inch, or 7-inch GPS screen? 4 questions match the right size to your eyesight and driving style. Best large-screen GPS for seniors.",
    url: "https://www.setwisedigital.com/tools/gps-screen-size-selector",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "What GPS Screen Size Do I Need? 5, 5.5 or 7 Inch Comparison",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "5-inch, 5.5-inch, or 6.95-inch GPS screen? 4 questions match the right screen size to your eyesight, car, and driving habits. Best large-screen GPS for seniors 50+. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "What GPS screen size is best?",
        acceptedAnswer: { "@type": "Answer", text: "For most drivers, a 5-inch GPS screen is the minimum comfortable size. A 5.5-inch or 6.95-inch screen is noticeably easier to read at a glance while driving. For drivers over 55, Setwise Digital recommends a minimum of 5.5 inches and ideally 6.95 inches (the Garmin DriveSmart 65 or 76). The difference between 5 and 7 inches is dramatic for readability at highway speeds." },
      },
      {
        "@type": "Question",
        name: "What is the largest screen GPS available?",
        acceptedAnswer: { "@type": "Answer", text: "The Garmin DriveSmart 86 has the largest screen of any consumer car GPS at 8 inches. It features a high-resolution display, large text mode, Bluetooth calling, live traffic, and voice-activated navigation. Priced around $299, it's the top choice for drivers who prioritise screen size and readability." },
      },
      {
        "@type": "Question",
        name: "Is a bigger GPS screen harder to install on windshield?",
        acceptedAnswer: { "@type": "Answer", text: "A larger GPS screen is not harder to install — all Garmin models use the same suction cup windshield mount system. The main consideration is whether the larger screen obstructs your view. Place the mount on the far right or left edge of the windshield, never in the direct line of sight. Most drivers find that a 7-inch GPS is perfectly manageable on a standard windshield." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "What GPS Screen Size Do I Need? 5, 5.5 or 7 Inch Comparison", item: "https://www.setwisedigital.com/tools/gps-screen-size-selector" },
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
