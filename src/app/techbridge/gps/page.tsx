"use client";

import { motion } from "framer-motion";
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
      <header className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
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
              <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl border ${currentTheme === 'dark' ? 'bg-black/20 border-white/20 text-blue-400' : 'bg-white/50 border-white/50 text-blue-700'}`}>
                <Navigation size={14} />
                <span>GPS & Navigation Mastery</span>
              </div>
              <h1 className={`text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Stay on Course. <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">Updated.</span>
              </h1>
              <p className={`text-xl md:text-3xl mb-14 leading-relaxed font-medium ${currentTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
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
                  Start GPS Guide
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/contact" className={`font-black hover:text-blue-600 transition-all flex items-center gap-3 group ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-500'}`}>
                  <div className={`w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all ${currentTheme === 'dark' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white/80 group-hover:bg-blue-50'}`}>
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

      {/* App Section */}
      <section id="app" className="py-32 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 rounded-lg dark-glass border-white/10 text-blue-400 text-sm font-bold mb-6 uppercase tracking-wider">Interactive Tool</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">GPS Update Assistant</h2>
            <p className="text-xl text-zinc-400 font-medium">Follow our simple steps to update your maps and fix connection issues.</p>
          </div>
          
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-white/10">
            <TechBridgeApp 
              title="GPS Assistant" 
              steps={gpsSteps} 
            />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-block px-4 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold mb-6 uppercase tracking-wider">The Journey</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">Navigation Learning Path</h2>
            <p className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed">
              We break down GPS technology into four simple stages, ensuring you're ready for any journey.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Brand Check", desc: "Select your device brand for specialized instructions.", icon: <Search /> },
              { title: "Update Hub", desc: "Connect to a computer and install the latest maps.", icon: <RefreshCcw /> },
              { title: "Trip Basics", desc: "Learn to set home locations and save favorite routes.", icon: <Navigation /> },
              { title: "Syncing", desc: "Connect your GPS to your phone for live traffic updates.", icon: <Smartphone /> }
            ].map((step, i) => (
              <div key={i} className="p-8 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 relative group">
                <div className="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-6 shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                  {step.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{step.title}</h3>
                <p className="text-zinc-500 font-medium leading-relaxed">{step.desc}</p>
                <div className="absolute top-8 right-8 text-4xl font-black text-zinc-200 opacity-50 group-hover:text-blue-100 transition-colors">
                  0{i + 1}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Lead Capture Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-zinc-900 p-12 md:p-16 rounded-[4rem] text-white text-center">
            <h2 className="text-4xl font-extrabold mb-6 text-white">Get the "Ultimate GPS Guide"</h2>
            <p className="text-xl text-zinc-400 mb-12 font-medium">Download our free PDF guide to updating maps and fixing signal issues. No jargon, just results.</p>
            
            <form className="flex flex-col md:flex-row gap-4 max-w-2xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="flex-grow px-8 py-5 bg-white/5 border border-white/10 rounded-2xl focus:outline-none focus:border-blue-500 transition-colors font-bold text-white" 
              />
              <button className="px-10 py-5 bg-blue-600 text-white rounded-2xl font-bold text-xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20 whitespace-nowrap">
                Download PDF
              </button>
            </form>
            <p className="mt-6 text-zinc-500 font-bold text-sm uppercase tracking-widest">We'll send the guide instantly to your inbox.</p>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16">GPS Questions Answered</h2>
          <div className="space-y-6">
            {[
              { q: "How often should I update my maps?", a: "Most manufacturers release major updates every 3-6 months. We recommend checking twice a year to ensure new roads and speed limits are included." },
              { q: "Is Garmin Express free to use?", a: "Yes, the software itself is free. Map updates may be free if your device came with 'Lifetime Maps' (LM), otherwise a small fee might apply from Garmin." },
              { q: "My GPS screen is frozen, what do I do?", a: "Hold the power button down for a full 15-20 seconds. This performs a 'soft reset' which usually fixes frozen screens without losing data." },
              { q: "Can I use my phone as a backup GPS?", a: "Absolutely. We can teach you how to use Google Maps or Apple Maps as a reliable backup when your dedicated GPS is updating." }
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

      <Footer />
    </div>
  );
}
