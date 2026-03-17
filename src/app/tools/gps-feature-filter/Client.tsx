"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Mail, User, Loader2, Shield, Zap, RefreshCw, ArrowRight, XCircle, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const FEATURES = [
  { id:"no-subscription", label:"No monthly subscription fee", icon:"🚫💳", desc:"Own it outright — no ongoing payments ever", important:true },
  { id:"offline-maps", label:"Works without cell signal", icon:"📵", desc:"Navigate in rural areas and dead zones", important:true },
  { id:"lifetime-maps", label:"Free map updates forever", icon:"🗺️", desc:"No paying extra when roads change", important:false },
  { id:"live-traffic", label:"Live traffic — reroutes around jams", icon:"🚦", desc:"Automatically avoids traffic delays", important:false },
  { id:"large-screen", label:"Large screen (6 inch or bigger)", icon:"📺", desc:"Easier to read at a glance while driving", important:false },
  { id:"bluetooth-calling", label:"Hands-free phone calls", icon:"📞", desc:"Answer calls through the GPS speaker", important:false },
  { id:"voice-control", label:"Voice control — no touching screen", icon:"🎤", desc:"Just say your destination out loud", important:false },
  { id:"canada-maps", label:"Canada maps included", icon:"🍁", desc:"Full Canadian coverage preloaded", important:false },
  { id:"wifi-updates", label:"Wi-Fi updates — no computer needed", icon:"📡", desc:"Updates itself at home automatically", important:false },
  { id:"rv-routing", label:"RV or large vehicle routing", icon:"🚐", desc:"Avoids low bridges and weight limits", important:false },
  { id:"lane-guidance", label:"Lane guidance on highways", icon:"🛣️", desc:"Shows exactly which lane to be in", important:false },
  { id:"sos-satellite", label:"Emergency SOS button (satellite)", icon:"🆘", desc:"For hiking and remote travel safety", important:false },
];

