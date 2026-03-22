import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Us — Get Tech Help | Setwise Digital",
  description:
    "Reach Setwise Digital for tech help. Send a message, schedule a call, or get instant support. We reply within 24 hours. Plain-English tech education.",
  keywords: [
    "contact Setwise Digital",
    "tech help contact",
    "book tech lesson",
    "printer help contact",
    "GPS help support",
    "smart home support",
    "technology education contact",
  ],
  openGraph: {
    title: "Contact Us — Get Tech Help | Setwise Digital",
    description:
      "Reach Setwise Digital for tech help. Send a message, schedule a call, or get instant support. We reply within 24 hours.",
    url: "https://setwisedigital.com/contact",
  },
};

export default function ContactPage() {
  const contactSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Setwise Digital",
    url: "https://setwisedigital.com/contact",
    description:
      "Contact Setwise Digital for tech help, learning sessions, or general enquiries. We reply within 24 hours.",
    mainEntity: {
      "@type": "Organization",
      name: "Setwise Digital",
      email: "support@setwisedigital.com",
      url: "https://setwisedigital.com",
      address: {
        "@type": "PostalAddress",
        streetAddress: "137 Mazzeo Drive",
        addressLocality: "Glassboro",
        addressRegion: "NJ",
        postalCode: "08028",
        addressCountry: "US",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "customer support",
        email: "support@setwisedigital.com",
        availableLanguage: "English",
        areaServed: ["US", "CA"],
      },
    },
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://setwisedigital.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact",
        item: "https://setwisedigital.com/contact",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
    </>
  );
}