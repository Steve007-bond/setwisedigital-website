"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, Star, XCircle, AlertCircle } from "lucide-react";

const bgs = [
  { url: "https://images.unsplash.com/photo-1563520239648-a8ade7166c97?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
];

type BrandId = "hp" | "canon" | "epson" | "brother";

const BRANDS: Record<BrandId, {
  name: string; emoji: string; color: string; tagline: string;
  inkCost: string; reliability: string; setupEase: string; appQuality: string;
  subscription: string; costPerPage: string; upfront: string;
  bestFor: string[]; avoidIf: string[];
  pros: string[]; cons: string[];
  topModel: { name: string; price: string; badge: string };
  scores: { value: number; ink: number; ease: number; reliability: number; app: number };
}> = {
  hp: {
    name: "HP", emoji: "🔵", color: "from-blue-600 to-blue-500",
    tagline: "Most popular brand in North America",
    inkCost: "$15–$45/cartridge", reliability: "Very good", setupEase: "Very easy",
    appQuality: "Excellent (HP Smart)", subscription: "HP Instant Ink available",
    costPerPage: "8–20¢", upfront: "$59–$399",
    bestFor: ["First-time printer buyers", "People who want a great app experience", "Occasional home printing", "Those who want easy ink subscription option", "iPhone and Android users"],
    avoidIf: ["You print 200+ pages/month (ink gets expensive)", "You hate subscription pressure"],
    pros: ["HP Smart app is the best in the business", "Widest range of models and prices", "Excellent AirPrint and cloud printing", "Easy setup — usually under 10 minutes", "Large support network and easy to find ink anywhere"],
    cons: ["Ink cartridges are expensive per page", "HP Instant Ink subscription can confuse users", "Some models only work with HP branded ink", "Cartridges dry out if unused for 3+ weeks"],
    topModel: { name: "HP DeskJet 4155e", price: "$89", badge: "Best Entry Level" },
    scores: { value: 70, ink: 55, ease: 90, reliability: 80, app: 95 },
  },
  canon: {
    name: "Canon", emoji: "🔴", color: "from-red-600 to-red-500",
    tagline: "Best-in-class photo quality",
    inkCost: "$13–$40/cartridge", reliability: "Excellent", setupEase: "Easy",
    appQuality: "Good (Canon PRINT)", subscription: "Optional — no pressure",
    costPerPage: "6–18¢", upfront: "$79–$499",
    bestFor: ["Photo printing enthusiasts", "Families who want high colour quality", "Those who want no subscription pressure", "People who print greeting cards and creative projects"],
    avoidIf: ["You mainly print black-and-white documents", "You print very high volumes"],
    pros: ["Exceptional photo and colour print quality", "No aggressive subscription upsell", "Quiet operation — good for bedrooms/offices", "Long-lasting print heads", "Canon ink is widely available"],
    cons: ["App is less polished than HP Smart", "Fewer low-cost entry models", "Black ink can run out faster on photo-heavy printers", "Setup can take slightly longer than HP"],
    topModel: { name: "Canon PIXMA TR4720", price: "$79", badge: "Best for Photos" },
    scores: { value: 75, ink: 65, ease: 78, reliability: 92, app: 72 },
  },
  epson: {
    name: "Epson", emoji: "🟣", color: "from-violet-600 to-violet-500",
    tagline: "Cheapest running cost — EcoTank saves hundreds",
    inkCost: "$9–$15/bottle (EcoTank)", reliability: "Excellent", setupEase: "Moderate",
    appQuality: "Good (Epson Smart Panel)", subscription: "None — bottles refill tanks",
    costPerPage: "1–4¢ (EcoTank)", upfront: "$199–$499",
    bestFor: ["Families with school-age children", "Home offices printing 100+ pages/month", "People frustrated with constant cartridge replacement", "Long-term money savers"],
    avoidIf: ["You print under 30 pages/month", "You can't afford $199+ upfront", "You need ultra-fast print speeds"],
    pros: ["EcoTank pays for itself in 12–18 months", "Ink bottles last 1–2 years for average households", "No subscription needed — ever", "Visible ink tanks — you always know how much ink you have", "Environmentally friendlier — less plastic waste"],
    cons: ["Higher upfront cost ($199+)", "EcoTank filling can be slightly messy first time", "Slower print speeds than HP on some models", "Needs use at least weekly to prevent head clogging"],
    topModel: { name: "Epson EcoTank ET-2800", price: "$199", badge: "Best Long-Term Value" },
    scores: { value: 95, ink: 98, ease: 65, reliability: 88, app: 75 },
  },
  brother: {
    name: "Brother", emoji: "⚫", color: "from-zinc-600 to-zinc-500",
    tagline: "Most reliable — built to last",
    inkCost: "$9–$18/cartridge", reliability: "Outstanding", setupEase: "Easy",
    appQuality: "Good (iPrint&Scan)", subscription: "INKvestment tank option",
    costPerPage: "4–12¢", upfront: "$89–$349",
    bestFor: ["People who want a printer that just works", "Document-heavy home offices", "Anyone who hates printer problems", "People who print a lot of black-and-white text"],
    avoidIf: ["You need professional photo printing", "You want the fanciest app experience"],
    pros: ["Best long-term reliability in the industry", "XL ink cartridges last much longer than competitors", "Very competitive ink prices", "Excellent for black-and-white document printing", "Physical Wireless button makes setup easier for seniors"],
    cons: ["Photo quality not as vivid as Canon", "Fewer touchscreen models", "App is functional but not as beautiful as HP Smart", "Less variety in design/style"],
    topModel: { name: "Brother MFC-J1010DW", price: "$119", badge: "Most Reliable" },
    scores: { value: 85, ink: 80, ease: 82, reliability: 97, app: 70 },
  },
};

const QUESTIONS = [
  {
    id: "use",
    title: "What will you mainly print?",
    subtitle: "This is the biggest factor in which brand suits you",
    options: [
      { v: "documents", label: "Documents, forms & text", icon: "📄", desc: "Bills, letters, forms, homework", weights: { hp: 20, canon: 15, epson: 20, brother: 25 } },
      { v: "photos", label: "High-quality colour photos", icon: "🖼️", desc: "Family photos, art, greeting cards", weights: { hp: 15, canon: 30, epson: 20, brother: 10 } },
      { v: "both", label: "Mix of documents and photos", icon: "📋", desc: "A bit of everything", weights: { hp: 22, canon: 22, epson: 22, brother: 18 } },
      { v: "school", label: "School projects — lots of colour", icon: "🎨", desc: "High volume, colour-heavy", weights: { hp: 10, canon: 15, epson: 30, brother: 20 } },
    ],
  },
  {
    id: "volume",
    title: "How many pages do you print each month?",
    subtitle: "Honest answer gets you the best recommendation",
    options: [
      { v: "low", label: "Under 50 pages", icon: "📌", desc: "Light occasional printing", weights: { hp: 28, canon: 24, epson: 8, brother: 20 } },
      { v: "medium", label: "50–150 pages", icon: "📁", desc: "Regular home or family use", weights: { hp: 20, canon: 20, epson: 25, brother: 22 } },
      { v: "high", label: "150–300 pages", icon: "📚", desc: "Heavy home use", weights: { hp: 10, canon: 12, epson: 30, brother: 25 } },
      { v: "very-high", label: "300+ pages", icon: "🖨️", desc: "Home office or multiple people", weights: { hp: 5, canon: 8, epson: 32, brother: 28 } },
    ],
  },
  {
    id: "priority",
    title: "What matters most to you?",
    subtitle: "Pick the one thing you care about above everything else",
    options: [
      { v: "simple", label: "Simple setup and easy app", icon: "📱", desc: "I want it to just work", weights: { hp: 35, canon: 20, epson: 15, brother: 18 } },
      { v: "cost", label: "Lowest running cost over time", icon: "💰", desc: "I want to save on ink", weights: { hp: 10, canon: 15, epson: 38, brother: 25 } },
      { v: "quality", label: "Best photo and colour quality", icon: "🖼️", desc: "I care about print quality", weights: { hp: 15, canon: 38, epson: 20, brother: 10 } },
      { v: "reliable", label: "Most reliable — never breaks", icon: "🛡️", desc: "I want zero printer problems", weights: { hp: 18, canon: 18, epson: 18, brother: 38 } },
    ],
  },
];

export default function Client() {
  const [stage, setStage] = useState<"intro" | "quiz" | "lead" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [scores, setScores] = useState({ hp: 0, canon: 0, epson: 0, brother: 0 });
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");
  const [compareMode, setCompareMode] = useState<[BrandId, BrandId] | null>(null);

  const progress = (currentQ / QUESTIONS.length) * 100;
  const sorted = (Object.entries(scores) as [BrandId, number][]).sort((a, b) => b[1] - a[1]);
  const winner = sorted[0]?.[0];
  const winnerData = winner ? BRANDS[winner] : null;
  const totalScore = Object.values(scores).reduce((a, b) => a + b, 0) || 1;

  const answer = (value: string, weights: Record<string, number>) => {
    setSelectedOption(value);
    setTimeout(() => {
      setScores(prev => ({
        hp: prev.hp + (weights.hp || 0),
        canon: prev.canon + (weights.canon || 0),
        epson: prev.epson + (weights.epson || 0),
        brother: prev.brother + (weights.brother || 0),
      }));
      setAnswers(prev => ({ ...prev, [QUESTIONS[currentQ].id]: value }));
      setSelectedOption(null);
      if (currentQ < QUESTIONS.length - 1) setCurrentQ(p => p + 1);
      else setStage("lead");
    }, 300);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, issue: `Brand Comparison — Winner: ${winner?.toUpperCase()}`, source: "hp-vs-canon-vs-epson-vs-brother" }) }); } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = () => { setStage("intro"); setCurrentQ(0); setScores({ hp: 0, canon: 0, epson: 0, brother: 0 }); setAnswers({}); setSelectedOption(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); setCompareMode(null); };

  const ScoreBar = ({ label, value, max }: { label: string; value: number; max: number }) => (
    <div className="mb-3">
      <div className="flex justify-between text-sm font-bold mb-1"><span className="text-zinc-400">{label}</span><span className="text-white">{value}/100</span></div>
      <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
        <motion.div className="h-full bg-gradient-to-r from-violet-500 to-pink-400 rounded-full" initial={{ width: 0 }} animate={{ width: `${(value / 100) * 100}%` }} transition={{ duration: 0.6, delay: 0.1 }} />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">Printer Brand Comparison</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14} /> Free Tool · 2 Minutes</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
            HP vs Canon<br /><span className="bg-gradient-to-r from-violet-400 to-pink-300 bg-clip-text text-transparent italic">vs Epson vs Brother</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Stop guessing. Answer 3 questions — get an honest, plain-English verdict on which printer brand actually wins for the way you print.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {/* INTRO */}
          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {(Object.entries(BRANDS) as [BrandId, typeof BRANDS[BrandId]][]).map(([id, b]) => (
                  <div key={id} className="bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
                    <div className={`w-10 h-10 bg-gradient-to-br ${b.color} rounded-xl flex items-center justify-center text-xl mb-3`}>{b.emoji}</div>
                    <div className="font-black text-white text-base mb-1">{b.name}</div>
                    <div className="text-zinc-500 text-xs font-medium leading-snug">{b.tagline}</div>
                    <div className="mt-3 text-xs font-black text-zinc-400">{b.costPerPage}<span className="text-zinc-600">/page</span></div>
                  </div>
                ))}
              </div>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-violet-500 to-pink-400" />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-4">Which brand is right for YOU? 🏆</h2>
                  <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">All four brands make good printers — the right one depends entirely on what you print, how much you print, and what you value most. Answer 3 honest questions and we'll give you a clear winner.</p>
                  <div className="bg-violet-900/20 border border-violet-700 rounded-2xl p-4 mb-6 flex items-start gap-3">
                    <AlertCircle size={16} className="text-violet-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-violet-300 font-medium">This comparison is 100% independent — we're not paid by any printer brand. Our goal is to give you the honest answer, even if that means recommending the cheapest option.</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-violet-500/25">
                    Find My Winning Brand <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* QUIZ */}
          {stage === "quiz" && (() => {
            const q = QUESTIONS[currentQ]; return (
              <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-violet-500 to-pink-400 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} /></div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <button onClick={() => { if (currentQ === 0) setStage("intro"); else setCurrentQ(p => p - 1); }} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors"><ArrowLeft size={18} /> Back</button>
                    <span className="text-base font-black text-zinc-400">Question {currentQ + 1} of {QUESTIONS.length}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">{q.subtitle}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map(opt => (
                      <motion.button key={opt.v} whileTap={{ scale: 0.97 }} onClick={() => answer(opt.v, opt.weights)} className={`p-6 rounded-2xl border-2 text-left transition-all ${selectedOption === opt.v ? "border-violet-500 bg-violet-900/30 shadow-lg" : answers[q.id] === opt.v ? "border-violet-500 bg-violet-900/20" : "border-zinc-700 bg-zinc-800/50 hover:border-violet-700"}`}>
                        <div className="text-3xl mb-3">{opt.icon}</div>
                        <div className="font-black text-white text-base mb-1">{opt.label}</div>
                        <div className="text-zinc-400 text-sm font-medium">{opt.desc}</div>
                        {(selectedOption === opt.v || answers[q.id] === opt.v) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2"><CheckCircle2 size={18} className="text-violet-400" /></motion.div>}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {/* LEAD */}
          {stage === "lead" && (
            <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
              <div className="h-1.5 bg-gradient-to-r from-violet-500 to-pink-400" />
              <div className="p-8 md:p-10">
                <div className="text-center mb-8">
                  <div className="text-6xl mb-4">🏆</div>
                  <h2 className="text-3xl font-black text-white mb-3">Your winning brand is ready!</h2>
                  <p className="text-zinc-400 font-medium text-lg">Get your personalised printer brand recommendation — with top model suggestions — sent to your inbox.</p>
                </div>
                <div className="space-y-4 mb-6">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Margaret" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 text-lg placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 text-lg placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 text-lg placeholder:text-zinc-600" /></div></div>
                </div>
                <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-violet-500/25 mb-3">
                  {submitting ? <Loader2 size={24} className="animate-spin" /> : "Send My Brand Recommendation"}
                </motion.button>
                <button onClick={() => setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show my results</button>
              </div>
            </motion.div>
          )}

          {/* RESULTS */}
          {stage === "results" && winnerData && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0" /><p className="text-base font-bold text-green-300">Recommendation sent to {email}!</p></div>)}

              {/* Winner */}
              <div className={`bg-zinc-900 rounded-[2rem] border-2 border-violet-700 overflow-hidden`}>
                <div className="h-1.5 bg-gradient-to-r from-violet-500 to-pink-400" />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white" /></div><span className="font-black text-amber-400 text-base uppercase tracking-widest">Recommended for {name || "You"}</span></div>
                  <div className="flex items-center gap-5 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${winnerData.color} rounded-2xl flex items-center justify-center text-3xl`}>{winnerData.emoji}</div>
                    <div>
                      <h2 className="text-3xl font-black text-white">{winnerData.name}</h2>
                      <p className="text-zinc-400 text-base font-medium">{winnerData.tagline}</p>
                      <div className="mt-1 text-base font-black text-violet-400">{winnerData.topModel.name} — {winnerData.topModel.price}</div>
                    </div>
                  </div>

                  {/* Score bars */}
                  <div className="mb-6">
                    <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-4">How {winnerData.name} scores for you</div>
                    <ScoreBar label="Value for money" value={winnerData.scores.value} max={100} />
                    <ScoreBar label="Ink cost savings" value={winnerData.scores.ink} max={100} />
                    <ScoreBar label="Ease of setup" value={winnerData.scores.ease} max={100} />
                    <ScoreBar label="Reliability" value={winnerData.scores.reliability} max={100} />
                    <ScoreBar label="App experience" value={winnerData.scores.app} max={100} />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-3 gap-4 mb-6">
                    {[{ l: "Upfront Cost", v: winnerData.upfront }, { l: "Cost Per Page", v: winnerData.costPerPage }, { l: "Ink Cost", v: winnerData.inkCost }].map(i => (
                      <div key={i.l} className="bg-zinc-800 rounded-2xl p-4 text-center"><div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">{i.l}</div><div className="font-black text-white text-sm">{i.v}</div></div>
                    ))}
                  </div>

                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div><div className="text-sm font-black text-green-400 uppercase tracking-widest mb-2">✓ Best for you because</div>{winnerData.bestFor.slice(0, 4).map(b => (<div key={b} className="flex items-start gap-2 text-sm text-zinc-300 font-medium mb-1.5"><CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />{b}</div>))}</div>
                    <div><div className="text-sm font-black text-red-400 uppercase tracking-widest mb-2">⚠ Consider if</div>{winnerData.avoidIf.map(a => (<div key={a} className="flex items-start gap-2 text-sm text-zinc-400 font-medium mb-1.5"><XCircle size={14} className="text-red-400 shrink-0 mt-0.5" />{a}</div>))}</div>
                  </div>
                </div>
              </div>

              {/* All brands ranking */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h3 className="text-xl font-black text-white mb-6">All brands ranked for your answers</h3>
                <div className="space-y-4">
                  {sorted.map(([id, score], i) => {
                    const b = BRANDS[id];
                    const pct = Math.round((score / totalScore) * 100);
                    return (
                      <div key={id} className={`flex items-center gap-4 p-4 rounded-2xl ${i === 0 ? "bg-violet-900/20 border-2 border-violet-700" : "bg-zinc-800"}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center font-black text-sm ${i === 0 ? "bg-violet-600 text-white" : "bg-zinc-700 text-zinc-400"}`}>#{i + 1}</div>
                        <div className={`w-10 h-10 bg-gradient-to-br ${b.color} rounded-xl flex items-center justify-center text-lg`}>{b.emoji}</div>
                        <div className="flex-1">
                          <div className="font-black text-white text-base">{b.name}</div>
                          <div className="text-zinc-500 text-xs font-medium">{b.tagline}</div>
                          <div className="mt-2 h-1.5 bg-zinc-700 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-violet-500 to-pink-400 rounded-full" initial={{ width: 0 }} animate={{ width: `${pct}%` }} transition={{ delay: i * 0.1, duration: 0.5 }} /></div>
                        </div>
                        <div className="text-right"><div className="font-black text-white">{pct}%</div><div className="text-zinc-500 text-xs">match</div></div>
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20} /> Try Again</button>
                <Link href="/tools/set-up-my-new-printer"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-violet-600 to-pink-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Set Up My New Printer <ArrowRight size={20} /></motion.div></Link>
              </div>

              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3">
                <Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" />
                <p className="text-sm text-zinc-500 font-medium">Independent educational comparison. Not affiliated with HP, Canon, Epson, or Brother. Prices approximate — verify at retailers.</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">HP vs Canon vs Epson vs Brother — The Honest Comparison</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base">
            <div><p className="mb-4">The four main printer brands each have a clear strength. HP leads on app quality and ease of setup — the HP Smart app is the best printer app available. Canon leads on photo and colour quality — professional photographers often choose Canon inkjet for prints at home. Epson's EcoTank system offers the cheapest running cost of any home printer. Brother is consistently rated the most reliable — it just doesn't break down.</p></div>
            <div><p>The "best" brand depends entirely on how you use it. A family printing school projects every day needs Epson EcoTank — the running cost savings are enormous. An occasional printer who wants simplicity needs HP. A photography enthusiast needs Canon. Someone who wants a printer that lasts 10 years without problems needs Brother.</p></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
