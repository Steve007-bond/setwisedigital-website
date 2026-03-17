"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, Star, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1535131749006-b7f58c99034b?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1587174486073-ae5e5cff23aa?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1592919505780-303950717480?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const QUESTIONS = [
  {
    id:"precision",
    title:"How important is knowing the EXACT distance to the flag?",
    subtitle:"Laser rangefinders give precise yardage to the pin. GPS watches give front, middle, back of green.",
    options:[
      { v:"very", label:"Very important — I want the exact yardage", icon:"🎯", desc:"To the yard, every shot", watch:-10, laser:40, handheld:15 },
      { v:"somewhat", label:"Useful, but close enough is fine", icon:"👍", desc:"Front/middle/back is enough", watch:30, laser:15, handheld:25 },
      { v:"notmuch", label:"Not fussed — I'm playing for enjoyment", icon:"😊", desc:"Just a casual round", watch:40, laser:5, handheld:20 },
    ],
  },
  {
    id:"budget",
    title:"What's your budget for a golf distance device?",
    subtitle:"Rangefinders tend to cost more upfront. GPS watches are often the best value.",
    options:[
      { v:"under100", label:"Under $100", icon:"💵", desc:"Value matters most", watch:40, laser:5, handheld:30 },
      { v:"100to250", label:"$100 – $250", icon:"💳", desc:"Good mid-range", watch:35, laser:25, handheld:30 },
      { v:"over250", label:"$250 and above", icon:"💎", desc:"Best of the best", watch:20, laser:40, handheld:15 },
    ],
  },
  {
    id:"competition",
    title:"Do you play in competitions or club events?",
    subtitle:"Rangefinders with slope are NOT allowed in most competitions — the slope toggle must be off.",
    options:[
      { v:"regular", label:"Yes — I play in competitions regularly", icon:"🏆", desc:"Club events, society rounds", watch:35, laser:25, handheld:20 },
      { v:"occasional", label:"Occasionally — a few times a year", icon:"🎖️", desc:"Odd competition here and there", watch:30, laser:30, handheld:20 },
      { v:"never", label:"No — social rounds only", icon:"⛳", desc:"Just for fun with friends", watch:25, laser:35, handheld:20 },
    ],
  },
  {
    id:"comfort",
    title:"How comfortable are you with golf technology?",
    subtitle:"Some devices have a steeper learning curve than others",
    options:[
      { v:"beginner", label:"New to golf gadgets — keep it simple", icon:"😊", desc:"Easy setup is essential", watch:40, laser:20, handheld:15 },
      { v:"moderate", label:"I can follow instructions fine", icon:"👍", desc:"Happy to read a quick guide", watch:30, laser:30, handheld:25 },
      { v:"confident", label:"I'm comfortable with gadgets", icon:"🚀", desc:"More features the better", watch:20, laser:30, handheld:35 },
    ],
  },
  {
    id:"priority",
    title:"What matters most to you on the golf course?",
    subtitle:"Be honest — this shapes your best match",
    options:[
      { v:"speed", label:"Quick yardage without breaking stride", icon:"⚡", desc:"Glance at my wrist and go", watch:50, laser:10, handheld:15 },
      { v:"accuracy", label:"Pin-point accuracy on every approach", icon:"🎯", desc:"Exactly how far to the stick", watch:5, laser:50, handheld:20 },
      { v:"course", label:"Full course layout — hazards, bunkers, all of it", icon:"🗺️", desc:"See the whole hole at a glance", watch:25, laser:10, handheld:45 },
      { v:"value", label:"Best value for money", icon:"💰", desc:"Good performance, fair price", watch:35, laser:15, handheld:30 },
    ],
  },
];

