import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Map Update Not Working? Step-by-Step Fix Guide",
  description: "Garmin Express not detecting GPS, download failing, or Wi-Fi won't connect? Pick your problem and follow step-by-step fixes. Free.",
  keywords: [
    "GPS not updating fix",
    "Garmin Express not working",
    "GPS map update failed",
    "Garmin Express won't detect GPS",
    "why GPS update not working",
    "GPS update stuck fix",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/tools/gps-update-fix" },
  openGraph: {
    title: "GPS Map Update Not Working? Step-by-Step Fix Guide",
    description: "Garmin Express not detecting GPS, download failing, or Wi-Fi won't connect? Pick your problem and follow step-by-step fixes. Free.",
    url: "https://www.setwisedigital.com/tools/gps-update-fix",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "GPS Map Update Not Working? Step-by-Step Fix for Common Problems",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    description: "Garmin Express not detecting your GPS, map download failing, Wi-Fi won't connect? Pick your problem and follow step-by-step fixes. Free, plain English. Covers all Garmin models.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,
      {
        "@type": "Question",
        name: "Why won't Garmin Express find my GPS?",
        acceptedAnswer: { "@type": "Answer", text: "If Garmin Express won't find your GPS: 1) Try a different USB cable — cable failure is the most common cause. 2) Try a different USB port on your computer. 3) Make sure your GPS is turned ON before connecting. 4) Look for a 'Connected to Computer' message on your GPS screen. 5) Restart your computer and Garmin Express. 6) Uninstall and reinstall Garmin Express from garmin.com/express. 7) Temporarily disable antivirus — it sometimes blocks device detection." },
      },
      {
        "@type": "Question",
        name: "Why is my Garmin map update failing?",
        acceptedAnswer: { "@type": "Answer", text: "Garmin map update failures are usually caused by: insufficient storage space on the GPS device (delete unused maps in Garmin Express → My Device → Manage Maps), interrupted internet connection during download (check your connection and retry), or a corrupted download (delete the partial download and start fresh). Large map downloads (North America is 10-15GB) require a stable connection for 1-3 hours." },
      },
      {
        "@type": "Question",
        name: "How do I update Garmin GPS without a computer?",
        acceptedAnswer: { "@type": "Answer", text: "Many Garmin GPS models support Wi-Fi updates without a computer. On your Garmin screen: go to Settings → Map & Vehicle → Manage Maps. If a Wi-Fi update option appears, connect to your home Wi-Fi network and tap Update. The GPS downloads and installs the map update directly. This only works if your specific model supports Wi-Fi — check your model's specifications on garmin.com." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://www.setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "GPS Map Update Not Working? Step-by-Step Fix for Common Problems", item: "https://www.setwisedigital.com/tools/gps-update-fix" },
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
