import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Device or Phone Navigation — Which is Right for You? | Setwise Digital",
  description: "The most asked navigation question online — answered honestly. 4 questions about how you actually drive. Do you need a dedicated GPS or is your phone enough? Free, plain English verdict.",
  keywords: ["do I need a GPS device,GPS or Google Maps,phone navigation vs GPS,should I buy a GPS,GPS vs smartphone navigation"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-vs-phone-decider" },
};

export default function Page() {
  return <Client />;
}
