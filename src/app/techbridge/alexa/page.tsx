"use client";

import { motion } from "framer-motion";
import { 
  Mic, 
  Wifi, 
  CheckCircle2, 
  ArrowRight, 
  FileText, 
  Mail, 
  MessageSquare, 
  Zap, 
  Globe,
  Smartphone,
  ShieldCheck,
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
      <header className={`relative min-h-screen flex items-center justify-center overflow-hidden transition-colors duration-1000 ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
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
              <div className={`inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl border ${currentTheme === 'dark' ? 'bg-black/20 border-white/20 text-blue-400' : 'bg-white/50 border-white/50 text-blue-700'}`}>
                <Mic size={14} />
                <span>Voice Assistant Support</span>
              </div>
              <h1 className={`text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-900'}`}>
                Talk to Your <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent italic">Tech.</span>
              </h1>
              <p className={`text-xl md:text-3xl mb-14 leading-relaxed font-medium ${currentTheme === 'dark' ? 'text-zinc-300' : 'text-zinc-600'}`}>
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
                  Start Alexa Guide
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/contact" className={`font-black hover:text-blue-600 transition-all flex items-center gap-3 group ${currentTheme === 'dark' ? 'text-white' : 'text-zinc-500'}`}>
                  <div className={`w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all ${currentTheme === 'dark' ? 'bg-white/10 group-hover:bg-white/20' : 'bg-white/80 group-hover:bg-blue-50'}`}>
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

      {/* App Section */}
      <section id="app" className="py-32 bg-zinc-900 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('/grid.svg')]" />
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <div className="inline-block px-4 py-1 rounded-lg dark-glass border-white/10 text-blue-400 text-sm font-bold mb-6 uppercase tracking-wider">Interactive Tool</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">Alexa Setup Assistant</h2>
            <p className="text-xl text-zinc-400 font-medium">Click through our simple guide to master your voice assistant.</p>
          </div>
          
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-white/10">
            <TechBridgeApp 
              title="Alexa Assistant" 
              steps={alexaSteps} 
            />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-block px-4 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold mb-6 uppercase tracking-wider">The Roadmap</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">Voice Mastery Roadmap</h2>
            <p className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed">
              We guide you through the process of setting up and mastering Alexa so it becomes your personal assistant.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Device Setup", desc: "Connect your Echo to power and your phone app.", icon: <Search /> },
              { title: "Account Linking", desc: "Link your Amazon, Music, and News accounts.", icon: <RefreshCcw /> },
              { title: "Voice Training", desc: "Teach Alexa to recognize your specific voice.", icon: <Volume2 /> },
              { title: "Master Commands", desc: "Learn the most useful commands for your life.", icon: <Mic /> }
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
            <h2 className="text-4xl font-extrabold mb-6 text-white">The "Ultimate Alexa Commands" Guide</h2>
            <p className="text-xl text-zinc-400 mb-12 font-medium">Download our free PDF guide to the most useful Alexa commands for seniors and families. No jargon included.</p>
            
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
          <h2 className="text-4xl font-extrabold text-center mb-16">Alexa FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Is Alexa always listening to me?", a: "Alexa only listens for the 'wake word' (like Alexa). It does not record your conversations otherwise. You can also press the mute button to disable the microphone at any time." },
              { q: "Can Alexa help me in an emergency?", a: "Yes, you can set up 'Alexa Emergency Assist' to call for help using your voice. You can also add emergency contacts for Alexa to notify." },
              { q: "Do I need an Amazon Prime account?", a: "No, you only need a free Amazon account to use Alexa. However, Prime members get access to more music and features." },
              { q: "Can I use Alexa to call my family?", a: "Absolutely. Once you link your contacts, you can say 'Alexa, call my daughter' to start a hands-free call." }
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
