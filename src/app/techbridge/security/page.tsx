"use client";

import { motion } from "framer-motion";
import {
  Shield,
  Lock,
  CheckCircle2,
  ArrowRight,
  Mail,
  Globe,
  ShieldCheck,
  HelpCircle,
  Eye
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import TechBridgeApp, { Step } from "@/components/TechBridgeApp";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import { useState, useEffect } from "react";

const securityBackgrounds = [
  { url: "https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const },
  { url: "https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const },
  { url: "https://images.unsplash.com/photo-1510511459019-5dee997dd1db?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const },
];

const SecurityVisuals = () => {
  const [currentScene, setCurrentScene] = useState(0);
  const scenes = [
    { title: "2FA Protection", icon: <Lock />, color: "text-blue-500" },
    { title: "Antivirus Scan", icon: <ShieldCheck />, color: "text-green-500" },
    { title: "Phishing Alert", icon: <Eye />, color: "text-red-500" },
    { title: "Secure Backup", icon: <Globe />, color: "text-indigo-500" }
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
              <rect x="150" y="200" width="100" height="80" rx="10" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="2" />
              <motion.path 
                d="M170 200 V160 C170 140 180 130 200 130 C220 130 230 140 230 160 V200" 
                fill="none" stroke="currentColor" strokeWidth="4" strokeLinecap="round"
                animate={{ y: [0, -10, 0] }} transition={{ duration: 2, repeat: Infinity }}
              />
              <Lock className="text-blue-500" size={48} />
            </svg>
          )}
          {currentScene === 1 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-green-500/40">
              <motion.path 
                d="M100 200 L180 280 L300 120" 
                fill="none" stroke="currentColor" strokeWidth="6" strokeLinecap="round"
                initial={{ pathLength: 0 }} animate={{ pathLength: 1 }} transition={{ duration: 1.5, repeat: Infinity }}
              />
              <ShieldCheck className="text-green-500" size={64} />
            </svg>
          )}
          {currentScene === 2 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-red-500/40">
              <motion.path 
                d="M100 200 Q200 100 300 200 Q200 300 100 200 Z" 
                fill="none" stroke="currentColor" strokeWidth="2"
                animate={{ scale: [1, 1.1, 1] }} transition={{ duration: 3, repeat: Infinity }}
              />
              <motion.circle 
                cx="200" cy="200" r="30" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"
                animate={{ x: [-10, 10, -10] }} transition={{ duration: 2, repeat: Infinity }}
              />
              <Eye className="text-red-500" size={48} />
            </svg>
          )}
          {currentScene === 3 && (
            <svg viewBox="0 0 400 400" className="w-full h-full text-indigo-500/40">
              <motion.circle 
                cx="200" cy="200" r="100" fill="none" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10"
                animate={{ rotate: 360 }} transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
              />
              <Globe className="text-indigo-500" size={48} />
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

export default function SecurityPage() {
  const [email, setEmail] = useState("");

  const securitySteps: Step[] = [
    {
      id: "start",
      question: "How can we help with your online security today?",
      options: [
        { label: "Secure My Accounts", nextStepId: "accounts" },
        { label: "Antivirus Setup", nextStepId: "antivirus" },
        { label: "Safe Email Habits", nextStepId: "email" },
        { label: "Cloud Storage Safety", nextStepId: "cloud" }
      ]
    },
    {
      id: "accounts",
      question: "Securing Your Online Accounts",
      options: [
        { 
          label: "Finish Security", 
          isFinal: true, 
          instructions: [
            "Enable Two-Factor Authentication (2FA) on all major accounts.",
            "Use a password manager to create and store unique, strong passwords.",
            "Review your privacy settings on social media (Facebook, etc.).",
            "Update your recovery email and phone number.",
            "Log out of devices you no longer use."
          ] 
        }
      ]
    },
    {
      id: "antivirus",
      question: "Setting Up Your Antivirus",
      options: [
        { 
          label: "Complete Setup", 
          isFinal: true, 
          instructions: [
            "Download a reputable antivirus (e.g. Malwarebytes, Bitdefender, or use built-in Windows Defender).",
            "Run a full system scan to identify any existing threats.",
            "Enable real-time protection and automatic updates.",
            "Schedule a weekly quick scan for ongoing safety.",
            "Avoid clicking on pop-up ads that claim your computer is infected."
          ] 
        }
      ]
    },
    {
      id: "email",
      question: "Safe Email Practices",
      options: [
        { 
          label: "Stay Safe", 
          isFinal: true, 
          instructions: [
            "Never click on links or attachments from unknown senders.",
            "Look for signs of phishing: misspellings, urgent threats, and strange email addresses.",
            "Mark suspicious emails as 'Spam' or 'Phishing'.",
            "Be wary of emails asking for passwords or financial information.",
            "If an email seems suspicious, contact the sender through a known, official channel."
          ] 
        }
      ]
    },
    {
      id: "cloud",
      question: "Cloud Storage & Backup Safety",
      options: [
        { 
          label: "Secure My Cloud", 
          isFinal: true, 
          instructions: [
            "Choose a secure cloud service like Google Drive, iCloud, or OneDrive.",
            "Set up automatic backups for your most important photos and documents.",
            "Review who has access to shared folders and files.",
            "Encrypt sensitive files before uploading them to the cloud.",
            "Use 2FA to protect your cloud storage account."
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
        <HeaderBackgroundSlider items={securityBackgrounds} />
        
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
                <Shield size={14} className="text-blue-600" />
                <span>Security & Digital Basics</span>
              </div>
              <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-zinc-900">
                Safe. Secure. <br />
                <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">Simple.</span>
              </h1>
              <p className="text-xl md:text-3xl text-zinc-600 mb-14 leading-relaxed font-medium">
                Protect your digital life with confidence. We help you secure your accounts, set up antivirus, and master safe habits for everyday technology.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-14">
                {[
                  "Account security setup",
                  "Antivirus guidance",
                  "Safe email practices",
                  "Cloud backup help"
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
                  Start Security Guide
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
                <Link href="/contact" className="text-zinc-500 font-black hover:text-blue-600 transition-all flex items-center gap-3 group">
                  <div className="w-14 h-14 rounded-2xl bg-white/80 backdrop-blur-sm flex items-center justify-center group-hover:bg-blue-50 shadow-lg transition-all">
                    <Mail size={24} />
                  </div>
                  Ask a Security Expert
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
                <SecurityVisuals />
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
                    <Shield size={32} />
                  </div>
                  <div>
                    <div className="font-black text-2xl text-zinc-900 tracking-tight">Fully Protected</div>
                    <div className="text-zinc-500 font-bold text-sm uppercase tracking-widest">Safe & Secure</div>
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
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter text-white mb-6">Security Assistant</h2>
            <p className="text-xl text-zinc-400 font-medium">Click through our simple guide to master your online security.</p>
          </div>
          
          <div className="bg-white rounded-[4rem] shadow-2xl overflow-hidden border border-white/10">
            <TechBridgeApp 
              title="Security Assistant" 
              steps={securitySteps} 
            />
          </div>
        </div>
      </section>

      {/* Roadmap Section */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-4xl mx-auto mb-20">
            <div className="inline-block px-4 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold mb-6 uppercase tracking-wider">The Roadmap</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8">Digital Safety Path</h2>
            <p className="text-xl md:text-2xl text-zinc-600 font-medium leading-relaxed">
              We guide you through the process of securing your digital life so you can browse with confidence.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Account Safety", desc: "Set up 2FA and strong passwords for all major accounts.", icon: <Lock /> },
              { title: "Antivirus", desc: "Install and configure a reliable antivirus for ongoing protection.", icon: <ShieldCheck /> },
              { title: "Safe Habits", desc: "Learn to spot phishing emails and avoid online scams.", icon: <Eye /> },
              { title: "Backup", desc: "Securely back up your most important files to the cloud.", icon: <Globe /> }
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
          <h2 className="text-4xl font-extrabold text-center mb-16">Security FAQ</h2>
          <div className="space-y-6">
            {[
              { q: "Is two-factor authentication (2FA) really necessary?", a: "Yes. 2FA adds a critical second layer of security, making it much harder for hackers to access your accounts even if they have your password." },
              { q: "Can a free antivirus be trusted?", a: "Yes, some free options like Windows Defender are excellent. However, paid versions often offer more features like identity theft protection." },
              { q: "How do I know if an email is a scam?", a: "Look for urgent threats, misspellings, and generic greetings. If in doubt, never click links and go to the official website directly." },
              { q: "Should I use a password manager?", a: "Absolutely. Password managers are the safest way to store unique, complex passwords for all your accounts without having to remember them." }
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
