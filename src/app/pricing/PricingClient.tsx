"use client";

import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import {
  CheckCircle2, XCircle, ArrowRight, Zap, BookOpen, UserCheck,
  ShieldCheck, Award, Star, ChevronRight, Users, X,
  HeartHandshake, Sparkles, Clock, Gift, Shield,
  ArrowUpRight, PhoneCall, BadgeCheck, CircleDollarSign,
  GraduationCap, Repeat, Video, MousePointerClick,
  Send, Loader2, AlertCircle,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import EmailInput from "@/components/EmailInput";
import PhoneInput from "@/components/PhoneInput";
import { validateEmail, validatePhone } from "@/lib/validation";
import Link from "next/link";
import React, { useState, useRef, useEffect, useCallback } from "react";
import StorySimulator, { type SimScene } from "@/components/StorySimulator";

/* ── Typewriter rotating phrases for Pricing hero ── */
const PRICING_PHRASES = [
  "$49 Single Lesson",
  "$97 Skill-Builder Course",
  "$147 Family Learning Plan",
  "Live 1-on-1 Video Sessions",
  "Lifetime Access Included",
  "Plain-English Courses",
];

function usePricingTypewriter(phrases: string[], typingSpeed = 60, deletingSpeed = 35, pauseDuration = 2200) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  const tick = useCallback(() => {
    const currentPhrase = phrases[phraseIndex];
    if (!isDeleting) {
      const next = currentPhrase.slice(0, displayText.length + 1);
      setDisplayText(next);
      if (next === currentPhrase) {
        setTimeout(() => setIsDeleting(true), pauseDuration);
        return;
      }
    } else {
      const next = currentPhrase.slice(0, displayText.length - 1);
      setDisplayText(next);
      if (next === "") {
        setIsDeleting(false);
        setPhraseIndex((prev) => (prev + 1) % phrases.length);
        return;
      }
    }
  }, [phrases, phraseIndex, displayText, isDeleting, pauseDuration]);

  useEffect(() => {
    const speed = isDeleting ? deletingSpeed : typingSpeed;
    const timer = setTimeout(tick, speed);
    return () => clearTimeout(timer);
  }, [tick, isDeleting, typingSpeed, deletingSpeed]);

  return displayText;
}

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
      <motion.div className="absolute w-[100%] h-[350px] left-[10%] top-[40%] opacity-15"
        style={{ background: "linear-gradient(225deg, rgba(34,211,238,0.4) 0%, rgba(99,102,241,0.3) 40%, rgba(250,204,21,0.2) 100%)", filter: "blur(100px)", borderRadius: "40%" }}
        animate={{ x: [0, -50, 30, -60, 0], y: [0, 20, -10, 15, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut", delay: 3 }} />
    </div>
  );
}


/* ═══════════════════════════════════════════════════════════════
   FREE TOOLS DATA
   ═══════════════════════════════════════════════════════════════ */
const freeToolCards = [
  { icon: <Zap size={30} />, text: "TechBridge Tools", href: "/techbridge", gradient: "from-amber-400 to-orange-500", glow: "shadow-amber-500/30", desc: "Interactive learning hub" },
  { icon: <BookOpen size={30} />, text: "Step-by-Step PDFs", href: "/tools", gradient: "from-blue-400 to-blue-600", glow: "shadow-blue-500/30", desc: "Downloadable guides" },
  { icon: <ShieldCheck size={30} />, text: "Helpful Updates", href: "/techbridge", gradient: "from-emerald-400 to-emerald-600", glow: "shadow-emerald-500/30", desc: "Stay current & safe" },
  { icon: <UserCheck size={30} />, text: "Self-Paced Learning", href: "/tools", gradient: "from-violet-400 to-purple-600", glow: "shadow-violet-500/30", desc: "Learn at your speed" },
];

/* ═══════════════════════════════════════════════════════════════
   PLAN DATA
   ═══════════════════════════════════════════════════════════════ */
const plans = [
  {
    id: "single", name: "Single Lesson", price: 49, tagline: "Perfect for learning one device or topic in depth.",
    badge: null,
    features: ["1-hour live video lesson with an educator", "Covers one device or topic of your choice", "Plain-English, step-by-step explanations", "Lesson summary PDF to keep forever", "Email follow-up within 48 hours"],
    notIncluded: ["Multiple device coverage", "Custom learning roadmap"],
    cta: "Book a Single Lesson", ctaIcon: <Video size={22} />,
    gradient: "from-blue-600 to-blue-700", hoverGradient: "from-blue-500 to-blue-600",
    iconColor: "text-blue-600", borderColor: "border-blue-200", glowColor: "shadow-blue-500/20",
    bgGlow: "rgba(59,130,246,0.08)", priceColor: "text-blue-600",
    sessions: 1, popular: false, bestValue: false,
  },
  {
    id: "skill", name: "Skill-Builder Course", price: 97, tagline: "Build lasting confidence across multiple tech topics.",
    badge: "Most Popular",
    features: ["3 live video lesson sessions", "Personalised learning roadmap", "Covers multiple topics or devices", "Progress recap after each lesson", "Priority email support", "Lesson summary PDFs for all sessions"],
    notIncluded: ["Family member coverage"],
    cta: "Start Skill-Builder", ctaIcon: <GraduationCap size={22} />,
    gradient: "from-violet-600 to-indigo-700", hoverGradient: "from-violet-500 to-indigo-600",
    iconColor: "text-violet-600", borderColor: "border-violet-300", glowColor: "shadow-violet-500/25",
    bgGlow: "rgba(139,92,246,0.08)", priceColor: "text-violet-600",
    sessions: 3, popular: true, bestValue: false,
  },
  {
    id: "family", name: "Family Learning Plan", price: 147, tagline: "Learning for the whole household, across all devices.",
    badge: "Best Value",
    features: ["Up to 5 lesson sessions", "Covers printers, GPS, Alexa, smart home & more", "Personalised tips for every family member", "Flexible scheduling to suit everyone", "Family progress dashboard", "Priority support & follow-ups"],
    notIncluded: [],
    cta: "Get the Family Plan", ctaIcon: <Users size={22} />,
    gradient: "from-emerald-600 to-teal-700", hoverGradient: "from-emerald-500 to-teal-600",
    iconColor: "text-emerald-600", borderColor: "border-emerald-200", glowColor: "shadow-emerald-500/20",
    bgGlow: "rgba(16,185,129,0.08)", priceColor: "text-emerald-600",
    sessions: 5, popular: false, bestValue: true,
  },
];

const testimonials = [
  { name: "Margaret T.", location: "New Jersey, US", text: "The printer lesson saved me hours of frustration. Everything was explained so clearly.", rating: 5 },
  { name: "Robert & Linda K.", location: "Ontario, Canada", text: "The Family Plan was perfect. Our whole household finally understands our smart home.", rating: 5 },
  { name: "David S.", location: "Colorado, US", text: "No rushing, no jargon. The educator was patient and kind. Worth every dollar.", rating: 5 },
];

/* ═══════════════════════════════════════════════════════════════
   CONTACT FORM MODAL
   ═══════════════════════════════════════════════════════════════ */
function ContactModal({ isOpen, onClose, selectedPlan }: { isOpen: boolean; onClose: () => void; selectedPlan: string }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", countryCode: "+1", message: "" });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [error, setError] = useState("");
  const modalRef = useRef<HTMLDivElement>(null);

  const isValid = form.name.trim() !== "" && validateEmail(form.email).valid && validatePhone(form.phone).valid;

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
      setForm((f) => ({ ...f, message: selectedPlan ? `I'm interested in the ${selectedPlan} plan.` : "" }));
      setStatus("idle");
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen, selectedPlan]);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus("loading");
    setError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email,
          phone: `${form.countryCode} ${form.phone}`,
          issue: form.message || `Interested in ${selectedPlan}`,
          topic: selectedPlan || "Pricing Enquiry",
          contactMethod: "Email",
        }),
      });
      if (!res.ok) throw new Error("Network error");
      setStatus("success");
    } catch {
      setError("Something went wrong. Please email support@setwisedigital.com");
      setStatus("error");
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] flex items-center justify-center p-4"
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}>
          {/* Backdrop */}
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

          {/* Modal */}
          <motion.div ref={modalRef}
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ type: "spring", stiffness: 300, damping: 25 }}
            className="relative bg-white rounded-3xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto z-10"
            style={{ boxShadow: "0 30px 80px rgba(0,0,0,0.25)" }}>

            {/* Gradient top bar */}
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-blue-500 via-violet-500 to-emerald-500 rounded-t-3xl" />

            {/* Close button */}
            <button onClick={onClose} className="absolute top-5 right-5 w-10 h-10 rounded-full bg-zinc-100 hover:bg-zinc-200 flex items-center justify-center transition-colors z-10" aria-label="Close">
              <X size={20} className="text-zinc-500" />
            </button>

            <div className="p-8 sm:p-10">
              <AnimatePresence mode="wait">
                {status === "success" ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-8">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-green-500/30">
                      <CheckCircle2 size={40} className="text-white" />
                    </motion.div>
                    <h3 className="text-2xl font-black text-zinc-900 mb-3">Message Sent!</h3>
                    <p className="text-zinc-500 font-medium text-lg mb-1">Thanks <span className="font-bold text-zinc-900">{form.name}</span>!</p>
                    <p className="text-zinc-400 font-medium">We&apos;ll reply to <span className="font-bold text-zinc-700">{form.email}</span> within 24 hours.</p>
                    <button onClick={onClose} className="mt-8 px-8 py-4 bg-zinc-100 text-zinc-700 rounded-2xl font-bold hover:bg-zinc-200 transition-colors min-h-[52px]">Close</button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    {selectedPlan && (
                      <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-50 text-blue-700 text-sm font-bold mb-5">
                        <Sparkles size={14} /> {selectedPlan}
                      </div>
                    )}
                    <h3 className="text-2xl sm:text-3xl font-black tracking-tight mb-2 text-zinc-900">
                      Get Started <span className="text-blue-600">Today.</span>
                    </h3>
                    <p className="text-zinc-500 font-medium mb-7 text-sm">Fill in your details and we&apos;ll get back within 24 hours to book your session.</p>

                    <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-zinc-600 ml-1 block">Full Name *</label>
                        <input type="text" value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))} placeholder="John Doe" required autoComplete="name"
                          className="w-full px-5 py-4 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-lg min-h-[54px]" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-zinc-600 ml-1 block">Email *</label>
                        <EmailInput value={form.email} onChange={(val) => setForm((f) => ({ ...f, email: val }))} theme="light" placeholder="john@example.com" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-zinc-600 ml-1 block">Phone *</label>
                        <PhoneInput value={form.phone} countryCode={form.countryCode} onChange={(val, cc) => setForm((f) => ({ ...f, phone: val, countryCode: cc }))} theme="light" placeholder="555 000 0000" />
                      </div>
                      <div className="space-y-1.5">
                        <label className="text-sm font-bold text-zinc-600 ml-1 block">Message</label>
                        <textarea value={form.message} onChange={(e) => setForm((f) => ({ ...f, message: e.target.value }))} rows={2} placeholder="Any details..."
                          className="w-full px-5 py-3 bg-zinc-50 border-2 border-transparent rounded-xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-base resize-none" />
                      </div>
                      {status === "error" && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-xl">
                          <AlertCircle size={20} className="text-red-500 shrink-0 mt-0.5" />
                          <p className="text-red-600 font-medium text-base">{error}</p>
                        </div>
                      )}
                      <button type="submit" disabled={!isValid || status === "loading"}
                        className={`shine-effect w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] min-h-[60px] ${
                          isValid && status !== "loading"
                            ? "bg-gradient-to-r from-blue-600 to-violet-600 text-white hover:from-blue-500 hover:to-violet-500 shadow-lg shadow-blue-600/25"
                            : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                        }`}>
                        {status === "loading" ? <><Loader2 size={24} className="animate-spin" />Sending...</> : <><Send size={22} />Submit & Book Session</>}
                      </button>
                      <div className="flex items-center justify-center gap-2 text-zinc-400 font-bold text-xs">
                        <ShieldCheck size={14} className="text-green-500" /> Secure & never shared
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/* ═══════════════════════════════════════════════════════════════
   MAIN COMPONENT
   ═══════════════════════════════════════════════════════════════ */

