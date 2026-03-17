import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best GPS for Seniors and Drivers Over 55 — Large Screen, Simple Menus | Setwise Digital",
  description: "Large screen GPS units with simple menus and voice control — chosen specifically for drivers 55+. 4 questions match you to the right Garmin model. Includes 5 senior-specific GPS tips. Free.",
  keywords: ["best GPS for seniors,easy GPS for elderly,large screen GPS for older drivers,GPS simple to use over 60,GPS with big display easy to read,senior friendly GPS navigation"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-for-seniors" },
};

export default function Page() {
  return <Client />;
}
