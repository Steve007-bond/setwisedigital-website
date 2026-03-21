"use client";

import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";
import {
  ArrowRight, Zap, Shield, Globe, Printer, Navigation,
  Home as HomeIcon, Camera, CheckCircle2, BookOpen,
  Mail, Smartphone, ChevronRight, UserCheck, Award,
  Sparkles, Star, TrendingUp, Clock, Users
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";
import { useState, useRef, useEffect } from "react";

/* ─── Animated counter hook ─────────────────────────────────────────────── */
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * end));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

/* ─── Stat card with animated counter ───────────────────────────────────── */
function StatCard({ value, suffix, label, source }: { value: number; suffix: string; label: string; source: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-80px" });
  const count = useCounter(value, 1800, isInView);
  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }} transition={{ duration: 0.6 }}
      className="stat-glow gradient-border group p-8 text-center cursor-default"
    >
      <div className="text-4xl md:text-5xl font-black tracking-tighter text-blue-600 mb-2 tabular-nums">
        {count}{suffix}
      </div>
      <div className="font-bold text-zinc-800 text-sm leading-snug mb-1">{label}</div>
      <div className="text-xs text-zinc-400 font-medium">{source}</div>
    </motion.div>
  );
}

/* ─── Marquee ticker ─────────────────────────────────────────────────────── */
const TICKER_ITEMS = [
  "🖨️ Printer Setup", "🗺️ GPS Updates", "🏠 Smart Home", "📷 Camera Tips",
  "🔊 Alexa Mastery", "🔒 Online Safety", "📱 Phone Printing", "🛰️ Garmin Express",
  "☁️ Cloud Storage", "📡 Wi-Fi Printing", "🔋 GPS Battery", "🎙️ Voice Assistants",
];

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];
  return (
    <div className="overflow-hidden bg-blue-600 py-3 relative">
      <div className="flex gap-12 animate-marquee whitespace-nowrap">
        {doubled.map((item, i) => (
          <span key={i} className="text-white font-black text-sm uppercase tracking-widest shrink-0">
            {item}
            <span className="ml-12 text-blue-300">•</span>
          </span>
        ))}
      </div>
    </div>
  );
}

