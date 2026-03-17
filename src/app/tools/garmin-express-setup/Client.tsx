"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ChevronRight, Shield, Zap, RefreshCw, AlertCircle } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1587654780291-39c9404d746b?auto=format&fit=crop&q=60&w=1200", type:"image" as const, theme:"dark" as const },
];

const METHODS = [
  {
    id: "wifi",
    label: "My GPS has Wi-Fi built in",
    emoji: "📡",
    badge: "Easiest — no computer needed",
    badgeColor: "bg-green-600",
    color: "from-green-500 to-emerald-400",
    border: "border-green-700",
    bg: "bg-green-900/20",
    text: "text-green-300",
    desc: "Garmin DriveSmart 55, 65, 76 and most models from 2018 onward have built-in Wi-Fi. The GPS updates itself at home overnight — you just connect it to your network once.",
    steps: [
      { id:"w1", icon:"🔌", title:"Plug your GPS into power", detail:"Use the car charger and plug it into a wall adapter, OR use the included USB cable plugged into any USB wall charger. The GPS needs power during the update — it can take 1–3 hours." },
      { id:"w2", icon:"⚙️", title:"Open Settings on your GPS", detail:"Tap the main menu icon (looks like a grid or square) in the bottom corner of the screen. Then tap 'Settings' (the gear icon)." },
      { id:"w3", icon:"📡", title:"Go to Wi-Fi settings", detail:"Inside Settings, scroll down and tap 'Wi-Fi'. Turn Wi-Fi ON using the toggle at the top. Your home network should appear in the list below." },
      { id:"w4", icon:"🔑", title:"Connect to your home Wi-Fi", detail:"Tap your home network name. A keyboard appears — type your Wi-Fi password carefully (watch for capital letters). Tap 'Connect'. The GPS shows 'Connected' when successful." },
      { id:"w5", icon:"🔄", title:"Check for map updates", detail:"Go back to Settings → tap 'Map & Software Update' (or 'Check for Updates' on some models). The GPS checks the internet. If an update is available, tap 'Install'. A progress bar shows download and install progress." },
      { id:"w6", icon:"☕", title:"Wait for it to finish", detail:"Map updates are large — 1 to 3 GB typically. At home broadband speeds this takes 30–90 minutes. Keep the GPS plugged in throughout. Don't unplug it — the screen may go dark but it's still updating." },
      { id:"w7", icon:"✅", title:"Restart and verify", detail:"When the update finishes, the GPS shows a confirmation screen. Tap 'OK'. The device restarts. Go to Settings → About to see the new map version number and confirm the update worked." },
    ],
    tips: [
      "Do this update overnight — plug in before bed, done in the morning",
      "If your Wi-Fi password has special characters, check the keyboard carefully",
      "Connect to 2.4GHz Wi-Fi (not 5GHz) — most Garmin GPS units only support 2.4GHz",
      "The screen going dark during update is normal — it's power-saving, not a freeze",
    ],
  },
  {
    id: "computer",
    label: "My GPS doesn't have Wi-Fi",
    emoji: "💻",
    badge: "Via computer — Garmin Express",
    badgeColor: "bg-blue-600",
    color: "from-blue-500 to-indigo-400",
    border: "border-blue-700",
    bg: "bg-blue-900/20",
    text: "text-blue-300",
    desc: "Older Garmin GPS models (Drive 53, nuvi series, older DriveSmart) update via Garmin Express — a free program for Windows and Mac computers. Takes about 45–90 minutes.",
    steps: [
      { id:"c1", icon:"🌐", title:"Go to garmin.com/express on your computer", detail:"Open your internet browser (Chrome, Edge, Safari, Firefox — any works). Type 'garmin.com/express' in the address bar at the top and press Enter. This is Garmin's official free update tool." },
      { id:"c2", icon:"⬇️", title:"Download Garmin Express", detail:"On the website, click the big green 'Download for Windows' or 'Download for Mac' button. A file downloads to your computer (usually to your Downloads folder). It's about 5–10 MB." },
      { id:"c3", icon:"📦", title:"Install Garmin Express", detail:"Find the downloaded file (usually in Downloads) and double-click it. Follow the on-screen instructions — click 'Next', agree to the terms, click 'Install'. Takes about 2 minutes. Open Garmin Express when done." },
      { id:"c4", icon:"🔌", title:"Connect your GPS to your computer with the USB cable", detail:"Use the cable that came with your GPS (or any matching USB cable). One end plugs into the small port on your GPS device; the other end into a USB port on your computer. Turn your GPS on." },
      { id:"c5", icon:"➕", title:"Add your device in Garmin Express", detail:"Garmin Express should detect your GPS automatically and show it on screen. If prompted, click 'Add Device' and follow the steps. Sign in to your Garmin account — or create a free account if you don't have one." },
      { id:"c6", icon:"🔍", title:"Check for updates", detail:"Garmin Express searches for available updates automatically. A green button shows 'Install All' or 'Update Maps'. Click it. Both the device software and maps will update together." },
      { id:"c7", icon:"⏱️", title:"Wait — this takes a while", detail:"Map files are large — 1 to 4 GB depending on your region. At typical broadband speeds: 30–90 minutes. Keep your GPS connected throughout. Don't close Garmin Express or disconnect the cable mid-update." },
      { id:"c8", icon:"✅", title:"Safely disconnect and restart your GPS", detail:"When Garmin Express shows 'Update Complete', click 'Eject Device' in Garmin Express first — don't just pull the cable out. Then unplug the USB. Your GPS restarts with fresh maps installed." },
    ],
    tips: [
      "Use the original USB cable if possible — some generic cables don't carry data, only power",
      "If your computer doesn't detect the GPS, try a different USB port",
      "Make sure your GPS is turned ON when you connect — not in sleep mode",
      "A stable internet connection matters — avoid doing updates on slow or patchy Wi-Fi",
      "Garmin Express is free and safe — download only from garmin.com/express, not any other site",
    ],
  },
  {
    id: "check",
    label: "I'm not sure if mine has Wi-Fi",
    emoji: "🤔",
    badge: "Help me check first",
    badgeColor: "bg-amber-600",
    color: "from-amber-500 to-orange-400",
    border: "border-amber-700",
    bg: "bg-amber-900/20",
    text: "text-amber-300",
    desc: "No problem — 2 quick checks tell you which method you need.",
    steps: [
      { id:"ch1", icon:"🔍", title:"Check your GPS model name", detail:"Look on the back of your GPS device, or go to Settings → About on the device screen. Write down the full model name (e.g. 'Garmin DriveSmart 55' or 'Garmin Drive 53')." },
      { id:"ch2", icon:"⚙️", title:"Check Settings for a Wi-Fi option", detail:"Press the main menu button on your GPS. Go to Settings (the gear icon). Scroll through the options. If you see 'Wi-Fi' listed — you have it. If you don't see Wi-Fi anywhere in Settings — you don't have it." },
      { id:"ch3", icon:"📡", title:"If you found Wi-Fi in Settings", detail:"Great — follow the Wi-Fi method above. It's the easiest: no computer required. Just connect to your home network and let the GPS update itself overnight." },
      { id:"ch4", icon:"💻", title:"If there's no Wi-Fi option in Settings", detail:"Follow the 'Garmin Express' computer method. You'll need your GPS cable and about an hour. Garmin Express is free, safe, and easy to use — even if you're not confident with technology." },
      { id:"ch5", icon:"📞", title:"Still not sure? Call Garmin directly", detail:"Garmin's customer support line is 1-800-800-1020. They're very helpful and will tell you exactly which update method your model needs. Free to call, no purchase required." },
    ],
    tips: [
      "Models with 'Wi-Fi' in their name or 'W' in the model code almost certainly have built-in Wi-Fi",
      "DriveSmart 51, 55, 61, 65, 66, 76, 86 all have Wi-Fi",
      "Drive 40, 50, 51, 52, 53 do NOT have Wi-Fi — use Garmin Express",
      "nuvi series models do NOT have Wi-Fi — use Garmin Express",
    ],
  },
];

