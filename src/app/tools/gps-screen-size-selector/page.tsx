import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "What GPS Screen Size Do I Need? 5, 5.5 or 7 inch | Setwise Digital",
  description: "5 inch, 5.5 inch, or 6.95 inch? 4 questions match the right GPS screen size to your eyesight, car, and driving style. Best large screen GPS for seniors 50+. Free, plain English.",
  keywords: ["GPS with large screen,best GPS 7 inch screen,GPS easy to read while driving,large display GPS for seniors,GPS screen size comparison,GPS touchscreen large display"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-screen-size-selector" },
};

export default function Page() {
  return <Client />;
}
