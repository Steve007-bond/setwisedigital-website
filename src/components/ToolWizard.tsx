"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  CheckCircle2, ArrowRight, ArrowLeft, ChevronRight,
  Mail, Phone, User, Loader2, Award, RefreshCw,
} from "lucide-react";

export interface WizardQuestion {
  id: string;
  title: string;
  subtitle: string;
  options: { value: string; label: string; icon: string; desc: string }[];
}

export interface WizardResult {
  title: string;
  badge: string;
  badgeColor: string;
  emoji: string;
  priceRange?: string;
  screen?: string;
  bestFor?: string[];
  features: string[];
  pros: string[];
  cons: string[];
  whyMatch: string;
  score?: number;
}

interface ToolWizardProps {
  toolId: string;
  toolName: string;
  accentGradient: string;
  accentShadow: string;
  introTitle: string;
  introDesc: string;
  questions: WizardQuestion[];
  computeResults: (answers: Record<string, string>) => WizardResult[];
  leadTitle: string;
  leadDesc: string;
  leadItems: string[];
  onLeadSubmit?: (data: { name: string; email: string; phone: string; answers: Record<string, string> }) => void;
  relatedTool?: { href: string; emoji: string; title: string; desc: string; gradient: string };
  sidebarTips?: string[];
}

export default function ToolWizard({
  toolId, toolName, accentGradient, accentShadow,
  introTitle, introDesc, questions, computeResults,
  leadTitle, leadDesc, leadItems, onLeadSubmit,
  relatedTool, sidebarTips,
}: ToolWizardProps) {
  const [stage, setStage] = useState<"intro" | "quiz" | "lead" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);

  const results = computeResults(answers);
  const topResult = results[0];
  const progress = (currentQ / questions.length) * 100;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e); return Object.keys(e).length === 0;
  };

  const answerQ = (value: string) => {
    setSelected(value);
    setTimeout(() => {
      const newA = { ...answers, [questions[currentQ].id]: value };
      setAnswers(newA); setSelected(null);
      if (currentQ < questions.length - 1) setCurrentQ(p => p + 1);
      else setStage("lead");
    }, 280);
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, brand: topResult?.title, issue: `${toolName} — Top: ${topResult?.title}`, source: toolId, extra: JSON.stringify(answers) }),
      });
    } catch (e) { console.error("[lead] error:", e); }
    onLeadSubmit?.({ name, email, phone, answers });
    setSubmitted(true); setSubmitting(false); setStage("results");
  };

  const reset = () => { setStage("intro"); setCurrentQ(0); setAnswers({}); setSelected(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main */}
      <div className="lg:col-span-2">
        <AnimatePresence mode="wait">

          {/* INTRO */}
          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
              className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${accentGradient}`} />
              <div className="p-8 md:p-10">
                <h2 className="text-3xl font-black text-white mb-4">{introTitle}</h2>
                <p className="text-zinc-400 font-medium mb-8 leading-relaxed text-lg">{introDesc}</p>
                <div className="space-y-3 mb-8">
                  {questions.map((q, i) => (
                    <div key={q.id} className="flex items-center gap-4 p-5 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                      <div className={`w-10 h-10 bg-gradient-to-br ${accentGradient} rounded-full flex items-center justify-center text-white font-black text-base shrink-0`}>{i + 1}</div>
                      <div className="font-black text-white text-base">{q.title}</div>
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("quiz")}
                  className={`w-full py-6 bg-gradient-to-r ${accentGradient} text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl ${accentShadow}`}>
                  Start Free <ArrowRight size={24} />
                </motion.button>
                <p className="text-center text-base text-zinc-500 font-medium mt-4">🔒 No sign-up required to start</p>
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {stage === "quiz" && (
            <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
              transition={{ type: "spring", stiffness: 400, damping: 35 }}
              className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-zinc-800 relative">
                <motion.div className={`h-full bg-gradient-to-r ${accentGradient} rounded-full`} animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
              </div>
              <div className="p-8 md:p-10">
                <div className="flex items-center justify-between mb-8">
                  <button onClick={() => { if (currentQ === 0) setStage("intro"); else setCurrentQ(p => p - 1); }}
                    className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <span className="text-base font-black text-zinc-400">Question {currentQ + 1} of {questions.length}</span>
                </div>
                {(() => {
                  const q = questions[currentQ];
                  return (
                    <div className="space-y-6">
                      <div>
                        <div className="flex items-center gap-3 mb-3">
                          <div className={`w-10 h-10 bg-gradient-to-br ${accentGradient} rounded-xl flex items-center justify-center text-white font-black text-base`}>{currentQ + 1}</div>
                        </div>
                        <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                        <p className="text-zinc-400 font-medium text-base">{q.subtitle}</p>
                      </div>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {q.options.map((opt) => (
                          <motion.button key={opt.value} whileTap={{ scale: 0.97 }} onClick={() => answerQ(opt.value)}
                            className={`p-6 rounded-2xl border-2 text-left transition-all ${selected === opt.value || answers[q.id] === opt.value ? "border-blue-500 bg-blue-900/30 shadow-lg" : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-500"}`}>
                            <div className="text-3xl mb-3">{opt.icon}</div>
                            <div className="font-black text-white text-base mb-1">{opt.label}</div>
                            <div className="text-zinc-400 text-sm font-medium">{opt.desc}</div>
                            {(selected === opt.value || answers[q.id] === opt.value) && (
                              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-3">
                                <CheckCircle2 size={18} className="text-blue-400" />
                              </motion.div>
                            )}
                          </motion.button>
                        ))}
                      </div>
                    </div>
                  );
                })()}
              </div>
            </motion.div>
          )}

          {/* LEAD */}
          {stage === "lead" && (
            <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className={`h-1.5 bg-gradient-to-r ${accentGradient}`} />
              <div className="p-8 md:p-10">
                <div className="text-center mb-8">
                  <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, delay: 0.2 }} className="text-6xl mb-4">🎯</motion.div>
                  <h2 className="text-3xl font-black text-white mb-3">{leadTitle}</h2>
                  <p className="text-zinc-400 font-medium text-lg leading-relaxed">{leadDesc}</p>
                </div>
                <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-6 space-y-3">
                  {leadItems.map(item => (
                    <div key={item} className="flex items-center gap-3 text-base">
                      <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                      <span className="text-zinc-300 font-medium">{item}</span>
                    </div>
                  ))}
                </div>
                <div className="space-y-4 mb-6">
                  {[
                    { label: "First Name *", key: "name", type: "text", value: name, setter: setName, icon: <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />, placeholder: "e.g. Mary" },
                    { label: "Email Address *", key: "email", type: "email", value: email, setter: setEmail, icon: <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />, placeholder: "name@email.com" },
                    { label: "Phone (optional — for SMS tips)", key: "phone", type: "tel", value: phone, setter: setPhone, icon: <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />, placeholder: "+1 555 000 0000" },
                  ].map(field => (
                    <div key={field.key}>
                      <label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">{field.label}</label>
                      <div className="relative">
                        {field.icon}
                        <input type={field.type} value={field.value} onChange={e => field.setter(e.target.value)} placeholder={field.placeholder}
                          className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600 text-lg" />
                        {field.key === "email" && field.value.includes("@") && (
                          <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                            <CheckCircle2 size={18} className="text-green-500" />
                          </motion.div>
                        )}
                      </div>
                      {errors[field.key] && <p className="text-red-400 text-sm mt-1 font-bold">{errors[field.key]}</p>}
                    </div>
                  ))}
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting}
                  className={`w-full py-6 bg-gradient-to-r ${accentGradient} text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl ${accentShadow} mb-4`}>
                  {submitting ? <Loader2 size={24} className="animate-spin" /> : <><Award size={22} />Send My Free Report</>}
                </motion.button>
                <button onClick={() => setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">
                  Skip — just show me the results
                </button>
                <p className="text-center text-sm text-zinc-600 mt-4">🔒 No spam. Unsubscribe anytime. We never sell your info.<br />By submitting you agree to receive educational tips from Setwise Digital.</p>
              </div>
            </motion.div>
          )}

          {/* RESULTS */}
          {stage === "results" && topResult && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {submitted && (
                <div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-green-400 shrink-0" />
                  <p className="text-base font-bold text-green-300">Report sent to {email} — check your inbox!</p>
                </div>
              )}
              <div className="bg-zinc-900 rounded-[2rem] border-2 border-blue-800 overflow-hidden shadow-xl">
                <div className={`h-1.5 bg-gradient-to-r ${accentGradient}`} />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-lg">⭐</span>
                    </div>
                    <span className="font-black text-amber-400 text-base uppercase tracking-widest">
                      Your #1 Recommendation{name ? ` for ${name}` : ""}
                    </span>
                  </div>
                  <div className="flex items-start justify-between gap-4 mb-6">
                    <div>
                      <h3 className="text-3xl font-black text-white mb-2">{topResult.title}</h3>
                      <div className="flex items-center gap-3 flex-wrap">
                        <span className={`${topResult.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{topResult.badge}</span>
                        {topResult.priceRange && <span className="text-zinc-400 font-bold text-base">{topResult.priceRange}</span>}
                      </div>
                    </div>
                    <div className="text-5xl">{topResult.emoji}</div>
                  </div>
                  {(topResult.screen || topResult.bestFor?.[0]) && (
                    <div className="grid grid-cols-2 gap-4 mb-6">
                      {topResult.screen && <div className="bg-zinc-800 rounded-2xl p-5"><div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Screen Size</div><div className="font-black text-white text-lg">{topResult.screen}</div></div>}
                      {topResult.bestFor?.[0] && <div className="bg-zinc-800 rounded-2xl p-5"><div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Best For</div><div className="font-black text-white text-base">{topResult.bestFor[0]}</div></div>}
                    </div>
                  )}
                  <div className="mb-5">
                    <div className="text-base font-black text-zinc-200 mb-3">Why this is right for you:</div>
                    <p className="text-base text-blue-300 font-medium p-4 bg-blue-900/20 border border-blue-800 rounded-xl">{topResult.whyMatch}</p>
                  </div>
                  <div className="mb-6">
                    <div className="text-base font-black text-zinc-200 mb-3">Key Features:</div>
                    <div className="space-y-2">
                      {topResult.features.map(f => (
                        <div key={f} className="flex items-center gap-3 text-base text-zinc-300 font-medium">
                          <CheckCircle2 size={16} className="text-blue-400 shrink-0" />{f}
                        </div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-5">
                    <div>
                      <div className="text-sm font-black text-green-400 uppercase tracking-widest mb-2">✓ Pros</div>
                      {topResult.pros.map(p => <div key={p} className="text-sm text-zinc-400 font-medium mb-1.5">• {p}</div>)}
                    </div>
                    <div>
                      <div className="text-sm font-black text-red-400 uppercase tracking-widest mb-2">✗ Consider</div>
                      {topResult.cons.map(c => <div key={c} className="text-sm text-zinc-400 font-medium mb-1.5">• {c}</div>)}
                    </div>
                  </div>
                </div>
              </div>
              {results.length > 1 && (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="font-black text-white mb-5 text-xl">Also Consider</h3>
                  <div className="space-y-4">
                    {results.slice(1, 3).map((r, i) => (
                      <motion.div key={r.title} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                        className="flex items-center gap-5 p-5 bg-zinc-800 rounded-2xl">
                        <div className="text-3xl">{r.emoji}</div>
                        <div className="flex-1">
                          <div className="font-black text-white text-base">{r.title}</div>
                          {r.priceRange && <div className="text-zinc-400 text-sm font-medium">{r.priceRange}</div>}
                        </div>
                        <span className={`${r.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{r.badge}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg">
                  <RefreshCw size={20} /> Try Again
                </button>
                {relatedTool && (
                  <a href={relatedTool.href}>
                    <motion.div whileHover={{ scale: 1.02 }} className={`flex items-center justify-center gap-2 py-5 bg-gradient-to-r ${relatedTool.gradient} text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg`}>
                      <span>{relatedTool.emoji}</span> {relatedTool.title}
                    </motion.div>
                  </a>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Sidebar */}
      <div className="space-y-6">
        {sidebarTips && (
          <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
            <h3 className="font-black text-white mb-5 text-base uppercase tracking-widest flex items-center gap-2">⭐ Quick Tips</h3>
            <div className="space-y-4">
              {sidebarTips.map((tip, i) => (
                <div key={i} className="flex items-start gap-3 text-base text-zinc-400 font-medium">
                  <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />{tip}
                </div>
              ))}
            </div>
          </div>
        )}
        {relatedTool && (
          <a href={relatedTool.href}>
            <div className={`bg-gradient-to-br ${relatedTool.gradient} rounded-[2rem] p-7 cursor-pointer hover:scale-[1.02] transition-transform`}>
              <div className="text-4xl mb-4">{relatedTool.emoji}</div>
              <h3 className="font-black text-white mb-2 text-lg">{relatedTool.title}</h3>
              <p className="text-white/80 text-base font-medium mb-4">{relatedTool.desc}</p>
              <div className="flex items-center gap-2 text-white font-black text-base">Try it free →</div>
            </div>
          </a>
        )}
        <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
          <h3 className="font-black text-white mb-4 text-base uppercase tracking-widest">🔒 Educational Note</h3>
          <p className="text-sm text-zinc-400 font-medium leading-relaxed">All tools are for learning and guidance purposes only. Setwise Digital is an independent educational platform not affiliated with any brand or manufacturer.</p>
        </div>
      </div>
    </div>
  );
}
