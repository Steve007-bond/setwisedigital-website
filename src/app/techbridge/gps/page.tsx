"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechBridgeLearningHub from "@/components/TechBridgeLearningHub";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { Navigation, ArrowRight } from "lucide-react";

const WIZARD_CONFIG = {
  source: "gps-page",
  accentColor: "from-green-600 to-emerald-400",
  accentHex: "#16a34a",
  step1Title: "What's going on with your GPS?",
  step1Options: [
    { label: "Maps outdated", icon: "🗺️", popular: true },
    { label: "Frozen screen", icon: "🧊" },
    { label: "Wrong directions", icon: "🔀", popular: true },
    { label: "No signal", icon: "📡" },
    { label: "Plan a route", icon: "📍" },
    { label: "Software error", icon: "⚠️" },
  ],
  step2Title: "Which GPS device do you have?",
  brandOptions: [
    { label: "Garmin", icon: "🟠" },
    { label: "TomTom", icon: "🔴" },
    { label: "Magellan", icon: "🔵" },
    { label: "In-car GPS", icon: "🚗" },
    { label: "Google Maps", icon: "📱" },
    { label: "Other", icon: "❓" },
  ],
  step2Options: [
    { label: "Update my maps", icon: "🔄" },
    { label: "Show me how it works", icon: "🔧" },
    { label: "Learn features", icon: "📚" },
    { label: "Book a live lesson", icon: "👤" },
  ],
  processingMessages: [
    "Checking your GPS model...",
    "Finding your update steps...",
    "Almost ready, [name]...",
    "Your GPS guide is ready!",
  ],
};

