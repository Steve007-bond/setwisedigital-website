import type { Metadata } from "next";
import ContactClient from "./ContactClient";

// DEPLOYMENT NOTE: Rename your existing contact/page.tsx → contact/ContactClient.tsx
// Then drop this file in as the new contact/page.tsx

export const metadata: Metadata = {
  title: "Contact Setwise Digital — Tech Learning Guidance | Reply Within 24 Hours",
  description:
    "Contact Setwise Digital for technology learning guidance. Book a live lesson session, ask a question about a free tool, or enquire about pricing. Serving adults 40+ nationwide. Reply within 24 hours.",
  keywords: [
    "contact Setwise Digital",
    "book tech learning session",
    "technology help for seniors",
    "tech tutor contact",
    "Setwise Digital support email",
    "technology education contact",
    "book printer lesson",
    "tech learning for adults over 40",
  ],
  alternates: { canonical: "https://setwisedigital.com/contact" },
  openGraph: {
    title: "Contact Setwise Digital — Tech Learning Guidance",
    description: "Book a live technology lesson session, ask a question, or explore our 27 free tools. Reply within 24 hours.",
    url: "https://setwisedigital.com/contact",
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Setwise Digital",
    url: "https://setwisedigital.com/contact",
    description: "Contact Setwise Digital for technology learning guidance and live lesson session bookings.",
    mainEntity: {
      "@type": "Organization",
      name: "Setwise Digital",
      email: "support@setwisedigital.com",
      url: "https://setwisedigital.com",
      areaServed: { "@type": "Country", name: "United States" },
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@setwisedigital.com",
        contactType: "customer service",
        availableLanguage: "English",
      },
    },
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I contact Setwise Digital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Contact Setwise Digital via the contact form at setwisedigital.com/contact or by emailing support@setwisedigital.com. We respond to all enquiries within 24 hours.",
        },
      },
      {
        "@type": "Question",
        name: "Does Setwise Digital provide remote technical support?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. Setwise Digital provides educational learning guidance, not remote technical support or device repairs. Our live lesson sessions are structured educational video sessions — our educators do not access your device remotely.",
        },
      },
      {
        "@type": "Question",
        name: "Is it free to contact Setwise Digital?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Contacting Setwise Digital and using our 27 free interactive tools is completely free. Live lesson sessions are available at paid pricing starting from $49.",
        },
      },
      {
        "@type": "Question",
        name: "How quickly does Setwise Digital respond?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Setwise Digital responds to all contact form submissions and emails within 24 hours on business days.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Contact", item: "https://setwisedigital.com/contact" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <ContactClient />
    </>
  );
}
