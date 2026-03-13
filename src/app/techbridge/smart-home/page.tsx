"use client";

import { motion } from "framer-motion";
import {
  Home as HomeIcon,
  Wifi,
  CheckCircle2,
  ArrowRight,
  Mail,
  Zap,
  Smartphone,
  Search,
  RefreshCcw,
  HelpCircle,
  Lock
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import TechBridgeApp, { Step } from "@/components/TechBridgeApp";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import { useState, useEffect } from "react";

const smartHomeBackgrounds = [
  { url: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const }, // Dark modern home
  { url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'light' as const }, // Light living room
  { url: "https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const }   // Darker thermostat/tech
];

const SmartHomeVisuals = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const scenes = [
    { title: "Hub Connection", icon: <HomeIcon />, color: "text-blue-500" },
    { title: "Wi-Fi Pairing", icon: <Wifi />, color: "text-indigo-500" },
    { title: "Voice Controls", icon: <Smartphone />, color: "text-green-500" },
    { title: "Home Security", icon: <Lock />, color: "text-red-500" }
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
              <motion.path 
                d="M100 250 L200 150 L300 250 V320 H100 Z" 
                fill="none" stroke="currentColor" strokeWidth="2"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }}
              />
              <HomeIcon className="text-blue-500" size={48} />
            </svg>
          )}
          {currentScene === 1 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-indigo-500/40">
              <motion.path 
                d="M150 250 Q200 150 250 250" 
                fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                animate={{ opacity: [0.3, 1, 0.3], scale: [1, 1.1, 1] }} transition={{ duration: 2, repeat: Infinity }}
              />
              <Wifi className="text-indigo-500" size={64} />
            </svg>
          )}
          {currentScene === 2 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-green-500/40">
              <rect x="150" y="100" width="100" height="200" rx="20" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <motion.circle 
                cx="200" cy="260" r="20" fill="none" stroke="currentColor" strokeWidth="2"
                animate={{ scale: [1, 1.5], opacity: [1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}
              />
              <Smartphone className="text-green-500" size={48} />
            </svg>
          )}
          {currentScene === 3 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-red-500/40">
              <motion.path 
                d="M120 150 V100 H280 V150" fill="none" stroke="currentColor" strokeWidth="4"
                animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}
              />
              <rect x="100" y="150" width="200" height="150" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <Lock className="text-red-500" size={48} />
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

export default function SmartHomePage() {
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const [email, setEmail] = useState("");

  const smartHomeSteps: Step[] = [
    {
      id: "start",
      question: "What smart device are we working with?",
      options: [
        { label: "Smart Hub (Alexa/Google)", nextStepId: "hub" },
        { label: "Smart Lighting/Plugs", nextStepId: "light" },
        { label: "Security Camera", nextStepId: "security" },
        { label: "Wi-Fi/Connection Issue", nextStepId: "wifi" }
      ]
    },
    {
      id: "hub",
      question: "Connecting to a Voice Hub",
      options: [
        { 
          label: "Link to Hub", 
          isFinal: true, 
          instructions: [
            "Open your Alexa or Google Home app.",
            "Go to 'Devices' and select 'Add Device'.",
            "Search for the brand of the smart device you just set up.",
            "Log in to your smart device account when prompted.",
            "Authorize the connection between the apps.",
            "Your hub will now say 'I've found a new device!'"
          ] 
        }
      ]
    },
    {
      id: "security",
      question: "Smart Security Setup",
      options: [
        { 
          label: "Camera Setup", 
          isFinal: true, 
          instructions: [
            "Charge your camera fully or plug it into a power source.",
            "Place it within range of your Wi-Fi router.",
            "Download the camera's app (e.g. Ring, Arlo, or Nest).",
            "Scan the QR code on the back of the camera when prompted.",
            "Follow the instructions to name the camera and set up motion zones.",
            "Check the live feed on your phone to ensure a clear view."
          ] 
        }
      ]
    },
    {
      id: "wifi",
      question: "Wi-Fi Troubleshooting",
      options: [
        { 
          label: "Restore Connection", 
          isFinal: true, 
          instructions: [
            "Move the device closer to your Wi-Fi router.",
            "Unplug the device, wait 10 seconds, and plug it back in.",
            "Ensure your phone is on the same 2.4GHz Wi-Fi network.",
            "Forget the Wi-Fi network in the device app and re-connect.",
            "Restart your router if multiple devices are failing to connect."
          ] 
        }
      ]
    },
    {
      id: "light",
      question: "Smart Lighting & Plugs",
      options: [
        { 
          label: "Pair Device", 
          isFinal: true, 
          instructions: [
            "Screw in the bulb or plug in the smart plug.",
            "Put the device in 'Pairing Mode' (usually by turning it on/off 3 times).",
            "Open the manufacturer's app and select 'Add Device'.",
            "Enter your Wi-Fi password when prompted.",
            "Test the device by turning it on/off within the app."
          ] 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      <header className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
        <HeaderBackgroundSlider items={smartHomeBackgrounds} onThemeChange={setCurrentTheme} />
        
        {/* Advanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              x: [-100, 100, -100],
              y: [-50, 50, -50],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
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
                <HomeIcon size={14} />
                <span>Smart Home Essentials</span>
              </div>
              <h1 className={`text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Control Your Home <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">With Confidence.</span>
              </h1>
              <p className={`text-xl md:text-3xl mb-14 leading-relaxed font-medium ${currentTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
                Make your home smarter and safer without the technical headache. We guide you through setup, pairing, and security in plain English.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
                {[
                  "Secure device setup",
                  "Simple app controls",
                  "Expert routine advice",
                  "Privacy first approach"
                ].map((bullet, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className={`flex items-center gap-4 p-5 rounded-3xl backdrop-blur-sm border shadow-xl hover:shadow-2xl transition-all group ${currentTheme === 'dark' ? 'bg-white/10 border-white/10 text-zinc-200' : 'bg-white/80 border-white text-zinc-700'}`}
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white transition-colors duration-300">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-black">{bullet}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="#app" className="shine-effect w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group border-0">
                  Start Smart Guide
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/contact" className={`font-black hover:text-blue-600 transition-all flex items-center gap-3 group ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-500'}`}>
                  <div className={`w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all ${currentTheme === 'dark' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white/80 group-hover:bg-blue-50'}`}>
                    <Mail size={24} />
                  </div>
                  Ask a Smart Expert
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/5 relative"
            >
              <div className="bg-zinc-900 aspect-square rounded-[4rem] flex items-center justify-center relative overflow-hidden shadow-2xl group border border-white/10">
                <SmartHomeVisuals />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent pointer-events-none" />
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
                    <Lock size={32} />
                  </div>
                  <div>
                    <div className="font-black text-2xl text-zinc-900 tracking-tight">Secure Home</div>
                    <div className="text-zinc-500 font-bold text-sm uppercase tracking-widest">Privacy Protected</div>
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
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">Smart Home Assistant</h2>
            <p className="text-xl text-zinc-400 font-medium">Choose your device below to start the simple setup process.</p>
          </div>
          
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-white/10">
            <TechBridgeApp 
              title="Smart Home Assistant" 
              steps={smartHomeSteps} 
            />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-block px-4 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold mb-6 uppercase tracking-wider">The Roadmap</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">Smart Home Journey</h2>
            <p className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed">
              We guide you from unboxing to full automation, ensuring your home works for you, not against you.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Device Unboxing", desc: "Identify your device and prepare for installation.", icon: <Search /> },
              { title: "App Connection", desc: "Download and pair with the official control apps.", icon: <Smartphone /> },
              { title: "Voice Linking", desc: "Connect your device to Alexa or Google Home.", icon: <Zap /> },
              { title: "Automation", desc: "Set up simple routines for daily convenience.", icon: <RefreshCcw /> }
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
            <h2 className="text-4xl font-extrabold mb-6 text-white">The "Secure Smart Home" Guide</h2>
            <p className="text-xl text-zinc-400 mb-12 font-medium">Download our free PDF guide to setting up your smart home safely and protecting your privacy. No jargon included.</p>
            
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
          <h2 className="text-4xl font-extrabold text-center mb-16">Smart Home FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Is smart home tech safe for my privacy?", a: "Yes, when set up correctly. We teach you how to use two-factor authentication and secure your Wi-Fi network to keep your home private." },
              { q: "Do I need a special hub for my lights?", a: "Many modern smart bulbs connect directly to Wi-Fi or Bluetooth, so you don't always need a separate hub like a Philips Hue Bridge." },
              { q: "Can I control my home from away?", a: "Absolutely. Once your devices are connected to Wi-Fi, you can control them from anywhere in the world using your smartphone app." },
              { q: "What's the easiest device to start with?", a: "We recommend starting with a Smart Plug. It's the simplest way to turn any 'dumb' lamp into a smart device in minutes." }
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
