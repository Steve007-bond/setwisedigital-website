import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Car Navigation Map Update Guide — Honda, Toyota, BMW, Mercedes & More",
  description: "Step-by-step car navigation update guide for Honda, Toyota, BMW, Mercedes-Benz, Lexus, Audi, Ford, and Nissan. Select your car brand and get exact instructions. Free, plain English.",
  keywords: [
    "Honda navigation update",
    "Toyota GPS update",
    "BMW iDrive map update",
    "Mercedes COMAND update",
    "Lexus navigation update",
    "Audi MMI update",
    "how to update car GPS maps",
    "Ford SYNC navigation update",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/car-gps-update" },
  openGraph: {
    title: "Car Navigation Map Update Guide — Honda, Toyota, BMW, Mercedes & More",
    description: "Step-by-step car navigation update guide for Honda, Toyota, BMW, Mercedes-Benz, Lexus, Audi, Ford, and Nissan. Select your car brand and get exact instructions. Free, plain English.",
    url: "https://setwisedigital.com/tools/car-gps-update",
  },
};

export default function Page() {
  const toolSchema = {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "Car Navigation Map Update Guide — Honda, Toyota, BMW, Mercedes & More",
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Web",
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://setwisedigital.com" },
    description: "Step-by-step car navigation update guide for Honda, Toyota, BMW, Mercedes-Benz, Lexus, Audi, Ford, and Nissan. Select your car brand and get exact instructions. Free, plain English.",
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [

,

,

,
      {
        "@type": "Question",
        name: "How do I update Honda navigation maps?",
        acceptedAnswer: { "@type": "Answer", text: "To update Honda navigation maps: visit navigation.hondalink.com. Select your vehicle year and model. Download the Honda Garmin Map Update Tool. Insert a USB drive into your car's navigation USB port to download your current map data. Then use the tool to download the latest maps to the USB drive. Return the USB to your car and follow the on-screen update instructions. The process takes 1-3 hours." },
      },
      {
        "@type": "Question",
        name: "How do I update BMW iDrive maps?",
        acceptedAnswer: { "@type": "Answer", text: "To update BMW iDrive maps: newer BMW models (2019+) support over-the-air map updates via the BMW ConnectedDrive service — go to iDrive menu → Settings → Map Update. For older models, visit bmwusa.com/map-updates, enter your VIN number, and download the update to a USB drive. Insert the USB in your BMW and follow the iDrive prompts. BMW map updates cost approximately $99-$149." },
      },
      {
        "@type": "Question",
        name: "How do I update Toyota navigation maps?",
        acceptedAnswer: { "@type": "Answer", text: "Many Toyota vehicles with Toyota Connected Services support free automatic map updates via Wi-Fi — connect your Toyota to home Wi-Fi through the Head Unit settings and updates download automatically. For older Toyota models, visit toyota.com/nav-updates for the USB update process. Toyota map updates are free for eligible connected vehicles for the first few years of ownership." },
      },
      {
        "@type": "Question",
        name: "How do I update Garmin built-in car GPS?",
        acceptedAnswer: { "@type": "Answer", text: "Many cars with built-in Garmin navigation (Mazda, Subaru, VW) update via the Garmin Express software. Connect your car's SD card or USB to your computer, open Garmin Express (free download from garmin.com/express), and it will detect available map updates. Alternatively, some models update via the car's Wi-Fi connection directly." },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "Free Tools", item: "https://setwisedigital.com/tools" },
      { "@type": "ListItem", position: 3, name: "Car Navigation Map Update Guide — Honda, Toyota, BMW, Mercedes & More", item: "https://setwisedigital.com/tools/car-gps-update" },
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
