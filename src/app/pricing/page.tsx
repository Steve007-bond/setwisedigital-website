"use client";

import { motion } from "framer-motion";
import { CheckCircle2, XCircle, ArrowRight, Zap, BookOpen, UserCheck, ShieldCheck, Award } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";

const pricingBackgrounds = [
  { url: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'light' as const },
  { url: "https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'light' as const },
  { url: "https://images.unsplash.com/photo-1521737604893-d14cc237f11d?auto=format&fit=crop&q=80&w=1200", type: 'image' as const, theme: 'dark' as const },
];

export default function PricingPage() {
  const plans = [
    {
      name: "Guided Learning Session",
      desc: "Perfect for one topic or one device.",
      features: [
        "1-on-1 consultant session",
        "Simple explanations, step by step",
        "Notes or recordings to keep",
        "Follow-up checklist"
      ],
      cta: "Book a Guided Session",
      color: "bg-white"
    },
    {
      name: "Skill-Builder Plan",
      desc: "Great if you want practice and repetition.",
      features: [
        "Multiple guided sessions",
        "Custom learning roadmap",
        "Screen-share (if needed)",
        "Progress tracking"
      ],
      cta: "Start a Skill-Builder Plan",
      color: "bg-blue-600",
      dark: true
    },
    {
      name: "Home & Family Plan",
      desc: "Support across multiple devices and family members.",
      features: [
        "Shared guidance for everyone",
        "Personalized tips for seniors",
        "Printer, GPS, camera & smart home help",
        "Scheduled check-ins"
      ],
      cta: "Talk With a Consultant",
      color: "bg-white"
    }
  ];

  const comparison = [
    { feature: "TechBridge access", access: true, guided: true, skill: true, family: true },
    { feature: "Downloadable PDFs", access: true, guided: true, skill: true, family: true },
    { feature: "1-on-1 sessions", access: false, guided: true, skill: true, family: true },
    { feature: "Custom learning plan", access: false, guided: false, skill: true, family: true },
    { feature: "Multiple devices covered", access: false, guided: false, skill: false, family: true },
    { feature: "Ongoing support", access: false, guided: "Optional", skill: true, family: true },
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />

      <main className="relative pt-44 pb-32 overflow-hidden">
        <HeaderBackgroundSlider items={pricingBackgrounds} />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-24">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 backdrop-blur-sm text-blue-700 text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl border border-white/50"
            >
              <Award size={14} className="text-blue-600" />
              <span>Simple & Transparent Pricing</span>
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-6xl md:text-9xl font-black tracking-tighter mb-8 text-zinc-900 leading-[0.9]"
            >
              Our <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">Packages.</span>
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-xl md:text-3xl text-zinc-600 max-w-3xl mx-auto leading-relaxed font-medium"
            >
              At Setwise Digital, we believe learning should start simple — and grow with you.
            </motion.p>
          </div>

          {/* Included Section */}
          <motion.section 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-32 bg-zinc-900 text-white rounded-[4rem] p-12 md:p-20 relative overflow-hidden shadow-2xl"
          >
            {/* Advanced Motion Background */}
            <div className="absolute inset-0 overflow-hidden">
              <motion.div 
                animate={{ 
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-blue-600/20 rounded-full blur-[120px]" 
              />
              <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-10" />
            </div>
            
            <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="inline-block px-4 py-1 rounded-full dark-glass border-white/10 text-blue-400 font-bold text-sm uppercase tracking-widest mb-8">
                  Included for Everyone
                </div>
                <h2 className="text-4xl md:text-7xl font-black tracking-tighter mb-8 leading-[0.9]">Learning <br />Access</h2>
                <p className="text-xl md:text-2xl text-zinc-400 mb-10 font-medium leading-relaxed">No subscriptions. No commitments. Start exploring and building confidence at your own pace.</p>
                <Link href="/contact" className="shine-effect w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center gap-3 group">
                  Get Access & Start Learning
                  <ArrowRight size={28} className="group-hover:translate-x-2 transition-transform" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {[
                  { icon: <Zap className="text-yellow-400" size={32} />, text: "TechBridge Tools" },
                  { icon: <BookOpen className="text-blue-400" size={32} />, text: "Step-by-Step PDFs" },
                  { icon: <ShieldCheck className="text-green-400" size={32} />, text: "Helpful Updates" },
                  { icon: <UserCheck className="text-indigo-400" size={32} />, text: "Self-Paced Learning" }
                ].map((item, i) => (
                  <motion.div 
                    key={i} 
                    whileHover={{ scale: 1.05, y: -5 }}
                    className="flex flex-col gap-4 dark-glass p-8 rounded-[2.5rem] border border-white/10 shadow-xl"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white/5 flex items-center justify-center">
                      {item.icon}
                    </div>
                    <span className="font-black text-xl tracking-tight">{item.text}</span>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.section>

          {/* Pricing Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-40">
            {plans.map((plan, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                whileHover={{ y: -15 }}
                className={`${plan.color} ${plan.dark ? 'bg-blue-600 text-white shadow-2xl shadow-blue-600/20' : 'bg-white text-zinc-900 border border-zinc-100 shadow-xl shadow-zinc-200/50'} p-12 rounded-[4rem] flex flex-col relative overflow-hidden group`}
              >
                {plan.dark && (
                  <div className="absolute top-0 right-0 p-8">
                    <div className="bg-white/10 backdrop-blur-md px-4 py-1 rounded-full text-xs font-black uppercase tracking-widest border border-white/20">Popular</div>
                  </div>
                )}
                <h3 className="text-3xl font-black tracking-tighter mb-4">{plan.name}</h3>
                <p className={`${plan.dark ? 'text-blue-100' : 'text-zinc-500'} mb-10 text-lg font-medium leading-relaxed`}>{plan.desc}</p>
                <div className="space-y-5 mb-12 flex-grow">
                  {plan.features.map((feat, j) => (
                    <div key={j} className="flex items-start gap-4">
                      <div className={`w-6 h-6 rounded-full flex items-center justify-center shrink-0 ${plan.dark ? 'bg-blue-400/20 text-white' : 'bg-blue-50 text-blue-600'}`}>
                        <CheckCircle2 size={16} />
                      </div>
                      <span className="font-bold text-lg leading-tight">{feat}</span>
                    </div>
                  ))}
                </div>
                <Link href="/contact" className={`w-full py-6 rounded-[2rem] font-black text-xl transition-all shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 flex items-center justify-center ${plan.dark ? 'bg-white text-blue-600' : 'bg-zinc-900 text-white'}`}>
                  {plan.cta}
                </Link>
              </motion.div>
            ))}
          </div>

          {/* Why We Price This Way */}
          <div className="text-center mb-32">
             <h2 className="text-4xl font-extrabold mb-12">Why We Price This Way</h2>
             <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
               {[
                 { title: "Learn at your own pace", desc: "No locking you into complicated subscriptions." },
                 { title: "Help only when you need it", desc: "Access remains free; pay only for guidance." },
                 { title: "Honest & Human", desc: "Simple pricing with no hidden force upgrades." }
               ].map((item, i) => (
                 <div key={i} className="space-y-4">
                   <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mx-auto font-bold text-xl">
                     {i + 1}
                   </div>
                   <h4 className="font-extrabold text-xl">{item.title}</h4>
                   <p className="text-zinc-600 font-medium">{item.desc}</p>
                 </div>
               ))}
             </div>
          </div>

          {/* Comparison Table */}
          <div className="overflow-x-auto bg-white rounded-[3rem] border border-zinc-100 shadow-xl p-8 md:p-12">
            <h2 className="text-3xl font-extrabold mb-12 text-center">Quick Overview</h2>
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b border-zinc-100 text-left">
                  <th className="pb-6 font-extrabold text-zinc-400 uppercase tracking-widest text-xs">Feature</th>
                  <th className="pb-6 font-extrabold text-center">Learning Access</th>
                  <th className="pb-6 font-extrabold text-center">Guided Learning</th>
                  <th className="pb-6 font-extrabold text-center">Skill-Builder</th>
                  <th className="pb-6 font-extrabold text-center">Home & Family</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-zinc-50">
                {comparison.map((row, i) => (
                  <tr key={i} className="group">
                    <td className="py-6 font-bold text-zinc-700">{row.feature}</td>
                    <td className="py-6 text-center">{typeof row.access === 'boolean' ? (row.access ? <CheckCircle2 className="mx-auto text-green-500" /> : <XCircle className="mx-auto text-zinc-200" />) : <span className="font-bold text-zinc-500">{row.access}</span>}</td>
                    <td className="py-6 text-center">{typeof row.guided === 'boolean' ? (row.guided ? <CheckCircle2 className="mx-auto text-green-500" /> : <XCircle className="mx-auto text-zinc-200" />) : <span className="font-bold text-zinc-500">{row.guided}</span>}</td>
                    <td className="py-6 text-center">{typeof row.skill === 'boolean' ? (row.skill ? <CheckCircle2 className="mx-auto text-green-500" /> : <XCircle className="mx-auto text-zinc-200" />) : <span className="font-bold text-zinc-500">{row.skill}</span>}</td>
                    <td className="py-6 text-center">{typeof row.family === 'boolean' ? (row.family ? <CheckCircle2 className="mx-auto text-green-500" /> : <XCircle className="mx-auto text-zinc-200" />) : <span className="font-bold text-zinc-500">{row.family}</span>}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
