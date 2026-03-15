"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, AlertCircle } from "lucide-react";

const bgs = [{ url:"https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1200", type:"image" as const, theme:"dark" as const },{ url:"https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=1200", type:"image" as const, theme:"dark" as const }];

const GPS_UPDATE_DATA = {
  Garmin: {
    software: "Garmin Express",
    downloadUrl: "https://www.garmin.com/en-US/software/express",
    steps: ["Download Garmin Express from garmin.com/express on your computer","Connect your Garmin GPS to your computer using the USB cable that came with it","Open Garmin Express — it will automatically detect your device","Click 'Add Device' if it's your first time","Click 'Check for Updates' — Garmin Express will show available map updates","Click 'Install All' and wait. Large map updates can take 30-60 minutes","Once complete, safely eject your device and disconnect the USB cable","Your GPS now has the latest maps!"],
    updateFrequency: "Every 3-6 months",
    updateSize: "2-8 GB (varies by region)",
    cost: "Free with Lifetime Maps models, or $29-89 for a single update",
    tip: "Garmin releases map updates quarterly. The Garmin DriveSmart series includes lifetime map updates."
  },
  TomTom: {
    software: "MyDrive Connect",
    downloadUrl: "https://www.tomtom.com/mydrive-connect",
    steps: ["Download MyDrive Connect from tomtom.com on your computer","Connect your TomTom GPS using its USB cable","Open MyDrive Connect — it will find your device automatically","Sign in with your TomTom account (free to create)","Click 'Updates Available' to see what's new","Download and install your map update — this may take 45-90 minutes","When complete, disconnect your TomTom safely","Your maps are now up to date!"],
    updateFrequency: "Every 3 months",
    updateSize: "1-5 GB",
    cost: "Free for 1 year with new device, then $9.99-$49.99/update",
    tip: "TomTom GO models include free lifetime map updates. Always check your subscription status first."
  },
  "In-car GPS": {
    software: "your car manufacturer's app",
    downloadUrl: "",
    steps: ["Check your car manual for the navigation system brand (often HERE Maps, Bosch, or Garmin)","Visit your car manufacturer's website (e.g., Toyota, Ford, Honda) and search 'map update'","Download the map update tool onto a USB drive (usually 8-32GB required)","With your engine running, insert the USB into your car's USB port","Follow the on-screen prompts — update takes 1-2 hours","Do not turn off your engine during the update","Remove USB when complete — your maps are updated"],
    updateFrequency: "Once or twice per year",
    updateSize: "8-32 GB",
    cost: "$69-$149 from your car dealer or manufacturer website",
    tip: "Many newer cars update automatically via Wi-Fi when connected at home. Check your car's settings menu first."
  },
  Magellan: {
    software: "Magellan Content Manager",
    downloadUrl: "https://www.magellangps.com/support",
    steps: ["Visit magellangps.com/support and download Magellan Content Manager","Install the software on your Windows computer (Mac not supported)","Connect your Magellan device via USB","Open Content Manager — it detects your device","Click 'Check for Updates' to see available maps","Purchase and download your map update","Install takes 30-60 minutes","Disconnect safely when complete"],
    updateFrequency: "1-2 times per year",
    updateSize: "1-3 GB",
    cost: "$29-$59 per update",
    tip: "Magellan has limited ongoing support. If your device is very old, consider upgrading to a Garmin or TomTom."
  }
};

const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const YEARS = [2024,2023,2022,2021,2020,2019,2018,"Never updated / Don't know"];

function getUrgency(brand: string, month: string, year: string | number) {
  if (year === "Never updated / Don't know") return { level: "critical", label: "🔴 Critical — Update Immediately", color: "text-red-400", bg: "bg-red-900/30 border-red-700", months: "Unknown" };
  const now = new Date();
  const updateDate = new Date(`${month} 1, ${year}`);
  const monthsDiff = Math.floor((now.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24 * 30));
  if (monthsDiff >= 24) return { level: "critical", label: "🔴 Critical — Very Outdated", color: "text-red-400", bg: "bg-red-900/30 border-red-700", months: `${monthsDiff} months ago` };
  if (monthsDiff >= 12) return { level: "high", label: "🟠 High Priority — Update Soon", color: "text-orange-400", bg: "bg-orange-900/30 border-orange-700", months: `${monthsDiff} months ago` };
  if (monthsDiff >= 6) return { level: "medium", label: "🟡 Due for Update", color: "text-amber-400", bg: "bg-amber-900/30 border-amber-700", months: `${monthsDiff} months ago` };
  return { level: "good", label: "🟢 Recently Updated", color: "text-green-400", bg: "bg-green-900/30 border-green-700", months: `${monthsDiff} months ago` };
}

