"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, XCircle, ArrowRight, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1558618047-3c8c76ca7d13?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1555864326-5cf22ef123cf?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1582139329536-e7284fece509?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
];

const QUESTIONS = [
  { id:"lock", label:"Deadbolt Locks", question:"Do you have deadbolt locks on all exterior doors?", yesGood:true, tip:"Deadbolts are 5x harder to kick in than standard locks — the #1 most effective low-cost upgrade.", fix:"Add a deadbolt to any door that doesn't have one. Cost: $25–$60 at any hardware store." },
  { id:"doorbell", label:"Video Doorbell", question:"Do you have a video doorbell (like Ring or Google Nest)?", yesGood:true, tip:"Homes with visible cameras are 300% less likely to be targeted. See who's at your door from your phone anywhere.", fix:"Ring Video Doorbell ($99) or Google Nest Doorbell ($179) — both connect to your smartphone easily." },
  { id:"outdoor-cam", label:"Outdoor Cameras", question:"Do you have outdoor security cameras covering your property?", yesGood:true, tip:"Cameras covering your driveway, backyard, and garage deter most opportunistic break-ins.", fix:"Blink Outdoor Camera ($99 for 2) or Ring Stick Up Cam ($99) — easy DIY install, no wiring needed." },
  { id:"lights", label:"Motion Lights", question:"Do you have motion-activated lights outside your home?", yesGood:true, tip:"Well-lit properties are far less attractive to burglars. Motion lights use minimal electricity.", fix:"Motion-sensor floodlight: $25–$45 at Home Depot. Plug-in versions need no wiring." },
  { id:"alarm", label:"Alarm System", question:"Do you have a home security alarm system?", yesGood:true, tip:"Monitored alarms can notify you and emergency services within seconds of a break-in.", fix:"SimpliSafe ($244 + $19.99/mo) or Ring Alarm ($199 + $10/mo) — both are senior-friendly DIY systems." },
  { id:"wifi", label:"Wi-Fi Password", question:"Have you changed your Wi-Fi password from the factory default?", yesGood:true, tip:"Factory passwords are printed on your router and can be found by anyone online. Change it now.", fix:"Access your router at 192.168.1.1 in your browser and update the Wi-Fi password under Security settings." },
  { id:"sliding", label:"Sliding Door Security", question:"If you have sliding doors, do they have a security bar or pin?", yesGood:true, tip:"Standard sliding door locks are very easy to defeat. A simple $10 bar stops the door from opening.", fix:"A wooden dowel or metal security bar in the track costs under $15 and is the simplest upgrade possible." },
  { id:"valuables", label:"Valuables Hidden", question:"Are valuables stored out of sight — not visible through windows or left in your car?", yesGood:true, tip:"Most burglaries last under 10 minutes. Visible valuables dramatically increase what gets taken.", fix:"A small fireproof safe ($50–$100) or lockbox bolted under a bed keeps everything secure and hidden." },
  { id:"neighbor", label:"Trusted Neighbor", question:"Do you have a trusted neighbor who watches your home when you're away?", yesGood:true, tip:"Neighbors noticing unusual activity is one of the most effective deterrents — and completely free.", fix:"Join Nextdoor (free app) to connect with neighbors. Let one trusted neighbor know when you travel." },
  { id:"smoke", label:"Smoke Detectors", question:"Do you have working smoke detectors on every floor of your home?", yesGood:true, tip:"Smoke detectors reduce home fire deaths by 50%. Test yours monthly — replace batteries every year.", fix:"Nest Protect ($119) sends smartphone alerts when you're away. Basic First Alert ($20) works well too." },
];

function getGrade(score: number) {
  if (score >= 90) return { grade:"A", label:"Excellent — Well Protected", color:"text-green-400", bg:"bg-green-900/30 border-green-700", bar:"from-green-500 to-emerald-400" };
  if (score >= 70) return { grade:"B", label:"Good — Minor Gaps", color:"text-blue-400", bg:"bg-blue-900/30 border-blue-700", bar:"from-blue-500 to-indigo-400" };
  if (score >= 50) return { grade:"C", label:"Fair — Needs Attention", color:"text-amber-400", bg:"bg-amber-900/30 border-amber-700", bar:"from-amber-500 to-yellow-400" };
  if (score >= 30) return { grade:"D", label:"Poor — Vulnerable", color:"text-orange-400", bg:"bg-orange-900/30 border-orange-700", bar:"from-orange-500 to-amber-400" };
  return { grade:"F", label:"Critical — Act Now", color:"text-red-400", bg:"bg-red-900/30 border-red-700", bar:"from-red-500 to-rose-400" };
}

