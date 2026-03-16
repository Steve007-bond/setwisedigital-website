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
  { url:"https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1556228578-8c89e6adf883?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
];

const SYSTEMS = [
  { id:"alexa", name:"Amazon Alexa", device:"Amazon Echo", priceRange:"$29–$249", emoji:"🔵", badge:"Most Popular for Seniors", badgeColor:"bg-blue-600", pros:["Widest device compatibility","Best shopping integration","Most Alexa Skills available","Works with almost everything","Easy to set up and use"], cons:["Requires Amazon account","Less private than others","Some features need Prime"], bestFor:"Android users, Amazon shoppers, people who want simplicity", features:["100,000+ compatible smart home devices","Amazon shopping by voice","Music via Amazon Music, Spotify, Apple Music","Phone calls & messaging","Reminders & routines"], monthlyFee:"$0 (optional Prime $15/mo for more features)", setupDifficulty:"Very Easy", score:0 },
  { id:"google", name:"Google Nest", device:"Google Nest Hub", priceRange:"$49–$229", emoji:"🔴", badge:"Best for Android Users", badgeColor:"bg-red-600", pros:["Best answers to questions","Excellent for Android phones","Google Photos integration","Natural conversation flow","YouTube on smart displays"], cons:["Requires Google account","Some privacy concerns","Less third-party skills"], bestFor:"Android phone users, people who use Google Search and Maps", features:["Answers complex questions via Google","Google Photos slideshows","Maps and directions","Calendar and reminders","YouTube on Nest Hub displays"], monthlyFee:"$0", setupDifficulty:"Easy", score:0 },
  { id:"apple", name:"Apple HomeKit / Siri", device:"Apple HomePod Mini", priceRange:"$99–$299", emoji:"⚪", badge:"Best for iPhone Users", badgeColor:"bg-zinc-600", pros:["Best iPhone integration","Strongest privacy & security","Works seamlessly with iPad/Mac","Home app is very organized","No subscription needed"], cons:["Only works well with Apple devices","Most expensive","Fewer compatible third-party devices"], bestFor:"iPhone users, people who value privacy, Apple device owners", features:["Tight integration with iPhone and iPad","High privacy — processes locally","Apple Music and podcasts","Works with HomeKit devices","FaceTime audio calls"], monthlyFee:"$0", setupDifficulty:"Easy for iPhone users", score:0 },
];

