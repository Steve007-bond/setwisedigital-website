"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer"; import ScrollToTop from "@/components/ScrollToTop"; import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, Phone, User, Loader2, RefreshCw, Shield, ArrowRight } from "lucide-react";

const BG=[
  {url:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=1200",type:"image"as const,theme:"dark"as const},
  {url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1200",type:"image"as const,theme:"dark"as const},
];

const PRINTERS = [
  {id:"hp4155",brand:"HP",model:"DeskJet 4155e",type:"Inkjet",price:89,blackCartridge:"HP 67",blackCost:14.99,blackYield:120,colorCartridge:"HP 67 Color",colorCost:18.99,colorYield:100,wattage:10,badge:"Best Seller",badgeColor:"bg-blue-600",emoji:"🔵"},
  {id:"hp6455",brand:"HP",model:"ENVY 6455e",type:"Inkjet",price:129,blackCartridge:"HP 67XL",blackCost:22.99,blackYield:240,colorCartridge:"HP 67XL Color",colorCost:26.99,colorYield:200,wattage:12,badge:"Great Value",badgeColor:"bg-blue-500",emoji:"🔵"},
  {id:"hplaserjet",brand:"HP",model:"LaserJet M110we",type:"Laser",price:149,blackCartridge:"HP 141A",blackCost:49.99,blackYield:1000,colorCartridge:"N/A",colorCost:0,colorYield:0,wattage:270,badge:"Laser",badgeColor:"bg-indigo-600",emoji:"🔷"},
  {id:"canon2522",brand:"Canon",model:"PIXMA TR4722",type:"Inkjet",price:89,blackCartridge:"PG-245",blackCost:13.99,blackYield:180,colorCartridge:"CL-246",colorCost:15.99,colorYield:300,wattage:11,badge:"Best Value",badgeColor:"bg-red-600",emoji:"🔴"},
  {id:"canonts3520",brand:"Canon",model:"PIXMA TS3520",type:"Inkjet",price:69,blackCartridge:"PG-245",blackCost:13.99,blackYield:180,colorCartridge:"CL-246",colorCost:15.99,colorYield:300,wattage:10,badge:"Budget Pick",badgeColor:"bg-red-500",emoji:"🔴"},
  {id:"epsonET2800",brand:"Epson",model:"EcoTank ET-2800",type:"Inkjet",price:179,blackCartridge:"Ink Bottle",blackCost:14.99,blackYield:4500,colorCartridge:"Color Bottles",colorCost:29.99,colorYield:7500,wattage:12,badge:"Lowest Ink Cost",badgeColor:"bg-orange-600",emoji:"🟠"},
  {id:"epsonXP4200",brand:"Epson",model:"Expression XP-4200",type:"Inkjet",price:89,blackCartridge:"T232 Black",blackCost:12.99,blackYield:175,colorCartridge:"T232 Color",colorCost:14.99,colorYield:165,wattage:11,badge:"Compact",badgeColor:"bg-orange-500",emoji:"🟠"},
  {id:"brotherHL",brand:"Brother",model:"HL-L2350DW",type:"Laser",price:119,blackCartridge:"TN760",blackCost:54.99,blackYield:3000,colorCartridge:"N/A",colorCost:0,colorYield:0,wattage:350,badge:"Laser Value",badgeColor:"bg-green-600",emoji:"🟢"},
  {id:"brotherMFC",brand:"Brother",model:"MFC-J1010DW",type:"Inkjet",price:99,blackCartridge:"LC401",blackCost:9.99,blackYield:150,colorCartridge:"LC401 Color",colorCost:11.99,colorYield:200,wattage:10,badge:"Affordable",badgeColor:"bg-green-500",emoji:"🟢"},
];

const BRANDS = ["HP","Canon","Epson","Brother"];

export default function PrinterCostClient(){
  const [stage,setStage]=useState<"intro"|"select"|"usage"|"results"|"lead">("intro");
  const [selectedBrand,setSelectedBrand]=useState("");
  const [selectedPrinter,setSelectedPrinter]=useState<typeof PRINTERS[0]|null>(null);
  const [pagesPerMonth,setPagesPerMonth]=useState(50);
  const [colorPercent,setColorPercent]=useState(30);
  const [name,setName]=useState(""); const [email,setEmail]=useState(""); const [phone,setPhone]=useState("");
  const [errors,setErrors]=useState<Record<string,string>>({}); const [submitting,setSubmitting]=useState(false); const [submitted,setSubmitted]=useState(false);
  const heroRef=useRef(null); const heroInView=useInView(heroRef,{once:true});

  const filteredPrinters = selectedBrand ? PRINTERS.filter(p=>p.brand===selectedBrand) : PRINTERS;

  function calcCosts(p:typeof PRINTERS[0]){
    const colorPages = pagesPerMonth * (colorPercent/100);
    const blackPages = pagesPerMonth - colorPages;
    const monthlyBlackCost = (blackPages/p.blackYield)*p.blackCost;
    const monthlyColorCost = p.colorYield>0 ? (colorPages/p.colorYield)*p.colorCost : 0;
    const monthlyPaperCost = pagesPerMonth * 0.01; // ~$1 per 100 sheets
    const monthlyElecCost = (p.wattage/1000) * 0.30 * 0.5 * 30; // 30min/day avg, $0.30/kWh
    const monthlyTotal = monthlyBlackCost + monthlyColorCost + monthlyPaperCost + monthlyElecCost;
    const annualTotal = monthlyTotal * 12;
    const costPerPage = pagesPerMonth>0 ? (monthlyTotal/pagesPerMonth) : 0;
    return { monthlyBlackCost, monthlyColorCost, monthlyPaperCost, monthlyElecCost, monthlyTotal, annualTotal, costPerPage };
  }

  const costs = selectedPrinter ? calcCosts(selectedPrinter) : null;

  const validate=()=>{const e:Record<string,string>={};if(!name.trim())e.name="Please enter your name";if(!email.trim()||!email.includes("@"))e.email="Please enter a valid email";setErrors(e);return Object.keys(e).length===0;};
  const handleSubmit=async()=>{if(!validate())return;setSubmitting(true);try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,phone,brand:selectedPrinter?.brand,issue:`Printer Cost — ${selectedPrinter?.model} — Annual: $${costs?.annualTotal.toFixed(2)}`,source:"printer-cost-calculator"})});}catch{}setSubmitted(true);setSubmitting(false);};
  const reset=()=>{setStage("intro");setSelectedBrand("");setSelectedPrinter(null);setPagesPerMonth(50);setColorPercent(30);setName("");setEmail("");setPhone("");setSubmitted(false);};

  return(
    <div className="min-h-screen bg-[#0d1117] text-white font-sans"><Navbar/><ScrollToTop/>
      <header ref={heroRef} className="relative pt-44 pb-32 overflow-hidden">
        <HeaderBackgroundSlider items={BG} interval={8000}/>
        <div className="absolute inset-0 -z-10"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-base text-zinc-400 mb-8"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-200">Printer Cost Calculator</span></nav>
          <motion.div initial={{opacity:0,x:-20}} animate={heroInView?{opacity:1,x:0}:{}} transition={{delay:0.2}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-black uppercase tracking-widest mb-8">💰 Free Calculator · 3 Minutes</motion.div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6 text-white max-w-3xl">
            <motion.span className="block" initial={{opacity:0,filter:"blur(8px)"}} animate={heroInView?{opacity:1,filter:"blur(0px)"}:{}} transition={{delay:0.3,duration:0.8}}>How Much Does</motion.span>
            <motion.span className="block" initial={{opacity:0,filter:"blur(8px)"}} animate={heroInView?{opacity:1,filter:"blur(0px)"}:{}} transition={{delay:0.4,duration:0.8}}>Your Printer</motion.span>
            <motion.span className="block bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent italic" initial={{opacity:0,filter:"blur(8px)"}} animate={heroInView?{opacity:1,filter:"blur(0px)"}:{}} transition={{delay:0.5,duration:0.8}}>Really Cost?</motion.span>
          </h1>
          <motion.p initial={{opacity:0}} animate={heroInView?{opacity:1}:{}} transition={{delay:0.6}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Find out the true annual cost of running your HP, Canon, Epson, or Brother printer — ink, paper, and electricity all included. Most people are surprised by the answer.</motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <AnimatePresence mode="wait">
          {(stage==="intro"||stage==="select")&&(
            <motion.div key="select" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-6">
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-blue-400"/>
                <div className="p-8 md:p-10">
                  <h2 className="text-3xl font-black text-white mb-4">Select Your Printer Brand 🖨️</h2>
                  <div className="flex flex-wrap gap-3 mb-8">
                    <button onClick={()=>setSelectedBrand("")} className={`px-6 py-3 rounded-full font-bold text-base border-2 transition-all ${selectedBrand===""?"bg-indigo-600 border-indigo-600 text-white":"bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"}`}>All Brands</button>
                    {BRANDS.map(b=>(<button key={b} onClick={()=>setSelectedBrand(b)} className={`px-6 py-3 rounded-full font-bold text-base border-2 transition-all ${selectedBrand===b?"bg-indigo-600 border-indigo-600 text-white":"bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"}`}>{b}</button>))}
                  </div>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {filteredPrinters.map(p=>(<motion.button key={p.id} whileTap={{scale:0.98}} onClick={()=>{setSelectedPrinter(p);setStage("usage");}} className={`p-5 rounded-2xl border-2 text-left transition-all ${selectedPrinter?.id===p.id?"border-indigo-500 bg-indigo-900/20":"border-zinc-700 bg-zinc-800/50 hover:border-indigo-500"}`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-2"><span className="text-2xl">{p.emoji}</span><span className={`${p.badgeColor} text-white text-xs font-black px-2.5 py-1 rounded-full`}>{p.badge}</span></div>
                        <span className="text-zinc-400 font-bold">${p.price}</span>
                      </div>
                      <div className="font-black text-white text-base">{p.brand} {p.model}</div>
                      <div className="text-zinc-400 text-sm mt-1">{p.type} · Ink: ${p.blackCost}/{p.blackYield}pgs</div>
                    </motion.button>))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage==="usage"&&selectedPrinter&&(
            <motion.div key="usage" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} className="space-y-6">
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-blue-400"/>
                <div className="p-8 md:p-10">
                  <button onClick={()=>setStage("select")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-6">← Back</button>
                  <div className="flex items-center gap-4 mb-8">
                    <span className="text-4xl">{selectedPrinter.emoji}</span>
                    <div><h2 className="text-2xl font-black text-white">{selectedPrinter.brand} {selectedPrinter.model}</h2><p className="text-zinc-400">{selectedPrinter.type}</p></div>
                  </div>
                  <div className="space-y-8 mb-8">
                    <div>
                      <label className="text-base font-black text-zinc-200 block mb-4">How many pages do you print per month?</label>
                      <div className="flex items-center gap-6">
                        <input type="range" min="10" max="500" step="10" value={pagesPerMonth} onChange={e=>setPagesPerMonth(Number(e.target.value))} className="flex-1 accent-indigo-500 h-2"/>
                        <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-3 min-w-[90px] text-center"><span className="text-2xl font-black text-white">{pagesPerMonth}</span><div className="text-xs text-zinc-400">pages/mo</div></div>
                      </div>
                      <div className="flex justify-between text-sm text-zinc-500 mt-2"><span>10 (light use)</span><span>500 (heavy use)</span></div>
                    </div>
                    {selectedPrinter.colorYield>0&&(<div>
                      <label className="text-base font-black text-zinc-200 block mb-4">What percentage of pages do you print in color?</label>
                      <div className="flex items-center gap-6">
                        <input type="range" min="0" max="100" step="10" value={colorPercent} onChange={e=>setColorPercent(Number(e.target.value))} className="flex-1 accent-indigo-500 h-2"/>
                        <div className="bg-zinc-800 border border-zinc-700 rounded-xl px-5 py-3 min-w-[90px] text-center"><span className="text-2xl font-black text-white">{colorPercent}%</span><div className="text-xs text-zinc-400">color</div></div>
                      </div>
                      <div className="flex justify-between text-sm text-zinc-500 mt-2"><span>0% (black only)</span><span>100% (all color)</span></div>
                    </div>)}
                  </div>
                  <button onClick={()=>setStage("results")} className="w-full py-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/25 hover:scale-[1.02] transition-transform">
                    Calculate My Printer Cost <ArrowRight size={24}/>
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {stage==="results"&&selectedPrinter&&costs&&(
            <motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
              <div className="bg-zinc-900 rounded-[2rem] border-2 border-indigo-800 overflow-hidden shadow-xl">
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-blue-400"/>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-4xl">{selectedPrinter.emoji}</span>
                    <div><h2 className="text-2xl font-black text-white">{selectedPrinter.brand} {selectedPrinter.model}</h2><p className="text-zinc-400">{pagesPerMonth} pages/month · {colorPercent}% color</p></div>
                  </div>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                    {[
                      {label:"Annual Total",value:`$${costs.annualTotal.toFixed(2)}`,color:"text-indigo-300",bg:"bg-indigo-900/30 border-indigo-700"},
                      {label:"Per Month",value:`$${costs.monthlyTotal.toFixed(2)}`,color:"text-blue-300",bg:"bg-blue-900/30 border-blue-700"},
                      {label:"Cost Per Page",value:`$${costs.costPerPage.toFixed(3)}`,color:"text-cyan-300",bg:"bg-cyan-900/30 border-cyan-700"},
                      {label:"Device Cost",value:`$${selectedPrinter.price}`,color:"text-zinc-300",bg:"bg-zinc-800/50 border-zinc-700"},
                    ].map(stat=>(<div key={stat.label} className={`rounded-2xl border p-5 text-center ${stat.bg}`}><div className={`text-2xl font-black mb-1 ${stat.color}`}>{stat.value}</div><div className="text-xs text-zinc-400 font-semibold uppercase tracking-widest">{stat.label}</div></div>))}
                  </div>
                  <div className="bg-zinc-800 rounded-2xl p-6 mb-6">
                    <h3 className="font-black text-white text-base mb-4">Annual Cost Breakdown</h3>
                    <div className="space-y-3">
                      {[
                        {label:`Ink — Black (${selectedPrinter.blackCartridge})`,value:costs.monthlyBlackCost*12,icon:"⬛"},
                        {label:selectedPrinter.colorYield>0?`Ink — Color (${selectedPrinter.colorCartridge})`:"No Color Cartridge",value:costs.monthlyColorCost*12,icon:"🟦"},
                        {label:"Paper",value:costs.monthlyPaperCost*12,icon:"📄"},
                        {label:"Electricity",value:costs.monthlyElecCost*12,icon:"⚡"},
                      ].map(item=>(<div key={item.label} className="flex items-center justify-between">
                        <span className="text-base text-zinc-300 font-medium flex items-center gap-2"><span>{item.icon}</span>{item.label}</span>
                        <span className="font-black text-white text-base">${item.value.toFixed(2)}/yr</span>
                      </div>))}
                    </div>
                  </div>
                  {!submitted&&(<div className="bg-zinc-800 rounded-2xl p-6">
                    <h3 className="font-black text-white text-base mb-4">📧 Get Your Full Report + Money-Saving Tips</h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-4">
                      {[{label:"Name",type:"text",val:name,set:setName,ph:"Mary"},{label:"Email *",type:"email",val:email,set:setEmail,ph:"name@email.com"},{label:"Phone (optional)",type:"tel",val:phone,set:setPhone,ph:"+1 555 000 0000"}].map(f=>(<div key={f.label}><label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-1">{f.label}</label><input type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} className="w-full px-4 py-3 bg-zinc-700 border border-zinc-600 rounded-xl text-white text-base focus:outline-none focus:border-indigo-500 placeholder:text-zinc-500"/>{errors[f.label.replace(" *","")]&&<p className="text-red-400 text-xs mt-1">{errors[f.label.replace(" *","")]}</p>}</div>))}
                    </div>
                    <button onClick={handleSubmit} disabled={submitting} className="w-full py-4 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-lg rounded-xl flex items-center justify-center gap-2 hover:scale-[1.02] transition-transform disabled:opacity-70">{submitting?<Loader2 size={20} className="animate-spin"/>:<>Send My Report</>}</button>
                    <p className="text-center text-xs text-zinc-600 mt-2">🔒 No spam. Unsubscribe anytime.</p>
                  </div>)}
                  {submitted&&<div className="bg-green-900/30 border border-green-700 rounded-2xl p-4 flex items-center gap-3"><CheckCircle2 size={18} className="text-green-400"/><p className="text-base font-bold text-green-300">Report sent to {email}!</p></div>}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Calculate Another</button>
                <Link href="/tools/best-printer-finder"><div className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black rounded-2xl text-lg cursor-pointer hover:scale-[1.02] transition-transform">🖨️ Find Best Printer for Me</div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5"/><p className="text-sm text-zinc-500">Educational purposes only. Prices are approximate and subject to change. Setwise Digital is not affiliated with HP, Canon, Epson, or Brother.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
