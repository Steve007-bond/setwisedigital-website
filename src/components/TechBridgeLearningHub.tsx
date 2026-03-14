"use client";

import React from "react";
import { useState, useRef } from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import {
  BookOpen, Bot, UserCheck, ChevronRight, Sparkles,
  ArrowLeft, Zap, Star, X, MousePointerClick
} from "lucide-react";
import LeadWizard, { WizardConfig } from "./LeadWizard";
import AITroubleshooter from "./AITroubleshooter";
import ExpertConsultantSection from "./ExpertConsultantSection";

interface TechBridgeLearningHubProps {
  topic: string;
  accentColor: string; // tailwind gradient e.g. "from-blue-600 to-blue-400"
  accentHex: string;
  wizardConfig: WizardConfig;
  aiProps: {
    brandExamples: string[];
    starterQuestions: string[];
  };
}

type Option = "guide" | "ai" | "expert" | null;

// ── 3D tilt card ────────────────────────────────────────────────────────────
function TiltCard({
  children,
  onClick,
  className = "",
  disabled = false,
}: {
  children: React.ReactNode;
  onClick: () => void;
  className?: string;
  disabled?: boolean;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotateX = useTransform(y, [-80, 80], [12, -12]);
  const rotateY = useTransform(x, [-80, 80], [-12, 12]);
  const springX = useSpring(rotateX, { stiffness: 300, damping: 30 });
  const springY = useSpring(rotateY, { stiffness: 300, damping: 30 });

  const handleMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    const rect = ref.current?.getBoundingClientRect();
    if (!rect) return;
    x.set(e.clientX - rect.left - rect.width / 2);
    y.set(e.clientY - rect.top - rect.height / 2);
  };

  const resetTilt = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouse}
      onMouseLeave={resetTilt}
      onClick={onClick}
      style={{ rotateX: springX, rotateY: springY, transformStyle: "preserve-3d", perspective: 1000 }}
      whileHover={disabled ? {} : { scale: 1.04, y: -8 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`cursor-pointer select-none ${className}`}
    >
      {children}
    </motion.div>
  );
}

