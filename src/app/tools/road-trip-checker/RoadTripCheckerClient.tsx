"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import {
  CheckCircle2,
  XCircle,
  AlertCircle,
  ArrowRight,
  ArrowLeft,
  ChevronRight,
  MapPin,
  Battery,
  Wifi,
  Navigation,
  Volume2,
  Star,
  Mail,
  Phone,
  User,
  Download,
  Loader2,
  RefreshCw,
  Zap,
  Shield,
} from "lucide-react";

// ─── Types ───────────────────────────────────────────────────────────────────
type CheckStatus = "yes" | "no" | "unsure" | null;

interface CheckItem {
  id: string;
  category: string;
  icon: React.ReactNode;
  question: string;
  yesLabel: string;
  noLabel: string;
  unsureLabel: string;
  tip: string;
  learnMore: string;
  status: CheckStatus;
}

// ─── Checklist data ───────────────────────────────────────────────────────────
const INITIAL_CHECKS: Omit<CheckItem, "status">[] = [
  {
    id: "maps",
    category: "Maps & Software",
    icon: <MapPin size={22} />,
    question: "Are your GPS maps updated within the last 6 months?",
    yesLabel: "Yes, recently updated",
    noLabel: "No / Not sure when",
    unsureLabel: "I don't know how to check",
    tip: "Outdated maps are the #1 cause of wrong directions. Roads change constantly — new exits, closed roads, speed limit updates.",
    learnMore:
      "Open Garmin Express (for Garmin) or MyDrive Connect (for TomTom) on your computer, connect via USB, and it checks automatically.",
  },
  {
    id: "battery",
    category: "Power & Charging",
    icon: <Battery size={22} />,
    question: "Is your GPS charger packed and working?",
    yesLabel: "Yes, charger is ready",
    noLabel: "Can't find my charger",
    unsureLabel: "Not sure if it works",
    tip: "GPS devices lose battery fast in hot cars. Always pack your car charger — even if the battery shows full right now.",
    learnMore:
      "Most Garmin and TomTom devices use a standard micro-USB or USB-C cable. Check your device's port and bring the matching cable.",
  },
  {
    id: "mount",
    category: "Device Setup",
    icon: <Navigation size={22} />,
    question: "Is your GPS mount secure and windshield clean?",
    yesLabel: "Mount is solid and clean",
    noLabel: "Mount feels loose or worn",
    unsureLabel: "Haven't checked yet",
    tip: "A loose mount is a safety hazard. Clean the suction cup with warm water and let it dry — it will grip much better.",
    learnMore:
      "Lick the suction cup slightly or wipe with a damp cloth before pressing firmly to a clean, oil-free area of windshield. Hold for 10 seconds.",
  },
  {
    id: "destination",
    category: "Route Planning",
    icon: <Wifi size={22} />,
    question:
      "Have you saved your destination and key stops as Favorites?",
    yesLabel: "Destinations saved",
    noLabel: "Haven't saved them yet",
    unsureLabel: "I don't know how to save favorites",
    tip: "Saving favorites means you can find your hotel, gas stations, and rest stops instantly — even if your phone has no signal.",
    learnMore:
      "On Garmin: tap the star icon after searching a location. On TomTom: tap 'Add to My Places' after selecting a destination.",
  },
  {
    id: "volume",
    category: "Audio & Alerts",
    icon: <Volume2 size={22} />,
    question:
      "Can you clearly hear voice directions while driving?",
    yesLabel: "Volume is clear and loud",
    noLabel: "It's too quiet or muffled",
    unsureLabel: "Haven't tested it while driving",
    tip: "Highway noise and AC can drown out GPS directions. Test volume while parked with your AC running before the trip.",
    learnMore:
      "Go to Settings → Sound & Warnings on most GPS devices. Set voice volume to maximum and test a short drive before the big trip.",
  },
];

