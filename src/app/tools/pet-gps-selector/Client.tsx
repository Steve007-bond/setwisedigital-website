"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, Star } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
];

const PET_TRACKERS = [
  { id:"fi-series3", name:"Fi Series 3 Smart Collar", price:"$149 + $99/yr", badge:"Best Overall Dog GPS", badgeColor:"bg-blue-600", emoji:"🐕", pets:["Dogs (large)"], range:"Unlimited via cellular + Wi-Fi","batteryLife":"3 months","subscription":"$99/yr","features":["Real-time GPS location on phone","Escape alerts — notified within seconds","Step counter and sleep tracking","Geofence home zone alerts","7-year GPS history","Built into collar — no attachment"], pros:["Best battery life available (3 months)","Cellular coverage everywhere","Extremely accurate","Built into stylish collar"], cons:["Only available in collar form","Monthly subscription required","Large dog minimum (20 lbs+)"], bestFor:"Dog owners who want the best battery life and don't want to recharge constantly" },
  { id:"whistle-go-explore", name:"Whistle Go Explore", price:"$79 + $9.95/mo", badge:"Best All-in-One Health + GPS", badgeColor:"bg-green-600", emoji:"🐾", pets:["Dogs","Cats"], range:"Unlimited cellular","batteryLife":"20 days","subscription":"$9.95–$14.95/mo","features":["GPS location tracking","Health monitoring — eating, licking, scratching","Fitness goals and activity tracking","Behavior change alerts","Vet alerts for unusual behavior","Works on dogs and cats"], pros:["Health monitoring is industry-leading","Reasonable monthly cost","Works on cats too","Vet report sharing"], cons:["Shorter battery life than Fi","Older design"], bestFor:"Pet owners who want health monitoring AND GPS location in one device" },
  { id:"garmin-alpha300i-collar", name:"Garmin TT 25 Dog Device", price:"$199 collar only", badge:"Best Hunting Dog GPS", badgeColor:"bg-amber-600", emoji:"🦴", pets:["Dogs (hunting)"], range:"9 miles LOS","batteryLife":"Up to 40 hours","subscription":"None (pairs with Alpha GPS)","features":["Real-time location on handheld GPS","Track up to 20 dogs simultaneously","Bark alerts and pointing alerts","Tone and vibration collar training","Audible signal for lost dog","IPX7 waterproof"], pros:["Industry standard for hunting dogs","No subscription required","Best range for rural hunting areas","Works without phone signal"], cons:["Requires Garmin Alpha handheld GPS ($700+)","Hunting-specific, not everyday use"], bestFor:"Hunters who use dogs and need to track them in dense wilderness without cell signal" },
  { id:"tractive-gps-4", name:"Tractive GPS 4 Dog & Cat", price:"$49 + $4.99/mo", badge:"Best Budget GPS Tracker", badgeColor:"bg-purple-600", emoji:"🐱", pets:["Dogs","Cats"], range:"Worldwide cellular","batteryLife":"7 days","subscription":"$4.99–$11.99/mo","features":["Real-time GPS worldwide","Works in 150+ countries","Geofence virtual home zone","Location history 365 days","Free app on iOS and Android","Escape alert notifications"], pros:["Most affordable option","Works worldwide — great for travel","Works on cats and dogs","Simple app interface"], cons:["Shorter battery (7 days)","Smaller and can be lost by cats"], bestFor:"Budget-conscious pet owners or those who travel internationally with pets" },
  { id:"apple-airtag", name:"Apple AirTag (with attachment)", price:"$29 + no subscription", badge:"Best Budget No-Subscription", badgeColor:"bg-zinc-500", emoji:"📍", pets:["Dogs","Cats"], range:"Bluetooth + Apple Find My","batteryLife":"1 year (CR2032)","subscription":"None","features":["Location via Apple Find My network","1-year battery life (replaceable)","Plays sound when nearby","Millions of Apple devices network","No monthly fee ever","Works with standard collar attachment"], pros:["No subscription ever","1-year battery","Huge Apple Find My network","Very affordable"], cons:["NOT real-time GPS — location needs nearby iPhone","Not designed for pets — needs aftermarket attachment","Less accurate in rural areas"], bestFor:"iPhone users who want basic pet tracking with no monthly fees — casual use only" },
];

