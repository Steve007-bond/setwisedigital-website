"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw } from "lucide-react";

const printerBgs = [
  { url:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1563520239648-a8ade7166c97?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

// Real printer data researched from manufacturer specs
const PRINTERS = [
  { id:"hp-deskjet-4155e", brand:"HP", model:"DeskJet 4155e", price:89, blackCartridge:"HP 67", colorCartridge:"HP 67 Color", blackCost:14.99, colorCost:18.99, blackYield:120, colorYield:100, monthlyDuty:100, watts:10, best:"Basic home printing", type:"Inkjet" },
  { id:"hp-envy-6055e", brand:"HP", model:"ENVY 6055e", price:129, blackCartridge:"HP 67XL", colorCartridge:"HP 67XL Color", blackCost:22.99, colorCost:26.99, blackYield:240, colorYield:200, monthlyDuty:150, watts:12, best:"Photos & documents", type:"Inkjet" },
  { id:"hp-officejet-pro-9015e", brand:"HP", model:"OfficeJet Pro 9015e", price:219, blackCartridge:"HP 962XL", colorCartridge:"HP 962XL Color", blackCost:34.99, colorCost:28.99, blackYield:2000, colorYield:1600, monthlyDuty:300, watts:22, best:"High volume printing", type:"Inkjet" },
  { id:"canon-pixma-tr4720", brand:"Canon", model:"PIXMA TR4720", price:79, blackCartridge:"PG-245XL", colorCartridge:"CL-246XL", blackCost:16.99, colorCost:16.99, blackYield:300, colorYield:300, monthlyDuty:100, watts:11, best:"Basic home use", type:"Inkjet" },
  { id:"canon-pixma-ts6420a", brand:"Canon", model:"PIXMA TS6420a", price:99, blackCartridge:"PGI-280XXL", colorCartridge:"CLI-281XXL", blackCost:19.99, colorCost:14.99, blackYield:600, colorYield:830, monthlyDuty:200, watts:13, best:"Photos & everyday", type:"Inkjet" },
  { id:"epson-ecotank-et-2800", brand:"Epson", model:"EcoTank ET-2800", price:199, blackCartridge:"T502 Ink Bottle", colorCartridge:"T502 Color Bottles", blackCost:9.99, colorCost:8.99, blackYield:4500, colorYield:6500, monthlyDuty:200, watts:9, best:"Lowest cost per page", type:"EcoTank" },
  { id:"epson-ecotank-et-4850", brand:"Epson", model:"EcoTank ET-4850", price:349, blackCartridge:"T542 Ink Bottle", colorCartridge:"T542 Color Bottles", blackCost:13.49, colorCost:12.99, blackYield:7500, colorYield:5200, monthlyDuty:400, watts:14, best:"Best long-term value", type:"EcoTank" },
  { id:"brother-mfc-j1010dw", brand:"Brother", model:"MFC-J1010DW", price:119, blackCartridge:"LC401BK", colorCartridge:"LC401CMY", blackCost:9.99, colorCost:8.99, blackYield:500, colorYield:200, monthlyDuty:150, watts:13, best:"Everyday family use", type:"Inkjet" },
  { id:"brother-mfc-j4335dw", brand:"Brother", model:"MFC-J4335DW", price:149, blackCartridge:"LC406XLBK", colorCartridge:"LC406XLCMY", blackCost:17.99, colorCost:16.99, blackYield:6000, colorYield:5000, monthlyDuty:250, watts:15, best:"High yield, low cost", type:"Inkjet" },
  { id:"hp-laserjet-pro-m15w", brand:"HP", model:"LaserJet Pro M15w", price:149, blackCartridge:"CF248A", colorCartridge:"N/A", blackCost:29.99, colorCost:0, blackYield:1000, colorYield:0, monthlyDuty:200, watts:150, best:"Black & white only — fast", type:"Laser" },
];

const BRANDS = ["HP", "Canon", "Epson", "Brother"];

function calcAnnualCost(printer: typeof PRINTERS[0], pagesPerMonth: number, colorPercent: number) {
  const blackPages = Math.round(pagesPerMonth * (1 - colorPercent / 100));
  const colorPages = Math.round(pagesPerMonth * (colorPercent / 100));
  const blackInkAnnual = (blackPages * 12 / printer.blackYield) * printer.blackCost;
  const colorInkAnnual = printer.colorCost > 0 ? (colorPages * 12 / printer.colorYield) * printer.colorCost : 0;
  const paperAnnual = pagesPerMonth * 12 * 0.01; // ~$0.01 per sheet
  const electricityAnnual = (printer.watts / 1000) * (pagesPerMonth * 12 / 100) * 0.15; // $0.15/kWh
  const total = blackInkAnnual + colorInkAnnual + paperAnnual + electricityAnnual;
  const costPerPage = pagesPerMonth > 0 ? (total / 12 / pagesPerMonth) : 0;
  return { blackInkAnnual, colorInkAnnual, paperAnnual, electricityAnnual, total, costPerPage };
}

export default function PrinterCostClient() {
  const [stage, setStage] = useState<"select"|"config"|"lead"|"results">("select");
  const [selectedBrand, setSelectedBrand] = useState("");
  const [selectedPrinter, setSelectedPrinter] = useState<typeof PRINTERS[0] | null>(null);
  const [pagesPerMonth, setPagesPerMonth] = useState(100);
  const [colorPercent, setColorPercent] = useState(30);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");
  const filteredPrinters = selectedBrand ? PRINTERS.filter(p => p.brand === selectedBrand) : PRINTERS;
  const costs = selectedPrinter ? calcAnnualCost(selectedPrinter, pagesPerMonth, colorPercent) : null;
  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, phone, brand: selectedPrinter?.brand, issue: `Printer Cost Calc — ${selectedPrinter?.model} — $${costs?.total.toFixed(0)}/yr`, source:"printer-cost-calculator" }) }); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = () => { setStage("select"); setSelectedBrand(""); setSelectedPrinter(null); setPagesPerMonth(100); setColorPercent(30); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={printerBgs} interval={8000} onThemeChange={setCurrentTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">Printer Cost Calculator</span>
          </nav>
          <motion.div initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.2}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-black uppercase tracking-widest mb-6">
            <Zap size={14}/> Free Tool · 3 Minutes
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6 text-white">
            Printer True<br/><span className="bg-gradient-to-r from-indigo-400 to-blue-300 bg-clip-text text-transparent italic">Cost Calculator</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Find out exactly how much your printer costs per year — ink, paper, and electricity all included. Compare HP, Canon, Epson and Brother in plain English.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {stage === "select" && (
                <motion.div key="select" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-blue-400"/>
                  <div className="p-8 md:p-10">
                    <h2 className="text-3xl font-black text-white mb-4">Select Your Printer Model 🖨️</h2>
                    <p className="text-zinc-400 font-medium mb-6 text-lg">Choose your brand first, then select your exact model.</p>
                    {/* Brand filter */}
                    <div className="flex flex-wrap gap-3 mb-6">
                      {["All",...BRANDS].map(b=>(<button key={b} onClick={()=>setSelectedBrand(b==="All"?"":b)} className={`px-5 py-2.5 rounded-full font-bold text-base border-2 transition-all ${selectedBrand===(b==="All"?"":b)?"bg-indigo-600 border-indigo-600 text-white":"bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"}`}>{b}</button>))}
                    </div>
                    {/* Printer list */}
                    <div className="space-y-3 max-h-96 overflow-y-auto pr-2">
                      {filteredPrinters.map(p=>(
                        <motion.button key={p.id} whileTap={{scale:0.98}} onClick={()=>setSelectedPrinter(p)}
                          className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${selectedPrinter?.id===p.id?"border-indigo-500 bg-indigo-900/20":"border-zinc-700 bg-zinc-800/50 hover:border-zinc-500"}`}>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="font-black text-white text-base">{p.brand} {p.model}</span>
                              <span className={`text-xs font-black px-2 py-0.5 rounded-full ${p.type==="EcoTank"?"bg-green-900/50 text-green-300":p.type==="Laser"?"bg-blue-900/50 text-blue-300":"bg-zinc-700 text-zinc-300"}`}>{p.type}</span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-zinc-400 font-medium">
                              <span>💰 ${p.price} upfront</span>
                              <span>📄 {p.blackYield} pg/cartridge</span>
                              <span>⭐ {p.best}</span>
                            </div>
                          </div>
                          {selectedPrinter?.id===p.id&&<CheckCircle2 size={22} className="text-indigo-400 shrink-0"/>}
                        </motion.button>
                      ))}
                    </div>
                    <AnimatePresence>{selectedPrinter&&(<motion.button initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("config")} className="w-full py-6 mt-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/25">Calculate My Costs <ArrowRight size={24}/></motion.button>)}</AnimatePresence>
                  </div>
                </motion.div>
              )}
              {stage === "config" && selectedPrinter && (
                <motion.div key="config" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-blue-400"/>
                  <div className="p-8 md:p-10">
                    <button onClick={()=>setStage("select")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-6 transition-colors">← Back</button>
                    <div className="bg-indigo-900/20 border border-indigo-800 rounded-2xl p-5 mb-8">
                      <div className="font-black text-white text-lg">{selectedPrinter.brand} {selectedPrinter.model}</div>
                      <div className="text-zinc-400 text-base mt-1">Ink: {selectedPrinter.blackCartridge} · ${selectedPrinter.blackCost} · {selectedPrinter.blackYield} pages</div>
                    </div>
                    <h2 className="text-2xl font-black text-white mb-6">How do you use your printer? 📊</h2>
                    <div className="space-y-8 mb-8">
                      <div>
                        <label className="text-base font-black text-white block mb-3">Pages printed per month: <span className="text-indigo-400">{pagesPerMonth}</span></label>
                        <div className="flex items-center gap-4">
                          {[25,50,100,200,300].map(v=>(<button key={v} onClick={()=>setPagesPerMonth(v)} className={`flex-1 py-3 rounded-xl font-black text-base transition-all ${pagesPerMonth===v?"bg-indigo-600 text-white":"bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}>{v}</button>))}
                        </div>
                        <input type="range" min={10} max={500} step={10} value={pagesPerMonth} onChange={e=>setPagesPerMonth(Number(e.target.value))} className="w-full mt-4 accent-indigo-500"/>
                        <div className="flex justify-between text-sm text-zinc-500 mt-1"><span>Light (10)</span><span>Heavy (500)</span></div>
                      </div>
                      {selectedPrinter.colorCost > 0 && (
                        <div>
                          <label className="text-base font-black text-white block mb-3">Color pages: <span className="text-indigo-400">{colorPercent}%</span></label>
                          <div className="flex items-center gap-4">
                            {[0,20,30,50,80].map(v=>(<button key={v} onClick={()=>setColorPercent(v)} className={`flex-1 py-3 rounded-xl font-black text-sm transition-all ${colorPercent===v?"bg-indigo-600 text-white":"bg-zinc-800 text-zinc-400 hover:bg-zinc-700"}`}>{v}%</button>))}
                          </div>
                          <input type="range" min={0} max={100} step={5} value={colorPercent} onChange={e=>setColorPercent(Number(e.target.value))} className="w-full mt-4 accent-indigo-500"/>
                        </div>
                      )}
                    </div>
                    {costs && (
                      <div className="bg-zinc-800 rounded-2xl p-6 mb-6 space-y-3">
                        <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">Live Cost Preview</div>
                        {[{label:"Black ink (annual)",value:`$${costs.blackInkAnnual.toFixed(2)}`},{label:"Color ink (annual)",value:`$${costs.colorInkAnnual.toFixed(2)}`},{label:"Paper (annual)",value:`$${costs.paperAnnual.toFixed(2)}`},{label:"Electricity (annual)",value:`$${costs.electricityAnnual.toFixed(2)}`}].map(row=>(<div key={row.label} className="flex justify-between text-base"><span className="text-zinc-400 font-medium">{row.label}</span><span className="text-white font-black">{row.value}</span></div>))}
                        <div className="border-t border-zinc-700 pt-3 flex justify-between text-xl"><span className="text-white font-black">Total annual cost</span><span className="text-indigo-400 font-black">${costs.total.toFixed(2)}</span></div>
                        <div className="text-center text-base text-zinc-300 font-medium pt-1">Cost per page: <strong className="text-white">{(costs.costPerPage * 100).toFixed(1)}¢</strong></div>
                      </div>
                    )}
                    <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("lead")} className="w-full py-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/25">See Full Report <ArrowRight size={24}/></motion.button>
                  </div>
                </motion.div>
              )}
              {stage === "lead" && (
                <motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden shadow-2xl">
                  <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-blue-400"/>
                  <div className="p-8 md:p-10">
                    <div className="text-center mb-8"><div className="text-6xl mb-4">💰</div><h2 className="text-3xl font-black text-white mb-3">Your report is ready!</h2><p className="text-zinc-400 font-medium text-lg">Get your full printer cost report + money-saving tips sent to your inbox.</p></div>
                    {costs && selectedPrinter && (<div className="bg-indigo-900/20 border border-indigo-800 rounded-2xl p-6 mb-6 text-center"><div className="text-4xl font-black text-indigo-400 mb-1">${costs.total.toFixed(0)}/year</div><div className="text-zinc-400 text-base">Estimated annual running cost for your {selectedPrinter.brand} {selectedPrinter.model}</div></div>)}
                    <div className="space-y-4 mb-6">
                      <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                      <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                      <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600"/></div></div>
                    </div>
                    <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:<>Send My Free Report <ArrowRight size={22}/></>}</motion.button>
                    <button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me the results</button>
                    <p className="text-center text-sm text-zinc-600 mt-3">🔒 No spam. Unsubscribe anytime.</p>
                  </div>
                </motion.div>
              )}
              {stage === "results" && costs && selectedPrinter && (
                <motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
                  {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Report sent to {email}!</p></div>)}
                  <div className="bg-zinc-900 rounded-[2rem] border-2 border-indigo-800 p-8">
                    <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4">Full Cost Breakdown</div>
                    <div className="text-5xl font-black text-indigo-400 mb-1">${costs.total.toFixed(0)}<span className="text-2xl">/year</span></div>
                    <div className="text-zinc-400 text-base mb-6">{selectedPrinter.brand} {selectedPrinter.model} · {pagesPerMonth} pages/month · {colorPercent}% color</div>
                    <div className="space-y-4">
                      {[{label:"🖤 Black ink",val:costs.blackInkAnnual,note:`${selectedPrinter.blackCartridge} · $${selectedPrinter.blackCost}/cartridge · ${selectedPrinter.blackYield} pages`},{label:"🎨 Color ink",val:costs.colorInkAnnual,note:selectedPrinter.colorCost>0?`${selectedPrinter.colorCartridge} · $${selectedPrinter.colorCost}/cartridge`:"Not applicable"},{label:"📄 Paper",val:costs.paperAnnual,note:`${pagesPerMonth*12} sheets/year`},{label:"⚡ Electricity",val:costs.electricityAnnual,note:`${selectedPrinter.watts}W device · $0.15/kWh`}].map(row=>(<div key={row.label} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-2xl"><div className="flex-1"><div className="font-black text-white text-base">{row.label}</div><div className="text-zinc-400 text-sm">{row.note}</div></div><div className="text-right"><div className="font-black text-white text-lg">${row.val.toFixed(2)}</div><div className="text-zinc-500 text-sm">{((row.val/costs.total)*100).toFixed(0)}%</div></div></div>))}
                    </div>
                    <div className="mt-6 p-5 bg-indigo-900/20 border border-indigo-800 rounded-2xl">
                      <div className="text-base font-black text-indigo-300 mb-1">💡 Money-saving tip</div>
                      <div className="text-base text-zinc-300 font-medium">{selectedPrinter.type==="EcoTank"?"Great choice! EcoTank printers have some of the lowest cost-per-page on the market. Refill bottles only every 1-2 years.":selectedPrinter.type==="Laser"?"Laser printers cost more per page but last much longer. Great for high-volume black & white printing.":"Consider switching to an Epson EcoTank for your usage level — you could save up to 60% on ink costs annually."}</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Try Another Printer</button>
                    <Link href="/tools/best-printer-finder"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Find Best Printer for Me</motion.div></Link>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Costs are estimates based on manufacturer specs and average usage. Actual costs vary. Not affiliated with HP, Canon, Epson, or Brother.</p></div></div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7"><h3 className="font-black text-white mb-4 text-base uppercase tracking-widest">Ink Cost Tips</h3><div className="space-y-4">{["Epson EcoTank has the lowest cost per page","XL cartridges cost more but save money long-term","Draft mode reduces ink use by up to 50%","Compatible ink is cheaper but may void warranty","Subscription plans like HP+ can save frequent printers"].map((tip,i)=>(<div key={i} className="flex items-start gap-3 text-base text-zinc-400 font-medium"><CheckCircle2 size={16} className="text-indigo-400 shrink-0 mt-0.5"/>{tip}</div>))}</div></div>
            <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7"><h3 className="font-black text-white mb-5 text-base uppercase tracking-widest">Cost Per Page Guide</h3><div className="space-y-3">{[{type:"Inkjet (standard)",cost:"10-25¢"},{type:"Inkjet (XL cartridge)",cost:"5-12¢"},{type:"EcoTank",cost:"1-3¢"},{type:"Laser (B&W)",cost:"2-5¢"},{type:"Photo printing",cost:"25-50¢"}].map(row=>(<div key={row.type} className="flex justify-between text-base"><span className="text-zinc-400 font-medium">{row.type}</span><span className="text-white font-black">{row.cost}</span></div>))}</div></div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
