"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Mail, MapPin, CheckCircle2, BookOpen, ShieldCheck, UserCheck,
  MessageSquare, Globe, Clock, ArrowUpRight, ChevronRight,
  Search, Loader2, AlertCircle, Send, Sparkles, Phone,
  HeartHandshake, Award, Users, Monitor, Printer, Navigation,
  Home as HomeIcon, Shield, CalendarDays, Zap, PhoneCall,
  ArrowRight, Star, ChevronDown,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import EmailInput from "@/components/EmailInput";
import PhoneInput from "@/components/PhoneInput";
import { validateEmail, validatePhone } from "@/lib/validation";
import Link from "next/link";
import Image from "next/image";
import React, { useState, useRef, useEffect, useCallback } from "react";

/* ═══════════════════════════════════════════════════════════════════════
   ANIMATED BACKGROUND COMPONENTS
   ═══════════════════════════════════════════════════════════════════════ */

/* Aurora gradient bands */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {/* Primary aurora band */}
      <motion.div
        className="absolute w-[140%] h-[600px] -left-[20%] top-[5%] opacity-30"
        style={{
          background: "linear-gradient(135deg, rgba(59,130,246,0.4) 0%, rgba(139,92,246,0.3) 25%, rgba(236,72,153,0.2) 50%, rgba(34,211,238,0.3) 75%, rgba(59,130,246,0.4) 100%)",
          filter: "blur(80px)",
          borderRadius: "50%",
        }}
        animate={{
          x: [0, 80, -40, 60, 0],
          y: [0, -30, 20, -15, 0],
          rotate: [0, 3, -2, 1, 0],
          scale: [1, 1.05, 0.98, 1.03, 1],
        }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
      />
      {/* Secondary aurora band */}
      <motion.div
        className="absolute w-[120%] h-[400px] -left-[10%] top-[35%] opacity-20"
        style={{
          background: "linear-gradient(225deg, rgba(34,211,238,0.5) 0%, rgba(99,102,241,0.4) 30%, rgba(236,72,153,0.3) 60%, rgba(250,204,21,0.2) 100%)",
          filter: "blur(100px)",
          borderRadius: "40%",
        }}
        animate={{
          x: [0, -60, 30, -80, 0],
          y: [0, 25, -15, 10, 0],
          scale: [1, 1.08, 0.95, 1.04, 1],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }}
      />
      {/* Tertiary subtle accent */}
      <motion.div
        className="absolute w-[80%] h-[300px] left-[30%] top-[60%] opacity-15"
        style={{
          background: "linear-gradient(45deg, rgba(250,204,21,0.4) 0%, rgba(251,146,60,0.3) 50%, rgba(236,72,153,0.4) 100%)",
          filter: "blur(90px)",
          borderRadius: "60%",
        }}
        animate={{
          x: [0, 40, -20, 30, 0],
          y: [0, -20, 10, -25, 0],
        }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut", delay: 5 }}
      />
    </div>
  );
}

