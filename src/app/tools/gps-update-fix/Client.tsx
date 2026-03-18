"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Shield, Zap, RefreshCw, AlertCircle, ArrowRight } from "lucide-react";
import LeadCaptureBlock from "@/components/LeadCaptureBlock";

const bgs = [
  { url:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const PROBLEMS = [
  {
    id: "wont-detect",
    label: "Garmin Express won't detect my GPS",
    icon: "🔌",
    desc: "I connect the cable but nothing happens",
    color: "from-red-500 to-rose-400",
    border: "border-red-700",
    bg: "bg-red-900/20",
    text: "text-red-300",
    steps: [
      { id:"d1", icon:"🔄", title:"Try a different USB port on your computer", detail:"Unplug the cable from the current USB port. Try a different one — use the ones directly on the computer body, not on a USB hub or keyboard. Front ports often work better than back ports. Garmin Express should detect the device within 30 seconds of reconnecting." },
      { id:"d2", icon:"📱", title:"Check the cable — try a different one", detail:"Data cables and charging-only cables look identical. The cable must carry data, not just power. Try another micro-USB cable if you have one. When the cable works correctly, your GPS appears as a drive in File Explorer (Windows) or Finder (Mac)." },
      { id:"d3", icon:"🔁", title:"Restart Garmin Express completely", detail:"Close Garmin Express fully — right-click the icon in the taskbar (Windows) or quit from the menu (Mac). Unplug your GPS. Open Garmin Express fresh. Then reconnect your GPS with the cable." },
      { id:"d4", icon:"💻", title:"Restart your computer", detail:"A full computer restart clears USB driver issues that prevent detection. After restarting, open Garmin Express first, then connect your GPS. Don't open anything else at the same time." },
      { id:"d5", icon:"⬆️", title:"Check if Garmin Express needs updating", detail:"Open Garmin Express. Look for a notification at the top about a new version. Install any available Garmin Express update. Old versions of Garmin Express sometimes stop detecting newer GPS models." },
    ],
    contactNote: "Still not detecting after all 5 steps? Call Garmin Support at 1-800-800-1020 — they can remotely diagnose connection issues in most cases.",
  },
  {
    id: "download-fails",
    label: "The map update starts but then fails",
    icon: "⬇️",
    desc: "Download stops, error message appears mid-way",
    color: "from-amber-500 to-orange-400",
    border: "border-amber-700",
    bg: "bg-amber-900/20",
    text: "text-amber-300",
    steps: [
      { id:"f1", icon:"📡", title:"Check your internet connection first", detail:"Open a webpage in your browser. If it loads slowly or not at all, that's the issue — not Garmin Express. Wait for your connection to stabilise and try again. Map downloads are 1–4 GB, so a steady connection matters." },
      { id:"f2", icon:"🔁", title:"Click 'Install' or 'Retry' in Garmin Express", detail:"Garmin Express has a built-in retry system. If the download fails, an error button appears. Click 'Retry' or 'Install Again'. Many downloads succeed on the second or third attempt after a brief pause." },
      { id:"f3", icon:"💾", title:"Check your GPS has enough free storage", detail:"On your GPS: Settings → About → Storage (or similar). Map updates need 2–4 GB of free space. If storage is near full, connect your GPS to your computer and delete any old items from the device folder that you no longer need." },
      { id:"f4", icon:"🔒", title:"Temporarily turn off your antivirus / firewall", detail:"Security software sometimes blocks large downloads from Garmin's servers. Temporarily pause your antivirus protection (right-click the icon in your taskbar → Disable temporarily → choose 15 minutes). Try the download again. Re-enable after." },
      { id:"f5", icon:"🌙", title:"Schedule the update for overnight", detail:"In Garmin Express, look for a 'Schedule Update' option. Set it to run at 2am when no other activity is competing for bandwidth. Large map files download more reliably when the network is quiet." },
    ],
    contactNote: "If maps consistently fail to download after multiple attempts, Garmin's server might be experiencing issues. Check garmin.com for any service status notices, or call 1-800-800-1020.",
  },
  {
    id: "wifi-wont-connect",
    label: "My GPS won't connect to home Wi-Fi",
    icon: "📡",
    desc: "Wi-Fi setting shows my network but won't connect",
    color: "from-blue-500 to-indigo-400",
    border: "border-blue-700",
    bg: "bg-blue-900/20",
    text: "text-blue-300",
    steps: [
      { id:"wc1", icon:"🔑", title:"Re-enter your Wi-Fi password very carefully", detail:"Wi-Fi passwords are case-sensitive. Go to Settings → Wi-Fi → tap your network → tap 'Forget' (to clear the saved password) → tap it again → type the password very carefully, letter by letter. Watch for capital letters, numbers, and special characters." },
      { id:"wc2", icon:"📶", title:"Check you're on the 2.4 GHz network, not 5 GHz", detail:"Most Garmin GPS units only support 2.4 GHz Wi-Fi — not the faster 5 GHz band. If your router broadcasts both, they often have the same name or one says '5G' at the end. Connect to the one WITHOUT '5G' in its name." },
      { id:"wc3", icon:"📍", title:"Move your GPS closer to the router", detail:"GPS devices have weaker Wi-Fi than phones. Bring your GPS within 3–5 metres of your router and try connecting again. Once connected and the update starts, you can move it slightly further away — but close proximity helps the initial connection." },
      { id:"wc4", icon:"🔄", title:"Restart your router and GPS", detail:"Turn your GPS off completely. Unplug your router from the wall for 30 seconds, then plug it back in. Wait 1 minute for the router to fully restart. Then turn your GPS on and try connecting to Wi-Fi again." },
      { id:"wc5", icon:"💻", title:"If Wi-Fi still won't work, use the computer method instead", detail:"Some older GPS models have unreliable built-in Wi-Fi. The Garmin Express computer method (free download from garmin.com/express) works on all Garmin GPS models and is often more reliable than Wi-Fi for large map updates." },
    ],
    contactNote: "If your GPS's Wi-Fi simply won't connect to any network after all steps, the Wi-Fi antenna may have failed. Use the Garmin Express computer method as a reliable alternative.",
  },
  {
    id: "maps-still-wrong",
    label: "I updated but roads are still wrong",
    icon: "🔄",
    desc: "Maps updated but navigation still shows old routes",
    color: "from-purple-500 to-violet-400",
    border: "border-purple-700",
    bg: "bg-purple-900/20",
    text: "text-purple-300",
    steps: [
      { id:"sw1", icon:"🔄", title:"Confirm the update actually completed", detail:"Go to Settings → About (or Map Info) on your GPS. Look for the 'Map Version' and check the date shown. It should show a recent date (within the last few months). If the date is old, the update didn't finish — try again using this guide." },
      { id:"sw2", icon:"🔃", title:"Do a full restart of your GPS device", detail:"Hold the power button for 10 seconds until the device shuts off completely. Wait 30 seconds. Turn it back on. New map data sometimes needs a full restart to load properly into the device's memory." },
      { id:"sw3", icon:"🗺️", title:"Check if the road actually exists in real life", detail:"Some 'wrong roads' are actually correct — roads change. Check Google Maps or Apple Maps to confirm whether the road your GPS shows actually exists. Sometimes GPS is right and local knowledge is slightly outdated." },
      { id:"sw4", icon:"🔁", title:"Recalculate the route fresh", detail:"Rather than following a saved or cached route, enter your destination again from scratch. Tap 'Where To?' → enter address → tap Go. This forces a fresh route calculation using the updated maps." },
      { id:"sw5", icon:"🗑️", title:"Clear the GPS cache and history", detail:"On Garmin: Settings → Navigation → clear recent routes and destination history. Cached old routes can sometimes conflict with new map data. Clearing history forces the GPS to use fresh map information for all routes." },
    ],
    contactNote: "If specific roads are consistently wrong even after a fresh update, you can report them directly to Garmin's map team at garmin.com/mapupdates. Garmin does act on user road corrections.",
  },
  {
    id: "no-updates-available",
    label: "Garmin Express says no updates available",
    icon: "❓",
    desc: "But I know my maps are out of date",
    color: "from-green-500 to-emerald-400",
    border: "border-green-700",
    bg: "bg-green-900/20",
    text: "text-green-300",
    steps: [
      { id:"nu1", icon:"🔄", title:"Check you're signed into the right Garmin account", detail:"In Garmin Express, check the account email shown in the top right. If it shows someone else's email (or a different email than you registered), sign out and sign in with the correct account. Your device's update eligibility is tied to your account." },
      { id:"nu2", icon:"✅", title:"Your maps may genuinely be current already", detail:"If Garmin Express just said 'No Updates Available' with a green tick — your maps might actually be up to date. Check Settings → About on your GPS for the map date. If it's within the last 3 months, you're good." },
      { id:"nu3", icon:"🏛️", title:"Your device may no longer receive updates", detail:"Garmin ended map support for models over 10+ years old. To check: visit garmin.com/en-US/maps and search your model number. If your model isn't listed, it has reached end-of-map-support. Garmin Express will show 'No updates available' for these devices." },
      { id:"nu4", icon:"💳", title:"Check whether your maps require a paid update", detail:"Some older Garmin models (without 'LM' in the name) require a paid map purchase rather than free lifetime updates. In Garmin Express, look for a 'Shop' or 'Purchase Maps' option next to your device. This is a one-time purchase, not a subscription." },
    ],
    contactNote: "If your device model no longer receives updates, the Garmin DriveSmart 55 ($149–$179) or DriveSmart 65 ($179–$219) are the recommended replacements — both include free lifetime Wi-Fi map updates.",
  },
];

export default function Client() {
  const [selectedProblem, setSelectedProblem] = useState<typeof PROBLEMS[0] | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const toggleStep = (id: string) =>
    setCompletedSteps(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const reset = () => { setSelectedProblem(null); setCompletedSteps(new Set()); };

  const allDone = selectedProblem ? selectedProblem.steps.every(s => completedSteps.has(s.id)) : false;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[75vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">GPS Update Fix Guide</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14} /> Pick Your Problem · Clickable Step-by-Step Fixes
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">GPS Map Update</span>
            <span className="block bg-gradient-to-r from-amber-400 via-orange-300 to-red-400 bg-clip-text text-transparent italic">Not Working?</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Pick exactly what's happening — get a plain-English step-by-step fix you tick off as you go. No jargon, no dead ends.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {!selectedProblem && (
            <motion.div key="pick" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              <div className="text-center mb-6">
                <h2 className="text-2xl font-black text-white mb-2">What's happening when you try to update? 🔍</h2>
                <p className="text-zinc-400">Pick the description that matches your situation most closely</p>
              </div>
              {PROBLEMS.map((problem, i) => (
                <motion.button key={problem.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }} whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedProblem(problem); setCompletedSteps(new Set()); }}
                  className="w-full text-left p-6 rounded-[2rem] border-2 border-zinc-700 bg-zinc-900 hover:border-zinc-500 transition-all group">
                  <div className="flex items-center gap-4">
                    <div className="text-4xl">{problem.icon}</div>
                    <div className="flex-1">
                      <div className="font-black text-white text-lg mb-1">{problem.label}</div>
                      <div className="text-zinc-400 text-sm font-medium">{problem.desc}</div>
                      <div className="text-zinc-500 text-xs mt-1">{problem.steps.length} steps to try</div>
                    </div>
                    <ArrowRight size={20} className="text-zinc-600 group-hover:text-white group-hover:translate-x-1 transition-all shrink-0" />
                  </div>
                </motion.button>
              ))}
            </motion.div>
          )}

          {selectedProblem && (
            <motion.div key={selectedProblem.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className="flex items-center justify-between">
                <button onClick={reset} className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold transition-colors">← Different Problem</button>
                <div className={`text-sm font-black px-3 py-1.5 rounded-full ${selectedProblem.bg} ${selectedProblem.text} border ${selectedProblem.border}`}>
                  {completedSteps.size} / {selectedProblem.steps.length} tried
                </div>
              </div>

              <div className={`rounded-2xl border-2 ${selectedProblem.border} ${selectedProblem.bg} p-5 flex items-center gap-4`}>
                <div className="text-4xl">{selectedProblem.icon}</div>
                <div>
                  <h2 className="font-black text-white text-lg">{selectedProblem.label}</h2>
                  <p className="text-zinc-400 text-sm">{selectedProblem.desc}</p>
                </div>
              </div>

              <div className="bg-amber-900/20 border border-amber-700 rounded-2xl p-4 flex items-start gap-3">
                <AlertCircle size={16} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-200 font-medium">Try these in order — most issues are fixed by step 1 or 2. Tick each step as you go.</p>
              </div>

              {/* Progress */}
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div className={`h-full rounded-full bg-gradient-to-r ${selectedProblem.color}`}
                  animate={{ width: `${(completedSteps.size / selectedProblem.steps.length) * 100}%` }}
                  transition={{ duration: 0.4 }} />
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {selectedProblem.steps.map((step, i) => {
                  const done = completedSteps.has(step.id);
                  return (
                    <motion.div key={step.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 * i }}
                      className={`rounded-2xl border-2 transition-all ${done ? "border-green-600 bg-green-900/10" : `${selectedProblem.border} bg-zinc-900`}`}>
                      <div className="p-5">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-sm ${done ? "bg-green-500" : `bg-gradient-to-br ${selectedProblem.color}`}`}>
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
                          className={`w-full py-3.5 rounded-xl font-black text-sm transition-all ${done ? "bg-zinc-800 text-zinc-500 border border-zinc-700" : `bg-gradient-to-r ${selectedProblem.color} text-white shadow-md`}`}>
                          {done ? "✓ Tried — tap to undo" : "✓ I tried this — mark as done"}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* All done */}
              <AnimatePresence>
                {allDone && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-7 bg-zinc-900 border-2 border-zinc-700 rounded-[2rem]">
                    <h3 className="text-xl font-black text-white mb-3">Tried all steps and still stuck? 🤔</h3>
                    <p className="text-zinc-400 text-base font-medium mb-4 leading-relaxed">{selectedProblem.contactNote}</p>
                    <div className="flex items-center gap-3 p-4 bg-blue-900/20 border border-blue-700 rounded-xl">
                      <span className="text-2xl">📞</span>
                      <div>
                        <div className="font-black text-white">Garmin Customer Support</div>
                        <div className="text-blue-300 font-bold">1-800-800-1020 (free call)</div>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20} />Different Problem</button>
                <Link href="/tools/garmin-express-setup"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-green-600 to-emerald-500 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Garmin Express Guide</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with Garmin. Always download software from garmin.com only.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      
      <LeadCaptureBlock
        source="gps-update-fix"
        accentColor="from-green-600 to-emerald-500"
        accentHex="#16a34a"
        headline="Tried all the steps and still stuck?"
        subline="Enter your details and we'll send you a personalised GPS troubleshooting guide — plus a free help call if your GPS update is still failing."
        points={[
          "🔧 Personalised guide for your exact GPS model and problem",
          "📡 Advanced steps if basic fixes didn't work",
          "📞 Optional free help call — no pressure at all",
        ]}
        ctaText="Get My Free GPS Fix Guide"
      />

      <Footer />
    </div>
  );
}