export default function Client() {
  const [selectedMethod, setSelectedMethod] = useState<typeof METHODS[0] | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<string>>(new Set());
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");

  const toggleStep = (id: string) =>
    setCompletedSteps(prev => { const n = new Set(prev); n.has(id) ? n.delete(id) : n.add(id); return n; });

  const reset = () => { setSelectedMethod(null); setCompletedSteps(new Set()); };

  const allDone = selectedMethod ? selectedMethod.steps.every(s => completedSteps.has(s.id)) : false;

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[75vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={7000} onThemeChange={setCurrentTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-20 pt-40">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">Garmin Express Setup Guide</span>
          </nav>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }} className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-black uppercase tracking-widest mb-8">
            <Zap size={14} /> Free · Clickable Step-by-Step · Plain English
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tighter mb-8">
            <span className="block text-white">How to Update Your</span>
            <span className="block bg-gradient-to-r from-green-400 via-emerald-300 to-cyan-400 bg-clip-text text-transparent italic">Garmin GPS Maps</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 }} className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-10 leading-relaxed">
            Pick your update method — Wi-Fi or computer — then follow the clickable steps at your own pace. Tick each one as you go. No jargon, no rushing.
          </motion.p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pb-32 mt-16">
        <AnimatePresence mode="wait">

          {!selectedMethod && (
            <motion.div key="pick" initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-black text-white mb-3">How does your GPS connect to update?</h2>
                <p className="text-zinc-400">Pick the one that fits your situation — or choose 'not sure' and we'll help you find out</p>
              </div>
              {METHODS.map((method, i) => (
                <motion.button key={method.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 * i }} whileTap={{ scale: 0.98 }}
                  onClick={() => { setSelectedMethod(method); setCompletedSteps(new Set()); }}
                  className={`w-full text-left p-7 rounded-[2rem] border-2 border-zinc-700 bg-zinc-900 hover:${method.border} transition-all group`}>
                  <div className="flex items-start gap-5">
                    <div className="text-5xl">{method.emoji}</div>
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2 flex-wrap">
                        <span className="text-xl font-black text-white">{method.label}</span>
                        <span className={`text-xs font-black text-white px-2.5 py-1 rounded-full ${method.badgeColor}`}>{method.badge}</span>
                      </div>
                      <p className="text-zinc-400 text-sm font-medium leading-relaxed">{method.desc}</p>
                      <div className="mt-3 text-sm font-black text-zinc-500 group-hover:text-zinc-300 transition-colors">{method.steps.length} steps → tap to begin</div>
                    </div>
                  </div>
                </motion.button>
              ))}
              <div className="bg-amber-900/20 border border-amber-700 rounded-2xl p-5 flex items-start gap-3">
                <AlertCircle size={18} className="text-amber-400 shrink-0 mt-0.5" />
                <p className="text-sm text-amber-200 font-medium leading-relaxed"><strong>Most GPS problems are fixed by a map update.</strong> If your GPS is showing wrong roads, sending you on strange routes, or missing new streets — a map update almost always resolves this. It's free on most Garmin models.</p>
              </div>
            </motion.div>
          )}

          {selectedMethod && (
            <motion.div key={selectedMethod.id} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} className="space-y-5">
              <div className="flex items-center justify-between mb-2">
                <button onClick={reset} className="flex items-center gap-2 text-zinc-400 hover:text-white font-bold transition-colors">← Change Method</button>
                <div className={`text-sm font-black px-3 py-1.5 rounded-full ${selectedMethod.bg} ${selectedMethod.text} border ${selectedMethod.border}`}>
                  {completedSteps.size} / {selectedMethod.steps.length} steps done
                </div>
              </div>

              {/* Method header */}
              <div className={`rounded-[2rem] border-2 ${selectedMethod.border} ${selectedMethod.bg} p-6`}>
                <div className="flex items-center gap-4">
                  <div className="text-4xl">{selectedMethod.emoji}</div>
                  <div>
                    <h2 className="text-xl font-black text-white">{selectedMethod.label}</h2>
                    <div className={`text-sm font-bold ${selectedMethod.text}`}>{selectedMethod.badge}</div>
                  </div>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div className={`h-full rounded-full bg-gradient-to-r ${selectedMethod.color}`}
                  animate={{ width: `${(completedSteps.size / selectedMethod.steps.length) * 100}%` }}
                  transition={{ duration: 0.4 }} />
              </div>

              {/* Steps */}
              <div className="space-y-3">
                {selectedMethod.steps.map((step, i) => {
                  const done = completedSteps.has(step.id);
                  const prev = i === 0 || completedSteps.has(selectedMethod.steps[i - 1].id);
                  return (
                    <motion.div key={step.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.07 * i }}
                      className={`rounded-2xl border-2 transition-all duration-300 ${done ? "border-green-600 bg-green-900/10" : prev ? `${selectedMethod.border} bg-zinc-900` : "border-zinc-800 bg-zinc-900/50 opacity-60"}`}>
                      <div className="p-5">
                        <div className="flex items-start gap-4 mb-4">
                          <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 font-black text-sm ${done ? "bg-green-500" : prev ? `bg-gradient-to-br ${selectedMethod.color}` : "bg-zinc-700"}`}>
                            {done ? <CheckCircle2 size={18} className="text-white" /> : <span className="text-white">{i + 1}</span>}
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-1">
                              <span className="text-xl">{step.icon}</span>
                              <span className={`font-black text-base ${done ? "text-zinc-400 line-through" : "text-white"}`}>{step.title}</span>
                            </div>
                            <p className="text-sm text-zinc-400 font-medium leading-relaxed">{step.detail}</p>
                          </div>
                        </div>
                        <motion.button whileTap={{ scale: 0.97 }} onClick={() => prev && toggleStep(step.id)} disabled={!prev}
                          className={`w-full py-3 rounded-xl font-black text-sm transition-all ${done ? "bg-zinc-800 text-zinc-500 border border-zinc-700" : prev ? `bg-gradient-to-r ${selectedMethod.color} text-white shadow-md` : "bg-zinc-800 text-zinc-600 cursor-not-allowed"}`}>
                          {done ? "✓ Done — tap to undo" : prev ? "✓ Mark as done" : `Complete step ${i} first`}
                        </motion.button>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              {/* Completion */}
              <AnimatePresence>
                {allDone && (
                  <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="p-7 bg-green-900/30 border-2 border-green-600 rounded-[2rem] text-center">
                    <div className="text-5xl mb-3">🎉</div>
                    <h3 className="text-2xl font-black text-white mb-2">Maps updated successfully!</h3>
                    <p className="text-green-300 font-medium text-lg">Your GPS now has the latest roads, routes, and points of interest. Take a test drive and enjoy fresh navigation.</p>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Tips */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-7">
                <h3 className="text-lg font-black text-white mb-4">💡 Helpful tips for this method</h3>
                <div className="space-y-2">
                  {selectedMethod.tips.map((tip, i) => (
                    <div key={i} className="flex items-start gap-3">
                      <CheckCircle2 size={15} className={`${selectedMethod.text} shrink-0 mt-0.5`} />
                      <p className="text-sm text-zinc-400 font-medium">{tip}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 text-lg"><RefreshCw size={20} />Different Method</button>
                <Link href="/tools/gps-upgrade-decider"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">GPS Upgrade Decider</motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5"><div className="flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Not affiliated with Garmin. Always download Garmin Express from garmin.com/express only.</p></div></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <Footer />
    </div>
  );
}
