"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { ChevronRight, Zap, CheckCircle2 } from "lucide-react";

const bgs = [{ url:"https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=1200", type:"image" as const, theme:"dark" as const }];

const FEATURES = [
  { id:"wireless", name:"Wireless / Wi-Fi Printing", emoji:"📶", importance:"Essential for modern homes", plain:"Print from your phone, iPad, or any computer in your home without plugging in any cables. Just connect the printer to your Wi-Fi once and it works everywhere.", needs:"Built-in Wi-Fi on virtually all modern printers", goodFor:"Everyone — this is now a standard feature", skip:"Nobody — always get wireless" },
  { id:"auto-duplex", name:"Automatic Double-Sided Printing", emoji:"📄", importance:"Saves paper and money", plain:"The printer flips the paper automatically and prints on both sides. You don't have to flip pages manually. Cuts paper use in half for documents.", needs:"Look for 'Auto Duplex' or 'ADW' in model name", goodFor:"Students, home offices, anyone printing documents regularly", skip:"Photo printers where you only print one side" },
  { id:"adf", name:"Automatic Document Feeder (ADF)", emoji:"📥", importance:"Scan multiple pages without babysitting", plain:"Instead of lifting the scanner lid for each page, you stack up to 30–50 pages in a tray and the printer feeds them one by one automatically. Huge time saver.", needs:"Mid-range all-in-one printers and above", goodFor:"Anyone scanning multi-page documents, tax forms, insurance papers", skip:"Occasional one-page scanners" },
  { id:"photo-printing", name:"Photo Printing Quality", emoji:"🖼️", importance:"Critical if you print family photos", plain:"Not all printers print photos equally. Printers with more ink colors (5-6 color systems) produce smoother gradients and more realistic skin tones. Document printers with 3-4 colors look flat.", needs:"Canon PIXMA or Epson EcoTank with 5-6 color ink system", goodFor:"Grandparents printing family photos, craft makers, photo enthusiasts", skip:"People who only print documents" },
  { id:"fax", name:"Fax Machine Built-In", emoji:"📠", importance:"Still needed for doctors and legal", plain:"Many doctors' offices, insurance companies, and law firms still only accept faxed documents. Having a built-in fax means you can send and receive without leaving home.", needs:"Requires a phone line connection AND a printer with fax capability", goodFor:"Seniors dealing with medical offices, legal documents, insurance claims", skip:"People under 50 with tech-savvy providers" },
  { id:"cloud-print", name:"Cloud Printing / Mobile App", emoji:"☁️", importance:"Modern convenience", plain:"Print from anywhere using a phone app. Email a document from your phone to your printer at home and it prints — even when you're not there. HP Smart App, Canon PRINT app, Epson Smart Panel.", needs:"Wi-Fi printer + manufacturer's free app on your phone", goodFor:"People who print from their phones frequently", skip:"Desktop-only printers" },
  { id:"ink-tank", name:"Ink Tank System vs Cartridges", emoji:"🫙", importance:"Biggest money decision", plain:"Ink tanks use bottles you refill (like a gas tank) instead of cartridges you replace. The cost per page drops from 15¢ to just 1–2¢. Higher upfront cost, dramatically lower running cost.", needs:"Epson EcoTank, Canon MegaTank, HP Smart Tank, Brother INKvestment", goodFor:"Anyone who prints 100+ pages per month", skip:"Light printers (under 50 pages/month)" },
  { id:"speed", name:"Print Speed (PPM)", emoji:"⏱️", importance:"Matters for high volume", plain:"PPM stands for 'pages per minute'. Most home inkjet printers do 8–15 PPM for black text. Laser printers do 20–30 PPM. For 50 pages occasionally, speed doesn't matter. For 200 pages daily, it matters a lot.", needs:"Check PPM in specifications — laser printers are fastest", goodFor:"Home offices, anyone printing 100+ pages regularly", skip:"Occasional printers" },
  { id:"display", name:"Touchscreen Display", emoji:"📱", importance:"Ease of use for seniors", plain:"Instead of small confusing buttons, a touchscreen lets you navigate menus like a phone. Much easier for seniors. Look for at least a 2-inch display. Some have full-color 4.3-inch touchscreens.", needs:"Mid-range and premium printers", goodFor:"Seniors, non-technical users, anyone who values simplicity", skip:"Budget printers where screen size is limited" },
  { id:"ink-monitoring", name:"Ink Level Monitoring", emoji:"📊", importance:"Prevents empty surprises", plain:"Your phone or computer shows exactly how much ink is left before you run out. HP Smart, Canon PRINT, and Epson apps all provide this. You'll never be surprised by an empty cartridge mid-document.", needs:"Wi-Fi printer + manufacturer app on phone", goodFor:"Everyone — prevents the frustration of running out during important prints", skip:"Nobody — always useful" },
];

