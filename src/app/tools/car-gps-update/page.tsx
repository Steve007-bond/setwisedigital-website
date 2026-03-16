import type { Metadata } from "next";
import Client from "./Client";
export const metadata: Metadata = {
  title: "Car Navigation Update Guide — Honda Toyota BMW Mercedes Lexus Audi | Setwise Digital",
  description: "Step-by-step car navigation update guide for Honda, Toyota, BMW, Mercedes-Benz, Lexus, Audi, Ford and Nissan. Find your model and get exact instructions. Free, plain English.",
  keywords: ["Honda navigation update","Toyota GPS update","BMW iDrive map update","Mercedes COMAND update","Lexus navigation update","Audi MMI update","how to update car GPS","car navigation map update"],
  alternates: { canonical: "https://setwisedigital.com/tools/car-gps-update" },
};
export default function Page() { return <Client />; }
