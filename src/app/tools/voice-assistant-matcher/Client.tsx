"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, Star } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1512446733611-9099a758e5e5?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const ASSISTANTS = [
  { id:"alexa", name:"Amazon Alexa", device:"Amazon Echo Dot (5th Gen)", price:"$49.99", emoji:"🔵", badge:"Most Popular for Seniors", badgeColor:"bg-blue-600", pros:["Widest device compatibility — works with almost everything","Best for Amazon shopping & Prime Video","100,000+ Skills (mini-apps) available","Very easy setup — plug in and go","Great for reminders, timers, and routines"], cons:["Requires Amazon account","Some features need Prime subscription","Privacy: recordings stored on Amazon servers"], bestFor:"Android users, Amazon shoppers, people who want simplicity and the most device options", monthlyFee:"$0 (Prime $15/mo optional for extra features)", setupEase:"⭐⭐⭐⭐⭐ Extremely Easy" },
  { id:"google", name:"Google Assistant", device:"Google Nest Mini (2nd Gen)", price:"$49.99", emoji:"🔴", badge:"Best for Android & Google Users", badgeColor:"bg-red-600", pros:["Best answers to questions — powered by Google Search","Natural conversation — understands follow-up questions","Perfect for Android phone users","Google Photos, Calendar & Maps integration","YouTube on Nest Hub displays"], cons:["Requires Google account","Less third-party smart home options","Privacy: recordings stored on Google servers"], bestFor:"Android phone users, people who heavily use Google Search, Gmail, and Google Maps daily", monthlyFee:"$0", setupEase:"⭐⭐⭐⭐⭐ Extremely Easy" },
  { id:"siri", name:"Apple Siri / HomePod", device:"Apple HomePod Mini", price:"$99.00", emoji:"⚪", badge:"Best for iPhone Users", badgeColor:"bg-zinc-500", pros:["Seamless iPhone, iPad, and Mac integration","Strongest privacy — many requests processed on-device","Intercom between Apple devices in your home","Apple Music & Podcasts integration","No ongoing subscription needed"], cons:["Only works well with Apple devices","Most expensive entry point","Fewer third-party smart home devices","Less accurate for general trivia questions"], bestFor:"iPhone and iPad owners who are already in the Apple ecosystem and value privacy", monthlyFee:"$0", setupEase:"⭐⭐⭐⭐ Easy for iPhone users" },
];