export default function Client() {
  const [selected, setSelected] = useState<string|null>(null);
  const [currentTheme, setCurrentTheme] = useState<"dark"|"light">("dark");
  const selectedFeature = FEATURES.find(f => f.id === selected);

  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <header className="relative min-h-[60vh] flex items-end overflow-hidden text-white">
        <HeaderBackgroundSlider items={bgs} interval={8000} onThemeChange={setCurrentTheme}/>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full pb-16 pt-32">
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">Printer Features Guide</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-indigo-500/10 border border-indigo-500/30 text-indigo-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Reference Guide</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">Printer Features<br/><span className="bg-gradient-to-r from-indigo-400 to-violet-300 bg-clip-text text-transparent italic">Explained Simply</span></h1>
          <p className="text-xl text-zinc-300 font-medium max-w-2xl mb-4 leading-relaxed">What is Auto Duplex? ADF? PPM? Tap any printer feature to get a plain-English explanation — what it does, who actually needs it, and whether it's worth the extra cost.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-black text-white mb-4 uppercase tracking-widest">Tap any feature to understand it</h2>
            <div className="space-y-3">
              {FEATURES.map(f => (
                <motion.button key={f.id} whileTap={{scale:0.98}} onClick={()=>setSelected(f.id===selected?null:f.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${selected===f.id?"border-indigo-500 bg-indigo-900/20":"border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}>
                  <div className="text-3xl">{f.emoji}</div>
                  <div className="flex-1"><div className="font-black text-white text-base">{f.name}</div><div className="text-zinc-400 text-sm">{f.importance}</div></div>
                  {selected===f.id&&<CheckCircle2 size={20} className="text-indigo-400 shrink-0"/>}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            {selectedFeature ? (
              <motion.div key={selectedFeature.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-zinc-900 rounded-[2rem] border-2 border-indigo-700 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-indigo-500 to-violet-400"/>
                <div className="p-8">
                  <div className="text-5xl mb-4">{selectedFeature.emoji}</div>
                  <h3 className="text-2xl font-black text-white mb-2">{selectedFeature.name}</h3>
                  <div className="text-indigo-400 font-black text-sm uppercase tracking-widest mb-5">{selectedFeature.importance}</div>
                  <div className="space-y-5">
                    <div className="bg-zinc-800 rounded-2xl p-5"><div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">What it actually means</div><p className="text-base text-zinc-200 font-medium leading-relaxed">{selectedFeature.plain}</p></div>
                    <div className="bg-zinc-800 rounded-2xl p-5"><div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">How to get it</div><p className="text-base text-zinc-200 font-medium">{selectedFeature.needs}</p></div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-indigo-900/20 border border-indigo-800 rounded-xl p-4"><div className="text-sm font-black text-indigo-400 mb-1">✅ Great for:</div><p className="text-sm text-zinc-300 font-medium">{selectedFeature.goodFor}</p></div>
                      <div className="bg-zinc-800 rounded-xl p-4"><div className="text-sm font-black text-zinc-400 mb-1">⏭️ Can skip if:</div><p className="text-sm text-zinc-400 font-medium">{selectedFeature.skip}</p></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 text-center">
                <div className="text-5xl mb-4">👈</div>
                <h3 className="text-xl font-black text-white mb-2">Select a feature to understand it</h3>
                <p className="text-zinc-400 font-medium">Tap any printer feature on the left for a plain-English explanation of what it does and whether you need it.</p>
              </div>
            )}
            <div className="mt-6 space-y-3">
              <Link href="/tools/best-printer-finder"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-violet-600 to-purple-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Find the Best Printer for You <ChevronRight size={18}/></motion.div></Link>
              <Link href="/tools/printer-cost-calculator"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-4 border-2 border-zinc-700 text-zinc-300 font-black rounded-2xl cursor-pointer text-base hover:border-zinc-500 transition-colors">Calculate Printer Running Cost</motion.div></Link>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
