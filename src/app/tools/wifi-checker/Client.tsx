"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, AlertCircle, Plus, Minus } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1606904825846-647eb07f5be2?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
];

const DEVICE_CATEGORIES = [
  { id:"phones", label:"Smartphones & cell phones", icon:"📱", bandwidthPerDevice:5, desc:"Each person's phone" },
  { id:"tablets", label:"Tablets & iPads", icon:"📲", bandwidthPerDevice:8, desc:"iPad, Kindle Fire, etc." },
  { id:"laptops", label:"Laptops & computers", icon:"💻", bandwidthPerDevice:10, desc:"Windows, Mac, Chromebook" },
  { id:"tvs", label:"Smart TVs", icon:"📺", bandwidthPerDevice:15, desc:"Netflix, streaming shows" },
  { id:"streaming", label:"Streaming sticks / boxes", icon:"📡", bandwidthPerDevice:15, desc:"Roku, Fire Stick, Apple TV" },
  { id:"speakers", label:"Smart speakers", icon:"🔊", bandwidthPerDevice:3, desc:"Echo, Google Home, HomePod" },
  { id:"cameras", label:"Security cameras", icon:"📷", bandwidthPerDevice:5, desc:"Ring, Blink, Nest cameras" },
  { id:"game", label:"Gaming consoles", icon:"🎮", bandwidthPerDevice:25, desc:"Xbox, PlayStation, Switch" },
  { id:"doorbell", label:"Video doorbells", icon:"🔔", bandwidthPerDevice:4, desc:"Ring, Nest doorbell" },
  { id:"thermostat", label:"Smart thermostats / plugs", icon:"🌡️", bandwidthPerDevice:1, desc:"Nest, Ecobee, smart plugs" },
];

const ROUTER_SPEEDS = [
  { id:"slow", label:"Basic (25-50 Mbps)", speed:25, desc:"Older plan or basic cable", devices:"Good for 3-5 devices" },
  { id:"medium", label:"Standard (100-200 Mbps)", speed:100, desc:"Most home internet plans", devices:"Good for 8-12 devices" },
  { id:"fast", label:"Fast (300-500 Mbps)", speed:300, desc:"Higher-tier cable/fiber", devices:"Good for 15-20 devices" },
  { id:"ultra", label:"Gigabit (500+ Mbps)", speed:500, desc:"Fiber internet", devices:"Good for 20+ devices" },
  { id:"unknown", label:"I don't know", speed:100, desc:"We'll use the average", devices:"" },
];

function getStatus(totalDevices: number, totalBandwidth: number, routerSpeed: number) {
  const load = (totalBandwidth / routerSpeed) * 100;
  if (totalDevices === 0) return null;
  if (load < 50) return { level:"great", label:"🟢 Your Wi-Fi can easily handle this", color:"text-green-400", bg:"bg-green-900/30 border-green-700", bar:"from-green-500 to-emerald-400", load };
  if (load < 80) return { level:"good", label:"🟡 Your Wi-Fi is managing — but near capacity", color:"text-amber-400", bg:"bg-amber-900/30 border-amber-700", bar:"from-amber-500 to-yellow-400", load };
  if (load < 120) return { level:"busy", label:"🟠 Your Wi-Fi is overloaded — speed issues likely", color:"text-orange-400", bg:"bg-orange-900/30 border-orange-700", bar:"from-orange-500 to-amber-400", load };
  return { level:"critical", label:"🔴 Serious overload — time to upgrade your router", color:"text-red-400", bg:"bg-red-900/30 border-red-700", bar:"from-red-500 to-rose-400", load };
}

