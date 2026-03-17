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
  { url:"https://images.unsplash.com/photo-1563520239648-a8ade7166c97?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const PRINTER_TYPES = [
  {
    id:"cartridge",
    name:"Ink Cartridge Printer",
    emoji:"🖨️",
    subtitle:"Traditional — Replace cartridges when empty",
    bestFor:["Light printers (under 100 pages/month)","People who print occasionally","Those who want lower upfront cost","Photo printing with specific color cartridges"],
    notFor:["Heavy printers (200+ pages/month)","People frustrated by constant replacements","Those looking to save long-term"],
    upfrontCost:"$50–$200",
    inkCost:"$15–$45 per cartridge",
    costPerPage:"8–25¢ per page",
    pagesPerCartridge:"100–600 pages",
    topBrands:[
      { brand:"HP DeskJet 4155e", price:"$89", ink:"HP 67 ($14.99)", pages:"120 pages", badge:"Best Entry Level" },
      { brand:"Canon PIXMA TR4720", price:"$79", ink:"PG-245XL ($16.99)", pages:"300 pages", badge:"Best for Photos" },
      { brand:"Epson Expression ET-2400", price:"$149", ink:"T212 series ($13.99)", pages:"150 pages", badge:"Mid Range" },
      { brand:"Brother MFC-J1010DW", price:"$119", ink:"LC401 ($9.99)", pages:"500 pages", badge:"Best Value Cartridge" },
    ],
    pros:["Lower upfront purchase price","Compact and lightweight","Easier to find replacement ink at any store","Great for occasional printing","Wide model selection"],
    cons:["Much higher cost per page over time","Cartridges dry out if unused for weeks","Constant replacement frustration","Ink costs can exceed printer cost in first year","Partially-full cartridges often show 'empty'"],
    verdict:"Best if you print fewer than 100 pages per month and don't want to pay a higher upfront price.",
    score:0,
  },
  {
    id:"ink-tank",
    name:"Ink Tank Printer",
    emoji:"🫙",
    subtitle:"Refillable bottles — Fill when low, like a gas tank",
    bestFor:["Frequent printers (100+ pages/month)","Families with school-going children","Home offices with regular document needs","Anyone frustrated with expensive cartridges","Long-term money savers"],
    notFor:["Very light printers (under 30 pages/month)","People who can't afford higher upfront cost","Those who need ultra-fast printing"],
    upfrontCost:"$199–$400",
    inkCost:"$9–$15 per ink bottle",
    costPerPage:"1–4¢ per page",
    pagesPerCartridge:"4,500–7,500 pages per refill",
    topBrands:[
      { brand:"Epson EcoTank ET-2800", price:"$199", ink:"T502 bottles ($9.99)", pages:"4,500 pages", badge:"Best Overall Value" },
      { brand:"Epson EcoTank ET-4850", price:"$349", ink:"T542 bottles ($13.49)", pages:"7,500 pages", badge:"Best Home Office" },
      { brand:"Canon PIXMA MegaTank G620", price:"$299", ink:"GI-20 bottles ($12.99)", pages:"3,800 photos", badge:"Best for Photos" },
      { brand:"HP Smart Tank 7301", price:"$299", ink:"HP 32XL ($15.99)", pages:"6,000 pages", badge:"Best HP Option" },
      { brand:"Brother INKvestment MFC-J4335DW", price:"$149", ink:"LC406XL ($17.99)", pages:"6,000 pages", badge:"Best Hybrid" },
    ],
    pros:["Dramatically lower cost per page (up to 90% savings)","Refill bottles last 1–2 years","No cartridge frustration","Environmentally friendlier — less plastic waste","Ink level visible on the tank","Pays for itself within 1–2 years of regular use"],
    cons:["Higher upfront purchase price","Refilling can be slightly messy first time","Slower print speeds on some models","Printhead may need occasional cleaning if unused","Not ideal for occasional printers"],
    verdict:"Best if you print 100+ pages per month. The higher upfront cost pays itself back within 12–18 months.",
    score:0,
  },
];

