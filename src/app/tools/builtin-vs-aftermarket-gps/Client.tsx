"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, User, Loader2, Shield, Zap, RefreshCw, Star, XCircle, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1503376780353-7e6692767b70?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const QUESTIONS = [
  {
    id:"car_age",
    title:"How old is your car?",
    subtitle:"Older cars often have outdated factory navigation — newer cars may have CarPlay or Android Auto built in",
    options:[
      { v:"new", label:"2019 or newer", icon:"🚗", desc:"Likely has CarPlay or Android Auto", builtin:-10, garmin:20, carplay:40, phone:30 },
      { v:"mid", label:"2012 to 2018", icon:"🚙", desc:"May have factory nav — check if it has CarPlay/Android Auto", builtin:20, garmin:35, carplay:25, phone:20 },
      { v:"old", label:"2011 or older", icon:"🚘", desc:"Factory nav is very likely outdated", builtin:-20, garmin:50, carplay:5, phone:25 },
    ],
  },
  {
    id:"has_carplay",
    title:"Does your car have Apple CarPlay or Android Auto?",
    subtitle:"Check your car's screen — if it shows your phone's interface when plugged in, you likely have it",
    options:[
      { v:"yes", label:"Yes — I can connect my phone to the screen", icon:"✅", desc:"My phone works on my car's screen", builtin:-15, garmin:10, carplay:50, phone:15 },
      { v:"no", label:"No — my car doesn't have that feature", icon:"❌", desc:"Just a basic screen or no screen", builtin:15, garmin:40, carplay:-10, phone:20 },
      { v:"unsure", label:"I'm not sure how to check", icon:"🤔", desc:"I haven't tried it", builtin:10, garmin:30, carplay:20, phone:20 },
    ],
  },
  {
    id:"rural",
    title:"Do you drive in rural areas or places where your phone signal drops?",
    subtitle:"Phone navigation apps stop working in dead zones — factory GPS and dedicated GPS devices don't",
    options:[
      { v:"often", label:"Yes — regularly drive in low signal areas", icon:"🌲", desc:"Rural roads, remote areas, dead zones", builtin:20, garmin:50, carplay:10, phone:-10 },
      { v:"sometimes", label:"Occasionally — a few times a year", icon:"🌾", desc:"Mostly city but some rural trips", builtin:10, garmin:35, carplay:20, phone:15 },
      { v:"never", label:"No — always in cities and suburbs with good signal", icon:"🏙️", desc:"Strong signal wherever I drive", builtin:0, garmin:10, carplay:35, phone:35 },
    ],
  },
  {
    id:"budget",
    title:"Are you open to spending money on a navigation upgrade?",
    subtitle:"Different options have very different costs",
    options:[
      { v:"none", label:"Prefer not to spend anything extra", icon:"💵", desc:"I'd like to use what I already have", builtin:30, garmin:-10, carplay:30, phone:40 },
      { v:"some", label:"Happy to spend $100–$200 on a good solution", icon:"💳", desc:"Worth it for something reliable", builtin:5, garmin:45, carplay:25, phone:5 },
      { v:"flexible", label:"Whatever gives me the best result", icon:"💎", desc:"Budget isn't the main concern", builtin:10, garmin:35, carplay:30, phone:10 },
    ],
  },
];