export default function Client() {
  const [stage, setStage] = useState<"count"|"speed"|"lead"|"results">("count");
  const [counts, setCounts] = useState<Record<string,number>>({});
  const [routerSpeed, setRouterSpeed] = useState(100);
  const [routerLabel, setRouterLabel] = useState("Standard (100-200 Mbps)");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const totalDevices = Object.values(counts).reduce((a,b)=>a+b,0);
  const totalBandwidth = DEVICE_CATEGORIES.reduce((sum,cat)=>(sum + (counts[cat.id]||0)*cat.bandwidthPerDevice), 0);
  const status = getStatus(totalDevices, totalBandwidth, routerSpeed);

  const adjust = (id: string, delta: number) => { setCounts(prev=>({...prev,[id]:Math.max(0,(prev[id]||0)+delta)})); };

  const validate = () => { const e: Record<string,string> = {}; if(!name.trim()) e.name="Please enter your name"; if(!email.trim()||!email.includes("@")) e.email="Please enter a valid email"; setErrors(e); return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,phone,issue:`WiFi Checker — ${totalDevices} devices — ${status?.label} — ${routerLabel}`,source:"wifi-checker"})}); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = ()=>{setStage("count");setCounts({});setRouterSpeed(100);setName("");setEmail("");setPhone("");setSubmitted(false);};

  const fixes = [
    totalDevices > 15 ? "Consider a mesh Wi-Fi system (like Eero or Google Nest WiFi) — they extend coverage to every room." : null,
    status?.level === "critical" || status?.level === "busy" ? "Restart your router weekly by unplugging it for 30 seconds — this clears memory and improves speed." : null,
    counts.game > 0 ? "Connect your gaming console directly to your router with an Ethernet cable — this frees up Wi-Fi bandwidth significantly." : null,
    counts.tvs > 1 ? "Connect Smart TVs to the router with an Ethernet cable when possible — streaming uses the most bandwidth." : null,
    (status?.level === "critical" || status?.level === "busy") ? "Call your internet provider and ask about upgrading your speed — many seniors qualify for low-cost internet plans." : null,
    totalDevices > 10 ? "Set up a separate 'Guest Network' for less important devices — this keeps your main devices faster." : null,
  ].filter(Boolean) as string[];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Wi-Fi Checker</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-sky-500/10 border border-sky-500/30 text-sky-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Tool · 3 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Home Wi-Fi<br/><span className="bg-gradient-to-r from-sky-400 to-blue-300 bg-clip-text text-transparent italic">Overload Checker</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Count your connected devices and find out if your router can handle the load — get a plain-English plan to fix slow Wi-Fi in minutes.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage === "count" && (
            <motion.div key="count" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-6">
              {totalDevices > 0 && (
                <motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="bg-sky-900/30 border border-sky-700 rounded-[2rem] p-6 flex items-center justify-between">
                  <div><div className="text-sm font-black text-sky-400 uppercase tracking-widest">Total connected devices</div><div className="text-4xl font-black text-white">{totalDevices} <span className="text-xl text-zinc-400">devices</span></div><div className="text-zinc-400 text-base mt-1">Estimated bandwidth: ~{totalBandwidth} Mbps needed</div></div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("speed")} className="bg-gradient-to-r from-sky-600 to-blue-600 text-white font-black text-base px-6 py-4 rounded-2xl flex items-center gap-2 shadow-lg">Next <ArrowRight size={18}/></motion.button>
                </motion.div>
              )}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-sky-500 to-blue-400"/>
                <div className="p-8">
                  <h2 className="text-2xl font-black text-white mb-2">Count your connected devices 📶</h2>
                  <p className="text-zinc-400 text-base mb-6">Tap + for each device connected to your home Wi-Fi right now. Include every room.</p>
                  <div className="space-y-3">
                    {DEVICE_CATEGORIES.map(cat => (<div key={cat.id} className="flex items-center gap-4 p-5 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                      <div className="text-3xl">{cat.icon}</div>
                      <div className="flex-1"><div className="font-black text-white text-base">{cat.label}</div><div className="text-zinc-400 text-sm">{cat.desc}</div></div>
                      <div className="flex items-center gap-3">
                        <motion.button whileTap={{scale:0.9}} onClick={()=>adjust(cat.id,-1)} disabled={!counts[cat.id]} className="w-10 h-10 rounded-xl bg-zinc-700 hover:bg-zinc-600 flex items-center justify-center text-white font-black disabled:opacity-30 transition-all"><Minus size={18}/></motion.button>
                        <span className="w-10 text-center font-black text-white text-xl">{counts[cat.id]||0}</span>
                        <motion.button whileTap={{scale:0.9}} onClick={()=>adjust(cat.id,1)} className="w-10 h-10 rounded-xl bg-sky-600 hover:bg-sky-500 flex items-center justify-center text-white font-black transition-all"><Plus size={18}/></motion.button>
                      </div>
                    </div>))}
                  </div>
                </div>
              </div>
              {totalDevices >= 1 && (<motion.button initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("speed")} className="w-full py-6 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-sky-500/25">Check My Wi-Fi Speed <ArrowRight size={24}/></motion.button>)}
            </motion.div>
          )}
          {stage === "speed" && (
            <motion.div key="speed" initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-sky-500 to-blue-400"/>
              <div className="p-8 md:p-10">
                <button onClick={()=>setStage("count")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors">← Back</button>
                <h2 className="text-3xl font-black text-white mb-2">What's your internet speed? 🚀</h2>
                <p className="text-zinc-400 text-lg font-medium mb-8">Check your bill or call your provider if you're not sure. Or pick the closest option.</p>
                <div className="space-y-3 mb-8">
                  {ROUTER_SPEEDS.map(r=>(<motion.button key={r.id} whileTap={{scale:0.97}} onClick={()=>{setRouterSpeed(r.speed);setRouterLabel(r.label);}}
                    className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${routerSpeed===r.speed&&routerLabel===r.label?"border-sky-500 bg-sky-900/20":"border-zinc-700 bg-zinc-800/50 hover:border-sky-700"}`}>
                    <div className="flex-1"><div className="font-black text-white text-base">{r.label}</div><div className="text-zinc-400 text-sm">{r.desc}{r.devices?` · ${r.devices}`:""}</div></div>
                    {routerSpeed===r.speed&&routerLabel===r.label&&<CheckCircle2 size={20} className="text-sky-400 shrink-0"/>}
                  </motion.button>))}
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("lead")} className="w-full py-6 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-sky-500/25">Get My Wi-Fi Report <ArrowRight size={24}/></motion.button>
              </div>
            </motion.div>
          )}
          {stage === "lead" && status && (
            <motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-sky-500 to-blue-400"/>
              <div className="p-8 md:p-10">
                <div className="text-center mb-6"><div className="text-6xl mb-4">📶</div><h2 className="text-3xl font-black text-white mb-3">Your Wi-Fi report is ready!</h2><div className={`inline-block px-6 py-3 rounded-2xl border mb-3 ${status.bg}`}><span className={`text-xl font-black ${status.color}`}>{status.label}</span></div><p className="text-zinc-400 font-medium text-lg">Get your full report + plain-English tips to speed up your Wi-Fi sent to your inbox.</p></div>
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-sky-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-sky-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-sky-500 text-lg placeholder:text-zinc-600"/></div></div>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-sky-600 to-blue-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-sky-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:"Send My Wi-Fi Report"}</motion.button>
                <button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me the results</button>
              </div>
            </motion.div>
          )}
          {stage === "results" && status && (
            <motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
              {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Report sent to {email}!</p></div>)}
              <div className={`rounded-[2rem] border-2 p-8 ${status.bg}`}>
                <div className="flex items-center justify-between mb-5">
                  <div><div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">Wi-Fi Status</div><div className={`text-2xl font-black ${status.color} mb-1`}>{status.label}</div><div className="text-zinc-400 text-base">{totalDevices} devices · ~{totalBandwidth} Mbps needed · {routerLabel}</div></div>
                  <div className="text-right"><div className="text-sm text-zinc-400 font-medium">Load</div><div className={`text-5xl font-black ${status.color}`}>{Math.min(Math.round(status.load),200)}%</div></div>
                </div>
                <div className="h-5 bg-zinc-800 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:`${Math.min(status.load,100)}%`}} transition={{duration:1,delay:0.3}} className={`h-full bg-gradient-to-r ${status.bar} rounded-full`}/></div>
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h3 className="text-xl font-black text-white mb-5">Your Device Breakdown</h3>
                <div className="space-y-3">{DEVICE_CATEGORIES.filter(c=>(counts[c.id]||0)>0).map(c=>(<div key={c.id} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-2xl"><div className="text-2xl">{c.icon}</div><div className="flex-1"><div className="font-black text-white">{c.label}</div><div className="text-zinc-400 text-sm">{counts[c.id]} × ~{c.bandwidthPerDevice} Mbps each</div></div><div className="font-black text-white">{(counts[c.id]||0)*c.bandwidthPerDevice} Mbps</div></div>))}</div>
              </div>
              {fixes.length > 0 && (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-5 flex items-center gap-3"><AlertCircle size={20} className="text-sky-400"/>Plain-English Fixes for Faster Wi-Fi</h3>
                  <div className="space-y-4">{fixes.map((fix,i)=>(<motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}} className="flex items-start gap-4 p-5 bg-zinc-800 rounded-2xl"><div className="w-8 h-8 bg-gradient-to-br from-sky-500 to-blue-500 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">{i+1}</div><p className="text-base text-zinc-300 font-medium leading-relaxed">{fix}</p></motion.div>))}</div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Start Over</button>
                <Link href="/tools/smart-home-matcher"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Smart Home Matcher</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Bandwidth estimates are approximate. Not affiliated with any internet or router provider.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
