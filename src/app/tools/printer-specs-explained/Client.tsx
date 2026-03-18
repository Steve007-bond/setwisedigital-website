"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { ArrowRight, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, Search, CheckCircle2, XCircle, AlertCircle } from "lucide-react";

const bgs = [
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1563520239648-a8ade7166c97?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
];

type SpecId = string;
type NeedLevel = "essential" | "nice_to_have" | "professional_only" | "depends";

const SPECS: {
  id: SpecId;
  term: string;
  category: "print_quality" | "speed" | "connectivity" | "paper" | "ink" | "features";
  plain: string;
  analogy: string;
  doINeed: { level: NeedLevel; label: string; reason: string };
  goodValue: string;
  tip: string;
}[] = [
  {
    id: "dpi",
    term: "DPI (Dots Per Inch)",
    category: "print_quality",
    plain: "DPI tells you how detailed your printouts will look. Higher DPI = more tiny dots of ink per inch = sharper, clearer text and images.",
    analogy: "Think of it like the screen resolution on your TV. A 4K TV has more dots than a standard TV — the picture looks sharper. DPI does the same thing for paper.",
    doINeed: { level: "depends", label: "Depends what you print", reason: "For documents and letters: 600 DPI is perfectly fine — text looks crisp and clear. For photos: you want 1200+ DPI for best quality. Most home printers advertise 4800+ DPI — this is for photo printing mode, which uses more ink and prints slower." },
    goodValue: "600 DPI for documents. 1200+ DPI for photos.",
    tip: "When a printer lists two numbers like '4800 x 1200 DPI', the second number (1200) is the most meaningful one — it represents the actual resolution used in standard printing.",
  },
  {
    id: "ppm",
    term: "PPM (Pages Per Minute)",
    category: "speed",
    plain: "PPM tells you how many pages the printer can print in one minute. Higher PPM = faster printing.",
    analogy: "Like the speed of a car — 10 PPM means 10 pages every 60 seconds. But just like car mileage, the real-world speed is often slower than the advertised number.",
    doINeed: { level: "depends", label: "Matters for heavy users", reason: "For printing 1–2 pages at a time: PPM doesn't matter much — the warmup time takes longer than the printing. For printing long documents (10+ pages): look for 10+ PPM. Manufacturers measure PPM in 'draft mode' — actual standard-quality printing is typically 30–50% slower." },
    goodValue: "8–12 PPM is perfectly fine for home use. 15+ PPM for a home office.",
    tip: "The 'First Page Out Time' is actually more useful than PPM for occasional printers — it tells you how long before the first page starts printing.",
  },
  {
    id: "airprint",
    term: "AirPrint",
    category: "connectivity",
    plain: "AirPrint is Apple's built-in wireless printing system. If your printer supports AirPrint, you can print from your iPhone or iPad without installing any app — it just works automatically.",
    analogy: "It's like how your iPhone connects to Bluetooth headphones automatically. AirPrint does the same thing with compatible printers — your iPhone finds the printer and connects without you doing anything.",
    doINeed: { level: "essential", label: "Essential if you have an iPhone or iPad", reason: "If you have an iPhone or iPad, AirPrint makes printing incredibly simple — no setup, no app needed. Almost all HP, Canon, Epson, and Brother printers made after 2015 support AirPrint. It's listed on the printer box." },
    goodValue: "Look for 'AirPrint compatible' on the printer box or product listing.",
    tip: "For AirPrint to work, your iPhone and printer must be on the same Wi-Fi network. No Wi-Fi = no AirPrint.",
  },
  {
    id: "duplex",
    term: "Duplex Printing (Two-Sided)",
    category: "features",
    plain: "Duplex printing means the printer can automatically print on both sides of a sheet of paper — it flips the paper over on its own without you having to reload it.",
    analogy: "Like a photocopy machine at a library that automatically copies both sides of a page. Without duplex, you'd have to take the paper out and feed it back in manually.",
    doINeed: { level: "nice_to_have", label: "Nice to have — saves paper", reason: "Automatic duplex halves your paper usage and makes booklets and double-sided documents easy to print. 'Automatic duplex' flips the paper on its own — great. 'Manual duplex' (less useful) prompts you to flip it yourself. Most mid-range printers ($79+) now include automatic duplex." },
    goodValue: "Look for 'Automatic Duplex Printing' — not just 'Duplex'.",
    tip: "Duplex can save you 50% on paper costs. Over a year of regular printing, the paper savings can pay for itself.",
  },
  {
    id: "adf",
    term: "ADF (Automatic Document Feeder)",
    category: "paper",
    plain: "An ADF is a tray on top of the printer where you can stack multiple pages for scanning or copying. The printer automatically feeds each page through one by one — you don't have to lift and replace each sheet.",
    analogy: "Like the slot at the top of an office photocopier where you stack your pages and it feeds them through automatically. Without an ADF, you scan one page at a time by opening the lid.",
    doINeed: { level: "depends", label: "Essential if you scan multi-page documents", reason: "If you regularly scan: contracts, medical forms, statements, or multi-page letters — an ADF saves enormous time and frustration. If you only scan occasionally (once a month): the flatbed glass scanner that every printer has is fine." },
    goodValue: "ADF capacity of 20–35 pages is perfect for home use.",
    tip: "An ADF is also required for faxing multiple pages at once. If you fax documents, make sure your printer has an ADF.",
  },
  {
    id: "inkjet_vs_laser",
    term: "Inkjet vs Laser Printer",
    category: "ink",
    plain: "An inkjet printer sprays tiny drops of liquid ink onto paper. A laser printer uses heat and a powder called toner to bond text and images to paper. Inkjets are better for photos and colour. Laser printers are better for large volumes of black-and-white text.",
    analogy: "Inkjet is like a painter using a brush — great for detail and colour, but slower. Laser is like a stamp — fast, precise for text, and the ink never dries out or clogs.",
    doINeed: { level: "depends", label: "Depends what you print most", reason: "For home use with photos and mixed content: inkjet. For a home office printing hundreds of documents per month: laser. For occasional printing: inkjet (cheaper upfront). Laser toner never dries out — a laser printer you use once a month will always print perfectly, unlike inkjet which can clog." },
    goodValue: "Home use: inkjet. 200+ pages/month of documents: laser.",
    tip: "Laser printers cost more upfront ($150–$300) but are cheaper to run long-term for document printing.",
  },
  {
    id: "wireless_direct",
    term: "Wi-Fi Direct / Wireless Direct",
    category: "connectivity",
    plain: "Wi-Fi Direct lets your phone connect and print directly to the printer without needing your home Wi-Fi network. The printer creates its own mini Wi-Fi network that your phone connects to just for printing.",
    analogy: "Like two phones sharing a mobile hotspot to transfer files — no router or internet needed. The printer is the hotspot, your phone connects to it.",
    doINeed: { level: "nice_to_have", label: "Useful for tricky Wi-Fi situations", reason: "Most useful when: your printer is in a separate room far from the router, your home Wi-Fi keeps disconnecting the printer, or you want to print from a guest's phone without giving them your Wi-Fi password. For most people, regular Wi-Fi printing works perfectly fine." },
    goodValue: "Look for 'Wi-Fi Direct' in the printer specs — most HP, Canon, and Epson printers include it.",
    tip: "Wi-Fi Direct prints more slowly than regular Wi-Fi printing. Use regular Wi-Fi as your first choice.",
  },
  {
    id: "scan_resolution",
    term: "Scan Resolution (Scanning DPI)",
    category: "print_quality",
    plain: "Scan resolution tells you how detailed a scanned image will be. Higher DPI = more detail captured when scanning. This matters if you scan photos or need to read tiny printed text.",
    analogy: "Like the megapixels on a camera. More megapixels captures more detail. Scan resolution does the same — higher DPI captures finer detail from paper.",
    doINeed: { level: "depends", label: "Depends what you scan", reason: "For scanning documents (letters, forms, receipts): 300 DPI is excellent — text is crisp and readable. For scanning photographs: 600–1200 DPI preserves detail. For scanning old slides or film negatives: 2400+ DPI (requires a specialised scanner)." },
    goodValue: "300 DPI for documents. 600 DPI for photos.",
    tip: "Most all-in-one printers scan at 1200 DPI maximum — this is more than enough for everything except professional photography.",
  },
  {
    id: "paper_tray",
    term: "Paper Tray Capacity (Sheet Capacity)",
    category: "paper",
    plain: "This tells you how many sheets of plain paper you can load into the printer at one time before it runs out and you need to refill.",
    analogy: "Like the capacity of a flour canister — you fill it once and use it until it's empty. A bigger tray means fewer refills.",
    doINeed: { level: "depends", label: "Bigger is better for frequent use", reason: "For printing 1–2 pages occasionally: even a 50-sheet tray is fine. For families or home offices printing daily: a 100+ sheet tray saves constant refilling. Standard paper comes in reams of 500 sheets — a 100-sheet tray means refilling about 5 times per ream." },
    goodValue: "60–100 sheets for home use. 100–250 for home offices.",
    tip: "A larger paper tray is one of the most underrated features. Running out of paper mid-document at 10pm is very frustrating.",
  },
  {
    id: "monthly_duty_cycle",
    term: "Monthly Duty Cycle",
    category: "speed",
    plain: "Monthly duty cycle is the maximum number of pages a printer is designed to handle per month without wearing out. Exceeding it regularly shortens the printer's life.",
    analogy: "Like the maximum mileage recommended between car oil changes. You can push past it occasionally, but regularly exceeding it causes wear.",
    doINeed: { level: "nice_to_have", label: "Mostly matters for offices", reason: "Home use (50–200 pages/month): virtually any printer with a duty cycle of 1,000+ pages/month is absolutely fine. For home offices (300–1,000 pages/month): check the duty cycle is at least 5x your monthly volume. For very heavy use: consider a business printer." },
    goodValue: "Home use: 1,000+ pages/month duty cycle is fine.",
    tip: "Recommended monthly page volume (also listed in specs) is more useful than the duty cycle — it's the number the manufacturer suggests for regular use without wear.",
  },
  {
    id: "ecotank",
    term: "EcoTank / Ink Tank Printer",
    category: "ink",
    plain: "An EcoTank (Epson's name for ink tank printers) uses large refillable ink bottles instead of small cartridges. You fill the tanks from a bottle, like pouring water into a glass. One bottle fills the tank enough for hundreds or thousands of pages.",
    analogy: "Traditional cartridge printers are like buying individual bottles of water. EcoTank is like installing a water filter — higher upfront cost, but dramatically cheaper per glass after that.",
    doINeed: { level: "depends", label: "Essential for heavy printers, optional for light", reason: "If you print 100+ pages per month: an EcoTank pays for its extra upfront cost within 12–18 months. If you print under 30 pages per month: the upfront cost isn't worth it — a standard cartridge printer is fine." },
    goodValue: "Epson EcoTank ET-2800 ($199) is the best entry-level option. Ink bottles last 1–2 years.",
    tip: "EcoTank printers need to be used at least once per week to prevent the print heads from drying. If you print very infrequently, a cartridge printer may be more practical.",
  },
  {
    id: "print_head",
    term: "Print Head / Printhead",
    category: "print_quality",
    plain: "The print head is the part of the printer that sprays ink onto paper. Think of it as the 'pen' that does the actual writing. If the print head clogs, you get blank pages or streaky prints.",
    analogy: "Like the ballpoint tip of a pen. If the tip dries out or gets clogged with dried ink, the pen won't write properly. Cleaning the tip (or running a cleaning cycle) usually fixes it.",
    doINeed: { level: "essential", label: "This is inside every inkjet printer", reason: "You don't choose whether to have a print head — every inkjet printer has one. What matters is knowing: (1) if you get blank pages, run Head Cleaning 2–3 times from the Maintenance menu; (2) use the printer at least once a week to prevent clogging." },
    goodValue: "Protect your print head by printing at least once per week.",
    tip: "On HP, Epson, and Canon printers, the print head is built into the printer itself (not the cartridge). On some Brother printers, replacing the cartridge also refreshes parts of the print system.",
  },
];

