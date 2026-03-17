import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Golf GPS Watch vs Rangefinder vs Handheld — Which is Right for You? | Setwise Digital",
  description: "GPS watch, laser rangefinder, or handheld GPS? 5 questions about your game, budget, and what matters most. Get a personalised recommendation with honest product picks. Free, plain English.",
  keywords: ["golf GPS watch vs rangefinder,should I buy golf GPS or rangefinder,best golf GPS for seniors,golf GPS no subscription,GPS watch vs laser golf,golf distance device"],
  alternates: { canonical: "https://setwisedigital.com/tools/golf-gps-decider" },
};

export default function Page() {
  return <Client />;
}
