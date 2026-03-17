"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, User, Loader2, Shield, Zap, RefreshCw, Star, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1501854140801-50d01698950b?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const QUESTIONS = [
  {
    id:"terrain",
    title:"What terrain do you mainly hunt in?",
    subtitle:"The landscape shapes what GPS features matter most to you",
    options:[
      { v:"dense-forest", label:"Dense boreal forest", icon:"🌲", desc:"Northern Ontario, Quebec, Manitoba, BC interior", gpsmap67:35, gpsmap66i:25, alpha:20, montana:20 },
      { v:"mountains", label:"Mountain terrain", icon:"⛰️", desc:"Alberta Rockies, BC, Yukon, Northwest Territories", gpsmap67:25, gpsmap66i:30, alpha:15, montana:35 },
      { v:"open-prairies", label:"Open prairies and farmland", icon:"🌾", desc:"Saskatchewan, Alberta, Manitoba plains", gpsmap67:30, gpsmap66i:25, alpha:25, montana:20 },
      { v:"remote-north", label:"True remote backcountry", icon:"🏔️", desc:"Northern Canada, fly-in camps, very remote", gpsmap67:20, gpsmap66i:45, alpha:15, montana:20 },
    ],
  },
  {
    id:"hunt_type",
    title:"What do you mainly hunt?",
    subtitle:"Different game and methods need different GPS capabilities",
    options:[
      { v:"deer-moose", label:"Deer or moose", icon:"🦌", desc:"Stand hunting, drives, tracking wounded game", gpsmap67:40, gpsmap66i:25, alpha:15, montana:20 },
      { v:"bird-dogs", label:"Bird hunting with dogs", icon:"🦆", desc:"Pheasant, grouse, ptarmigan — need to track dogs", gpsmap67:5, gpsmap66i:5, alpha:60, montana:10 },
      { v:"bear-predator", label:"Bear or predator hunting", icon:"🐻", desc:"Remote areas, often solo, longer treks", gpsmap67:25, gpsmap66i:40, alpha:15, montana:20 },
      { v:"general", label:"Mixed — different species each season", icon:"🏹", desc:"A bit of everything through the year", gpsmap67:35, gpsmap66i:30, alpha:15, montana:20 },
    ],
  },
  {
    id:"solo",
    title:"Do you hunt solo or with a group?",
    subtitle:"Solo hunters in remote Canada have different safety needs than group hunts",
    options:[
      { v:"solo-remote", label:"Mostly solo in very remote areas", icon:"🧑", desc:"Far from roads, often no cell signal", gpsmap67:15, gpsmap66i:50, alpha:10, montana:25 },
      { v:"solo-semi", label:"Solo but in semi-accessible areas", icon:"🚶", desc:"Within a few hours of cell coverage", gpsmap67:40, gpsmap66i:25, alpha:15, montana:20 },
      { v:"group", label:"With hunting partners", icon:"👥", desc:"2–4 people, can communicate with each other", gpsmap67:35, gpsmap66i:25, alpha:25, montana:15 },
      { v:"guided", label:"Guided hunts", icon:"🎯", desc:"With an outfitter who may have their own equipment", gpsmap67:40, gpsmap66i:20, alpha:20, montana:20 },
    ],
  },
  {
    id:"sos_need",
    title:"How important is emergency communication to you?",
    subtitle:"In northern Canada, being able to call for help can be the difference between life and death",
    options:[
      { v:"essential", label:"Essential — I hunt very remotely", icon:"🆘", desc:"Hours from any help, no cell signal", gpsmap67:5, gpsmap66i:55, alpha:10, montana:30 },
      { v:"important", label:"Important — peace of mind for family", icon:"❤️", desc:"Family wants to know I'm safe", gpsmap67:20, gpsmap66i:45, alpha:15, montana:20 },
      { v:"nice-to-have", label:"Nice to have but not critical", icon:"👍", desc:"Usually have some communication option", gpsmap67:40, gpsmap66i:25, alpha:20, montana:15 },
      { v:"not-needed", label:"Not a priority for my hunts", icon:"✅", desc:"Near roads and accessible areas", gpsmap67:50, gpsmap66i:15, alpha:20, montana:15 },
    ],
  },
];

