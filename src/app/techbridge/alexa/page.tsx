"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechBridgeLearningHub from "@/components/TechBridgeLearningHub";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { Mic, ArrowRight, Lightbulb } from "lucide-react";

const WIZARD_CONFIG = {
  source: "alexa-page",
  accentColor: "from-cyan-500 to-blue-500",
  accentHex: "#06b6d4",
  step1Title: "Which device do you have?",
  step1Options: [
    { label: "Echo Dot", icon: "🔵", popular: true },
    { label: "Echo", icon: "⚫" },
    { label: "Echo Show", icon: "📺", popular: true },
    { label: "Echo Plus", icon: "🔷" },
    { label: "Google Home", icon: "🟢" },
    { label: "Not sure", icon: "❓" },
  ],
  step2Title: "What do you want to learn?",
  brandOptions: [
    { label: "Amazon Echo", icon: "🔵" },
    { label: "Echo Dot", icon: "⚫" },
    { label: "Echo Show", icon: "📺" },
    { label: "Google Home", icon: "🟢" },
    { label: "Apple HomePod", icon: "🍎" },
    { label: "Other", icon: "❓" },
  ],
  step2Options: [
    { label: "Account setup", icon: "🔑" },
    { label: "Smart home control", icon: "🏠" },
    { label: "Music & calls", icon: "🎵" },
    { label: "Reminders & timers", icon: "⏰" },
  ],
  processingMessages: [
    "Got it! Checking your device...",
    "Finding the right steps for you...",
    "[name], your guide is almost ready...",
    "Done! Here's everything you need.",
  ],
};

const COMMANDS = [
  "Alexa, what's the weather today?",
  "Alexa, set a timer for 10 minutes",
  "Alexa, turn off the living room lights",
  "Alexa, play relaxing music",
  "Alexa, call my daughter",
  "Alexa, remind me to take my pills at 8pm",
];

function AlexaDevice({ listening }: { listening: boolean }) {
  return (
    <div className="relative flex flex-col items-center">
      {/* Cylinder body */}
      <motion.div className="relative w-32 h-44 rounded-full overflow-hidden"
        style={{ background: "linear-gradient(135deg, #1e293b 0%, #0f172a 50%, #1e293b 100%)" }}
        animate={{ scale: listening ? 1.02 : 1 }} transition={{ type: "spring", stiffness: 300 }}>
        {/* Ring light */}
        <motion.div className="absolute top-0 left-0 right-0 h-4 rounded-t-full"
          style={{ background: listening ? "conic-gradient(from 0deg, #06b6d4, #2563eb, #06b6d4)" : "conic-gradient(from 0deg, #1e3a5f, #0ea5e9, #1e3a5f)" }}
          animate={{ rotate: 360 }} transition={{ duration: listening ? 1.5 : 3, repeat: Infinity, ease: "linear" }} />
        {/* Body texture */}
        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-full h-px opacity-10" style={{ top: `${20 + i * 12}%`, background: "linear-gradient(to right, transparent, #94a3b8, transparent)" }} />
        ))}
        {/* Base ring */}
        <div className="absolute bottom-0 left-0 right-0 h-6 rounded-b-full bg-zinc-800" />
      </motion.div>
      {/* Waveform */}
      <div className="flex items-center gap-0.5 mt-4">
        {[...Array(30)].map((_, i) => {
          const amp = listening ? 1 : 0.3;
          return (
            <motion.div key={i} className="w-1 rounded-full bg-cyan-400"
              animate={{ height: [4, (Math.sin(i * 0.5) * 20 + 24) * amp, 4] }}
              transition={{ duration: 0.8, repeat: Infinity, delay: i * 0.025, ease: "easeInOut" }} />
          );
        })}
      </div>
    </div>
  );
}