export default function Client() {
  const [stage, setStage] = useState<"select"|"date"|"lead"|"results">("select");
  const [brand, setBrand] = useState("");
  const [month, setMonth] = useState("January");
  const [year, setYear] = useState<string|number>(2023);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");
  const urgency = brand && year ? getUrgency(brand, month, year) : null;
  const data = GPS_UPDATE_DATA[brand as keyof typeof GPS_UPDATE_DATA];
  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, phone, brand, issue: `GPS Update Scheduler — ${brand} — Last updated: ${month} ${year} — ${urgency?.label}`, source:"gps-update-scheduler" }) }); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">GPS Update Scheduler</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Tool · 3 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">GPS Update<br/><span className="bg-gradient-to-r from-cyan-400 to-blue-300 bg-clip-text text-transparent italic">Scheduler</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Find out how outdated your GPS maps are — and get a plain-English, step-by-step update guide specific to your exact device.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage === "select" && (
            <motion.div key="select" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-400"/>
              <div className="p-8 md:p-10">
                <h2 className="text-3xl font-black text-white mb-4">Which GPS brand do you have? 🧭</h2>
                <div className="grid grid-cols-2 gap-4 mb-8">
                  {Object.keys(GPS_UPDATE_DATA).map(b=>(<motion.button key={b} whileTap={{scale:0.96}} onClick={()=>setBrand(b)} className={`p-6 rounded-2xl border-2 font-bold text-lg transition-all text-left ${brand===b?"border-cyan-500 bg-cyan-900/20 text-white":"border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-cyan-700"}`}>{b==="Garmin"?"🟠":b==="TomTom"?"🔴":b==="Magellan"?"🔵":"🚗"} {b}{brand===b&&<CheckCircle2 size={18} className="ml-2 inline text-cyan-400"/>}</motion.button>))}
                </div>
                <AnimatePresence>{brand&&(<motion.button initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("date")} className="w-full py-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25">Continue with {brand} <ArrowRight size={24}/></motion.button>)}</AnimatePresence>
              </div>
            </motion.div>
          )}
          {stage === "date" && (
            <motion.div key="date" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-400"/>
              <div className="p-8 md:p-10">
                <button onClick={()=>setStage("select")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors">← Back</button>
                <h2 className="text-3xl font-black text-white mb-2">When did you last update your maps?</h2>
                <p className="text-zinc-400 text-lg font-medium mb-8">Best guess is fine. We'll calculate how outdated your GPS is.</p>
                <div className="grid grid-cols-2 gap-4 mb-6">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-3">Month</label><select value={month} onChange={e=>setMonth(e.target.value)} className="w-full py-4 px-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-lg font-medium focus:outline-none focus:border-cyan-500">{MONTHS.map(m=>(<option key={m}>{m}</option>))}</select></div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-3">Year</label><select value={year} onChange={e=>setYear(e.target.value)} className="w-full py-4 px-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white text-lg font-medium focus:outline-none focus:border-cyan-500">{YEARS.map(y=>(<option key={y}>{y}</option>))}</select></div>
                </div>
                {urgency && (<div className={`p-5 rounded-2xl border mb-6 ${urgency.bg}`}><div className={`text-xl font-black ${urgency.color}`}>{urgency.label}</div><div className="text-zinc-400 text-base mt-1">Last updated: {typeof year === "number" ? `${month} ${year}` : "Unknown"} {urgency.months !== "Unknown" && `(${urgency.months})`}</div></div>)}
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("lead")} className="w-full py-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25">Get My Update Guide <ArrowRight size={24}/></motion.button>
              </div>
            </motion.div>
          )}
          {stage === "lead" && (
            <motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-400"/>
              <div className="p-8 md:p-10">
                <div className="text-center mb-8"><div className="text-6xl mb-4">📅</div><h2 className="text-3xl font-black text-white mb-3">Your update guide is ready!</h2><p className="text-zinc-400 font-medium text-lg">Get your step-by-step {brand} update guide sent to your email — plain English, no jargon.</p></div>
                {urgency&&(<div className={`p-5 rounded-2xl border mb-6 ${urgency.bg}`}><div className={`text-xl font-black ${urgency.color}`}>{urgency.label}</div></div>)}
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-lg placeholder:text-zinc-600"/></div></div>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-cyan-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:"Send My Free Guide"}</motion.button>
                <button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me the steps</button>
              </div>
            </motion.div>
          )}
          {stage === "results" && data && urgency && (
            <motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
              {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Guide sent to {email}!</p></div>)}
              <div className={`rounded-[2rem] border-2 p-8 ${urgency.bg}`}>
                <div className={`text-2xl font-black ${urgency.color} mb-2`}>{urgency.label}</div>
                <div className="text-zinc-300 text-base font-medium">Your {brand} GPS · Last updated: {typeof year==="number"?`${month} ${year}`:"Unknown"}</div>
                <div className="grid grid-cols-3 gap-4 mt-6">
                  {[{label:"Update Tool",val:data.software},{label:"Update Size",val:data.updateSize},{label:"Cost",val:data.cost.split(",")[0]}].map(i=>(<div key={i.label} className="bg-zinc-900/50 rounded-xl p-4"><div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">{i.label}</div><div className="font-black text-white text-sm">{i.val}</div></div>))}
                </div>
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h3 className="text-2xl font-black text-white mb-6">Step-by-Step Update Guide for {brand}</h3>
                <div className="space-y-4">
                  {data.steps.map((step, i)=>(<motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}} className="flex items-start gap-4 p-4 bg-zinc-800 rounded-2xl"><div className="w-9 h-9 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">{i+1}</div><p className="text-base text-zinc-300 font-medium leading-relaxed">{step}</p></motion.div>))}
                </div>
                <div className="mt-6 p-5 bg-cyan-900/20 border border-cyan-800 rounded-2xl"><div className="flex items-start gap-3"><AlertCircle size={16} className="text-cyan-400 mt-0.5 shrink-0"/><p className="text-base text-cyan-300 font-medium">{data.tip}</p></div></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={()=>setStage("select")} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Start Over</button>
                <Link href="/tools/road-trip-checker"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Road Trip Pre-Check</motion.div></Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
