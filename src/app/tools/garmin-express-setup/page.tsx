import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "How to Update Garmin GPS Maps — Wi-Fi and Garmin Express Step-by-Step Guide | Setwise Digital",
  description: "Clickable step-by-step guide to updating your Garmin GPS maps via Wi-Fi or Garmin Express on a computer. Plain English, tick off each step as you go. Free.",
  keywords: ["how to update Garmin GPS maps,Garmin Express step by step,update Garmin GPS Wi-Fi,Garmin map update guide,how to use Garmin Express,update GPS maps Canada"],
  alternates: { canonical: "https://setwisedigital.com/tools/garmin-express-setup" },
};

export default function Page() {
  return <Client />;
}
