"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import {
  Navigation,
  Printer,
  Home,
  Shield,
  Mic,
  ArrowRight,
  Star,
  Users,
  Zap,
  Search,
} from "lucide-react";

const CATEGORIES = [
  { id: "all", label: "All Tools", icon: "🛠️" },
  { id: "gps", label: "GPS & Navigation", icon: "🗺️" },
  { id: "printer", label: "Printers", icon: "🖨️" },
  { id: "smarthome", label: "Smart Home", icon: "🏠" },
  { id: "security", label: "Security", icon: "🔒" },
  { id: "voice", label: "Voice Assistant", icon: "🎙️" },
];

const TOOLS = [
  {
    id: "road-trip-checker",
    category: "gps",
    href: "/tools/road-trip-checker",
    emoji: "🚗",
    badge: "Most Popular",
    badgeColor: "bg-green-500",
    title: "Road Trip Pre-Check Assistant",
    description:
      "5-step GPS readiness check before your next road trip. Make sure your maps are updated, device is charged, and route is set — in plain English.",
    tags: ["GPS", "Road Trip", "Garmin", "TomTom"],
    time: "3 min",
    users: "2,400+",
    accent: "from-green-600 to-emerald-400",
    accentLight: "bg-green-50 border-green-100",
    accentText: "text-green-700",
    Icon: Navigation,
  },
  {
    id: "best-gps-finder",
    category: "gps",
    href: "/tools/best-gps-finder",
    emoji: "🧭",
    badge: "New",
    badgeColor: "bg-blue-500",
    title: "Best GPS Finder for You",
    description:
      "Answer 5 simple questions about your driving habits and budget. We'll recommend the perfect GPS device for your lifestyle — no jargon, no confusion.",
    tags: ["GPS", "Garmin", "TomTom", "Buying Guide"],
    time: "4 min",
    users: "1,800+",
    accent: "from-blue-600 to-blue-400",
    accentLight: "bg-blue-50 border-blue-100",
    accentText: "text-blue-700",
    Icon: Navigation,
  },
  {
    id: "printer-cost-calculator",
    category: "printer",
    href: "/tools/printer-cost-calculator",
    emoji: "💰",
    badge: "Coming Soon",
    badgeColor: "bg-zinc-400",
    title: "Printer True Cost Calculator",
    description:
      "Find out exactly how much your printer really costs per year — ink, paper, electricity included. Compare models side by side in plain English.",
    tags: ["HP", "Canon", "Epson", "Brother", "Ink Cost"],
    time: "3 min",
    users: "Coming soon",
    accent: "from-blue-600 to-indigo-400",
    accentLight: "bg-indigo-50 border-indigo-100",
    accentText: "text-indigo-700",
    Icon: Printer,
    comingSoon: true,
  },
  {
    id: "best-printer-finder",
    category: "printer",
    href: "/tools/best-printer-finder",
    emoji: "🖨️",
    badge: "Coming Soon",
    badgeColor: "bg-zinc-400",
    title: "Best Printer Finder for You",
    description:
      "Tell us how you print — photos, documents, or both — and we'll match you to the perfect printer for your home and budget.",
    tags: ["HP", "Canon", "Epson", "Buying Guide"],
    time: "4 min",
    users: "Coming soon",
    accent: "from-cyan-600 to-blue-400",
    accentLight: "bg-cyan-50 border-cyan-100",
    accentText: "text-cyan-700",
    Icon: Printer,
    comingSoon: true,
  },
  {
    id: "smart-home-matcher",
    category: "smarthome",
    href: "/tools/smart-home-matcher",
    emoji: "🏠",
    badge: "Coming Soon",
    badgeColor: "bg-zinc-400",
    title: "Smart Home Starter Matcher",
    description:
      "Not sure if you need Alexa, Google Nest, or Apple HomeKit? Answer 5 questions and we'll match the right smart home system to your lifestyle.",
    tags: ["Alexa", "Google Nest", "Apple HomeKit", "Smart Home"],
    time: "4 min",
    users: "Coming soon",
    accent: "from-amber-500 to-orange-400",
    accentLight: "bg-amber-50 border-amber-100",
    accentText: "text-amber-700",
    Icon: Home,
    comingSoon: true,
  },
  {
    id: "home-security-audit",
    category: "security",
    href: "/tools/home-security-audit",
    emoji: "🔒",
    badge: "Coming Soon",
    badgeColor: "bg-zinc-400",
    title: "Home Security Audit Tool",
    description:
      "10 simple yes/no questions reveal exactly how protected your home is — and which affordable smart devices would make the biggest difference.",
    tags: ["Ring", "SimpliSafe", "ADT", "Security Camera"],
    time: "5 min",
    users: "Coming soon",
    accent: "from-red-600 to-rose-400",
    accentLight: "bg-red-50 border-red-100",
    accentText: "text-red-700",
    Icon: Shield,
    comingSoon: true,
  },
  {
    id: "voice-assistant-matcher",
    category: "voice",
    href: "/tools/voice-assistant-matcher",
    emoji: "🎙️",
    badge: "Coming Soon",
    badgeColor: "bg-zinc-400",
    title: "Best Voice Assistant for You",
    description:
      "Alexa, Google Assistant, or Siri? We'll match the best voice assistant to your phone, daily habits, and home devices in just 5 questions.",
    tags: ["Alexa", "Google Assistant", "Siri", "Smart Speaker"],
    time: "3 min",
    users: "Coming soon",
    accent: "from-violet-600 to-purple-400",
    accentLight: "bg-violet-50 border-violet-100",
    accentText: "text-violet-700",
    Icon: Mic,
    comingSoon: true,
  },
];

