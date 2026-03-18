"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { CheckCircle2, ArrowRight, ArrowLeft, ChevronRight, Mail, Phone, User, Loader2, Shield, Zap, RefreshCw, CheckCheck, AlertCircle } from "lucide-react";

const bgs = [
  { url: "https://images.unsplash.com/photo-1563520239648-a8ade7166c97?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=60&w=1200", type: "image" as const, theme: "dark" as const },
];

type FaxMethod = "printer_phoneline" | "online_computer" | "online_phone" | "online_email";
type DocType = "paper" | "digital";

const FAX_METHODS: { id: FaxMethod; icon: string; label: string; desc: string; requires: string; best: string; color: string }[] = [
  { id: "printer_phoneline", icon: "🖨️", label: "My all-in-one printer + phone line", desc: "I have a fax-capable printer connected to a landline", requires: "Fax-capable printer + active phone line", best: "Most reliable — traditional fax", color: "border-blue-700" },
  { id: "online_computer", icon: "💻", label: "My computer — no fax machine needed", desc: "I want to fax from a website on my laptop or desktop", requires: "Computer + internet + PDF or photo of document", best: "Easiest for digital documents", color: "border-violet-700" },
  { id: "online_phone", icon: "📱", label: "My phone — no fax machine needed", desc: "I want to fax from my iPhone or Android", requires: "Phone + internet connection", best: "Best when away from computer", color: "border-green-700" },
  { id: "online_email", icon: "✉️", label: "Email — send fax like an email", desc: "I want to fax by composing an email with the document attached", requires: "Email account + PDF of document", best: "Good if you're already in email", color: "border-amber-700" },
];

const DOC_TYPES: { id: DocType; icon: string; label: string; desc: string }[] = [
  { id: "digital", icon: "📄", label: "I have a digital copy (PDF or photo)", desc: "The file is already on my phone or computer" },
  { id: "paper", icon: "📃", label: "I have a paper document", desc: "I need to scan or photograph it first" },
];

type StepContent = { title: string; detail: string; tip?: string };

