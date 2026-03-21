"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle2, XCircle, ArrowRight, Zap, BookOpen, UserCheck,
  ShieldCheck, Award, Star, ChevronRight, ChevronDown, Users,
  HeartHandshake, Sparkles, Phone, Mail, Clock, Gift, Shield,
  Monitor, Printer, Navigation, Home as HomeIcon, ArrowUpRight,
  MessageSquare, PhoneCall, BadgeCheck, CircleDollarSign,
  GraduationCap, Repeat, FileText, Video, Calendar,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND COMPONENTS
   ═══════════════════════════════════════════════════════════════ */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div className="absolute w-[140%] h-[600px] -left-[20%] top-[5%] opacity-25"
        style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(139,92,246,0.25) 25%, rgba(236,72,153,0.15) 50%, rgba(34,211,238,0.25) 75%, rgba(59,130,246,0.35) 100%)", filter: "blur(80px)", borderRadius: "50%" }}
        animate={{ x: [0, 80, -40, 60, 0], y: [0, -30, 20, -15, 0], scale: [1, 1.05, 0.98, 1.03, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute w-[100%] h-[350px] left-[10%] top-[40%] opacity-15"
        style={{ background: "linear-gradient(225deg, rgba(34,211,238,0.4) 0%, rgba(99,102,241,0.3) 40%, rgba(250,204,21,0.2) 100%)", filter: "blur(100px)", borderRadius: "40%" }}
        animate={{ x: [0, -50, 30, -60, 0], y: [0, 20, -10, 15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
    </div>
  );
}

function ParticleField() {
  const particles = Array.from({ length: 25 }, (_, i) => ({
    id: i, left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`,
    size: Math.random() * 3 + 1, duration: Math.random() * 15 + 10, delay: Math.random() * 8,
    color: ["rgba(59,130,246,0.5)", "rgba(139,92,246,0.4)", "rgba(34,211,238,0.4)", "rgba(250,204,21,0.3)"][Math.floor(Math.random() * 4)],
  }));
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      {particles.map((p) => (
        <motion.div key={p.id} className="absolute rounded-full"
          style={{ left: p.left, top: p.top, width: p.size, height: p.size, background: p.color }}
          animate={{ y: [0, -30, 10, -20, 0], opacity: [0, 0.7, 0.3, 0.6, 0], scale: [0.5, 1.2, 0.8, 1, 0.5] }}
          transition={{ duration: p.duration, delay: p.delay, repeat: Infinity, ease: "easeInOut" }} />
      ))}
    </div>
  );
}

function AnimatedCounter({ target, suffix = "", prefix = "" }: { target: number; suffix?: string; prefix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const hasAnimated = useRef(false);
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !hasAnimated.current) {
        hasAnimated.current = true;
        let start = 0;
        const step = Math.max(1, Math.floor(target / 35));
        const interval = setInterval(() => { start += step; if (start >= target) { setCount(target); clearInterval(interval); } else setCount(start); }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);
  return <span ref={ref}>{prefix}{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════
   PLAN DATA
   ═══════════════════════════════════════════════════════════════ */
const plans = [
  {
    id: "single",
    name: "Single Lesson",
    price: 49,
    period: "one-time",
    tagline: "Perfect for learning one device or topic in depth.",
    badge: null,
    features: [
      "1-hour live video lesson with an educator",
      "Covers one device or topic of your choice",
      "Plain-English, step-by-step explanations",
      "Lesson summary PDF to keep forever",
      "Email follow-up within 48 hours",
    ],
    notIncluded: [
      "Multiple device coverage",
      "Custom learning roadmap",
    ],
    cta: "Book a Single Lesson",
    ctaIcon: <Video size={20} />,
    accent: "blue",
    gradient: "from-blue-600 to-blue-700",
    lightBg: "bg-blue-50",
    iconColor: "text-blue-600",
    borderColor: "border-blue-200",
    glowColor: "shadow-blue-500/15",
    popular: false,
  },
  {
    id: "skill",
    name: "Skill-Builder Course",
    price: 97,
    period: "one-time",
    tagline: "Build lasting confidence across multiple tech topics.",
    badge: "Most Popular",
    features: [
      "3 live video lesson sessions",
      "Personalised learning roadmap",
      "Covers multiple topics or devices",
      "Progress recap after each lesson",
      "Priority email support",
      "Lesson summary PDFs for all sessions",
    ],
    notIncluded: [
      "Family member coverage",
    ],
    cta: "Start Skill-Builder Course",
    ctaIcon: <GraduationCap size={20} />,
    accent: "violet",
    gradient: "from-violet-600 to-indigo-700",
    lightBg: "bg-violet-50",
    iconColor: "text-violet-600",
    borderColor: "border-violet-300",
    glowColor: "shadow-violet-500/20",
    popular: true,
  },
  {
    id: "family",
    name: "Family Learning Plan",
    price: 147,
    period: "one-time",
    tagline: "Learning for the whole household, across all devices.",
    badge: "Best Value",
    features: [
      "Up to 5 lesson sessions",
      "Covers printers, GPS, Alexa, smart home & more",
      "Personalised tips for every family member",
      "Flexible scheduling to suit everyone",
      "Family progress dashboard",
      "Priority support & follow-ups",
    ],
    notIncluded: [],
    cta: "Get the Family Plan",
    ctaIcon: <Users size={20} />,
    accent: "emerald",
    gradient: "from-emerald-600 to-teal-700",
    lightBg: "bg-emerald-50",
    iconColor: "text-emerald-600",
    borderColor: "border-emerald-200",
    glowColor: "shadow-emerald-500/15",
    popular: false,
  },
];

const comparison = [
  { feature: "47 Free Interactive Tools", free: true, single: true, skill: true, family: true },
  { feature: "TechBridge Learning Hub", free: true, single: true, skill: true, family: true },
  { feature: "Downloadable PDF Guides", free: true, single: true, skill: true, family: true },
  { feature: "Live 1-on-1 Video Sessions", free: false, single: "1 session", skill: "3 sessions", family: "5 sessions" },
  { feature: "Lesson Summary PDF", free: false, single: true, skill: true, family: true },
  { feature: "Custom Learning Roadmap", free: false, single: false, skill: true, family: true },
  { feature: "Multiple Devices Covered", free: false, single: false, skill: true, family: true },
  { feature: "Family Member Access", free: false, single: false, skill: false, family: true },
  { feature: "Priority Email Support", free: false, single: false, skill: true, family: true },
  { feature: "Progress Tracking", free: false, single: false, skill: true, family: true },
];

const testimonials = [
  { name: "Margaret T.", location: "New Jersey, US", text: "The printer lesson saved me hours of frustration. Everything was explained so clearly.", rating: 5 },
  { name: "Robert & Linda K.", location: "Ontario, Canada", text: "The Family Plan was perfect. Our whole household finally understands our smart home.", rating: 5 },
  { name: "David S.", location: "Colorado, US", text: "No rushing, no jargon. The educator was patient and kind. Worth every dollar.", rating: 5 },
];

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */
export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  /* Auto-rotate testimonials */
  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <ScrollToTop />

      {/* ════════════════════════════════════════════════════════════
          HERO HEADER
          ════════════════════════════════════════════════════════════ */}
      <header ref={heroRef} className="relative overflow-hidden bg-zinc-950 min-h-[75vh] lg:min-h-[82vh] flex items-center">
        <AuroraBackground />
        <ParticleField />
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFDFD] to-transparent z-10" />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24 lg:pt-40 lg:pb-28">
          <div className="text-center max-w-4xl mx-auto">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-400/25 text-emerald-300 text-sm font-bold tracking-wide">
                <BadgeCheck size={16} className="text-emerald-400" />
                No Subscriptions — No Hidden Fees — Pay Once
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 text-[2.75rem] sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
              Simple, Honest{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 via-violet-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">Pricing.</span>
                <motion.span className="absolute -bottom-2 left-0 h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-violet-500 to-cyan-500"
                  initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }} />
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 text-xl sm:text-2xl text-zinc-400 leading-relaxed font-medium max-w-2xl mx-auto">
              Live 1-on-1 video lessons with a real educator. <strong className="text-white">No monthly fees.</strong>{" "}
              <strong className="text-white">No contracts.</strong> Pay only for what you need.
            </motion.p>

            {/* Price anchors */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-12 flex flex-wrap justify-center gap-6 sm:gap-10">
              {[
                { price: "$49", label: "Single Lesson", color: "text-blue-400" },
                { price: "$97", label: "Skill-Builder", color: "text-violet-400" },
                { price: "$147", label: "Family Plan", color: "text-emerald-400" },
              ].map((item, i) => (
                <a href="#plans" key={i} className="text-center group cursor-pointer">
                  <div className={`text-3xl sm:text-4xl font-black ${item.color} group-hover:scale-110 transition-transform`}>{item.price}</div>
                  <div className="text-sm text-zinc-500 font-bold mt-1">{item.label}</div>
                </a>
              ))}
            </motion.div>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }}
              className="mt-10">
              <a href="#plans" className="inline-flex items-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-blue-600/25 min-h-[60px]">
                Choose Your Plan <ArrowRight size={22} className="group-hover:translate-x-1 transition-transform" />
              </a>
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* ════════════════════════════════════════════════════════════
          MAIN CONTENT
          ════════════════════════════════════════════════════════════ */}
      <main className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Breadcrumb */}
          <nav aria-label="Breadcrumb" className="pt-8 pb-4">
            <ol className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><span className="text-zinc-700 font-bold">Pricing</span></li>
            </ol>
          </nav>

          {/* ════════ FREE TIER HIGHLIGHT ════════ */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-8 mb-20 bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-[-10%] right-[-10%] w-[60%] h-[60%] bg-blue-600/15 rounded-full blur-[100px]" aria-hidden="true" />
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div>
                <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-emerald-500/15 border border-emerald-500/25 text-emerald-400 font-bold text-sm mb-6">
                  <Gift size={14} /> Always Free — No Account Needed
                </span>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">
                  Start With <span className="text-blue-400">47 Free</span> Interactive Tools
                </h2>
                <p className="text-lg text-zinc-400 font-medium leading-relaxed mb-8">
                  No sign-up. No email. No credit card. Explore printer troubleshooters, GPS guides, smart home planners, and more — completely free, forever.
                </p>
                <Link href="/tools" className="inline-flex items-center gap-3 px-7 py-4 bg-white text-zinc-900 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all hover:scale-[1.03] active:scale-[0.98] min-h-[56px]">
                  <Sparkles size={20} className="text-blue-600" />
                  Explore Free Tools
                  <ArrowRight size={18} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {[
                  { icon: <Zap className="text-yellow-400" size={28} />, text: "TechBridge Tools" },
                  { icon: <BookOpen className="text-blue-400" size={28} />, text: "Step-by-Step PDFs" },
                  { icon: <ShieldCheck className="text-green-400" size={28} />, text: "Helpful Updates" },
                  { icon: <UserCheck className="text-violet-400" size={28} />, text: "Self-Paced Learning" },
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ scale: 1.05, y: -3 }}
                    className="flex flex-col gap-3 bg-white/5 backdrop-blur-sm p-6 rounded-2xl border border-white/10">
                    <div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center">{item.icon}</div>
                    <span className="font-bold text-base text-zinc-200">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ════════ PRICING CARDS ════════ */}
          <section id="plans" className="scroll-mt-24" aria-labelledby="plans-heading">
            <div className="text-center mb-14">
              <h2 id="plans-heading" className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-4">Choose Your Learning Plan</h2>
              <p className="text-lg text-zinc-500 font-medium max-w-2xl mx-auto">Every plan includes live video sessions with a patient, real educator. No rushing, no jargon, no pressure.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {plans.map((plan, i) => (
                <motion.div key={plan.id}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  className="relative"
                >
                  {/* Popular badge */}
                  {plan.badge && (
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 z-10 px-5 py-1.5 rounded-full font-bold text-sm text-white shadow-lg ${
                      plan.popular ? "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-500/30" : "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30"
                    }`}>
                      <span className="flex items-center gap-1.5">
                        {plan.popular ? <Star size={14} /> : <Award size={14} />}
                        {plan.badge}
                      </span>
                    </div>
                  )}

                  <motion.div
                    whileHover={{ y: -8, scale: 1.01 }}
                    className={`h-full bg-white rounded-3xl p-8 sm:p-10 flex flex-col border-2 transition-all duration-300 ${
                      plan.popular
                        ? `${plan.borderColor} shadow-xl ${plan.glowColor} ring-1 ring-violet-200/50`
                        : `border-zinc-200 shadow-lg hover:${plan.borderColor} hover:${plan.glowColor}`
                    }`}
                    style={plan.popular ? { boxShadow: "0 20px 60px rgba(139,92,246,0.15), 0 8px 24px rgba(0,0,0,0.06)" } : undefined}
                  >
                    {/* Plan header */}
                    <div className="mb-6">
                      <h3 className="text-2xl font-black tracking-tight text-zinc-900 mb-2">{plan.name}</h3>
                      <p className="text-zinc-500 font-medium text-base leading-relaxed">{plan.tagline}</p>
                    </div>

                    {/* Price */}
                    <div className="mb-8 flex items-baseline gap-2">
                      <span className={`text-5xl sm:text-6xl font-black tracking-tight ${plan.iconColor}`}>
                        ${plan.price}
                      </span>
                      <span className="text-zinc-400 font-bold text-base">one-time</span>
                    </div>

                    {/* CTA — Large, clear, unmistakable */}
                    <Link href="/contact"
                      className={`shine-effect w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] hover:scale-[1.02] min-h-[64px] mb-8 text-white bg-gradient-to-r ${plan.gradient} shadow-lg ${plan.glowColor}`}>
                      {plan.ctaIcon}
                      {plan.cta}
                    </Link>

                    {/* Features */}
                    <div className="space-y-4 flex-grow">
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">What&apos;s included:</p>
                      {plan.features.map((feat, j) => (
                        <div key={j} className="flex items-start gap-3">
                          <CheckCircle2 size={20} className={`${plan.iconColor} shrink-0 mt-0.5`} />
                          <span className="font-medium text-base text-zinc-700 leading-snug">{feat}</span>
                        </div>
                      ))}
                      {plan.notIncluded.map((feat, j) => (
                        <div key={`no-${j}`} className="flex items-start gap-3 opacity-40">
                          <XCircle size={20} className="text-zinc-400 shrink-0 mt-0.5" />
                          <span className="font-medium text-base text-zinc-400 leading-snug line-through">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            {/* Reassurance strip */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-zinc-500 font-bold">
              {[
                { icon: <ShieldCheck size={18} className="text-green-500" />, text: "Satisfaction Guaranteed" },
                { icon: <Repeat size={18} className="text-blue-500" />, text: "No Subscriptions" },
                { icon: <CircleDollarSign size={18} className="text-emerald-500" />, text: "No Hidden Fees" },
                { icon: <Clock size={18} className="text-violet-500" />, text: "Flexible Scheduling" },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-2">{item.icon}{item.text}</span>
              ))}
            </div>
          </section>

          {/* ════════ WHY WE PRICE THIS WAY ════════ */}
          <section className="mt-28" aria-labelledby="why-heading">
            <h2 id="why-heading" className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900">
              Why Our Pricing Works for You
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: <CircleDollarSign size={32} className="text-blue-600" />, title: "Pay Once, Learn Forever", desc: "No monthly bills to worry about. Buy a session, get your lesson, keep your summary PDF forever. Simple." },
                { icon: <HeartHandshake size={32} className="text-violet-600" />, title: "Patient & Personal", desc: "Every session is 1-on-1 with a real educator. No group classes, no recorded videos. Just patient, live help." },
                { icon: <Shield size={32} className="text-emerald-600" />, title: "Honest & Transparent", desc: "The price you see is the price you pay. No upsells, no hidden upgrades, no subscription tricks." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">
                    {item.icon}
                  </div>
                  <h3 className="font-extrabold text-xl mb-3 text-zinc-900">{item.title}</h3>
                  <p className="text-zinc-500 font-medium leading-relaxed text-base">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ════════ COMPARISON TABLE ════════ */}
          <section className="mt-28" aria-labelledby="compare-heading">
            <h2 id="compare-heading" className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900">
              Compare All Plans at a Glance
            </h2>
            <div className="overflow-x-auto bg-white rounded-3xl border border-zinc-200 shadow-xl">
              <table className="w-full min-w-[700px]">
                <thead>
                  <tr className="border-b-2 border-zinc-100">
                    <th className="py-6 px-6 text-left font-bold text-zinc-400 uppercase tracking-widest text-xs w-[30%]">Feature</th>
                    <th className="py-6 px-4 text-center font-bold text-sm">
                      <div className="text-emerald-600">Free Tools</div>
                      <div className="text-zinc-400 text-xs font-medium mt-1">$0 forever</div>
                    </th>
                    <th className="py-6 px-4 text-center font-bold text-sm">
                      <div className="text-blue-600">Single Lesson</div>
                      <div className="text-zinc-400 text-xs font-medium mt-1">$49</div>
                    </th>
                    <th className="py-6 px-4 text-center font-bold text-sm relative">
                      <div className="absolute -top-0.5 left-0 right-0 h-1 bg-gradient-to-r from-violet-500 to-indigo-500 rounded-t-lg" />
                      <div className="text-violet-600">Skill-Builder</div>
                      <div className="text-zinc-400 text-xs font-medium mt-1">$97</div>
                    </th>
                    <th className="py-6 px-4 text-center font-bold text-sm">
                      <div className="text-emerald-600">Family Plan</div>
                      <div className="text-zinc-400 text-xs font-medium mt-1">$147</div>
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-zinc-50">
                  {comparison.map((row, i) => (
                    <tr key={i} className="hover:bg-zinc-50/50 transition-colors">
                      <td className="py-5 px-6 font-bold text-zinc-700 text-base">{row.feature}</td>
                      {(["free", "single", "skill", "family"] as const).map((col) => {
                        const val = row[col];
                        return (
                          <td key={col} className="py-5 px-4 text-center">
                            {typeof val === "boolean" ? (
                              val ? <CheckCircle2 size={22} className="mx-auto text-green-500" /> : <XCircle size={22} className="mx-auto text-zinc-200" />
                            ) : (
                              <span className="font-bold text-zinc-600 text-sm">{val}</span>
                            )}
                          </td>
                        );
                      })}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {/* Table CTA */}
            <div className="mt-8 text-center">
              <Link href="/contact" className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-indigo-600 text-white rounded-2xl font-bold text-lg hover:from-violet-500 hover:to-indigo-500 transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-violet-500/20 min-h-[56px]">
                Get Started Today <ArrowRight size={20} />
              </Link>
            </div>
          </section>

          {/* ════════ TESTIMONIALS ════════ */}
          <section className="mt-28" aria-labelledby="reviews-heading">
            <h2 id="reviews-heading" className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900">
              What Our Learners Say
            </h2>
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div key={activeTestimonial}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-lg text-center">
                  {/* Stars */}
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, j) => (
                      <Star key={j} size={24} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xl sm:text-2xl text-zinc-700 font-medium leading-relaxed italic mb-8">
                    &ldquo;{testimonials[activeTestimonial].text}&rdquo;
                  </p>
                  <div>
                    <div className="font-bold text-lg text-zinc-900">{testimonials[activeTestimonial].name}</div>
                    <div className="text-zinc-400 font-medium text-sm">{testimonials[activeTestimonial].location}</div>
                  </div>
                </motion.div>
              </AnimatePresence>
              {/* Dots */}
              <div className="flex items-center justify-center gap-3 mt-6">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all ${i === activeTestimonial ? "bg-blue-600 scale-125" : "bg-zinc-300 hover:bg-zinc-400"}`}
                    aria-label={`View testimonial ${i + 1}`} />
                ))}
              </div>
            </div>
          </section>

          {/* ════════ SATISFACTION GUARANTEE ════════ */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-28 bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl p-8 sm:p-12 lg:p-16 border border-blue-100 text-center relative overflow-hidden">
            <div className="absolute top-4 right-4 w-32 h-32 bg-blue-500/5 rounded-full blur-[50px]" aria-hidden="true" />
            <div className="relative z-10 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-8">
                <ShieldCheck size={40} className="text-blue-600" />
              </div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-5 text-zinc-900">
                100% Satisfaction Guarantee
              </h2>
              <p className="text-lg text-zinc-600 font-medium leading-relaxed mb-8">
                If your first lesson session doesn&apos;t meet your expectations, contact us within 24 hours and we&apos;ll give you a full refund. No questions asked. We believe in our educators — and we want you to feel confident in your purchase.
              </p>
              <Link href="/contact"
                className="inline-flex items-center gap-3 px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-blue-500/20 min-h-[60px]">
                <PhoneCall size={22} />
                Book Your First Session
              </Link>
            </div>
          </motion.section>

          {/* ════════ FAQ ════════ */}
          <section className="mt-28 max-w-4xl mx-auto" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900">
              Pricing Questions Answered
            </h2>
            <div className="space-y-4">
              {[
                { q: "Are there any monthly fees or subscriptions?", a: "Absolutely not. Setwise Digital has zero subscriptions, zero recurring fees, and zero hidden charges. You pay once per plan, and that's it. Our 47 free tools are always free." },
                { q: "What's the difference between the plans?", a: "The Single Lesson ($49) covers one topic in one session. The Skill-Builder ($97) gives you 3 sessions with a custom roadmap to build deeper confidence. The Family Plan ($147) gives you 5 sessions so your whole household can learn together across multiple topics." },
                { q: "Can I upgrade from a Single Lesson to Skill-Builder later?", a: "Yes! If you start with a Single Lesson and want to continue, just contact us. We'll credit the difference toward your Skill-Builder or Family Plan." },
                { q: "What if I'm not satisfied with my session?", a: "We offer a 100% satisfaction guarantee. If your first session doesn't meet expectations, contact us within 24 hours for a full refund. No questions asked." },
                { q: "How do the sessions work?", a: "Sessions are live 1-on-1 video calls with one of our educators. You pick the topic, we guide you step by step. Afterward, you receive a PDF summary of everything covered." },
                { q: "Do you serve customers in both the US and Canada?", a: "Yes! We serve adults 45+ across both the United States and Canada. All sessions are conducted via video call, so location doesn't matter." },
                { q: "Are the 47 free tools really free?", a: "100% free. No account, no email address, no credit card needed. You can use all 47 tools right now at setwisedigital.com/tools." },
              ].map((faq, i) => (
                <div key={i} className={`border rounded-2xl transition-all duration-300 ${activeFaq === i ? "border-blue-500 bg-blue-50/40 shadow-sm" : "border-zinc-200 hover:border-blue-200"}`}>
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-7 py-6 text-left flex items-center justify-between gap-4 min-h-[72px]" aria-expanded={activeFaq === i}>
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

          {/* ════════ FINAL CTA ════════ */}
          <section className="mt-28 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 text-zinc-900">Ready to Get Started?</h2>
            <p className="text-lg text-zinc-500 font-medium mb-10 max-w-xl mx-auto">
              Pick a plan that works for you, or try our 47 free tools first. No pressure, no rush — just friendly tech help when you need it.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-blue-600/25 min-h-[60px]">
                <PhoneCall size={22} /> Book a Lesson
              </Link>
              <Link href="/tools" className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] min-h-[60px]">
                <Sparkles size={22} className="text-blue-600" /> Try Free Tools First
              </Link>
            </div>
          </section>

          {/* ════════ INTERNAL LINKS ════════ */}
          <section className="mt-28" aria-label="Explore more pages">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { href: "/about", title: "About Setwise Digital", desc: "Learn our story" },
                { href: "/contact", title: "Contact Us", desc: "Get in touch" },
                { href: "/tools", title: "47 Free Tech Tools", desc: "Try them free" },
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
