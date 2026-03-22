"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import TechBridgeLearningHub from "@/components/TechBridgeLearningHub";
import HeroCharacter from "@/components/HeroCharacter";
import { ArrowRight, CheckCircle2, Phone, Mail, User, Loader2, Star, Shield, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

const ACCENT_HEX = "#f59e0b";
const GLOW = "#f59e0b38";

// ── Headline frames — each maps to a different user query intent ────────────
const FRAMES = [
  { svgType:"home", headline: "Your Home, Smarter.\n", visualLabel: "Alexa, Google Nest, Apple HomeKit", visualSub: "Connect lights, plugs, cameras by voice", emoji: "🏠", color: "#f59e0b", particles: ["🏠","💡","🔌","📷","🗣️","✅"] },
  { svgType:"home", headline: "Set Up Smart Bulbs", visualLabel: "Any smart bulb brand", visualSub: "Done in under 5 minutes — really", emoji: "💡", color: "#f59e0b", particles: ["💡","⚡","📱","🗣️","✅","🌙"] },
  { svgType:"home", headline: "Smart Plug Installation", visualLabel: "TP-Link, Amazon, Govee", visualSub: "Control any appliance by voice or app", emoji: "🔌", color: "#10b981", particles: ["🔌","🔧","📱","🗣️","✅","💡"] },
  { svgType:"home", headline: "Create Alexa Routines", visualLabel: "Daily automations made easy", visualSub: "Morning, bedtime, and everything between", emoji: "⏰", color: "#8b5cf6", particles: ["⏰","🌅","🌙","✅","🗣️","🏠"] },
  { svgType:"home", headline: "Security Camera Setup", visualLabel: "Ring, Arlo, Nest cameras", visualSub: "See your home from anywhere", emoji: "📷", color: "#ef4444", particles: ["📷","🔒","📱","✅","🏠","👁️"] }
];

const WIZARD_CONFIG = {
  source: "smarthome-page",
  accentColor: "from-amber-500 to-orange-400",
  accentHex: "#f59e0b",
  step1Title: "What do you need help with?",
  step1Options: [
    { label: "Getting started", icon: "🚀", popular: true },
    { label: "Something is not working", icon: "🔧", popular: true },
    { label: "Learn the features", icon: "📚" },
    { label: "Book a lesson", icon: "👤" },
  ],
  step2Title: "Tell us a bit more",
  brandOptions: [
    { label: "Option A", icon: "🔵" },
    { label: "Option B", icon: "🟢" },
    { label: "Option C", icon: "🔴" },
    { label: "Not sure", icon: "❓" },
  ],
  step2Options: [
    { label: "Show me how it works", icon: "⚡" },
    { label: "Learn step by step", icon: "📚" },
    { label: "Book a live lesson", icon: "👤" },
    { label: "Get PDF guide", icon: "📄" },
  ],
  processingMessages: ["Preparing your learning guide...", "Almost ready, [name]...", "Your guide is ready!"],
};

const AI_PROPS = {
  brandExamples: ["Option A", "Option B", "Option C"],
  starterQuestions: ["How do I get started?", "Something is not working", "What do you recommend?"],
};

type Tool = { href:string; emoji:string; label:string; labelBg:string; title:string; desc:string; tags:string[]; gradient:string };
const TOOLS: Tool[] = [
  { href:"/tools/smart-home-matcher", emoji:"🏠", label:"Find Match", labelBg:"bg-amber-500", title:"Smart Home Starter Matcher", desc:"Alexa, Google Nest, or HomeKit? 5 questions match the right system.", tags:["Alexa","Google","HomeKit"], gradient:"from-amber-500 to-orange-400" },
  { href:"/tools/voice-assistant-matcher", emoji:"🎙️", label:"Compare", labelBg:"bg-purple-600", title:"Best Voice Assistant for You", desc:"Alexa vs Google vs Siri — which is genuinely best for you?", tags:["Alexa","Google","Siri"], gradient:"from-violet-500 to-purple-400" },
  { href:"/tools/wifi-checker", emoji:"📶", label:"Check", labelBg:"bg-sky-600", title:"Home Wi-Fi Overload Checker", desc:"Find out if your router handles all your smart devices.", tags:["Wi-Fi","Router","Speed"], gradient:"from-sky-500 to-blue-400" },
  { href:"/tools/home-security-audit", emoji:"🔒", label:"Stay Safe", labelBg:"bg-red-600", title:"Home Security Audit", desc:"10 questions reveal your home security rating — what to fix first.", tags:["Ring","SimpliSafe","Cameras"], gradient:"from-red-500 to-rose-400" },
  { href:"/tools/subscription-audit", emoji:"📊", label:"Save Money", labelBg:"bg-teal-600", title:"Tech Subscription Audit", desc:"Find overlaps — cancel what you don't need today.", tags:["Netflix","Streaming","Save"], gradient:"from-teal-500 to-cyan-400" },
  { href:"/tools/best-printer-finder", emoji:"🖨️", label:"Find Yours", labelBg:"bg-indigo-600", title:"Best Printer Finder", desc:"5 questions match you to the perfect printer for your home.", tags:["HP","Canon","Epson"], gradient:"from-indigo-500 to-blue-400" }
];
const ISSUES: [string, string, string][] = [
  ["🔌","Smart Plug Setup","Control any appliance remotely by voice or phone — incredibly simple."],
  ["📶","Wi-Fi Pairing","Connect any smart device to your home network with confidence."],
  ["📱","App Controls","Manage all your smart devices from one easy app on your phone."],
  ["🗣️","Voice Commands","Control your home with natural speech — no memorising required."]
];
const STATS: [string,string][] = [
  ["5 min","to set up a smart plug for the very first time"],
  ["65%","of adults 50+ own a smart speaker"],
  ["$50","typical starting cost for a useful smart home setup"]
];

function LeadForm() {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({ });
  const [status, setStatus] = useState<"idle"|"loading"|"done">("idle");
  const validate = () => {
    const e: Record<string,string> = { };
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const submit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ name, email, phone, issue:"smarthome-page landing page guide request", source:"smarthome-page-cta" }),
      });
    } catch (e) { console.error("[lead] error:", e); }
    setStatus("done");
  };
  if (status === "done") return (
    <motion.div initial={{opacity:0,scale:0.92}} animate={{opacity:1,scale:1}} className="text-center py-10">
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:300,delay:0.1}}
        className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-green-500/30">
        <CheckCircle2 size={36} className="text-white" />
      </motion.div>
      <h3 className="text-2xl font-black text-white mb-2">You&#39;re all set, {name}!</h3>
      <p className="text-zinc-400 font-medium">We&#39;ll be in touch within 24 hours.</p>
    </motion.div>
  );
  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Your Name *</label>
        <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Margaret"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" style={{borderColor:errors.name?"#ef4444":undefined}} />
        </div>
        {errors.name && <p className="text-red-400 text-sm mt-1.5 font-semibold ml-1">{errors.name}</p>}
      </div>
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Email Address *</label>
        <div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" />
        </div>
        {errors.email && <p className="text-red-400 text-sm mt-1.5 font-semibold ml-1">{errors.email}</p>}
      </div>
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Phone <span className="text-zinc-600 normal-case font-normal">(optional)</span></label>
        <div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(555) 000-0000"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" />
        </div>
      </div>
      <motion.button onClick={submit} disabled={status==="loading"} whileHover={{scale:1.02}} whileTap={{scale:0.98}}
        className="w-full py-5 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-amber-900/40 mt-2">
        {status==="loading" ? <Loader2 size={22} className="animate-spin" /> : <><Zap size={20} /> Get My Free Guide</>}
      </motion.button>
      <p className="text-center text-zinc-600 text-sm font-medium">No spam · Unsubscribe anytime · 100% free</p>
    </div>
  );
}