const GPS_DEVICES = [
  { name:"Garmin Drive 53", price:"$89–$109", screen:"5 inch", features:["no-subscription","offline-maps","lifetime-maps","canada-maps"], notFeatures:["live-traffic","large-screen","bluetooth-calling","voice-control","wifi-updates","rv-routing","lane-guidance","sos-satellite"], badge:"Entry Level", badgeColor:"bg-green-600", desc:"Simple, reliable car GPS. Maps of USA and Canada. Turn-by-turn voice. No subscriptions ever." },
  { name:"Garmin DriveSmart 55", price:"$149–$179", screen:"5.5 inch", features:["no-subscription","offline-maps","lifetime-maps","live-traffic","bluetooth-calling","voice-control","canada-maps","wifi-updates","lane-guidance"], notFeatures:["large-screen","rv-routing","sos-satellite"], badge:"Most Popular", badgeColor:"bg-blue-600", desc:"The most popular GPS in North America. Has everything most drivers need: traffic, Bluetooth, voice, Wi-Fi updates." },
  { name:"Garmin DriveSmart 65", price:"$179–$219", screen:"6.95 inch", features:["no-subscription","offline-maps","lifetime-maps","live-traffic","large-screen","bluetooth-calling","voice-control","canada-maps","wifi-updates","lane-guidance"], notFeatures:["rv-routing","sos-satellite"], badge:"Best Large Screen", badgeColor:"bg-purple-600", desc:"Everything the DriveSmart 55 has — with a 6.95-inch screen. Much easier to read while driving." },
  { name:"Garmin DriveSmart 76", price:"$219–$249", screen:"7 inch", features:["no-subscription","offline-maps","lifetime-maps","live-traffic","large-screen","bluetooth-calling","voice-control","canada-maps","wifi-updates","lane-guidance"], notFeatures:["rv-routing","sos-satellite"], badge:"Premium", badgeColor:"bg-violet-600", desc:"Garmin's flagship car GPS. 7-inch screen with premium voice assist that understands natural speech." },
  { name:"Garmin RV 895", price:"$299–$349", screen:"8 inch", features:["no-subscription","offline-maps","lifetime-maps","live-traffic","large-screen","bluetooth-calling","voice-control","canada-maps","wifi-updates","rv-routing","lane-guidance"], notFeatures:["sos-satellite"], badge:"Best RV GPS", badgeColor:"bg-amber-600", desc:"8-inch screen, RV-specific routing that avoids low bridges. 40,000+ campgrounds preloaded." },
  { name:"TomTom GO Discover 7", price:"$249–$279", screen:"7 inch", features:["no-subscription","offline-maps","lifetime-maps","live-traffic","large-screen","voice-control","canada-maps","wifi-updates","lane-guidance"], notFeatures:["bluetooth-calling","rv-routing","sos-satellite"], badge:"TomTom Best", badgeColor:"bg-red-600", desc:"TomTom's premium model. World maps included. Strong real-time traffic. 7-inch screen." },
  { name:"Garmin GPSMAP 67", price:"$379–$399", screen:"3 inch handheld", features:["no-subscription","offline-maps","lifetime-maps","canada-maps"], notFeatures:["live-traffic","large-screen","bluetooth-calling","voice-control","wifi-updates","rv-routing","lane-guidance","sos-satellite"], badge:"Outdoor Hiking", badgeColor:"bg-green-700", desc:"Handheld outdoor GPS. 100-hour battery on AA batteries. Topographic maps. IPX7 waterproof." },
  { name:"Garmin inReach Mini 2", price:"$349 + $14.99/mo", screen:"1.2 inch", features:["offline-maps","sos-satellite"], notFeatures:["no-subscription","live-traffic","large-screen","bluetooth-calling","voice-control","wifi-updates","rv-routing","lane-guidance","canada-maps","lifetime-maps"], badge:"Satellite SOS", badgeColor:"bg-red-700", desc:"Two-way satellite messaging + SOS from anywhere on Earth. Pairs with your phone for full navigation." },
];