const STEPS: Record<FaxMethod, Record<DocType, StepContent[]>> = {
  printer_phoneline: {
    paper: [
      { title: "Check your printer supports fax and is connected to a phone line", detail: "Look for a port labelled 'LINE' or 'TEL' on the back of your printer. A phone cable should be connected from this port to your wall telephone jack.", tip: "If you don't see a 'LINE' port, your printer doesn't have built-in fax capability." },
      { title: "Place your paper document in the document feeder", detail: "If your printer has an Automatic Document Feeder (ADF) on top, place your paper face-up in the slot. If not, place the paper face-down on the scanner glass and close the lid." },
      { title: "Find the Fax function on your printer screen", detail: "On the printer touchscreen or control panel, look for a 'Fax' button or option. Tap it." },
      { title: "Enter the fax number you're sending to", detail: "Use the number pad on the printer to type the recipient's full fax number. Include the area code. For long distance, include the '1' at the start (e.g. 1-555-123-4567).", tip: "The fax number is usually on the document you've been sent or on the organisation's website." },
      { title: "Press Send or Start Fax", detail: "Press the green Send, Start, or Black Start button on the printer. You'll hear a dial tone and then a connection sound — this is normal. The printer will print a confirmation page when the fax is sent.", tip: "A confirmation report prints automatically — keep this as proof that the fax was successfully sent." },
    ],
    digital: [
      { title: "Print your digital document first", detail: "Open the file on your computer or phone. Press Ctrl+P (Windows) or ⌘+P (Mac) and print it to paper. You now have a paper copy to fax.", tip: "Alternatively, many newer printers let you fax directly from the HP Smart or Canon PRINT app without printing first." },
      { title: "Place the printed document in the document feeder or on the scanner glass", detail: "ADF: place face-up in the top tray. Scanner glass: place face-down, align with the corner markings." },
      { title: "Tap Fax on the printer control panel", detail: "Find and tap the Fax option in the printer's menu." },
      { title: "Enter the recipient's fax number", detail: "Use the printer's number pad to type the full fax number including area code." },
      { title: "Press Send or Start Fax", detail: "Press the Send/Start button. The printer will dial and send. A confirmation page prints when complete.", tip: "Save the confirmation page as proof the fax was sent." },
    ],
  },
  online_computer: {
    digital: [
      { title: "Make sure your document is saved as a PDF on your computer", detail: "PDFs fax most reliably. If your document is a Word file, open it and go to File → Save As → choose PDF. If it's an image, that works too (JPG, PNG are accepted).", tip: "A photo of a paper document taken on your phone and sent to your computer works perfectly." },
      { title: "Go to a free online fax website", detail: "Open your browser and go to fax.plus or faxzero.com. Both offer free faxes with no account required. FaxZero allows 5 free faxes per day (up to 5 pages each). Fax.Plus has a free trial.", tip: "FaxZero adds a small cover page with their name on free faxes — this is normal." },
      { title: "Enter the recipient's fax number", detail: "In the 'To' field, type the full fax number including area code (e.g. 555-123-4567 or 1-555-123-4567).", tip: "For medical offices and legal firms, the fax number is usually on their letterhead or website." },
      { title: "Upload your document", detail: "Click 'Upload' or 'Attach file'. Browse to your PDF or image file and select it. The file will upload in a few seconds.", tip: "Most free services accept documents up to 5 pages or 5MB." },
      { title: "Enter your email address and click Send Fax", detail: "Enter your email address (required for delivery confirmation). Click Send Fax. You'll receive an email confirmation when the fax is delivered. This usually takes 1–5 minutes.", tip: "Check your spam folder if you don't receive the confirmation email within 10 minutes." },
    ],
    paper: [
      { title: "Photograph your paper document clearly", detail: "Place the document on a flat, well-lit surface. Take a clear photo with your phone — make sure all text is readable and the edges are visible. Send the photo to your computer via email, AirDrop, or USB.", tip: "Good lighting makes a big difference — stand near a window and take the photo in natural light." },
      { title: "Save the photo as a PDF (optional but better)", detail: "On Windows: right-click the image → Print → choose 'Microsoft Print to PDF' → Save. On Mac: open in Preview → File → Export as PDF.", tip: "PDFs look cleaner when received by the recipient than raw photos." },
      { title: "Go to fax.plus or faxzero.com in your browser", detail: "Open your web browser and navigate to one of these free fax services." },
      { title: "Enter the fax number and upload your file", detail: "Type the recipient's fax number. Click Upload. Select your PDF or photo from your computer." },
      { title: "Enter your email and click Send Fax", detail: "Add your email for delivery confirmation. Click Send Fax. You'll get a confirmation email within 1–5 minutes.", tip: "Keep the confirmation email — it proves the fax was sent." },
    ],
  },
  online_phone: {
    paper: [
      { title: "Photograph your paper document with your phone", detail: "Place the paper on a flat surface. Open your phone camera and take a clear, well-lit photo. Check the photo — all text must be readable before proceeding.", tip: "Tap the screen where the text is to focus the camera. Natural window light gives the best result." },
      { title: "Download a free fax app on your phone", detail: "iPhone: Open App Store → search 'Fax.Plus' → install. Android: Open Google Play → search 'Fax.Plus' → install. The app is free for a trial fax.", tip: "FAX.Plus is consistently rated the most reliable free fax app for both iPhone and Android." },
      { title: "Open the Fax.Plus app and tap Send Fax", detail: "Open the app. Tap the + button or Send Fax. Sign in with your Google or email account (free)." },
      { title: "Enter the recipient's fax number", detail: "In the 'To' field, type the full fax number. Include the area code and country code if sending internationally.", tip: "US fax numbers: just include area code (e.g. 5551234567). International: include country code (+44, +1, etc)." },
      { title: "Attach your photo and tap Send", detail: "Tap 'Add file' or the attachment icon. Choose your photo from the camera roll. Tap Send. You'll receive an in-app and email notification when delivered.", tip: "The app shows the delivery status in real time — green checkmark means successfully received." },
    ],
    digital: [
      { title: "Make sure the document is saved on your phone", detail: "The PDF, Word document, or image file should be in your Files app (iPhone) or in Files/Downloads (Android).", tip: "If the document is in Google Drive, Dropbox, or OneDrive — you can attach directly from those apps too." },
      { title: "Download Fax.Plus from the App Store or Google Play", detail: "Search 'Fax.Plus' and install. It's free for your first faxes.", tip: "Create a free account using your Google or email login — takes under a minute." },
      { title: "Open Fax.Plus and tap Send Fax", detail: "Open the app and tap the Send Fax button or the + icon." },
      { title: "Type the recipient's fax number", detail: "Enter the full fax number including area code." },
      { title: "Attach document and tap Send", detail: "Tap Add File → browse to your PDF or document → attach it → tap Send. You'll get a delivery confirmation in the app and by email.", tip: "You can attach multiple pages by adding multiple files." },
    ],
  },
  online_email: {
    digital: [
      { title: "Make sure your document is saved as a PDF", detail: "This email-to-fax method works best with PDFs. If your file is a Word document: File → Save As → PDF. If it's an image, that works too.", tip: "Most fax services accept PDF, Word (.docx), JPG, and PNG file formats." },
      { title: "Sign up for a free Fax.Plus account", detail: "Go to fax.plus on your computer or phone. Create a free account using your Google or email address. The free plan includes several free outbound faxes.", tip: "You only need to do this once — after that, you can fax from email anytime." },
      { title: "Open your email app (Gmail, Outlook, or any email)", detail: "Open your email application. Start composing a new email as normal." },
      { title: "In the 'To' field, type the fax number in special format", detail: "Type the recipient's fax number followed by '@fax.plus' in the To field. Example: for fax number 555-123-4567 type: +15551234567@fax.plus", tip: "Include the country code (+1 for US). The exact format is: +[country code][area code][number]@fax.plus" },
      { title: "Attach your document and press Send", detail: "Attach your PDF or document file to the email. Add a subject line if you want a cover page note. Press Send. Fax.Plus intercepts the email and converts it to a real fax. You'll receive a delivery confirmation email.", tip: "The email subject line becomes the cover page header — useful for noting what the document is." },
    ],
    paper: [
      { title: "Photograph your paper document clearly", detail: "Place on flat surface, good light. Take a clear photo with your phone. All text must be fully readable." },
      { title: "Email the photo to yourself", detail: "On your phone, go to your photo gallery, select the photo, and email it to your own email address. Open it on your computer." },
      { title: "Save the photo as a PDF on your computer", detail: "Windows: right-click image → Print → Microsoft Print to PDF → Save. Mac: open in Preview → File → Export as PDF." },
      { title: "Sign up at fax.plus and compose email to fax", detail: "Create a free fax.plus account. Then compose a new email. In the To field: +1[faxnumber]@fax.plus (e.g. +15551234567@fax.plus)." },
      { title: "Attach PDF and send", detail: "Attach your PDF and send the email. Fax.Plus sends it as a real fax. You get a delivery confirmation email.", tip: "Keep the confirmation email as proof of delivery." },
    ],
  },
};