export default function Client() {
  const [selected, setSelected] = useState<typeof PET_TRACKERS[0]|null>(null);
  const [stage, setStage] = useState<"browse"|"lead"|"results">("browse");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");
  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, phone, issue: `Pet GPS — Interested in: ${selected?.name}`, source:"pet-gps-selector" }) }); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = () => { setStage("browse"); setSelected(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Pet GPS Selector</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Guide</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Pet GPS<br/><span className="bg-gradient-to-r from-pink-400 to-rose-300 bg-clip-text text-transparent italic">Tracker Selector</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Dog, cat, or hunting dog? Compare the 5 best pet GPS trackers of 2025 — real-time location, escape alerts, subscription costs, and battery life — all in plain English.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage === "browse" && (
            <motion.div key="browse" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
              <div className="bg-zinc-800/50 border border-zinc-700 rounded-2xl p-5 text-sm text-zinc-400 font-medium">💡 <strong className="text-white">Key fact:</strong> Most pet GPS trackers need a monthly subscription for cellular service. The only exception is Apple AirTag, which uses Bluetooth and nearby iPhones — but it's not real-time GPS.</div>
              {PET_TRACKERS.map((tracker, i) => (
                <motion.div key={tracker.id} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:i*0.08}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-pink-500 to-rose-400"/>
                  <div className="p-8">
                    {i===0&&(<div className="flex items-center gap-2 mb-4"><Star size={16} className="text-amber-400 fill-amber-400"/><span className="text-amber-400 font-black text-sm uppercase tracking-widest">Top Pick</span></div>)}
                    <div className="flex items-start justify-between gap-4 mb-5">
                      <div><div className="text-4xl mb-2">{tracker.emoji}</div><h3 className="text-2xl font-black text-white mb-2">{tracker.name}</h3><span className={`${tracker.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{tracker.badge}</span></div>
                      <div className="text-right shrink-0"><div className="text-2xl font-black text-pink-400">{tracker.price}</div><div className="text-zinc-400 text-sm mt-1">{tracker.subscription !== "None" ? `+ ${tracker.subscription} subscription` : "No subscription!"}</div></div>
                    </div>
                    <div className="grid grid-cols-3 gap-3 mb-5">
                      {[{l:"Range",v:tracker.range},{l:"Battery",v:tracker.batteryLife},{l:"Works with",v:tracker.pets.join(", ")}].map(i=>(<div key={i.l} className="bg-zinc-800 rounded-xl p-3 text-center"><div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">{i.l}</div><div className="font-black text-white text-sm">{i.v}</div></div>))}
                    </div>
                    <div className="grid grid-cols-2 gap-4 mb-5">
                      <div><div className="text-sm font-black text-green-400 mb-2">✓ Pros</div>{tracker.pros.map(p=>(<div key={p} className="text-sm text-zinc-400 font-medium mb-1">• {p}</div>))}</div>
                      <div><div className="text-sm font-black text-red-400 mb-2">✗ Consider</div>{tracker.cons.map(c=>(<div key={c} className="text-sm text-zinc-400 font-medium mb-1">• {c}</div>))}</div>
                    </div>
                    <div className="bg-pink-900/20 border border-pink-800 rounded-xl p-3 mb-5"><p className="text-sm text-pink-300 font-medium">🎯 Best for: {tracker.bestFor}</p></div>
                    <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>{setSelected(tracker);setStage("lead");}} className="w-full py-4 bg-gradient-to-r from-pink-600 to-rose-500 text-white font-black text-base rounded-2xl flex items-center justify-center gap-2 shadow-lg">Get Full Details for This Tracker <ArrowRight size={18}/></motion.button>
                  </div>
                </motion.div>
              ))}
            </motion.div>
          )}
          {stage === "lead" && selected && (
            <motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-pink-500 to-rose-400"/>
              <div className="p-8 md:p-10">
                <div className="text-center mb-8"><div className="text-5xl mb-4">{selected.emoji}</div><h2 className="text-2xl font-black text-white mb-3">Get your free guide!</h2><p className="text-zinc-400 font-medium text-lg">Receive the full {selected.name} buying guide + setup tips by email.</p></div>
                <div className="bg-zinc-800 rounded-2xl p-5 mb-6"><div className="font-black text-white text-lg">{selected.name}</div><div className="text-zinc-400">{selected.badge} · {selected.price}</div></div>
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-pink-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-pink-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-pink-500 text-lg placeholder:text-zinc-600"/></div></div>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-pink-600 to-rose-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-pink-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:"Send My Free Guide"}</motion.button>
                <button onClick={()=>setStage("browse")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">← Back to compare all trackers</button>
              </div>
            </motion.div>
          )}
          {stage === "results" && selected && (
            <motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
              {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Guide sent to {email}!</p></div>)}
              <div className="bg-zinc-900 rounded-[2rem] border-2 border-pink-800 p-8">
                <div className="text-4xl mb-3">{selected.emoji}</div>
                <h2 className="text-3xl font-black text-white mb-2">{selected.name}</h2>
                <div className="text-2xl font-black text-pink-400 mb-4">{selected.price}</div>
                <div className="space-y-2 mb-6">{selected.features.map(f=>(<div key={f} className="flex items-center gap-2 text-base text-zinc-300 font-medium"><CheckCircle2 size={16} className="text-green-400 shrink-0"/>{f}</div>))}</div>
                <div className="bg-pink-900/20 border border-pink-800 rounded-xl p-4"><p className="text-base text-pink-300 font-medium">🎯 {selected.bestFor}</p></div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Compare All Trackers</button>
                <Link href="/tools/adventure-gps-selector"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Adventure GPS Selector</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Prices and subscription rates are approximate and subject to change. Not affiliated with Fi, Whistle, Garmin, Tractive, or Apple.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