function ToolCard({
  tool,
  index,
}: {
  tool: (typeof TOOLS)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.25, 0.46, 0.45, 0.94] }}
      className="group relative"
    >
      <div
        className={`relative h-full rounded-3xl border-2 bg-white transition-all duration-300 overflow-hidden ${
          tool.comingSoon
            ? "border-zinc-100 opacity-75"
            : "border-zinc-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/8 cursor-pointer"
        }`}
      >
        {/* Top accent bar */}
        <div className={`h-1.5 w-full bg-gradient-to-r ${tool.accent}`} />

        <div className="p-7">
          {/* Header */}
          <div className="flex items-start justify-between mb-5">
            <div
              className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.accent} flex items-center justify-center text-2xl shadow-lg`}
            >
              {tool.emoji}
            </div>
            <span
              className={`${tool.badgeColor} text-white text-xs font-black px-3 py-1.5 rounded-full`}
            >
              {tool.badge}
            </span>
          </div>

          {/* Title & Description */}
          <h3 className="text-xl font-black text-zinc-900 mb-3 leading-tight group-hover:text-blue-700 transition-colors">
            {tool.title}
          </h3>
          <p className="text-zinc-500 text-sm font-medium leading-relaxed mb-5">
            {tool.description}
          </p>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 mb-6">
            {tool.tags.map((tag) => (
              <span
                key={tag}
                className={`text-xs font-bold px-2.5 py-1 rounded-full border ${tool.accentLight} ${tool.accentText}`}
              >
                {tag}
              </span>
            ))}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between pt-4 border-t border-zinc-100">
            <div className="flex items-center gap-4 text-xs text-zinc-400 font-semibold">
              <span className="flex items-center gap-1">
                <Zap size={12} className="text-amber-400" />
                {tool.time}
              </span>
              <span className="flex items-center gap-1">
                <Users size={12} className="text-blue-400" />
                {tool.users}
              </span>
            </div>
            {!tool.comingSoon ? (
              <Link href={tool.href}>
                <motion.div
                  whileHover={{ x: 3 }}
                  className={`flex items-center gap-1.5 text-sm font-black bg-gradient-to-r ${tool.accent} bg-clip-text text-transparent`}
                >
                  Start Free <ArrowRight size={14} className="text-blue-600" />
                </motion.div>
              </Link>
            ) : (
              <span className="text-xs font-bold text-zinc-400">
                Launching soon
              </span>
            )}
          </div>
        </div>

        {/* Hover shimmer */}
        {!tool.comingSoon && (
          <div className="absolute inset-0 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-500/3 via-transparent to-transparent" />
        )}
      </div>
    </motion.div>
  );
}

export default function ToolsHubClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  const filtered = TOOLS.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch =
      search === "" ||
      t.title.toLowerCase().includes(search.toLowerCase()) ||
      t.tags.some((tag) =>
        tag.toLowerCase().includes(search.toLowerCase())
      );
    return matchCat && matchSearch;
  });

  const liveTools = TOOLS.filter((t) => !t.comingSoon).length;

  return (
    <div className="min-h-screen bg-[#fcfcfc]">
      <Navbar />

      {/* Hero */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background mesh */}
        <div className="absolute inset-0 mesh-gradient opacity-60" />
        <div className="absolute top-20 right-0 w-96 h-96 bg-blue-400/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-indigo-400/10 rounded-full blur-3xl" />

        <div
          ref={heroRef}
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
        >
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-blue-50 border border-blue-100 text-blue-700 text-sm font-bold px-5 py-2.5 rounded-full mb-8">
              <Zap size={14} className="text-blue-500" />
              {liveTools} Free Tools Live — More Launching Weekly
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-zinc-900 leading-tight tracking-tighter mb-6">
              Free Tech Tools
              <br />
              <span className="bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                Built for You
              </span>
            </h1>
            <p className="text-xl text-zinc-500 font-medium max-w-2xl mx-auto mb-10 leading-relaxed">
              Simple, interactive tools that help you understand your technology
              — no jargon, no confusion. Find the right device, plan your trip,
              and learn at your own pace.
            </p>

            {/* Search */}
            <div className="relative max-w-md mx-auto">
              <Search
                size={18}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400"
              />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search tools — GPS, printer, Alexa..."
                className="w-full pl-12 pr-5 py-4 bg-white border-2 border-zinc-200 rounded-2xl text-zinc-800 font-medium focus:outline-none focus:border-blue-400 transition-colors shadow-sm text-base"
              />
            </div>
          </motion.div>

          {/* Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={heroInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-8 mt-14"
          >
            {[
              { value: "100%", label: "Free to use" },
              { value: "45+", label: "Designed for adults" },
              { value: "0", label: "Jargon used" },
              { value: "5min", label: "Average completion" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-black text-zinc-900">
                  {stat.value}
                </div>
                <div className="text-sm text-zinc-400 font-semibold">
                  {stat.label}
                </div>
              </div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Educational disclaimer */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-8">
        <div className="bg-blue-50 border border-blue-100 rounded-2xl px-6 py-4 flex items-start gap-3">
          <span className="text-blue-500 mt-0.5 shrink-0">
            <Star size={16} />
          </span>
          <p className="text-sm text-blue-700 font-medium">
            <strong>Educational Platform:</strong> All tools are for learning
            and guidance purposes only. Setwise Digital is an independent tech
            literacy platform — not affiliated with any device manufacturer.
          </p>
        </div>
      </div>

      {/* Category Filter */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap gap-2">
          {CATEGORIES.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm border-2 transition-all duration-200 ${
                activeCategory === cat.id
                  ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/20"
                  : "bg-white border-zinc-200 text-zinc-600 hover:border-blue-300 hover:text-blue-700"
              }`}
            >
              <span>{cat.icon}</span>
              {cat.label}
            </button>
          ))}
        </div>
      </section>

      {/* Tools Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-24">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-center py-20"
            >
              <div className="text-5xl mb-4">🔍</div>
              <h3 className="text-xl font-black text-zinc-700 mb-2">
                No tools found
              </h3>
              <p className="text-zinc-400 font-medium">
                Try a different search or category
              </p>
            </motion.div>
          ) : (
            <motion.div
              key={activeCategory + search}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            >
              {filtered.map((tool, i) => (
                <ToolCard key={tool.id} tool={tool} index={i} />
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* CTA */}
      <section className="bg-zinc-900 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <div className="text-5xl mb-6">📬</div>
            <h2 className="text-4xl font-black text-white mb-4 tracking-tight">
              Get New Tools in Your Inbox
            </h2>
            <p className="text-zinc-400 font-medium mb-8 text-lg">
              We launch new free tools every week. Enter your email and we
              &apos;ll let you know — plain English, no spam, ever.
            </p>
            <Link
              href="/tools/road-trip-checker"
              className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black px-8 py-5 rounded-2xl text-lg shadow-xl shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:scale-105"
            >
              <Zap size={20} />
              Try Our First Free Tool
              <ArrowRight size={20} />
            </Link>
          </motion.div>
        </div>
      </section>

      <Footer />
      <ScrollToTop />
    </div>
  );
}
