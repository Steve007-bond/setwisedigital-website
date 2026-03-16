"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, Star } from "lucide-react";

const bgs = [{ url:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=1200", type:"image" as const, theme:"dark" as const },{ url:"https://images.unsplash.com/photo-1586953208448-b95a79798f07?auto=format&fit=crop&q=80&w=1200", type:"image" as const, theme:"dark" as const }];

const PRINTERS = [
  { id:"hp-deskjet-4155e", name:"HP DeskJet 4155e", brand:"HP", price:"$89", priceNum:89, emoji:"🔵", badge:"Best for Beginners", badgeColor:"bg-blue-600", type:"Inkjet", features:["Wireless printing from phone","Easy setup","Scan & copy included","HP+ subscription available"], pros:["Very affordable","Simple to use","Good print quality for documents","HP+ gives 6 months free ink"], cons:["Ink costs more per page","Slower than laser","No automatic double-sided"], bestFor:"Light home printing — letters, forms, coupons. Under 100 pages/month.", costPerPage:"~18¢ color / ~8¢ black", scores:{documents:35,photos:10,occasional:40,budget:45,color:20} },
  { id:"canon-ts6420a", name:"Canon PIXMA TS6420a", brand:"Canon", price:"$99", priceNum:99, emoji:"🔴", badge:"Best for Photos", badgeColor:"bg-red-600", type:"Inkjet", features:["Excellent photo quality","5-color ink system","Auto double-sided printing","Cloud printing"], pros:["Outstanding photo quality","Reliable Canon brand","Auto duplex printing saves paper","Compact size"], cons:["Higher ink cost","Slower printing speed","Cartridges run out faster"], bestFor:"Families who print photos regularly. Great for greeting cards, pictures, school projects.", costPerPage:"~17¢ color / ~7¢ black", scores:{documents:25,photos:45,occasional:30,budget:35,color:45} },
  { id:"epson-ecotank-et2800", name:"Epson EcoTank ET-2800", brand:"Epson", price:"$199", priceNum:199, emoji:"🟢", badge:"Lowest Running Cost", badgeColor:"bg-green-600", type:"EcoTank", features:["Ink bottles — NOT cartridges","Prints up to 4,500 pages per refill","Wi-Fi and USB connection","Print, scan, copy"], pros:["Lowest cost per page available","Ink bottles last 1-2 years","No cartridge waste","Pays for itself quickly"], cons:["Higher upfront cost","Refilling ink can be messy","Slower print speed"], bestFor:"Frequent printers (150+ pages/month). The cost savings are dramatic over 2-3 years.", costPerPage:"~3¢ color / ~1¢ black", scores:{documents:30,photos:25,frequent:50,budget:15,color:35} },
  { id:"brother-mfc-j4335dw", name:"Brother MFC-J4335DW", brand:"Brother", price:"$149", priceNum:149, emoji:"🟡", badge:"Best High-Yield Value", badgeColor:"bg-amber-600", type:"Inkjet", features:["High-yield XL cartridges","Fax machine included","Auto document feeder","Wireless & USB"], pros:["XL cartridges last much longer","Fax for medical/legal documents","Reliable Brother quality","Good all-in-one value"], cons:["Bulkier than photo printers","Photo quality average","Fax line needed for faxing"], bestFor:"Home offices, seniors who fax medical forms and documents, high-volume document printers.", costPerPage:"~5¢ color / ~2¢ black (XL)", scores:{documents:45,photos:10,frequent:35,budget:30,fax:50} },
  { id:"hp-laserjet-m15w", name:"HP LaserJet Pro M15w", brand:"HP", price:"$149", priceNum:149, emoji:"⚫", badge:"Best for Documents Only", badgeColor:"bg-zinc-600", type:"Laser", features:["Laser quality — crisp text","Fast printing — 19 pages/min","Long-lasting toner","Wireless printing"], pros:["Very crisp, professional text","Toner lasts much longer than ink","Fast printing speed","Reliable for daily use"], cons:["Black & white only — no color","Cannot print photos well","Higher initial cost"], bestFor:"People who mainly print text documents — bills, letters, forms, articles. No color needed.", costPerPage:"~4¢ black only", scores:{documents:50,photos:0,frequent:40,budget:25,color:0} },
];

const QUESTIONS = [
  { id:"what", title:"What will you mainly print?", subtitle:"Choose your most common printing need", options:[{v:"documents",label:"Documents & letters",icon:"📄",desc:"Bills, forms, letters, recipes"},{v:"photos",label:"Photos & pictures",icon:"🖼️",desc:"Family photos, greeting cards"},{v:"both",label:"Both equally",icon:"📋",desc:"Mix of documents and photos"},{v:"occasional",label:"Occasional printing",icon:"📌",desc:"A few pages here and there"}] },
  { id:"volume", title:"How many pages do you print per month?", subtitle:"Be honest — this affects which printer saves you most money", options:[{v:"few",label:"Under 30 pages",icon:"📎",desc:"Very light use"},{v:"moderate",label:"30–100 pages",icon:"📁",desc:"Regular home use"},{v:"heavy",label:"100–200 pages",icon:"📚",desc:"Frequent printing"},{v:"very-heavy",label:"200+ pages",icon:"🗂️",desc:"Heavy daily use"}] },
  { id:"budget", title:"What's your budget for the printer?", subtitle:"Remember: a cheaper printer often means more expensive ink", options:[{v:"low",label:"Under $100",icon:"💵",desc:"Entry level"},{v:"mid",label:"$100–$200",icon:"💳",desc:"Most popular range"},{v:"high",label:"$200+",icon:"💎",desc:"Best long-term value"}] },
  { id:"features", title:"Do you need any of these features?", subtitle:"Pick the most important one for you", options:[{v:"fax",label:"Fax (for doctors, lawyers)",icon:"📠",desc:"Send & receive fax documents"},{v:"scan",label:"Scanning documents",icon:"🔍",desc:"Digitize paperwork"},{v:"wireless",label:"Print from my phone",icon:"📱",desc:"No cable needed"},{v:"none",label:"Just basic printing is fine",icon:"✅",desc:"No special features needed"}] },
  { id:"tech", title:"How comfortable are you with tech setup?", subtitle:"Some printers are much easier to set up than others", options:[{v:"easy",label:"Very simple please",icon:"😊",desc:"Plug in and it works"},{v:"okay",label:"I can follow instructions",icon:"👍",desc:"Step-by-step is fine"},{v:"confident",label:"I'm pretty confident",icon:"🚀",desc:"I can handle anything"}] },
];

function scoreprinters(answers: Record<string,string>) {
  return PRINTERS.map(p => {
    let score = 0;
    const what = answers.what;
    const vol = answers.volume;
    const budget = answers.budget;
    if(what==="documents") score += (p.scores.documents||0);
    if(what==="photos") score += (p.scores.photos||0);
    if(what==="both") score += ((p.scores.documents||0)+(p.scores.photos||0))/2;
    if(what==="occasional") score += (p.scores.occasional||0);
    if(vol==="very-heavy"||vol==="heavy") score += (p.scores.frequent||0)||20;
    if(budget==="low" && p.priceNum<=100) score += 30;
    if(budget==="mid" && p.priceNum>100 && p.priceNum<=200) score += 30;
    if(budget==="high" && p.priceNum>=200) score += 25;
    if(answers.features==="fax") score += (p.scores.fax||0);
    return { ...p, totalScore: score };
  }).sort((a,b) => b.totalScore - a.totalScore);
}

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"lead"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [selectedOption, setSelectedOption] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");
  const ranked = scoreprinters(answers);
  const topPick = ranked[0];
  const progress = (currentQ/QUESTIONS.length)*100;

  const answer = (value: string) => {
    setSelectedOption(value);
    setTimeout(()=>{
      const newAnswers = {...answers,[QUESTIONS[currentQ].id]:value};
      setAnswers(newAnswers);
      setSelectedOption(null);
      if(currentQ<QUESTIONS.length-1) setCurrentQ(p=>p+1); else setStage("lead");
    },300);
  };

  const validate = () => { const e: Record<string,string> = {}; if(!name.trim()) e.name="Please enter your name"; if(!email.trim()||!email.includes("@")) e.email="Please enter a valid email"; setErrors(e); return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,phone,brand:topPick?.brand,issue:`Printer Finder — Top Pick: ${topPick?.name}`,source:"best-printer-finder",extra:JSON.stringify(answers)})}); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = ()=>{setStage("intro");setCurrentQ(0);setAnswers({});setSelectedOption(null);setName("");setEmail("");setPhone("");setSubmitted(false);};

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Best Printer Finder</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Tool · 4 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Best Printer Finder<br/><span className="bg-gradient-to-r from-violet-400 to-purple-300 bg-clip-text text-transparent italic">for You</span></h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Photos, documents, or both? 5 questions match you to the perfect printer for your home and budget — no technical knowledge needed, plain English throughout.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage==="intro"&&(<motion.div key="intro" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className="h-1.5 bg-gradient-to-r from-violet-500 to-purple-400"/><div className="p-8 md:p-10"><h2 className="text-3xl font-black text-white mb-4">Find Your Perfect Printer Match 🖨️</h2><p className="text-zinc-400 font-medium mb-8 text-lg leading-relaxed">We'll match you to the best printer from HP, Canon, Epson, and Brother based on what you actually print, how often, and your budget. No specs, no confusion.</p><div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">{PRINTERS.slice(0,5).map(p=>(<div key={p.id} className="bg-zinc-800 rounded-2xl p-4 text-center"><div className="text-3xl mb-2">{p.emoji}</div><div className="font-black text-white text-sm">{p.name.split(" ").slice(0,2).join(" ")}</div><div className="text-violet-400 font-black text-base mt-1">{p.price}</div></div>))}</div><motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={()=>setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-violet-500/25">Find My Perfect Printer <ArrowRight size={24}/></motion.button><p className="text-center text-base text-zinc-500 font-medium mt-4">🔒 No sign-up required to start</p></div></motion.div>)}
          {stage==="quiz"&&(()=>{const q=QUESTIONS[currentQ];return(<motion.div key={`q-${currentQ}`} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{type:"spring",stiffness:400,damping:35}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-violet-500 to-purple-400 rounded-full" animate={{width:`${progress}%`}} transition={{duration:0.4}}/></div><div className="p-8 md:p-10"><div className="flex items-center justify-between mb-8"><button onClick={()=>{if(currentQ===0)setStage("intro");else setCurrentQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors"><ArrowLeft size={18}/> Back</button><span className="text-base font-black text-zinc-400">Question {currentQ+1} of {QUESTIONS.length}</span></div><h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3><p className="text-zinc-400 font-medium text-base mb-6">{q.subtitle}</p><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{q.options.map((opt)=>(<motion.button key={opt.v} whileTap={{scale:0.97}} onClick={()=>answer(opt.v)} className={`p-6 rounded-2xl border-2 text-left transition-all ${selectedOption===opt.v?"border-violet-500 bg-violet-900/30 shadow-lg":answers[q.id]===opt.v?"border-violet-500 bg-violet-900/20":"border-zinc-700 bg-zinc-800/50 hover:border-violet-700"}`}><div className="text-3xl mb-3">{opt.icon}</div><div className="font-black text-white text-base mb-1">{opt.label}</div><div className="text-zinc-400 text-sm font-medium">{opt.desc}</div>{(selectedOption===opt.v||answers[q.id]===opt.v)&&<motion.div initial={{scale:0}} animate={{scale:1}} className="mt-2"><CheckCircle2 size={18} className="text-violet-400"/></motion.div>}</motion.button>))}</div></div></motion.div>);})()}
          {stage==="lead"&&(<motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className="h-1.5 bg-gradient-to-r from-violet-500 to-purple-400"/><div className="p-8 md:p-10"><div className="text-center mb-8"><div className="text-6xl mb-4">🖨️</div><h2 className="text-3xl font-black text-white mb-3">Your printer match is ready!</h2><p className="text-zinc-400 font-medium text-lg">Get your personalized printer recommendation + cost comparison sent to your inbox.</p></div><div className="space-y-4 mb-6"><div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div><div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div><div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 text-lg placeholder:text-zinc-600"/></div></div></div><motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-violet-500/25 mb-3">{submitting?<Loader2 size={24} className="animate-spin"/>:"Show My Printer Match"}</motion.button><button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me the results</button></div></motion.div>)}
          {stage==="results"&&topPick&&(<motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
            {submitted&&(<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Recommendation sent to {email}!</p></div>)}
            <div className="bg-zinc-900 rounded-[2rem] border-2 border-violet-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-violet-500 to-purple-400"/>
              <div className="p-8">
                <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white"/></div><span className="font-black text-amber-400 text-base uppercase tracking-widest">Your #1 Recommended Printer{name?` for ${name}`:""}</span></div>
                <div className="flex items-start justify-between gap-4 mb-6"><div><h3 className="text-3xl font-black text-white mb-2">{topPick.emoji} {topPick.name}</h3><div className="flex items-center gap-3"><span className={`${topPick.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{topPick.badge}</span><span className="text-zinc-400 font-bold text-xl">{topPick.price}</span><span className="text-zinc-500 text-sm">{topPick.type}</span></div></div></div>
                <div className="bg-zinc-800 rounded-2xl p-5 mb-6"><div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-1">Best for</div><div className="text-base text-zinc-200 font-medium">{topPick.bestFor}</div><div className="text-sm font-black text-violet-400 mt-3">Cost per page: {topPick.costPerPage}</div></div>
                <div className="mb-6"><div className="text-base font-black text-zinc-200 mb-3">Key features:</div><div className="space-y-2">{topPick.features.map(f=>(<div key={f} className="flex items-center gap-2 text-base text-zinc-300 font-medium"><CheckCircle2 size={16} className="text-violet-400 shrink-0"/>{f}</div>))}</div></div>
                <div className="grid grid-cols-2 gap-5"><div><div className="text-sm font-black text-green-400 uppercase tracking-widest mb-2">✓ Pros</div>{topPick.pros.map(p=>(<div key={p} className="text-sm text-zinc-400 font-medium mb-1.5">• {p}</div>))}</div><div><div className="text-sm font-black text-red-400 uppercase tracking-widest mb-2">✗ Consider</div>{topPick.cons.map(c=>(<div key={c} className="text-sm text-zinc-400 font-medium mb-1.5">• {c}</div>))}</div></div>
              </div>
            </div>
            <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-6"><h3 className="font-black text-white mb-4 text-lg">Also consider</h3><div className="space-y-3">{ranked.slice(1,3).map(p=>(<div key={p.id} className="flex items-center gap-4 p-4 bg-zinc-800 rounded-2xl"><div className="text-2xl">{p.emoji}</div><div className="flex-1"><div className="font-black text-white">{p.name}</div><div className="text-zinc-400 text-sm">{p.price} · {p.type} · {p.costPerPage}</div></div><span className={`${p.badgeColor} text-white text-sm font-black px-2.5 py-1 rounded-full`}>{p.badge}</span></div>))}</div></div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4"><button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/> Try Again</button><Link href="/tools/printer-cost-calculator"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-indigo-600 to-blue-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Calculate Running Cost</motion.div></Link></div>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Prices approximate. Not affiliated with HP, Canon, Epson, or Brother.</p></div></div>
          </motion.div>)}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
