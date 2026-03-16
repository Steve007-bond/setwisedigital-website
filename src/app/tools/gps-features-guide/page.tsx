import type { Metadata } from "next";
import Client from "./Client";
export const metadata: Metadata = {
  title: "GPS Features Explained in Plain English — What They Mean | Setwise Digital",
  description: "What does Live Traffic, Lane Assist, LMT, or Bluetooth mean on a GPS? Plain-English explanations of every GPS feature — who needs it and whether it's worth paying extra.",
  keywords: ["what is live traffic GPS","GPS lane assist explained","GPS LMT meaning","Garmin features explained","GPS buying guide features","what GPS features do I need"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-features-guide" },
};
export default function Page() { return <Client />; }