function GPSHeroSVG() {
  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className="relative w-72 h-72 mx-auto">
      <svg viewBox="0 0 240 260" className="w-full h-full">
        {/* Device body */}
        <rect x="60" y="20" width="120" height="180" rx="16" fill="#0d1117" stroke="#1e3a5f" strokeWidth="2.5" />
        <rect x="68" y="30" width="104" height="145" rx="8" fill="#0a1628" />
        {/* Road lines on screen */}
        <line x1="120" y1="35" x2="120" y2="170" stroke="#1e40af" strokeWidth="8" strokeLinecap="round" />
        <motion.line x1="120" y1="80" x2="120" y2="100" stroke="white" strokeWidth="2" strokeDasharray="8 8"
          animate={{ strokeDashoffset: [0, -32] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
        {/* Map pin */}
        <motion.g animate={{ y: [0, -5, 0] }} transition={{ duration: 2, repeat: Infinity }}>
          <circle cx="120" cy="95" r="10" fill="#16a34a" />
          <circle cx="120" cy="95" r="5" fill="white" />
          {[1, 2].map(i => (
            <motion.circle key={i} cx="120" cy="95" r={i * 14} fill="none" stroke="#16a34a" strokeWidth="1.5"
              animate={{ opacity: [0.8, 0], scale: [0.5, 1.5] }}
              transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.4 }} />
          ))}
        </motion.g>
        {/* Route line */}
        <motion.path d="M 90 150 Q 120 110 150 80" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeDasharray="200"
          animate={{ strokeDashoffset: [200, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
        {/* Mount */}
        <rect x="110" y="200" width="20" height="30" rx="4" fill="#1e293b" />
        <rect x="95" y="225" width="50" height="8" rx="4" fill="#1e293b" />
        {/* Buttons */}
        <circle cx="85" cy="125" r="6" fill="#1e3a5f" />
        <circle cx="155" cy="125" r="6" fill="#1e3a5f" />
        <rect x="95" y="178" width="50" height="6" rx="3" fill="#1e3a5f" />
      </svg>
    </motion.div>
  );
}

const ISSUES = [
  { icon: "🔄", title: "Update Maps", desc: "Understand how GPS maps are structured and how updates work." },
  { icon: "🧊", title: "Frozen Screen", desc: "Learn what causes GPS screen issues and how to address them." },
  { icon: "✅", title: "Wrong Directions", desc: "Understand how GPS routing works and why directions sometimes differ." },
  { icon: "📍", title: "Plan a Route", desc: "Multi-stop planning and travel time estimates." },
];

export default function GPSPage() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar />
      <ScrollToTop />
      {/* Road ambient */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <motion.div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: "repeating-linear-gradient(to bottom, transparent, transparent 40px, rgba(255,255,255,0.3) 40px, rgba(255,255,255,0.3) 48px)" }}
          animate={{ backgroundPositionY: ["0px", "48px"] }}
          transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
      </div>

      <section className="min-h-screen flex items-center pt-20 pb-16 relative z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20 text-green-400 text-xs font-black uppercase tracking-widest mb-8">
              <Navigation size={14} /> GPS & Navigation Mastery
            </motion.div>
            <div className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
              {["Update", "Your GPS", "in Minutes"].map((word, i) => (
                <motion.span key={i} className={`block ${i === 2 ? "bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent italic" : ""}`}
                  initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.2 + i * 0.1 }}>
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.p className="text-xl text-zinc-400 font-medium mb-10 leading-relaxed max-w-lg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Keep your maps current, master navigation features, and discover shortcuts — all in plain English.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <motion.a href="#learn"
                className="px-8 py-5 font-black text-lg rounded-2xl text-white bg-gradient-to-r from-green-600 to-emerald-500 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 0 0 rgba(22,163,74,0)", "0 0 0 12px rgba(22,163,74,0)", "0 0 0 0 rgba(22,163,74,0)"] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}>
                Learn GPS Updates <ArrowRight size={20} />
              </motion.a>
              <Link href="/contact" className="px-8 py-5 border-2 border-zinc-600 hover:border-green-500 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 transition-colors">
                Book a Live Lesson
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center justify-center"><GPSHeroSVG /></div>
        </div>
      </section>

      {/* Old vs New Maps */}
      <section className="py-24 bg-zinc-950/50 border-y border-zinc-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-black text-white mb-4">Outdated vs Updated Maps</h2>
            <p className="text-zinc-500 font-medium">See why keeping maps current matters</p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { label: "Your maps now", year: "2019", color: "#f59e0b", bg: "from-yellow-950/30", desc: "Missing new roads, wrong directions, outdated points of interest", tag: "Outdated" },
              { label: "After update", year: "2025", color: "#16a34a", bg: "from-green-950/30", desc: "All current roads, accurate directions, new restaurants and services", tag: "Updated" },
            ].map((panel, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: i === 0 ? -40 : 40 }} whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.2 }}
                className={`bg-gradient-to-br ${panel.bg} to-transparent border border-zinc-800 rounded-[2rem] p-8`}>
                <div className="flex items-center justify-between mb-6">
                  <span className="text-zinc-400 font-bold text-sm">{panel.label}</span>
                  <span className="px-3 py-1 rounded-full text-xs font-black" style={{ backgroundColor: panel.color + "20", color: panel.color }}>{panel.tag}</span>
                </div>
                <div className="h-32 bg-zinc-900/50 rounded-2xl mb-4 flex items-center justify-center relative overflow-hidden">
                  <svg viewBox="0 0 200 80" className="w-full h-full p-4">
                    {i === 0 ? (
                      <>
                        <path d="M10 40 L50 40 L70 25 L90 40 L190 40" stroke="#f59e0b" strokeWidth="2" fill="none" strokeDasharray="4 4" />
                        <text x="100" y="60" fill="#f59e0b" fontSize="8" textAnchor="middle">? Road missing</text>
                      </>
                    ) : (
                      <>
                        <motion.path d="M10 40 L50 40 L70 25 L90 40 L190 40" stroke="#16a34a" strokeWidth="2" fill="none"
                          strokeDasharray="300" initial={{ strokeDashoffset: 300 }} whileInView={{ strokeDashoffset: 0 }}
                          transition={{ duration: 1.5 }} />
                        <motion.path d="M70 25 L70 10 L130 10 L130 25" stroke="#22c55e" strokeWidth="1.5" fill="none"
                          strokeDasharray="100" initial={{ strokeDashoffset: 100 }} whileInView={{ strokeDashoffset: 0 }}
                          transition={{ duration: 1, delay: 1.5 }} />
                        <text x="100" y="65" fill="#16a34a" fontSize="8" textAnchor="middle">New road added</text>
                      </>
                    )}
                  </svg>
                </div>
                <p className="text-zinc-400 text-sm font-medium">{panel.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-4">What You Will Learn</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISSUES.map((issue, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ scale: 1.04, y: -8 }} whileTap={{ scale: 0.97 }}
                className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 cursor-pointer group hover:border-green-500 transition-all">
                <div className="text-4xl mb-6">{issue.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-green-400 transition-colors">{issue.title}</h3>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed">{issue.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TechBridgeLearningHub
        topic="GPS"
        accentColor="from-green-400 to-emerald-400"
        accentHex="#16a34a"
        wizardConfig={WIZARD_CONFIG}
        aiProps={{
          brandExamples: ["Garmin", "TomTom", "Magellan", "In-car GPS", "Google Maps"],
          starterQuestions: [
            "My GPS maps are outdated — how do I update them?",
            "My Garmin screen is frozen",
            "GPS is giving wrong directions",
            "How do I plan a route with multiple stops?",
            "My GPS has no signal",
          ],
        }}
      />
      <Footer />
    </div>
  );
}
