"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, DollarSign, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1522869635100-9f4c5e86aa37?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1522199755839-a2bacb67c546?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

interface Sub { id: string; name: string; category: string; avgCost: number; emoji: string; overlap?: string[]; description: string; }

const ALL_SUBS: Sub[] = [
  { id:"netflix", name:"Netflix", category:"Streaming Video", avgCost:15.49, emoji:"🎬", overlap:["hulu","disney","peacock","paramount"], description:"Movies and TV shows" },
  { id:"hulu", name:"Hulu", category:"Streaming Video", avgCost:7.99, emoji:"📺", overlap:["netflix","disney","peacock"], description:"TV shows and some movies" },
  { id:"disney", name:"Disney+", category:"Streaming Video", avgCost:7.99, emoji:"🏰", overlap:["netflix","hulu"], description:"Disney, Marvel, Star Wars" },
  { id:"peacock", name:"Peacock", category:"Streaming Video", avgCost:5.99, emoji:"🦚", overlap:["netflix","hulu","nbc"], description:"NBC shows and movies" },
  { id:"paramount", name:"Paramount+", category:"Streaming Video", avgCost:5.99, emoji:"⛰️", overlap:["netflix"], description:"CBS shows and movies" },
  { id:"hbomax", name:"Max (HBO)", category:"Streaming Video", avgCost:15.99, emoji:"🎭", overlap:["netflix"], description:"HBO shows and movies" },
  { id:"amazonprime", name:"Amazon Prime Video", category:"Streaming Video", avgCost:8.99, emoji:"📦", overlap:["netflix"], description:"Amazon originals and movies" },
  { id:"spotify", name:"Spotify", category:"Music", avgCost:10.99, emoji:"🎵", overlap:["apple-music","amazon-music"], description:"Music streaming" },
  { id:"apple-music", name:"Apple Music", category:"Music", avgCost:10.99, emoji:"🍎", overlap:["spotify","amazon-music"], description:"Music streaming for iPhone" },
  { id:"amazon-music", name:"Amazon Music Unlimited", category:"Music", avgCost:8.99, emoji:"🎶", overlap:["spotify","apple-music"], description:"Music streaming" },
  { id:"icloud", name:"iCloud Storage", category:"Storage/Backup", avgCost:0.99, emoji:"☁️", overlap:[], description:"Apple device backup & photos" },
  { id:"google-one", name:"Google One", category:"Storage/Backup", avgCost:1.99, emoji:"🔵", overlap:["icloud"], description:"Google Drive storage" },
  { id:"antivirus", name:"Norton/McAfee Antivirus", category:"Security", avgCost:8.33, emoji:"🛡️", overlap:[], description:"Computer security software" },
  { id:"vpn", name:"VPN Service", category:"Security", avgCost:6.99, emoji:"🔒", overlap:[], description:"Online privacy protection" },
  { id:"microsoft365", name:"Microsoft 365", category:"Productivity", avgCost:6.99, emoji:"💻", overlap:[], description:"Word, Excel, PowerPoint" },
  { id:"adobe", name:"Adobe Acrobat", category:"Productivity", avgCost:12.99, emoji:"📄", overlap:[], description:"PDF editing" },
  { id:"nytimes", name:"NY Times / News", category:"News", avgCost:4.99, emoji:"📰", overlap:[], description:"Online newspaper" },
  { id:"audible", name:"Audible Audiobooks", category:"Books/Audio", avgCost:14.95, emoji:"🎧", overlap:[], description:"Audiobook subscription" },
];

const CATEGORIES = ["All", ...Array.from(new Set(ALL_SUBS.map(s=>s.category)))];