const QUESTIONS = [
  { id:"phone", title:"What type of phone do you have?", subtitle:"This is the most important factor for smart home compatibility", options:[{value:"iphone",label:"iPhone (Apple)",icon:"🍎",scores:{alexa:15,google:5,apple:35}},{value:"android",label:"Android (Samsung, etc.)",icon:"🤖",scores:{alexa:25,google:35,apple:5}},{value:"basic",label:"Basic phone / not sure",icon:"📱",scores:{alexa:30,google:20,apple:5}}] },
  { id:"use", title:"What do you mainly want to do with a smart speaker?", subtitle:"Choose your top use", options:[{value:"reminders",label:"Reminders & daily schedule",icon:"📅",scores:{alexa:30,google:25,apple:20}},{value:"music",label:"Play music & radio",icon:"🎵",scores:{alexa:30,google:25,apple:25}},{value:"shopping",label:"Shopping & Amazon orders",icon:"🛒",scores:{alexa:40,google:10,apple:5}},{value:"questions",label:"Ask questions & get answers",icon:"💬",scores:{alexa:15,google:40,apple:20}}] },
  { id:"budget", title:"What's your budget for a smart speaker?", subtitle:"All are quality devices — pick what's comfortable", options:[{value:"low",label:"Under $50",icon:"💵",scores:{alexa:40,google:15,apple:0}},{value:"mid",label:"$50 – $150",icon:"💳",scores:{alexa:25,google:35,apple:15}},{value:"high",label:"$150+",icon:"💎",scores:{alexa:15,google:25,apple:40}}] },
  { id:"privacy", title:"How important is privacy to you?", subtitle:"How you feel about your smart device 'listening'", options:[{value:"very",label:"Very important — I want maximum privacy",icon:"🔒",scores:{alexa:10,google:10,apple:40}},{value:"somewhat",label:"Somewhat important — but convenience matters too",icon:"🤝",scores:{alexa:25,google:25,apple:20}},{value:"notmuch",label:"Not a concern — I just want it to work",icon:"✅",scores:{alexa:30,google:30,apple:15}}] },
  { id:"tech", title:"How comfortable are you with technology?", subtitle:"This helps us recommend the simplest option for you", options:[{value:"beginner",label:"Keep it very simple",icon:"😊",scores:{alexa:35,google:20,apple:15}},{value:"okay",label:"I manage okay",icon:"👍",scores:{alexa:25,google:30,apple:25}},{value:"confident",label:"Pretty comfortable",icon:"🚀",scores:{alexa:15,google:25,apple:35}}] },
];

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"lead"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({alexa:0,google:0,apple:0});
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const ranked = [...SYSTEMS].map(s=>({...s,score:scores[s.id as keyof typeof scores]})).sort((a,b)=>b.score-a.score);
  const topPick = ranked[0];
  const progress = (currentQ/QUESTIONS.length)*100;

  const answerQuestion = (value: string, optionScores: Record<string,number>) => {
    setSelectedOption(value);
    setTimeout(()=>{
      setScores(prev=>({alexa:prev.alexa+(optionScores.alexa||0),google:prev.google+(optionScores.google||0),apple:prev.apple+(optionScores.apple||0)}));
      setSelectedOption(null);
      if(currentQ<QUESTIONS.length-1) setCurrentQ(p=>p+1); else setStage("lead");
    },300);
  };

  const validate = () => { const e: Record<string,string> = {}; if(!name.trim()) e.name="Please enter your name"; if(!email.trim()||!email.includes("@")) e.email="Please enter a valid email"; setErrors(e); return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,phone,brand:topPick?.name,issue:`Smart Home Matcher — Top Pick: ${topPick?.name}`,source:"smart-home-matcher"})}); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = ()=>{ setStage("intro"); setCurrentQ(0); setScores({alexa:0,google:0,apple:0}); setSelectedOption(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Smart Home Matcher</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Tool · 4 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Smart Home<br/><span className="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent italic">Starter Matcher</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Alexa, Google Nest, or Apple HomeKit? 5 plain-English questions match the right smart home system to your lifestyle — no technical knowledge needed.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage==="intro"&&(<motion.div key="intro" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-400"/><div className="p-8 md:p-10"><h2 className="text-3xl font-black text-white mb-4">Find Your Perfect Smart Home Match 🏠</h2><p className="text-zinc-400 font-medium mb-8 text-lg leading-relaxed">We'll compare Amazon Alexa, Google Nest, and Apple HomeKit across 5 questions — phone type, usage, budget, privacy, and tech comfort.</p><div className="grid grid-cols-3 gap-4 mb-8">{SYSTEMS.map(s=>(<div key={s.id} className="bg-zinc-800 rounded-2xl p-5 text-center"><div className="text-4xl mb-3">{s.emoji}</div><div className="font-black text-white text-base mb-1">{s.name}</div><div className="text-zinc-400 text-sm">{s.priceRange}</div></div>))}</div><motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25">Find My Smart Home Match <ArrowRight size={24}/></motion.button></div></motion.div>)}
          {stage==="quiz"&&(()=>{const q=QUESTIONS[currentQ];return(<motion.div key={`q-${currentQ}`} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{type:"spring",stiffness:400,damping:35}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.4}}/></div><div className="p-8 md:p-10"><div className="flex items-center justify-between mb-8"><button onClick={()=>{if(currentQ===0)setStage("intro");else setCurrentQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors"><ArrowLeft size={18}/> Back</button><span className="text-base font-black text-zinc-400">Question {currentQ+1} of {QUESTIONS.length}</span></div><h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3><p className="text-zinc-400 font-medium text-base mb-6">{q.subtitle}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{q.options.map((opt)=>(<motion.button key={opt.value} whileTap={{scale:0.97}} onClick={()=>answerQuestion(opt.value,(opt as any).scores)} className={`p-6 rounded-2xl border-2 text-left transition-all ${selectedOption===opt.value?"border-amber-500 bg-amber-900/30 shadow-lg":"border-zinc-700 bg-zinc-800/50 hover:border-amber-700"}`}><div className="text-3xl mb-3">{opt.icon}</div><div className="font-black text-white text-base">{opt.label}</div>{selectedOption===opt.value&&<motion.div initial={{scale:0}} animate={{scale:1}} className="mt-2"><CheckCircle2 size={18} className="text-amber-400"/></motion.div>}</motion.button>))}</div></div></motion.div>);})()}
          {stage==="lead"&&(<motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-400"/><div className="p-8 md:p-10"><div className="text-center mb-8"><div className="text-6xl mb-4">🏠</div><h2 className="text-3xl font-black text-white mb-3">We found your perfect match!</h2><p className="text-zinc-400 font-medium text-lg">Get your personalized smart home recommendation sent to your inbox.</p></div><div className="space-y-4 mb-6"><div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div><div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div><div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div></div></div><motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:"Show My Smart Home Match"}</motion.button><button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me the results</button><p className="text-center text-sm text-zinc-600 mt-3">🔒 No spam. Unsubscribe anytime.</p></div></motion.div>)}
          {stage==="results"&&topPick&&(<motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
            {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Recommendation sent to {email}!</p></div>)}
            <div className="bg-zinc-900 rounded-[2rem] border-2 border-amber-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-400"/>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white"/></div><span className="font-black text-amber-400 text-base uppercase tracking-widest">Your #1 Recommended Smart Home System{name?` for ${name}`:""}</span></div>
                <div className="flex items-start justify-between gap-4 mb-6"><div><h3 className="text-3xl font-black text-white mb-2">{topPick.emoji} {topPick.name}</h3><div className="flex items-center gap-3"><span className={`${topPick.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{topPick.badge}</span><span className="text-zinc-400 font-bold text-base">{topPick.priceRange}</span></div></div></div>
                <div className="bg-zinc-800 rounded-2xl p-5 mb-6"><div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">Best starter device</div><div className="font-black text-white text-lg">{topPick.device}</div><div className="text-zinc-400 text-base mt-1">Monthly cost: {topPick.monthlyFee} · Setup: {topPick.setupDifficulty}</div></div>
                <div className="grid grid-cols-2 gap-5 mb-6"><div><div className="text-sm font-black text-green-400 uppercase tracking-widest mb-2">✓ Pros</div>{topPick.pros.map(p=>(<div key={p} className="text-sm text-zinc-400 font-medium mb-1.5">• {p}</div>))}</div><div><div className="text-sm font-black text-red-400 uppercase tracking-widest mb-2">✗ Consider</div>{topPick.cons.map(c=>(<div key={c} className="text-sm text-zinc-400 font-medium mb-1.5">• {c}</div>))}</div></div>
                <div className="space-y-2 mb-6"><div className="text-base font-black text-zinc-200 mb-2">Key features:</div>{topPick.features.map(f=>(<div key={f} className="flex items-center gap-2 text-base text-zinc-300 font-medium"><CheckCircle2 size={16} className="text-amber-400 shrink-0"/>{f}</div>))}</div>
                <div className="bg-amber-900/20 border border-amber-800 rounded-2xl p-4"><p className="text-base text-amber-300 font-medium">Best for: {topPick.bestFor}</p></div>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-6"><h3 className="font-black text-white mb-4 text-lg">Also consider</h3><div className="space-y-3">{ranked.slice(1).map(s=>(<div key={s.id} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-2xl"><div className="text-2xl">{s.emoji}</div><div className="flex-1"><div className="font-black text-white">{s.name}</div><div className="text-zinc-400 text-sm">{s.priceRange} · {s.device}</div></div><span className={`${s.badgeColor} text-white text-sm font-black px-2.5 py-1 rounded-full`}>{s.badge}</span></div>))}</div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Try Again</button><Link href="/tools/home-security-audit"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-red-600 to-rose-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Security Audit Tool</motion.div></Link></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with Amazon, Google, or Apple. Brand names referenced for educational purposes only.</p></div></div>
          </motion.div>)}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