/* ─── Page ───────────────────────────────────────────────────────────────── */
export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [showTopics, setShowTopics] = useState(false);
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start start", "end start"] });
  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  /* Flip-card text cycling */
  useEffect(() => {
    const line1 = ["in plain English.", "at your own pace.", "no jargon.", "no pressure.", "just learning."];
    const line2 = ["Printer Setup", "GPS Updates", "Smart Home Setup", "Security Installation", "Camera Basics"];
    const colors = ["#60a5fa", "#a78bfa", "#34d399", "#fb923c"];
    let idx = 0;
    const interval = setInterval(() => {
      idx = (idx + 1) % line1.length;
      const col = colors[idx % colors.length];
      const f1 = document.getElementById("flip1");
      const f2 = document.getElementById("flip2");
      if (f1) { f1.style.transform = "rotateX(90deg)"; f1.style.opacity = "0"; setTimeout(() => { f1.textContent = line1[idx]; f1.style.color = col; f1.style.transform = "rotateX(0)"; f1.style.opacity = "1"; }, 350); }
      if (f2) { f2.style.transform = "rotateX(90deg)"; f2.style.opacity = "0"; setTimeout(() => { f2.textContent = line2[idx]; f2.style.color = col; f2.style.transform = "rotateX(0)"; f2.style.opacity = "1"; }, 350); }
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  /* Close topics popup on scroll */
  useEffect(() => {
    const handleScroll = () => { if (showTopics) setShowTopics(false); };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [showTopics]);

  const stagger: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } },
  };
  const item: Variants = {
    hidden: { opacity: 0, y: 28 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#fafafa] text-zinc-900 font-sans selection:bg-blue-100">
      <Navbar />
      <ScrollToTop />

      {/* ── HERO ────────────────────────────────────────────────────────── */}
      <header className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden text-white bg-zinc-950">
        {/* Animated aurora background — warm vibrant gradient */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          <motion.div className="absolute w-[150%] h-[700px] -left-[25%] top-[0%] opacity-30"
            style={{ background: "linear-gradient(135deg, rgba(99,102,241,0.4) 0%, rgba(236,72,153,0.3) 20%, rgba(251,146,60,0.25) 40%, rgba(34,211,238,0.3) 60%, rgba(139,92,246,0.35) 80%, rgba(59,130,246,0.3) 100%)", filter: "blur(80px)", borderRadius: "50%" }}
            animate={{ x: [0, 100, -50, 70, 0], y: [0, -40, 25, -20, 0], scale: [1, 1.08, 0.96, 1.05, 1] }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }} />
          <motion.div className="absolute w-[120%] h-[500px] left-[5%] top-[35%] opacity-20"
            style={{ background: "linear-gradient(225deg, rgba(251,146,60,0.4) 0%, rgba(236,72,153,0.35) 30%, rgba(139,92,246,0.3) 60%, rgba(34,211,238,0.25) 100%)", filter: "blur(100px)", borderRadius: "40%" }}
            animate={{ x: [0, -70, 40, -60, 0], y: [0, 30, -15, 20, 0] }}
            transition={{ duration: 28, repeat: Infinity, ease: "easeInOut", delay: 2 }} />
          <motion.div className="absolute w-[80%] h-[300px] left-[40%] top-[60%] opacity-15"
            style={{ background: "linear-gradient(45deg, rgba(52,211,153,0.35) 0%, rgba(59,130,246,0.3) 50%, rgba(168,85,247,0.25) 100%)", filter: "blur(90px)", borderRadius: "60%" }}
            animate={{ x: [0, 50, -30, 40, 0], y: [0, -20, 15, -25, 0] }}
            transition={{ duration: 26, repeat: Infinity, ease: "easeInOut", delay: 5 }} />
        </div>

        {/* Floating device symbols background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {[
            { icon: "printer", x: "8%", y: "12%", size: 44, delay: 0, dur: 18, color: "rgba(59,130,246,0.12)" },
            { icon: "gps", x: "85%", y: "8%", size: 38, delay: 2, dur: 22, color: "rgba(16,185,129,0.10)" },
            { icon: "home", x: "72%", y: "65%", size: 50, delay: 1, dur: 20, color: "rgba(139,92,246,0.10)" },
            { icon: "camera", x: "15%", y: "70%", size: 36, delay: 3, dur: 16, color: "rgba(245,158,11,0.10)" },
            { icon: "shield", x: "90%", y: "40%", size: 40, delay: 0.5, dur: 24, color: "rgba(244,63,94,0.10)" },
            { icon: "wifi", x: "5%", y: "42%", size: 32, delay: 4, dur: 19, color: "rgba(34,211,238,0.10)" },
            { icon: "phone", x: "55%", y: "85%", size: 30, delay: 1.5, dur: 21, color: "rgba(168,85,247,0.08)" },
            { icon: "monitor", x: "40%", y: "5%", size: 42, delay: 2.5, dur: 17, color: "rgba(59,130,246,0.08)" },
            { icon: "printer", x: "65%", y: "20%", size: 28, delay: 5, dur: 25, color: "rgba(16,185,129,0.07)" },
            { icon: "gps", x: "25%", y: "88%", size: 34, delay: 3.5, dur: 23, color: "rgba(245,158,11,0.08)" },
            { icon: "home", x: "48%", y: "50%", size: 26, delay: 6, dur: 20, color: "rgba(139,92,246,0.06)" },
            { icon: "shield", x: "30%", y: "30%", size: 30, delay: 4.5, dur: 18, color: "rgba(244,63,94,0.07)" },
          ].map((d, i) => (
            <motion.div key={i}
              className="absolute"
              style={{ left: d.x, top: d.y }}
              animate={{
                y: [0, -20, 8, -15, 0],
                x: [0, 12, -8, 10, 0],
                rotate: [0, 10, -5, 8, 0],
                scale: [1, 1.1, 0.95, 1.05, 1],
              }}
              transition={{ duration: d.dur, delay: d.delay, repeat: Infinity, ease: "easeInOut" }}
            >
              <div style={{ width: d.size, height: d.size, color: d.color }} className="flex items-center justify-center">
                {d.icon === "printer" && <Printer size={d.size * 0.7} />}
                {d.icon === "gps" && <Navigation size={d.size * 0.7} />}
                {d.icon === "home" && <HomeIcon size={d.size * 0.7} />}
                {d.icon === "camera" && <Camera size={d.size * 0.7} />}
                {d.icon === "shield" && <Shield size={d.size * 0.7} />}
                {d.icon === "wifi" && <Globe size={d.size * 0.7} />}
                {d.icon === "phone" && <Smartphone size={d.size * 0.7} />}
                {d.icon === "monitor" && <TrendingUp size={d.size * 0.7} />}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#fafafa] to-transparent z-10" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 lg:pt-0">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-12">

            {/* LEFT — Text content */}
            <motion.div variants={stagger} initial="hidden" animate="visible"
              className="flex-1 text-center lg:text-left max-w-2xl">

              {/* Eyebrow pill — PRESERVED */}
              <motion.div variants={item}
                className="inline-flex items-center gap-2.5 px-6 py-2.5 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-xs font-black uppercase tracking-[0.25em] mb-8 shadow-xl">
                <Sparkles size={13} className="text-yellow-400 fill-yellow-400" />
                <span className="text-blue-200">Experience Technology Differently</span>
              </motion.div>

              {/* Headline — PRESERVED */}
              <motion.h1 variants={item}
                className="font-black tracking-tighter leading-[0.88] mb-6"
                style={{ fontSize: "clamp(3rem, 8vw, 7rem)" }}>
                Technology<br />
                <em className="not-italic bg-gradient-to-r from-blue-400 via-indigo-300 to-blue-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">
                  Simplified.
                </em>
              </motion.h1>

              {/* Flip-card cycling subtext */}
              <motion.div variants={item} className="mb-4">
                <p className="text-xl md:text-2xl leading-relaxed font-medium text-white/80">
                  We teach everyday technology{" "}
                  <span className="inline-block" style={{ perspective: "300px" }}>
                    <span id="flip1" className="inline-block font-black text-blue-400 transition-all duration-500" style={{ transformOrigin: "center bottom" }}>
                      in plain English.
                    </span>
                  </span>
                </p>
              </motion.div>
              <motion.div variants={item} className="mb-8">
                <p className="text-lg md:text-xl leading-relaxed font-medium text-white/60">
                  What you can learn by yourself:{" "}
                  <span className="inline-block" style={{ perspective: "300px" }}>
                    <span id="flip2" className="inline-block font-black text-blue-400 transition-all duration-500" style={{ transformOrigin: "center bottom" }}>
                      Printer Setup
                    </span>
                  </span>
                </p>
              </motion.div>

              {/* CTAs */}
              <motion.div variants={item} className="flex flex-col sm:flex-row items-center lg:items-start justify-center lg:justify-start gap-5 mb-8 relative">
                <div className="relative">
                  <button
                    onClick={() => setShowTopics(!showTopics)}
                    className="shine-effect group w-full sm:w-auto px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl
                      hover:bg-blue-500 hover:shadow-[0_20px_60px_rgba(37,99,235,0.5)] hover:-translate-y-1
                      transition-all duration-300 flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30">
                    Start Learning Now
                    <ArrowRight size={22} className={`transition-transform duration-300 ${showTopics ? "rotate-90" : "group-hover:translate-x-1.5"}`} />
                  </button>

                  {/* Animated 6 topic options popup */}
                  {showTopics && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      className="absolute top-full left-1/2 -translate-x-1/2 mt-4 w-[380px] max-w-[90vw] bg-white/10 backdrop-blur-xl border border-white/20 rounded-3xl p-4 shadow-2xl z-50"
                    >
                      <p className="text-center text-white/50 text-xs font-bold uppercase tracking-widest mb-3">Choose a topic</p>
                      <div className="grid grid-cols-2 gap-2">
                        {[
                          { label: "Printer Setup", href: "/techbridge/printers", icon: <Printer size={20} />, color: "from-blue-500 to-blue-700" },
                          { label: "GPS Updates", href: "/techbridge/gps", icon: <Navigation size={20} />, color: "from-emerald-500 to-emerald-700" },
                          { label: "Smart Home", href: "/techbridge/smart-home", icon: <HomeIcon size={20} />, color: "from-violet-500 to-violet-700" },
                          { label: "Camera Basics", href: "/techbridge/camera", icon: <Camera size={20} />, color: "from-amber-500 to-amber-700" },
                          { label: "Alexa & Voice", href: "/techbridge/alexa", icon: <Smartphone size={20} />, color: "from-cyan-500 to-cyan-700" },
                          { label: "Security Basics", href: "/techbridge/security", icon: <Shield size={20} />, color: "from-rose-500 to-rose-700" },
                        ].map((topic, i) => (
                          <motion.div key={i}
                            initial={{ opacity: 0, y: 12 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.06, type: "spring", stiffness: 300 }}
                          >
                            <Link href={topic.href}
                              className={`flex items-center gap-3 px-4 py-3.5 rounded-xl bg-gradient-to-r ${topic.color} text-white font-bold text-sm hover:scale-[1.04] active:scale-95 transition-all shadow-lg min-h-[48px]`}>
                              {topic.icon}
                              {topic.label}
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                      <button onClick={() => setShowTopics(false)}
                        className="w-full mt-3 py-2 text-white/40 text-xs font-bold hover:text-white/60 transition-colors">
                        Close
                      </button>
                    </motion.div>
                  )}
                </div>

                <Link href="/pricing"
                  className="group flex items-center gap-3 text-white/80 hover:text-white font-black text-lg transition-all">
                  <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center
                    group-hover:bg-white/20 transition-colors">
                    <Zap size={20} />
                  </div>
                  View Pricing
                </Link>
              </motion.div>

              {/* Hero 3-pillars */}
              <motion.div variants={item}
                className="grid grid-cols-3 gap-3 max-w-md lg:max-w-lg mx-auto lg:mx-0">
                {[
                  { icon: <BookOpen size={16} />, label: "Plain Language" },
                  { icon: <Zap size={16} />, label: "Quick Lessons" },
                  { icon: <Globe size={16} />, label: "Everyday Devices" },
                ].map((p, i) => (
                  <div key={i}
                    className="flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl
                      bg-white/10 backdrop-blur-md border border-white/10 text-xs font-bold text-white/90">
                    <span className="text-blue-300">{p.icon}</span>
                    {p.label}
                  </div>
                ))}
              </motion.div>
            </motion.div>

            {/* RIGHT — 3D Character — LARGE & COLORFUL with anticlockwise rotation */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="hidden lg:flex items-center justify-center w-[420px] xl:w-[500px] shrink-0"
            >
              <div style={{ animation: "spinAntiClock 35s linear infinite", transformStyle: "preserve-3d", perspective: "900px" }}>
                <svg viewBox="0 0 380 420" width="100%" height="auto" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Floor shadow */}
                  <ellipse cx="190" cy="410" rx="150" ry="6" fill="rgba(59,130,246,.06)"/>

                  {/* DESK */}
                  <rect x="18" y="235" width="160" height="12" rx="4" fill="#5c4433"/>
                  <rect x="18" y="235" width="160" height="4" rx="2" fill="#6b5040"/>
                  <rect x="24" y="247" width="7" height="168" rx="2.5" fill="#5c4433"/>
                  <rect x="165" y="247" width="7" height="168" rx="2.5" fill="#5c4433"/>
                  <rect x="24" y="407" width="152" height="6" rx="3" fill="#4a3828"/>
                  <rect x="55" y="335" width="85" height="5" rx="2" fill="#4a3828" opacity=".4"/>

                  {/* MONITOR */}
                  <g>
                    <rect x="30" y="108" width="140" height="108" rx="9" fill="#1a1a2e" stroke="#2a2a45" strokeWidth="1.2"/>
                    <rect x="36" y="114" width="128" height="94" rx="5" fill="#0b0f1a"/>
                    <rect x="42" y="122" width="52" height="5" rx="2.5" fill="#3b82f6" opacity=".6">
                      <animate attributeName="opacity" values=".6;.35;.6" dur="2.5s" repeatCount="indefinite"/>
                    </rect>
                    <rect x="42" y="131" width="76" height="4" rx="2" fill="#6366f1" opacity=".38"/>
                    <rect x="42" y="139" width="40" height="4" rx="2" fill="#22d3ee" opacity=".3"/>
                    <rect x="42" y="147" width="62" height="3" rx="1.5" fill="#818cf8" opacity=".22"/>
                    <rect x="42" y="154" width="46" height="3" rx="1.5" fill="#34d399" opacity=".2"/>
                    <rect x="42" y="161" width="56" height="3" rx="1.5" fill="#f472b6" opacity=".16"/>
                    <rect x="42" y="168" width="35" height="3" rx="1.5" fill="#60a5fa" opacity=".14"/>
                    <rect x="42" y="175" width="50" height="3" rx="1.5" fill="#a78bfa" opacity=".12"/>
                    <rect x="115" y="122" width="38" height="24" rx="4" fill="#12203a" opacity=".6"/>
                    <rect x="119" y="126" width="28" height="5" rx="2" fill="#3b82f6" opacity=".25"/>
                    <rect x="119" y="134" width="20" height="4" rx="2" fill="#8b5cf6" opacity=".15"/>
                    <line x1="148" y1="188" x2="151" y2="188" stroke="#22d3ee" strokeWidth="3" strokeLinecap="round">
                      <animate attributeName="opacity" values="1;0;1" dur="1.1s" repeatCount="indefinite"/>
                    </line>
                    <rect x="36" y="114" width="128" height="2" rx="1" fill="rgba(80,140,255,.06)">
                      <animate attributeName="opacity" values=".06;.14;.06" dur="3s" repeatCount="indefinite"/>
                    </rect>
                    <path d="M80 216 L80 228 L118 228 L118 216" stroke="#1a1a2e" strokeWidth="5" fill="none"/>
                    <rect x="62" y="228" width="75" height="5" rx="2.5" fill="#1a1a2e"/>
                  </g>

                  {/* KEYBOARD */}
                  <rect x="30" y="216" width="138" height="17" rx="4" fill="#1a1a2e" stroke="#2a2a45" strokeWidth=".8"/>
                  <g opacity=".6">
                    <rect x="36" y="219" width="9" height="5" rx="1.5" fill="#252540"/>
                    <rect x="48" y="219" width="9" height="5" rx="1.5" fill="#252540"/>
                    <rect x="60" y="219" width="9" height="5" rx="1.5" fill="#252540"/>
                    <rect x="72" y="219" width="9" height="5" rx="1.5" fill="#252540"/>
                    <rect x="84" y="219" width="18" height="5" rx="1.5" fill="#252540"/>
                    <rect x="105" y="219" width="9" height="5" rx="1.5" fill="#252540"/>
                    <rect x="117" y="219" width="9" height="5" rx="1.5" fill="#252540"/>
                    <rect x="129" y="219" width="9" height="5" rx="1.5" fill="#252540"/>
                    <rect x="141" y="219" width="20" height="5" rx="1.5" fill="#252540"/>
                    <rect x="36" y="226" width="30" height="4" rx="1.5" fill="#252540" opacity=".6"/>
                    <rect x="70" y="226" width="9" height="4" rx="1.5" fill="#252540" opacity=".6"/>
                    <rect x="83" y="226" width="9" height="4" rx="1.5" fill="#252540" opacity=".6"/>
                  </g>

                  {/* COFFEE MUG */}
                  <ellipse cx="24" cy="175" rx="8" ry="11" fill="#8b6914"/>
                  <ellipse cx="24" cy="171" rx="6.5" ry="4.5" fill="#a07818"/>
                  <path d="M21 166 C20 158, 19 153, 21 149" stroke="rgba(255,255,255,.1)" strokeWidth="1.5" strokeLinecap="round" fill="none">
                    <animate attributeName="d" values="M21 166 C20 158, 19 153, 21 149;M21 166 C23 158, 21 151, 19 145;M21 166 C20 158, 19 153, 21 149" dur="3s" repeatCount="indefinite"/>
                  </path>
                  <path d="M26 167 C27 160, 28 155, 26 151" stroke="rgba(255,255,255,.07)" strokeWidth="1" strokeLinecap="round" fill="none">
                    <animate attributeName="d" values="M26 167 C27 160, 28 155, 26 151;M26 167 C25 159, 27 153, 29 148;M26 167 C27 160, 28 155, 26 151" dur="3.5s" repeatCount="indefinite"/>
                  </path>

                  {/* CHAIR */}
                  <path d="M255 315 L255 405 C255 410, 252 413, 248 413 L240 413" stroke="#4f46e5" strokeWidth="8" strokeLinecap="round" fill="none"/>
                  <path d="M335 315 L335 405 C335 410, 338 413, 342 413 L350 413" stroke="#4f46e5" strokeWidth="8" strokeLinecap="round" fill="none"/>
                  <rect x="245" y="278" width="100" height="42" rx="8" fill="#4f46e5"/>
                  <rect x="249" y="282" width="92" height="34" rx="6" fill="#6366f1"/>
                  <path d="M249 300 L341 300" stroke="#4f46e5" strokeWidth="1"/>
                  <rect x="273" y="266" width="44" height="15" rx="5" fill="#6366f1" stroke="#4f46e5" strokeWidth=".8"/>
                  <circle cx="233" cy="416" r="6" fill="#4338ca"/>
                  <circle cx="357" cy="416" r="6" fill="#4338ca"/>
                  <rect x="260" y="413" width="70" height="6" rx="3" fill="#4338ca"/>

                  {/* CHARACTER BODY (breathing) */}
                  <g style={{ animation: "charBreathe 5s ease-in-out infinite", transformOrigin: "295px 275px" }}>
                    <path d="M265 190 C265 168, 325 168, 325 190 L330 270 C330 288, 320 300, 308 303 L282 303 C270 300, 260 288, 260 270 Z" fill="#0d9488"/>
                    <path d="M270 195 C270 178, 320 178, 320 195 L322 245 C322 250, 318 254, 312 254 L278 254 C272 254, 268 250, 268 245 Z" fill="#14b8a6"/>
                    <path d="M278 254 L274 282 C273 290, 276 298, 282 300 L308 300 C314 298, 317 290, 316 282 L312 254 Z" fill="#0d9488"/>
                    <line x1="295" y1="195" x2="295" y2="300" stroke="#2f5680" strokeWidth="1" opacity=".2"/>
                    <circle cx="285" cy="288" r="3" fill="#14b8a6" opacity=".3"/>
                    <circle cx="295" cy="288" r="3" fill="#14b8a6" opacity=".3"/>
                    <circle cx="305" cy="288" r="3" fill="#14b8a6" opacity=".3"/>
                    {/* Sleeves */}
                    <path d="M260 198 C254 198, 248 206, 248 214 L248 234 C248 242, 254 248, 262 248" fill="#0d9488"/>
                    <path d="M330 198 C336 198, 342 206, 342 214 L342 234 C342 242, 336 248, 328 248" fill="#0d9488"/>
                  </g>

                  {/* LEFT ARM + typing hand */}
                  <path d="M262 210 L238 250 C234 258, 222 264, 212 260 L190 248" stroke="#e8c4a0" strokeWidth="9" strokeLinecap="round" fill="none"/>
                  <path d="M190 248 L172 278 C168 290, 166 302, 170 312" stroke="#e8c4a0" strokeWidth="7" strokeLinecap="round" fill="none"/>
                  <g style={{ animation: "typeL .55s ease-in-out infinite" }}>
                    <circle cx="158" cy="222" r="5" fill="#e8c4a0"/>
                    <circle cx="152" cy="221" r="4" fill="#dcb48e"/>
                    <circle cx="164" cy="223" r="3.5" fill="#dcb48e"/>
                  </g>

                  {/* RIGHT ARM + typing hand */}
                  <path d="M328 210 L352 245 C356 252, 362 258, 368 256" stroke="#e8c4a0" strokeWidth="9" strokeLinecap="round" fill="none"/>
                  <path d="M368 256 L378 286 C380 296, 376 304, 372 308" stroke="#e8c4a0" strokeWidth="7" strokeLinecap="round" fill="none"/>
                  <g style={{ animation: "typeR .65s ease-in-out infinite .12s" }}>
                    <circle cx="165" cy="222" r="5" fill="#e8c4a0" transform="translate(200,0) scale(-1,1) translate(-200,0)"/>
                    <circle cx="160" cy="221" r="4" fill="#dcb48e" transform="translate(200,0) scale(-1,1) translate(-200,0)"/>
                  </g>

                  {/* LEGS */}
                  <path d="M270 303 L268 340 C267 350, 270 358, 278 360 L308 360 C316 358, 319 350, 318 340 L316 303" fill="#1e3a5f"/>
                  <path d="M270 354 L254 388 C252 394, 248 398, 242 400 L236 402" stroke="#2d5280" strokeWidth="10" strokeLinecap="round" fill="none"/>
                  <path d="M316 354 L332 388 C334 394, 338 398, 344 400 L350 402" stroke="#2d5280" strokeWidth="10" strokeLinecap="round" fill="none"/>
                  <rect x="226" y="398" width="20" height="10" rx="5" fill="#1e293b"/>
                  <rect x="342" y="398" width="20" height="10" rx="5" fill="#1e293b"/>

                  {/* HEAD */}
                  <g>
                    <ellipse cx="295" cy="145" rx="38" ry="44" fill="#e8c4a0"/>
                    <ellipse cx="295" cy="149" rx="34" ry="38" fill="#f0d4b4"/>
                    {/* Hair */}
                    <path d="M261 124 C259 106, 266 88, 282 80 C290 77, 300 77, 308 80 C324 88, 331 106, 329 124" fill="#d4d4dc"/>
                    <path d="M261 124 L261 135 L329 135 L329 124" fill="#c8c8d2"/>
                    <path d="M257 124 C253 114, 257 98, 268 90" stroke="#c0c0cc" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    <path d="M333 124 C337 114, 333 98, 322 90" stroke="#c0c0cc" strokeWidth="4" fill="none" strokeLinecap="round"/>
                    {/* Ears */}
                    <ellipse cx="268" cy="130" rx="5" ry="7" fill="#f0d4b4"/>
                    <ellipse cx="322" cy="130" rx="5" ry="7" fill="#f0d4b4"/>
                    {/* Glasses */}
                    <rect x="273" y="140" width="44" height="20" rx="10" fill="none" stroke="#b8860b" strokeWidth="2.2"/>
                    <circle cx="287" cy="150" r="10" fill="none" stroke="#b8860b" strokeWidth="2.2"/>
                    <circle cx="303" cy="150" r="10" fill="none" stroke="#b8860b" strokeWidth="2.2"/>
                    <line x1="313" y1="147" x2="330" y2="141" stroke="#b8860b" strokeWidth="2.2" strokeLinecap="round"/>
                    <line x1="273" y1="147" x2="258" y2="141" stroke="#b8860b" strokeWidth="2.2" strokeLinecap="round"/>
                    {/* Pupils with reflections */}
                    <circle cx="287" cy="150" r="4" fill="#1a2030">
                      <animate attributeName="r" values="4;3.5;4" dur="4s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="303" cy="150" r="4" fill="#1a2030">
                      <animate attributeName="r" values="4;3.5;4" dur="4s" repeatCount="indefinite"/>
                    </circle>
                    <circle cx="285" cy="148" r="1.5" fill="rgba(255,255,255,.35)"/>
                    <circle cx="301" cy="148" r="1.5" fill="rgba(255,255,255,.35)"/>
                    {/* Eyebrows */}
                    <path d="M279 137 Q284 134, 291 136" stroke="#b8860b" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    <path d="M311 137 Q306 134, 299 136" stroke="#b8860b" strokeWidth="1.5" fill="none" strokeLinecap="round"/>
                    {/* Nose */}
                    <path d="M292 164 C292 162, 294 160, 295 160 C296 160, 298 162, 298 164 L297 167 C296 168, 294 168, 293 167 Z" fill="#dcb48e"/>
                    {/* Smile */}
                    <path d="M287 174 Q295 183, 303 174" stroke="#c06848" strokeWidth="2.5" strokeLinecap="round" fill="none"/>
                    <path d="M289 176 Q295 180, 301 176" fill="#b85a42" opacity=".2"/>
                    {/* Cheeks */}
                    <ellipse cx="278" cy="165" rx="6" ry="4.5" fill="#e08870" opacity=".25"/>
                    <ellipse cx="312" cy="165" rx="6" ry="4.5" fill="#e08870" opacity=".25"/>
                  </g>
                </svg>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-20">
          <span className="text-white/40 text-xs font-bold uppercase tracking-widest">Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent" />
        </motion.div>

        <style>{`
          @keyframes spinAntiClock { from { transform: rotateY(0deg); } to { transform: rotateY(-360deg); } }
          @keyframes charBreathe { 0%,100% { transform: translateY(0) scale(1); } 50% { transform: translateY(-1.5px) scale(1.006); } }
          @keyframes typeL { 0%,55%,100% { transform: translateY(0); } 25% { transform: translateY(-2.5px); } }
          @keyframes typeR { 0%,65%,100% { transform: translateY(0); } 30% { transform: translateY(-2.5px); } }
          @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        `}</style>
      </header>

      {/* ── TICKER ─────────────────────────────────────────────────────── */}
      <Ticker />

      {/* ── WHY CHOOSE US ─────────────────────────────────────────────── */}
      <section className="py-28 bg-white relative overflow-hidden">
        {/* Subtle background grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{ backgroundImage: "linear-gradient(#3b82f6 1px, transparent 1px), linear-gradient(90deg, #3b82f6 1px, transparent 1px)", backgroundSize: "60px 60px" }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">

            {/* Left copy */}
            <motion.div
              initial={{ opacity: 0, x: -40 }} whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-blue-700 font-black text-xs uppercase tracking-[0.2em] mb-8">
                Our Mission
              </div>
              <h2 className="font-black tracking-tighter leading-[1.05] mb-8"
                style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>
                Why Choose<br />
                <span className="text-shimmer">Setwise Digital</span>
              </h2>
              <p className="text-lg text-zinc-500 mb-12 leading-relaxed font-medium">
                Many people search daily for <em className="text-zinc-900 font-bold not-italic">"how do I set up my printer"</em> or{" "}
                <em className="text-zinc-900 font-bold not-italic">"how do I use Alexa."</em> The answers are buried in jargon.{" "}
                <strong className="text-zinc-900">We make it simple.</strong>
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { title: "Clarity", text: "Plain English step-by-step guides", icon: "✦" },
                  { title: "Confidence", text: "We teach the 'why', not just 'how'", icon: "✦" },
                  { title: "Community", text: "Built for real users, by real people", icon: "✦" },
                  { title: "Coaching", text: "Live video lessons with real educators", icon: "✦" },
                ].map((p, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="gradient-border group p-6 hover:-translate-y-1 transition-all duration-300 cursor-default">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="text-blue-500 font-black text-lg">{p.icon}</span>
                      <h4 className="font-black text-base text-zinc-900">{p.title}</h4>
                    </div>
                    <p className="text-zinc-500 font-medium text-sm leading-snug">{p.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.88 }} whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="lg:w-1/2 relative">
              <div className="relative rounded-[3rem] overflow-hidden shadow-2xl shadow-blue-900/20 h-[560px] bg-zinc-950 flex items-center justify-center">
                <div className="absolute inset-0 mesh-gradient opacity-60" />
                {/* Orbital rings */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                  {[280, 380, 480].map((size, i) => (
                    <motion.div key={i}
                      animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
                      transition={{ duration: 20 + i * 8, repeat: Infinity, ease: "linear" }}
                      style={{ width: size, height: size }}
                      className="absolute rounded-full border border-blue-500/20" />
                  ))}
                </div>

                {/* Floating device icons */}
                {[
                  { icon: <Printer size={26} />, pos: "top-16 left-16", delay: 0 },
                  { icon: <Navigation size={26} />, pos: "top-16 right-16", delay: 0.4 },
                  { icon: <HomeIcon size={26} />, pos: "bottom-24 left-16", delay: 0.8 },
                  { icon: <Camera size={26} />, pos: "bottom-24 right-16", delay: 1.2 },
                ].map((f, i) => (
                  <motion.div key={i}
                    animate={{ y: [0, -12, 0] }}
                    transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
                    className={`absolute ${f.pos} w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15
                      flex items-center justify-center text-blue-300 shadow-lg`}>
                    {f.icon}
                  </motion.div>
                ))}

                {/* Centre pulse */}
                <div className="relative z-10 flex flex-col items-center justify-center gap-4">
                  <motion.div
                    animate={{ scale: [1, 1.08, 1] }}
                    transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                    className="w-24 h-24 rounded-[2rem] bg-blue-600 flex items-center justify-center shadow-2xl shadow-blue-600/60">
                    <span className="text-white font-black text-4xl italic">S</span>
                  </motion.div>
                  <span className="text-white/60 font-bold text-sm tracking-widest uppercase">Technology Bridged</span>
                </div>

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-transparent to-transparent" />
                <div className="absolute bottom-10 left-10 right-10 text-white">
                  <p className="text-2xl font-black tracking-tight mb-1">Designed for lifelong learners</p>
                  <p className="text-zinc-400 font-medium text-sm">Clarity over complexity — always.</p>
                </div>
              </div>

              {/* Floating badge */}
              <motion.div
                initial={{ x: 50, opacity: 0 }} whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }} transition={{ delay: 0.6, duration: 0.8 }}
                className="absolute -bottom-8 -left-8 bg-white p-6 rounded-3xl shadow-2xl border border-zinc-100
                  flex items-center gap-4 hover:-translate-y-2 transition-transform duration-500 cursor-default">
                <div className="w-16 h-16 rounded-2xl bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
                  <Award size={32} />
                </div>
                <div>
                  <div className="font-black text-3xl tracking-tighter text-zinc-900">100%</div>
                  <div className="text-zinc-400 font-black text-xs uppercase tracking-widest">Satisfaction</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ── TOPICS GRID ───────────────────────────────────────────────── */}
      <section className="py-28 bg-zinc-50 relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200/60 text-blue-700 font-black text-xs uppercase tracking-[0.2em] mb-6">
              <TrendingUp size={12} /> Expertise
            </div>
            <h2 className="font-black tracking-tighter mb-6 text-zinc-900" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)" }}>
              Everyday Tech Made Simple
            </h2>
            <p className="text-lg text-zinc-500 max-w-xl mx-auto font-medium">
              Click a topic to see how we help you master the devices your family uses every day.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {[
            { icon: <Printer />, title: "Printer Setup", desc: "Master wireless printing, maintenance, and tips to save ink and paper.", points: ["Wi-Fi Printing", "Paper Handling", "Save Ink"], href: "/techbridge/printers", accent: "from-blue-500 to-blue-700" },
            { icon: <Navigation />, title: "GPS Updates", desc: "Keep maps current on Garmin or in-car systems for stress-free travel.", points: ["Map Updates", "Route Tips", "Syncing"], href: "/techbridge/gps", accent: "from-emerald-500 to-teal-600" },
            { icon: <HomeIcon />, title: "Smart Home", desc: "Connect Alexa or Google Nest, set reminders, and build daily routines.", points: ["Alexa Tips", "Google Nest", "Routines"], href: "/techbridge/smart-home", accent: "from-violet-500 to-purple-700" },
            { icon: <Camera />, title: "Camera Basics", desc: "Install firmware, adjust settings, and capture sharper photos.", points: ["Firmware", "Settings", "Better Photos"], href: "/techbridge/camera", accent: "from-rose-500 to-pink-700" },
            { icon: <Smartphone />, title: "Alexa Refresh", desc: "Discover new commands and set up Alexa for music, news, and daily tasks.", points: ["Updates", "Commands", "Daily Tasks"], href: "/techbridge/alexa", accent: "from-amber-500 to-orange-600" },
            { icon: <Shield />, title: "Security & Basics", desc: "Master email setup, stay safe online with antivirus and cloud storage.", points: ["Email", "Antivirus", "Cloud Storage"], href: "/techbridge/security", accent: "from-cyan-500 to-blue-600" },
          ].map((topic, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.06, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -10 }}
              className="bg-white p-10 rounded-[2.5rem] shadow-lg shadow-zinc-200/40 hover:shadow-2xl hover:shadow-blue-500/10
                transition-all duration-500 border border-zinc-100 flex flex-col h-full group">
              {/* Icon with gradient bg */}
              <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${topic.accent} flex items-center justify-center mb-8
                text-white shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
                {topic.icon}
              </div>
              <h3 className="text-2xl font-black mb-3 tracking-tight group-hover:text-blue-600 transition-colors">{topic.title}</h3>
              <p className="text-zinc-500 mb-8 flex-grow leading-relaxed font-medium text-sm">{topic.desc}</p>
              <div className="flex flex-wrap gap-2 mb-8">
                {topic.points.map((p, j) => (
                  <span key={j} className="px-3 py-1 bg-zinc-50 border border-zinc-200 rounded-full text-xs font-black text-zinc-500 uppercase tracking-widest
                    group-hover:border-blue-200 group-hover:text-blue-600 group-hover:bg-blue-50/50 transition-all">{p}</span>
                ))}
              </div>
              <Link href={topic.href}
                className="shine-effect inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-7 py-3.5 rounded-xl
                  font-black text-sm uppercase tracking-wider group/link hover:bg-blue-600 transition-all duration-300">
                Learn More <ArrowRight size={15} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── STATS BAR ─────────────────────────────────────────────────── */}
      <section className="py-20 bg-zinc-900 relative overflow-hidden noise">
        <div className="absolute inset-0 mesh-gradient opacity-40" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-12">
            <span className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em]">Tech Facts & Stats — 2025</span>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: 65, suffix: "%", label: "of adults 50+ own a smart speaker", source: "Pew Research" },
              { value: 72, suffix: "%", label: "of GPS users never update their maps", source: "Garmin Survey" },
              { value: 89, suffix: "%", label: "prefer plain-English tech guides", source: "AARP Study" },
              { value: 47, suffix: "", label: "free interactive tools on our site", source: "Setwise Digital" },
            ].map((s, i) => (
              <StatCard key={i} {...s} />
            ))}
          </div>
        </div>
      </section>

      {/* ── PACKAGES ──────────────────────────────────────────────────── */}
      <section className="py-28 bg-white relative overflow-hidden">
        <div className="section-divider absolute top-0 left-0" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-20">
          <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-50 border border-indigo-100 text-indigo-700 font-black text-xs uppercase tracking-[0.2em] mb-6">
              <Star size={12} className="fill-indigo-500 text-indigo-500" /> Featured Packages
            </div>
            <h2 className="font-black tracking-tighter mb-6" style={{ fontSize: "clamp(2.4rem, 6vw, 4.5rem)" }}>
              Choose Your Learning Path
            </h2>
            <p className="text-lg text-zinc-500 max-w-xl mx-auto font-medium">
              Simple, transparent pricing. No monthly fees. Just the learning you need.
            </p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Printer Learning", sub: "10 min a day", bonus: "Printing tips to save time & money", features: ["Wi-Fi printing explained simply", "Printer maintenance basics"], color: "bg-blue-600", icon: <Printer className="text-white" />, href: "/techbridge/printers" },
            { title: "GPS Travel", sub: "Smooth travels ahead", bonus: "Hidden map features most people miss", features: ["Garmin & in-car GPS systems", "How GPS navigation works"], color: "bg-emerald-700", icon: <Navigation className="text-white" />, href: "/techbridge/gps" },
            { title: "Smart Home Starter", sub: "Voice-controlled life", bonus: "Create a routine that suits your lifestyle", features: ["How Alexa & Google Nest work", "Voice commands explained"], color: "bg-violet-700", icon: <HomeIcon className="text-white" />, href: "/techbridge/smart-home" },
            { title: "Camera Essentials", sub: "Clearer, sharper photos", bonus: "Simple tips for sharper photos", features: ["Understanding camera firmware", "Camera settings explained"], color: "bg-zinc-900", icon: <Camera className="text-white" />, href: "/techbridge/camera" },
          ].map((pkg, i) => (
            <motion.div key={i}
              initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }} transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className={`${pkg.color} shine-effect p-8 rounded-[2.5rem] text-white flex flex-col h-full shadow-2xl relative overflow-hidden group`}>
              <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-[1.6] transition-transform duration-700" />
              <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-black/10 rounded-full" />
              <div className="w-14 h-14 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-8 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500 relative z-10">
                {pkg.icon}
              </div>
              <h3 className="text-2xl font-black mb-1 tracking-tight leading-tight relative z-10">{pkg.title}</h3>
              <p className="text-white/70 font-bold text-xs uppercase tracking-widest mb-6 relative z-10">{pkg.sub}</p>
              <div className="space-y-3 mb-8 flex-grow relative z-10">
                {pkg.features.map((f, j) => (
                  <div key={j} className="flex items-start gap-2.5">
                    <CheckCircle2 size={16} className="text-white/50 mt-0.5 shrink-0" />
                    <span className="font-medium text-sm text-white/90">{f}</span>
                  </div>
                ))}
              </div>
              <div className="pt-6 border-t border-white/15 mb-8 relative z-10">
                <p className="text-xs font-black uppercase tracking-widest text-white/50 mb-1">Bonus:</p>
                <p className="text-sm font-bold italic text-white/80">{pkg.bonus}</p>
              </div>
              <Link href={pkg.href}
                className="w-full py-4 bg-white text-zinc-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2
                  hover:bg-zinc-100 transition-all duration-300 group/btn relative z-10">
                Explore Package <ChevronRight size={16} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <Link href="/pricing"
            className="shine-effect inline-flex items-center gap-3 px-10 py-5 bg-blue-600 text-white rounded-2xl font-black text-xl
              hover:bg-blue-500 hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all shadow-xl shadow-blue-500/20">
            Browse All Learning Packages <ArrowRight size={22} />
          </Link>
        </div>
      </section>

      {/* ── TECHBRIDGE SECTION ────────────────────────────────────────── */}
      <section className="py-28 bg-zinc-950 text-white relative overflow-hidden noise">
        <div className="absolute inset-0 mesh-gradient opacity-30" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/15 border border-blue-500/25 text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-8">
                Innovation meets Experience
              </div>
              <h2 className="font-black tracking-tighter leading-[1.05] mb-8"
                style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}>
                TechBridge: Mastering Tech<br />
                With <span className="text-blue-400">Confidence</span>
              </h2>
              <p className="text-lg text-zinc-400 mb-10 leading-relaxed font-medium">
                We blend on-demand AI learning with human-designed lessons. One side is fast and interactive — the other is thoughtful and personal. Together they make mastering technology feel natural.
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                {[
                  { icon: <Zap size={22} className="text-blue-400" />, title: "On-Demand Learning", desc: "AI-guided lessons whenever you need a refresher." },
                  { icon: <UserCheck size={22} className="text-blue-400" />, title: "Thoughtful & Human", desc: "Lessons designed by people who understand you." },
                  { icon: <Clock size={22} className="text-blue-400" />, title: "Learn at Your Pace", desc: "No rushing. Pause, rewind, repeat — it's all yours." },
                  { icon: <Users size={22} className="text-blue-400" />, title: "Real Support", desc: "Book a live educator for deeper guidance." },
                ].map((card, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                    className="p-6 rounded-2xl bg-white/5 border border-white/8 hover:bg-white/8 hover:border-blue-500/30 transition-all group">
                    <div className="mb-3 group-hover:scale-110 transition-transform w-fit">{card.icon}</div>
                    <div className="font-black text-white mb-1">{card.title}</div>
                    <div className="text-zinc-500 text-sm font-medium">{card.desc}</div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Chat UI mockup */}
            <div className="lg:w-1/2 relative">
              <motion.div
                initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.8 }}
                className="relative z-10 p-px rounded-[2.5rem] overflow-hidden"
                style={{ background: "linear-gradient(135deg, #3b82f6, #6366f1, #8b5cf6)" }}>
                <div className="bg-zinc-900 p-8 rounded-[2.4rem] space-y-6">
                  {/* Header */}
                  <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                    <div className="w-11 h-11 rounded-full bg-blue-600 flex items-center justify-center font-black text-lg italic text-white shadow-lg shadow-blue-600/40">S</div>
                    <div>
                      <div className="font-black text-white">Setwise CoPilot</div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                        <span className="text-xs text-zinc-400 font-medium">Online — ready to help</span>
                      </div>
                    </div>
                  </div>
                  {/* Messages */}
                  <div className="space-y-4">
                    <motion.div
                      initial={{ opacity: 0, x: -12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.3 }}
                      className="bg-white/8 p-4 rounded-2xl rounded-tl-sm mr-10 text-sm text-zinc-300 font-medium border border-white/5">
                      "Teach me how to set up wireless printing."
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0, x: 12 }} whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }} transition={{ delay: 0.6 }}
                      className="bg-blue-600 p-4 rounded-2xl rounded-tr-sm ml-10 text-sm font-medium shadow-lg shadow-blue-600/30">
                      "Great choice! Let's start with Lesson 1: how Wi-Fi printing actually works — in plain English, no jargon..."
                    </motion.div>
                    <motion.div
                      initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
                      viewport={{ once: true }} transition={{ delay: 0.9 }}
                      className="flex items-center justify-center gap-2 py-3">
                      <div className="w-2 h-2 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <div className="w-2 h-2 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <div className="w-2 h-2 rounded-full bg-zinc-600 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </motion.div>
                  </div>
                  {/* CTA */}
                  <Link href="/techbridge"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600/20 border border-blue-500/30 rounded-2xl text-blue-400 font-black text-sm hover:bg-blue-600/30 transition-colors">
                    Start a Lesson <ArrowRight size={16} />
                  </Link>
                </div>
              </motion.div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/15 blur-[80px]" />
            </div>
          </div>
        </div>
      </section>

      {/* ── LEARNING HUB ARTICLES ─────────────────────────────────────── */}
      <section className="py-28 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 border border-blue-200/60 text-blue-700 font-black text-xs uppercase tracking-[0.2em] mb-6">
                <BookOpen size={12} /> Learning Hub
              </div>
              <h2 className="font-black tracking-tighter mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
                Discover New Tips Every Week
              </h2>
              <p className="text-zinc-500 font-medium text-lg">Fresh ideas and easy lessons written in everyday language.</p>
            </div>
            <Link href="/techbridge"
              className="shrink-0 px-7 py-3.5 bg-white border-2 border-zinc-200 rounded-2xl font-bold text-sm hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm whitespace-nowrap">
              Visit Learning Hub →
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: "How to Print Wirelessly from Your Phone", cat: "Printer Tips", time: "4 min", stat: "68% of printer issues are Wi-Fi related", img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=600&h=400", href: "/techbridge/printers", accent: "from-blue-600/80 to-blue-800/50" },
              { title: "The Easiest Way to Update Your Garmin GPS", cat: "GPS Mastery", time: "5 min", stat: "72% of GPS users never update maps", img: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=600&h=400", href: "/techbridge/gps", accent: "from-emerald-600/80 to-teal-800/50" },
              { title: "5 Alexa Features You Didn't Know You Had", cat: "Smart Home", time: "3 min", stat: "Only 30% of Alexa owners use routines", img: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&q=80&w=600&h=400", href: "/techbridge/alexa", accent: "from-violet-600/80 to-purple-800/50" },
              { title: "Why Camera Updates Improve Your Photos", cat: "Camera & Photo", time: "3 min", stat: "Updates fix 40% of camera issues", img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600&h=400", href: "/techbridge/camera", accent: "from-rose-600/80 to-pink-800/50" },
            ].map((a, i) => (
              <motion.div key={i} whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-xl hover:shadow-blue-500/10 transition-all border border-zinc-100 flex flex-col group">
                <div className="h-44 relative overflow-hidden">
                  <img src={a.img} alt={a.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" loading="lazy" />
                  <div className={`absolute inset-0 bg-gradient-to-b ${a.accent}`} />
                  <span className="absolute top-3 left-3 px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-black text-zinc-700">{a.cat}</span>
                </div>
                <div className="p-5 flex flex-col flex-grow">
                  <div className="flex items-start gap-2 mb-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="text-xs">📊</span>
                    <span className="text-xs font-bold text-blue-700 leading-tight">{a.stat}</span>
                  </div>
                  <h4 className="font-black text-sm leading-snug mb-3 text-zinc-900 group-hover:text-blue-600 transition-colors flex-grow">{a.title}</h4>
                  <div className="flex items-center justify-between text-xs text-zinc-400 font-bold mt-auto pt-3 border-t border-zinc-100">
                    <span>{a.time} read</span>
                    <Link href={a.href} className="flex items-center gap-1 text-blue-600 hover:gap-2 transition-all">Read <ChevronRight size={13} /></Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── FAQ ───────────────────────────────────────────────────────── */}
      <section className="py-28 bg-white">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="font-black tracking-tighter mb-4" style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}>
              Questions You Might Have
            </h2>
            <p className="text-zinc-500 font-medium">Everything you need to know about learning with Setwise Digital.</p>
          </div>
          <div className="space-y-3">
            {[
              { q: "Do I need prior technical knowledge?", a: "Not at all. Our guides are written in plain English and designed for all levels — especially those who prefer clear, non-technical explanations." },
              { q: "Can I use these guides at my own pace?", a: "Yes. Every guide is step-by-step, allowing you to pause, repeat, and return whenever you have a few minutes to spare." },
              { q: "Do you cover different brands?", a: "Yes. We include instructions for popular devices like HP, Canon, Epson, Garmin, Sony, and many others." },
              { q: "What if I just need a quick answer?", a: "That's what our 47 free interactive tools are for — pick your device, answer 2–3 questions, and get the exact steps for your situation." },
              { q: "Is Setwise Digital affiliated with HP, Canon, or Garmin?", a: "No. We are an independent tech literacy platform, not affiliated with any device manufacturer." },
            ].map((faq, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                className={`border rounded-2xl transition-all duration-300 overflow-hidden ${activeFaq === i ? "border-blue-500 bg-blue-50/40 shadow-lg shadow-blue-500/5" : "border-zinc-200 hover:border-blue-200"}`}>
                <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-7 py-5 text-left flex items-center justify-between gap-4">
                  <span className="font-black text-zinc-900 text-base">{faq.q}</span>
                  <div className={`w-7 h-7 rounded-full flex items-center justify-center shrink-0 transition-all ${activeFaq === i ? "bg-blue-600 text-white rotate-180" : "bg-zinc-100 text-zinc-500"}`}>
                    <ChevronRight size={16} className="rotate-90" />
                  </div>
                </button>
                <div className={`transition-all duration-300 ${activeFaq === i ? "max-h-60" : "max-h-0"} overflow-hidden`}>
                  <div className="px-7 pb-6 text-zinc-600 font-medium leading-relaxed text-sm">{faq.a}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── WHO WE BUILD FOR ──────────────────────────────────────────── */}
      <section className="py-20 relative overflow-hidden">
        {/* Full bleed dark gradient */}
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-blue-950 to-zinc-950" />
        <div className="absolute inset-0 mesh-gradient opacity-20" />
        <div className="absolute inset-0 noise opacity-50" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <p className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-4">Built with care for</p>
            <h2 className="font-black tracking-tighter text-white mb-16" style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}>
              Who We Build For
            </h2>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {[
              { icon: "✦", text: "People who want clear instructions without tech jargon", label: "Clarity Seekers" },
              { icon: "◆", text: "Adults 40+ who value step-by-step learning", label: "Lifelong Learners" },
              { icon: "●", text: "Anyone who wants to enjoy gadgets without stress", label: "Everyday Users" },
            ].map((item, i) => (
              <motion.div key={i}
                initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ delay: i * 0.12 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 hover:bg-white/8 hover:border-blue-500/30
                  transition-all group hover:-translate-y-2 duration-300 text-center">
                <div className="text-blue-400 text-3xl font-black mb-4 group-hover:scale-125 transition-transform inline-block">{item.icon}</div>
                <div className="text-xs font-black uppercase tracking-widest text-blue-400/70 mb-3">{item.label}</div>
                <p className="text-white/80 font-bold text-lg leading-snug">{item.text}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CLOSING CTA ───────────────────────────────────────────────── */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-200 to-transparent" />
        {/* Decorative background blobs */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-50 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.8 }}>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-50 border border-blue-100 text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-10">
              <Sparkles size={12} className="text-yellow-500 fill-yellow-500" /> Start Today — It's Free
            </div>
            <h2 className="font-black tracking-tighter mb-8"
              style={{ fontSize: "clamp(3rem, 8vw, 6rem)", lineHeight: 0.95 }}>
              Explore.<br />
              <span className="text-shimmer">Learn.</span><br />
              Simplify.
            </h2>
            <p className="text-xl text-zinc-500 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
              Technology doesn't have to be confusing. Let's make it work for you, every day.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-5">
              <Link href="/pricing"
                className="shine-effect group inline-flex items-center gap-3 px-12 py-6 bg-blue-600 text-white rounded-2xl
                  font-black text-xl hover:bg-blue-500 hover:shadow-[0_20px_60px_rgba(37,99,235,0.45)]
                  hover:-translate-y-1 transition-all shadow-2xl shadow-blue-500/25">
                Browse Learning Packages
                <ArrowRight size={24} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/tools"
                className="inline-flex items-center gap-2 text-zinc-500 font-black hover:text-blue-600 transition-colors">
                Try 47 Free Tools <ChevronRight size={18} />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-8 mt-16 text-sm text-zinc-400 font-bold">
              {["✓ No monthly fees", "✓ Plain English always", "✓ Works on all devices", "✓ 100% satisfaction promise"].map((t, i) => (
                <span key={i} className="hover:text-blue-600 transition-colors">{t}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
