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
  { url:"https://images.unsplash.com/photo-1473496169904-658ba7574b0d?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const QUESTIONS = [
  {
    id:"glasses",
    title:"Do you wear reading glasses?",
    subtitle:"This is the most important question for GPS choice — screen size affects how comfortable navigation feels while driving",
    options:[
      { v:"yes-always", label:"Yes — always", icon:"👓", desc:"I need them for small text", ds65:40, ds55:10, drive53:0 },
      { v:"yes-sometimes", label:"Sometimes — depends on lighting", icon:"🔍", desc:"In the car I sometimes struggle", ds65:30, ds55:25, drive53:10 },
      { v:"no", label:"No — my eyesight is fine", icon:"👁️", desc:"Small text isn't an issue", ds65:10, ds55:35, drive53:30 },
    ],
  },
  {
    id:"driving",
    title:"Where and how far do you drive?",
    subtitle:"More adventurous driving benefits more from premium features",
    options:[
      { v:"local", label:"Mostly familiar local routes", icon:"🏡", desc:"Short trips, roads I know well", ds65:15, ds55:20, drive53:40 },
      { v:"occasional", label:"Occasional new places and longer drives", icon:"🚗", desc:"Sometimes unfamiliar routes or towns", ds65:25, ds55:35, drive53:25 },
      { v:"trips", label:"Regular road trips and new places", icon:"🗺️", desc:"I drive to new destinations often", ds65:40, ds55:35, drive53:10 },
    ],
  },
  {
    id:"tech_comfort",
    title:"How comfortable are you with new technology?",
    subtitle:"Some GPS models are simpler than others — this helps match the right complexity",
    options:[
      { v:"simple", label:"Keep it as simple as possible", icon:"😊", desc:"The simpler the better for me", ds65:20, ds55:25, drive53:40 },
      { v:"moderate", label:"I can follow clear instructions", icon:"👍", desc:"Happy to read a brief guide", ds65:30, ds55:35, drive53:20 },
      { v:"comfortable", label:"I'm comfortable with gadgets", icon:"📱", desc:"Technology doesn't intimidate me", ds65:35, ds55:35, drive53:15 },
    ],
  },
  {
    id:"calls",
    title:"Do you get phone calls while driving?",
    subtitle:"Some GPS models let you answer calls hands-free through the device — very useful",
    options:[
      { v:"often", label:"Yes — fairly regularly", icon:"📞", desc:"Hands-free calling would be helpful", ds65:40, ds55:35, drive53:5 },
      { v:"sometimes", label:"Occasionally", icon:"🤷", desc:"A call here and there", ds65:25, ds55:30, drive53:20 },
      { v:"rarely", label:"Rarely — I prefer silence when driving", icon:"🔕", desc:"Calls aren't a concern", ds65:15, ds55:20, drive53:35 },
    ],
  },
];

