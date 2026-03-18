"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, User, Loader2, Shield, Zap, RefreshCw, Star, AlertCircle, XCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1551632811-561732d1e306?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const QUESTIONS = [
  {
    id:"who_contacts",
    title:"Who will need to reach you or check in with you?",
    subtitle:"This is actually the most important question — it's not just about what YOU can do, but what your family can easily use",
    options:[
      { v:"tech-savvy", label:"Family who are comfortable with apps", icon:"📱", desc:"They'll download an app and learn it", inreach:35, zoleo:25, spot:20 },
      { v:"older-family", label:"Older parents or relatives who aren't tech-savvy", icon:"👴", desc:"They need something simple — like a regular phone number", inreach:5, zoleo:45, spot:20 },
      { v:"solo", label:"Mainly for my own safety — check-ins optional", icon:"🧑", desc:"SOS and tracking are the priority", inreach:35, zoleo:25, spot:30 },
      { v:"work-team", label:"A work team or group of adventurers", icon:"👥", desc:"Multiple people need to communicate", inreach:30, zoleo:30, spot:20 },
    ],
  },
  {
    id:"adventure_type",
    title:"What kind of adventures are you planning?",
    subtitle:"Different environments have different communication challenges",
    options:[
      { v:"hiking", label:"Day hiking and overnight backpacking", icon:"🥾", desc:"Trails, national parks, wilderness areas", inreach:30, zoleo:30, spot:25 },
      { v:"remote", label:"Remote backcountry or international expeditions", icon:"🌍", desc:"Very remote, possibly other countries", inreach:45, zoleo:30, spot:10 },
      { v:"hunting", label:"Hunting and fishing in remote areas", icon:"🦌", desc:"Remote forests, northern Canada, Alaska", inreach:35, zoleo:30, spot:20 },
      { v:"mixed", label:"A mix — sometimes cell service, sometimes not", icon:"🗺️", desc:"Urban to wilderness and back", inreach:20, zoleo:40, spot:20 },
    ],
  },
  {
    id:"priority",
    title:"What matters most to you in this device?",
    subtitle:"Be honest — it shapes everything else",
    options:[
      { v:"sos-only", label:"SOS and basic safety — I mainly want peace of mind", icon:"🆘", desc:"The red button is what I really need", inreach:20, zoleo:30, spot:40 },
      { v:"two-way", label:"Real two-way messaging — I want to text properly", icon:"💬", desc:"Send and receive proper messages", inreach:45, zoleo:35, spot:15 },
      { v:"navigation", label:"Navigation + communication in one device", icon:"🗺️", desc:"GPS maps and messaging together", inreach:50, zoleo:20, spot:10 },
      { v:"budget", label:"The most affordable option that works reliably", icon:"💰", desc:"Value matters — good enough is fine", inreach:10, zoleo:35, spot:40 },
    ],
  },
  {
    id:"subscription",
    title:"How do you feel about monthly subscription costs?",
    subtitle:"All satellite communicators require a monthly or annual plan to work",
    options:[
      { v:"minimize", label:"I want the lowest monthly cost possible", icon:"💵", desc:"Minimal ongoing expense", inreach:10, zoleo:35, spot:40 },
      { v:"seasonal", label:"I'd suspend it in months I'm not outdoors", icon:"📅", desc:"Pay only when I'm adventuring", inreach:35, zoleo:30, spot:20 },
      { v:"annual", label:"Happy to pay annually for best value", icon:"💳", desc:"Annual plans save money", inreach:35, zoleo:35, spot:20 },
      { v:"flexible", label:"Cost doesn't matter — I want the best", icon:"💎", desc:"Performance over price", inreach:45, zoleo:25, spot:10 },
    ],
  },
];

