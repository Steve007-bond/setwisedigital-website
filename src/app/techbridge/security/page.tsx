"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import LeadWizard from "@/components/LeadWizard";
import Link from "next/link";
import { Shield, ArrowRight, Lightbulb, CheckCircle2 } from "lucide-react";

const WIZARD_CONFIG = {
  source: "security-page",
  accentColor: "from-red-600 to-rose-400",
  accentHex: "#ef4444",
  step1Title: "What security help do you need?",
  step1Options: [
    { label: "I think I have a virus", icon: "🦠", popular: true },
    { label: "Email was hacked", icon: "📧", popular: true },
    { label: "Set up antivirus", icon: "🛡️" },
    { label: "Password help", icon: "🔑" },
    { label: "Suspicious email", icon: "⚠️" },
    { label: "Secure my Wi-Fi", icon: "📶" },
  ],
  step2Title: "What device are you using?",
  brandOptions: [
    { label: "Windows PC", icon: "🖥️" },
    { label: "Mac", icon: "🍎" },
    { label: "iPhone", icon: "📱" },
    { label: "Android", icon: "📲" },
    { label: "iPad", icon: "📊" },
    { label: "All of them", icon: "💻" },
  ],
  step2Options: [
    { label: "Remove virus now", icon: "🚨" },
    { label: "Secure my accounts", icon: "🔒" },
    { label: "Prevent attacks", icon: "🛡️" },
    { label: "Expert consultation", icon: "👤" },
  ],
  processingMessages: [
    "Checking your security situation...",
    "Preparing your protection steps...",
    "Almost done, [name]...",
    "Your security guide is ready!",
  ],
};

const CHECKS = [
  { label: "No active threats detected", status: true },
  { label: "Antivirus protection", status: true },
  { label: "Firewall active", status: true },
  { label: "Password strength", status: false },
  { label: "2-Factor Authentication", status: false },
];

function SecuritySVG() {
  return (
    <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-64 h-64 mx-auto">
      <svg viewBox="0 0 200 200" className="w-full h-full">
        {/* Shield */}
        <motion.path d="M100 15 L165 45 L165 100 Q165 155 100 185 Q35 155 35 100 L35 45 Z"
          fill="#1a0000" stroke="#ef4444" strokeWidth="2.5"
          animate={{ filter: ["drop-shadow(0 0 6px rgba(239,68,68,0.3))", "drop-shadow(0 0 16px rgba(239,68,68,0.6))", "drop-shadow(0 0 6px rgba(239,68,68,0.3))"] }}
          transition={{ duration: 2, repeat: Infinity }} />
        {/* Lock body */}
        <rect x="78" y="95" width="44" height="36" rx="6" fill="#ef4444" />
        {/* Lock shackle */}
        <path d="M88 95 L88 82 Q88 68 100 68 Q112 68 112 82 L112 95" fill="none" stroke="#ef4444" strokeWidth="7" strokeLinecap="round" />
        {/* Keyhole */}
        <circle cx="100" cy="110" r="6" fill="#1a0000" />
        <rect x="97" y="114" width="6" height="10" rx="2" fill="#1a0000" />
        {/* Scan rings */}
        {[1, 2, 3].map(i => (
          <motion.path key={i} d="M100 15 L165 45 L165 100 Q165 155 100 185 Q35 155 35 100 L35 45 Z"
            fill="none" stroke="#ef4444" strokeWidth="1"
            animate={{ opacity: [0, 0.5, 0], scale: [0.8, 1.3] }}
            transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
            style={{ transformOrigin: "100px 100px" }} />
        ))}
      </svg>
    </motion.div>
  );
}

const ISSUES = [
  { icon: "🦠", title: "Virus Removal", desc: "Safe, step-by-step removal using free tools." },
  { icon: "🔑", title: "Password Safety", desc: "Create strong passwords you'll actually remember." },
  { icon: "🛡️", title: "Antivirus Setup", desc: "Free tools that protect against 99% of threats." },
  { icon: "📧", title: "Email Security", desc: "Stop hackers from accessing your accounts." },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-[#0a0000] text-white font-sans">
      <Navbar />
      <section className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-950/20 via-transparent to-rose-950/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest mb-8">
              <Shield size={14} /> Online Security
            </motion.div>
            <div className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
              {["Stay Safe", "Online,"].map((word, i) => (
                <motion.span key={i} className="block" initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, type: "spring" }}>
                  {word}
                </motion.span>
              ))}
              <motion.span className="block bg-gradient-to-r from-red-400 to-rose-300 bg-clip-text text-transparent italic"
                initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4, type: "spring" }}>
                Always.
              </motion.span>
            </div>
            <motion.p className="text-xl text-zinc-400 font-medium mb-10 leading-relaxed max-w-lg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Protect yourself from viruses, scams, and hackers — using completely free tools, in plain English.
            </motion.p>

            {/* Security checklist */}
            <motion.div className="space-y-3 mb-10" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>
              {CHECKS.map((check, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.9 + i * 0.1 }}
                  className="flex items-center gap-3">
                  <div className={`w-6 h-6 rounded-full flex items-center justify-center ${check.status ? "bg-green-500" : "bg-red-500/30 border border-red-500"}`}>
                    {check.status ? <CheckCircle2 size={14} className="text-white" /> : <span className="text-red-400 text-xs font-black">!</span>}
                  </div>
                  <span className={`text-sm font-medium ${check.status ? "text-zinc-300" : "text-red-400"}`}>{check.label}</span>
                  {!check.status && <span className="text-xs font-bold text-red-400 bg-red-500/10 px-2 py-0.5 rounded-full">Fix this</span>}
                </motion.div>
              ))}
            </motion.div>

            <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.2 }}>
              <motion.a href="#learn"
                className="px-8 py-5 font-black text-lg rounded-2xl text-white bg-gradient-to-r from-red-600 to-rose-500 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 0 0 rgba(239,68,68,0)", "0 0 0 12px rgba(239,68,68,0)", "0 0 0 0 rgba(239,68,68,0)"] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}>
                Fix My Security <ArrowRight size={20} />
              </motion.a>
              <Link href="/contact" className="px-8 py-5 border-2 border-zinc-600 hover:border-red-500 text-white font-black text-lg rounded-2xl flex items-center justify-center transition-colors">
                Talk to Expert
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center justify-center"><SecuritySVG /></div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950/50 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-4">Security Problems We Solve</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISSUES.map((issue, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ scale: 1.04, y: -8 }} className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 group hover:border-red-500 transition-all cursor-pointer">
                <div className="text-4xl mb-6">{issue.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-red-400 transition-colors">{issue.title}</h3>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed">{issue.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section id="learn" className="py-24 bg-zinc-950">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/10 border border-red-500/20 text-red-400 text-xs font-black uppercase tracking-widest mb-6">
              <Lightbulb size={14} /> Free Security Guide
            </div>
            <h2 className="text-4xl font-black text-white mb-4">Protect Yourself Today</h2>
            <p className="text-zinc-500 font-medium">Tell us your concern — get a personalised security plan</p>
          </motion.div>
          <div className="bg-zinc-900/80 border border-zinc-800 rounded-[2rem] p-8">
            <LeadWizard config={WIZARD_CONFIG} />
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
