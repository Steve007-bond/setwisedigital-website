"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Star,
  Mail, Phone, User, Loader2, Navigation, Shield, Zap, RefreshCw, Award,
} from "lucide-react";

const gpsBackgrounds = [
  { url: "https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200", type: "image" as const, theme: "dark" as const },
];

interface GPSDevice { id: string; name: string; brand: string; priceRange: string; priceMin: number; screen: string; bestFor: string[]; features: string[]; pros: string[]; cons: string[]; techLevel: "beginner" | "intermediate"; drivingType: string[]; badge: string; badgeColor: string; score?: number; emoji: string; }

const GPS_DATABASE: GPSDevice[] = [
  { id: "garmin-drive-52", name: "Garmin Drive 52", brand: "Garmin", priceRange: "$89–$109", priceMin: 89, screen: "5-inch", bestFor: ["Beginners", "City driving", "Budget-conscious"], features: ["Turn-by-turn voice directions", "Speed limit alerts", "Driver alerts", "Easy menu navigation"], pros: ["Very affordable", "Large simple menu", "Bright screen", "Reliable Garmin quality"], cons: ["No live traffic", "No Bluetooth", "Basic features only"], techLevel: "beginner", drivingType: ["city", "suburban", "highway"], badge: "Best for Beginners", badgeColor: "bg-green-600", emoji: "🟢" },
  { id: "garmin-drivesmart-55", name: "Garmin DriveSmart 55", brand: "Garmin", priceRange: "$149–$179", priceMin: 149, screen: "5.5-inch", bestFor: ["Most drivers", "Highway travel", "Live traffic users"], features: ["Live traffic & weather", "Bluetooth calls", "Smart notifications", "Voice control", "Wi-Fi map updates"], pros: ["Best all-around choice", "Live traffic avoidance", "Hands-free calling", "Easy Wi-Fi updates"], cons: ["Slightly pricier", "Requires smartphone for live features"], techLevel: "beginner", drivingType: ["city", "suburban", "highway", "rural"], badge: "Most Popular", badgeColor: "bg-blue-600", emoji: "⭐" },
  { id: "garmin-drivesmart-65", name: "Garmin DriveSmart 65", brand: "Garmin", priceRange: "$179–$219", priceMin: 179, screen: "6.95-inch", bestFor: ["Large screen lovers", "Seniors 65+", "Highway drivers"], features: ["Extra-large 7\" screen", "Live traffic", "Bluetooth", "Voice activation", "Large text & buttons"], pros: ["Biggest clearest screen", "Easy to read at a glance", "Voice control hands-free", "Perfect for aging eyes"], cons: ["Larger physical size", "Higher price", "Needs phone for live traffic"], techLevel: "beginner", drivingType: ["city", "suburban", "highway"], badge: "Best Large Screen", badgeColor: "bg-purple-600", emoji: "👁️" },
  { id: "tomtom-go-520", name: "TomTom GO 520", brand: "TomTom", priceRange: "$129–$159", priceMin: 129, screen: "5-inch", bestFor: ["Independent travelers", "No-phone users", "Offline navigation"], features: ["Built-in Wi-Fi updates", "World maps included", "Offline navigation", "Speed camera alerts"], pros: ["Works without smartphone", "World maps included", "Easy Wi-Fi updates", "Great for international travel"], cons: ["Older interface", "Fewer live features"], techLevel: "beginner", drivingType: ["city", "highway", "rural"], badge: "Best Offline", badgeColor: "bg-red-600", emoji: "🔴" },
  { id: "garmin-dezl", name: "Garmin dēzl OTR610", brand: "Garmin", priceRange: "$249–$299", priceMin: 249, screen: "6-inch", bestFor: ["RV drivers", "Towing a trailer", "Rural routes"], features: ["RV & trailer routing", "Custom vehicle profiles", "Campground finder", "Wi-Fi updates", "Live traffic"], pros: ["Avoids low bridges & weight limits", "Perfect for RV travel", "Campground database", "Rugged build"], cons: ["Expensive", "Overkill for city driving"], techLevel: "intermediate", drivingType: ["highway", "rural"], badge: "Best for RV", badgeColor: "bg-amber-600", emoji: "🚐" },
  { id: "garmin-drivesmart-traffic", name: "Garmin DriveSmart 55 + Traffic", brand: "Garmin", priceRange: "$169–$199", priceMin: 169, screen: "5.5-inch", bestFor: ["Commuters", "City drivers", "Traffic-heavy areas"], features: ["Real-time traffic", "Incident alerts", "Alternate routes", "Bluetooth", "Voice control"], pros: ["Saves time with traffic routing", "Real-time incident alerts", "Hands-free calling", "Great value"], cons: ["Needs smartphone for live data"], techLevel: "beginner", drivingType: ["city", "suburban", "highway"], badge: "Best for Traffic", badgeColor: "bg-cyan-600", emoji: "🚦" },
];

