"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechBridgeLearningHub from "@/components/TechBridgeLearningHub";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { Camera, ArrowRight, Lightbulb } from "lucide-react";

const WIZARD_CONFIG = {
  source: "camera-page",
  accentColor: "from-purple-600 to-violet-400",
  accentHex: "#9333ea",
  step1Title: "What camera help do you need?",
  step1Options: [
    { label: "Update firmware", icon: "🔄", popular: true },
    { label: "Photos are blurry", icon: "📷", popular: true },
    { label: "Transfer photos", icon: "💾" },
    { label: "Camera won't start", icon: "⚡" },
    { label: "SD card error", icon: "💳" },
    { label: "Best settings", icon: "⚙️" },
  ],
  step2Title: "What camera brand do you have?",
  brandOptions: [
    { label: "Canon", icon: "🔴" },
    { label: "Nikon", icon: "⚫" },
    { label: "Sony", icon: "⬛" },
    { label: "Fujifilm", icon: "🟢" },
    { label: "Panasonic", icon: "🔵" },
    { label: "Other", icon: "❓" },
  ],
  step2Options: [
    { label: "Show me how it works", icon: "🔧" },
    { label: "Better photos", icon: "📸" },
    { label: "Learn settings", icon: "📚" },
    { label: "Expert help", icon: "👤" },
  ],
  processingMessages: [
    "Checking your camera model...",
    "Preparing your firmware learning guide...",
    "Almost ready, [name]...",
    "Your camera guide is ready!",
  ],
};

function CameraSVG() {
  return (
    <motion.div animate={{ y: [0, -10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}
      className="w-72 h-64 mx-auto">
      <svg viewBox="0 0 240 200" className="w-full h-full">
        {/* Camera body */}
        <rect x="20" y="50" width="200" height="130" rx="16" fill="#1e1b4b" stroke="#4c1d95" strokeWidth="2" />
        {/* Top bump */}
        <rect x="70" y="30" width="100" height="30" rx="8" fill="#1e1b4b" stroke="#4c1d95" strokeWidth="1.5" />
        {/* Lens outer */}
        <circle cx="110" cy="120" r="50" fill="#0f0a1e" stroke="#4c1d95" strokeWidth="3" />
        <circle cx="110" cy="120" r="38" fill="#0a0718" stroke="#7c3aed" strokeWidth="1.5" />
        <circle cx="110" cy="120" r="26" fill="#050310" stroke="#8b5cf6" strokeWidth="1.5" />
        {/* Lens reflection */}
        <circle cx="100" cy="110" r="8" fill="#4c1d95" opacity="0.6" />
        <circle cx="97" cy="107" r="3" fill="white" opacity="0.4" />
        {/* Aperture blades */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
          <motion.line key={i} x1="110" y1="120"
            x2={110 + Math.cos(angle * Math.PI / 180) * 20}
            y2={120 + Math.sin(angle * Math.PI / 180) * 20}
            stroke="#7c3aed" strokeWidth="1" opacity="0.5"
            animate={{ rotate: 360 }} transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            style={{ transformOrigin: "110px 120px" }} />
        ))}
        {/* Flash */}
        <rect x="185" y="60" width="25" height="18" rx="4" fill="#312e81" />
        <motion.rect x="185" y="60" width="25" height="18" rx="4" fill="white" opacity="0"
          animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 2 }} />
        {/* Viewfinder */}
        <rect x="155" y="58" width="25" height="16" rx="3" fill="#1e1b4b" stroke="#4c1d95" strokeWidth="1" />
        {/* Shutter button */}
        <circle cx="90" cy="38" r="8" fill="#7c3aed" />
        <motion.circle cx="90" cy="38" r="8" fill="#a78bfa"
          animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 2, repeat: Infinity }} />
        {/* Aperture ring */}
        {[1, 2, 3].map(i => (
          <motion.circle key={i} cx="110" cy="120" r={i * 16 + 26} fill="none" stroke="#7c3aed" strokeWidth="0.5" opacity="0.3"
            animate={{ opacity: [0.1, 0.4, 0.1] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.3 }} />
        ))}
      </svg>
    </motion.div>
  );
}

const ISSUES = [
  { icon: "🔄", title: "Firmware Updates", desc: "Update safely to fix bugs and unlock new features." },
  { icon: "📸", title: "Better Photos", desc: "Simple settings that transform every shot you take." },
  { icon: "💾", title: "Photo Transfer", desc: "Get photos onto your computer or phone easily." },
  { icon: "⚙️", title: "Camera Settings", desc: "Plain-English guide to every important setting." },
];

export default function CameraPage() {
  return (
    <div className="min-h-screen bg-[#0a0718] text-white font-sans">
      <Navbar />
      <ScrollToTop />
      <section className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-950/30 via-transparent to-violet-950/20" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-purple-500/10 border border-purple-500/20 text-purple-400 text-xs font-black uppercase tracking-widest mb-8">
              <Camera size={14} /> Camera & Photography Mastery
            </motion.div>
            <div className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
              {["Capture", "Every", "Moment."].map((word, i) => (
                <motion.span key={i} className={`block ${i === 2 ? "bg-gradient-to-r from-purple-400 to-violet-300 bg-clip-text text-transparent italic" : ""}`}
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.08, type: "spring" }}>
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.p className="text-xl text-zinc-400 font-medium mb-10 leading-relaxed max-w-lg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Firmware updates, sharp photo tips, and settings explained — all in plain English for any camera brand.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <motion.a href="#learn"
                className="px-8 py-5 font-black text-lg rounded-2xl text-white bg-gradient-to-r from-purple-600 to-violet-500 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 0 0 rgba(147,51,234,0)", "0 0 0 12px rgba(147,51,234,0)", "0 0 0 0 rgba(147,51,234,0)"] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}>
                Start Camera Masterclass <ArrowRight size={20} />
              </motion.a>
              <Link href="/contact" className="px-8 py-5 border-2 border-zinc-600 hover:border-purple-500 text-white font-black text-lg rounded-2xl flex items-center justify-center transition-colors">
                Book a Live Lesson
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center justify-center"><CameraSVG /></div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950/50 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-4">Camera Lessons That Actually Stick</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISSUES.map((issue, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ scale: 1.04, y: -8 }} className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 group hover:border-purple-500 transition-all cursor-pointer">
                <div className="text-4xl mb-6">{issue.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-purple-400 transition-colors">{issue.title}</h3>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed">{issue.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <TechBridgeLearningHub
        topic="Camera"
        accentColor="from-purple-400 to-pink-400"
        accentHex="#9333ea"
        wizardConfig={WIZARD_CONFIG}
        aiProps={{
          brandExamples: ["Sony", "Canon", "Nikon", "Fujifilm", "Panasonic"],
          starterQuestions: [
            "How do I update my camera firmware?",
            "My photos are blurry — what's wrong?",
            "How do I transfer photos to my phone?",
            "My camera won't turn on",
            "How do I adjust camera settings for better photos?",
          ],
        }}
      />
            <Footer />
    </div>
  );
}