const DEVICES = {
  inreach:{
    name:"Garmin inReach Mini 2",
    price:"$349 device",
    subscription:"From $14.99/month",
    annualCost:"From $179/year",
    emoji:"🔵",
    badge:"Best Overall — Most Reliable",
    badgeColor:"bg-blue-600",
    color:"from-blue-500 to-indigo-400",
    border:"border-blue-700",
    bg:"bg-blue-900/20",
    text:"text-blue-300",
    network:"Iridium — 100% global coverage including Canada and polar regions",
    pros:[
      "Most reliable satellite network — Iridium covers the entire planet",
      "Works as a standalone GPS device — doesn't need your phone",
      "Two-way messaging with 24/7 monitored SOS",
      "Weather forecasts downloaded via satellite",
      "Pairs with phone for full maps via Garmin Explore app",
      "Can suspend subscription in months you're not outdoors",
    ],
    cons:[
      "Contacts need to download Garmin Messenger app to reach you",
      "No dedicated phone number — slightly less convenient for family",
      "Higher upfront device cost",
      "Small screen — 1.2 inch display",
    ],
    bestFor:"Solo hikers, hunters, backcountry adventurers, and anyone in very remote or international locations who needs the most reliable connection possible.",
    subscriptionNote:"Safety Plan ($14.99/mo) = SOS + basic tracking. Freedom Plan ($34.99/mo) = unlimited messaging. Annual plans save ~15%.",
  },
  zoleo:{
    name:"ZOLEO Satellite Communicator",
    price:"$199 device",
    subscription:"From $20/month",
    annualCost:"From $240/year",
    emoji:"🟢",
    badge:"Best for Families — Simplest to Reach",
    badgeColor:"bg-green-600",
    color:"from-green-500 to-emerald-400",
    border:"border-green-700",
    bg:"bg-green-900/20",
    text:"text-green-300",
    network:"Iridium — 100% global coverage. Also uses Wi-Fi and cellular when available (saves satellite credits)",
    pros:[
      "Your own dedicated phone number — family texts you like a normal number",
      "Contacts don't need any special app — just text your number",
      "Seamlessly switches between satellite, Wi-Fi, and cellular (cheapest option active first)",
      "Least expensive device upfront",
      "24/7 SOS monitoring included in all plans",
      "Battery lasts 200+ hours in tracking mode",
    ],
    cons:[
      "Requires your phone for all messaging — device itself has no screen or keyboard",
      "Phone must be within Bluetooth range to send messages",
      "Slightly higher monthly subscription than Garmin Safety Plan",
    ],
    bestFor:"Anyone whose family isn't tech-savvy, drivers and overlanders who mix city and wilderness travel, and budget-conscious adventurers who want simplicity.",
    subscriptionNote:"Basic plan ($20/mo) includes SOS and tracking. Unlimited plan ($35/mo) adds messaging. Uses cell and Wi-Fi for free when available.",
  },
  spot:{
    name:"SPOT Gen4 or SPOT X",
    price:"$150–$249 device",
    subscription:"From $11.95/month",
    annualCost:"From $143/year",
    emoji:"🟡",
    badge:"Most Affordable — Basic SOS",
    badgeColor:"bg-amber-600",
    color:"from-amber-500 to-orange-400",
    border:"border-amber-700",
    bg:"bg-amber-900/20",
    text:"text-amber-300",
    network:"Globalstar — Good coverage in North America, but gaps in some remote areas and internationally",
    pros:[
      "Lowest monthly subscription cost",
      "Simple to use — large clear SOS button",
      "Good for North American adventures",
      "SPOT X has a built-in keyboard for messaging without a phone",
      "Established brand with long track record",
    ],
    cons:[
      "Globalstar network has coverage gaps vs Iridium — particularly in some remote Canadian/Alaskan areas",
      "Less reliable in dense forest canopy than Garmin inReach",
      "Not recommended for international or polar adventures",
      "SPOT Gen4 only sends — no two-way messaging",
    ],
    bestFor:"Casual adventurers in North America who mainly need SOS capability and don't venture into extremely remote areas.",
    subscriptionNote:"Gen4 from $11.95/mo (one-way messages + SOS). SPOT X from $19.95/mo (two-way messaging). Annual plans save money.",
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ inreach:0, zoleo:0, spot:0 });
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [sel, setSel] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const progress = (currentQ / QUESTIONS.length) * 100;
  const getWinner = () => {
    const max = Math.max(scores.inreach, scores.zoleo, scores.spot);
    if (scores.inreach === max) return "inreach";
    if (scores.zoleo === max) return "zoleo";
    return "spot";
  };

  const answer = (v: string, inreach: number, zoleo: number, spot: number) => {
    setSel(v);
    setTimeout(() => {
      setScores(prev => ({ inreach:prev.inreach+inreach, zoleo:prev.zoleo+zoleo, spot:prev.spot+spot }));
      setAnswers(prev => ({...prev,[QUESTIONS[currentQ].id]:v}));
      setSel(null);
      if (currentQ < QUESTIONS.length-1) setCurrentQ(p=>p+1);
      else setStage("results");
    }, 300);
  };

  const validate = () => { const e: Record<string,string>={};if(!name.trim())e.name="Please enter your name";if(!email.trim()||!email.includes("@"))e.email="Please enter a valid email";setErrors(e);return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate())return;setSubmitting(true);
    const winner = getWinner();
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email, issue:`Satellite Comm — Match: ${winner}`,source:"satellite-communicator-guide"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setStage("intro");setCurrentQ(0);setScores({inreach:0,zoleo:0,spot:0});setAnswers({});setSel(null);setName("");setEmail("");setSubmitted(false);};

  const winner = getWinner();
  const result = DEVICES[winner as keyof typeof DEVICES];
  const ranked = (["inreach","zoleo","spot"] as const).map(id=>({id,...DEVICES[id],score:scores[id]})).sort((a,b)=>b.score-a.score);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">Satellite Communicator Guide</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free · 4 Questions · Plain-English Match
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Garmin inReach,</span>
            <span className="block bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent italic">ZOLEO or SPOT?</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            All three let you call for help from anywhere on Earth. But they work very differently. 4 questions about your adventures, your family, and your budget — get a clear recommendation in plain English.
          </motion.p>
          <div className="flex flex-wrap gap-5">
            {[{icon:"🆘",t:"SOS from Anywhere"},{icon:"💬",t:"Two-Way Messaging"},{icon:"📍",t:"Live Location Sharing"},{icon:"🌍",t:"Works Worldwide"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {stage === "intro" && (
            <motion.div key="intro" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-5">
              <div className="bg-blue-900/20 border border-blue-700 rounded-[2rem] p-7">
                <h3 className="font-black text-white text-xl mb-3">What is a satellite communicator? 🛰️</h3>
                <p className="text-zinc-300 text-base font-medium leading-relaxed">A satellite communicator lets you call for help, send messages, and share your location from anywhere on Earth — even deep in the wilderness with zero cell signal. They connect directly to satellites in orbit, not to phone towers. If something goes wrong on a remote trail or hunting trip, this is what sends your location to rescue services and lets your family know you're okay.</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.values(DEVICES).map(device => (
                  <div key={device.name} className={`bg-zinc-900 rounded-[2rem] border ${device.border} overflow-hidden`}>
                    <div className={`h-1.5 bg-gradient-to-r ${device.color}`}/>
                    <div className="p-6 text-center">
                      <div className="text-4xl mb-3">{device.emoji}</div>
                      <h3 className="font-black text-white text-base mb-1">{device.name}</h3>
                      <div className={`text-sm font-bold ${device.text} mb-2`}>{device.badge}</div>
                      <div className="text-xl font-black text-white">{device.price}</div>
                      <div className="text-zinc-400 text-sm mt-1">{device.subscription}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-amber-900/20 border border-amber-700 rounded-2xl p-5 flex items-start gap-3">
                <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5"/>
                <p className="text-base text-amber-200 font-medium"><strong>Important:</strong> All three require a monthly or annual subscription to work. There's no one-time purchase option — the satellite network charges an ongoing fee. This is worth knowing before you buy.</p>
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 md:p-10">
                <h2 className="text-2xl font-black text-white mb-4">Which one is right for you? 🎯</h2>
                <p className="text-zinc-400 text-lg font-medium mb-6">4 honest questions about who you're adventuring with, where you're going, and what you really need. Get a clear match with a plain-English reason why.</p>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-green-500/30">
                  Find My Satellite Communicator Match <ArrowRight size={24}/>
                </motion.button>
              </div>
            </motion.div>
          )}

          {stage === "quiz" && (() => { const q = QUESTIONS[currentQ]; return (
            <motion.div key={`q-${currentQ}`} initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}} transition={{type:"spring",stiffness:350,damping:30}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.5}}/></div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={()=>{if(currentQ===0)setStage("intro");else setCurrentQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold transition-colors group"><ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>Back</button>
                  <div className="flex gap-2">{QUESTIONS.map((_,i)=>(<div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i<currentQ?"bg-green-400":i===currentQ?"bg-white scale-125":"bg-zinc-700"}`}/>))}</div>
                  <span className="text-base font-black text-zinc-400">{currentQ+1} / {QUESTIONS.length}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                <p className="text-zinc-400 text-base mb-8">{q.subtitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt,i)=>(
                    <motion.button key={opt.v} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.06*i}} whileTap={{scale:0.97}}
                      onClick={()=>answer(opt.v,opt.inreach,opt.zoleo,opt.spot)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${sel===opt.v||answers[q.id]===opt.v?"border-green-500 bg-green-900/20 shadow-lg":"border-zinc-700 bg-zinc-800/50 hover:border-green-600"}`}>
                      <div className="text-3xl mb-3">{opt.icon}</div>
                      <div className="font-black text-white text-base mb-1">{opt.label}</div>
                      <div className="text-zinc-400 text-sm">{opt.desc}</div>
                      {(sel===opt.v||answers[q.id]===opt.v)&&<motion.div initial={{scale:0}} animate={{scale:1}} className="mt-2"><CheckCircle2 size={18} className="text-green-400"/></motion.div>}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          );})()}

          {stage === "results" && (
            <motion.div key="results" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-6">
              <div className={`rounded-[2rem] border-2 ${result.border} bg-zinc-900 overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${result.color}`}/>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-5"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white"/></div><span className="font-black text-amber-400 uppercase tracking-widest text-sm">Best Match for You</span></div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div><div className="text-5xl mb-3">{result.emoji}</div><h2 className="text-3xl font-black text-white mb-2">{result.name}</h2><span className={`text-xs font-black text-white px-3 py-1.5 rounded-full ${(result as any).badgeColor || "bg-blue-600"}`}>{result.badge}</span></div>
                    <div className="text-right shrink-0"><div className="text-2xl font-black text-white">{result.price}</div><div className={`text-base font-bold ${result.text} mt-1`}>{result.subscription}</div></div>
                  </div>
                  <div className={`p-5 rounded-2xl border ${result.border} ${result.bg} mb-6`}>
                    <div className={`text-sm font-black uppercase tracking-widest mb-2 ${result.text}`}>Satellite Network</div>
                    <p className="text-base text-zinc-300 font-medium">{result.network}</p>
                  </div>
                  <p className="text-zinc-300 text-lg font-medium leading-relaxed mb-6">{result.bestFor}</p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-6">
                    <div><div className="text-sm font-black text-green-400 uppercase tracking-widest mb-3">✓ Strengths</div>{result.pros.map((p,i)=>(<div key={i} className="flex items-start gap-2 text-sm text-zinc-300 font-medium mb-2"><CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5"/>{p}</div>))}</div>
                    <div><div className="text-sm font-black text-red-400 uppercase tracking-widest mb-3">✗ Limitations</div>{result.cons.map((c,i)=>(<div key={i} className="flex items-start gap-2 text-sm text-zinc-400 font-medium mb-2"><XCircle size={14} className="text-red-400 shrink-0 mt-0.5"/>{c}</div>))}</div>
                  </div>
                  <div className={`p-4 rounded-xl ${result.bg} border ${result.border}`}>
                    <div className={`text-xs font-black uppercase tracking-widest mb-1 ${result.text}`}>Subscription Plans</div>
                    <p className="text-sm text-zinc-300 font-medium">{result.subscriptionNote}</p>
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
                <h3 className="text-xl font-black text-white mb-5">All Three Compared</h3>
                <div className="space-y-3">
                  {ranked.map((device, i) => (
                    <div key={device.id} className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${i===0?`${device.border} ${device.bg}`:"border-zinc-700 bg-zinc-800/30"}`}>
                      {i===0&&<Star size={16} className="text-amber-400 fill-amber-400 shrink-0"/>}
                      <div className="text-2xl">{device.emoji}</div>
                      <div className="flex-1"><div className="font-black text-white">{device.name}</div><div className="text-zinc-400 text-sm">{device.price} · {device.subscription}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700 rounded-[2rem] p-7">
                <h3 className="font-black text-white text-lg mb-3">⚠️ Before you buy — the most important thing</h3>
                <p className="text-zinc-300 text-base font-medium leading-relaxed">Whichever device you choose, test it at home before you go. Send a test message to a family member, confirm they receive it, and make sure your SOS contacts are registered. A satellite communicator you haven't tested is significantly less valuable than one you have.</p>
              </div>

              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Get your match by email 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">Save the full comparison + your recommendation to reference before you buy.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. John" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Send My Recommendation"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="font-bold text-green-300">Sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Try Again</button>
                <Link href="/tools/adventure-gps-selector"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Adventure GPS Selector</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium leading-relaxed">Educational guidance only. Subscription prices subject to change — verify current plans on manufacturer websites. Not affiliated with Garmin, ZOLEO, or SPOT/Globalstar. This is not a substitute for proper wilderness safety training.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