export default function TechBridgeLearningHub({
  topic, accentColor, wizardConfig, aiProps
}: TechBridgeLearningHubProps) {
  const [selected, setSelected] = useState<Option>(null);

  const handleSelect = (opt: Option) => {
    setSelected(opt);
    setTimeout(() => {
      document.getElementById("learn")?.scrollIntoView({ behavior: "smooth", block: "start" });
    }, 100);
  };

  const options = [
    {
      id: "guide" as Option,
      icon: <BookOpen size={36} />,
      label: "Get My Free Guide",
      tagline: "3 quick questions → personalised step-by-step PDF",
      badge: "Most Popular",
      badgeColor: "bg-blue-600",
      gradient: "from-blue-600/20 via-blue-500/5 to-transparent",
      border: "border-blue-500/40",
      glow: "shadow-blue-500/25",
      iconBg: "bg-blue-600",
      steps: ["Tell us what you want to learn", "Pick your brand", "Get your guide"],
      highlight: "Free — takes 60 seconds",
    },
    {
      id: "ai" as Option,
      icon: <Bot size={36} />,
      label: "TechBridge Learning Guide",
      tagline: `Chat with TechBridge AI — 15-step guided ${topic} help`,
      badge: "Instant Help",
      badgeColor: "bg-violet-600",
      gradient: "from-violet-600/20 via-violet-500/5 to-transparent",
      border: "border-violet-500/40",
      glow: "shadow-violet-500/25",
      iconBg: "bg-violet-600",
      steps: ["Choose your topic", "Follow the lesson steps", "Complete your lesson confidently"],
      highlight: "Powered by AI — real answers",
    },
    {
      id: "expert" as Option,
      icon: <UserCheck size={36} />,
      label: "Book a Live Lesson",
      tagline: "Schedule a structured video lesson with a tech educator",
      badge: "Live Lesson",
      badgeColor: "bg-emerald-600",
      gradient: "from-emerald-600/20 via-emerald-500/5 to-transparent",
      border: "border-emerald-500/40",
      glow: "shadow-emerald-500/25",
      iconBg: "bg-emerald-600",
      steps: ["Fill a short form", "We confirm your lesson time", "Join your video lesson"],
      highlight: "Response within 24 hours",
    },
  ];

  return (
    <div id="learn" className="bg-[#080808]">

      {/* ── PICKER ───────────────────────────────────────────────────── */}
      <AnimatePresence mode="wait">
        {!selected && (
          <motion.section
            key="picker"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0, y: -30 }}
            className="py-28 relative overflow-hidden"
          >
            {/* Background glow blobs */}
            <div className="absolute inset-0 pointer-events-none">
              <motion.div
                animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                transition={{ duration: 8, repeat: Infinity }}
                className="absolute top-1/2 left-1/4 w-[600px] h-[600px] bg-blue-600 rounded-full blur-[160px] -translate-x-1/2 -translate-y-1/2"
              />
              <motion.div
                animate={{ scale: [1.2, 1, 1.2], opacity: [0.1, 0.2, 0.1] }}
                transition={{ duration: 10, repeat: Infinity, delay: 2 }}
                className="absolute top-1/2 right-1/4 w-[500px] h-[500px] bg-violet-600 rounded-full blur-[160px] translate-x-1/2 -translate-y-1/2"
              />
            </div>

            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">

              {/* Header */}
              <div className="text-center mb-16">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/5 border border-white/10 text-zinc-300 text-xs font-black uppercase tracking-[0.2em] mb-8"
                >
                  <Sparkles size={14} className="text-yellow-400" />
                  3 Ways to Get Help
                </motion.div>

                <motion.h2
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                  className="text-5xl md:text-7xl font-black tracking-tighter text-white mb-6 leading-none"
                >
                  How Would You<br />
                  <span className={`bg-gradient-to-r ${accentColor} bg-clip-text text-transparent`}>
                    Like to Learn?
                  </span>
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 }}
                  className="text-zinc-400 text-xl font-medium max-w-2xl mx-auto"
                >
                  Choose your learning path — from a free guide to a live lesson with a real educator.
                </motion.p>

                {/* Animated click hint */}
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.5 }}
                  className="flex items-center justify-center gap-2 mt-6"
                >
                  <motion.div
                    animate={{ y: [0, 6, 0], rotate: [0, 10, 0] }}
                    transition={{ duration: 1.5, repeat: Infinity }}
                  >
                    <MousePointerClick size={20} className="text-zinc-500" />
                  </motion.div>
                  <span className="text-zinc-500 text-sm font-bold">Click a card to get started</span>
                </motion.div>
              </div>

              {/* Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 [perspective:1200px]">
                {options.map((opt, i) => (
                  <motion.div
                    key={opt.id}
                    initial={{ opacity: 0, y: 60, rotateX: 15 }}
                    whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.15, type: "spring", stiffness: 100, damping: 20 }}
                  >
                    <TiltCard onClick={() => handleSelect(opt.id)}>
                      <div
                        className={`relative h-full bg-zinc-900 border-2 ${opt.border} rounded-[2.5rem] p-8 overflow-hidden group hover:shadow-2xl ${opt.glow} transition-all duration-500`}
                        style={{ transformStyle: "preserve-3d" }}
                      >
                        {/* Gradient bg */}
                        <div className={`absolute inset-0 bg-gradient-to-br ${opt.gradient} opacity-60 group-hover:opacity-100 transition-opacity duration-500`} />

                        {/* Shine sweep on hover */}
                        <motion.div
                          className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700 ease-in-out"
                        />

                        {/* Badge */}
                        <div
                          className="relative z-10"
                          style={{ transform: "translateZ(20px)" }}
                        >
                          <span className={`inline-block px-3 py-1 ${opt.badgeColor} text-white text-xs font-black rounded-full uppercase tracking-widest mb-6`}>
                            {opt.badge}
                          </span>
                        </div>

                        {/* Icon */}
                        <div
                          className="relative z-10 mb-6"
                          style={{ transform: "translateZ(30px)" }}
                        >
                          <motion.div
                            className={`w-20 h-20 ${opt.iconBg} rounded-2xl flex items-center justify-center text-white shadow-xl`}
                            whileHover={{ rotate: [0, -8, 8, 0] }}
                            transition={{ duration: 0.5 }}
                          >
                            {opt.icon}
                          </motion.div>
                        </div>

                        {/* Text */}
                        <div
                          className="relative z-10"
                          style={{ transform: "translateZ(20px)" }}
                        >
                          <h3 className="text-2xl font-black text-white mb-3 leading-tight tracking-tight">
                            {opt.label}
                          </h3>
                          <p className="text-zinc-400 font-medium text-sm leading-relaxed mb-6">
                            {opt.tagline}
                          </p>

                          {/* Steps */}
                          <div className="space-y-2 mb-6">
                            {opt.steps.map((step, j) => (
                              <motion.div
                                key={j}
                                initial={{ opacity: 0, x: -10 }}
                                whileInView={{ opacity: 1, x: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.15 + j * 0.1 }}
                                className="flex items-center gap-3"
                              >
                                <div className={`w-5 h-5 rounded-full ${opt.iconBg} flex items-center justify-center shrink-0`}>
                                  <span className="text-white text-[10px] font-black">{j + 1}</span>
                                </div>
                                <span className="text-zinc-300 text-sm font-medium">{step}</span>
                              </motion.div>
                            ))}
                          </div>

                          {/* Highlight bar */}
                          <div className="flex items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl mb-6">
                            <Zap size={14} className="text-yellow-400 shrink-0" />
                            <span className="text-zinc-300 text-xs font-bold">{opt.highlight}</span>
                          </div>

                          {/* CTA */}
                          <motion.div
                            className={`w-full py-4 bg-gradient-to-r ${opt.id === "guide" ? "from-blue-600 to-blue-500" : opt.id === "ai" ? "from-violet-600 to-violet-500" : "from-emerald-600 to-emerald-500"} rounded-2xl font-black text-white text-center flex items-center justify-center gap-2 group-hover:shadow-lg transition-all`}
                            whileHover={{ scale: 1.02 }}
                          >
                            Start Now <ChevronRight size={16} />
                          </motion.div>
                        </div>

                        {/* 3D floating star accent */}
                        {i === 0 && (
                          <motion.div
                            className="absolute top-6 right-6"
                            style={{ transform: "translateZ(40px)" }}
                            animate={{ rotate: [0, 20, 0], scale: [1, 1.2, 1] }}
                            transition={{ duration: 4, repeat: Infinity }}
                          >
                            <Star size={24} className="text-yellow-400 fill-yellow-400 opacity-80" />
                          </motion.div>
                        )}
                      </div>
                    </TiltCard>
                  </motion.div>
                ))}
              </div>

              {/* Comparison strip */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5 }}
                className="mt-16 grid grid-cols-3 gap-px bg-white/5 rounded-3xl overflow-hidden border border-white/10"
              >
                {[
                  { label: "Free Guide", cols: ["✓ Personalised PDF", "✓ 60 seconds", "✓ No signup needed", "✗ Not interactive"] },
                  { label: "AI Assistant", cols: ["✓ Live conversation", "✓ 15 guided steps", "✓ Remembers context", "✓ Discover new features"] },
                  { label: "Live Lesson", cols: ["✓ Real tech educator", "✓ Live video lesson", "✓ Personalised lesson plan", "✓ Lesson summary included"] },
                ].map((col, i) => (
                  <div key={i} className="bg-zinc-900/60 p-6">
                    <div className={`text-xs font-black uppercase tracking-widest mb-4 ${i === 0 ? "text-blue-400" : i === 1 ? "text-violet-400" : "text-emerald-400"}`}>
                      {col.label}
                    </div>
                    <div className="space-y-2">
                      {col.cols.map((item, j) => (
                        <div key={j} className={`text-xs font-medium ${item.startsWith("✓") ? "text-zinc-300" : "text-zinc-600"}`}>
                          {item}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </motion.div>

            </div>
          </motion.section>
        )}

        {/* ── GUIDE ──────────────────────────────────────────────────── */}
        {selected === "guide" && (
          <motion.section
            key="guide"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="py-16 relative"
          >
            {/* Back button */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
              <motion.button
                onClick={() => setSelected(null)}
                whileHover={{ x: -4 }}
                className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors"
              >
                <ArrowLeft size={16} /> Back to options
              </motion.button>
            </div>

            {/* Big full-width wizard */}
            <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
                  <BookOpen size={14} /> Free Personalised Guide
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                  Master Your {topic}
                </h2>
                <p className="text-zinc-400 text-lg font-medium">
                  Answer 3 quick questions — get a personalised learning guide sent to you
                </p>
              </div>

              {/* Large wizard container */}
              <motion.div
                initial={{ scale: 0.96, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, type: "spring", stiffness: 120 }}
                className="bg-zinc-900 border border-zinc-700/60 rounded-[2.5rem] p-8 md:p-14 shadow-2xl shadow-blue-500/10 relative"
              >
                {/* Subtle glow */}
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 via-transparent to-indigo-600/5 pointer-events-none" />
                <div className="relative z-10">
                  <LeadWizard config={wizardConfig} />
                </div>
              </motion.div>
            </div>
          </motion.section>
        )}

        {/* ── AI ASSISTANT ──────────────────────────────────────────── */}
        {selected === "ai" && (
          <motion.section
            key="ai"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="py-16"
          >
            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
              <motion.button
                onClick={() => setSelected(null)}
                whileHover={{ x: -4 }}
                className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors"
              >
                <ArrowLeft size={16} /> Back to options
              </motion.button>
            </div>

            <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-violet-500/10 border border-violet-500/20 text-violet-400 text-xs font-black uppercase tracking-widest mb-6">
                  <Bot size={14} /> TechBridge AI — 15-Step Support
                </div>
                <h2 className="text-4xl md:text-6xl font-black text-white mb-4 tracking-tighter">
                  Your {topic} Tutor
                  <br />
                  <span className="bg-gradient-to-r from-violet-400 to-blue-400 bg-clip-text text-transparent">is Ready to Teach</span>
                </h2>
                <p className="text-zinc-400 text-lg font-medium max-w-2xl mx-auto">
                  Alex, your personal tech tutor, walks you through up to 15 steps of {topic.toLowerCase()} skill-building.
                </p>

                {/* Steps bar */}
                <div className="flex items-center justify-center gap-1 mt-8 flex-wrap">
                  {Array.from({ length: 15 }).map((_, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: i * 0.05, type: "spring" }}
                      className="w-6 h-2 bg-zinc-800 rounded-full overflow-hidden"
                    >
                      <motion.div
                        className="h-full bg-gradient-to-r from-violet-600 to-blue-500 rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: i === 0 ? "100%" : "0%" }}
                      />
                    </motion.div>
                  ))}
                  <span className="text-zinc-500 text-xs font-bold ml-2">Step 1 of 15</span>
                </div>
              </div>

              <AITroubleshooter
                topic={topic}
                brandExamples={aiProps.brandExamples}
                starterQuestions={aiProps.starterQuestions}
              />
            </div>
          </motion.section>
        )}

        {/* ── EXPERT ─────────────────────────────────────────────────── */}
        {selected === "expert" && (
          <motion.section
            key="expert"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ type: "spring", stiffness: 120, damping: 20 }}
            className="py-16"
          >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
              <motion.button
                onClick={() => setSelected(null)}
                whileHover={{ x: -4 }}
                className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors"
              >
                <ArrowLeft size={16} /> Back to options
              </motion.button>
            </div>

            <ExpertConsultantSection topic={topic} />
          </motion.section>
        )}
      </AnimatePresence>

      {/* Floating option switcher — visible once user has selected */}
      <AnimatePresence>
        {selected && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 flex items-center gap-2 bg-zinc-900/95 backdrop-blur-xl border border-white/10 rounded-2xl px-4 py-3 shadow-2xl shadow-black/50"
          >
            <span className="text-zinc-500 text-xs font-bold mr-2 hidden sm:block">Switch to:</span>
            {options.filter((o) => o.id !== selected).map((opt) => (
              <motion.button
                key={opt.id}
                onClick={() => handleSelect(opt.id)}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className={`flex items-center gap-2 px-4 py-2 ${opt.iconBg} rounded-xl text-white text-xs font-black transition-all`}
              >
                <span className="hidden sm:inline">{opt.label}</span>
                <span className="sm:hidden">{
                  opt.id === "guide" ? "📖" : opt.id === "ai" ? "🤖" : "👤"
                }</span>
              </motion.button>
            ))}
            <button
              onClick={() => setSelected(null)}
              className="ml-1 p-1.5 text-zinc-500 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X size={14} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
