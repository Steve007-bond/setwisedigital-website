"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import TechBridgeLearningHub from "@/components/TechBridgeLearningHub";
import { Wifi, AlertCircle, ArrowRight, CheckCircle2, Phone, Mail, User, Loader2, Star, Shield, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

const WIZARD_CONFIG = {
  source: "printers-page",
  accentColor: "from-blue-600 to-blue-400",
  accentHex: "#2563eb",
  step1Title: "What's going on with your printer?",
  step1Options: [
    { label: "Paper jam", icon: "📄", popular: true },
    { label: "Wi-Fi setup", icon: "📶", popular: true },
    { label: "Replace ink", icon: "🖨️" },
    { label: "Scanner help", icon: "🔍" },
    { label: "Offline error", icon: "❌" },
    { label: "Print quality", icon: "🖼️" },
  ],
  step2Title: "Which brand is your printer?",
  brandOptions: [
    { label: "HP", icon: "🔵" }, { label: "Canon", icon: "🔴" },
    { label: "Epson", icon: "⚫" }, { label: "Brother", icon: "🟢" },
    { label: "Lexmark", icon: "🟡" }, { label: "Other", icon: "❓" },
  ],
  step2Options: [
    { label: "Show me how it works", icon: "⚡" },
    { label: "Learn step by step", icon: "📚" },
    { label: "Book a live lesson", icon: "👤" },
    { label: "Get PDF guide", icon: "📄" },
  ],
  processingMessages: [
    "Preparing your printer learning guide...",
    "Adding lessons for your [brand] printer...",
    "Almost ready, [name]...",
    "Your personalised learning guide is ready!",
  ],
};

const AI_PROPS = {
  brandExamples: ["HP", "Canon", "Epson", "Brother", "Lexmark"],
  starterQuestions: [
    "My printer won't connect to Wi-Fi",
    "How do I fix a paper jam?",
    "My printer shows offline — how do I fix it?",
    "How do I replace ink cartridges?",
    "My prints look blurry or faded",
  ],
};

const TOOLS = [
  { href: "/tools/my-printer-stopped-working", emoji: "🔧", label: "Most Used", labelBg: "bg-orange-500", title: "My Printer Stopped Working", desc: "Select your exact problem — paper jam, offline, blank pages. Get plain-English step-by-step fixes for your printer brand.", tags: ["HP", "Canon", "Epson", "Brother"], gradient: "from-orange-500 to-amber-400" },
  { href: "/tools/set-up-my-new-printer", emoji: "📦", label: "New Printer?", labelBg: "bg-sky-600", title: "Set Up My New Printer", desc: "Just got a printer? Choose your brand and connection type — Wi-Fi, USB, or Bluetooth — for the exact setup steps.", tags: ["Wi-Fi", "USB", "Bluetooth"], gradient: "from-sky-500 to-blue-400" },
  { href: "/tools/how-to-print-from-phone-or-laptop", emoji: "📱", label: "Popular", labelBg: "bg-blue-600", title: "Print from Phone or Laptop", desc: "iPhone, Android, Windows or Mac — pick your device and printer brand for exact wireless printing steps.", tags: ["iPhone", "Android", "Windows"], gradient: "from-blue-500 to-cyan-400" },
  { href: "/tools/hp-vs-canon-vs-epson-vs-brother", emoji: "⚖️", label: "Buying Soon?", labelBg: "bg-violet-600", title: "HP vs Canon vs Epson vs Brother", desc: "3 honest questions score all 4 brands against your actual needs. Get a clear ranked recommendation.", tags: ["HP", "Canon", "Epson"], gradient: "from-violet-500 to-fuchsia-400" },
  { href: "/tools/is-hp-instant-ink-worth-it", emoji: "💸", label: "Save Money", labelBg: "bg-emerald-600", title: "Is HP Instant Ink Worth It?", desc: "Enter your monthly page count — get an honest year-by-year cost comparison of subscription vs buying cartridges.", tags: ["Cost", "HP", "Subscription"], gradient: "from-emerald-500 to-teal-400" },
  { href: "/tools/printer-cost-calculator", emoji: "🧮", label: "Free Calc", labelBg: "bg-indigo-600", title: "True Printer Cost Calculator", desc: "Ink, paper, electricity — calculate exactly what your printer costs per year and compare models side by side.", tags: ["Ink Cost", "Annual", "Budget"], gradient: "from-indigo-500 to-blue-400" },
];

const ISSUES = [
  { icon: "📄", title: "Paper Jams", desc: "Learn what causes paper jams and how to prevent them for good." },
  { icon: "📶", title: "Wi-Fi Setup", desc: "Understand how wireless printing works and set it up confidently." },
  { icon: "🖨️", title: "Replace Ink", desc: "Learn how ink cartridges work and exactly when to replace them." },
  { icon: "🔍", title: "Scanner Help", desc: "Scan and send documents digitally without any confusion." },
];

const STATS = [
  { number: "90%", text: "of printer problems can be fixed at home without a repair call" },
  { number: "4.2B", text: "wireless printers active worldwide in 2025" },
  { number: "5 min", text: "average time to resolve a printer offline error" },
];

function InkBar({ label, value, color, warning }: { label: string; value: number; color: string; warning?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true });
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-5 h-5 rounded-md" style={{ backgroundColor: color }} />
          <span className="text-base font-bold text-zinc-100 tracking-wide">{label}</span>
          {warning && <motion.div animate={{ rotate: [-8, 8, 0] }} transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 3 }}><AlertCircle size={16} className="text-red-400" /></motion.div>}
        </div>
        <span className={`text-base font-black tabular-nums ${warning ? "text-red-400" : "text-zinc-200"}`}>{value}%</span>
      </div>
      <div className="h-4 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/50">
        <motion.div className="h-full rounded-full" style={{ backgroundColor: warning ? "#ef4444" : color }}
          initial={{ width: 0 }} animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ type: "spring", stiffness: 50, damping: 18, delay: 0.2 }} />
      </div>
      {warning && <motion.p className="text-red-400 text-sm font-bold" animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.2, repeat: Infinity }}>⚠️ Low ink — replace soon</motion.p>}
    </div>
  );
}

