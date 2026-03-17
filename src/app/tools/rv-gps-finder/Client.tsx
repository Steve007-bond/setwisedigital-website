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
  { url:"https://images.unsplash.com/photo-1523987355523-c7b5b0dd90a7?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const QUESTIONS = [
  {
    id:"rv_type",
    title:"What type of RV or large vehicle do you drive?",
    subtitle:"Different rigs have different navigation challenges — height, length, and weight all matter",
    options:[
      { v:"class-a", label:"Class A Motorhome", icon:"🏠", desc:"Large bus-style motorhome, 30–45 feet", size:"large", s:{rv795:5,rv895:20,rv1095:40} },
      { v:"class-c", label:"Class C Motorhome", icon:"🚐", desc:"Medium motorhome on a truck chassis, 20–35 feet", size:"medium", s:{rv795:20,rv895:35,rv1095:20} },
      { v:"class-b", label:"Class B / Camper Van", icon:"🚌", desc:"Van conversion, under 20 feet", size:"small", s:{rv795:40,rv895:25,rv1095:5} },
      { v:"fifth-wheel", label:"Fifth Wheel or Travel Trailer", icon:"🔗", desc:"Trailer towed behind a truck", size:"medium", s:{rv795:15,rv895:40,rv1095:20} },
      { v:"pickup", label:"Pickup Truck with Camper", icon:"🛻", desc:"Camper mounted on truck bed", size:"small", s:{rv795:35,rv895:35,rv1095:10} },
    ],
  },
  {
    id:"travel_style",
    title:"How do you mostly travel?",
    subtitle:"This helps match the right features — campground-hopper vs long-haul road tripper",
    options:[
      { v:"campground", label:"Campground to campground", icon:"⛺", desc:"Moving regularly, always finding new sites", s:{rv795:30,rv895:35,rv1095:20} },
      { v:"longhaul", label:"Long road trips across states", icon:"🗺️", desc:"Hundreds of miles between stops", s:{rv795:15,rv895:30,rv1095:40} },
      { v:"weekender", label:"Weekend getaways — usually same areas", icon:"🌲", desc:"Familiar routes, occasional new places", s:{rv795:40,rv895:30,rv1095:10} },
      { v:"fulltime", label:"Full-time RV living", icon:"🏡", desc:"The RV is home — always on the road", s:{rv795:10,rv895:30,rv1095:45} },
    ],
  },
  {
    id:"priority",
    title:"What matters most to you in an RV GPS?",
    subtitle:"Pick your single most important feature",
    options:[
      { v:"screen", label:"Biggest, clearest screen possible", icon:"🖥️", desc:"Easy to read from the driver's seat", s:{rv795:5,rv895:25,rv1095:45} },
      { v:"campgrounds", label:"Best campground database", icon:"⛺", desc:"Find KOA, national parks, RV stops easily", s:{rv795:30,rv895:35,rv1095:20} },
      { v:"routing", label:"Safest routing for my RV size", icon:"🛡️", desc:"Avoid low bridges and weight limits", s:{rv795:25,rv895:35,rv1095:25} },
      { v:"value", label:"Best value — don't overspend", icon:"💰", desc:"Good features at a fair price", s:{rv795:45,rv895:25,rv1095:5} },
    ],
  },
  {
    id:"height",
    title:"How tall is your RV?",
    subtitle:"This is critical — RV GPS units need your exact height to route you around low bridges",
    options:[
      { v:"under12", label:"Under 11 feet tall", icon:"📏", desc:"Smaller vans and truck campers", s:{rv795:35,rv895:35,rv1095:15} },
      { v:"12to13", label:"11 to 13 feet", icon:"📐", desc:"Most travel trailers and Class C", s:{rv795:20,rv895:40,rv1095:25} },
      { v:"over13", label:"Over 13 feet", icon:"⚠️", desc:"Large Class A — height restrictions critical", s:{rv795:5,rv895:25,rv1095:45} },
      { v:"unsure", label:"I'm not sure of the exact height", icon:"🤔", desc:"Haven't measured it precisely", s:{rv795:20,rv895:35,rv1095:20} },
    ],
  },
];

