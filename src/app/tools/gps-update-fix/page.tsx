import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "GPS Map Update Not Working? Step-by-Step Fix Guide for Common Problems | Setwise Digital",
  description: "Garmin Express not detecting your GPS, map download failing, Wi-Fi won't connect? Pick your problem and follow clickable step-by-step fixes. Free, plain English.",
  keywords: ["GPS not updating,Garmin Express not working,GPS map update failed,GPS maps still wrong after update,Garmin Express won't detect GPS,why GPS map update not working"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-update-fix" },
};

export default function Page() {
  return <Client />;
}
