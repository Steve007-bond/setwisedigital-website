"use client";

import { motion } from "framer-motion";
import TechBridgeLearnLayout from "@/components/TechBridgeLearnLayout";
import {
  Navigation,
  Map as MapIcon,
  CheckCircle2,
  ArrowRight,
  Mail,
  Zap,
  Satellite,
  Search,
  RefreshCcw,
  Smartphone,
  HelpCircle
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import TechBridgeApp, { Step } from "@/components/TechBridgeApp";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import { useState, useEffect } from "react";

const gpsBackgrounds = [
  { url: "https://assets.mixkit.co/videos/preview/mixkit-man-driving-a-car-on-a-sunny-day-41044-large.mp4", type: 'video' as const, theme: 'dark' as const }, // Driving video
  { url: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'light' as const }, // Senior on vacation
  { url: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const }   // Road trip planning
];

const GpsVisuals = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const scenes = [
    { title: "Map Updates", icon: <RefreshCcw />, color: "text-blue-500" },
    { title: "Satellite Signal", icon: <Satellite />, color: "text-indigo-500" },
    { title: "Route Planning", icon: <Navigation />, color: "text-green-500" },
    { title: "Power Check", icon: <Zap />, color: "text-yellow-500" }
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
              <rect x="100" y="100" width="200" height="200" rx="20" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <motion.path 
                d="M150 150 L250 150 L250 250 L150 250 Z" 
                fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="4 4"
                animate={{ strokeDashoffset: [0, 20] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
              <RefreshCcw className="text-blue-500" size={48} />
            </svg>
          )}
          {currentScene === 1 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-indigo-500/40">
              <motion.circle 
                cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="2"
                animate={{ scale: [1, 1.5], opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity }}
              />
              <Satellite className="text-indigo-500" size={64} />
            </svg>
          )}
          {currentScene === 2 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-green-500/40">
              <motion.path 
                d="M100 300 Q200 100 300 300" 
                fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 3, repeat: Infinity }}
              />
              <Navigation className="text-green-500" size={48} />
            </svg>
          )}
          {currentScene === 3 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-yellow-500/40">
              <rect x="150" y="100" width="100" height="200" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <motion.rect 
                x="160" y="110" width="80" height="180" rx="5" fill="#eab308"
                animate={{ height: [0, 180, 0] }} transition={{ duration: 5, repeat: Infinity }}
              />
              <Zap className="text-yellow-500 absolute" size={32} />
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

export default function GpsPage() {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const [email, setEmail] = useState("");

  const gpsSteps: Step[] = [
    {
      id: "start",
      question: "How can we help with your GPS today?",
      options: [
        { label: "Update Maps", nextStepId: "brand" },
        { label: "Fix Connection Issues", nextStepId: "satellite" },
        { label: "Software/Firmware Update", nextStepId: "software" },
        { label: "Device Not Turning On", nextStepId: "power" }
      ]
    },
    {
      id: "brand",
      question: "Which brand do you use?",
      options: [
        { label: "Garmin", nextStepId: "garmin-map" },
        { label: "TomTom", nextStepId: "tomtom-map" },
        { label: "In-Car System (Built-in)", nextStepId: "car-map" },
        { label: "Other / Handheld", nextStepId: "other-map" }
      ]
    },
    {
      id: "garmin-map",
      question: "Updating Garmin Maps",
      options: [
        { 
          label: "Finish Update", 
          isFinal: true, 
          instructions: [
            "Download 'Garmin Express' on your computer.",
            "Connect your GPS device to the computer using a USB cable.",
            "Open Garmin Express and click 'Add a Device'.",
            "Select 'Install All' to begin the map and software updates.",
            "Keep the device plugged in until the computer says 'Updates Complete'."
          ] 
        }
      ]
    },
    {
      id: "satellite",
      question: "Troubleshooting Satellite Signal",
      options: [
        { 
          label: "Fix Signal", 
          isFinal: true, 
          instructions: [
            "Ensure you are outside with a clear view of the sky.",
            "Check for any metallic objects or tinted windows blocking the signal.",
            "Perform a 'Soft Reset' by holding the power button for 15 seconds.",
            "Go to 'Settings' > 'System' > 'Satellite' to view current signal strength.",
            "Update your 'GPS Chipset' software using your brand's update tool."
          ] 
        }
      ]
    },
    {
      id: "software",
      question: "Updating Device Software",
      options: [
        { 
          label: "Update Software", 
          isFinal: true, 
          instructions: [
            "Check your battery level; it should be at least 50% or plugged in.",
            "Connect the device to your Wi-Fi (if supported) or your computer.",
            "Look for 'System Updates' in the device settings menu.",
            "Follow the on-screen prompts to download and install.",
            "Do NOT turn off the device during the installation process."
          ] 
        }
      ]
    },
    {
      id: "power",
      question: "Power & Charging Issues",
      options: [
        { 
          label: "Restore Power", 
          isFinal: true, 
          instructions: [
            "Try a different USB cable and a different power source (wall outlet vs. car).",
            "Check for debris or dust in the charging port.",
            "Hold the power button for a full 30 seconds to force a restart.",
            "If the screen is frozen, plug it into a computer to see if it's recognized.",
            "Check if the fuse in your car's 12V adapter has blown."
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
        <HeaderBackgroundSlider items={gpsBackgrounds} onThemeChange={setCurrentTheme} />
        
        {/* Advanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.1, 1],
              rotate: [0, 5, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
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
                <Navigation size={14} />
                <span>GPS & Navigation Mastery</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
                Stay on Course. <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">Updated.</span>
              </h1>
              <p className="text-xl md:text-3xl mb-14 leading-relaxed font-medium text-zinc-200">
                Never get lost with outdated maps again. Use our interactive GPS tool to update your device and master navigation basics.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
                {[
                  "Easy map update guides",
                  "Satellite connection fixes",
                  "Trip planning assistance",
                  "Clear, patient instructions"
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
                  Start GPS Guide
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/contact" className="font-black hover:text-blue-400 transition-all flex items-center gap-3 group text-white">
                  <div className="w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all bg-white/10 group-hover:bg-white/20">
                    <Mail size={24} />
                  </div>
                  Ask a GPS Expert
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
                <GpsVisuals />
              </div>

              {/* Status Badge */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.8 }}
                className="absolute -bottom-8 -left-8 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-zinc-100"
              >
                <div className="flex items-center gap-5">
                  <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <Satellite size={32} />
                  </div>
                  <div>
                    <div className="font-black text-2xl text-zinc-900 tracking-tight">Signal Fixed</div>
                    <div className="text-zinc-500 font-bold text-sm uppercase tracking-widest">GPS Precision</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      <TechBridgeLearnLayout config={{
        topic: "GPS",
        pdfTitle: "GPS Map Update & Navigation Mastery Guide",
        pdfDescription: "Keep your GPS maps current and learn hidden features that make every trip smoother. Covers Garmin, TomTom, in-car systems, and more.",
        pdfHighlights: [
          "How to update maps on Garmin, TomTom & in-car GPS systems",
          "Step-by-step guide to installing map updates safely",
          "Using voice navigation and shortcuts effectively",
          "Syncing your GPS with your smartphone",
          "Planning multi-stop routes like a pro",
          "What to do when GPS signal is lost",
        ],
        brandExamples: ["Garmin", "TomTom", "Magellan", "Rand McNally", "Google Maps", "Waze"],
        starterQuestions: [
          "How do I update my Garmin maps?",
          "My GPS has no signal — what do I do?",
          "How do I add a stop to my route?",
          "GPS is showing wrong directions",
          "How do I connect GPS to my phone?",
          "My in-car GPS is outdated",
        ],

      }} />

            <Footer />
    </div>
  );
}