const DEVICES = {
  ds65:{
    name:"Garmin DriveSmart 65",
    price:"$179–$219",
    screen:"6.95 inch",
    emoji:"🖥️",
    badge:"Best GPS for Seniors — Our Top Pick",
    badgeColor:"bg-purple-600",
    color:"from-purple-500 to-violet-400",
    border:"border-purple-700",
    bg:"bg-purple-900/20",
    text:"text-purple-300",
    whyForSeniors:"The 6.95-inch screen is the most significant upgrade you can make for comfortable driving navigation after 55. Text is noticeably larger, the map detail is much easier to read at a glance, and you don't need to squint at junctions or squint to read street names.",
    features:[
      "6.95-inch screen — significantly easier to read than 5-inch models",
      "Large text and icons throughout — designed for quick glances",
      "Voice control — say your destination out loud, no typing",
      "Bluetooth hands-free calling through the GPS speaker",
      "Live traffic — automatically reroutes around delays",
      "Lane guidance — shows exactly which lane to be in at complex junctions",
      "Wi-Fi map updates — updates itself at home overnight",
      "Speed limit alerts — shows current limit and warns if exceeded",
    ],
    bestFor:"Adults 55+ who wear reading glasses, drive regularly to new places, and want the clearest possible screen without sacrificing any features.",
    setup:"Setup takes about 10 minutes: mount on windshield, plug in, connect to home Wi-Fi. The initial setup screen walks you through every step clearly.",
  },
  ds55:{
    name:"Garmin DriveSmart 55",
    price:"$149–$179",
    screen:"5.5 inch",
    emoji:"📺",
    badge:"Great Value — Most Popular",
    badgeColor:"bg-blue-600",
    color:"from-blue-500 to-indigo-400",
    border:"border-blue-700",
    bg:"bg-blue-900/20",
    text:"text-blue-300",
    whyForSeniors:"The DriveSmart 55 has the same great features as the 65 — live traffic, Bluetooth calling, voice control, Wi-Fi updates — at a lower price. The 5.5-inch screen is clear for most adults, especially those who don't rely heavily on glasses.",
    features:[
      "5.5-inch screen — clear and readable for most drivers",
      "Voice control — speak your destination hands-free",
      "Bluetooth hands-free calling",
      "Live traffic and rerouting",
      "Lane guidance at complex junctions",
      "Wi-Fi map updates",
      "Speed limit display and alerts",
    ],
    bestFor:"Adults 55+ who don't need reading glasses for normal use, occasional road trip drivers, and those who want all the key features at a fairer price.",
    setup:"Same easy setup as the DriveSmart 65 — typically 10 minutes from box to navigating.",
  },
  drive53:{
    name:"Garmin Drive 53",
    price:"$89–$119",
    screen:"5 inch",
    emoji:"📱",
    badge:"Simple & Affordable",
    badgeColor:"bg-green-600",
    color:"from-green-500 to-emerald-400",
    border:"border-green-700",
    bg:"bg-green-900/20",
    text:"text-green-300",
    whyForSeniors:"The Drive 53 is the right choice if you want reliable navigation without any fuss — and without spending a lot. It does the basics very well: clear directions, simple menu, speed alerts. No Bluetooth, no Wi-Fi, but also nothing to confuse or overwhelm.",
    features:[
      "5-inch screen — compact and clear",
      "Simple menu — very easy to use",
      "Clear voice directions",
      "Speed limit alerts",
      "Lifetime free map updates (via USB and computer)",
      "No subscription fees ever",
    ],
    bestFor:"Drivers who want the simplest possible GPS — no extra features, just reliable directions at a fair price. Especially good for short local trips.",
    setup:"Straightforward setup — mount, plug in, enter destination. Map updates require connecting to a computer via USB, which some users find less convenient.",
  },
};