export default function Client() {
  const [selectedFeatures, setSelectedFeatures] = useState<string[]>([]);
  const [stage, setStage] = useState<"filter"|"results">("filter");
  const [name, setName] = useState(""); const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<Record<string,string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const toggleFeature = (id: string) => setSelectedFeatures(prev => prev.includes(id) ? prev.filter(f=>f!==id) : [...prev, id]);

  const getMatches = () => {
    if (selectedFeatures.length === 0) return GPS_DEVICES;
    return GPS_DEVICES.filter(device => selectedFeatures.every(f => device.features.includes(f)))
      .sort((a,b) => {
        const aMatch = selectedFeatures.filter(f => a.features.includes(f)).length;
        const bMatch = selectedFeatures.filter(f => b.features.includes(f)).length;
        return bMatch - aMatch;
      });
  };

  const matches = getMatches();

  const validate = () => { const e: Record<string,string>={};if(!name.trim())e.name="Please enter your name";if(!email.trim()||!email.includes("@"))e.email="Please enter a valid email";setErrors(e);return Object.keys(e).length===0; };
  const handleSubmit = async () => {
    if(!validate())return;setSubmitting(true);
    try{await fetch("/api/leads",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({name,email,issue:`GPS Feature Filter — Features: ${selectedFeatures.join(", ")}`,source:"gps-feature-filter"})});}catch{}
    setSubmitted(true);setSubmitting(false);
  };
  const reset = () => {setSelectedFeatures([]);setStage("filter");setName("");setEmail("");setSubmitted(false);};

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[80vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/>
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/>
            <span className="text-zinc-300">GPS Feature Filter</span>
          </nav>
          <motion.div initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.1}} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14}/> Tick What Matters · See Matching Devices Instantly
          </motion.div>
          <motion.h1 initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{delay:0.2}} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Find a GPS with</span>
            <span className="block bg-gradient-to-r from-cyan-400 via-blue-300 to-indigo-400 bg-clip-text text-transparent italic">Exactly What You Need</span>
          </motion.h1>
          <motion.p initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} transition={{delay:0.3}} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Tick the features that matter to you — no subscription, large screen, works offline, Canada maps — and see only the GPS devices that match. No jargon, instant results.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* Left: Filter panel */}
          <div className="lg:col-span-1">
            <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden sticky top-24">
              <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-400"/>
              <div className="p-6">
                <h2 className="text-xl font-black text-white mb-1">Tick what matters to you</h2>
                <p className="text-zinc-400 text-sm mb-5">Results update as you select</p>

                <div className="space-y-2">
                  {FEATURES.map((feature, i) => {
                    const isSelected = selectedFeatures.includes(feature.id);
                    return (
                      <motion.button key={feature.id} initial={{opacity:0,x:-20}} animate={{opacity:1,x:0}} transition={{delay:0.05*i}} whileTap={{scale:0.98}}
                        onClick={() => toggleFeature(feature.id)}
                        className={`w-full flex items-center gap-3 p-4 rounded-2xl border-2 text-left transition-all ${isSelected ? "border-cyan-500 bg-cyan-900/20 shadow-lg" : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-500"}`}>
                        <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center shrink-0 transition-all ${isSelected ? "border-cyan-400 bg-cyan-400" : "border-zinc-500"}`}>
                          {isSelected && <CheckCircle2 size={13} className="text-[#0d1117]"/>}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="font-black text-white text-sm leading-tight">{feature.label}</div>
                          <div className="text-zinc-500 text-xs mt-0.5 leading-tight">{feature.desc}</div>
                        </div>
                        {feature.important && <span className="text-xs text-amber-400 font-black shrink-0">Popular</span>}
                      </motion.button>
                    );
                  })}
                </div>

                {selectedFeatures.length > 0 && (
                  <button onClick={() => setSelectedFeatures([])} className="w-full mt-4 py-3 border border-zinc-700 rounded-2xl text-zinc-400 hover:text-white text-sm font-bold transition-colors flex items-center justify-center gap-2">
                    <RefreshCw size={14}/> Clear all filters
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Right: Results */}
          <div className="lg:col-span-2 space-y-5">
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-xl font-black text-white">
                  {selectedFeatures.length === 0 ? `All ${GPS_DEVICES.length} GPS Devices` : matches.length === 0 ? "No exact matches" : `${matches.length} device${matches.length !== 1 ? "s" : ""} match${matches.length === 1 ? "es" : ""}`}
                </h3>
                {selectedFeatures.length > 0 && matches.length > 0 && (<p className="text-zinc-400 text-sm">Showing devices with all {selectedFeatures.length} selected feature{selectedFeatures.length > 1 ? "s" : ""}</p>)}
              </div>
              {selectedFeatures.length > 0 && (<div className="text-sm text-cyan-400 font-bold">{selectedFeatures.length} filter{selectedFeatures.length > 1 ? "s" : ""} active</div>)}
            </div>

            {matches.length === 0 && (
              <div className="bg-amber-900/20 border border-amber-700 rounded-[2rem] p-8 text-center">
                <AlertCircle size={32} className="text-amber-400 mx-auto mb-4"/>
                <h3 className="text-xl font-black text-white mb-3">No GPS has all those features at once</h3>
                <p className="text-zinc-400 text-base font-medium mb-5">Some feature combinations don't exist in one device — for example, an SOS satellite button alongside a large screen and Bluetooth. Try removing one or two filters to see what's available.</p>
                <button onClick={() => setSelectedFeatures(prev => prev.slice(0,-1))} className="text-cyan-400 font-bold text-base hover:text-cyan-300">← Remove last filter</button>
              </div>
            )}

            <AnimatePresence>
              {matches.map((device, i) => {
                const matchedCount = selectedFeatures.length > 0 ? selectedFeatures.filter(f => device.features.includes(f)).length : 0;
                const missedFeatures = selectedFeatures.filter(f => device.notFeatures.includes(f));
                return (
                  <motion.div key={device.name} initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} exit={{opacity:0,y:-20}} transition={{delay:0.05*i}}
                    className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                    <div className="h-1.5 bg-gradient-to-r from-cyan-500 to-blue-400"/>
                    <div className="p-7">
                      <div className="flex items-start justify-between gap-4 mb-4">
                        <div>
                          {i === 0 && selectedFeatures.length > 0 && (<div className="flex items-center gap-2 mb-2"><CheckCircle2 size={14} className="text-green-400"/><span className="text-sm font-black text-green-400 uppercase tracking-widest">Best Match</span></div>)}
                          <h3 className="text-xl font-black text-white mb-2">{device.name}</h3>
                          <div className="flex items-center gap-3 flex-wrap">
                            <span className={`text-xs font-black text-white px-2.5 py-1.5 rounded-full ${device.badgeColor || "bg-blue-600"}`}>{device.badge}</span>
                            <span className="text-zinc-400 text-sm">{device.screen} screen</span>
                          </div>
                        </div>
                        <div className="text-2xl font-black text-white shrink-0">{device.price}</div>
                      </div>

                      <p className="text-base text-zinc-300 font-medium leading-relaxed mb-5">{device.desc}</p>

                      {selectedFeatures.length > 0 && (
                        <div className="space-y-2 mb-5">
                          {selectedFeatures.map(f => {
                            const feature = FEATURES.find(feat => feat.id === f);
                            const hasIt = device.features.includes(f);
                            return feature ? (
                              <div key={f} className={`flex items-center gap-3 text-sm font-medium ${hasIt ? "text-zinc-300" : "text-zinc-600"}`}>
                                {hasIt ? <CheckCircle2 size={14} className="text-green-400 shrink-0"/> : <XCircle size={14} className="text-red-500 shrink-0"/>}
                                {feature.label}
                                {!hasIt && <span className="text-zinc-600 text-xs">— not included</span>}
                              </div>
                            ) : null;
                          })}
                        </div>
                      )}

                      {selectedFeatures.length === 0 && (
                        <div className="flex flex-wrap gap-2">
                          {device.features.map(f => {
                            const feature = FEATURES.find(feat => feat.id === f);
                            return feature ? (<span key={f} className="text-xs font-bold text-zinc-300 bg-zinc-800 px-3 py-1.5 rounded-full">{feature.icon} {feature.label}</span>) : null;
                          })}
                        </div>
                      )}
                    </div>
                  </motion.div>
                );
              })}
            </AnimatePresence>

            {/* Lead capture */}
            {matches.length > 0 && !submitted && (
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8">
                <h3 className="text-xl font-black text-white mb-2">Get your matched list by email 📧</h3>
                <p className="text-zinc-400 text-base mb-5">Save your filtered results to reference when you're ready to buy.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="text" value={name} onChange={e=>setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-lg placeholder:text-zinc-600"/></div>{errors.name&&<p className="text-red-400 text-sm mt-1">{errors.name}</p>}</div>
                  <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500"/><input type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-cyan-500 text-lg placeholder:text-zinc-600"/></div>{errors.email&&<p className="text-red-400 text-sm mt-1">{errors.email}</p>}</div>
                </div>
                <motion.button whileHover={{scale:1.02}} whileTap={{scale:0.98}} onClick={handleSubmit} disabled={submitting} className="w-full py-5 bg-gradient-to-r from-cyan-600 to-blue-600 text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3">{submitting?<Loader2 size={22} className="animate-spin"/>:"Save My Filtered List"}</motion.button>
              </div>
            )}
            {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400"/><p className="font-bold text-green-300">List sent to {email}!</p></div>)}

            <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0"/><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Prices approximate. Not affiliated with Garmin or TomTom.</p></div></div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
