import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

// DEPLOYMENT NOTE: Rename your existing privacy/page.tsx → privacy/PrivacyClient.tsx

export const metadata: Metadata = {
  title: "Privacy Policy — Setwise Digital | Data Protection",
  description:
    "How Setwise Digital collects, uses, and protects your information. We never sell personal data. GDPR and CCPA aligned. Updated March 2026.",
  openGraph: {
    title: "Privacy Policy — Setwise Digital | Data Protection",
    description: "How Setwise Digital collects, uses, and protects your information. We never sell personal data. GDPR and CCPA aligned. Updated March 2026.",
    url: "https://www.setwisedigital.com/privacy",
  },
  keywords: [
    "Setwise Digital privacy policy",
    "how Setwise Digital uses data",
    "tech education privacy policy",
    "Setwise Digital GDPR",
    "data protection tech education",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy — Setwise Digital",
    url: "https://www.setwisedigital.com/privacy",
    description:
      "How Setwise Digital collects, uses, and protects personal information. We never sell data. Includes Google Analytics and Google Ads disclosure.",
    publisher: {
      "@type": "Organization",
      name: "Setwise Digital",
      url: "https://www.setwisedigital.com",
    },
    dateModified: "2026-03-01",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://www.setwisedigital.com/privacy" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(pageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <PrivacyClient />
    </>
  );
}
