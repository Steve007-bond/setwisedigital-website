import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "How to Send a Fax from Home in 2025 — No Phone Line Needed | Setwise Digital",
  description: "Need to fax a medical form or legal document from home? We show you exactly how — from your printer, phone, or computer. No fax machine or phone line required.",
  keywords: [
    "how to send a fax from home",
    "how to fax without a fax machine",
    "how to fax without phone line",
    "send fax online free",
    "fax from computer",
    "fax from iPhone",
    "fax medical forms from home",
    "online fax service",
    "how to fax in 2025",
    "fax from phone no landline",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/how-to-send-a-fax-from-home" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <Client />
    </Suspense>
  );
}