export default function Client() {
  const [stage, setStage] = useState<"intro" | "method" | "doctype" | "lead" | "guide">("intro");
  const [method, setMethod] = useState<FaxMethod | null>(null);
  const [docType, setDocType] = useState<DocType | null>(null);
  const [completedSteps, setCompletedSteps] = useState<Set<number>>(new Set());
  const [name, setName] = useState(""); const [email, setEmail] = useState(""); const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [submitting, setSubmitting] = useState(false); const [submitted, setSubmitted] = useState(false);

  const steps = method && docType ? STEPS[method][docType] : [];
  const methodData = FAX_METHODS.find(m => m.id === method);
  const allDone = completedSteps.size >= steps.length && steps.length > 0;

  const toggleStep = (i: number) => { setCompletedSteps(prev => { const n = new Set(prev); n.has(i) ? n.delete(i) : n.add(i); return n; }); };
  const validate = () => { const e: Record<string, string> = {}; if (!name.trim()) e.name = "Please enter your name"; if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email"; setErrors(e); return Object.keys(e).length === 0; };
  const handleSubmit = async () => {
    if (!validate()) return; setSubmitting(true);
    try { await fetch("/api/leads", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, issue: `Fax Guide — Method: ${method} — DocType: ${docType}`, source: "how-to-send-a-fax-from-home" }) }); } catch {}
    setSubmitted(true); setSubmitting(false); setStage("guide");
  };
  const reset = () => { setStage("intro"); setMethod(null); setDocType(null); setCompletedSteps(new Set()); setName(""); setEmail(""); setPhone(""); setSubmitted(false); };

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[70vh] flex items-end overflow-hidden">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={() => {}} />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6">
            <Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16} />
            <Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16} />
            <span className="text-zinc-300">How to Send a Fax from Home</span>
          </nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14} /> Free Guide · No Phone Line Needed</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">
            How to Send<br /><span className="bg-gradient-to-r from-indigo-400 to-purple-300 bg-clip-text text-transparent italic">a Fax from Home</span>
          </h1>
          <p className="text-xl md:text-2xl text-zinc-300 font-medium max-w-2xl mb-8 leading-relaxed">Need to fax medical forms, legal documents, or insurance papers? We show you exactly how — from your printer, phone, or computer. No fax machine or phone line required.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none" />
      </header>

      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <AnimatePresence mode="wait">

          {stage === "intro" && (
            <motion.div key="intro" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -20 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-400" />
                <div className="p-8 md:p-10">
                  <h2 className="text-2xl font-black text-white mb-4">You don't need a fax machine anymore 📠</h2>
                  <p className="text-zinc-400 text-lg font-medium mb-6 leading-relaxed">Many medical offices, insurance companies, lawyers, and government agencies still require faxes. This guide shows you 4 modern ways to send a fax from home — including completely free methods that need no phone line or fax machine.</p>
                  <div className="grid grid-cols-2 gap-3 mb-6">
                    {[{ icon: "🏥", label: "Doctor's offices" }, { icon: "⚖️", label: "Legal documents" }, { icon: "🏛️", label: "Government forms" }, { icon: "🏦", label: "Insurance & banks" }].map(i => (<div key={i.label} className="bg-zinc-800 rounded-xl p-3 flex items-center gap-3"><span className="text-2xl">{i.icon}</span><span className="text-sm font-bold text-zinc-300">{i.label}</span></div>))}
                  </div>
                  <div className="bg-indigo-900/20 border border-indigo-700 rounded-2xl p-4 mb-6 flex items-start gap-3">
                    <AlertCircle size={16} className="text-indigo-400 mt-0.5 shrink-0" />
                    <p className="text-sm text-indigo-300 font-medium">You can fax for free from a website on your computer or phone — no account needed for basic faxes. This guide shows you the simplest free methods first.</p>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={() => setStage("method")} className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/25">
                    Show Me How to Fax <ArrowRight size={24} />
                  </motion.button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "method" && (
            <motion.div key="method" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("intro")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">How would you like to send the fax?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">Choose the method that works best for your situation. All methods work reliably — the fax arrives identically at the other end.</p>
                  <div className="space-y-3">
                    {FAX_METHODS.map(m => (
                      <motion.button key={m.id} whileTap={{ scale: 0.98 }} onClick={() => { setMethod(m.id); setStage("doctype"); }} className={`w-full p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:${m.color} text-left flex items-start gap-4 transition-all`}>
                        <span className="text-3xl shrink-0">{m.icon}</span>
                        <div className="flex-1">
                          <div className="font-black text-white text-base mb-1">{m.label}</div>
                          <div className="text-zinc-400 text-sm font-medium mb-2">{m.desc}</div>
                          <div className="flex flex-wrap gap-2">
                            <span className="text-xs font-bold text-zinc-500 bg-zinc-700 px-2 py-1 rounded-full">Needs: {m.requires}</span>
                            <span className="text-xs font-bold text-green-400 bg-green-900/30 px-2 py-1 rounded-full">✓ {m.best}</span>
                          </div>
                        </div>
                      </motion.button>
                    ))}
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "doctype" && (
            <motion.div key="doctype" initial={{ opacity: 0, x: 40 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -40 }} transition={{ type: "spring", stiffness: 400, damping: 35 }}>
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-400" />
                <div className="p-8 md:p-10">
                  <button onClick={() => setStage("method")} className="flex items-center gap-2 text-zinc-400 hover:text-white text-base font-bold mb-8 transition-colors"><ArrowLeft size={18} /> Back</button>
                  <div className="flex items-center gap-3 mb-6"><span className="text-3xl">{methodData?.icon}</span><span className="font-black text-white text-lg">{methodData?.label}</span></div>
                  <h3 className="text-2xl md:text-3xl font-black text-white mb-2">What form is your document in?</h3>
                  <p className="text-zinc-400 font-medium text-base mb-6">This determines the first steps we show you.</p>
                  <div className="space-y-3">
                    {DOC_TYPES.map(d => (
                      <motion.button key={d.id} whileTap={{ scale: 0.98 }} onClick={() => { setDocType(d.id); setStage("lead"); }} className="w-full p-6 rounded-2xl border-2 border-zinc-700 bg-zinc-800/50 hover:border-indigo-700 text-left flex items-center gap-4 transition-all">
                        <span className="text-3xl">{d.icon}</span>
                        <div><div className="font-black text-white text-base">{d.label}</div><div className="text-zinc-400 text-sm font-medium">{d.desc}</div></div>
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
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-400" />
                <div className="p-8 md:p-10">
                  <div className="text-center mb-8">
                    <div className="text-6xl mb-4">📠</div>
                    <h2 className="text-3xl font-black text-white mb-3">Your fax guide is ready!</h2>
                    <p className="text-zinc-400 font-medium text-lg">Enter your name and email — we'll send your personalised fax-from-home steps to your inbox so you can refer back to them anytime.</p>
                  </div>
                  <div className="space-y-4 mb-6">
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label><div className="relative"><User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Barbara" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600" /></div>{errors.name && <p className="text-red-400 text-sm mt-1 font-bold">{errors.name}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label><div className="relative"><Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600" /></div>{errors.email && <p className="text-red-400 text-sm mt-1 font-bold">{errors.email}</p>}</div>
                    <div><label className="text-sm font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone <span className="text-zinc-600 normal-case font-medium">(optional — for a free help call)</span></label><div className="relative"><Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" /><input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000" className="w-full pl-12 pr-4 py-4 bg-zinc-800 border border-zinc-700 rounded-xl text-white focus:outline-none focus:border-indigo-500 text-lg placeholder:text-zinc-600" /></div></div>
                  </div>
                  <motion.button whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }} onClick={handleSubmit} disabled={submitting} className="w-full py-6 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black text-xl rounded-2xl flex items-center justify-center gap-3 shadow-xl shadow-indigo-500/25 mb-3">
                    {submitting ? <Loader2 size={24} className="animate-spin" /> : "Send My Fax Guide & Show Steps"}
                  </motion.button>
                  <button onClick={() => setStage("guide")} className="w-full text-center text-base text-zinc-500 hover:text-zinc-300 font-medium py-2 transition-colors">Skip — just show me the steps</button>
                </div>
              </div>
            </motion.div>
          )}

          {stage === "guide" && steps.length > 0 && (
            <motion.div key="guide" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
              {submitted && (<div className="bg-green-900/30 border border-green-700 rounded-2xl p-5 flex items-center gap-3"><CheckCircle2 size={20} className="text-green-400 shrink-0" /><p className="text-base font-bold text-green-300">Fax guide sent to {email}!</p></div>)}
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-purple-400" />
                <div className="p-7">
                  <div className="flex items-center gap-3 mb-3"><span className="text-2xl">{methodData?.icon}</span><div><div className="font-black text-white text-base">{methodData?.label}</div><div className="text-zinc-500 text-sm">Tick each step as you complete it</div></div></div>
                  <div className="mt-3"><div className="flex justify-between text-sm font-black text-zinc-400 mb-2"><span>{completedSteps.size} of {steps.length} steps done</span><span>{Math.round((completedSteps.size / steps.length) * 100)}%</span></div><div className="h-2 bg-zinc-800 rounded-full overflow-hidden"><motion.div className="h-full bg-gradient-to-r from-indigo-500 to-purple-400 rounded-full" animate={{ width: `${(completedSteps.size / steps.length) * 100}%` }} transition={{ duration: 0.4 }} /></div></div>
                </div>
              </div>
              {steps.map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.07 }} className={`bg-zinc-900 rounded-2xl border-2 overflow-hidden transition-all ${completedSteps.has(i) ? "border-indigo-700" : "border-zinc-800"}`}>
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <motion.button whileTap={{ scale: 0.9 }} onClick={() => toggleStep(i)} className={`w-10 h-10 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5 transition-all ${completedSteps.has(i) ? "bg-indigo-600 border-indigo-500" : "border-zinc-600 hover:border-indigo-500"}`}>
                        {completedSteps.has(i) ? <CheckCheck size={18} className="text-white" /> : <span className="text-zinc-400 font-black text-sm">{i + 1}</span>}
                      </motion.button>
                      <div className="flex-1">
                        <h4 className={`font-black text-base mb-2 ${completedSteps.has(i) ? "text-indigo-300 line-through opacity-60" : "text-white"}`}>{step.title}</h4>
                        <p className="text-zinc-300 text-sm font-medium leading-relaxed">{step.detail}</p>
                        {step.tip && (<div className="mt-3 bg-amber-900/20 border border-amber-700/50 rounded-xl p-3 flex items-start gap-2"><span className="text-amber-400 text-sm">💡</span><p className="text-amber-300 text-sm font-medium">{step.tip}</p></div>)}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
              {allDone && (
                <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-gradient-to-br from-indigo-900/40 to-purple-900/20 border-2 border-indigo-700 rounded-[2rem] p-8 text-center">
                  <div className="text-5xl mb-4">✅</div>
                  <h3 className="text-2xl font-black text-white mb-2">Fax sent!</h3>
                  <p className="text-zinc-400 font-medium mb-4">You should have received a delivery confirmation. Keep that confirmation as proof. If you'd like help setting up faxing permanently, our tutors can walk you through it.</p>
                  <Link href="/contact"><motion.div whileHover={{ scale: 1.02 }} className="inline-flex items-center gap-2 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-lg cursor-pointer">Talk to a Tutor <ArrowRight size={18} /></motion.div></Link>
                </motion.div>
              )}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <button onClick={reset} className="flex items-center justify-center gap-2 py-5 border-2 border-zinc-700 rounded-2xl font-black text-zinc-300 hover:border-zinc-500 transition-colors text-lg"><RefreshCw size={20} /> Try Another Method</button>
                <Link href="/tools/how-to-print-from-phone-or-laptop"><motion.div whileHover={{ scale: 1.02 }} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Print from My Phone <ArrowRight size={20} /></motion.div></Link>
              </div>
              <div className="bg-zinc-900 border border-zinc-800 rounded-2xl p-5 flex items-start gap-3"><Shield size={14} className="text-zinc-500 mt-0.5 shrink-0" /><p className="text-sm text-zinc-500 font-medium">Educational guidance only. Fax service features and pricing change regularly — verify at each provider's official website. Not affiliated with Fax.Plus, FaxZero, or any fax service.</p></div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      <section className="border-t border-zinc-800 py-20">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-black text-white mb-8 tracking-tight">How to Send a Fax from Home — The 2025 Guide</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-zinc-400 font-medium leading-relaxed text-base">
            <div><p className="mb-4">Despite the rise of email, faxing remains essential in healthcare, legal, government, and insurance industries. Many medical offices, Social Security offices, and law firms still require fax for secure document transmission. The good news is that you no longer need a dedicated fax machine or phone line to send a fax.</p><p>Online fax services like Fax.Plus and FaxZero allow you to send faxes from your computer or phone using just an internet connection. The recipient never knows the fax didn't come from a traditional machine — it arrives exactly the same way.</p></div>
            <div><p className="mb-4">FaxZero is the simplest free option for one-off faxes — no account required, up to 5 free faxes per day. Fax.Plus offers a more comprehensive free trial and also enables faxing via email, which is particularly useful for regular faxers. Both services use encryption and are more secure than traditional fax machines.</p><p>This guide is for educational purposes only. Setwise Digital is not affiliated with Fax.Plus, FaxZero, or any fax service provider. Always verify current pricing and features before signing up for any paid service.</p></div>
          </div>
        </div>
      </section>
      <Footer />
    </div>
  );
}
