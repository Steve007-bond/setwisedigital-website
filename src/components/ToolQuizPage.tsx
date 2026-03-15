"use client";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar"; import Footer from "@/components/Footer"; import ScrollToTop from "@/components/ScrollToTop"; import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, RefreshCw, Shield, ArrowRight, Star } from "lucide-react";

export interface QuizOption { value: string; label: string; icon: string; desc: string; }
export interface QuizQuestion { id: string; title: string; subtitle: string; options: QuizOption[]; }
export interface QuizResult { title: string; badge: string; badgeColor: string; emoji: string; price?: string; highlight: string; description: string; pros: string[]; cons: string[]; }

interface ToolQuizPageProps {
  toolId: string;
  metaTitle: string;
  h1line1: string;
  h1line2: string;
  h1accent: string;
  gradient: string;
  accentShadow: string;
  badgeText: string;
  description: string;
  backgrounds: { url: string; type: "image" | "video"; theme: "dark" | "light" }[];
  breadcrumbLabel: string;
  questions: QuizQuestion[];
  computeResults: (answers: Record<string, string>) => QuizResult[];
  tips: string[];
  relatedHref: string;
  relatedEmoji: string;
  relatedTitle: string;
  relatedDesc: string;
  relatedGradient: string;
  seoHeading: string;
  seoText: string;
}

