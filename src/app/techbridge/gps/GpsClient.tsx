"use client";

import { useRef, useState, useEffect } from "react";
import { motion, useInView } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import TechBridgeLearningHub from "@/components/TechBridgeLearningHub";
import HeroCharacter from "@/components/HeroCharacter";
import { ArrowRight, CheckCircle2, Phone, Mail, User, Loader2, Star, Shield, Zap, ChevronRight } from "lucide-react";
import Link from "next/link";

const ACCENT_HEX = "#16a34a";
const GLOW = "#16a34a38";

// ── Headline frames — each maps to a different user query intent ────────────
const FRAMES = [
  { svgType:"gps", headline: "Navigate With Confidence.\n", visualLabel: "Garmin, TomTom, in-car GPS", visualSub: "Keep maps current, plan every journey", emoji: "🗺️", color: "#16a34a", particles: ["🗺️","🚗","📍","✅","🔄","⭐"] },
  { svgType:"gps", headline: "GPS Maps Outdated?", visualLabel: "Garmin, TomTom, in-car navigation", visualSub: "Free map updates — step by step", emoji: "🔄", color: "#16a34a", particles: ["🔄","🗺️","📡","✅","🚗","💡"] },
  { svgType:"gps", headline: "GPS Giving Wrong Directions?", visualLabel: "Garmin, TomTom, phone GPS", visualSub: "Why it happens and how to fix it", emoji: "🔀", color: "#f59e0b", particles: ["🔀","🤔","🔧","✅","🗺️","🚗"] },
  { svgType:"gps", headline: "Plan Your Road Trip Route", visualLabel: "Multi-stop journey planning", visualSub: "GPS ready — charged, updated, mounted", emoji: "📍", color: "#06b6d4", particles: ["📍","🚗","🗺️","☀️","🏨","✅"] },
  { svgType:"gps", headline: "GPS Frozen Screen Fix", visualLabel: "Garmin, TomTom, in-car GPS", visualSub: "Restart, reset, or update — simple steps", emoji: "🧊", color: "#8b5cf6", particles: ["🧊","😤","🔧","✅","😌","🖥️"] }
];

const WIZARD_CONFIG = {
  source: "gps-page",
  accentColor: "from-green-600 to-emerald-500",
  accentHex: "#16a34a",
  step1Title: "What do you need help with?",
  step1Options: [
    { label: "Getting started", icon: "🚀", popular: true },
    { label: "Something is not working", icon: "🔧", popular: true },
    { label: "Learn the features", icon: "📚" },
    { label: "Book a lesson", icon: "👤" },
  ],
  step2Title: "Tell us a bit more",
  brandOptions: [
    { label: "Option A", icon: "🔵" },
    { label: "Option B", icon: "🟢" },
    { label: "Option C", icon: "🔴" },
    { label: "Not sure", icon: "❓" },
  ],
  step2Options: [
    { label: "Show me how it works", icon: "⚡" },
    { label: "Learn step by step", icon: "📚" },
    { label: "Book a live lesson", icon: "👤" },
    { label: "Get PDF guide", icon: "📄" },
  ],
  processingMessages: ["Preparing your learning guide...", "Almost ready, [name]...", "Your guide is ready!"],
};

const AI_PROPS = {
  brandExamples: ["Option A", "Option B", "Option C"],
  starterQuestions: ["How do I get started?", "Something is not working", "What do you recommend?"],
};

type Tool = { href:string; emoji:string; label:string; labelBg:string; title:string; desc:string; tags:string[]; gradient:string };
const TOOLS: Tool[] = [
  { href:"/tools/road-trip-checker", emoji:"🚗", label:"Road Trip", labelBg:"bg-green-600", title:"Road Trip GPS Pre-Check", desc:"5-step GPS checklist — maps, battery, route, audio. Ready before you leave.", tags:["Garmin","TomTom","In-car"], gradient:"from-green-500 to-emerald-400" },
  { href:"/tools/best-gps-finder", emoji:"🧭", label:"Find Yours", labelBg:"bg-blue-600", title:"Best GPS Finder for You", desc:"5 questions match you to the right Garmin or TomTom for your lifestyle.", tags:["Garmin","TomTom","Budget"], gradient:"from-blue-500 to-indigo-400" },
  { href:"/tools/garmin-express-setup", emoji:"🔄", label:"Update Now", labelBg:"bg-cyan-600", title:"How to Update Garmin Maps", desc:"Clickable step-by-step — Wi-Fi or Garmin Express. Tick off each step.", tags:["Garmin","Wi-Fi","Express"], gradient:"from-cyan-500 to-blue-400" },
  { href:"/tools/gps-troubleshooter", emoji:"🔧", label:"Fix It", labelBg:"bg-orange-500", title:"GPS Not Working? Fix Guide", desc:"Lost signal, frozen screen, wrong directions — plain-English step fixes.", tags:["Garmin","TomTom","In-car"], gradient:"from-orange-500 to-amber-400" },
  { href:"/tools/gps-vs-phone-decider", emoji:"📱", label:"Compare", labelBg:"bg-violet-600", title:"GPS Device vs Phone Navigation", desc:"4 honest questions — do you need a GPS or is your phone enough?", tags:["GPS","Google Maps","Apple"], gradient:"from-violet-500 to-fuchsia-400" },
  { href:"/tools/gps-upgrade-decider", emoji:"🆙", label:"Upgrade?", labelBg:"bg-amber-600", title:"Should I Upgrade My GPS?", desc:"4 questions about your GPS — get a clear keep-or-replace verdict.", tags:["Age","Cost","Features"], gradient:"from-amber-500 to-orange-400" }
];
const ISSUES: [string, string, string][] = [
  ["🔄","Update Maps","Learn exactly how to update Garmin or TomTom maps — Wi-Fi or Garmin Express."],
  ["🧊","Frozen Screen","Understand what causes GPS freezes and the simple steps to resolve them."],
  ["✅","Wrong Directions","Why GPS gives wrong routes — and how to make sure yours is accurate."],
  ["📍","Plan a Route","Multi-stop route planning and getting the most from your GPS features."]
];
const STATS: [string,string][] = [
  ["72%","of GPS users have never updated their maps"],
  ["5 min","to update Garmin GPS via Wi-Fi"],
  ["Free","lifetime maps on most Garmin LMT models"]
];

