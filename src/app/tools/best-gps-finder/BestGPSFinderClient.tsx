"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import {
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  Star,
  Mail,
  Phone,
  User,
  Loader2,
  Navigation,
  Shield,
  Zap,
  RefreshCw,
  ExternalLink,
  Award,
} from "lucide-react";

// ─── GPS Database ─────────────────────────────────────────────────────────────
interface GPSDevice {
  id: string;
  name: string;
  brand: string;
  priceRange: string;
  priceMin: number;
  screen: string;
  bestFor: string[];
  features: string[];
  pros: string[];
  cons: string[];
  techLevel: "beginner" | "intermediate" | "advanced";
  drivingType: string[];
  badge: string;
  badgeColor: string;
  score?: number;
  emoji: string;
}

const GPS_DATABASE: GPSDevice[] = [
  {
    id: "garmin-drive-52",
    name: "Garmin Drive 52",
    brand: "Garmin",
    priceRange: "$89–$109",
    priceMin: 89,
    screen: "5-inch",
    bestFor: ["Beginners", "City driving", "Budget-conscious"],
    features: ["Turn-by-turn voice directions", "Speed limit alerts", "Driver alerts", "Easy menu navigation"],
    pros: ["Very affordable", "Large simple menu", "Bright screen", "Reliable Garmin quality"],
    cons: ["No live traffic", "No Bluetooth", "Basic features only"],
    techLevel: "beginner",
    drivingType: ["city", "suburban", "highway"],
    badge: "Best for Beginners",
    badgeColor: "bg-green-500",
    emoji: "🟢",
  },
  {
    id: "garmin-drivesmart-55",
    name: "Garmin DriveSmart 55",
    brand: "Garmin",
    priceRange: "$149–$179",
    priceMin: 149,
    screen: "5.5-inch",
    bestFor: ["Most drivers", "Highway travel", "Live traffic users"],
    features: ["Live traffic & weather", "Bluetooth calls", "Smart notifications", "Voice control", "Wi-Fi map updates"],
    pros: ["Best all-around choice", "Live traffic avoidance", "Hands-free calling", "Easy Wi-Fi updates"],
    cons: ["Slightly pricier", "Requires smartphone for live features"],
    techLevel: "beginner",
    drivingType: ["city", "suburban", "highway", "rural"],
    badge: "Most Popular",
    badgeColor: "bg-blue-500",
    emoji: "⭐",
  },
  {
    id: "garmin-drivesmart-65",
    name: "Garmin DriveSmart 65",
    brand: "Garmin",
    priceRange: "$179–$219",
    priceMin: 179,
    screen: "6.95-inch",
    bestFor: ["Large screen lovers", "Seniors 65+", "Highway drivers"],
    features: ["Extra-large 7\" screen", "Live traffic", "Bluetooth", "Voice activation", "Large text & buttons"],
    pros: ["Biggest clearest screen", "Easy to read at a glance", "Voice control hands-free", "Perfect for aging eyes"],
    cons: ["Larger size", "Higher price", "Needs phone for live traffic"],
    techLevel: "beginner",
    drivingType: ["city", "suburban", "highway"],
    badge: "Best Large Screen",
    badgeColor: "bg-purple-500",
    emoji: "👁️",
  },
  {
    id: "tomtom-go-520",
    name: "TomTom GO 520",
    brand: "TomTom",
    priceRange: "$129–$159",
    priceMin: 129,
    screen: "5-inch",
    bestFor: ["Independent travelers", "No-phone users", "Offline navigation"],
    features: ["Built-in Wi-Fi updates", "World maps included", "Offline navigation", "Speed camera alerts"],
    pros: ["Works without smartphone", "World maps included", "Easy Wi-Fi updates", "Great for international travel"],
    cons: ["Older interface", "Fewer live features"],
    techLevel: "beginner",
    drivingType: ["city", "highway", "rural", "international"],
    badge: "Best Offline",
    badgeColor: "bg-red-500",
    emoji: "🔴",
  },
  {
    id: "garmin-dezl-otr610",
    name: "Garmin dēzl OTR610",
    brand: "Garmin",
    priceRange: "$249–$299",
    priceMin: 249,
    screen: "6-inch",
    bestFor: ["RV drivers", "Towing a trailer", "Rural routes"],
    features: ["RV & trailer routing", "Custom vehicle profiles", "Campground finder", "Wi-Fi updates", "Live traffic"],
    pros: ["Avoids low bridges & weight limits", "Perfect for RV travel", "Campground database", "Rugged build"],
    cons: ["Expensive", "Overkill for city driving"],
    techLevel: "intermediate",
    drivingType: ["highway", "rural", "rv"],
    badge: "Best for RV",
    badgeColor: "bg-amber-500",
    emoji: "🚐",
  },
  {
    id: "garmin-drivesmart-55-traffic",
    name: "Garmin DriveSmart 55 + Traffic",
    brand: "Garmin",
    priceRange: "$169–$199",
    priceMin: 169,
    screen: "5.5-inch",
    bestFor: ["Commuters", "City drivers", "Traffic-heavy areas"],
    features: ["Real-time traffic", "Incident alerts", "Alternate routes", "Bluetooth", "Voice control"],
    pros: ["Saves time with traffic routing", "Real-time incident alerts", "Hands-free calling", "Great value"],
    cons: ["Needs smartphone for live data", "Monthly subscription for some features"],
    techLevel: "beginner",
    drivingType: ["city", "suburban", "highway"],
    badge: "Best for Traffic",
    badgeColor: "bg-cyan-500",
    emoji: "🚦",
  },
];

