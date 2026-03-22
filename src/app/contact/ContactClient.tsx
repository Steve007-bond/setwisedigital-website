"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  AnimatePresence,
} from "framer-motion";
import {
  ArrowRight,
  Zap,
  Shield,
  Globe,
  Printer,
  Navigation,
  Home as HomeIcon,
  Camera,
  CheckCircle2,
  BookOpen,
  Smartphone,
  ChevronRight,
  ChevronDown,
  UserCheck,
  Award,
  Sparkles,
  Star,
  TrendingUp,
  Clock,
  Users,
  Play,
  MousePointer2,
  Lightbulb,
  ArrowUpRight,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import ScrollToTop from "@/components/ScrollToTop";

/* ═══════════════════════════════════════════════════════════════════════════
   CONSTANTS & DATA
   ═══════════════════════════════════════════════════════════════════════════ */

const HERO_PHRASES = [
  "Printer Setup",
  "GPS Updates",
  "Smart Home",
  "Alexa Commands",
  "Camera Tips",
  "Online Safety",
  "Wi-Fi Printing",
  "Voice Control",
];

const TOPICS = [
  {
    Icon: Printer,
    title: "Printer Setup",
    desc: "Wi-Fi printing, paper jams, ink saving — all brands covered.",
    points: ["Wi-Fi Setup", "Paper Jams", "Save Ink"],
    href: "/techbridge/printers",
    gradient: "from-blue-600 to-cyan-500",
    shadow: "shadow-blue-600/20",
    emoji: "🖨️",
  },
  {
    Icon: Navigation,
    title: "GPS Updates",
    desc: "Keep Garmin & TomTom maps current for stress-free travel.",
    points: ["Map Updates", "Route Tips", "Syncing"],
    href: "/techbridge/gps",
    gradient: "from-emerald-500 to-teal-500",
    shadow: "shadow-emerald-600/20",
    emoji: "🗺️",
  },
  {
    Icon: HomeIcon,
    title: "Smart Home",
    desc: "Set up Alexa, Google Nest, smart bulbs & routines easily.",
    points: ["Alexa Tips", "Google Nest", "Routines"],
    href: "/techbridge/smart-home",
    gradient: "from-amber-500 to-orange-500",
    shadow: "shadow-amber-600/20",
    emoji: "🏠",
  },
  {
    Icon: Camera,
    title: "Camera Basics",
    desc: "Firmware updates, settings explained, sharper photos.",
    points: ["Firmware", "Settings", "Better Photos"],
    href: "/techbridge/camera",
    gradient: "from-rose-500 to-pink-500",
    shadow: "shadow-rose-600/20",
    emoji: "📷",
  },
  {
    Icon: Smartphone,
    title: "Alexa Refresh",
    desc: "50+ commands, daily routines, music & news setup.",
    points: ["Updates", "Commands", "Daily Tasks"],
    href: "/techbridge/alexa",
    gradient: "from-cyan-500 to-blue-500",
    shadow: "shadow-cyan-600/20",
    emoji: "🔊",
  },
  {
    Icon: Shield,
    title: "Security & Basics",
    desc: "Antivirus, password safety, scam detection — free tools.",
    points: ["Antivirus", "Passwords", "Scams"],
    href: "/techbridge/security",
    gradient: "from-red-500 to-rose-500",
    shadow: "shadow-red-600/20",
    emoji: "🔒",
  },
];

const TOOLS = [
  {
    emoji: "🔧",
    title: "Printer Stopped Working?",
    desc: "Step-by-step fix for offline, blank pages, paper jams.",
    href: "/tools/my-printer-stopped-working",
    gradient: "from-orange-500 to-amber-400",
  },
  {
    emoji: "📱",
    title: "Print from Your Phone",
    desc: "iPhone, Android, Windows or Mac — exact steps.",
    href: "/tools/how-to-print-from-phone-or-laptop",
    gradient: "from-sky-500 to-cyan-400",
  },
  {
    emoji: "⚖️",
    title: "HP vs Canon vs Epson",
    desc: "3-question quiz picks the best brand for you.",
    href: "/tools/hp-vs-canon-vs-epson-vs-brother",
    gradient: "from-violet-500 to-fuchsia-400",
  },
  {
    emoji: "🗺️",
    title: "Road Trip GPS Check",
    desc: "5-step GPS readiness checklist before your trip.",
    href: "/tools/road-trip-checker",
    gradient: "from-green-500 to-emerald-400",
  },
];

const PACKAGES = [
  {
    title: "Printer Learning",
    sub: "10 min a day",
    bonus: "Tips to save time & money on printing",
    features: ["Wi-Fi printing explained", "Maintenance basics"],
    gradient: "from-blue-600 to-blue-800",
    Icon: Printer,
    href: "/techbridge/printers",
  },
  {
    title: "GPS Travel",
    sub: "Smooth travels ahead",
    bonus: "Hidden map features most people miss",
    features: ["Garmin & car GPS systems", "How navigation works"],
    gradient: "from-emerald-600 to-teal-700",
    Icon: Navigation,
    href: "/techbridge/gps",
  },
  {
    title: "Smart Home Starter",
    sub: "Voice-controlled life",
    bonus: "Create routines that suit your lifestyle",
    features: ["Alexa & Google Nest setup", "Voice commands explained"],
    gradient: "from-violet-600 to-purple-700",
    Icon: HomeIcon,
    href: "/techbridge/smart-home",
  },
  {
    title: "Camera Essentials",
    sub: "Clearer, sharper photos",
    bonus: "Simple tips for sharper photos every time",
    features: ["Camera firmware updates", "Settings explained"],
    gradient: "from-zinc-800 to-zinc-900",
    Icon: Camera,
    href: "/techbridge/camera",
  },
];

const FAQS = [
  {
    q: "Do I need prior technical knowledge?",
    a: "Not at all. Our guides are written in plain English and designed for all levels — especially those who prefer clear, non-technical explanations.",
  },
  {
    q: "Can I use these guides at my own pace?",
    a: "Yes. Every guide is step-by-step, allowing you to pause, repeat, and return whenever you have a few minutes to spare.",
  },
  {
    q: "Do you cover different brands?",
    a: "Yes. We include instructions for popular devices like HP, Canon, Epson, Garmin, Sony, and many others.",
  },
  {
    q: "What if I just need a quick answer?",
    a: "That's what our 47 free interactive tools are for — pick your device, answer 2–3 questions, and get exact steps for your situation.",
  },
  {
    q: "Is Setwise Digital affiliated with HP, Canon, or Garmin?",
    a: "No. We are an independent tech literacy platform, not affiliated with any device manufacturer.",
  },
];

/* ═══════════════════════════════════════════════════════════════════════════
   UTILITY COMPONENTS
   ═══════════════════════════════════════════════════════════════════════════ */

function FadeUp({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

/* Animated counter */
function useCounter(end: number, duration = 2000, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const p = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor((1 - Math.pow(1 - p, 3)) * end));
      if (p < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [end, duration, start]);
  return count;
}

function StatCard({
  value,
  suffix,
  label,
}: {
  value: number;
  suffix: string;
  label: string;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const count = useCounter(value, 1600, inView);
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="text-center p-6"
    >
      <div className="text-4xl md:text-5xl font-black tracking-tighter text-white tabular-nums mb-1">
        {count}
        {suffix}
      </div>
      <div className="text-zinc-500 font-semibold text-sm">{label}</div>
    </motion.div>
  );
}

/* Rotating typewriter for hero */
function RotatingText({ items }: { items: string[] }) {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx((i) => (i + 1) % items.length), 2800);
    return () => clearInterval(t);
  }, [items.length]);
  return (
    <span className="relative inline-block h-[1.15em] overflow-hidden align-bottom min-w-[280px]">
      <AnimatePresence mode="wait">
        <motion.span
          key={idx}
          initial={{ y: 40, opacity: 0, rotateX: -45 }}
          animate={{ y: 0, opacity: 1, rotateX: 0 }}
          exit={{ y: -40, opacity: 0, rotateX: 45 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute left-0 bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent whitespace-nowrap"
        >
          {items[idx]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

/* SVG floating icons in the hero */
function FloatingIcons() {
  const icons = [
    { Icon: Printer, x: "8%", y: "18%", delay: 0, size: 22 },
    { Icon: Navigation, x: "85%", y: "14%", delay: 0.4, size: 20 },
    { Icon: HomeIcon, x: "5%", y: "72%", delay: 0.8, size: 18 },
    { Icon: Camera, x: "90%", y: "68%", delay: 1.2, size: 20 },
    { Icon: Shield, x: "78%", y: "42%", delay: 0.6, size: 16 },
    { Icon: Smartphone, x: "14%", y: "48%", delay: 1.0, size: 16 },
  ];
  return (
    <>
      {icons.map((item, i) => (
        <motion.div
          key={i}
          className="absolute pointer-events-none"
          style={{ left: item.x, top: item.y }}
          animate={{ y: [0, -14, 0], rotate: [0, 5, -5, 0] }}
          transition={{
            duration: 5 + i * 0.6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: item.delay,
          }}
        >
          <div className="w-12 h-12 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center justify-center text-blue-300/60 shadow-lg">
            <item.Icon size={item.size} />
          </div>
        </motion.div>
      ))}
    </>
  );
}

/* Orbital rings SVG for hero visual */
function OrbitalVisual() {
  return (
    <div className="relative w-full aspect-square max-w-[500px] mx-auto">
      {/* Rings */}
      {[180, 250, 320].map((r, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full border border-blue-500/15"
          style={{
            width: r,
            height: r,
            top: `calc(50% - ${r / 2}px)`,
            left: `calc(50% - ${r / 2}px)`,
          }}
          animate={{ rotate: i % 2 === 0 ? 360 : -360 }}
          transition={{
            duration: 25 + i * 10,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}

      {/* Center logo */}
      <motion.div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-10"
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      >
        <div className="w-28 h-28 rounded-[2rem] bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-600/40 border border-blue-400/20">
          <span className="text-white font-black text-5xl italic">S</span>
        </div>
      </motion.div>

      {/* Orbiting dots */}
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <motion.div
          key={`dot-${i}`}
          className="absolute w-3 h-3 rounded-full bg-blue-400/50"
          style={{
            top: `calc(50% - 6px)`,
            left: `calc(50% - 6px)`,
          }}
          animate={{
            x: Math.cos((i * Math.PI) / 3) * 160,
            y: Math.sin((i * Math.PI) / 3) * 160,
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "linear",
            delay: i * 1.3,
          }}
        />
      ))}

      {/* Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
    </div>
  );
}

/* ═══════════════════════════════════════════════════════════════════════════
   MAIN PAGE
   ═══════════════════════════════════════════════════════════════════════════ */

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const heroRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 150]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0]);

  return (
    <div className="min-h-screen bg-[#060a12] text-white font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <Navbar />
      <ScrollToTop />

      {/* ═══════════════════════════════════════════════════════════════
         HERO
         ═══════════════════════════════════════════════════════════════ */}
      <header
        ref={heroRef}
        className="relative min-h-screen flex items-center overflow-hidden"
      >
        {/* Deep background */}
        <div className="absolute inset-0 bg-[#060a12]" />
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, rgba(100,180,255,0.4) 1px, transparent 0)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Gradient orbs */}
        <motion.div
          style={{ y: heroY }}
          className="absolute top-[-10%] right-[-10%] w-[700px] h-[700px] bg-blue-600/12 rounded-full blur-[140px] pointer-events-none"
        />
        <motion.div
          className="absolute bottom-[-15%] left-[-10%] w-[500px] h-[500px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none"
        />
        <div className="absolute top-[30%] left-[50%] w-[300px] h-[300px] bg-cyan-500/6 rounded-full blur-[100px] pointer-events-none" />

        {/* Floating device icons */}
        <div className="absolute inset-0 hidden lg:block">
          <FloatingIcons />
        </div>

        {/* Content */}
        <motion.div
          style={{ opacity: heroOpacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pt-24 pb-16"
        >
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            {/* Left — copy */}
            <div>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-xs font-black uppercase tracking-[0.25em] mb-8"
              >
                <Sparkles
                  size={13}
                  className="text-yellow-400 fill-yellow-400"
                />
                <span className="text-blue-300">
                  Experience Technology Differently
                </span>
              </motion.div>

              <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.18, duration: 0.8 }}
                className="font-black tracking-[-0.04em] leading-[0.88] mb-8"
                style={{ fontSize: "clamp(3.2rem, 7vw, 5.5rem)" }}
              >
                Learn{" "}
                <RotatingText items={HERO_PHRASES} />
                <br />
                <span className="text-white/90">In Plain English.</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-lg md:text-xl text-zinc-400 font-medium leading-relaxed mb-10 max-w-lg"
              >
                We teach everyday technology at your own pace — no jargon, no
                pressure.{" "}
                <span className="text-white font-bold">Just learning.</span>
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col sm:flex-row gap-4 mb-10"
              >
                <Link
                  href="/techbridge"
                  className="group px-8 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-black text-lg flex items-center justify-center gap-3 shadow-xl shadow-blue-600/30 hover:shadow-blue-500/50 hover:-translate-y-0.5 transition-all"
                >
                  Start Learning Now
                  <ArrowRight
                    size={20}
                    className="group-hover:translate-x-1.5 transition-transform"
                  />
                </Link>
                <Link
                  href="/pricing"
                  className="group flex items-center gap-3 px-6 py-5 bg-white/[0.06] border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-all"
                >
                  <Zap size={18} className="text-blue-400" />
                  View Pricing
                </Link>
                <Link
                  href="/common-tech-problems"
                  className="group flex items-center gap-3 px-6 py-5 bg-white/[0.06] border border-white/10 rounded-2xl font-black text-lg hover:bg-white/10 transition-all"
                >
                  <CheckCircle2 size={18} className="text-emerald-400" />
                  Fix Issues
                </Link>
              </motion.div>

              {/* Trust row */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.55 }}
                className="flex flex-wrap items-center gap-6"
              >
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star
                        key={s}
                        size={14}
                        className="text-amber-400 fill-amber-400"
                      />
                    ))}
                  </div>
                  <span className="text-zinc-500 text-sm font-bold">
                    2,400+ learners
                  </span>
                </div>
                <span className="text-zinc-700">|</span>
                <div className="flex items-center gap-1.5 text-emerald-400 text-sm font-bold">
                  <Shield size={13} />
                  100% Free Tools
                </div>
                <span className="text-zinc-700">|</span>
                <div className="flex items-center gap-1.5 text-zinc-400 text-sm font-bold">
                  <BookOpen size={13} className="text-blue-400" />
                  Plain English
                </div>
              </motion.div>
            </div>

            {/* Right — orbital visual */}
            <motion.div
              initial={{ opacity: 0, scale: 0.85 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, duration: 1 }}
              className="hidden lg:block"
            >
              <OrbitalVisual />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-zinc-600 text-[10px] font-black uppercase tracking-[0.3em]">
            Scroll
          </span>
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6 }}
            className="w-px h-8 bg-gradient-to-b from-blue-400/40 to-transparent"
          />
        </motion.div>
      </header>

      {/* ═══════════════════════════════════════════════════════════════
         STATS BAR
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-16 bg-zinc-950/80 border-y border-white/5 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/5 via-transparent to-cyan-600/5" />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <StatCard value={47} suffix="" label="Free interactive tools" />
            <StatCard value={90} suffix="%" label="Printer issues fixed at home" />
            <StatCard value={72} suffix="%" label="GPS users never update maps" />
            <StatCard value={89} suffix="%" label="Prefer plain-English guides" />
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         WHY CHOOSE US
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#060a12] relative overflow-hidden">
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(100,180,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(100,180,255,1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-8">
                  Our Mission
                </div>
              </FadeUp>
              <FadeUp delay={0.05}>
                <h2
                  className="font-black tracking-[-0.03em] leading-[1.05] mb-8"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
                >
                  Why Choose
                  <br />
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Setwise Digital
                  </span>
                </h2>
              </FadeUp>
              <FadeUp delay={0.1}>
                <p className="text-lg text-zinc-400 mb-10 leading-relaxed font-medium">
                  People search daily for{" "}
                  <em className="text-white font-bold not-italic">
                    &quot;how do I set up my printer&quot;
                  </em>{" "}
                  or{" "}
                  <em className="text-white font-bold not-italic">
                    &quot;how do I use Alexa.&quot;
                  </em>{" "}
                  The answers are buried in jargon.{" "}
                  <strong className="text-white">We make it simple.</strong>
                </p>
              </FadeUp>

              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <Lightbulb size={18} />,
                    title: "Clarity",
                    text: "Plain English step-by-step guides",
                  },
                  {
                    icon: <TrendingUp size={18} />,
                    title: "Confidence",
                    text: "We teach the 'why', not just 'how'",
                  },
                  {
                    icon: <Users size={18} />,
                    title: "Community",
                    text: "Built for real users, by real people",
                  },
                  {
                    icon: <Play size={18} />,
                    title: "Coaching",
                    text: "Live video lessons with real educators",
                  },
                ].map((p, i) => (
                  <FadeUp key={i} delay={0.12 + i * 0.06}>
                    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/8 hover:border-blue-500/30 hover:bg-white/[0.06] transition-all group cursor-default">
                      <div className="w-9 h-9 rounded-xl bg-blue-600/15 flex items-center justify-center text-blue-400 mb-3 group-hover:bg-blue-600/25 transition-colors">
                        {p.icon}
                      </div>
                      <h4 className="font-black text-white text-sm mb-1">
                        {p.title}
                      </h4>
                      <p className="text-zinc-500 text-xs font-medium leading-snug">
                        {p.text}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Right — visual */}
            <FadeUp delay={0.15}>
              <div className="relative">
                <div className="relative rounded-[3rem] overflow-hidden bg-zinc-900/80 border border-white/8 h-[520px] flex items-center justify-center">
                  {/* Orbital bg */}
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    {[200, 300, 400].map((size, i) => (
                      <motion.div
                        key={i}
                        animate={{
                          rotate: i % 2 === 0 ? 360 : -360,
                        }}
                        transition={{
                          duration: 20 + i * 10,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                        style={{ width: size, height: size }}
                        className="absolute rounded-full border border-blue-500/10"
                      />
                    ))}
                  </div>

                  {/* Floating device emojis */}
                  {[
                    { emoji: "🖨️", pos: "top-12 left-12", d: 0 },
                    { emoji: "🗺️", pos: "top-12 right-12", d: 0.5 },
                    { emoji: "🏠", pos: "bottom-20 left-12", d: 1.0 },
                    { emoji: "📷", pos: "bottom-20 right-12", d: 1.5 },
                  ].map((f, i) => (
                    <motion.div
                      key={i}
                      animate={{ y: [0, -12, 0] }}
                      transition={{
                        duration: 3.5 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: f.d,
                      }}
                      className={`absolute ${f.pos} text-3xl`}
                    >
                      <div className="w-14 h-14 rounded-2xl bg-white/[0.06] backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg">
                        {f.emoji}
                      </div>
                    </motion.div>
                  ))}

                  {/* Center */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative z-10 flex flex-col items-center gap-4"
                  >
                    <div className="w-24 h-24 rounded-[1.8rem] bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center shadow-2xl shadow-blue-600/50 border border-blue-400/20">
                      <span className="text-white font-black text-4xl italic">
                        S
                      </span>
                    </div>
                    <span className="text-zinc-500 font-bold text-xs tracking-[0.2em] uppercase">
                      Technology Bridged
                    </span>
                  </motion.div>

                  <div className="absolute inset-0 bg-gradient-to-t from-zinc-900/90 via-transparent to-transparent" />
                  <div className="absolute bottom-8 left-8 right-8">
                    <p className="text-xl font-black text-white tracking-tight mb-1">
                      Designed for lifelong learners
                    </p>
                    <p className="text-zinc-500 font-medium text-sm">
                      Clarity over complexity — always.
                    </p>
                  </div>
                </div>

                {/* Badge */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5, duration: 0.8 }}
                  className="absolute -bottom-6 -left-6 bg-zinc-900 p-5 rounded-2xl shadow-2xl border border-white/10 flex items-center gap-4 hover:-translate-y-1 transition-transform"
                >
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center text-white shadow-lg">
                    <Award size={28} />
                  </div>
                  <div>
                    <div className="font-black text-2xl tracking-tighter text-white">
                      100%
                    </div>
                    <div className="text-zinc-500 font-black text-[10px] uppercase tracking-widest">
                      Satisfaction
                    </div>
                  </div>
                </motion.div>
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         TOPICS GRID
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-zinc-950 relative">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-6">
              <TrendingUp size={12} /> Expertise
            </div>
            <h2
              className="font-black tracking-[-0.03em] mb-5"
              style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.5rem)" }}
            >
              Everyday Tech Made Simple
            </h2>
            <p className="text-zinc-500 font-medium text-lg max-w-xl mx-auto">
              Tap a topic to see how we help you master the devices your family
              uses every day.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {TOPICS.map((topic, i) => {
              const Icon = topic.Icon;
              return (
                <FadeUp key={i} delay={i * 0.06}>
                  <motion.div
                    whileHover={{ y: -8 }}
                    className="h-full"
                  >
                    <div
                      className={`h-full bg-white/[0.03] border border-white/8 hover:border-white/20 rounded-3xl p-8 flex flex-col transition-all duration-500 group ${topic.shadow} hover:shadow-xl`}
                    >
                      <div
                        className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${topic.gradient} flex items-center justify-center text-white mb-6 shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}
                      >
                        <Icon size={26} />
                      </div>
                      <h3 className="text-xl font-black text-white mb-3 tracking-tight group-hover:text-blue-300 transition-colors">
                        {topic.title}
                      </h3>
                      <p className="text-zinc-500 font-medium text-sm leading-relaxed mb-6 flex-grow">
                        {topic.desc}
                      </p>
                      <div className="flex flex-wrap gap-2 mb-6">
                        {topic.points.map((p, j) => (
                          <span
                            key={j}
                            className="px-3 py-1 bg-white/[0.04] border border-white/8 rounded-full text-[10px] font-black text-zinc-500 uppercase tracking-widest group-hover:border-blue-500/20 group-hover:text-blue-400 transition-all"
                          >
                            {p}
                          </span>
                        ))}
                      </div>
                      <Link
                        href={topic.href}
                        className={`inline-flex items-center justify-center gap-2 bg-gradient-to-r ${topic.gradient} text-white px-6 py-3.5 rounded-xl font-black text-sm hover:shadow-lg hover:-translate-y-0.5 transition-all`}
                      >
                        Learn More{" "}
                        <ArrowRight size={14} />
                      </Link>
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         FREE TOOLS SPOTLIGHT
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-24 bg-[#060a12] border-y border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6 mb-14">
            <div>
              <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-orange-500/10 border border-orange-500/20 text-orange-400 font-black text-xs uppercase tracking-[0.2em] mb-4">
                <Zap size={12} /> 47 Free Tools
              </div>
              <h2 className="font-black tracking-tight text-2xl md:text-3xl">
                Free Interactive Tools
              </h2>
              <p className="text-zinc-500 font-medium mt-2 max-w-lg">
                Pick your device, get exact steps. No jargon, no guessing.
              </p>
            </div>
            <Link
              href="/tools"
              className="shrink-0 px-7 py-3.5 bg-white/[0.06] border border-white/10 rounded-xl font-bold text-sm hover:bg-white/10 transition-all whitespace-nowrap"
            >
              View All 47 Tools →
            </Link>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {TOOLS.map((tool, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <Link href={tool.href} className="block h-full">
                  <motion.div
                    whileHover={{ y: -6 }}
                    className="h-full bg-white/[0.03] border border-white/8 hover:border-white/20 rounded-2xl p-7 flex flex-col transition-all group"
                  >
                    <div
                      className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl mb-5 shadow-lg group-hover:scale-110 transition-transform`}
                    >
                      {tool.emoji}
                    </div>
                    <h4 className="font-black text-white text-base mb-2 group-hover:text-blue-300 transition-colors">
                      {tool.title}
                    </h4>
                    <p className="text-zinc-500 text-sm font-medium leading-relaxed flex-grow">
                      {tool.desc}
                    </p>
                    <div className="flex items-center gap-1 text-blue-400 font-black text-sm mt-5">
                      Try Free <ArrowRight size={14} />
                    </div>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         PACKAGES
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-zinc-950 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-20">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 font-black text-xs uppercase tracking-[0.2em] mb-6">
              <Star size={12} className="fill-indigo-400" /> Featured Packages
            </div>
            <h2
              className="font-black tracking-[-0.03em] mb-5"
              style={{ fontSize: "clamp(2.2rem, 5vw, 4rem)" }}
            >
              Choose Your Learning Path
            </h2>
            <p className="text-zinc-500 font-medium text-lg max-w-xl mx-auto">
              Simple pricing. No monthly fees. Just the learning you need.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
            {PACKAGES.map((pkg, i) => {
              const Icon = pkg.Icon;
              return (
                <FadeUp key={i} delay={i * 0.08}>
                  <motion.div
                    whileHover={{ y: -10, scale: 1.02 }}
                    className="h-full"
                  >
                    <div
                      className={`h-full bg-gradient-to-br ${pkg.gradient} p-7 rounded-[2.5rem] text-white flex flex-col relative overflow-hidden group`}
                    >
                      {/* Decorative circle */}
                      <div className="absolute top-0 right-0 w-40 h-40 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
                      <div className="absolute -bottom-8 -left-8 w-28 h-28 bg-black/10 rounded-full" />

                      <div className="w-13 h-13 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-7 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all relative z-10">
                        <Icon size={24} />
                      </div>
                      <h3 className="text-xl font-black mb-1 tracking-tight relative z-10">
                        {pkg.title}
                      </h3>
                      <p className="text-white/60 font-bold text-xs uppercase tracking-widest mb-5 relative z-10">
                        {pkg.sub}
                      </p>
                      <div className="space-y-2.5 mb-7 flex-grow relative z-10">
                        {pkg.features.map((f, j) => (
                          <div
                            key={j}
                            className="flex items-start gap-2.5"
                          >
                            <CheckCircle2
                              size={14}
                              className="text-white/50 mt-0.5 shrink-0"
                            />
                            <span className="font-medium text-sm text-white/85">
                              {f}
                            </span>
                          </div>
                        ))}
                      </div>
                      <div className="pt-5 border-t border-white/15 mb-7 relative z-10">
                        <p className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1">
                          Bonus:
                        </p>
                        <p className="text-sm font-bold italic text-white/70">
                          {pkg.bonus}
                        </p>
                      </div>
                      <Link
                        href={pkg.href}
                        className="w-full py-4 bg-white text-zinc-900 rounded-2xl font-black text-sm flex items-center justify-center gap-2 hover:bg-zinc-100 transition-all relative z-10"
                      >
                        Explore Package{" "}
                        <ChevronRight size={16} />
                      </Link>
                    </div>
                  </motion.div>
                </FadeUp>
              );
            })}
          </div>

          <FadeUp className="mt-14 text-center">
            <Link
              href="/pricing"
              className="group inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-black text-lg hover:shadow-[0_20px_60px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all shadow-xl shadow-blue-600/25"
            >
              Browse All Learning Packages
              <ArrowRight
                size={20}
                className="group-hover:translate-x-1 transition-transform"
              />
            </Link>
          </FadeUp>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         TECHBRIDGE PREVIEW
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-[#060a12] relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-blue-600/5 via-transparent to-transparent" />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div>
              <FadeUp>
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 font-black text-xs uppercase tracking-[0.2em] mb-8">
                  Innovation Meets Experience
                </div>
                <h2
                  className="font-black tracking-tight leading-[1.05] mb-8"
                  style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
                >
                  TechBridge: Mastering Tech
                  <br />
                  With{" "}
                  <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                    Confidence
                  </span>
                </h2>
                <p className="text-lg text-zinc-400 mb-10 leading-relaxed font-medium">
                  We blend on-demand AI learning with human-designed lessons. One
                  side is fast and interactive — the other is thoughtful and
                  personal. Together they make mastering technology feel natural.
                </p>
              </FadeUp>
              <div className="grid grid-cols-2 gap-4">
                {[
                  {
                    icon: <Zap size={18} className="text-blue-400" />,
                    title: "On-Demand Learning",
                    desc: "AI-guided lessons whenever you need.",
                  },
                  {
                    icon: <UserCheck size={18} className="text-blue-400" />,
                    title: "Thoughtful & Human",
                    desc: "Lessons designed by real educators.",
                  },
                  {
                    icon: <Clock size={18} className="text-blue-400" />,
                    title: "Learn at Your Pace",
                    desc: "Pause, rewind, repeat — it's yours.",
                  },
                  {
                    icon: <Users size={18} className="text-blue-400" />,
                    title: "Real Support",
                    desc: "Book a live educator any time.",
                  },
                ].map((c, i) => (
                  <FadeUp key={i} delay={i * 0.06}>
                    <div className="p-5 rounded-2xl bg-white/[0.04] border border-white/8 hover:bg-white/[0.06] hover:border-blue-500/20 transition-all group">
                      <div className="mb-3 group-hover:scale-110 transition-transform w-fit">
                        {c.icon}
                      </div>
                      <h4 className="font-black text-white text-sm mb-1">
                        {c.title}
                      </h4>
                      <p className="text-zinc-500 text-xs font-medium">
                        {c.desc}
                      </p>
                    </div>
                  </FadeUp>
                ))}
              </div>
            </div>

            {/* Chat mockup */}
            <FadeUp delay={0.1}>
              <div className="relative">
                <div className="p-px rounded-[2.5rem] overflow-hidden bg-gradient-to-br from-blue-500 to-cyan-500">
                  <div className="bg-zinc-900 p-8 rounded-[2.4rem] space-y-6">
                    <div className="flex items-center gap-3 border-b border-white/10 pb-5">
                      <div className="w-11 h-11 rounded-full bg-gradient-to-br from-blue-600 to-cyan-500 flex items-center justify-center font-black text-lg italic text-white shadow-lg">
                        S
                      </div>
                      <div>
                        <div className="font-black text-white text-sm">
                          Setwise CoPilot
                        </div>
                        <div className="flex items-center gap-1.5">
                          <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                          <span className="text-[11px] text-zinc-500 font-medium">
                            Online — ready to help
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.3 }}
                        className="bg-white/[0.06] p-4 rounded-2xl rounded-tl-sm mr-12 text-sm text-zinc-300 font-medium border border-white/5"
                      >
                        &quot;Teach me how to set up wireless printing.&quot;
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0, x: 10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 }}
                        className="bg-gradient-to-r from-blue-600 to-cyan-500 p-4 rounded-2xl rounded-tr-sm ml-12 text-sm font-medium shadow-lg"
                      >
                        &quot;Great choice! Let&apos;s start with Lesson 1: how
                        Wi-Fi printing actually works — in plain English...&quot;
                      </motion.div>
                      <motion.div
                        initial={{ opacity: 0 }}
                        whileInView={{ opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.9 }}
                        className="flex items-center justify-center gap-2 pt-2"
                      >
                        {[0, 150, 300].map((d) => (
                          <div
                            key={d}
                            className="w-2 h-2 rounded-full bg-zinc-600 animate-bounce"
                            style={{ animationDelay: `${d}ms` }}
                          />
                        ))}
                      </motion.div>
                    </div>
                    <Link
                      href="/techbridge"
                      className="flex items-center justify-center gap-2 w-full py-4 bg-blue-600/15 border border-blue-500/25 rounded-2xl text-blue-400 font-black text-sm hover:bg-blue-600/25 transition-colors"
                    >
                      Start a Lesson <ArrowRight size={14} />
                    </Link>
                  </div>
                </div>
                <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-600/10 blur-[80px]" />
              </div>
            </FadeUp>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         FAQ
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-28 bg-zinc-950">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2
              className="font-black tracking-tight mb-4"
              style={{ fontSize: "clamp(2rem, 4vw, 3rem)" }}
            >
              Questions You Might Have
            </h2>
            <p className="text-zinc-500 font-medium">
              Everything about learning with Setwise Digital.
            </p>
          </FadeUp>

          <div className="space-y-3">
            {FAQS.map((faq, i) => (
              <FadeUp key={i} delay={i * 0.04}>
                <div
                  className={`border rounded-2xl overflow-hidden transition-all duration-300 ${
                    activeFaq === i
                      ? "border-blue-500/40 bg-blue-500/5"
                      : "border-white/8 bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <button
                    onClick={() =>
                      setActiveFaq(activeFaq === i ? null : i)
                    }
                    className="w-full px-6 py-5 text-left flex items-center justify-between gap-4"
                  >
                    <span className="font-black text-white text-sm leading-snug">
                      {faq.q}
                    </span>
                    <ChevronDown
                      size={16}
                      className={`text-zinc-500 shrink-0 transition-transform duration-300 ${
                        activeFaq === i
                          ? "rotate-180 text-blue-400"
                          : ""
                      }`}
                    />
                  </button>
                  <AnimatePresence>
                    {activeFaq === i && (
                      <motion.div
                        initial={{ height: 0 }}
                        animate={{ height: "auto" }}
                        exit={{ height: 0 }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 pb-5 text-zinc-400 font-medium text-sm leading-relaxed border-t border-white/5 pt-4">
                          {faq.a}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         WHO WE BUILD FOR
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-20 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-zinc-950 via-blue-950/50 to-zinc-950" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <FadeUp>
            <p className="text-blue-400 font-black text-xs uppercase tracking-[0.3em] mb-4">
              Built with care for
            </p>
            <h2
              className="font-black tracking-tight text-white mb-14"
              style={{ fontSize: "clamp(2rem, 4.5vw, 3.5rem)" }}
            >
              Who We Build For
            </h2>
          </FadeUp>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                icon: "✦",
                label: "Clarity Seekers",
                text: "People who want clear instructions without tech jargon",
              },
              {
                icon: "◆",
                label: "Lifelong Learners",
                text: "Adults 40+ who value step-by-step learning",
              },
              {
                icon: "●",
                label: "Everyday Users",
                text: "Anyone who wants to enjoy gadgets without stress",
              },
            ].map((item, i) => (
              <FadeUp key={i} delay={i * 0.1}>
                <div className="p-8 rounded-3xl bg-white/[0.04] border border-white/10 hover:bg-white/[0.07] hover:border-blue-500/25 transition-all hover:-translate-y-1 duration-300">
                  <div className="text-blue-400 text-3xl font-black mb-4">
                    {item.icon}
                  </div>
                  <div className="text-[10px] font-black uppercase tracking-widest text-blue-400/60 mb-3">
                    {item.label}
                  </div>
                  <p className="text-white/80 font-bold text-base leading-snug">
                    {item.text}
                  </p>
                </div>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════
         CLOSING CTA
         ═══════════════════════════════════════════════════════════════ */}
      <section className="py-32 bg-[#060a12] relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/20 to-transparent" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[120px] pointer-events-none" />

        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <FadeUp>
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 font-black text-xs uppercase tracking-[0.2em] mb-10">
              <Sparkles
                size={12}
                className="text-yellow-400 fill-yellow-400"
              />{" "}
              Start Today — It&apos;s Free
            </div>
            <h2
              className="font-black tracking-[-0.04em] mb-8"
              style={{
                fontSize: "clamp(2.8rem, 7vw, 5.5rem)",
                lineHeight: 0.95,
              }}
            >
              Explore.
              <br />
              <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-blue-500 bg-clip-text text-transparent">
                Learn.
              </span>
              <br />
              Simplify.
            </h2>
            <p className="text-xl text-zinc-400 font-medium mb-12 max-w-xl mx-auto leading-relaxed">
              Technology doesn&apos;t have to be confusing. Let&apos;s make it
              work for you, every day.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-14">
              <Link
                href="/pricing"
                className="group inline-flex items-center gap-3 px-10 py-6 bg-gradient-to-r from-blue-600 to-cyan-500 text-white rounded-2xl font-black text-xl hover:shadow-[0_20px_60px_rgba(37,99,235,0.45)] hover:-translate-y-1 transition-all shadow-2xl shadow-blue-600/25"
              >
                Browse Learning Packages
                <ArrowRight
                  size={22}
                  className="group-hover:translate-x-1 transition-transform"
                />
              </Link>
              <Link
                href="/tools"
                className="inline-flex items-center gap-2 text-zinc-400 font-black hover:text-blue-400 transition-colors text-lg"
              >
                Try 47 Free Tools <ChevronRight size={18} />
              </Link>
            </div>

            {/* Trust signals */}
            <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-zinc-600 font-bold">
              {[
                "✓ No monthly fees",
                "✓ Plain English always",
                "✓ Works on all devices",
                "✓ 100% satisfaction promise",
              ].map((t, i) => (
                <span
                  key={i}
                  className="hover:text-blue-400 transition-colors"
                >
                  {t}
                </span>
              ))}
            </div>
          </FadeUp>
        </div>
      </section>

      <Footer />
    </div>
  );
}