function LeadForm() {
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({ });
  const [status, setStatus] = useState<"idle"|"loading"|"done">("idle");
  const validate = () => {
    const e: Record<string,string> = { };
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const submit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      await fetch("/api/leads", {
        method:"POST", headers:{"Content-Type":"application/json"},
        body:JSON.stringify({ name, email, phone, issue:"gps-page landing page guide request", source:"gps-page-cta" }),
      });
    } catch (e) { console.error("[lead] error:", e); }
    setStatus("done");
  };
  if (status === "done") return (
    <motion.div initial={{opacity:0,scale:0.92}} animate={{opacity:1,scale:1}} className="text-center py-10">
      <motion.div initial={{scale:0}} animate={{scale:1}} transition={{type:"spring",stiffness:300,delay:0.1}}
        className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-5 shadow-2xl shadow-green-500/30">
        <CheckCircle2 size={36} className="text-white" />
      </motion.div>
      <h3 className="text-2xl font-black text-white mb-2">You&#39;re all set, {name}!</h3>
      <p className="text-zinc-400 font-medium">We&#39;ll be in touch within 24 hours.</p>
    </motion.div>
  );
  return (
    <div className="space-y-5">
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Your Name *</label>
        <div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Margaret"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" style={{borderColor:errors.name?"#ef4444":undefined}} />
        </div>
        {errors.name && <p className="text-red-400 text-sm mt-1.5 font-semibold ml-1">{errors.name}</p>}
      </div>
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Email Address *</label>
        <div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="your@email.com"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" />
        </div>
        {errors.email && <p className="text-red-400 text-sm mt-1.5 font-semibold ml-1">{errors.email}</p>}
      </div>
      <div>
        <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">Phone <span className="text-zinc-600 normal-case font-normal">(optional)</span></label>
        <div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="tel" value={phone} onChange={e=>setPhone(e.target.value)} placeholder="(555) 000-0000"
            className="w-full pl-11 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-white text-lg placeholder:text-zinc-600 font-medium outline-none transition-colors" />
        </div>
      </div>
      <motion.button onClick={submit} disabled={status==="loading"} whileHover={{scale:1.02}} whileTap={{scale:0.98}}
        className="w-full py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-green-900/40 mt-2">
        {status==="loading" ? <Loader2 size={22} className="animate-spin" /> : <><Zap size={20} /> Get My Free Guide</>}
      </motion.button>
      <p className="text-center text-zinc-600 text-sm font-medium">No spam · Unsubscribe anytime · 100% free</p>
    </div>
  );
}

