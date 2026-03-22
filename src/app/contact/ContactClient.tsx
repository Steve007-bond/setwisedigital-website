"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import {
  Send,
  Calendar,
  Zap,
  Mail,
  Phone,
  User,
  MapPin,
  Clock,
  CheckCircle2,
  Loader2,
  ArrowRight,
  MessageSquare,
  Globe,
  Shield,
  Star,
  ChevronRight,
  Headphones,
  MessageCircle,
  Video,
  BookOpen,
  HelpCircle,
  Heart,
  Sparkles,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════════════════
   TYPES & DATA
   ═══════════════════════════════════════════════════════════════════════════ */

type TabId = "message" | "schedule" | "call";

const TABS: { id: TabId; label: string; icon: React.ReactNode; desc: string }[] = [
  { id: "message", label: "Message", icon: <Send size={16} />, desc: "Send us a message — we reply within 24 hours" },
  { id: "schedule", label: "Schedule", icon: <Calendar size={16} />, desc: "Book a live lesson at a time that suits you" },
  { id: "call", label: "Instant Call", icon: <Zap size={16} />, desc: "Request a callback — we'll call you back today" },
];

const QUICK_TOPICS = [
  "Printer setup help",
  "GPS map updates",
  "Smart home setup",
  "Alexa not working",
  "Camera firmware",
  "Online security",
  "Book a live lesson",
  "General question",
];

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATED SVG CHARACTER — Friendly support person with headset
   ═══════════════════════════════════════════════════════════════════════════ */

