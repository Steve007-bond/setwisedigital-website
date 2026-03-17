"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, User, Loader2, Shield, Zap, RefreshCw, ArrowRight, AlertCircle, DollarSign } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const DEVICES = [
  {
    id:"garmin-drivesmart",
    name:"Garmin DriveSmart (55, 65, 76)",
    category:"Dedicated Car GPS",
    mapModel:"Lifetime Free Updates",
    emoji:"🟢",
    badge:"Free Forever",
    badgeColor:"bg-green-600",
    yearOneCost:0,
    yearTwoCost:0,
    yearThreeCost:0,
    color:"from-green-500 to-emerald-400",
    border:"border-green-700",
    bg:"bg-green-900/20",
    text:"text-green-300",
    howItWorks:"Garmin DriveSmart models come with free lifetime map updates included in the purchase price. Once you connect to Wi-Fi at home, the GPS checks for updates automatically and downloads them overnight. You never pay again for maps.",
    howToUpdate:"Connect to your home Wi-Fi → GPS checks for updates automatically → downloads while you sleep. That's it.",
    thingsToKnow:["Wi-Fi is required for updates — the GPS connects at home just like a phone","Updates happen every few months — your maps stay current","No subscription, no annual fee, no calling the company"],
    threeYearCost:0,
    verdict:"The best map update model available. Buy once, never pay for maps again.",
  },
  {
    id:"garmin-drive",
    name:"Garmin Drive 53 (entry level)",
    category:"Dedicated Car GPS",
    mapModel:"Lifetime Free Updates",
    emoji:"🟢",
    badge:"Free Forever",
    badgeColor:"bg-green-600",
    yearOneCost:0,
    yearTwoCost:0,
    yearThreeCost:0,
    color:"from-green-500 to-emerald-400",
    border:"border-green-700",
    bg:"bg-green-900/20",
    text:"text-green-300",
    howItWorks:"Garmin's entry-level Drive 53 also includes lifetime map updates. However, updates require connecting to a computer and using Garmin Express software — no built-in Wi-Fi on this model.",
    howToUpdate:"Connect GPS to computer via USB → open Garmin Express software (free) → click 'Update Maps' → takes 30–60 minutes.",
    thingsToKnow:["Requires a computer and USB cable for updates","Garmin Express software is free to download","Maps update every few months when you connect","No ongoing cost"],
    threeYearCost:0,
    verdict:"Great value — free maps forever, but you need a computer to update (not Wi-Fi like the DriveSmart models).",
  },
  {
    id:"tomtom-lifetime",
    name:"TomTom GO Comfort / GO Discover",
    category:"Dedicated Car GPS",
    mapModel:"Lifetime Free Updates via Wi-Fi",
    emoji:"🟢",
    badge:"Free Forever",
    badgeColor:"bg-green-600",
    yearOneCost:0,
    yearTwoCost:0,
    yearThreeCost:0,
    color:"from-green-500 to-emerald-400",
    border:"border-green-700",
    bg:"bg-green-900/20",
    text:"text-green-300",
    howItWorks:"TomTom GO models include free lifetime map updates via Wi-Fi. Connect to your home network and updates download automatically. TomTom releases 4 updates per year on their premium models.",
    howToUpdate:"Settings → Wi-Fi → connect to your home network → GPS downloads updates automatically.",
    thingsToKnow:["Free lifetime maps included — no subscription","TomTom releases 4 updates per year on premium GO models","GO Comfort = 2 updates per year","No ongoing cost"],
    threeYearCost:0,
    verdict:"Same as Garmin — free maps forever with Wi-Fi updates. Strong choice if you prefer TomTom's interface.",
  },
  {
    id:"factory-car-gps",
    name:"Factory Built-in Car Navigation",
    category:"Factory Navigation",
    mapModel:"Pay per update — varies by manufacturer",
    emoji:"🟡",
    badge:"Paid Updates",
    badgeColor:"bg-amber-600",
    yearOneCost:0,
    yearTwoCost:199,
    yearThreeCost:0,
    color:"from-amber-500 to-orange-400",
    border:"border-amber-700",
    bg:"bg-amber-900/20",
    text:"text-amber-300",
    howItWorks:"Factory navigation systems came pre-installed in your car but their maps don't update automatically. Every 1–3 years you'll need to buy a map update if you want current roads. These updates are sold by your car's brand (Honda, Toyota, BMW etc.) and typically cost $149–$299 each.",
    howToUpdate:"Buy a USB drive or SD card from your car dealer or manufacturer's website → insert into car → follow on-screen instructions. (See our Car Navigation Update Guide for step-by-step instructions per brand.)",
    thingsToKnow:["Map updates cost $149–$299 per update","Most owners update every 2–3 years","Roads change by up to 15% per year — outdated maps mean wrong turns","Car dealers often charge a service fee on top of the map price"],
    threeYearCost:199,
    verdict:"Pay once every 2–3 years when maps get too outdated. Not ideal but manageable — especially if your car drives mostly in familiar areas.",
  },
  {
    id:"garmin-inreach",
    name:"Garmin inReach / Explore Outdoor GPS",
    category:"Outdoor GPS with Satellite",
    mapModel:"Subscription required for satellite features",
    emoji:"🔴",
    badge:"Monthly Fee Required",
    badgeColor:"bg-red-600",
    yearOneCost:179,
    yearTwoCost:179,
    yearThreeCost:179,
    color:"from-red-500 to-rose-400",
    border:"border-red-700",
    bg:"bg-red-900/20",
    text:"text-red-300",
    howItWorks:"Garmin inReach devices use satellite communication — not cell towers. This means they work anywhere on Earth, even miles from the nearest road. But satellite messaging requires a monthly plan through Garmin's satellite network (Iridium). The Safety Plan at $14.99/month ($179/year) is the minimum to activate SOS and messaging.",
    howToUpdate:"Maps and satellite data update through the Garmin Explore app on your phone when connected to Wi-Fi. No additional map cost beyond the subscription.",
    thingsToKnow:["Subscription is required — device doesn't work for satellite features without it","Safety plan ($14.99/mo) gives SOS + basic messaging","Freedom plan ($34.99/mo) adds unlimited messaging","Can suspend subscription in summer/winter if you don't use it — $24.95 per suspended month"],
    threeYearCost:537,
    verdict:"The subscription is real and ongoing — but so is the capability. Working SOS anywhere on Earth is worth the cost for anyone venturing into remote areas. Suspend it in months you don't hike.",
  },
  {
    id:"google-maps",
    name:"Google Maps (on your phone)",
    category:"Phone Navigation App",
    mapModel:"Free — updates automatically",
    emoji:"🟢",
    badge:"Always Free",
    badgeColor:"bg-blue-600",
    yearOneCost:0,
    yearTwoCost:0,
    yearThreeCost:0,
    color:"from-blue-500 to-indigo-400",
    border:"border-blue-700",
    bg:"bg-blue-900/20",
    text:"text-blue-300",
    howItWorks:"Google Maps updates its maps continuously — roads that change this week will be reflected in Google Maps within days. There's no action required from you. It's part of your phone and always current.",
    howToUpdate:"Nothing to do. Maps update themselves via your phone's internet connection.",
    thingsToKnow:["Completely free — always has been, almost certainly always will be","Updates happen constantly in the background","Offline maps available — download your area for dead zones (Settings → Offline Maps)","Needs cell signal for live features — downloaded offline maps work without signal"],
    threeYearCost:0,
    verdict:"The best map update model of all — because there's nothing to update. Just use it.",
  },
];