export default function Client() {
  const [stage, setStage] = useState<"select"|"lead"|"results">("select");
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [filterCat, setFilterCat] = useState("All");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const toggle = (id: string) => { const n = new Set(selected); n.has(id)?n.delete(id):n.add(id); setSelected(n); };
  const selectedSubs = ALL_SUBS.filter(s=>selected.has(s.id));
  const totalMonthly = selectedSubs.reduce((sum,s)=>sum+s.avgCost,0);
  const totalAnnual = totalMonthly * 12;

  // Find overlaps
  const overlaps: {sub: Sub, overlap: Sub}[] = [];
  selectedSubs.forEach(sub=>{
    sub.overlap?.forEach(ovId=>{
      if(selected.has(ovId)) {
        const ovSub = ALL_SUBS.find(s=>s.id===ovId);
        if(ovSub && !overlaps.find(o=>(o.sub.id===ovId&&o.overlap.id===sub.id))) overlaps.push({sub,overlap:ovSub});
      }
    });
  });

  // Category grouping for results
  const byCategory: Record<string, Sub[]> = {};
  selectedSubs.forEach(s=>{ if(!byCategory[s.category]) byCategory[s.category]=[]; byCategory[s.category].push(s); });

  const validate = () => { const e: Record<string,string> = {}; if(!name.trim()) e.name="Please enter your name"; if(!email.trim()||!email.includes("@")) e.email="Please enter a valid email"; setErrors(e); return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,phone,issue:`Subscription Audit — $${totalMonthly.toFixed(2)}/mo — ${selected.size} subscriptions`,source:"subscription-audit"})}); } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = ()=>{ setStage("select"); setSelected(new Set()); setSubmitted(false); setName(""); setEmail(""); setPhone(""); };
  const filtered = filterCat==="All"?ALL_SUBS:ALL_SUBS.filter(s=>s.category===filterCat);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Subscription Audit</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Tool · 4 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Tech Subscription<br/><span className="bg-gradient-to-r from-teal-400 to-cyan-300 bg-clip-text text-transparent italic">Audit</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Tick which services you subscribe to. We'll add up your total monthly cost, find overlapping subscriptions, and tell you exactly which ones you could cancel.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage==="select"&&(
            <motion.div key="select" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-6">
              {/* Running total */}
              {selected.size>0&&(<motion.div initial={{opacity:0,scale:0.95}} animate={{opacity:1,scale:1}} className="bg-teal-900/30 border border-teal-700 rounded-[2rem] p-6 flex items-center justify-between">
                <div><div className="text-sm font-black text-teal-400 uppercase tracking-widest">Current total</div><div className="text-4xl font-black text-white">${totalMonthly.toFixed(2)}<span className="text-xl text-zinc-400">/month</span></div><div className="text-zinc-400 text-base mt-1">${totalAnnual.toFixed(0)}/year · {selected.size} subscriptions</div></div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("lead")} className="bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-black text-base px-6 py-4 rounded-2xl flex items-center gap-2 shadow-lg">Get Report <ArrowRight size={18}/></motion.button>
              </motion.div>)}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-cyan-400"/>
                <div className="p-8">
                  <h2 className="text-2xl font-black text-white mb-4">Select all your current subscriptions 📊</h2>
                  <p className="text-zinc-400 text-base mb-6">Tick everything you pay for monthly or yearly.</p>
                  <div className="flex flex-wrap gap-2 mb-6">{CATEGORIES.map(c=>(<button key={c} onClick={()=>setFilterCat(c)} className={`px-4 py-2 rounded-full font-bold text-sm border-2 transition-all ${filterCat===c?"bg-teal-600 border-teal-600 text-white":"bg-zinc-800 border-zinc-700 text-zinc-400 hover:border-zinc-500"}`}>{c}</button>))}</div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {filtered.map(sub=>(<motion.button key={sub.id} whileTap={{scale:0.97}} onClick={()=>toggle(sub.id)}
                      className={`flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${selected.has(sub.id)?"border-teal-500 bg-teal-900/20":"border-zinc-700 bg-zinc-800/50 hover:border-zinc-500"}`}>
                      <div className="text-3xl">{sub.emoji}</div>
                      <div className="flex-1"><div className="font-black text-white text-base">{sub.name}</div><div className="text-zinc-400 text-sm">${sub.avgCost.toFixed(2)}/mo · {sub.description}</div></div>
                      <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${selected.has(sub.id)?"bg-teal-500 border-teal-500":"border-zinc-600"}`}>{selected.has(sub.id)&&<CheckCircle2 size={14} className="text-white"/>}</div>
                    </motion.button>))}
                  </div>
                </div>
              </div>
              {selected.size>=2&&(<motion.button initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("lead")} className="w-full py-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-teal-500/25">Audit My Subscriptions <ArrowRight size={24}/></motion.button>)}
            </motion.div>
          )}
          {stage==="lead"&&(
            <motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-teal-500 to-cyan-400"/>
              <div className="p-8 md:p-10">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">💰</div>
                  <h2 className="text-3xl font-black text-white mb-3">Your audit is ready!</h2>
                  <div className="text-5xl font-black text-teal-400 mb-1">${totalMonthly.toFixed(2)}<span className="text-2xl text-zinc-400">/month</span></div>
                  <div className="text-zinc-400 text-lg">${totalAnnual.toFixed(0)}/year across {selected.size} subscriptions</div>
                  {overlaps.length>0&&(<div className="mt-4 p-3 bg-amber-900/20 border border-amber-700 rounded-xl"><div className="text-amber-300 font-bold text-base">⚠️ We found {overlaps.length} potential overlap{overlaps.length>1?"s":""} you could eliminate</div></div>)}
                </div>
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-teal-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-teal-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-teal-500 text-lg placeholder:text-zinc-600"/></div></div>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-teal-600 to-cyan-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-teal-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:<><DollarSign size={22}/>Send My Audit Report</>}</motion.button>
                <button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me the results</button>
              </div>
            </motion.div>
          )}
          {stage==="results"&&(
            <motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
              {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Audit sent to {email}!</p></div>)}
              <div className="bg-zinc-900 rounded-[2rem] border-2 border-teal-800 p-8">
                <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4">Your Subscription Total</div>
                <div className="text-5xl font-black text-teal-400 mb-1">${totalMonthly.toFixed(2)}<span className="text-2xl text-zinc-400">/month</span></div>
                <div className="text-zinc-400 text-lg mb-6">${totalAnnual.toFixed(0)}/year · {selectedSubs.length} subscriptions</div>
                <div className="space-y-3">
                  {Object.entries(byCategory).map(([cat,subs])=>(<div key={cat}><div className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">{cat}</div>{subs.map(s=>(<div key={s.id} className="flex items-center gap-3 p-3 bg-zinc-800 rounded-xl mb-2"><span className="text-xl">{s.emoji}</span><span className="flex-1 font-medium text-white">{s.name}</span><span className="font-black text-white">${s.avgCost.toFixed(2)}/mo</span></div>))}</div>))}
                </div>
              </div>
              {overlaps.length>0&&(<div className="bg-amber-900/20 border border-amber-700 rounded-[2rem] p-8">
                <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3"><AlertCircle size={22} className="text-amber-400"/>Potential Overlaps Found</h3>
                <div className="space-y-4">{overlaps.map((o,i)=>(<div key={i} className="bg-zinc-900/50 rounded-2xl p-5"><div className="font-black text-white text-base mb-1">{o.sub.emoji} {o.sub.name} overlaps with {o.overlap.emoji} {o.overlap.name}</div><div className="text-zinc-400 text-sm">Both offer similar content. You could save ${Math.min(o.sub.avgCost,o.overlap.avgCost).toFixed(2)}/month by cancelling one.</div></div>))}</div>
                <div className="mt-4 p-4 bg-amber-900/30 rounded-xl"><div className="text-amber-300 font-black text-lg">Potential savings: ${overlaps.reduce((s,o)=>s+Math.min(o.sub.avgCost,o.overlap.avgCost),0).toFixed(2)}/month (${(overlaps.reduce((s,o)=>s+Math.min(o.sub.avgCost,o.overlap.avgCost),0)*12).toFixed(0)}/year)</div></div>
              </div>)}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Start Over</button><Link href="/tools/smart-home-matcher"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Smart Home Matcher</motion.div></Link></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