const QUESTIONS = [
  { id:"phone", title:"What type of phone do you have?", subtitle:"This is the single most important factor", options:[{v:"iphone",label:"iPhone",icon:"🍎",s:{alexa:5,google:10,siri:40}},{v:"android",label:"Android (Samsung, etc.)",icon:"🤖",s:{alexa:20,google:40,siri:0}},{v:"basic",label:"Basic phone / not sure",icon:"📱",s:{alexa:35,google:20,siri:5}}] },
  { id:"use", title:"What will you mainly use it for?", subtitle:"Pick your most important use", options:[{v:"shop",label:"Amazon shopping & ordering",icon:"🛒",s:{alexa:45,google:5,siri:5}},{v:"questions",label:"Asking questions & getting answers",icon:"💬",s:{alexa:10,google:45,siri:20}},{v:"music",label:"Playing music & radio",icon:"🎵",s:{alexa:25,google:25,siri:30}},{v:"reminders",label:"Reminders & daily schedule",icon:"📅",s:{alexa:30,google:25,siri:25}}] },
  { id:"budget", title:"What's your budget for a smart speaker?", subtitle:"All are quality devices — pick what's comfortable", options:[{v:"low",label:"Under $50",icon:"💵",s:{alexa:40,google:40,siri:0}},{v:"mid",label:"$50 – $100",icon:"💳",s:{alexa:20,google:30,siri:20}},{v:"high",label:"$100+",icon:"💎",s:{alexa:10,google:10,siri:45}}] },
  { id:"privacy", title:"How important is privacy to you?", subtitle:"How you feel about your device listening", options:[{v:"very",label:"Very important — maximum privacy",icon:"🔒",s:{alexa:5,google:5,siri:45}},{v:"somewhat",label:"Somewhat — but convenience too",icon:"🤝",s:{alexa:25,google:25,siri:15}},{v:"notmuch",label:"Not a concern — just want it to work",icon:"✅",s:{alexa:35,google:35,siri:10}}] },
  { id:"smarthome", title:"Do you have or plan to buy smart home devices?", subtitle:"Lights, thermostat, doorbell, etc.", options:[{v:"yes-many",label:"Yes — or planning to buy several",icon:"🏠",s:{alexa:40,google:25,siri:10}},{v:"yes-few",label:"Yes — just 1-2 devices",icon:"💡",s:{alexa:25,google:25,siri:20}},{v:"no",label:"No — just want a smart speaker",icon:"🔊",s:{alexa:20,google:25,siri:25}}] },
];

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"lead"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({alexa:0,google:0,siri:0});
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const ranked = [...ASSISTANTS].map(a=>({...a,score:scores[a.id as keyof typeof scores]})).sort((a,b)=>b.score-a.score);
  const topPick = ranked[0];
  const progress = (currentQ/QUESTIONS.length)*100;

  const answer = (value: string, s: Record<string,number>) => {
    setSelectedOption(value);
    setTimeout(()=>{
      setScores(prev=>({alexa:prev.alexa+(s.alexa||0),google:prev.google+(s.google||0),siri:prev.siri+(s.siri||0)}));
      setSelectedOption(null);
      if(currentQ<QUESTIONS.length-1) setCurrentQ(p=>p+1); else setStage("lead");
    },300);
  };

  const validate = () => { const e: Record<string,string> = {}; if(!name.trim()) e.name="Please enter your name"; if(!email.trim()||!email.includes("@")) e.email="Please enter a valid email"; setErrors(e); return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,phone,brand:topPick?.name,issue:`Voice Matcher — Top Pick: ${topPick?.name}`,source:"voice-assistant-matcher"})}); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = ()=>{setStage("intro");setCurrentQ(0);setScores({alexa:0,google:0,siri:0});setSelectedOption(null);setName("");setEmail("");setPhone("");setSubmitted(false);};

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Voice Assistant Matcher</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Tool · 3 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Best Voice Assistant<br/><span className="bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent italic">for You</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Alexa, Google Assistant, or Siri? 5 questions match the best voice assistant to your phone, daily habits, and home devices — plain English, no jargon.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage==="intro"&&(<motion.div key="intro" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className="h-1.5 bg-gradient-to-r from-purple-500 to-violet-400"/><div className="p-8 md:p-10"><h2 className="text-3xl font-black text-white mb-4">Find Your Perfect Voice Assistant 🎙️</h2><p className="text-zinc-400 font-medium mb-8 text-lg leading-relaxed">We'll compare Amazon Alexa, Google Assistant, and Apple Siri across 5 key areas — phone type, usage, budget, privacy, and smart home needs. Takes about 3 minutes.</p><div className="grid grid-cols-3 gap-4 mb-8">{ASSISTANTS.map(a=>(<div key={a.id} className="bg-zinc-800 rounded-2xl p-5 text-center"><div className="text-4xl mb-3">{a.emoji}</div><div className="font-black text-white text-base mb-1">{a.name.split(" ")[1] || a.name}</div><div className="text-zinc-400 text-sm">{a.device}</div><div className="text-purple-400 font-black text-base mt-1">{a.price}</div></div>))}</div><motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-purple-500/25">Find My Voice Assistant Match <ArrowRight size={24}/></motion.button><p className="text-center text-base text-zinc-500 font-medium mt-4">🔒 No sign-up required to start</p></div></motion.div>)}
          {stage==="quiz"&&(()=>{const q=QUESTIONS[currentQ];return(<motion.div key={`q-${currentQ}`} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{type:"spring",stiffness:400,damping:35}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.4}}/></div><div className="p-8 md:p-10"><div className="flex items-center justify-between mb-8"><button onClick={()=>{if(currentQ===0)setStage("intro");else setCurrentQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors"><ArrowLeft size={18}/> Back</button><span className="text-base font-black text-zinc-400">Question {currentQ+1} of {QUESTIONS.length}</span></div><h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3><p className="text-zinc-400 font-medium text-base mb-6">{q.subtitle}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{q.options.map((opt)=>(<motion.button key={opt.v} whileTap={{scale:0.97}} onClick={()=>answer(opt.v,(opt as any).s)} className={`p-6 rounded-2xl border-2 text-left transition-all ${selectedOption===opt.v?"border-purple-500 bg-purple-900/30 shadow-lg":"border-zinc-700 bg-zinc-800/50 hover:border-purple-700"}`}><div className="text-3xl mb-3">{opt.icon}</div><div className="font-black text-white text-base">{opt.label}</div>{selectedOption===opt.v&&<motion.div initial={{scale:0}} animate={{scale:1}} className="mt-2"><CheckCircle2 size={18} className="text-purple-400"/></motion.div>}</motion.button>))}</div></div></motion.div>);})()}
          {stage==="lead"&&(<motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className="h-1.5 bg-gradient-to-r from-purple-500 to-violet-400"/><div className="p-8 md:p-10"><div className="text-center mb-8"><div className="text-6xl mb-4">🎙️</div><h2 className="text-3xl font-black text-white mb-3">We found your perfect match!</h2><p className="text-zinc-400 font-medium text-lg">Get your personalized voice assistant recommendation sent to your inbox — includes setup guide and tips.</p></div><div className="space-y-4 mb-6"><div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-purple-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div><div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-purple-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div><div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-purple-500 text-lg placeholder:text-zinc-600"/></div></div></div><motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-purple-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:"Show My Voice Assistant Match"}</motion.button><button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me the results</button></div></motion.div>)}
          {stage==="results"&&topPick&&(<motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
            {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Recommendation sent to {email}!</p></div>)}
            <div className="bg-zinc-900 rounded-[2rem] border-2 border-purple-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-purple-500 to-violet-400"/>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white"/></div><span className="font-black text-amber-400 text-base uppercase tracking-widest">Your #1 Recommended Voice Assistant{name?` for ${name}`:""}</span></div>
                <div className="flex items-start justify-between gap-4 mb-6"><div><h3 className="text-3xl font-black text-white mb-2">{topPick.emoji} {topPick.name}</h3><div className="flex items-center gap-3"><span className={`${topPick.badgeColor || "bg-blue-600"} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{topPick.badge}</span><span className="text-zinc-400 font-bold text-base">{topPick.price}</span></div></div></div>
                <div className="bg-zinc-800 rounded-2xl p-5 mb-6"><div className="font-black text-white text-lg mb-1">Best starter device: {topPick.device}</div><div className="text-zinc-400 text-base">Monthly cost: {topPick.monthlyFee}</div><div className="text-zinc-400 text-base">Setup ease: {topPick.setupEase}</div></div>
                <div className="grid grid-cols-2 gap-5 mb-6"><div><div className="text-sm font-black text-green-400 uppercase tracking-widest mb-2">✓ Pros</div>{topPick.pros.map(p=>(<div key={p} className="text-sm text-zinc-400 font-medium mb-1.5">• {p}</div>))}</div><div><div className="text-sm font-black text-red-400 uppercase tracking-widest mb-2">✗ Consider</div>{topPick.cons.map(c=>(<div key={c} className="text-sm text-zinc-400 font-medium mb-1.5">• {c}</div>))}</div></div>
                <div className="bg-purple-900/20 border border-purple-800 rounded-2xl p-4"><p className="text-base text-purple-300 font-medium">Best for: {topPick.bestFor}</p></div>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-6"><h3 className="font-black text-white mb-4 text-lg">Also consider</h3><div className="space-y-3">{ranked.slice(1).map(a=>(<div key={a.id} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-2xl"><div className="text-2xl">{a.emoji}</div><div className="flex-1"><div className="font-black text-white">{a.name}</div><div className="text-zinc-400 text-sm">{a.device} · {a.price}</div></div><span className={`${a.badgeColor || "bg-blue-600"} text-white text-sm font-black px-2.5 py-1 rounded-full`}>{a.badge}</span></div>))}</div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Try Again</button><Link href="/tools/smart-home-matcher"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Smart Home Matcher</motion.div></Link></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with Amazon, Google, or Apple. Brand names referenced for educational purposes only.</p></div></div>
          </motion.div>)}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