const RV_GPS = {
  rv795:{
    name:"Garmin RV 795",
    price:"$399–$449",
    screen:"7 inch",
    badge:"Best for Small & Mid-Size RVs",
    badgeColor:"bg-green-600",
    emoji:"🟢",
    color:"from-green-500 to-emerald-400",
    border:"border-green-700",
    bg:"bg-green-900/20",
    text:"text-green-300",
    features:["7-inch touchscreen — clear and readable","RV-specific routing: height, weight, length","40,000+ campgrounds preloaded (KOA, national parks)","BirdsEye satellite imagery of campground entrances","Wi-Fi map updates — no computer needed","Compatible with Garmin BC 50 backup camera"],
    bestFor:"Class B vans, smaller Class C motorhomes, pickup campers, and weekenders who want solid RV routing without a massive screen.",
    whyNotBigger:"The 7-inch screen is perfectly readable for most cockpits. For smaller rigs and vans, the 10-inch RV 1095 would overwhelm the dashboard.",
  },
  rv895:{
    name:"Garmin RV 895",
    price:"$499–$549",
    screen:"8 inch",
    badge:"Best All-Around RV GPS",
    badgeColor:"bg-blue-600",
    emoji:"🔵",
    color:"from-blue-500 to-indigo-400",
    border:"border-blue-700",
    bg:"bg-blue-900/20",
    text:"text-blue-300",
    features:["8-inch touchscreen — the sweet spot for most RVs","Custom RV profile: enter exact height, weight, length, width","Avoids low bridges, weight-restricted roads, sharp turns","40,000+ campgrounds including KOA and public sites","Split-screen view: map + upcoming services at once","Live traffic via Garmin Drive app","BirdsEye satellite imagery of campground entrances","Wi-Fi map updates"],
    bestFor:"Most RV owners — Class C motorhomes, fifth wheels, travel trailers, and mid-size Class A rigs. The right balance of screen size and dashboard fit.",
    whyNotBigger:"A brilliant all-rounder. Unless you drive a large Class A and want the absolute biggest screen, the RV 895 is the sweet spot that most RVers choose.",
  },
  rv1095:{
    name:"Garmin RV 1095",
    price:"$599–$649",
    screen:"10 inch",
    badge:"Best for Large Class A Motorhomes",
    badgeColor:"bg-purple-600",
    emoji:"🟣",
    color:"from-purple-500 to-violet-400",
    border:"border-purple-700",
    bg:"bg-purple-900/20",
    text:"text-purple-300",
    features:["10-inch touchscreen — clearest view available","Custom routing for large Class A dimensions","Advanced junction view — critical for complex interchanges","Full campground database with detailed site information","Live traffic, weather, and fuel price alerts","BirdsEye satellite imagery","Wi-Fi map updates"],
    bestFor:"Large Class A motorhomes (35–45 feet), full-time RVers, and anyone who wants the absolute clearest, most readable screen available.",
    whyNotBigger:"This is the top of the range. The 10-inch screen is ideal for the wide dashboards of large Class A coaches.",
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ rv795:0, rv895:0, rv1095:0 });
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [sel, setSel] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const progress = (currentQ / QUESTIONS.length) * 100;
  const getWinner = () => {
    const max = Math.max(scores.rv795, scores.rv895, scores.rv1095);
    if (scores.rv1095 === max) return "rv1095";
    if (scores.rv895 === max) return "rv895";
    return "rv795";
  };
  const ranked = (["rv795","rv895","rv1095"] as const).map(id => ({ id, ...RV_GPS[id], score: scores[id] })).sort((a,b) => b.score - a.score);

  const answer = (v: string, s: Record<string,number>) => {
    setSel(v);
    setTimeout(() => {
      setScores(prev => ({ rv795:prev.rv795+(s.rv795||0), rv895:prev.rv895+(s.rv895||0), rv1095:prev.rv1095+(s.rv1095||0) }));
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
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,issue:`RV GPS — Match: ${winner} — RV Type: ${answers.rv_type}`,source:"rv-gps-finder"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setStage("intro");setCurrentQ(0);setScores({rv795:0,rv895:0,rv1095:0});setAnswers({});setSel(null);setName("");setEmail("");setSubmitted(false);};

  const winner = getWinner();
  const result = RV_GPS[winner as keyof typeof RV_GPS];

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">RV GPS Finder</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free · 4 Questions · RV-Specific Guidance
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Find the Right GPS</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-300 to-yellow-400 bg-clip-text text-transparent italic">for Your RV</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Standard car GPS units don't account for your RV's height, weight, or length. 4 questions about your rig and how you travel — get matched to the right Garmin RV GPS.
          </motion.p>
          <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}} className="flex flex-wrap gap-6">
            {[{icon:"🛡️",t:"Avoids Low Bridges"},{icon:"⚖️",t:"Weight Limit Routing"},{icon:"⛺",t:"40,000+ Campgrounds"},{icon:"🗺️",t:"North America + Canada"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}
          </motion.div>
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
                  <h3 className="font-black text-white text-lg mb-2">Why your regular GPS isn't enough for an RV</h3>
                  <p className="text-zinc-300 text-base font-medium leading-relaxed">Standard GPS units don't know how tall, heavy, or long your vehicle is. They'll route a 13-foot Class A motorhome under a 12-foot bridge without a second thought. RV-specific GPS units store your vehicle's exact dimensions and route you around every hazard before you get there.</p>
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                {Object.values(RV_GPS).map((gps, i) => (
                  <div key={gps.name} className={`bg-zinc-900 rounded-[2rem] border ${gps.border} overflow-hidden`}>
                    <div className={`h-1.5 bg-gradient-to-r ${gps.color}`}/>
                    <div className="p-6 text-center">
                      <div className="text-4xl mb-3">{gps.emoji}</div>
                      <h3 className="font-black text-white text-lg mb-1">{gps.name}</h3>
                      <div className={`text-sm font-bold ${gps.text} mb-2`}>{gps.screen} screen</div>
                      <div className="text-2xl font-black text-white">{gps.price}</div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 md:p-10">
                <h2 className="text-2xl font-black text-white mb-4">Which Garmin RV GPS fits your rig? 🚐</h2>
                <p className="text-zinc-400 text-lg font-medium mb-6">4 quick questions about your RV type, how you travel, and what matters most. Get matched to the right model with an honest explanation of why.</p>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-amber-500/30">
                  Find My RV GPS Match <ArrowRight size={24}/>
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
                    <motion.button key={opt.v} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.05*i}} whileTap={{scale:0.97}}
                      onClick={()=>answer(opt.v,opt.s)}
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
              {/* Top pick */}
              <div className={`rounded-[2rem] border-2 ${result.border} bg-zinc-900 overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${result.color}`}/>
                <div className="p-8 md:p-10">
                  <div className="flex items-center gap-3 mb-5"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white"/></div><span className="font-black text-amber-400 uppercase tracking-widest text-sm">Best Match for Your RV</span></div>
                  <div className="flex items-start justify-between gap-4 mb-5">
                    <div><div className="text-5xl mb-3">{result.emoji}</div><h2 className="text-3xl font-black text-white mb-2">{result.name}</h2><span className={`text-xs font-black text-white px-3 py-1.5 rounded-full ${result.badgeColor}`}>{result.badge}</span></div>
                    <div className="text-right shrink-0"><div className="text-sm text-zinc-400">Screen</div><div className="text-2xl font-black text-white">{result.screen}</div><div className="text-2xl font-black text-amber-400 mt-1">{result.price}</div></div>
                  </div>
                  <p className="text-zinc-300 text-lg font-medium leading-relaxed mb-6">{result.bestFor}</p>
                  <div className="space-y-2 mb-6">{result.features.map((f,i)=>(<motion.div key={i} initial={{opacity:0,x:-15}} animate={{opacity:1,x:0}} transition={{delay:0.07*i}} className="flex items-center gap-3"><CheckCircle2 size={16} className="text-green-400 shrink-0"/><span className="text-base text-zinc-300 font-medium">{f}</span></motion.div>))}</div>
                  <div className={`p-5 rounded-2xl border ${result.border} ${result.bg}`}>
                    <div className={`text-sm font-black uppercase tracking-widest mb-1 ${result.text}`}>Why not the bigger/smaller model?</div>
                    <p className="text-base text-zinc-300 font-medium">{result.whyNotBigger}</p>
                  </div>
                </div>
              </div>

              {/* Other options */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
                <h3 className="text-xl font-black text-white mb-5">All Garmin RV GPS Options Compared</h3>
                <div className="space-y-3">
                  {ranked.map((gps, i) => (
                    <div key={gps.id} className={`flex items-center gap-4 p-5 rounded-2xl border-2 ${i===0?`${gps.border} ${gps.bg}`:"border-zinc-700 bg-zinc-800/30"}`}>
                      {i===0&&<Star size={16} className="text-amber-400 fill-amber-400 shrink-0"/>}
                      <div className="text-2xl">{gps.emoji}</div>
                      <div className="flex-1"><div className="font-black text-white">{gps.name}</div><div className="text-zinc-400 text-sm">{gps.screen} · {gps.bestFor.split(".")[0]}</div></div>
                      <div className="text-right"><div className="font-black text-white">{gps.price}</div></div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Key setup tip */}
              <div className="bg-blue-900/20 border border-blue-700 rounded-[2rem] p-7">
                <h3 className="font-black text-white text-lg mb-3">⚙️ The most important setup step</h3>
                <p className="text-zinc-300 text-base font-medium leading-relaxed">Once you get your Garmin RV GPS, go to Settings → Trip Planning → Vehicle Profile. Enter your RV's <strong>exact height, length, width, and weight</strong>. This is what tells the GPS to route you safely — without this step, it won't avoid low bridges. Measure twice, enter once.</p>
              </div>

              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Get your RV GPS match by email 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">Save your recommendation + the setup guide to reference when you're ready to buy.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. John" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-500 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Send My RV GPS Match"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="font-bold text-green-300">Sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Try Again</button>
                <Link href="/tools/gps-budget-finder"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS Budget Finder</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium leading-relaxed">Educational guidance only. Always verify road clearances independently — no GPS database is 100% complete. Not affiliated with Garmin. Prices approximate.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
