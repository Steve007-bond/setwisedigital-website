"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import TechBridgeLearningHub from "@/components/TechBridgeLearningHub";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { Home, ArrowRight, Lightbulb } from "lucide-react";

const WIZARD_CONFIG = {
  source: "smarthome-page",
  accentColor: "from-amber-500 to-orange-400",
  accentHex: "#f59e0b",
  step1Title: "What do you want to set up?",
  step1Options: [
    { label: "Smart bulbs", icon: "💡", popular: true },
    { label: "Smart plugs", icon: "🔌" },
    { label: "Security camera", icon: "📷", popular: true },
    { label: "Smart speaker", icon: "🔊" },
    { label: "Full home setup", icon: "🏠" },
    { label: "Wi-Fi devices", icon: "📶" },
  ],
  step2Title: "Which platform do you use?",
  brandOptions: [
    { label: "Amazon Alexa", icon: "🔵" },
    { label: "Google Home", icon: "🟢" },
    { label: "Apple HomeKit", icon: "🍎" },
    { label: "Samsung SmartThings", icon: "⚫" },
    { label: "Ring", icon: "🟡" },
    { label: "Not sure", icon: "❓" },
  ],
  step2Options: [
    { label: "Initial setup", icon: "🚀" },
    { label: "Fix connection", icon: "🔧" },
    { label: "Create routines", icon: "⏰" },
    { label: "Expert walkthrough", icon: "👤" },
  ],
  processingMessages: [
    "Scanning your setup options...",
    "Preparing your device guide...",
    "Almost ready, [name]...",
    "Your smart home guide is ready!",
  ],
};

