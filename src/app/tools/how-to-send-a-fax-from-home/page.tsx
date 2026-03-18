import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "How to Send a Fax from Home — No Phone Line Needed",
  description:
    "Fax a medical form or legal document from home. Choose printer, computer, phone, or email method. Get exact steps. Free, plain English.",
  keywords: [
    "how to send a fax from home",
    "how to fax without a fax machine",
    "how to fax without phone line",
    "send fax online free",
    "fax from computer free",
    "fax from iPhone",
    "how to fax medical forms from home",
    "FaxZero free fax",
    "Fax Plus online fax",
    "how to fax in 2025",
    "send fax from Android phone",
    "free online fax service",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/how-to-send-a-fax-from-home" },
  openGraph: {
    title: "How to Send a Fax from Home — No Phone Line Needed",
    description: "Fax a medical form or legal document from home. Choose printer, computer, phone, or email method. Get exact steps. Free, plain English.",
    url: "https://www.setwisedigital.com/tools/how-to-send-a-fax-from-home",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "How to Send a Fax from Home Guide by Setwise Digital",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Free interactive fax guide covering 4 methods: traditional printer with phone line, online fax from computer, mobile fax app, and email-to-fax. Covers paper and digital document workflows for both.",
    featureList: [
      "Online fax from computer (no phone line)",
      "Mobile fax from iPhone or Android",
      "Email-to-fax guide",
      "Traditional printer fax steps",
      "Paper and digital document workflows",
      "Free fax service recommendations",
    ],
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I send a fax without a fax machine?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "You can fax without a fax machine using a free online service. Go to faxzero.com in your browser — no account required. Enter the recipient's fax number, upload your PDF or photo of the document, enter your email address, and click Send Fax. You'll receive a delivery confirmation email within 1–5 minutes. FaxZero allows 5 free faxes per day.",
        },
      },
      {
        "@type": "Question",
        name: "How do I send a fax from my iPhone for free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "To fax from iPhone: 1) Download the Fax.Plus app from the App Store (free). 2) Take a photo of your document or select a PDF from Files. 3) Open Fax.Plus → tap Send Fax. 4) Enter the recipient's fax number. 5) Attach your document and tap Send. You'll get an in-app and email delivery notification. The free plan includes several outbound faxes.",
        },
      },
      {
        "@type": "Question",
        name: "Can I send a fax from my email?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. With Fax.Plus, you can send a fax via email. Create a free Fax.Plus account. Compose a new email — in the To field, type the fax number followed by @fax.plus (example: +15551234567@fax.plus). Attach your PDF and send the email. Fax.Plus converts it to a real fax and sends it to the recipient. The subject line becomes the cover page header.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need a phone line to send a fax in 2025?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "No. You do not need a phone line to send a fax in 2025. Online fax services like FaxZero and Fax.Plus use internet connections to send faxes — no phone line, no fax machine, and no special equipment needed. The fax arrives at the recipient identically to a traditional fax. A phone line is only needed if you are using a traditional fax machine or a fax-capable all-in-one printer.",
        },
      },
      {
        "@type": "Question",
        name: "Is FaxZero really free?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, FaxZero is genuinely free for basic use — up to 5 faxes per day, up to 5 pages per fax, with no account required. Free faxes include a small FaxZero cover page, which is normal and accepted by medical offices and legal firms. For faxes without the cover page, FaxZero offers a paid option. For regular faxing, Fax.Plus offers a free trial plan.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "How to Send a Fax from Home", item: "https://www.setwisedigital.com/tools/how-to-send-a-fax-from-home" },
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
