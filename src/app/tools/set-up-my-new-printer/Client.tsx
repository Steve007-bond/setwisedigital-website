"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import {
  CheckCircle2, ArrowRight, ArrowLeft, ChevronRight,
  Mail, Phone, User, Loader2, Shield, Zap, RefreshCw,
  Wifi, Usb, Bluetooth, Printer, AlertCircle, CheckCheck,
} from "lucide-react";

const bgs = [
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1563520239648-a8ade7166c97?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
];

type Brand = "hp" | "canon" | "epson" | "brother" | "other";
type Connection = "wifi" | "usb" | "bluetooth";

const BRANDS: { id: Brand; name: string; emoji: string; color: string }[] = [
  { id: "hp", name: "HP", emoji: "🔵", color: "from-blue-600 to-blue-500", },
  { id: "canon", name: "Canon", emoji: "🔴", color: "from-red-600 to-red-500" },
  { id: "epson", name: "Epson", emoji: "🟣", color: "from-violet-600 to-violet-500" },
  { id: "brother", name: "Brother", emoji: "⚫", color: "from-zinc-600 to-zinc-500" },
  { id: "other", name: "Other Brand", emoji: "🖨️", color: "from-indigo-600 to-indigo-500" },
];

const CONNECTIONS: { id: Connection; name: string; icon: React.ReactNode; desc: string; best: string }[] = [
  { id: "wifi", name: "Wi-Fi (Wireless)", icon: <Wifi size={28} />, desc: "Print from anywhere in your home", best: "Most popular — no cables needed" },
  { id: "usb", name: "USB Cable", icon: <Usb size={28} />, desc: "Direct cable from printer to computer", best: "Simplest — fastest setup" },
  { id: "bluetooth", name: "Bluetooth", icon: <Bluetooth size={28} />, desc: "Wireless short-range connection", best: "Good for phones and tablets" },
];

