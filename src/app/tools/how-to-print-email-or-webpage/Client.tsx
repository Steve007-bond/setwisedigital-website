"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, CheckCheck } from "lucide-react";

const bgs = [
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
];

type ContentType = "email" | "webpage";
type AppId = "gmail" | "outlook" | "apple_mail" | "yahoo" | "chrome" | "safari" | "edge" | "samsung_internet";
type DeviceId = "windows" | "mac" | "iphone" | "android";

const CONTENT_TYPES = [
  { id: "email" as ContentType, icon: "✉️", label: "An email", desc: "Print something from Gmail, Outlook, or another email" },
  { id: "webpage" as ContentType, icon: "🌐", label: "A webpage or article", desc: "Print something from a website in Chrome, Safari, or Edge" },
];

const EMAIL_APPS: { id: AppId; icon: string; label: string }[] = [
  { id: "gmail", icon: "📧", label: "Gmail" },
  { id: "outlook", icon: "📮", label: "Outlook" },
  { id: "apple_mail", icon: "🍎", label: "Apple Mail" },
  { id: "yahoo", icon: "🟣", label: "Yahoo Mail" },
];

const BROWSER_APPS: { id: AppId; icon: string; label: string }[] = [
  { id: "chrome", icon: "🟡", label: "Google Chrome" },
  { id: "safari", icon: "🔵", label: "Safari" },
  { id: "edge", icon: "💙", label: "Microsoft Edge" },
  { id: "samsung_internet", icon: "📲", label: "Samsung Internet" },
];

const DEVICES: { id: DeviceId; icon: string; label: string }[] = [
  { id: "windows", icon: "💻", label: "Windows PC or Laptop" },
  { id: "mac", icon: "🍎", label: "Mac or MacBook" },
  { id: "iphone", icon: "📱", label: "iPhone or iPad" },
  { id: "android", icon: "🤖", label: "Android Phone" },
];

type Step = { title: string; detail: string; tip?: string };

