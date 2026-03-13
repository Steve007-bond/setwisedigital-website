"use client";

import { motion, useScroll, useTransform, Variants } from "framer-motion";
import { 
  ArrowRight, 
  Zap, 
  Shield, 
  Globe, 
  Printer, 
  Navigation, 
  Home as HomeIcon, 
  Camera, 
  CheckCircle2, 
  HelpCircle,
  BookOpen,
  Mail,
  Smartphone,
  ChevronRight,
  UserCheck,
  Award,
  Sparkles,
  MousePointer2
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import { useState, useRef } from "react";

const homeBackgrounds = [
  { url: "https://assets.mixkit.co/videos/preview/mixkit-woman-working-on-her-laptop-at-home-39887-large.mp4", type: 'video' as const, theme: 'dark' as const }, // Darker video
  { url: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'light' as const }, // Light image
  { url: "https://images.unsplash.com/photo-1556155092-490a1ba16284?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'light' as const }, // Light image
  { url: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const }  // Dark image
];

export default function Home() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [currentTheme, setCurrentTheme] = useState<'dark' | 'light'>('dark');
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y1 = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -150]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 10]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const fadeIn: Variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div ref={containerRef} className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100">
      <Navbar />

      {/* Hero Section - Full Cover */}
      <header className="relative min-h-screen flex items-center justify-center overflow-hidden text-white">
        <HeaderBackgroundSlider items={homeBackgrounds} onThemeChange={setCurrentTheme} />

        {/* Floating Animated Elements (Parallax) */}
        <motion.div 
          style={{ y: y1, rotate }}
          className="absolute top-20 right-[-10%] w-[600px] h-[600px] bg-blue-400/10 rounded-full blur-[120px] pointer-events-none" 
        />
        <motion.div 
          style={{ y: y2 }}
          className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-indigo-400/10 rounded-full blur-[100px] pointer-events-none" 
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 w-full">
          <motion.div 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2 rounded-full backdrop-blur-md text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl border animate-bounce-slow bg-black/30 border-white/20 text-blue-400">

              <Sparkles size={14} className="text-yellow-500 fill-yellow-500" />
              <span>Experience Technology Differently</span>
            </motion.div>
            
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white"
            >
              Technology <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent italic">Simplified.</span>
            </motion.h1>

            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-3xl mb-14 leading-relaxed font-medium text-zinc-200"
            >
              At Setwise Digital, we bridge the gap between complex tech and everyday ease. Personalized support for the modern age.
            </motion.p>

            <motion.div 
              variants={itemVariants}
              className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-20"
            >
              <Link href="/techbridge" className="shine-effect w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group border-0">
                Get Support Now
                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </Link>
              <Link href="/pricing" className="font-black hover:text-blue-400 transition-all flex items-center gap-3 group text-white">
                <div className="w-14 h-14 rounded-2xl backdrop-blur-md flex items-center justify-center shadow-lg transition-all bg-white/10 group-hover:bg-white/20">
                  <Zap size={24} />
                </div>
                View Pricing
              </Link>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left max-w-5xl mx-auto"
            >
              {[
                { icon: <BookOpen className="text-blue-600" />, title: "Plain Language", text: "No confusing technical jargon" },
                { icon: <Zap className="text-blue-600" />, title: "Quick Lessons", text: "Learn in minutes, not hours" },
                { icon: <Globe className="text-blue-600" />, title: "Everyday Devices", text: "Covering what your family uses" }
              ].map((point, i) => (
                <div key={i} className="flex flex-col gap-4 p-8 rounded-[2.5rem] bg-white shadow-xl shadow-zinc-200/50 border border-zinc-100 group hover:border-blue-200 transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white transition-colors duration-500">
                    {point.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-zinc-900 mb-1">{point.title}</h4>
                    <p className="text-zinc-500 font-bold leading-tight">{point.text}</p>
                  </div>
                </div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Why Choose Us Section */}
      <section id="why-us" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="lg:w-1/2"
            >
              <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-600 font-black text-xs uppercase tracking-[0.2em] mb-8">
                Our Mission
              </div>
              <h2 className="text-5xl md:text-6xl font-black mb-10 leading-[1.1] tracking-tighter">
                Why Choose <br /><span className="text-blue-600">Setwise Digital</span>
              </h2>
              <p className="text-xl text-zinc-500 mb-12 leading-relaxed font-medium">
                Many people search daily for “how do I set up my printer,” “how do I update my GPS,” or “how do I use Alexa.” The answers are often buried in technical jargon. <span className="text-zinc-900 font-bold italic">We make it simple.</span>
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { title: "Clarity", text: "Plain English step-by-step guides", icon: <CheckCircle2 className="text-blue-600" /> },
                  { title: "Confidence", text: "We teach you the 'why', not just 'how'", icon: <CheckCircle2 className="text-blue-600" /> },
                  { title: "Community", text: "Built for real users, by real people", icon: <CheckCircle2 className="text-blue-600" /> },
                  { title: "Support", text: "Human help whenever you get stuck", icon: <CheckCircle2 className="text-blue-600" /> }
                ].map((promise, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.1 }}
                    className="flex flex-col gap-4 p-8 rounded-3xl bg-zinc-50 border border-zinc-100 hover:border-blue-200 hover:shadow-xl hover:shadow-blue-500/5 transition-all group"
                  >
                    <div className="w-10 h-10 rounded-xl bg-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                      {promise.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-lg mb-1">{promise.title}</h4>
                      <p className="text-zinc-500 font-bold text-sm leading-tight">{promise.text}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              whileInView={{ opacity: 1, scale: 1, rotate: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 1, ease: "circOut" }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl shadow-blue-500/10 group h-[600px] bg-zinc-900 flex items-center justify-center">
                {/* Custom SVG Illustration instead of external image */}
                <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')]" />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.05, 1],
                    rotate: [0, 1, 0]
                  }}
                  transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full h-full flex items-center justify-center p-12"
                >
                  <svg viewBox="0 0 800 800" className="w-full h-full text-blue-500/40" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="400" cy="400" r="300" stroke="currentColor" strokeWidth="2" strokeDasharray="10 10" className="animate-spin-slow" />
                    <circle cx="400" cy="400" r="200" stroke="currentColor" strokeWidth="4" />
                    <path d="M400 100V200M400 600V700M100 400H200M600 400H700" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                    <rect x="300" y="300" width="200" height="200" rx="40" fill="currentColor" fillOpacity="0.1" stroke="currentColor" strokeWidth="4" />
                    <motion.path 
                      animate={{ opacity: [0.3, 1, 0.3], scale: [0.9, 1.1, 0.9] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      d="M350 400L380 430L450 370" stroke="white" strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" 
                    />
                  </svg>
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-zinc-900 via-transparent to-transparent opacity-80" />
                
                <div className="absolute bottom-12 left-12 right-12 text-white">
                  <div className="flex gap-4 mb-6">
                    <motion.div 
                      animate={{ y: [0, -10, 0] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      className="w-14 h-14 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-600/40"
                    >
                      <Printer size={28} />
                    </motion.div>
                    <motion.div 
                      animate={{ y: [0, 10, 0] }}
                      transition={{ duration: 5, repeat: Infinity, delay: 0.5 }}
                      className="w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-md border border-white/10 flex items-center justify-center shadow-lg"
                    >
                      <Navigation size={28} />
                    </motion.div>
                  </div>
                  <h3 className="text-4xl font-black leading-tight tracking-tight mb-4">Technology Bridged.</h3>
                  <p className="text-zinc-300 text-xl font-medium">Designed specifically for lifelong learners who value clarity over complexity.</p>
                </div>
              </div>
              
              {/* Animated Trust Badge */}
              <motion.div 
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                viewport={{ once: true }}
                transition={{ delay: 0.5, duration: 0.8 }}
                className="absolute -bottom-10 -left-10 bg-white p-8 rounded-[2.5rem] shadow-2xl border border-zinc-100 flex items-center gap-5 group hover:-translate-y-2 transition-transform duration-500"
              >
                <div className="w-20 h-20 rounded-[1.5rem] bg-blue-600 flex items-center justify-center text-white shadow-lg shadow-blue-500/30 group-hover:rotate-12 transition-transform">
                  <Award size={40} />
                </div>
                <div>
                  <div className="font-black text-4xl tracking-tighter">100%</div>
                  <div className="text-zinc-400 font-black uppercase text-xs tracking-widest">Satisfaction Promise</div>
                </div>
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Popular Topics Grid */}
      <section id="topics" className="py-32 bg-zinc-50 relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-zinc-200 to-transparent" />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-black text-xs uppercase tracking-[0.2em] mb-6">
              Expertise
            </div>
            <h2 className="text-5xl md:text-6xl font-black mb-8 tracking-tighter text-zinc-900">Everyday Tech Made Simple</h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">Click on a topic below to see how we help you master the devices you use daily.</p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
          {[
            { 
              icon: <Printer className="text-blue-600" />, 
              title: "Printer Setup", 
              desc: "Learn wireless printing, fix common issues, and discover tips to save ink and paper.",
              points: ["Wi-Fi Setup", "Fix Jams", "Save Ink"],
              href: "/techbridge/printers"
            },
            { 
              icon: <Navigation className="text-blue-600" />, 
              title: "GPS Updates", 
              desc: "Keep maps current on Garmin or in-car systems and use shortcuts for stress-free travel.",
              points: ["Map Updates", "Route Tips", "Syncing"],
              href: "/techbridge/gps"
            },
            { 
              icon: <HomeIcon className="text-blue-600" />, 
              title: "Smart Home", 
              desc: "Connect Alexa or Google Nest, set reminders, and build simple routines with ease.",
              points: ["Alexa Tips", "Google Nest", "Routines"],
              href: "/techbridge/smart-home"
            },
            { 
              icon: <Camera className="text-blue-600" />, 
              title: "Camera Basics", 
              desc: "Install firmware, adjust settings, and capture sharper photos without the tech headache.",
              points: ["Firmware", "Settings", "Better Photos"],
              href: "/techbridge/camera"
            },
            { 
              icon: <Smartphone className="text-blue-600" />, 
              title: "Alexa Refresh", 
              desc: "Discover new commands and set up Alexa for music, news, or everyday tasks.",
              points: ["Updates", "Commands", "Daily Tasks"],
              href: "/techbridge/alexa"
            },
            { 
              icon: <Shield className="text-blue-600" />, 
              title: "Security & Basics", 
              desc: "Master email setup, stay safe online with antivirus, and secure your cloud storage.",
              points: ["Email", "Antivirus", "Cloud Storage"],
              href: "/techbridge/security"
            }
          ].map((topic, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05, duration: 0.5 }}
              whileHover={{ y: -12, scale: 1.02 }}
              className="bg-white p-12 rounded-[3rem] shadow-xl shadow-zinc-200/30 hover:shadow-2xl hover:shadow-blue-500/10 transition-all duration-500 border border-zinc-100 flex flex-col h-full group"
            >
              <div className="w-20 h-20 rounded-2xl bg-blue-50 flex items-center justify-center mb-10 group-hover:bg-blue-600 group-hover:text-white group-hover:rotate-6 transition-all duration-500">
                {topic.icon}
              </div>
              <h3 className="text-3xl font-black mb-4 tracking-tight group-hover:text-blue-600 transition-colors">{topic.title}</h3>
              <p className="text-zinc-500 mb-10 flex-grow leading-relaxed font-medium">{topic.desc}</p>
              <div className="flex flex-wrap gap-2 mb-10">
                {topic.points.map((p, j) => (
                  <span key={j} className="px-4 py-1.5 bg-zinc-100 rounded-full text-xs font-black text-zinc-500 uppercase tracking-widest group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">{p}</span>
                ))}
              </div>
              <Link href={topic.href} className="shine-effect inline-flex items-center justify-center gap-2 bg-zinc-900 text-white px-8 py-4 rounded-2xl font-black text-sm uppercase tracking-widest group/link hover:bg-blue-600 transition-all">
                Learn More <ArrowRight size={16} className="group-hover/link:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Popular Packages Preview */}
      <section id="packages" className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <div className="inline-block px-4 py-1 rounded-full bg-indigo-100 text-indigo-700 font-black text-xs uppercase tracking-[0.2em] mb-6">
              Featured Packages
            </div>
            <h2 className="text-5xl md:text-7xl font-black mb-8 tracking-tighter">Choose Your Learning Path</h2>
            <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium">Simple, upfront pricing. No monthly fees. Just the help you need, when you need it.</p>
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { 
              title: "Printer Learning Package", 
              subtitle: "Setup in 10 minutes",
              bonus: "Printing tips to save time & money",
              features: ["Wi-Fi printer setup guide", "Everyday fixes explained simply"],
              color: "bg-blue-600",
              icon: <Printer className="text-white" />,
              href: "/techbridge/printers"
            },
            { 
              title: "GPS Travel Package", 
              subtitle: "Smooth travels ahead",
              bonus: "Hidden map features most people miss",
              features: ["Garmin & in-car GPS updates", "Navigation basics explained"],
              color: "bg-zinc-900",
              icon: <Navigation className="text-white" />,
              href: "/techbridge/gps"
            },
            { 
              title: "Smart Home Starter", 
              subtitle: "Your voice-controlled life",
              bonus: "Create a routine that suits your lifestyle",
              features: ["Alexa & Google Nest setup", "Voice commands for daily tasks"],
              color: "bg-indigo-600",
              icon: <HomeIcon className="text-white" />,
              href: "/techbridge/smart-home"
            },
            { 
              title: "Camera Essentials", 
              subtitle: "Clearer, sharper photos",
              bonus: "Simple tips for sharper photos",
              features: ["Firmware updates without stress", "Menu walkthroughs for settings"],
              color: "bg-zinc-800",
              icon: <Camera className="text-white" />,
              href: "/techbridge/camera"
            }
          ].map((pkg, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1, duration: 0.6 }}
              whileHover={{ y: -15 }}
              className={`${pkg.color} p-10 rounded-[3rem] text-white flex flex-col h-full shadow-2xl shadow-zinc-200/50 relative overflow-hidden group shine-effect`}
            >
              {/* Micro-interaction Background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-150 transition-transform duration-700" />
              
              <div className="w-16 h-16 rounded-2xl bg-white/20 backdrop-blur-md flex items-center justify-center mb-10 shadow-lg group-hover:scale-110 group-hover:rotate-6 transition-all duration-500">
                {pkg.icon}
              </div>
              <h3 className="text-3xl font-black mb-2 tracking-tight leading-tight">{pkg.title}</h3>
              <p className="text-white/80 font-bold text-sm uppercase tracking-widest mb-8">{pkg.subtitle}</p>
              
              <div className="space-y-4 mb-10 flex-grow">
                {pkg.features.map((feat, j) => (
                  <div key={j} className="flex items-center gap-3">
                    <CheckCircle2 size={18} className="text-white/60" />
                    <span className="font-bold text-sm">{feat}</span>
                  </div>
                ))}
              </div>

              <div className="pt-8 border-t border-white/10">
                <p className="text-xs font-black uppercase tracking-widest text-white/60 mb-2">Bonus Included:</p>
                <p className="text-sm font-bold italic">{pkg.bonus}</p>
              </div>

              <Link href={pkg.href || "/pricing"} className="mt-12 w-full py-5 bg-white text-zinc-900 rounded-[2rem] font-black text-lg hover:bg-zinc-100 transition-all duration-300 flex items-center justify-center gap-3 group/btn">
                Explore Package
                <ChevronRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="mt-24 text-center">
          <Link href="/pricing" className="shine-effect px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 mx-auto shadow-xl shadow-blue-500/20 max-w-fit">
            Browse All Learning Packages
            <ArrowRight size={28} />
          </Link>
        </div>
      </section>

      {/* TechBridge Section */}
      <section id="techbridge" className="py-32 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-500/20 text-blue-400 font-bold text-sm uppercase tracking-widest mb-6">
                Innovation meets Experience
              </div>
              <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">
                TechBridge: Learning With <span className="text-blue-400">Confidence</span>
              </h2>
              <p className="text-xl text-zinc-400 mb-10 leading-relaxed">
                We blend instant AI-powered answers with human-designed lessons. Think of it as a bridge — one side is fast and automated, the other side is thoughtful and personal. Together, they make learning technology smoother.
              </p>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <Zap className="text-blue-400 mb-4" size={32} />
                  <h4 className="font-bold text-xl mb-2">Fast & Instant</h4>
                  <p className="text-zinc-400 font-medium">Get quick answers to urgent questions from our AI guides.</p>
                </div>
                <div className="p-8 rounded-3xl bg-white/5 border border-white/10">
                  <UserCheck className="text-blue-400 mb-4" size={32} />
                  <h4 className="font-bold text-xl mb-2">Thoughtful & Human</h4>
                  <p className="text-zinc-400 font-medium">Detailed lessons designed by people who understand your needs.</p>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative">
              <div className="relative z-10 p-1 bg-gradient-to-br from-blue-500 to-purple-500 rounded-[3rem] shadow-2xl overflow-hidden">
                <div className="bg-zinc-900 p-10 rounded-[2.8rem] space-y-8">
                  <div className="flex items-center gap-4 border-b border-white/10 pb-6">
                    <div className="w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center font-bold text-xl italic">S</div>
                    <div className="font-bold text-xl">Setwise CoPilot</div>
                  </div>
                  <div className="space-y-4">
                    <div className="bg-white/5 p-4 rounded-2xl rounded-tl-none mr-12 text-sm text-zinc-300">
                      "How do I connect my printer to Wi-Fi?"
                    </div>
                    <div className="bg-blue-600 p-4 rounded-2xl rounded-tr-none ml-12 text-sm font-medium">
                      "First, make sure your printer is on. Press the WPS button on your router..."
                    </div>
                    <div className="flex justify-center pt-4">
                      <span className="text-xs font-bold uppercase tracking-widest text-zinc-500">Blending with human guide...</span>
                    </div>
                  </div>
                </div>
              </div>
              <div className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/20 blur-[100px]" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-32 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-extrabold mb-4">Questions You Might Have</h2>
            <p className="text-lg text-zinc-600 font-medium">Everything you need to know about our learning packages.</p>
          </div>
          
          <div className="space-y-4">
            {[
              { 
                q: "Do I need prior technical knowledge?", 
                a: "Not at all. Our guides are written in plain English and designed for all levels, especially those who prefer clear, non-technical explanations." 
              },
              { 
                q: "Can I use these guides at my own pace?", 
                a: "Yes. Every guide is step-by-step, allowing you to pause, repeat, and return to lessons whenever you have a few minutes to spare." 
              },
              { 
                q: "Do you cover different brands?", 
                a: "Yes. We include instructions for popular devices like HP, Canon, Epson, Garmin, Sony, and many others." 
              },
              { 
                q: "What if I just need a quick answer?", 
                a: "That’s where TechBridge comes in—offering instant AI tips for fast solutions plus detailed human-crafted lessons for deeper learning." 
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className={`border rounded-3xl transition-all duration-300 ${activeFaq === i ? 'border-blue-600 bg-blue-50/30' : 'border-zinc-200 hover:border-blue-200'}`}
              >
                <button 
                  onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                  className="w-full px-8 py-6 text-left flex items-center justify-between group"
                >
                  <span className="text-xl font-bold text-zinc-800">{faq.q}</span>
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-all ${activeFaq === i ? 'bg-blue-600 text-white rotate-180' : 'bg-zinc-100 text-zinc-500'}`}>
                    <ChevronRight size={20} className="rotate-90" />
                  </div>
                </button>
                <div className={`overflow-hidden transition-all duration-300 ${activeFaq === i ? 'max-h-96' : 'max-h-0'}`}>
                  <div className="px-8 pb-8 text-lg text-zinc-600 leading-relaxed font-medium">
                    {faq.a}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Hub / Blog Section */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <div className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-700 font-black text-xs uppercase tracking-[0.2em] mb-6">Learning Hub</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6">Discover New Tips Every Week</h2>
              <p className="text-xl text-zinc-600 font-medium">Our Learning Hub is your go-to space for fresh ideas and easy lessons written in everyday language.</p>
            </div>
            <Link href="/techbridge" className="px-8 py-4 bg-white border-2 border-zinc-200 rounded-2xl font-bold hover:border-blue-600 hover:text-blue-600 transition-all shadow-sm whitespace-nowrap">
              Visit Learning Hub
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {[
              {
                title: "How to Print Wirelessly from Your Phone",
                category: "Printer Tips",
                readTime: "4 min read",
                stat: "68% of printer issues are Wi-Fi related",
                img: "https://images.unsplash.com/photo-1612815154858-60aa4c59eaa6?auto=format&fit=crop&q=80&w=600&h=400",
                href: "/techbridge/printers",
                accent: "bg-blue-600/70",
              },
              {
                title: "The Easiest Way to Update Your Garmin GPS",
                category: "GPS & Navigation",
                readTime: "5 min read",
                stat: "72% of GPS users never update their maps",
                img: "https://images.unsplash.com/photo-1530521954074-e64f6810b32d?auto=format&fit=crop&q=80&w=600&h=400",
                href: "/techbridge/gps",
                accent: "bg-indigo-600/70",
              },
              {
                title: "5 Alexa Features You Didn't Know You Had",
                category: "Smart Home",
                readTime: "3 min read",
                stat: "Only 30% of Alexa owners use routines",
                img: "https://images.unsplash.com/photo-1518444065439-e933c06ce9cd?auto=format&fit=crop&q=80&w=600&h=400",
                href: "/techbridge/alexa",
                accent: "bg-violet-600/70",
              },
              {
                title: "Why Camera Updates Improve Your Photos",
                category: "Camera & Photo",
                readTime: "3 min read",
                stat: "Firmware updates fix 40% of camera bugs",
                img: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&q=80&w=600&h=400",
                href: "/techbridge/camera",
                accent: "bg-rose-600/70",
              },
            ].map((article, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -6 }}
                className="bg-white rounded-3xl overflow-hidden shadow-sm hover:shadow-2xl hover:shadow-blue-500/10 transition-all border border-zinc-100 flex flex-col group"
              >
                <div className="h-48 relative overflow-hidden">
                  <img
                    src={article.img}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 ${article.accent}`} />
                  <div className="absolute top-3 left-3">
                    <span className="px-3 py-1 bg-white/90 backdrop-blur-sm rounded-full text-xs font-black text-zinc-700">
                      {article.category}
                    </span>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex items-start gap-2 mb-3 p-3 bg-blue-50 rounded-xl border border-blue-100">
                    <span className="text-xs">📊</span>
                    <span className="text-xs font-bold text-blue-700 leading-tight">{article.stat}</span>
                  </div>
                  <h4 className="text-base font-black mb-3 leading-snug group-hover:text-blue-600 transition-colors text-zinc-900">{article.title}</h4>
                  <div className="mt-auto flex items-center justify-between text-xs text-zinc-400 font-bold">
                    <span>{article.readTime}</span>
                    <Link href={article.href} className="flex items-center gap-1 text-blue-600 hover:gap-2 transition-all">
                      Read <ChevronRight size={14} />
                    </Link>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-lg p-8 mb-16">
            <div className="text-center mb-6">
              <span className="text-xs font-black text-zinc-400 uppercase tracking-widest">Tech Facts & Stats — 2025</span>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              {[
                { stat: "65%", label: "of adults 50+ own a smart speaker", source: "Pew Research" },
                { stat: "4.2B", label: "wireless printers active worldwide", source: "IDC 2025" },
                { stat: "72%", label: "of GPS users never update their maps", source: "Garmin Survey" },
                { stat: "89%", label: "prefer plain-English tech guides", source: "AARP Study" },
              ].map((item, i) => (
                <div key={i} className="space-y-1">
                  <div className="text-3xl md:text-4xl font-black text-blue-600 tracking-tighter">{item.stat}</div>
                  <div className="text-sm font-bold text-zinc-700 leading-tight">{item.label}</div>
                  <div className="text-xs text-zinc-400 font-medium">{item.source}</div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-6">
              <h3 className="text-xl font-black text-zinc-900">Related Articles</h3>
              <Link href="/techbridge" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                View all <ChevronRight size={14} />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {[
                { title: "How to Fix a Paper Jam in 60 Seconds", tag: "Printer", icon: "🖨️", href: "/techbridge/printers" },
                { title: "Setting Up Google Nest for the First Time", tag: "Smart Home", icon: "🏠", href: "/techbridge/smart-home" },
                { title: "Is Your Home Wi-Fi Putting You at Risk?", tag: "Security", icon: "🔒", href: "/techbridge/security" },
              ].map((item, i) => (
                <Link
                  key={i}
                  href={item.href}
                  className="flex items-center gap-4 p-5 bg-white rounded-2xl border border-zinc-100 hover:border-blue-200 hover:shadow-lg transition-all group"
                >
                  <div className="w-12 h-12 rounded-xl bg-zinc-50 flex items-center justify-center text-2xl shrink-0 group-hover:bg-blue-50 transition-colors">
                    {item.icon}
                  </div>
                  <div>
                    <span className="text-xs font-black text-blue-600 uppercase tracking-widest block mb-1">{item.tag}</span>
                    <span className="font-bold text-sm text-zinc-800 leading-tight group-hover:text-blue-600 transition-colors">{item.title}</span>
                  </div>
                  <ChevronRight size={16} className="text-zinc-300 group-hover:text-blue-600 ml-auto shrink-0 group-hover:translate-x-1 transition-all" />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Target Audience / Trust Section */}
      <section className="py-24 bg-blue-600 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-12">Who We Build For</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              { icon: <CheckCircle2 size={32} />, text: "People who want clear instructions without tech jargon" },
              { icon: <UserCheck size={32} />, text: "Ages 40+ who value step-by-step learning" },
              { icon: <HomeIcon size={32} />, text: "Anyone who wants to enjoy gadgets without stress" }
            ].map((item, i) => (
              <div key={i} className="flex flex-col items-center gap-4">
                <div className="w-16 h-16 rounded-2xl bg-white/10 flex items-center justify-center mb-2">
                  {item.icon}
                </div>
                <p className="text-xl font-bold max-w-[250px]">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
        {/* Abstract Background */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[500px] h-[500px] border-[50px] border-white/5 rounded-full" />
      </section>

      {/* Closing CTA */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="bg-zinc-50 rounded-[4rem] p-16 md:p-24 border border-zinc-100 shadow-2xl shadow-blue-500/5 relative overflow-hidden">
            <div className="relative z-10">
              <h2 className="text-5xl md:text-7xl font-extrabold mb-8">Explore. Learn. Simplify.</h2>
              <p className="text-xl md:text-2xl text-zinc-600 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
                Technology doesn’t have to be confusing. Let’s make it work for you, every day.
              </p>
            <Link href="/pricing" className="px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-bold text-2xl hover:bg-blue-700 transition-all hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center gap-3 mx-auto shadow-xl shadow-blue-500/20">
                Browse Learning Packages
                <ArrowRight size={28} />
              </Link>
            </div>
            {/* Background Shape */}
            <div className="absolute top-0 left-0 w-32 h-32 bg-blue-100/50 rounded-br-full -z-0" />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
