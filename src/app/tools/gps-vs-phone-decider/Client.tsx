"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, Star, Navigation, Smartphone } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1506905925346-21bda4d32df4?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const QUESTIONS = [
  {
    id: "area",
    title: "Where do you drive most often?",
    subtitle: "Be honest — this is the most important factor in the decision",
    options: [
      { v:"city", label:"Cities & suburbs", icon:"🏙️", desc:"Familiar roads, usually have signal", gps:10, phone:40 },
      { v:"highway", label:"Long highway trips", icon:"🛣️", desc:"Road trips, interstate driving", gps:25, phone:25 },
      { v:"rural", label:"Country roads & small towns", icon:"🌾", desc:"Back roads, farmland, remote areas", gps:45, phone:10 },
      { v:"remote", label:"Remote areas & wilderness", icon:"🌲", desc:"Mountains, forests, no cell service", gps:60, phone:0 },
    ],
  },
  {
    id: "signal",
    title: "How reliable is your cell phone signal where you drive?",
    subtitle: "Phone navigation apps need a data connection — GPS devices don't",
    options: [
      { v:"excellent", label:"Always strong — I never drop signal", icon:"📶", desc:"Even in tunnels & garages", gps:5, phone:40 },
      { v:"good", label:"Usually good — occasional drops", icon:"📱", desc:"Solid most of the time", gps:20, phone:25 },
      { v:"patchy", label:"Patchy — I lose signal regularly", icon:"⚠️", desc:"Especially on long drives", gps:40, phone:10 },
      { v:"poor", label:"Often poor — I rely on downloaded maps", icon:"❌", desc:"Frequent dead zones", gps:55, phone:0 },
    ],
  },
  {
    id: "screen",
    title: "How would you describe your phone screen when driving?",
    subtitle: "A dedicated GPS has a screen built just for navigation — your phone is doing many things at once",
    options: [
      { v:"big-easy", label:"Big screen, easy to glance at", icon:"📺", desc:"I have no trouble reading it", gps:5, phone:30 },
      { v:"okay", label:"It works, but I have to squint", icon:"👀", desc:"Could be easier to read", gps:25, phone:15 },
      { v:"small", label:"Small screen — hard to see while driving", icon:"📲", desc:"Especially at speed", gps:40, phone:5 },
      { v:"glasses", label:"I wear reading glasses", icon:"👓", desc:"Small text is a challenge", gps:45, phone:0 },
    ],
  },
  {
    id: "phone_use",
    title: "What happens to your phone while navigating?",
    subtitle: "Calls, texts and notifications can interrupt phone navigation mid-journey",
    options: [
      { v:"silent", label:"I put it on silent — no interruptions", icon:"🔕", desc:"Navigation stays on screen", gps:5, phone:35 },
      { v:"occasional", label:"Occasional calls — I can manage", icon:"📞", desc:"Sometimes it gets interrupted", gps:20, phone:20 },
      { v:"busy", label:"I get calls & texts constantly", icon:"💬", desc:"Navigation gets interrupted often", gps:40, phone:5 },
      { v:"music", label:"I also need music & podcasts on my phone", icon:"🎵", desc:"Navigation has to share the screen", gps:30, phone:10 },
    ],
  },
];

