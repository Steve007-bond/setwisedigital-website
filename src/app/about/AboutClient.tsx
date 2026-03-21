"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle2, Heart, ShieldCheck, Users, Target, MapPin,
  ArrowRight, Printer, Navigation, Camera, Home as HomeIcon,
  BookOpen, MessageSquare, UserCheck, Calendar, Zap, Globe,
  Sparkles, Award, HeartHandshake, Clock, Star, ArrowUpRight,
  ChevronRight, Shield, Phone, BadgeCheck, GraduationCap,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { useRef, useState, useEffect } from "react";

/* ═══════════════════════════════════════════════════════════════
   BACKGROUND
   ═══════════════════════════════════════════════════════════════ */
function AuroraBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
      <motion.div className="absolute w-[140%] h-[600px] -left-[20%] top-[5%] opacity-25"
        style={{ background: "linear-gradient(135deg, rgba(59,130,246,0.35) 0%, rgba(139,92,246,0.25) 25%, rgba(236,72,153,0.15) 50%, rgba(34,211,238,0.25) 75%, rgba(59,130,246,0.35) 100%)", filter: "blur(80px)", borderRadius: "50%" }}
        animate={{ x: [0, 80, -40, 60, 0], y: [0, -30, 20, -15, 0], scale: [1, 1.05, 0.98, 1.03, 1] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }} />
      <motion.div className="absolute w-[100%] h-[350px] left-[10%] top-[45%] opacity-15"
        style={{ background: "linear-gradient(225deg, rgba(34,211,238,0.4) 0%, rgba(99,102,241,0.3) 40%, rgba(250,204,21,0.2) 100%)", filter: "blur(100px)", borderRadius: "40%" }}
        animate={{ x: [0, -50, 30, -60, 0], y: [0, 20, -10, 15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
    </div>
  );
}

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);
  const done = useRef(false);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting && !done.current) {
        done.current = true;
        let n = 0;
        const step = Math.max(1, Math.floor(target / 35));
        const iv = setInterval(() => { n += step; if (n >= target) { setCount(target); clearInterval(iv); } else setCount(n); }, 40);
      }
    }, { threshold: 0.5 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target]);
  return <span ref={ref}>{count}{suffix}</span>;
}