const QUESTIONS = [
  {
    id:"volume",
    title:"How many pages do you print per month?",
    subtitle:"Be honest — this is the most important factor",
    options:[
      { v:"very-low", label:"Under 30 pages", icon:"📌", desc:"A letter here and there", s:{cartridge:40,tank:5} },
      { v:"low", label:"30–100 pages", icon:"📎", desc:"Regular light home use", s:{cartridge:30,tank:15} },
      { v:"medium", label:"100–200 pages", icon:"📁", desc:"Moderate home/family use", s:{cartridge:10,tank:35} },
      { v:"high", label:"200+ pages", icon:"📚", desc:"Heavy or home office use", s:{cartridge:0,tank:50} },
    ],
  },
  {
    id:"budget",
    title:"What's your upfront budget for a printer?",
    subtitle:"Ink tank printers cost more upfront but much less over time",
    options:[
      { v:"under100", label:"Under $100", icon:"💵", desc:"Entry level only", s:{cartridge:40,tank:0} },
      { v:"100to200", label:"$100–$200", icon:"💳", desc:"Mid range", s:{cartridge:25,tank:15} },
      { v:"200plus", label:"$200+", icon:"💎", desc:"Best long-term value", s:{cartridge:5,tank:40} },
    ],
  },
  {
    id:"frequency",
    title:"How often do you use your printer?",
    subtitle:"Ink cartridges dry out if not used regularly",
    options:[
      { v:"daily", label:"Daily or almost daily", icon:"📅", desc:"Every weekday", s:{cartridge:5,tank:40} },
      { v:"weekly", label:"A few times a week", icon:"📆", desc:"Regular use", s:{cartridge:15,tank:30} },
      { v:"monthly", label:"A few times a month", icon:"🗓️", desc:"Occasional use", s:{cartridge:30,tank:15} },
      { v:"rarely", label:"Once a month or less", icon:"❓", desc:"Very infrequent", s:{cartridge:40,tank:5} },
    ],
  },
  {
    id:"what",
    title:"What do you mainly print?",
    subtitle:"Photo quality differs significantly between types",
    options:[
      { v:"documents", label:"Documents & text", icon:"📄", desc:"Bills, forms, school work", s:{cartridge:20,tank:25} },
      { v:"photos", label:"High-quality photos", icon:"🖼️", desc:"Family photos, artwork", s:{cartridge:30,tank:20} },
      { v:"both", label:"Mix of both", icon:"📋", desc:"Documents and occasional photos", s:{cartridge:15,tank:30} },
      { v:"school", label:"School projects & crafts", icon:"🎨", desc:"Lots of color, lots of pages", s:{cartridge:5,tank:40} },
    ],
  },
  {
    id:"patience",
    title:"How do you feel about printer maintenance?",
    subtitle:"Ink tanks need occasional cleaning; cartridges need frequent replacing",
    options:[
      { v:"hate-replacing", label:"I hate replacing cartridges constantly", icon:"😤", desc:"It frustrates me", s:{cartridge:0,tank:45} },
      { v:"dont-mind", label:"I don't mind replacing cartridges", icon:"😊", desc:"It's fine for me", s:{cartridge:30,tank:15} },
      { v:"simple", label:"I want the absolute simplest printer", icon:"🤝", desc:"No maintenance please", s:{cartridge:25,tank:15} },
    ],
  },
];

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"lead"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({cartridge:0,tank:0});
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");
  const [expandedType, setExpandedType] = useState<string|null>(null);

  const winner = scores.tank > scores.cartridge ? PRINTER_TYPES[1] : PRINTER_TYPES[0];
  const loser = scores.tank > scores.cartridge ? PRINTER_TYPES[0] : PRINTER_TYPES[1];
  const confidence = Math.abs(scores.tank - scores.cartridge);
  const progress = (currentQ / QUESTIONS.length) * 100;

  const answer = (value: string, s: Record<string,number>) => {
    setSelectedOption(value);
    setTimeout(() => {
      setScores(prev => ({ cartridge: prev.cartridge + (s.cartridge||0), tank: prev.tank + (s.tank||0) }));
      setAnswers(prev => ({ ...prev, [QUESTIONS[currentQ].id]: value }));
      setSelectedOption(null);
      if (currentQ < QUESTIONS.length - 1) setCurrentQ(p => p + 1);
      else setStage("lead");
    }, 300);
  };

  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, phone, issue: `Ink vs Tank — Recommended: ${winner.name} — Confidence: ${confidence > 30 ? "High" : "Moderate"}`, source:"printer-ink-vs-tank" }) }); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = () => { setStage("intro"); setCurrentQ(0); setScores({cartridge:0,tank:0}); setAnswers({}); setSelectedOption(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Ink Cartridge vs Ink Tank</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Tool · 3 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Ink Cartridge<br/><span className="bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent italic">vs Ink Tank?</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Should you buy an HP, Canon or Brother cartridge printer — or switch to an Epson EcoTank or Canon MegaTank? 5 questions give you a clear answer based on how you actually print.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div key="intro" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {PRINTER_TYPES.map(t => (
                  <div key={t.id} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                    <div className={`h-1.5 ${t.id==="cartridge"?"bg-gradient-to-r from-blue-500 to-indigo-400":"bg-gradient-to-r from-green-500 to-emerald-400"}`}/>
                    <div className="p-7">
                      <div className="text-4xl mb-4">{t.emoji}</div>
                      <h3 className="text-xl font-black text-white mb-1">{t.name}</h3>
                      <p className="text-zinc-400 text-sm mb-4">{t.subtitle}</p>
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm"><span className="text-zinc-400">Upfront cost</span><span className="font-black text-white">{t.upfrontCost}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-zinc-400">Cost per page</span><span className="font-black text-white">{t.costPerPage}</span></div>
                        <div className="flex justify-between text-sm"><span className="text-zinc-400">Pages per refill</span><span className="font-black text-white">{t.pagesPerCartridge}</span></div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-violet-400"/>
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-4">Which is right for YOU? 🖨️</h2>
                  <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">The right choice depends entirely on how often you print, your budget, and what you print. Answer 5 honest questions and we'll give you a clear, personalized recommendation — no jargon.</p>
                  <div className="bg-amber-900/20 border border-amber-700 rounded-2xl p-4 mb-6 flex items-start gap-3">
                    <AlertCircle size={16} className="text-amber-400 mt-0.5 shrink-0"/>
                    <p className="text-sm text-amber-300 font-medium">Key fact: If you print 200 pages/month, switching from cartridges to an ink tank can save you $200–$400 per year. The ink tank pays for itself within 12 months.</p>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/25">Find My Perfect Printer Type <ArrowRight size={24}/></motion.button>
                </div>
              </div>
            </motion.div>
          )}
          {stage === "quiz" && (()=>{const q=QUESTIONS[currentQ];return(
            <motion.div key={`q-${currentQ}`} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{type:"spring",stiffness:400,damping:35}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-indigo-500 to-violet-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.4}}/></div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8"><button onClick={()=>{if(currentQ===0)setStage("intro");else setCurrentQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors"><ArrowLeft size={18}/> Back</button><span className="text-base font-black text-zinc-400">Question {currentQ+1} of {QUESTIONS.length}</span></div>
                <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                <p className="text-zinc-400 font-medium text-base mb-6">{q.subtitle}</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  {q.options.map(opt=>(<motion.button key={opt.v} whileTap={{scale:0.97}} onClick={()=>answer(opt.v,(opt as any).s)} className={`p-6 rounded-2xl border-2 text-left transition-all ${selectedOption===opt.v?"border-indigo-500 bg-indigo-900/30 shadow-lg":answers[q.id]===opt.v?"border-indigo-500 bg-indigo-900/20":"border-zinc-700 bg-zinc-800/50 hover:border-indigo-700"}`}><div className="text-3xl mb-3">{opt.icon}</div><div className="font-black text-white text-base mb-1">{opt.label}</div><div className="text-zinc-400 text-sm font-medium">{opt.desc}</div>{(selectedOption===opt.v||answers[q.id]===opt.v)&&<motion.div initial={{scale:0}} animate={{scale:1}} className="mt-2"><CheckCircle2 size={18} className="text-indigo-400"/></motion.div>}</motion.button>))}
                </div>
              </div>
            </motion.div>
          );})()}
          {stage === "lead" && (
            <motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-violet-400"/>
              <div className="p-8 md:p-10">
                <div className="text-center mb-8"><div className="text-6xl mb-4">🖨️</div><h2 className="text-3xl font-black text-white mb-3">Your recommendation is ready!</h2><p className="text-zinc-400 font-medium text-lg">Get your personalized printer-type recommendation + top model suggestions sent to your inbox.</p></div>
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600"/></div></div>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-indigo-600 to-violet-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:"Send My Printer Recommendation"}</motion.button>
                <button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me the results</button>
              </div>
            </motion.div>
          )}
          {stage === "results" && (
            <motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
              {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Recommendation sent to {email}!</p></div>)}

              {/* Winner Card */}
              <div className={`bg-zinc-900 rounded-[2rem] border-2 overflow-hidden ${winner.id==="tank"?"border-green-700":"border-blue-700"}`}>
                <div className={`h-1.5 ${winner.id==="tank"?"bg-gradient-to-r from-green-500 to-emerald-400":"bg-gradient-to-r from-blue-500 to-indigo-400"}`}/>
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white"/></div><span className="font-black text-amber-400 text-base uppercase tracking-widest">Recommended for {name||"You"}</span></div>
                  <div className="flex items-center gap-4 mb-6">
                    <div className="text-6xl">{winner.emoji}</div>
                    <div>
                      <h2 className="text-3xl font-black text-white">{winner.name}</h2>
                      <p className="text-zinc-400 text-base font-medium">{winner.subtitle}</p>
                      <div className="mt-2 text-base font-black text-green-400">{confidence > 30 ? "Strong match" : confidence > 15 ? "Good match" : "Moderate match"} based on your answers</div>
                    </div>
                  </div>
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[{l:"Upfront Cost",v:winner.upfrontCost},{l:"Cost Per Page",v:winner.costPerPage},{l:"Pages Per Refill",v:winner.pagesPerCartridge}].map(i=>(<div key={i.l} className="bg-zinc-800 rounded-2xl p-4 text-center"><div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">{i.l}</div><div className="font-black text-white text-base">{i.v}</div></div>))}
                  </div>
                  <div className="bg-zinc-800 rounded-2xl p-5 mb-6">
                    <div className="text-sm font-black text-zinc-300 mb-3">🎯 Best for you because:</div>
                    <div className="space-y-2">{winner.bestFor.map(b=>(<div key={b} className="flex items-center gap-2 text-base text-zinc-300 font-medium"><CheckCircle2 size={16} className="text-green-400 shrink-0"/>{b}</div>))}</div>
                  </div>
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div><div className="text-sm font-black text-green-400 uppercase tracking-widest mb-2">✓ Pros</div>{winner.pros.slice(0,4).map(p=>(<div key={p} className="text-sm text-zinc-400 font-medium mb-1.5">• {p}</div>))}</div>
                    <div><div className="text-sm font-black text-red-400 uppercase tracking-widest mb-2">✗ Consider</div>{winner.cons.slice(0,4).map(c=>(<div key={c} className="text-sm text-zinc-400 font-medium mb-1.5">• {c}</div>))}</div>
                  </div>
                  <div className={`p-4 rounded-2xl border ${winner.id==="tank"?"bg-green-900/20 border-green-800":"bg-blue-900/20 border-blue-800"}`}>
                    <p className={`text-base font-bold ${winner.id==="tank"?"text-green-300":"text-blue-300"}`}>💡 {winner.verdict}</p>
                  </div>
                </div>
              </div>

              {/* Recommended Models */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h3 className="text-2xl font-black text-white mb-6">Top {winner.name} Models to Consider</h3>
                <div className="space-y-4">
                  {winner.topBrands.map((b,i)=>(<motion.div key={b.brand} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.08}} className="flex items-center gap-5 p-5 bg-zinc-800 rounded-2xl">
                    <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-violet-500 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">{i+1}</div>
                    <div className="flex-1">
                      <div className="font-black text-white text-base">{b.brand}</div>
                      <div className="text-zinc-400 text-sm font-medium">{b.ink} · {b.pages}</div>
                    </div>
                    <div className="text-right">
                      <div className="font-black text-white text-lg">{b.price}</div>
                      <div className={`text-xs font-black px-2 py-1 rounded-full mt-1 ${winner.id==="tank"?"bg-green-900/50 text-green-300":"bg-blue-900/50 text-blue-300"}`}>{b.badge}</div>
                    </div>
                  </motion.div>))}
                </div>
              </div>

              {/* Also consider */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-6">
                <h3 className="font-black text-white mb-3 text-lg">Why not the {loser.name}?</h3>
                <p className="text-zinc-400 text-base font-medium mb-3">{loser.verdict}</p>
                <div className="flex flex-wrap gap-2">{loser.notFor.map(n=>(<span key={n} className="text-sm text-zinc-500 bg-zinc-800 px-3 py-1.5 rounded-full font-medium">{n}</span>))}</div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Try Again</button>
                <Link href="/tools/printer-cost-calculator"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Calculate Running Cost</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Prices approximate and subject to change. Not affiliated with HP, Epson, Canon, or Brother.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SEO Content */}
      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Ink Cartridge vs Ink Tank — The Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base">
            <div>
              <p className="mb-4">The decision between an ink cartridge printer and an ink tank printer comes down to one key question: how much do you print? If you print fewer than 100 pages per month, a traditional cartridge printer makes sense — the lower upfront cost is worth more than the savings on ink.</p>
              <p>However, if you print regularly — homework, recipes, documents, photos — an ink tank printer like the Epson EcoTank or Canon MegaTank can save you hundreds of dollars per year. The Epson EcoTank ET-2800 costs around $199 upfront but prints for as little as 1¢ per page in black and white.</p>
            </div>
            <div>
              <p className="mb-4">Ink tank printers were pioneered by Epson with their EcoTank series in 2015. Canon followed with MegaTank in 2017, Brother with INKvestment, and HP with Smart Tank in 2019. All use refillable ink bottles instead of cartridges — you fill the tank when it's low, like a gas tank.</p>
              <p>This tool is for educational purposes only. Setwise Digital is an independent educational platform not affiliated with HP, Epson, Canon, or Brother. Always verify current pricing at your preferred retailer before purchasing.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
