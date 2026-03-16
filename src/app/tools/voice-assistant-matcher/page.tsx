import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best Voice Assistant — Alexa vs Google vs Siri | Setwise Digital",
  description: "Free interactive technology learning tool for adults 45+. Plain-English guidance with no jargon. Setwise Digital — Technology Simplified.",
  alternates: { canonical: "https://setwisedigital.com/tools/voice-assistant-matcher" },
};

export default function Page() {
  return <Client />;
}
