"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, Star, AlertCircle, Heart } from "lucide-react";

const bgs = [
  { url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
];

type PrinterRec = {
  name: string; brand: string; price: string; badge: string;
  emoji: string; color: string;
  whyGreat: string[];
  features: { icon: string; label: string; value: string }[];
  seniorTips: string[];
  bestFor: string;
  setupDifficulty: "Very Easy" | "Easy" | "Moderate";
  subscriptionFree: boolean;
  hasLargeScreen: boolean;
};

const PRINTERS: Record<string, PrinterRec> = {
  simple_docs: {
    name: "HP DeskJet 4155e", brand: "HP", price: "$89", badge: "Best for Simple Document Printing",
    emoji: "🔵", color: "from-blue-600 to-blue-500",
    whyGreat: ["HP Smart app is the easiest printer app available", "Large, clearly labelled buttons", "Prints medical forms, letters, and documents beautifully", "No subscription required — pay only when you print"],
    features: [{ icon: "📱", label: "Phone printing", value: "Yes — very easy" }, { icon: "📠", label: "Scan & copy", value: "Yes" }, { icon: "🔌", label: "Setup", value: "Very easy — under 10 min" }, { icon: "💰", label: "Ink cost", value: "$15–$18 per set" }],
    seniorTips: ["Ask a family member to download the HP Smart app on your phone — then printing from your phone is just two taps", "Turn the printer on at least once a week to prevent ink drying", "Tap 'Wireless Direct' on the printer if your Wi-Fi isn't working — it connects directly"],
    bestFor: "Someone who wants simple document printing with the easiest possible app",
    setupDifficulty: "Very Easy", subscriptionFree: true, hasLargeScreen: false,
  },
  photos_quality: {
    name: "Canon PIXMA TR4720", brand: "Canon", price: "$79", badge: "Best for Family Photos",
    emoji: "🔴", color: "from-red-600 to-red-500",
    whyGreat: ["Exceptional photo print quality — family photos look vivid", "Quiet operation — good for home use", "Scans and copies documents clearly", "No ink subscription pressure from Canon"],
    features: [{ icon: "📸", label: "Photo quality", value: "Excellent" }, { icon: "📠", label: "Scan & copy", value: "Yes" }, { icon: "📱", label: "Phone printing", value: "Yes — AirPrint + Canon app" }, { icon: "💰", label: "Ink cost", value: "$16–$20 per cartridge set" }],
    seniorTips: ["Use regular printer paper for documents and photo paper for photos — it makes a big difference", "The Canon PRINT app lets you scan documents to your phone — very handy for medical paperwork", "Print a test photo first — if colours look faded, run a 'Deep Clean' from the printer menu"],
    bestFor: "Someone who wants great family photos and clear document printing",
    setupDifficulty: "Easy", subscriptionFree: true, hasLargeScreen: false,
  },
  heavy_family: {
    name: "Epson EcoTank ET-2800", brand: "Epson", price: "$199", badge: "Best for Families — Cheapest Ink",
    emoji: "🟣", color: "from-violet-600 to-violet-500",
    whyGreat: ["Ink bottles cost $10–$14 and last 1–2 years — huge savings", "No cartridge replacement frustration ever", "You can see the ink level at a glance — no surprises", "Saves hundreds of dollars per year vs cartridge printers"],
    features: [{ icon: "🫙", label: "Ink type", value: "EcoTank bottles — refillable" }, { icon: "💰", label: "Annual ink cost", value: "~$20–$40 (vs $150+ for cartridges)" }, { icon: "📱", label: "Phone printing", value: "Yes — Epson Smart Panel" }, { icon: "⏱️", label: "Between refills", value: "1–2 years" }],
    seniorTips: ["The first ink fill takes about 10 minutes — do it with a family member the first time", "Keep the ink bottles in a cool dark place until needed", "Use the printer at least once a week to keep the print heads healthy — print a quick test page if nothing else"],
    bestFor: "A family or household that prints regularly and wants to stop buying cartridges",
    setupDifficulty: "Moderate", subscriptionFree: true, hasLargeScreen: false,
  },
  reliable_workhorse: {
    name: "Brother MFC-J1010DW", brand: "Brother", price: "$119", badge: "Most Reliable — Rarely Breaks",
    emoji: "⚫", color: "from-zinc-500 to-zinc-600",
    whyGreat: ["Brother printers are consistently rated the most reliable home printers", "XL ink cartridges last much longer than standard — fewer replacements", "Has a physical Wireless button — easier to reconnect if Wi-Fi drops", "Scans, copies, and faxes — all in one machine"],
    features: [{ icon: "📠", label: "Fax", value: "Yes — built in" }, { icon: "🛡️", label: "Reliability", value: "Outstanding" }, { icon: "🖨️", label: "XL ink pages", value: "500 pages per cartridge" }, { icon: "📱", label: "Phone printing", value: "Yes — iPrint&Scan" }],
    seniorTips: ["The physical Wireless button on top is a lifesaver — if the printer loses Wi-Fi, just press and hold it for 3 seconds", "Brother XL cartridges are worth it — they cost a little more but last 4x longer", "This printer can send faxes — very useful for medical offices or legal documents"],
    bestFor: "Someone who wants a printer that just works, lasts for years, and can also fax",
    setupDifficulty: "Easy", subscriptionFree: true, hasLargeScreen: false,
  },
  large_screen: {
    name: "HP ENVY Inspire 7955e", brand: "HP", price: "$179", badge: "Best Large Touchscreen for Seniors",
    emoji: "🔵", color: "from-blue-600 to-blue-500",
    whyGreat: ["Large, bright touchscreen — text and icons are easy to see", "Simple tap navigation — works like a big phone screen", "Automatic two-sided printing saves paper", "HP Smart app guides you through everything step by step"],
    features: [{ icon: "📱", label: "Touchscreen", value: "Large — 2.65 inch colour display" }, { icon: "🖨️", label: "Auto two-sided", value: "Yes" }, { icon: "📸", label: "Photo printing", value: "Excellent" }, { icon: "📱", label: "Phone printing", value: "Yes — very easy" }],
    seniorTips: ["Increase the text size in the HP Smart app — go to Settings and adjust the display", "The touchscreen responds to a light touch — you don't need to press hard", "Set up favourites on the home screen — put your most-used functions there"],
    bestFor: "Someone who wants a large clear screen, easy menus, and great all-around printing",
    setupDifficulty: "Very Easy", subscriptionFree: false, hasLargeScreen: true,
  },
  scan_fax: {
    name: "Canon PIXMA TR8620a", brand: "Canon", price: "$199", badge: "Best All-in-One — Print, Scan, Fax",
    emoji: "🔴", color: "from-red-600 to-red-500",
    whyGreat: ["Prints, scans, copies, and faxes — everything in one machine", "Particularly good for medical and legal documents", "Automatic document feeder scans multiple pages without re-loading", "No subscription required — works with standard Canon cartridges"],
    features: [{ icon: "📠", label: "Fax", value: "Yes — built in phone line fax" }, { icon: "📄", label: "Auto document feeder", value: "Yes — 20 page capacity" }, { icon: "📸", label: "Photo quality", value: "Excellent" }, { icon: "📱", label: "Phone printing", value: "Yes — AirPrint + Canon app" }],
    seniorTips: ["The Auto Document Feeder (ADF) lets you scan or fax multiple pages at once — no need to lift and reload", "Connect a phone line to the back for faxing — your printer manual shows exactly which port", "Scan medical documents to your phone using the Canon PRINT app — keeps them organized digitally"],
    bestFor: "Someone who regularly faxes medical or legal documents and needs scan/copy",
    setupDifficulty: "Easy", subscriptionFree: true, hasLargeScreen: false,
  },
};

const QUESTIONS = [
  {
    id: "what",
    title: "What will you mostly print?",
    subtitle: "Take your time — there's no wrong answer",
    options: [
      { v: "documents", label: "Documents, letters, and forms", icon: "📄", desc: "Medical forms, letters, bills", key: "docs" },
      { v: "photos", label: "Family photos and pictures", icon: "📸", desc: "Photos of grandchildren, holidays", key: "photos" },
      { v: "both", label: "A mix of both", icon: "📋", desc: "Documents sometimes, photos sometimes", key: "both" },
      { v: "school", label: "School projects for grandchildren", icon: "🎨", desc: "Lots of colourful school work", key: "school" },
    ],
  },
  {
    id: "howmuch",
    title: "How often do you think you'll print?",
    subtitle: "This helps us find the right ink type for you",
    options: [
      { v: "rarely", label: "Rarely — once a week or less", icon: "📌", desc: "Just when I need something", key: "light" },
      { v: "regular", label: "A few times a week", icon: "📁", desc: "Regular household printing", key: "medium" },
      { v: "often", label: "Every day or almost", icon: "📚", desc: "Heavy regular use", key: "heavy" },
    ],
  },
  {
    id: "fax",
    title: "Do you ever need to fax documents?",
    subtitle: "Many doctors and legal offices still require faxes",
    options: [
      { v: "yes", label: "Yes — I fax medical or legal papers", icon: "📠", desc: "Doctors, lawyers, insurance", key: "fax" },
      { v: "no", label: "No — I don't need fax", icon: "✉️", desc: "Email or mail is fine", key: "nofax" },
    ],
  },
  {
    id: "tech",
    title: "How comfortable are you with technology?",
    subtitle: "Be honest — we'll find the right printer for YOUR comfort level",
    options: [
      { v: "simple", label: "I want the absolute simplest printer", icon: "🙂", desc: "Fewest steps, clearest instructions", key: "simple" },
      { v: "okay", label: "I can follow clear step-by-step instructions", icon: "😊", desc: "I'm okay with a little guidance", key: "medium" },
      { v: "confident", label: "I'm comfortable with technology", icon: "😎", desc: "I can figure things out", key: "confident" },
    ],
  },
  {
    id: "budget",
    title: "What's your budget for a new printer?",
    subtitle: "There's a good option at every price point",
    options: [
      { v: "under100", label: "Under $100", icon: "💵", desc: "Keep it affordable", key: "low" },
      { v: "100to200", label: "$100–$200", icon: "💳", desc: "Mid range — best selection", key: "mid" },
      { v: "200plus", label: "Over $200", icon: "💎", desc: "Best features and savings", key: "high" },
    ],
  },
];

function pickPrinter(answers: Record<string, string>): string {
  const { what, fax, tech, budget, howmuch } = answers;
  if (fax === "yes") return "scan_fax";
  if (tech === "simple" && budget === "under100") return "simple_docs";
  if (what === "photos" && budget !== "under100") return "photos_quality";
  if (howmuch === "often" && budget !== "under100") return "heavy_family";
  if (tech === "confident" && budget === "200plus") return "large_screen";
  if (what === "school" || howmuch !== "rarely") return "heavy_family";
  return "reliable_workhorse";
}

export default function Client() {
  const [stage, setStage] = useState<"intro" | "quiz" | "lead" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme] = useState<"dark" | "light">("dark");

  const progress = (currentQ / QUESTIONS.length) * 100;
  const recommendation = Object.keys(answers).length === QUESTIONS.length ? PRINTERS[pickPrinter(answers)] : null;

  const answer = (value: string) => {
    setSelectedOption(value);
    setTimeout(() => {
      const newAnswers = { ...answers, [QUESTIONS[currentQ].id]: value };
      setAnswers(newAnswers);
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
    const rec = PRINTERS[pickPrinter(answers)];
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, issue: `Best Printer for Seniors — Recommended: ${rec?.name}`, source: "best-printer-for-seniors" }) }); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = () => { setStage("intro"); setCurrentQ(0); setAnswers({}); setSelectedOption(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={() => {}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">Best Printer for Seniors</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-rose-500/10 border border-rose-500/30 text-rose-300 text-sm font-black uppercase tracking-widest mb-6"><Heart size={14} /> Free Tool · Built for Ages 55+</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
            Best Printer<br /><span className="bg-gradient-to-r from-rose-400 to-pink-300 bg-clip-text text-transparent italic">for Seniors</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Large buttons. Simple app. No subscription tricks. Answer 5 easy questions — get a plain-English recommendation matched to how you actually print.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-rose-500 to-pink-400" />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-4">This finder is built for you ❤️</h2>
                  <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">Finding the right printer can feel overwhelming — there are hundreds of options and the specs are confusing. This tool cuts through all of that. Answer 5 simple questions and we'll tell you exactly which printer suits your lifestyle — with plain-English reasons why.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { icon: "🖨️", title: "Easy to set up", desc: "Printers that connect in under 10 minutes" },
                      { icon: "📱", title: "Simple to use", desc: "Clear apps designed for everyone" },
                      { icon: "💰", title: "No subscription traps", desc: "We flag which printers use subscription ink" },
                    ].map(i => (<div key={i.title} className="bg-zinc-800 rounded-2xl p-4"><div className="text-2xl mb-2">{i.icon}</div><div className="font-black text-white text-sm mb-1">{i.title}</div><div className="text-zinc-400 text-xs font-medium">{i.desc}</div></div>))}
                  </div>
                  <div className="bg-rose-900/20 border border-rose-700 rounded-2xl p-4 mb-6 flex items-start gap-3">
                    <AlertCircle size={16} className="text-rose-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-rose-300 font-medium">We are not paid by any printer brand. Every recommendation is based entirely on your answers and what genuinely suits adults 55+.</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("quiz")} className="w-full py-6 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-rose-500/25">
                    Find My Perfect Printer <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "quiz" && (() => {
            const q = QUESTIONS[currentQ]; return (
              <motion.div key={`q-${currentQ}`} initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }} className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-zinc-800 relative"><motion.div className="h-full bg-gradient-to-r from-rose-500 to-pink-400 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} /></div>
                <div className="p-8 md:p-10">
                  <div className="flex items-center justify-between mb-8">
                    <button onClick={() => { if (currentQ === 0) setStage("intro"); else setCurrentQ(p => p - 1); }} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors"><ArrowLeft size={18} /> Back</button>
                    <span className="text-base font-black text-zinc-400">Question {currentQ + 1} of {QUESTIONS.length}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">{q.subtitle}</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {q.options.map(opt => (
                      <motion.button key={opt.v} whileTap={{ scale: 0.97 }} onClick={() => answer(opt.v)} className={`p-6 rounded-2xl border-2 text-left transition-all ${selectedOption === opt.v ? "border-rose-500 bg-rose-900/30 shadow-lg" : answers[q.id] === opt.v ? "border-rose-500 bg-rose-900/20" : "border-zinc-700 bg-zinc-800/50 hover:border-rose-700"}`}>
                        <div className="text-3xl mb-3">{opt.icon}</div>
                        <div className="font-black text-white text-base mb-1">{opt.label}</div>
                        <div className="text-zinc-400 text-sm font-medium">{opt.desc}</div>
                        {(selectedOption === opt.v || answers[q.id] === opt.v) && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="mt-2"><CheckCircle2 size={18} className="text-rose-400" /></motion.div>}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </motion.div>
            );
          })()}

          {stage === "lead" && (
            <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-rose-500 to-pink-400" />
                <div className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">❤️</div>
                    <h2 className="text-3xl font-black text-white mb-3">Your perfect printer is ready!</h2>
                    <p className="text-zinc-400 font-medium text-lg leading-relaxed">Enter your name and email and we'll send your personalised recommendation — including exactly why it's the right match for you, and the senior-friendly tips to get the most from it.</p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Dorothy" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-rose-500 text-lg placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-rose-500 text-lg placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional — for a free welcome call)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-rose-500 text-lg placeholder:text-zinc-600" /></div></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-rose-500/25 mb-3">
                    {submitting ? <Loader2 size={24} className="animate-spin" /> : "Send My Printer Match"}
                  </motion.button>
                  <button onClick={() => setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me my match</button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "results" && recommendation && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0" /><p className="text-base font-bold text-green-300">Recommendation sent to {email}!</p></div>)}

              <div className="bg-zinc-900 rounded-[2rem] border-2 border-rose-700 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-rose-500 to-pink-400" />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-6"><div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white" /></div><span className="font-black text-amber-400 text-base uppercase tracking-widest">Perfect Match for {name || "You"}</span></div>
                  <div className="flex items-start gap-5 mb-6">
                    <div className={`w-16 h-16 bg-gradient-to-br ${recommendation.color} rounded-2xl flex items-center justify-center text-3xl shrink-0`}>{recommendation.emoji}</div>
                    <div>
                      <h2 className="text-2xl font-black text-white">{recommendation.name}</h2>
                      <p className="text-zinc-400 text-base font-medium">{recommendation.brand}</p>
                      <div className="flex items-center gap-3 mt-2">
                        <span className="text-2xl font-black text-white">{recommendation.price}</span>
                        <span className="text-xs font-black px-3 py-1 rounded-full bg-rose-900/50 text-rose-300">{recommendation.badge}</span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-5 mb-5">
                    <div className="text-sm font-black text-zinc-300 mb-3">🎯 Why this is right for you:</div>
                    {recommendation.whyGreat.map(r => (<div key={r} className="flex items-start gap-2 mb-2"><CheckCircle2 size={16} className="text-rose-400 shrink-0 mt-0.5" /><p className="text-zinc-300 text-sm font-medium">{r}</p></div>))}
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-5">
                    {recommendation.features.map(f => (<div key={f.label} className="bg-zinc-800 rounded-2xl p-4"><div className="text-xl mb-1">{f.icon}</div><div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">{f.label}</div><div className="font-black text-white text-sm">{f.value}</div></div>))}
                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-5 mb-5">
                    <div className="flex gap-4 mb-3">
                      <div><span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Setup</span><div className={`text-sm font-black mt-0.5 ${recommendation.setupDifficulty === "Very Easy" ? "text-green-400" : recommendation.setupDifficulty === "Easy" ? "text-blue-400" : "text-amber-400"}`}>{recommendation.setupDifficulty}</div></div>
                      <div className="w-px bg-zinc-700" />
                      <div><span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Subscription ink</span><div className={`text-sm font-black mt-0.5 ${recommendation.subscriptionFree ? "text-green-400" : "text-amber-400"}`}>{recommendation.subscriptionFree ? "Not required" : "Optional"}</div></div>
                      <div className="w-px bg-zinc-700" />
                      <div><span className="text-xs font-black text-zinc-500 uppercase tracking-widest">Large screen</span><div className={`text-sm font-black mt-0.5 ${recommendation.hasLargeScreen ? "text-green-400" : "text-zinc-400"}`}>{recommendation.hasLargeScreen ? "Yes" : "Standard"}</div></div>
                    </div>
                  </div>

                  <div className="bg-rose-900/20 border border-rose-800 rounded-2xl p-5 mb-5">
                    <div className="text-sm font-black text-rose-400 mb-3">💡 Senior-friendly tips for this printer:</div>
                    {recommendation.seniorTips.map((tip, i) => (<div key={i} className="flex items-start gap-2 mb-2"><span className="text-rose-400 font-black text-sm shrink-0">{i + 1}.</span><p className="text-rose-300 text-sm font-medium">{tip}</p></div>))}
                  </div>

                  <div className="bg-zinc-800 rounded-2xl p-5">
                    <p className="text-zinc-400 text-sm font-medium mb-3">If you'd like a tutor to walk you through setting up your new printer — step by step, at your pace, no jargon — our team is here whenever you're ready.</p>
                    <Link href="/contact"><motion.div whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black rounded-xl shadow-lg cursor-pointer text-sm">Talk to a Tutor <ArrowRight size={16} /></motion.div></Link>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20} /> Start Over</button>
                <Link href="/tools/set-up-my-new-printer"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-rose-600 to-pink-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Set Up My Printer <ArrowRight size={20} /></motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Independent educational guidance. Not affiliated with HP, Canon, Epson, or Brother. Prices approximate — verify at retailers.</p></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Best Printer for Seniors — What to Look For</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base">
            <div><p className="mb-4">The best printer for adults 55+ is not necessarily the most expensive or most feature-rich — it's the one that is easiest to set up, easiest to use daily, and doesn't come with confusing subscription traps. The HP DeskJet and HP ENVY ranges consistently score highest for ease of use, thanks to the HP Smart app which walks you through every step in plain language.</p></div>
            <div><p>For households that need to fax medical or legal documents — which is very common for older adults dealing with insurance and healthcare providers — an all-in-one printer like the Canon TR8620a or Brother MFC-J1010DW is essential. Both include a physical fax function using a regular phone line. This guide is for educational purposes and is not affiliated with any printer manufacturer.</p></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