function ToolCard({ tool, i }: { tool: typeof TOOLS[0]; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 36 }} animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: i * 0.07, ease: [0.22, 1, 0.36, 1] }} whileHover={{ y: -6 }}>
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
              {tool.tags.map(t => <span key={t} className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{t}</span>)}
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-blue-400 group-hover:gap-3 transition-all">Try Free <ArrowRight size={14} /></div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}

function LeadForm() {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
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
        body: JSON.stringify({ name, email, phone, issue: "Printer landing page — guide request", source: "printers-page-cta" }),
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
      <h3 className="text-2xl font-black text-white mb-2">You're all set, {name}!</h3>
      <p className="text-zinc-400 font-medium">We'll be in touch within 24 hours.</p>
    </motion.div>
  );

  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Your Name *</label>
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Margaret"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 focus:border-blue-500 rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" />
        </div>
        {errors.name && <p className="text-red-400 text-sm mt-1.5 font-semibold ml-1">{errors.name}</p>}
      </div>
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Email Address *</label>
        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="your@email.com"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 focus:border-blue-500 rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" />
        </div>
        {errors.email && <p className="text-red-400 text-sm mt-1.5 font-semibold ml-1">{errors.email}</p>}
      </div>
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Phone <span className="text-zinc-600 normal-case font-normal">(optional — for a free help call)</span></label>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="(555) 000-0000"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 focus:border-blue-500 rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" />
        </div>
      </div>
      <motion.button onClick={submit} disabled={status === "loading"} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
        className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-900/40 mt-2">
        {status === "loading" ? <Loader2 size={22} className="animate-spin" /> : <><Zap size={20} /> Get My Free Printer Guide</>}
      </motion.button>
      <p className="text-center text-zinc-600 text-sm font-medium">No spam · Unsubscribe anytime · 100% free</p>
    </div>
  );
}

