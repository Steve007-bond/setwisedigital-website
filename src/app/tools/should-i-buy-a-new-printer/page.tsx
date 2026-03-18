import type { Metadata } from "next";
import { Suspense } from "react";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Should I Buy a New Printer or Keep My Old One? — 4-Question Decision Guide | Setwise Digital",
  description: "Honest answer in under 2 minutes. No upselling. Just a clear verdict based on your printer's age, problems, and what repairs would cost vs a new model.",
  keywords: [
    "should I buy a new printer",
    "is it worth repairing my printer",
    "when to replace a printer",
    "printer too old to fix",
    "printer keeps jamming replace",
    "printer repair cost vs new",
    "my printer is 5 years old should I replace",
    "signs you need a new printer",
    "printer keeps breaking down",
  ],
  alternates: { canonical: "https://setwisedigital.com/tools/should-i-buy-a-new-printer" },
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#0d1117]" />}>
      <Client />
    </Suspense>
  );
}
