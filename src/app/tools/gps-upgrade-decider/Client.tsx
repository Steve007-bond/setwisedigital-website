"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, User, Loader2, Shield, Zap, RefreshCw, Star, AlertCircle, XCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const QUESTIONS = [
  {
    id:"age",
    title:"How old is your GPS device?",
    subtitle:"Age alone doesn't mean replace — but it shapes what's possible",
    options:[
      { v:"under3", label:"Under 3 years old", icon:"🆕", desc:"Relatively recent purchase", keep:40, replace:-10 },
      { v:"3to6",   label:"3 to 6 years old",  icon:"📅", desc:"Getting on a bit — depends on the issues", keep:20, replace:15 },
      { v:"7to10",  label:"7 to 10 years old",  icon:"⏳", desc:"Likely missing several new features", keep:5,  replace:35 },
      { v:"over10", label:"Over 10 years old",  icon:"🏛️", desc:"A veteran — may no longer receive updates", keep:-10, replace:50 },
    ],
  },
  {
    id:"main_issue",
    title:"What's the main reason you're thinking about changing?",
    subtitle:"Pick the one that bothers you most right now",
    options:[
      { v:"wrong-roads",  label:"It's sending me down wrong or missing roads", icon:"🔄", desc:"Outdated maps causing real navigation errors", keep:30, replace:20 },
      { v:"slow",         label:"It's very slow — takes ages to load and respond", icon:"🐢", desc:"Sluggish menus, slow route calculation", keep:5,  replace:45 },
      { v:"small-screen", label:"The screen is too small and hard to read", icon:"👓", desc:"Straining to see directions while driving", keep:10, replace:40 },
      { v:"no-traffic",   label:"It doesn't have live traffic or Bluetooth", icon:"🚦", desc:"Missing features I'd really like", keep:15, replace:35 },
      { v:"just-curious", label:"It works fine — just wondering if I should upgrade", icon:"🤔", desc:"No major complaints, exploring options", keep:50, replace:10 },
    ],
  },
  {
    id:"maps_updated",
    title:"Have you updated the maps recently?",
    subtitle:"Many GPS problems disappear completely after a map update — worth knowing before buying new",
    options:[
      { v:"yes-recent",  label:"Yes — updated within the last 6 months", icon:"✅", desc:"Maps are fairly current", keep:10, replace:25 },
      { v:"yes-old",     label:"Yes — but it was over a year ago",         icon:"📅", desc:"Due for another update", keep:30, replace:15 },
      { v:"no-never",    label:"No — never updated the maps",              icon:"❌", desc:"Could solve a lot of the issues", keep:45, replace:5  },
      { v:"dont-know",   label:"I'm not sure how to check",                icon:"🤷", desc:"Haven't looked into it", keep:40, replace:10 },
    ],
  },
  {
    id:"hardware",
    title:"Is the device itself working properly?",
    subtitle:"Hardware condition is the deciding factor more than age",
    options:[
      { v:"perfect",  label:"Works perfectly — no hardware issues",       icon:"💚", desc:"Charges, turns on, touchscreen fine", keep:45, replace:-5  },
      { v:"minor",    label:"Minor issues — occasional freeze or glitch",  icon:"🟡", desc:"Nothing that stops me using it", keep:20, replace:20 },
      { v:"battery",  label:"Battery dies quickly — won't hold charge",   icon:"🔋", desc:"Has to stay plugged in constantly", keep:10, replace:35 },
      { v:"broken",   label:"Screen cracked or hardware damaged",         icon:"💔", desc:"Physically broken", keep:-20, replace:60 },
    ],
  },
];

