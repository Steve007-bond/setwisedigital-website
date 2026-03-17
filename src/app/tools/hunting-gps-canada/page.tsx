import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Best GPS for Hunting in Canada — Boreal Forest, Mountains, Remote Backcountry | Setwise Digital",
  description: "Hunting GPS guide built specifically for Canadian conditions. Boreal forest, mountain terrain, dog hunting, remote backcountry. Garmin GPSMAP 67, 66i, Alpha, and Montana compared. Free.",
  keywords: ["best GPS for hunting Canada,hunting GPS backcountry,GPS for deer hunting Ontario,GPS with topo maps hunting,Garmin GPSMAP hunting,handheld GPS for deer hunting"],
  alternates: { canonical: "https://setwisedigital.com/tools/hunting-gps-canada" },
};

export default function Page() {
  return <Client />;
}