// ─── Quiz Questions ────────────────────────────────────────────────────────────
const QUESTIONS = [
  {
    id: "driving",
    title: "Where do you mostly drive?",
    subtitle: "Choose the one that fits your typical trips",
    options: [
      { value: "city", label: "City & suburbs", icon: "🏙️", desc: "Lots of traffic, frequent stops" },
      { value: "highway", label: "Highways & long trips", icon: "🛣️", desc: "Mostly straight routes, road trips" },
      { value: "rural", label: "Rural & back roads", icon: "🌲", desc: "Less-traveled routes, countryside" },
      { value: "rv", label: "RV or towing a trailer", icon: "🚐", desc: "Large vehicle, campsite routes" },
    ],
  },
  {
    id: "budget",
    title: "What's your budget?",
    subtitle: "All options are quality devices — pick what feels comfortable",
    options: [
      { value: "low", label: "Under $100", icon: "💵", desc: "Best value basics" },
      { value: "mid", label: "$100 – $180", icon: "💳", desc: "Most popular range" },
      { value: "high", label: "$180 – $300", icon: "💎", desc: "Premium features" },
      { value: "any", label: "Best is fine", icon: "⭐", desc: "Just recommend the best" },
    ],
  },
  {
    id: "screen",
    title: "How important is screen size?",
    subtitle: "Bigger screens are easier to read while driving",
    options: [
      { value: "standard", label: "Standard size is fine", icon: "📱", desc: "5-inch screen" },
      { value: "large", label: "I want a big screen", icon: "📺", desc: "6-7 inch — easier to read" },
      { value: "any", label: "No preference", icon: "🤷", desc: "Just whatever works best" },
    ],
  },
  {
    id: "tech",
    title: "How comfortable are you with technology?",
    subtitle: "This helps us match the right complexity level",
    options: [
      { value: "beginner", label: "I keep it simple", icon: "😊", desc: "Easy menus, big buttons" },
      { value: "intermediate", label: "I manage okay", icon: "👍", desc: "Can follow instructions" },
      { value: "advanced", label: "I love features", icon: "🚀", desc: "More options the better" },
    ],
  },
  {
    id: "priority",
    title: "What matters most to you?",
    subtitle: "Your top priority shapes our recommendation",
    options: [
      { value: "traffic", label: "Avoiding traffic jams", icon: "🚦", desc: "Live traffic alerts & rerouting" },
      { value: "offline", label: "Works without my phone", icon: "📵", desc: "No data needed, fully independent" },
      { value: "voice", label: "Hands-free calling", icon: "📞", desc: "Bluetooth calls while driving" },
      { value: "simple", label: "Just easy to use", icon: "✨", desc: "Simple, reliable, no fuss" },
    ],
  },
];