const GUIDE: Partial<Record<AppId, Partial<Record<DeviceId, Step[]>>>> = {
  gmail: {
    windows: [
      { title: "Open Gmail in your web browser (Chrome or Edge)", detail: "Go to gmail.com and sign in. Find the email you want to print and click it to open it fully." },
      { title: "Click the three dots (⋮) in the top-right of the email", detail: "Look for the three vertical dots in the top-right corner of the email — not the main Gmail window, but inside the email itself.", tip: "Alternatively, look for a small printer icon in the top right of the email." },
      { title: "Click 'Print'", detail: "A print preview opens in a new browser tab, showing exactly how the email will look on paper." },
      { title: "Select your printer from the dropdown", detail: "In the print dialog on the left, click the printer name dropdown and select your printer.", tip: "If your printer isn't listed, make sure it's turned on and connected to the same Wi-Fi as your computer." },
      { title: "Click the blue Print button", detail: "Once you've selected your printer and any settings (colour, pages), click the blue Print button. Your printer will receive the job.", tip: "Keyboard shortcut: with the email open, press Ctrl+P to skip directly to the print dialog." },
    ],
    mac: [
      { title: "Open Gmail in Safari or Chrome on your Mac", detail: "Go to gmail.com. Open the email you want to print." },
      { title: "Click the three dots (⋮) inside the email", detail: "The three dots are in the top-right corner of the email content area." },
      { title: "Click 'Print'", detail: "A print preview opens in a new tab." },
      { title: "Select your printer", detail: "In the print dialog, click the printer dropdown and choose your printer." },
      { title: "Click Print", detail: "Click the Print button to send to your printer.", tip: "Shortcut: press ⌘+P with the email open for the fastest route." },
    ],
    iphone: [
      { title: "Open the Gmail app on your iPhone", detail: "Tap the Gmail app icon. Find and open the email you want to print." },
      { title: "Tap the three dots (⋮) in the top-right corner of the email", detail: "The three dots are inside the email — in the top-right area of the message." },
      { title: "Tap 'Print'", detail: "Scroll through the menu options and tap Print.", tip: "If you don't see Print, tap 'More options' — it may be hidden there." },
      { title: "Tap 'Select Printer'", detail: "Tap the Printer option at the top of the print screen to see available printers." },
      { title: "Select your printer and tap Print", detail: "Tap your printer from the AirPrint list. Adjust copies if needed. Tap the Print button in the top right.", tip: "Your printer must be on the same Wi-Fi as your iPhone for AirPrint to find it." },
    ],
    android: [
      { title: "Open Gmail app on your Android phone", detail: "Tap Gmail. Find and open the email you want to print." },
      { title: "Tap the three dots (⋮) in the top right of the email", detail: "These three dots are inside the email — at the very top right of the message." },
      { title: "Tap 'Print'", detail: "Scroll through the menu and tap Print." },
      { title: "Select your printer from the dropdown", detail: "Tap the printer name at the top of the print screen and choose your printer from the list.", tip: "If your printer doesn't appear, make sure it's on the same Wi-Fi as your phone." },
      { title: "Tap the Print button", detail: "Tap the print button (printer icon) to send the job to your printer." },
    ],
  },
  outlook: {
    windows: [
      { title: "Open the Outlook desktop app or go to outlook.com", detail: "Open Microsoft Outlook on your computer, or go to outlook.com in your browser. Open the email you want to print." },
      { title: "Click File → Print (desktop app) OR click the three dots (web)", detail: "Desktop app: click 'File' in the top-left menu bar, then click 'Print'. Web (outlook.com): click the three dots (...) in the top-right of the email and click 'Print'.", tip: "In the desktop Outlook app, pressing Ctrl+P is the fastest way to print." },
      { title: "Choose your printer in the print preview", detail: "A print preview window opens. Select your printer from the 'Printer' dropdown." },
      { title: "Adjust settings if needed", detail: "You can change the number of copies, page range, or print in black and white here." },
      { title: "Click Print", detail: "Click the Print button to send the email to your printer.", tip: "To print just part of an email thread, select 'Print Selection' under Settings before clicking Print." },
    ],
    mac: [
      { title: "Open Outlook on your Mac or go to outlook.com in Safari", detail: "Open the Outlook app or visit outlook.com in your browser. Find the email to print." },
      { title: "Desktop: File → Print. Web: click three dots → Print", detail: "In the Mac app: click File at the top of the screen → Print. On outlook.com: click the three dots (...) in the email and click Print." },
      { title: "Select your printer", detail: "In the print dialog, choose your printer from the dropdown.", tip: "Shortcut: ⌘+P opens the print dialog instantly in the Outlook Mac app." },
      { title: "Click Print", detail: "Click Print to send the email to your printer." },
    ],
    iphone: [
      { title: "Open the Outlook app on your iPhone", detail: "Tap Outlook. Open the email you want to print." },
      { title: "Tap the three dots (...) at the top of the email", detail: "These three dots are in the top-right corner inside the email view." },
      { title: "Tap 'Print Conversation'", detail: "This option prints the entire email thread. If you want just one email, scroll to find a single-message print option.", tip: "Outlook on iPhone calls it 'Print Conversation' rather than just 'Print'." },
      { title: "Select your printer", detail: "Tap Printer at the top and select your AirPrint-compatible printer." },
      { title: "Tap Print", detail: "Tap the Print button in the top right corner.", tip: "Your iPhone and printer must be on the same Wi-Fi network." },
    ],
    android: [
      { title: "Open the Outlook app on Android", detail: "Open the Outlook app and find the email to print." },
      { title: "Tap the three dots (...) in the email", detail: "Tap the dots in the top right of the email." },
      { title: "Tap 'Print'", detail: "Scroll through the options and tap Print." },
      { title: "Select printer and tap Print", detail: "Tap the printer name dropdown, choose your printer, and tap Print.", tip: "If no printer appears, make sure your Android print service is enabled: Settings → Connected devices → Printing." },
    ],
  },
  apple_mail: {
    mac: [
      { title: "Open Mail on your Mac", detail: "Click the Mail app in the Dock or Launchpad. Find and open the email you want to print." },
      { title: "Press ⌘+P or go to File → Print", detail: "Hold Command and press P — this is the fastest way. Or click 'File' in the menu bar → Print." },
      { title: "Check the print preview", detail: "A preview shows exactly how the email will look on paper. Check the formatting is correct." },
      { title: "Select your printer from the dropdown", detail: "Click the printer dropdown at the top of the print dialog and choose your printer." },
      { title: "Click Print", detail: "Click Print to send to your printer.", tip: "To increase the text size for printing: Mail → Settings → Fonts & Colors → increase the font size, then print." },
    ],
    iphone: [
      { title: "Open the Mail app on your iPhone", detail: "Tap the Mail icon. Open the email you want to print." },
      { title: "Tap the Reply arrow at the bottom of the email", detail: "The curved arrow icon at the bottom of the screen opens a menu." },
      { title: "Scroll down and tap 'Print'", detail: "In the popup menu, scroll down to find Print and tap it.", tip: "If you don't see Print, swipe up in the popup menu to reveal more options." },
      { title: "Select your printer", detail: "Tap Printer at the top of the print screen. Choose your AirPrint printer." },
      { title: "Tap Print", detail: "Tap the Print button in the top right." },
    ],
    windows: [
      { title: "Apple Mail is a Mac app", detail: "Apple Mail is only available on Mac and iPhone/iPad — it's not available on Windows computers.", tip: "On Windows, use Gmail (gmail.com), Outlook, or Yahoo Mail in your browser instead." },
    ],
    android: [
      { title: "Apple Mail is only on Apple devices", detail: "Apple Mail is not available on Android phones.", tip: "On Android, use the Gmail app or Outlook app for email printing." },
    ],
  },
  yahoo: {
    windows: [
      { title: "Go to mail.yahoo.com in your browser", detail: "Open Chrome or Edge and go to mail.yahoo.com. Sign in and open the email you want to print." },
      { title: "Click the three dots (...) or printer icon in the email", detail: "Look in the top-right corner of the email for a three-dot menu or printer icon." },
      { title: "Click 'Print message'", detail: "A print-friendly version of the email opens in a new window." },
      { title: "Select your printer", detail: "In the print dialog, click the printer dropdown and choose your printer." },
      { title: "Click Print", detail: "Click Print to send to your printer.", tip: "Yahoo Mail web: Ctrl+P also works once the print preview is open." },
    ],
    mac: [
      { title: "Open mail.yahoo.com in Safari or Chrome", detail: "Go to mail.yahoo.com. Open the email to print." },
      { title: "Click three dots → Print message", detail: "Top right of the email → three dots → Print message." },
      { title: "Select printer and print", detail: "Choose your printer. Press ⌘+P or click Print." },
    ],
    iphone: [
      { title: "Open the Yahoo Mail app or go to mail.yahoo.com in Safari", detail: "Either method works on iPhone." },
      { title: "Open the email you want to print", detail: "Tap the email to open it fully." },
      { title: "Tap the three dots → Print", detail: "In the Yahoo Mail app: tap dots → Print. In Safari: tap the Share icon → Print." },
      { title: "Select printer and tap Print", detail: "Choose your AirPrint printer and tap Print." },
    ],
    android: [
      { title: "Open the Yahoo Mail app or go to mail.yahoo.com in Chrome", detail: "Either method works on Android." },
      { title: "Open the email to print", detail: "Tap to open the email." },
      { title: "Tap the three dots → Print", detail: "In the app: tap three dots → Print. In Chrome browser: tap three dots at top → Print." },
      { title: "Select printer and tap Print", detail: "Choose your printer and tap the Print button." },
    ],
  },
  chrome: {
    windows: [
      { title: "Open the webpage you want to print in Google Chrome", detail: "Navigate to the page in Chrome. Make sure it's fully loaded before printing." },
      { title: "Click the three dots (⋮) in the top-right of Chrome", detail: "The three vertical dots are in the very top-right corner of the Chrome browser window." },
      { title: "Click 'Print...'", detail: "A print preview opens on the right side of your screen, showing a preview of the page.", tip: "The keyboard shortcut Ctrl+P opens the print dialog instantly — no need for the menu." },
      { title: "Select your printer from the dropdown", detail: "In the print panel on the left, click the printer name and choose your printer." },
      { title: "Click the blue Print button", detail: "Click Print to send the page to your printer.", tip: "To print in black and white and save ink: under 'More settings' → Colour → select 'Black and white'." },
    ],
    mac: [
      { title: "Open the webpage in Chrome on your Mac", detail: "Navigate to the page you want to print in Chrome." },
      { title: "Press ⌘+P or click three dots → Print", detail: "The fastest way: hold Command and press P. Or click the three dots top-right → Print." },
      { title: "Check the print preview", detail: "A print preview shows how the page will look on paper." },
      { title: "Select your printer", detail: "Click the printer dropdown and choose your printer." },
      { title: "Click Print", detail: "Click the Print button to send to your printer.", tip: "Chrome on Mac gives excellent print quality — better than some other browsers for web pages with photos." },
    ],
    iphone: [
      { title: "Open the webpage in Chrome on your iPhone", detail: "Navigate to the page in the Chrome app." },
      { title: "Tap the Share button (three dots at the bottom or top of Chrome)", detail: "In Chrome on iPhone: tap the three dots at the bottom of the screen. Or tap the Share button (box with arrow up) if visible." },
      { title: "Tap 'Share...' then 'Print'", detail: "In the Chrome menu, tap Share... to open the iOS share sheet. Then scroll down and tap Print." },
      { title: "Select your printer", detail: "Tap Printer and choose your AirPrint-compatible printer." },
      { title: "Tap Print", detail: "Tap the Print button in the top right." },
    ],
    android: [
      { title: "Open the webpage in Chrome on Android", detail: "Navigate to the page you want to print." },
      { title: "Tap the three dots (⋮) in the top-right corner of Chrome", detail: "The three dots are in the top-right of the Chrome browser." },
      { title: "Tap 'Share'", detail: "In the dropdown menu, tap Share." },
      { title: "Tap 'Print'", detail: "In the Share sheet, scroll to find Print and tap it.", tip: "Alternatively, tap the three dots → tap the Download icon → tap Print if Share doesn't show Print." },
      { title: "Select printer and tap Print", detail: "Choose your printer from the list. Tap the Print button." },
    ],
  },
  safari: {
    mac: [
      { title: "Open the webpage in Safari on your Mac", detail: "Navigate to the page you want to print in Safari." },
      { title: "Press ⌘+P or go to File → Print", detail: "Hold Command and press P for the fastest route. Or click File in the menu bar → Print." },
      { title: "Check the print preview", detail: "Safari shows a full preview. Check the page looks correct." },
      { title: "Select your printer", detail: "Click the printer dropdown and choose your printer." },
      { title: "Click Print", detail: "Click Print to send to your printer.", tip: "Safari's Reader View (View → Show Reader) removes ads and clutter before printing — great for articles." },
    ],
    iphone: [
      { title: "Open the webpage in Safari on your iPhone", detail: "Navigate to the article or page in Safari." },
      { title: "Tap the Share button at the bottom of Safari", detail: "The Share button is the square icon with an upward arrow at the bottom of the Safari screen." },
      { title: "Scroll down and tap Print", detail: "In the Share sheet, scroll down through the options until you see Print. Tap it." },
      { title: "Tap Printer to select your printer", detail: "Tap the Printer button at the top of the screen. Choose your AirPrint printer from the list." },
      { title: "Tap Print in the top right", detail: "Tap the Print button to send the page to your printer.", tip: "To print a cleaner version without ads: tap the 'AA' button in the Safari address bar → Show Reader View, then print." },
    ],
    windows: [
      { title: "Safari is primarily a Mac and iPhone app", detail: "Safari is not available on Windows computers. Use Chrome, Edge, or Firefox instead.", tip: "Chrome is the best Windows browser for printing — press Ctrl+P to print any page." },
    ],
    android: [
      { title: "Safari is an Apple app — not available on Android", detail: "Safari is not available on Android phones. Use Chrome or Samsung Internet instead.", tip: "Chrome on Android prints well — tap the three dots at the top right → Share → Print." },
    ],
  },
  edge: {
    windows: [
      { title: "Open the webpage in Microsoft Edge", detail: "Navigate to the page you want to print in Edge." },
      { title: "Press Ctrl+P or click three dots → Print", detail: "Keyboard shortcut Ctrl+P is fastest. Or click the three dots (...) top-right → Print.", tip: "Edge is excellent for printing — it often gives a cleaner result than other browsers." },
      { title: "Check the print preview on the right", detail: "Edge shows a live print preview. You can see exactly how the page will look." },
      { title: "Select your printer from the dropdown", detail: "Click the printer name and choose your printer." },
      { title: "Click Print", detail: "Click Print to send the page to your printer.", tip: "Edge has a 'Print in Immersive Reader' option that removes all ads before printing — look for it under More Settings." },
    ],
    mac: [
      { title: "Open the webpage in Microsoft Edge on Mac", detail: "Navigate to the page in Edge." },
      { title: "Press ⌘+P or three dots → Print", detail: "Hold Command + P, or click three dots → Print." },
      { title: "Check print preview", detail: "Edge shows a live print preview on the right side." },
      { title: "Select printer and click Print", detail: "Choose your printer from the dropdown. Click Print." },
    ],
    iphone: [
      { title: "Open the webpage in Microsoft Edge on iPhone", detail: "Navigate to the page in the Edge app." },
      { title: "Tap the three dots (...) at the bottom of Edge", detail: "The three dots are at the bottom of the Edge browser screen." },
      { title: "Tap Share → then Print", detail: "Tap Share in the menu. Then tap Print from the iOS share sheet." },
      { title: "Select AirPrint printer and tap Print", detail: "Choose your printer and tap Print." },
    ],
    android: [
      { title: "Open the page in Edge on Android", detail: "Navigate to the page in the Edge browser app." },
      { title: "Tap three dots → Share → Print", detail: "Tap three dots at the bottom → Share → Print in the share sheet." },
      { title: "Select printer and tap Print", detail: "Choose your printer from the list and tap Print." },
    ],
  },
  samsung_internet: {
    android: [
      { title: "Open the webpage in Samsung Internet on your phone", detail: "Navigate to the page you want to print." },
      { title: "Tap the three lines (≡) menu at the bottom right", detail: "The Samsung Internet menu is three horizontal lines at the bottom right." },
      { title: "Tap Share", detail: "In the menu, tap the Share option." },
      { title: "Tap Print", detail: "In the share sheet, find and tap Print." },
      { title: "Select your printer and tap Print", detail: "Choose your printer from the list. Tap the Print button.", tip: "Samsung Internet also has an 'Add page to' option which can save pages to read later offline." },
    ],
    windows: [{ title: "Samsung Internet is a mobile app only", detail: "Samsung Internet is an Android phone browser — not available on Windows.", tip: "On Windows, use Chrome (free), Edge (built-in), or Firefox." }],
    mac: [{ title: "Samsung Internet is a mobile app only", detail: "Not available on Mac.", tip: "On Mac, use Safari (built-in) or Chrome." }],
    iphone: [{ title: "Samsung Internet is Android only", detail: "Samsung Internet is only available on Android phones — not on iPhone.", tip: "On iPhone, use Safari (built-in) or Chrome." }],
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro" | "content" | "app" | "device" | "lead" | "guide">("intro");
  const [contentType, setContentType] = useState<ContentType | null>(null);
  const [app, setApp] = useState<AppId | null>(null);
  const [device, setDevice] = useState<DeviceId | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);

  const steps = app && device ? (GUIDE[app]?.[device] ?? []) : [];
  const appData = [...EMAIL_APPS, ...BROWSER_APPS].find(a => a.id === app);
  const deviceData = DEVICES.find(d => d.id === device);
  const allDone = completedSteps.size >= steps.length && steps.length > 0;

  const toggleStep = (i: number) => { setCompletedSteps(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; }); };
  const validate = () => { const e: Record<string, string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, issue: `Print Email/Webpage — App: ${app} — Device: ${device}`, source: "how-to-print-email-or-webpage" }) }); } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true); setSubmitting(false); setStage("guide");
  };
  const reset = () => { setStage("intro"); setContentType(null); setApp(null); setDevice(null); setCompletedSteps(new Set()); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={() => {}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">Print Email or Webpage</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-teal-500/10 border border-teal-500/30 text-teal-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14} /> Free Guide · Gmail, Outlook, Chrome & Safari</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
            Print an Email<br /><span className="bg-gradient-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent italic">or Webpage</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Select your email or browser, then your device. Get the exact menu steps for your specific combination — nothing else.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400" />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-4">Every app hides the Print button differently 🖨️</h2>
                  <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">Gmail, Outlook, Chrome, and Safari all have the print option — but it's in a different place in each one. This guide gives you the exact taps and clicks for your specific app and device.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {[{ icon: "📧", label: "Gmail" }, { icon: "📮", label: "Outlook" }, { icon: "🟡", label: "Chrome" }, { icon: "🔵", label: "Safari" }].map(i => (<div key={i.label} className="bg-zinc-800 rounded-xl p-3 text-center"><div className="text-2xl mb-1">{i.icon}</div><div className="text-xs font-black text-white">{i.label}</div></div>))}
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("content")} className="w-full py-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-teal-500/25">
                    Find My Print Button <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "content" && (
            <motion.div key="content" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("intro")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">What do you want to print?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">This determines which app options we show you.</p>
                  <div className="space-y-3">
                    {CONTENT_TYPES.map(c => (<motion.button key={c.id} whileTap={{ scale: 0.98 }} onClick={() => { setContentType(c.id); setStage("app"); }} className="w-full p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-teal-700 text-left flex items-center gap-4 transition-all"><span className="text-3xl">{c.icon}</span><div><div className="font-black text-white text-base">{c.label}</div><div className="text-zinc-400 text-sm font-medium">{c.desc}</div></div></motion.button>))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "app" && (
            <motion.div key="app" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("content")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">{contentType === "email" ? "Which email app are you using?" : "Which browser are you using?"}</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">The exact button location is different in each app.</p>
                  <div className="grid grid-cols-2 gap-3">
                    {(contentType === "email" ? EMAIL_APPS : BROWSER_APPS).map(a => (<motion.button key={a.id} whileTap={{ scale: 0.97 }} onClick={() => { setApp(a.id); setStage("device"); }} className="p-5 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-teal-700 text-left transition-all"><div className="text-2xl mb-2">{a.icon}</div><div className="font-black text-white text-sm">{a.label}</div></motion.button>))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "device" && (
            <motion.div key="device" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("app")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <div className="flex items-center gap-3 mb-6"><span className="text-3xl">{appData?.icon}</span><span className="font-black text-white text-lg">{appData?.label}</span></div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">What device are you using?</h3>
                  <div className="grid grid-cols-2 gap-3">
                    {DEVICES.map(d => (<motion.button key={d.id} whileTap={{ scale: 0.97 }} onClick={() => { setDevice(d.id); setStage("lead"); }} className="p-5 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-teal-700 text-left transition-all"><div className="text-2xl mb-2">{d.icon}</div><div className="font-black text-white text-sm">{d.label}</div></motion.button>))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "lead" && (
            <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400" />
                <div className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="text-5xl mb-4">{appData?.icon}</div>
                    <h2 className="text-3xl font-black text-white mb-3">Your steps are ready!</h2>
                    <p className="text-zinc-400 font-medium text-lg">Get your <strong className="text-white">{appData?.label} on {deviceData?.label}</strong> printing steps sent to your inbox for easy reference.</p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Susan" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-teal-500 text-lg placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-teal-500 text-lg placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-teal-500 text-lg placeholder:text-zinc-600" /></div></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-teal-500/25 mb-3">
                    {submitting ? <Loader2 size={24} className="animate-spin" /> : "Send My Steps & Show Guide"}
                  </motion.button>
                  <button onClick={() => setStage("guide")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me the steps</button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "guide" && (
            <motion.div key="guide" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0" /><p className="text-base font-bold text-green-300">Steps sent to {email}!</p></div>)}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-teal-500 to-emerald-400" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-2"><span className="text-2xl">{appData?.icon}</span><span className="text-2xl">{deviceData?.icon}</span><div><div className="font-black text-white">{appData?.label} on {deviceData?.label}</div><div className="text-zinc-500 text-sm">Tick each step when done</div></div></div>
                  <div className="mt-3"><div className="flex justify-between text-sm font-black text-zinc-400 mb-2"><span>{completedSteps.size} of {steps.length} done</span><span>{steps.length > 0 ? Math.round((completedSteps.size / steps.length) * 100) : 0}%</span></div><div className="h-2 bg-zinc-800 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-teal-500 to-emerald-400 rounded-full" animate={{ width: `${steps.length > 0 ? (completedSteps.size / steps.length) * 100 : 0}%` }} transition={{ duration: 0.4 }} /></div></div>
                </div>
              </div>
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className={`bg-zinc-900 rounded-2xl border-2 overflow-hidden transition-all ${completedSteps.has(i) ? "border-teal-700" : "border-zinc-800"}`}>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleStep(i)} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${completedSteps.has(i) ? "bg-teal-600 border-teal-500" : "border-zinc-600 hover:border-teal-500"}`}>
                        {completedSteps.has(i) ? <CheckCheck size={18} className="text-white" /> : <span className="text-zinc-400 font-black text-sm">{i + 1}</span>}
                      </motion.button>
                      <div className="flex-1">
                        <h4 className={`font-black text-base mb-2 ${completedSteps.has(i) ? "text-teal-300 line-through opacity-60" : "text-white"}`}>{step.title}</h4>
                        <p className="text-zinc-300 text-sm font-medium leading-relaxed">{step.detail}</p>
                        {step.tip && (<div className="mt-3 bg-amber-900/20 border border-amber-700/50 rounded-xl p-3 flex items-start gap-2"><span className="text-amber-400 text-sm">💡</span><p className="text-amber-300 text-sm font-medium">{step.tip}</p></div>)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {allDone && (<motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-teal-900/40 to-emerald-900/20 border-2 border-teal-700 rounded-[2rem] p-8 text-center"><div className="text-5xl mb-4">🎉</div><h3 className="text-2xl font-black text-white mb-2">All done!</h3><p className="text-zinc-400 font-medium mb-4">You've completed all the steps. Your document should now be printing. If you'd like help with any other printing task, our tutors are here whenever you're ready.</p><Link href="/contact"><motion.div whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black rounded-2xl shadow-lg cursor-pointer">Talk to a Tutor <ArrowRight size={18} /></motion.div></Link></motion.div>)}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20} /> Try Another App</button>
                <Link href="/tools/my-printer-stopped-working"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-teal-600 to-emerald-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Printer Not Working? <ArrowRight size={20} /></motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Menu locations may vary slightly between app versions. Not affiliated with Google, Microsoft, Apple, or Samsung.</p></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>
      <section className="border-t border-zinc-800 py-20"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-4xl font-black text-white mb-8 tracking-tight">How to Print an Email or Webpage — Every App Explained</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base"><div><p className="mb-4">Printing an email from Gmail is straightforward on a computer — click the three dots inside the email and select Print. On iPhone, it's the Gmail app's three dots menu → Print. The challenge is that Gmail on iPhone uses a different menu than Gmail in a browser on Windows or Mac.</p><p>The universal shortcut across all Windows applications is Ctrl+P, and on Mac it's ⌘+P. These shortcuts work in Chrome, Edge, Outlook desktop, and every other program — no need to find the menu.</p></div><div><p className="mb-4">Printing from Safari on iPhone uses the Share button (the square with an upward arrow at the bottom of Safari). This Share button is how iPhone accesses printing in all apps — find it once, use it everywhere. Chrome on iPhone has a slightly different flow: tap the three dots at the bottom → Share → Print.</p><p>For webpages with lots of ads, use Reader View (Safari: tap AA in address bar) or Chrome's Print Preview which automatically suggests a clean print layout.</p></div></div></div></section>
      <Footer />
    </div>
  );
}
