"use client";

import { motion } from "framer-motion";
import {
  Printer,
  Wifi,
  CheckCircle2,
  ArrowRight,
  Mail,
  MessageSquare,
  Package,
  Zap,
  AlertCircle,
  RefreshCcw,
  Users,
  HelpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import TechBridgeApp, { Step } from "@/components/TechBridgeApp";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import { useState, useEffect } from "react";
import TechBridgeLearnLayout from "@/components/TechBridgeLearnLayout";

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
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
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
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl border bg-black/30 border-white/20 text-blue-400">
                <Printer size={14} />
                <span>Printer & Scanner Support</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
                Print Without <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent italic">Pressure.</span>
              </h1>
              <p className="text-xl md:text-3xl mb-14 leading-relaxed font-medium text-zinc-200">
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
                    className="flex items-center gap-4 p-5 rounded-3xl backdrop-blur-sm border shadow-xl hover:shadow-2xl transition-all group bg-white/10 border-white/10 text-zinc-200"
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
                <Link href="/contact" className="font-black hover:text-blue-400 transition-all flex items-center gap-3 group text-white">
                  <div className="w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all bg-white/10 group-hover:bg-white/20">
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

      <TechBridgeLearnLayout config={{
        topic: "Printer",
        pdfTitle: "Complete Printer Setup & Troubleshooting Guide",
        pdfDescription: "Everything you need to set up, fix, and maintain your printer — in plain English. Covers HP, Canon, Epson, Brother, and more.",
        pdfHighlights: [
          "Step-by-step Wi-Fi & wireless setup for all major brands",
          "How to fix paper jams without damaging your printer",
          "Ink & toner replacement guide with money-saving tips",
          "Scanner setup and driver installation walkthrough",
          "Common error codes explained in plain English",
          "Printing from iPhone, Android, Mac & Windows",
        ],
        brandExamples: ["HP", "Canon", "Epson", "Brother", "Lexmark", "Xerox"],
        starterQuestions: [
          "My printer won\'t connect to Wi-Fi",
          "How do I fix a paper jam?",
          "Printer says offline but it\'s on",
          "How do I replace ink cartridges?",
          "My prints are blurry or streaky",
          "How do I scan a document?",
        ],

      }} />

            <Footer />
    </div>
  );
}
