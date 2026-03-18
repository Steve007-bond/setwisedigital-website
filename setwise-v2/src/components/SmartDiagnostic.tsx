"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ChevronRight, CheckCircle2, ArrowLeft, RotateCcw,
  Lightbulb, Star, Gift, Phone, Mail, Shield,
  Zap, BookOpen, UserCheck, AlertCircle, ThumbsUp,
  Sparkles, Trophy, Heart
} from "lucide-react";
import EmailInput from "@/components/EmailInput";
import PhoneInput from "@/components/PhoneInput";
import { validateEmail, validatePhone } from "@/lib/validation";

// ─── Types ───────────────────────────────────────────────────────────────────

interface Option {
  label: string;
  icon?: string;
  nextId?: string;
  isFinal?: boolean;
  tag?: "popular" | "quick" | "advanced";
}

interface Step {
  id: string;
  type: "question" | "result" | "upsell" | "lead";
  title: string;
  subtitle?: string;
  options?: Option[];
  result?: {
    heading: string;
    steps: string[];
    tip?: string;
    upsell?: string;
    difficulty: "easy" | "medium" | "hard";
    time: string;
  };
}

interface DiagnosticProps {
  topic: string;
  steps: Step[];
  brandExamples: string[];
  features: { icon: string; title: string; desc: string }[];
}

// ─── Lead Form ────────────────────────────────────────────────────────────────

