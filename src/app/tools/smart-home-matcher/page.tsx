import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Smart Home Starter Matcher — Alexa vs Google Nest | Setwise Digital",
  description: "Free interactive technology learning tool for adults 45+. Plain-English guidance with no jargon. Setwise Digital — Technology Simplified.",
  alternates: { canonical: "https://setwisedigital.com/tools/smart-home-matcher" },
};

export default function Page() {
  return <Client />;
}
