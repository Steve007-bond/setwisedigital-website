"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import TechBridgeLearningHub from "@/components/TechBridgeLearningHub";
import { Wifi, AlertCircle, ArrowRight } from "lucide-react";
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
    { label: "HP", icon: "🔵" },
    { label: "Canon", icon: "🔴" },
    { label: "Epson", icon: "⚫" },
    { label: "Brother", icon: "🟢" },
    { label: "Lexmark", icon: "🟡" },
    { label: "Other", icon: "❓" },
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

function PrinterSVG() {
  return (
    <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        <rect x="20" y="80" width="160" height="90" rx="8" fill="#1e293b" stroke="#334155" strokeWidth="2" />
        <rect x="30" y="90" width="140" height="60" rx="4" fill="#0f172a" />
        <rect x="60" y="145" width="80" height="6" rx="2" fill="#334155" />
        <rect x="50" y="55" width="100" height="30" rx="4" fill="#1e293b" stroke="#334155" strokeWidth="1.5" />
        <circle cx="150" cy="110" r="6" fill="#2563eb" opacity="0.8" />
        <circle cx="135" cy="110" r="4" fill="#1d4ed8" opacity="0.6" />
        <motion.circle cx="150" cy="110" r="6" fill="#3b82f6"
          animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
        {[1, 2, 3].map(i => (
          <motion.circle key={i} cx="100" cy="75" r={i * 10} fill="none" stroke="#2563eb" strokeWidth="1.5"
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: [0, 0.8, 0], scale: [0.5, 1.5, 2] }}
            transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.5 }} />
        ))}
      </svg>
      {[
        { color: "#06b6d4", x: 60, delay: 0 },
        { color: "#ec4899", x: 80, delay: 0.3 },
        { color: "#eab308", x: 100, delay: 0.6 },
        { color: "#1e293b", x: 120, delay: 0.9 },
      ].map((drop, i) => (
        <motion.div key={i} className="absolute w-3 h-4 rounded-full"
          style={{ backgroundColor: drop.color, left: drop.x, top: 20 }}
          animate={{ y: [0, 50, 0], scale: [1, 0.8, 1] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: drop.delay, type: "spring", stiffness: 400, damping: 15 }} />
      ))}
    </motion.div>
  );
}

function InkBar({ label, value, color, warning }: { label: string; value: number; color: string; warning?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false });
  return (
    <div ref={ref} className="space-y-2">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 rounded-sm" style={{ backgroundColor: color }} />
          <span className="text-sm font-black text-white uppercase tracking-widest">{label}</span>
          {warning && (
            <motion.div animate={{ rotate: [-5, 5, -5, 5, 0] }} transition={{ duration: 0.4, repeat: Infinity, repeatDelay: 3.6 }}>
              <AlertCircle size={16} className="text-red-400" />
            </motion.div>
          )}
        </div>
        <span className={`text-sm font-black ${warning ? "text-red-400" : "text-zinc-300"}`}>{value}%</span>
      </div>
      <div className="h-3 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div className="h-full rounded-full" style={{ backgroundColor: warning ? "#ef4444" : color }}
          initial={{ width: 0 }} animate={{ width: inView ? `${value}%` : 0 }}
          transition={{ type: "spring", stiffness: 60, damping: 15, delay: 0.15 }} />
      </div>
      {warning && (
        <motion.p className="text-red-400 text-xs font-bold"
          animate={{ opacity: [1, 0.5, 1] }} transition={{ duration: 1, repeat: Infinity }}>
          Low ink — replace soon!
        </motion.p>
      )}
    </div>
  );
}

const ISSUES = [
  { icon: "📄", title: "Paper Jams", desc: "Learn what causes paper jams and how to prevent them." },
  { icon: "📶", title: "Wi-Fi Setup", desc: "Understand how Wi-Fi printing works and how to set it up." },
  { icon: "🖨️", title: "Replace Ink", desc: "Learn how ink cartridges work and when to replace them." },
  { icon: "🔍", title: "Scanner Help", desc: "Learn how scanners work and how to send documents digitally." },
];

export default function PrintersPage() {
  const inkRef = useRef(null);

  return (
    <div className="min-h-screen bg-[#080808] text-white font-sans">
      <Navbar />
      <ScrollToTop />

      {/* HERO */}
      <section className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/30 via-transparent to-indigo-950/20" />
          {[...Array(20)].map((_, i) => (
            <motion.div key={i} className="absolute w-1 h-1 bg-blue-500 rounded-full"
              style={{ left: `${(i * 17 + 7) % 100}%`, top: `${(i * 23 + 11) % 100}%` }}
              animate={{ opacity: [0, 1, 0], scale: [0, 1, 0] }}
              transition={{ duration: 2 + (i % 3), repeat: Infinity, delay: (i * 0.4) % 5 }} />
          ))}
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-8">
              <Wifi size={14} /> Printer & Scanner Literacy
            </motion.div>
            <div className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
              {"Print Without".split(" ").map((word, i) => (
                <motion.span key={i} className="block" initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 + i * 0.08, type: "spring", stiffness: 100 }}>
                  {word}
                </motion.span>
              ))}
              <motion.span className="block bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent italic"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.5, type: "spring" }}>
                Pressure.
              </motion.span>
            </div>
            <motion.p className="text-xl text-zinc-400 font-medium mb-10 leading-relaxed max-w-lg"
              initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}>
              Understand how printers work — wireless setup, maintenance, and features explained in plain English.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }}>
              <motion.a href="#learn"
                className="relative px-8 py-5 bg-blue-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 overflow-hidden"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 0 0 rgba(37,99,235,0)", "0 0 0 12px rgba(37,99,235,0)", "0 0 0 0 rgba(37,99,235,0)"] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}>
                Start Printer Masterclass <ArrowRight size={20} />
              </motion.a>
              <Link href="/contact"
                className="relative px-8 py-5 border-2 border-zinc-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 overflow-hidden group hover:border-blue-500 transition-colors">
                <span className="absolute inset-0 bg-blue-600 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                <span className="relative">Book a Live Lesson</span>
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center justify-center">
            <PrinterSVG />
          </div>
        </div>
      </section>

      {/* INK LEVELS */}
      <section ref={inkRef} className="py-20 bg-zinc-950/50 border-y border-zinc-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-black text-white mb-3">Ink Level Diagnostics</h2>
            <p className="text-zinc-500 font-medium">Our guide covers when and how to replace every cartridge</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-zinc-900/80 rounded-[2rem] p-8 border border-zinc-800">
            <InkBar label="Cyan" value={78} color="#06b6d4" />
            <InkBar label="Magenta" value={45} color="#ec4899" />
            <InkBar label="Yellow" value={61} color="#eab308" />
            <InkBar label="Black" value={12} color="#ef4444" warning />
          </div>
        </div>
      </section>

      {/* ISSUE CARDS */}
      <section className="py-24 bg-[#080808]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">Topics Covered in This Course</h2>
            <p className="text-zinc-500 text-lg font-medium">Every problem — explained in plain English</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISSUES.map((issue, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ scale: 1.04, y: -8 }}
                className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 cursor-pointer group hover:border-blue-500 transition-all">
                <div className="text-4xl mb-6">{issue.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">{issue.title}</h3>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed">{issue.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── THE 3-OPTION LEARNING HUB ─────────────────────────────── */}
      <TechBridgeLearningHub
        topic="Printer"
        accentColor="from-blue-400 to-cyan-400"
        accentHex="#2563eb"
        wizardConfig={WIZARD_CONFIG}
        aiProps={AI_PROPS}
      />

      <Footer />
    </div>
  );
}