export default function Client() {
  const [stage, setStage] = useState<"intro"|"audit"|"lead"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, boolean>>({});
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const answeredCount = Object.keys(answers).length;
  const passCount = QUESTIONS.filter(q => answers[q.id] === q.yesGood).length;
  const score = Math.round((passCount / QUESTIONS.length) * 100);
  const grade = getGrade(score);
  const failures = QUESTIONS.filter(q => answers[q.id] !== undefined && answers[q.id] !== q.yesGood);
  const progress = (currentQ / QUESTIONS.length) * 100;

  const answer = (val: boolean) => {
    const newAnswers = { ...answers, [QUESTIONS[currentQ].id]: val };
    setAnswers(newAnswers);
    if (currentQ < QUESTIONS.length - 1) { setTimeout(() => setCurrentQ(p => p + 1), 250); }
    else { setTimeout(() => setStage("lead"), 250); }
  };

  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, phone, issue: `Security Audit — Score: ${score}% Grade ${grade.grade} — ${failures.length} gaps found`, source:"home-security-audit" }) }); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = () => { setStage("intro"); setCurrentQ(0); setAnswers({}); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Home Security Audit</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border border-red-500/30 text-red-300 text-sm font-black uppercase tracking-widest mb-6"><Shield size={14}/> Free Audit · 5 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Home Security<br/><span className="bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent italic">Audit Tool</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">10 simple yes/no questions reveal exactly how protected your home is — and which affordable devices would make the biggest difference right now.</p>
          <div className="flex flex-wrap gap-5">{[{icon:"✅",t:"10 Questions"},{icon:"🔒",t:"Get a Grade A–F"},{icon:"💡",t:"Specific Fixes"},{icon:"🆓",t:"100% Free"}].map(i=>(<div key={i.t} className="flex items-center gap-2 text-base font-semibold text-zinc-300"><span>{i.icon}</span>{i.t}</div>))}</div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div key="intro" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-red-500 to-rose-400"/>
              <div className="p-8 md:p-10">
                <h2 className="text-3xl font-black text-white mb-4">How Protected Is Your Home? 🔒</h2>
                <p className="text-zinc-400 font-medium mb-8 text-lg leading-relaxed">Answer 10 yes/no questions about your home security. You'll receive a security grade (A through F) and a plain-English action plan for any gaps found.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                  {QUESTIONS.map((q,i) => (<div key={q.id} className="flex items-center gap-3 p-4 bg-zinc-800/50 rounded-2xl border border-zinc-700/50"><div className="w-8 h-8 bg-gradient-to-br from-red-500 to-rose-400 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">{i+1}</div><div className="text-base text-zinc-300 font-bold">{q.label}</div></div>))}
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("audit")} className="w-full py-6 bg-gradient-to-r from-red-600 to-rose-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-red-500/25">Start My Security Audit <ArrowRight size={24}/></motion.button>
                <p className="text-center text-base text-zinc-500 font-medium mt-4">🔒 No sign-up required to start</p>
              </div>
            </motion.div>
          )}
          {stage === "audit" && (()=>{const q=QUESTIONS[currentQ];return(
            <motion.div key={`q-${currentQ}`} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{type:"spring",stiffness:400,damping:35}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-red-500 to-rose-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.4}}/></div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={()=>{if(currentQ===0)setStage("intro");else setCurrentQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors">← Back</button>
                  <span className="text-base font-black text-zinc-400">Question {currentQ+1} of {QUESTIONS.length}</span>
                </div>
                <div className="space-y-6">
                  <div className="flex items-center gap-3"><div className="w-12 h-12 bg-gradient-to-br from-red-500 to-rose-400 rounded-xl flex items-center justify-center text-white font-black">{currentQ+1}</div><span className="text-sm font-black text-red-400 uppercase tracking-widest">{q.label}</span></div>
                  <h3 className="text-2xl md:text-3xl font-black text-white leading-tight">{q.question}</h3>
                  <div className="bg-blue-900/20 border border-blue-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Zap size={16} className="text-blue-400 mt-0.5 shrink-0"/><p className="text-base text-blue-300 font-medium leading-relaxed">{q.tip}</p></div></div>
                  <div className="grid grid-cols-2 gap-4">
                    <motion.button whileTap={{scale:0.96}} onClick={()=>answer(true)} className={`p-7 rounded-2xl border-2 font-black text-xl flex flex-col items-center gap-3 transition-all ${answers[q.id]===true?"border-green-500 bg-green-900/30 text-green-300 shadow-lg":"border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-green-600"}`}><CheckCircle2 size={32} className="text-green-400"/>Yes</motion.button>
                    <motion.button whileTap={{scale:0.96}} onClick={()=>answer(false)} className={`p-7 rounded-2xl border-2 font-black text-xl flex flex-col items-center gap-3 transition-all ${answers[q.id]===false?"border-red-500 bg-red-900/30 text-red-300 shadow-lg":"border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-red-600"}`}><XCircle size={32} className="text-red-400"/>No</motion.button>
                  </div>
                </div>
              </div>
            </motion.div>
          );})()}
          {stage === "lead" && (
            <motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-red-500 to-rose-400"/>
              <div className="p-8 md:p-10">
                <div className="text-center mb-6"><div className="text-6xl mb-4">🏠</div><h2 className="text-3xl font-black text-white mb-3">Audit complete!</h2><div className={`inline-flex items-center gap-3 px-6 py-3 rounded-2xl border mb-4 ${grade.bg}`}><span className={`text-4xl font-black ${grade.color}`}>Grade {grade.grade}</span><span className={`text-lg font-black ${grade.color}`}>{grade.label}</span></div><p className="text-zinc-400 font-medium text-lg">Get your full report + plain-English fix guide sent to your email.</p></div>
                {failures.length>0&&(<div className="bg-amber-900/20 border border-amber-700 rounded-2xl p-4 mb-6 flex items-center gap-3"><AlertCircle size={18} className="text-amber-400 shrink-0"/><span className="text-amber-300 font-bold text-base">{failures.length} security gap{failures.length>1?"s":""} found — we'll show exactly how to fix each one.</span></div>)}
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-red-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-red-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-red-500 text-lg placeholder:text-zinc-600"/></div></div>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-red-600 to-rose-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-red-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:<><Shield size={22}/>Send My Security Report</>}</motion.button>
                <button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me my results</button>
              </div>
            </motion.div>
          )}
          {stage === "results" && (
            <motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
              {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Report sent to {email}!</p></div>)}
              <div className={`rounded-[2rem] border-2 p-8 ${grade.bg}`}>
                <div className="flex items-center justify-between mb-5">
                  <div><div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">Security Grade</div><div className={`text-7xl font-black leading-none ${grade.color}`}>{grade.grade}</div><div className={`text-xl font-black mt-2 ${grade.color}`}>{grade.label}</div></div>
                  <div className="text-right"><div className="text-sm text-zinc-400 font-medium">Score</div><div className={`text-5xl font-black ${grade.color}`}>{score}%</div><div className="text-zinc-400 text-base mt-1">{failures.length} gap{failures.length!==1?"s":""} found</div></div>
                </div>
                <div className="h-5 bg-zinc-800 rounded-full overflow-hidden"><motion.div initial={{width:0}} animate={{width:`${score}%`}} transition={{duration:1,delay:0.3}} className={`h-full bg-gradient-to-r ${grade.bar} rounded-full`}/></div>
              </div>
              {failures.length > 0 && (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3"><AlertCircle size={22} className="text-amber-400"/>Security Gaps — How to Fix Them</h3>
                  <div className="space-y-4">{failures.map((q,i)=>(<motion.div key={q.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}} className="p-5 bg-zinc-800 rounded-2xl border border-zinc-700"><div className="flex items-start gap-3 mb-3"><XCircle size={20} className="text-red-400 shrink-0 mt-0.5"/><div className="font-black text-white text-base">{q.question}</div></div><div className="ml-8"><div className="text-sm font-black text-green-400 mb-1.5">✅ Recommended fix:</div><div className="text-base text-zinc-300 font-medium leading-relaxed">{q.fix}</div></div></motion.div>))}</div>
                </div>
              )}
              {failures.length === 0 && (<div className="bg-green-900/20 border border-green-700 rounded-[2rem] p-8 text-center"><div className="text-5xl mb-4">🏆</div><h3 className="text-2xl font-black text-white mb-2">Your home is well protected!</h3><p className="text-zinc-300 text-base font-medium">You passed all 10 checks. Review your setup annually to stay protected.</p></div>)}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-6"><h3 className="font-black text-white mb-4 text-lg">Checks Passed ✓</h3><div className="space-y-2">{QUESTIONS.filter(q=>answers[q.id]===q.yesGood).map(q=>(<div key={q.id} className="flex items-center gap-3 text-base text-zinc-300 font-medium"><CheckCircle2 size={16} className="text-green-400 shrink-0"/>{q.question}</div>))}</div></div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Retake Audit</button>
                <Link href="/tools/smart-home-matcher"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-amber-600 to-orange-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Smart Home Matcher</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with Ring, SimpliSafe, ADT, or any security company.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