const QUESTIONS = [
  { id: "driving", title: "Where do you mostly drive?", subtitle: "Choose the one that fits your typical trips", options: [{ value: "city", label: "City & suburbs", icon: "🏙️", desc: "Lots of traffic, frequent stops" }, { value: "highway", label: "Highways & long trips", icon: "🛣️", desc: "Mostly straight routes, road trips" }, { value: "rural", label: "Rural & back roads", icon: "🌲", desc: "Less-traveled routes, countryside" }, { value: "rv", label: "RV or towing a trailer", icon: "🚐", desc: "Large vehicle, campsite routes" }] },
  { id: "budget", title: "What's your budget?", subtitle: "All options are quality devices — pick what feels comfortable", options: [{ value: "low", label: "Under $100", icon: "💵", desc: "Best value basics" }, { value: "mid", label: "$100 – $180", icon: "💳", desc: "Most popular range" }, { value: "high", label: "$180 – $300", icon: "💎", desc: "Premium features" }, { value: "any", label: "Best is fine", icon: "⭐", desc: "Just recommend the best" }] },
  { id: "screen", title: "How important is screen size?", subtitle: "Bigger screens are much easier to read while driving", options: [{ value: "standard", label: "Standard size is fine", icon: "📱", desc: "5-inch screen" }, { value: "large", label: "I want a big screen", icon: "📺", desc: "6-7 inch — easier to read" }, { value: "any", label: "No preference", icon: "🤷", desc: "Just whatever works best" }] },
  { id: "tech", title: "How comfortable are you with technology?", subtitle: "This helps us match the right complexity level", options: [{ value: "beginner", label: "I keep it simple", icon: "😊", desc: "Easy menus, big buttons" }, { value: "intermediate", label: "I manage okay", icon: "👍", desc: "Can follow instructions" }, { value: "advanced", label: "I love features", icon: "🚀", desc: "More options the better" }] },
  { id: "priority", title: "What matters most to you?", subtitle: "Your top priority shapes our recommendation", options: [{ value: "traffic", label: "Avoiding traffic jams", icon: "🚦", desc: "Live traffic alerts & rerouting" }, { value: "offline", label: "Works without my phone", icon: "📵", desc: "No data needed, fully independent" }, { value: "voice", label: "Hands-free calling", icon: "📞", desc: "Bluetooth calls while driving" }, { value: "simple", label: "Just easy to use", icon: "✨", desc: "Simple, reliable, no fuss" }] },
];

function scoreGPS(device: GPSDevice, answers: Record<string, string>): number {
  let score = 0;
  if (device.drivingType.includes(answers.driving)) score += 30;
  const budget = answers.budget;
  if (budget === "low" && device.priceMin <= 100) score += 25;
  else if (budget === "mid" && device.priceMin >= 100 && device.priceMin <= 180) score += 25;
  else if (budget === "high" && device.priceMin >= 180) score += 25;
  else if (budget === "any") score += 20;
  if (answers.tech === "beginner" && device.techLevel === "beginner") score += 20;
  else if (answers.tech === "intermediate") score += 15;
  const priority = answers.priority;
  if (priority === "traffic" && device.features.some(f => f.toLowerCase().includes("traffic"))) score += 20;
  if (priority === "offline" && device.features.some(f => f.toLowerCase().includes("offline") || f.toLowerCase().includes("wi-fi"))) score += 20;
  if (priority === "voice" && device.features.some(f => f.toLowerCase().includes("bluetooth") || f.toLowerCase().includes("voice"))) score += 20;
  if (priority === "simple" && device.techLevel === "beginner") score += 20;
  if (answers.screen === "large" && (device.screen.includes("6") || device.screen.includes("7"))) score += 5;
  return Math.min(score, 100);
}