function ToolCard({ tool, i }: { tool: Tool; i: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once:true, margin:"-50px" });
  return (
    <motion.div ref={ref} initial={{opacity:0,y:36}} animate={inView?{opacity:1,y:0}:{}}
      transition={{duration:0.5,delay:i*0.07,ease:[0.22,1,0.36,1]}} whileHover={{y:-6}}>
      <Link href={tool.href} className="block h-full">
        <div className="h-full bg-zinc-900 border border-zinc-800 hover:border-zinc-600 rounded-3xl overflow-hidden transition-all duration-300 shadow-md hover:shadow-xl hover:shadow-black/40 group">
          <div className={`h-1.5 w-full bg-gradient-to-r ${tool.gradient}`} />
          <div className="p-7">
            <div className="flex items-start justify-between mb-5">
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${tool.gradient} flex items-center justify-center text-2xl shadow-lg`}>{tool.emoji}</div>
              <span className={`${tool.labelBg} text-white text-xs font-black px-3 py-1.5 rounded-full`}>{tool.label}</span>
            </div>
            <h3 className="text-xl font-black text-white mb-3 leading-snug group-hover:text-blue-300 transition-colors">{tool.title}</h3>
            <p className="text-zinc-400 text-[15px] leading-relaxed mb-5">{tool.desc}</p>
            <div className="flex flex-wrap gap-2 mb-5">
              {tool.tags.map(t=><span key={t} className="text-xs font-semibold px-3 py-1 rounded-full bg-zinc-800 text-zinc-400 border border-zinc-700">{t}</span>)}
            </div>
            <div className="flex items-center gap-2 text-sm font-black text-blue-400 group-hover:gap-3 transition-all">Try Free <ArrowRight size={14} /></div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
}


const GPSSIMULATOR_SCENES = [
  { id: "satellite", title: "Satellites orbit above you", emoji: "🛰️", desc: "24+ GPS satellites constantly broadcast signals toward Earth", duration: 4000, color: "#16a34a", elements: { satellite: true, signal: false, device: false, map: false, route: false, arrive: false } },
  { id: "signal", title: "Your GPS picks up the signal", emoji: "📡", desc: "Your device listens to at least 4 satellites to pinpoint your location", duration: 4000, color: "#06b6d4", elements: { satellite: true, signal: true, device: false, map: false, route: false, arrive: false } },
  { id: "device", title: "Device calculates position", emoji: "📍", desc: "By measuring signal timing, your GPS knows exactly where you are", duration: 4000, color: "#8b5cf6", elements: { satellite: true, signal: true, device: true, map: false, route: false, arrive: false } },
  { id: "map", title: "Map data loads on screen", emoji: "🗺️", desc: "Pre-loaded maps show roads, landmarks, and points of interest", duration: 4000, color: "#16a34a", elements: { satellite: false, signal: false, device: true, map: true, route: false, arrive: false } },
  { id: "route", title: "Route is calculated", emoji: "🛣️", desc: "The GPS finds the best path considering distance and traffic", duration: 5000, color: "#f59e0b", elements: { satellite: false, signal: false, device: true, map: true, route: true, arrive: false } },
  { id: "navigate", title: "Turn-by-turn directions begin", emoji: "🔊", desc: "Voice and screen guide you at every turn", duration: 5000, color: "#06b6d4", elements: { satellite: false, signal: false, device: true, map: true, route: true, arrive: false } },
  { id: "arrive", title: "You have arrived! ✅", emoji: "🎉", desc: 'The GPS confirms your destination. Door to door guidance complete.', duration: 4000, color: "#22c55e", elements: { satellite: false, signal: false, device: true, map: true, route: true, arrive: true } },
];

function GpsSimulator() {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const simRef = useRef<HTMLDivElement>(null);
  const isVisible = useInView(simRef, { once: true, margin: "-100px" });

  const scene = GPSSIMULATOR_SCENES[sceneIdx];
  const progress = ((sceneIdx + 1) / GPSSIMULATOR_SCENES.length) * 100;

  useEffect(() => {
    if (!isPlaying) return;
    const timer = setTimeout(() => {
      if (sceneIdx < GPSSIMULATOR_SCENES.length - 1) {
        setSceneIdx(s => s + 1);
      } else {
        setIsPlaying(false);
      }
    }, scene.duration);
    return () => clearTimeout(timer);
  }, [sceneIdx, isPlaying, scene.duration]);

  return (
    <section ref={simRef} className="py-20 border-b border-zinc-800/50 bg-zinc-950/60 overflow-hidden">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3">See How GPS Navigation Works</h2>
          <p className="text-zinc-400 text-lg">30-second animated walkthrough — tap Play to begin</p>
        </motion.div>

        <motion.div initial={{opacity:0,scale:0.95}} animate={isVisible ? {opacity:1,scale:1} : {}}
          transition={{duration:0.8}} className="relative max-w-4xl mx-auto">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full blur-[100px]"
            style={{ backgroundColor: `${scene.color}12`, transition: "background-color 1s" }} />
          <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
            <div className="flex items-center gap-2 mb-6">
              <div className="w-3 h-3 rounded-full bg-red-500/80" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
              <div className="w-3 h-3 rounded-full bg-green-500/80" />
              <span className="ml-3 text-xs text-zinc-500 font-bold">See How GPS Navigation Works</span>
            </div>
            <div className="w-full h-1 bg-zinc-800 rounded-full mb-8 overflow-hidden">
              <motion.div className="h-full rounded-full"
                style={{ backgroundColor: scene.color, transition: "background-color 0.5s" }}
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.5 }} />
            </div>
            <div className="relative h-[220px] md:h-[260px] mb-8">
              
              {"/* Satellite */"}
              <motion.div
                className="absolute left-[3%] top-[35%] flex flex-col items-center"
                animate={{ opacity: scene.elements.satellite ? 1 : 0.15, scale: scene.elements.satellite ? 1 : 0.85 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center"
                  style={{ borderColor: scene.elements.satellite ? scene.color : "#374151", backgroundColor: scene.elements.satellite ? `${scene.color}15` : "#1e293b", transition: "all 0.6s" }}>
                  <span className="text-2xl md:text-3xl">🛰️</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-bold mt-2">Satellite</span>
                {scene.elements.satellite && (
                  <motion.div className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: scene.color }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1, repeat: Infinity }} />
                )}
              </motion.div>
              {"/* Signal */"}
              <motion.div
                className="absolute left-[22%] top-[35%] flex flex-col items-center"
                animate={{ opacity: scene.elements.signal ? 1 : 0.15, scale: scene.elements.signal ? 1 : 0.85 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center"
                  style={{ borderColor: scene.elements.signal ? scene.color : "#374151", backgroundColor: scene.elements.signal ? `${scene.color}15` : "#1e293b", transition: "all 0.6s" }}>
                  <span className="text-2xl md:text-3xl">📡</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-bold mt-2">Signal</span>
                {scene.elements.signal && (
                  <motion.div className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: scene.color }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1, repeat: Infinity }} />
                )}
              </motion.div>
              {"/* GPS Device */"}
              <motion.div
                className="absolute left-[41%] top-[35%] flex flex-col items-center"
                animate={{ opacity: scene.elements.device ? 1 : 0.15, scale: scene.elements.device ? 1 : 0.85 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center"
                  style={{ borderColor: scene.elements.device ? scene.color : "#374151", backgroundColor: scene.elements.device ? `${scene.color}15` : "#1e293b", transition: "all 0.6s" }}>
                  <span className="text-2xl md:text-3xl">📱</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-bold mt-2">GPS Device</span>
                {scene.elements.device && (
                  <motion.div className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: scene.color }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1, repeat: Infinity }} />
                )}
              </motion.div>
              {"/* Map */"}
              <motion.div
                className="absolute left-[60%] top-[35%] flex flex-col items-center"
                animate={{ opacity: scene.elements.map ? 1 : 0.15, scale: scene.elements.map ? 1 : 0.85 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center"
                  style={{ borderColor: scene.elements.map ? scene.color : "#374151", backgroundColor: scene.elements.map ? `${scene.color}15` : "#1e293b", transition: "all 0.6s" }}>
                  <span className="text-2xl md:text-3xl">🗺️</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-bold mt-2">Map</span>
                {scene.elements.map && (
                  <motion.div className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: scene.color }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1, repeat: Infinity }} />
                )}
              </motion.div>
              {"/* Route */"}
              <motion.div
                className="absolute left-[79%] top-[35%] flex flex-col items-center"
                animate={{ opacity: scene.elements.route ? 1 : 0.15, scale: scene.elements.route ? 1 : 0.85 }}
                transition={{ duration: 0.6 }}
              >
                <div className="w-16 h-16 md:w-20 md:h-20 rounded-2xl border-2 flex items-center justify-center"
                  style={{ borderColor: scene.elements.route ? scene.color : "#374151", backgroundColor: scene.elements.route ? `${scene.color}15` : "#1e293b", transition: "all 0.6s" }}>
                  <span className="text-2xl md:text-3xl">🛣️</span>
                </div>
                <span className="text-[11px] text-zinc-500 font-bold mt-2">Route</span>
                {scene.elements.route && (
                  <motion.div className="absolute -top-1 -right-1 w-3 h-3 rounded-full"
                    style={{ backgroundColor: scene.color }}
                    animate={{ scale: [1, 1.4, 1] }}
                    transition={{ duration: 1, repeat: Infinity }} />
                )}
              </motion.div>
              
              {scene.elements.satellite && scene.elements.signal && (
                <div className="absolute top-[42%]" style={{ left: "16%" }}>
                  {[0,1,2].map(j => (
                    <motion.div key={j} className="absolute w-2 h-2 rounded-full"
                      style={{ backgroundColor: scene.color }}
                      animate={{ x: [0, 27], opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: j * 0.3 }} />
                  ))}
                </div>
              )}
              {scene.elements.signal && scene.elements.device && (
                <div className="absolute top-[42%]" style={{ left: "35%" }}>
                  {[0,1,2].map(j => (
                    <motion.div key={j} className="absolute w-2 h-2 rounded-full"
                      style={{ backgroundColor: scene.color }}
                      animate={{ x: [0, 27], opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: j * 0.3 }} />
                  ))}
                </div>
              )}
              {scene.elements.device && scene.elements.map && (
                <div className="absolute top-[42%]" style={{ left: "54%" }}>
                  {[0,1,2].map(j => (
                    <motion.div key={j} className="absolute w-2 h-2 rounded-full"
                      style={{ backgroundColor: scene.color }}
                      animate={{ x: [0, 27], opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: j * 0.3 }} />
                  ))}
                </div>
              )}
              {scene.elements.map && scene.elements.route && (
                <div className="absolute top-[42%]" style={{ left: "73%" }}>
                  {[0,1,2].map(j => (
                    <motion.div key={j} className="absolute w-2 h-2 rounded-full"
                      style={{ backgroundColor: scene.color }}
                      animate={{ x: [0, 27], opacity: [0, 1, 0] }}
                      transition={{ duration: 1, repeat: Infinity, delay: j * 0.3 }} />
                  ))}
                </div>
              )}
            </div>
            <motion.div key={`info-${sceneIdx}`} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }} className="text-center mb-6">
              <div className="inline-flex items-center gap-3 mb-3">
                <span className="text-3xl">{scene.emoji}</span>
                <h3 className="text-xl md:text-2xl font-black text-white">{scene.title}</h3>
              </div>
              <p className="text-zinc-400 text-base max-w-lg mx-auto">{scene.desc}</p>
            </motion.div>
            <div className="flex justify-center gap-1.5 mb-6">
              {GPSSIMULATOR_SCENES.map((_: typeof scene, i: number) => (
                <button key={i} onClick={() => { setSceneIdx(i); setHasStarted(true); setIsPlaying(false); }}
                  className="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
                  style={{ width: i === sceneIdx ? "24px" : "8px", backgroundColor: i === sceneIdx ? scene.color : i < sceneIdx ? `${scene.color}60` : "rgba(255,255,255,0.1)" }} />
              ))}
            </div>
            <div className="flex justify-center gap-3">
              {!hasStarted ? (
                <button onClick={() => { setSceneIdx(0); setIsPlaying(true); setHasStarted(true); }}
                  className="px-8 py-3 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105"
                  style={{ backgroundColor: scene.color }}>▶ Play Simulation</button>
              ) : (
                <>
                  <button onClick={() => setIsPlaying(!isPlaying)}
                    className="px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105"
                    style={{ backgroundColor: scene.color }}>{isPlaying ? "⏸ Pause" : "▶ Resume"}</button>
                  <button onClick={() => { setSceneIdx(0); setIsPlaying(true); }}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-white/10 border border-white/10 flex items-center gap-2 hover:scale-105 hover:bg-white/15">🔄 Replay</button>
                  {sceneIdx < GPSSIMULATOR_SCENES.length - 1 && (
                    <button onClick={() => setSceneIdx(s => Math.min(s + 1, GPSSIMULATOR_SCENES.length - 1))}
                      className="px-6 py-3 rounded-xl font-bold text-white bg-white/10 border border-white/10 flex items-center gap-2 hover:scale-105 hover:bg-white/15">Skip →</button>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function PageClient() {
  const [frameIdx, setFrameIdx] = useState(0);
  // Auto-cycle frames every 4 seconds
  useEffect(() => {
    const t = setInterval(() => setFrameIdx(i => (i+1) % FRAMES.length), 4000);
    return () => clearInterval(t);
  }, []);

  const frame = FRAMES[frameIdx];

  return (
    <div className="min-h-screen text-white font-sans overflow-x-hidden" style={{backgroundColor:"#030a03"}}>
      <Navbar /><ScrollToTop />

      {/* HERO */}
      <section className="relative min-h-screen flex items-center pt-20 pb-16 overflow-hidden">
        {/* ── Dynamic background that changes colour with each frame ── */}
        <div className="absolute inset-0">
          <motion.div className="absolute inset-0 pointer-events-none"
            key={`bg-${frameIdx}`}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1.2 }}
            style={{ background: `radial-gradient(ellipse at 30% 40%, ${frame.color}18 0%, #030a03 55%), radial-gradient(ellipse at 70% 60%, ${frame.color}10 0%, #030a03 55%)` }}
          />

          {/* Constellation nodes — colour follows frame */}
          {Array.from({ length: 10 }).map((_, i) => {
            const col = i % 4;
            const row = Math.floor(i / 4);
            const bx = 8 + col * 26 + (row % 2 === 1 ? 13 : 0);
            const by = 12 + row * 32;
            return (
              <motion.div key={`n-${i}`} className="absolute pointer-events-none"
                style={{ left: `${bx}%`, top: `${by}%` }}
                animate={{
                  x: [0, 12 * Math.sin(i * 0.9), -8 * Math.cos(i * 0.6), 0],
                  y: [0, -10 * Math.cos(i * 0.7), 6 * Math.sin(i * 0.8), 0],
                  opacity: [0.12, 0.3, 0.15, 0.12],
                }}
                transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.6 }}>
                <div className="w-2.5 h-2.5 rotate-45 rounded-sm"
                  style={{ background: `${frame.color}60`, boxShadow: `0 0 ${10 + i * 2}px ${frame.color}40`, transition: "background 1s, box-shadow 1s" }} />
                <motion.div className="absolute inset-[-8px] rounded-full border"
                  style={{ borderColor: `${frame.color}18` }}
                  animate={{ scale: [1, 2.5, 1], opacity: [0.3, 0, 0.3] }}
                  transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: i * 0.3 }} />
              </motion.div>
            );
          })}

          {/* Floating emoji particles — change with each frame */}
          {frame.particles.map((emoji: string, i: number) => (
            <motion.div
              key={`particle-${frameIdx}-${i}`}
              className="absolute text-2xl pointer-events-none select-none"
              style={{
                left: `${10 + (i * 16) % 80}%`,
                top: `${15 + (i * 23) % 60}%`,
              }}
              initial={{ opacity: 0, scale: 0, y: 20 }}
              animate={{
                opacity: [0, 0.6, 0.3, 0],
                scale: [0.5, 1.2, 1, 0.5],
                y: [20, -30 - i * 10, -60, -90],
                x: [0, (i % 2 === 0 ? 15 : -15), (i % 2 === 0 ? -10 : 10), 0],
              }}
              transition={{
                duration: 3.5,
                delay: i * 0.3,
                ease: "easeOut",
              }}
            >
              {emoji}
            </motion.div>
          ))}

          {/* Sweeping beam — colour shifts */}
          <motion.div className="absolute w-[180px] h-[150vh] -top-[25vh] pointer-events-none"
            style={{ background: `linear-gradient(90deg, transparent, ${frame.color}06, ${frame.color}04, transparent)`, transform: "rotate(15deg)", transition: "background 1s" }}
            animate={{ x: ["-200px", "120vw"] }}
            transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", repeatDelay: 4 }} />

          {/* Dot grid */}
          <div className="absolute inset-0 opacity-[0.025] pointer-events-none"
            style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div>
            <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.05}}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-black uppercase tracking-[0.14em] mb-8"
              style={{backgroundColor:frame.color+"15",borderColor:frame.color+"40",color:frame.color,transition:"all 1s"}}>
              GPS & NAVIGATION LEARNING GUIDE
            </motion.div>

            {/* Dynamic H1 — animated headline cycling */}
            <h1 className="font-black leading-[0.92] tracking-tighter mb-8 min-h-[10rem] md:min-h-[8rem]">
              <motion.span
                key={`h-${frameIdx}`}
                className="block text-5xl sm:text-6xl md:text-7xl"
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ type: "spring", stiffness: 80 }}
              >
                {frame.headline.split("\n").map((line: string, i: number) => (
                  <span key={i} className={`block ${
                    i > 0
                      ? ""
                      : "text-white"
                  }`}
                  style={i > 0 ? { background: `linear-gradient(to right, ${frame.color}, #06b6d4)`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", transition: "all 1s" } : undefined}>
                    {line}
                  </span>
                ))}
              </motion.span>
            </h1>

            {/* Animated subtitle with brand ticker */}
            <motion.div
              key={`sub-${frameIdx}`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="mb-3"
            >
              <div className="flex items-center gap-3 mb-2">
                <span className="text-3xl">{frame.emoji}</span>
                <div>
                  <p className="text-lg font-bold text-white">{frame.visualLabel}</p>
                  <p className="text-base text-zinc-400">{frame.visualSub}</p>
                </div>
              </div>
            </motion.div>

            {/* Frame indicator dots */}
            <div className="flex items-center gap-2 mb-10">
              {FRAMES.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setFrameIdx(i)}
                  className="h-1.5 rounded-full transition-all duration-500"
                  style={{
                    width: i === frameIdx ? "28px" : "8px",
                    backgroundColor: i === frameIdx ? frame.color : "rgba(255,255,255,0.15)",
                    transition: "all 0.5s",
                  }}
                />
              ))}
            </div>

            <motion.p className="text-sm text-zinc-500 mb-10 max-w-lg"
              initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.4}}>
              Plain English · No tech knowledge needed · Designed for adults 45+
            </motion.p>

            <motion.div className="flex flex-col sm:flex-row gap-4 mb-10"
              initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.5}}>
              <motion.a href="#learn" whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                className="px-9 py-5 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl"
                style={{ background: `linear-gradient(to right, ${frame.color}, #06b6d4)`, boxShadow: `0 20px 40px ${frame.color}30`, transition: "all 1s" }}>
                Start Learning Free <ArrowRight size={20} />
              </motion.a>
              <Link href="/contact">
                <motion.div whileHover={{scale:1.03}} whileTap={{scale:0.97}}
                  className="px-9 py-5 border-2 border-zinc-700 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 transition-colors cursor-pointer hover:border-blue-500">
                  Book a Live Lesson
                </motion.div>
              </Link>
            </motion.div>

            <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{delay:0.7}}
              className="flex flex-wrap items-center gap-5">
              <div className="flex items-center gap-1">
                {[1,2,3,4,5].map(s=><Star key={s} size={16} className="text-amber-400 fill-amber-400"/>)}
                <span className="text-zinc-400 text-sm font-medium ml-1">2,400+ learners</span>
              </div>
              <div className="flex items-center gap-2 text-green-400 text-sm font-bold"><Shield size={14}/>100% Free</div>
              <div className="flex items-center gap-2 text-zinc-400 text-sm"><CheckCircle2 size={14} style={{color:frame.color,transition:"color 1s"}}/>Plain English</div>
            </motion.div>
          </div>

          {/* Right: 3D Character — seamless, oversized */}
          <motion.div initial={{opacity:0,x:50,scale:0.95}} animate={{opacity:1,x:0,scale:1}}
            transition={{duration:1,delay:0.3,ease:"easeOut"}}
            className="hidden lg:block relative lg:overflow-visible">
            {/* Glow — colour shifts with frame */}
            <div className="absolute inset-0 -z-10">
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120%] h-[120%] rounded-full blur-[130px]" style={{backgroundColor:`${frame.color}22`,transition:"background-color 1s"}} />
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[70%] h-[70%] bg-cyan-400/12 rounded-full blur-[90px]" />
            </div>

            <div className="relative lg:scale-[1.4] lg:origin-center lg:translate-x-[10%] lg:-translate-y-[3%]">
              {/* Rotating rings — colour shifts */}
              <motion.div animate={{rotate:360}} transition={{duration:30,repeat:Infinity,ease:"linear"}}
                className="absolute inset-[-10%] rounded-full border" style={{borderColor:`${frame.color}18`,transition:"border-color 1s"}}>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 rounded-full" style={{backgroundColor:frame.color,boxShadow:`0 0 14px ${frame.color}90`,transition:"all 1s"}} />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2 h-2 bg-cyan-400 rounded-full shadow-[0_0_10px_rgba(6,182,212,0.5)]" />
              </motion.div>
              <motion.div animate={{rotate:-360}} transition={{duration:22,repeat:Infinity,ease:"linear"}}
                className="absolute inset-[-4%] rounded-full border border-cyan-500/10">
                <div className="absolute top-1/2 right-0 translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-indigo-400 rounded-full shadow-[0_0_10px_rgba(99,102,241,0.5)]" />
              </motion.div>

              {/* Character image */}
              <motion.div animate={{y:[0,-14,0]}} transition={{duration:5,repeat:Infinity,ease:"easeInOut"}}
                className="relative z-10">
                <div className="relative overflow-hidden">
                  <img src="/Images/hero-gps.png" alt="GPS navigation guide"
                    className="w-full h-auto"
                    style={{
                      maskImage:'radial-gradient(ellipse 80% 75% at 50% 42%, black 35%, transparent 100%)',
                      WebkitMaskImage:'radial-gradient(ellipse 80% 75% at 50% 42%, black 35%, transparent 100%)',
                    }} />
                </div>
              </motion.div>

              {/* Floating badges — emoji changes with frame */}
              {[
                {emoji: frame.particles[0], label:"Maps", pos:"top-[6%] left-[0%]", delay:0},
                {emoji: frame.particles[1], label:"Drive", pos:"top-[10%] right-[0%]", delay:0.5},
                {emoji: frame.particles[2], label:"Routes", pos:"bottom-[30%] left-[-2%]", delay:1},
                {emoji: frame.particles[3], label:"Update", pos:"bottom-[26%] right-[-2%]", delay:1.5},
              ].map((b,i)=>(
                <motion.div key={`badge-${frameIdx}-${i}`} initial={{opacity:0,scale:0}} animate={{opacity:1,scale:1}}
                  transition={{delay:0.3+b.delay,duration:0.5,type:"spring"}}
                  className={`absolute ${b.pos} z-20`}>
                  <motion.div animate={{y:[0,-8,0]}}
                    transition={{duration:3+i*0.5,repeat:Infinity,ease:"easeInOut",delay:b.delay}}
                    className="flex items-center gap-2 px-3 py-2 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.1] shadow-lg">
                    <span className="text-lg">{b.emoji}</span>
                    <span className="text-xs font-bold text-white/80 hidden sm:inline">{b.label}</span>
                  </motion.div>
                </motion.div>
              ))}

              {/* Speech bubble */}
              <motion.div initial={{opacity:0,y:10}} animate={{opacity:1,y:0}} transition={{delay:1.5,duration:0.5}}
                className="absolute top-[0%] left-1/2 -translate-x-1/2 z-30">
                <div className="px-4 py-2 text-white text-sm font-bold rounded-xl shadow-lg whitespace-nowrap"
                  style={{backgroundColor:frame.color,boxShadow:`0 10px 25px ${frame.color}40`,transition:"all 1s"}}>
                  Maps updated! 🗺️
                  <div className="absolute -bottom-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rotate-45" style={{backgroundColor:frame.color,transition:"all 1s"}} />
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* STATS */}
      <section className="py-14 border-y border-zinc-800/60 bg-zinc-950/70">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          {STATS.map((s,i)=>(
            <motion.div key={i} initial={{opacity:0,y:20}} whileInView={{opacity:1,y:0}} viewport={{once:true}} transition={{delay:i*0.1}}
              className="flex flex-col items-center md:items-start text-center md:text-left gap-2 p-6 rounded-2xl border border-zinc-800/50">
              <span className="text-4xl font-black tabular-nums" style={{color:ACCENT_HEX}}>{s[0]}</span>
              <span className="text-zinc-400 text-base leading-relaxed">{s[1]}</span>
            </motion.div>
          ))}
        </div>
      </section>

      
      {/* INTERACTIVE SIMULATOR */}
      <GpsSimulator />

      {/* TOPICS */}
      <section className="py-24 bg-zinc-950/50 border-y border-zinc-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-4">What You Will Learn</h2>
            <p className="text-zinc-400 text-lg">GPS questions answered in plain, calm English</p>
          </motion.div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {ISSUES.map((issue,i)=>(
              <motion.div key={i} initial={{opacity:0,y:40}} whileInView={{opacity:1,y:0}} viewport={{once:true}}
                transition={{delay:i*0.1}} whileHover={{y:-8,scale:1.02}}
                className="bg-zinc-900 border border-zinc-800 rounded-3xl p-8 transition-all duration-300 group"
                >
                <div className="text-5xl mb-6">{issue[0]}</div>
                <h3 className="text-xl font-black text-white mb-3 group-hover:text-blue-300 transition-colors">{issue[1]}</h3>
                <p className="text-zinc-400 text-[15px] leading-relaxed">{issue[2]}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <TechBridgeLearningHub
        topic="GPS" accentColor="from-green-600 to-emerald-500" accentHex="#16a34a"
        wizardConfig={WIZARD_CONFIG} aiProps={AI_PROPS}
      />

      {/* RELATED TOOLS */}
      <section id="tools" className="py-28 border-t border-zinc-800/50" style={{backgroundColor:"#030a03"}}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div initial={{opacity:0,y:30}} whileInView={{opacity:1,y:0}} viewport={{once:true}} className="text-center mb-16">
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-black uppercase tracking-widest mb-6"
              style={{backgroundColor:ACCENT_HEX+"15",borderColor:ACCENT_HEX+"30",color:ACCENT_HEX}}>
              <Zap size={14}/> 6 Free Interactive Tools
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-5 text-white">
              Free Tools — Pick Your Exact Problem
            </h2>
            <p className="text-zinc-400 text-xl max-w-2xl mx-auto leading-relaxed">
              Each tool gives you step-by-step guidance for your specific device and situation — not generic advice.
            </p>
          </motion.div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {TOOLS.map((tool,i)=><ToolCard key={tool.href} tool={tool} i={i} />)}
          </div>
          <div className="text-center">
            <Link href="/tools">
              <motion.div whileHover={{scale:1.03}}
                className="inline-flex items-center gap-3 px-10 py-5 border-2 border-zinc-700 text-white font-black text-lg rounded-2xl transition-colors cursor-pointer"
                style={{borderColor:"#3f3f46"}}
                onMouseEnter={e=>(e.currentTarget.style.borderColor=ACCENT_HEX)}
                onMouseLeave={e=>(e.currentTarget.style.borderColor="#3f3f46")}>
                See All 47 Free Tools <ChevronRight size={20}/>
              </motion.div>
            </Link>
          </div>
        </div>
      </section>

      {/* LEAD CAPTURE */}
      <section className="py-28 relative overflow-hidden border-t border-zinc-800/50">
        <motion.div className="absolute inset-0 pointer-events-none"
          animate={{background:[
            `radial-gradient(ellipse at 20% 50%, ${ACCENT_HEX}12 0%, #030a03 60%)`,
            `radial-gradient(ellipse at 80% 50%, ${ACCENT_HEX}08 0%, #030a03 60%)`,
          ]}} transition={{duration:6,repeat:Infinity,repeatType:"reverse"}} />
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <motion.div initial={{opacity:0,x:-30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-sm font-black uppercase tracking-widest mb-8"
              style={{backgroundColor:ACCENT_HEX+"15",borderColor:ACCENT_HEX+"30",color:ACCENT_HEX}}>
              <Zap size={14}/> Free Learning Guide
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">Get Your Free GPS Learning Guide</h2>
            <p className="text-zinc-300 text-xl leading-relaxed mb-10">We'll send you the complete GPS guide — map updates, fixing problems, planning routes, and getting the most from your device.</p>
            <div className="space-y-5">
              <motion.div key={0} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.0}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">🗺️</span><span className="text-zinc-300 text-lg leading-relaxed">How to update Garmin GPS maps step by step</span></motion.div>
              <motion.div key={1} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.1}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">🔧</span><span className="text-zinc-300 text-lg leading-relaxed">What to do when GPS gives wrong directions</span></motion.div>
              <motion.div key={2} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.2}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">📍</span><span className="text-zinc-300 text-lg leading-relaxed">How to plan multi-stop road trip routes</span></motion.div>
              <motion.div key={3} initial={{opacity:0,x:-20}} whileInView={{opacity:1,x:0}} viewport={{once:true}} transition={{delay:0.30000000000000004}} className="flex items-start gap-4"><span className="text-2xl flex-shrink-0 mt-0.5">✅</span><span className="text-zinc-300 text-lg leading-relaxed">Which GPS features are actually worth using</span></motion.div>
            </div>
          </motion.div>
          <motion.div initial={{opacity:0,x:30}} whileInView={{opacity:1,x:0}} viewport={{once:true}}>
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2.5rem] p-8 md:p-10 shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-1">Get Instant Access</h3>
              <p className="text-zinc-400 font-medium mb-8">Free — no credit card, no commitments.</p>
              <LeadForm />
            </div>
          </motion.div>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-20 border-t border-zinc-800/50 bg-zinc-950/40">
        <div className="max-w-3xl mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-black text-white mb-5 tracking-tight">Need help with your specific GPS device?</h2>
          <p className="text-zinc-400 text-xl leading-relaxed mb-10">Our live lesson sessions cover your exact GPS model and problem — one-on-one, at your own pace.</p>
          <Link href="/contact">
            <motion.div whileHover={{scale:1.03}}
              className="inline-flex items-center gap-3 px-10 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black text-xl rounded-2xl shadow-xl shadow-green-900/40 cursor-pointer">
              Book a Live GPS Lesson <ArrowRight size={22}/>
            </motion.div>
          </Link>
          <p className="mt-5 text-zinc-600 text-base">From $49 · No tech knowledge needed · Plain English</p>
        </div>
      </section>
      <Footer />
    </div>
  );
}
