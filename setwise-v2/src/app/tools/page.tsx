import type { Metadata } from "next";
import ToolsHubClient from "./ToolsHubClient";

export const metadata: Metadata = {
  title: "Free Tech Tools & Guides for Seniors | Setwise Digital",
  description:
    "Free interactive tools to help you understand your technology. Find the best GPS, printer, smart home, and security devices for your needs. Plain-English guides — no jargon.",
  keywords: [
    "free tech tools for seniors",
    "best GPS for seniors",
    "printer cost calculator",
    "smart home guide for beginners",
    "home security advisor",
    "technology tools for adults over 50",
    "plain english tech guides",
    "GPS road trip planner",
    "printer ink cost calculator",
    "Alexa setup guide",
  ],
  openGraph: {
    title: "Free Tech Learning Tools for Seniors | Setwise Digital",
    description:
      "Interactive tools to find the best technology for your lifestyle. GPS finders, printer guides, smart home advisors — all in plain English.",
    url: "https://setwisedigital.com/tools",
  },
};

export default function ToolsPage() {
  const toolsSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Free Technology Learning Tools",
    description:
      "Interactive tools to help seniors and adults 45+ understand and choose the right technology for their needs.",
    url: "https://setwisedigital.com/tools",
    numberOfItems: 10,
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Road Trip Pre-Check Assistant",
        url: "https://setwisedigital.com/tools/road-trip-checker",
        description:
          "Make sure your GPS is ready before your next road trip. Free 5-step checklist.",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Best GPS Finder for You",
        url: "https://setwisedigital.com/tools/best-gps-finder",
        description:
          "Answer 5 simple questions and find the perfect GPS device for your lifestyle and budget.",
      },
    ],
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(toolsSchema) }}
      />
      <ToolsHubClient />
    </>
  );
}
