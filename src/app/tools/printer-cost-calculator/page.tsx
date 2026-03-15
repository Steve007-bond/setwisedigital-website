import type { Metadata } from "next";
import PrinterCostClient from "./PrinterCostClient";
export const metadata: Metadata = {
  title: "Printer Cost Per Page Calculator 2026 — HP, Canon, Epson, Brother | Setwise Digital",
  description: "Find out exactly how much your printer really costs per year. Ink, paper, and electricity included. Compare HP, Canon, Epson and Brother models side by side — free, plain English.",
  keywords: ["printer cost per page calculator","how much does it cost to print a page","HP ink cost calculator","cheapest printer to run","printer annual cost","Epson EcoTank vs HP","printer ink comparison"],
  alternates: { canonical: "https://setwisedigital.com/tools/printer-cost-calculator" },
};
export default function Page() {
  const schema = { "@context":"https://schema.org","@type":"WebApplication","name":"Printer True Cost Calculator","description":"Calculate the real annual cost of your printer including ink, paper and electricity.","url":"https://setwisedigital.com/tools/printer-cost-calculator","applicationCategory":"EducationalApplication","offers":{"@type":"Offer","price":"0","priceCurrency":"USD"} };
  return (<><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/><PrinterCostClient/></>);
}
