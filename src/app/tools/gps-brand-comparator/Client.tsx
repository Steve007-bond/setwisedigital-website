"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, Star, ArrowRight, XCircle, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const BRANDS = [
  {
    id: "garmin",
    name: "Garmin",
    emoji: "🔵",
    tagline: "Market leader in North America",
    type: "dedicated",
    price: "$89 – $349",
    badge: "Most Popular in North America",
    badgeColor: "bg-blue-600",
    color: "from-blue-500 to-indigo-400",
    border: "border-blue-700",
    bg: "bg-blue-900/20",
    text: "text-blue-300",
    scores: { easeOfUse: 9, mapAccuracy: 9, trafficUpdates: 7, offlineUse: 10, voiceControl: 8, screenClarity: 9, northAmericaCoverage: 10, updateCost: 8, overallValue: 9 },
    pros: ["Clearest, simplest menus in the industry", "Most accurate maps for North America and Canada", "Works perfectly with zero cell signal — fully offline", "No monthly subscriptions for car GPS models", "Widest product range: car, RV, outdoor, marine", "Lifetime free map updates on most models"],
    cons: ["Live traffic needs a smartphone connection on most models", "Smaller screen selection vs TomTom on entry models", "No world maps on entry-level — North America only"],
    bestFor: ["Rural and remote drivers", "Road trippers across North America", "Drivers who don't want any subscriptions", "Seniors who want a simple, dedicated screen"],
    verdict: "Garmin is the best choice for most North American drivers who want reliable, offline navigation without subscriptions. The clearest menus, most accurate local maps, and no ongoing costs.",
    updateModel: "Free lifetime map updates via Wi-Fi (most models)",
  },
  {
    id: "tomtom",
    name: "TomTom",
    emoji: "🔴",
    tagline: "Strong in Europe, available in North America",
    type: "dedicated",
    price: "$129 – $279",
    badge: "Best for Europe & International",
    badgeColor: "bg-red-600",
    color: "from-red-500 to-rose-400",
    border: "border-red-700",
    bg: "bg-red-900/20",
    text: "text-red-300",
    scores: { easeOfUse: 7, mapAccuracy: 8, trafficUpdates: 9, offlineUse: 10, voiceControl: 7, screenClarity: 8, northAmericaCoverage: 8, updateCost: 8, overallValue: 7 },
    pros: ["Excellent real-time traffic rerouting — often faster than Garmin", "Free lifetime map updates via Wi-Fi", "World maps included on GO Supreme and GO Discover", "No smartphone needed for traffic (built-in SIM on premium models)", "Good choice if you travel internationally"],
    cons: ["Less dominant in North America — harder to find in stores", "Busier screen interface than Garmin — can feel cluttered", "Fewer product tiers available than Garmin", "Voice control not on base models"],
    bestFor: ["Drivers who travel to Europe", "Those who want built-in live traffic without a phone", "Drivers who prefer European-style interfaces"],
    verdict: "TomTom is a strong choice — especially for international travelers and those who want built-in traffic without relying on their phone. Less widely available in North America than Garmin.",
    updateModel: "Free lifetime maps via Wi-Fi. No ongoing map subscription needed.",
  },
  {
    id: "google-maps",
    name: "Google Maps",
    emoji: "🗺️",
    tagline: "The world's most used navigation app",
    type: "phone-app",
    price: "Free",
    badge: "Best Free Navigation App",
    badgeColor: "bg-green-600",
    color: "from-green-500 to-emerald-400",
    border: "border-green-700",
    bg: "bg-green-900/20",
    text: "text-green-300",
    scores: { easeOfUse: 8, mapAccuracy: 9, trafficUpdates: 10, offlineUse: 6, voiceControl: 8, screenClarity: 7, northAmericaCoverage: 10, updateCost: 10, overallValue: 10 },
    pros: ["Completely free — always", "Best real-time traffic of any navigation tool available", "Maps updated continuously — always current", "Download areas for offline use before a trip", "Street View for previewing unfamiliar destinations", "Works on any Android or iPhone"],
    cons: ["Needs cell signal for live features — goes grey in dead zones", "Calls and texts can interrupt navigation", "Drains phone battery during long drives", "Small phone screen vs dedicated GPS unit"],
    bestFor: ["City and suburban drivers with good signal", "Everyday commuters", "Anyone who doesn't want to buy a separate device", "Drivers who want free, always-updated maps"],
    verdict: "Google Maps is the best navigation tool for most city and suburban drivers. Free, always updated, brilliant traffic. Its only real limit is relying on cell signal — a dedicated GPS wins in rural areas.",
    updateModel: "Constantly updated for free — no action needed from you.",
  },
  {
    id: "apple-maps",
    name: "Apple Maps",
    emoji: "🍎",
    tagline: "Best for iPhone users — improving fast",
    type: "phone-app",
    price: "Free (iPhone only)",
    badge: "Best for iPhone Users",
    badgeColor: "bg-zinc-600",
    color: "from-zinc-500 to-zinc-400",
    border: "border-zinc-600",
    bg: "bg-zinc-800/50",
    text: "text-zinc-300",
    scores: { easeOfUse: 9, mapAccuracy: 8, trafficUpdates: 8, offlineUse: 5, voiceControl: 9, screenClarity: 8, northAmericaCoverage: 9, updateCost: 10, overallValue: 8 },
    pros: ["Deep iPhone integration — hands-free with Siri", "Privacy-focused — less data collection than Google", "Clean, uncluttered interface", "Strong Siri voice control", "Works with Apple Watch and CarPlay seamlessly", "Improved dramatically since 2020"],
    cons: ["iPhone only — no Android version", "Less detailed than Google Maps in some rural areas", "Fewer offline map download options", "Business listings less comprehensive in smaller towns"],
    bestFor: ["iPhone users who want seamless Siri navigation", "Privacy-conscious drivers", "Apple CarPlay users", "Drivers already in the Apple ecosystem"],
    verdict: "Apple Maps has improved significantly and is now an excellent choice for iPhone users — especially with Siri and CarPlay integration. Still slightly behind Google Maps for rural coverage and offline use.",
    updateModel: "Automatically updated for free as part of iOS.",
  },
  {
    id: "waze",
    name: "Waze",
    emoji: "🚗",
    tagline: "Community-powered — best for busy roads",
    type: "phone-app",
    price: "Free",
    badge: "Best for Traffic & Hazards",
    badgeColor: "bg-cyan-600",
    color: "from-cyan-500 to-blue-400",
    border: "border-cyan-700",
    bg: "bg-cyan-900/20",
    text: "text-cyan-300",
    scores: { easeOfUse: 7, mapAccuracy: 8, trafficUpdates: 10, offlineUse: 3, voiceControl: 7, screenClarity: 7, northAmericaCoverage: 9, updateCost: 10, overallValue: 8 },
    pros: ["Best hazard alerts: speed traps, accidents, road debris, potholes", "Community-reported information updates in real time", "Excellent for commuters on familiar routes", "Free forever", "Road closure and construction alerts"],
    cons: ["Needs constant internet — no offline maps at all", "Busy interface with lots of icons on screen", "Owned by Google — privacy same as Google Maps", "Less useful in rural or remote areas", "Can suggest unusual shortcuts through neighbourhoods"],
    bestFor: ["Daily commuters who drive the same roads", "Highway drivers wanting traffic and hazard alerts", "City drivers in congested areas"],
    verdict: "Waze is the king of real-time hazard alerts — ideal for daily commuters who want to know about speed traps, accidents, and road works before they reach them. Not suitable for rural driving.",
    updateModel: "Community-updated continuously. Always free.",
  },
];