// Setup steps per brand + connection type
const SETUP_STEPS: Record<Brand, Record<Connection, { title: string; detail: string; tip?: string }[]>> = {
  hp: {
    wifi: [
      { title: "Unbox and place your printer", detail: "Remove all packaging tape and foam. Place the printer on a flat surface within 10 feet of your Wi-Fi router.", tip: "Keep the box for 30 days in case you need to return it." },
      { title: "Connect the power cable and turn on", detail: "Plug in the power cable and press the Power button (usually top-right). Wait for the startup screen to appear — this takes 1–2 minutes.", tip: "If the screen stays blank, press and hold the power button for 5 seconds." },
      { title: "Load paper and install ink cartridges", detail: "Open the paper tray at the front, slide in plain white paper, and push it back. Then open the front cover and insert the ink cartridges — they click into place. Each cartridge is colour-coded so you can't mix them up.", tip: "Remove the orange tab from each cartridge before inserting." },
      { title: "Connect to your Wi-Fi network", detail: "On the printer screen, tap Wireless Setup Wizard or Network. Select your home Wi-Fi name from the list and enter your password. The printer will show a confirmation message when connected.", tip: "Your Wi-Fi password is usually on the back of your router on a sticker." },
      { title: "Print a test page", detail: "On the printer screen, tap Settings → Reports → Print Test Page. If colours and text look clear, your printer is ready. On your computer, go to Settings → Printers and add the HP printer when it appears.", tip: "If the printer doesn't appear, make sure your computer is on the same Wi-Fi network." },
    ],
    usb: [
      { title: "Unbox and place your printer", detail: "Remove all packaging and place the printer near your computer — within cable length. USB cables are usually 6 feet long.", tip: "Check if a USB cable is included — many HP printers don't include one." },
      { title: "Connect power and turn on", detail: "Plug in the power cable, press the Power button, and wait for startup. Do NOT connect the USB cable yet.", tip: "Always power on before connecting the USB cable." },
      { title: "Load paper and install ink cartridges", detail: "Load plain paper in the front tray. Open the front cover and insert ink cartridges (remove orange tab first). Each slot is colour-coded.", tip: "Press each cartridge firmly until you hear a click." },
      { title: "Connect the USB cable", detail: "Plug one end into the printer's USB port (usually the back) and the other end into your computer. Windows will automatically detect the printer within 30 seconds.", tip: "On Mac, go to System Settings → Printers & Scanners to add it manually if it doesn't appear." },
      { title: "Print a test page", detail: "Open any document on your computer, press Ctrl+P (Windows) or Cmd+P (Mac), select your HP printer from the list, and click Print.", tip: "If it prints correctly, you're all done! No software install needed." },
    ],
    bluetooth: [
      { title: "Unbox, power on, and load supplies", detail: "Remove packaging, connect power, press the Power button, load paper, and install ink cartridges (remove orange tabs first).", tip: "Bluetooth works within 30 feet — stay close to the printer." },
      { title: "Enable Bluetooth on your printer", detail: "On the printer screen, tap Settings → Wireless → Bluetooth. Make sure Bluetooth is turned On. The printer will show as discoverable.", tip: "Not all HP printers support Bluetooth — check your model's manual." },
      { title: "Enable Bluetooth on your phone or tablet", detail: "On iPhone: Settings → Bluetooth. On Android: Settings → Connections → Bluetooth. Toggle Bluetooth ON.", tip: "Keep your phone within 10 feet of the printer during setup." },
      { title: "Pair your phone with the printer", detail: "Your printer name (e.g. 'HP DeskJet 4155') will appear in your phone's Bluetooth list. Tap it to pair. You may see a PIN on the printer screen — type it on your phone to confirm.", tip: "Download the HP Smart app for the easiest Bluetooth printing experience." },
      { title: "Print a test page", detail: "Open a photo or document on your phone, tap Share → Print, and select your HP printer. If it prints, the connection is working.", tip: "The HP Smart app (free) makes printing, scanning, and checking ink levels much easier." },
    ],
  },
  canon: {
    wifi: [
      { title: "Unbox and set up your Canon printer", detail: "Remove all tape and foam padding. Place on a flat surface. Open the paper tray and load plain white paper.", tip: "Look for a Quick Start Guide inside the box — Canon's guides are very clear." },
      { title: "Power on and install ink cartridges", detail: "Connect the power cable and press On. The carriage will move to the center — lift the cover and insert the ink cartridges in the correct colour slots. Press each down firmly.", tip: "Canon cartridges are labelled by colour — match the label to the slot colour." },
      { title: "Use Canon PRINT Inkjet app for Wi-Fi setup", detail: "Download the free Canon PRINT Inkjet/SELPHY app on your phone. Open it, tap Set Up Printer, and follow the on-screen steps. The app handles the Wi-Fi connection automatically.", tip: "This is the easiest method — Canon's app is very straightforward." },
      { title: "Or connect manually via printer screen", detail: "On the printer touchscreen, tap Wi-Fi Setup → Wireless LAN Setup → Standard setup. Select your Wi-Fi name and enter the password.", tip: "Your Wi-Fi password is on the back of your router." },
      { title: "Print an alignment page", detail: "Canon printers automatically print an alignment page after setup. This calibrates the print heads. Let it finish before printing anything else.", tip: "If print quality looks streaky, tap Maintenance → Deep Cleaning on the printer screen." },
    ],
    usb: [
      { title: "Unbox and position near your computer", detail: "Remove all packaging. Place the printer within USB cable distance of your computer (usually 6 feet).", tip: "Canon USB cables are not always included — check what's in the box." },
      { title: "Power on and install ink", detail: "Connect power, press On, wait for startup, then install ink cartridges in their colour-coded slots.", tip: "Always install ink before connecting the USB cable." },
      { title: "Connect USB cable — driver installs automatically", detail: "Connect the USB cable from printer to computer. On Windows 10/11, the driver installs automatically within 1 minute. On Mac, you may need to add it in System Settings → Printers.", tip: "If Windows doesn't install the driver, visit canon.com/support and search your model number." },
      { title: "Load paper and run alignment", detail: "Load plain white paper in the tray. Canon may print an automatic alignment page — let it finish.", tip: "Don't skip the alignment page — it ensures text and photos print crisp and straight." },
      { title: "Test print", detail: "Open any document, press Ctrl+P (Windows) or Cmd+P (Mac), select your Canon printer, and print a test page.", tip: "All done! Your Canon printer is ready." },
    ],
    bluetooth: [
      { title: "Unbox, power on, install ink and paper", detail: "Remove packaging, plug in power, press On, install ink cartridges, load paper.", tip: "Have your phone nearby — you'll need it for the next steps." },
      { title: "Download Canon PRINT Inkjet app", detail: "Download the free Canon PRINT Inkjet/SELPHY app from the App Store (iPhone) or Google Play (Android).", tip: "The app is the simplest way to set up any Canon printer wirelessly." },
      { title: "Enable Bluetooth on your phone", detail: "iPhone: Settings → Bluetooth → ON. Android: Settings → Connections → Bluetooth → ON.", tip: "Stay within 10 feet of the printer." },
      { title: "Open Canon app and select Bluetooth setup", detail: "In the Canon PRINT app, tap the + button → Add Printer → Bluetooth. The app will find your printer automatically.", tip: "Make sure Bluetooth is enabled on the printer too — check Settings on the printer screen." },
      { title: "Print your first page", detail: "In the Canon app, tap Print → select a photo or document → tap Print. Your Canon printer will receive the job wirelessly.", tip: "Bookmark this app — you can also use it to check ink levels and scan documents." },
    ],
  },
  epson: {
    wifi: [
      { title: "Unbox your Epson printer", detail: "Remove all packaging tape and foam. Important: Epson EcoTank printers need ink filling before first use — this takes about 10 minutes.", tip: "If you have an EcoTank, fill the ink tanks before turning on the printer." },
      { title: "Fill ink tanks or install cartridges", detail: "EcoTank: Use the included ink bottles to fill each tank — match the colour to the tank. Cartridge printers: open the cover and insert cartridges until they click.", tip: "EcoTank ink doesn't run out for months — fill carefully to avoid spills." },
      { title: "Power on and load paper", detail: "Press the Power button, wait for startup (up to 3 minutes for EcoTank initial charging), then load plain white paper.", tip: "EcoTank printers charge the ink system on first startup — this is normal." },
      { title: "Connect to Wi-Fi using the Epson Smart Panel app", detail: "Download the free Epson Smart Panel app. Open it, tap Set Up Printer, and follow the steps. Or on the printer touchscreen tap Wi-Fi Setup → Wi-Fi Setup Wizard → select your network and enter the password.", tip: "Your Wi-Fi password is on the sticker on the back of your router." },
      { title: "Print a nozzle check pattern", detail: "On the printer screen tap Maintenance → Nozzle Check. This prints a pattern to confirm all print heads are working. If any lines are missing, run a Head Cleaning.", tip: "Always do a nozzle check before your first real print job." },
    ],
    usb: [
      { title: "Unbox and prepare ink", detail: "Remove all packaging. EcoTank printers: fill the ink tanks before setup. Cartridge printers: install cartridges. Load plain paper.", tip: "Don't skip ink setup — the printer won't work without ink." },
      { title: "Power on", detail: "Connect the power cable and press the Power button. Wait for full startup — EcoTank printers take 2–3 minutes on first use.", tip: "The startup takes longer than other brands — this is normal for Epson." },
      { title: "Connect USB cable", detail: "Connect the USB cable from printer to computer. Do NOT connect it before powering on.", tip: "Windows automatically installs the Epson driver. Mac may ask you to visit epson.com/support." },
      { title: "Add printer on your computer", detail: "Windows: should appear automatically in Settings → Printers. Mac: System Settings → Printers & Scanners → + to add.", tip: "If it doesn't appear, download the driver from epson.com/support and search your model." },
      { title: "Run nozzle check and test print", detail: "From the printer screen or Epson software, run a Nozzle Check. Then print a test page from your computer.", tip: "Epson printers need to be used at least once a week to prevent ink drying." },
    ],
    bluetooth: [
      { title: "Unbox, fill ink or install cartridges, load paper", detail: "Complete all physical setup first — Epson requires ink and paper before any wireless setup.", tip: "EcoTank: fill all four colour tanks completely using the included bottles." },
      { title: "Power on the printer", detail: "Press Power and wait for full startup. Epson EcoTank printers charge the system on first boot — wait until the home screen appears.", tip: "Don't interrupt the first startup — it can take up to 3 minutes." },
      { title: "Download Epson Smart Panel app", detail: "Download Epson Smart Panel (free) from the App Store or Google Play on your phone.", tip: "This app handles Wi-Fi, Bluetooth, and scan functions all in one place." },
      { title: "Open app and select Bluetooth connection", detail: "In Epson Smart Panel, tap Set Up Printer → Bluetooth. Make sure Bluetooth is on for both your phone and the printer.", tip: "Some older Epson models don't support Bluetooth — the app will tell you if yours doesn't." },
      { title: "Print a test photo or document", detail: "In the Epson Smart Panel app, tap Print → choose a photo or file → Print. Your printer will receive it wirelessly.", tip: "Tip: Use Epson Smart Panel to check ink levels — it shows exact tank fill levels for EcoTank." },
    ],
  },
  brother: {
    wifi: [
      { title: "Unbox your Brother printer", detail: "Remove all tape and protective strips. Open the scanner lid and remove any internal packing. Load plain white paper in the tray.", tip: "Brother printers have tape on many surfaces — check inside the paper tray and ink compartment." },
      { title: "Install ink cartridges and power on", detail: "Open the ink cartridge cover, unwrap cartridges, and insert in the correct slots (colours are marked). Close the cover, connect the power cable, and press Power.", tip: "Brother cartridges have a protective strip — peel it off before inserting." },
      { title: "Set up Wi-Fi using the Brother iPrint&Scan app", detail: "Download the free Brother iPrint&Scan app on your phone. Open it, tap Add a Printer → follow the guided Wi-Fi setup. The app connects the printer to your network automatically.", tip: "This is the easiest method — the app is very clear and takes about 2 minutes." },
      { title: "Or connect manually on printer screen", detail: "Press Menu on the printer → Network → WLAN → Setup Wizard → select your Wi-Fi → enter password.", tip: "Use the Brother app if you find the manual menu confusing." },
      { title: "Print an alignment page", detail: "Go to Menu → Ink → Print Quality Check on the printer. This prints a test pattern to confirm the print heads are aligned.", tip: "Brother printers are very reliable once set up — enjoy!" },
    ],
    usb: [
      { title: "Unbox and remove all packing materials", detail: "Remove tape from outside and inside the printer. Load paper. Remove protective strips from inside the ink compartment.", tip: "Brother sometimes has tape in non-obvious places — check thoroughly." },
      { title: "Install ink and power on", detail: "Insert ink cartridges (peel the protective strip off each). Connect power and press Power. Wait for startup.", tip: "Don't connect USB until startup is complete." },
      { title: "Connect USB cable", detail: "Connect the USB cable from the printer to your computer. Windows installs the driver automatically. Mac: visit brother.com/support if it doesn't appear automatically.", tip: "Brother USB cables are not always included in the box." },
      { title: "Confirm printer appears on your computer", detail: "Windows: Settings → Printers — your Brother printer should appear. Mac: System Settings → Printers & Scanners → Add if needed.", tip: "You can also use the Brother iPrint&Scan app for easier management on your computer." },
      { title: "Print a test page", detail: "Open any document and press Ctrl+P (Windows) or Cmd+P (Mac), select your Brother printer, and print.", tip: "Brother printers are known for reliability — if setup worked, it'll keep working." },
    ],
    bluetooth: [
      { title: "Unbox, install ink, load paper, power on", detail: "Remove all packaging. Install cartridges, load paper, connect power, press Power.", tip: "Note: most Brother home printers use Wi-Fi rather than Bluetooth — check your model." },
      { title: "Download Brother iPrint&Scan app", detail: "Get the free Brother iPrint&Scan app from App Store (iPhone) or Google Play (Android).", tip: "This app works for both Wi-Fi and Bluetooth printing." },
      { title: "Enable Bluetooth on your phone and printer", detail: "Phone: Settings → Bluetooth → ON. Printer: check Menu → Bluetooth to confirm it's enabled.", tip: "Not all Brother models support Bluetooth — the app will confirm." },
      { title: "Pair via the Brother app", detail: "In iPrint&Scan, tap Add Printer → Bluetooth → select your Brother printer from the list. Tap Pair.", tip: "If the printer doesn't appear, make sure you're within 15 feet." },
      { title: "Print your first page", detail: "In iPrint&Scan, tap Print, choose your document or photo, and tap Print. Your Brother printer will receive it wirelessly.", tip: "Brother printers often have a physical Wireless button on top — press it if Bluetooth isn't connecting." },
    ],
  },
  other: {
    wifi: [
      { title: "Unbox and remove all packaging", detail: "Remove all tape, foam, and protective materials from inside and outside the printer. Load plain white paper in the paper tray.", tip: "Check inside the paper tray and ink area — packaging is often placed inside." },
      { title: "Install ink or toner and power on", detail: "Follow the Quick Start Guide inside your box for ink/cartridge installation. Connect the power cable and press the Power button.", tip: "Keep your model number handy — it's on a sticker on the bottom of the printer." },
      { title: "Use the manufacturer's app for Wi-Fi setup", detail: "Most brands have a free app: search '[your brand] print app' in the App Store or Google Play. Open it and tap Set Up New Printer. The app connects your printer to Wi-Fi step by step.", tip: "The app method is almost always easier than the manual screen method." },
      { title: "Or connect via the printer's screen", detail: "Look for a Wireless Setup or Wi-Fi Setup option in the printer's Settings or Network menu. Select your Wi-Fi name and enter your password.", tip: "Your Wi-Fi password is on the sticker on the back of your router." },
      { title: "Test print from your computer", detail: "On Windows: Settings → Printers → Add a Printer. On Mac: System Settings → Printers & Scanners → Add. Select your printer when it appears and print a test page.", tip: "If the printer doesn't appear, visit your brand's support website and search for your model." },
    ],
    usb: [
      { title: "Unbox and position near your computer", detail: "Remove all packaging. Place the printer close enough to reach your computer with a USB cable (usually 6 feet).", tip: "Note your model number — it's on a sticker on the bottom of the printer." },
      { title: "Install ink and power on", detail: "Follow the Quick Start Guide for ink/cartridge installation. Connect power and press the Power button.", tip: "Install ink before connecting the USB cable." },
      { title: "Connect USB cable", detail: "Connect the USB cable from printer to computer. Windows 10/11 usually installs the driver automatically. Mac may require you to visit the manufacturer's support page.", tip: "Search '[your brand] [model number] driver download' to find the right software." },
      { title: "Add the printer on your computer", detail: "Windows: Settings → Printers should show the printer automatically. Mac: System Settings → Printers & Scanners → + to add it.", tip: "Once added, it will appear in the printer list whenever you press Ctrl+P or Cmd+P." },
      { title: "Print a test page", detail: "Open any document, press Ctrl+P (Windows) or Cmd+P (Mac), select your printer, and print. If it works — you're all set!", tip: "Keep your printer model number somewhere safe for future reference." },
    ],
    bluetooth: [
      { title: "Unbox, install ink, load paper, power on", detail: "Remove all packaging, install ink/toner as per your Quick Start Guide, load paper, and power on.", tip: "Note your model number for troubleshooting if needed." },
      { title: "Find and download your brand's app", detail: "Search '[your brand] print app' in the App Store or Google Play. Most brands (Lexmark, Samsung, Xerox, etc.) have free printing apps.", tip: "The app usually handles Bluetooth setup automatically." },
      { title: "Enable Bluetooth on phone and printer", detail: "Phone: Settings → Bluetooth → ON. Printer: find Bluetooth in the Settings or Wireless menu and enable it.", tip: "Stay within 15 feet of the printer during setup." },
      { title: "Connect via the app", detail: "Open the brand app, tap Add Printer or Set Up → Bluetooth. Select your printer when it appears. Tap Connect or Pair.", tip: "If it asks for a PIN, check the printer screen — a 4-digit code may be displayed." },
      { title: "Print your first page", detail: "In the app, choose a document or photo and tap Print. Your printer will receive the job wirelessly.", tip: "Congratulations! Your printer is now ready to use." },
    ],
  },
};

