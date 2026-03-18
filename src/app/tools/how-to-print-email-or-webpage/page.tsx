import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "How to Print an Email or Webpage — Gmail, Outlook, Chrome & Safari | Setwise Digital",
  description: "Find the exact print button for your email or browser. Step-by-step instructions for Gmail, Outlook, Apple Mail, Chrome, Safari, and Edge — for your specific app and device.",
  keywords: [
    "how to print an email",
    "how to print from Gmail",
    "how to print from Outlook",
    "how to print from Chrome",
    "how to print from Safari",
    "print email to paper",
    "print webpage from browser",
    "how to print Gmail on iPhone",
    "how to print Outlook email",
    "print from internet browser",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/how-to-print-email-or-webpage" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <Client />
    </Suspense>
  );
}