const RESULTS = {
  gps: {
    verdict: "A Dedicated GPS is the Better Choice for You",
    emoji: "🗺️",
    color: "from-blue-500 to-indigo-400",
    borderColor: "border-blue-700",
    bg: "bg-blue-900/30",
    textColor: "text-blue-300",
    summary: "Based on how you drive, where you go, and how you use your phone — a dedicated GPS will serve you significantly better than relying on your phone.",
    reasons: [
      "Works perfectly with zero cell signal — your phone apps can't say the same",
      "Screen built entirely for navigation — bigger, brighter, purpose-made",
      "Calls and texts never interrupt your directions",
      "Maps never 'go grey' when you hit a dead zone",
      "Battery is dedicated to navigation — your phone stays charged for calls",
    ],
    recommended: [
      { name:"Garmin DriveSmart 55", price:"$149–$179", badge:"Most Popular", why:"Live traffic, Bluetooth, voice control — the sweet spot for most drivers" },
      { name:"Garmin DriveSmart 65", price:"$179–$219", badge:"Best Large Screen", why:"6.95-inch screen — much easier to read at a glance, especially with glasses" },
      { name:"Garmin Drive 53", price:"$89–$119", badge:"Best Value", why:"No frills — just reliable, clear navigation at a fair price" },
    ],
    phoneApps: null,
  },
  phone: {
    verdict: "Your Phone Works Great for Navigation",
    emoji: "📱",
    color: "from-green-500 to-emerald-400",
    borderColor: "border-green-700",
    bg: "bg-green-900/30",
    textColor: "text-green-300",
    summary: "Given where you drive and the signal you have, your smartphone is genuinely the right choice. Save your money — a dedicated GPS won't give you much extra for your situation.",
    reasons: [
      "Your routes are in areas with reliable cell coverage",
      "Free map updates every few weeks — always current",
      "Google Maps and Waze have live traffic built in at no extra cost",
      "One device does everything — navigation, music, calls",
      "Your phone's screen is working fine for your needs",
    ],
    recommended: null,
    phoneApps: [
      { name:"Google Maps", emoji:"🗺️", badge:"Best Overall", why:"Best traffic, best accuracy, works offline when you download areas in advance. Best for most drivers." },
      { name:"Waze", emoji:"🚗", badge:"Best for Traffic", why:"Community-reported hazards, speed traps, accidents. Brilliant for commuters and highway drivers." },
      { name:"Apple Maps", emoji:"🍎", badge:"Best for iPhone", why:"Deep iPhone integration, hands-free with Siri, privacy-focused. Works well on newer iPhones." },
    ],
  },
  borderline: {
    verdict: "Either Could Work — Here's How to Choose",
    emoji: "🤔",
    color: "from-amber-500 to-orange-400",
    borderColor: "border-amber-700",
    bg: "bg-amber-900/30",
    textColor: "text-amber-300",
    summary: "Your situation is genuinely in the middle. Both options have real advantages for you. Here's the honest breakdown to help you decide.",
    reasons: [
      "Your driving mix means you'd get real benefit from either option",
      "A GPS gives you peace of mind on longer or rural trips",
      "Your phone works well for everyday city routes",
      "Consider: do you make long road trips or drive in rural areas more than twice a year?",
      "If yes → GPS is worth it. If mostly city driving → stick with your phone.",
    ],
    recommended: [
      { name:"Garmin DriveSmart 55", price:"$149–$179", badge:"Our Top Pick", why:"If you do road trips or rural driving at all — this is the one to get. Pays for itself in peace of mind." },
    ],
    phoneApps: [
      { name:"Google Maps (with offline maps)", emoji:"🗺️", badge:"Best Phone Option", why:"Download your most-traveled regions for offline use — works without signal for those patchy areas." },
    ],
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"lead"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ gps: 0, phone: 0 });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const progress = (currentQ / QUESTIONS.length) * 100;

  const getVerdict = () => {
    const diff = scores.gps - scores.phone;
    if (diff >= 40) return RESULTS.gps;
    if (diff <= -20) return RESULTS.phone;
    return RESULTS.borderline;
  };

  const answer = (value: string, gpsScore: number, phoneScore: number) => {
    setSelectedOption(value);
    setTimeout(() => {
      setScores(prev => ({ gps: prev.gps + gpsScore, phone: prev.phone + phoneScore }));
      setAnswers(prev => ({ ...prev, [QUESTIONS[currentQ].id]: value }));
      setSelectedOption(null);
      if (currentQ < QUESTIONS.length - 1) setCurrentQ(p => p + 1);
      else setStage("lead");
    }, 300);
  };

  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };

  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    const verdict = getVerdict();
    try { await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, phone, issue: `GPS vs Phone — Verdict: ${verdict.verdict}`, source:"gps-vs-phone-decider" }) }); } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true); setSubmitting(false); setStage("results");
  };

  const reset = () => { setStage("intro"); setCurrentQ(0); setScores({gps:0,phone:0}); setAnswers({}); setSelectedOption(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  const verdict = getVerdict();

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[80vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">GPS vs Phone Decider</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free · 2 Minutes · No Sign-up
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Do I Need a GPS</span>
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent italic">or Just Use My Phone?</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            The most asked navigation question online — answered honestly. 4 questions about how you actually drive. Get a clear, personalised verdict in 2 minutes.
          </motion.p>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.4}} className="flex flex-wrap gap-6">
            {[{icon:"🗺️",t:"Dedicated GPS"},{icon:"📱",t:"Phone Navigation"},{icon:"🎯",t:"Clear Verdict"},{icon:"🆓",t:"100% Free"}].map(i=>(
              <div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>
            ))}
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {/* INTRO */}
          {stage === "intro" && (
            <motion.div key="intro" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-6">
              {/* Side by side comparison teaser */}
              <div className="grid grid-cols-2 gap-4">
                {[
                  { title:"Dedicated GPS", emoji:"🗺️", color:"from-blue-500 to-indigo-400", border:"border-blue-800", points:["Works with zero cell signal","Screen built for driving","Calls never interrupt it","$89–$219 one-time cost"] },
                  { title:"Phone Navigation", emoji:"📱", color:"from-green-500 to-emerald-400", border:"border-green-800", points:["Free — you already have it","Always-fresh maps","Live traffic included","Works great in cities"] },
                ].map(side => (
                  <div key={side.title} className={`bg-zinc-900 rounded-[2rem] border ${side.border} overflow-hidden`}>
                    <div className={`h-1.5 bg-gradient-to-r ${side.color}`}/>
                    <div className="p-6">
                      <div className="text-4xl mb-3">{side.emoji}</div>
                      <h3 className="font-black text-white text-lg mb-4">{side.title}</h3>
                      {side.points.map(p => (<div key={p} className="flex items-center gap-2 text-sm text-zinc-400 font-medium mb-2"><CheckCircle2 size={14} className="text-green-400 shrink-0"/>{p}</div>))}
                    </div>
                  </div>
                ))}
              </div>

              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-400"/>
                <div className="p-8 md:p-10">
                  <h2 className="text-3xl font-black text-white mb-4">The honest answer depends on YOU 🎯</h2>
                  <p className="text-zinc-400 font-medium mb-6 text-lg leading-relaxed">There's no single right answer here. Where you drive, how strong your signal is, and how you use your phone while driving all matter. 4 honest questions. One clear verdict — just for your situation.</p>
                  <div className="grid grid-cols-2 gap-3 mb-8">
                    {QUESTIONS.map((q, i) => (<div key={q.id} className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50"><div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">{i+1}</div><div className="text-sm text-zinc-300 font-bold leading-tight">{q.title.split("?")[0]}?</div></div>))}
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={() => setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30">
                    Get My Personalised Verdict <ArrowRight size={24}/>
                  </motion.button>
                  <p className="text-center text-base text-zinc-500 font-medium mt-4">🔒 No sign-up needed to start</p>
                </div>
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {stage === "quiz" && (() => { const q = QUESTIONS[currentQ]; return (
            <motion.div key={`q-${currentQ}`} initial={{opacity:0,x:50}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-50}} transition={{type:"spring",stiffness:350,damping:30}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden shadow-2xl">
              <div className="h-1.5 bg-zinc-800 relative">
                <motion.div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.5,ease:"easeOut"}}/>
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={() => { if(currentQ===0) setStage("intro"); else setCurrentQ(p=>p-1); }} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors group">
                    <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform"/> Back
                  </button>
                  <div className="flex items-center gap-2">
                    {QUESTIONS.map((_,i) => (<div key={i} className={`w-2.5 h-2.5 rounded-full transition-all duration-300 ${i < currentQ ? "bg-blue-400" : i === currentQ ? "bg-white scale-125" : "bg-zinc-700"}`}/>))}
                  </div>
                  <span className="text-base font-black text-zinc-400">{currentQ+1} / {QUESTIONS.length}</span>
                </div>

                <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:0.1}}>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2 leading-tight">{q.title}</h3>
                  <p className="text-zinc-400 text-base font-medium mb-8">{q.subtitle}</p>
                </motion.div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map((opt, i) => (
                    <motion.button key={opt.v} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.05*i}} whileTap={{scale:0.97}}
                      onClick={() => answer(opt.v, opt.gps, opt.phone)}
                      className={`p-6 rounded-2xl border-2 text-left transition-all duration-200 group ${selectedOption===opt.v || answers[q.id]===opt.v ? "border-blue-500 bg-blue-900/30 shadow-lg shadow-blue-500/20" : "border-zinc-700 bg-zinc-800/50 hover:border-blue-600 hover:bg-zinc-800"}`}>
                      <div className="text-4xl mb-3">{opt.icon}</div>
                      <div className="font-black text-white text-base mb-1.5">{opt.label}</div>
                      <div className="text-zinc-400 text-sm font-medium leading-relaxed">{opt.desc}</div>
                      {(selectedOption===opt.v || answers[q.id]===opt.v) && (
                        <motion.div initial={{scale:0}} animate={{scale:1}} className="mt-3">
                          <CheckCircle2 size={18} className="text-blue-400"/>
                        </motion.div>
                      )}
                    </motion.button>
                  ))}
                </div>
              </div>
            </motion.div>
          );})()}

          {/* LEAD */}
          {stage === "lead" && (
            <motion.div key="lead" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden shadow-2xl">
              <div className={`h-1.5 bg-gradient-to-r ${verdict.color}`}/>
              <div className="p-8 md:p-10">
                <div className="text-center mb-8">
                  <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:400,damping:20}} className="text-7xl mb-6">{verdict.emoji}</motion.div>
                  <h2 className="text-3xl font-black text-white mb-3">Your verdict is ready!</h2>
                  <p className="text-zinc-400 font-medium text-lg leading-relaxed">Get your personalised GPS vs Phone recommendation — plus our top picks for your situation — sent to your inbox.</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div>
                    <label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label>
                    <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-lg placeholder:text-zinc-600"/></div>
                    {errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label>
                    <div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-lg placeholder:text-zinc-600"/></div>
                    {errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}
                  </div>
                  <div>
                    <label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label>
                    <div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors text-lg placeholder:text-zinc-600"/></div>
                  </div>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className={`w-full py-6 bg-gradient-to-r ${verdict.color} text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl mb-3`}>
                  {submitting ? <Loader2 size={24} className="animate-spin"/> : <><Star size={22}/>Show My Verdict</>}
                </motion.button>
                <button onClick={() => setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">
                  Skip — just show me my result
                </button>
                <p className="text-center text-sm text-zinc-600 mt-3">🔒 No spam, ever. Unsubscribe anytime.</p>
              </div>
            </motion.div>
          )}

          {/* RESULTS */}
          {stage === "results" && (
            <motion.div key="results" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-6">
              {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Result sent to {email}!</p></div>)}

              {/* Main verdict */}
              <div className={`rounded-[2rem] border-2 ${verdict.borderColor} overflow-hidden shadow-2xl`}>
                <div className={`h-1.5 bg-gradient-to-r ${verdict.color}`}/>
                <div className="p-8 md:p-10">
                  <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:400,delay:0.1}} className="text-6xl mb-6">{verdict.emoji}</motion.div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-4 ${verdict.bg} ${verdict.textColor} border ${verdict.borderColor}`}>
                    Our Verdict
                  </div>
                  <h2 className="text-3xl md:text-4xl font-black text-white mb-4 leading-tight">{verdict.verdict}</h2>
                  <p className="text-zinc-300 text-lg font-medium leading-relaxed mb-8">{verdict.summary}</p>

                  <div className="space-y-3 mb-8">
                    {verdict.reasons.map((reason, i) => (
                      <motion.div key={i} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.1*i}} className="flex items-start gap-3">
                        <CheckCircle2 size={18} className="text-green-400 shrink-0 mt-0.5"/>
                        <p className="text-base text-zinc-300 font-medium leading-relaxed">{reason}</p>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* GPS Recommendations */}
              {verdict.recommended && (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-400"/>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3"><Navigation size={22} className="text-blue-400"/>Top GPS Picks for Your Situation</h3>
                    <div className="space-y-4">
                      {verdict.recommended.map((rec, i) => (
                        <motion.div key={rec.name} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1*i}} className="flex items-start gap-5 p-5 bg-zinc-800 rounded-2xl border border-zinc-700">
                          <div className={`w-10 h-10 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0 ${i===0?"bg-gradient-to-br from-amber-400 to-orange-500":"bg-gradient-to-br from-blue-500 to-indigo-500"}`}>
                            {i===0?"★":i+1}
                          </div>
                          <div className="flex-1">
                            <div className="font-black text-white text-lg mb-1">{rec.name}</div>
                            <div className="text-zinc-400 text-base font-medium mb-2">{rec.why}</div>
                          </div>
                          <div className="text-right shrink-0">
                            <div className="font-black text-white text-lg">{rec.price}</div>
                            <div className={`text-xs font-black px-2 py-1 rounded-full mt-1 ${i===0?"bg-amber-900/50 text-amber-300":"bg-blue-900/50 text-blue-300"}`}>{rec.badge}</div>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Phone App Recommendations */}
              {verdict.phoneApps && (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400"/>
                  <div className="p-8">
                    <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3"><Smartphone size={22} className="text-green-400"/>Best Navigation Apps for Your Phone</h3>
                    <div className="space-y-4">
                      {verdict.phoneApps.map((app, i) => (
                        <motion.div key={app.name} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1*i}} className="flex items-start gap-5 p-5 bg-zinc-800 rounded-2xl">
                          <div className="text-4xl">{app.emoji}</div>
                          <div className="flex-1">
                            <div className="font-black text-white text-lg mb-1">{app.name}</div>
                            <div className="text-zinc-400 text-base font-medium">{app.why}</div>
                          </div>
                          <div className="text-xs font-black px-2.5 py-1.5 rounded-full bg-green-900/50 text-green-300 shrink-0">{app.badge}</div>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Start Over</button>
                <Link href="/tools/best-gps-finder"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg"><Navigation size={20}/>Find My Perfect GPS</motion.div></Link>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/>
                  <p className="text-sm text-zinc-500 font-medium leading-relaxed">Educational guidance only. Not affiliated with Google, Apple, Garmin, TomTom, or Waze. All recommendations are based on publicly available information for educational purposes.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SEO Section */}
      <section className="border-t border-zinc-800 py-20 bg-zinc-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-10 tracking-tight">GPS Device vs Phone Navigation — The Real Differences</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { title:"When Your Phone Is Enough", body:"If you drive mainly in cities and suburbs with strong cell signal, Google Maps or Waze is all you need. They offer free, constantly updated maps with live traffic — things dedicated GPS devices charge extra for. For everyday urban driving, saving the money and using your phone is completely sensible." },
              { title:"When a GPS Device Makes More Sense", body:"Dedicated GPS devices earn their keep in two situations: rural or remote driving where cell signal drops out, and for drivers who want a screen that does one thing and does it well. A Garmin DriveSmart won't miss a turn because a text arrived. It won't go grey in a dead zone. That reliability matters on long road trips or country driving." },
              { title:"The Battery & Distraction Factor", body:"One underrated advantage of a dedicated GPS: your phone stays free. No battery drain from navigation, no missed calls because Maps was open. For drivers who rely on their phone for other things during a trip, this alone can justify a GPS device." },
              { title:"Our Honest Bottom Line", body:"Most city and suburb drivers genuinely don't need a dedicated GPS device in 2026. But for anyone who regularly drives in rural areas, takes road trips, or simply finds their phone too small or too distracting for navigation — a quality GPS like the Garmin DriveSmart 55 or 65 is a worthwhile investment." },
            ].map(item => (
              <div key={item.title} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-7">
                <h3 className="font-black text-white text-lg mb-3">{item.title}</h3>
                <p className="text-zinc-400 text-base font-medium leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
