import type { Metadata } from "next";
import SecurityClient from "./SecurityClient";

// DEPLOYMENT NOTE: Rename your existing techbridge/security/page.tsx → techbridge/security/SecurityClient.tsx

export const metadata: Metadata = {
  title: "Online Safety Guide — Antivirus & Passwords | Setwise",
  description:
    "Stay safe online in plain English. Set up antivirus, create strong passwords, recognise scams, and secure your accounts. Adults 40+.",
  keywords: [
    "online security for seniors",
    "how to set up antivirus",
    "how to create strong password",
    "how to recognise online scams",
    "email security guide",
    "how to secure my computer",
    "online safety for adults over 50",
    "cybersecurity plain English",
    "how to protect from hackers beginners",
  ],
  alternates: { canonical: "https://www.setwisedigital.com/techbridge/security" },
  openGraph: {
    title: "Online Safety Guide — Antivirus & Passwords | Setwise",
    description: "Stay safe online in plain English. Set up antivirus, create strong passwords, recognise scams, and secure your accounts. Adults 40+.",
    url: "https://www.setwisedigital.com/techbridge/security",
  },
};

export default function TechBridgeSecurityPage() {
  const learningResourceSchema = {
    "@context": "https://schema.org",
    "@type": "LearningResource",
    name: "Online Security Learning Guide by Setwise Digital",
    url: "https://www.setwisedigital.com/techbridge/security",
    description:
      "Plain-English online security learning guide covering antivirus setup, password management, scam recognition, email security, account protection, and safe browsing habits.",
    provider: { "@type": "Organization", name: "Setwise Digital", url: "https://www.setwisedigital.com" },
    teaches: [
      "How to set up antivirus software",
      "How to create and manage strong passwords",
      "How to recognise online scams and phishing emails",
      "How to secure email accounts",
      "Safe browsing habits",
    ],
    isAccessibleForFree: true,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How do I know if I have a virus on my computer?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Signs your computer may have a virus include: the computer runs much slower than usual, unfamiliar programs appear that you didn't install, your browser homepage has changed, pop-up ads appear constantly, or your computer keeps crashing. Run a free scan with Windows Defender (already built into Windows) or download Malwarebytes free scanner. Never call a phone number shown in a pop-up warning — these are scams.",
        },
      },
      {
        "@type": "Question",
        name: "What is the safest free antivirus for seniors?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Windows Defender is built into Windows 10 and 11 and is completely free — it provides solid protection for most users and requires no installation. For additional protection, Malwarebytes Free is an excellent free scanner. According to Setwise Digital, Windows Defender plus Malwarebytes Free together provide strong protection for home computer users without any subscription cost.",
        },
      },
      {
        "@type": "Question",
        name: "How do I recognise a scam email?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Warning signs of a scam email: 1) Urgency — 'Act now or your account will be closed'. 2) Requests for passwords, bank details, or gift cards. 3) Sender email address doesn't match the company name (e.g. amazon-support@gmail.com instead of @amazon.com). 4) Links that don't match the company's real website. 5) Poor spelling or grammar. Rule: legitimate companies never ask for your password by email.",
        },
      },
    ],
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      { "@type": "ListItem", position: 1, name: "Home", item: "https://www.setwisedigital.com" },
      { "@type": "ListItem", position: 2, name: "TechBridge", item: "https://www.setwisedigital.com/techbridge" },
      { "@type": "ListItem", position: 3, name: "Security", item: "https://www.setwisedigital.com/techbridge/security" },
    ],
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(learningResourceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <SecurityClient />
    </>
  );
}