function ToolCard({ tool, i }: { tool: Tool; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });
  return (
    <motion.div ref={ref} initial={{opacity:0,y:36}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:0.5,delay:i*0.07,ease:[0.22,1,0.36,1]}} whileHover={{y:-6}}>
      <Link href={tool.href} className="block h-full">
        <div className="h-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-3xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-black/40 group">
          <div className={`h-1.5 w-full bg-gradient-to-r ${tool.gradient}`} />
          <div className="p-7">
            <div className="flex items-start justify-between mb-5">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl shadow-lg`}>{tool.emoji}</div>
              <span className={`${tool.labelBg} text-white text-xs font-black px-3 py-1.5 rounded-full`}>{tool.label}</span>
            </div>
            <h3 className="text-xl font-black text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors">{tool.title}</h3>
            <p className="text-zinc-400 text-[15px] leading-relaxed mb-5">{tool.desc}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {tool.tags.map(t=><span key={t} className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{t}</span>)}
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-blue-400 group-hover:gap-3 transition-all">Try Free <ArrowRight size={14} /></div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

export default function PageClient() {
  const [frameIdx, setFrameIdx] = useState(0);
  // Auto-cycle frames every 4 seconds
  useEffect(() => {
    const t = setInterval(() => setFrameIdx(i => (i+1) % FRAMES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const frame = FRAMES[frameIdx];

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden" style={{backgroundColor:"#080500"}}>
      <Navbar /><ScrollToTop />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        {/* Ambient */}
        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{background:[
            `radial-gradient(ellipse at 20% 30%, ${ACCENT_HEX}20 0%, #080500 60%)`,
            `radial-gradient(ellipse at 80% 70%, ${ACCENT_HEX}14 0%, #080500 60%)`,
          ]}} transition={{duration:6,repeat:Infinity,repeatType:"reverse"}} />
        {[...Array(14)].map((_,i) => (
          <motion.div key={i} className="absolute rounded-full pointer-events-none"
            style={{width:`${5+(i%4)*2}px`,height:`${5+(i%4)*2}px`,left:`${(i*19+5)%100}%`,top:`${(i*27+8)%100}%`,backgroundColor:ACCENT_HEX+"28"}}
            animate={{opacity:[0,0.7,0],y:[-6,6,-6]}} transition={{duration:4+(i%3),repeat:Infinity,delay:(i*0.35)%5}} />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.05}}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-black uppercase tracking-[0.14em] mb-8"
              style={{backgroundColor:ACCENT_HEX+"15",borderColor:ACCENT_HEX+"40",color:ACCENT_HEX}}>
              SMART HOME SETUP & MASTERY
            </motion.div>

            {/* Dynamic H1 — changes with each frame */}
            <h1 className="font-black leading-[0.92] tracking-tighter mb-8 min-h-[18rem] md:min-h-[14rem]">
              {frame.headline.split("\n").map((line: string, i: number) => (
                <motion.span key={`${frameIdx}-${i}`} className={`block text-6xl md:text-7xl ${
                  i === frame.headline.split("\n").length - 1 && frame.headline.split("\n").length > 1
                    ? "bg-gradient-to-r from-amber-500 to-orange-400 bg-clip-text text-transparent italic"
                    : "text-white"
                }`}
                  initial={{opacity:0,y:40}} animate={{opacity:1,y:0}}
                  transition={{delay:i*0.12,type:"spring",stiffness:80}}>
                  {line}
                </motion.span>
              ))}
            </h1>

            <motion.p className="text-xl text-zinc-300 font-medium mb-3 leading-relaxed max-w-lg"
              key={`sub-${frameIdx}`} initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.3}}>
              {frame.visualSub}
            </motion.p>
            <motion.p className="text-base text-zinc-500 mb-10 max-w-lg"
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}>
              Plain English · No tech knowledge needed · Designed for adults 45+
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}}>
              <motion.a href="#learn" whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                className="px-9 py-5 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-amber-900/50">
                Start Learning Free <ArrowRight size={20} />
              </motion.a>
              <Link href="/contact">
                <motion.div whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                  className="px-9 py-5 border-2 border-zinc-700 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 transition-colors cursor-pointer"
                  onMouseEnter={e=>(e.currentTarget.style.borderColor=ACCENT_HEX)}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="#3f3f46")}>
                  Book a Live Lesson
                </motion.div>
              </Link>
            </motion.div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}}
              className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s=><Star key={s} size={16} className="text-amber-400 fill-amber-400"/>)}
                <span className="text-zinc-400 text-sm font-medium ml-1">2,400+ learners</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm font-bold"><Shield size={14}/>100% Free</div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm"><CheckCircle2 size={14} style={{color:ACCENT_HEX}}/>Plain English</div>
            </motion.div>
          </div>

          {/* Animated visual — NO real image */}
          <motion.div initial={{opacity:0,x:30}} animate={{opacity:1,x:0}} transition={{delay:0.3,duration:0.8}}
            className="hidden lg:block">
            <HeroCharacter src="/Images/hero-smarthome.jpeg" alt="Smart home setup guide" accentColor="#f59e0b" glowColor="#d97706" floatingIcons={["💡","🔌","🗣️","📱"]} speechBubble="Turn on the lights!" />
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 border-y border-zinc-800/60 bg-zinc-950/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
              className="flex flex-col items-center md:items-start text-center md:text-left gap-2 p-6 rounded-2xl border border-zinc-800/50">
              <span className="text-4xl font-black tabular-nums" style={{color:ACCENT_HEX}}>{s[0]}</span>
              <span className="text-zinc-400 text-base leading-relaxed">{s[1]}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* TOPICS */}
      <section className="py-24 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Everything We Help With</h2>
            <p className="text-zinc-400 text-lg">Step-by-step guidance for every smart home device</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISSUES.map((issue,i)=>(
              <motion.div key={i} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{delay:i*0.1}} whileHover={{y:-8,scale:1.02}}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 transition-all duration-300 group"
                >
                <div className="text-5xl mb-6">{issue[0]}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors">{issue[1]}</h3>
                <p className="text-zinc-400 text-[15px] leading-relaxed">{issue[2]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TechBridgeLearningHub
        topic="Smart Home" accentColor="from-amber-500 to-orange-400" accentHex="#f59e0b"
        wizardConfig={WIZARD_CONFIG} aiProps={AI_PROPS}
      />

      {/* RELATED TOOLS */}
      <section id="tools" className="py-28 border-t border-zinc-800/50" style={{backgroundColor:"#080500"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-black uppercase tracking-widest mb-6"
              style={{backgroundColor:ACCENT_HEX+"15",borderColor:ACCENT_HEX+"30",color:ACCENT_HEX}}>
              <Zap size={14}/> 6 Free Interactive Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 text-white">
              Free Tools — Pick Your Exact Problem
            </h2>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Each tool gives you step-by-step guidance for your specific device and situation — not generic advice.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {TOOLS.map((tool,i)=><ToolCard key={tool.href} tool={tool} i={i} />)}
          </div>
          <div className="text-center">
            <Link href="/tools">
              <motion.div whileHover={{scale:1.03}}
                className="inline-flex items-center gap-3 px-10 py-5 border-2 border-zinc-700 text-white font-black text-lg rounded-2xl transition-colors cursor-pointer"
                style={{borderColor:"#3f3f46"}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor=ACCENT_HEX)}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="#3f3f46")}>
                See All 47 Free Tools <ChevronRight size={20}/>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="py-28 relative overflow-hidden border-t border-zinc-800/50">
        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{background:[
            `radial-gradient(ellipse at 20% 50%, ${ACCENT_HEX}12 0%, #080500 60%)`,
            `radial-gradient(ellipse at 80% 50%, ${ACCENT_HEX}08 0%, #080500 60%)`,
          ]}} transition={{duration:6,repeat:Infinity,repeatType:"reverse"}} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-black uppercase tracking-widest mb-8"
              style={{backgroundColor:ACCENT_HEX+"15",borderColor:ACCENT_HEX+"30",color:ACCENT_HEX}}>
              <Zap size={14}/> Free Learning Guide
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">Get Your Free Smart Home Starter Guide</h2>
            <p className="text-zinc-300 text-xl leading-relaxed mb-10">We'll send you our beginner-friendly smart home guide — setup, voice control, routines, and troubleshooting in plain English.</p>
            <div className="space-y-5">
              <motion.div key={0} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.0}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">💡</span><span className="text-zinc-300 text-lg leading-relaxed">How to set up smart bulbs and plugs — 5 minutes</span></motion.div>
              <motion.div key={1} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.1}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">🎙️</span><span className="text-zinc-300 text-lg leading-relaxed">Connect devices to Alexa or Google Home step by step</span></motion.div>
              <motion.div key={2} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.2}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">⏰</span><span className="text-zinc-300 text-lg leading-relaxed">Create daily routines that run automatically</span></motion.div>
              <motion.div key={3} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.30000000000000004}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">🔧</span><span className="text-zinc-300 text-lg leading-relaxed">Fix the most common smart home connection problems</span></motion.div>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-1">Get Instant Access</h3>
              <p className="text-zinc-400 font-medium mb-8">Free — no credit card, no commitments.</p>
              <LeadForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 border-t border-zinc-800/50 bg-zinc-950/40">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5 tracking-tight">Want hands-on smart home help?</h2>
          <p className="text-zinc-400 text-xl leading-relaxed mb-10">Our live lessons walk through your exact devices — Alexa, Google Nest, smart lights, or security cameras.</p>
          <Link href="/contact">
            <motion.div whileHover={{scale:1.03}}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-amber-500 to-orange-400 text-white font-black text-xl rounded-2xl shadow-xl shadow-amber-900/40 cursor-pointer">
              Book a Live Smart Home Lesson <ArrowRight size={22}/>
            </motion.div>
          </Link>
          <p className="mt-5 text-zinc-600 text-base">From $49 · No tech knowledge needed · Plain English</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