const CATEGORIES: { id: string; label: string; icon: string }[] = [
  { id: "all", label: "All Terms", icon: "📚" },
  { id: "print_quality", label: "Print Quality", icon: "🖼️" },
  { id: "speed", label: "Speed", icon: "⚡" },
  { id: "connectivity", label: "Wireless & Apps", icon: "📶" },
  { id: "paper", label: "Paper & Scanning", icon: "📄" },
  { id: "ink", label: "Ink & Cartridges", icon: "🫙" },
  { id: "features", label: "Features", icon: "⚙️" },
];

const NEED_COLORS: Record<NeedLevel, { bg: string; text: string; border: string; label: string }> = {
  essential: { bg: "bg-green-900/30", text: "text-green-300", border: "border-green-700", label: "Essential" },
  nice_to_have: { bg: "bg-blue-900/30", text: "text-blue-300", border: "border-blue-700", label: "Nice to have" },
  professional_only: { bg: "bg-amber-900/30", text: "text-amber-300", border: "border-amber-700", label: "Professional use" },
  depends: { bg: "bg-violet-900/30", text: "text-violet-300", border: "border-violet-700", label: "Depends on your use" },
};

export default function Client() {
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSpec, setSelectedSpec] = useState<SpecId | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [showLead, setShowLead] = useState(false);
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);
  const [viewedCount, setViewedCount] = useState(0);

  const filtered = SPECS.filter(s => {
    const matchCat = selectedCategory === "all" || s.category === selectedCategory;
    const matchSearch = searchQuery === "" || s.term.toLowerCase().includes(searchQuery.toLowerCase()) || s.plain.toLowerCase().includes(searchQuery.toLowerCase());
    return matchCat && matchSearch;
  });

  const activeSpec = SPECS.find(s => s.id === selectedSpec);
  const needStyle = activeSpec ? NEED_COLORS[activeSpec.doINeed.level] : null;

  const handleSpecClick = (id: SpecId) => {
    setSelectedSpec(id);
    const newCount = viewedCount + 1;
    setViewedCount(newCount);
    if (newCount === 3 && !submitted) setShowLead(true);
  };

  const validate = () => { const e: Record<string, string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, issue: `Printer Specs Guide — Viewed: ${viewedCount} terms`, source: "printer-specs-explained" }) }); } catch (e) { console.error("[lead] error:", e); }
    setSubmitted(true); setSubmitting(false); setShowLead(false);
  };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={() => {}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">Printer Specs Explained</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-violet-500/10 border border-violet-500/30 text-violet-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14} /> Free Tool · Plain English Decoder</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
            What Does That<br /><span className="bg-gradient-to-r from-violet-400 to-fuchsia-300 bg-clip-text text-transparent italic">Spec Actually Mean?</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Confused by DPI, ADF, duplex, or EcoTank? Tap any printer specification and get a plain-English explanation — plus whether you actually need it.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">

        {/* Lead capture modal - shown after 3 spec views */}
        <AnimatePresence>
          {showLead && !submitted && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="fixed inset-0 bg-black/70 z-50 flex items-center justify-center p-4">
              <motion.div initial={{ scale: 0.9, y: 20 }} animate={{ scale: 1, y: 0 }} exit={{ scale: 0.9, y: 20 }} className="bg-zinc-900 rounded-[2rem] border border-zinc-700 max-w-md w-full overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-400" />
                <div className="p-8">
                  <div className="text-center mb-6"><div className="text-5xl mb-3">📖</div><h2 className="text-2xl font-black text-white mb-2">Get the Full Glossary</h2><p className="text-zinc-400 font-medium">Enter your details and we'll email you the complete printer specs glossary — all 12 terms with plain-English explanations.</p></div>
                  <div className="space-y-3 mb-4">
                    <div><div className="relative"><User size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="First name *" className="w-full pl-11 pr-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-xs mt-1 font-bold">{errors.name}</p>}</div>
                    <div><div className="relative"><Mail size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="Email address *" className="w-full pl-11 pr-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-xs mt-1 font-bold">{errors.email}</p>}</div>
                    <div><div className="relative"><Phone size={14} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="Phone (optional)" className="w-full pl-11 pr-4 py-3.5 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-violet-500 placeholder:text-zinc-600" /></div></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-4 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black rounded-2xl flex items-center justify-center gap-2 mb-3">
                    {submitting ? <Loader2 size={20} className="animate-spin" /> : "Send Me the Full Glossary"}
                  </motion.button>
                  <button onClick={() => setShowLead(false)} className="w-full text-center text-sm text-zinc-500 hover:text-zinc-300 font-medium py-1">No thanks — continue reading</button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Search */}
        <div className="relative mb-6">
          <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
          <input type="text" value={searchQuery} onChange={e => setSearchQuery(e.target.value)} placeholder="Search any printer term (e.g. DPI, duplex, AirPrint...)" className="w-full pl-12 pr-4 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl text-white focus:outline-none focus:border-violet-500 text-base placeholder:text-zinc-600" />
        </div>

        {/* Category tabs */}
        <div className="flex flex-wrap gap-2 mb-8">
          {CATEGORIES.map(c => (<button key={c.id} onClick={() => setSelectedCategory(c.id)} className={`px-4 py-2.5 rounded-xl text-sm font-black transition-all ${selectedCategory === c.id ? "bg-violet-600 text-white" : "bg-zinc-800 text-zinc-400 hover:bg-zinc-700 hover:text-white"}`}>{c.icon} {c.label}</button>))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* Spec list */}
          <div className="md:col-span-1 space-y-2">
            {filtered.map(spec => (
              <motion.button key={spec.id} whileTap={{ scale: 0.98 }} onClick={() => handleSpecClick(spec.id)} className={`w-full p-4 rounded-2xl border-2 text-left transition-all ${selectedSpec === spec.id ? "border-violet-600 bg-violet-900/20" : "border-zinc-800 bg-zinc-900 hover:border-zinc-600"}`}>
                <div className="flex items-center justify-between">
                  <div>
                    <div className="font-black text-white text-sm">{spec.term}</div>
                    <div className={`text-xs font-black mt-1 ${NEED_COLORS[spec.doINeed.level].text}`}>{NEED_COLORS[spec.doINeed.level].label}</div>
                  </div>
                  <ChevronRight size={16} className={selectedSpec === spec.id ? "text-violet-400" : "text-zinc-600"} />
                </div>
              </motion.button>
            ))}
            {filtered.length === 0 && <p className="text-zinc-500 font-medium text-sm text-center py-8">No terms match your search. Try a different keyword.</p>}
          </div>

          {/* Spec detail */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {activeSpec && needStyle ? (
                <motion.div key={activeSpec.id} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ type: "spring", stiffness: 400, damping: 35 }} className="space-y-4">
                  <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                    <div className="h-1.5 bg-gradient-to-r from-violet-500 to-fuchsia-400" />
                    <div className="p-7">
                      <h3 className="text-2xl font-black text-white mb-4">{activeSpec.term}</h3>
                      <p className="text-zinc-300 text-base font-medium leading-relaxed mb-5">{activeSpec.plain}</p>
                      <div className="bg-zinc-800 rounded-2xl p-4 mb-5">
                        <div className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">💡 Think of it like this:</div>
                        <p className="text-zinc-300 text-sm font-medium italic leading-relaxed">"{activeSpec.analogy}"</p>
                      </div>
                      <div className={`rounded-2xl border p-5 mb-4 ${needStyle.bg} ${needStyle.border}`}>
                        <div className={`text-sm font-black uppercase tracking-widest mb-2 ${needStyle.text}`}>Do you need this? — {NEED_COLORS[activeSpec.doINeed.level].label}</div>
                        <p className={`text-sm font-medium leading-relaxed ${needStyle.text}`}>{activeSpec.doINeed.reason}</p>
                      </div>
                      <div className="bg-zinc-800 rounded-xl p-4 mb-4">
                        <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-1">✓ Good value</div>
                        <p className="text-zinc-300 text-sm font-bold">{activeSpec.goodValue}</p>
                      </div>
                      <div className="bg-amber-900/20 border border-amber-700/50 rounded-xl p-4 flex items-start gap-2">
                        <span className="text-amber-400 text-sm shrink-0">💡</span>
                        <p className="text-amber-300 text-sm font-medium">{activeSpec.tip}</p>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ) : (
                <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-10 text-center">
                  <div className="text-5xl mb-4">👆</div>
                  <h3 className="text-xl font-black text-white mb-2">Tap any term on the left</h3>
                  <p className="text-zinc-500 font-medium">Select a printer specification to see its plain-English explanation, whether you need it, and what value to look for.</p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Quick reference strip */}
            <div className="mt-6 bg-zinc-900 rounded-2xl border border-zinc-800 p-5">
              <div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-3">Quick reference — What to look for</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                {[{ label: "Docs only", value: "600 DPI, 8+ PPM, AirPrint" }, { label: "Photos", value: "1200+ DPI, AirPrint" }, { label: "Heavy family", value: "EcoTank, ADF, Duplex" }, { label: "Fax needed", value: "ADF, fax port, Brother" }].map(i => (<div key={i.label} className="bg-zinc-800 rounded-xl p-3"><div className="font-black text-zinc-300 mb-0.5">{i.label}</div><div className="text-zinc-500 font-medium">{i.value}</div></div>))}
              </div>
            </div>
          </div>
        </div>

        {submitted && (
          <div className="mt-8 bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3">
            <CheckCircle2 size={20} className="text-green-400 shrink-0" />
            <p className="text-base font-bold text-green-300">Full glossary sent to {email}! Check your inbox.</p>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link href="/tools/best-printer-for-seniors"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Find My Best Printer <ArrowRight size={20} /></motion.div></Link>
          <Link href="/tools/hp-vs-canon-vs-epson-vs-brother"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 text-zinc-300 font-black rounded-2xl hover:border-zinc-500 cursor-pointer text-lg transition-all">Compare Brands <ArrowRight size={20} /></motion.div></Link>
        </div>

        <div className="mt-6 bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational guide only. Specifications vary by model and may change. Not affiliated with HP, Canon, Epson, or Brother.</p></div>
      </section>

      <section className="border-t border-zinc-800 py-20"><div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8"><h2 className="text-4xl font-black text-white mb-8 tracking-tight">Printer Specs Explained — Plain English Guide</h2><div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base"><div><p className="mb-4">Printer specifications are written for engineers — not for people who just want to print their holiday photos and the occasional letter. DPI (Dots Per Inch) sounds complicated, but the practical answer is simple: 600 DPI is perfect for documents, and 1200+ DPI gives you better photos. Most people don't need to think about it beyond that.</p><p>ADF (Automatic Document Feeder) is one of the most underrated features on a printer. If you ever need to scan a multi-page document — a contract, a medical form, or a set of statements — an ADF loads all the pages automatically. Without it, you scan one page at a time by opening the lid.</p></div><div><p className="mb-4">Duplex printing (two-sided printing) is increasingly standard on mid-range printers and genuinely useful for reducing paper use. Automatic duplex does the flipping for you — manual duplex (less useful) requires you to reload the paper.</p><p>AirPrint is Apple's built-in wireless printing protocol — if your printer supports it, your iPhone can find and use it automatically with no setup. It's the single most useful connectivity feature for iPhone users. All specifications in this guide are for educational purposes only.</p></div></div></div></section>
      <Footer />
    </div>
  );
}
