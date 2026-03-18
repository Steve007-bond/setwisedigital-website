"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, Star, ArrowRight, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1494783367193-149034c05e8f?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const BUDGET_TIERS = [
  {
    id:"under100",
    label:"Under $100",
    min:0, max:99,
    emoji:"💵",
    tagline:"Entry level — reliable basics",
    color:"from-green-500 to-emerald-400",
    border:"border-green-700",
    bg:"bg-green-900/20",
    text:"text-green-300",
    summary:"At under $100, you'll find solid entry-level GPS devices from Garmin and TomTom. Don't expect live traffic or Bluetooth, but you'll get reliable turn-by-turn navigation that works everywhere without cell signal.",
    youGet:["Turn-by-turn voice directions","Speed limit alerts","Basic maps of North America","5-inch touchscreen","No monthly fees, ever"],
    youMiss:["Live traffic updates","Bluetooth hands-free calling","Wi-Fi map updates","Lane guidance on highways","Large 6-7 inch screen"],
    devices:[
      { name:"Garmin Drive 53", price:"$89–$109", screen:"5 inch", badge:"Best Pick Under $100", badgeColor:"bg-green-600", desc:"Garmin's most reliable entry-level unit. Simple menus, clear directions, speed alerts. Does exactly what you need — nothing more, nothing less.", pros:["Very simple to use","Reliable Garmin quality","Lifetime maps included","Compact size"], cons:["No live traffic","No Bluetooth calling"] },
      { name:"TomTom GO 520", price:"$80–$110", screen:"5 inch", badge:"Good Alternative", badgeColor:"bg-blue-600", desc:"TomTom's entry-level with built-in Wi-Fi for easy updates — no computer needed. Good choice if map updating simplicity matters to you.", pros:["Built-in Wi-Fi updates","Works without smartphone","World maps included"], cons:["Older interface","Fewer features than Garmin"] },
    ],
    tip:"Honest tip: If you can stretch to $149, you get live traffic and Bluetooth — a significant jump in value. But if $100 is your firm limit, the Garmin Drive 53 is genuinely good.",
  },
  {
    id:"100to150",
    label:"$100 – $150",
    min:100, max:150,
    emoji:"💳",
    tagline:"Best value — most popular range",
    color:"from-blue-500 to-indigo-400",
    border:"border-blue-700",
    bg:"bg-blue-900/20",
    text:"text-blue-300",
    summary:"This is the sweet spot. At $100–$150, you get live traffic, Bluetooth calling, and voice control — features that make a real difference on daily drives. Most people buying a GPS land in this range.",
    youGet:["Live traffic — reroutes around jams","Bluetooth hands-free calling","Voice control — no touching the screen","Driver alerts (sharp curves, school zones)","5-5.5 inch screen","Wi-Fi map updates"],
    youMiss:["Large 6-7 inch screen","Lane guidance with 3D junctions","Premium build quality"],
    devices:[
      { name:"Garmin DriveSmart 55", price:"$149–$179", screen:"5.5 inch", badge:"#1 Most Popular", badgeColor:"bg-blue-600", desc:"The most popular GPS in North America for good reason. Live traffic, Bluetooth calling, voice control, and Wi-Fi updates — all in a compact 5.5-inch unit. The one most drivers should buy.", pros:["Best all-around GPS","Live traffic & weather","Hands-free calling","Easy Wi-Fi updates","Voice control works well"], cons:["Not the largest screen","Premium features cost more"] },
      { name:"Garmin Drive 55 Plus Traffic", price:"$119–$139", screen:"5.5 inch", badge:"Best Value Traffic", badgeColor:"bg-green-600", desc:"Gets you live traffic at the lowest price. Not as full-featured as the DriveSmart 55 but traffic alerts are the biggest upgrade from entry-level.", pros:["Live traffic at lower price","Garmin reliability","Clear directions"], cons:["Less features than DriveSmart","Basic interface"] },
    ],
    tip:"This is where we'd spend our money. The Garmin DriveSmart 55 at $149–$179 is genuinely excellent — live traffic alone saves you time on almost every highway journey.",
  },
  {
    id:"150to250",
    label:"$150 – $250",
    min:151, max:250,
    emoji:"💎",
    tagline:"Premium features — highway and road trip drivers",
    color:"from-purple-500 to-violet-400",
    border:"border-purple-700",
    bg:"bg-purple-900/20",
    text:"text-purple-300",
    summary:"At $150–$250, you're getting the best of what Garmin offers: larger screens, 3D junction view, premium voice assist, and in some models, real-time parking information. Worth every dollar if you drive frequently.",
    youGet:["Large 6.95-inch screen — much easier to read","3D lane guidance at complex junctions","Premium voice assist (understands natural speech)","Live traffic, weather, and parking info","Bluetooth + smart notifications","Wi-Fi updates"],
    youMiss:["RV routing features","Satellite communication","Premium mounting hardware"],
    devices:[
      { name:"Garmin DriveSmart 65", price:"$179–$219", screen:"6.95 inch", badge:"Best Large Screen", badgeColor:"bg-purple-600", desc:"The 6.95-inch screen is a game-changer — especially for anyone who finds smaller screens hard to read while driving. All the DriveSmart 55 features, just much bigger and clearer.", pros:["Largest screen in this range","Much easier to glance at speed","All premium features included","Excellent for seniors 55+"], cons:["Larger physical size","Higher price"] },
      { name:"Garmin DriveSmart 76", price:"$219–$249", screen:"7 inch", badge:"Best Premium Value", badgeColor:"bg-violet-600", desc:"The top of Garmin's DriveSmart line. Voice Assist understands natural language — just say 'Take me home' and it goes. Best screen clarity available in a standalone GPS.", pros:["Best voice recognition","Clearest screen","Premium feel","Top-rated model"], cons:["Most expensive in range","Some features need phone"] },
    ],
    tip:"If you wear reading glasses or find screens hard to read while driving — the Garmin DriveSmart 65 at $179–$219 is worth every extra dollar. The larger screen alone makes driving less stressful.",
  },
  {
    id:"over250",
    label:"$250 and above",
    min:251, max:999,
    emoji:"🏆",
    tagline:"RV, outdoor, and specialty GPS",
    color:"from-amber-500 to-orange-400",
    border:"border-amber-700",
    bg:"bg-amber-900/20",
    text:"text-amber-300",
    summary:"Above $250, you're looking at specialist GPS devices — RV routing that avoids low bridges, outdoor hiking GPS, or dash-mounted units with satellite messaging. Very worth it if you have a specific need.",
    youGet:["RV-specific routing (avoids low bridges, weight limits)","Campground database with 40,000+ locations","Topographic maps for hiking","Satellite messaging (works with no cell signal)","Custom vehicle profiles (RV length, height, weight)"],
    youMiss:["Nothing — these are the full-feature units"],
    devices:[
      { name:"Garmin RV 895", price:"$299–$349", screen:"8 inch", badge:"Best for RV Drivers", badgeColor:"bg-amber-600", desc:"Custom vehicle profile stores your RV's dimensions — avoids bridges too low, roads too narrow. 8-inch screen. Includes 40,000+ campgrounds. Essential for RV travel.", pros:["Routes around low bridges","Huge 8-inch screen","Campground database","Custom vehicle profile","North America maps included"], cons:["Expensive","RV-specific — overkill for regular cars"] },
      { name:"Garmin GPSMAP 67", price:"$379–$399", screen:"3 inch handheld", badge:"Best Outdoor GPS", badgeColor:"bg-green-600", desc:"Not a car GPS — this is for hiking, hunting, and outdoor adventures. 100-hour battery on AA batteries, works worldwide, topographic maps. The gold standard outdoor navigation device.", pros:["100-hour battery life","AA batteries anywhere","Works worldwide","Topo maps","IPX7 waterproof"], cons:["Handheld — not for cars","Smaller screen","Complex menus"] },
    ],
    tip:"Only go above $250 if you have a genuine specific need — RV travel, outdoor adventures, or hunting. For everyday car driving, the Garmin DriveSmart 65 at $179–$219 is still the better choice.",
  },
];