const PRICING_STORY_SCENES: SimScene[] = [
  { id: "stuck", title: "You have been stuck for hours", emoji: "⏰", desc: "Googling. Watching YouTube videos. Reading forums. Nothing is working. Your device is still broken.", duration: 5000, color: "#ef4444", mood: "sad", subEmojis: ["⏰", "😤", "💻", "❌"] },
  { id: "cost", title: "Geek Squad wants $150+", emoji: "💸", desc: "And they will fix it once. Next time it breaks? Another $150. You never learn why it happened.", duration: 5000, color: "#f97316", mood: "sad", subEmojis: ["💸", "😰", "🔄", "❌"] },
  { id: "different", title: "Setwise is different", emoji: "💡", desc: "We do not just fix your problem. We TEACH you. So next time, you fix it yourself. In minutes.", duration: 5000, color: "#3b82f6", mood: "thinking", subEmojis: ["💡", "📚", "🧠", "✅"] },
  { id: "choose", title: "Pick your plan — pay once", emoji: "📋", desc: "$49 single lesson. $97 skill-builder course. $147 family plan. No subscriptions. Ever.", duration: 5000, color: "#8b5cf6", mood: "neutral", subEmojis: ["💰", "📋", "✅", "🎯"] },
  { id: "matched", title: "Matched with YOUR expert", emoji: "👨‍🏫", desc: "Not a random agent. A real educator who specializes in YOUR exact device and problem.", duration: 5000, color: "#06b6d4", mood: "happy", subEmojis: ["👨‍🏫", "🎯", "✨", "🤝"] },
  { id: "session", title: "Your live session begins", emoji: "🎥", desc: "Video call. Screen sharing. Your educator can see exactly what you see. No confusion.", duration: 5000, color: "#3b82f6", mood: "happy", subEmojis: ["🎥", "💻", "🤝", "📱"] },
  { id: "patience", title: "At YOUR pace. No rushing.", emoji: "🐢", desc: "Repeat any step. Ask any question. There is no clock ticking. Your educator has all the patience.", duration: 5000, color: "#f59e0b", mood: "happy", subEmojis: ["🐢", "❤️", "🤝", "😊"] },
  { id: "you-do-it", title: "Now YOU do it", emoji: "🤲", desc: "Your educator watches while you perform each step yourself. Building muscle memory. Real confidence.", duration: 5000, color: "#10b981", mood: "excited", subEmojis: ["💪", "🤲", "✅", "👏"] },
  { id: "solved", title: "Problem solved — and understood", emoji: "🎉", desc: "Your device works. But unlike Geek Squad, you know WHY. You can do it again tomorrow.", duration: 5000, color: "#22c55e", mood: "excited", subEmojis: ["🎉", "🧠", "✅", "⭐"] },
  { id: "lifetime", title: "Lifetime access to your guide", emoji: "♾️", desc: "Your personalized notes, steps, and recordings are yours forever. Come back anytime.", duration: 5000, color: "#8b5cf6", mood: "proud", subEmojis: ["♾️", "📚", "💾", "✅"] },
  { id: "compare", title: "$49 vs $150+ at Geek Squad", emoji: "⚖️", desc: "Cheaper. And you get education, not just a fix. The skills stay with you for life.", duration: 5000, color: "#f59e0b", mood: "proud", subEmojis: ["⚖️", "💰", "🏆", "✅"] },
  { id: "act-now", title: "Do not wait until it gets worse", emoji: "⚡", desc: "Every day without fixing it is a day of frustration. One lesson. One hour. Problem solved forever.", duration: 5000, color: "#ef4444", mood: "excited", subEmojis: ["⚡", "🚀", "🔥", "💪"] },
];

