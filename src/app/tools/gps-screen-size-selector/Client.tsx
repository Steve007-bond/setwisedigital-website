"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, User, Loader2, Shield, Zap, RefreshCw, Star } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const QUESTIONS = [
  {
    id:"glasses",
    title:"Do you wear reading glasses or find small text hard to read?",
    subtitle:"This is the single most important question for choosing the right screen size",
    options:[
      { v:"yes-always", label:"Yes — I always wear glasses for reading", icon:"👓", desc:"Small text is difficult without them", size5:-20, size55:-5, size7:40 },
      { v:"yes-sometimes", label:"Sometimes — depends on lighting", icon:"🔍", desc:"Small text in bright light is fine", size5:-5, size55:20, size7:25 },
      { v:"no", label:"No — my eyesight is fine for reading", icon:"👁️", desc:"Small text is no problem", size5:25, size55:30, size7:10 },
    ],
  },
  {
    id:"driving_type",
    title:"Where do you drive most often?",
    subtitle:"Different environments call for different screen sizes",
    options:[
      { v:"city", label:"City streets and busy roads", icon:"🏙️", desc:"Lots of turns, need quick glances", size5:20, size55:25, size7:15 },
      { v:"highway", label:"Highways and open roads", icon:"🛣️", desc:"Long stretches, fewer turns", size5:15, size55:20, size7:30 },
      { v:"mixed", label:"A mix of both equally", icon:"🗺️", desc:"City and highway driving", size5:15, size55:30, size7:20 },
      { v:"unfamiliar", label:"Lots of unfamiliar roads and places", icon:"❓", desc:"New areas, need to study the screen", size5:5, size55:15, size7:40 },
    ],
  },
  {
    id:"dash_space",
    title:"How much space is on your windshield or dashboard for a GPS?",
    subtitle:"Larger screens take more space — good to know before you buy",
    options:[
      { v:"plenty", label:"Plenty of space — no problem", icon:"✅", desc:"Room on the windshield or dash", size5:10, size55:20, size7:35 },
      { v:"some", label:"Some space — not hugely limited", icon:"🤔", desc:"Could fit most sizes", size5:15, size55:35, size7:15 },
      { v:"tight", label:"My car is compact — space is tight", icon:"🚗", desc:"Small car or busy dashboard", size5:40, size55:25, size7:5 },
    ],
  },
  {
    id:"passenger",
    title:"Will a passenger often look at the screen too?",
    subtitle:"Two pairs of eyes means a larger screen is more useful",
    options:[
      { v:"often", label:"Yes — someone often navigates with me", icon:"👥", desc:"Partner or passenger uses it too", size5:5, size55:15, size7:35 },
      { v:"sometimes", label:"Sometimes — occasional trips together", icon:"🤝", desc:"Usually drive alone but not always", size5:15, size55:30, size7:20 },
      { v:"never", label:"Always drive alone", icon:"🧑", desc:"Just for me", size5:30, size55:30, size7:10 },
    ],
  },
];

