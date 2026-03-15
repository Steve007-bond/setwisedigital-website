import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Home Wi-Fi Speed Advisor — Free Tool | Setwise Digital",
  description: "Free internet speed advisor for adults 45+. Tell us your devices and usage. We'll tell you if your internet plan is fast enough or if you're overpaying.",
  keywords: ["what internet speed do I need,is my internet fast enough,how much internet speed do I need,wifi speed for seniors,internet plan advice"],
  alternates: {canonical: "https://setwisedigital.com/tools/wifi-speed-checker"},
};
import Client from "./Client";
export default function Page(){return<Client/>;}