function LeadForm({ topic, onDone }: { topic: string; onDone: () => void }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", countryCode: "+1", age: "", purpose: "", device: "" });
  const [interests, setInterests] = useState<string[]>([]);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const toggleInterest = (i: string) =>
    setInterests((p) => p.includes(i) ? p.filter((x) => x !== i) : [...p, i]);

  const isValid =
    form.name.trim() !== "" &&
    validateEmail(form.email).valid &&
    validatePhone(form.phone).valid &&
    form.purpose.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setLoading(true);
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email,
          phone: `${form.countryCode} ${form.phone}`, topic,
          device: form.device,
          issue: `Age: ${form.age} | Purpose: ${form.purpose} | Interests: ${interests.join(", ")}`,
          availability: "Via Smart Diagnostic lead", contactMethod: "Email",
        }),
      });
    } catch {}
    setLoading(false);
    setSubmitted(true);
    setTimeout(onDone, 2500);
  };

  if (submitted) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="text-center py-10">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
        <Trophy size={36} className="text-green-600" />
      </div>
      <h3 className="text-2xl font-black text-zinc-900 mb-2">You&apos;re all set, {form.name}! 🎉</h3>
      <p className="text-zinc-500 font-medium">Our team will reach out to {form.email} with personalised tips.</p>
    </motion.div>
  );

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
      <div className="flex items-center gap-3 mb-6">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center">
          <Gift size={22} className="text-white" />
        </div>
        <div>
          <div className="font-black text-lg text-zinc-900">Get your personalised {topic} guide</div>
          <div className="text-sm text-zinc-500 font-medium">Free • Takes 30 seconds • No spam ever</div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-1">First Name *</label>
            <input type="text" placeholder="e.g. Mary" value={form.name} required
              onChange={(e) => setForm(p => ({ ...p, name: e.target.value }))}
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
          </div>
          <div>
            <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-1">Age (optional)</label>
            <input type="number" placeholder="e.g. 55" value={form.age}
              onChange={(e) => setForm(p => ({ ...p, age: e.target.value }))}
              className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
          </div>
        </div>

        <div>
          <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-1">Email Address *</label>
          <EmailInput
            value={form.email}
            onChange={(val) => setForm(p => ({ ...p, email: val }))}
            theme="light"
          />
        </div>

        <div>
          <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-1">Phone Number *</label>
          <PhoneInput
            value={form.phone}
            countryCode={form.countryCode}
            onChange={(val, cc) => setForm(p => ({ ...p, phone: val, countryCode: cc }))}
            theme="light"
          />
        </div>

        <div>
          <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-1">What do you use your {topic.toLowerCase()} for? *</label>
          <input type="text" placeholder={`e.g. printing medical forms, photos`} value={form.purpose} required
            onChange={(e) => setForm(p => ({ ...p, purpose: e.target.value }))}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
        </div>
        <div>
          <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-1">Your device brand/model</label>
          <input type="text" placeholder={`e.g. HP OfficeJet Pro 9015`} value={form.device}
            onChange={(e) => setForm(p => ({ ...p, device: e.target.value }))}
            className="w-full px-4 py-3 bg-zinc-50 border border-zinc-200 rounded-2xl text-sm font-medium focus:outline-none focus:border-blue-500 focus:bg-white transition-all" />
        </div>

        <div>
          <div className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">What would help you most?</div>
          <div className="flex flex-wrap gap-2">
            {["Step-by-step guides", "Hidden features", "Money-saving tips", "Live lesson sessions", "Free PDF guides", "Video walkthroughs"].map((i) => (
              <button key={i} type="button" onClick={() => toggleInterest(i)}
                className={`px-3 py-2 rounded-full text-xs font-bold border transition-all ${
                  interests.includes(i) ? "bg-blue-600 border-blue-600 text-white" : "bg-zinc-50 border-zinc-200 text-zinc-600 hover:border-blue-400"
                }`}>
                {i}
              </button>
            ))}
          </div>
        </div>

        <button type="submit" disabled={!isValid || loading}
          className={`w-full py-4 font-black text-lg rounded-2xl transition-all shadow-lg flex items-center justify-center gap-3 ${
            isValid && !loading
              ? "bg-blue-600 hover:bg-blue-700 text-white shadow-blue-500/20"
              : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
          }`}>
          {loading ? <><div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />Sending...</>
            : <><Star size={20} />Get My Free Personalised Guide</>}
        </button>
        <p className="text-center text-xs text-zinc-400">🔒 Safe & secure — we never share your info</p>
      </form>
    </motion.div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SmartDiagnostic({ topic, steps, brandExamples, features }: DiagnosticProps) {
  const [currentId, setCurrentId] = useState("start");
  const [history, setHistory] = useState<string[]>([]);
  const [showLead, setShowLead] = useState(false);
  const [completed, setCompleted] = useState(false);
  const [selections, setSelections] = useState<string[]>([]);
  const topRef = useRef<HTMLDivElement>(null);

  const currentStep = steps.find((s) => s.id === currentId);
  const progress = currentId === "start" ? 5 : Math.min(90, (history.length / (steps.length - 1)) * 100);

  const goTo = (id: string, label: string) => {
    setHistory((h) => [...h, currentId]);
    setSelections((s) => [...s, label]);
    setCurrentId(id);
    setTimeout(() => topRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 100);
  };

  const goBack = () => {
    if (history.length === 0) return;
    setCurrentId(history[history.length - 1]);
    setHistory((h) => h.slice(0, -1));
    setSelections((s) => s.slice(0, -1));
  };

  const reset = () => {
    setCurrentId("start");
    setHistory([]);
    setSelections([]);
    setShowLead(false);
    setCompleted(false);
  };

  const difficultyColor = {
    easy: "text-green-600 bg-green-50 border-green-200",
    medium: "text-amber-600 bg-amber-50 border-amber-200",
    hard: "text-red-600 bg-red-50 border-red-200",
  };

  return (
    <section className="py-24 bg-zinc-900" ref={topRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
            <Zap size={14} />
            Smart Learning Guide
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tighter mb-4">
            Master Your {topic} in Minutes
          </h2>
          <p className="text-zinc-400 font-medium max-w-xl mx-auto">
            Answer a few quick questions — we'll give you exact steps plus tips most people never discover.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {brandExamples.map((b) => (
              <span key={b} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-zinc-400">{b}</span>
            ))}
          </div>
        </div>

        {/* Feature strip */}
        <div className="grid grid-cols-3 gap-3 mb-6">
          {features.map((f, i) => (
            <div key={i} className="flex items-center gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
              <span className="text-xl">{f.icon}</span>
              <div>
                <div className="text-white font-black text-xs">{f.title}</div>
                <div className="text-zinc-500 text-xs font-medium">{f.desc}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Breadcrumb path */}
        {selections.length > 0 && (
          <div className="flex flex-wrap items-center gap-2 mb-4 px-1">
            {selections.map((s, i) => (
              <div key={i} className="flex items-center gap-2">
                <span className="px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full text-xs font-bold text-blue-400">{s}</span>
                {i < selections.length - 1 && <ChevronRight size={12} className="text-zinc-600" />}
              </div>
            ))}
          </div>
        )}

        {/* Progress bar */}
        <div className="h-1.5 bg-zinc-800 rounded-full mb-6 overflow-hidden">
          <motion.div animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }}
            className="h-full bg-gradient-to-r from-blue-600 to-indigo-500 rounded-full" />
        </div>

        {/* Main card */}
        <div className="bg-white rounded-[2rem] overflow-hidden shadow-2xl">

          {/* Card header */}
          <div className="bg-zinc-900 px-6 py-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center">
                <Sparkles size={16} className="text-white" />
              </div>
              <span className="text-white font-black text-sm">Setwise {topic} Diagnostic</span>
            </div>
            <div className="flex items-center gap-3">
              {history.length > 0 && (
                <button onClick={goBack}
                  className="flex items-center gap-1 text-zinc-400 hover:text-white text-xs font-bold transition-colors">
                  <ArrowLeft size={14} /> Back
                </button>
              )}
              <button onClick={reset}
                className="flex items-center gap-1 text-zinc-500 hover:text-white text-xs font-bold transition-colors">
                <RotateCcw size={12} /> Reset
              </button>
            </div>
          </div>

          {/* Card body */}
          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              {!showLead ? (
                <motion.div key={currentId}
                  initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.25 }}>

                  {/* QUESTION step */}
                  {currentStep?.type === "question" && (
                    <div className="space-y-6">
                      <div>
                        <h3 className="text-2xl md:text-3xl font-black text-zinc-900 leading-tight mb-2">
                          {currentStep.title}
                        </h3>
                        {currentStep.subtitle && (
                          <p className="text-zinc-500 font-medium">{currentStep.subtitle}</p>
                        )}
                      </div>
                      <div className="space-y-3">
                        {currentStep.options?.map((opt, i) => (
                          <motion.button key={i} whileHover={{ x: 6 }} whileTap={{ scale: 0.98 }}
                            onClick={() => opt.isFinal ? (setCurrentId(opt.nextId || ""), setHistory(h => [...h, currentId]), setSelections(s => [...s, opt.label])) : goTo(opt.nextId || "start", opt.label)}
                            className="w-full flex items-center justify-between p-5 bg-zinc-50 hover:bg-blue-600 border border-zinc-100 hover:border-blue-600 rounded-2xl group transition-all">
                            <div className="flex items-center gap-4">
                              {opt.icon && <span className="text-2xl">{opt.icon}</span>}
                              <span className="font-black text-zinc-800 group-hover:text-white text-lg transition-colors">
                                {opt.label}
                              </span>
                            </div>
                            <div className="flex items-center gap-2">
                              {opt.tag && (
                                <span className={`px-2 py-0.5 rounded-full text-xs font-black ${
                                  opt.tag === "popular" ? "bg-blue-100 text-blue-700 group-hover:bg-white/20 group-hover:text-white" :
                                  opt.tag === "quick" ? "bg-green-100 text-green-700 group-hover:bg-white/20 group-hover:text-white" :
                                  "bg-purple-100 text-purple-700 group-hover:bg-white/20 group-hover:text-white"
                                } transition-all`}>
                                  {opt.tag === "popular" ? "Most popular" : opt.tag === "quick" ? "2 min lesson" : "In-depth"}
                                </span>
                              )}
                              <ChevronRight size={20} className="text-zinc-300 group-hover:text-white transition-colors" />
                            </div>
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* RESULT step */}
                  {currentStep?.type === "result" && currentStep.result && (
                    <div className="space-y-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 bg-blue-600 rounded-2xl flex items-center justify-center shrink-0 shadow-lg">
                          <CheckCircle2 size={24} className="text-white" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-zinc-900">{currentStep.result.heading}</h3>
                          <div className="flex items-center gap-3 mt-2 flex-wrap">
                            <span className={`px-3 py-1 rounded-full text-xs font-black border ${difficultyColor[currentStep.result.difficulty]}`}>
                              {currentStep.result.difficulty === "easy" ? "✅ Easy to learn" : currentStep.result.difficulty === "medium" ? "⚠️ Moderate" : "🔧 Advanced"}
                            </span>
                            <span className="px-3 py-1 rounded-full text-xs font-bold bg-zinc-100 text-zinc-600 border border-zinc-200">
                              ⏱ {currentStep.result.time}
                            </span>
                          </div>
                        </div>
                      </div>

                      {/* Steps */}
                      <div className="space-y-3">
                        {currentStep.result.steps.map((step, i) => (
                          <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: i * 0.08 }}
                            className="flex gap-4 p-4 bg-zinc-50 rounded-2xl border border-zinc-100 group hover:border-blue-200 transition-all">
                            <span className="w-8 h-8 rounded-xl bg-blue-600 text-white text-sm font-black flex items-center justify-center shrink-0">
                              {i + 1}
                            </span>
                            <p className="text-zinc-700 font-medium leading-relaxed">{step}</p>
                          </motion.div>
                        ))}
                      </div>

                      {/* Tip */}
                      {currentStep.result.tip && (
                        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}
                          className="p-4 bg-yellow-50 border border-yellow-200 rounded-2xl flex gap-3">
                          <Lightbulb size={20} className="text-yellow-600 shrink-0 mt-0.5" />
                          <div>
                            <div className="font-black text-yellow-800 text-sm mb-1">💡 Did you know?</div>
                            <p className="text-yellow-700 text-sm font-medium leading-relaxed">{currentStep.result.tip}</p>
                          </div>
                        </motion.div>
                      )}

                      {/* Upsell */}
                      {currentStep.result.upsell && (
                        <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.7 }}
                          className="p-5 bg-blue-600 rounded-2xl text-white">
                          <div className="flex items-start gap-3">
                            <ThumbsUp size={20} className="shrink-0 mt-0.5" />
                            <div>
                              <div className="font-black mb-1">Want to go further?</div>
                              <p className="text-blue-100 text-sm font-medium">{currentStep.result.upsell}</p>
                            </div>
                          </div>
                        </motion.div>
                      )}

                      {/* CTA buttons */}
                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                        <button onClick={() => setShowLead(true)}
                          className="flex items-center justify-center gap-2 p-4 bg-zinc-900 hover:bg-blue-600 text-white rounded-2xl font-black text-sm transition-all">
                          <Mail size={16} /> Get PDF Guide
                        </button>
                        <button onClick={() => setShowLead(true)}
                          className="flex items-center justify-center gap-2 p-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-2xl font-black text-sm transition-all">
                          <UserCheck size={16} /> Book Expert
                        </button>
                        <button onClick={reset}
                          className="flex items-center justify-center gap-2 p-4 bg-zinc-100 hover:bg-zinc-200 text-zinc-900 rounded-2xl font-black text-sm transition-all">
                          <RotateCcw size={16} /> New Problem
                        </button>
                      </div>
                    </div>
                  )}

                </motion.div>
              ) : (
                <motion.div key="lead" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                  <LeadForm topic={topic} onDone={() => { setShowLead(false); reset(); }} />
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Footer */}
          <div className="bg-zinc-50 border-t border-zinc-100 px-6 py-4 flex items-center justify-between flex-wrap gap-2">
            <div className="flex items-center gap-2 text-zinc-400 text-xs font-bold">
              <Heart size={12} className="text-red-400" />
              Built for non-technical users
            </div>
            <div className="flex items-center gap-4 text-xs text-zinc-400 font-bold">
              <span>support@setwisedigital.com</span>
              <span>www.setwisedigital.com</span>
            </div>
          </div>
        </div>

        {/* Bottom social proof */}
        <div className="grid grid-cols-3 gap-4 mt-6">
          {[
            { icon: "⚡", stat: "2 min", label: "Average lesson start" },
            { icon: "✅", stat: "98%", label: "Problems solved" },
            { icon: "🔒", stat: "100%", label: "Free to use" },
          ].map((item, i) => (
            <div key={i} className="text-center p-4 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-2xl mb-1">{item.icon}</div>
              <div className="text-white font-black text-xl">{item.stat}</div>
              <div className="text-zinc-500 text-xs font-medium">{item.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
