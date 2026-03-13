"use client";

import { motion } from "framer-motion";
import { 
  Printer, 
  Wifi, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Mail, 
  MessageSquare, 
  Package, 
  Zap, 
  ChevronRight,
  Monitor,
  Smartphone,
  AlertCircle,
  RefreshCcw,
  Search,
  Users,
  HelpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import TechBridgeApp, { Step } from "@/components/TechBridgeApp";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import { useState, useEffect } from "react";

const printerBackgrounds = [
  { url: "https://assets.mixkit.co/videos/preview/mixkit-young-man-working-with-his-laptop-and-printer-41045-large.mp4", type: 'video' as const, theme: 'dark' as const }, // Dark video of printer
  { url: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'light' as const }, // Light image of setup
  { url: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const }   // Darker hardware image
];

const PrinterVisuals = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const scenes = [
    { title: "Initial Setup", icon: <Wifi />, color: "text-blue-500" },
    { title: "Paper Jams", icon: <AlertCircle />, color: "text-red-500" },
    { title: "Ink & Toner", icon: <Package />, color: "text-indigo-500" },
    { title: "Driver Updates", icon: <RefreshCcw />, color: "text-green-500" }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentScene((prev) => (prev + 1) % scenes.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full h-full flex items-center justify-center p-12">
      <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')]" />
      
      {/* Scene Content */}
      <motion.div
        key={currentScene}
        initial={{ opacity: 0, scale: 0.8, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 1.1, y: -20 }}
        transition={{ duration: 0.8, ease: "circOut" }}
        className="relative z-10 w-full h-full flex flex-col items-center justify-center"
      >
        <div className="w-full h-2/3 flex items-center justify-center">
          {currentScene === 0 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-blue-500/40">
              <rect x="100" y="150" width="200" height="120" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <motion.path 
                d="M150 150 V100 H250 V150" 
                fill="none" stroke="currentColor" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.circle 
                cx="200" cy="120" r="30" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="5 5"
                animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <Wifi className="text-blue-500 absolute" size={48} />
            </svg>
          )}
          {currentScene === 1 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-red-500/40">
              <rect x="100" y="150" width="200" height="120" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <motion.path 
                d="M120 200 H280" stroke="currentColor" strokeWidth="12" strokeLinecap="round" opacity="0.3"
                animate={{ x: [0, 5, -5, 0], y: [0, 2, -2, 0] }} transition={{ duration: 0.2, repeat: Infinity }}
              />
              <AlertCircle className="text-red-500" size={64} />
            </svg>
          )}
          {currentScene === 2 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-indigo-500/40">
              <rect x="100" y="150" width="200" height="120" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <motion.rect 
                x="175" y="100" width="50" height="70" rx="5" fill="currentColor" stroke="currentColor" strokeWidth="2"
                animate={{ y: [80, 160, 80] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              />
              <Package className="text-indigo-500" size={48} />
            </svg>
          )}
          {currentScene === 3 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-green-500/40">
              <rect x="100" y="150" width="200" height="120" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <motion.path 
                d="M150 210 H250" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }}
              />
              <motion.div animate={{ rotate: 360 }} transition={{ duration: 4, repeat: Infinity, ease: "linear" }}>
                <RefreshCcw className="text-green-500" size={48} />
              </motion.div>
            </svg>
          )}
        </div>
        
        <div className="mt-8 text-center">
          <div className={`text-2xl font-black uppercase tracking-widest ${scenes[currentScene].color} mb-2`}>
            {scenes[currentScene].title}
          </div>
          <div className="flex gap-2 justify-center">
            {scenes.map((_, i) => (
              <div 
                key={i} 
                className={`w-2 h-2 rounded-full transition-all duration-500 ${i === currentScene ? 'w-8 bg-blue-600' : 'bg-zinc-700'}`} 
              />
            ))}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default function PrintersPage() {
  const [email, setEmail] = useState("");
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');

  const printerSteps: Step[] = [
    {
      id: "start",
      question: "What printer issue are you facing?",
      options: [
        { label: "Wireless/Setup Help", nextStepId: "setup" },
        { label: "Paper Jam/Error", nextStepId: "error" },
        { label: "Ink or Toner Issue", nextStepId: "ink" },
        { label: "Scanner/Drivers Help", nextStepId: "software" }
      ]
    },
    {
      id: "setup",
      question: "Printer Setup & Wi-Fi",
      options: [
        { 
          label: "Finish Setup", 
          isFinal: true, 
          instructions: [
            "Ensure the printer is plugged in and turned on.",
            "On the printer screen, find 'Wi-Fi Setup' or 'Network Settings'.",
            "Select your home Wi-Fi name and enter the password.",
            "On your computer or phone, go to 'Add Printer' in settings.",
            "Select your printer from the list and follow the prompts.",
            "Try printing a 'Test Page' to confirm it works!"
          ] 
        }
      ]
    },
    {
      id: "error",
      question: "Fixing Jams & Errors",
      options: [
        { 
          label: "Clear Error", 
          isFinal: true, 
          instructions: [
            "Open the main cover and gently pull out any visible stuck paper.",
            "Check the rear access door and bottom tray for small scraps.",
            "Turn the printer off, wait 30 seconds, and turn it back on.",
            "If you see a specific error code (like E03), check the manual or brand website.",
            "Ensure the paper is not damp and the tray is not overloaded."
          ] 
        }
      ]
    },
    {
      id: "ink",
      question: "Ink & Toner Help",
      options: [
        { 
          label: "Replace Cartridge", 
          isFinal: true, 
          instructions: [
            "Turn the printer on and open the cartridge access door.",
            "Wait for the carriage to move to the center.",
            "Gently press down on the old cartridge to release it.",
            "Remove the protective tape from the new cartridge.",
            "Slide the new cartridge into the slot until it clicks.",
            "Close the door and follow any alignment steps on the screen."
          ] 
        }
      ]
    },
    {
      id: "software",
      question: "Scanner & Drivers",
      options: [
        { 
          label: "Update Software", 
          isFinal: true, 
          instructions: [
            "Go to the official website of your printer brand (HP, Epson, Canon, etc.).",
            "Search for your specific model number under 'Support' or 'Drivers'.",
            "Download the latest 'Full Feature Software' for your computer.",
            "Run the installer and follow the step-by-step instructions.",
            "Restart your computer and try scanning a document."
          ] 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section - Full Cover */}
      <header className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
        <HeaderBackgroundSlider items={printerBackgrounds} onThemeChange={setCurrentTheme} />
        
        {/* Advanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              x: [-100, 100, -100],
              y: [-50, 50, -50],
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className={`absolute top-0 left-1/4 w-96 h-96 rounded-full blur-3xl ${currentTheme === 'dark' ? 'bg-blue-900/20' : 'bg-blue-100/30'}`} 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-3/5"
            >
              <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl border ${currentTheme === 'dark' ? 'bg-black/20 border-white/20 text-blue-400' : 'bg-white/50 border-white/50 text-blue-700'}`}>
                <Printer size={14} />
                <span>Printer & Scanner Support</span>
              </div>
              <h1 className={`text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Print Without <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent italic">Pressure.</span>
              </h1>
              <p className={`text-xl md:text-3xl mb-14 leading-relaxed font-medium ${currentTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                From paper jams to wireless setup, we make your printer work for you. Simple solutions for every brand and model.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
                {[
                  "Wireless setup & connection",
                  "Paper jam troubleshooting",
                  "Ink & toner replacement",
                  "Scanner & driver help"
                ].map((bullet, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className={`flex items-center gap-4 p-5 rounded-3xl backdrop-blur-sm border shadow-xl hover:shadow-2xl transition-all group ${currentTheme === 'dark' ? 'bg-white/10 border-white/10 text-zinc-200' : 'bg-white/80 border-white text-zinc-700'}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-500 flex items-center justify-center text-white transition-colors duration-300">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-black">{bullet}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="#app" className="shine-effect w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group border-0">
                  Start Printer Guide
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/contact" className={`font-black hover:text-blue-600 transition-all flex items-center gap-3 group ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-500'}`}>
                  <div className={`w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all ${currentTheme === 'dark' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white/80 group-hover:bg-blue-50'}`}>
                    <Mail size={24} />
                  </div>
                  Ask a Printer Expert
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/5 relative"
            >
              <div className="bg-zinc-900/80 backdrop-blur-xl aspect-square rounded-[4rem] flex items-center justify-center relative overflow-hidden shadow-2xl group border border-white/10">
                <PrinterVisuals />
              </div>

              {/* Status Badge */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-zinc-100"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-green-500 flex items-center justify-center text-white shadow-lg shadow-green-500/20">
                    <CheckCircle2 size={32} />
                  </div>
                  <div>
                    <div className="font-black text-2xl text-zinc-900 tracking-tight">Connected</div>
                    <div className="text-zinc-500 font-bold text-sm uppercase tracking-widest">Printer Ready</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      {/* App Section */}
      <section id="app" className="py-32 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 rounded-lg dark-glass border-white/10 text-blue-400 text-sm font-bold mb-6 uppercase tracking-wider">Interactive Tool</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">Printer Troubleshooting App</h2>
            <p className="text-xl text-zinc-400 font-medium">Click through our simple guide to get your printer working perfectly.</p>
          </div>
          
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-white/10">
            <TechBridgeApp 
              title="Printer Assistant" 
              steps={printerSteps} 
            />
          </div>
        </div>
      </section>

      {/* Personalized Guidance Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Personalized Guidance — When You Want More</h2>
              <p className="text-xl text-zinc-600 mb-10 leading-relaxed font-medium">
                Sometimes, a bit of personal explanation makes all the difference. That’s where TechBridge comes in: a unique blend of AI-friendly guidance + real human expert input.
              </p>
              <div className="space-y-6 mb-12">
                {[
                  "Ask questions about any step",
                  "Request clarifications on the learning path",
                  "Get expert tips you won’t find in manuals"
                ].map((text, i) => (
                  <div key={i} className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                    <MessageSquare className="text-blue-600" size={24} />
                    <p className="text-lg font-bold text-zinc-800">{text}</p>
                  </div>
                ))}
              </div>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="px-8 py-4 bg-blue-600 text-white rounded-2xl font-bold hover:bg-blue-700 transition-all flex items-center justify-center gap-2">
                  Talk to an Expert
                  <ArrowRight size={20} />
                </button>
                <button className="px-8 py-4 bg-zinc-900 text-white rounded-2xl font-bold hover:bg-zinc-800 transition-all">
                  Submit My Question
                </button>
              </div>
            </div>
            <div className="lg:w-1/2 relative p-12 bg-blue-600 rounded-[4rem] text-white">
               <h3 className="text-3xl font-extrabold mb-6">Why This Page Works for You</h3>
               <div className="space-y-8">
                 {[
                   { title: "Interactive Learning", desc: "Go step-by-step through setup tailored to your printer.", icon: <Zap /> },
                   { title: "AI + Human Experts", desc: "Fast guidance from AI plus deeper help from real people.", icon: <Users /> },
                   { title: "Clear Language", desc: "Everyday words — no confusing tech terms.", icon: <CheckCircle2 /> }
                 ].map((item, i) => (
                   <div key={i} className="flex gap-6">
                     <div className="w-12 h-12 rounded-2xl bg-white/20 flex items-center justify-center shrink-0">{item.icon}</div>
                     <div>
                       <h4 className="font-bold text-xl mb-1">{item.title}</h4>
                       <p className="text-blue-100 font-medium leading-relaxed">{item.desc}</p>
                     </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Lead Capture Form */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-white p-12 md:p-16 rounded-[4rem] shadow-2xl border border-zinc-100 text-center">
            <h2 className="text-4xl font-extrabold mb-6">Tell Us Your Printer & Get a Personalized Session</h2>
            <p className="text-xl text-zinc-600 mb-12 font-medium">We’ll contact you only to help you continue your setup — no spam, no sales calls.</p>
            
            <form className="grid grid-cols-1 md:grid-cols-2 gap-6 text-left">
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Printer Brand / Model</label>
                <input type="text" placeholder="e.g. HP OfficeJet 8010" className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-colors" />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Your Device</label>
                <select className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-colors appearance-none">
                  <option>Windows PC</option>
                  <option>Mac / MacBook</option>
                  <option>iPhone / iPad</option>
                  <option>Android Phone</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">Email Address</label>
                <input 
                  type="email" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@email.com" 
                  className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-colors" 
                />
              </div>
              <div className="md:col-span-2 space-y-2">
                <label className="text-sm font-bold text-zinc-500 uppercase tracking-widest ml-1">What do you want help with? (Optional)</label>
                <textarea rows={3} className="w-full px-6 py-4 bg-zinc-50 border border-zinc-100 rounded-2xl focus:outline-none focus:border-blue-600 transition-colors resize-none" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="w-full py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 active:scale-[0.98]">
                  Get My Customized Guide
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { name: "Debbie, 58", text: "I actually understood what each step meant — so much better than random blogs." },
              { name: "Mark, 63", text: "This guided setup tool walked me through connecting to Wi-Fi in minutes." },
              { name: "Ellen, 49", text: "I printed a test page and finally understood what all the lights on my printer do." }
            ].map((t, i) => (
              <div key={i} className="p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 italic">
                <p className="text-xl font-bold text-zinc-800 mb-6">“{t.text}”</p>
                <div className="flex items-center gap-3 not-italic">
                  <div className="w-10 h-10 rounded-full bg-blue-600 flex items-center justify-center text-white font-bold">{t.name[0]}</div>
                  <span className="font-bold text-zinc-500">— {t.name}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16">Answer the Top Questions</h2>
          <div className="space-y-6">
            {[
              { q: "Is this a support page?", a: "No. It’s a learning experience to help you understand and complete your setup. You can contact a guide when you want verbal explanations." },
              { q: "Do I need technical skills?", a: "Not at all — this guide breaks everything into simple steps." },
              { q: "Will this work for my brand?", a: "Most home and office printers are covered in the journey." },
              { q: "What if I get stuck?", a: "You can ask a TechBridge expert any question at any time." }
            ].map((faq, i) => (
              <div key={i} className="bg-white p-8 rounded-[2rem] border border-zinc-100">
                <h4 className="text-xl font-extrabold mb-3 flex gap-3 items-center">
                  <HelpCircle className="text-blue-600" />
                  {faq.q}
                </h4>
                <p className="text-lg text-zinc-600 font-medium leading-relaxed pl-9">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-zinc-900 rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-extrabold mb-8">Don’t Guess — <span className="text-blue-400">Learn It</span> With Confidence</h2>
              <p className="text-xl md:text-2xl text-zinc-400 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                Your printer setup doesn’t have to be confusing. Start the interactive guide today.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <button className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-bold text-2xl hover:bg-blue-700 transition-all hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20">
                  Start Printer Setup Guide
                  <ArrowRight size={28} />
                </button>
                <button className="px-12 py-6 bg-white/10 text-white border-2 border-white/20 rounded-[2rem] font-bold text-2xl hover:bg-white/20 transition-all flex items-center justify-center gap-3">
                  <Mail size={28} />
                  Ask an Expert
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