// ─── Scoring logic ────────────────────────────────────────────────────────────
function scoreGPS(
  device: GPSDevice,
  answers: Record<string, string>
): number {
  let score = 0;

  // Driving type match
  if (device.drivingType.includes(answers.driving)) score += 30;

  // Budget match
  const budget = answers.budget;
  if (budget === "low" && device.priceMin <= 100) score += 25;
  else if (budget === "mid" && device.priceMin >= 100 && device.priceMin <= 180) score += 25;
  else if (budget === "high" && device.priceMin >= 180) score += 25;
  else if (budget === "any") score += 20;
  else if (Math.abs(device.priceMin - (budget === "low" ? 90 : budget === "mid" ? 150 : 200)) < 50) score += 10;

  // Tech level match
  if (answers.tech === "beginner" && device.techLevel === "beginner") score += 20;
  else if (answers.tech === "intermediate") score += 15;
  else if (answers.tech === "advanced" && device.techLevel !== "beginner") score += 20;

  // Priority match
  const priority = answers.priority;
  if (priority === "traffic" && device.features.some(f => f.toLowerCase().includes("traffic"))) score += 20;
  if (priority === "offline" && device.features.some(f => f.toLowerCase().includes("offline") || f.toLowerCase().includes("wi-fi"))) score += 20;
  if (priority === "voice" && device.features.some(f => f.toLowerCase().includes("bluetooth") || f.toLowerCase().includes("voice"))) score += 20;
  if (priority === "simple" && device.techLevel === "beginner") score += 20;

  // Screen size
  if (answers.screen === "large" && device.screen.includes("6") || device.screen.includes("7")) score += 5;
  if (answers.screen === "standard" && device.screen.includes("5")) score += 5;
  if (answers.screen === "any") score += 3;

  return Math.min(score, 100);
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function BestGPSFinderClient() {
  const [stage, setStage] = useState<"intro" | "quiz" | "lead" | "results">("intro");
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  // Compute recommendations
  const recommendations = GPS_DATABASE
    .map((d) => ({ ...d, score: scoreGPS(d, answers) }))
    .sort((a, b) => (b.score ?? 0) - (a.score ?? 0))
    .slice(0, 3);

  const topPick = recommendations[0];

  const answerQuestion = (value: string) => {
    setSelectedOption(value);
    setTimeout(() => {
      const newAnswers = { ...answers, [QUESTIONS[currentQ].id]: value };
      setAnswers(newAnswers);
      setSelectedOption(null);
      if (currentQ < QUESTIONS.length - 1) {
        setCurrentQ((p) => p + 1);
      } else {
        setStage("lead");
      }
    }, 300);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone,
          brand: topPick?.brand,
          issue: `GPS Finder — Top Pick: ${topPick?.name} — Driving: ${answers.driving} — Budget: ${answers.budget}`,
          source: "best-gps-finder",
          extra: JSON.stringify(answers),
        }),
      });
    } catch {}
    setSubmitted(true);
    setSubmitting(false);
    setStage("results");
  };

  const reset = () => {
    setStage("intro");
    setCurrentQ(0);
    setAnswers({});
    setSelectedOption(null);
    setName(""); setEmail(""); setPhone("");
    setSubmitted(false);
  };

  const progress = ((currentQ) / QUESTIONS.length) * 100;

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar />

      {/* Hero */}
      <section ref={heroRef} className="relative pt-32 pb-16 overflow-hidden">
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-blue-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <nav className="flex items-center gap-2 text-sm text-zinc-400 font-medium mb-6">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <ChevronRight size={14} />
              <Link href="/tools" className="hover:text-blue-600 transition-colors">Free Tools</Link>
              <ChevronRight size={14} />
              <span className="text-zinc-600">Best GPS Finder</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center shadow-lg shadow-blue-500/30 text-2xl">
                🧭
              </div>
              <div>
                <div className="text-xs font-black text-blue-600 uppercase tracking-widest">Free Tool · 4 Minutes</div>
                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
                  Best GPS Finder for You
                </h1>
              </div>
            </div>

            <p className="text-lg text-zinc-500 font-medium leading-relaxed max-w-2xl mb-8">
              Not sure which GPS to buy? Answer 5 simple questions about your driving habits,
              budget, and preferences. We&apos;ll recommend the best GPS device for your lifestyle
              — in plain English, no jargon.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Tool */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">

              {/* INTRO */}
              {stage === "intro" && (
                <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl border-2 border-zinc-100 overflow-hidden shadow-sm">
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
                  <div className="p-8">
                    <h2 className="text-2xl font-black text-zinc-900 mb-3">Find Your Perfect GPS Match 🎯</h2>
                    <p className="text-zinc-500 font-medium mb-8 leading-relaxed">
                      We&apos;ll ask you 5 quick questions about how you drive, your budget, and what matters
                      most. Then we&apos;ll match you to the best GPS from our curated database — no
                      complicated specs, just a clear recommendation.
                    </p>

                    <div className="space-y-3 mb-8">
                      {QUESTIONS.map((q, i) => (
                        <div key={q.id} className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl">
                          <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <div className="font-black text-zinc-800 text-sm">{q.title}</div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-100 rounded-2xl mb-6">
                      <div className="flex items-start gap-2">
                        <Shield size={14} className="text-blue-500 mt-0.5 shrink-0" />
                        <p className="text-xs text-blue-700 font-medium">
                          Educational tool only. We recommend based on publicly available device specs.
                          Not affiliated with Garmin, TomTom, or any manufacturer.
                        </p>
                      </div>
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={() => setStage("quiz")}
                      className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-blue-500/25">
                      Find My Perfect GPS
                      <ArrowRight size={22} />
                    </motion.button>
                    <p className="text-center text-xs text-zinc-400 font-medium mt-3">🔒 No sign-up required to start</p>
                  </div>
                </motion.div>
              )}

              {/* QUIZ */}
              {stage === "quiz" && (
                <motion.div key={`q-${currentQ}`}
                  initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  className="bg-white rounded-3xl border-2 border-zinc-100 overflow-hidden shadow-sm">
                  {/* Progress */}
                  <div className="h-2 bg-zinc-100 relative">
                    <motion.div className="h-full bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"
                      animate={{ width: `${progress}%` }} transition={{ duration: 0.4 }} />
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <button onClick={() => { if (currentQ === 0) setStage("intro"); else setCurrentQ(p => p - 1); }}
                        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 text-sm font-bold transition-colors">
                        <ArrowLeft size={16} /> Back
                      </button>
                      <span className="text-sm font-black text-zinc-400">
                        Question {currentQ + 1} of {QUESTIONS.length}
                      </span>
                    </div>

                    {(() => {
                      const q = QUESTIONS[currentQ];
                      return (
                        <div className="space-y-6">
                          <div>
                            <div className="flex items-center gap-2 mb-2">
                              <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-lg flex items-center justify-center text-white font-black text-sm">
                                {currentQ + 1}
                              </div>
                              <span className="text-xs font-black text-blue-600 uppercase tracking-widest">
                                Question {currentQ + 1}
                              </span>
                            </div>
                            <h3 className="text-2xl font-black text-zinc-900 mb-1">{q.title}</h3>
                            <p className="text-zinc-400 font-medium text-sm">{q.subtitle}</p>
                          </div>

                          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                            {q.options.map((opt) => (
                              <motion.button key={opt.value}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => answerQuestion(opt.value)}
                                className={`p-5 rounded-2xl border-2 text-left transition-all ${
                                  selectedOption === opt.value
                                    ? "border-blue-500 bg-blue-500/5 shadow-lg shadow-blue-500/10"
                                    : answers[q.id] === opt.value
                                    ? "border-blue-400 bg-blue-50"
                                    : "border-zinc-200 bg-zinc-50 hover:border-blue-300 hover:bg-blue-50/50"
                                }`}>
                                <div className="text-2xl mb-2">{opt.icon}</div>
                                <div className="font-black text-zinc-800 text-sm mb-1">{opt.label}</div>
                                <div className="text-zinc-400 text-xs font-medium">{opt.desc}</div>
                                {(selectedOption === opt.value || answers[q.id] === opt.value) && (
                                  <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                                    className="mt-2">
                                    <CheckCircle2 size={16} className="text-blue-500" />
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
                  className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl">
                  <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <motion.div animate={{ rotate: [0, 10, -10, 0] }} transition={{ duration: 0.5, delay: 0.2 }}
                        className="text-5xl mb-4">🎯</motion.div>
                      <h2 className="text-2xl font-black text-white mb-2">We found your perfect GPS match!</h2>
                      <p className="text-zinc-400 font-medium">
                        Enter your email to receive your personalized recommendation report — includes
                        device details, where to buy, and setup tips specific to your choice.
                      </p>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-3">
                      {[
                        "🏆 Your #1 GPS recommendation with full details",
                        "💰 Price comparison across major retailers",
                        "📖 Plain-English setup guide for your device",
                        "💡 Monthly tips for drivers 45+ from Setwise Digital",
                      ].map((item) => (
                        <div key={item} className="flex items-center gap-3 text-sm">
                          <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                          <span className="text-zinc-300 font-medium">{item}</span>
                        </div>
                      ))}
                    </div>

                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label>
                        <div className="relative">
                          <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mary"
                            className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600 text-base" />
                        </div>
                        {errors.name && <p className="text-red-400 text-xs mt-1 font-bold">{errors.name}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label>
                        <div className="relative">
                          <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com"
                            className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600 text-base" />
                          {email.includes("@") && (
                            <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                              <CheckCircle2 size={16} className="text-green-500" />
                            </motion.div>
                          )}
                        </div>
                        {errors.email && <p className="text-red-400 text-xs mt-1 font-bold">{errors.email}</p>}
                      </div>
                      <div>
                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2">
                          Phone <span className="text-zinc-600 normal-case font-medium">(optional — for SMS tips)</span>
                        </label>
                        <div className="relative">
                          <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                          <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000"
                            className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600 text-base" />
                        </div>
                      </div>
                    </div>

                    <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                      onClick={handleSubmit} disabled={submitting}
                      className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/30 mb-3">
                      {submitting ? <Loader2 size={22} className="animate-spin" /> : <><Award size={20} />Show My GPS Match</>}
                    </motion.button>
                    <button onClick={() => setStage("results")}
                      className="w-full text-center text-sm text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">
                      Skip — just show me the results
                    </button>
                    <p className="text-center text-xs text-zinc-600 mt-3">
                      🔒 No spam. Unsubscribe anytime. We never sell your info.<br />
                      By submitting you agree to receive educational tips from Setwise Digital.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* RESULTS */}
              {stage === "results" && (
                <motion.div key="results" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-6">

                  {submitted && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl p-4 flex items-center gap-3">
                      <CheckCircle2 size={18} className="text-green-600 shrink-0" />
                      <p className="text-sm font-bold text-green-700">
                        Report sent to {email} — check your inbox!
                      </p>
                    </div>
                  )}

                  {/* Top Pick */}
                  {topPick && (
                    <div className="bg-white rounded-3xl border-2 border-blue-200 overflow-hidden shadow-lg shadow-blue-500/10">
                      <div className="h-2 bg-gradient-to-r from-blue-600 to-indigo-600" />
                      <div className="p-8">
                        <div className="flex items-center gap-2 mb-5">
                          <div className="w-8 h-8 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center">
                            <Star size={16} className="text-white fill-white" />
                          </div>
                          <span className="font-black text-amber-600 text-sm uppercase tracking-widest">
                            Your #1 Recommended GPS
                          </span>
                          {name && <span className="text-zinc-400 text-sm font-medium">for {name}</span>}
                        </div>

                        <div className="flex items-start justify-between gap-4 mb-6">
                          <div>
                            <h3 className="text-2xl font-black text-zinc-900 mb-1">{topPick.name}</h3>
                            <div className="flex items-center gap-2">
                              <span className={`${topPick.badgeColor} text-white text-xs font-black px-3 py-1 rounded-full`}>
                                {topPick.badge}
                              </span>
                              <span className="text-zinc-500 font-bold text-sm">{topPick.priceRange}</span>
                            </div>
                          </div>
                          <div className="text-5xl">{topPick.emoji}</div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div className="bg-zinc-50 rounded-2xl p-4">
                            <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Screen Size</div>
                            <div className="font-black text-zinc-800">{topPick.screen}</div>
                          </div>
                          <div className="bg-zinc-50 rounded-2xl p-4">
                            <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Best For</div>
                            <div className="font-black text-zinc-800 text-sm">{topPick.bestFor[0]}</div>
                          </div>
                        </div>

                        <div className="mb-6">
                          <div className="text-sm font-black text-zinc-700 mb-3">Key Features:</div>
                          <div className="space-y-2">
                            {topPick.features.map(f => (
                              <div key={f} className="flex items-center gap-2 text-sm text-zinc-600 font-medium">
                                <CheckCircle2 size={14} className="text-blue-500 shrink-0" />
                                {f}
                              </div>
                            ))}
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 mb-6">
                          <div>
                            <div className="text-xs font-black text-green-600 uppercase tracking-widest mb-2">✓ Pros</div>
                            {topPick.pros.map(p => (
                              <div key={p} className="text-xs text-zinc-500 font-medium mb-1">• {p}</div>
                            ))}
                          </div>
                          <div>
                            <div className="text-xs font-black text-red-500 uppercase tracking-widest mb-2">✗ Consider</div>
                            {topPick.cons.map(c => (
                              <div key={c} className="text-xs text-zinc-500 font-medium mb-1">• {c}</div>
                            ))}
                          </div>
                        </div>

                        <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-100 rounded-2xl">
                          <Zap size={16} className="text-blue-500 shrink-0" />
                          <p className="text-sm text-blue-700 font-medium">
                            This recommendation is based on your answers about{" "}
                            <strong>{answers.driving} driving</strong>,{" "}
                            <strong>{answers.budget} budget</strong>, and priority of{" "}
                            <strong>{answers.priority}</strong>.
                          </p>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Runner-ups */}
                  <div className="bg-white rounded-3xl border-2 border-zinc-100 p-6">
                    <h3 className="font-black text-zinc-900 mb-4 flex items-center gap-2">
                      <Navigation size={18} className="text-blue-500" />
                      Also Consider
                    </h3>
                    <div className="space-y-4">
                      {recommendations.slice(1).map((device, i) => (
                        <motion.div key={device.id}
                          initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center gap-4 p-4 bg-zinc-50 rounded-2xl">
                          <div className="text-2xl">{device.emoji}</div>
                          <div className="flex-1">
                            <div className="font-black text-zinc-800 text-sm">{device.name}</div>
                            <div className="text-zinc-400 text-xs font-medium">{device.priceRange} · {device.screen}</div>
                          </div>
                          <span className={`${device.badgeColor} text-white text-xs font-black px-2 py-1 rounded-full`}>
                            {device.badge}
                          </span>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button onClick={reset}
                      className="flex items-center justify-center gap-2 py-4 border-2 border-zinc-200 rounded-2xl font-black text-zinc-600 hover:border-zinc-400 transition-colors">
                      <RefreshCw size={18} /> Try Again
                    </button>
                    <Link href="/tools/road-trip-checker">
                      <motion.div whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-green-600 to-emerald-400 text-white font-black rounded-2xl shadow-lg shadow-green-500/20 cursor-pointer">
                        <Navigation size={18} /> Road Trip Checklist
                      </motion.div>
                    </Link>
                  </div>

                  {/* Disclaimer */}
                  <div className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4">
                    <div className="flex items-start gap-2">
                      <Shield size={14} className="text-zinc-400 mt-0.5 shrink-0" />
                      <p className="text-xs text-zinc-400 font-medium leading-relaxed">
                        <strong>Educational guidance only.</strong> Prices and features are approximate and
                        subject to change. Always verify current pricing at your preferred retailer. Setwise
                        Digital is an independent educational platform not affiliated with Garmin, TomTom,
                        or any GPS manufacturer. Brand names referenced for educational identification only.
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            <div className="bg-white rounded-3xl border-2 border-zinc-100 p-6">
              <h3 className="font-black text-zinc-900 mb-3 text-sm uppercase tracking-widest">How It Works</h3>
              <div className="space-y-4">
                {[
                  { step: "1", text: "Answer 5 simple questions" },
                  { step: "2", text: "We score 6 GPS devices against your needs" },
                  { step: "3", text: "Get your top 3 personalized picks" },
                  { step: "4", text: "Receive a full report by email" },
                ].map(item => (
                  <div key={item.step} className="flex items-center gap-3">
                    <div className="w-7 h-7 bg-gradient-to-br from-blue-500 to-indigo-500 rounded-full flex items-center justify-center text-white font-black text-xs shrink-0">
                      {item.step}
                    </div>
                    <span className="text-sm text-zinc-600 font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-6">
              <h3 className="font-black text-white mb-4 flex items-center gap-2">
                <Star size={16} className="text-amber-400" /> GPS Buying Tips
              </h3>
              <div className="space-y-3">
                {[
                  "Bigger screen = easier to read while driving",
                  "Lifetime maps save money long-term",
                  "Live traffic is worth it for city drivers",
                  "Bluetooth lets you call hands-free",
                  "Try the menu in-store before buying",
                ].map((tip, i) => (
                  <div key={i} className="flex items-start gap-2 text-sm text-zinc-400 font-medium">
                    <CheckCircle2 size={14} className="text-green-400 shrink-0 mt-0.5" />
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            <Link href="/tools/road-trip-checker">
              <div className="bg-gradient-to-br from-green-600 to-emerald-600 rounded-3xl p-6 cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="text-3xl mb-3">🚗</div>
                <h3 className="font-black text-white mb-2">Planning a road trip?</h3>
                <p className="text-green-200 text-sm font-medium mb-3">Check if your GPS is ready with our free 5-step pre-trip checklist.</p>
                <div className="flex items-center gap-2 text-white font-black text-sm">
                  GPS Road Trip Check <ArrowRight size={16} />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* SEO content */}
      <section className="bg-zinc-50 py-20 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-zinc-900 mb-6 tracking-tight">
            Choosing the Best GPS for Seniors & Adults 45+
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-600 font-medium leading-relaxed text-sm">
            <div>
              <p className="mb-4">
                The most important thing when choosing a GPS as an adult over 45 is screen size and
                menu simplicity. A larger screen — 5.5 inches or more — is dramatically easier to
                read at a glance while driving without straining your eyes or losing focus on the road.
              </p>
              <p>
                Garmin is consistently the most trusted GPS brand among older adults. Their menus
                are logical and easy to navigate, their voice directions are clear, and their update
                software (Garmin Express) is straightforward to use on a computer.
              </p>
            </div>
            <div>
              <p className="mb-4">
                For most drivers in this age group, the Garmin DriveSmart 55 or 65 offers the best
                combination of ease of use, screen clarity, and features like live traffic and
                Bluetooth calling — without being overly complicated.
              </p>
              <p>
                All recommendations on this page are for educational purposes only. Setwise Digital
                is an independent technology education platform. We are not affiliated with Garmin,
                TomTom, or any GPS manufacturer. Always compare current prices at your preferred retailer.
              </p>
            </div>
          </div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
