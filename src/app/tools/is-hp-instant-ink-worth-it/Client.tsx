"use client";
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, AlertCircle, TrendingDown, TrendingUp, Minus } from "lucide-react";

const bgs = [
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1563520239648-a8ade7166c97?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
];

type BrandId = "hp" | "canon" | "epson" | "brother";

const BRANDS: Record<BrandId, {
  name: string; emoji: string; color: string;
  subName: string;
  plans: { name: string; pages: number; price: number; overagePer10: number }[];
  cartridgeCostBW: number; cartridgeCostColor: number;
  pagesBWperCart: number; pagesColorPerCart: number;
  hiddenRules: string[];
  cancelWarning: string;
}> = {
  hp: {
    name: "HP", emoji: "🔵", color: "from-blue-600 to-blue-500",
    subName: "HP Instant Ink",
    plans: [
      { name: "10 pages/mo", pages: 10, price: 0.99, overagePer10: 1.00 },
      { name: "50 pages/mo", pages: 50, price: 2.99, overagePer10: 1.00 },
      { name: "100 pages/mo", pages: 100, price: 4.99, overagePer10: 1.00 },
      { name: "300 pages/mo", pages: 300, price: 9.99, overagePer10: 1.00 },
      { name: "700 pages/mo", pages: 700, price: 19.99, overagePer10: 1.00 },
    ],
    cartridgeCostBW: 14.99, cartridgePagessBW: 120,
    cartridgeCostColor: 18.99, pagesColorPerCart: 100,
    hiddenRules: [
      "If you cancel, your cartridges stop working — they are 'subscription cartridges'",
      "Unused pages do not roll over more than 1 month",
      "Overage pages cost $1.00 per 10 extra pages",
      "Some HP printers only work with Instant Ink cartridges once enrolled",
    ],
    cancelWarning: "⚠️ Critical: HP Instant Ink cartridges stop working if you cancel the subscription — even if they have ink left. You must buy new retail cartridges after cancelling.",
  },
  canon: {
    name: "Canon", emoji: "🔴", color: "from-red-600 to-red-500",
    subName: "Canon Selphy/PIXMA Subscription",
    plans: [
      { name: "50 pages/mo", pages: 50, price: 3.99, overagePer10: 1.50 },
      { name: "100 pages/mo", pages: 100, price: 5.99, overagePer10: 1.50 },
      { name: "200 pages/mo", pages: 200, price: 9.99, overagePer10: 1.50 },
    ],
    cartridgeCostBW: 16.99, cartridgePagessBW: 300,
    cartridgeCostColor: 19.99, pagesColorPerCart: 250,
    hiddenRules: [
      "Canon's subscription is less widely pushed than HP Instant Ink",
      "Overage at $1.50 per 10 pages — higher than HP",
      "Unused pages expire monthly — no rollover",
      "Subscription ink works on enrolled printers only",
    ],
    cancelWarning: "Canon's subscription has fewer restrictions on cancellation than HP, but always verify with Canon before enrolling.",
  },
  epson: {
    name: "Epson", emoji: "🟣", color: "from-violet-600 to-violet-500",
    subName: "Epson ReadyPrint",
    plans: [
      { name: "50 pages/mo", pages: 50, price: 1.99, overagePer10: 0.99 },
      { name: "100 pages/mo", pages: 100, price: 3.99, overagePer10: 0.99 },
      { name: "200 pages/mo", pages: 200, price: 6.99, overagePer10: 0.99 },
    ],
    cartridgeCostBW: 12.99, cartridgePagessBW: 200,
    cartridgeCostColor: 14.99, pagesColorPerCart: 150,
    hiddenRules: [
      "ReadyPrint is available for select Epson models only",
      "EcoTank owners typically do not need any subscription",
      "Overage is cheaper than HP at $0.99 per 10 pages",
      "Unused pages do not carry over",
    ],
    cancelWarning: "If you own an Epson EcoTank, you almost certainly do not need any subscription — refill bottles are already extremely cheap.",
  },
  brother: {
    name: "Brother", emoji: "⚫", color: "from-zinc-600 to-zinc-500",
    subName: "Brother Refresh",
    plans: [
      { name: "50 pages/mo", pages: 50, price: 2.99, overagePer10: 1.00 },
      { name: "100 pages/mo", pages: 100, price: 4.99, overagePer10: 1.00 },
      { name: "200 pages/mo", pages: 200, price: 7.99, overagePer10: 1.00 },
    ],
    cartridgeCostBW: 9.99, cartridgePagessBW: 300,
    cartridgeCostColor: 17.99, pagesColorPerCart: 200,
    hiddenRules: [
      "Brother XL cartridges often make subscriptions unnecessary",
      "Brother ink is typically cheaper than HP retail cartridges",
      "Subscription only available on select Brother models",
      "Unused pages do not roll over to next month",
    ],
    cancelWarning: "Brother XL cartridges already offer very good value — a subscription may not save as much as with HP.",
  },
};