export default function PricingPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [activeTestimonial, setActiveTestimonial] = useState(0);
  const [hoveredPlan, setHoveredPlan] = useState<string | null>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState("");
  const heroRef = useRef<HTMLDivElement>(null);
  const pricingTypedText = usePricingTypewriter(PRICING_PHRASES);
  const { scrollYProgress } = useScroll({ target: heroRef, offset: ["start start", "end start"] });
  const heroOpacity = useTransform(scrollYProgress, [0, 1], [1, 0]);
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 0.96]);
  const heroY = useTransform(scrollYProgress, [0, 1], [0, 60]);

  useEffect(() => {
    const timer = setInterval(() => setActiveTestimonial((p) => (p + 1) % testimonials.length), 6000);
    return () => clearInterval(timer);
  }, []);

  const openModal = useCallback((plan: string = "") => {
    setSelectedPlan(plan);
    setModalOpen(true);
  }, []);

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <ScrollToTop />

      {/* CONTACT FORM POPUP */}
      <ContactModal isOpen={modalOpen} onClose={() => setModalOpen(false)} selectedPlan={selectedPlan} />

      {/* ════════ HERO ════════ */}
      <header ref={heroRef} className="relative overflow-hidden bg-[#0c1220] min-h-[88vh] lg:min-h-[92vh] flex items-center">
        <AuroraBackground />
        
        {/* ── Constellation network background ── */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-[1]" aria-hidden="true">
          {Array.from({ length: 12 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const baseX = 10 + col * 25 + (row % 2 === 1 ? 12 : 0);
            const baseY = 15 + row * 30;
            return (
              <motion.div
                key={`node-${i}`}
                className="absolute"
                style={{ left: `${baseX}%`, top: `${baseY}%` }}
                animate={{
                  x: [0, 15 * Math.sin(i * 0.8), -10 * Math.cos(i * 0.5), 0],
                  y: [0, -12 * Math.cos(i * 0.6), 8 * Math.sin(i * 0.7), 0],
                  opacity: [0.15, 0.35, 0.2, 0.15],
                }}
                transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.7 }}
              >
                <div className="relative">
                  <div className="w-3 h-3 rotate-45 rounded-sm"
                    style={{
                      background: ["rgba(139,92,246,0.5)", "rgba(59,130,246,0.4)", "rgba(34,211,238,0.4)", "rgba(99,102,241,0.45)"][i % 4],
                      boxShadow: `0 0 ${12 + i * 2}px ${["rgba(139,92,246,0.3)", "rgba(59,130,246,0.25)", "rgba(34,211,238,0.25)", "rgba(99,102,241,0.3)"][i % 4]}`,
                    }}
                  />
                  <motion.div className="absolute inset-[-8px] rounded-full border"
                    style={{ borderColor: ["rgba(139,92,246,0.15)", "rgba(59,130,246,0.12)", "rgba(34,211,238,0.12)", "rgba(99,102,241,0.15)"][i % 4] }}
                    animate={{ scale: [1, 2.5, 1], opacity: [0.4, 0, 0.4] }}
                    transition={{ duration: 4 + i * 0.5, repeat: Infinity, delay: i * 0.3 }}
                  />
                </div>
              </motion.div>
            );
          })}

          {/* Sweeping light beams */}
          <motion.div className="absolute w-[200px] h-[150vh] -top-[25vh]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(139,92,246,0.04), rgba(99,102,241,0.03), transparent)", transform: "rotate(15deg)" }}
            animate={{ x: ["-200px", "120vw"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", repeatDelay: 3 }} />
          <motion.div className="absolute w-[150px] h-[150vh] -top-[25vh]"
            style={{ background: "linear-gradient(90deg, transparent, rgba(59,130,246,0.03), rgba(34,211,238,0.02), transparent)", transform: "rotate(-12deg)" }}
            animate={{ x: ["120vw", "-200px"] }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut", delay: 6 }} />

          {/* Subtle dot grid */}
          <div className="absolute inset-0 opacity-[0.03]"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.8) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#FDFDFD] to-transparent z-10" />

        <motion.div style={{ opacity: heroOpacity, scale: heroScale, y: heroY }}
          className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full pt-32 pb-24 lg:pt-40 lg:pb-28">
          <div className="flex flex-col lg:flex-row items-center gap-8 lg:gap-4">

            {/* Left: Text Content */}
            <div className="lg:w-[55%] text-center lg:text-left">
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
                <span className="inline-flex items-center gap-2.5 px-5 py-2.5 rounded-full bg-gradient-to-r from-emerald-500/15 to-cyan-500/15 border border-emerald-400/25 text-emerald-300 text-sm font-bold tracking-wide">
                  <BadgeCheck size={16} className="text-emerald-400" />
                  No Subscriptions — No Hidden Fees — Pay Once
                </span>
              </motion.div>

              <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
                className="mt-8 text-5xl sm:text-6xl lg:text-7xl font-black tracking-tighter leading-[0.95] text-white">
                Simple, Honest
                <br />
                <span className="bg-gradient-to-r from-violet-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent animate-gradient bg-[length:200%_auto]">
                  Pricing.
                </span>
              </motion.h1>

              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.5 }}
                className="mt-8 max-w-xl mx-auto lg:mx-0">
                <p className="text-lg md:text-xl text-zinc-400 leading-relaxed font-medium mb-4">
                  One-time payment, lifetime access — starting with
                </p>
                <div className="h-10 md:h-12 flex items-center justify-center lg:justify-start">
                  <span className="text-xl md:text-2xl font-bold bg-gradient-to-r from-violet-400 to-cyan-400 bg-clip-text text-transparent">
                    {pricingTypedText}
                  </span>
                  <span className="w-[3px] h-7 md:h-8 bg-violet-400 ml-0.5 animate-pulse rounded-full" />
                </div>
              </motion.div>

              {/* Price anchor buttons */}
              <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.7 }}
                className="mt-10 flex flex-wrap justify-center lg:justify-start gap-4">
                {plans.map((plan) => (
                  <motion.button key={plan.id} onClick={() => openModal(plan.name)}
                    whileHover={{ scale: 1.08, y: -4 }} whileTap={{ scale: 0.95 }}
                    className="relative text-center px-6 py-4 rounded-2xl bg-white/5 border border-white/10 backdrop-blur-sm hover:bg-white/10 hover:border-white/20 transition-colors cursor-pointer group min-w-[130px]">
                    {plan.badge && (
                      <span className={`absolute -top-2.5 left-1/2 -translate-x-1/2 text-[10px] font-bold px-2.5 py-0.5 rounded-full text-white whitespace-nowrap ${plan.popular ? "bg-violet-500" : "bg-emerald-500"}`}>
                        {plan.badge}
                      </span>
                    )}
                    <div className={`text-3xl sm:text-4xl font-black ${plan.priceColor.replace("-600", "-400")}`}>${plan.price}</div>
                    <div className="text-sm text-zinc-500 font-bold mt-1">{plan.name}</div>
                  </motion.button>
                ))}
              </motion.div>

              <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.9 }}
                className="mt-8 text-zinc-500 font-bold text-sm italic tracking-wide text-center lg:text-left">
                Live 1-on-1 video lessons. <span className="text-white">No contracts. No monthly fees.</span>
              </motion.p>
            </div>

            {/* Right: 3D Character — seamless, oversized */}
            <motion.div
              initial={{ opacity: 0, x: 60, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              transition={{ duration: 1, delay: 0.5, ease: "easeOut" }}
              className="lg:w-[45%] relative mt-8 lg:mt-0 lg:overflow-visible"
            >
              {/* Glow behind character */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[110%] h-[110%] bg-violet-500/15 rounded-full blur-[120px]" />
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-400/10 rounded-full blur-[80px]" />
              </div>

              {/* Character container — oversized */}
              <div className="relative mx-auto lg:scale-[1.25] lg:origin-center lg:translate-x-[6%]">
                {/* Outer rotating ring */}
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-8%] rounded-full border border-violet-500/15">
                  <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-violet-400 rounded-full shadow-[0_0_12px_rgba(139,92,246,0.6)]" />
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
                </motion.div>

                {/* Inner counter-rotating ring */}
                <motion.div animate={{ rotate: -360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                  className="absolute inset-[-3%] rounded-full border border-blue-500/10">
                  <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
                </motion.div>

                {/* Character image — radial fade */}
                <motion.div animate={{ y: [0, -12, 0] }} transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10">
                  <div className="relative overflow-hidden">
                    <img
                      src="/Images/hero-pricing.png"
                      alt="Setwise Digital pricing — affordable tech learning"
                      className="w-full h-auto"
                      style={{
                        maskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%, black 40%, transparent 100%)',
                        WebkitMaskImage: 'radial-gradient(ellipse 75% 70% at 50% 45%, black 40%, transparent 100%)',
                      }}
                    />
                  </div>
                </motion.div>

                {/* Floating badges */}
                {[
                  { emoji: "💰", label: "$49", pos: "top-[8%] left-[2%]", delay: 0 },
                  { emoji: "✅", label: "No fees", pos: "top-[12%] right-[2%]", delay: 0.5 },
                  { emoji: "📋", label: "Courses", pos: "bottom-[28%] left-[0%]", delay: 1 },
                  { emoji: "🎯", label: "1-on-1", pos: "bottom-[25%] right-[0%]", delay: 1.5 },
                ].map((badge, i) => (
                  <motion.div key={i}
                    initial={{ opacity: 0, scale: 0 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.8 + badge.delay, duration: 0.5, type: "spring" }}
                    className={`absolute ${badge.pos} z-20`}>
                    <motion.div
                      animate={{ y: [0, -8, 0] }}
                      transition={{ duration: 3 + i * 0.5, repeat: Infinity, ease: "easeInOut", delay: badge.delay }}
                      className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.1] shadow-lg">
                      <span className="text-lg">{badge.emoji}</span>
                      <span className="text-xs font-bold text-white/80 hidden sm:inline">{badge.label}</span>
                    </motion.div>
                  </motion.div>
                ))}

                {/* Speech bubble */}
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.5 }}
                  className="absolute top-[2%] left-1/2 -translate-x-1/2 z-30">
                  <div className="px-4 py-2 bg-violet-600 text-white text-sm font-bold rounded-xl shadow-lg shadow-violet-600/30 whitespace-nowrap">
                    No hidden fees! 💜
                    <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 bg-violet-600 rotate-45" />
                  </div>
                </motion.div>
              </div>
            </motion.div>

          </div>
        </motion.div>
      </header>

      {/* ════════ ANIMATED STORY SIMULATOR ════════ */}
      <StorySimulator title="Why This Matters — Right Now" subtitle="See what happens when you choose Setwise over another frustrating Google search" scenes={PRICING_STORY_SCENES} windowTitle="Your Learning Journey — $49 to Confidence" />


      {/* ════════ MAIN ════════ */}
      <main className="pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <nav aria-label="Breadcrumb" className="pt-8 pb-4">
            <ol className="flex items-center gap-2 text-sm text-zinc-400 font-medium">
              <li><Link href="/" className="hover:text-blue-600 transition-colors">Home</Link></li>
              <li aria-hidden="true"><ChevronRight size={14} /></li>
              <li><span className="text-zinc-700 font-bold">Pricing</span></li>
            </ol>
          </nav>

          {/* ════════ FREE TOOLS — COLORFUL CLICKABLE ════════ */}
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
                  Start With <span className="bg-gradient-to-r from-amber-400 to-orange-400 bg-clip-text text-transparent">47 Free</span> Interactive Tools
                </h2>
                <p className="text-lg text-zinc-400 font-medium leading-relaxed mb-8">No sign-up. No email. No credit card. Explore printer troubleshooters, GPS guides, smart home planners — completely free, forever.</p>
                <Link href="/tools" className="shine-effect inline-flex items-center gap-3 px-7 py-4 bg-white text-zinc-900 rounded-2xl font-bold text-lg hover:bg-blue-50 transition-all hover:scale-[1.03] active:scale-[0.98] min-h-[56px]">
                  <Sparkles size={20} className="text-blue-600" /> Explore Free Tools <ArrowRight size={18} />
                </Link>
              </div>
              <div className="grid grid-cols-2 gap-4">
                {freeToolCards.map((card, i) => (
                  <Link key={i} href={card.href}>
                    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                      transition={{ delay: i * 0.1 }} whileHover={{ scale: 1.08, y: -6, rotate: 1 }} whileTap={{ scale: 0.95 }}
                      className="relative flex flex-col gap-3 p-6 rounded-2xl border border-white/10 cursor-pointer overflow-hidden group min-h-[140px]"
                      style={{ background: "rgba(255,255,255,0.05)" }}>
                      <motion.div className={`absolute inset-0 bg-gradient-to-br ${card.gradient} opacity-0 group-hover:opacity-15 transition-opacity duration-500`} />
                      <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${card.gradient} flex items-center justify-center text-white shadow-lg ${card.glow} group-hover:scale-110 transition-transform duration-300`}>{card.icon}</div>
                      <div>
                        <span className="font-bold text-base text-white block">{card.text}</span>
                        <span className="text-xs text-zinc-500 font-medium">{card.desc}</span>
                      </div>
                      <ArrowUpRight size={16} className="absolute top-4 right-4 text-zinc-600 group-hover:text-white transition-colors" />
                    </motion.div>
                  </Link>
                ))}
              </div>
            </div>
          </motion.section>

          {/* ════════ PRICING CARDS — CLICK OPENS POPUP ════════ */}
          <section id="plans" className="scroll-mt-24" aria-labelledby="plans-heading">
            <div className="text-center mb-14">
              <h2 id="plans-heading" className="text-3xl sm:text-4xl font-extrabold text-zinc-900 mb-4">Choose Your Learning Plan</h2>
              <p className="text-lg text-zinc-500 font-medium max-w-2xl mx-auto">Every plan includes live video sessions with a patient, real educator. Click any plan to get started.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
              {plans.map((plan, i) => (
                <motion.div key={plan.id} initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.5 }} className="relative">
                  {plan.badge && (
                    <div className={`absolute -top-4 left-1/2 -translate-x-1/2 z-20 px-5 py-1.5 rounded-full font-bold text-sm text-white shadow-lg ${
                      plan.popular ? "bg-gradient-to-r from-violet-600 to-indigo-600 shadow-violet-500/30" : "bg-gradient-to-r from-emerald-500 to-teal-500 shadow-emerald-500/30"
                    }`}><span className="flex items-center gap-1.5">{plan.popular ? <Star size={14} /> : <Award size={14} />}{plan.badge}</span></div>
                  )}

                  <motion.div onClick={() => openModal(plan.name)}
                    onMouseEnter={() => setHoveredPlan(plan.id)} onMouseLeave={() => setHoveredPlan(null)}
                    whileHover={{ y: -12, scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    className={`h-full bg-white rounded-3xl p-8 sm:p-10 flex flex-col cursor-pointer transition-all duration-400 relative overflow-hidden group ${
                      plan.popular ? `border-2 ${plan.borderColor} ring-1 ring-violet-200/50` : "border-2 border-zinc-200 hover:border-blue-200"
                    }`}
                    style={{ boxShadow: hoveredPlan === plan.id ? `0 25px 60px ${plan.bgGlow.replace("0.08", "0.2")}, 0 8px 24px rgba(0,0,0,0.08)` : plan.popular ? "0 20px 60px rgba(139,92,246,0.12), 0 8px 24px rgba(0,0,0,0.06)" : "0 4px 16px rgba(0,0,0,0.04)" }}>
                    <div className={`absolute inset-0 bg-gradient-to-br ${plan.gradient} opacity-0 group-hover:opacity-[0.04] transition-opacity duration-500 rounded-3xl`} />
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: hoveredPlan === plan.id ? 1 : 0 }}
                      className="absolute top-4 right-4 flex items-center gap-1.5 text-xs font-bold text-blue-500 bg-blue-50 px-3 py-1.5 rounded-full z-10">
                      <MousePointerClick size={12} /> Click to book
                    </motion.div>

                    <div className="mb-6 relative z-10">
                      <h3 className="text-2xl font-black tracking-tight text-zinc-900 mb-2">{plan.name}</h3>
                      <p className="text-zinc-500 font-medium text-base leading-relaxed">{plan.tagline}</p>
                    </div>
                    <div className="mb-6 flex items-baseline gap-2 relative z-10">
                      <motion.span className={`text-5xl sm:text-6xl font-black tracking-tight ${plan.priceColor}`}
                        animate={hoveredPlan === plan.id ? { scale: [1, 1.05, 1] } : {}} transition={{ duration: 0.4 }}>
                        ${plan.price}
                      </motion.span>
                      <span className="text-zinc-400 font-bold text-base">one-time</span>
                    </div>
                    <div className={`shine-effect w-full py-5 rounded-2xl font-bold text-xl flex items-center justify-center gap-3 transition-all min-h-[64px] mb-8 text-white bg-gradient-to-r ${
                      hoveredPlan === plan.id ? plan.hoverGradient : plan.gradient
                    } shadow-lg ${plan.glowColor} group-hover:shadow-xl relative z-10`}>
                      {plan.ctaIcon} {plan.cta} <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </div>
                    <div className="space-y-4 flex-grow relative z-10">
                      <p className="text-xs font-bold text-zinc-400 uppercase tracking-widest">What&apos;s included:</p>
                      {plan.features.map((feat, j) => (
                        <motion.div key={j} className="flex items-start gap-3" initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: 0.3 + j * 0.05 }}>
                          <CheckCircle2 size={20} className={`${plan.iconColor} shrink-0 mt-0.5`} />
                          <span className="font-medium text-base text-zinc-700 leading-snug">{feat}</span>
                        </motion.div>
                      ))}
                      {plan.notIncluded.map((feat, j) => (
                        <div key={`no-${j}`} className="flex items-start gap-3 opacity-35">
                          <XCircle size={20} className="text-zinc-400 shrink-0 mt-0.5" />
                          <span className="font-medium text-base text-zinc-400 leading-snug line-through">{feat}</span>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                </motion.div>
              ))}
            </div>

            <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
              className="mt-10 flex flex-wrap items-center justify-center gap-6 sm:gap-10 text-sm text-zinc-500 font-bold">
              {[
                { icon: <ShieldCheck size={18} className="text-green-500" />, text: "Satisfaction Guaranteed" },
                { icon: <Repeat size={18} className="text-blue-500" />, text: "No Subscriptions" },
                { icon: <CircleDollarSign size={18} className="text-emerald-500" />, text: "No Hidden Fees" },
                { icon: <Clock size={18} className="text-violet-500" />, text: "Flexible Scheduling" },
              ].map((item, i) => (
                <span key={i} className="flex items-center gap-2">{item.icon}{item.text}</span>
              ))}
            </motion.div>
          </section>

          {/* ════════ VISUAL COMPARISON — Cards, not a table ════════ */}
          <section className="mt-28" aria-labelledby="compare-heading">
            <h2 id="compare-heading" className="text-3xl sm:text-4xl font-extrabold text-center mb-4 text-zinc-900">See What Each Plan Includes</h2>
            <p className="text-center text-zinc-500 font-medium mb-14 max-w-xl mx-auto">A quick visual guide to help you pick the right plan. More filled circles = more included.</p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {plans.map((plan, i) => {
                const totalFeatures = 10;
                const included = plan.id === "single" ? 5 : plan.id === "skill" ? 8 : 10;
                const pct = Math.round((included / totalFeatures) * 100);

                return (
                  <motion.div key={plan.id} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    onClick={() => openModal(plan.name)}
                    className="bg-white rounded-3xl p-8 border-2 border-zinc-100 hover:border-blue-200 shadow-sm hover:shadow-xl transition-all cursor-pointer group relative overflow-hidden">

                    {plan.badge && (
                      <span className={`absolute top-4 right-4 text-xs font-bold px-3 py-1 rounded-full text-white ${plan.popular ? "bg-violet-500" : "bg-emerald-500"}`}>{plan.badge}</span>
                    )}

                    <h3 className="text-xl font-black text-zinc-900 mb-1">{plan.name}</h3>
                    <div className={`text-3xl font-black ${plan.priceColor} mb-4`}>${plan.price}</div>

                    {/* Visual bar */}
                    <div className="mb-6">
                      <div className="flex justify-between text-xs font-bold text-zinc-400 mb-2">
                        <span>Features included</span>
                        <span>{included}/{totalFeatures}</span>
                      </div>
                      <div className="w-full h-3 bg-zinc-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full bg-gradient-to-r ${plan.gradient}`}
                          initial={{ width: "0%" }}
                          whileInView={{ width: `${pct}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 1, delay: 0.3 + i * 0.15, ease: "easeOut" }}
                        />
                      </div>
                    </div>

                    {/* Key highlights */}
                    <div className="space-y-3 mb-6">
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${plan.gradient} flex items-center justify-center text-white text-sm font-black`}>{plan.sessions}</div>
                        <span className="font-bold text-zinc-700">Live Video Session{plan.sessions > 1 ? "s" : ""}</span>
                      </div>
                      {plan.id === "skill" || plan.id === "family" ? (
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 size={20} className="text-green-500" />
                          <span className="font-medium text-zinc-600">Custom learning roadmap</span>
                        </div>
                      ) : null}
                      {plan.id === "family" ? (
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 size={20} className="text-green-500" />
                          <span className="font-medium text-zinc-600">Whole family coverage</span>
                        </div>
                      ) : null}
                      <div className="flex items-center gap-2.5">
                        <CheckCircle2 size={20} className="text-green-500" />
                        <span className="font-medium text-zinc-600">Lesson summary PDF{plan.sessions > 1 ? "s" : ""}</span>
                      </div>
                      {(plan.id === "skill" || plan.id === "family") && (
                        <div className="flex items-center gap-2.5">
                          <CheckCircle2 size={20} className="text-green-500" />
                          <span className="font-medium text-zinc-600">Priority support</span>
                        </div>
                      )}
                    </div>

                    <div className={`w-full py-3.5 rounded-xl font-bold text-base flex items-center justify-center gap-2 text-white bg-gradient-to-r ${plan.gradient} group-hover:shadow-lg transition-all min-h-[48px]`}>
                      Choose {plan.name} <ArrowRight size={16} />
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </section>

          {/* ════════ WHY WE PRICE THIS WAY ════════ */}
          <section className="mt-28">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900">Why Our Pricing Works for You</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {[
                { icon: <CircleDollarSign size={32} className="text-blue-600" />, title: "Pay Once, Learn Forever", desc: "No monthly bills. Buy a session, keep your summary PDF forever." },
                { icon: <HeartHandshake size={32} className="text-violet-600" />, title: "Patient & Personal", desc: "Every session is 1-on-1 with a real educator. Just patient, live help." },
                { icon: <Shield size={32} className="text-emerald-600" />, title: "Honest & Transparent", desc: "The price you see is the price you pay. No hidden tricks." },
              ].map((item, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 25 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-center p-8 rounded-2xl bg-white border border-zinc-100 shadow-sm hover:shadow-lg transition-all group">
                  <div className="w-16 h-16 bg-zinc-50 rounded-2xl flex items-center justify-center mx-auto mb-5 group-hover:scale-110 transition-transform">{item.icon}</div>
                  <h3 className="font-extrabold text-xl mb-3 text-zinc-900">{item.title}</h3>
                  <p className="text-zinc-500 font-medium leading-relaxed text-base">{item.desc}</p>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ════════ TESTIMONIALS ════════ */}
          <section className="mt-28">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900">What Our Learners Say</h2>
            <div className="max-w-3xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div key={activeTestimonial} initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} transition={{ duration: 0.4 }}
                  className="bg-white rounded-3xl p-8 sm:p-12 border border-zinc-200 shadow-lg text-center">
                  <div className="flex items-center justify-center gap-1 mb-6">
                    {Array.from({ length: testimonials[activeTestimonial].rating }).map((_, j) => (
                      <Star key={j} size={24} className="text-amber-400 fill-amber-400" />
                    ))}
                  </div>
                  <p className="text-xl sm:text-2xl text-zinc-700 font-medium leading-relaxed italic mb-8">&ldquo;{testimonials[activeTestimonial].text}&rdquo;</p>
                  <div className="font-bold text-lg text-zinc-900">{testimonials[activeTestimonial].name}</div>
                  <div className="text-zinc-400 font-medium text-sm">{testimonials[activeTestimonial].location}</div>
                </motion.div>
              </AnimatePresence>
              <div className="flex items-center justify-center gap-3 mt-6">
                {testimonials.map((_, i) => (
                  <button key={i} onClick={() => setActiveTestimonial(i)}
                    className={`w-3 h-3 rounded-full transition-all ${i === activeTestimonial ? "bg-blue-600 scale-125" : "bg-zinc-300 hover:bg-zinc-400"}`} aria-label={`Testimonial ${i + 1}`} />
                ))}
              </div>
            </div>
          </section>

          {/* ════════ GUARANTEE ════════ */}
          <motion.section initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            className="mt-28 bg-gradient-to-br from-blue-50 to-violet-50 rounded-3xl p-8 sm:p-12 lg:p-16 border border-blue-100 text-center">
            <div className="max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-white rounded-2xl shadow-lg flex items-center justify-center mx-auto mb-8"><ShieldCheck size={40} className="text-blue-600" /></div>
              <h2 className="text-3xl sm:text-4xl font-black tracking-tight mb-5 text-zinc-900">100% Satisfaction Guarantee</h2>
              <p className="text-lg text-zinc-600 font-medium leading-relaxed mb-8">If your first lesson doesn&apos;t meet expectations, contact us within 24 hours for a full refund. No questions asked.</p>
              <button onClick={() => openModal()} className="inline-flex items-center gap-3 px-8 py-5 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-blue-500/20 min-h-[60px]">
                <PhoneCall size={22} /> Book Your First Session
              </button>
            </div>
          </motion.section>

          {/* ════════ FAQ ════════ */}
          <section className="mt-28 max-w-4xl mx-auto" aria-labelledby="faq-heading">
            <h2 id="faq-heading" className="text-3xl sm:text-4xl font-extrabold text-center mb-14 text-zinc-900">Pricing Questions Answered</h2>
            <div className="space-y-4">
              {[
                { q: "Are there any monthly fees or subscriptions?", a: "Absolutely not. Zero subscriptions, zero recurring fees. You pay once per plan. Our 47 free tools are always free." },
                { q: "What's the difference between the plans?", a: "Single Lesson ($49) covers one topic. Skill-Builder ($97) gives 3 sessions with a roadmap. Family Plan ($147) gives 5 sessions for the whole household." },
                { q: "Can I upgrade later?", a: "Yes! Start with a Single Lesson and we'll credit the difference toward Skill-Builder or Family Plan." },
                { q: "What if I'm not satisfied?", a: "100% satisfaction guarantee. Contact us within 24 hours of your first session for a full refund." },
                { q: "How do sessions work?", a: "Live 1-on-1 video calls with an educator. You pick the topic, we guide you. Afterward, you get a PDF summary." },
                { q: "Do you serve the US and Canada?", a: "Yes! Adults 45+ across both countries. All sessions are via video call." },
                { q: "Are the 47 free tools really free?", a: "100% free. No account, no email, no credit card needed." },
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

          {/* ════════ FINAL CTA ════════ */}
          <section className="mt-28 text-center">
            <h2 className="text-3xl sm:text-4xl font-extrabold mb-5 text-zinc-900">Ready to Get Started?</h2>
            <p className="text-lg text-zinc-500 font-medium mb-10 max-w-xl mx-auto">Pick a plan or try our free tools first.</p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button onClick={() => openModal()} className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-gradient-to-r from-blue-600 to-violet-600 hover:from-blue-500 hover:to-violet-500 text-white rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] shadow-lg shadow-blue-600/25 min-h-[60px]">
                <PhoneCall size={22} /> Book a Lesson
              </button>
              <Link href="/tools" className="inline-flex items-center justify-center gap-3 px-8 py-5 bg-zinc-100 hover:bg-zinc-200 text-zinc-700 rounded-2xl font-bold text-lg transition-all hover:scale-[1.03] active:scale-[0.98] min-h-[60px]">
                <Sparkles size={22} className="text-blue-600" /> Try Free Tools First
              </Link>
            </div>
          </section>

          {/* Links */}
          <section className="mt-28" aria-label="Explore more">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                { href: "/about", title: "About Setwise Digital", desc: "Learn our story" },
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
