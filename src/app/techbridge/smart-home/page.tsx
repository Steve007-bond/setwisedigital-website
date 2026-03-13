"use client";

import { motion } from "framer-motion";
import TechBridgeLearnLayout from "@/components/TechBridgeLearnLayout";
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
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
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
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl border bg-black/30 border-white/20 text-blue-400">
                <HomeIcon size={14} />
                <span>Smart Home Essentials</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
                Control Your Home <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">With Confidence.</span>
              </h1>
              <p className="text-xl md:text-3xl mb-14 leading-relaxed font-medium text-zinc-200">
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
                    className="flex items-center gap-4 p-5 rounded-3xl backdrop-blur-sm border shadow-xl hover:shadow-2xl transition-all group bg-white/10 border-white/10 text-zinc-200"
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
                <Link href="/contact" className="font-black hover:text-blue-400 transition-all flex items-center gap-3 group text-white">
                  <div className="w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all bg-white/10 group-hover:bg-white/20">
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

      <TechBridgeLearnLayout config={{
        topic: "Smart Home",
        pdfTitle: "Smart Home Setup & Voice Control Guide",
        pdfDescription: "Set up Alexa, Google Nest, and smart home devices with confidence. Plain English instructions for every step — no technical background needed.",
        pdfHighlights: [
          "Setting up Amazon Alexa from scratch",
          "Google Nest & Google Home setup guide",
          "Connecting smart bulbs, plugs, and thermostats",
          "Creating daily routines and automations",
          "Troubleshooting devices that won't respond",
          "Privacy and security settings explained simply",
        ],
        brandExamples: ["Amazon Alexa", "Google Nest", "Apple HomeKit", "Samsung SmartThings", "Ring", "Philips Hue"],
        starterQuestions: [
          "How do I set up Alexa for the first time?",
          "My smart device won't connect to Wi-Fi",
          "How do I create an Alexa routine?",
          "Google Home isn't responding to commands",
          "How do I control my smart bulbs by voice?",
          "What can Alexa do that I don't know about?",
        ],
        emailjsServiceId: "service_dtucjcw",
        emailjsPdfTemplateId: "template_uls5p3p",
        emailjsContactTemplateId: "template_uls5p3p",
        emailjsPublicKey: "XRCYl5c7gwzK67hbD",

      }} />

            <Footer />
    </div>
  );
}
