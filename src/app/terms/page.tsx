import type { Metadata } from "next";
import TermsClient from "./TermsClient";

// DEPLOYMENT NOTE: Rename your existing terms/page.tsx → terms/TermsClient.tsx

export const metadata: Metadata = {
  title: "Terms & Conditions — Setwise Digital Educational Platform",
  description:
    "Terms and conditions for using Setwise Digital. Educational platform for tech literacy. Not manufacturer support. AI tools are educational only. Governed by Colorado, USA law.",
  keywords: [
    "Setwise Digital terms and conditions",
    "tech education platform terms",
    "Setwise Digital terms of use",
    "technology learning terms",
  ],
  alternates: { canonical: "https://setwisedigital.com/terms" },
  robots: { index: true, follow: true },
};

export default function TermsPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Terms & Conditions — Setwise Digital",
    url: "https://setwisedigital.com/terms",
    description: "Terms and conditions governing use of Setwise Digital educational technology platform.",
    publisher: {
      "@type": "Organization",
      name: "Setwise Digital",
      url: "https://setwisedigital.com",
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Terms & Conditions", item: "https://setwisedigital.com/terms" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <TermsClient />
    </>
  );
}
