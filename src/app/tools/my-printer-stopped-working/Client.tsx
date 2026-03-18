"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, CheckCheck, AlertCircle, HelpCircle } from "lucide-react";

const bgs = [
  { url: "https://images.unsplash.com/photo-1563520239648-a8ade7166c97?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
];

type ProblemId = "offline" | "blank" | "jam" | "wont_print" | "quality" | "wifi" | "error" | "slow";

const PROBLEMS: { id: ProblemId; label: string; icon: string; desc: string }[] = [
  { id: "offline", label: "Printer says OFFLINE", icon: "🔴", desc: "Shows offline on my computer" },
  { id: "blank", label: "Printing blank pages", icon: "📄", desc: "Pages come out empty or white" },
  { id: "jam", label: "Paper jam", icon: "🟠", desc: "Paper stuck or jam message" },
  { id: "wont_print", label: "Printer won't print at all", icon: "❌", desc: "Nothing happens when I press print" },
  { id: "quality", label: "Streaky or faded print", icon: "〰️", desc: "Lines through print, faded, wrong colours" },
  { id: "wifi", label: "Printer lost Wi-Fi", icon: "📶", desc: "Was working, now can't connect" },
  { id: "error", label: "Error light or message", icon: "⚠️", desc: "Flashing light or screen error code" },
  { id: "slow", label: "Printing very slowly", icon: "🐢", desc: "Takes ages to start or finish printing" },
];

type BrandId = "hp" | "canon" | "epson" | "brother" | "other";

const BRANDS_SIMPLE: { id: BrandId; name: string; emoji: string }[] = [
  { id: "hp", name: "HP", emoji: "🔵" },
  { id: "canon", name: "Canon", emoji: "🔴" },
  { id: "epson", name: "Epson", emoji: "🟣" },
  { id: "brother", name: "Brother", emoji: "⚫" },
  { id: "other", name: "Other / Not Sure", emoji: "🖨️" },
];

type Fix = { title: string; steps: string[]; tip?: string };

const FIXES: Record<ProblemId, { explain: string; causes: string[]; fixes: Fix[]; brandNotes?: Partial<Record<BrandId, string>> }> = {
  offline: {
    explain: "When your printer shows 'Offline', your computer has lost its connection to the printer. The printer itself is usually fine — it's the connection that needs to be restored.",
    causes: ["The printer and computer are on different Wi-Fi networks", "The printer went to sleep and didn't reconnect", "A Windows update changed the printer settings", "The USB cable became loose (if using cable)"],
    fixes: [
      {
        title: "Step 1 — Check the printer is powered on and has paper",
        steps: ["Make sure the printer power light is on (not just standby)", "Open the paper tray and confirm paper is loaded", "Check for any error lights on the printer panel"],
      },
      {
        title: "Step 2 — Confirm your computer is on the same Wi-Fi",
        steps: ["On Windows: click the Wi-Fi icon in the bottom-right corner — check the network name", "On Mac: click the Wi-Fi icon at the top right", "Your printer and computer must be on the SAME network name", "If you have a '2.4GHz' and '5GHz' network, try switching your computer to match the printer"],
        tip: "This is the most common reason a printer goes offline — mismatched Wi-Fi networks.",
      },
      {
        title: "Step 3 — Set the printer back to Online on your computer",
        steps: ["Windows: press Start → type 'Printers' → click 'Printers & Scanners' → click your printer → click 'Open print queue'", "In the print queue window, click 'Printer' in the top menu", "Make sure 'Use Printer Offline' does NOT have a tick next to it — if it does, click it to remove the tick", "Mac: System Settings → Printers & Scanners → click your printer → click 'Resume'"],
      },
      {
        title: "Step 4 — Restart everything in order",
        steps: ["Turn off the printer (hold the power button)", "Turn off your computer or laptop", "Turn off your Wi-Fi router (unplug from the wall)", "Wait 30 seconds", "Plug the router back in — wait 1 minute for it to fully restart", "Turn the printer back on", "Turn your computer back on"],
        tip: "Restarting in this exact order (router first, then printer, then computer) resolves the offline problem in about 8 out of 10 cases.",
      },
    ],
    brandNotes: {
      hp: "HP: On the printer screen, tap the Wireless icon — if it shows a yellow triangle, tap it and select Restore Network Settings to reconnect.",
      epson: "Epson: Press and hold the Wi-Fi button on the printer for 3 seconds — the light will flash as it reconnects.",
      brother: "Brother: Press and hold the physical Wireless button on top of the printer for 3 seconds to reconnect.",
    },
  },
  blank: {
    explain: "Blank pages usually mean ink isn't reaching the paper — either the cartridges are empty, the print heads are clogged, or protective tape was left on the cartridge.",
    causes: ["Ink cartridge is empty or nearly empty", "Print head nozzles are clogged (especially if printer hasn't been used for weeks)", "Protective tape left on cartridge during installation", "Cartridge not fully clicked into place"],
    fixes: [
      {
        title: "Step 1 — Check ink levels",
        steps: ["HP: Open HP Smart app on your phone or computer — ink levels show on the home screen", "Canon: Press the Setup button → Maintenance → Estimated Ink Level", "Epson: Press Settings → Maintenance → Print Head Nozzle Check", "Brother: Press Ink → Remaining Volume"],
        tip: "Even if the ink level shows some ink remaining, a 'low' cartridge may not have enough pressure to print reliably.",
      },
      {
        title: "Step 2 — Check for protective tape on cartridges",
        steps: ["Open the ink cartridge compartment (usually the front cover)", "Look for any orange or clear tape on the cartridges", "If you see tape, remove the cartridge, peel the tape off completely, and re-insert until it clicks"],
        tip: "This is a very common mistake when setting up a new printer — the orange tab or tape must be removed for ink to flow.",
      },
      {
        title: "Step 3 — Run a Print Head Cleaning",
        steps: ["HP: HP Smart app → tap your printer → Printer Maintenance → Clean Printheads", "Canon: Press Setup → Maintenance → Cleaning", "Epson: Settings → Maintenance → Head Cleaning (run 2–3 times if needed)", "Brother: Ink → Cleaning → All (or Black/Colour)"],
        tip: "Print head cleaning uses a small amount of ink to flush the nozzles. You may need to run it 2–3 times.",
      },
      {
        title: "Step 4 — Print a nozzle check test",
        steps: ["After cleaning, print a Nozzle Check pattern from the same maintenance menu", "If all lines are solid and colours are correct, the cleaning worked", "If lines are still missing, run the cleaning one more time"],
      },
    ],
  },
  jam: {
    explain: "Paper jams happen when paper gets caught inside the printer rollers. The most important rule is to never pull paper out forcefully — always remove it slowly and gently.",
    causes: ["Paper loaded incorrectly (not aligned with guides)", "Torn or bent paper pieces left inside", "Too many sheets loaded at once", "Paper that is too thick, thin, or damp"],
    fixes: [
      {
        title: "Step 1 — Turn off the printer and unplug it",
        steps: ["Press the Power button to turn off the printer", "Unplug the power cable from the wall", "Wait 30 seconds — this resets the jam sensors"],
        tip: "Never pull paper out while the printer is on — this can damage the rollers.",
      },
      {
        title: "Step 2 — Remove paper from the paper tray",
        steps: ["Open the paper tray fully", "Remove ALL paper from the tray", "Check for torn pieces — even a tiny scrap can cause repeat jams"],
      },
      {
        title: "Step 3 — Open the rear access panel or front cover",
        steps: ["Most printers have a rear panel that opens — check the back of your printer for a door or handle", "Open it and look inside with a flashlight if needed", "If you can see paper, hold it with both hands and pull VERY SLOWLY in the direction the paper feeds"],
        tip: "Pull slowly and steadily — never yank. If it tears, pieces left inside will cause another jam.",
      },
      {
        title: "Step 4 — Check all compartments and plug back in",
        steps: ["Open the ink compartment area and check for stray paper", "Use a flashlight to look inside all openings", "Once clear, reload paper correctly — align the stack with the paper guides, don't overfill (max 50–80 sheets)"],
      },
      {
        title: "Step 5 — Turn on and run a test",
        steps: ["Plug the printer back in and turn it on", "The jam error should clear automatically", "Print a test page to confirm everything is working"],
        tip: "If the jam error persists even after removing all paper, there may be a small torn piece inside. Look carefully with a flashlight.",
      },
    ],
  },
  wont_print: {
    explain: "When nothing happens after pressing Print, the print job may be stuck in a queue, the wrong printer may be selected, or there may be a connection issue.",
    causes: ["A stuck print job is blocking the queue", "Wrong printer selected on your computer", "Printer driver needs updating", "Computer not communicating with printer"],
    fixes: [
      {
        title: "Step 1 — Check the correct printer is selected",
        steps: ["When you press Ctrl+P (Windows) or Cmd+P (Mac), look at the printer name shown in the print dialog", "Make sure it shows your printer's actual name (e.g. 'HP DeskJet 4155e') — not 'Microsoft Print to PDF' or 'Fax'", "Click the dropdown and select your printer by name"],
      },
      {
        title: "Step 2 — Clear the print queue",
        steps: ["Windows: Press Start → type 'Printers' → Printers & Scanners → click your printer → Open print queue", "If you see jobs listed (especially stuck ones), right-click each and select Cancel", "If you can't cancel them, press Start → type 'Services' → find 'Print Spooler' → right-click → Restart"],
        tip: "A single stuck print job can block every job that comes after it. Clearing the queue almost always solves this.",
      },
      {
        title: "Step 3 — Restart the printer and your computer",
        steps: ["Turn the printer off, wait 30 seconds, turn it back on", "Restart your computer or laptop", "Wait for both to fully start before trying to print again"],
      },
      {
        title: "Step 4 — Try printing from a different app",
        steps: ["Open a different document — a Word file, a PDF, a photo", "Try printing that instead", "If it prints, the original file or app had an issue"],
      },
    ],
  },
  quality: {
    explain: "Streaky, faded, or incorrectly-coloured prints usually point to clogged print head nozzles, low ink, or a print head alignment issue.",
    causes: ["Print head nozzles partially clogged", "Ink cartridge running low", "Printing on wrong paper type setting", "Print head needs alignment"],
    fixes: [
      {
        title: "Step 1 — Check ink levels and replace if low",
        steps: ["Check ink levels in your printer app or on the printer screen", "If any colour is low or empty, replace that cartridge — even partial emptiness causes quality issues"],
      },
      {
        title: "Step 2 — Run Print Head Cleaning (1–3 times)",
        steps: ["HP: HP Smart app → Printer Maintenance → Clean Printheads", "Canon: Setup → Maintenance → Cleaning", "Epson: Settings → Maintenance → Head Cleaning", "Brother: Ink → Cleaning → All"],
        tip: "Run the cleaning up to 3 times if the first attempt doesn't fully clear it. Print a nozzle check between each cleaning to see progress.",
      },
      {
        title: "Step 3 — Print a nozzle check pattern",
        steps: ["After cleaning, print a Nozzle Check or Alignment Page from the Maintenance menu", "If all lines are solid and all colours print correctly, quality should be restored"],
      },
      {
        title: "Step 4 — Align the print heads",
        steps: ["HP: HP Smart app → Printer Maintenance → Align Printheads", "Canon: Setup → Maintenance → Print Head Alignment", "Epson: Settings → Maintenance → Print Head Alignment", "The printer will print an alignment page and then calibrate automatically"],
        tip: "Alignment is especially useful if text looks double-printed or images look slightly blurry.",
      },
    ],
  },
  wifi: {
    explain: "When a printer loses its Wi-Fi connection, it's usually caused by a router restart, a Wi-Fi password change, or the printer moving too far from the router.",
    causes: ["Router was restarted and printer didn't reconnect", "Wi-Fi password was changed", "Printer moved out of good signal range", "Router firmware updated and reset connections"],
    fixes: [
      {
        title: "Step 1 — Restart the printer",
        steps: ["Turn the printer off using the power button", "Wait 30 seconds", "Turn it back on and wait for it to fully start up", "Many printers reconnect to Wi-Fi automatically after a restart"],
      },
      {
        title: "Step 2 — Use the Wireless Setup on the printer",
        steps: ["HP: tap the Wireless icon on screen → Wireless Setup Wizard → select your network → enter password", "Canon: press Wi-Fi → Wi-Fi Setup → Easy wireless connect", "Epson: press Wi-Fi button → Wi-Fi Setup Wizard", "Brother: press Menu → Network → WLAN → Setup Wizard"],
        tip: "Your Wi-Fi password is on the sticker on the back of your router.",
      },
      {
        title: "Step 3 — Use the manufacturer app to reconnect",
        steps: ["HP Smart, Canon PRINT, Epson Smart Panel, or Brother iPrint&Scan all have a 'Set Up Printer' option", "Open the app, tap your printer, and look for Wireless Setup or Add to New Network"],
      },
      {
        title: "Step 4 — Move the printer closer to the router",
        steps: ["If signal is weak, temporarily place the printer within 3 feet of the router", "Complete the Wi-Fi setup there, then move it back to its normal location", "If signal is still poor, a Wi-Fi extender or powerline adapter can help"],
        tip: "Walls (especially brick or concrete) significantly reduce Wi-Fi signal. A closer location or extender may be needed.",
      },
    ],
  },
  error: {
    explain: "Error lights and screen messages indicate the printer has detected an issue. Most are simple to resolve — the message usually tells you exactly what the problem is.",
    causes: ["Paper jam detected (even a small piece)", "Ink cartridge not installed correctly", "Ink door or access panel left open", "Cartridge incompatibility or region lock"],
    fixes: [
      {
        title: "Step 1 — Read the error message carefully",
        steps: ["If there's a screen, tap the error or message to see more detail", "Write down any error code (e.g. 'Error 0x00000006') — you can search for it on your brand's support website", "Common messages: 'Paper Jam', 'No Ink', 'Ink Cartridge Problem', 'Cover Open'"],
      },
      {
        title: "Step 2 — Check for the most common causes",
        steps: ["Open and close all covers and doors firmly — a cover left slightly ajar triggers errors", "Remove and re-insert each ink cartridge — push firmly until it clicks", "Check for any paper — even a tiny torn corner — in all compartments"],
      },
      {
        title: "Step 3 — Turn off, wait 60 seconds, turn back on",
        steps: ["A full power cycle often clears error codes", "Unplug the power cable from the wall (not just the printer)", "Wait 60 seconds", "Plug back in and turn on"],
      },
      {
        title: "Step 4 — Look up the error code",
        steps: ["HP: search 'HP [your model] error [code]' at hp.com/support", "Canon: search 'Canon support code [number]' at canon.com/support", "Epson: search 'Epson [your model] error message' at epson.com/support", "Most error codes have a specific fix listed on the support pages"],
      },
    ],
  },
  slow: {
    explain: "A printer that takes a very long time to start printing or is much slower than normal is usually printing in High Quality mode, processing a complex file, or has an old or outdated driver.",
    causes: ["Print quality is set to Best or Photo mode (much slower)", "Printing a large or complex file (high resolution photo)", "Printer driver is outdated", "Computer is running slowly and taking time to send the file"],
    fixes: [
      {
        title: "Step 1 — Check the print quality setting",
        steps: ["When you press Print, look for 'Properties' or 'Preferences'", "Find the 'Quality' or 'Print Quality' setting", "Change from 'Best' or 'Photo' to 'Normal' or 'Draft'", "Draft mode prints up to 4x faster — perfectly fine for documents"],
        tip: "Best quality mode is for photos only. Normal mode is ideal for everyday documents and is much faster.",
      },
      {
        title: "Step 2 — Check what you're printing",
        steps: ["Large photos (especially 4x6 or A4 full-colour photos) take 2–3 minutes each — this is normal", "PDFs with many pages take time to process", "If it's a document, reducing the file size or printing fewer pages at once can help"],
      },
      {
        title: "Step 3 — Make sure the printer driver is up to date",
        steps: ["HP: Open HP Smart app → check for updates", "Canon: visit canon.com/support → search your model → download latest driver", "Epson: Epson Software Updater (in Start menu or Applications folder) → check for updates", "Brother: visit brother.com/support → search your model → download latest driver"],
      },
      {
        title: "Step 4 — Restart your computer and printer",
        steps: ["Restart your computer first (this clears the print queue and refreshes the connection)", "Then turn the printer off and back on", "Try printing a simple one-page document — if it's fast, the previous job was just complex"],
      },
    ],
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro" | "problem" | "brand" | "lead" | "guide" | "done">("intro");
  const [problem, setProblem] = useState<ProblemId | null>(null);
  const [brand, setBrand] = useState<BrandId | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [currentTheme] = useState<"dark" | "light">("dark");
  const [stillBroken, setStillBroken] = useState(false);

  const fix = problem ? FIXES[problem] : null;
  const allDone = fix ? completedSteps.size >= fix.fixes.length : false;
  const problemData = problem ? PROBLEMS.find(p => p.id === problem) : null;
  const brandData = brand ? BRANDS_SIMPLE.find(b => b.id === brand) : null;

  const toggleStep = (i: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e); return Object.keys(e).length === 0;
  };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, issue: `Printer Not Working — Problem: ${problem} — Brand: ${brand}`, source: "my-printer-stopped-working" }) }); } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true); setSubmitting(false); setStage("guide");
  };
  const reset = () => { setStage("intro"); setProblem(null); setBrand(null); setCompletedSteps(new Set()); setName(""); setEmail(""); setPhone(""); setSubmitted(false); setStillBroken(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={() => {}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">Printer Not Working Guide</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-orange-500/10 border border-orange-500/30 text-orange-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14} /> Free Learning Guide</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
            My Printer<br /><span className="bg-gradient-to-r from-orange-400 to-amber-300 bg-clip-text text-transparent italic">Stopped Working</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">
            Printer offline? Blank pages? Paper jam? Tap your problem — learn exactly what causes it and what to do, step by step. Plain English, no jargon.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">

          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400" />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-4">Don't panic — most printer problems have a simple cause 🖨️</h2>
                  <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">Select your problem below and we'll walk you through what's causing it and exactly what to do — in plain English, one step at a time.</p>
                  <div className="bg-orange-900/20 border border-orange-700 rounded-2xl p-4 mb-6 flex items-start gap-3">
                    <AlertCircle size={16} className="text-orange-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-orange-300 font-medium">Over 90% of common printer problems can be resolved with a simple restart or setting change. You don't need to call anyone or buy anything new.</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("problem")} className="w-full py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-orange-500/25">
                    Select My Printer Problem <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "problem" && (
            <motion.div key="problem" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("intro")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">What is your printer doing?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">Tap the description that best matches your problem.</p>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {PROBLEMS.map(p => (
                      <motion.button key={p.id} whileTap={{ scale: 0.97 }} onClick={() => { setProblem(p.id); setStage("brand"); }} className="p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-orange-700 text-left transition-all">
                        <div className="text-3xl mb-3">{p.icon}</div>
                        <div className="font-black text-white text-base mb-1">{p.label}</div>
                        <div className="text-zinc-400 text-sm font-medium">{p.desc}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "brand" && (
            <motion.div key="brand" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("problem")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">{problemData?.icon}</span>
                    <span className="font-black text-white text-lg">{problemData?.label}</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">What brand is your printer?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">Some steps are slightly different per brand — we'll show you the right ones.</p>
                  <div className="grid grid-cols-3 sm:grid-cols-5 gap-3">
                    {BRANDS_SIMPLE.map(b => (
                      <motion.button key={b.id} whileTap={{ scale: 0.97 }} onClick={() => { setBrand(b.id); setStage("lead"); }} className="p-5 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-orange-700 text-center transition-all">
                        <div className="text-2xl mb-2">{b.emoji}</div>
                        <div className="font-black text-white text-sm">{b.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "lead" && (
            <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400" />
                <div className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">{problemData?.icon}</div>
                    <h2 className="text-3xl font-black text-white mb-3">Your step-by-step guide is ready!</h2>
                    <p className="text-zinc-400 font-medium text-lg leading-relaxed">Enter your name and email and we'll send your personalised guide for <strong className="text-white">{brandData?.name} — {problemData?.label}</strong> to your inbox, so you can refer back anytime.</p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. James" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500 text-lg placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500 text-lg placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional — for a free call if still stuck)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-orange-500 text-lg placeholder:text-zinc-600" /></div></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-orange-500/25 mb-3">
                    {submitting ? <Loader2 size={24} className="animate-spin" /> : "Send My Guide & Show Steps"}
                  </motion.button>
                  <button onClick={() => setStage("guide")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — show me the steps now</button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "guide" && fix && (
            <motion.div key="guide" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0" /><p className="text-base font-bold text-green-300">Guide sent to {email}!</p></div>)}

              {/* Header */}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-orange-500 to-amber-400" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-3xl">{problemData?.icon}</span>
                    <div>
                      <div className="font-black text-white text-lg">{problemData?.label}</div>
                      <div className="text-zinc-500 text-sm font-medium">{brandData?.name} printer — tick each step as you go</div>
                    </div>
                  </div>
                  {/* Why it happens */}
                  <div className="bg-zinc-800 rounded-2xl p-5 mb-4">
                    <div className="text-sm font-black text-orange-400 mb-2">📖 Why this happens:</div>
                    <p className="text-zinc-300 text-sm font-medium leading-relaxed">{fix.explain}</p>
                    <div className="mt-3"><div className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Common causes:</div>{fix.causes.map(c => (<div key={c} className="flex items-start gap-2 mb-1"><span className="text-zinc-500 text-xs mt-1">•</span><p className="text-zinc-400 text-sm font-medium">{c}</p></div>))}</div>
                  </div>
                  {/* Brand note */}
                  {fix.brandNotes && brand && fix.brandNotes[brand] && (
                    <div className="bg-blue-900/20 border border-blue-800 rounded-2xl p-4">
                      <p className="text-blue-300 text-sm font-medium">{fix.brandNotes[brand]}</p>
                    </div>
                  )}
                  {/* Progress */}
                  <div className="mt-4">
                    <div className="flex justify-between text-sm font-black text-zinc-400 mb-2"><span>{completedSteps.size} of {fix.fixes.length} steps done</span><span>{Math.round((completedSteps.size / fix.fixes.length) * 100)}%</span></div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-orange-500 to-amber-400 rounded-full" animate={{ width: `${(completedSteps.size / fix.fixes.length) * 100}%` }} transition={{ duration: 0.4 }} /></div>
                  </div>
                </div>
              </div>

              {/* Steps */}
              {fix.fixes.map((f, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className={`bg-zinc-900 rounded-2xl border-2 overflow-hidden transition-all ${completedSteps.has(i) ? "border-orange-700" : "border-zinc-800"}`}>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleStep(i)} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${completedSteps.has(i) ? "bg-orange-600 border-orange-500" : "border-zinc-600 hover:border-orange-500"}`}>
                        {completedSteps.has(i) ? <CheckCheck size={18} className="text-white" /> : <span className="text-zinc-400 font-black text-sm">{i + 1}</span>}
                      </motion.button>
                      <div className="flex-1">
                        <h4 className={`font-black text-base mb-3 ${completedSteps.has(i) ? "text-orange-300 line-through opacity-60" : "text-white"}`}>{f.title}</h4>
                        <div className="space-y-2">
                          {f.steps.map((s, si) => (<div key={si} className="flex items-start gap-2"><span className="text-orange-400 font-black text-xs mt-1 shrink-0">{si + 1}.</span><p className="text-zinc-300 text-sm font-medium leading-relaxed">{s}</p></div>))}
                        </div>
                        {f.tip && (<div className="mt-4 bg-amber-900/20 border border-amber-700/50 rounded-xl p-3 flex items-start gap-2"><span className="text-amber-400 text-sm">💡</span><p className="text-amber-300 text-sm font-medium">{f.tip}</p></div>)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* Did it fix it? */}
              {completedSteps.size > 0 && !allDone && (
                <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4"><HelpCircle size={20} className="text-zinc-400" /><span className="font-black text-white">Still not working after a step?</span></div>
                  <p className="text-zinc-400 text-sm font-medium mb-4">Keep working through the steps — many problems are solved at Step 3 or 4. If none of them work, we're here to help.</p>
                  <button onClick={() => setStillBroken(true)} className="text-sm font-bold text-orange-400 hover:text-orange-300 underline transition-colors">I've tried all steps and it's still not working</button>
                </div>
              )}

              {(allDone || stillBroken) && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className={`rounded-[2rem] p-8 text-center border-2 ${allDone && !stillBroken ? "bg-gradient-to-br from-green-900/40 to-emerald-900/20 border-green-700" : "bg-zinc-900 border-zinc-700"}`}>
                  {allDone && !stillBroken ? (<>
                    <div className="text-6xl mb-4">🎉</div>
                    <h3 className="text-2xl font-black text-white mb-2">All steps complete!</h3>
                    <p className="text-zinc-400 font-medium mb-4">Try printing something now. Most printer problems are resolved at this point. If it's still not working, our team can walk through it with you live — no jargon, no rush.</p>
                  </>) : (<>
                    <div className="text-5xl mb-4">🤝</div>
                    <h3 className="text-2xl font-black text-white mb-2">We're here to help</h3>
                    <p className="text-zinc-400 font-medium mb-4">If the steps above haven't resolved the problem, our tutors can walk through it with you live — on a call or video session. Plain English, no jargon, no rush.</p>
                  </>)}
                  <Link href="/contact"><motion.div whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black rounded-2xl shadow-lg cursor-pointer mb-4">Talk to a Tutor — Free <ArrowRight size={18} /></motion.div></Link>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20} /> Try a Different Problem</button>
                <Link href="/tools/set-up-my-new-printer"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-orange-600 to-amber-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Set Up a New Printer <ArrowRight size={20} /></motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Steps may vary by model. Setwise Digital is not affiliated with HP, Canon, Epson, or Brother.</p></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">Why Is My Printer Not Working? — The Complete Learning Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base">
            <div><p className="mb-4">The most common printer problems — offline errors, blank pages, paper jams, and Wi-Fi disconnects — all have simple, learnable causes. Understanding why a printer goes offline (usually a Wi-Fi mismatch) means you can prevent it from happening again, not just fix it this once.</p><p>Over 90% of printer problems are resolved by three actions: a full restart of the printer and router, clearing a stuck print job from the queue, and running a print head cleaning cycle.</p></div>
            <div><p className="mb-4">Blank pages are the most misunderstood printer issue. They are almost never caused by an empty cartridge — they are caused by clogged print head nozzles, which happen when a printer sits unused for several weeks. Running the Head Cleaning function 2–3 times resolves this in virtually all cases.</p><p>This guide is for educational purposes only. Setwise Digital is an independent educational platform not affiliated with HP, Canon, Epson, or Brother.</p></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