export default function Client() {
  const [selectedDevice, setSelectedDevice] = useState<typeof DEVICES[0] | null>(null);
  const [compareMode, setCompareMode] = useState(false);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const validate = () => { const e: Record<string,string>={};if(!name.trim())e.name="Please enter your name";if(!email.trim()||!email.includes("@"))e.email="Please enter a valid email";setErrors(e);return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate())return;setSubmitting(true);
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,issue:`GPS Maps Guide — Device: ${selectedDevice?.name || "overview"}`,source:"gps-maps-explained"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setSelectedDevice(null);setCompareMode(false);setName("");setEmail("");setSubmitted(false);};

  const paidDevices = DEVICES.filter(d => d.threeYearCost > 0);
  const freeDevices = DEVICES.filter(d => d.threeYearCost === 0);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">GPS Maps Explained</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free Guide · Plain English · No Jargon
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Do I Have to Pay</span>
            <span className="block bg-gradient-to-r from-teal-400 via-cyan-300 to-blue-400 bg-clip-text text-transparent italic">for GPS Map Updates?</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Confusing? You're not alone. GPS lifetime maps, subscriptions, paid updates — explained in plain English. Pick your device and find out exactly what maps cost you over 3 years.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">
          {!selectedDevice ? (
            <motion.div key="main" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-8">

              {/* The key truth */}
              <div className="bg-gradient-to-br from-teal-900/40 to-cyan-900/20 border border-teal-700 rounded-[2rem] p-8">
                <h2 className="text-2xl font-black text-white mb-4">The honest answer in one sentence 💡</h2>
                <p className="text-xl text-zinc-200 font-medium leading-relaxed">Almost every Garmin and TomTom sold today includes free lifetime map updates. You already paid for them. The exception is factory built-in GPS — that usually requires a paid update every few years.</p>
              </div>

              {/* Free models */}
              <div>
                <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3"><CheckCircle2 size={22} className="text-green-400"/>These GPS options have free maps forever</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {freeDevices.map((device, i) => (
                    <motion.button key={device.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.07*i}} whileTap={{scale:0.97}}
                      onClick={() => setSelectedDevice(device)}
                      className="p-6 rounded-[2rem] border-2 border-green-800 bg-green-900/10 hover:bg-green-900/20 text-left transition-all group">
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-3xl">{device.emoji}</div>
                        <span className={`text-xs font-black text-white px-2.5 py-1.5 rounded-full ${device.badgeColor}`}>{device.badge}</span>
                      </div>
                      <h3 className="font-black text-white text-base mb-1">{device.name}</h3>
                      <div className="text-green-300 text-sm font-bold mb-1">{device.mapModel}</div>
                      <div className="text-zinc-400 text-xs">{device.category}</div>
                      <div className="mt-3 text-xs text-green-400 font-black opacity-0 group-hover:opacity-100 transition-opacity">Tap to learn more →</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* Paid models */}
              <div>
                <h2 className="text-2xl font-black text-white mb-5 flex items-center gap-3"><DollarSign size={22} className="text-amber-400"/>These have ongoing costs to know about</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {paidDevices.map((device, i) => (
                    <motion.button key={device.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.07*i}} whileTap={{scale:0.97}}
                      onClick={() => setSelectedDevice(device)}
                      className={`p-6 rounded-[2rem] border-2 ${device.border} ${device.bg} hover:opacity-90 text-left transition-all group`}>
                      <div className="flex items-center justify-between mb-3">
                        <div className="text-3xl">{device.emoji}</div>
                        <div className="text-right">
                          <span className={`text-xs font-black text-white px-2.5 py-1.5 rounded-full ${device.badgeColor}`}>{device.badge}</span>
                          <div className={`text-xs font-bold mt-1 ${device.text}`}>3-year cost: ${device.threeYearCost}</div>
                        </div>
                      </div>
                      <h3 className="font-black text-white text-base mb-1">{device.name}</h3>
                      <div className={`text-sm font-bold mb-1 ${device.text}`}>{device.mapModel}</div>
                      <div className="text-zinc-400 text-xs">{device.category}</div>
                      <div className={`mt-3 text-xs font-black opacity-0 group-hover:opacity-100 transition-opacity ${device.text}`}>Tap to learn more →</div>
                    </motion.button>
                  ))}
                </div>
              </div>

              {/* 3-year cost comparison */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h2 className="text-2xl font-black text-white mb-6">3-Year Map Cost Comparison 🧮</h2>
                <div className="space-y-3">
                  {DEVICES.map((d, i) => (
                    <motion.div key={d.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.06*i}} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-2xl">
                      <div className="text-2xl">{d.emoji}</div>
                      <div className="flex-1 min-w-0"><div className="font-black text-white text-sm truncate">{d.name}</div><div className="text-zinc-400 text-xs">{d.mapModel}</div></div>
                      <div className={`text-lg font-black shrink-0 ${d.threeYearCost === 0 ? "text-green-400" : "text-amber-400"}`}>
                        {d.threeYearCost === 0 ? "Free" : `$${d.threeYearCost}`}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Lead */}
              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Get this guide by email 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">Save the full GPS maps explainer to reference when you're ready to buy.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-teal-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-teal-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Send Me This Guide"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="font-bold text-green-300">Guide sent to {email}!</p></div>)}

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Prices and update policies may change. Not affiliated with Garmin, TomTom, or Google.</p></div></div>
            </motion.div>
          ) : (
            <motion.div key="detail" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-6">
              <button onClick={() => setSelectedDevice(null)} className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold transition-colors">← Back to all devices</button>

              <div className={`rounded-[2rem] border-2 ${selectedDevice.border} bg-zinc-900 overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${selectedDevice.color}`}/>
                <div className="p-8 md:p-10">
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div>
                      <div className="text-4xl mb-3">{selectedDevice.emoji}</div>
                      <h2 className="text-3xl font-black text-white mb-2">{selectedDevice.name}</h2>
                      <span className={`text-xs font-black text-white px-3 py-1.5 rounded-full ${selectedDevice.badgeColor}`}>{selectedDevice.badge}</span>
                    </div>
                    <div className="text-right shrink-0">
                      <div className="text-sm text-zinc-400 font-medium">3-Year Map Cost</div>
                      <div className={`text-4xl font-black ${selectedDevice.threeYearCost === 0 ? "text-green-400" : "text-amber-400"}`}>
                        {selectedDevice.threeYearCost === 0 ? "Free" : `$${selectedDevice.threeYearCost}`}
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-6 mb-5">
                    <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">How the map updates work</div>
                    <p className="text-base text-zinc-200 font-medium leading-relaxed">{selectedDevice.howItWorks}</p>
                  </div>

                  <div className={`p-5 rounded-2xl border ${selectedDevice.border} ${selectedDevice.bg} mb-5`}>
                    <div className={`text-sm font-black uppercase tracking-widest mb-2 ${selectedDevice.text}`}>How to update</div>
                    <p className="text-base text-zinc-300 font-medium leading-relaxed">{selectedDevice.howToUpdate}</p>
                  </div>

                  <div className="space-y-3 mb-5">
                    <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">Things to know</div>
                    {selectedDevice.thingsToKnow.map((t,i)=>(<div key={i} className="flex items-start gap-3"><CheckCircle2 size={16} className="text-teal-400 shrink-0 mt-0.5"/><p className="text-base text-zinc-300 font-medium">{t}</p></div>))}
                  </div>

                  <div className={`p-5 rounded-2xl border ${selectedDevice.border} ${selectedDevice.bg}`}>
                    <div className={`text-sm font-black uppercase tracking-widest mb-2 ${selectedDevice.text}`}>Our Verdict</div>
                    <p className="text-base text-zinc-200 font-bold leading-relaxed">{selectedDevice.verdict}</p>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => setSelectedDevice(null)} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>View All Devices</button>
                <Link href="/tools/gps-budget-finder"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS Budget Finder</motion.div></Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
