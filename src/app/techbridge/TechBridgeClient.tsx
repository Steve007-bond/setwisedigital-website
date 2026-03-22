"use client";

import { motion, Variants } from "framer-motion";
import { 
  Zap, 
  Users, 
  BookOpen, 
  CheckCircle2, 
  ArrowRight, 
  Printer, 
  Navigation, 
  Home as HomeIcon, 
  Mic, 
  ShieldCheck, 
  HelpCircle,
  Lightbulb,
  Heart
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import HeroCharacter from "@/components/HeroCharacter";

export default function TechBridgePage() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 },
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

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      {/* Hero Section */}
      <header className="relative pt-44 pb-32 overflow-hidden bg-zinc-900 text-white">
        {/* Advanced Animated Background (Video-like) */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
              x: [-50, 50, -50],
              y: [-50, 50, -50]
            }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
            className="absolute top-[-20%] left-[-20%] w-[140%] h-[140%] bg-gradient-to-br from-blue-600/30 via-transparent to-indigo-600/30 blur-[120px] opacity-50" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -90, 0],
              x: [50, -50, 50],
              y: [50, -50, 50]
            }}
            transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-[-20%] right-[-20%] w-[140%] h-[140%] bg-gradient-to-tr from-indigo-600/20 via-transparent to-blue-600/20 blur-[100px] opacity-40" 
          />
          
          {/* Animated Grid Lines */}
          <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-20 [mask-image:radial-gradient(ellipse_at_center,black,transparent_80%)]" />
          
          {/* Floating Particles/Shapes */}
          {[...Array(6)].map((_, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0.1, 0.3, 0.1],
                y: [0, -100, 0],
                x: [0, Math.random() * 50 - 25, 0]
              }}
              transition={{ 
                duration: 5 + Math.random() * 5, 
                repeat: Infinity, 
                delay: i * 0.5 
              }}
              className="absolute w-1 h-20 bg-gradient-to-b from-blue-500 to-transparent blur-sm"
              style={{ 
                left: `${15 + i * 15}%`, 
                top: `${20 + Math.random() * 60}%` 
              }}
            />
          ))}
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full dark-glass border-white/10 text-blue-400 text-sm font-bold uppercase tracking-wider mb-8 shadow-2xl animate-pulse-slow">
              <Zap size={16} className="text-yellow-400 fill-yellow-400" />
              <span>The TechBridge™ Platform</span>
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-white"
            >
              Technology <br />
              <span className="bg-gradient-to-r from-blue-400 via-white to-indigo-400 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">Finally Makes Sense.</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-3xl text-zinc-400 max-w-3xl mx-auto mb-14 leading-relaxed font-medium"
            >
              Plain-English technology courses for everyday device users. Learn at your own pace, on any device.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/contact" className="shine-effect w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group">
                Start Your Journey
                <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
              </Link>
            </motion.div>
            <motion.p variants={itemVariants} className="mt-14 text-zinc-500 font-bold text-xl italic tracking-wide">
              Don't just fix it. <span className="text-white border-b-2 border-blue-500">Learn it. Own it.</span>
            </motion.p>

            {/* 3D Character */}
            <motion.div variants={itemVariants} className="mt-12 max-w-lg mx-auto">
              <HeroCharacter
                src="/Images/hero-techbridge.jpeg"
                alt="TechBridge learning hub — master everyday technology"
                accentColor="#3b82f6"
                glowColor="#06b6d4"
                floatingIcons={["🖨️", "🗺️", "🏠", "📷"]}
                speechBubble="Pick a topic!"
                size="large"
              />
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* Section 1: The Origin Story */}
      <section className="py-32 bg-white relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="inline-block px-4 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold mb-6 uppercase tracking-wider">
                Our Origin Story
              </div>
              <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 leading-tight text-zinc-900">
                Why TechBridge <br />Was Born
              </h2>
              <div className="space-y-8 text-lg md:text-xl text-zinc-600 leading-relaxed">
                <p className="font-medium">TechBridge didn’t start as a business idea. It started in a living room.</p>
                <p>Like many families, we watched our parents and grandparents struggle with the devices that were supposed to make their lives easier.</p>
                
                <div className="grid grid-cols-1 gap-4">
                  {[
                    "A printer that quit right before a deadline.",
                    "A GPS that insisted on taking the 'scenic route.'",
                    "An Alexa that simply stopped listening."
                  ].map((text, i) => (
                    <motion.div 
                      key={i}
                      whileHover={{ x: 10 }}
                      className="flex gap-4 items-center p-4 rounded-2xl bg-zinc-50 border border-zinc-100 font-bold text-zinc-800"
                    >
                      <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white shadow-lg">
                        <CheckCircle2 size={20} />
                      </div>
                      {text}
                    </motion.div>
                  ))}
                </div>

                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-10 glass border-blue-100 rounded-[2.5rem] relative italic shadow-2xl shadow-blue-500/5 group mt-8"
                >
                  <Heart className="absolute -top-6 -left-6 text-red-500 fill-red-500 shadow-xl" size={48} />
                  <p className="text-2xl font-black leading-tight text-zinc-900">
                    "We realized the real problem wasn’t the technology. It was the lack of simple, patient learning options."
                  </p>
                </motion.div>
              </div>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative group"
            >
              <div className="aspect-square bg-zinc-900 rounded-[4rem] overflow-hidden flex items-center justify-center shadow-2xl relative">
                <HelpCircle size={240} className="text-blue-500/20 group-hover:scale-110 transition-transform duration-700" />
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 to-transparent" />
                
                {/* Floating Elements */}
                <motion.div 
                  animate={{ y: [0, -20, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                  className="absolute top-1/4 right-1/4 p-6 glass rounded-3xl shadow-2xl"
                >
                  <Zap size={40} className="text-yellow-500" />
                </motion.div>
                <motion.div 
                  animate={{ y: [0, 20, 0] }}
                  transition={{ duration: 5, repeat: Infinity, delay: 1 }}
                  className="absolute bottom-1/4 left-1/4 p-6 glass rounded-3xl shadow-2xl"
                >
                  <Lightbulb size={40} className="text-blue-600" />
                </motion.div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Section 2: What is TechBridge? */}
      <section className="py-32 bg-zinc-50 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="inline-block px-4 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-bold mb-6 uppercase tracking-wider">The Solution</div>
          <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 text-zinc-900">From Confusion to Confidence</h2>
          <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto mb-20 font-medium leading-relaxed">
            TechBridge is our learning platform designed to help you understand and confidently use the technology you already own.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "AI-Powered Guidance", desc: "Instant answers for quick understanding — powered by AI, guided by educators.", icon: <Zap className="text-yellow-500" />, color: "bg-yellow-50" },
              { title: "Human Expert Access", desc: "Structured courses authored by real educators who understand your learning needs.", icon: <Users className="text-blue-600" />, color: "bg-blue-50" },
              { title: "Step-by-Step Guides", desc: "Visual manuals in plain English you can keep forever.", icon: <BookOpen className="text-indigo-600" />, color: "bg-indigo-50" }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                whileHover={{ y: -15 }}
                className="bg-white p-12 rounded-[3rem] shadow-xl shadow-zinc-200/50 border border-zinc-100 group transition-all"
              >
                <div className={`w-20 h-20 rounded-[2rem] ${item.color} flex items-center justify-center mb-10 mx-auto group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-lg`}>
                  {item.icon}
                </div>
                <h3 className="text-2xl font-black tracking-tight mb-4 text-zinc-900">{item.title}</h3>
                <p className="text-lg font-medium text-zinc-500 leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 3: Learning Paths */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-6">Three Ways to Learn (No Pressure, Just Progress)</h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto font-medium">We know everyone learns differently. That’s why we offer step by step tech skill-building tailored to your comfort level.</p>
          </div>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {[
              { 
                title: "1. The Self-Paced Learner", 
                subtitle: "Downloadable Guides", 
                desc: "For those who like to read and absorb information calmly. Our eBooks avoid jargon and focus on real-life solutions.",
                perfect: "Understanding the 'why' before the 'how.'",
                icon: <BookOpen className="text-blue-600" />
              },
              { 
                title: "2. The Hands-On Doer", 
                subtitle: "Guided Web Apps", 
                desc: "Learn by doing. Our interactive web apps ask simple questions and guide you one click at a time. Like an instructor looking over your shoulder.",
                perfect: "Fixing an issue while you learn.",
                icon: <Zap className="text-blue-600" />,
                highlight: true
              },
              { 
                title: "3. The Personal Touch", 
                subtitle: "Live Lesson Sessions", 
                desc: "Learn alongside a real educator in a scheduled video lesson. Structured, patient, and built entirely around your learning goals.",
                perfect: "When you want a human connection.",
                icon: <Users className="text-blue-600" />
              }
            ].map((path, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -10 }}
                className={`p-10 rounded-[3rem] border flex flex-col h-full ${path.highlight ? 'bg-blue-600 text-white border-blue-600 shadow-2xl shadow-blue-500/20' : 'bg-white text-zinc-900 border-zinc-100 shadow-sm'}`}
              >
                <div className={`w-14 h-14 rounded-2xl mb-8 flex items-center justify-center ${path.highlight ? 'bg-white text-blue-600' : 'bg-blue-50'}`}>
                  {path.icon}
                </div>
                <h3 className="text-2xl font-extrabold mb-2">{path.title}</h3>
                <h4 className={`text-lg font-bold mb-6 ${path.highlight ? 'text-blue-100' : 'text-blue-600'}`}>{path.subtitle}</h4>
                <p className={`mb-8 flex-grow font-medium leading-relaxed ${path.highlight ? 'text-blue-50' : 'text-zinc-600'}`}>{path.desc}</p>
                <div className={`pt-6 border-t ${path.highlight ? 'border-white/10' : 'border-zinc-100'}`}>
                  <span className={`text-xs font-bold uppercase tracking-widest mb-2 block ${path.highlight ? 'text-blue-200' : 'text-blue-600'}`}>Perfect for</span>
                  <p className="font-bold">{path.perfect}</p>
                </div>
              </motion.div>
            ))}
          </div>
          <div className="mt-16 text-center">
             <button className="px-10 py-5 bg-zinc-900 text-white rounded-2xl font-bold text-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-2 mx-auto">
               Explore Learning Options
               <ArrowRight size={24} />
             </button>
          </div>
        </div>
      </section>

      {/* Section 4: Knowledge Hub Grid */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-6 text-zinc-900">What Would You Like to Master Today?</h2>
            <p className="text-xl text-zinc-600 max-w-3xl mx-auto font-medium">TechBridge is your parent learning platform for the devices that power your daily life.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                cat: "Category 1", 
                title: "Printers & Scanners", 
                icon: <Printer size={32} />, 
                desc: "Comprehensive setup guide from unboxing to wireless printing.",
                points: ["How Wi-Fi printing works", "Understanding paper jams and offline status", "Ink cartridge basics and replacement"],
                btn: "Printer Course",
                href: "/techbridge/printers"
              },
              { 
                cat: "Category 2", 
                title: "GPS & Navigation Mastery", 
                icon: <Navigation size={32} />, 
                desc: "Stay on the right path with our map update learning modules.",
                points: ["How Garmin & in-car GPS updates work", "Understanding GPS display issues", "How GPS maps are structured and updated"],
                btn: "GPS Course",
                href: "/techbridge/gps"
              },
              { 
                cat: "Category 3", 
                title: "Smart Home Tech", 
                icon: <HomeIcon size={32} />, 
                desc: "Your complete installation guide. Learn to control your home with confidence.",
                points: ["Smart plugs & light setup", "How smart home pairing works", "Understanding smart home apps"],
                btn: "Smart Home Course",
                href: "/techbridge/smart-home"
              },
              { 
                cat: "Category 4", 
                title: "Alexa & Voice Assistant Mastery", 
                icon: <Mic size={32} />, 
                desc: "Setup and configuration help that actually works. Talk to your home.",
                points: ["How Alexa Skills and account linking works", "How voice recognition works", "Understanding smart device integration"],
                btn: "Alexa Course",
                href: "/techbridge/alexa"
              }
            ].map((item, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15 }}
                className="bg-white p-12 rounded-[3rem] border border-zinc-100 shadow-sm hover:shadow-2xl transition-all group flex flex-col h-full relative overflow-hidden"
              >
                {/* Shine effect on card */}
                <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/0 via-white/5 to-blue-600/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 ease-in-out" />
                
                <div className="flex flex-col sm:flex-row justify-between items-start gap-6 mb-8 relative z-10">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300 group-hover:rotate-6">
                      {item.icon}
                    </div>
                    <div>
                      <div className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">{item.cat}</div>
                      <h3 className="text-2xl font-extrabold">{item.title}</h3>
                    </div>
                  </div>
                </div>
                <p className="text-lg text-zinc-600 mb-8 font-medium leading-relaxed relative z-10">{item.desc}</p>
                <ul className="space-y-4 mb-10 flex-grow relative z-10">
                  {item.points.map((p, j) => (
                    <li key={j} className="flex items-center gap-3 text-zinc-800 font-bold">
                      <CheckCircle2 size={18} className="text-blue-600" />
                      {p}
                    </li>
                  ))}
                </ul>
                <Link href={item.href} className="shine-effect w-full py-5 bg-zinc-900 text-white rounded-[2rem] font-black text-lg hover:bg-blue-600 transition-all flex items-center justify-center gap-3 group/btn relative z-10">
                  {item.btn}
                  <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Section 5: Philosophy */}
      <section className="py-32 bg-zinc-900 text-white overflow-hidden relative">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-extrabold mb-12 leading-tight">Learn Once. Use Forever.</h2>
            <div className="space-y-8 text-xl text-zinc-400 font-medium leading-relaxed mb-12">
              <p>TechBridge isn’t about quick hacks. It’s about long-term confidence. When you use our technology learning platform, you aren’t just solving today's bug. You are learning:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-left">
                {[
                  "How to understand similar situations in the future.",
                  "How to get the most from your devices.",
                  "How to keep your digital life running smoothly."
                ].map((text, i) => (
                  <div key={i} className="flex gap-3 bg-white/5 p-6 rounded-2xl border border-white/10">
                    <Lightbulb className="text-blue-400 shrink-0" size={24} />
                    <span className="text-lg text-white font-bold">{text}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="p-10 rounded-[3rem] bg-blue-600/10 border-2 border-blue-600/30">
               <p className="text-2xl md:text-3xl font-extrabold text-blue-100 italic">"You don’t need to be tech-savvy. You just need the right bridge."</p>
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-blue-500/10 blur-[120px] -z-0" />
      </section>

      {/* Section 6: Trust Signals */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-extrabold mb-6">Why Everyday Users Trust TechBridge</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { title: "Education-First", text: "We teach, we don't just fix.", icon: <BookOpen className="text-blue-600" /> },
              { title: "Plain Language", text: "No jargon. Just plain-English explanations.", icon: <CheckCircle2 className="text-blue-600" /> },
              { title: "Safety Net", text: "AI speed with human empathy.", icon: <ShieldCheck className="text-blue-600" /> },
              { title: "No Hidden Agendas", text: "No upsells. No pressure. Just honest education.", icon: <Heart className="text-blue-600" /> }
            ].map((item, i) => (
              <div key={i} className="p-10 rounded-[2.5rem] bg-zinc-50 border border-zinc-100 text-center flex flex-col items-center">
                <div className="w-16 h-16 rounded-2xl bg-white shadow-sm flex items-center justify-center mb-6">
                  {item.icon}
                </div>
                <h3 className="text-xl font-bold mb-3">{item.title}</h3>
                <p className="text-zinc-500 font-medium">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="py-24 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-4xl md:text-5xl font-extrabold mb-8 leading-tight">Ready to Cross the Bridge?</h2>
          <p className="text-xl text-blue-100 mb-12 font-medium">Discover a smarter, calmer way to learn technology today.</p>
          <button className="px-12 py-6 bg-white text-blue-600 rounded-[2rem] font-bold text-2xl hover:shadow-2xl transition-all hover:scale-105 active:scale-95 shadow-xl shadow-blue-500/20">
            Start Learning Now
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
