"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  Mail, MapPin, CheckCircle2, BookOpen, ShieldCheck, UserCheck,
  MessageSquare, Globe, Clock, ArrowUpRight, ChevronRight,
  Search, Loader2, AlertCircle, Send, Phone, Sparkles,
  HeartHandshake, Award, Users, Monitor, Printer, Navigation,
  Home as HomeIcon, Shield,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import EmailInput from "@/components/EmailInput";
import PhoneInput from "@/components/PhoneInput";
import { validateEmail, validatePhone } from "@/lib/validation";
import Link from "next/link";
import React, { useState, useRef, useEffect } from "react";

/* ─── Animated floating particle for header background ─── */
function FloatingOrb({
  size,
  color,
  delay,
  duration,
  left,
  top,
}: {
  size: number;
  color: string;
  delay: number;
  duration: number;
  left: string;
  top: string;
}) {
  return (
    <motion.div
      className="absolute rounded-full pointer-events-none"
      style={{
        width: size,
        height: size,
        left,
        top,
        background: color,
        filter: `blur(${size * 0.6}px)`,
      }}
      animate={{
        y: [0, -30, 10, -20, 0],
        x: [0, 15, -10, 20, 0],
        scale: [1, 1.15, 0.95, 1.1, 1],
        opacity: [0.4, 0.7, 0.5, 0.65, 0.4],
      }}
      transition={{
        duration,
        delay,
        repeat: Infinity,
        ease: "easeInOut",
      }}
    />
  );
}

/* ─── Animated grid line for visual sophistication ─── */
function AnimatedGridLine({ direction, offset, delay }: { direction: "h" | "v"; offset: string; delay: number }) {
  return (
    <motion.div
      className="absolute pointer-events-none"
      style={
        direction === "h"
          ? { left: 0, right: 0, top: offset, height: "1px" }
          : { top: 0, bottom: 0, left: offset, width: "1px" }
      }
      initial={{ opacity: 0, scaleX: direction === "h" ? 0 : 1, scaleY: direction === "v" ? 0 : 1 }}
      animate={{ opacity: 0.08, scaleX: 1, scaleY: 1 }}
      transition={{ duration: 2, delay, ease: "easeOut" }}
    >
      <div
        className="w-full h-full"
        style={{
          background:
            direction === "h"
              ? "linear-gradient(90deg, transparent, rgba(59,130,246,0.5), transparent)"
              : "linear-gradient(180deg, transparent, rgba(59,130,246,0.5), transparent)",
        }}
      />
    </motion.div>
  );
}

/* ─── Animated counter for stats ─── */
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

