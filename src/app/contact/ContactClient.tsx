"use client";

import { useState, useRef } from "react";
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
          name,
          email,
          phone,
          issue: activeTab === "schedule"
            ? `Schedule request: ${preferredDate} ${preferredTime} — ${message}`
            : activeTab === "call"
            ? `Callback request — ${message}`
            : message,
          source: `contact-page-${activeTab}`,
        }),
      });
    } catch (e) {
      console.error("[contact] error:", e);
    }
    setStatus("done");
  };

  if (status === "done") {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.92 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-14">
        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
          className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-green-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-emerald-500/30">
          <CheckCircle2 size={36} className="text-white" />
        </motion.div>
        <h3 className="text-2xl font-black text-white mb-2">Message Sent!</h3>
        <p className="text-zinc-400 font-medium mb-1">Thanks, {name}. We&apos;ll get back to you within 24 hours.</p>
        <p className="text-zinc-600 text-sm">Check your email at {email} for our reply.</p>
      </motion.div>
    );
  }

  const inputClass = "w-full px-4 py-4 bg-white/[0.04] border border-white/10 hover:border-white/20 focus:border-blue-500/50 rounded-xl text-white text-base placeholder:text-zinc-600 font-medium outline-none transition-all focus:ring-2 focus:ring-blue-500/20";
  const labelClass = "text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1";
  const errorClass = "text-red-400 text-xs mt-1.5 font-semibold ml-1";

  return (
    <div className="space-y-5">
      {/* Name */}
      <div>
        <label className={labelClass}>Full Name *</label>
        <div className="relative">
          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} placeholder="John Doe"
            className={`${inputClass} pl-11`} style={{ borderColor: errors.name ? "#ef4444" : undefined }} />
        </div>
        {errors.name && <p className={errorClass}>{errors.name}</p>}
      </div>

      {/* Email */}
      <div>
        <label className={labelClass}>Email *</label>
        <div className="relative">
          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="john@example.com"
            className={`${inputClass} pl-11`} style={{ borderColor: errors.email ? "#ef4444" : undefined }} />
        </div>
        {errors.email && <p className={errorClass}>{errors.email}</p>}
      </div>

      {/* Phone */}
      <div>
        <label className={labelClass}>Phone {activeTab === "call" ? "*" : <span className="text-zinc-600 normal-case font-normal">(optional)</span>}</label>
        <div className="relative">
          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" />
          <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="(555) 000-0000"
            className={`${inputClass} pl-11`} style={{ borderColor: errors.phone ? "#ef4444" : undefined }} />
        </div>
        {errors.phone && <p className={errorClass}>{errors.phone}</p>}
      </div>

      {/* Schedule-specific fields */}
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
                <label className={labelClass}>Preferred Time</label>
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

      {/* Message */}
      <div>
        <label className={labelClass}>
          {activeTab === "message" ? "How Can We Help? *" : activeTab === "schedule" ? "What would you like to learn?" : "What do you need help with?"}
        </label>
        <textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={4}
          placeholder={
            activeTab === "message" ? "I need help with my printer setup..." :
            activeTab === "schedule" ? "I'd like to learn how to set up wireless printing..." :
            "Briefly describe what you need help with..."
          }
          className={`${inputClass} resize-none`} style={{ borderColor: errors.message ? "#ef4444" : undefined }} />
        {errors.message && <p className={errorClass}>{errors.message}</p>}
      </div>

      {/* Quick topic chips */}
      {activeTab === "message" && !message && (
        <div>
          <p className="text-xs text-zinc-600 font-bold mb-2 ml-1">Quick select:</p>
          <div className="flex flex-wrap gap-2">
            {QUICK_TOPICS.map((topic) => (
              <button key={topic} onClick={() => setMessage(topic)}
                className="px-3 py-1.5 bg-white/[0.04] border border-white/10 rounded-lg text-xs font-bold text-zinc-400 hover:border-blue-500/30 hover:text-blue-400 hover:bg-blue-500/5 transition-all">
                {topic}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Submit */}
      <motion.button onClick={submit} disabled={status === "loading"} whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
        className="w-full py-5 bg-gradient-to-r from-blue-600 to-cyan-500 text-white font-black text-lg rounded-xl flex items-center justify-center gap-3 shadow-xl shadow-blue-600/25 hover:shadow-blue-500/40 transition-all mt-2 disabled:opacity-70">
        {status === "loading" ? (
          <Loader2 size={22} className="animate-spin" />
        ) : (
          <>
            {activeTab === "message" && <><Send size={18} /> Send Message</>}
            {activeTab === "schedule" && <><Calendar size={18} /> Request Booking</>}
            {activeTab === "call" && <><Phone size={18} /> Request Callback</>}
          </>
        )}
      </motion.button>

      <p className="text-center text-zinc-600 text-xs font-medium">
        We reply within 24 hours · No spam · Your data is secure
      </p>
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
      <section className="relative pb-24 overflow-hidden">
        {/* Background effects */}
        <div className="absolute top-0 right-[-10%] w-[600px] h-[600px] bg-blue-600/8 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[400px] h-[400px] bg-cyan-600/6 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute inset-0 opacity-[0.025]" style={{
          backgroundImage: "radial-gradient(circle at 1px 1px, rgba(100,180,255,0.4) 1px, transparent 0)",
          backgroundSize: "48px 48px",
        }} />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid lg:grid-cols-2 gap-16 items-start">

            {/* ─── LEFT: Info Side ─── */}
            <div className="pt-8">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-[0.2em] mb-8">
                  <Headphones size={12} /> Get Help Anytime
                </div>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 }}
                className="font-black tracking-[-0.03em] leading-[1.05] mb-6"
                style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)" }}>
                We&apos;re Here
                <br />
                <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">to Help You.</span>
              </motion.h1>

              <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
                className="text-lg text-zinc-400 font-medium leading-relaxed mb-10 max-w-md">
                Whether you have a question about our free tools, want to book a live learning session, or just need a friendly nudge in the right direction — reach out anytime.
              </motion.p>

              {/* Status badge */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
                className="inline-flex items-center gap-3 px-5 py-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl mb-10">
                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
                <span className="text-emerald-400 font-bold text-sm">Online now — we reply within 24 hours</span>
              </motion.div>

              {/* Contact info cards */}
              <div className="space-y-4 mb-10">
                {[
                  {
                    icon: <Mail size={20} className="text-blue-400" />,
                    title: "Email Us",
                    desc: "We respond within 24 hours.",
                    value: "support@setwisedigital.com",
                    href: "mailto:support@setwisedigital.com",
                  },
                  {
                    icon: <MapPin size={20} className="text-emerald-400" />,
                    title: "US & Canada",
                    desc: "Online tech education coast to coast.",
                    value: "Glassboro, NJ 08028",
                    href: null,
                  },
                  {
                    icon: <Clock size={20} className="text-amber-400" />,
                    title: "Office Hours",
                    desc: "Monday – Friday",
                    value: "9:00 AM – 6:00 PM EST",
                    href: null,
                  },
                ].map((info, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.35 + i * 0.08 }}
                    className="flex items-start gap-4 p-5 bg-white/[0.03] border border-white/8 rounded-2xl hover:border-white/15 transition-all group">
                    <div className="w-11 h-11 rounded-xl bg-white/[0.06] flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform">
                      {info.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-white text-sm">{info.title}</h4>
                      <p className="text-zinc-500 text-xs font-medium">{info.desc}</p>
                      {info.href ? (
                        <a href={info.href} className="text-blue-400 text-sm font-bold hover:text-blue-300 transition-colors mt-1 inline-flex items-center gap-1">
                          {info.value} <ArrowRight size={12} />
                        </a>
                      ) : (
                        <p className="text-zinc-300 text-sm font-bold mt-1">{info.value}</p>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Trust signals */}
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-4">
                {[
                  { icon: <Shield size={13} />, text: "Secure & private" },
                  { icon: <Globe size={13} />, text: "US & Canada" },
                  { icon: <Star size={13} className="fill-amber-400 text-amber-400" />, text: "2,400+ learners" },
                ].map((t, i) => (
                  <div key={i} className="flex items-center gap-1.5 text-zinc-500 text-xs font-bold">
                    {t.icon} {t.text}
                  </div>
                ))}
              </motion.div>
            </div>

            {/* ─── RIGHT: Form Card ─── */}
            <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2, duration: 0.8 }}>
              <div className="relative">
                {/* Glow behind card */}
                <div className="absolute -inset-4 bg-gradient-to-br from-blue-600/10 to-cyan-500/10 rounded-[3rem] blur-2xl pointer-events-none" />

                <div className="relative bg-zinc-900/80 backdrop-blur-md border border-white/10 rounded-[2.5rem] overflow-hidden">
                  {/* Gradient top bar */}
                  <div className="h-1.5 w-full bg-gradient-to-r from-blue-600 via-cyan-500 to-blue-600" />

                  <div className="p-8 md:p-10">
                    {/* Tabs */}
                    <div className="flex gap-1 p-1 bg-white/[0.04] border border-white/8 rounded-xl mb-8">
                      {TABS.map((tab) => (
                        <button key={tab.id} onClick={() => setActiveTab(tab.id)}
                          className={`flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-lg text-sm font-black transition-all ${
                            activeTab === tab.id
                              ? "bg-gradient-to-r from-blue-600 to-cyan-500 text-white shadow-lg shadow-blue-600/25"
                              : "text-zinc-500 hover:text-white hover:bg-white/[0.04]"
                          }`}>
                          {tab.icon}
                          <span className="hidden sm:inline">{tab.label}</span>
                        </button>
                      ))}
                    </div>

                    {/* Tab description */}
                    <AnimatePresence mode="wait">
                      <motion.div key={activeTab}
                        initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                        className="mb-8">
                        <h2 className="text-2xl font-black text-white mb-1">
                          {activeTab === "message" && "Get In Touch."}
                          {activeTab === "schedule" && "Book a Lesson."}
                          {activeTab === "call" && "Request a Callback."}
                        </h2>
                        <p className="text-zinc-500 text-sm font-medium">
                          {TABS.find((t) => t.id === activeTab)?.desc}
                        </p>
                      </motion.div>
                    </AnimatePresence>

                    {/* Form */}
                    <ContactForm activeTab={activeTab} />
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* ─── WHAT WE HELP WITH ─── */}
      <section className="py-20 bg-zinc-950 border-t border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeUp className="text-center mb-14">
            <h2 className="font-black tracking-tight text-2xl md:text-3xl mb-3">
              What People Contact Us About
            </h2>
            <p className="text-zinc-500 font-medium">
              Our most common support topics — all answered in plain English.
            </p>
          </FadeUp>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { emoji: "🖨️", title: "Printer Setup", desc: "Wi-Fi, offline, ink problems", href: "/techbridge/printers" },
              { emoji: "🗺️", title: "GPS Updates", desc: "Garmin, TomTom, car GPS", href: "/techbridge/gps" },
              { emoji: "🏠", title: "Smart Home", desc: "Alexa, Google Nest, bulbs", href: "/techbridge/smart-home" },
              { emoji: "🔒", title: "Security Help", desc: "Virus, passwords, scams", href: "/techbridge/security" },
            ].map((topic, i) => (
              <FadeUp key={i} delay={i * 0.06}>
                <Link href={topic.href}>
                  <motion.div whileHover={{ y: -4 }}
                    className="p-6 bg-white/[0.03] border border-white/8 hover:border-blue-500/20 rounded-2xl transition-all group cursor-pointer">
                    <div className="text-3xl mb-4">{topic.emoji}</div>
                    <h4 className="font-black text-white text-sm mb-1 group-hover:text-blue-300 transition-colors">{topic.title}</h4>
                    <p className="text-zinc-500 text-xs font-medium">{topic.desc}</p>
                    <div className="flex items-center gap-1 text-blue-400 font-bold text-xs mt-3 opacity-0 group-hover:opacity-100 transition-opacity">
                      Learn free <ArrowRight size={11} />
                    </div>
                  </motion.div>
                </Link>
              </FadeUp>
            ))}
          </div>
        </div>
      </section>

      {/* ─── BOTTOM CTA ─── */}
      <section className="py-16 bg-[#060a12] border-t border-white/5">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <FadeUp>
            <p className="text-zinc-500 font-medium text-lg mb-6">
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