export default function PrintersPage() {
  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans overflow-x-hidden">
      <Navbar /><ScrollToTop />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=50&w=1400')] bg-cover bg-center opacity-[0.07]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/60 via-[#080808]/90 to-[#080808]" />
        {[...Array(16)].map((_, i) => (
          <motion.div key={i} className="absolute rounded-full bg-blue-500/15"
            style={{ width: `${6 + (i % 4) * 3}px`, height: `${6 + (i % 4) * 3}px`, left: `${(i * 19 + 5) % 100}%`, top: `${(i * 27 + 8) % 100}%` }}
            animate={{ opacity: [0, 0.7, 0], y: [-8, 8, -8] }}
            transition={{ duration: 4 + (i % 3), repeat: Infinity, delay: (i * 0.35) % 5 }} />
        ))}

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.05 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/25 text-blue-300 text-sm font-black uppercase tracking-[0.14em] mb-8">
              <Wifi size={14} /> Printer & Scanner Learning Guide
            </motion.div>
            <h1 className="font-black leading-[0.92] tracking-tighter mb-8">
              {["Print", "Without"].map((w, i) => (
                <motion.span key={i} className="block text-7xl md:text-8xl text-white"
                  initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.15 + i * 0.09, type: "spring", stiffness: 80 }}>{w}
                </motion.span>
              ))}
              <motion.span className="block text-7xl md:text-8xl bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-300 bg-clip-text text-transparent italic"
                initial={{ opacity: 0, y: 50 }} animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.33, type: "spring", stiffness: 80 }}>Pressure.
              </motion.span>
            </h1>
            <motion.p className="text-xl md:text-2xl text-zinc-300 font-medium mb-3 leading-relaxed max-w-lg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.55 }}>
              Plain-English printer learning for adults 45+. Wi-Fi setup, ink, paper jams, scanning — all explained simply.
            </motion.p>
            <motion.p className="text-base text-zinc-500 mb-10 max-w-lg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
              No confusing tech talk. No rushing. Just clear, calm guidance at your pace.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.75 }}>
              <motion.a href="#learn" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                className="px-9 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-900/50">
                Start Learning Free <ArrowRight size={20} />
              </motion.a>
              <Link href="/contact">
                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                  className="px-9 py-5 border-2 border-zinc-700 hover:border-blue-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 transition-colors cursor-pointer">
                  Book a Live Lesson
                </motion.div>
              </Link>
            </motion.div>
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.9 }}
              className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s => <Star key={s} size={16} className="text-amber-400 fill-amber-400" />)}
                <span className="text-zinc-400 text-sm font-medium ml-1">2,400+ learners</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm font-bold"><Shield size={14} /> 100% Free</div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm"><CheckCircle2 size={14} className="text-blue-400" /> Plain English</div>
            </motion.div>
          </div>

          <motion.div initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
            className="hidden lg:block">
            <div className="relative rounded-3xl overflow-hidden shadow-2xl shadow-black/60 border border-zinc-800">
              <img src="https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=70&w=700"
                alt="Person setting up a home printer" className="w-full h-[500px] object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#080808]/80 via-transparent to-transparent" />
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }}
                className="absolute bottom-8 left-8 bg-zinc-900/90 backdrop-blur-sm border border-zinc-700 rounded-2xl px-5 py-4 shadow-xl">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-xl">🖨️</div>
                  <div>
                    <div className="text-white font-black text-base">Printer Set Up</div>
                    <div className="text-zinc-400 text-sm">HP, Canon, Epson, Brother</div>
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
          {STATS.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
              className="flex flex-col items-center md:items-start text-center md:text-left gap-2 p-6 rounded-2xl border border-zinc-800/50">
              <span className="text-4xl font-black text-blue-400 tabular-nums">{s.number}</span>
              <span className="text-zinc-400 text-base leading-relaxed">{s.text}</span>
            </motion.div>
          ))}
        </div>
      </section>

      {/* INK LEVELS */}
      <section className="py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black mb-4 tracking-tight">Ink Level Diagnostics</h2>
            <p className="text-zinc-400 text-lg font-medium">Our guide covers exactly when and how to replace every cartridge</p>
          </motion.div>
          <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8">
            <InkBar label="Cyan" value={78} color="#06b6d4" />
            <InkBar label="Magenta" value={45} color="#ec4899" />
            <InkBar label="Yellow" value={61} color="#eab308" />
            <InkBar label="Black" value={12} color="#ef4444" warning />
          </div>
        </div>
      </section>

      {/* TOPICS */}
      <section className="py-24 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">Topics Covered in This Guide</h2>
            <p className="text-zinc-400 text-lg">Every common printer problem — explained in plain English</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISSUES.map((issue, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                transition={{ delay: i * 0.1 }} whileHover={{ y: -8, scale: 1.02 }}
                className="bg-zinc-900 border border-zinc-800 hover:border-blue-500/60 rounded-3xl p-8 transition-all duration-300 group">
                <div className="text-5xl mb-6">{issue.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors">{issue.title}</h3>
                <p className="text-zinc-400 text-[15px] leading-relaxed">{issue.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING HUB */}
      <TechBridgeLearningHub
        topic="Printer" accentColor="from-blue-400 to-cyan-400" accentHex="#2563eb"
        wizardConfig={WIZARD_CONFIG} aiProps={AI_PROPS}
      />

      {/* RELATED TOOLS */}
      <section id="tools" className="py-28 bg-[#080808] border-t border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-black uppercase tracking-widest mb-6">
              <Zap size={14} /> 6 Free Printer Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 text-white">
              Free Tools — Pick Your<br className="hidden md:block" />{" "}
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Exact Problem</span>
            </h2>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Each tool gives you step-by-step guidance for your specific printer and situation — not generic advice.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {TOOLS.map((tool, i) => <ToolCard key={tool.href} tool={tool} i={i} />)}
          </div>
          <div className="text-center">
            <Link href="/tools">
              <motion.div whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-3 px-10 py-5 border-2 border-zinc-700 hover:border-blue-500 text-white font-black text-lg rounded-2xl transition-colors cursor-pointer">
                See All 27 Free Tools <ChevronRight size={20} />
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="py-28 relative overflow-hidden border-t border-zinc-800/50">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1560472354-b33ff0c44a43?auto=format&fit=crop&q=30&w=1400')] bg-cover bg-center opacity-[0.04]" />
        <div className="absolute inset-0 bg-gradient-to-br from-blue-950/25 via-[#080808] to-[#080808]" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-black uppercase tracking-widest mb-8">
              <Zap size={14} /> Free Printer Guide
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
              Get Your Complete<br />
              <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent">Printer Learning Guide</span>
            </h2>
            <p className="text-zinc-300 text-xl leading-relaxed mb-10">
              Enter your details and we'll send you our full printer guide — setup, fixing problems, ink management, and printing from any device. Plain English.
            </p>
            <div className="space-y-5">
              {[["🖨️","Wi-Fi setup for HP, Canon, Epson & Brother — step by step"],["🔧","How to fix the 8 most common printer problems at home"],["💧","When to replace ink and how to save money doing it"],["📱","How to print from iPhone, Android, Windows or Mac"]].map(([icon, text], i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="flex items-start gap-4">
                  <span className="text-2xl flex-shrink-0 mt-0.5">{icon}</span>
                  <span className="text-zinc-300 text-lg leading-relaxed">{text}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
          <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
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
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5 tracking-tight">Still having trouble with your printer?</h2>
          <p className="text-zinc-400 text-xl leading-relaxed mb-10">
            Our live lesson sessions walk through your specific printer and problem — one-on-one, at your own pace.
          </p>
          <Link href="/contact">
            <motion.div whileHover={{ scale: 1.03 }} className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-xl rounded-2xl shadow-xl shadow-blue-900/40 cursor-pointer">
              Book a Live Printer Lesson <ArrowRight size={22} />
            </motion.div>
          </Link>
          <p className="mt-5 text-zinc-600 text-base">From $49 · No tech knowledge needed · Plain English</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