const TIPS = [
  { title:"Mount it at eye level", icon:"👁️", desc:"Position your GPS on the windshield at the bottom of your natural line of sight — you should be able to glance at it without moving your head much. Mounting too low means looking down; too high obscures your view." },
  { title:"Use voice control from day one", icon:"🎤", desc:"The voice control on Garmin DriveSmart models really works. Press the microphone button and say 'Navigate to [address]' or 'Take me home.' This is the biggest comfort improvement — no typing required while driving." },
  { title:"Set up 'Home' and 'Favourites' first", icon:"🏡", desc:"Spend 5 minutes entering your home address and any frequent destinations as Favourites. After that, getting to familiar places is one press and one word away." },
  { title:"Turn the volume up", icon:"🔊", desc:"Many drivers find the voice directions too quiet when windows are down or music is playing. On Garmin: press the volume icon on screen and turn it up. Don't be shy — you want to hear it clearly." },
  { title:"Update maps before a long trip", icon:"🗺️", desc:"If you have a Wi-Fi-enabled GPS: connect it to your home Wi-Fi a day before any long trip and let it update overnight. Fresh maps mean fewer 'road not found' moments and more accurate routing." },
];

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ ds65:0, ds55:0, drive53:0 });
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [sel, setSel] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const progress = (currentQ / QUESTIONS.length) * 100;
  const getWinner = () => {
    const max = Math.max(scores.ds65, scores.ds55, scores.drive53);
    if (scores.ds65 === max) return "ds65";
    if (scores.ds55 === max) return "ds55";
    return "drive53";
  };

  const answer = (v: string, ds65: number, ds55: number, drive53: number) => {
    setSel(v);
    setTimeout(() => {
      setScores(prev => ({ ds65:prev.ds65+ds65, ds55:prev.ds55+ds55, drive53:prev.drive53+drive53 }));
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
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,issue:`GPS for Seniors — Match: ${winner}`,source:"gps-for-seniors"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setStage("intro");setCurrentQ(0);setScores({ds65:0,ds55:0,drive53:0});setAnswers({});setSel(null);setName("");setEmail("");setSubmitted(false);};

  const winner = getWinner();
  const result = DEVICES[winner as keyof typeof DEVICES];
  const others = (["ds65","ds55","drive53"] as const).filter(id => id !== winner);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">GPS Guide for Seniors</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Built for Drivers 55+ · Plain English Throughout
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Best GPS for</span>
            <span className="block bg-gradient-to-r from-indigo-400 via-violet-300 to-purple-400 bg-clip-text text-transparent italic">Drivers Over 55</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Clear screen. Simple menus. Voice control that actually works. This guide is built specifically for drivers 55+ — no jargon, no assumptions, just the right GPS for your driving and your eyes.
          </motion.p>
          <div className="flex flex-wrap gap-5">
            {[{icon:"🖥️",t:"Large Clear Screens"},{icon:"🎤",t:"Voice Control"},{icon:"👓",t:"Glasses-Friendly"},{icon:"😊",t:"Simple to Use"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {stage === "intro" && (
            <motion.div key="intro" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-5">
              <div className="bg-indigo-900/20 border border-indigo-700 rounded-[2rem] p-7">
                <h3 className="font-black text-white text-xl mb-3">What matters most when choosing a GPS after 55?</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4">
                  {[{icon:"🖥️",title:"Screen size",desc:"The most important decision. A 6.95-inch screen is dramatically easier to read at a glance than a 5-inch. Worth the extra $30–$40."},{icon:"🎤",title:"Voice control",desc:"Speaking your destination beats typing it. Works surprisingly well on modern Garmin models."},{icon:"📞",title:"Hands-free calling",desc:"On DriveSmart models, calls come through the GPS speaker so you never need to touch your phone."},{icon:"😊",title:"Simple menus",desc:"Garmin leads the industry in clear, straightforward navigation menus — especially compared to phone apps."}].map(item=>(<div key={item.title} className="flex items-start gap-3 p-4 bg-zinc-800/50 rounded-xl"><div className="text-2xl">{item.icon}</div><div><div className="font-black text-white text-sm mb-1">{item.title}</div><div className="text-zinc-400 text-xs font-medium leading-relaxed">{item.desc}</div></div></div>))}
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.values(DEVICES).map(device => (
                  <div key={device.name} className={`bg-zinc-900 rounded-2xl border ${device.border} overflow-hidden`}>
                    <div className={`h-1 bg-gradient-to-r ${device.color}`}/>
                    <div className="p-5 text-center">
                      <div className="text-4xl mb-2">{device.emoji}</div>
                      <div className="font-black text-white text-base mb-1">{device.name}</div>
                      <div className={`text-sm font-bold ${device.text} mb-1`}>{device.screen} screen</div>
                      <div className="text-xl font-black text-white">{device.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 md:p-10">
                <h2 className="text-2xl font-black text-white mb-4">Which is right for you? 🎯</h2>
                <p className="text-zinc-400 text-lg font-medium mb-6">4 quick questions about your eyes, your driving, and how you use your phone. Get a clear recommendation with honest reasons why — plus 5 senior-specific GPS tips.</p>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-indigo-500/30">
                  Find My Best GPS Match <ArrowRight size={24}/>
                </motion.button>
              </div>
            </motion.div>
          )}

          {stage === "quiz" && (() => { const q = QUESTIONS[currentQ]; return (
            <motion.div key={`q-${currentQ}`} initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}} transition={{type:"spring",stiffness:350,damping:30}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.5}}/></div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={()=>{if(currentQ===0)setStage("intro");else setCurrentQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold transition-colors group"><ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>Back</button>
                  <div className="flex gap-2">{QUESTIONS.map((_,i)=>(<div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i<currentQ?"bg-indigo-400":i===currentQ?"bg-white scale-125":"bg-zinc-700"}`}/>))}</div>
                  <span className="text-base font-black text-zinc-400">{currentQ+1} / {QUESTIONS.length}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                <p className="text-zinc-400 text-base mb-8">{q.subtitle}</p>
                <div className="space-y-3">
                  {q.options.map((opt,i)=>(
                    <motion.button key={opt.v} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.07*i}} whileTap={{scale:0.98}}
                      onClick={()=>answer(opt.v,opt.ds65,opt.ds55,opt.drive53)}
                      className={`w-full flex items-center gap-5 p-6 rounded-2xl border-2 text-left transition-all ${sel===opt.v||answers[q.id]===opt.v?"border-indigo-500 bg-indigo-900/20 shadow-lg":"border-zinc-700 bg-zinc-800/50 hover:border-indigo-600"}`}>
                      <div className="text-4xl">{opt.icon}</div>
                      <div className="flex-1"><div className="font-black text-white text-lg">{opt.label}</div><div className="text-zinc-400 text-base mt-0.5">{opt.desc}</div></div>
                      {(sel===opt.v||answers[q.id]===opt.v)&&<CheckCircle2 size={22} className="text-indigo-400 shrink-0"/>}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          );})()}

          {stage === "results" && (
            <motion.div key="results" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-6">
              {/* Top pick */}
              <div className={`rounded-[2rem] border-2 ${result.border} bg-zinc-900 overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${result.color}`}/>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-5"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white"/></div><span className="font-black text-amber-400 uppercase tracking-widest text-sm">Best Match for You</span></div>
                  <div className="flex items-start justify-between gap-4 mb-4">
                    <div><div className="text-5xl mb-3">{result.emoji}</div><h2 className="text-3xl font-black text-white mb-2">{result.name}</h2><div className="flex items-center gap-3 flex-wrap"><span className={`text-xs font-black text-white px-3 py-1.5 rounded-full ${result.badgeColor}`}>{result.badge}</span><span className="text-zinc-400 font-bold">{result.screen} screen</span></div></div>
                    <div className="text-right shrink-0"><div className="text-3xl font-black text-white">{result.price}</div></div>
                  </div>
                  <div className={`p-5 rounded-2xl border ${result.border} ${result.bg} mb-5`}>
                    <div className={`text-sm font-black uppercase tracking-widest mb-2 ${result.text}`}>Why this one for drivers 55+</div>
                    <p className="text-base text-zinc-200 font-medium leading-relaxed">{result.whyForSeniors}</p>
                  </div>
                  <div className="space-y-2 mb-5">{result.features.map((f,i)=>(<div key={i} className="flex items-center gap-2 text-sm text-zinc-300 font-medium"><CheckCircle2 size={14} className="text-green-400 shrink-0"/>{f}</div>))}</div>
                  <div className="bg-zinc-800 rounded-2xl p-5">
                    <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">Setup</div>
                    <p className="text-base text-zinc-300 font-medium leading-relaxed">{result.setup}</p>
                  </div>
                </div>
              </div>

              {/* Other options briefly */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
                <h3 className="text-xl font-black text-white mb-5">Other options to consider</h3>
                <div className="space-y-3">
                  {others.map(id => {
                    const device = DEVICES[id];
                    return (<div key={id} className="flex items-center gap-4 p-5 bg-zinc-800 rounded-2xl"><div className="text-3xl">{device.emoji}</div><div className="flex-1"><div className="font-black text-white">{device.name}</div><div className="text-zinc-400 text-sm">{device.screen} screen · {device.price}</div></div><span className={`text-xs font-black text-white px-2 py-1 rounded-full ${device.badgeColor}`}>{device.badge}</span></div>);
                  })}
                </div>
              </div>

              {/* Senior-specific tips */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h3 className="text-2xl font-black text-white mb-6">5 GPS Tips for Drivers 55+ 💡</h3>
                <div className="space-y-4">
                  {TIPS.map((tip, i) => (
                    <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.08*i}} className="flex items-start gap-4 p-5 bg-zinc-800 rounded-2xl">
                      <div className="text-2xl">{tip.icon}</div>
                      <div><div className="font-black text-white text-base mb-1">{tip.title}</div><p className="text-zinc-400 text-sm font-medium leading-relaxed">{tip.desc}</p></div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Get your recommendation by email 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">Save your GPS match + the 5 tips for drivers 55+.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Send My GPS Guide"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="font-bold text-green-300">Sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Try Again</button>
                <Link href="/tools/gps-screen-size-selector"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS Screen Size Selector</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Prices approximate and subject to change. Not affiliated with Garmin. This guide is for educational purposes only.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