function SmartHouseSVG() {
  const [litRooms, setLitRooms] = useState<number[]>([0, 2]);
  const toggleRoom = (i: number) => setLitRooms((p: number[]) => p.includes(i) ? p.filter((x: number) => x !== i) : [...p, i]);
  const rooms = [
    { label: "Living Room", x: 10, y: 10, w: 90, h: 90, color: "#f59e0b" },
    { label: "Bedroom", x: 110, y: 10, w: 80, h: 90, color: "#06b6d4" },
    { label: "Kitchen", x: 10, y: 110, w: 90, h: 80, color: "#16a34a" },
    { label: "Entry", x: 110, y: 110, w: 80, h: 80, color: "#8b5cf6" },
  ];
  return (
    <div className="relative w-72 h-64 mx-auto">
      <p className="text-center text-zinc-500 text-xs font-bold mb-3 uppercase tracking-widest">Tap a room to toggle lights</p>
      <svg viewBox="0 0 200 200" className="w-full h-full cursor-pointer">
        {/* House outline */}
        <rect x="5" y="5" width="190" height="190" rx="8" fill="none" stroke="#1e293b" strokeWidth="2" />
        {rooms.map((room, i) => {
          const lit = litRooms.includes(i);
          return (
            <g key={i} onClick={() => toggleRoom(i)} style={{ cursor: "pointer" }}>
              <motion.rect x={room.x} y={room.y} width={room.w} height={room.h} rx="4"
                animate={{ fill: lit ? room.color + "30" : "#0f172a" }} transition={{ duration: 0.3 }} />
              <rect x={room.x} y={room.y} width={room.w} height={room.h} rx="4" fill="none" stroke={lit ? room.color : "#1e293b"} strokeWidth="1.5" />
              {lit && (
                <motion.circle cx={room.x + room.w / 2} cy={room.y + 20} r="8" fill={room.color}
                  animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
              )}
              <text x={room.x + room.w / 2} y={room.y + room.h - 8} fill={lit ? room.color : "#475569"} fontSize="7" textAnchor="middle" fontWeight="bold">
                {room.label}
              </text>
              {lit && (
                <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  {[1, 2].map(j => (
                    <motion.circle key={j} cx={room.x + room.w / 2} cy={room.y + 20} r={j * 12} fill="none" stroke={room.color} strokeWidth="0.8"
                      animate={{ opacity: [0.4, 0], scale: [0.8, 1.5] }}
                      transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.3 }} />
                  ))}
                </motion.g>
              )}
            </g>
          );
        })}
        {/* Center dividers */}
        <line x1="100" y1="5" x2="100" y2="195" stroke="#1e293b" strokeWidth="2" />
        <line x1="5" y1="100" x2="195" y2="100" stroke="#1e293b" strokeWidth="2" />
        {/* Router */}
        <rect x="88" y="88" width="24" height="24" rx="4" fill="#2563eb" />
        {[1, 2].map(i => (
          <motion.circle key={i} cx="100" cy="100" r={i * 15} fill="none" stroke="#2563eb" strokeWidth="1"
            animate={{ opacity: [0.6, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
        ))}
      </svg>
    </div>
  );
}

const ISSUES = [
  { icon: "🔌", title: "Smart Plug Setup", desc: "Control any appliance remotely with voice or app." },
  { icon: "📶", title: "Wi-Fi Pairing", desc: "Connect any smart device to your home network." },
  { icon: "📱", title: "App Controls", desc: "Manage everything from one easy app on your phone." },
  { icon: "🗣️", title: "Voice Commands", desc: "Control your home with natural speech — no memorising." },
];

export default function SmartHomePage() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] text-white font-sans">
      <Navbar />
      <ScrollToTop />
      <section className="min-h-screen flex items-center pt-20 pb-16 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-amber-950/20 via-transparent to-orange-950/10" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center relative z-10">
          <div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-widest mb-8">
              <Home size={14} /> Smart Home Mastery
            </motion.div>
            <div className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
              {["Your Home,", "Smarter"].map((word, i) => (
                <motion.span key={i} className={`block ${i === 1 ? "bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent italic" : ""}`}
                  initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.2 + i * 0.1, type: "spring" }}>
                  {word}
                </motion.span>
              ))}
            </div>
            <motion.p className="text-xl text-zinc-400 font-medium mb-10 leading-relaxed max-w-lg"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}>
              Connect lights, plugs, cameras, and speakers — all controlled by your voice or phone. Simpler than you think.
            </motion.p>
            <motion.div className="flex flex-col sm:flex-row gap-4" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
              <motion.a href="#learn"
                className="px-8 py-5 font-black text-lg rounded-2xl text-white bg-gradient-to-r from-amber-500 to-orange-400 flex items-center justify-center gap-3"
                whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                animate={{ boxShadow: ["0 0 0 0 rgba(245,158,11,0)", "0 0 0 12px rgba(245,158,11,0)", "0 0 0 0 rgba(245,158,11,0)"] }}
                transition={{ boxShadow: { duration: 2, repeat: Infinity } }}>
                Begin Smart Home Course <ArrowRight size={20} />
              </motion.a>
              <Link href="/contact" className="px-8 py-5 border-2 border-zinc-600 hover:border-amber-500 text-white font-black text-lg rounded-2xl flex items-center justify-center transition-colors">
                Talk to Expert
              </Link>
            </motion.div>
          </div>
          <div className="flex items-center justify-center">
            <SmartHouseSVG />
          </div>
        </div>
      </section>

      <section className="py-24 bg-zinc-950/50 border-y border-zinc-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-16">
            <h2 className="text-4xl font-black tracking-tighter mb-4">Everything We Help With</h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISSUES.map((issue, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                whileHover={{ scale: 1.04, y: -8 }} className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 group hover:border-amber-500 transition-all cursor-pointer">
                <div className="text-4xl mb-6">{issue.icon}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-amber-400 transition-colors">{issue.title}</h3>
                <p className="text-zinc-500 font-medium text-sm leading-relaxed">{issue.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
      <TechBridgeLearningHub
        topic="Smart Home"
        accentColor="from-amber-400 to-orange-400"
        accentHex="#f59e0b"
        wizardConfig={WIZARD_CONFIG}
        aiProps={{
          brandExamples: ["Amazon Echo", "Google Nest", "Apple HomePod", "Ring", "Philips Hue"],
          starterQuestions: [
            "My Alexa isn't responding to commands",
            "How do I set up a smart home routine?",
            "My smart lights won't connect",
            "How do I link Alexa to my thermostat?",
            "My Google Nest isn't working properly",
          ],
        }}
      />
            <Footer />
    </div>
  );
}