// ─── GPS brand data ────────────────────────────────────────────────────────────
const GPS_BRANDS = [
  { label: "Garmin", icon: "🟠", updateTool: "Garmin Express" },
  { label: "TomTom", icon: "🔴", updateTool: "MyDrive Connect" },
  { label: "Magellan", icon: "🔵", updateTool: "Magellan Content Manager" },
  { label: "In-car GPS", icon: "🚗", updateTool: "your car's manufacturer app" },
  { label: "Google Maps", icon: "📱", updateTool: "Google Maps app (automatic)" },
  { label: "Apple Maps", icon: "🍎", updateTool: "iOS updates (automatic)" },
  { label: "Waze", icon: "👻", updateTool: "Waze app (automatic)" },
  { label: "Other", icon: "❓", updateTool: "your device's companion app" },
];

// ─── Score helpers ─────────────────────────────────────────────────────────────
function getScore(checks: CheckItem[]) {
  let yes = 0;
  checks.forEach((c) => { if (c.status === "yes") yes++; });
  return Math.round((yes / checks.length) * 100);
}

function getVerdict(score: number) {
  if (score === 100)
    return { label: "🟢 Fully Ready!", color: "text-green-600", bg: "bg-green-50 border-green-200", bar: "from-green-500 to-emerald-400" };
  if (score >= 80)
    return { label: "🟡 Almost Ready", color: "text-amber-600", bg: "bg-amber-50 border-amber-200", bar: "from-amber-500 to-yellow-400" };
  if (score >= 60)
    return { label: "🟠 Needs Attention", color: "text-orange-600", bg: "bg-orange-50 border-orange-200", bar: "from-orange-500 to-amber-400" };
  return { label: "🔴 Not Ready Yet", color: "text-red-600", bg: "bg-red-50 border-red-200", bar: "from-red-500 to-rose-400" };
}