const RESULTS = {
  watch: {
    verdict:"A GPS Watch is Your Best Match",
    emoji:"⌚",
    color:"from-green-500 to-emerald-400",
    border:"border-green-700",
    bg:"bg-green-900/20",
    text:"text-green-300",
    summary:"A GPS watch is the most convenient and most popular choice among golfers 45+. Quick yardage at a glance, no aiming required, and it doubles as a regular watch between rounds.",
    whyYou:["You value convenience — yardage without raising a device to your eye","Speed of play matters to you — glance and go","You want something that works in competitions without worry","Best overall value for regular golfers"],
    picks:[
      { name:"Garmin Approach S12", price:"$149–$199", badge:"Best Value GPS Watch", desc:"40,000+ preloaded courses. Simple, clear display. Doesn't require a phone. Battery lasts a full season of rounds. The one most golfers should start with." },
      { name:"Bushnell iON Elite", price:"$159–$199", badge:"Best Looking", desc:"Premium Bushnell quality in a sleek design. 38,000+ courses worldwide. No subscription fee. Great for golfers who want a stylish option." },
      { name:"Garmin Approach S42", price:"$249–$299", badge:"Best Full Features", desc:"GPS yardages plus shot tracking, health monitoring, and smartwatch functions. One device for golf and everyday life." },
    ],
    subscriptionNote:"Most GPS watches: no monthly fee. Garmin Golf app is optional ($9.99/mo) for advanced stats.",
  },
  laser: {
    verdict:"A Laser Rangefinder is Your Best Match",
    emoji:"🔭",
    color:"from-blue-500 to-indigo-400",
    border:"border-blue-700",
    bg:"bg-blue-900/20",
    text:"text-blue-300",
    summary:"A laser rangefinder gives you the most precise distance measurement available. If exact yardage to the pin is important to your game, a laser is the tool serious golfers choose.",
    whyYou:["Exact pin distance matters to you — GPS watches give front/middle/back, not pin","You're willing to pay more for precision","You play courses with unusual flag positions or elevated greens","You trust your distances more when they come from a laser"],
    picks:[
      { name:"Bushnell Tour V6 Shift", price:"$329–$399", badge:"Best Overall Laser", desc:"The most popular golf rangefinder for club golfers. Slope-adjusted distances, tournament mode to turn slope off for competitions, clear optics, and the trusted Bushnell name." },
      { name:"Precision Pro NX9", price:"$179–$199", badge:"Best Budget Laser", desc:"90% of what premium rangefinders offer at 40% of the price. Slope adjusted, accurate to within a yard, solid build quality. Excellent value." },
      { name:"Blue Tees Series 3 Max", price:"$159–$179", badge:"Best Under $200", desc:"Disrupted the market with premium performance at a budget price. Multiple colour options, slope toggle, accurate readings. Hard to beat at this price." },
    ],
    subscriptionNote:"Laser rangefinders: one-time purchase. No monthly fees ever. Most models include a 2-year warranty.",
  },
  handheld: {
    verdict:"A Handheld Golf GPS is Your Best Match",
    emoji:"📟",
    color:"from-purple-500 to-violet-400",
    border:"border-purple-700",
    bg:"bg-purple-900/20",
    text:"text-purple-300",
    summary:"A handheld golf GPS shows you the entire hole — course layout, hazard distances, green dimensions — all in one clear view. Perfect for golfers who like to plan and strategise each hole.",
    whyYou:["You want to see the full hole layout, not just the green distance","Course management matters to your game","You play unfamiliar courses and want full layout information","Best for golfers who love knowing hazard distances and carry distances"],
    picks:[
      { name:"Bushnell Phantom 3 Slope GPS", price:"$149–$169", badge:"Best Handheld GPS", desc:"Simple touchscreen, slope-adjusted distances, shows full green view. Refreshingly simple to use — press a button, get your distance, go. No app required." },
      { name:"Garmin Approach G12", price:"$99–$119", badge:"Best Budget Handheld", desc:"40,000 courses preloaded. Simple clip-on design. Green view, hazard distances, shot measurement. The affordable way to get full course GPS." },
    ],
    subscriptionNote:"Handheld GPS: no subscription fee. Maps are free and preloaded.",
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"lead"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ watch:0, laser:0, handheld:0 });
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const progress = (currentQ / QUESTIONS.length) * 100;

  const getWinner = () => {
    const max = Math.max(scores.watch, scores.laser, scores.handheld);
    if (scores.watch === max) return "watch";
    if (scores.laser === max) return "laser";
    return "handheld";
  };

  const answer = (v: string, watch: number, laser: number, handheld: number) => {
    setSelectedOption(v);
    setTimeout(() => {
      setScores(prev => ({ watch:prev.watch+watch, laser:prev.laser+laser, handheld:prev.handheld+handheld }));
      setAnswers(prev => ({...prev,[QUESTIONS[currentQ].id]:v}));
      setSelectedOption(null);
      if (currentQ < QUESTIONS.length-1) setCurrentQ(p=>p+1);
      else setStage("lead");
    }, 300);
  };

  const validate = () => { const e: Record<string,string>={};if(!name.trim())e.name="Please enter your name";if(!email.trim()||!email.includes("@"))e.email="Please enter a valid email";setErrors(e);return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate())return;setSubmitting(true);
    const winner = getWinner();
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,phone,issue:`Golf GPS — Verdict: ${winner}`,source:"golf-gps-decider"})});}catch{}
    setSubmitted(true);setSubmitting(false);setStage("results");
  };
  const reset = () => {setStage("intro");setCurrentQ(0);setScores({watch:0,laser:0,handheld:0});setAnswers({});setSelectedOption(null);setName("");setEmail("");setPhone("");setSubmitted(false);};

  const winner = getWinner();
  const result = RESULTS[winner as keyof typeof RESULTS];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[80vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">Golf GPS Decider</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free · 5 Questions · Instant Verdict
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Golf GPS Watch,</span>
            <span className="block bg-gradient-to-r from-green-400 via-emerald-300 to-teal-400 bg-clip-text text-transparent italic">Rangefinder, or Handheld?</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Which golf distance tool is right for your game? 5 questions about how you play, your budget, and what matters to you — get a personalised match in 3 minutes.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className="flex flex-wrap gap-6">
            {[{icon:"⌚",t:"GPS Watch"},{icon:"🔭",t:"Laser Rangefinder"},{icon:"📟",t:"Handheld GPS"},{icon:"⛳",t:"All Skill Levels"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {stage === "intro" && (
            <motion.div key="intro" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { name:"GPS Watch", emoji:"⌚", key:"watch", color:"from-green-500 to-emerald-400", border:"border-green-800", points:["Glance at wrist — instant yardage","40,000+ courses worldwide","No subscription fees","Good in competitions","Best value overall"] },
                  { name:"Laser Rangefinder", emoji:"🔭", key:"laser", color:"from-blue-500 to-indigo-400", border:"border-blue-800", points:["Exact distance to the flag","Point and measure anything","Slope-adjusted distances","Most accurate option","Trusted by tour pros"] },
                  { name:"Handheld GPS", emoji:"📟", key:"handheld", color:"from-purple-500 to-violet-400", border:"border-purple-800", points:["Full hole layout on screen","Hazard distances included","Course management view","No aiming required","Great for new courses"] },
                ].map(opt => (
                  <div key={opt.key} className={`bg-zinc-900 rounded-[2rem] border ${opt.border} overflow-hidden`}>
                    <div className={`h-1.5 bg-gradient-to-r ${opt.color}`}/>
                    <div className="p-6">
                      <div className="text-4xl mb-3">{opt.emoji}</div>
                      <h3 className="font-black text-white text-lg mb-4">{opt.name}</h3>
                      {opt.points.map(p=>(<div key={p} className="flex items-center gap-2 text-sm text-zinc-400 font-medium mb-1.5"><CheckCircle2 size={12} className="text-green-400 shrink-0"/>{p}</div>))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 md:p-10">
                <h2 className="text-3xl font-black text-white mb-4">Which one fits YOUR game? ⛳</h2>
                <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">There's no single right answer — each has genuine strengths. 5 questions about how you play, your budget, and what matters most. You'll get an honest recommendation with specific product picks.</p>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-green-500/30">
                  Find My Golf GPS Match <ArrowRight size={24}/>
                </motion.button>
                <p className="text-center text-base text-zinc-500 mt-4">🔒 No sign-up needed to start</p>
              </div>
            </motion.div>
          )}

          {stage === "quiz" && (() => { const q = QUESTIONS[currentQ]; return (
            <motion.div key={`q-${currentQ}`} initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}} transition={{type:"spring",stiffness:350,damping:30}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden shadow-2xl">
              <div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-green-500 to-emerald-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.5}}/></div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={()=>{if(currentQ===0)setStage("intro");else setCurrentQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors group"><ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>Back</button>
                  <div className="flex items-center gap-2">{QUESTIONS.map((_,i)=>(<div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i<currentQ?"bg-green-400":i===currentQ?"bg-white scale-125":"bg-zinc-700"}`}/>))}</div>
                  <span className="text-base font-black text-zinc-400">{currentQ+1} / {QUESTIONS.length}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                <p className="text-zinc-400 text-base font-medium mb-8">{q.subtitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt,i)=>(
                    <motion.button key={opt.v} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.05*i}} whileTap={{scale:0.97}}
                      onClick={()=>answer(opt.v,opt.watch,opt.laser,opt.handheld)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${selectedOption===opt.v||answers[q.id]===opt.v?"border-green-500 bg-green-900/30 shadow-lg":"border-zinc-700 bg-zinc-800/50 hover:border-green-600"}`}>
                      <div className="text-3xl mb-3">{opt.icon}</div>
                      <div className="font-black text-white text-base mb-1">{opt.label}</div>
                      <div className="text-zinc-400 text-sm">{opt.desc}</div>
                      {(selectedOption===opt.v||answers[q.id]===opt.v)&&<motion.div initial={{scale:0}} animate={{scale:1}} className="mt-2"><CheckCircle2 size={18} className="text-green-400"/></motion.div>}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          );})()}

          {stage === "lead" && (
            <motion.div key="lead" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400"/>
              <div className="p-8 md:p-10">
                <div className="text-center mb-8"><div className="text-7xl mb-5">⛳</div><h2 className="text-3xl font-black text-white mb-3">Your match is ready!</h2><p className="text-zinc-400 text-lg font-medium leading-relaxed">Get your personalised golf GPS verdict + product recommendations sent to your inbox.</p></div>
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. John" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600"/></div></div>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:<><Star size={22}/>Show My Golf GPS Match</>}</motion.button>
                <button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 py-2">Skip — just show me my result</button>
              </div>
            </motion.div>
          )}

          {stage === "results" && (
            <motion.div key="results" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-6">
              {submitted&&<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="text-base font-bold text-green-300">Result sent to {email}!</p></div>}

              <div className={`rounded-[2rem] border-2 ${result.border} bg-zinc-900 overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${result.color}`}/>
                <div className="p-8 md:p-10">
                  <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",delay:0.1}} className="text-6xl mb-5">{result.emoji}</motion.div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-4 ${result.bg} ${result.text} border ${result.border}`}>Our Verdict</div>
                  <h2 className="text-3xl font-black text-white mb-4">{result.verdict}</h2>
                  <p className="text-zinc-300 text-lg font-medium leading-relaxed mb-7">{result.summary}</p>
                  <div className="space-y-3 mb-7">
                    {result.whyYou.map((r,i)=>(<motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.1*i}} className="flex items-start gap-3"><CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5"/><p className="text-base text-zinc-300 font-medium">{r}</p></motion.div>))}
                  </div>
                  {result.subscriptionNote && (
                    <div className="bg-blue-900/20 border border-blue-800 rounded-xl p-4 flex items-start gap-3">
                      <AlertCircle size={16} className="text-blue-400 mt-0.5 shrink-0"/>
                      <p className="text-sm text-blue-300 font-medium">{result.subscriptionNote}</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${result.color}`}/>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-white mb-6">Top Picks for You</h3>
                  <div className="space-y-4">
                    {result.picks.map((pick,i)=>(
                      <motion.div key={pick.name} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1*i}} className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700">
                        <div className="flex items-start justify-between gap-4 mb-3">
                          <div>{i===0&&<div className="flex items-center gap-2 mb-2"><Star size={14} className="text-amber-400 fill-amber-400"/><span className="text-sm font-black text-amber-400 uppercase tracking-widest">Top Pick</span></div>}<h4 className="text-xl font-black text-white">{pick.name}</h4></div>
                          <div className="text-right"><div className="text-xl font-black text-white">{pick.price}</div><div className="text-xs font-black text-white mt-1 px-2 py-1 rounded-full bg-zinc-600">{pick.badge}</div></div>
                        </div>
                        <p className="text-base text-zinc-300 font-medium leading-relaxed">{pick.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Try Again</button>
                <Link href="/tools/gps-budget-finder"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS Budget Finder</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with Garmin, Bushnell, Precision Pro, or Blue Tees. Competition rules vary — always check with your club or competition organiser before using any device.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="border-t border-zinc-800 py-20 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-10">GPS Watch vs Laser Rangefinder — The Honest Truth</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[{title:"GPS Watch: Best for Most Golfers",body:"GPS watches are the best all-around choice for the majority of recreational golfers. They're fast to use, work in competitions without worry, no monthly fees, and front/middle/back yardages are enough for most shots. The Garmin Approach S12 at $149–$199 is where most golfers should start."},{title:"Laser Rangefinder: Best for Precision",body:"If you want exact pin yardage and you're willing to pay more, a laser rangefinder delivers it. Bushnell and Precision Pro are the two most trusted brands. Just ensure any rangefinder you use in competitions has a tournament mode to disable slope — USGA rules require it."},{title:"Many Golfers Use Both",body:"It's common for keen golfers to use a GPS watch for quick hole overviews and hazard distances, then switch to a rangefinder on approach shots within 150 yards for pin precision. Both tools serve different purposes and complement each other well."}].map(item=>(<div key={item.title} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-7"><h3 className="font-black text-white text-lg mb-3">{item.title}</h3><p className="text-zinc-400 text-base font-medium leading-relaxed">{item.body}</p></div>))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
