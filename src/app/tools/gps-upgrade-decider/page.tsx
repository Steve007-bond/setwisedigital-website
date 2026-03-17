import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Should I Upgrade My GPS or Just Update It? — Keep or Replace Guide | Setwise Digital",
  description: "4 questions about your GPS — get a clear keep-or-replace verdict plus a clickable step-by-step action plan. Free, plain English. No jargon.",
  keywords: ["should I upgrade my GPS,is my GPS too old,when to replace GPS,old Garmin still worth using,GPS upgrade worth it,GPS vs new phone navigation"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-upgrade-decider" },
};

export default function Page() {
  return <Client />;
}