function SpeechBubble({ text, side }: { text: string; side: "left" | "right" }) {
  return (
    <motion.div initial={{ opacity: 0, y: 20, x: side === "left" ? -20 : 20 }}
      animate={{ opacity: 1, y: 0, x: 0 }} exit={{ opacity: 0, y: -20 }}
      className={`absolute ${side === "left" ? "left-0" : "right-0"} bg-zinc-800 border border-zinc-700 rounded-2xl px-4 py-2.5 max-w-[220px] shadow-xl`}
      style={{ top: Math.random() * 40 + 20 + "%" }}>
      <p className="text-white text-xs font-medium leading-relaxed">{text}</p>
      <div className={`absolute top-3 ${side === "left" ? "-right-2" : "-left-2"} w-4 h-4 bg-zinc-800 border-r border-b border-zinc-700 transform ${side === "left" ? "rotate-[-45deg]" : "rotate-[135deg]"}`} />
    </motion.div>
  );
}

const ISSUES = [
  { icon: "🔗", title: "Account Linking", desc: "Connect all your services to Alexa in minutes." },
  { icon: "🎓", title: "Voice Training", desc: "Teach Alexa to understand your voice perfectly." },
  { icon: "🏠", title: "Smart Home", desc: "Control lights, plugs and cameras by voice." },
];

export default function AlexaPage() {
  const [cmdIdx, setCmdIdx] = useState(0);
  const [listening, setListening] = useState(false);

  useEffect(() => {
    const t = setInterval(() => setCmdIdx(i => (i + 1) % COMMANDS.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <div className="min-h-screen bg-[#050505] text-white font-sans">
      <Navbar />
      <ScrollToTop />
      <section className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-cyan-950/20 via-transparent to-blue-950/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-black uppercase tracking-widest mb-8">
              <Mic size={14} /> Alexa & Voice Assistants
            </motion.div>
            <div className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
              {["Your Voice,", "Your Home"].map((word, i) => (
                <motion.span key={i} className={`block ${i === 1 ? "bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent italic" : ""}`}
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, type: "spring" }}>
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.p className="text-xl text-zinc-400 font-medium mb-10 leading-relaxed max-w-lg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Learn 50+ Alexa commands that most people never discover. Control your whole home with just your voice.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <motion.a href="#learn"
                className="px-8 py-5 font-black text-lg rounded-2xl text-white bg-gradient-to-r from-cyan-600 to-blue-600 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 0 0 rgba(6,182,212,0)", "0 0 0 12px rgba(6,182,212,0)", "0 0 0 0 rgba(6,182,212,0)"] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}>
                Get Free Guide <ArrowRight size={20} />
              </motion.a>
              <Link href="/contact" className="px-8 py-5 border-2 border-zinc-600 hover:border-cyan-500 text-white font-black text-lg rounded-2xl flex items-center justify-center transition-colors">
                Talk to Expert
              </Link>
            </motion.div>
          </div>
          <div className="relative flex items-center justify-center min-h-[400px]"
            onMouseEnter={() => setListening(true)} onMouseLeave={() => setListening(false)}>
            <AnimatePresence mode="wait">
              <SpeechBubble key={`l${cmdIdx}`} text={COMMANDS[cmdIdx]} side="left" />
            </AnimatePresence>
            <AlexaDevice listening={listening} />
            <AnimatePresence mode="wait">
              <SpeechBubble key={`r${(cmdIdx + 2) % COMMANDS.length}`} text={COMMANDS[(cmdIdx + 2) % COMMANDS.length]} side="right" />
            </AnimatePresence>
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950/50 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-4">What We Help You Master</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ISSUES.map((issue, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ scale: 1.04, y: -8 }} className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-10 group hover:border-cyan-500 transition-all cursor-pointer">
                <div className="text-4xl mb-6">{issue.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-cyan-400 transition-colors">{issue.title}</h3>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed">{issue.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <TechBridgeLearningHub
        topic="Alexa"
        accentColor="from-cyan-400 to-blue-400"
        accentHex="#06b6d4"
        wizardConfig={WIZARD_CONFIG}
        aiProps={{
          brandExamples: ["Echo Dot", "Echo Show", "Echo Plus", "Echo Studio", "Echo Flex"],
          starterQuestions: [
            "Alexa stopped responding — how do I fix it?",
            "How do I set up Alexa routines?",
            "How do I connect Alexa to my music?",
            "Can Alexa control my smart lights?",
            "How do I update my Alexa device?",
          ],
        }}
      />
            <Footer />
    </div>
  );
}