export default function Client() {
  const [selectedBudget, setSelectedBudget] = useState<typeof BUDGET_TIERS[0] | null>(null);
  const [stage, setStage] = useState<"select"|"results"|"lead">("select");
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const validate = () => { const e: Record<string,string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method:"POST", headers:{"Content-Type":"application/json"}, body: JSON.stringify({ name, email, phone, issue: `GPS Budget Finder — Budget: ${selectedBudget?.label}`, source:"gps-budget-finder" }) }); } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true); setSubmitting(false);
  };
  const reset = () => { setSelectedBudget(null); setStage("select"); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[80vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white transition-colors">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">GPS Budget Finder</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Free · Pick Your Budget · Instant Results
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Best GPS for</span>
            <span className="block bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent italic">Your Budget</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Pick your price range and see exactly what GPS you can get — what features you'll have, what you'll miss, and our honest top picks. No confusing specs.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {stage === "select" && (
            <motion.div key="select" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-5">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-black text-white mb-3">What's your budget for a GPS? 💰</h2>
                <p className="text-zinc-400 text-lg font-medium">Pick your range and we'll show you exactly what you can get — honest, no upselling</p>
              </div>
              {BUDGET_TIERS.map((tier, i) => (
                <motion.button key={tier.id} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.08*i}} whileTap={{scale:0.98}}
                  onClick={() => { setSelectedBudget(tier); setStage("results"); }}
                  className="w-full text-left group">
                  <div className={`bg-zinc-900 rounded-[2rem] border-2 border-zinc-800 hover:${tier.border} overflow-hidden transition-all duration-300 hover:shadow-2xl group-hover:scale-[1.01]`}>
                    <div className={`h-1.5 bg-gradient-to-r ${tier.color}`}/>
                    <div className="p-7 flex items-center gap-6">
                      <div className="text-5xl">{tier.emoji}</div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="text-2xl font-black text-white">{tier.label}</span>
                          {tier.id === "100to150" && (<span className="text-xs font-black bg-blue-600 text-white px-2.5 py-1 rounded-full">Most Popular</span>)}
                        </div>
                        <div className={`text-base font-bold ${tier.text}`}>{tier.tagline}</div>
                        <div className="text-zinc-400 text-sm mt-1">{tier.devices[0].name} — {tier.devices[0].price}</div>
                      </div>
                      <div className="flex items-center gap-3 shrink-0">
                        <div className="hidden sm:flex flex-col gap-1">
                          {tier.youGet.slice(0,2).map(f => (<div key={f} className="flex items-center gap-1.5 text-xs text-zinc-400 font-medium"><CheckCircle2 size={12} className="text-green-400"/>{f}</div>))}
                        </div>
                        <ArrowRight size={22} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all"/>
                      </div>
                    </div>
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {stage === "results" && selectedBudget && (
            <motion.div key="results" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} className="space-y-6">
              <button onClick={reset} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold transition-colors group mb-2">
                ← <span className="group-hover:underline">Change Budget</span>
              </button>

              {/* Budget tier header */}
              <div className={`rounded-[2rem] border-2 ${selectedBudget.border} ${selectedBudget.bg} p-8 overflow-hidden`}>
                <div className="flex items-center gap-4 mb-5">
                  <div className="text-5xl">{selectedBudget.emoji}</div>
                  <div>
                    <div className={`text-sm font-black uppercase tracking-widest mb-1 ${selectedBudget.text}`}>Your Budget Range</div>
                    <div className="text-3xl font-black text-white">{selectedBudget.label}</div>
                    <div className={`text-base font-bold mt-1 ${selectedBudget.text}`}>{selectedBudget.tagline}</div>
                  </div>
                </div>
                <p className="text-zinc-300 text-lg font-medium leading-relaxed">{selectedBudget.summary}</p>
              </div>

              {/* What you get / miss */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
                  <h3 className="font-black text-white text-lg mb-5 flex items-center gap-2"><CheckCircle2 size={20} className="text-green-400"/>What you'll have</h3>
                  <div className="space-y-3">
                    {selectedBudget.youGet.map((f, i) => (
                      <motion.div key={f} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.06*i}} className="flex items-center gap-3">
                        <div className="w-6 h-6 bg-green-900/50 rounded-full flex items-center justify-center shrink-0"><CheckCircle2 size={14} className="text-green-400"/></div>
                        <span className="text-base text-zinc-300 font-medium">{f}</span>
                      </motion.div>
                    ))}
                  </div>
                </div>
                {selectedBudget.youMiss.length > 0 && (
                  <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
                    <h3 className="font-black text-white text-lg mb-5 flex items-center gap-2"><AlertCircle size={20} className="text-amber-400"/>What requires a higher budget</h3>
                    <div className="space-y-3">
                      {selectedBudget.youMiss.map((f, i) => (
                        <motion.div key={f} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.06*i}} className="flex items-center gap-3">
                          <div className="w-6 h-6 bg-zinc-800 rounded-full flex items-center justify-center shrink-0"><span className="text-zinc-500 text-xs font-black">—</span></div>
                          <span className="text-base text-zinc-400 font-medium">{f}</span>
                        </motion.div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Device recommendations */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className={`h-1.5 bg-gradient-to-r ${selectedBudget.color}`}/>
                <div className="p-8">
                  <h3 className="text-2xl font-black text-white mb-6 flex items-center gap-3"><Star size={20} className="text-amber-400"/>Top GPS Picks in This Range</h3>
                  <div className="space-y-5">
                    {selectedBudget.devices.map((device, i) => (
                      <motion.div key={device.name} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1*i}} className="p-6 bg-zinc-800 rounded-2xl border border-zinc-700">
                        <div className="flex items-start justify-between gap-4 mb-4">
                          <div>
                            {i===0 && (<div className="flex items-center gap-2 mb-2"><Star size={14} className="text-amber-400 fill-amber-400"/><span className="text-sm font-black text-amber-400 uppercase tracking-widest">Our Top Pick</span></div>)}
                            <h4 className="text-xl font-black text-white mb-1.5">{device.name}</h4>
                            <div className="flex items-center gap-3">
                              <span className={`text-xs font-black text-white px-2.5 py-1.5 rounded-full ${device.badgeColor || "bg-blue-600"}`}>{device.badge}</span>
                              <span className="text-zinc-400 font-bold">{device.screen} screen</span>
                            </div>
                          </div>
                          <div className="text-2xl font-black text-white shrink-0">{device.price}</div>
                        </div>
                        <p className="text-base text-zinc-300 font-medium leading-relaxed mb-5">{device.desc}</p>
                        <div className="grid grid-cols-2 gap-4">
                          <div><div className="text-xs font-black text-green-400 uppercase tracking-widest mb-2">✓ Pros</div>{device.pros.map(p=>(<div key={p} className="text-sm text-zinc-400 font-medium mb-1">• {p}</div>))}</div>
                          <div><div className="text-xs font-black text-red-400 uppercase tracking-widest mb-2">✗ Consider</div>{device.cons.map(c=>(<div key={c} className="text-sm text-zinc-400 font-medium mb-1">• {c}</div>))}</div>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Honest tip */}
              <div className={`rounded-2xl border ${selectedBudget.border} ${selectedBudget.bg} p-6 flex items-start gap-4`}>
                <AlertCircle size={20} className={`${selectedBudget.text} shrink-0 mt-0.5`}/>
                <div><div className={`text-sm font-black uppercase tracking-widest mb-1 ${selectedBudget.text}`}>Honest Tip</div><p className="text-base text-zinc-300 font-medium leading-relaxed">{selectedBudget.tip}</p></div>
              </div>

              {/* Lead capture */}
              {!submitted ? (
                <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                  <h3 className="text-xl font-black text-white mb-2">Get this guide by email 📧</h3>
                  <p className="text-zinc-400 text-base mb-6">Save your picks + receive monthly GPS tips for drivers 45+.</p>
                  <div className="space-y-4 mb-5">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. John" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                  </div>
                  <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className={`w-full py-5 bg-gradient-to-r ${selectedBudget.color} text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3`}>{submitting?<Loader2 size={22} className="animate-spin"/>:"Send My GPS Guide"}</motion.button>
                </div>
              ) : (
                <div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0"/><p className="text-base font-bold text-green-300">Guide sent to {email}!</p></div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20}/>Change Budget</button>
                <Link href="/tools/gps-vs-phone-decider"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS vs Phone Decider</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Prices are approximate and subject to change. Not affiliated with Garmin or TomTom.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer/>
    </div>
  );
}
