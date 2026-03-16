import type { Metadata } from "next";
import Client from "./Client";
export const metadata: Metadata = {
  title: "Printer True Cost Calculator 2026 — HP, Canon, Epson, Brother | Setwise Digital",
  description: "Find out exactly how much your printer costs per year — ink, paper, and electricity included. Free calculator for HP, Canon, Epson, Brother. Plain English, no jargon.",
  keywords: ["printer cost per page calculator","how much does it cost to print a page","HP ink cost","cheapest printer to run","annual printer cost"],
  alternates: { canonical: "https://setwisedigital.com/tools/printer-cost-calculator" },
};
export default function Page() {
  const schema = { "@context":"https://schema.org","@type":"WebApplication","name":"Printer True Cost Calculator","description":"Calculate real annual cost of your printer including ink, paper, electricity.","url":"https://setwisedigital.com/tools/printer-cost-calculator","applicationCategory":"EducationalApplication","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><Client/></>);
}
