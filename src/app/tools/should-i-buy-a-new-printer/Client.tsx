"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, AlertCircle, TrendingUp } from "lucide-react";

const bgs = [
  { url: "https://images.unsplash.com/photo-1563520239648-a8ade7166c97?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
];

const QUESTIONS = [
  {
    id: "age",
    title: "How old is your current printer?",
    subtitle: "Be as honest as you can — printer age is the single biggest factor",
    options: [
      { v: "under2", label: "Under 2 years old", icon: "🟢", desc: "Relatively new", keep: 40, replace: 0 },
      { v: "2to4", label: "2–4 years old", icon: "🟡", desc: "Middle range", keep: 20, replace: 10 },
      { v: "5to7", label: "5–7 years old", icon: "🟠", desc: "Getting older", keep: 5, replace: 25 },
      { v: "over7", label: "More than 7 years old", icon: "🔴", desc: "Has had a long life", keep: 0, replace: 40 },
    ],
  },
  {
    id: "problems",
    title: "What problems are you having?",
    subtitle: "Select the description that best matches your situation",
    options: [
      { v: "none", label: "No problems — I just want to upgrade", icon: "✅", desc: "Printer works fine", keep: 35, replace: 5 },
      { v: "occasional", label: "Occasional issues — jams or slow now and then", icon: "⚠️", desc: "Minor, manageable problems", keep: 25, replace: 15 },
      { v: "frequent", label: "Frequent problems — breaks down regularly", icon: "🔴", desc: "Something wrong several times per month", keep: 5, replace: 35 },
      { v: "stopped", label: "Completely stopped working", icon: "❌", desc: "Won't print at all", keep: 0, replace: 45 },
    ],
  },
  {
    id: "ink_cost",
    title: "How much are you spending on ink each year?",
    subtitle: "Think about how many cartridges you've bought in the past 12 months",
    options: [
      { v: "under50", label: "Under $50/year", icon: "💚", desc: "Light printing, low ink cost", keep: 30, replace: 5 },
      { v: "50to150", label: "$50–$150/year", icon: "💛", desc: "Moderate ink spending", keep: 20, replace: 15 },
      { v: "150to300", label: "$150–$300/year", icon: "🟠", desc: "High ink spend on cartridges", keep: 5, replace: 25 },
      { v: "over300", label: "Over $300/year on ink", icon: "🔴", desc: "Very high cartridge costs", keep: 0, replace: 40 },
    ],
  },
  {
    id: "repair",
    title: "Have you had a repair quote — or tried troubleshooting?",
    subtitle: "Before replacing, it's worth knowing what fixing it would cost",
    options: [
      { v: "not_tried", label: "Haven't tried troubleshooting yet", icon: "🔧", desc: "I came here first", keep: 25, replace: 5 },
      { v: "tried_fixed", label: "Tried troubleshooting and it works now", icon: "✅", desc: "Basic fixes worked", keep: 40, replace: 0 },
      { v: "tried_failed", label: "Tried troubleshooting — still broken", icon: "❌", desc: "Nothing helped", keep: 5, replace: 30 },
      { v: "repair_expensive", label: "Got a repair quote — costs more than $100", icon: "💸", desc: "Repair not worth it", keep: 0, replace: 45 },
    ],
  },
];

type VerdictType = "keep" | "troubleshoot_first" | "replace";

function getVerdict(keepScore: number, replaceScore: number, answers: Record<string, string>): {
  verdict: VerdictType;
  headline: string;
  reason: string;
  nextSteps: string[];
  newPrinterTip?: string;
} {
  if (answers.problems === "none" && keepScore > replaceScore) {
    return {
      verdict: "keep",
      headline: "Keep your current printer",
      reason: "Your printer is working fine. Upgrading a working printer is rarely worth the cost unless you have a specific new need — like wireless printing or lower ink costs.",
      nextSteps: ["If you want to reduce ink costs, consider whether an Epson EcoTank would save you money in the next 2 years", "If your printer is over 5 years old, start noting any changes in print quality", "Make sure you're printing at least once a week to prevent ink nozzle clogging"],
    };
  }
  if (answers.repair === "not_tried" && answers.problems !== "stopped") {
    return {
      verdict: "troubleshoot_first",
      headline: "Try troubleshooting first — then decide",
      reason: "Before buying anything new, it's worth trying the free fixes. Most common printer problems — offline errors, blank pages, poor quality — are resolved by a print head cleaning, restarting the printer, or clearing a stuck print queue. Over 80% of printer complaints are fixable without spending anything.",
      nextSteps: ["Try our 'My Printer Stopped Working' guide — it covers the most common fixes step by step", "Run 2–3 Head Cleaning cycles from the printer's Maintenance menu", "Restart your printer, computer, and Wi-Fi router in that order", "If the problem persists after trying all fixes, then consider replacing"],
    };
  }
  if (replaceScore >= 70) {
    return {
      verdict: "replace",
      headline: "It's time to replace your printer",
      reason: "Based on the age, frequency of problems, and repair costs, replacing your printer makes more financial sense than continuing to repair it. The industry rule of thumb: if repair costs exceed 50% of a new printer's price, replace it.",
      nextSteps: ["For document printing + saving on ink: Epson EcoTank ET-2800 ($199) pays for itself in 12–18 months", "For simplest setup and best app: HP DeskJet 4155e ($89) — great entry-level choice", "For reliability and fax: Brother MFC-J1010DW ($119) — built to last 8+ years", "For best photo quality: Canon PIXMA TR4720 ($79) — exceptional colour"],
      newPrinterTip: "Key tip: When buying new, avoid 'cheap' printers under $60 — the ink costs more than the printer within 6 months. Spend $80+ for a printer that uses reasonably-priced cartridges.",
    };
  }
  if (replaceScore >= 45) {
    return {
      verdict: "troubleshoot_first",
      headline: "Try fixes first — replacement may not be far off",
      reason: "Your printer is showing signs of age or problems, but before spending money on a new one it's worth trying a few things. If those don't resolve the issue, then replacing is likely the right call.",
      nextSteps: ["Try our 'My Printer Stopped Working' guide for free fixes first", "Run a Print Head Cleaning 2–3 times from the Maintenance menu", "If the problem continues after fixes, use our 'Best Printer for Seniors' guide to find your ideal replacement", "Set a budget and check current prices — printers are often on sale at Costco, Best Buy, and Amazon"],
    };
  }
  return {
    verdict: "keep",
    headline: "Keep your current printer — for now",
    reason: "Based on your answers, your printer is worth keeping. The problems you're experiencing are likely fixable without spending anything on a replacement.",
    nextSteps: ["Use our 'My Printer Stopped Working' guide to fix the current issue for free", "Set a reminder to reassess in 12 months — printer technology moves fast", "If ink costs are above $150/year, research Epson EcoTank — the savings can be substantial over 2–3 years"],
  };
}

export default function Client() {
  const [stage, setStage] = useState<"intro" | "quiz" | "lead" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [scores, setScores] = useState({ keep: 0, replace: 0 });
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);

  const progress = (currentQ / QUESTIONS.length) * 100;
  const result = Object.keys(answers).length === QUESTIONS.length ? getVerdict(scores.keep, scores.replace, answers) : null;

  const answer = (value: string, keep: number, replace: number) => {
    setSelectedOption(value);
    setTimeout(() => {
      const newAnswers = { ...answers, [QUESTIONS[currentQ].id]: value };
      setAnswers(newAnswers);
      setScores(prev => ({ keep: prev.keep + keep, replace: prev.replace + replace }));
      setSelectedOption(null);
      if (currentQ < QUESTIONS.length - 1) setCurrentQ(p => p + 1);
      else setStage("lead");
    }, 300);
  };

  const validate = () => { const e: Record<string, string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, issue: `Replace vs Keep — Verdict: ${result?.verdict} — Age: ${answers.age} — Problems: ${answers.problems}`, source: "should-i-buy-a-new-printer" }) }); } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = () => { setStage("intro"); setCurrentQ(0); setAnswers({}); setScores({ keep: 0, replace: 0 }); setSelectedOption(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  const verdictColor = result?.verdict === "keep" ? "from-green-500 to-emerald-400" : result?.verdict === "replace" ? "from-red-500 to-rose-400" : "from-amber-500 to-orange-400";
  const verdictBorder = result?.verdict === "keep" ? "border-green-700" : result?.verdict === "replace" ? "border-red-700" : "border-amber-700";
  const verdictText = result?.verdict === "keep" ? "text-green-400" : result?.verdict === "replace" ? "text-red-400" : "text-amber-400";
  const verdictIcon = result?.verdict === "keep" ? "✅" : result?.verdict === "replace" ? "🆕" : "🔧";

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={() => {}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">Replace or Keep My Printer</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14} /> Free Guide · Honest Verdict in 2 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
            Should I Buy<br /><span className="bg-gradient-to-r from-amber-400 to-orange-300 bg-clip-text text-transparent italic">a New Printer?</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Honest answer in under 2 minutes. No upselling. Just a clear verdict based on your actual situation — age, problems, and what a replacement would cost versus what you'd save.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">

          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-400" />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-4">The honest printer replacement guide 🖨️</h2>
                  <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">Most printer guides push you to buy something new. This one is different — we'll tell you honestly whether your printer is worth keeping, whether a free fix might solve the problem, or whether replacing genuinely makes sense.</p>
                  <div className="grid grid-cols-3 gap-3 mb-6">
                    {[{ icon: "✅", label: "Keep it", desc: "If it's still working and worth fixing" }, { icon: "🔧", label: "Fix it first", desc: "If a free fix is likely to work" }, { icon: "🆕", label: "Replace it", desc: "If it's past its useful life" }].map(i => (<div key={i.label} className="bg-zinc-800 rounded-2xl p-4 text-center"><div className="text-2xl mb-1">{i.icon}</div><div className="font-black text-white text-sm mb-1">{i.label}</div><div className="text-zinc-500 text-xs">{i.desc}</div></div>))}
                  </div>
                  <div className="bg-amber-900/20 border border-amber-700 rounded-2xl p-4 mb-6 flex items-start gap-3">
                    <AlertCircle size={16} className="text-amber-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-amber-300 font-medium">Industry rule: if a repair costs more than 50% of a new printer's price — replace it. We'll walk you through this calculation in 4 questions.</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25">
                    Get My Honest Verdict <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "quiz" && (() => {
            const q = QUESTIONS[currentQ]; return (
              <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-amber-500 to-orange-400 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} /></div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-8"><button onClick={() => { if (currentQ === 0) setStage("intro"); else setCurrentQ(p => p - 1); }} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors"><ArrowLeft size={18} /> Back</button><span className="text-base font-black text-zinc-400">Question {currentQ + 1} of {QUESTIONS.length}</span></div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">{q.subtitle}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map(opt => (<motion.button key={opt.v} whileTap={{ scale: 0.97 }} onClick={() => answer(opt.v, opt.keep, opt.replace)} className={`p-6 rounded-2xl border-2 text-left transition-all ${selectedOption === opt.v ? "border-amber-500 bg-amber-900/30 shadow-lg" : answers[q.id] === opt.v ? "border-amber-500 bg-amber-900/20" : "border-zinc-700 bg-zinc-800/50 hover:border-amber-700"}`}>
                      <div className="text-3xl mb-3">{opt.icon}</div>
                      <div className="font-black text-white text-base mb-1">{opt.label}</div>
                      <div className="text-zinc-400 text-sm font-medium">{opt.desc}</div>
                      {(selectedOption === opt.v || answers[q.id] === opt.v) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2"><CheckCircle2 size={18} className="text-amber-400" /></motion.div>}
                    </motion.button>))}
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {stage === "lead" && (
            <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-amber-500 to-orange-400" />
                <div className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🤔</div>
                    <h2 className="text-3xl font-black text-white mb-3">Your verdict is ready!</h2>
                    <p className="text-zinc-400 font-medium text-lg">Enter your name and email — we'll send your personalised keep-or-replace verdict with our honest reasoning and recommended next steps.</p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. William" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-amber-500 text-lg placeholder:text-zinc-600" /></div></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-amber-500/25 mb-3">
                    {submitting ? <Loader2 size={24} className="animate-spin" /> : "Send My Verdict"}
                  </motion.button>
                  <button onClick={() => setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — show me the result</button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "results" && result && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0" /><p className="text-base font-bold text-green-300">Verdict sent to {email}!</p></div>)}

              <div className={`bg-zinc-900 rounded-[2rem] border-2 ${verdictBorder} overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${verdictColor}`} />
                <div className="p-8">
                  <div className="text-6xl mb-4 text-center">{verdictIcon}</div>
                  <h2 className={`text-3xl font-black text-center mb-3 ${verdictText}`}>{result.headline}</h2>
                  <p className="text-zinc-300 text-base font-medium text-center mb-6 leading-relaxed">{result.reason}</p>

                  <div className="bg-zinc-800 rounded-2xl p-5 mb-5">
                    <div className="text-sm font-black text-zinc-300 mb-3">📋 Your next steps:</div>
                    {result.nextSteps.map((step, i) => (<div key={i} className="flex items-start gap-2 mb-2"><span className={`font-black text-sm shrink-0 ${verdictText}`}>{i + 1}.</span><p className="text-zinc-300 text-sm font-medium">{step}</p></div>))}
                  </div>

                  {result.newPrinterTip && (
                    <div className="bg-blue-900/20 border border-blue-800 rounded-2xl p-4 mb-5">
                      <p className="text-blue-300 text-sm font-medium">{result.newPrinterTip}</p>
                    </div>
                  )}

                  {/* Score summary */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-zinc-800 rounded-xl p-4 text-center"><div className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Keep Score</div><div className="text-2xl font-black text-green-400">{scores.keep}</div></div>
                    <div className="bg-zinc-800 rounded-xl p-4 text-center"><div className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-1">Replace Score</div><div className="text-2xl font-black text-red-400">{scores.replace}</div></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20} /> Start Over</button>
                {result.verdict === "replace" ? (
                  <Link href="/tools/best-printer-for-seniors"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Find My New Printer <ArrowRight size={20} /></motion.div></Link>
                ) : (
                  <Link href="/tools/my-printer-stopped-working"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-amber-600 to-orange-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Fix My Printer First <ArrowRight size={20} /></motion.div></Link>
                )}
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Printer prices and model availability change regularly. Not affiliated with HP, Canon, Epson, or Brother.</p></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="border-t border-zinc-800 py-20"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-4xl font-black text-white mb-8 tracking-tight">When Should You Replace a Printer? — The Honest Answer</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base"><div><p className="mb-4">Most inkjet printers last 3–5 years under normal home use. The key rule is simple: if repairing your printer would cost more than 50% of the price of a new one, replace it. For a $100 printer, that means any repair over $50 tips the balance toward buying new.</p><p>The hidden cost most people miss is ink. If you're spending $150–$300 per year on cartridges for a 7-year-old printer, switching to a new Epson EcoTank EcoTank at $199 upfront will save that money back within 12–18 months.</p></div><div><p className="mb-4">Before replacing a printer, always try the free fixes first. Print head cleaning resolves blank-page problems in 80% of cases. Clearing the print queue and restarting the printer resolves offline and won't-print issues in most cases. These fixes take 5 minutes and cost nothing.</p><p>The decision to replace should be based on age, repair cost, and ongoing ink cost — not just frustration in the moment. This guide provides educational guidance only and is not affiliated with any printer manufacturer.</p></div></div></div></section>
      <Footer />
    </div>
  );
}