const SCREEN_RESULTS = {
  size5: {
    size: "5 inch",
    emoji: "📱",
    label:"5-Inch Screen",
    tagline:"Compact and clear — ideal for smaller cars",
    color: "from-green-500 to-emerald-400",
    border: "border-green-700",
    bg: "bg-green-900/20",
    text: "text-green-300",
    summary:"A 5-inch screen is a great fit for your situation. Compact enough for tight dashboards, still clear and readable for everyday navigation.",
    whyFits:["Good match for your driving style and car size","Sufficient for clear turn-by-turn directions","Lighter and less obstructive on the windshield"],
    devices:[
      { name:"Garmin DriveSmart 55", price:"$149–$179", screen:"5.5 inch", badge:"Best 5-inch", desc:"Slightly larger than 5-inch at 5.5 inches — the best balance of compact size and clear readability. Live traffic, Bluetooth, voice control." },
      { name:"Garmin Drive 53", price:"$89–$109", screen:"5 inch", badge:"Best Budget", desc:"Simple, clean 5-inch GPS. Perfect entry-level choice if you want reliable navigation without extra features." },
    ],
    mountingTip:"5-inch GPS units mount cleanly on any windshield or dashboard. Use the included suction mount on the windshield for the best viewing angle — just below your natural eye line.",
  },
  size55: {
    size: "5.5 inch",
    emoji: "📺",
    label:"5.5-Inch Screen",
    tagline:"The sweet spot — most popular choice",
    color: "from-blue-500 to-indigo-400",
    border: "border-blue-700",
    bg: "bg-blue-900/20",
    text: "text-blue-300",
    summary:"A 5.5-inch screen is the most popular choice — and for good reason. It's the perfect balance between compact size and easy readability. Works well on all car types and for most driving styles.",
    whyFits:["Comfortable to glance at without being distracting","Large enough to read clearly in most lighting conditions","Fits all car types — small cars to SUVs"],
    devices:[
      { name:"Garmin DriveSmart 55", price:"$149–$179", screen:"5.5 inch", badge:"#1 Most Popular", desc:"The most popular GPS in North America for good reason. 5.5-inch screen, live traffic, Bluetooth, voice control, Wi-Fi updates. The one most drivers should buy." },
      { name:"TomTom GO Comfort 6", price:"$149–$169", screen:"6 inch", badge:"Good Alternative", desc:"TomTom's popular mid-range model at 6 inches. Strong real-time traffic, Wi-Fi updates, free lifetime maps." },
    ],
    mountingTip:"5.5-inch screens are the easiest to position well. Mount at eye level on the windshield — aim for the lower corner of the passenger side so it doesn't block your forward view.",
  },
  size7: {
    size: "6.95 to 7 inch",
    emoji: "🖥️",
    label:"6.95-Inch (Large) Screen",
    tagline:"Biggest and clearest — best for seniors 50+",
    color: "from-purple-500 to-violet-400",
    border: "border-purple-700",
    bg: "bg-purple-900/20",
    text: "text-purple-300",
    summary:"A large 6.95-inch or 7-inch screen is absolutely the right choice for you. Dramatically easier to read at a glance — especially in bright sunlight or if you wear glasses. Many drivers over 50 say they'll never go back to a smaller screen.",
    whyFits:["Much easier to read without straining","Text and map details are noticeably larger and clearer","Worth the extra $20–$30 for the comfort it provides"],
    devices:[
      { name:"Garmin DriveSmart 65", price:"$179–$219", screen:"6.95 inch", badge:"Best Large Screen GPS", desc:"The top choice for drivers 50+ and anyone who wants an easy-to-read screen. Same features as the DriveSmart 55 — live traffic, Bluetooth, voice control — but with a significantly larger, clearer display." },
      { name:"Garmin DriveSmart 76", price:"$219–$249", screen:"7 inch", badge:"Premium Large Screen", desc:"Garmin's flagship with the best voice recognition available. Understands natural speech — just say 'Take me home' and it goes. 7-inch premium display." },
      { name:"Garmin RV 895", price:"$299–$349", screen:"8 inch", badge:"Largest — RV Drivers", desc:"For RV and motorhome drivers only: 8-inch screen, RV routing, campground database. Overkill for regular cars but superb for large vehicle drivers." },
    ],
    mountingTip:"Larger GPS units need a stable mount. Use the included suction cup on the windshield — or consider a dashboard friction mount if your windshield is raked (angled). Make sure it doesn't block your view of the road ahead.",
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ size5:0, size55:0, size7:0 });
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [sel, setSel] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const progress = (currentQ / QUESTIONS.length) * 100;
  const getWinner = () => {
    const max = Math.max(scores.size5, scores.size55, scores.size7);
    if (scores.size7 === max) return "size7";
    if (scores.size55 === max) return "size55";
    return "size5";
  };
  const winner = getWinner();
  const result = SCREEN_RESULTS[winner as keyof typeof SCREEN_RESULTS];

  const answer = (v: string, s5: number, s55: number, s7: number) => {
    setSel(v);
    setTimeout(() => {
      setScores(prev => ({ size5:prev.size5+s5, size55:prev.size55+s55, size7:prev.size7+s7 }));
      setAnswers(prev => ({...prev,[QUESTIONS[currentQ].id]:v}));
      setSel(null);
      if (currentQ < QUESTIONS.length-1) setCurrentQ(p=>p+1);
      else setStage("results");
    }, 300);
  };

  const validate = () => { const e: Record<string,string>={};if(!name.trim())e.name="Please enter your name";if(!email.trim()||!email.includes("@"))e.email="Please enter a valid email";setErrors(e);return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate())return;setSubmitting(true);
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,issue:`Screen Size — Recommended: ${result.size}`,source:"gps-screen-size-selector"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setStage("intro");setCurrentQ(0);setScores({size5:0,size55:0,size7:0});setAnswers({});setSel(null);setName("");setEmail("");setSubmitted(false);};

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">GPS Screen Size Selector</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-purple-500/10 border border-purple-500/30 text-purple-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free · 4 Questions · Instant Size Match
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">What GPS Screen</span>
            <span className="block bg-gradient-to-r from-purple-400 via-violet-300 to-pink-400 bg-clip-text text-transparent italic">Size is Right for You?</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            5-inch, 5.5-inch, or 7-inch? 4 questions about your eyes, your car, and how you drive — get the right screen size recommendation with specific device picks.
          </motion.p>
          <div className="flex flex-wrap gap-6">
            {[{icon:"📱",t:"5 inch"},{icon:"📺",t:"5.5 inch"},{icon:"🖥️",t:"6.95–7 inch"},{icon:"👓",t:"Senior-Friendly Options"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {stage === "intro" && (
            <motion.div key="intro" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {[
                  { size:"5 inch", emoji:"📱", color:"from-green-500 to-emerald-400", border:"border-green-800", points:["Compact — fits small cars","Great for city driving","Slightly harder to read","Models from $89"] },
                  { size:"5.5 inch", emoji:"📺", color:"from-blue-500 to-indigo-400", border:"border-blue-800", points:["Most popular size","Clear without being huge","Works in all cars","Models from $149"] },
                  { size:"6.95–7 inch", emoji:"🖥️", color:"from-purple-500 to-violet-400", border:"border-purple-800", points:["Easiest to read driving","Best for glasses wearers","Needs more dash space","Models from $179"] },
                ].map(opt => (
                  <div key={opt.size} className={`bg-zinc-900 rounded-[2rem] border ${opt.border} overflow-hidden`}>
                    <div className={`h-1.5 bg-gradient-to-r ${opt.color}`}/>
                    <div className="p-6 text-center">
                      <div className="text-5xl mb-3">{opt.emoji}</div>
                      <h3 className="font-black text-white text-xl mb-4">{opt.size}</h3>
                      {opt.points.map(p=>(<div key={p} className="text-sm text-zinc-400 font-medium mb-1.5">{p}</div>))}
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 md:p-10">
                <h2 className="text-2xl font-black text-white mb-4">Which is right for you? 🎯</h2>
                <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">The right screen size depends on your eyesight, your car, and how you drive. 4 quick questions give you a clear recommendation — and tell you exactly which devices to look at.</p>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-purple-500/30">
                  Find My Right Screen Size <ArrowRight size={24}/>
                </motion.button>
              </div>
            </motion.div>
          )}

          {stage === "quiz" && (() => { const q = QUESTIONS[currentQ]; return (
            <motion.div key={`q-${currentQ}`} initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}} transition={{type:"spring",stiffness:350,damping:30}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-purple-500 to-violet-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.5}}/></div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={()=>{if(currentQ===0)setStage("intro");else setCurrentQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold transition-colors group"><ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/>Back</button>
                  <div className="flex gap-2">{QUESTIONS.map((_,i)=>(<div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i<currentQ?"bg-purple-400":i===currentQ?"bg-white scale-125":"bg-zinc-700"}`}/>))}</div>
                  <span className="text-base font-black text-zinc-400">{currentQ+1} / {QUESTIONS.length}</span>
                </div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                <p className="text-zinc-400 text-base mb-8">{q.subtitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt,i)=>(
                    <motion.button key={opt.v} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.05*i}} whileTap={{scale:0.97}}
                      onClick={()=>answer(opt.v,opt.size5,opt.size55,opt.size7)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all ${sel===opt.v||answers[q.id]===opt.v?"border-purple-500 bg-purple-900/30 shadow-lg":"border-zinc-700 bg-zinc-800/50 hover:border-purple-600"}`}>
                      <div className="text-3xl mb-3">{opt.icon}</div>
                      <div className="font-black text-white text-base mb-1">{opt.label}</div>
                      <div className="text-zinc-400 text-sm">{opt.desc}</div>
                      {(sel===opt.v||answers[q.id]===opt.v)&&<motion.div initial={{scale:0}} animate={{scale:1}} className="mt-2"><CheckCircle2 size={18} className="text-purple-400"/></motion.div>}
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
                  <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:400,delay:0.1}} className="text-6xl mb-5">{result.emoji}</motion.div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-4 ${result.bg} ${result.text} border ${result.border}`}>Recommended Screen Size</div>
                  <h2 className="text-4xl font-black text-white mb-2">{result.label}</h2>
                  <div className={`text-xl font-bold ${result.text} mb-4`}>{result.tagline}</div>
                  <p className="text-zinc-300 text-lg font-medium leading-relaxed mb-6">{result.summary}</p>
                  <div className="space-y-3">
                    {result.whyFits.map((r,i)=>(<motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.1*i}} className="flex items-center gap-3"><CheckCircle2 size={18} className="text-green-400 shrink-0"/><p className="text-base text-zinc-300 font-medium">{r}</p></motion.div>))}
                  </div>
                </div>
              </div>

              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3"><Star size={20} className="text-amber-400"/>GPS Devices in This Screen Size</h3>
                <div className="space-y-4">
                  {result.devices.map((device, i) => (
                    <motion.div key={device.name} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1*i}} className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700">
                      <div className="flex items-start justify-between gap-4 mb-3">
                        <div>{i===0&&<div className="flex items-center gap-2 mb-2"><Star size={13} className="text-amber-400 fill-amber-400"/><span className="text-sm font-black text-amber-400 uppercase tracking-widest">Top Pick</span></div>}<h4 className="text-xl font-black text-white">{device.name}</h4></div>
                        <div className="text-right"><div className="text-xl font-black text-white">{device.price}</div><div className={`text-xs font-black text-white mt-1 px-2 py-1 rounded-full ${i===0?"bg-amber-600":"bg-blue-600"}`}>{device.badge}</div></div>
                      </div>
                      <p className="text-base text-zinc-300 font-medium leading-relaxed">{device.desc}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className={`rounded-2xl border ${result.border} ${result.bg} p-6`}>
                <div className={`text-sm font-black uppercase tracking-widest mb-2 ${result.text}`}>Mounting Tip</div>
                <p className="text-base text-zinc-300 font-medium leading-relaxed">{result.mountingTip}</p>
              </div>

              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Get your recommendation by email 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">Save your screen size match and top picks.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-purple-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-purple-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-purple-600 to-violet-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Send My Screen Size Match"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="font-bold text-green-300">Sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Try Again</button>
                <Link href="/tools/gps-budget-finder"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS Budget Finder</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with Garmin or TomTom.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
