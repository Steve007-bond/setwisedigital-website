import type { Metadata } from "next";
import ContactClient from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact Setwise Digital — Free Tech Help for Adults 45+ in US & Canada",
  description:
    "Get in touch with Setwise Digital for personalized technology learning sessions. We help adults 45+ across the United States and Canada master printers, GPS, smart home devices, and more. Free consultation — reply within 24 hours.",
  keywords: [
    "contact Setwise Digital",
    "tech help for seniors",
    "technology help adults over 45",
    "book tech lesson United States",
    "book tech lesson Canada",
    "printer help for seniors",
    "GPS help for older adults",
    "smart home setup help",
    "technology tutor for seniors",
    "Setwise Digital support",
    "patient tech education",
    "tech learning for adults over 40",
    "technology lessons near me",
    "digital literacy for seniors US Canada",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/contact" },
  openGraph: {
    title: "Contact Setwise Digital — Free Tech Help for Adults 45+",
    description:
      "Personalized, patient technology education for adults 45+ across the US & Canada. Printers, GPS, smart home, and more. Free consultation — we reply within 24 hours.",
    url: "https://www.setwisedigital.com/contact",
    type: "website",
    locale: "en_US",
    siteName: "Setwise Digital",
    images: [
      {
        url: "https://www.setwisedigital.com/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Setwise Digital — Technology Made Easy for Adults 45+",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Setwise Digital — Free Tech Help for Adults 45+",
    description:
      "Patient, personalized technology education for adults 45+ across the US & Canada. Reply within 24 hours.",
    images: ["https://www.setwisedigital.com/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function ContactPage() {
  const contactPageSchema = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    name: "Contact Setwise Digital",
    url: "https://www.setwisedigital.com/contact",
    description:
      "Contact Setwise Digital for personalized technology learning guidance and live lesson session bookings. Serving adults 45+ across the United States and Canada.",
    mainEntity: {
      "@type": "Organization",
      name: "Setwise Digital",
      email: "support@setwisedigital.com",
      url: "https://www.setwisedigital.com",
      foundingDate: "2016",
      areaServed: [
        { "@type": "Country", name: "United States" },
        { "@type": "Country", name: "Canada" },
      ],
      contactPoint: {
        "@type": "ContactPoint",
        email: "support@setwisedigital.com",
        contactType: "customer service",
        availableLanguage: ["English"],
        areaServed: [
          { "@type": "Country", name: "United States" },
          { "@type": "Country", name: "Canada" },
        ],
      },
      address: {
        "@type": "PostalAddress",
        streetAddress: "137 Mazzeo Drive",
        addressLocality: "Glassboro",
        addressRegion: "NJ",
        postalCode: "08028",
        addressCountry: "US",
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
        name: "Does Setwise Digital serve customers in both the United States and Canada?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Setwise Digital provides technology education services to adults aged 45 and older across both the United States and Canada through online sessions.",
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
          text: "Yes. Contacting Setwise Digital and using our 47 free interactive tools is completely free. Live lesson sessions are available at paid pricing starting from $49.",
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
      {
        "@type": "Question",
        name: "What technology topics does Setwise Digital teach?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Setwise Digital offers educational guidance on printers, GPS navigation, smart home devices like Alexa, security cameras, and general technology literacy for adults over 45.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://www.setwisedigital.com",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Contact Us",
        item: "https://www.setwisedigital.com/contact",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(contactPageSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <ContactClient />
    </>
  );
}