export default function BestGPSFinderClient() {
  const [stage, setStage] = useState<"intro" | "quiz" | "lead" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const recommendations = GPS_DATABASE.map(d => ({ ...d, score: scoreGPS(d, answers) })).sort((a, b) => (b.score ?? 0) - (a.score ?? 0)).slice(0, 3);
  const topPick = recommendations[0];
  const progress = (currentQ / QUESTIONS.length) * 100;

  const answerQuestion = (value: string) => {
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
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, brand: topPick?.brand, issue: `GPS Finder — Top Pick: ${topPick?.name}`, source: "best-gps-finder", extra: JSON.stringify(answers) }) });
    } catch {}
    setSubmitted(true); setSubmitting(false); setStage("results");
  };

  const reset = () => { setStage("intro"); setCurrentQ(0); setAnswers({}); setSelectedOption(null); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar />
      <ScrollToTop />

      {/* Hero */}
      <section ref={heroRef} className="relative min-h-[72vh] flex items-end pb-16 pt-24 overflow-hidden">
        <HeaderBackgroundSlider items={gpsBackgrounds} interval={8000} />
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <motion.div initial={{ opacity: 0, y: 30 }} animate={heroInView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.7 }}>
            <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
              <Link href="/" className="hover:text-white transition-colors">Home</Link>
              <ChevronRight size={16} />
              <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link>
              <ChevronRight size={16} />
              <span className="text-zinc-300">Best GPS Finder</span>
            </nav>
            <motion.div initial={{ opacity: 0, x: -20 }} animate={heroInView ? { opacity: 1, x: 0 } : {}} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-black uppercase tracking-widest mb-6">
              <Navigation size={14} /> Free Tool · 4 Minutes
            </motion.div>
            <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6 text-white">
              Best GPS Finder
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent italic">for You</span>
            </h1>
            <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">
              Not sure which GPS to buy? Answer 5 simple questions about your driving habits and budget. Get a personalized recommendation — in plain English, no jargon.
            </p>
          </motion.div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10" />
      </section>

      {/* Tool */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 -mt-4">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* INTRO */}
              {stage === "intro" && (
                <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-400" />
                  <div className="p-8 md:p-10">
                    <h2 className="text-3xl font-black text-white mb-4">Find Your Perfect GPS Match 🎯</h2>
                    <p className="text-zinc-400 font-medium mb-8 leading-relaxed text-lg">We'll ask you 5 quick questions about how you drive, your budget, and what matters most. Then we'll match you to the best GPS from our curated database — no complicated specs, just a clear recommendation.</p>
                    <div className="space-y-3 mb-8">
                      {QUESTIONS.map((q, i) => (
                        <div key={q.id} className="flex items-center gap-4 p-5 bg-zinc-800/50 rounded-2xl border border-zinc-700/50">
                          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-black text-base shrink-0">{i + 1}</div>
                          <div className="font-black text-white text-base">{q.title}</div>
                        </div>
                      ))}
                    </div>
                    <div className="p-5 bg-blue-900/20 border border-blue-800 rounded-2xl mb-6">
                      <div className="flex items-start gap-3">
                        <Shield size={16} className="text-blue-400 mt-0.5 shrink-0" />
                        <p className="text-sm text-blue-300 font-medium">Educational tool only. We recommend based on publicly available device specs. Not affiliated with Garmin, TomTom, or any manufacturer.</p>
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("quiz")}
                      className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/25">
                      Find My Perfect GPS <ArrowRight size={24} />
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
                    <motion.div className="h-full bg-gradient-to-r from-blue-500 to-indigo-400 rounded-full" animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
                  </div>
                  <div className="p-8 md:p-10">
                    <div className="flex items-center justify-between mb-8">
                      <button onClick={() => { if (currentQ === 0) setStage("intro"); else setCurrentQ(p => p - 1); }}
                        className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors">
                        <ArrowLeft size={18} /> Back
                      </button>
                      <span className="text-base font-black text-zinc-400">Question {currentQ + 1} of {QUESTIONS.length}</span>
                    </div>
                    {(() => {
                      const q = QUESTIONS[currentQ];
                      return (
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-xl flex items-center justify-center text-white font-black text-base">{currentQ + 1}</div>
                              <span className="text-sm font-black text-blue-400 uppercase tracking-widest">Question {currentQ + 1}</span>
                            </div>
                            <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{q.title}</h3>
                            <p className="text-zinc-400 font-medium text-base">{q.subtitle}</p>
                          </div>
                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt) => (
                              <motion.button key={opt.value} whileTap={{ scale: 0.97 }} onClick={() => answerQuestion(opt.value)}
                                className={`p-6 rounded-2xl border-2 text-left transition-all ${selectedOption === opt.value ? "border-blue-500 bg-blue-900/30 shadow-lg" : answers[q.id] === opt.value ? "border-blue-500 bg-blue-900/20" : "border-zinc-700 bg-zinc-800/50 hover:border-blue-600"}`}>
                                <div className="text-3xl mb-3">{opt.icon}</div>
                                <div className="font-black text-white text-base mb-1">{opt.label}</div>
                                <div className="text-zinc-400 text-sm font-medium">{opt.desc}</div>
                                {(selectedOption === opt.value || answers[q.id] === opt.value) && (
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
                  className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden shadow-2xl">
                  <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-400" />
                  <div className="p-8 md:p-10">
                    <div className="text-center mb-8">
                      <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, delay: 0.2 }} className="text-6xl mb-4">🎯</motion.div>
                      <h2 className="text-3xl font-black text-white mb-3">We found your perfect GPS match!</h2>
                      <p className="text-zinc-400 font-medium text-lg leading-relaxed">Enter your email to receive your personalized recommendation report — device details, where to buy, and setup tips.</p>
                    </div>
                    <div className="bg-zinc-800 border border-zinc-700 rounded-2xl p-6 mb-6 space-y-3">
                      {["🏆 Your #1 GPS recommendation with full details", "💰 Price comparison across major retailers", "📖 Plain-English setup guide for your device", "💡 Monthly tips for drivers 45+ from Setwise Digital"].map(item => (
                        <div key={item} className="flex items-center gap-3 text-base">
                          <CheckCircle2 size={16} className="text-green-400 shrink-0" />
                          <span className="text-zinc-300 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label>
                        <div className="relative">
                          <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mary"
                            className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600 text-lg" />
                        </div>
                        {errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label>
                        <div className="relative">
                          <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com"
                            className="w-full pl-12 pr-10 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600 text-lg" />
                          {email.includes("@") && <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2"><CheckCircle2 size={18} className="text-green-500" /></motion.div>}
                        </div>
                        {errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional — for SMS tips)</span></label>
                        <div className="relative">
                          <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000"
                            className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600 text-lg" />
                        </div>
                      </div>
                    </div>
                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting}
                      className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/25 mb-4">
                      {submitting ? <Loader2 size={24} className="animate-spin" /> : <><Award size={22} />Show My GPS Match</>}
                    </motion.button>
                    <button onClick={() => setStage("results")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">
                      Skip — just show me the results
                    </button>
                    <p className="text-center text-sm text-zinc-600 mt-4">🔒 No spam. Unsubscribe anytime. We never sell your info.</p>
                  </div>
                </motion.div>
              )}

              {/* RESULTS */}
              {stage === "results" && (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">
                  {submitted && (
                    <div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3">
                      <CheckCircle2 size={20} className="text-green-400 shrink-0" />
                      <p className="text-base font-bold text-green-300">Report sent to {email} — check your inbox!</p>
                    </div>
                  )}
                  {topPick && (
                    <div className="bg-zinc-900 rounded-[2rem] border-2 border-blue-800 overflow-hidden shadow-xl">
                      <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-400" />
                      <div className="p-8">
                        <div className="flex items-center gap-3 mb-6">
                          <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Star size={18} className="text-white fill-white" />
                          </div>
                          <span className="font-black text-amber-400 text-base uppercase tracking-widest">Your #1 Recommended GPS{name ? ` for ${name}` : ""}</span>
                        </div>
                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div>
                            <h3 className="text-3xl font-black text-white mb-2">{topPick.name}</h3>
                            <div className="flex items-center gap-3">
                              <span className={`${topPick.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{topPick.badge}</span>
                              <span className="text-zinc-400 font-bold text-base">{topPick.priceRange}</span>
                            </div>
                          </div>
                          <div className="text-6xl">{topPick.emoji}</div>
                        </div>
                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-zinc-800 rounded-2xl p-5">
                            <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Screen Size</div>
                            <div className="font-black text-white text-lg">{topPick.screen}</div>
                          </div>
                          <div className="bg-zinc-800 rounded-2xl p-5">
                            <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Best For</div>
                            <div className="font-black text-white text-base">{topPick.bestFor[0]}</div>
                          </div>
                        </div>
                        <div className="mb-6">
                          <div className="text-base font-black text-zinc-200 mb-3">Key Features:</div>
                          <div className="space-y-2">
                            {topPick.features.map(f => (
                              <div key={f} className="flex items-center gap-3 text-base text-zinc-300 font-medium">
                                <CheckCircle2 size={16} className="text-blue-400 shrink-0" />{f}
                              </div>
                            ))}
                          </div>
                        </div>
                        <div className="grid grid-cols-2 gap-5 mb-6">
                          <div>
                            <div className="text-sm font-black text-green-400 uppercase tracking-widest mb-2">✓ Pros</div>
                            {topPick.pros.map(p => <div key={p} className="text-sm text-zinc-400 font-medium mb-1.5">• {p}</div>)}
                          </div>
                          <div>
                            <div className="text-sm font-black text-red-400 uppercase tracking-widest mb-2">✗ Consider</div>
                            {topPick.cons.map(c => <div key={c} className="text-sm text-zinc-400 font-medium mb-1.5">• {c}</div>)}
                          </div>
                        </div>
                        <div className="flex items-center gap-3 p-5 bg-blue-900/20 border border-blue-800 rounded-2xl">
                          <Zap size={16} className="text-blue-400 shrink-0" />
                          <p className="text-base text-blue-300 font-medium">Based on your answers: <strong>{answers.driving} driving</strong>, <strong>{answers.budget} budget</strong>, priority of <strong>{answers.priority}</strong>.</p>
                        </div>
                      </div>
                    </div>
                  )}
                  <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                    <h3 className="font-black text-white mb-5 flex items-center gap-2 text-xl"><Navigation size={20} className="text-blue-400" />Also Consider</h3>
                    <div className="space-y-4">
                      {recommendations.slice(1).map((device, i) => (
                        <motion.div key={device.id} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-5 p-5 bg-zinc-800 rounded-2xl">
                          <div className="text-3xl">{device.emoji}</div>
                          <div className="flex-1">
                            <div className="font-black text-white text-base">{device.name}</div>
                            <div className="text-zinc-400 text-sm font-medium">{device.priceRange} · {device.screen}</div>
                          </div>
                          <span className={`${device.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{device.badge}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg">
                      <RefreshCw size={20} /> Try Again
                    </button>
                    <Link href="/tools/road-trip-checker">
                      <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black rounded-2xl shadow-lg shadow-green-500/20 cursor-pointer text-lg">
                        <Navigation size={20} /> Road Trip Checklist
                      </motion.div>
                    </Link>
                  </div>
                  <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                    <div className="flex items-start gap-3">
                      <Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" />
                      <p className="text-sm text-zinc-500 font-medium leading-relaxed"><strong className="text-zinc-400">Educational guidance only.</strong> Prices and features are approximate. Setwise Digital is an independent educational platform not affiliated with Garmin, TomTom, or any GPS manufacturer.</p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
              <h3 className="font-black text-white mb-5 text-base uppercase tracking-widest">How It Works</h3>
              <div className="space-y-4">
                {[{ step: "1", text: "Answer 5 simple questions" }, { step: "2", text: "We score 6 GPS devices against your needs" }, { step: "3", text: "Get your top 3 personalized picks" }, { step: "4", text: "Receive a full report by email" }].map(item => (
                  <div key={item.step} className="flex items-center gap-4">
                    <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">{item.step}</div>
                    <span className="text-base text-zinc-300 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
              <h3 className="font-black text-white mb-5 flex items-center gap-2 text-base"><Star size={16} className="text-amber-400" />GPS Buying Tips</h3>
              <div className="space-y-4">
                {["Bigger screen = easier to read while driving", "Lifetime maps save money long-term", "Live traffic is worth it for city drivers", "Bluetooth lets you call hands-free", "Try the menu in-store before buying"].map((tip, i) => (
                  <div key={i} className="flex items-start gap-3 text-base text-zinc-400 font-medium">
                    <CheckCircle2 size={16} className="text-green-400 shrink-0 mt-0.5" />{tip}
                  </div>
                ))}
              </div>
            </div>
            <Link href="/tools/road-trip-checker">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-[2rem] p-7 cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="text-4xl mb-4">🚗</div>
                <h3 className="font-black text-white mb-2 text-lg">Planning a road trip?</h3>
                <p className="text-green-200 text-base font-medium mb-4">Check if your GPS is ready with our free 5-step pre-trip checklist.</p>
                <div className="flex items-center gap-2 text-white font-black text-base">GPS Road Trip Check <ArrowRight size={18} /></div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO */}
      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Choosing the Best GPS for Seniors & Adults 45+</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base">
            <p>The most important thing when choosing a GPS as an adult over 45 is screen size and menu simplicity. A larger screen — 5.5 inches or more — is dramatically easier to read at a glance while driving without straining your eyes or losing focus on the road.</p>
            <p>All recommendations are for educational purposes only. Setwise Digital is an independent technology education platform. We are not affiliated with Garmin, TomTom, or any GPS manufacturer. Always compare current prices at your preferred retailer before purchasing.</p>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
