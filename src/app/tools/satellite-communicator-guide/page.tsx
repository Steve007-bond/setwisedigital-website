import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Garmin inReach vs ZOLEO vs SPOT — Which Satellite Communicator? | Setwise Digital",
  description: "Garmin inReach Mini 2, ZOLEO, or SPOT Gen4? 4 questions about your adventures, your family, and your budget. Plain-English comparison of all three satellite communicators. Free.",
  keywords: ["Garmin inReach vs SPOT vs ZOLEO,best satellite communicator 2026,inReach Mini 2 review,ZOLEO satellite communicator,satellite messenger for hikers,backcountry SOS device"],
  alternates: { canonical: "https://setwisedigital.com/tools/satellite-communicator-guide" },
};

export default function Page() {
  return <Client />;
}
