"use client";

import { useState, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { ArrowRight, Users, Zap, Search, Shield } from "lucide-react";

const toolsBackgrounds = [
  { url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&q=80&w=1600", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=1600", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1600", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1600", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=80&w=1600", type: "image" as const, theme: "dark" as const },
];

const CATEGORIES = [
  { id: "all", label: "All Tools", icon: "🛠️" },
  { id: "gps", label: "GPS & Navigation", icon: "🗺️" },
  { id: "printer", label: "Printers", icon: "🖨️" },
  { id: "smarthome", label: "Smart Home", icon: "🏠" },
  { id: "security", label: "Security", icon: "🔒" },
  { id: "voice", label: "Voice Assistant", icon: "🎙️" },
];

const TOOLS = [
  { id: "road-trip-checker", category: "gps", href: "/tools/road-trip-checker", emoji: "🚗", badge: "Most Popular", badgeColor: "bg-green-500", title: "Road Trip GPS Pre-Check", description: "5-step GPS readiness checklist before your next road trip. Maps, battery, mounting, route, and audio — all in plain English.", tags: ["GPS", "Road Trip", "Garmin", "TomTom"], time: "3 min", users: "2,400+", accent: "from-green-500 to-emerald-400", tagBg: "bg-green-900/40", tagText: "text-green-300", live: true },
  { id: "best-gps-finder", category: "gps", href: "/tools/best-gps-finder", emoji: "🧭", badge: "New", badgeColor: "bg-blue-500", title: "Best GPS Finder for You", description: "Answer 5 questions about your driving habits and budget. Get a personalized GPS recommendation matched exactly to your lifestyle.", tags: ["GPS", "Garmin", "TomTom", "Buying Guide"], time: "4 min", users: "1,800+", accent: "from-blue-500 to-indigo-400", tagBg: "bg-blue-900/40", tagText: "text-blue-300", live: true },
  { id: "gps-update-scheduler", category: "gps", href: "/tools/gps-update-scheduler", emoji: "📅", badge: "New", badgeColor: "bg-cyan-600", title: "GPS Update Scheduler", description: "Find out how outdated your GPS maps are and get a personalized step-by-step update guide specific to your device.", tags: ["Garmin Express", "TomTom", "Map Updates"], time: "3 min", users: "900+", accent: "from-cyan-500 to-blue-400", tagBg: "bg-cyan-900/40", tagText: "text-cyan-300", live: true },
  { id: "printer-cost-calculator", category: "printer", href: "/tools/printer-cost-calculator", emoji: "💰", badge: "New", badgeColor: "bg-indigo-500", title: "Printer True Cost Calculator", description: "Find out exactly how much your printer costs per year — ink, paper, and electricity all included. Compare HP, Canon, Epson and Brother.", tags: ["HP", "Canon", "Epson", "Brother"], time: "3 min", users: "1,200+", accent: "from-indigo-500 to-blue-400", tagBg: "bg-indigo-900/40", tagText: "text-indigo-300", live: true },
  { id: "best-printer-finder", category: "printer", href: "/tools/best-printer-finder", emoji: "🖨️", badge: "New", badgeColor: "bg-violet-600", title: "Best Printer Finder for You", description: "Photos, documents, or both? 5 questions match you to the perfect printer for your home and budget — no technical knowledge needed.", tags: ["HP", "Canon", "Epson", "Buying Guide"], time: "4 min", users: "980+", accent: "from-violet-500 to-purple-400", tagBg: "bg-violet-900/40", tagText: "text-violet-300", live: true },
  { id: "smart-home-matcher", category: "smarthome", href: "/tools/smart-home-matcher", emoji: "🏠", badge: "New", badgeColor: "bg-amber-600", title: "Smart Home Starter Matcher", description: "Alexa, Google Nest, or Apple HomeKit? 5 questions match the right smart home system to your lifestyle — no technical knowledge needed.", tags: ["Alexa", "Google Nest", "Apple HomeKit"], time: "4 min", users: "760+", accent: "from-amber-500 to-orange-400", tagBg: "bg-amber-900/40", tagText: "text-amber-300", live: true },
  { id: "home-security-audit", category: "security", href: "/tools/home-security-audit", emoji: "🔒", badge: "New", badgeColor: "bg-red-600", title: "Home Security Audit Tool", description: "10 yes/no questions reveal how protected your home truly is — and which affordable devices would make the biggest difference.", tags: ["Ring", "SimpliSafe", "ADT", "Cameras"], time: "5 min", users: "640+", accent: "from-red-500 to-rose-400", tagBg: "bg-red-900/40", tagText: "text-red-300", live: true },
  { id: "voice-assistant-matcher", category: "voice", href: "/tools/voice-assistant-matcher", emoji: "🎙️", badge: "New", badgeColor: "bg-purple-600", title: "Best Voice Assistant for You", description: "Alexa, Google Assistant, or Siri? Match the best voice assistant to your phone, daily habits and home devices in 5 questions.", tags: ["Alexa", "Google Assistant", "Siri"], time: "3 min", users: "520+", accent: "from-violet-500 to-purple-400", tagBg: "bg-violet-900/40", tagText: "text-violet-300", live: true },
  { id: "subscription-audit", category: "smarthome", href: "/tools/subscription-audit", emoji: "📊", badge: "New", badgeColor: "bg-teal-600", title: "Tech Subscription Audit", description: "List your digital subscriptions and we'll calculate your true monthly cost, find overlaps, and tell you exactly which ones to cancel.", tags: ["Netflix", "Streaming", "Subscriptions", "Save Money"], time: "4 min", users: "430+", accent: "from-teal-500 to-cyan-400", tagBg: "bg-teal-900/40", tagText: "text-teal-300", live: true },
  { id: "printer-ink-vs-tank", category: "printer", href: "/tools/printer-ink-vs-tank", emoji: "🫙", badge: "New", badgeColor: "bg-indigo-600", title: "Ink Cartridge vs Ink Tank", description: "Should you buy a regular printer or switch to EcoTank/MegaTank? 5 honest questions give you a clear answer based on how you actually print.", tags: ["Epson EcoTank", "Canon MegaTank", "HP Smart Tank", "Cost Savings"], time: "3 min", users: "850+", accent: "from-indigo-500 to-violet-400", tagBg: "bg-indigo-900/40", tagText: "text-indigo-300", live: true },
  { id: "adventure-gps", category: "gps", href: "/tools/adventure-gps-selector", emoji: "🥾", badge: "New", badgeColor: "bg-green-700", title: "Adventure GPS Selector", description: "Hiking, hunting, fishing, boating, or off-road? Find the exact Garmin GPS built for your outdoor adventure — with full feature comparison.", tags: ["Garmin", "Hiking", "Hunting", "Fishing", "Boating"], time: "3 min", users: "620+", accent: "from-green-600 to-emerald-400", tagBg: "bg-green-900/40", tagText: "text-green-300", live: true },
  { id: "pet-gps", category: "gps", href: "/tools/pet-gps-selector", emoji: "🐕", badge: "New", badgeColor: "bg-pink-600", title: "Pet GPS Tracker Selector", description: "Dog or cat GPS tracker — Fi, Whistle, Tractive, Garmin, or AirTag? Compare the 5 best pet trackers with honest subscription cost breakdown.", tags: ["Dog GPS", "Cat Tracker", "Fi Collar", "Whistle", "Tractive"], time: "3 min", users: "490+", accent: "from-pink-500 to-rose-400", tagBg: "bg-pink-900/40", tagText: "text-pink-300", live: true },
  { id: "car-gps", category: "gps", href: "/tools/car-gps-update", emoji: "🚗", badge: "New", badgeColor: "bg-blue-700", title: "Car Navigation Update Guide", description: "Select your car brand and model — get exact step-by-step update instructions. Honda, Toyota, BMW, Mercedes, Lexus, Audi, Ford, Nissan and more.", tags: ["Honda", "Toyota", "BMW", "Mercedes", "Lexus", "Audi"], time: "5 min", users: "1,100+", accent: "from-blue-600 to-cyan-400", tagBg: "bg-blue-900/40", tagText: "text-blue-300", live: true },
  { id: "printer-features", category: "printer", href: "/tools/printer-features-guide", emoji: "📖", badge: "New", badgeColor: "bg-violet-600", title: "Printer Features Explained", description: "What is Auto Duplex? ADF? PPM? Tap any printer feature for a plain-English explanation of what it does and whether you actually need it.", tags: ["Auto Duplex", "ADF", "Ink Tank", "Wi-Fi Printing"], time: "2 min", users: "730+", accent: "from-violet-500 to-purple-400", tagBg: "bg-violet-900/40", tagText: "text-violet-300", live: true },
  { id: "gps-features", category: "gps", href: "/tools/gps-features-guide", emoji: "📚", badge: "New", badgeColor: "bg-emerald-600", title: "GPS Features Explained", description: "Live Traffic, Lane Assist, LMT — what do GPS specs actually mean? Tap any feature for a plain-English explanation of what it does and if you need it.", tags: ["Live Traffic", "Lane Assist", "Lifetime Maps", "Bluetooth"], time: "2 min", users: "580+", accent: "from-emerald-500 to-green-400", tagBg: "bg-emerald-900/40", tagText: "text-emerald-300", live: true },
  { id: "wifi-checker", category: "smarthome", href: "/tools/wifi-checker", emoji: "📶", badge: "New", badgeColor: "bg-sky-600", title: "Home Wi-Fi Overload Checker", description: "Count your connected devices and find out if your router can handle the load. Get a plain-English plan to fix slow Wi-Fi.", tags: ["Wi-Fi", "Router", "Internet Speed", "Smart Home"], time: "3 min", users: "380+", accent: "from-sky-500 to-blue-400", tagBg: "bg-sky-900/40", tagText: "text-sky-300", live: true },
];

function ToolCard({ tool, index }: { tool: (typeof TOOLS)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });
  return (
    <motion.div ref={ref} initial={{ opacity: 0, y: 50 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: index * 0.06 }} className="group relative">
      <div className="relative h-full rounded-[2rem] border border-zinc-800 bg-zinc-900 hover:border-zinc-600 hover:shadow-2xl hover:shadow-black/50 transition-all duration-300 overflow-hidden cursor-pointer">
        <div className={`h-1.5 w-full bg-gradient-to-r ${tool.accent}`} />
        <div className="p-8">
          <div className="flex items-start justify-between mb-6">
            <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${tool.accent} flex items-center justify-center text-3xl shadow-xl`}>{tool.emoji}</div>
            <span className={`${tool.badgeColor} text-white text-sm font-black px-3 py-1.5 rounded-full`}>{tool.badge}</span>
          </div>
          <h3 className="text-2xl font-black text-white mb-3 leading-tight group-hover:text-blue-300 transition-colors">{tool.title}</h3>
          <p className="text-zinc-400 text-base font-medium leading-relaxed mb-6">{tool.description}</p>
          <div className="flex flex-wrap gap-2 mb-7">
            {tool.tags.map((tag) => (<span key={tag} className={`text-sm font-bold px-3 py-1.5 rounded-full ${tool.tagBg} ${tool.tagText} border border-white/5`}>{tag}</span>))}
          </div>
          <div className="flex items-center justify-between pt-5 border-t border-zinc-800">
            <div className="flex items-center gap-5 text-sm text-zinc-500 font-semibold">
              <span className="flex items-center gap-1.5"><Zap size={14} className="text-amber-400" />{tool.time}</span>
              <span className="flex items-center gap-1.5"><Users size={14} className="text-blue-400" />{tool.users}</span>
            </div>
            <Link href={tool.href}><motion.div whileHover={{ x: 4 }} className={`flex items-center gap-2 text-base font-black bg-gradient-to-r ${tool.accent} bg-clip-text text-transparent`}>Start Free <ArrowRight size={16} className="text-blue-400" /></motion.div></Link>
          </div>
        </div>
        <div className="absolute inset-0 rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none bg-gradient-to-br from-blue-500/5 via-transparent to-transparent" />
      </div>
    </motion.div>
  );
}

export default function ToolsHubClient() {
  const [activeCategory, setActiveCategory] = useState("all");
  const [search, setSearch] = useState("");
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");
  const filtered = TOOLS.filter((t) => {
    const matchCat = activeCategory === "all" || t.category === activeCategory;
    const matchSearch = search === "" || t.title.toLowerCase().includes(search.toLowerCase()) || t.tags.some((tag) => tag.toLowerCase().includes(search.toLowerCase()));
    return matchCat && matchSearch;
  });

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar />
      <ScrollToTop />

      {/* ── Hero — EXACT same pattern as homepage ── */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
        <HeaderBackgroundSlider items={toolsBackgrounds} interval={7000} onThemeChange={setCurrentTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="max-w-3xl mx-auto text-center">
            <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-black uppercase tracking-widest mb-8">
              <Zap size={14} className="text-blue-400" />16 Free Tools Live — More Launching Weekly
            </motion.div>
            <h1 className="text-6xl md:text-8xl font-black leading-none tracking-tighter mb-8">
              {["Free Tech Tools", "Built for You"].map((line, i) => (
                <motion.span key={i} className={`block ${i === 1 ? "bg-gradient-to-r from-blue-400 to-indigo-300 bg-clip-text text-transparent italic" : "text-white"}`}
                  initial={{ opacity: 0, filter: "blur(8px)" }} animate={{ opacity: 1, filter: "blur(0px)" }} transition={{ delay: 0.3 + i * 0.15, duration: 0.8 }}>
                  {line}
                </motion.span>
              ))}
            </h1>
            <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.7 }}
              className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed mb-10">
              Simple, interactive tools that help you understand your technology — no jargon, no confusion. Find the right device, plan your trip, and learn at your own pace.
            </motion.p>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.9 }} className="relative max-w-lg mx-auto">
              <Search size={20} className="absolute left-5 top-1/2 -translate-y-1/2 text-zinc-400" />
              <input type="text" value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search tools — GPS, printer, Alexa..."
                className="w-full pl-14 pr-6 py-5 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-400 transition-colors text-lg placeholder:text-zinc-500" />
            </motion.div>
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 }} className="flex flex-wrap justify-center gap-10 mt-14">
              {[{ value: "100%", label: "Free to use" }, { value: "45+", label: "Designed for adults" }, { value: "0", label: "Jargon used" }, { value: "5min", label: "Average completion" }].map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-4xl font-black text-white">{stat.value}</div>
                  <div className="text-base text-zinc-400 font-semibold mt-1">{stat.label}</div>
                </div>
              ))}
            </motion.div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10 mt-10">
        <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl px-6 py-4 flex items-start gap-3">
          <Shield size={16} className="text-blue-400 mt-0.5 shrink-0" />
          <p className="text-base text-blue-300 font-medium"><strong className="text-blue-200">Educational Platform:</strong> All tools are for learning and guidance purposes only. Setwise Digital is an independent tech literacy platform — not affiliated with any device manufacturer.</p>
        </div>
      </div>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-10">
        <div className="flex flex-wrap gap-3">
          {CATEGORIES.map((cat) => (
            <button key={cat.id} onClick={() => setActiveCategory(cat.id)}
              className={`flex items-center gap-2 px-6 py-3 rounded-full font-bold text-base border-2 transition-all duration-200 ${activeCategory === cat.id ? "bg-blue-600 border-blue-600 text-white shadow-lg shadow-blue-500/25" : "bg-zinc-900 border-zinc-700 text-zinc-400 hover:border-zinc-500 hover:text-white"}`}>
              <span>{cat.icon}</span>{cat.label}
            </button>
          ))}
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-28">
        <AnimatePresence mode="wait">
          {filtered.length === 0 ? (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-24">
              <div className="text-6xl mb-4">🔍</div>
              <h3 className="text-2xl font-black text-zinc-400 mb-2">No tools found</h3>
              <p className="text-zinc-600 font-medium text-lg">Try a different search or category</p>
            </motion.div>
          ) : (
            <motion.div key={activeCategory + search} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((tool, i) => <ToolCard key={tool.id} tool={tool} index={i} />)}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="relative py-24 overflow-hidden border-t border-zinc-800">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 via-transparent to-indigo-900/20" />
        <div className="relative max-w-3xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}>
            <div className="text-6xl mb-6">📬</div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-5 tracking-tight">Get New Tools in Your Inbox</h2>
            <p className="text-zinc-400 font-medium mb-10 text-xl leading-relaxed">We launch new free tools every week. Start with our Road Trip GPS Checker — takes just 3 minutes.</p>
            <Link href="/tools/road-trip-checker" className="inline-flex items-center gap-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black px-10 py-6 rounded-2xl text-xl shadow-2xl shadow-blue-500/30 hover:scale-105 transition-transform">
              <Zap size={22} />Try Your First Free Tool<ArrowRight size={22} />
            </Link>
          </motion.div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