// ─── Sub-components ────────────────────────────────────────────────────────────
function StatusButton({
  active,
  onClick,
  icon,
  label,
  color,
}: {
  active: boolean;
  onClick: () => void;
  icon: React.ReactNode;
  label: string;
  color: string;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.96 }}
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-3 rounded-xl border-2 font-bold text-sm transition-all w-full ${
        active
          ? `${color} shadow-md`
          : "border-zinc-200 bg-white text-zinc-600 hover:border-zinc-300"
      }`}
    >
      {icon}
      <span>{label}</span>
      {active && (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="ml-auto"
        >
          <CheckCircle2 size={16} />
        </motion.div>
      )}
    </motion.button>
  );
}

// ─── Main component ────────────────────────────────────────────────────────────
export default function RoadTripCheckerClient() {
  const [stage, setStage] = useState<
    "intro" | "brand" | "checklist" | "lead" | "results"
  >("intro");
  const [gpsBrand, setGpsBrand] = useState("");
  const [checks, setChecks] = useState<CheckItem[]>(
    INITIAL_CHECKS.map((c) => ({ ...c, status: null }))
  );
  const [currentCheck, setCurrentCheck] = useState(0);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [skipLead, setSkipLead] = useState(false);

  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const score = getScore(checks);
  const verdict = getVerdict(score);
  const brandObj = GPS_BRANDS.find((b) => b.label === gpsBrand);

  const setStatus = (id: string, status: CheckStatus) => {
    setChecks((prev) =>
      prev.map((c) => (c.id === id ? { ...c, status } : c))
    );
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@"))
      e.email = "Please enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleLeadSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          brand: gpsBrand,
          issue: `Road Trip Check — Score: ${score}% — ${verdict.label}`,
          source: "road-trip-checker",
          extra: checks
            .map((c) => `${c.question}: ${c.status}`)
            .join(" | "),
        }),
      });
    } catch {}
    setSubmitted(true);
    setSubmitting(false);
    setStage("results");
  };

  const handleSkip = () => {
    setSkipLead(true);
    setStage("results");
  };

  const reset = () => {
    setStage("intro");
    setGpsBrand("");
    setChecks(INITIAL_CHECKS.map((c) => ({ ...c, status: null })));
    setCurrentCheck(0);
    setName("");
    setEmail("");
    setPhone("");
    setSubmitted(false);
    setSkipLead(false);
  };

  const issues = checks.filter((c) => c.status !== "yes");
  const progress = ((currentCheck + 1) / checks.length) * 100;

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar />

      {/* ── Hero ──────────────────────────────────────────────────────────────── */}
      <section
        ref={heroRef}
        className="relative pt-32 pb-16 overflow-hidden"
      >
        <div className="absolute inset-0 mesh-gradient opacity-50" />
        <div className="absolute top-20 right-10 w-80 h-80 bg-green-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-10 w-60 h-60 bg-emerald-400/10 rounded-full blur-3xl" />

        <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-sm text-zinc-400 font-medium mb-6">
              <Link href="/" className="hover:text-blue-600 transition-colors">
                Home
              </Link>
              <ChevronRight size={14} />
              <Link
                href="/tools"
                className="hover:text-blue-600 transition-colors"
              >
                Free Tools
              </Link>
              <ChevronRight size={14} />
              <span className="text-zinc-600">Road Trip GPS Check</span>
            </nav>

            <div className="flex items-center gap-3 mb-6">
              <div className="w-14 h-14 bg-gradient-to-br from-green-600 to-emerald-400 rounded-2xl flex items-center justify-center shadow-lg shadow-green-500/30">
                <span className="text-2xl">🚗</span>
              </div>
              <div>
                <div className="text-xs font-black text-green-600 uppercase tracking-widest">
                  Free Tool · 3 Minutes
                </div>
                <h1 className="text-3xl md:text-4xl font-black text-zinc-900 tracking-tight">
                  Road Trip GPS Pre-Check
                </h1>
              </div>
            </div>

            <p className="text-lg text-zinc-500 font-medium leading-relaxed max-w-2xl mb-8">
              Before you hit the road, make sure your GPS is truly ready. This
              free 5-step checklist covers map updates, battery, mounting, route
              planning, and audio — in plain English.
            </p>

            {/* Trust signals */}
            <div className="flex flex-wrap gap-4">
              {[
                { icon: "✅", text: "100% Free" },
                { icon: "📋", text: "5-Step Checklist" },
                { icon: "🔒", text: "No spam, ever" },
                { icon: "👴", text: "Plain English" },
              ].map((item) => (
                <div
                  key={item.text}
                  className="flex items-center gap-2 text-sm font-semibold text-zinc-500"
                >
                  <span>{item.icon}</span>
                  {item.text}
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Tool Area ────────────────────────────────────────────────────────── */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Tool */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {/* ── INTRO ────────────────────────────────────────────────────── */}
              {stage === "intro" && (
                <motion.div
                  key="intro"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white rounded-3xl border-2 border-zinc-100 overflow-hidden shadow-sm"
                >
                  <div className="h-2 bg-gradient-to-r from-green-600 to-emerald-400" />
                  <div className="p-8">
                    <h2 className="text-2xl font-black text-zinc-900 mb-3">
                      Is Your GPS Ready for the Road? 🗺️
                    </h2>
                    <p className="text-zinc-500 font-medium mb-8 leading-relaxed">
                      We&apos;ll walk you through 5 quick checks — maps, power,
                      mounting, route, and audio. Takes about 3 minutes. Get a
                      personalized report at the end.
                    </p>

                    <div className="space-y-3 mb-8">
                      {INITIAL_CHECKS.map((check, i) => (
                        <div
                          key={check.id}
                          className="flex items-center gap-3 p-4 bg-zinc-50 rounded-2xl"
                        >
                          <div className="w-8 h-8 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center text-white font-black text-sm shrink-0">
                            {i + 1}
                          </div>
                          <div>
                            <div className="font-black text-zinc-800 text-sm">
                              {check.category}
                            </div>
                            <div className="text-zinc-400 text-xs font-medium">
                              {check.question}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={() => setStage("brand")}
                      className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-400 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-shadow"
                    >
                      Start My Free GPS Check
                      <ArrowRight size={22} />
                    </motion.button>
                    <p className="text-center text-xs text-zinc-400 font-medium mt-3">
                      🔒 No sign-up required to start
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ── BRAND SELECTION ──────────────────────────────────────────── */}
              {stage === "brand" && (
                <motion.div
                  key="brand"
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  className="bg-white rounded-3xl border-2 border-zinc-100 overflow-hidden shadow-sm"
                >
                  <div className="h-2 bg-gradient-to-r from-green-600 to-emerald-400" />
                  <div className="p-8">
                    <button
                      onClick={() => setStage("intro")}
                      className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 text-sm font-bold mb-6 transition-colors"
                    >
                      <ArrowLeft size={16} /> Back
                    </button>

                    <h2 className="text-2xl font-black text-zinc-900 mb-2">
                      Which GPS do you use? 🧭
                    </h2>
                    <p className="text-zinc-400 font-medium mb-6 text-sm">
                      Your checklist will be personalized to your device
                    </p>

                    <div className="grid grid-cols-2 gap-3 mb-8">
                      {GPS_BRANDS.map((brand) => (
                        <motion.button
                          key={brand.label}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setGpsBrand(brand.label)}
                          className={`flex items-center gap-3 p-4 rounded-2xl border-2 font-bold text-sm transition-all text-left ${
                            gpsBrand === brand.label
                              ? "border-green-500 bg-green-50 text-green-800"
                              : "border-zinc-200 bg-zinc-50 text-zinc-700 hover:border-green-300"
                          }`}
                        >
                          <span className="text-xl">{brand.icon}</span>
                          {brand.label}
                          {gpsBrand === brand.label && (
                            <CheckCircle2
                              size={16}
                              className="ml-auto text-green-600"
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>

                    <AnimatePresence>
                      {gpsBrand && (
                        <motion.button
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          whileHover={{ scale: 1.02 }}
                          whileTap={{ scale: 0.98 }}
                          onClick={() => setStage("checklist")}
                          className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-400 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-lg shadow-green-500/25"
                        >
                          Start Checklist for {gpsBrand}
                          <ArrowRight size={22} />
                        </motion.button>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              )}

              {/* ── CHECKLIST ────────────────────────────────────────────────── */}
              {stage === "checklist" && (
                <motion.div
                  key={`check-${currentCheck}`}
                  initial={{ opacity: 0, x: 40 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -40 }}
                  transition={{ type: "spring", stiffness: 400, damping: 35 }}
                  className="bg-white rounded-3xl border-2 border-zinc-100 overflow-hidden shadow-sm"
                >
                  {/* Progress bar */}
                  <div className="h-2 bg-zinc-100 relative">
                    <motion.div
                      className="h-full bg-gradient-to-r from-green-600 to-emerald-400 rounded-full"
                      animate={{ width: `${progress}%` }}
                      transition={{ duration: 0.4 }}
                    />
                  </div>

                  <div className="p-8">
                    <div className="flex items-center justify-between mb-8">
                      <button
                        onClick={() => {
                          if (currentCheck === 0) setStage("brand");
                          else setCurrentCheck((p) => p - 1);
                        }}
                        className="flex items-center gap-2 text-zinc-400 hover:text-zinc-700 text-sm font-bold transition-colors"
                      >
                        <ArrowLeft size={16} /> Back
                      </button>
                      <span className="text-sm font-black text-zinc-400">
                        Step {currentCheck + 1} of {checks.length}
                      </span>
                    </div>

                    {(() => {
                      const check = checks[currentCheck];
                      return (
                        <div className="space-y-6">
                          {/* Category badge */}
                          <div className="flex items-center gap-2">
                            <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-400 rounded-xl flex items-center justify-center text-white">
                              {check.icon}
                            </div>
                            <span className="text-xs font-black text-green-600 uppercase tracking-widest">
                              {check.category}
                            </span>
                          </div>

                          <h3 className="text-xl md:text-2xl font-black text-zinc-900 leading-tight">
                            {check.question}
                          </h3>

                          {/* Tip box */}
                          <div className="bg-blue-50 border border-blue-100 rounded-2xl p-4">
                            <div className="flex items-start gap-2">
                              <Zap
                                size={14}
                                className="text-blue-500 mt-0.5 shrink-0"
                              />
                              <p className="text-sm text-blue-700 font-medium">
                                {check.tip}
                              </p>
                            </div>
                          </div>

                          {/* Answer buttons */}
                          <div className="space-y-3">
                            <StatusButton
                              active={check.status === "yes"}
                              onClick={() => setStatus(check.id, "yes")}
                              icon={
                                <CheckCircle2
                                  size={18}
                                  className="shrink-0 text-green-600"
                                />
                              }
                              label={check.yesLabel}
                              color="border-green-500 bg-green-50 text-green-800"
                            />
                            <StatusButton
                              active={check.status === "no"}
                              onClick={() => setStatus(check.id, "no")}
                              icon={
                                <XCircle
                                  size={18}
                                  className="shrink-0 text-red-500"
                                />
                              }
                              label={check.noLabel}
                              color="border-red-400 bg-red-50 text-red-800"
                            />
                            <StatusButton
                              active={check.status === "unsure"}
                              onClick={() => setStatus(check.id, "unsure")}
                              icon={
                                <AlertCircle
                                  size={18}
                                  className="shrink-0 text-amber-500"
                                />
                              }
                              label={check.unsureLabel}
                              color="border-amber-400 bg-amber-50 text-amber-800"
                            />
                          </div>

                          {/* Learn more */}
                          <AnimatePresence>
                            {check.status && check.status !== "yes" && (
                              <motion.div
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: "auto" }}
                                exit={{ opacity: 0, height: 0 }}
                                className="bg-zinc-50 border border-zinc-200 rounded-2xl p-4 overflow-hidden"
                              >
                                <p className="text-sm font-black text-zinc-700 mb-1">
                                  📖 How to fix this:
                                </p>
                                <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                                  {check.learnMore}
                                </p>
                              </motion.div>
                            )}
                          </AnimatePresence>

                          {/* Navigation */}
                          <AnimatePresence>
                            {check.status && (
                              <motion.div
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                              >
                                {currentCheck < checks.length - 1 ? (
                                  <button
                                    onClick={() =>
                                      setCurrentCheck((p) => p + 1)
                                    }
                                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-400 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/20"
                                  >
                                    Next Check
                                    <ChevronRight size={20} />
                                  </button>
                                ) : (
                                  <button
                                    onClick={() => setStage("lead")}
                                    className="w-full py-4 bg-gradient-to-r from-green-600 to-emerald-400 text-white font-black rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-green-500/20 text-lg"
                                  >
                                    See My Results
                                    <ArrowRight size={20} />
                                  </button>
                                )}
                              </motion.div>
                            )}
                          </AnimatePresence>
                        </div>
                      );
                    })()}
                  </div>
                </motion.div>
              )}

              {/* ── LEAD CAPTURE ─────────────────────────────────────────────── */}
              {stage === "lead" && (
                <motion.div
                  key="lead"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="bg-zinc-900 rounded-3xl overflow-hidden shadow-2xl"
                >
                  <div className="h-2 bg-gradient-to-r from-green-600 to-emerald-400" />
                  <div className="p-8">
                    <div className="text-center mb-8">
                      <div className="text-5xl mb-4">🎉</div>
                      <h2 className="text-2xl font-black text-white mb-2">
                        Your checklist is complete!
                      </h2>
                      <p className="text-zinc-400 font-medium">
                        Get your personalized{" "}
                        <strong className="text-white">
                          {gpsBrand} Road Trip Report
                        </strong>{" "}
                        sent to your inbox — includes your results and a plain-English fix guide for any issues.
                      </p>
                    </div>

                    {/* What you get */}
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5 mb-6 space-y-3">
                      {[
                        `📊 Your GPS readiness score`,
                        `🔧 Plain-English fix guide for ${gpsBrand}`,
                        `📋 Printable road trip checklist`,
                        `💡 Monthly tech tips for 45+ drivers`,
                      ].map((item) => (
                        <div
                          key={item}
                          className="flex items-center gap-3 text-sm"
                        >
                          <CheckCircle2
                            size={14}
                            className="text-green-400 shrink-0"
                          />
                          <span className="text-zinc-300 font-medium">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>

                    {/* Form */}
                    <div className="space-y-4 mb-6">
                      <div>
                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2">
                          First Name *
                        </label>
                        <div className="relative">
                          <User
                            size={15}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                          />
                          <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="e.g. Mary"
                            className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-600 text-base"
                          />
                        </div>
                        {errors.name && (
                          <p className="text-red-400 text-xs mt-1 font-bold">
                            {errors.name}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2">
                          Email Address *
                        </label>
                        <div className="relative">
                          <Mail
                            size={15}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                          />
                          <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="name@email.com"
                            className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-600 text-base"
                          />
                          {email.includes("@") && (
                            <motion.div
                              initial={{ scale: 0 }}
                              animate={{ scale: 1 }}
                              className="absolute right-4 top-1/2 -translate-y-1/2"
                            >
                              <CheckCircle2
                                size={16}
                                className="text-green-500"
                              />
                            </motion.div>
                          )}
                        </div>
                        {errors.email && (
                          <p className="text-red-400 text-xs mt-1 font-bold">
                            {errors.email}
                          </p>
                        )}
                      </div>

                      <div>
                        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2">
                          Phone{" "}
                          <span className="text-zinc-600 normal-case font-medium">
                            (optional — for SMS tips)
                          </span>
                        </label>
                        <div className="relative">
                          <Phone
                            size={15}
                            className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"
                          />
                          <input
                            type="tel"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            placeholder="+1 555 000 0000"
                            className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-xl text-white font-medium focus:outline-none focus:border-green-500 transition-colors placeholder:text-zinc-600 text-base"
                          />
                        </div>
                      </div>
                    </div>

                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={handleLeadSubmit}
                      disabled={submitting}
                      className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-400 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-500/30 mb-3"
                    >
                      {submitting ? (
                        <Loader2 size={22} className="animate-spin" />
                      ) : (
                        <>
                          <Download size={20} />
                          Send My Free Report
                        </>
                      )}
                    </motion.button>

                    <button
                      onClick={handleSkip}
                      className="w-full text-center text-sm text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors"
                    >
                      Skip — just show me the results
                    </button>

                    <p className="text-center text-xs text-zinc-600 mt-3">
                      🔒 No spam. Unsubscribe anytime. We never sell your info.
                      <br />
                      By submitting you agree to receive educational tips from
                      Setwise Digital.
                    </p>
                  </div>
                </motion.div>
              )}

              {/* ── RESULTS ──────────────────────────────────────────────────── */}
              {stage === "results" && (
                <motion.div
                  key="results"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-6"
                >
                  {/* Score card */}
                  <div
                    className={`rounded-3xl border-2 p-8 ${verdict.bg}`}
                  >
                    <div className="flex items-center justify-between mb-6">
                      <div>
                        <div className="text-sm font-black text-zinc-500 uppercase tracking-widest mb-1">
                          Your GPS Readiness Score
                        </div>
                        <div
                          className={`text-5xl font-black ${verdict.color}`}
                        >
                          {score}%
                        </div>
                        <div
                          className={`text-lg font-black mt-1 ${verdict.color}`}
                        >
                          {verdict.label}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm text-zinc-500 font-medium">
                          GPS Device
                        </div>
                        <div className="text-xl font-black text-zinc-800">
                          {gpsBrand || "Your GPS"}
                        </div>
                        {brandObj && (
                          <div className="text-xs text-zinc-400 mt-1">
                            Update with: {brandObj.updateTool}
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Score bar */}
                    <div className="h-4 bg-white/50 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${score}%` }}
                        transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                        className={`h-full bg-gradient-to-r ${verdict.bar} rounded-full`}
                      />
                    </div>

                    {submitted && (
                      <div className="mt-4 p-3 bg-white/70 rounded-xl text-sm font-bold text-green-700 flex items-center gap-2">
                        <Mail size={14} />
                        Report sent to {email} — check your inbox!
                      </div>
                    )}
                  </div>

                  {/* Individual check results */}
                  <div className="bg-white rounded-3xl border-2 border-zinc-100 p-6">
                    <h3 className="text-lg font-black text-zinc-900 mb-5">
                      Your Checklist Results
                    </h3>
                    <div className="space-y-4">
                      {checks.map((check, i) => (
                        <motion.div
                          key={check.id}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className={`flex items-start gap-4 p-4 rounded-2xl ${
                            check.status === "yes"
                              ? "bg-green-50 border border-green-100"
                              : check.status === "no"
                              ? "bg-red-50 border border-red-100"
                              : "bg-amber-50 border border-amber-100"
                          }`}
                        >
                          <div className="mt-0.5">
                            {check.status === "yes" ? (
                              <CheckCircle2
                                size={20}
                                className="text-green-600"
                              />
                            ) : check.status === "no" ? (
                              <XCircle size={20} className="text-red-500" />
                            ) : (
                              <AlertCircle
                                size={20}
                                className="text-amber-500"
                              />
                            )}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between gap-2">
                              <span className="font-black text-zinc-800 text-sm">
                                {check.category}
                              </span>
                              <span
                                className={`text-xs font-black px-2 py-0.5 rounded-full ${
                                  check.status === "yes"
                                    ? "bg-green-100 text-green-700"
                                    : check.status === "no"
                                    ? "bg-red-100 text-red-700"
                                    : "bg-amber-100 text-amber-700"
                                }`}
                              >
                                {check.status === "yes"
                                  ? "✓ Ready"
                                  : check.status === "no"
                                  ? "⚠ Needs Fix"
                                  : "? Unsure"}
                              </span>
                            </div>
                            <p className="text-xs text-zinc-500 font-medium mt-1">
                              {check.question}
                            </p>
                            {check.status !== "yes" && (
                              <p className="text-xs text-zinc-600 font-medium mt-2 p-2 bg-white/70 rounded-xl">
                                💡 {check.learnMore}
                              </p>
                            )}
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </div>

                  {/* Action buttons */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <button
                      onClick={reset}
                      className="flex items-center justify-center gap-2 py-4 border-2 border-zinc-200 rounded-2xl font-black text-zinc-600 hover:border-zinc-400 transition-colors"
                    >
                      <RefreshCw size={18} />
                      Start Over
                    </button>
                    <Link href="/tools/best-gps-finder">
                      <motion.div
                        whileHover={{ scale: 1.02 }}
                        className="flex items-center justify-center gap-2 py-4 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg shadow-blue-500/20 cursor-pointer"
                      >
                        <Navigation size={18} />
                        Find Best GPS for You
                      </motion.div>
                    </Link>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* About this tool */}
            <div className="bg-white rounded-3xl border-2 border-zinc-100 p-6">
              <h3 className="font-black text-zinc-900 mb-3 text-sm uppercase tracking-widest">
                About This Tool
              </h3>
              <p className="text-sm text-zinc-500 font-medium leading-relaxed">
                This free educational tool helps you understand whether your GPS
                device is ready for a road trip. All guidance is for learning
                purposes only.
              </p>
              <div className="mt-4 p-3 bg-blue-50 border border-blue-100 rounded-xl">
                <div className="flex items-start gap-2">
                  <Shield
                    size={14}
                    className="text-blue-500 mt-0.5 shrink-0"
                  />
                  <p className="text-xs text-blue-600 font-medium">
                    Independent educational platform. Not affiliated with
                    Garmin, TomTom, or any GPS manufacturer.
                  </p>
                </div>
              </div>
            </div>

            {/* Quick tips */}
            <div className="bg-zinc-900 rounded-3xl p-6">
              <h3 className="font-black text-white mb-4 flex items-center gap-2">
                <Star size={16} className="text-amber-400" />
                Quick GPS Tips
              </h3>
              <div className="space-y-3">
                {[
                  "Update maps before every long trip",
                  "Suction cups grip better when slightly damp",
                  "Save hotels & stops as Favorites beforehand",
                  "Test volume with AC running — roads are loud",
                  "Bring USB charger — battery drains fast in heat",
                ].map((tip, i) => (
                  <div
                    key={i}
                    className="flex items-start gap-2 text-sm text-zinc-400 font-medium"
                  >
                    <CheckCircle2
                      size={14}
                      className="text-green-400 shrink-0 mt-0.5"
                    />
                    {tip}
                  </div>
                ))}
              </div>
            </div>

            {/* Related tool */}
            <Link href="/tools/best-gps-finder">
              <div className="bg-gradient-to-br from-blue-600 to-indigo-700 rounded-3xl p-6 cursor-pointer hover:scale-[1.02] transition-transform">
                <div className="text-3xl mb-3">🧭</div>
                <h3 className="font-black text-white mb-2">
                  Not sure which GPS to buy?
                </h3>
                <p className="text-blue-200 text-sm font-medium mb-4">
                  Answer 5 questions and we&apos;ll find the perfect GPS for
                  your budget and lifestyle.
                </p>
                <div className="flex items-center gap-2 text-white font-black text-sm">
                  Try Best GPS Finder{" "}
                  <ArrowRight size={16} />
                </div>
              </div>
            </Link>

            {/* FAQ for SEO */}
            <div className="bg-white rounded-3xl border-2 border-zinc-100 p-6">
              <h3 className="font-black text-zinc-900 mb-4 text-sm uppercase tracking-widest">
                Common Questions
              </h3>
              <div className="space-y-4">
                {[
                  {
                    q: "How often should I update GPS maps?",
                    a: "Every 3-6 months, or before any long road trip.",
                  },
                  {
                    q: "What if my GPS has no internet?",
                    a: "Use a USB cable and Garmin Express or TomTom MyDrive Connect on your computer.",
                  },
                  {
                    q: "Can I use my phone instead?",
                    a: "Yes — Google Maps and Waze are free. A standalone GPS works better in poor signal areas.",
                  },
                ].map((faq) => (
                  <div key={faq.q} className="border-b border-zinc-100 pb-4 last:border-0 last:pb-0">
                    <div className="font-black text-zinc-800 text-sm mb-1">
                      {faq.q}
                    </div>
                    <div className="text-zinc-400 text-xs font-medium leading-relaxed">
                      {faq.a}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SEO content section */}
      <section className="bg-zinc-50 py-20 border-t border-zinc-100">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-black text-zinc-900 mb-6 tracking-tight">
            Why Check Your GPS Before a Road Trip?
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-600 font-medium leading-relaxed">
            <div>
              <p className="mb-4">
                Outdated GPS maps are the single biggest cause of wrong
                directions on road trips. Roads change constantly — new highways
                open, exits are renamed, speed limits change. Map providers like
                Garmin and TomTom release quarterly updates to keep pace with
                these changes.
              </p>
              <p>
                A loose GPS mount is a safety hazard. At highway speeds, a GPS
                that falls off your windshield is a serious distraction. A
                simple pre-trip check takes 30 seconds and could prevent a
                dangerous situation.
              </p>
            </div>
            <div>
              <p className="mb-4">
                Saving your destinations as Favorites before you leave means
                you&apos;re never scrambling to type in an address while driving
                — especially important in areas with poor cell signal where
                Google Maps may not load.
              </p>
              <p>
                This educational tool was built specifically for adults 45+ who
                want plain-English guidance without technical jargon. All
                information is for learning purposes — Setwise Digital is an
                independent educational platform not affiliated with any GPS
                manufacturer.
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