export default function ToolQuizPage(props: ToolQuizPageProps) {
  const { toolId, h1line1, h1line2, h1accent, gradient, accentShadow, badgeText, description, backgrounds, breadcrumbLabel, questions, computeResults, tips, relatedHref, relatedEmoji, relatedTitle, relatedDesc, relatedGradient, seoHeading, seoText } = props;

  const [stage, setStage] = useState<"intro"|"quiz"|"lead"|"results">("intro");
  const [curQ, setCurQ] = useState(0); const [answers, setAnswers] = useState<Record<string,string>>({}); const [sel, setSel] = useState<string|null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({}); const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null); const heroInView = useInView(heroRef, {once:true});
  const results = computeResults(answers); const top = results[0];
  const progress = (curQ / questions.length) * 100;

  const validate = () => { const e:Record<string,string>={}; if(!name.trim())e.name="Please enter your name"; if(!email.trim()||!email.includes("@"))e.email="Please enter a valid email"; setErrors(e); return Object.keys(e).length===0; };
  const answerQ = (v:string) => { setSel(v); setTimeout(()=>{ const na={...answers,[questions[curQ].id]:v}; setAnswers(na); setSel(null); if(curQ<questions.length-1)setCurQ(p=>p+1); else setStage("lead"); },280); };
  const handleSubmit = async () => { if(!validate())return; setSubmitting(true); try{ await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,phone,brand:top?.title,issue:`${toolId} — Top: ${top?.title}`,source:toolId,extra:JSON.stringify(answers)})}); }catch{} setSubmitted(true); setSubmitting(false); setStage("results"); };
  const reset = () => { setStage("intro"); setCurQ(0); setAnswers({}); setSel(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans"><Navbar/><ScrollToTop/>
      <header ref={heroRef} className="relative pt-44 pb-32 overflow-hidden">
        <HeaderBackgroundSlider items={backgrounds} interval={8000}/>
        <div className="absolute inset-0 -z-10"/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <nav className="flex items-center gap-2 text-base text-zinc-400 mb-8">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-200">{breadcrumbLabel}</span>
          </nav>
          <motion.div initial={{opacity:0,x:-20}} animate={heroInView?{opacity:1,x:0}:{}} transition={{delay:0.2}} className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-black uppercase tracking-widest mb-8`}>
            ✨ {badgeText}
          </motion.div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6 text-white max-w-4xl">
            {h1line1 && <motion.span className="block" initial={{opacity:0,filter:"blur(8px)"}} animate={heroInView?{opacity:1,filter:"blur(0px)"}:{}} transition={{delay:0.3,duration:0.8}}>{h1line1}</motion.span>}
            {h1line2 && <motion.span className="block" initial={{opacity:0,filter:"blur(8px)"}} animate={heroInView?{opacity:1,filter:"blur(0px)"}:{}} transition={{delay:0.4,duration:0.8}}>{h1line2}</motion.span>}
            <motion.span className={`block bg-gradient-to-r ${h1accent} bg-clip-text text-transparent italic`} initial={{opacity:0,filter:"blur(8px)"}} animate={heroInView?{opacity:1,filter:"blur(0px)"}:{}} transition={{delay:0.5,duration:0.8}}>{/* accent rendered in parent */}</motion.span>
          </h1>
          <motion.p initial={{opacity:0}} animate={heroInView?{opacity:1}:{}} transition={{delay:0.6}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">{description}</motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {stage==="intro"&&(<motion.div key="intro" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className={`h-1.5 bg-gradient-to-r ${gradient}`}/><div className="p-8 md:p-10"><h2 className="text-3xl font-black text-white mb-4">Find Your Perfect Match 🎯</h2><p className="text-zinc-400 font-medium mb-8 text-lg leading-relaxed">We'll ask {questions.length} quick questions and match you to the best option for your needs — no complicated comparisons, just a clear plain-English recommendation.</p><div className="space-y-3 mb-8">{questions.map((q,i)=>(<div key={q.id} className="flex items-center gap-4 p-5 bg-zinc-800/50 rounded-2xl border border-zinc-700/50"><div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-full flex items-center justify-center text-white font-black shrink-0`}>{i+1}</div><div className="font-black text-white text-base">{q.title}</div></div>))}</div><button onClick={()=>setStage("quiz")} className={`w-full py-6 bg-gradient-to-r ${gradient} text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl ${accentShadow} hover:scale-[1.02] transition-transform`}>Start Free <ArrowRight size={24}/></button><p className="text-center text-base text-zinc-500 mt-4">🔒 No sign-up required to start</p></div></motion.div>)}
              {stage==="quiz"&&(<motion.div key={`q${curQ}`} initial={{opacity:0,x:40}} animate={{opacity:1,x:0}} exit={{opacity:0,x:-40}} transition={{type:"spring",stiffness:400,damping:35}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className="h-1.5 bg-zinc-800 relative"><motion.div className={`h-full bg-gradient-to-r ${gradient} rounded-full`} animate={{width:`${progress}%`}} transition={{duration:0.4}}/></div><div className="p-8 md:p-10"><div className="flex items-center justify-between mb-8"><button onClick={()=>{if(curQ===0)setStage("intro");else setCurQ(p=>p-1);}} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold"><ArrowLeft size={18}/>Back</button><span className="text-base font-black text-zinc-400">Question {curQ+1} of {questions.length}</span></div>{(()=>{const q=questions[curQ];return(<div className="space-y-6"><div><div className="flex items-center gap-3 mb-3"><div className={`w-10 h-10 bg-gradient-to-br ${gradient} rounded-xl flex items-center justify-center text-white font-black`}>{curQ+1}</div></div><h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3><p className="text-zinc-400 text-base">{q.subtitle}</p></div><div className="grid grid-cols-1 sm:grid-cols-2 gap-3">{q.options.map(opt=>(<motion.button key={opt.value} whileTap={{scale:0.97}} onClick={()=>answerQ(opt.value)} className={`p-6 rounded-2xl border-2 text-left transition-all ${sel===opt.value||answers[q.id]===opt.value?"border-blue-500 bg-blue-900/30 shadow-lg":"border-zinc-700 bg-zinc-800/50 hover:border-zinc-500"}`}><div className="text-3xl mb-3">{opt.icon}</div><div className="font-black text-white text-base mb-1">{opt.label}</div><div className="text-zinc-400 text-sm">{opt.desc}</div>{(sel===opt.value||answers[q.id]===opt.value)&&<motion.div initial={{scale:0}} animate={{scale:1}} className="mt-3"><CheckCircle2 size={18} className="text-blue-400"/></motion.div>}</motion.button>))}</div></div>);})()}</div></motion.div>)}
              {stage==="lead"&&(<motion.div key="lead" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} exit={{opacity:0}} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden"><div className={`h-1.5 bg-gradient-to-r ${gradient}`}/><div className="p-8 md:p-10"><div className="text-center mb-8"><div className="text-6xl mb-4">🎯</div><h2 className="text-3xl font-black text-white mb-3">We found your perfect match!</h2><p className="text-zinc-400 font-medium text-lg">Enter your email to receive your personalized report — full recommendation details, price comparison, and setup tips.</p></div><div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-6 space-y-3">{["🏆 Your #1 recommendation with full details","💡 Plain-English explanation of why it suits you","📧 Monthly tech tips designed for adults 45+","🔒 No spam, unsubscribe anytime"].map(item=>(<div key={item} className="flex items-center gap-3 text-base"><CheckCircle2 size={16} className="text-green-400 shrink-0"/><span className="text-zinc-300 font-medium">{item}</span></div>))}</div><div className="space-y-4 mb-6">{[{label:"First Name *",type:"text",val:name,set:setName,ph:"e.g. Mary",key:"name"},{label:"Email Address *",type:"email",val:email,set:setEmail,ph:"name@email.com",key:"email"},{label:"Phone (optional)",type:"tel",val:phone,set:setPhone,ph:"+1 555 000 0000",key:"phone"}].map(f=>(<div key={f.key}><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">{f.label}</label><input type={f.type} value={f.val} onChange={e=>f.set(e.target.value)} placeholder={f.ph} className="w-full px-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600 text-lg font-medium"/>{errors[f.key]&&<p className="text-red-400 text-sm mt-1 font-bold">{errors[f.key]}</p>}</div>))}</div><button onClick={handleSubmit} disabled={submitting} className={`w-full py-6 bg-gradient-to-r ${gradient} text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl ${accentShadow} mb-4 hover:scale-[1.02] transition-transform disabled:opacity-70`}>{submitting?<Loader2 size={24} className="animate-spin"/>:<>Send My Report</>}</button><button onClick={()=>setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2">Skip — just show me the results</button><p className="text-center text-sm text-zinc-600 mt-4">🔒 No spam. Unsubscribe anytime. We never sell your info.</p></div></motion.div>)}
              {stage==="results"&&top&&(<motion.div key="results" initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="space-y-6">
                {submitted&&<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Report sent to {email} — check your inbox!</p></div>}
                <div className="bg-zinc-900 rounded-[2rem] border-2 border-blue-800 overflow-hidden shadow-xl"><div className={`h-1.5 bg-gradient-to-r ${gradient}`}/><div className="p-8"><div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white"/></div><span className="font-black text-amber-400 text-base uppercase tracking-widest">Your #1 Recommendation{name?` for ${name}`:""}</span></div><div className="flex items-start justify-between gap-4 mb-6"><div><h3 className="text-3xl font-black text-white mb-2">{top.title}</h3><div className="flex items-center gap-3 flex-wrap"><span className={`${top.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{top.badge}</span>{top.price&&<span className="text-zinc-400 font-bold">{top.price}</span>}</div></div><div className="text-5xl">{top.emoji}</div></div><div className="bg-zinc-800 rounded-2xl p-5 mb-6"><div className="text-base font-black text-zinc-200 mb-2">Why this is right for you:</div><p className="text-base text-blue-300 font-medium">{top.highlight}</p></div><p className="text-base text-zinc-300 font-medium leading-relaxed mb-6">{top.description}</p><div className="grid grid-cols-2 gap-5"><div><div className="text-sm font-black text-green-400 uppercase tracking-widest mb-2">✓ Pros</div>{top.pros.map(p=><div key={p} className="text-sm text-zinc-400 font-medium mb-1.5">• {p}</div>)}</div><div><div className="text-sm font-black text-red-400 uppercase tracking-widest mb-2">✗ Consider</div>{top.cons.map(c=><div key={c} className="text-sm text-zinc-400 font-medium mb-1.5">• {c}</div>)}</div></div></div></div>
                {results.length>1&&(<div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8"><h3 className="font-black text-white mb-5 text-xl">Also Consider</h3><div className="space-y-4">{results.slice(1,3).map((r,i)=>(<motion.div key={r.title} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:i*0.1}} className="flex items-center gap-5 p-5 bg-zinc-800 rounded-2xl"><div className="text-3xl">{r.emoji}</div><div className="flex-1"><div className="font-black text-white text-base">{r.title}</div>{r.price&&<div className="text-zinc-400 text-sm">{r.price}</div>}</div><span className={`${r.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{r.badge}</span></motion.div>))}</div></div>)}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Try Again</button>
                  <a href={relatedHref}><div className={`flex items-center justify-center gap-2 py-5 bg-gradient-to-r ${relatedGradient} text-white font-black rounded-2xl text-lg cursor-pointer hover:scale-[1.02] transition-transform`}><span>{relatedEmoji}</span>{relatedTitle}</div></a>
                </div>
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with any brand or manufacturer mentioned. All prices approximate.</p></div></div>
              </motion.div>)}
            </AnimatePresence>
          </div>
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7"><h3 className="font-black text-white mb-5 text-base uppercase tracking-widest">⭐ Quick Tips</h3><div className="space-y-4">{tips.map((tip,i)=>(<div key={i} className="flex items-start gap-3 text-base text-zinc-400 font-medium"><CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5"/>{tip}</div>))}</div></div>
            <a href={relatedHref}><div className={`bg-gradient-to-br ${relatedGradient} rounded-[2rem] p-7 cursor-pointer hover:scale-[1.02] transition-transform`}><div className="text-4xl mb-4">{relatedEmoji}</div><h3 className="font-black text-white mb-2 text-lg">{relatedTitle}</h3><p className="text-white/80 text-base font-medium mb-4">{relatedDesc}</p><div className="flex items-center gap-2 text-white font-black text-base">Try it free →</div></div></a>
            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Independent educational platform. Not affiliated with any brand or manufacturer.</p></div></div>
          </div>
        </div>
      </section>
      <section className="border-t border-zinc-800 py-20"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-4xl font-black text-white mb-8 tracking-tight">{seoHeading}</h2><p className="text-zinc-400 font-medium leading-relaxed text-base max-w-3xl">{seoText}</p></div></section>
      <Footer/>
    </div>
  );
}