const CHECKLIST = [
  { id: "unpacked", label: "Printer is fully unboxed and tape removed", icon: "📦" },
  { id: "power", label: "Power cable is nearby and plugged in", icon: "🔌" },
  { id: "wifi", label: "I know my Wi-Fi name and password", icon: "📶" },
  { id: "phone", label: "My phone or computer is nearby", icon: "📱" },
  { id: "paper", label: "I have plain white paper ready", icon: "📄" },
];

export default function Client() {
  const [stage, setStage] = useState<"intro" | "checklist" | "brand" | "connection" | "lead" | "steps" | "done">("intro");
  const [brand, setBrand] = useState<Brand | null>(null);
  const [connection, setConnection] = useState<Connection | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [checkedItems, setCheckedItems] = useState<Set<string>>(new Set());
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [currentTheme, setCurrentTheme] = useState<"dark" | "light">("dark");

  const steps = brand && connection ? SETUP_STEPS[brand][connection] : [];
  const allStepsDone = completedSteps.size === steps.length && steps.length > 0;
  const selectedBrand = BRANDS.find(b => b.id === brand);
  const selectedConnection = CONNECTIONS.find(c => c.id === connection);

  const toggleStep = (i: number) => {
    setCompletedSteps(prev => {
      const next = new Set(prev);
      if (next.has(i)) next.delete(i); else next.add(i);
      return next;
    });
  };

  const toggleCheck = (id: string) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    setSubmitting(true);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name, email, phone,
          issue: `Printer Setup — Brand: ${brand?.toUpperCase()} — Connection: ${connection}`,
          source: "set-up-my-new-printer",
        }),
      });
    } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true);
    setSubmitting(false);
    setStage("steps");
  };

  const reset = () => {
    setStage("intro"); setBrand(null); setConnection(null);
    setCompletedSteps(new Set()); setCheckedItems(new Set());
    setName(""); setEmail(""); setPhone("");
    setSubmitted(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />

      <header className="relative min-h-[70vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link>
            <ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link>
            <ChevronRight size={16} />
            <span className="text-zinc-300">Printer Setup Wizard</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-blue-500/10 border border-blue-500/30 text-blue-300 text-sm font-black uppercase tracking-widest mb-6">
            <Zap size={14} /> Free Tool · 5 Minutes
          </div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
            Set Up My<br />
            <span className="bg-gradient-to-r from-blue-400 to-cyan-300 bg-clip-text text-transparent italic">New Printer</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">
            Just got a new printer? We walk you through setup in 5 calm steps — HP, Canon, Epson, or Brother. Wi-Fi, USB, or Bluetooth. No jargon. No stress.
          </p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">

          {/* INTRO */}
          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }} className="space-y-6">
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-4">Before we start — what do you need? 🖨️</h2>
                  <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">
                    This wizard gives you the exact setup steps for your printer brand and connection type. Pick your brand, pick how you want to connect, and follow the steps — one at a time, with tips at each stage.
                  </p>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
                    {[
                      { icon: <Wifi size={20} />, label: "Wi-Fi", desc: "Wireless — most popular" },
                      { icon: <Usb size={20} />, label: "USB Cable", desc: "Simple, no password needed" },
                      { icon: <Bluetooth size={20} />, label: "Bluetooth", desc: "For phones & tablets" },
                    ].map(item => (
                      <div key={item.label} className="bg-zinc-800 rounded-2xl p-4 flex items-center gap-3">
                        <span className="text-blue-400">{item.icon}</span>
                        <div>
                          <div className="font-black text-white text-sm">{item.label}</div>
                          <div className="text-zinc-500 text-xs font-medium">{item.desc}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-blue-900/20 border border-blue-700 rounded-2xl p-4 mb-6 flex items-start gap-3">
                    <AlertCircle size={16} className="text-blue-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-blue-300 font-medium">
                      This tool works for HP, Canon, Epson, Brother, and other brands. Wi-Fi setup is recommended — it lets you print from your phone, tablet, and computer without any cables.
                    </p>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setStage("checklist")}
                    className="w-full py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/25"
                  >
                    Start My Printer Setup <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* CHECKLIST */}
          {stage === "checklist" && (
            <motion.div key="checklist" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("intro")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">Quick readiness check ✅</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">Tick what you already have ready — then we'll begin. No pressure.</p>
                  <div className="space-y-3 mb-8">
                    {CHECKLIST.map(item => (
                      <motion.button
                        key={item.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => toggleCheck(item.id)}
                        className={`w-full p-5 rounded-2xl border-2 text-left flex items-center gap-4 transition-all ${checkedItems.has(item.id) ? "border-blue-500 bg-blue-900/20" : "border-zinc-700 bg-zinc-800/50 hover:border-zinc-600"}`}
                      >
                        <span className="text-2xl">{item.icon}</span>
                        <span className="font-bold text-white text-base flex-1">{item.label}</span>
                        {checkedItems.has(item.id) && <CheckCircle2 size={20} className="text-blue-400 shrink-0" />}
                      </motion.button>
                    ))}
                  </div>
                  {checkedItems.size < 3 && (
                    <div className="bg-amber-900/20 border border-amber-700 rounded-2xl p-4 mb-6 flex items-start gap-3">
                      <AlertCircle size={16} className="text-amber-400 mt-0.5 shrink-0" />
                      <p className="text-sm text-amber-300 font-medium">Get the items above ready before starting — it makes setup much smoother.</p>
                    </div>
                  )}
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={() => setStage("brand")}
                    className="w-full py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/25"
                  >
                    I'm Ready — Choose My Printer Brand <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {/* BRAND SELECTION */}
          {stage === "brand" && (
            <motion.div key="brand" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("checklist")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">What brand is your new printer?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">The brand name is on the front of the printer. Tap it below.</p>
                  <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {BRANDS.map(b => (
                      <motion.button
                        key={b.id}
                        whileTap={{ scale: 0.97 }}
                        onClick={() => { setBrand(b.id); setStage("connection"); }}
                        className="p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-blue-700 text-left transition-all"
                      >
                        <div className="text-3xl mb-3">{b.emoji}</div>
                        <div className="font-black text-white text-base">{b.name}</div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* CONNECTION SELECTION */}
          {stage === "connection" && (
            <motion.div key="connection" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("brand")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors">
                    <ArrowLeft size={18} /> Back
                  </button>
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`w-10 h-10 bg-gradient-to-br ${selectedBrand?.color} rounded-xl flex items-center justify-center text-lg`}>{selectedBrand?.emoji}</div>
                    <span className="font-black text-white text-lg">{selectedBrand?.name} Printer</span>
                  </div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">How do you want to connect?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">Wi-Fi is recommended — it lets you print from your phone and laptop without cables.</p>
                  <div className="space-y-3">
                    {CONNECTIONS.map(c => (
                      <motion.button
                        key={c.id}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => { setConnection(c.id); setStage("lead"); }}
                        className="w-full p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-blue-700 text-left flex items-center gap-5 transition-all"
                      >
                        <span className="text-blue-400">{c.icon}</span>
                        <div className="flex-1">
                          <div className="font-black text-white text-base">{c.name}</div>
                          <div className="text-zinc-400 text-sm font-medium">{c.desc}</div>
                        </div>
                        <span className="text-xs font-black text-blue-400 bg-blue-900/30 px-3 py-1 rounded-full">{c.best}</span>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* LEAD CAPTURE */}
          {stage === "lead" && (
            <motion.div key="lead" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
                <div className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">🖨️</div>
                    <h2 className="text-3xl font-black text-white mb-3">Your setup guide is ready!</h2>
                    <p className="text-zinc-400 font-medium text-lg leading-relaxed">
                      Enter your name and email and we'll send your personalised <strong className="text-white">{selectedBrand?.name} {selectedConnection?.name}</strong> setup steps to your inbox — so you can refer back anytime.
                    </p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div>
                      <label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mary" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600" />
                      </div>
                      {errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label>
                      <div className="relative">
                        <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600" />
                      </div>
                      {errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}
                    </div>
                    <div>
                      <label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional — for a free check-in call)</span></label>
                      <div className="relative">
                        <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                        <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-blue-500 text-lg placeholder:text-zinc-600" />
                      </div>
                    </div>
                  </div>
                  <motion.button
                    whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}
                    onClick={handleSubmit}
                    disabled={submitting}
                    className="w-full py-6 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-blue-500/25 mb-3"
                  >
                    {submitting ? <Loader2 size={24} className="animate-spin" /> : "Send My Setup Guide & Show Steps"}
                  </motion.button>
                  <button onClick={() => setStage("steps")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">
                    Skip — just show me the setup steps
                  </button>
                </div>
              </div>
            </motion.div>
          )}

          {/* SETUP STEPS */}
          {stage === "steps" && (
            <motion.div key="steps" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {submitted && (
                <div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3">
                  <CheckCircle2 size={20} className="text-green-400 shrink-0" />
                  <p className="text-base font-bold text-green-300">Setup guide sent to {email}! Check your inbox.</p>
                </div>
              )}

              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-blue-500 to-cyan-400" />
                <div className="p-8">
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`w-10 h-10 bg-gradient-to-br ${selectedBrand?.color} rounded-xl flex items-center justify-center text-lg`}>{selectedBrand?.emoji}</div>
                    <div>
                      <div className="font-black text-white text-lg">{selectedBrand?.name} — {selectedConnection?.name} Setup</div>
                      <div className="text-zinc-500 text-sm font-medium">Tick each step when done</div>
                    </div>
                  </div>

                  {/* Progress */}
                  <div className="mt-4 mb-6">
                    <div className="flex justify-between text-sm font-black text-zinc-400 mb-2">
                      <span>{completedSteps.size} of {steps.length} steps complete</span>
                      <span>{Math.round((completedSteps.size / steps.length) * 100)}%</span>
                    </div>
                    <div className="h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <motion.div
                        className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                        animate={{ width: `${(completedSteps.size / steps.length) * 100}%` }}
                        transition={{ duration: 0.4 }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Step cards */}
              {steps.map((step, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  className={`bg-zinc-900 rounded-2xl border-2 overflow-hidden transition-all ${completedSteps.has(i) ? "border-blue-700" : "border-zinc-800"}`}
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.button
                        whileTap={{ scale: 0.9 }}
                        onClick={() => toggleStep(i)}
                        className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${completedSteps.has(i) ? "bg-blue-600 border-blue-500" : "border-zinc-600 hover:border-blue-500"}`}
                      >
                        {completedSteps.has(i) && <CheckCheck size={18} className="text-white" />}
                        {!completedSteps.has(i) && <span className="text-zinc-400 font-black text-sm">{i + 1}</span>}
                      </motion.button>
                      <div className="flex-1">
                        <h4 className={`font-black text-lg mb-2 ${completedSteps.has(i) ? "text-blue-300 line-through opacity-60" : "text-white"}`}>
                          {step.title}
                        </h4>
                        <p className="text-zinc-400 font-medium text-base leading-relaxed">{step.detail}</p>
                        {step.tip && (
                          <div className="mt-3 bg-amber-900/20 border border-amber-700/50 rounded-xl p-3 flex items-start gap-2">
                            <span className="text-amber-400 text-sm">💡</span>
                            <p className="text-amber-300 text-sm font-medium">{step.tip}</p>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}

              {/* All done */}
              {allStepsDone && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-green-900/40 to-emerald-900/20 border-2 border-green-700 rounded-[2rem] p-8 text-center">
                  <div className="text-6xl mb-4">🎉</div>
                  <h3 className="text-2xl font-black text-white mb-2">Your printer is set up!</h3>
                  <p className="text-zinc-400 font-medium mb-6">All steps complete. Your {selectedBrand?.name} printer should now be ready to use. Print something to celebrate!</p>
                  <p className="text-zinc-400 font-medium text-sm mb-6">If you'd like a tutor to walk you through printing from your phone or setting up scanning, our team is here — no jargon, no rush.</p>
                  <Link href="/contact">
                    <motion.div whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-2xl shadow-lg cursor-pointer mb-4">
                      Talk to a Tutor <ArrowRight size={18} />
                    </motion.div>
                  </Link>
                </motion.div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg">
                  <RefreshCw size={20} /> Start Over
                </button>
                <Link href="/tools/print-from-any-device">
                  <motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">
                    Print from My Phone <ArrowRight size={20} />
                  </motion.div>
                </Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5">
                <div className="flex items-start gap-3">
                  <Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" />
                  <p className="text-sm text-zinc-500 font-medium">Educational guidance only. Setwise Digital is an independent educational platform not affiliated with HP, Canon, Epson, or Brother. Steps may vary by model.</p>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* SEO Content */}
      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">How to Set Up a New Printer — Complete Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base">
            <div>
              <p className="mb-4">Setting up a new printer is one of the most searched technology questions — and for good reason. Every brand has slightly different steps, every connection method has a different process, and manufacturer guides are often buried in technical jargon.</p>
              <p>This wizard adapts the setup steps to your exact combination: HP Wi-Fi, Canon USB, Epson EcoTank Bluetooth — each pathway is different, and this guide gives you the right steps for yours.</p>
            </div>
            <div>
              <p className="mb-4">Wi-Fi printing is strongly recommended for home use. Once connected, you can print from your iPhone, Android phone, Windows laptop, or Mac without any cables. The setup takes about 5 minutes and only needs to be done once.</p>
              <p>This tool is for educational purposes. Setwise Digital is an independent educational platform not affiliated with HP, Canon, Epson, or Brother. Always refer to your printer's Quick Start Guide for model-specific details.</p>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
