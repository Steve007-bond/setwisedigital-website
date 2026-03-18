"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import TechBridgeLearningHub from "@/components/TechBridgeLearningHub";
import { ArrowRight, CheckCircle2, Phone, Mail, User, Loader2, Star, Shield, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

const WIZARD_CONFIG = {
  source: "security-page",
  accentColor: "from-red-600 to-rose-400",
  accentHex: "#ef4444",
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
  processingMessages: [
    "Preparing your learning guide...",
    "Almost ready, [name]...",
    "Your personalised guide is ready!",
  ],
};

const AI_PROPS = {
  brandExamples: ["Option A", "Option B", "Option C", "Option D"],
  starterQuestions: ["How do I get started?", "Something is not working right", "What do you recommend?"],
};

type Tool = { href: string; emoji: string; label: string; labelBg: string; title: string; desc: string; tags: string[]; gradient: string };

const TOOLS: Tool[] = [
  { href: "/tools/home-security-audit", emoji: "🔒", label: "Free Audit", labelBg: "bg-red-600", title: "Home Security Audit", desc: "10 yes/no questions reveal your home security rating A–F and what to fix first.", tags: ["Ring", "SimpliSafe", "ADT"], gradient: "from-red-500 to-rose-400" },
  { href: "/tools/wifi-checker", emoji: "📶", label: "Check", labelBg: "bg-sky-600", title: "Home Wi-Fi Overload Checker", desc: "Find out if your router is overloaded — and how to fix slow or insecure Wi-Fi.", tags: ["Wi-Fi", "Router", "Security"], gradient: "from-sky-500 to-blue-400" },
  { href: "/tools/subscription-audit", emoji: "📊", label: "Audit", labelBg: "bg-teal-600", title: "Tech Subscription Audit", desc: "Find forgotten subscriptions, cancel what you don't need, and secure your billing.", tags: ["Subscriptions", "Cancel", "Save"], gradient: "from-teal-500 to-cyan-400" },
  { href: "/tools/voice-assistant-matcher", emoji: "🎙️", label: "Compare", labelBg: "bg-purple-600", title: "Best Voice Assistant for You", desc: "Alexa vs Google vs Siri — which is the safest and best choice for you?", tags: ["Alexa", "Google", "Siri"], gradient: "from-violet-500 to-purple-400" },
  { href: "/tools/smart-home-matcher", emoji: "🏠", label: "Setup", labelBg: "bg-amber-600", title: "Smart Home Starter Matcher", desc: "Find the right smart home platform with the best security for beginners.", tags: ["Alexa", "Google", "HomeKit"], gradient: "from-amber-500 to-orange-400" },
  { href: "/tools/best-printer-finder", emoji: "🖨️", label: "Find Yours", labelBg: "bg-indigo-600", title: "Best Printer Finder", desc: "Find a printer that is easy to set up securely on your home Wi-Fi network.", tags: ["HP", "Canon", "Brother"], gradient: "from-indigo-500 to-blue-400" }
];

const ISSUES = [
  ["🦠", "Virus Removal", "Safe step-by-step removal using free built-in tools — no cost required."],
  ["🔑", "Password Safety", "Create strong passwords you'll actually remember and use every day."],
  ["🛡️", "Antivirus Setup", "Free tools that protect against 99% of threats — no subscription needed."],
  ["📧", "Email Security", "Stop hackers from accessing your accounts in under 5 minutes."]
];

const STATS = [
  ["1 in 3", "adults over 50 are targeted by online scams every year"],
  ["Free", "Windows Defender protects against 99% of common threats"],
  ["5 min", "to set up two-factor authentication on any account"]
];

function ToolCard({ tool, i }: { tool: Tool; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -6 }}>
      <Link href={tool.href} className="block h-full">
        <div className="h-full bg-zinc-900 border border-zinc-800 hover:border-red-500/60 rounded-3xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-black/40 group">
          <div className={`h-1.5 w-full bg-gradient-to-r ${tool.gradient}`} />
          <div className="p-7">
            <div className="flex items-start justify-between mb-5">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl shadow-lg`}>{tool.emoji}</div>
              <span className={`${tool.labelBg} text-white text-xs font-black px-3 py-1.5 rounded-full`}>{tool.label}</span>
            </div>
            <h3 className="text-xl font-black text-white mb-3 leading-snug group-hover:text-red-300 transition-colors">{tool.title}</h3>
            <p className="text-zinc-400 text-[15px] leading-relaxed mb-5">{tool.desc}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {tool.tags.map(t => <span key={t} className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{t}</span>)}
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-red-300 group-hover:gap-3 transition-all">Try Free <ArrowRight size={14} /></div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function LeadForm() {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({ });
  const [status, setStatus] = useState<"idle"|"loading"|"done">("idle");

  const validate = () => {
    const e: Record<string, string> = { };
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, issue: "security-page landing page — guide request", source: "security-page-cta" }),
      });
    } catch {}
    setStatus("done");
  };

  if (status === "done") return (
    <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
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
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Margaret"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 focus:border-[#ef4444] rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" />
        </div>
        {errors.name && <p className="text-red-400 text-sm mt-1.5 font-semibold ml-1">{errors.name}</p>}
      </div>
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Email Address *</label>
        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 focus:border-[#ef4444] rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" />
        </div>
        {errors.email && <p className="text-red-400 text-sm mt-1.5 font-semibold ml-1">{errors.email}</p>}
      </div>
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Phone <span className="text-zinc-600 normal-case font-normal">(optional — for a free help call)</span></label>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 000-0000"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 focus:border-[#ef4444] rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" />
        </div>
      </div>
      <motion.button onClick={submit} disabled={status === "loading"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full py-5 bg-gradient-to-r from-red-600 to-rose-400 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-red-900/40 mt-2">
        {status === "loading" ? <Loader2 size={22} className="animate-spin" /> : <><Zap size={20} /> Get My Free Guide</>}
      </motion.button>
      <p className="text-center text-zinc-600 text-sm font-medium">No spam · Unsubscribe anytime · 100% free</p>
    </div>
  );
}

export default function PageClient() {
  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden" style={{ backgroundColor: "#0a0000" }}>
      <Navbar /><ScrollToTop />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center opacity-[0.07]" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=50&w=700')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-[#0a0000]/90 to-[#0a0000]" />
        {[...Array(14)].map((_,i) => (
          <motion.div key={i} className="absolute rounded-full opacity-20"
            style={{ width:`${6+(i%4)*3}px`, height:`${6+(i%4)*3}px`, left:`${(i*19+5)%100}%`, top:`${(i*27+8)%100}%`, backgroundColor: "#ef4444" }}
            animate={{ opacity:[0,0.6,0], y:[-8,8,-8] }} transition={{ duration:4+(i%3), repeat:Infinity, delay:(i*0.35)%5 }} />
        ))}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.05 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-red-500/10 border-red-500/25 text-red-300 text-sm font-black uppercase tracking-[0.14em] mb-8 border">
              Online Safety & Digital Literacy
            </motion.div>
            <h1 className="font-black leading-[0.92] tracking-tighter mb-8">
              <motion.span className="block text-7xl md:text-8xl text-white" initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.15,type:"spring",stiffness:80}}>Stay Safe</motion.span>
              <motion.span className="block text-7xl md:text-8xl text-white" initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.24,type:"spring",stiffness:80}}>Online,</motion.span>
              <motion.span className="block text-7xl md:text-8xl from-red-600 to-rose-400 bg-gradient-to-r bg-clip-text text-transparent italic" initial={{opacity:0,y:50}} animate={{opacity:1,y:0}} transition={{delay:0.32999999999999996,type:"spring",stiffness:80}}>Always.</motion.span>
            </h1>
            <motion.p className="text-xl md:text-2xl text-zinc-300 font-medium mb-3 leading-relaxed max-w-lg"
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.55 }}>
              Protect yourself from viruses, scams, and hackers — using completely free tools, explained in plain English.
            </motion.p>
            <motion.p className="text-base text-zinc-500 mb-10 max-w-lg"
              initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.65 }}>
              Online security guidance for adults 45+ who want to protect their devices, accounts, and personal information.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} transition={{ delay:0.75 }}>
              <motion.a href="#learn" whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                className="px-9 py-5 bg-gradient-to-r from-red-600 to-rose-400 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-red-900/50">
                Start Security Course <ArrowRight size={20} />
              </motion.a>
              <Link href="/contact">
                <motion.div whileHover={{ scale:1.03 }} whileTap={{ scale:0.97 }}
                  className="px-9 py-5 border-2 border-zinc-700 hover:border-[#ef4444] text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 transition-colors cursor-pointer">
                  Book a Live Lesson
                </motion.div>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity:0 }} animate={{ opacity:1 }} transition={{ delay:0.9 }}
              className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-amber-400 fill-amber-400" />)}
                <span className="text-zinc-400 text-sm font-medium ml-1">2,400+ learners</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm font-bold"><Shield size={14} /> 100% Free</div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm"><CheckCircle2 size={14} className="text-red-300" /> Plain English</div>
            </motion.div>
          </div>
          <motion.div initial={{ opacity:0, x:30 }} animate={{ opacity:1, x:0 }} transition={{ delay:0.3 }} className="hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-zinc-800">
              <img src="https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=50&w=700" alt="Technology learning guide" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
              <motion.div animate={{ y:[0,-8,0] }} transition={{ duration:3, repeat:Infinity }}
                className="absolute bottom-8 left-8 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-red-600 to-rose-400 flex items-center justify-center text-xl">🛡️</div>
                  <div>
                    <div className="text-white font-black text-base">Security Guide</div>
                    <div className="text-zinc-400 text-sm">Windows, Mac, iPhone, Android</div>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 border-y border-zinc-800/60 bg-zinc-950/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((s,i) => (
            <motion.div key={i} initial={{ opacity:0, y:20 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} transition={{ delay:i*0.1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left gap-2 p-6 rounded-2xl border border-zinc-800/50">
              <span className="text-4xl font-black tabular-nums text-red-400">{s[0]}</span>
              <span className="text-zinc-400 text-base leading-relaxed">{s[1]}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ISSUES */}
      <section className="py-24 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Security Skills We Teach</h2>
            <p className="text-zinc-400 text-lg">Plain-English protection for every device and online account</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISSUES.map((issue,i) => (
              <motion.div key={i} initial={{ opacity:0, y:40 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }}
                transition={{ delay:i*0.1 }} whileHover={{ y:-8, scale:1.02 }}
                className="bg-zinc-900 border border-zinc-800 hover:border-red-500/60 rounded-3xl p-8 transition-all duration-300 group">
                <div className="text-5xl mb-6">{issue[0]}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-red-300 transition-colors">{issue[1]}</h3>
                <p className="text-zinc-400 text-[15px] leading-relaxed">{issue[2]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TechBridgeLearningHub
        topic="Security" accentColor="from-red-600 to-rose-400" accentHex="#ef4444"
        wizardConfig={WIZARD_CONFIG} aiProps={AI_PROPS}
      />

      {/* RELATED TOOLS */}
      <section id="tools" className="py-28 border-t border-zinc-800/50" style={{ backgroundColor:"#0a0000" }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity:0, y:30 }} whileInView={{ opacity:1, y:0 }} viewport={{ once:true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-black uppercase tracking-widest mb-6"
              style={{ backgroundColor:"#ef4444"+"15", borderColor:"#ef4444"+"30", color:"#ef4444" }}>
              <Zap size={14} /> 6 Free Safety Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 text-white">
              Free Tools — Protect<br className="hidden md:block" />
              <span className="bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent">Your Devices & Accounts</span>
            </h2>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">Each tool helps you stay safe online — passwords, devices, home security, and more.</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {TOOLS.map((tool,i) => <ToolCard key={tool.href} tool={tool} i={i} />)}
          </div>
          <div className="text-center">
            <Link href="/tools">
              <motion.div whileHover={{ scale:1.03 }} className="inline-flex items-center gap-3 px-10 py-5 border-2 border-zinc-700 hover:border-[#ef4444] text-white font-black text-lg rounded-2xl transition-colors cursor-pointer">
                See All 27 Free Tools <ChevronRight size={20} />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="py-28 relative overflow-hidden border-t border-zinc-800/50">
        <div className="absolute inset-0 opacity-[0.04] bg-cover bg-center" style={{ backgroundImage:"url('https://images.unsplash.com/photo-1563013544-824ae1b704d3?auto=format&fit=crop&q=50&w=700')" }} />
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/60 via-[#0a0000]/95 to-[#0a0000]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity:0, x:-30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-black uppercase tracking-widest mb-8"
              style={{ backgroundColor:"#ef4444"+"15", borderColor:"#ef4444"+"30", color:"#ef4444" }}>
              <Zap size={14} /> Free Learning Guide
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">Get Your Free Online Safety Guide</h2>
            <p className="text-zinc-300 text-xl leading-relaxed mb-10">We'll send you our complete online security guide — protecting accounts, spotting scams, and staying safe on every device.</p>
            <div className="space-y-5">
              <motion.div key={0} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.0}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">🛡️</span><span className="text-zinc-300 text-lg leading-relaxed">How to set up two-factor authentication — takes just 5 minutes</span></motion.div>
              <motion.div key={1} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.1}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">📧</span><span className="text-zinc-300 text-lg leading-relaxed">How to spot scam emails before they catch you out</span></motion.div>
              <motion.div key={2} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.2}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">🦠</span><span className="text-zinc-300 text-lg leading-relaxed">Free antivirus tools that actually protect your computer</span></motion.div>
              <motion.div key={3} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.30000000000000004}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">🔑</span><span className="text-zinc-300 text-lg leading-relaxed">How to create strong passwords you will actually remember</span></motion.div>
            </div>
          </motion.div>
          <motion.div initial={{ opacity:0, x:30 }} whileInView={{ opacity:1, x:0 }} viewport={{ once:true }}>
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5 tracking-tight">Concerned about your device security?</h2>
          <p className="text-zinc-400 text-xl leading-relaxed mb-10">Our live sessions walk you through securing your specific devices and accounts — one-on-one, no jargon.</p>
          <Link href="/contact">
            <motion.div whileHover={{ scale:1.03 }} className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-red-600 to-rose-400 text-white font-black text-xl rounded-2xl shadow-xl shadow-red-900/40 cursor-pointer">
              Book a Live Security Session <ArrowRight size={22} />
            </motion.div>
          </Link>
          <p className="mt-5 text-zinc-600 text-base">From $49 · No tech knowledge needed · Plain English</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