const VERDICT = {
  keep: {
    title: "Update Your Maps — No Need to Replace Yet",
    emoji: "🔄",
    subtitle: "A map update will almost certainly fix the issues you're experiencing",
    color: "from-green-500 to-emerald-400",
    border: "border-green-700",
    bg: "bg-green-900/20",
    text: "text-green-300",
    summary: "The good news: your GPS likely has more life in it. Most navigation problems people blame on old hardware are actually outdated maps. An update takes about an hour and is often free.",
    steps: [
      {
        id: "check-model",
        title: "Check your GPS model name",
        icon: "🔍",
        detail: "Look on the back of your device or go to Settings → About. Note the full model name (e.g. 'Garmin DriveSmart 55'). You'll need this in the next step.",
        actionLabel: "I found my model name ✓",
      },
      {
        id: "check-wifi",
        title: "Check if your GPS has built-in Wi-Fi",
        icon: "📡",
        detail: "Go to Settings on your device. If you see a 'Wi-Fi' option, your GPS can update itself at home without a computer. If not, you'll need the Garmin Express method below.",
        actionLabel: "I checked — understood ✓",
      },
      {
        id: "wifi-update",
        title: "Wi-Fi update (if available): Connect at home",
        icon: "🏠",
        detail: "Settings → Wi-Fi → select your home network → enter password → once connected, go to Settings → Map & Software Updates → Check for Updates. The GPS downloads overnight. Keep it plugged in.",
        actionLabel: "Starting Wi-Fi update ✓",
      },
      {
        id: "express-update",
        title: "No Wi-Fi? Use Garmin Express on your computer",
        icon: "💻",
        detail: "Visit garmin.com/express on your Windows or Mac computer → download Garmin Express (free) → install it → connect your GPS with its USB cable → Garmin Express detects your device → click 'Update Maps'. Takes 30–90 minutes depending on internet speed.",
        actionLabel: "Garmin Express is running ✓",
      },
      {
        id: "test-drive",
        title: "Take a test drive after updating",
        icon: "🚗",
        detail: "Drive a familiar route and check if the GPS shows correct current roads. If it's still showing wrong roads after a full map update, that's a stronger sign the device itself may need replacing.",
        actionLabel: "Test drive complete ✓",
      },
    ],
    ifStillWrong: "If maps are fully updated and navigation is still frequently wrong — that's when upgrading makes sense. The Garmin DriveSmart 55 ($149–$179) or DriveSmart 65 ($179–$219) are the go-to replacements.",
  },
  replace: {
    title: "Time for an Upgrade — Here's What to Get",
    emoji: "🆕",
    subtitle: "Your device has reached the end of its useful life — an upgrade will make a real difference",
    color: "from-blue-500 to-indigo-400",
    border: "border-blue-700",
    bg: "bg-blue-900/20",
    text: "text-blue-300",
    summary: "Based on what you've told us, a new GPS will genuinely improve your driving experience — faster response, larger screen, live traffic, and maps that update themselves over Wi-Fi. Here's the clearest path forward.",
    steps: [
      {
        id: "pick-model",
        title: "Choose your new GPS",
        icon: "🗺️",
        detail: "Most drivers: Garmin DriveSmart 55 ($149–$179) — 5.5-inch screen, live traffic, Bluetooth calling, Wi-Fi updates. Wear glasses or want easier reading: Garmin DriveSmart 65 ($179–$219) — 6.95-inch screen, same great features. RV drivers: Garmin RV 895 ($499–$549) — height/weight routing, campground database.",
        actionLabel: "I've picked my model ✓",
      },
      {
        id: "where-to-buy",
        title: "Where to buy (and save money)",
        icon: "🛒",
        detail: "Amazon, Best Buy, Costco, and Walmart all stock Garmin GPS units. Best Buy and Costco frequently have $20–$50 off on GPS devices. Check Garmin's own website for refurbished certified units at 20–30% less. Avoid unknown third-party sellers.",
        actionLabel: "I know where to buy ✓",
      },
      {
        id: "save-favourites",
        title: "Save your saved places from your old GPS first",
        icon: "💾",
        detail: "Connect your old GPS to your computer. Open Garmin Express. Look for 'Back Up Device Data'. This saves your saved addresses and favourites. On the new device, connect to Garmin Express and restore. Your home, work, and favourite places transfer across.",
        actionLabel: "Favourites saved ✓",
      },
      {
        id: "first-setup",
        title: "Set up your new GPS",
        icon: "⚙️",
        detail: "Mount on windshield → plug into car charger → follow the setup wizard. Enter your Home address first. Then connect to your home Wi-Fi (Settings → Wi-Fi) so it can update maps automatically. Takes about 10 minutes total.",
        actionLabel: "Setup complete ✓",
      },
      {
        id: "recycle-old",
        title: "What to do with your old GPS",
        icon: "♻️",
        detail: "Best Buy has an electronics recycling drop-off (free). Staples and Office Depot also accept small electronics. Or check if your local municipality has an e-waste drop-off day. Please don't throw GPS devices in regular trash — they contain lithium batteries.",
        actionLabel: "Old device sorted ✓",
      },
    ],
    ifStillWrong: "",
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro"|"quiz"|"results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ keep: 0, replace: 0 });
  const [answers, setAnswers] = useState<Record<string,string>>({});
  const [sel, setSel] = useState<string|null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const progress = (currentQ / QUESTIONS.length) * 100;
  const getVerdict = () => scores.replace > scores.keep ? "replace" : "keep";
  const verdict = VERDICT[getVerdict()];

  const answer = (v: string, keep: number, replace: number) => {
    setSel(v);
    setTimeout(() => {
      setScores(prev => ({ keep: prev.keep + keep, replace: prev.replace + replace }));
      setAnswers(prev => ({ ...prev, [QUESTIONS[currentQ].id]: v }));
      setSel(null);
      if (currentQ < QUESTIONS.length - 1) setCurrentQ(p => p + 1);
      else setStage("results");
    }, 300);
  };

  const toggleStep = (id: string) =>
    setCompletedSteps(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, issue: `GPS Upgrade — Verdict: ${getVerdict()}`, source: "gps-upgrade-decider" }) }); } catch {}
    setSubmitted(true); setSubmitting(false);
  };
  const reset = () => { setStage("intro"); setCurrentQ(0); setScores({ keep: 0, replace: 0 }); setAnswers({}); setSel(null); setCompletedSteps(new Set()); setName(""); setEmail(""); setSubmitted(false); };

  const allDone = verdict.steps.every(s => completedSteps.has(s.id));

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">GPS Upgrade Decider</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14} /> 4 Questions · Keep or Replace · Step-by-Step Plan
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Should I Upgrade</span>
            <span className="block bg-gradient-to-r from-blue-400 via-indigo-300 to-purple-400 bg-clip-text text-transparent italic">My GPS or Just Update It?</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            4 honest questions about your device. Get a clear verdict — keep and update, or replace — plus a clickable step-by-step action plan you can follow right now.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {/* INTRO */}
          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-5">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { icon:"🔄", title:"Keep & Update", color:"border-green-700 bg-green-900/20", items:["Maps just need refreshing","Hardware is still working well","Device is under 7 years old","Could save $150–$220"] },
                  { icon:"🆕", title:"Time to Replace", color:"border-blue-700 bg-blue-900/20", items:["Slow, sluggish performance","Screen too small to read easily","Hardware damaged or failing","Missing live traffic/Bluetooth"] },
                ].map(card => (
                  <div key={card.title} className={`rounded-[2rem] border-2 ${card.color} p-6`}>
                    <div className="text-4xl mb-3">{card.icon}</div>
                    <h3 className="font-black text-white text-xl mb-4">{card.title}</h3>
                    {card.items.map(item => (
                      <div key={item} className="flex items-center gap-2 text-sm text-zinc-300 font-medium mb-2">
                        <CheckCircle2 size={14} className="text-green-400 shrink-0" />{item}
                      </div>
                    ))}
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 md:p-10">
                <h2 className="text-2xl font-black text-white mb-4">Not sure which applies to you? 🤔</h2>
                <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">
                  4 quick questions give you a clear answer — plus a clickable step-by-step plan so you know exactly what to do next. No technical knowledge needed.
                </p>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30">
                  Find Out What to Do <ArrowRight size={24} />
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {stage === "quiz" && (() => {
            const q = QUESTIONS[currentQ];
            return (
              <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -50 }} transition={{ type: "spring", stiffness: 350, damping: 30 }} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-zinc-800 relative">
                  <motion.div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.5 }} />
                </div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <button onClick={() => { if (currentQ === 0) setStage("intro"); else setCurrentQ(p => p - 1); }} className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold transition-colors group">
                      <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />Back
                    </button>
                    <div className="flex gap-2">{QUESTIONS.map((_, i) => (<div key={i} className={`w-2.5 h-2.5 rounded-full transition-all ${i < currentQ ? "bg-blue-400" : i === currentQ ? "bg-white scale-125" : "bg-zinc-700"}`} />))}</div>
                    <span className="text-base font-black text-zinc-400">{currentQ + 1} / {QUESTIONS.length}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                  <p className="text-zinc-400 text-base mb-8">{q.subtitle}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map((opt, i) => (
                      <motion.button key={opt.v} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 * i }} whileTap={{ scale: 0.97 }}
                        onClick={() => answer(opt.v, opt.keep, opt.replace)}
                        className={`p-6 rounded-2xl border-2 text-left transition-all ${sel === opt.v || answers[q.id] === opt.v ? "border-blue-500 bg-blue-900/30 shadow-lg" : "border-zinc-700 bg-zinc-800/50 hover:border-blue-600"}`}>
                        <div className="text-3xl mb-3">{opt.icon}</div>
                        <div className="font-black text-white text-base mb-1">{opt.label}</div>
                        <div className="text-zinc-400 text-sm">{opt.desc}</div>
                        {(sel === opt.v || answers[q.id] === opt.v) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2"><CheckCircle2 size={18} className="text-blue-400" /></motion.div>}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* RESULTS */}
          {stage === "results" && (
            <motion.div key="results" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

              {/* Verdict banner */}
              <div className={`rounded-[2rem] border-2 ${verdict.border} bg-zinc-900 overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${verdict.color}`} />
                <div className="p-8 md:p-10">
                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.1 }} className="text-6xl mb-5">{verdict.emoji}</motion.div>
                  <div className={`inline-block px-4 py-2 rounded-full text-sm font-black uppercase tracking-widest mb-4 ${verdict.bg} ${verdict.text} border ${verdict.border}`}>Our Verdict</div>
                  <h2 className="text-3xl font-black text-white mb-2">{verdict.title}</h2>
                  <p className={`text-base font-bold ${verdict.text} mb-4`}>{verdict.subtitle}</p>
                  <p className="text-zinc-300 text-lg font-medium leading-relaxed">{verdict.summary}</p>
                </div>
              </div>

              {/* Clickable step-by-step plan */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${verdict.color}`} />
                <div className="p-8">
                  <div className="flex items-center justify-between mb-6">
                    <h3 className="text-2xl font-black text-white">Your Step-by-Step Plan 📋</h3>
                    <div className={`text-sm font-black px-3 py-1.5 rounded-full ${verdict.bg} ${verdict.text} border ${verdict.border}`}>
                      {completedSteps.size} / {verdict.steps.length} done
                    </div>
                  </div>

                  {/* Progress bar */}
                  <div className="h-2 bg-zinc-800 rounded-full mb-6 overflow-hidden">
                    <motion.div
                      className={`h-full rounded-full bg-gradient-to-r ${verdict.color}`}
                      animate={{ width: `${(completedSteps.size / verdict.steps.length) * 100}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <div className="space-y-3">
                    {verdict.steps.map((step, i) => {
                      const done = completedSteps.has(step.id);
                      return (
                        <motion.div key={step.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
                          className={`rounded-2xl border-2 overflow-hidden transition-all duration-300 ${done ? "border-green-600 bg-green-900/10" : `${verdict.border} ${verdict.bg}`}`}>
                          <div className="p-5">
                            <div className="flex items-start gap-4">
                              {/* Step number / check */}
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-sm transition-all ${done ? "bg-green-500" : `bg-gradient-to-br ${verdict.color}`}`}>
                                {done ? <CheckCircle2 size={18} className="text-white" /> : <span className="text-white">{i + 1}</span>}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1">
                                  <span className="text-xl">{step.icon}</span>
                                  <span className={`font-black text-base ${done ? "text-zinc-400 line-through" : "text-white"}`}>{step.title}</span>
                                </div>
                                <p className="text-sm text-zinc-400 font-medium leading-relaxed">{step.detail}</p>
                              </div>
                            </div>
                            {/* Clickable confirm button */}
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={() => toggleStep(step.id)}
                              className={`mt-4 w-full py-3 rounded-xl font-black text-sm transition-all ${done
                                ? "bg-zinc-800 text-zinc-500 border border-zinc-700"
                                : `bg-gradient-to-r ${verdict.color} text-white shadow-lg`}`}>
                              {done ? "✓ Done — tap to undo" : step.actionLabel}
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  {/* Completion celebration */}
                  <AnimatePresence>
                    {allDone && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} className="mt-6 p-6 bg-green-900/30 border-2 border-green-600 rounded-2xl text-center">
                        <div className="text-4xl mb-2">🎉</div>
                        <h4 className="font-black text-white text-xl mb-1">All steps complete!</h4>
                        <p className="text-green-300 font-medium">You're all set. Enjoy the smoother navigation.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>

                  {verdict.ifStillWrong && (
                    <div className="mt-5 p-5 bg-amber-900/20 border border-amber-700 rounded-2xl flex items-start gap-3">
                      <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                      <p className="text-sm text-amber-200 font-medium leading-relaxed">{verdict.ifStillWrong}</p>
                    </div>
                  )}
                </div>
              </div>

              {/* Lead */}
              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Save your action plan 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">We'll email you these steps so you can reference them later.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">
                    {submitting ? <Loader2 size={22} className="animate-spin" /> : "Email Me My Plan"}
                  </motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400" /><p className="font-bold text-green-300">Plan sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20} />Try Again</button>
                <Link href="/tools/garmin-express-setup"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Garmin Express Guide</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with Garmin. Prices approximate.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </div>
  );
}
