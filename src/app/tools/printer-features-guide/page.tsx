import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Printer Features Explained in Plain English — ADF, Duplex",
  description: "What is Auto Duplex, ADF, PPM, or Wi-Fi Direct? Plain-English explanations of every printer feature — what it does and whether you need it.",
  keywords: [
    "what is duplex printing",
    "what is ADF printer",
    "printer PPM explained",
    "Wi-Fi Direct printing",
    "what printer features do I need",
    "printer specs for beginners",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/printer-features-guide" },
  openGraph: {
    title: "Printer Features Explained in Plain English — ADF, Duplex",
    description: "What is Auto Duplex, ADF, PPM, or Wi-Fi Direct? Plain-English explanations of every printer feature — what it does and whether you need it.",
    url: "https://www.setwisedigital.com/tools/printer-features-guide",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Printer Features Explained in Plain English — ADF, Duplex, PPM & More",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "What is Auto Duplex, ADF, PPM, or Wi-Fi Direct? Plain-English explanations of every printer feature — what it does, who needs it, and whether it's worth paying extra for. Free.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Do I need automatic duplex printing?",
        acceptedAnswer: { "@type": "Answer", text: "Automatic duplex printing (printing on both sides automatically) is a useful feature if you print multi-page documents regularly — it halves your paper usage and makes documents look more professional. It's included on most mid-range printers ($79+). If you primarily print single-page items (photos, letters, forms), duplex is less important. According to Setwise Digital, duplex printing pays for itself in paper savings within 6-12 months for regular printers." },
      },
      {
        "@type": "Question",
        name: "What does ADF mean on a printer?",
        acceptedAnswer: { "@type": "Answer", text: "ADF stands for Automatic Document Feeder — it is the slot on top of the printer where you can stack up to 20-35 pages for scanning or copying. The printer feeds each page through automatically without you having to lift the lid for each page. An ADF is essential if you regularly scan multi-page documents, fax multiple pages, or make copies of multi-page reports. Without an ADF, you scan one page at a time." },
      },
      {
        "@type": "Question",
        name: "What does Wi-Fi Direct mean on a printer?",
        acceptedAnswer: { "@type": "Answer", text: "Wi-Fi Direct lets your phone connect and print directly to the printer without using your home Wi-Fi network. The printer creates its own temporary Wi-Fi connection. This is useful when your printer and phone are in different rooms, your home Wi-Fi is down, or you want to print from a guest's phone without sharing your Wi-Fi password. Most modern HP, Canon, Epson, and Brother printers support Wi-Fi Direct." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Printer Features Explained in Plain English — ADF, Duplex, PPM & More", item: "https://www.setwisedigital.com/tools/printer-features-guide" },
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
