import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Factory GPS vs Garmin vs CarPlay — Which is Right for Your Car? | Setwise Digital",
  description: "Use your car's built-in GPS, buy a Garmin, use Apple CarPlay, or just your phone? 4 questions about your car and how you drive — get an honest, plain-English recommendation. Free.",
  keywords: ["should I use built-in car GPS or buy one,factory GPS vs Garmin,in-built car navigation vs standalone GPS,Apple CarPlay vs dedicated GPS,is factory GPS worth it,CarPlay vs standalone GPS"],
  alternates: { canonical: "https://setwisedigital.com/tools/builtin-vs-aftermarket-gps" },
};

export default function Page() {
  return <Client />;
}