const DEVICES = {
  gpsmap67:{
    name:"Garmin GPSMAP 67",
    price:"$399–$429",
    emoji:"🟢",
    badge:"Best Value Hunting GPS",
    badgeColor:"bg-green-600",
    color:"from-green-500 to-emerald-400",
    border:"border-green-700",
    bg:"bg-green-900/20",
    text:"text-green-300",
    features:["100-hour battery on AA lithium batteries","Topographic maps of Canada preloaded","Multi-GNSS accuracy — connects to more satellites than competitors","IPX7 waterproof — submerged up to 1 metre","Paperless mapping for hunting zones","Works in extreme cold where rechargeable batteries fail"],
    bestFor:"Deer, moose, and bear hunters in Canadian boreal forests and accessible backcountry. The AA battery is a critical advantage — you can find replacements at any gas station or camp store.",
    canadaTip:"Canada's boreal forest can block GPS signal in dense canopy. Garmin's multi-GNSS connects to GPS, GLONASS, and Galileo satellites simultaneously — you'll get a position fix much faster than single-system devices.",
    sos:false,
  },
  gpsmap66i:{
    name:"Garmin GPSMAP 66i",
    price:"$549–$599 + subscription",
    emoji:"🔵",
    badge:"Best for Remote Canada",
    badgeColor:"bg-blue-600",
    color:"from-blue-500 to-indigo-400",
    border:"border-blue-700",
    bg:"bg-blue-900/20",
    text:"text-blue-300",
    features:["35-hour battery rechargeable — 200+ hours in expedition mode","Full GPS navigation + inReach satellite messaging in one device","SOS sends your GPS location to 24/7 rescue coordination","Topo maps of all Canada preloaded","Track sharing — family sees your location in real time","Weather forecasts downloaded via satellite"],
    bestFor:"Solo hunters in northern Canada, remote fly-in camps, and anyone who needs both navigation AND the ability to call for help from anywhere. The must-have for hunting truly remote Crown land.",
    canadaTip:"Northern Ontario, Quebec's James Bay lowlands, and the Northwest Territories have vast areas with zero cell coverage. The GPSMAP 66i's inReach satellite communication works here when nothing else does.",
    sos:true,
    subscriptionNote:"Requires Garmin inReach subscription: Safety Plan $14.99/mo or Freedom Plan $34.99/mo. Can be suspended off-season.",
  },
  alpha:{
    name:"Garmin Alpha 300i + TT 25 Collar",
    price:"$799 handheld + $299 collar",
    emoji:"🟡",
    badge:"Best for Dog Hunters",
    badgeColor:"bg-amber-600",
    color:"from-amber-500 to-orange-400",
    border:"border-amber-700",
    bg:"bg-amber-900/20",
    text:"text-amber-300",
    features:["Track up to 20 dogs simultaneously on one screen","See each dog's exact location on topo map","Bark alerts and point alerts in real time","9-mile range in open terrain","Tone and vibration training through the handheld","IPX7 waterproof — dogs can swim"],
    bestFor:"Bird dog hunters, hound hunters, and anyone who runs dogs in the Canadian bush. Industry standard for dog tracking — if your dog runs out of sight in dense Quebec or Ontario forest, you'll know exactly where it is.",
    canadaTip:"In dense Canadian boreal forest, dogs can disappear from sight within seconds. The Alpha's signal can penetrate heavy tree cover and track dogs through terrain that blocks line-of-sight visibility.",
    sos:false,
    collarNote:"Each additional dog collar costs $269. Collar battery lasts 40 hours. Compatible with all Garmin Alpha handhelds.",
  },
  montana:{
    name:"Garmin Montana 700i",
    price:"$699 + subscription",
    emoji:"🟣",
    badge:"Best for Mountain Hunters",
    badgeColor:"bg-purple-600",
    color:"from-purple-500 to-violet-400",
    border:"border-purple-700",
    bg:"bg-purple-900/20",
    text:"text-purple-300",
    features:["5.5-inch touchscreen — glove-friendly even in cold","Full topo maps of Canadian Rockies preloaded","inReach satellite messaging + SOS built in","ATV and snowmobile vehicle profile","18-hour battery — rechargeable","Works as handheld walking or mounted on ATV/snowmobile"],
    bestFor:"Hunters in mountainous terrain (Alberta, BC, Yukon) who use ATVs or snowmobiles for access. Large screen is much easier to read with gloves. Built-in satellite communication covers the mountain wilderness.",
    canadaTip:"Alberta and BC mountain hunting often involves ATV access routes that standard GPS routing ignores. The Montana's vehicle profiles and topo mapping show the terrain in enough detail to plan approaches that other devices miss.",
    sos:true,
    subscriptionNote:"Requires Garmin inReach subscription: Safety Plan $14.99/mo or Freedom Plan $34.99/mo. Can be suspended off-season.",
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ gpsmap67:0, gpsmap66i:0, alpha:0, montana:0 });
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [sel, setSel] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const progress = (currentQ / QUESTIONS.length) * 100;
  const getWinner = () => {
    const max = Math.max(scores.gpsmap67, scores.gpsmap66i, scores.alpha, scores.montana);
    if (scores.gpsmap66i === max) return "gpsmap66i";
    if (scores.alpha === max) return "alpha";
    if (scores.montana === max) return "montana";
    return "gpsmap67";
  };
  const ranked = (["gpsmap67","gpsmap66i","alpha","montana"] as const).map(id=>({id,...DEVICES[id],score:scores[id]})).sort((a,b)=>b.score-a.score);

  const answer = (v: string, gpsmap67: number, gpsmap66i: number, alpha: number, montana: number) => {
    setSel(v);
    setTimeout(() => {
      setScores(prev => ({ gpsmap67:prev.gpsmap67+gpsmap67, gpsmap66i:prev.gpsmap66i+gpsmap66i, alpha:prev.alpha+alpha, montana:prev.montana+montana }));
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
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,issue:`Hunting GPS Canada — Match: ${winner} — Terrain: ${answers.terrain}`,source:"hunting-gps-canada"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setStage("intro");setCurrentQ(0);setScores({gpsmap67:0,gpsmap66i:0,alpha:0,montana:0});setAnswers({});setSel(null);setName("");setEmail("");setSubmitted(false);};

  const winner = getWinner();
  const result = DEVICES[winner as keyof typeof DEVICES];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">Hunting GPS Guide — Canada</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free · Canadian Backcountry Focused
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Best GPS for</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-300 to-red-400 bg-clip-text text-transparent italic">Hunting in Canada</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Deer or moose? Dogs or solo? Northern boreal or mountain terrain? 4 questions built for Canadian hunters — get matched to the right GPS with Canadian-specific coverage advice.
          </motion.p>
          <div className="flex flex-wrap gap-5">
            {[{icon:"🦌",t:"Deer & Moose"},{icon:"🦆",t:"Bird & Dog Hunting"},{icon:"🏔️",t:"Remote Backcountry"},{icon:"🍁",t:"Canadian Coverage"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {stage === "intro" && (
            <motion.div key="intro" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-5">
              <div className="bg-amber-900/20 border border-amber-700 rounded-[2rem] p-7 flex items-start gap-4">
                <AlertCircle size={24} className="text-amber-400 shrink-0 mt-0.5"/>
                <div>
                  <h3 className="font-black text-white text-lg mb-2">Why this guide is built for Canada specifically</h3>
                  <p className="text-zinc-300 text-base font-medium leading-relaxed">Canadian boreal forest is among the densest terrain on Earth for GPS signal. Many remote hunting areas in northern Ontario, Quebec, and the territories have zero cell coverage for 200+ kilometres. Hunting regulations require you to know your exact location for reporting. And the cold — genuinely cold — winters affect battery performance significantly.</p>
                </div>
              </div>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                {Object.values(DEVICES).map(device => (
                  <div key={device.name} className={`bg-zinc-900 rounded-2xl border ${device.border} overflow-hidden`}>
                    <div className={`h-1 bg-gradient-to-r ${device.color}`}/>
                    <div className="p-5 text-center">
                      <div className="text-3xl mb-2">{device.emoji}</div>
                      <div className="font-black text-white text-sm mb-1">{device.name.split(" ").slice(0,3).join(" ")}</div>
                      <div className={`text-xs font-bold ${device.text}`}>{device.badge}</div>
                      <div className="font-black text-white text-base mt-1">{device.price.split(" ")[0]}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h2 className="text-2xl font-black text-white mb-4">Which hunting GPS fits your season? 🦌</h2>
                <p className="text-zinc-400 text-lg font-medium mb-6">4 questions about your terrain, your hunt style, and your safety needs. Built for Canadian hunting conditions — not generic outdoor advice.</p>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/30">
                  Find My Hunting GPS Match <ArrowRight size={24}/>
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
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt,i)=>(
                    <motion.button key={opt.v} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.06*i}} whileTap={{scale:0.97}}
                      onClick={()=>answer(opt.v,opt.gpsmap67,opt.gpsmap66i,opt.alpha,opt.montana)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${sel===opt.v||answers[q.id]===opt.v?"border-amber-500 bg-amber-900/20 shadow-lg":"border-zinc-700 bg-zinc-800/50 hover:border-amber-600"}`}>
                      <div className="text-3xl mb-3">{opt.icon}</div>
                      <div className="font-black text-white text-base mb-1">{opt.label}</div>
                      <div className="text-zinc-400 text-sm">{opt.desc}</div>
                      {(sel===opt.v||answers[q.id]===opt.v)&&<motion.div initial={{scale:0}} animate={{scale:1}} className="mt-2"><CheckCircle2 size={18} className="text-amber-400"/></motion.div>}
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
                  <div className="flex items-center gap-3 mb-5"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white"/></div><span className="font-black text-amber-400 uppercase tracking-widest text-sm">Best Match for Your Hunt</span></div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div><div className="text-5xl mb-3">{result.emoji}</div><h2 className="text-3xl font-black text-white mb-2">{result.name}</h2><span className={`text-xs font-black text-white px-3 py-1.5 rounded-full ${(result as any).badgeColor || "bg-blue-600"}`}>{result.badge}</span></div>
                    <div className="text-right shrink-0"><div className="text-2xl font-black text-white">{result.price}</div>{result.sos&&<div className="text-xs font-bold text-red-400 mt-1">⚠️ Subscription required</div>}</div>
                  </div>
                  <p className="text-zinc-300 text-lg font-medium leading-relaxed mb-5">{result.bestFor}</p>
                  <div className="space-y-2 mb-5">{result.features.map((f,i)=>(<div key={i} className="flex items-center gap-2 text-sm text-zinc-300 font-medium"><CheckCircle2 size={14} className="text-green-400 shrink-0"/>{f}</div>))}</div>
                  <div className={`p-5 rounded-2xl border ${result.border} ${result.bg} mb-4`}>
                    <div className={`text-sm font-black uppercase tracking-widest mb-2 ${result.text}`}>🍁 Canadian Coverage Note</div>
                    <p className="text-base text-zinc-300 font-medium leading-relaxed">{result.canadaTip}</p>
                  </div>
                  {"subscriptionNote" in result && result.subscriptionNote && (<div className="p-4 bg-amber-900/20 border border-amber-700 rounded-xl flex items-start gap-2"><AlertCircle size={15} className="text-amber-400 shrink-0 mt-0.5"/><p className="text-sm text-amber-300 font-medium">{result.subscriptionNote}</p></div>)}
                  {"collarNote" in result && result.collarNote && (<div className="p-4 bg-zinc-800 border border-zinc-700 rounded-xl mt-3"><p className="text-sm text-zinc-300 font-medium">{result.collarNote}</p></div>)}
                </div>
              </div>

              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
                <h3 className="text-xl font-black text-white mb-5">All Options Compared</h3>
                <div className="space-y-3">
                  {ranked.map((device, i) => (
                    <div key={device.id} className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${i===0?`${device.border} ${device.bg}`:"border-zinc-700 bg-zinc-800/30"}`}>
                      {i===0&&<Star size={16} className="text-amber-400 fill-amber-400 shrink-0"/>}
                      <div className="text-2xl">{device.emoji}</div>
                      <div className="flex-1"><div className="font-black text-white">{device.name}</div><div className="text-zinc-400 text-sm">{device.badge}</div></div>
                      <div className="text-right shrink-0"><div className="font-black text-white text-sm">{device.price.split(" ")[0]}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
                  <h3 className="text-xl font-black text-white mb-2">Get your match by email 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">Save your hunting GPS recommendation + Canadian coverage notes.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mike" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Send My Hunting GPS Match"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="font-bold text-green-300">Sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Try Again</button>
                <Link href="/tools/satellite-communicator-guide"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Satellite Communicator Guide</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium leading-relaxed">Educational guidance only. Always follow provincial hunting regulations. Not affiliated with Garmin. Prices approximate. No GPS navigation data should be solely relied upon in remote wilderness — always carry a paper topo map as backup.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
