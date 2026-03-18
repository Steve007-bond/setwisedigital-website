"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Shield, Zap, RefreshCw, AlertCircle, Star } from "lucide-react";
import LeadCaptureBlock from "@/components/LeadCaptureBlock";

const bgs = [
  { url:"https://images.unsplash.com/photo-1587300003388-59208cc962cb?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1548199973-03cce0bbc87b?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const TRACKERS = [
  {
    id: "tractive",
    name: "Tractive GPS 4",
    emoji: "🐾",
    badge: "Best Overall — Most Popular",
    badgeColor: "bg-blue-600",
    color: "from-blue-500 to-indigo-400",
    border: "border-blue-700",
    bg: "bg-blue-900/20",
    text: "text-blue-300",
    deviceCost: 49,
    monthlyBasic: 4.99,
    monthlyPremium: 8.99,
    annualBasic: 49.99,
    annualPremium: 84.99,
    network: "LTE cellular (T-Mobile in USA, Rogers/Bell in Canada)",
    canadaNote: "Works in Canada — coverage mirrors T-Mobile roaming partners",
    pros: ["Best real-time tracking — updates every 2 seconds","Works in Canada via LTE roaming","Live tracking, location history, activity monitoring","Waterproof — your dog can swim","Smallest device of all pet trackers"],
    cons: ["Requires subscription — no tracking without plan","Monthly cost adds up over years","LTE needed — dead zones in very rural areas"],
    threeYearTotal: (49 + 49.99 * 3),
    setupSteps: [
      { id:"t1", icon:"📦", title:"Unbox and charge the tracker", detail:"Charge fully before first use (about 2 hours via the magnetic charger). The LED turns solid green when fully charged." },
      { id:"t2", icon:"📱", title:"Download the Tractive app", detail:"Search 'Tractive' in the App Store (iPhone) or Google Play (Android). Download the free app — setup requires the app." },
      { id:"t3", icon:"➕", title:"Create your account and activate the tracker", detail:"Open the app → tap '+' to add a tracker → scan the QR code on your device or enter the ID manually → name your pet → the tracker connects to the LTE network." },
      { id:"t4", icon:"💳", title:"Choose your subscription plan", detail:"Basic plan ($4.99/mo or $49.99/yr): live tracking + geofencing. Premium plan ($8.99/mo or $84.99/yr): adds activity monitoring, wellness alerts, and multi-pet features. Annual saves you about 15%." },
      { id:"t5", icon:"🐕", title:"Attach to your pet's collar", detail:"The Tractive tracker clips onto any collar. The clip is secure — it stays on through swimming and play. Make sure the collar fits snugly (you should fit 2 fingers underneath)." },
    ],
  },
  {
    id: "fi",
    name: "Fi Series 3 Smart Collar",
    emoji: "🏅",
    badge: "Best for USA — Premium Design",
    badgeColor: "bg-amber-600",
    color: "from-amber-500 to-orange-400",
    border: "border-amber-700",
    bg: "bg-amber-900/20",
    text: "text-amber-300",
    deviceCost: 149,
    monthlyBasic: 0,
    monthlyPremium: 9.99,
    annualBasic: 0,
    annualPremium: 99,
    network: "LTE + GPS + WiFi triangulation (AT&T in USA)",
    canadaNote: "Limited Canada coverage — designed primarily for USA. Not recommended for Canada-primary users.",
    pros: ["Premium build quality — the smartest collar available","3-month battery life — exceptional","Step counting and activity tracking built in","No need to clip on — it IS the collar","Lost Dog Mode uses GPS, LTE, and community of Fi users"],
    cons: ["Higher upfront cost ($149 for collar)","USA-focused — limited Canada coverage","Requires subscription for GPS tracking","Collar must be replaced if your dog grows"],
    threeYearTotal: (149 + 99 * 3),
    setupSteps: [
      { id:"f1", icon:"📦", title:"Charge the Fi collar before first use", detail:"Use the included charging dock — sits on top of the collar clasp. Fully charges in about 2 hours. Unique thing: the battery lasts up to 3 months on a single charge." },
      { id:"f2", icon:"📱", title:"Download the Fi app", detail:"Search 'Fi Dog Collar' in the App Store or Google Play. Create your account in the app." },
      { id:"f3", icon:"🔗", title:"Activate your collar in the app", detail:"In the app, tap 'Set Up New Device' → scan the QR code on the charging dock → follow the activation steps. The collar connects to AT&T's LTE network." },
      { id:"f4", icon:"💳", title:"Choose your subscription", detail:"Fi requires a subscription for GPS tracking: $9.99/month or $99/year. Activity tracking works without subscription." },
      { id:"f5", icon:"📏", title:"Size and fit the collar", detail:"Fi sells collars in Small, Medium, and Large. Measure your dog's neck in inches. The fit matters — too loose and it falls off, too tight and it's uncomfortable. 2-finger test applies." },
    ],
  },
  {
    id: "whistle",
    name: "Whistle Switch",
    emoji: "🏠",
    badge: "Best for Older Dogs & Health Tracking",
    badgeColor: "bg-green-600",
    color: "from-green-500 to-emerald-400",
    border: "border-green-700",
    bg: "bg-green-900/20",
    text: "text-green-300",
    deviceCost: 99,
    monthlyBasic: 9.95,
    monthlyPremium: 0,
    annualBasic: 95.99,
    annualPremium: 0,
    network: "LTE cellular (Verizon + T-Mobile in USA, limited Canada)",
    canadaNote: "Limited Canada LTE coverage — check Whistle's coverage map for your specific area.",
    pros: ["Best health monitoring: scratching, licking, sleep, eating","Vet-recommended for health baseline tracking","Nutritional tracking and weight alerts","GPS + health in one device","Waterproof"],
    cons: ["USA-focused — limited Canada coverage","Monthly fee required","Larger device than Tractive","Less frequent GPS updates than Tractive"],
    threeYearTotal: (99 + 95.99 * 3),
    setupSteps: [
      { id:"wh1", icon:"📦", title:"Charge the Whistle tracker", detail:"The Whistle Switch charges via USB-C. Charge fully before setup — about 1.5 hours. Check the LED turns solid green." },
      { id:"wh2", icon:"📱", title:"Download the Whistle app", detail:"Search 'Whistle' in the App Store or Google Play. Create a new account — you'll need your dog's name, breed, age, and weight for health features." },
      { id:"wh3", icon:"⚙️", title:"Add your device in the app", detail:"Tap '+' → follow device activation → the Whistle connects to LTE automatically when activated. Set up GPS safe zones (home address) during setup." },
      { id:"wh4", icon:"💳", title:"Subscribe to a plan", detail:"Whistle Protect ($9.95/mo or $95.99/yr) includes GPS tracking, health monitoring, and vet chat. Annual plan saves 20% over monthly." },
      { id:"wh5", icon:"🐕", title:"Clip to collar and set activity baseline", detail:"Attach to any collar. The app then measures your dog's normal activity level over 7 days — after that, it alerts you to unusual changes that might indicate a health issue." },
    ],
  },
  {
    id: "airtag",
    name: "Apple AirTag",
    emoji: "🍎",
    badge: "No Monthly Fee — Best for Budget",
    badgeColor: "bg-zinc-600",
    color: "from-zinc-500 to-zinc-400",
    border: "border-zinc-600",
    bg: "bg-zinc-800/50",
    text: "text-zinc-300",
    deviceCost: 29,
    monthlyBasic: 0,
    monthlyPremium: 0,
    annualBasic: 0,
    annualPremium: 0,
    network: "Apple's Find My network (Bluetooth only — not LTE GPS)",
    canadaNote: "Works everywhere Apple iPhones are used — excellent Canada coverage via passive Bluetooth network.",
    pros: ["No monthly fee whatsoever — truly free to use","Excellent Canada coverage via iPhone network","CR2032 battery lasts 1 year — easy to replace","Works on any collar or harness clip","Best budget option available"],
    cons: ["NOT real-time GPS tracking — only shows last known location near an iPhone","Completely useless in rural areas with no iPhones nearby","Android users cannot use it at all","No geofencing, no activity tracking","No proactive alerts — only works if someone near your lost dog has an iPhone"],
    threeYearTotal: 29,
    setupSteps: [
      { id:"a1", icon:"📱", title:"Requires an iPhone (won't work with Android)", detail:"AirTag works exclusively with Apple's Find My network. You need an iPhone running iOS 14.5 or later. If you or your family use Android phones, AirTag is not a viable option for you." },
      { id:"a2", icon:"🔗", title:"Pair the AirTag with your iPhone", detail:"Bring the AirTag close to your iPhone. Pull the plastic battery tab to activate it. An animation appears on your phone — tap 'Connect' → name it (e.g. 'Buddy's collar') → done. It appears in your Find My app." },
      { id:"a3", icon:"🐕", title:"Attach to your pet's collar", detail:"Buy an AirTag pet holder ($15–$30 from Apple or Amazon). The AirTag itself is round and smooth — it needs a dedicated holder to attach to a collar. Loop-style holders work best." },
      { id:"a4", icon:"⚠️", title:"Understand the limitations before relying on it", detail:"AirTag shows your pet's last known location near any iPhone. If your dog runs into a rural area with no iPhones nearby, the AirTag will not update. For real-time tracking, a subscription-based tracker is more reliable." },
    ],
  },
];

export default function Client() {
  const [selected, setSelected] = useState<Set<string>>(new Set());
  const [showSetup, setShowSetup] = useState<string|null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [years, setYears] = useState(3);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const toggle = (id: string) =>
    setSelected(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.size < 4 ? n.add(id) : n; return n; });

  const toggleStep = (id: string) =>
    setCompletedSteps(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const getTotalCost = (tracker: typeof TRACKERS[0]) => {
    const annualCost = tracker.annualBasic > 0 ? tracker.annualBasic : tracker.annualPremium;
    return tracker.deviceCost + annualCost * years;
  };

  const shownTrackers = selected.size > 0
    ? TRACKERS.filter(t => selected.has(t.id)).sort((a,b) => getTotalCost(a) - getTotalCost(b))
    : [];

  const cheapest = shownTrackers.length > 1 ? shownTrackers[0] : null;
  const setupTracker = TRACKERS.find(t => t.id === showSetup);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[75vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">Pet GPS Cost Breakdown</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-pink-500/10 border border-pink-500/30 text-pink-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14} /> True 3-Year Cost · Clickable Setup Guide
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">Pet GPS Tracker</span>
            <span className="block bg-gradient-to-r from-pink-400 via-rose-300 to-orange-400 bg-clip-text text-transparent italic">Real Cost Comparison</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Tractive, Fi, Whistle, or AirTag? See the true 1, 2, or 3-year cost including device and subscription — then tap to get a clickable setup guide for the one you choose.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16 space-y-8">

        {/* Year selector */}
        <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
          <h2 className="text-xl font-black text-white mb-5">How many years do you want to calculate? 📅</h2>
          <div className="grid grid-cols-3 gap-4">
            {[1,2,3].map(y => (
              <motion.button key={y} whileTap={{ scale: 0.97 }} onClick={() => setYears(y)}
                className={`py-5 rounded-2xl border-2 font-black text-xl transition-all ${years === y ? "border-pink-500 bg-pink-900/20 text-pink-300 shadow-lg" : "border-zinc-700 bg-zinc-800/50 text-zinc-300 hover:border-pink-700"}`}>
                {y} Year{y > 1 ? "s" : ""}
              </motion.button>
            ))}
          </div>
        </div>

        {/* Tracker selector + cost cards */}
        <div>
          <h2 className="text-xl font-black text-white mb-5 text-center">Pick up to 4 trackers to compare 🐾</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {TRACKERS.map((tracker, i) => {
              const isSelected = selected.has(tracker.id);
              const total = getTotalCost(tracker);
              const annualCost = tracker.annualBasic > 0 ? tracker.annualBasic : tracker.annualPremium;
              const isCheapest = cheapest?.id === tracker.id && shownTrackers.length > 1;
              return (
                <motion.div key={tracker.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
                  className={`rounded-[2rem] border-2 overflow-hidden cursor-pointer transition-all ${isSelected ? `${tracker.border} bg-zinc-900 shadow-xl` : "border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}
                  onClick={() => toggle(tracker.id)}>
                  <div className={`h-1.5 bg-gradient-to-r ${tracker.color}`} />
                  <div className="p-6">
                    <div className="flex items-start justify-between gap-3 mb-4">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-3xl">{tracker.emoji}</span>
                          {isSelected && <div className={`w-6 h-6 rounded-full flex items-center justify-center bg-gradient-to-br ${tracker.color}`}><CheckCircle2 size={14} className="text-white" /></div>}
                        </div>
                        <h3 className="font-black text-white text-lg">{tracker.name}</h3>
                        <span className={`text-xs font-black text-white px-2.5 py-1 rounded-full ${tracker.badgeColor || "bg-blue-600"}`}>{tracker.badge}</span>
                      </div>
                      <div className="text-right shrink-0">
                        <div className={`text-3xl font-black ${isCheapest ? "text-green-400" : "text-white"}`}>${total}</div>
                        <div className="text-zinc-400 text-xs">{years}-year total</div>
                        {isCheapest && <div className="text-xs font-black text-green-400 mt-0.5">💰 Cheapest</div>}
                      </div>
                    </div>

                    {/* Cost breakdown */}
                    <div className="space-y-1.5 mb-4">
                      <div className="flex justify-between text-sm"><span className="text-zinc-400">Device</span><span className="font-bold text-white">${tracker.deviceCost}</span></div>
                      <div className="flex justify-between text-sm"><span className="text-zinc-400">Annual subscription</span><span className={`font-bold ${annualCost === 0 ? "text-green-400" : "text-white"}`}>{annualCost === 0 ? "FREE" : `$${annualCost}/yr`}</span></div>
                      <div className="flex justify-between text-sm border-t border-zinc-700 pt-1.5 mt-1.5"><span className="text-zinc-300 font-bold">{years}-year total</span><span className="font-black text-white">${total}</span></div>
                    </div>

                    <div className={`text-xs font-medium p-3 rounded-xl ${tracker.bg} ${tracker.text} mb-4`}>{tracker.canadaNote}</div>

                    {/* Setup button */}
                    <motion.button whileTap={{ scale: 0.97 }}
                      onClick={e => { e.stopPropagation(); setShowSetup(tracker.id); setCompletedSteps(new Set()); }}
                      className={`w-full py-3 rounded-xl font-black text-sm bg-gradient-to-r ${tracker.color} text-white`}>
                      📋 See Setup Steps for This One
                    </motion.button>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* Insight when 2+ selected */}
        <AnimatePresence>
          {shownTrackers.length > 1 && cheapest && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="bg-green-900/20 border border-green-700 rounded-[2rem] p-7">
              <div className="flex items-start gap-4">
                <div className="text-4xl">💰</div>
                <div>
                  <h3 className="text-xl font-black text-white mb-2">Over {years} years, <span className="text-green-400">{cheapest.name}</span> costs the least</h3>
                  <p className="text-zinc-300 text-base font-medium">${getTotalCost(cheapest)} total vs ${getTotalCost(shownTrackers[shownTrackers.length - 1])} for {shownTrackers[shownTrackers.length - 1].name}. That's a ${getTotalCost(shownTrackers[shownTrackers.length - 1]) - getTotalCost(cheapest)} difference — just by choosing wisely upfront.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Clickable setup guide */}
        <AnimatePresence>
          {showSetup && setupTracker && (
            <motion.div key={showSetup} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="space-y-5">
              <div className={`rounded-[2rem] border-2 ${setupTracker.border} bg-zinc-900 overflow-hidden`}>
                <div className={`h-1.5 bg-gradient-to-r ${setupTracker.color}`} />
                <div className="p-7">
                  <div className="flex items-center justify-between mb-5">
                    <div className="flex items-center gap-3">
                      <span className="text-4xl">{setupTracker.emoji}</span>
                      <div>
                        <h3 className="text-2xl font-black text-white">{setupTracker.name}</h3>
                        <div className={`text-sm font-bold ${setupTracker.text}`}>Setup Guide</div>
                      </div>
                    </div>
                    <div className={`text-sm font-black px-3 py-1.5 rounded-full ${setupTracker.bg} ${setupTracker.text} border ${setupTracker.border}`}>
                      {setupTracker.setupSteps.filter(s => completedSteps.has(s.id)).length} / {setupTracker.setupSteps.length} done
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="h-2 bg-zinc-800 rounded-full mb-6 overflow-hidden">
                    <motion.div className={`h-full rounded-full bg-gradient-to-r ${setupTracker.color}`}
                      animate={{ width: `${(setupTracker.setupSteps.filter(s => completedSteps.has(s.id)).length / setupTracker.setupSteps.length) * 100}%` }}
                      transition={{ duration: 0.4 }} />
                  </div>

                  <div className="space-y-3">
                    {setupTracker.setupSteps.map((step, i) => {
                      const done = completedSteps.has(step.id);
                      return (
                        <motion.div key={step.id} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
                          className={`rounded-2xl border-2 transition-all ${done ? "border-green-600 bg-green-900/10" : `${setupTracker.border} bg-zinc-800/50`}`}>
                          <div className="p-5">
                            <div className="flex items-start gap-4 mb-4">
                              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-sm ${done ? "bg-green-500" : `bg-gradient-to-br ${setupTracker.color}`}`}>
                                {done ? <CheckCircle2 size={18} className="text-white" /> : <span className="text-white">{i + 1}</span>}
                              </div>
                              <div className="flex-1">
                                <div className="flex items-center gap-2 mb-1.5">
                                  <span className="text-xl">{step.icon}</span>
                                  <span className={`font-black text-base ${done ? "text-zinc-400 line-through" : "text-white"}`}>{step.title}</span>
                                </div>
                                <p className="text-sm text-zinc-400 font-medium leading-relaxed">{step.detail}</p>
                              </div>
                            </div>
                            <motion.button whileTap={{ scale: 0.97 }} onClick={() => toggleStep(step.id)}
                              className={`w-full py-3.5 rounded-xl font-black text-sm transition-all ${done ? "bg-zinc-800 text-zinc-500 border border-zinc-700" : `bg-gradient-to-r ${setupTracker.color} text-white shadow-md`}`}>
                              {done ? "✓ Done — tap to undo" : "✓ Mark this step as done"}
                            </motion.button>
                          </div>
                        </motion.div>
                      );
                    })}
                  </div>

                  <AnimatePresence>
                    {setupTracker.setupSteps.every(s => completedSteps.has(s.id)) && (
                      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="mt-5 p-6 bg-green-900/30 border-2 border-green-600 rounded-2xl text-center">
                        <div className="text-4xl mb-2">🐾</div>
                        <h4 className="font-black text-white text-xl mb-1">All set up!</h4>
                        <p className="text-green-300 font-medium">Your pet tracker is ready. Keep the app notifications on so you get alerts immediately.</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
              <button onClick={() => setShowSetup(null)} className="flex items-center justify-center gap-2 w-full py-4 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-base"><RefreshCw size={18} />Close Setup Guide</button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium leading-relaxed">Educational guidance only. Prices and subscription rates are approximate and subject to change. Not affiliated with Tractive, Fi, Whistle, or Apple. Canada LTE coverage depends on carrier agreements — verify before purchasing.</p></div></div>
      </section>
      
      <LeadCaptureBlock
        source="pet-gps-cost-breakdown"
        accentColor="from-pink-600 to-rose-500"
        accentHex="#ec4899"
        headline="Not sure which pet tracker to buy?"
        subline="Enter your details and we'll send you a free personalised pet GPS recommendation — matched to your pet, budget, and location."
        points={[
          "🐕 Free pet tracker recommendation for your specific situation",
          "💰 Honest breakdown of true 3-year costs for your choice",
          "📞 Optional free help call — no pressure at all",
        ]}
        ctaText="Get My Free Pet Tracker Guide"
      />

      <Footer />
    </div>
  );
}
