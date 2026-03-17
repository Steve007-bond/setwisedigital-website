import type { Metadata } from "next";
import Client from "./Client";

export const metadata: Metadata = {
  title: "Does My GPS Cover Where I Drive? USA and Canada Coverage Checker | Setwise Digital",
  description: "Pick your region and GPS brand — get an honest coverage verdict for US cities, rural America, rural Canada, and the far north. Free, plain English.",
  keywords: ["does GPS work in rural Canada,GPS maps for rural Canada,GPS works in remote areas,best GPS coverage Northern Canada,does Garmin cover Canada,GPS maps Alaska and Canada"],
  alternates: { canonical: "https://setwisedigital.com/tools/gps-coverage-checker" },
};

export default function Page() {
  return <Client />;
}
