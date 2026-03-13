"use client";

import { motion } from "framer-motion";
import TechBridgeLearnLayout from "@/components/TechBridgeLearnLayout";
import {
  Mic,
  CheckCircle2,
  ArrowRight,
  Mail,
  Zap,
  Search,
  RefreshCcw,
  Volume2,
  HelpCircle,
  Music
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import TechBridgeApp, { Step } from "@/components/TechBridgeApp";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import { useState, useEffect } from "react";

const alexaBackgrounds = [
  { url: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const }, // Person talking to smart speaker
  { url: "https://images.unsplash.com/photo-1543512214-318c7553f230?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'light' as const }, // Light home
  { url: "https://images.unsplash.com/photo-1589492477829-5e65395b66cc?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const }   // Darker smart dashboard
];

const AlexaVisuals = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const scenes = [
    { title: "Device Setup", icon: <Mic />, color: "text-blue-500" },
    { title: "Voice Commands", icon: <Volume2 />, color: "text-indigo-500" },
    { title: "Music Streaming", icon: <Music />, color: "text-green-500" },
    { title: "Smart Routines", icon: <Zap />, color: "text-yellow-500" }
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
              <motion.circle 
                cx="200" cy="200" r="80" fill="none" stroke="currentColor" strokeWidth="4"
                animate={{ strokeDasharray: ["0 500", "500 500", "0 500"], rotate: 360 }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
              />
              <Mic className="text-blue-500" size={48} />
            </svg>
          )}
          {currentScene === 1 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-indigo-500/40">
              <motion.path 
                d="M250 150 Q300 200 250 250 M270 120 Q350 200 270 280" 
                fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                animate={{ opacity: [0, 1, 0], x: [0, 10, 0] }} transition={{ duration: 2, repeat: Infinity }}
              />
              <Volume2 className="text-indigo-500" size={64} />
            </svg>
          )}
          {currentScene === 2 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-green-500/40">
              <motion.path 
                d="M150 250 Q200 200 250 250" 
                fill="none" stroke="currentColor" strokeWidth="4"
                animate={{ scale: [1, 1.2, 1], rotate: [0, 10, -10, 0] }} transition={{ duration: 3, repeat: Infinity }}
              />
              <Music className="text-green-500" size={48} />
            </svg>
          )}
          {currentScene === 3 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-yellow-500/40">
              <motion.path 
                d="M200 100 L150 250 L250 250 L200 400" 
                fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }}
              />
              <Zap className="text-yellow-500" size={48} />
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

export default function AlexaPage() {
  const [email, setEmail] = useState("");
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');

  const alexaSteps: Step[] = [
    {
      id: "start",
      question: "How can we help with Alexa today?",
      options: [
        { label: "Set up New Alexa", nextStepId: "setup" },
        { label: "Music & Speaker Help", nextStepId: "music" },
        { label: "Voice Command Help", nextStepId: "commands" },
        { label: "Other Alexa Issues", nextStepId: "other" }
      ]
    },
    {
      id: "setup",
      question: "Setting up Your New Alexa",
      options: [
        { 
          label: "Finish Setup", 
          isFinal: true, 
          instructions: [
            "Plug in your Echo device to a wall outlet.",
            "Wait for the light ring to turn orange (Setup Mode).",
            "Download and open the 'Amazon Alexa' app on your phone.",
            "Tap 'More' > 'Add a Device' > 'Amazon Echo'.",
            "Follow the prompts to connect to your home Wi-Fi.",
            "Alexa will say 'Hello!' when she's ready to help."
          ] 
        }
      ]
    },
    {
      id: "music",
      question: "Connecting Music to Alexa",
      options: [
        { 
          label: "Link Music Service", 
          isFinal: true, 
          instructions: [
            "Open the Alexa app and tap 'More' > 'Settings'.",
            "Select 'Music & Podcasts'.",
            "Tap 'Link New Service' (e.g. Pandora, iHeartRadio, or Spotify).",
            "Log in with your account for that service.",
            "Ask Alexa: 'Alexa, play [Artist Name] on [Service Name].'"
          ] 
        }
      ]
    },
    {
      id: "commands",
      question: "Helpful Voice Commands",
      options: [
        { 
          label: "Try Commands", 
          isFinal: true, 
          instructions: [
            "Ask for the weather: 'Alexa, what's the weather today?'",
            "Set a timer: 'Alexa, set a 10-minute timer for cookies.'",
            "Get news: 'Alexa, what's my flash briefing?'",
            "Ask for help: 'Alexa, what can you do?'",
            "Control volume: 'Alexa, volume 5' or 'Alexa, stop.'"
          ] 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      {/* Hero Section - Full Cover */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
        <HeaderBackgroundSlider items={alexaBackgrounds} onThemeChange={setCurrentTheme} />
        
        {/* Advanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [-50, 50, -50],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
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
                <Mic size={14} />
                <span>Voice Assistant Support</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white">
                Talk to Your <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent italic">Tech.</span>
              </h1>
              <p className="text-xl md:text-3xl mb-14 leading-relaxed font-medium text-zinc-200">
                From initial setup to advanced voice routines, we help you master Alexa and other voice assistants for a more convenient home.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
                {[
                  "Echo & smart speaker setup",
                  "Voice command training",
                  "Music & streaming help",
                  "Smart routine automation"
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
                  Start Alexa Guide
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/contact" className="font-black hover:text-blue-400 transition-all flex items-center gap-3 group text-white">
                  <div className="w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all bg-white/10 group-hover:bg-white/20">
                    <Mail size={24} />
                  </div>
                  Ask an Alexa Expert
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
                <AlexaVisuals />
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
                    <Volume2 size={32} />
                  </div>
                  <div>
                    <div className="font-black text-2xl text-zinc-900 tracking-tight">Crystal Clear</div>
                    <div className="text-zinc-500 font-bold text-sm uppercase tracking-widest">Voice Optimized</div>
                  </div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </header>

      <TechBridgeLearnLayout config={{
        topic: "Alexa",
        pdfTitle: "Alexa Complete Setup & Commands Guide",
        pdfDescription: "Unlock everything your Amazon Echo and Alexa can do — from playing music to managing your calendar, controlling smart devices, and beyond.",
        pdfHighlights: [
          "Complete first-time Echo setup walkthrough",
          "50+ most useful Alexa voice commands",
          "Setting up music, news, and flash briefings",
          "Alexa routines for morning, evening, and more",
          "Connecting Alexa to your smart home devices",
          "Alexa privacy settings and managing your history",
        ],
        brandExamples: ["Amazon Echo", "Echo Dot", "Echo Show", "Echo Plus", "Echo Pop", "Fire TV"],
        starterQuestions: [
          "How do I set up my new Echo device?",
          "Alexa isn't understanding my commands",
          "How do I play music on Alexa?",
          "How do I set a reminder on Alexa?",
          "Can Alexa call my family members?",
          "How do I reset my Echo device?",
        ],
        emailjsServiceId: "service_dtucjcw",
        emailjsPdfTemplateId: "template_uls5p3p",
        emailjsContactTemplateId: "template_uls5p3p",
        emailjsPublicKey: "XRCYl5c7gwzK67hbD",
        discordBotToken: "MTQ4MjE0MjI3MzQ3NDAwMzA2Ng.GtM-3y.eQUosynKep7fnM26pjbtM3npCFn2evOvHjUJuk",
        discordChannelId: "1482143893708345428",
      }} />

            <Footer />
    </div>
  );
}