function SupportCharacter() {
  return (
    <div className="relative w-full max-w-[340px] mx-auto">
      <svg viewBox="0 0 400 450" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
        {/* Glowing background circle */}
        <motion.circle cx="200" cy="220" r="160" fill="url(#charGlow)"
          animate={{ r: [155, 165, 155] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }} />

        {/* Body / torso */}
        <motion.path d="M120 350 C120 290, 150 270, 200 265 C250 270, 280 290, 280 350 L280 420 C280 435, 270 445, 255 445 L145 445 C130 445, 120 435, 120 420 Z"
          fill="url(#shirtGrad)" animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />

        {/* Collar */}
        <motion.path d="M170 272 L200 290 L230 272" stroke="#1e40af" strokeWidth="3" fill="none" strokeLinecap="round"
          animate={{ y: [0, -3, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />

        {/* Neck */}
        <motion.rect x="185" y="240" width="30" height="35" rx="8" fill="#f0c8a0"
          animate={{ y: [0, -2, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />

        {/* Head */}
        <motion.g animate={{ y: [0, -4, 0], rotate: [0, 1, -1, 0] }} transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}>
          {/* Head shape */}
          <ellipse cx="200" cy="180" rx="65" ry="72" fill="#f0c8a0" />

          {/* Hair */}
          <path d="M135 170 C135 120, 160 90, 200 85 C240 90, 265 120, 265 170 L265 155 C265 110, 240 80, 200 75 C160 80, 135 110, 135 155 Z" fill="#5a3825" />
          <path d="M140 165 C140 165, 135 140, 145 130" stroke="#4a2d1a" strokeWidth="3" fill="none" strokeLinecap="round" />
          <path d="M260 165 C260 165, 265 140, 255 130" stroke="#4a2d1a" strokeWidth="3" fill="none" strokeLinecap="round" />

          {/* Eyes */}
          <motion.g animate={{ scaleY: [1, 1, 0.1, 1, 1] }} transition={{ duration: 4, repeat: Infinity, times: [0, 0.4, 0.42, 0.44, 1] }}>
            <ellipse cx="180" cy="185" rx="7" ry="8" fill="#2d1810" />
            <ellipse cx="220" cy="185" rx="7" ry="8" fill="#2d1810" />
            <circle cx="182" cy="183" r="2.5" fill="white" opacity="0.8" />
            <circle cx="222" cy="183" r="2.5" fill="white" opacity="0.8" />
          </motion.g>

          {/* Eyebrows */}
          <motion.path d="M168 170 Q180 164, 190 170" stroke="#4a2d1a" strokeWidth="2.5" fill="none" strokeLinecap="round"
            animate={{ d: ["M168 170 Q180 164, 190 170", "M168 168 Q180 162, 190 168", "M168 170 Q180 164, 190 170"] }}
            transition={{ duration: 3, repeat: Infinity }} />
          <motion.path d="M210 170 Q220 164, 232 170" stroke="#4a2d1a" strokeWidth="2.5" fill="none" strokeLinecap="round"
            animate={{ d: ["M210 170 Q220 164, 232 170", "M210 168 Q220 162, 232 168", "M210 170 Q220 164, 232 170"] }}
            transition={{ duration: 3, repeat: Infinity }} />

          {/* Smile */}
          <motion.path d="M180 210 Q200 228, 220 210" stroke="#c47a5a" strokeWidth="3" fill="none" strokeLinecap="round"
            animate={{ d: ["M180 210 Q200 228, 220 210", "M180 212 Q200 232, 220 212", "M180 210 Q200 228, 220 210"] }}
            transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }} />

          {/* Cheeks blush */}
          <circle cx="165" cy="205" r="12" fill="#e8a090" opacity="0.4" />
          <circle cx="235" cy="205" r="12" fill="#e8a090" opacity="0.4" />

          {/* Glasses */}
          <rect x="162" y="174" width="30" height="24" rx="6" stroke="#3b82f6" strokeWidth="2.5" fill="rgba(59,130,246,0.08)" />
          <rect x="208" y="174" width="30" height="24" rx="6" stroke="#3b82f6" strokeWidth="2.5" fill="rgba(59,130,246,0.08)" />
          <line x1="192" y1="186" x2="208" y2="186" stroke="#3b82f6" strokeWidth="2" />
          <line x1="162" y1="186" x2="150" y2="182" stroke="#3b82f6" strokeWidth="2" />
          <line x1="238" y1="186" x2="250" y2="182" stroke="#3b82f6" strokeWidth="2" />

          {/* Headset */}
          <motion.g animate={{ y: [0, -1, 0] }} transition={{ duration: 2, repeat: Infinity }}>
            <path d="M130 175 C130 130, 155 100, 200 100 C245 100, 270 130, 270 175" stroke="#374151" strokeWidth="6" fill="none" strokeLinecap="round" />
            <rect x="120" y="168" width="18" height="30" rx="8" fill="#374151" />
            <rect x="262" y="168" width="18" height="30" rx="8" fill="#374151" />
            {/* Mic arm */}
            <path d="M120 190 C105 190, 100 200, 105 215 L115 225" stroke="#374151" strokeWidth="4" fill="none" strokeLinecap="round" />
            <circle cx="117" cy="228" r="6" fill="#22c55e" />
            <motion.circle cx="117" cy="228" r="6" fill="#22c55e"
              animate={{ opacity: [1, 0.4, 1] }} transition={{ duration: 1.5, repeat: Infinity }} />
          </motion.g>
        </motion.g>

        {/* Waving hand */}
        <motion.g animate={{ rotate: [0, 15, -5, 15, 0] }} transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          style={{ transformOrigin: "310px 320px" }}>
          <path d="M280 310 C290 290, 310 280, 325 295 L340 310 C348 320, 345 335, 335 340 L315 345 C305 348, 290 340, 285 325 Z" fill="#f0c8a0" />
          {/* Fingers */}
          <path d="M325 295 L332 278 C334 272, 342 272, 343 278 L338 295" fill="#f0c8a0" />
          <path d="M335 298 L345 282 C347 276, 355 277, 355 283 L348 300" fill="#f0c8a0" />
          <path d="M340 305 L352 292 C355 287, 362 289, 360 295 L350 310" fill="#f0c8a0" />
        </motion.g>

        {/* Speech bubble */}
        <motion.g animate={{ y: [0, -6, 0], opacity: [0.9, 1, 0.9] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
          <rect x="280" y="120" width="110" height="50" rx="16" fill="#2563eb" />
          <polygon points="290,170 300,155 310,170" fill="#2563eb" />
          <text x="310" y="142" textAnchor="middle" fill="white" fontSize="13" fontWeight="800" fontFamily="system-ui">Hi there! 👋</text>
          <text x="310" y="158" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="10" fontWeight="600" fontFamily="system-ui">How can I help?</text>
        </motion.g>

        {/* Floating particles around character */}
        <motion.circle cx="90" cy="140" r="4" fill="#3b82f6" opacity="0.5"
          animate={{ y: [0, -15, 0], opacity: [0.3, 0.7, 0.3] }} transition={{ duration: 3, repeat: Infinity, delay: 0 }} />
        <motion.circle cx="320" cy="160" r="3" fill="#06b6d4" opacity="0.5"
          animate={{ y: [0, -12, 0], opacity: [0.3, 0.8, 0.3] }} transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }} />
        <motion.circle cx="110" cy="300" r="3" fill="#8b5cf6" opacity="0.4"
          animate={{ y: [0, -10, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 3.5, repeat: Infinity, delay: 1 }} />
        <motion.rect x="330" cy="260" width="6" height="6" rx="1" fill="#f59e0b" opacity="0.4"
          animate={{ y: [0, -14, 0], rotate: [0, 45, 0], opacity: [0.2, 0.6, 0.2] }} transition={{ duration: 4, repeat: Infinity, delay: 0.7 }} />
        <motion.polygon points="80,230 84,220 88,230" fill="#22c55e" opacity="0.4"
          animate={{ y: [0, -12, 0], opacity: [0.2, 0.5, 0.2] }} transition={{ duration: 3, repeat: Infinity, delay: 1.2 }} />

        <defs>
          <radialGradient id="charGlow" cx="0.5" cy="0.45" r="0.5">
            <stop offset="0%" stopColor="#2563eb" stopOpacity="0.15" />
            <stop offset="100%" stopColor="#2563eb" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="shirtGrad" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#2563eb" />
            <stop offset="100%" stopColor="#1d4ed8" />
          </linearGradient>
        </defs>
      </svg>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   FLOATING PARTICLES
   ═══════════════════════════════════════════════════════════════════════════ */

function FloatingParticles() {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(20)].map((_, i) => (
        <motion.div key={i} className="absolute rounded-full"
          style={{
            width: `${3 + (i % 4) * 2}px`,
            height: `${3 + (i % 4) * 2}px`,
            left: `${(i * 17 + 5) % 100}%`,
            top: `${(i * 23 + 10) % 100}%`,
            backgroundColor: ["#3b82f6", "#06b6d4", "#8b5cf6", "#22c55e", "#f59e0b"][i % 5],
          }}
          animate={{
            opacity: [0, 0.5, 0],
            y: [-8, 8, -8],
            x: [-4, 4, -4],
          }}
          transition={{
            duration: 4 + (i % 3) * 2,
            repeat: Infinity,
            delay: (i * 0.4) % 6,
          }}
        />
      ))}
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY
   ═══════════════════════════════════════════════════════════════════════════ */

function FadeUp({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 28 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ delay, duration: 0.6, ease: [0.22, 1, 0.36, 1] }} className={className}>
      {children}
    </motion.div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   CONTACT FORM
   ═══════════════════════════════════════════════════════════════════════════ */

function ContactForm({ activeTab }: { activeTab: TabId }) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [preferredDate, setPreferredDate] = useState("");
  const [preferredTime, setPreferredTime] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    if (activeTab === "call" && !phone.trim()) e.phone = "Phone is required for callbacks";
    if (activeTab === "message" && !message.trim()) e.message = "Please describe how we can help";
    if (activeTab === "schedule" && !preferredDate) e.date = "Please select a preferred date";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone,
          issue: activeTab === "schedule" ? `Schedule: ${preferredDate} ${preferredTime} — ${message}` : activeTab === "call" ? `Callback — ${message}` : message,
          source: `contact-page-${activeTab}`,
        }),
      });
    } catch (e) { console.error("[contact]", e); }
    setStatus("done");
  };

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30">
          <CheckCircle2 size={36} className="text-white" />
        </motion.div>
        <h3 className="text-2xl font-black text-white mb-2">Message Sent!</h3>
        <p className="text-zinc-400 font-medium mb-1">Thanks, {name}. We&apos;ll reply within 24 hours.</p>
        <p className="text-zinc-600 text-sm">Check {email} for our response.</p>
        <motion.button onClick={() => setStatus("idle")} className="mt-6 px-6 py-3 bg-white/[0.06] border border-white/10 rounded-xl text-sm font-bold text-zinc-400 hover:text-white hover:bg-white/10 transition-all">
          Send Another Message
        </motion.button>
      </motion.div>
    );
  }

  const inputClass = "w-full px-4 py-4 bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-blue-500/50 rounded-xl text-white text-base placeholder:text-zinc-600 font-medium outline-none transition-all focus:ring-2 focus:ring-blue-500/20";
  const labelClass = "text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1";
  const errorClass = "text-red-400 text-xs mt-1.5 font-semibold ml-1";

  return (
    <div className="space-y-5">
      <div>
        <label className={labelClass}>Full Name *</label>
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
            className={`${inputClass} pl-11`} style={{ borderColor: errors.name ? "#ef4444" : undefined }} />
        </div>
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      <div>
        <label className={labelClass}>Email *</label>
        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com"
            className={`${inputClass} pl-11`} style={{ borderColor: errors.email ? "#ef4444" : undefined }} />
        </div>
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      <div>
        <label className={labelClass}>Phone {activeTab === "call" ? "*" : <span className="text-zinc-600 normal-case font-normal">(optional)</span>}</label>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000"
            className={`${inputClass} pl-11`} style={{ borderColor: errors.phone ? "#ef4444" : undefined }} />
        </div>
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      <AnimatePresence>
        {activeTab === "schedule" && (
          <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: "auto", opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className={labelClass}>Preferred Date *</label>
                <input type="date" value={preferredDate} onChange={(e) => setPreferredDate(e.target.value)}
                  className={inputClass} style={{ borderColor: errors.date ? "#ef4444" : undefined }} />
                {errors.date && <p className={errorClass}>{errors.date}</p>}
              </div>
              <div>
                <label className={labelClass}>Time</label>
                <select value={preferredTime} onChange={(e) => setPreferredTime(e.target.value)} className={inputClass}>
                  <option value="">Any time</option>
                  <option value="morning">Morning (9–12)</option>
                  <option value="afternoon">Afternoon (12–3)</option>
                  <option value="evening">Evening (3–6)</option>
                </select>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <div>
        <label className={labelClass}>
          {activeTab === "message" ? "How Can We Help? *" : activeTab === "schedule" ? "What would you like to learn?" : "What do you need help with?"}
        </label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={3}
          placeholder={activeTab === "message" ? "I need help with my printer setup..." : activeTab === "schedule" ? "I'd like to learn wireless printing..." : "Briefly describe what you need..."}
          className={`${inputClass} resize-none`} style={{ borderColor: errors.message ? "#ef4444" : undefined }} />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      {activeTab === "message" && !message && (
        <div>
          <p className="text-xs text-zinc-600 font-bold mb-2 ml-1">Quick select a topic:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_TOPICS.map((t) => (
              <motion.button key={t} onClick={() => setMessage(t)} whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}
                className="px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs font-bold text-zinc-400 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all">
                {t}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      <motion.button onClick={submit} disabled={status === "loading"} whileHover={{ scale: 1.01, y: -2 }} whileTap={{ scale: 0.98 }}
        className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-lg rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-blue-600/25 hover:shadow-blue-500/40 transition-all mt-2 disabled:opacity-70">
        {status === "loading" ? <Loader2 size={22} className="animate-spin" /> : (
          <>{activeTab === "message" && <><Send size={18} /> Send Message</>}
            {activeTab === "schedule" && <><Calendar size={18} /> Request Booking</>}
            {activeTab === "call" && <><Phone size={18} /> Request Callback</>}</>
        )}
      </motion.button>
      <p className="text-center text-zinc-600 text-xs font-medium">We reply within 24 hours · No spam · Your data is secure</p>
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function ContactClient() {
  const [activeTab, setActiveTab] = useState<TabId>("message");

  return (
    <div className="min-h-screen bg-[#060a12] text-white font-sans">
      <Navbar />
      <ScrollToTop />

      {/* ─── BREADCRUMB ─── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-4">
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-2 text-sm font-medium">
          <Link href="/" className="text-zinc-500 hover:text-blue-400 transition-colors">Home</Link>
          <ChevronRight size={14} className="text-zinc-700" />
          <span className="text-white font-bold">Contact Us</span>
        </motion.div>
      </div>

      {/* ─── HERO + FORM ─── */}
      <section className="relative pb-16 overflow-hidden">
        <FloatingParticles />
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/6 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-start">

            {/* ─── LEFT ─── */}
            <div className="pt-4">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-6">
                  <Headphones size={12} /> Get Help Anytime
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="font-black tracking-[-0.03em] leading-[1.05] mb-5"
                style={{ fontSize: "clamp(2.5rem, 5vw, 3.8rem)" }}>
                We&apos;re Here
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">to Help You.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-base text-zinc-400 font-medium leading-relaxed mb-8 max-w-md">
                Whether you have a question about our free tools, want to book a live learning session, or just need a friendly nudge — reach out anytime.
              </motion.p>

              {/* SVG Character */}
              <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.3, duration: 0.8 }}>
                <SupportCharacter />
              </motion.div>

              {/* Contact cards */}
              <div className="space-y-3 mt-6">
                {[
                  { icon: <Mail size={18} className="text-blue-400" />, title: "Email Us", desc: "We respond within 24 hours", value: "support@setwisedigital.com", href: "mailto:support@setwisedigital.com" },
                  { icon: <MapPin size={18} className="text-emerald-400" />, title: "US & Canada", desc: "Online tech education coast to coast", value: "Glassboro, NJ 08028", href: null },
                  { icon: <Clock size={18} className="text-amber-400" />, title: "Office Hours", desc: "Monday – Friday", value: "9:00 AM – 6:00 PM EST", href: null },
                ].map((info, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.5 + i * 0.08 }}
                    className="flex items-center gap-4 p-4 bg-white/[0.03] border border-white/8 rounded-2xl hover:border-white/15 transition-all group">
                    <div className="w-10 h-10 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h4 className="font-black text-white text-sm">{info.title}</h4>
                        <span className="text-zinc-600 text-xs font-medium">· {info.desc}</span>
                      </div>
                      {info.href ? (
                        <a href={info.href} className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors inline-flex items-center gap-1">
                          {info.value} <ArrowRight size={11} />
                        </a>
                      ) : (
                        <p className="text-zinc-300 text-sm font-bold">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ─── RIGHT: FORM CARD ─── */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}
              className="lg:sticky lg:top-24">
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 rounded-[3rem] blur-2xl pointer-events-none" />
                <div className="relative bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden">
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />
                  <div className="p-7 md:p-9">
                    {/* Tabs */}
                    <div className="flex gap-1 p-1 bg-white/[0.04] border border-white/8 rounded-xl mb-7">
                      {TABS.map((tab) => (
                        <motion.button key={tab.id} onClick={() => setActiveTab(tab.id)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-3 rounded-lg text-sm font-black transition-all ${
                            activeTab === tab.id ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25" : "text-zinc-500 hover:text-white hover:bg-white/[0.04]"
                          }`}>
                          {tab.icon}
                          <span className="hidden sm:inline">{tab.label}</span>
                        </motion.button>
                      ))}
                    </div>

                    <AnimatePresence mode="wait">
                      <motion.div key={activeTab} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }} className="mb-7">
                        <h2 className="text-2xl font-black text-white mb-1">
                          {activeTab === "message" && "Get In Touch."}
                          {activeTab === "schedule" && "Book a Lesson."}
                          {activeTab === "call" && "Request a Callback."}
                        </h2>
                        <p className="text-zinc-500 text-sm font-medium">{TABS.find((t) => t.id === activeTab)?.desc}</p>
                      </motion.div>
                    </AnimatePresence>

                    <ContactForm activeTab={activeTab} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── EXTRA WAYS TO REACH US ─── */}
      <section className="py-20 bg-zinc-950/80 border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 font-black text-xs uppercase tracking-[0.2em] mb-4">
              <Sparkles size={12} /> More Ways to Connect
            </div>
            <h2 className="font-black tracking-tight text-2xl md:text-3xl">
              Choose How You&apos;d Like to Reach Us
            </h2>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { icon: <Video size={22} />, title: "Live Video Lesson", desc: "One-on-one with a real educator. Your device, your pace.", tag: "From $49", tagColor: "text-amber-400 bg-amber-500/10", gradient: "from-blue-600 to-blue-800", href: "/pricing" },
              { icon: <Mail size={22} />, title: "Email Support", desc: "Send us a detailed question. We reply within 24 hours.", tag: "Free", tagColor: "text-emerald-400 bg-emerald-500/10", gradient: "from-emerald-600 to-teal-700", href: "mailto:support@setwisedigital.com" },
              { icon: <BookOpen size={22} />, title: "Self-Service Tools", desc: "47 free interactive tools — pick your device, get steps.", tag: "Free", tagColor: "text-emerald-400 bg-emerald-500/10", gradient: "from-violet-600 to-purple-700", href: "/tools" },
              { icon: <HelpCircle size={22} />, title: "TechBridge Guides", desc: "Step-by-step learning for printers, GPS, smart home & more.", tag: "Free", tagColor: "text-emerald-400 bg-emerald-500/10", gradient: "from-cyan-600 to-blue-700", href: "/techbridge" },
            ].map((card, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <Link href={card.href}>
                  <motion.div whileHover={{ y: -6, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="h-full bg-white/[0.03] border border-white/8 hover:border-white/20 rounded-2xl p-6 flex flex-col transition-all group cursor-pointer">
                    <div className="flex items-start justify-between mb-4">
                      <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all`}>
                        {card.icon}
                      </div>
                      <span className={`px-2.5 py-1 rounded-lg text-[10px] font-black ${card.tagColor}`}>{card.tag}</span>
                    </div>
                    <h4 className="font-black text-white text-base mb-2 group-hover:text-blue-300 transition-colors">{card.title}</h4>
                    <p className="text-zinc-500 text-xs font-medium leading-relaxed flex-grow">{card.desc}</p>
                    <div className="flex items-center gap-1 text-blue-400 font-black text-xs mt-4 opacity-0 group-hover:opacity-100 transition-all">
                      Go <ArrowRight size={11} />
                    </div>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── WHAT PEOPLE ASK ABOUT ─── */}
      <section className="py-20 bg-[#060a12]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-12">
            <h2 className="font-black tracking-tight text-2xl md:text-3xl mb-3">Popular Help Topics</h2>
            <p className="text-zinc-500 font-medium">Jump straight to free guides — no contact needed.</p>
          </FadeUp>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
            {[
              { emoji: "🖨️", title: "Printers", href: "/techbridge/printers" },
              { emoji: "🗺️", title: "GPS", href: "/techbridge/gps" },
              { emoji: "🏠", title: "Smart Home", href: "/techbridge/smart-home" },
              { emoji: "🔊", title: "Alexa", href: "/techbridge/alexa" },
              { emoji: "📷", title: "Cameras", href: "/techbridge/camera" },
              { emoji: "🔒", title: "Security", href: "/techbridge/security" },
            ].map((topic, i) => (
              <FadeUp key={i} delay={i * 0.04}>
                <Link href={topic.href}>
                  <motion.div whileHover={{ y: -4, scale: 1.04 }} whileTap={{ scale: 0.96 }}
                    className="text-center p-5 bg-white/[0.03] border border-white/8 hover:border-blue-500/25 rounded-2xl transition-all group cursor-pointer">
                    <motion.div animate={{ y: [0, -4, 0] }} transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
                      className="text-3xl mb-3">{topic.emoji}</motion.div>
                    <p className="font-black text-sm text-zinc-300 group-hover:text-blue-300 transition-colors">{topic.title}</p>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── TRUST STRIP ─── */}
      <section className="py-12 bg-zinc-950 border-y border-white/5">
        <div className="max-w-5xl mx-auto px-4 text-center">
          <div className="flex flex-wrap items-center justify-center gap-8">
            {[
              { icon: <Shield size={16} className="text-blue-400" />, text: "Your data is 100% secure" },
              { icon: <Clock size={16} className="text-emerald-400" />, text: "We reply within 24 hours" },
              { icon: <Star size={16} className="text-amber-400 fill-amber-400" />, text: "2,400+ learners helped" },
              { icon: <Heart size={16} className="text-rose-400" />, text: "100% satisfaction promise" },
              { icon: <Globe size={16} className="text-cyan-400" />, text: "Serving US & Canada" },
            ].map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}
                className="flex items-center gap-2 text-sm font-bold text-zinc-400">
                {t.icon} {t.text}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-16 bg-[#060a12]">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeUp>
            <p className="text-zinc-400 font-medium text-lg mb-6">
              Not sure what you need? Start with our free tools — no account required.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/tools"
                className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-xl font-black hover:shadow-lg hover:-translate-y-0.5 transition-all shadow-lg shadow-blue-600/20">
                Browse 47 Free Tools <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link href="/techbridge"
                className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/[0.06] border border-white/10 text-white rounded-xl font-black hover:bg-white/10 transition-all">
                Explore TechBridge
              </Link>
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
