"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { ChevronRight, Zap, CheckCircle2 } from "lucide-react";

const bgs = [
  { url:"https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1548345680-f5475ea5df84?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
  { url:"https://images.unsplash.com/photo-1476231682828-37e571bc172f?auto=format&fit=crop&q=80&w=1600", type:"image" as const, theme:"dark" as const },
];

const FEATURES = [
  { id:"live-traffic", name:"Live Traffic", emoji:"🚦", importance:"Essential for city drivers", plain:"Your GPS checks road conditions in real-time and reroutes you around jams automatically. Without this, it will send you into traffic it doesn't know about.", needs:"Smartphone connection or cellular subscription", goodFor:"City drivers, commuters, highway drivers", skip:"Rural drivers, low traffic areas" },
  { id:"voice-control", name:"Voice Control", emoji:"🎤", importance:"Important for safety", plain:"You speak to your GPS instead of touching the screen. Say 'Navigate to Walmart' and it starts routing. Keeps your eyes on the road.", needs:"Microphone in the device", goodFor:"All drivers — especially seniors", skip:"Nobody — this feature is always useful" },
  { id:"lane-assist", name:"Lane Guidance / Junction View", emoji:"🛣️", importance:"Very helpful on highways", plain:"At complex highway interchanges, your GPS shows a detailed picture of the junction with arrows pointing to exactly which lane you need. No more last-second lane changes.", needs:"Included on mid-range GPS and above", goodFor:"Highway drivers, unfamiliar roads, seniors", skip:"Simple city-only drivers" },
  { id:"lifetime-maps", name:"Lifetime Map Updates", emoji:"🗺️", importance:"Money saver", plain:"Instead of paying $50–$150 per map update every year, you pay once and get all future updates free. Worth it if you plan to keep the GPS for 3+ years.", needs:"Look for 'LM' in the model name (e.g. DriveSmart 55 LMT)", goodFor:"Long-term owners, frequent drivers", skip:"If buying GPS for short-term only" },
  { id:"bluetooth", name:"Bluetooth Calling", emoji:"📞", importance:"Convenient hands-free feature", plain:"Your GPS connects to your phone and lets you answer calls through the GPS speaker. Voice directions automatically pause when you're on a call.", needs:"Bluetooth + look for 'T' in model name (LMT = Lifetime Maps + Traffic)", goodFor:"People who get calls while driving", skip:"People who prefer silence or use earbuds" },
  { id:"wifi-updates", name:"Wi-Fi Map Updates", emoji:"📡", importance:"Convenience feature", plain:"Your GPS connects to your home Wi-Fi and downloads map updates overnight without needing a computer. No USB cables required.", needs:"Wi-Fi enabled GPS (DriveSmart series)", goodFor:"Non-technical users who want hassle-free updates", skip:"People comfortable with USB computer updates" },
  { id:"speed-alerts", name:"Speed Limit Alerts", emoji:"⚡", importance:"Safety feature", plain:"Your GPS shows the current speed limit on screen and can beep when you exceed it. Speed limits are updated with map updates.", needs:"Included on most modern GPS units", goodFor:"All drivers — especially on unfamiliar roads", skip:"Nobody — always keep this on" },
  { id:"driver-alerts", name:"Driver Alerts (Fatigue, Ahead)", emoji:"⚠️", importance:"Safety feature", plain:"Your GPS warns you about sharp curves ahead, animal crossings, schools, level crossings, and other hazards based on the map data.", needs:"Included on DriveSmart and higher models", goodFor:"Long highway drives, rural driving, seniors", skip:"Very short trips in familiar areas" },
  { id:"screen-size", name:"Screen Size (5\" vs 7\")", emoji:"📱", importance:"Accessibility for 45+", plain:"A 7-inch screen shows bigger text, larger maps, and is much easier to glance at while driving. For adults 45 and over, a larger screen makes navigation significantly less stressful.", needs:"Garmin DriveSmart 65 has 6.95-inch screen", goodFor:"Seniors 45+, anyone with reading glasses, highway drivers", skip:"Young drivers, city-only drivers who want compact size" },
  { id:"lifetime-traffic", name:"Lifetime Traffic Updates", emoji:"📊", importance:"Long-term value", plain:"Like lifetime map updates but for live traffic — you'll always get real-time traffic updates for the life of your device without a subscription.", needs:"Look for 'LMT' in model name (Lifetime Maps + Traffic)", goodFor:"Frequent highway drivers, commuters", skip:"Occasional drivers, rural drivers" },
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
          <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-6"><Link href="/" className="hover:text-white">Home</Link><ChevronRight size={16}/><Link href="/tools" className="hover:text-white">Free Tools</Link><ChevronRight size={16}/><span className="text-zinc-300">GPS Features Guide</span></nav>
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-green-500/10 border border-green-500/30 text-green-300 text-sm font-black uppercase tracking-widest mb-6"><Zap size={14}/> Free Reference Guide</div>
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6">GPS Features<br/><span className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent italic">Explained Simply</span></h1>
          <p className="text-xl text-zinc-300 font-medium max-w-2xl mb-4 leading-relaxed">What does 'Live Traffic', 'Lane Assist', or 'LMT' actually mean? Tap any feature to get a plain-English explanation of what it does, who needs it, and whether it's worth paying extra for.</p>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0d1117] to-transparent z-10 pointer-events-none"/>
      </header>

      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 pb-28 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div>
            <h2 className="text-xl font-black text-white mb-4 uppercase tracking-widest">Tap any feature to learn more</h2>
            <div className="space-y-3">
              {FEATURES.map(f => (
                <motion.button key={f.id} whileTap={{scale:0.98}} onClick={()=>setSelected(f.id===selected?null:f.id)}
                  className={`w-full flex items-center gap-4 p-5 rounded-2xl border-2 text-left transition-all ${selected===f.id?"border-green-500 bg-green-900/20":"border-zinc-700 bg-zinc-900 hover:border-zinc-500"}`}>
                  <div className="text-3xl">{f.emoji}</div>
                  <div className="flex-1"><div className="font-black text-white text-base">{f.name}</div><div className="text-zinc-400 text-sm">{f.importance}</div></div>
                  {selected===f.id&&<CheckCircle2 size={20} className="text-green-400 shrink-0"/>}
                </motion.button>
              ))}
            </div>
          </div>
          <div className="lg:sticky lg:top-24 lg:self-start">
            {selectedFeature ? (
              <motion.div key={selectedFeature.id} initial={{opacity:0,y:20}} animate={{opacity:1,y:0}} className="bg-zinc-900 rounded-[2rem] border-2 border-green-700 overflow-hidden">
                <div className="h-1.5 bg-gradient-to-r from-green-500 to-emerald-400"/>
                <div className="p-8">
                  <div className="text-5xl mb-4">{selectedFeature.emoji}</div>
                  <h3 className="text-2xl font-black text-white mb-2">{selectedFeature.name}</h3>
                  <div className="text-green-400 font-black text-sm uppercase tracking-widest mb-5">{selectedFeature.importance}</div>
                  <div className="space-y-5">
                    <div className="bg-zinc-800 rounded-2xl p-5"><div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">What it actually means</div><p className="text-base text-zinc-200 font-medium leading-relaxed">{selectedFeature.plain}</p></div>
                    <div className="bg-zinc-800 rounded-2xl p-5"><div className="text-sm font-black text-zinc-400 uppercase tracking-widest mb-2">How to get it</div><p className="text-base text-zinc-200 font-medium">{selectedFeature.needs}</p></div>
                    <div className="grid grid-cols-1 gap-3">
                      <div className="bg-green-900/20 border border-green-800 rounded-xl p-4"><div className="text-sm font-black text-green-400 mb-1">✅ Great for:</div><p className="text-sm text-zinc-300 font-medium">{selectedFeature.goodFor}</p></div>
                      <div className="bg-zinc-800 rounded-xl p-4"><div className="text-sm font-black text-zinc-400 mb-1">⏭️ Can skip if:</div><p className="text-sm text-zinc-400 font-medium">{selectedFeature.skip}</p></div>
                    </div>
                  </div>
                </div>
              </motion.div>
            ) : (
              <div className="bg-zinc-900 rounded-[2rem] border border-zinc-800 p-8 text-center">
                <div className="text-5xl mb-4">👈</div>
                <h3 className="text-xl font-black text-white mb-2">Select a feature to learn about it</h3>
                <p className="text-zinc-400 font-medium">Tap any GPS feature on the left to get a plain-English explanation of what it does and whether you need it.</p>
              </div>
            )}
            <div className="mt-6 space-y-3">
              <Link href="/tools/best-gps-finder"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-5 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black rounded-2xl shadow-lg cursor-pointer text-lg">Find the Best GPS for You <ChevronRight size={18}/></motion.div></Link>
              <Link href="/tools/road-trip-checker"><motion.div whileHover={{scale:1.02}} className="flex items-center justify-center gap-2 py-4 border-2 border-zinc-700 text-zinc-300 font-black rounded-2xl cursor-pointer text-base hover:border-zinc-500 transition-colors">Road Trip GPS Pre-Check</motion.div></Link>
            </div>
          </div>
        </div>
      </section>
      <Footer/>
    </div>
  );
}