/* Floating particles system */
function ParticleField() {
  const particles = Array.from({ length: 35 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    size: Math.random() * 4 + 1.5,
    duration: Math.random() * 15 + 10,
    delay: Math.random() * 8,
    color: [
      "rgba(59,130,246,0.6)",
      "rgba(139,92,246,0.5)",
      "rgba(236,72,153,0.4)",
      "rgba(34,211,238,0.5)",
      "rgba(250,204,21,0.4)",
    ][Math.floor(Math.random() * 5)],
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            background: p.color,
          }}
          animate={{
            y: [0, -40, 15, -25, 0],
            x: [0, 20, -10, 15, 0],
            opacity: [0, 0.8, 0.4, 0.7, 0],
            scale: [0.5, 1.2, 0.8, 1, 0.5],
          }}
          transition={{
            duration: p.duration,
            delay: p.delay,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

/* Animated grid */
function AnimatedGrid() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {[20, 40, 60, 80].map((pos, i) => (
        <motion.div
          key={`h-${i}`}
          className="absolute left-0 right-0"
          style={{ top: `${pos}%`, height: "1px" }}
          initial={{ opacity: 0, scaleX: 0 }}
          animate={{ opacity: 0.06, scaleX: 1 }}
          transition={{ duration: 2.5, delay: 0.3 + i * 0.2, ease: "easeOut" }}
        >
          <div className="w-full h-full" style={{ background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
        </motion.div>
      ))}
      {[20, 40, 60, 80].map((pos, i) => (
        <motion.div
          key={`v-${i}`}
          className="absolute top-0 bottom-0"
          style={{ left: `${pos}%`, width: "1px" }}
          initial={{ opacity: 0, scaleY: 0 }}
          animate={{ opacity: 0.06, scaleY: 1 }}
          transition={{ duration: 2.5, delay: 0.5 + i * 0.2, ease: "easeOut" }}
        >
          <div className="w-full h-full" style={{ background: "linear-gradient(180deg, transparent, rgba(255,255,255,0.3), transparent)" }} />
        </motion.div>
      ))}
    </div>
  );
}

/* Animated counter */
function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          let start = 0;
          const step = Math.max(1, Math.floor(target / 40));
          const interval = setInterval(() => {
            start += step;
            if (start >= target) {
              setCount(target);
              clearInterval(interval);
            } else {
              setCount(start);
            }
          }, 40);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

/* ═══════════════════════════════════════════════════════════════════════
   SERVICE ICONS CONFIG — colorful, large, clickable
   ═══════════════════════════════════════════════════════════════════════ */
const serviceItems = [
  {
    icon: <Printer size={36} />,
    label: "Printers",
    href: "/techbridge/printers",
    color: "from-blue-500 to-blue-700",
    glow: "rgba(59,130,246,0.4)",
    ring: "border-blue-400/30",
    delay: 0.6,
  },
  {
    icon: <Navigation size={36} />,
    label: "GPS",
    href: "/techbridge/gps",
    color: "from-emerald-500 to-emerald-700",
    glow: "rgba(16,185,129,0.4)",
    ring: "border-emerald-400/30",
    delay: 0.8,
  },
  {
    icon: <HomeIcon size={36} />,
    label: "Smart Home",
    href: "/techbridge/smart-home",
    color: "from-violet-500 to-violet-700",
    glow: "rgba(139,92,246,0.4)",
    ring: "border-violet-400/30",
    delay: 1.0,
  },
  {
    icon: <Shield size={36} />,
    label: "Security",
    href: "/techbridge/security",
    color: "from-rose-500 to-rose-700",
    glow: "rgba(244,63,94,0.4)",
    ring: "border-rose-400/30",
    delay: 1.2,
  },
  {
    icon: <Monitor size={36} />,
    label: "Alexa",
    href: "/techbridge/alexa",
    color: "from-amber-500 to-amber-700",
    glow: "rgba(245,158,11,0.4)",
    ring: "border-amber-400/30",
    delay: 1.4,
  },
  {
    icon: <MessageSquare size={36} />,
    label: "Camera",
    href: "/techbridge/camera",
    color: "from-cyan-500 to-cyan-700",
    glow: "rgba(6,182,212,0.4)",
    ring: "border-cyan-400/30",
    delay: 1.6,
  },
];

/* ═══════════════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════════════ */
export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState<"message" | "schedule" | "callback">("message");

  /* Message form */
  const [form, setForm] = useState({ name: "", email: "", phone: "", countryCode: "+1", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  /* Schedule form */
  const [scheduleForm, setScheduleForm] = useState({
    name: "", email: "", phone: "", countryCode: "+1",
    topic: "", preferredDate: "", preferredTime: "", notes: "",
  });
  const [scheduleStatus, setScheduleStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [scheduleError, setScheduleError] = useState("");

  /* Instant callback */
  const [callbackForm, setCallbackForm] = useState({ name: "", phone: "", countryCode: "+1" });
  const [callbackStatus, setCallbackStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [callbackError, setCallbackError] = useState("");

  /* Parallax */
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const isValid =
    form.name.trim() !== "" &&
    validateEmail(form.email).valid &&
    validatePhone(form.phone).valid &&
    form.message.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setFormStatus("loading");
    setFormError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: `${form.countryCode} ${form.phone}`,
          issue: form.message,
          topic: "General Enquiry",
          contactMethod: "Email",
        }),
      });
      if (!res.ok) throw new Error("Network error");
      setFormStatus("success");
    } catch {
      setFormError("Something went wrong. Please email us directly at support@setwisedigital.com");
      setFormStatus("error");
    }
  };

  /* Schedule submit */
  const isScheduleValid =
    scheduleForm.name.trim() !== "" &&
    validateEmail(scheduleForm.email).valid &&
    validatePhone(scheduleForm.phone).valid &&
    scheduleForm.topic !== "" &&
    scheduleForm.preferredDate !== "" &&
    scheduleForm.preferredTime !== "";

  const handleScheduleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isScheduleValid) return;
    setScheduleStatus("loading");
    setScheduleError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: scheduleForm.name,
          email: scheduleForm.email,
          phone: `${scheduleForm.countryCode} ${scheduleForm.phone}`,
          issue: `📅 SESSION BOOKING REQUEST\nTopic: ${scheduleForm.topic}\nPreferred Date: ${scheduleForm.preferredDate}\nPreferred Time: ${scheduleForm.preferredTime}\nNotes: ${scheduleForm.notes || "None"}`,
          topic: "Session Booking",
          contactMethod: "Email",
        }),
      });
      if (!res.ok) throw new Error("Network error");
      setScheduleStatus("success");
    } catch {
      setScheduleError("Something went wrong. Please email us at support@setwisedigital.com");
      setScheduleStatus("error");
    }
  };

  /* Instant callback submit */
  const isCallbackValid =
    callbackForm.name.trim() !== "" &&
    validatePhone(callbackForm.phone).valid;

  const handleCallbackSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isCallbackValid) return;
    setCallbackStatus("loading");
    setCallbackError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: callbackForm.name,
          email: "callback-request@setwisedigital.com",
          phone: `${callbackForm.countryCode} ${callbackForm.phone}`,
          issue: `⚡ INSTANT CALLBACK REQUEST\n\n${callbackForm.name} would like to speak with an educator right away.\nPhone: ${callbackForm.countryCode} ${callbackForm.phone}\n\nPlease call back as soon as possible.`,
          topic: "Instant Callback",
          contactMethod: "Phone",
        }),
      });
      if (!res.ok) throw new Error("Network error");
      setCallbackStatus("success");
    } catch {
      setCallbackError("Something went wrong. Please email support@setwisedigital.com");
      setCallbackStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <ScrollToTop />

      {/* ════════════════════════════════════════════════════════════════
          HERO HEADER — Vivid Aurora + Colorful Service Icons
          ════════════════════════════════════════════════════════════════ */}
      <header ref={heroRef} className="relative overflow-hidden bg-zinc-950 min-h-[90vh] lg:min-h-[95vh] flex items-center">
        <AuroraBackground />
        <ParticleField />
        <AnimatedGrid />

        {/* Radial spotlight */}
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 70% 50% at 30% 45%, rgba(59,130,246,0.06) 0%, transparent 70%)" }} aria-hidden="true" />
        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#FDFDFD] to-transparent z-10" />

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-28 lg:pt-40 lg:pb-36"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 lg:gap-20 items-center">
            {/* ── Left: Text ── */}
            <div className="space-y-8 lg:space-y-10">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-blue-500/15 to-violet-500/15 border border-blue-400/25 text-blue-300 text-sm font-bold tracking-wide">
                  <Sparkles size={16} className="text-blue-400" />
                  Free Consultation — Reply Within 24 Hours
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-[2.75rem] sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white"
              >
                Technology Help{" "}
                <br className="hidden sm:block" />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Made Simple.
                  </span>
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
                  />
                </span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.5 }}
                className="text-xl sm:text-2xl text-zinc-400 leading-relaxed font-medium max-w-xl"
              >
                Patient, personalized tech education for{" "}
                <strong className="text-white font-bold">adults 45+</strong> across the{" "}
                <strong className="text-white font-bold">United States</strong> &amp;{" "}
                <strong className="text-white font-bold">Canada</strong>. Printers, GPS,
                smart home, and more.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a href="#contact-form"
                  className="shine-effect inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-500 hover:to-blue-600 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-blue-600/30 min-h-[60px]">
                  <Send size={22} />
                  Send Us a Message
                </a>
                <a href="#contact-form" onClick={() => setTimeout(() => setActiveTab("callback"), 100)}
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 hover:from-emerald-500/25 hover:to-cyan-500/25 text-emerald-300 border border-emerald-400/25 rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] backdrop-blur-sm min-h-[60px]">
                  <PhoneCall size={22} />
                  Request Instant Callback
                </a>
              </motion.div>

              {/* Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.9 }}
                className="flex flex-wrap gap-8 pt-4"
              >
                {[
                  { value: 9, suffix: "+", label: "Years Trusted" },
                  { value: 47, suffix: "", label: "Free Tools" },
                  { value: 24, suffix: "hr", label: "Reply Time" },
                ].map((stat, i) => (
                  <div key={i} className="text-center sm:text-left">
                    <div className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                      <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                    </div>
                    <div className="text-sm text-zinc-500 font-bold mt-1">{stat.label}</div>
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ── Right: Colorful, Large, Clickable Service Icons ── */}
            <div className="relative flex items-center justify-center min-h-[420px] lg:min-h-[550px]">
              {/* Pulsing rings */}
              <motion.div
                className="absolute w-56 h-56 lg:w-72 lg:h-72 rounded-full border-2 border-blue-400/15"
                animate={{ scale: [1, 1.12, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-72 h-72 lg:w-96 lg:h-96 rounded-full border border-violet-400/10"
                animate={{ scale: [1, 1.08, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />
              <motion.div
                className="absolute w-96 h-96 lg:w-[28rem] lg:h-[28rem] rounded-full border border-cyan-400/5"
                animate={{ scale: [1, 1.05, 1], opacity: [0.15, 0.3, 0.15] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
              />

              {/* Center hub */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4, type: "spring", stiffness: 200 }}
                className="relative z-10 w-24 h-24 lg:w-32 lg:h-32 bg-gradient-to-br from-blue-500 via-violet-500 to-cyan-500 rounded-3xl flex items-center justify-center shadow-2xl"
                style={{ boxShadow: "0 0 60px rgba(99,102,241,0.3), 0 0 120px rgba(59,130,246,0.15)" }}
              >
                <HeartHandshake size={44} className="text-white lg:hidden" />
                <HeartHandshake size={56} className="text-white hidden lg:block" />
              </motion.div>

              {/* SVG connection lines */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 500 500" aria-hidden="true">
                {serviceItems.map((_, i) => {
                  const angle = (i / serviceItems.length) * 2 * Math.PI - Math.PI / 2;
                  const radius = 185;
                  const endX = 250 + Math.cos(angle) * radius;
                  const endY = 250 + Math.sin(angle) * radius;
                  return (
                    <motion.line key={i} x1="250" y1="250" x2={endX} y2={endY}
                      stroke="url(#lineGrad)" strokeWidth="1.5" strokeDasharray="8 5"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 0.5 }}
                      transition={{ duration: 1.5, delay: 0.6 + i * 0.12 }}
                    />
                  );
                })}
                <defs>
                  <linearGradient id="lineGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="rgba(59,130,246,0.6)" />
                    <stop offset="100%" stopColor="rgba(139,92,246,0.3)" />
                  </linearGradient>
                </defs>
              </svg>

              {/* Orbiting service cards — COLORFUL, LARGE, CLICKABLE */}
              {serviceItems.map((service, i) => {
                const angle = (i / serviceItems.length) * 2 * Math.PI - Math.PI / 2;
                const radius = typeof window !== "undefined" && window.innerWidth < 1024 ? 140 : 185;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: service.delay, type: "spring", stiffness: 200 }}
                    className="absolute z-20"
                    style={{
                      left: `calc(50% + ${x}px - 48px)`,
                      top: `calc(50% + ${y}px - 48px)`,
                    }}
                  >
                    <Link href={service.href}>
                      <motion.div
                        animate={{ y: [0, -10, 0] }}
                        transition={{ duration: 3 + i * 0.4, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
                        whileHover={{ scale: 1.15, y: -5 }}
                        whileTap={{ scale: 0.95 }}
                        className={`w-[96px] h-[96px] lg:w-[108px] lg:h-[108px] bg-gradient-to-br ${service.color} rounded-2xl lg:rounded-3xl flex flex-col items-center justify-center gap-1.5 text-white cursor-pointer border-2 ${service.ring} transition-shadow duration-300`}
                        style={{ boxShadow: `0 8px 32px ${service.glow}, 0 0 60px ${service.glow.replace("0.4", "0.15")}` }}
                      >
                        {service.icon}
                        <span className="text-[11px] lg:text-xs font-bold text-white/90">{service.label}</span>
                      </motion.div>
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Scrolling topics marquee */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.8 }}
            className="mt-16 lg:mt-24 overflow-hidden relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
            <div className="flex animate-marquee whitespace-nowrap">
              {["Printer Setup", "GPS Navigation", "Smart Home", "Alexa Setup", "Wi-Fi Help", "Camera Setup", "Security Systems", "Email Help", "Tech Lessons", "Device Support",
                "Printer Setup", "GPS Navigation", "Smart Home", "Alexa Setup", "Wi-Fi Help", "Camera Setup", "Security Systems", "Email Help", "Tech Lessons", "Device Support",
              ].map((topic, i) => (
                <span key={i} className="mx-6 text-sm font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-gradient-to-r from-blue-500 to-violet-500" />
                  {topic}
                </span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </header>

      {/* ════════════════════════════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════════════════════════════ */}
      <main className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="pt-8 pb-6">
            <ol className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><span className="text-zinc-700 font-bold">Contact Us</span></li>
            </ol>
          </nav>

          {/* ── Character + Welcome Banner ── */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative flex flex-col sm:flex-row items-center gap-4 sm:gap-8 mb-8 py-4"
          >
            {/* Character image — floating */}
            <motion.div
              animate={{ y: [0, -10, 0, -6, 0] }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="relative w-[240px] sm:w-[300px] lg:w-[380px] shrink-0"
            >
              {/* Soft glow behind */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-[80%] h-[80%] rounded-full opacity-20"
                  style={{ background: "radial-gradient(circle, rgba(13,148,136,0.4) 0%, rgba(99,102,241,0.2) 50%, transparent 70%)" }} />
              </div>

              <picture>
                <source media="(max-width: 640px)" srcSet="/contact-character-mobile.webp" type="image/webp" />
                <source media="(max-width: 640px)" srcSet="/contact-character-mobile.png" type="image/png" />
                <source media="(max-width: 1024px)" srcSet="/contact-character-tablet.webp" type="image/webp" />
                <source media="(max-width: 1024px)" srcSet="/contact-character-tablet.png" type="image/png" />
                <source srcSet="/contact-character-desktop.webp" type="image/webp" />
                <Image
                  src="/contact-character-desktop.png"
                  alt="Friendly woman waving hello at the Setwise Digital contact form on her computer"
                  width={900}
                  height={488}
                  priority
                  className="relative z-10 w-full h-auto select-none"
                  style={{ filter: "drop-shadow(0 12px 30px rgba(13,148,136,0.15))" }}
                  draggable={false}
                />
              </picture>

              {/* Sparkles */}
              {[
                { x: "5%", y: "10%", del: 0 },
                { x: "90%", y: "15%", del: 1.5 },
                { x: "85%", y: "75%", del: 0.8 },
                { x: "10%", y: "80%", del: 2 },
              ].map((sp, i) => (
                <motion.div key={i}
                  className="absolute w-[3px] h-[3px] rounded-full bg-blue-400"
                  style={{ left: sp.x, top: sp.y }}
                  animate={{ opacity: [0, 0.7, 0], scale: [0.5, 1.2, 0.5] }}
                  transition={{ duration: 2.5, delay: sp.del, repeat: Infinity, ease: "easeInOut" }}
                />
              ))}
            </motion.div>

            {/* Welcome text + arrow pointing to form */}
            <div className="text-center sm:text-left flex-1">
              <motion.div
                animate={{ x: [0, 5, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-full mb-4"
              >
                <HeartHandshake size={16} className="text-blue-600" />
                <span className="text-blue-700 font-bold text-sm">She&apos;s already reaching out — your turn!</span>
              </motion.div>
              <p className="text-zinc-500 font-medium text-base leading-relaxed max-w-md">
                Fill out the form below and we&apos;ll get back to you within 24 hours. No tech jargon — just friendly help.
              </p>
              <motion.div
                animate={{ y: [0, 6, 0] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                className="mt-4 hidden sm:block"
              >
                <ChevronDown size={24} className="text-blue-400 mx-auto sm:mx-0" />
              </motion.div>
            </div>
          </motion.div>

          {/* ── Two-column: Info + 3D Form ── */}
          <div id="contact-form" className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-start pt-8">
            {/* ═══ Left Side ═══ */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-10"
            >
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5 text-zinc-900 leading-tight">
                  We&apos;re Here<br className="hidden sm:block" />
                  <span className="text-blue-600">to Help You.</span>
                </h2>
                <p className="text-lg text-zinc-500 leading-relaxed font-medium max-w-lg">
                  Whether you have a question about our free tools, want to book a live
                  learning session, or just need a friendly nudge in the right direction —
                  reach out anytime.
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-5">
                {[
                  { icon: <Mail size={28} />, title: "Email Us", desc: "We respond within 24 hours.", link: "support@setwisedigital.com", href: "mailto:support@setwisedigital.com", iconColor: "bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white" },
                  { icon: <MapPin size={28} />, title: "Serving the US & Canada", desc: "Online tech education from coast to coast.", tags: ["United States", "Canada"], iconColor: "bg-emerald-50 text-emerald-600 group-hover:bg-emerald-600 group-hover:text-white" },
                  { icon: <Clock size={28} />, title: "Business Hours", desc: "Monday – Friday, 9 AM – 6 PM EST.", iconColor: "bg-violet-50 text-violet-600 group-hover:bg-violet-600 group-hover:text-white" },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ x: 8 }}
                    className="flex items-start gap-5 p-7 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group">
                    <div className={`w-14 h-14 rounded-xl flex items-center justify-center shrink-0 transition-all duration-400 shadow-sm ${item.iconColor}`}>
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1 tracking-tight text-zinc-900">{item.title}</h3>
                      <p className="text-zinc-500 font-medium mb-3 text-base leading-relaxed">{item.desc}</p>
                      {item.link && (
                        <a href={item.href} className="text-blue-600 font-bold text-lg hover:underline underline-offset-4 decoration-2 inline-flex items-center gap-2">
                          {item.link} <ArrowUpRight size={16} />
                        </a>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-3">
                          {item.tags.map((tag, j) => (
                            <span key={j} className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-200 font-bold text-zinc-700 text-sm">
                              <Globe size={14} className="text-blue-500" />{tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust section */}
              <div className="p-8 rounded-3xl bg-zinc-900 text-white relative overflow-hidden">
                <motion.div animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }}
                  className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-600/20 to-violet-600/20 rounded-full blur-[60px]" aria-hidden="true" />
                <h3 className="text-2xl font-black tracking-tight relative z-10 mb-6">Why Adults 45+ Trust Us</h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[
                    { icon: <Award size={24} className="text-blue-400" />, text: "Since 2016" },
                    { icon: <HeartHandshake size={24} className="text-emerald-400" />, text: "Patient Teaching" },
                    { icon: <UserCheck size={24} className="text-violet-400" />, text: "Plain English" },
                    { icon: <Users size={24} className="text-cyan-400" />, text: "US & Canada" },
                  ].map((item, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl">
                      {item.icon}
                      <span className="font-bold text-sm text-zinc-300">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ═══ Right Side: 3D Elevated Form with Tabs ═══ */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.1 }}
              className="relative"
            >
              {/* 3D shadow layers */}
              <div className="absolute -bottom-3 left-4 right-4 h-full bg-blue-100/50 rounded-3xl -z-20" />
              <div className="absolute -bottom-6 left-8 right-8 h-full bg-blue-50/40 rounded-3xl -z-30" />

              <div className="bg-white p-6 sm:p-10 rounded-3xl border border-zinc-200 shadow-2xl relative overflow-hidden"
                style={{ boxShadow: "0 25px 60px rgba(37,99,235,0.12), 0 8px 24px rgba(0,0,0,0.08)" }}>
                {/* Decorative top gradient bar */}
                <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500" />

                {/* Tab navigation */}
                <div className="flex gap-1 mb-8 bg-zinc-100 rounded-2xl p-1.5">
                  {[
                    { key: "message" as const, icon: <Send size={16} />, label: "Message" },
                    { key: "schedule" as const, icon: <CalendarDays size={16} />, label: "Schedule" },
                    { key: "callback" as const, icon: <Zap size={16} />, label: "Instant Call" },
                  ].map((tab) => (
                    <button
                      key={tab.key}
                      onClick={() => setActiveTab(tab.key)}
                      className={`flex-1 flex items-center justify-center gap-2 py-3.5 rounded-xl font-bold text-sm transition-all min-h-[48px] ${
                        activeTab === tab.key
                          ? tab.key === "callback"
                            ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white shadow-lg shadow-emerald-500/25"
                            : "bg-white text-blue-600 shadow-lg shadow-blue-500/10"
                          : "text-zinc-500 hover:text-zinc-700"
                      }`}
                    >
                      {tab.icon}
                      <span className="hidden sm:inline">{tab.label}</span>
                    </button>
                  ))}
                </div>

                <AnimatePresence mode="wait">
                  {/* ─── TAB 1: Message Form ─── */}
                  {activeTab === "message" && (
                    <motion.div key="message" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                      <AnimatePresence mode="wait">
                        {formStatus === "success" ? (
                          <motion.div key="msg-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                              className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30">
                              <CheckCircle2 size={40} className="text-white" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-zinc-900 mb-3">Message Sent!</h3>
                            <p className="text-zinc-500 font-medium text-lg mb-1">Thanks <span className="font-black text-zinc-900">{form.name}</span>!</p>
                            <p className="text-zinc-400 font-medium">We&apos;ll reply to <span className="font-bold text-zinc-700">{form.email}</span> within 24 hours.</p>
                            <button onClick={() => { setFormStatus("idle"); setForm({ name: "", email: "", phone: "", countryCode: "+1", message: "" }); }}
                              className="mt-8 px-8 py-4 bg-zinc-100 text-zinc-700 rounded-2xl font-bold hover:bg-zinc-200 transition-colors min-h-[52px]">Send Another</button>
                          </motion.div>
                        ) : (
                          <motion.div key="msg-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-zinc-900">Get In <span className="text-blue-600">Touch.</span></h3>
                            <p className="text-zinc-500 font-medium mb-7 text-sm">All fields required. We reply within 24 hours.</p>
                            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                              <div className="space-y-1.5">
                                <label htmlFor="msg-name" className="text-sm font-bold text-zinc-600 ml-1 block">Full Name *</label>
                                <input id="msg-name" type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required autoComplete="name"
                                  className="w-full px-5 py-4 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-lg min-h-[54px]" />
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="msg-email" className="text-sm font-bold text-zinc-600 ml-1 block">Email *</label>
                                <EmailInput value={form.email} onChange={(val) => setForm((f) => ({ ...f, email: val }))} theme="light" placeholder="john@example.com" />
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="msg-phone" className="text-sm font-bold text-zinc-600 ml-1 block">Phone *</label>
                                <PhoneInput value={form.phone} countryCode={form.countryCode} onChange={(val, cc) => setForm((f) => ({ ...f, phone: val, countryCode: cc }))} theme="light" placeholder="555 000 0000" />
                              </div>
                              <div className="space-y-1.5">
                                <label htmlFor="msg-message" className="text-sm font-bold text-zinc-600 ml-1 block">How Can We Help? *</label>
                                <textarea id="msg-message" name="message" value={form.message} onChange={handleChange} rows={3} required placeholder="I need help with my printer setup..."
                                  className="w-full px-5 py-4 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-lg resize-none" />
                              </div>
                              {formStatus === "error" && (
                                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                                  <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                                  <p className="text-red-600 font-medium text-base">{formError}</p>
                                </div>
                              )}
                              <button type="submit" disabled={!isValid || formStatus === "loading"}
                                className={`shine-effect w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] min-h-[60px] ${
                                  isValid && formStatus !== "loading"
                                    ? "bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-500 hover:to-blue-600 shadow-lg shadow-blue-600/25"
                                    : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                                }`}>
                                {formStatus === "loading" ? <><Loader2 size={24} className="animate-spin" />Sending...</> : <><Send size={22} />Submit Message</>}
                              </button>
                              <div className="flex items-center justify-center gap-3 text-zinc-400 font-bold text-sm">
                                <ShieldCheck size={16} className="text-green-500" />
                                Secure & never shared.
                              </div>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* ─── TAB 2: Schedule a Session ─── */}
                  {activeTab === "schedule" && (
                    <motion.div key="schedule" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                      <AnimatePresence mode="wait">
                        {scheduleStatus === "success" ? (
                          <motion.div key="sched-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                              className="w-20 h-20 bg-violet-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-violet-500/30">
                              <CalendarDays size={40} className="text-white" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-zinc-900 mb-3">Session Requested!</h3>
                            <p className="text-zinc-500 font-medium">We&apos;ll confirm your session within 24 hours.</p>
                            <button onClick={() => { setScheduleStatus("idle"); setScheduleForm({ name: "", email: "", phone: "", countryCode: "+1", topic: "", preferredDate: "", preferredTime: "", notes: "" }); }}
                              className="mt-8 px-8 py-4 bg-zinc-100 text-zinc-700 rounded-2xl font-bold hover:bg-zinc-200 transition-colors min-h-[52px]">Book Another</button>
                          </motion.div>
                        ) : (
                          <motion.div key="sched-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-zinc-900">Schedule a <span className="text-violet-600">Session.</span></h3>
                            <p className="text-zinc-500 font-medium mb-7 text-sm">Book a live 1-on-1 learning session with an educator.</p>
                            <form onSubmit={handleScheduleSubmit} className="space-y-5" noValidate>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="text-sm font-bold text-zinc-600 ml-1 block">Full Name *</label>
                                  <input type="text" value={scheduleForm.name} onChange={(e) => setScheduleForm((f) => ({ ...f, name: e.target.value }))} placeholder="John Doe" required autoComplete="name"
                                    className="w-full px-5 py-4 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-medium text-base min-h-[54px]" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-sm font-bold text-zinc-600 ml-1 block">Email *</label>
                                  <EmailInput value={scheduleForm.email} onChange={(val) => setScheduleForm((f) => ({ ...f, email: val }))} theme="light" placeholder="john@example.com" />
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-zinc-600 ml-1 block">Phone *</label>
                                <PhoneInput value={scheduleForm.phone} countryCode={scheduleForm.countryCode} onChange={(val, cc) => setScheduleForm((f) => ({ ...f, phone: val, countryCode: cc }))} theme="light" placeholder="555 000 0000" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-zinc-600 ml-1 block">What do you need help with? *</label>
                                <div className="relative">
                                  <select value={scheduleForm.topic} onChange={(e) => setScheduleForm((f) => ({ ...f, topic: e.target.value }))}
                                    className="w-full px-5 py-4 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-medium text-base appearance-none min-h-[54px]">
                                    <option value="">Select a topic...</option>
                                    <option value="Printer Setup & Help">Printer Setup & Help</option>
                                    <option value="GPS Navigation">GPS Navigation</option>
                                    <option value="Smart Home / Alexa">Smart Home / Alexa</option>
                                    <option value="Security Cameras">Security Cameras</option>
                                    <option value="Wi-Fi & Internet">Wi-Fi & Internet</option>
                                    <option value="General Tech Help">General Tech Help</option>
                                    <option value="Other">Other</option>
                                  </select>
                                  <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                                </div>
                              </div>
                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div className="space-y-1.5">
                                  <label className="text-sm font-bold text-zinc-600 ml-1 block">Preferred Date *</label>
                                  <input type="date" value={scheduleForm.preferredDate} onChange={(e) => setScheduleForm((f) => ({ ...f, preferredDate: e.target.value }))}
                                    min={new Date().toISOString().split("T")[0]}
                                    className="w-full px-5 py-4 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-medium text-base min-h-[54px]" />
                                </div>
                                <div className="space-y-1.5">
                                  <label className="text-sm font-bold text-zinc-600 ml-1 block">Preferred Time *</label>
                                  <div className="relative">
                                    <select value={scheduleForm.preferredTime} onChange={(e) => setScheduleForm((f) => ({ ...f, preferredTime: e.target.value }))}
                                      className="w-full px-5 py-4 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-medium text-base appearance-none min-h-[54px]">
                                      <option value="">Select time...</option>
                                      <option value="9:00 AM - 10:00 AM">9:00 AM – 10:00 AM</option>
                                      <option value="10:00 AM - 11:00 AM">10:00 AM – 11:00 AM</option>
                                      <option value="11:00 AM - 12:00 PM">11:00 AM – 12:00 PM</option>
                                      <option value="12:00 PM - 1:00 PM">12:00 PM – 1:00 PM</option>
                                      <option value="1:00 PM - 2:00 PM">1:00 PM – 2:00 PM</option>
                                      <option value="2:00 PM - 3:00 PM">2:00 PM – 3:00 PM</option>
                                      <option value="3:00 PM - 4:00 PM">3:00 PM – 4:00 PM</option>
                                      <option value="4:00 PM - 5:00 PM">4:00 PM – 5:00 PM</option>
                                      <option value="5:00 PM - 6:00 PM">5:00 PM – 6:00 PM</option>
                                    </select>
                                    <ChevronDown size={18} className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-400 pointer-events-none" />
                                  </div>
                                </div>
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-zinc-600 ml-1 block">Additional Notes</label>
                                <textarea value={scheduleForm.notes} onChange={(e) => setScheduleForm((f) => ({ ...f, notes: e.target.value }))} rows={2} placeholder="Any details you'd like us to know..."
                                  className="w-full px-5 py-4 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-violet-500 focus:bg-white transition-all font-medium text-base resize-none" />
                              </div>
                              {scheduleStatus === "error" && (
                                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                                  <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                                  <p className="text-red-600 font-medium text-base">{scheduleError}</p>
                                </div>
                              )}
                              <button type="submit" disabled={!isScheduleValid || scheduleStatus === "loading"}
                                className={`shine-effect w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] min-h-[60px] ${
                                  isScheduleValid && scheduleStatus !== "loading"
                                    ? "bg-gradient-to-r from-violet-600 to-violet-700 text-white hover:from-violet-500 hover:to-violet-600 shadow-lg shadow-violet-600/25"
                                    : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                                }`}>
                                {scheduleStatus === "loading" ? <><Loader2 size={24} className="animate-spin" />Booking...</> : <><CalendarDays size={22} />Request Session</>}
                              </button>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* ─── TAB 3: Instant Callback ─── */}
                  {activeTab === "callback" && (
                    <motion.div key="callback" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} transition={{ duration: 0.25 }}>
                      <AnimatePresence mode="wait">
                        {callbackStatus === "success" ? (
                          <motion.div key="cb-success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-10">
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                              className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-emerald-500/30">
                              <PhoneCall size={40} className="text-white" />
                            </motion.div>
                            <h3 className="text-2xl font-black text-zinc-900 mb-3">Callback Requested!</h3>
                            <p className="text-zinc-500 font-medium text-lg">An educator will call you at<br /><span className="font-black text-zinc-900">{callbackForm.countryCode} {callbackForm.phone}</span></p>
                            <p className="text-zinc-400 font-medium mt-2">as soon as possible during business hours.</p>
                            <button onClick={() => { setCallbackStatus("idle"); setCallbackForm({ name: "", phone: "", countryCode: "+1" }); }}
                              className="mt-8 px-8 py-4 bg-zinc-100 text-zinc-700 rounded-2xl font-bold hover:bg-zinc-200 transition-colors min-h-[52px]">Done</button>
                          </motion.div>
                        ) : (
                          <motion.div key="cb-form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                            {/* Visual header */}
                            <div className="text-center mb-8">
                              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-cyan-500 rounded-2xl flex items-center justify-center mx-auto mb-5 shadow-lg shadow-emerald-500/20">
                                <Zap size={36} className="text-white" />
                              </div>
                              <h3 className="text-2xl sm:text-3xl font-black tracking-tight text-zinc-900 mb-2">
                                Speak With an <span className="bg-gradient-to-r from-emerald-600 to-cyan-600 bg-clip-text text-transparent">Educator Now</span>
                              </h3>
                              <p className="text-zinc-500 font-medium text-base max-w-sm mx-auto leading-relaxed">
                                Enter your name and phone number — an educator from our team will call you back as quickly as possible.
                              </p>
                            </div>

                            <form onSubmit={handleCallbackSubmit} className="space-y-5" noValidate>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-zinc-600 ml-1 block">Your Name *</label>
                                <input type="text" value={callbackForm.name} onChange={(e) => setCallbackForm((f) => ({ ...f, name: e.target.value }))} placeholder="John Doe" required autoComplete="name"
                                  className="w-full px-5 py-5 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-emerald-500 focus:bg-white transition-all font-medium text-xl min-h-[60px]" />
                              </div>
                              <div className="space-y-1.5">
                                <label className="text-sm font-bold text-zinc-600 ml-1 block">Phone Number *</label>
                                <PhoneInput value={callbackForm.phone} countryCode={callbackForm.countryCode}
                                  onChange={(val, cc) => setCallbackForm((f) => ({ ...f, phone: val, countryCode: cc }))} theme="light" placeholder="555 000 0000" />
                              </div>
                              {callbackStatus === "error" && (
                                <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                                  <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                                  <p className="text-red-600 font-medium text-base">{callbackError}</p>
                                </div>
                              )}
                              <button type="submit" disabled={!isCallbackValid || callbackStatus === "loading"}
                                className={`shine-effect w-full py-6 rounded-2xl font-black text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] min-h-[68px] ${
                                  isCallbackValid && callbackStatus !== "loading"
                                    ? "bg-gradient-to-r from-emerald-500 to-cyan-500 text-white hover:from-emerald-400 hover:to-cyan-400 shadow-xl shadow-emerald-500/30 hover:shadow-emerald-500/40 hover:scale-[1.02]"
                                    : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                                }`}>
                                {callbackStatus === "loading" ? (
                                  <><Loader2 size={26} className="animate-spin" />Requesting...</>
                                ) : (
                                  <><PhoneCall size={24} />Call Me Back Now</>
                                )}
                              </button>
                              <div className="text-center space-y-2">
                                <div className="flex items-center justify-center gap-2 text-zinc-400 font-bold text-sm">
                                  <Clock size={14} className="text-emerald-500" />
                                  Callbacks during business hours (Mon–Fri, 9AM–6PM EST)
                                </div>
                                <p className="text-xs text-zinc-400">
                                  This is <strong>not</strong> tech support — our educators provide learning guidance and educational sessions.
                                </p>
                              </div>
                            </form>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

          {/* ════════════════ PROCESS SECTION ════════════════ */}
          <section className="mt-28 pt-20 border-t border-zinc-100" aria-labelledby="process-heading">
            <h2 id="process-heading" className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900">
              What Happens After You Contact Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                { title: "We Review", desc: "We carefully read your message to understand exactly what you need.", icon: <Search size={28} /> },
                { title: "We Clarify", desc: "If we have any questions, we ask in simple, plain language.", icon: <MessageSquare size={28} /> },
                { title: "We Recommend", desc: "We suggest the best free tool or learning session for your goal.", icon: <BookOpen size={28} /> },
                { title: "You Decide", desc: "No pressure. You choose what feels right at your own pace.", icon: <CheckCircle2 size={28} /> },
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="text-center space-y-4 group p-6">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Step {i + 1}</div>
                  <h3 className="font-extrabold text-xl text-zinc-900">{step.title}</h3>
                  <p className="text-zinc-500 font-medium leading-relaxed text-base">{step.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-xl text-zinc-600 font-bold italic">No commitments. No pressure. Just patient, friendly support.</p>
            </div>
          </section>

          {/* ════════════════ FAQ ════════════════ */}
          <section className="mt-28 max-w-4xl mx-auto" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Do you provide official manufacturer support?", a: "No — we are an independent technology education company. We help you learn how to use the devices you already own through patient, step-by-step guidance." },
                { q: "Do I need to pay to contact you?", a: "No. Sending a message through our contact form is completely free. Our 47 interactive tools are also free to use. Live learning sessions start from $49." },
                { q: "Do you offer remote device repairs?", a: "We do not provide remote repairs or access your devices. Our sessions are structured educational lessons where we teach concepts, tips, and troubleshooting steps." },
                { q: "How does the Instant Callback work?", a: "Simply enter your name and phone number in the 'Instant Call' tab. Your request goes directly to our team and an educator will call you back as soon as possible during business hours." },
                { q: "Do you serve customers in Canada?", a: "Yes! We serve adults 45+ across both the United States and Canada through our online learning sessions and free digital tools." },
                { q: "Who is Setwise Digital best for?", a: "Adults aged 45 and older who prefer simple, patient, jargon-free explanations of everyday technology like printers, GPS navigation, smart home devices, and more." },
              ].map((faq, i) => (
                <div key={i} className={`border rounded-2xl transition-all duration-300 ${activeFaq === i ? "border-blue-500 bg-blue-50/40 shadow-sm" : "border-zinc-200 hover:border-blue-200"}`}>
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full px-7 py-6 text-left flex items-center justify-between gap-4 min-h-[72px]" aria-expanded={activeFaq === i}>
                    <span className="text-lg font-bold text-zinc-800">{faq.q}</span>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${activeFaq === i ? "bg-blue-600 text-white rotate-180" : "bg-zinc-100 text-zinc-500"}`}>
                      <ChevronRight size={18} className="rotate-90" />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeFaq === i ? "max-h-60" : "max-h-0"}`}>
                    <div className="px-7 pb-6 text-zinc-600 leading-relaxed font-medium text-base">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════ INTERNAL LINKS ════════════════ */}
          <section className="mt-28" aria-label="Explore more pages">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { href: "/about", title: "About Setwise Digital", desc: "Learn our story and mission" },
                { href: "/pricing", title: "Pricing & Learning Plans", desc: "View session packages" },
                { href: "/tools", title: "47 Free Tech Tools", desc: "Try our interactive tools" },
              ].map((item, i) => (
                <Link key={i} href={item.href}
                  className="p-7 bg-zinc-50 rounded-2xl group border border-zinc-100 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all min-h-[100px]">
                  <h3 className="font-extrabold text-xl mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-zinc-500 font-bold flex items-center gap-2 text-sm">
                    {item.desc} <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* Disclaimer */}
          <div className="mt-24 text-center p-10 bg-blue-50 rounded-3xl border border-blue-100">
            <p className="text-base text-blue-900 font-medium italic leading-relaxed max-w-4xl mx-auto">
              Setwise Digital provides independent technology learning and educational guidance. We are not affiliated with, endorsed by, or a representative of any printer, GPS, camera, smart home, or technology manufacturer.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