/* ─── Service icon cards that float in header ─── */
const serviceIcons = [
  { icon: <Printer size={28} />, label: "Printers", delay: 0.8 },
  { icon: <Navigation size={28} />, label: "GPS", delay: 1.0 },
  { icon: <HomeIcon size={28} />, label: "Smart Home", delay: 1.2 },
  { icon: <Shield size={28} />, label: "Security", delay: 1.4 },
  { icon: <Monitor size={28} />, label: "Devices", delay: 1.6 },
];

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    countryCode: "+1",
    message: "",
  });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ["start start", "end start"],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.95]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 80]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
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

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <ScrollToTop />

      {/* ════════════════════════════════════════════════════════════════
          HERO HEADER — Premium Animated Section
          ════════════════════════════════════════════════════════════════ */}
      <header ref={heroRef} className="relative overflow-hidden bg-zinc-950 min-h-[85vh] lg:min-h-[92vh] flex items-center">
        {/* ── Animated background orbs ── */}
        <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
          <FloatingOrb size={500} color="rgba(37,99,235,0.15)" delay={0} duration={18} left="-5%" top="-10%" />
          <FloatingOrb size={350} color="rgba(99,102,241,0.12)" delay={2} duration={22} left="60%" top="10%" />
          <FloatingOrb size={280} color="rgba(59,130,246,0.1)" delay={4} duration={20} left="30%" top="60%" />
          <FloatingOrb size={200} color="rgba(139,92,246,0.08)" delay={1} duration={16} left="80%" top="70%" />
          <FloatingOrb size={160} color="rgba(37,99,235,0.12)" delay={3} duration={14} left="10%" top="75%" />

          {/* ── Subtle animated grid ── */}
          <AnimatedGridLine direction="h" offset="25%" delay={0.5} />
          <AnimatedGridLine direction="h" offset="50%" delay={0.7} />
          <AnimatedGridLine direction="h" offset="75%" delay={0.9} />
          <AnimatedGridLine direction="v" offset="25%" delay={1.1} />
          <AnimatedGridLine direction="v" offset="50%" delay={1.3} />
          <AnimatedGridLine direction="v" offset="75%" delay={1.5} />

          {/* ── Radial gradient overlay ── */}
          <div
            className="absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 40%, rgba(37,99,235,0.08) 0%, transparent 70%)",
            }}
          />
          {/* ── Bottom fade to white ── */}
          <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFDFD] to-transparent z-10" />
        </div>

        <motion.div
          style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24 lg:pt-40 lg:pb-32"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            {/* ── Left: Text content ── */}
            <div className="space-y-8 lg:space-y-10">
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-300 text-sm font-bold tracking-wide">
                  <Sparkles size={16} className="text-blue-400" />
                  Free Consultation — Reply Within 24 Hours
                </span>
              </motion.div>

              {/* Main Heading — H1 for SEO */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.3 }}
                className="text-[2.75rem] sm:text-6xl lg:text-7xl font-black tracking-tight leading-[1.05] text-white"
              >
                Technology Help{" "}
                <br className="hidden sm:block" />
                <span className="relative inline-block">
                  <span className="bg-gradient-to-r from-blue-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                    Made Simple.
                  </span>
                  {/* Animated underline */}
                  <motion.span
                    className="absolute -bottom-2 left-0 h-1 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500"
                    initial={{ width: "0%" }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.2, delay: 1.0, ease: "easeOut" }}
                  />
                </span>
              </motion.h1>

              {/* Subheading — SEO rich */}
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

              {/* CTA Buttons — Large touch targets (60px+) for 45+ */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.7 }}
                className="flex flex-col sm:flex-row gap-4"
              >
                <a
                  href="#contact-form"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-blue-600/30 hover:shadow-blue-500/40 min-h-[60px]"
                >
                  <Send size={22} />
                  Send Us a Message
                </a>
                <a
                  href="mailto:support@setwisedigital.com"
                  className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-white/10 hover:bg-white/15 text-white border border-white/20 rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] backdrop-blur-sm min-h-[60px]"
                >
                  <Mail size={22} />
                  Email Directly
                </a>
              </motion.div>

              {/* Trust stats */}
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

            {/* ── Right: Floating service cards ── */}
            <div className="relative hidden lg:flex items-center justify-center min-h-[500px]">
              {/* Central pulsing ring */}
              <motion.div
                className="absolute w-64 h-64 rounded-full border-2 border-blue-500/20"
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              />
              <motion.div
                className="absolute w-80 h-80 rounded-full border border-blue-500/10"
                animate={{ scale: [1, 1.1, 1], opacity: [0.2, 0.4, 0.2] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
              />

              {/* Center icon */}
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 200 }}
                className="relative z-10 w-28 h-28 bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl flex items-center justify-center shadow-2xl shadow-blue-600/40"
              >
                <HeartHandshake size={48} className="text-white" />
              </motion.div>

              {/* Orbiting service icons */}
              {serviceIcons.map((service, i) => {
                const angle = (i / serviceIcons.length) * 2 * Math.PI - Math.PI / 2;
                const radius = 190;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;

                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{
                      duration: 0.6,
                      delay: service.delay,
                      type: "spring",
                      stiffness: 200,
                    }}
                    className="absolute"
                    style={{
                      left: `calc(50% + ${x}px - 42px)`,
                      top: `calc(50% + ${y}px - 42px)`,
                    }}
                  >
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{
                        duration: 3 + i * 0.5,
                        repeat: Infinity,
                        ease: "easeInOut",
                        delay: i * 0.3,
                      }}
                      className="w-[84px] h-[84px] bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl flex flex-col items-center justify-center gap-1 text-white shadow-lg hover:bg-white/20 transition-colors cursor-default"
                    >
                      {service.icon}
                      <span className="text-[10px] font-bold text-zinc-400">{service.label}</span>
                    </motion.div>
                  </motion.div>
                );
              })}

              {/* Connection lines (SVG) */}
              <svg
                className="absolute inset-0 w-full h-full pointer-events-none"
                viewBox="0 0 500 500"
                aria-hidden="true"
              >
                {serviceIcons.map((_, i) => {
                  const angle = (i / serviceIcons.length) * 2 * Math.PI - Math.PI / 2;
                  const endX = 250 + Math.cos(angle) * 190;
                  const endY = 250 + Math.sin(angle) * 190;
                  return (
                    <motion.line
                      key={i}
                      x1="250"
                      y1="250"
                      x2={endX}
                      y2={endY}
                      stroke="rgba(59,130,246,0.15)"
                      strokeWidth="1"
                      strokeDasharray="6 4"
                      initial={{ pathLength: 0, opacity: 0 }}
                      animate={{ pathLength: 1, opacity: 1 }}
                      transition={{ duration: 1.5, delay: 0.8 + i * 0.15 }}
                    />
                  );
                })}
              </svg>
            </div>
          </div>

          {/* ── Scrolling marquee of topics (SEO keywords) ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 1.5 }}
            className="mt-16 lg:mt-20 overflow-hidden relative"
          >
            <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-zinc-950 to-transparent z-10" />
            <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-zinc-950 to-transparent z-10" />
            <div className="flex animate-marquee whitespace-nowrap">
              {[
                "Printer Setup",
                "GPS Navigation",
                "Smart Home",
                "Alexa Setup",
                "Wi-Fi Help",
                "Camera Setup",
                "Security Systems",
                "Email Help",
                "Tech Lessons",
                "Device Support",
                "Printer Setup",
                "GPS Navigation",
                "Smart Home",
                "Alexa Setup",
                "Wi-Fi Help",
                "Camera Setup",
                "Security Systems",
                "Email Help",
                "Tech Lessons",
                "Device Support",
              ].map((topic, i) => (
                <span
                  key={i}
                  className="mx-6 text-sm font-bold text-zinc-600 uppercase tracking-widest flex items-center gap-2"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500/60" />
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
          {/* ── Breadcrumb (SEO) ── */}
          <nav aria-label="Breadcrumb" className="pt-8 pb-6">
            <ol className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
              <li>
                <Link href="/" className="hover:text-blue-600 transition-colors">
                  Home
                </Link>
              </li>
              <li aria-hidden="true">
                <ChevronRight size={14} />
              </li>
              <li>
                <span className="text-zinc-700 font-bold">Contact Us</span>
              </li>
            </ol>
          </nav>

          {/* ── Two-column layout: Info + Form ── */}
          <div
            id="contact-form"
            className="scroll-mt-28 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start pt-8"
          >
            {/* ════ Left Side ════ */}
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="space-y-10"
            >
              {/* Section heading */}
              <div>
                <h2 className="text-4xl sm:text-5xl font-black tracking-tight mb-5 text-zinc-900 leading-tight">
                  We&apos;re Here <br className="hidden sm:block" />
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
                  {
                    icon: <Mail size={28} />,
                    title: "Email Us",
                    desc: "We respond to every message within 24 hours.",
                    link: "support@setwisedigital.com",
                    href: "mailto:support@setwisedigital.com",
                  },
                  {
                    icon: <MapPin size={28} />,
                    title: "Serving the US & Canada",
                    desc: "Online tech education from coast to coast.",
                    tags: ["United States", "Canada"],
                  },
                  {
                    icon: <Clock size={28} />,
                    title: "Business Hours",
                    desc: "Monday through Friday, 9:00 AM – 6:00 PM EST.",
                  },
                ].map((item, i) => (
                  <motion.div
                    key={i}
                    whileHover={{ x: 8 }}
                    className="flex items-start gap-5 p-7 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-lg hover:border-blue-100 transition-all group"
                  >
                    <div className="w-14 h-14 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-400 shadow-sm">
                      {item.icon}
                    </div>
                    <div>
                      <h3 className="font-bold text-xl mb-1 tracking-tight text-zinc-900">
                        {item.title}
                      </h3>
                      <p className="text-zinc-500 font-medium mb-3 text-base leading-relaxed">
                        {item.desc}
                      </p>
                      {item.link && (
                        <a
                          href={item.href}
                          className="text-blue-600 font-bold text-lg hover:underline underline-offset-4 decoration-2 inline-flex items-center gap-2"
                        >
                          {item.link}
                          <ArrowUpRight size={16} />
                        </a>
                      )}
                      {item.tags && (
                        <div className="flex flex-wrap gap-3">
                          {item.tags.map((tag, j) => (
                            <span
                              key={j}
                              className="inline-flex items-center gap-2 px-4 py-2 bg-zinc-50 rounded-xl border border-zinc-200 font-bold text-zinc-700 text-sm"
                            >
                              <Globe size={14} className="text-blue-500" />
                              {tag}
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
                <motion.div
                  animate={{ scale: [1, 1.3, 1], rotate: [0, 90, 0] }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute top-0 right-0 w-48 h-48 bg-blue-600/15 rounded-full blur-[60px]"
                  aria-hidden="true"
                />
                <h3 className="text-2xl font-black tracking-tight relative z-10 mb-6">
                  Why Adults 45+ Trust Us
                </h3>
                <div className="grid grid-cols-2 gap-4 relative z-10">
                  {[
                    { icon: <Award size={24} className="text-blue-400" />, text: "Since 2016" },
                    { icon: <HeartHandshake size={24} className="text-blue-400" />, text: "Patient Teaching" },
                    { icon: <UserCheck size={24} className="text-blue-400" />, text: "Plain English" },
                    { icon: <Users size={24} className="text-blue-400" />, text: "US & Canada" },
                  ].map((item, i) => (
                    <motion.div
                      key={i}
                      whileHover={{ scale: 1.05 }}
                      className="flex items-center gap-3 p-4 bg-white/5 border border-white/10 rounded-xl"
                    >
                      {item.icon}
                      <span className="font-bold text-sm text-zinc-300">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* ════ Right Side: Contact Form ════ */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.15 }}
              className="bg-white p-8 sm:p-12 rounded-3xl border border-zinc-200 shadow-xl relative group overflow-hidden"
            >
              {/* Hover glow */}
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 rounded-[1.75rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center py-12"
                  >
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30"
                    >
                      <CheckCircle2 size={48} className="text-white" />
                    </motion.div>
                    <h3 className="text-3xl font-black text-zinc-900 mb-4 tracking-tight">
                      Message Sent!
                    </h3>
                    <p className="text-zinc-500 font-medium text-lg mb-2">
                      Thanks{" "}
                      <span className="font-black text-zinc-900">{form.name}</span>!
                      We&apos;ve received your message.
                    </p>
                    <p className="text-zinc-400 font-medium">
                      We&apos;ll reply to{" "}
                      <span className="font-bold text-zinc-700">{form.email}</span>{" "}
                      within 24 hours.
                    </p>
                    <button
                      onClick={() => {
                        setFormStatus("idle");
                        setForm({
                          name: "",
                          email: "",
                          phone: "",
                          countryCode: "+1",
                          message: "",
                        });
                      }}
                      className="mt-10 px-8 py-4 bg-zinc-100 text-zinc-700 rounded-2xl font-bold hover:bg-zinc-200 transition-colors min-h-[56px]"
                    >
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                  >
                    <h3 className="text-3xl sm:text-4xl font-black tracking-tight mb-3 text-zinc-900 leading-tight">
                      Get In <span className="text-blue-600">Touch.</span>
                    </h3>
                    <p className="text-zinc-500 font-medium mb-8 text-base">
                      Fill in the form below and we&apos;ll get back to you within 24 hours.
                      All fields are required.
                    </p>

                    <form onSubmit={handleSubmit} className="space-y-6" noValidate>
                      {/* Name */}
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-name"
                          className="text-sm font-bold text-zinc-600 ml-1 block"
                        >
                          Your Full Name *
                        </label>
                        <input
                          id="contact-name"
                          type="text"
                          name="name"
                          value={form.name}
                          onChange={handleChange}
                          placeholder="John Doe"
                          required
                          autoComplete="name"
                          className="w-full px-5 py-4 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-lg min-h-[56px]"
                        />
                      </div>

                      {/* Email */}
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-email"
                          className="text-sm font-bold text-zinc-600 ml-1 block"
                        >
                          Email Address *
                        </label>
                        <EmailInput
                          value={form.email}
                          onChange={(val) =>
                            setForm((f) => ({ ...f, email: val }))
                          }
                          theme="light"
                          placeholder="john@example.com"
                        />
                      </div>

                      {/* Phone */}
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-phone"
                          className="text-sm font-bold text-zinc-600 ml-1 block"
                        >
                          Phone Number *
                        </label>
                        <PhoneInput
                          value={form.phone}
                          countryCode={form.countryCode}
                          onChange={(val, cc) =>
                            setForm((f) => ({
                              ...f,
                              phone: val,
                              countryCode: cc,
                            }))
                          }
                          theme="light"
                          placeholder="555 000 0000"
                        />
                      </div>

                      {/* Message */}
                      <div className="space-y-2">
                        <label
                          htmlFor="contact-message"
                          className="text-sm font-bold text-zinc-600 ml-1 block"
                        >
                          How Can We Help? *
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          value={form.message}
                          onChange={handleChange}
                          rows={4}
                          required
                          placeholder="I need help with my printer setup..."
                          className="w-full px-5 py-4 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-medium text-lg resize-none min-h-[120px]"
                        />
                      </div>

                      {/* Error */}
                      {formStatus === "error" && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                          <AlertCircle
                            size={20}
                            className="text-red-500 shrink-0 mt-0.5"
                          />
                          <p className="text-red-600 font-medium text-base">
                            {formError}
                          </p>
                        </div>
                      )}

                      {/* Submit — Extra large for 45+ */}
                      <button
                        type="submit"
                        disabled={!isValid || formStatus === "loading"}
                        className={`shine-effect w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] min-h-[64px] ${
                          isValid && formStatus !== "loading"
                            ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.01] shadow-lg shadow-blue-600/30"
                            : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                        }`}
                      >
                        {formStatus === "loading" ? (
                          <>
                            <Loader2 size={24} className="animate-spin" />
                            Sending...
                          </>
                        ) : (
                          <>
                            <Send size={22} />
                            Submit Your Message
                          </>
                        )}
                      </button>

                      <div className="flex items-center justify-center gap-3 text-zinc-400 font-bold text-sm pt-2">
                        <ShieldCheck size={18} className="text-green-500" />
                        Your information is secure and never shared.
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ════════════════════════════════════════════
              PROCESS SECTION
              ════════════════════════════════════════════ */}
          <section className="mt-28 pt-20 border-t border-zinc-100" aria-labelledby="process-heading">
            <h2
              id="process-heading"
              className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900"
            >
              What Happens After You Contact Us?
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
              {[
                {
                  title: "We Review",
                  desc: "We carefully read your message to understand exactly what you need.",
                  icon: <Search size={28} />,
                },
                {
                  title: "We Clarify",
                  desc: "If we have any questions, we ask in simple, plain language.",
                  icon: <MessageSquare size={28} />,
                },
                {
                  title: "We Recommend",
                  desc: "We suggest the best free tool or learning session for your goal.",
                  icon: <BookOpen size={28} />,
                },
                {
                  title: "You Decide",
                  desc: "No pressure. You choose what feels right at your own pace.",
                  icon: <CheckCircle2 size={28} />,
                },
              ].map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }}
                  className="text-center space-y-4 group p-6"
                >
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">
                    Step {i + 1}
                  </div>
                  <h3 className="font-extrabold text-xl text-zinc-900">{step.title}</h3>
                  <p className="text-zinc-500 font-medium leading-relaxed text-base">
                    {step.desc}
                  </p>
                </motion.div>
              ))}
            </div>
            <div className="mt-12 text-center">
              <p className="text-xl text-zinc-600 font-bold italic">
                No commitments. No pressure. Just patient, friendly support.
              </p>
            </div>
          </section>

          {/* ════════════════════════════════════════════
              FAQ SECTION
              ════════════════════════════════════════════ */}
          <section className="mt-28 max-w-4xl mx-auto" aria-labelledby="faq-heading">
            <h2
              id="faq-heading"
              className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900"
            >
              Frequently Asked Questions
            </h2>
            <div className="space-y-4">
              {[
                {
                  q: "Do you provide official manufacturer support?",
                  a: "No — we are an independent technology education company. We help you learn how to use the devices you already own through patient, step-by-step guidance.",
                },
                {
                  q: "Do I need to pay to contact you?",
                  a: "No. Sending a message through our contact form is completely free. Our 47 interactive tools are also free to use. Live learning sessions start from $49.",
                },
                {
                  q: "Do you offer remote device repairs?",
                  a: "We do not provide remote repairs or access your devices. Our sessions are structured educational lessons where we teach concepts, tips, and troubleshooting steps.",
                },
                {
                  q: "Do you serve customers in Canada?",
                  a: "Yes! We serve adults 45+ across both the United States and Canada through our online learning sessions and free digital tools.",
                },
                {
                  q: "Who is Setwise Digital best for?",
                  a: "Adults aged 45 and older who prefer simple, patient, jargon-free explanations of everyday technology like printers, GPS navigation, smart home devices, and more.",
                },
                {
                  q: "How fast will I get a response?",
                  a: "We reply to every inquiry within 24 hours on business days (Monday through Friday). Most messages receive a response much sooner.",
                },
              ].map((faq, i) => (
                <div
                  key={i}
                  className={`border rounded-2xl transition-all duration-300 ${
                    activeFaq === i
                      ? "border-blue-500 bg-blue-50/40 shadow-sm"
                      : "border-zinc-200 hover:border-blue-200"
                  }`}
                >
                  <button
                    onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-7 py-6 text-left flex items-center justify-between gap-4 min-h-[72px]"
                    aria-expanded={activeFaq === i}
                  >
                    <span className="text-lg font-bold text-zinc-800">{faq.q}</span>
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 transition-all ${
                        activeFaq === i
                          ? "bg-blue-600 text-white rotate-180"
                          : "bg-zinc-100 text-zinc-500"
                      }`}
                    >
                      <ChevronRight size={18} className="rotate-90" />
                    </div>
                  </button>
                  <div
                    className={`overflow-hidden transition-all duration-300 ${
                      activeFaq === i ? "max-h-60" : "max-h-0"
                    }`}
                  >
                    <div className="px-7 pb-6 text-zinc-600 leading-relaxed font-medium text-base">
                      {faq.a}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* ════════════════════════════════════════════
              INTERNAL LINKS — SEO JUICE
              ════════════════════════════════════════════ */}
          <section className="mt-28" aria-label="Explore more pages">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  href: "/about",
                  title: "About Setwise Digital",
                  desc: "Learn our story and mission",
                },
                {
                  href: "/pricing",
                  title: "Pricing & Learning Plans",
                  desc: "View session packages",
                },
                {
                  href: "/tools",
                  title: "47 Free Tech Tools",
                  desc: "Try our interactive tools",
                },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="p-7 bg-zinc-50 rounded-2xl group border border-zinc-100 hover:bg-white hover:shadow-lg hover:border-blue-100 transition-all min-h-[100px]"
                >
                  <h3 className="font-extrabold text-xl mb-2 group-hover:text-blue-600 transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-zinc-500 font-bold flex items-center gap-2 text-sm">
                    {item.desc}{" "}
                    <ArrowUpRight
                      size={16}
                      className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform"
                    />
                  </p>
                </Link>
              ))}
            </div>
          </section>

          {/* ── Disclaimer ── */}
          <div className="mt-24 text-center p-10 bg-blue-50 rounded-3xl border border-blue-100">
            <p className="text-base text-blue-900 font-medium italic leading-relaxed max-w-4xl mx-auto">
              Setwise Digital provides independent technology learning and educational
              guidance. We are not affiliated with, endorsed by, or a representative of any
              printer, GPS, camera, smart home, or technology manufacturer.
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