const RESULTS = {
  garmin:{
    verdict:"A Dedicated Garmin GPS is Your Best Option",
    emoji:"🗺️",
    color:"from-blue-500 to-indigo-400",
    border:"border-blue-700",
    bg:"bg-blue-900/20",
    text:"text-blue-300",
    summary:"Based on how you drive and what you need, a dedicated Garmin GPS gives you the most reliable, hassle-free navigation — without depending on your phone or your car's built-in system.",
    reasons:["Works perfectly without cell signal — ideal for rural and remote driving","No phone battery drain — your phone stays free for calls","Clear, purpose-built navigation screen that doesn't get interrupted","No monthly fees — one-time purchase","Always works, whether your phone is flat or not"],
    bestPicks:[
      { name:"Garmin DriveSmart 55", price:"$149–$179", why:"The sweet spot — live traffic, Bluetooth, voice control, Wi-Fi updates. The one most drivers should buy." },
      { name:"Garmin DriveSmart 65", price:"$179–$219", why:"Same great features with a 6.95-inch screen. Best choice if you wear glasses or want easy reading." },
    ],
    cost:"$149–$219 one-time. No subscription. Free map updates for life.",
  },
  carplay:{
    verdict:"Apple CarPlay or Android Auto is Your Best Option",
    emoji:"📱",
    color:"from-green-500 to-emerald-400",
    border:"border-green-700",
    bg:"bg-green-900/20",
    text:"text-green-300",
    summary:"You're in a great position — your car has (or can easily support) CarPlay or Android Auto. This gives you the best of both worlds: your familiar phone navigation on your car's big screen.",
    reasons:["Always up-to-date maps — no buying updates ever","Google Maps, Waze, and Apple Maps all work on your car screen","Hands-free Siri or Google Assistant while driving","Your car's larger screen makes phone navigation much safer","Works wirelessly on many 2019+ cars — no plugging in needed"],
    howTo:[
      { step:"iPhone user", detail:"Plug your iPhone into your car's USB port or use wireless CarPlay if your car supports it. Apple Maps and Google Maps appear on your screen automatically." },
      { step:"Android user", detail:"Connect via USB or Bluetooth to Android Auto. Google Maps and Waze work directly from your car's screen." },
      { step:"If your car doesn't have it built in", detail:"An aftermarket head unit with CarPlay and Android Auto costs $150–$400 installed — but a Garmin GPS at $149–$179 is simpler and less expensive." },
    ],
    cost:"Free — you're using your phone and your car's existing screen.",
  },
  builtin:{
    verdict:"Your Factory Navigation Could Work — But Check the Map Date First",
    emoji:"🚗",
    color:"from-amber-500 to-orange-400",
    border:"border-amber-700",
    bg:"bg-amber-900/20",
    text:"text-amber-300",
    summary:"Your car's built-in navigation is convenient and already paid for — but only if the maps are reasonably current. Many factory systems haven't been updated in years, which can cause wrong routes and missing roads.",
    reasons:["No extra device to buy or mount","Fully integrated with your car — steering wheel controls, backup camera","Works offline without cell signal","Clean, built-in look","Professional installation and reliability"],
    warningCheck:[
      "Find 'Settings' or 'System Info' on your navigation screen",
      "Look for 'Map Version' or 'Map Date'",
      "If it's more than 3 years old, maps may be significantly outdated",
      "Your car dealer can tell you the cost of a map update",
    ],
    updateCost:"Factory map updates typically cost $149–$299 from your dealer or manufacturer's website.",
    cost:"Already paid for. Map updates cost $149–$299 when needed.",
  },
  phone:{
    verdict:"Your Phone with Google Maps or Waze Works Great for You",
    emoji:"📱",
    color:"from-cyan-500 to-blue-400",
    border:"border-cyan-700",
    bg:"bg-cyan-900/20",
    text:"text-cyan-300",
    summary:"Given where you drive and the signal you have, your smartphone with a good navigation app is genuinely all you need. Save your money — a dedicated GPS won't give you much extra for your situation.",
    reasons:["Free maps that update themselves constantly","Best real-time traffic of any option","You always drive in areas with good cell signal","Google Maps offline maps work for occasional dead zones","One less device to buy, charge, and manage"],
    bestApps:[
      { name:"Google Maps", emoji:"🗺️", why:"Best traffic, most accurate, works offline when you download your area in advance." },
      { name:"Waze", emoji:"🚗", why:"Best hazard alerts — speed cameras, accidents, road works reported by other drivers." },
      { name:"Apple Maps", emoji:"🍎", why:"Best for iPhone users — seamless Siri integration and CarPlay support." },
    ],
    cost:"Completely free.",
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ builtin:0, garmin:0, carplay:0, phone:0 });
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [sel, setSel] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const progress = (currentQ / QUESTIONS.length) * 100;

  const getWinner = () => {
    const max = Math.max(scores.builtin, scores.garmin, scores.carplay, scores.phone);
    if (scores.garmin === max) return "garmin";
    if (scores.carplay === max) return "carplay";
    if (scores.builtin === max) return "builtin";
    return "phone";
  };

  const answer = (v: string, builtin: number, garmin: number, carplay: number, phone: number) => {
    setSel(v);
    setTimeout(() => {
      setScores(prev => ({ builtin:prev.builtin+builtin, garmin:prev.garmin+garmin, carplay:prev.carplay+carplay, phone:prev.phone+phone }));
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
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,issue:`Built-in vs Aftermarket — Verdict: ${winner}`,source:"builtin-vs-aftermarket-gps"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setStage("intro");setCurrentQ(0);setScores({builtin:0,garmin:0,carplay:0,phone:0});setAnswers({});setSel(null);setName("");setEmail("");setSubmitted(false);};

  const winner = getWinner();
  const result = RESULTS[winner as keyof typeof RESULTS];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">Built-in vs Aftermarket GPS</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free · 4 Questions · Honest Verdict
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Use My Car's GPS</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent italic">or Buy a Separate One?</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Factory GPS, dedicated Garmin, Apple CarPlay, or just your phone — 4 questions about your car and how you drive. Get an honest recommendation for your exact situation.
          </motion.p>
          <div className="flex flex-wrap gap-5">
            {[{icon:"🚗",t:"Factory GPS"},{icon:"🗺️",t:"Garmin/TomTom"},{icon:"📱",t:"CarPlay/Android Auto"},{icon:"📲",t:"Phone Navigation"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div key="intro" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-5">
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {[{title:"Factory GPS",emoji:"🚗",points:["Already in your car","Costs nothing extra","Maps may be outdated","Updates cost $149–$299"]},{title:"Dedicated GPS",emoji:"🗺️",points:["Garmin or TomTom","Works without signal","$89–$349 one-time","Free lifetime updates"]},{title:"CarPlay/Auto",emoji:"📱",points:["Phone on car screen","Always-fresh maps","Free if car supports it","Needs good cell signal"]},{title:"Phone Only",emoji:"📲",points:["Google Maps, Waze","Completely free","Best in cities","Not for rural driving"]}].map(opt=>(
                  <div key={opt.title} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
                    <div className="text-3xl mb-2">{opt.emoji}</div>
                    <div className="font-black text-white text-sm mb-3">{opt.title}</div>
                    {opt.points.map(p=>(<div key={p} className="text-xs text-zinc-400 font-medium mb-1">{p}</div>))}
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 md:p-10">
                <h2 className="text-2xl font-black text-white mb-4">Which is right for YOUR car and driving? 🚗</h2>
                <p className="text-zinc-400 text-lg font-medium mb-6">4 quick questions about your car's age, what features it already has, and where you drive. You'll get a clear recommendation — not a generic answer.</p>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/30">
                  Find the Right Answer for My Car <ArrowRight size={24}/>
                </motion.button>
              </div>
            </motion.div>
          )}

          {stage === "quiz" && (() => { const q = QUESTIONS[currentQ]; return (
            <motion.div key={`q-${currentQ}`} initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}} transition={{type:"spring",stiffness:350,damping:30}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.5}}/></div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={()=>{if(currentQ===0)setStage("intro");else setCurrentQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold transition-colors group"><ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>Back</button>
                  <div className="flex gap-2">{QUESTIONS.map((_,i)=>(<div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i<currentQ?"bg-amber-400":i===currentQ?"bg-white scale-125":"bg-zinc-700"}`}/>))}</div>
                  <span className="text-base font-black text-zinc-400">{currentQ+1} / {QUESTIONS.length}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                <p className="text-zinc-400 text-base mb-8">{q.subtitle}</p>
                <div className="space-y-3">
                  {q.options.map((opt,i)=>(
                    <motion.button key={opt.v} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.06*i}} whileTap={{scale:0.98}}
                      onClick={()=>answer(opt.v,opt.builtin,opt.garmin,opt.carplay,opt.phone)}
                      className={`w-full flex items-center gap-5 p-6 rounded-2xl border-2 text-left transition-all ${sel===opt.v||answers[q.id]===opt.v?"border-amber-500 bg-amber-900/20 shadow-lg":"border-zinc-700 bg-zinc-800/50 hover:border-amber-600"}`}>
                      <div className="text-4xl">{opt.icon}</div>
                      <div className="flex-1"><div className="font-black text-white text-base mb-1">{opt.label}</div><div className="text-zinc-400 text-sm">{opt.desc}</div></div>
                      {(sel===opt.v||answers[q.id]===opt.v)&&<CheckCircle2 size={20} className="text-amber-400 shrink-0"/>}
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
                  <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",delay:0.1}} className="text-6xl mb-5">{result.emoji}</motion.div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-4 ${result.bg} ${result.text} border ${result.border}`}>Our Verdict for Your Car</div>
                  <h2 className="text-3xl font-black text-white mb-4">{result.verdict}</h2>
                  <p className="text-zinc-300 text-lg font-medium leading-relaxed mb-6">{result.summary}</p>
                  <div className="space-y-3 mb-5">
                    {result.reasons.map((r,i)=>(<motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.08*i}} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-400 shrink-0"/><p className="text-base text-zinc-300 font-medium">{r}</p></motion.div>))}
                  </div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-bold ${result.bg} ${result.text} border ${result.border}`}>💰 Cost: {result.cost}</div>
                </div>
              </div>

              {/* Garmin picks */}
              {"bestPicks" in result && result.bestPicks && (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-5"><Star size={18} className="text-amber-400 inline mr-2"/>Top Garmin Picks for You</h3>
                  <div className="space-y-4">
                    {result.bestPicks.map((pick,i)=>(
                      <div key={pick.name} className="p-5 bg-zinc-800 rounded-2xl">
                        {i===0&&<div className="flex items-center gap-2 mb-2"><Star size={13} className="text-amber-400 fill-amber-400"/><span className="text-sm font-black text-amber-400">Top Pick</span></div>}
                        <div className="flex items-start justify-between gap-4 mb-2"><h4 className="text-xl font-black text-white">{pick.name}</h4><span className="text-xl font-black text-white shrink-0">{pick.price}</span></div>
                        <p className="text-base text-zinc-300 font-medium">{pick.why}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* CarPlay how-to */}
              {"howTo" in result && result.howTo && (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-5">How to use CarPlay or Android Auto</h3>
                  <div className="space-y-4">
                    {result.howTo.map((item,i)=>(<div key={i} className="p-5 bg-zinc-800 rounded-xl"><div className="font-black text-white text-base mb-1">{item.step}</div><p className="text-zinc-400 text-sm font-medium">{item.detail}</p></div>))}
                  </div>
                </div>
              )}

              {/* Factory GPS check */}
              {"warningCheck" in result && result.warningCheck && (
                <div className="bg-amber-900/20 border border-amber-700 rounded-[2rem] p-7">
                  <div className="flex items-start gap-3 mb-5"><AlertCircle size={22} className="text-amber-400 shrink-0 mt-0.5"/><div><h3 className="font-black text-white text-lg mb-1">First — Check Your Map Date</h3><p className="text-zinc-300 text-base font-medium">Before relying on your factory GPS, find out when your maps were last updated:</p></div></div>
                  <div className="space-y-2">
                    {result.warningCheck.map((step,i)=>(<div key={i} className="flex items-center gap-3"><div className="w-6 h-6 bg-amber-500 rounded-full flex items-center justify-center text-[#0d1117] font-black text-xs shrink-0">{i+1}</div><p className="text-base text-zinc-300 font-medium">{step}</p></div>))}
                  </div>
                  <div className="mt-5 p-4 bg-amber-900/30 rounded-xl"><p className="text-sm text-amber-300 font-medium">💡 If maps are 3+ years old, a $149–$179 Garmin DriveSmart often gives better navigation than paying $199–$299 for a factory map update.</p></div>
                </div>
              )}

              {/* Phone apps */}
              {"bestApps" in result && result.bestApps && (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-5">Best Navigation Apps for Your Phone</h3>
                  <div className="space-y-3">
                    {result.bestApps.map((app,i)=>(<div key={app.name} className="flex items-start gap-4 p-5 bg-zinc-800 rounded-xl"><div className="text-3xl">{app.emoji}</div><div><div className="font-black text-white text-base">{app.name}</div><p className="text-zinc-400 text-sm font-medium mt-1">{app.why}</p></div></div>))}
                  </div>
                </div>
              )}

              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Get your result by email 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">Save this recommendation to reference when you're ready.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Send My Result"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="font-bold text-green-300">Sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Try Again</button>
                <Link href="/tools/gps-vs-phone-decider"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS vs Phone Decider</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with Garmin, TomTom, Apple, or Google. CarPlay and Android Auto availability depends on your specific vehicle model.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
