import type { Metadata } from "next";
import PrivacyClient from "./PrivacyClient";

// DEPLOYMENT NOTE: Rename your existing privacy/page.tsx → privacy/PrivacyClient.tsx

export const metadata: Metadata = {
  title: "Privacy Policy — Setwise Digital | How We Protect Your Data",
  description:
    "Setwise Digital's privacy policy. How we collect, use, and protect your information. We never sell personal data. Google Analytics and Ads disclosure. GDPR and CCPA aligned. Last updated March 2026.",
  keywords: [
    "Setwise Digital privacy policy",
    "how Setwise Digital uses data",
    "tech education privacy policy",
    "Setwise Digital GDPR",
    "data protection tech education",
  ],
  alternates: { canonical: "https://setwisedigital.com/privacy" },
  robots: { index: true, follow: true },
};

export default function PrivacyPage() {
  const pageSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Privacy Policy — Setwise Digital",
    url: "https://setwisedigital.com/privacy",
    description:
      "How Setwise Digital collects, uses, and protects personal information. We never sell data. Includes Google Analytics and Google Ads disclosure.",
    publisher: {
      "@type": "Organization",
      name: "Setwise Digital",
      url: "https://setwisedigital.com",
    },
    dateModified: "2026-03-01",
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Privacy Policy", item: "https://setwisedigital.com/privacy" },
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