const CATEGORIES = [
  { id:"easeOfUse", label:"Ease of Use", icon:"😊", desc:"How simple it is to use day-to-day" },
  { id:"mapAccuracy", label:"Map Accuracy", icon:"🎯", desc:"How accurate and up-to-date the maps are" },
  { id:"trafficUpdates", label:"Live Traffic", icon:"🚦", desc:"Real-time traffic and rerouting quality" },
  { id:"offlineUse", label:"Works Without Signal", icon:"📵", desc:"Reliability in rural areas and dead zones" },
  { id:"voiceControl", label:"Voice Control", icon:"🎤", desc:"Hands-free operation quality" },
  { id:"northAmericaCoverage", label:"North America Coverage", icon:"🌎", desc:"Map quality across USA and Canada" },
  { id:"updateCost", label:"Running Cost", icon:"💰", desc:"Ongoing cost after purchase (10 = free forever)" },
];

export default function Client() {
  const [selected, setSelected] = useState<string[]>([]);
  const [stage, setStage] = useState<"pick"|"compare">("pick");
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const toggle = (id: string) => {
    setSelected(prev => prev.includes(id) ? prev.filter(s => s !== id) : prev.length < 2 ? [...prev, id] : prev);
  };

  const brandA = BRANDS.find(b => b.id === selected[0]);
  const brandB = BRANDS.find(b => b.id === selected[1]);

  const getWinner = (cat: string) => {
    if (!brandA || !brandB) return null;
    const scoreA = brandA.scores[cat as keyof typeof brandA.scores];
    const scoreB = brandB.scores[cat as keyof typeof brandB.scores];
    if (scoreA > scoreB) return selected[0];
    if (scoreB > scoreA) return selected[1];
    return "tie";
  };

  const overallWinner = () => {
    if (!brandA || !brandB) return null;
    const totalA = Object.values(brandA.scores).reduce((a,b)=>a+b,0);
    const totalB = Object.values(brandB.scores).reduce((a,b)=>a+b,0);
    return totalA >= totalB ? brandA : brandB;
  };

  const validate = () => { const e: Record<string,string>={};if(!name.trim())e.name="Please enter your name";if(!email.trim()||!email.includes("@"))e.email="Please enter a valid email";setErrors(e);return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate())return;setSubmitting(true);
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email, phone,issue:`Brand Compare — ${selected.join(" vs ")}`,source:"gps-brand-comparator"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setSelected([]);setStage("pick");setName("");setEmail("");setSubmitted(false);};

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">GPS Brand Comparator</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free · Pick Any Two · Instant Comparison
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Garmin vs TomTom</span>
            <span className="block bg-gradient-to-r from-blue-400 via-cyan-300 to-green-400 bg-clip-text text-transparent italic">vs Google Maps</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Pick any two navigation options and get a plain-English, side-by-side comparison — maps, traffic, offline use, voice control, and running cost. No jargon, no brand bias.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {stage === "pick" && (
            <motion.div key="pick" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-6">
              <div className="text-center">
                <h2 className="text-3xl font-black text-white mb-3">Pick any two to compare ⚔️</h2>
                <p className="text-zinc-400 text-lg">{selected.length === 0 ? "Select your first option" : selected.length === 1 ? "Now pick the second one to compare" : "Ready to compare — scroll down"}</p>
              </div>

              {/* Brand selection grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {BRANDS.map((brand, i) => {
                  const isSelected = selected.includes(brand.id);
                  const isDisabled = !isSelected && selected.length >= 2;
                  const selIndex = selected.indexOf(brand.id);
                  return (
                    <motion.button key={brand.id} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.07*i}} whileTap={{scale:0.97}}
                      onClick={() => !isDisabled && toggle(brand.id)} disabled={isDisabled}
                      className={`relative p-6 rounded-[2rem] border-2 text-left transition-all duration-200 ${isSelected ? `${brand.border} ${brand.bg} shadow-xl` : isDisabled ? "border-zinc-800 bg-zinc-900/50 opacity-40 cursor-not-allowed" : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}>
                      {isSelected && (
                        <motion.div initial={{scale:0}} animate={{scale:1}} className={`absolute top-4 right-4 w-8 h-8 rounded-full flex items-center justify-center text-white font-black text-sm bg-gradient-to-br ${brand.color}`}>
                          {selIndex + 1}
                        </motion.div>
                      )}
                      <div className="text-4xl mb-4">{brand.emoji}</div>
                      <div className="font-black text-white text-xl mb-1">{brand.name}</div>
                      <div className={`text-sm font-bold mb-3 ${isSelected ? brand.text : "text-zinc-500"}`}>{brand.tagline}</div>
                      <div className="flex items-center justify-between">
                        <span className={`text-xs font-black text-white px-2.5 py-1.5 rounded-full ${brand.badgeColor || "bg-blue-600"}`}>{brand.badge}</span>
                        <span className="font-black text-white text-base">{brand.price}</span>
                      </div>
                    </motion.button>
                  );
                })}
              </div>

              {selected.length === 2 && (
                <motion.button initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} whileHover={{scale:1.02}} whileTap={{scale:0.98}}
                  onClick={() => setStage("compare")}
                  className="w-full py-6 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-2xl shadow-blue-500/30">
                  Compare {BRANDS.find(b=>b.id===selected[0])?.name} vs {BRANDS.find(b=>b.id===selected[1])?.name} <ArrowRight size={24}/>
                </motion.button>
              )}
            </motion.div>
          )}

          {stage === "compare" && brandA && brandB && (
            <motion.div key="compare" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-6">
              <div className="flex items-center justify-between">
                <button onClick={() => setStage("pick")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors">← Change Selection</button>
                <button onClick={reset} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors"><RefreshCw size={14}/> Start Over</button>
              </div>

              {/* Head to head header */}
              <div className="grid grid-cols-2 gap-4">
                {[brandA, brandB].map((brand, i) => (
                  <div key={brand.id} className={`rounded-[2rem] border-2 ${brand.border} ${brand.bg} p-6`}>
                    <div className="text-5xl mb-3">{brand.emoji}</div>
                    <h3 className="text-2xl font-black text-white mb-1">{brand.name}</h3>
                    <div className={`text-sm font-bold ${brand.text} mb-3`}>{brand.tagline}</div>
                    <div className="text-xl font-black text-white">{brand.price}</div>
                  </div>
                ))}
              </div>

              {/* Category scores */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-indigo-400"/>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-white mb-6">Head-to-Head Breakdown</h3>
                  <div className="space-y-4">
                    {CATEGORIES.map((cat, i) => {
                      const winner = getWinner(cat.id);
                      const scoreA = brandA.scores[cat.id as keyof typeof brandA.scores];
                      const scoreB = brandB.scores[cat.id as keyof typeof brandB.scores];
                      return (
                        <motion.div key={cat.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.07*i}}>
                          <div className="flex items-center gap-2 mb-2">
                            <span className="text-xl">{cat.icon}</span>
                            <span className="font-black text-white text-base">{cat.label}</span>
                            <span className="text-zinc-400 text-xs">— {cat.desc}</span>
                            {winner === "tie" && <span className="text-xs font-black text-zinc-400 ml-auto">Tied</span>}
                            {winner !== "tie" && <span className={`text-xs font-black ml-auto ${winner === selected[0] ? brandA.text : brandB.text}`}>
                              {winner === selected[0] ? `${brandA.name} wins` : `${brandB.name} wins`}
                            </span>}
                          </div>
                          <div className="grid grid-cols-2 gap-2">
                            {[{brand:brandA, score:scoreA, id:selected[0]},{brand:brandB, score:scoreB, id:selected[1]}].map(item => (
                              <div key={item.id}>
                                <div className="flex items-center justify-between mb-1">
                                  <span className="text-xs text-zinc-400 font-medium">{item.brand.name}</span>
                                  <span className={`text-sm font-black ${winner === item.id ? item.brand.text : "text-zinc-500"}`}>{item.score}/10</span>
                                </div>
                                <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                                  <motion.div initial={{width:0}} animate={{width:`${item.score*10}%`}} transition={{duration:0.8,delay:0.05*i}}
                                    className={`h-full rounded-full bg-gradient-to-r ${item.brand.color} ${winner !== item.id && winner !== "tie" ? "opacity-40" : ""}`}/>
                                </div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>
                </div>
              </div>

              {/* Pros & Cons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {[brandA, brandB].map(brand => (
                  <div key={brand.id} className={`bg-zinc-900 rounded-[2rem] border-2 ${brand.border} overflow-hidden`}>
                    <div className={`h-1.5 bg-gradient-to-r ${brand.color}`}/>
                    <div className="p-7">
                      <div className="text-3xl mb-3">{brand.emoji}</div>
                      <h3 className="text-xl font-black text-white mb-5">{brand.name}</h3>
                      <div className="space-y-2 mb-5">
                        <div className="text-xs font-black text-green-400 uppercase tracking-widest mb-2">✓ Strengths</div>
                        {brand.pros.map(p=>(<div key={p} className="flex items-start gap-2 text-sm text-zinc-300 font-medium"><CheckCircle2 size={13} className="text-green-400 shrink-0 mt-0.5"/>{p}</div>))}
                      </div>
                      <div className="space-y-2 mb-5">
                        <div className="text-xs font-black text-red-400 uppercase tracking-widest mb-2">✗ Limitations</div>
                        {brand.cons.map(c=>(<div key={c} className="flex items-start gap-2 text-sm text-zinc-400 font-medium"><XCircle size={13} className="text-red-400 shrink-0 mt-0.5"/>{c}</div>))}
                      </div>
                      <div className={`p-4 rounded-xl ${brand.bg} border ${brand.border}`}>
                        <div className={`text-xs font-black uppercase tracking-widest mb-1 ${brand.text}`}>Map Updates</div>
                        <p className="text-sm text-zinc-300 font-medium">{brand.updateModel}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Overall verdict */}
              {(() => { const winner = overallWinner(); if (!winner) return null; return (
                <div className={`rounded-[2rem] border-2 ${winner.border} ${winner.bg} p-8`}>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-gradient-to-br from-amber-400 to-orange-500 rounded-full flex items-center justify-center"><Star size={18} className="text-white fill-white"/></div>
                    <span className="font-black text-amber-400 uppercase tracking-widest text-sm">Overall Verdict for North American Drivers</span>
                  </div>
                  <div className="text-5xl mb-4">{winner.emoji}</div>
                  <h3 className="text-2xl font-black text-white mb-3">{winner.name} edges ahead for most drivers</h3>
                  <p className="text-zinc-300 text-lg font-medium leading-relaxed mb-4">{winner.verdict}</p>
                  <div className="space-y-2">
                    <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">Best suited for:</div>
                    {winner.bestFor.map(f=>(<div key={f} className="flex items-center gap-2 text-base text-zinc-300 font-medium"><CheckCircle2 size={15} className="text-green-400 shrink-0"/>{f}</div>))}
                  </div>
                </div>
              );})()}

              {/* Lead */}
              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Save this comparison 📧</h3>
                  <p className="text-zinc-400 text-base mb-5">Get the full {brandA.name} vs {brandB.name} breakdown sent to your inbox.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Send My Comparison"}</motion.button>
                </div>
              ) : (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="font-bold text-green-300">Comparison sent to {email}!</p></div>)}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={() => setStage("pick")} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20}/>Compare Different Brands</button>
                <Link href="/tools/gps-budget-finder"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS Budget Finder</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with Garmin, TomTom, Google, Apple, or Waze. Scores reflect general user experience for North American drivers and are for guidance only.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
