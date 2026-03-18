import type { Metadata } from "next";
import { redirect } from "next/navigation";

export const metadata: Metadata = {
  title: "Wi-Fi Speed Checker — Home Wi-Fi Overload Tool | Setwise Digital",
  description: "Check if your home Wi-Fi router is overloaded. Free interactive tool for adults 40+. Setwise Digital.",
  alternates: { canonical: "https://www.setwisedigital.com/tools/wifi-checker" },
  robots: { index: false, follow: true },
};

// This page redirects to the main wifi-checker tool
export default function WifiSpeedCheckerPage() {
  redirect("/tools/wifi-checker");
}
