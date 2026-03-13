"use client";

import { motion } from "framer-motion";
import {
  Camera,
  RefreshCcw,
  CheckCircle2,
  ArrowRight,
  Mail,
  ShieldCheck,
  HelpCircle,
  Image as ImageIcon,
  Settings
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import TechBridgeApp, { Step } from "@/components/TechBridgeApp";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import { useState, useEffect } from "react";

const cameraBackgrounds = [
  { url: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const },
  { url: "https://images.unsplash.com/photo-1452784444945-3f422708fe5e?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'light' as const },
  { url: "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'light' as const },
];

const CameraVisuals = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const scenes = [
    { title: "Firmware Update", icon: <RefreshCcw />, color: "text-blue-500" },
    { title: "Optimizing Settings", icon: <Settings />, color: "text-indigo-500" },
    { title: "Photo Transfer", icon: <ArrowRight />, color: "text-green-500" },
    { title: "Troubleshooting", icon: <HelpCircle />, color: "text-red-500" }
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
              <rect x="100" y="120" width="200" height="160" rx="20" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <motion.path 
                d="M150 200 H250" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 2, repeat: Infinity }}
              />
              <RefreshCcw className="text-blue-500" size={48} />
            </svg>
          )}
          {currentScene === 1 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-indigo-500/40">
              <circle cx="200" cy="200" r="60" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <motion.path 
                d="M200 140 V260 M140 200 H260" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4"
                animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
              />
              <Settings className="text-indigo-500" size={48} />
            </svg>
          )}
          {currentScene === 2 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-green-500/40">
              <motion.path 
                d="M100 200 H300" stroke="currentColor" strokeWidth="4" strokeDasharray="10 10"
                animate={{ strokeDashoffset: [0, -20] }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
              />
              <ArrowRight className="text-green-500" size={48} />
            </svg>
          )}
          {currentScene === 3 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-red-500/40">
              <motion.path 
                d="M200 150 V250 M200 300 H200.01" stroke="currentColor" strokeWidth="8" strokeLinecap="round"
                animate={{ opacity: [0.3, 1, 0.3] }} transition={{ duration: 1, repeat: Infinity }}
              />
              <HelpCircle className="text-red-500" size={48} />
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

export default function CameraPage() {
  const [email, setEmail] = useState("");

  const cameraSteps: Step[] = [
    {
      id: "start",
      question: "How can we help with your camera today?",
      options: [
        { label: "Update Firmware", nextStepId: "firmware" },
        { label: "Adjust Settings", nextStepId: "settings" },
        { label: "Transfer Photos", nextStepId: "transfer" },
        { label: "Fix Camera Issues", nextStepId: "trouble" }
      ]
    },
    {
      id: "firmware",
      question: "Updating Camera Firmware",
      options: [
        { 
          label: "Finish Update", 
          isFinal: true, 
          instructions: [
            "Check your camera's current firmware version in the 'Setup' menu.",
            "Go to the manufacturer's website (e.g. Sony, Canon, Nikon).",
            "Download the latest firmware file to your computer.",
            "Format your SD card and copy the firmware file onto it.",
            "Insert the card into your camera and select 'Firmware Update' in the menu.",
            "Do NOT turn off the camera until the process is complete."
          ] 
        }
      ]
    },
    {
      id: "settings",
      question: "Optimizing Camera Settings",
      options: [
        { 
          label: "Best Settings", 
          isFinal: true, 
          instructions: [
            "Set your Image Quality to 'Fine' or 'RAW' for the best detail.",
            "Use 'Auto ISO' to help the camera adjust to different lighting.",
            "Turn on 'Image Stabilization' to prevent blurry photos.",
            "Set the focus mode to 'AF-S' (Single) for stationary subjects.",
            "Enable 'Grid Lines' on your screen to help with straight horizons."
          ] 
        }
      ]
    },
    {
      id: "transfer",
      question: "Transferring Your Photos",
      options: [
        { 
          label: "Transfer Help", 
          isFinal: true, 
          instructions: [
            "Connect your camera to your computer using a USB cable.",
            "Or, insert your SD card into a card reader on your computer.",
            "Open your 'Photos' app or file explorer.",
            "Select the images you want to keep and click 'Import'.",
            "Safely eject the camera or card before unplugging."
          ] 
        }
      ]
    },
    {
      id: "trouble",
      question: "Camera Troubleshooting",
      options: [
        { 
          label: "Fix Issues", 
          isFinal: true, 
          instructions: [
            "If the camera won't turn on, ensure the battery is fully charged.",
            "Try a different SD card if you see a 'Card Error' message.",
            "Clean the lens gently with a microfiber cloth for clearer shots.",
            "Reset the camera to factory settings if menus are acting strangely.",
            "Ensure the lens is properly attached and 'clicked' into place."
          ] 
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-44 pb-32 overflow-hidden">
        <HeaderBackgroundSlider items={cameraBackgrounds} />
        
        {/* Advanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              x: [-50, 50, -50],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 right-0 w-1/3 h-full bg-blue-100/30 rounded-l-[100px] blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              x: [50, -50, 50],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 left-0 w-1/4 h-1/2 bg-indigo-100/20 rounded-r-full blur-3xl" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-3/5"
            >
              <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-blue-100/50 text-blue-700 text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl">
                <Camera size={14} className="text-blue-600" />
                <span>Camera & Firmware Guidance</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-zinc-900">
                Capture the Moment. <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">Clearly.</span>
              </h1>
              <p className="text-xl md:text-3xl text-zinc-600 mb-14 leading-relaxed font-medium">
                Don't let technical settings get in the way of your memories. We help you update your camera, optimize settings, and master the basics of photography.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
                {[
                  "Firmware update assistance",
                  "Menu walkthroughs",
                  "Better photo settings",
                  "SD card & backup help"
                ].map((bullet, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
                    className="flex items-center gap-4 p-5 rounded-3xl bg-white/80 backdrop-blur-sm border border-white shadow-xl hover:shadow-2xl transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      <CheckCircle2 size={20} />
                    </div>
                    <span className="font-black text-zinc-700">{bullet}</span>
                  </motion.div>
                ))}
              </div>

              <div className="flex flex-col sm:flex-row items-center gap-6">
                <Link href="#app" className="shine-effect w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group">
                  Start Camera Guide
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/contact" className="text-zinc-500 font-black hover:text-blue-600 transition-all flex items-center gap-3 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-50 shadow-lg transition-all">
                    <Mail size={24} />
                  </div>
                  Ask a Camera Expert
                </Link>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8 }}
              className="lg:w-2/5 relative"
            >
              <div className="bg-zinc-900 aspect-square rounded-[4rem] flex items-center justify-center relative overflow-hidden shadow-2xl group">
                <CameraVisuals />
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
                  <div className="w-16 h-16 rounded-2xl bg-blue-500 flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                    <Camera size={32} />
                  </div>
                  <div>
                    <div className="font-black text-2xl text-zinc-900 tracking-tight">Lens Ready</div>
                    <div className="text-zinc-500 font-bold text-sm uppercase tracking-widest">Sharp & Clear</div>
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
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">Camera Assistant</h2>
            <p className="text-xl text-zinc-400 font-medium">Click through our simple guide to master your camera settings.</p>
          </div>
          
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-white/10">
            <TechBridgeApp 
              title="Camera Assistant" 
              steps={cameraSteps} 
            />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-block px-4 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold mb-6 uppercase tracking-wider">The Roadmap</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">Photography Journey</h2>
            <p className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed">
              We guide you through the process of mastering your camera so you can capture every moment with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Firmware", desc: "Keep your camera's internal software updated for better performance.", icon: <RefreshCcw /> },
              { title: "Settings", desc: "Learn the best settings for portraits, landscapes, and movement.", icon: <Settings /> },
              { title: "Storage", desc: "Understand SD card speeds and how to back up your photos safely.", icon: <ShieldCheck /> },
              { title: "Editing", desc: "Simple tips for organizing and lightly editing your favorite shots.", icon: <ImageIcon /> }
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

      {/* FAQ */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-4xl font-extrabold text-center mb-16">Camera FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Why do I need to update my camera firmware?", a: "Firmware updates can fix bugs, improve autofocus speed, and even add new features to your camera for free." },
              { q: "What SD card should I buy?", a: "Look for cards labeled 'Class 10' or 'V30' for reliable performance. Brands like SanDisk and Samsung are usually the most trusted." },
              { q: "How do I stop my photos from being blurry?", a: "Blur is often caused by a slow shutter speed. Try using a tripod or increasing your ISO setting in low light." },
              { q: "Can you help me with my specific camera model?", a: "Yes! Our guides cover all major brands like Sony, Canon, Nikon, and Fujifilm. If you have a specific question, just ask." }
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