const PAGE_OPTIONS = [
  { v: 10, label: "About 10 pages", desc: "A letter or two" },
  { v: 30, label: "About 30 pages", desc: "A few documents" },
  { v: 50, label: "About 50 pages", desc: "Light regular printing" },
  { v: 100, label: "About 100 pages", desc: "Regular family use" },
  { v: 200, label: "About 200 pages", desc: "Heavy home use" },
  { v: 350, label: "300+ pages", desc: "Home office / school" },
];

const COLOR_OPTIONS = [
  { v: "bw", label: "Mostly black & white", desc: "Documents, forms, text", pct: 0.1 },
  { v: "mixed", label: "Mix of colour & black", desc: "Colour and documents", pct: 0.4 },
  { v: "colour", label: "Mostly colour", desc: "Photos, school projects", pct: 0.75 },
];

export default function Client() {
  const [stage, setStage] = useState<"intro" | "brand" | "pages" | "color" | "lead" | "results">("intro");
  const [brand, setBrand] = useState<BrandId | null>(null);
  const [pages, setPages] = useState<number | null>(null);
  const [colorPct, setColorPct] = useState<number | null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme] = useState<"dark" | "light">("dark");

  const brandData = brand ? BRANDS[brand] : null;

  const calc = useMemo(() => {
    if (!brandData || !pages || colorPct === null) return null;
    const bwPages = Math.round(pages * (1 - colorPct));
    const colorPages = pages - bwPages;

    // Cartridge cost annual
    const bwCartridgesPerYear = (bwPages * 12) / (brandData.cartridgePagessBW || 200);
    const colorCartridgesPerYear = (colorPages * 12) / (brandData.pagesColorPerCart || 150);
    const annualCartridge = bwCartridgesPerYear * brandData.cartridgeCostBW + colorCartridgesPerYear * brandData.cartridgeCostColor;

    // Best subscription plan
    const bestPlan = brandData.plans.reduce((best, plan) => {
      const overage = Math.max(0, pages - plan.pages);
      const monthlyTotal = plan.price + (Math.ceil(overage / 10) * plan.overagePer10);
      const prevOverage = Math.max(0, pages - best.pages);
      const prevTotal = best.price + (Math.ceil(prevOverage / 10) * best.overagePer10);
      return monthlyTotal < prevTotal ? plan : best;
    }, brandData.plans[0]);

    const overage = Math.max(0, pages - bestPlan.pages);
    const monthlySubTotal = bestPlan.price + (Math.ceil(overage / 10) * bestPlan.overagePer10);
    const annualSub = monthlySubTotal * 12;
    const saving = annualCartridge - annualSub;

    return { annualCartridge, annualSub, saving, bestPlan, monthlySubTotal, bwPages, colorPages };
  }, [brandData, pages, colorPct]);

  const verdict = calc ? (
    calc.saving > 30 ? "save" : calc.saving < -10 ? "cost" : "neutral"
  ) : null;

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, issue: `Ink Subscription Calc — Brand: ${brand} — Verdict: ${verdict} — Pages: ${pages}/mo`, source: "is-hp-instant-ink-worth-it" }) }); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };
  const reset = () => { setStage("intro"); setBrand(null); setPages(null); setColorPct(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={() => {}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">Ink Subscription Calculator</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14} /> Free Tool · 60 Seconds</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
            Is HP Instant Ink<br /><span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent italic">Worth It?</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Find out in 60 seconds if an ink subscription will save you money — or quietly drain it. Honest calculator, no spin.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">

          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-4">The truth about ink subscriptions 💰</h2>
                  <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">Ink subscriptions like HP Instant Ink can save money — or cost you more. It depends entirely on how many pages you print each month. This calculator does the honest math for you.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
                    {[
                      { icon: "✅", title: "Worth it if...", desc: "You print 100+ pages/month consistently" },
                      { icon: "❌", title: "Not worth it if...", desc: "You print under 50 pages/month" },
                      { icon: "⚠️", title: "Watch out for...", desc: "HP cartridges stop working if you cancel" },
                    ].map(i => (<div key={i.title} className="bg-zinc-800 rounded-2xl p-4"><div className="text-2xl mb-2">{i.icon}</div><div className="font-black text-white text-sm mb-1">{i.title}</div><div className="text-zinc-400 text-xs font-medium">{i.desc}</div></div>))}
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("brand")} className="w-full py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/25">
                    Calculate My Ink Savings <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "brand" && (
            <motion.div key="brand" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("intro")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">What printer brand do you have?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">Each brand has different subscription plans and prices.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {(Object.entries(BRANDS) as [BrandId, typeof BRANDS[BrandId]][]).map(([id, b]) => (
                      <motion.button key={id} whileTap={{ scale: 0.97 }} onClick={() => { setBrand(id); setStage("pages"); }} className="p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-green-700 text-left transition-all">
                        <div className={`w-10 h-10 bg-gradient-to-br ${b.color} rounded-xl flex items-center justify-center text-xl mb-3`}>{b.emoji}</div>
                        <div className="font-black text-white text-base">{b.name}</div>
                        <div className="text-zinc-500 text-xs font-medium mt-1">{b.subName}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "pages" && (
            <motion.div key="pages" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("brand")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">How many pages do you print per month?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">Count all pages — one sheet printed on both sides = 2 pages. Be honest — this drives the whole calculation.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {PAGE_OPTIONS.map(opt => (
                      <motion.button key={opt.v} whileTap={{ scale: 0.97 }} onClick={() => { setPages(opt.v); setStage("color"); }} className={`p-5 rounded-2xl border-2 text-left transition-all ${pages === opt.v ? "border-green-500 bg-green-900/20" : "border-zinc-700 bg-zinc-800/50 hover:border-green-700"}`}>
                        <div className="font-black text-white text-base mb-1">{opt.label}</div>
                        <div className="text-zinc-400 text-sm font-medium">{opt.desc}</div>
                        {pages === opt.v && <CheckCircle2 size={16} className="text-green-400 mt-2" />}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "color" && (
            <motion.div key="color" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("pages")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">What do you mostly print?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">Colour ink costs significantly more — this changes the calculation.</p>
                  <div className="space-y-3">
                    {COLOR_OPTIONS.map(opt => (
                      <motion.button key={opt.v} whileTap={{ scale: 0.97 }} onClick={() => { setColorPct(opt.pct); setStage("lead"); }} className={`w-full p-6 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${colorPct === opt.pct ? "border-green-500 bg-green-900/20" : "border-zinc-700 bg-zinc-800/50 hover:border-green-700"}`}>
                        <div className="flex-1">
                          <div className="font-black text-white text-base">{opt.label}</div>
                          <div className="text-zinc-400 text-sm font-medium">{opt.desc}</div>
                        </div>
                        {colorPct === opt.pct && <CheckCircle2 size={20} className="text-green-400" />}
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "lead" && (
            <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400" />
                <div className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">💰</div>
                    <h2 className="text-3xl font-black text-white mb-3">Your ink cost calculation is ready!</h2>
                    <p className="text-zinc-400 font-medium text-lg">Enter your details and we'll email you the full year-by-year cost breakdown — so you can refer back whenever needed.</p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Robert" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-green-500 text-lg placeholder:text-zinc-600" /></div></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/25 mb-3">
                    {submitting ? <Loader2 size={24} className="animate-spin" /> : "Send My Cost Calculation"}
                  </motion.button>
                  <button onClick={() => setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — show me the results now</button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "results" && calc && brandData && (
            <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
              {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0" /><p className="text-base font-bold text-green-300">Calculation sent to {email}!</p></div>)}

              {/* Verdict Card */}
              <div className={`bg-zinc-900 rounded-[2rem] border-2 overflow-hidden ${verdict === "save" ? "border-green-700" : verdict === "cost" ? "border-red-700" : "border-amber-700"}`}>
                <div className={`h-1.5 ${verdict === "save" ? "bg-gradient-to-r from-green-500 to-emerald-400" : verdict === "cost" ? "bg-gradient-to-r from-red-500 to-rose-400" : "bg-gradient-to-r from-amber-500 to-orange-400"}`} />
                <div className="p-8">
                  <div className="flex items-center gap-4 mb-6">
                    <div className={`w-16 h-16 rounded-2xl flex items-center justify-center ${verdict === "save" ? "bg-green-900/40" : verdict === "cost" ? "bg-red-900/40" : "bg-amber-900/40"}`}>
                      {verdict === "save" ? <TrendingDown size={32} className="text-green-400" /> : verdict === "cost" ? <TrendingUp size={32} className="text-red-400" /> : <Minus size={32} className="text-amber-400" />}
                    </div>
                    <div>
                      <h2 className="text-2xl font-black text-white">
                        {verdict === "save" ? `${brandData.subName} WILL save you money` : verdict === "cost" ? `${brandData.subName} will COST you more` : `It's close — here's the breakdown`}
                      </h2>
                      <p className={`text-lg font-black ${verdict === "save" ? "text-green-400" : verdict === "cost" ? "text-red-400" : "text-amber-400"}`}>
                        {verdict === "save" ? `You'd save ~$${Math.round(calc.saving)}/year` : verdict === "cost" ? `You'd pay ~$${Math.round(Math.abs(calc.saving))} more/year` : `Difference is less than $30/year`}
                      </p>
                    </div>
                  </div>

                  {/* Cost comparison */}
                  <div className="grid grid-cols-2 gap-4 mb-6">
                    <div className="bg-zinc-800 rounded-2xl p-5">
                      <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Without Subscription</div>
                      <div className="text-3xl font-black text-white">${Math.round(calc.annualCartridge)}</div>
                      <div className="text-zinc-500 text-sm font-medium">per year (cartridges)</div>
                    </div>
                    <div className={`rounded-2xl p-5 ${verdict === "save" ? "bg-green-900/30" : "bg-zinc-800"}`}>
                      <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">With {brandData.subName}</div>
                      <div className={`text-3xl font-black ${verdict === "save" ? "text-green-400" : "text-white"}`}>${Math.round(calc.annualSub)}</div>
                      <div className="text-zinc-500 text-sm font-medium">per year ({calc.bestPlan.name} plan)</div>
                    </div>
                  </div>

                  {/* Best plan */}
                  <div className="bg-zinc-800 rounded-2xl p-5 mb-6">
                    <div className="text-sm font-black text-zinc-300 mb-3">Best plan for {pages} pages/month:</div>
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="font-black text-white text-lg">{calc.bestPlan.name} plan</div>
                        <div className="text-zinc-400 text-sm font-medium">{calc.bestPlan.price}/month base · ${calc.bestPlan.overagePer10}/10 overage pages</div>
                      </div>
                      <div className="text-right">
                        <div className="font-black text-white text-xl">${calc.monthlySubTotal.toFixed(2)}</div>
                        <div className="text-zinc-500 text-sm">per month total</div>
                      </div>
                    </div>
                  </div>

                  {/* Hidden rules warning */}
                  <div className="bg-amber-900/20 border border-amber-700 rounded-2xl p-5">
                    <div className="text-sm font-black text-amber-400 mb-3">⚠️ Important things to know before signing up:</div>
                    {brandData.hiddenRules.map((rule, i) => (<div key={i} className="flex items-start gap-2 mb-2"><span className="text-amber-400 text-sm mt-0.5">•</span><p className="text-amber-300 text-sm font-medium">{rule}</p></div>))}
                    <div className="mt-3 p-3 bg-amber-900/30 rounded-xl"><p className="text-amber-200 text-sm font-black">{brandData.cancelWarning}</p></div>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20} /> Try Again</button>
                <Link href="/tools/best-printer-for-seniors"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Find the Best Printer <ArrowRight size={20} /></motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational estimates only. Prices and plan details subject to change. Verify at your brand's official website before subscribing.</p></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Is HP Instant Ink Worth It? — The Honest Answer</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base">
            <div><p className="mb-4">HP Instant Ink is worth it if you print more than 100 pages per month. At that volume, the subscription cost is lower than buying individual cartridges. The 100-page plan at $4.99/month works out to less than 5 cents per page — significantly cheaper than retail cartridges.</p><p>However, there is a critical detail most people miss: HP Instant Ink cartridges stop working if you cancel your subscription. Unlike regular cartridges, they are "connected" to the subscription. This means if you cancel, you must buy new retail cartridges — even if your Instant Ink cartridges still have ink.</p></div>
            <div><p className="mb-4">For low-volume printers (under 50 pages/month), ink subscriptions rarely save money. The overage charges add up quickly if you go over your plan limit, and most light users would be better served by XL cartridges from Brother or Epson EcoTank bottles.</p><p>This calculator provides educational estimates. Prices and plan details change regularly — always verify the current plan pricing on your brand's official website before subscribing.</p></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