/* ═══════════════════════════════════════════════════════════════ */
export default function About() {
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);
  const [activeFaq, setActiveFaq] = useState<number | null>(null);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <ScrollToTop />

      {/* ════════ HERO ════════ */}
      <header ref={heroRef} className="relative overflow-hidden bg-zinc-950 min-h-[80vh] lg:min-h-[88vh] flex items-center">
        <AuroraBackground />
        {/* Particles */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none" aria-hidden="true">
          {Array.from({ length: 20 }).map((_, i) => (
            <motion.div key={i} className="absolute rounded-full"
              style={{ left: `${Math.random() * 100}%`, top: `${Math.random() * 100}%`, width: Math.random() * 3 + 1, height: Math.random() * 3 + 1, background: ["rgba(59,130,246,0.5)", "rgba(139,92,246,0.4)", "rgba(34,211,238,0.4)"][i % 3] }}
              animate={{ y: [0, -25, 10, -15, 0], opacity: [0, 0.6, 0.3, 0.5, 0] }}
              transition={{ duration: Math.random() * 12 + 10, delay: Math.random() * 6, repeat: Infinity, ease: "easeInOut" }} />
          ))}
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-36 bg-gradient-to-t from-[#FDFDFD] to-transparent z-10" />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-28 lg:pt-40 lg:pb-36">
          <div className="max-w-4xl">
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
              <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-400/20 text-blue-300 text-sm font-bold tracking-wide">
                <Calendar size={16} className="text-blue-400" />
                Patient Guidance Since 2016
              </span>
            </motion.div>

            <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
              className="mt-8 text-[2.75rem] sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white">
              We Help Adults 45+{" "}
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-blue-400 via-cyan-300 to-violet-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Master Technology.
                </span>
                <motion.span className="absolute -bottom-2 left-0 h-1.5 rounded-full bg-gradient-to-r from-blue-500 via-cyan-400 to-violet-500"
                  initial={{ width: "0%" }} animate={{ width: "100%" }} transition={{ duration: 1.2, delay: 1.0 }} />
              </span>
            </motion.h1>

            <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
              className="mt-8 text-xl sm:text-2xl text-zinc-400 leading-relaxed font-medium max-w-2xl">
              Setwise Digital is an <strong className="text-white">independent tech education company</strong> serving the{" "}
              <strong className="text-white">United States & Canada</strong>. We teach printers, GPS, smart home, Alexa, and more — in{" "}
              <strong className="text-white">plain English</strong>, with patience and zero pressure.
            </motion.p>

            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
              className="mt-10 flex flex-col sm:flex-row gap-4">
              <Link href="/pricing" className="shine-effect inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-blue-600/25 min-h-[60px]">
                Browse Learning Plans <ArrowRight size={20} />
              </Link>
              <Link href="/tools" className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] backdrop-blur-sm min-h-[60px]">
                <Sparkles size={20} /> 47 Free Tools
              </Link>
            </motion.div>

            {/* Trust stats in hero */}
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }}
              className="mt-12 flex flex-wrap gap-8">
              {[
                { value: 2016, suffix: "", label: "Founded" },
                { value: 47, suffix: "+", label: "Free Tools" },
                { value: 2, suffix: "", label: "Countries Served" },
              ].map((s, i) => (
                <div key={i}>
                  <div className="text-3xl sm:text-4xl font-black text-white tracking-tight"><AnimatedCounter target={s.value} suffix={s.suffix} /></div>
                  <div className="text-sm text-zinc-500 font-bold mt-1">{s.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </motion.div>
      </header>

      {/* ════════ MAIN ════════ */}
      <main className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="pt-8 pb-4">
            <ol className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><span className="text-zinc-700 font-bold">About Us</span></li>
            </ol>
          </nav>

          {/* ════════ OUR STORY ════════ */}
          <section className="mt-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center" aria-labelledby="story-heading">
            <motion.div initial={{ opacity: 0, x: -30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7 }}>
              <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-6">
                <BookOpen size={14} /> Our Story
              </span>
              <h2 id="story-heading" className="text-3xl sm:text-4xl font-black tracking-tight mb-6 leading-tight text-zinc-900">
                It Started With a <span className="text-blue-600">Single Moment</span>
              </h2>
              <div className="space-y-5 text-lg text-zinc-600 leading-relaxed font-medium">
                <p>
                  In 2016, we noticed something happening across homes in the US and Canada: adults were buying printers, GPS devices, smart home gadgets — but instead of feeling confident, they felt <strong className="text-zinc-900">stuck, overwhelmed, and afraid</strong> of breaking something.
                </p>
                <motion.blockquote whileHover={{ scale: 1.01 }}
                  className="p-8 bg-blue-50 border-l-4 border-blue-500 rounded-2xl italic text-zinc-800 relative">
                  <p className="text-xl font-bold leading-snug">
                    &ldquo;We bought this printer to print medical forms… but we still go to the library because we&apos;re scared we&apos;ll mess it up.&rdquo;
                  </p>
                  <footer className="mt-4 text-blue-600 font-bold not-italic text-sm">— A senior couple who shaped our mission</footer>
                </motion.blockquote>
                <p>
                  That moment changed everything. We decided: we won&apos;t just fix technology — we&apos;ll <strong className="text-zinc-900">teach people</strong> patiently, clearly, and kindly. No jargon. No pressure. Just step-by-step guidance that builds real confidence.
                </p>
              </div>
            </motion.div>

            {/* Visual timeline */}
            <motion.div initial={{ opacity: 0, x: 30 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ duration: 0.7, delay: 0.15 }}>
              <div className="space-y-6">
                {[
                  { year: "2016", title: "Founded", desc: "Started helping families one-on-one with everyday tech.", color: "from-blue-500 to-blue-600" },
                  { year: "2020", title: "Went Digital", desc: "Launched online learning to reach more people nationwide.", color: "from-violet-500 to-indigo-600" },
                  { year: "2023", title: "47 Free Tools", desc: "Built interactive tools anyone can use — no sign-up needed.", color: "from-emerald-500 to-teal-600" },
                  { year: "2025", title: "US & Canada", desc: "Expanded to serve adults 45+ across both countries.", color: "from-amber-500 to-orange-600" },
                  { year: "Now", title: "Growing", desc: "Adding new tools, topics, and educators every month.", color: "from-rose-500 to-pink-600" },
                ].map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex gap-5 items-start group">
                    <div className={`w-14 h-14 shrink-0 rounded-xl bg-gradient-to-br ${item.color} flex items-center justify-center text-white font-black text-sm shadow-lg group-hover:scale-110 transition-transform`}>
                      {item.year}
                    </div>
                    <div>
                      <h3 className="font-bold text-lg text-zinc-900">{item.title}</h3>
                      <p className="text-zinc-500 font-medium text-base">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </section>

          {/* ════════ WHAT WE TEACH — Colorful clickable ════════ */}
          <section className="mt-28" aria-labelledby="teach-heading">
            <div className="text-center mb-14">
              <h2 id="teach-heading" className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-4">What We Teach</h2>
              <p className="text-lg text-zinc-500 font-medium max-w-2xl mx-auto">Real-life technology topics — explained simply for adults who prefer patience over jargon.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                { icon: <Printer size={32} />, title: "Printers", desc: "Wi-Fi setup, printing from phone, ink management, troubleshooting.", href: "/techbridge/printers", gradient: "from-blue-500 to-blue-700", glow: "shadow-blue-500/20" },
                { icon: <Navigation size={32} />, title: "GPS Navigation", desc: "Map updates, route planning, Garmin setup, voice navigation.", href: "/techbridge/gps", gradient: "from-emerald-500 to-emerald-700", glow: "shadow-emerald-500/20" },
                { icon: <HomeIcon size={32} />, title: "Smart Home & Alexa", desc: "Voice commands, routines, smart plugs, home automation basics.", href: "/techbridge/smart-home", gradient: "from-violet-500 to-violet-700", glow: "shadow-violet-500/20" },
                { icon: <Shield size={32} />, title: "Security Cameras", desc: "Ring, Blink, indoor/outdoor setup, viewing on phone.", href: "/techbridge/security", gradient: "from-rose-500 to-rose-700", glow: "shadow-rose-500/20" },
                { icon: <Camera size={32} />, title: "Cameras", desc: "Photo settings, firmware, storage, backups, quality tips.", href: "/techbridge/camera", gradient: "from-amber-500 to-amber-700", glow: "shadow-amber-500/20" },
                { icon: <Globe size={32} />, title: "Wi-Fi & Internet", desc: "Router setup, speed issues, connecting devices, safe browsing.", href: "/tools", gradient: "from-cyan-500 to-cyan-700", glow: "shadow-cyan-500/20" },
              ].map((item, i) => (
                <Link key={i} href={item.href}>
                  <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.08 }} whileHover={{ y: -8, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className="bg-white rounded-2xl p-7 border border-zinc-100 shadow-sm hover:shadow-xl transition-all cursor-pointer group min-h-[180px] relative overflow-hidden">
                    <div className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${item.gradient} opacity-0 group-hover:opacity-100 transition-opacity`} />
                    <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${item.gradient} flex items-center justify-center text-white mb-4 shadow-lg ${item.glow} group-hover:scale-110 transition-transform`}>
                      {item.icon}
                    </div>
                    <h3 className="font-bold text-xl text-zinc-900 mb-2">{item.title}</h3>
                    <p className="text-zinc-500 font-medium text-base leading-relaxed">{item.desc}</p>
                    <ArrowUpRight size={16} className="absolute top-6 right-6 text-zinc-300 group-hover:text-blue-500 transition-colors" />
                  </motion.div>
                </Link>
              ))}
            </div>
          </section>

          {/* ════════ WHAT MAKES US DIFFERENT ════════ */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-28 bg-zinc-900 text-white rounded-3xl p-8 sm:p-12 lg:p-16 relative overflow-hidden">
            <motion.div animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }} transition={{ duration: 20, repeat: Infinity }}
              className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-blue-600/15 rounded-full blur-[100px]" aria-hidden="true" />
            <div className="relative z-10">
              <div className="text-center mb-14">
                <h2 className="text-3xl sm:text-4xl font-extrabold mb-4">What Makes Us Different</h2>
                <p className="text-lg text-zinc-400 font-medium max-w-2xl mx-auto">We built tools people can return to anytime — not just a one-time fix.</p>
              </div>
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                {[
                  { icon: <BookOpen size={36} className="text-blue-400" />, title: "Step-by-Step PDFs", desc: "Keep them forever. Re-read them anytime. Built for real life.", href: "/tools", cta: "Get Free PDFs" },
                  { icon: <Zap size={36} className="text-amber-400" />, title: "TechBridge Learning Hub", desc: "Interactive lessons that explain, show, and guide — like a friendly tutor.", href: "/techbridge", cta: "Open TechBridge", highlight: true },
                  { icon: <UserCheck size={36} className="text-emerald-400" />, title: "Live 1-on-1 Sessions", desc: "Video lessons with real educators. Patient, clear, and built around your goals.", href: "/pricing", cta: "View Pricing" },
                ].map((item, i) => (
                  <Link key={i} href={item.href}>
                    <motion.div whileHover={{ y: -6 }}
                      className={`p-8 rounded-2xl flex flex-col min-h-[260px] cursor-pointer transition-all ${
                        item.highlight ? "bg-blue-600 hover:bg-blue-500" : "bg-white/5 border border-white/10 hover:bg-white/10"
                      }`}>
                      <div className="mb-6">{item.icon}</div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                      <p className={`mb-6 flex-grow font-medium ${item.highlight ? "text-blue-100" : "text-zinc-400"}`}>{item.desc}</p>
                      <span className={`flex items-center gap-2 font-bold group ${item.highlight ? "text-white" : "text-blue-400"}`}>
                        {item.cta} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                      </span>
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ════════ OUR VALUES ════════ */}
          <section className="mt-28" aria-labelledby="values-heading">
            <div className="text-center mb-14">
              <h2 id="values-heading" className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-4">Our Values</h2>
              <p className="text-lg text-zinc-500 font-medium">We don&apos;t judge. We don&apos;t rush. We love hearing: &ldquo;Wow — now I finally understand!&rdquo;</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {[
                { icon: <Heart size={28} className="text-rose-500" />, title: "Respectful", desc: "We value your experience and treat every question with genuine care.", color: "bg-rose-50" },
                { icon: <CheckCircle2 size={28} className="text-blue-600" />, title: "Simple", desc: "No tech jargon. Just plain English instructions that actually work.", color: "bg-blue-50" },
                { icon: <ShieldCheck size={28} className="text-green-600" />, title: "Judgement-Free", desc: "No upselling. No scare tactics. Just honest, pressure-free learning.", color: "bg-green-50" },
                { icon: <Target size={28} className="text-violet-600" />, title: "Focused", desc: "Everything we do is built around your specific learning goals.", color: "bg-violet-50" },
              ].map((v, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.08 }} whileHover={{ y: -6 }}
                  className="bg-white p-8 rounded-2xl shadow-sm text-center border border-zinc-100 hover:shadow-lg transition-all group">
                  <div className={`w-14 h-14 ${v.color} rounded-xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform`}>{v.icon}</div>
                  <h3 className="text-xl font-bold mb-2 text-zinc-900">{v.title}</h3>
                  <p className="text-zinc-500 font-medium text-base leading-relaxed">{v.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ════════ WHERE WE SERVE ════════ */}
          <section className="mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center" aria-labelledby="location-heading">
            <div>
              <h2 id="location-heading" className="text-3xl sm:text-4xl font-extrabold mb-6 text-zinc-900">Where We Serve</h2>
              <p className="text-lg text-zinc-500 font-medium mb-8 leading-relaxed">
                We operate from hubs in Colorado and New Jersey, serving adults 45+ across the entire United States and Canada through online video learning sessions.
              </p>
              <div className="space-y-4">
                {[
                  { icon: <MapPin size={22} className="text-blue-600" />, title: "Colorado & New Jersey", sub: "Physical operation hubs", bg: "bg-zinc-50 border-zinc-100" },
                  { icon: <Globe size={22} className="text-white" />, title: "United States — Nationwide", sub: "Online learning sessions", bg: "bg-blue-600 text-white border-blue-500" },
                  { icon: <Globe size={22} className="text-white" />, title: "Canada — Nationwide", sub: "Online learning sessions", bg: "bg-emerald-600 text-white border-emerald-500" },
                ].map((loc, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -15 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className={`flex items-center gap-4 p-5 rounded-2xl border ${loc.bg}`}>
                    {loc.icon}
                    <div>
                      <div className="font-bold text-lg">{loc.title}</div>
                      <div className={`font-medium text-sm ${loc.bg.includes("bg-blue") || loc.bg.includes("bg-emerald") ? "opacity-80" : "text-zinc-500"}`}>{loc.sub}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
            {/* Map visual */}
            <motion.div initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }}
              className="relative h-[380px] bg-gradient-to-br from-zinc-100 to-blue-50 rounded-3xl overflow-hidden border border-zinc-200">
              <div className="absolute inset-0 flex items-center justify-center">
                <Globe size={200} className="text-blue-500/10" />
              </div>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-black text-blue-600 mb-2">US & CA</div>
                  <div className="text-zinc-500 font-bold">Nationwide Online Sessions</div>
                </div>
              </div>
              {/* Floating pins */}
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity }} className="absolute top-[30%] left-[25%]">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center shadow-lg"><MapPin size={16} className="text-white" /></div>
                <div className="text-xs font-bold text-zinc-600 mt-1">CO</div>
              </motion.div>
              <motion.div animate={{ y: [0, -8, 0] }} transition={{ duration: 3, repeat: Infinity, delay: 0.5 }} className="absolute top-[28%] right-[22%]">
                <div className="w-8 h-8 bg-violet-600 rounded-full flex items-center justify-center shadow-lg"><MapPin size={16} className="text-white" /></div>
                <div className="text-xs font-bold text-zinc-600 mt-1">NJ</div>
              </motion.div>
            </motion.div>
          </section>

          {/* ════════ VISION CTA ════════ */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-28 bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-8 sm:p-14 lg:p-20 text-white text-center relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight mb-6 leading-tight">Our Vision</h2>
              <p className="text-lg sm:text-xl text-blue-100 mb-10 leading-relaxed font-medium">
                Technology will always change. Our mission will not: help people feel <strong className="text-white">safe, independent, and confident</strong> with everyday technology — anywhere in the US and Canada.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/pricing" className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-white text-blue-700 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all hover:scale-[1.03] active:scale-[0.98] min-h-[60px]">
                  Browse Learning Plans <ArrowRight size={20} />
                </Link>
                <Link href="/contact" className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-blue-500/30 border border-white/20 text-white rounded-2xl font-bold text-lg hover:bg-blue-500/40 transition-all hover:scale-[1.03] active:scale-[0.98] min-h-[60px]">
                  <Phone size={20} /> Contact Us
                </Link>
              </div>
            </div>
          </motion.section>

          {/* ════════ FAQ — SEO rich ════════ */}
          <section className="mt-28 max-w-4xl mx-auto" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "What is Setwise Digital?", a: "Setwise Digital is an independent technology education platform founded in 2016. We help adults 45+ learn everyday tech — printers, GPS, smart home, Alexa, cameras — through 47 free tools and live 1-on-1 video sessions with patient educators." },
                { q: "Is Setwise Digital affiliated with any brand?", a: "No. We are completely independent — not affiliated with HP, Canon, Epson, Garmin, Amazon, Google, Apple, Samsung, or any device manufacturer. We are an education company." },
                { q: "Do you serve customers in Canada?", a: "Yes! We serve adults 45+ across both the United States and Canada through online video learning sessions." },
                { q: "How much does it cost?", a: "Our 47 interactive tools are completely free. Live sessions start from $49 (single lesson), $97 (Skill-Builder, 3 sessions), or $147 (Family Plan, 5 sessions). No subscriptions." },
                { q: "What makes you different from tech support?", a: "We are educators, not tech support. We don't access your devices or perform repairs. We teach you how to use your own technology with confidence through structured, patient lessons." },
                { q: "Who is Setwise Digital best for?", a: "Adults aged 45+ who want to understand everyday technology without jargon, pressure, or feeling rushed. Seniors, families, and anyone who prefers simple, patient explanations." },
              ].map((faq, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className={`border rounded-2xl transition-all duration-300 ${activeFaq === i ? "border-blue-500 bg-blue-50/40 shadow-sm" : "border-zinc-200 hover:border-blue-200"}`}>
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)} className="w-full px-7 py-6 text-left flex items-center justify-between gap-4 min-h-[72px]" aria-expanded={activeFaq === i}>
                    <span className="text-lg font-bold text-zinc-800">{faq.q}</span>
                    <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${activeFaq === i ? "bg-blue-600 text-white rotate-180" : "bg-zinc-100 text-zinc-500"}`}>
                      <ChevronRight size={18} className="rotate-90" />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeFaq === i ? "max-h-60" : "max-h-0"}`}>
                    <div className="px-7 pb-6 text-zinc-600 leading-relaxed font-medium text-base">{faq.a}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ════════ LINKS ════════ */}
          <section className="mt-28" aria-label="Explore more">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { href: "/pricing", title: "Pricing & Plans", desc: "View session packages" },
                { href: "/contact", title: "Contact Us", desc: "Get in touch" },
                { href: "/tools", title: "47 Free Tech Tools", desc: "Try them free" },
              ].map((item, i) => (
                <Link key={i} href={item.href} className="p-7 bg-zinc-50 rounded-2xl group border border-zinc-100 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all min-h-[100px]">
                  <h3 className="font-extrabold text-xl mb-2 group-hover:text-blue-600 transition-colors">{item.title}</h3>
                  <p className="text-zinc-500 font-bold flex items-center gap-2 text-sm">{item.desc} <ArrowUpRight size={16} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" /></p>
                </Link>
              ))}
            </div>
          </section>

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
