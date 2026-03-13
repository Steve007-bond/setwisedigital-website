"use client";

import { motion } from "framer-motion";
import { 
  CheckCircle2, 
  Heart, 
  ShieldCheck, 
  Users, 
  Target, 
  MapPin, 
  ArrowRight,
  Printer,
  Navigation,
  Camera,
  Home as HomeIcon,
  BookOpen,
  MessageSquare,
  UserCheck,
  Calendar,
  Zap,
  Globe
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Link from "next/link";
import Image from "next/image";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";

const aboutBackgrounds = [
  { url: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&q=80&w=1200", type: 'image' as const }, // Mature man working at laptop
  { url: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?auto=format&fit=crop&q=80&w=1200", type: 'image' as const }, // Friendly middle-aged woman
  { url: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&q=80&w=1200", type: 'image' as const }  // Smiling mature professional
];

export default function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
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
      <header className="relative pt-44 pb-32 overflow-hidden">
        <HeaderBackgroundSlider items={aboutBackgrounds} />
        
        {/* Advanced Background Elements */}
        <div className="absolute inset-0 -z-10">
          <motion.div 
            animate={{ 
              scale: [1, 1.2, 1],
              rotate: [0, 45, 0],
            }}
            transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
            className="absolute top-0 left-1/4 w-96 h-96 bg-blue-200/30 rounded-full blur-3xl" 
          />
          <motion.div 
            animate={{ 
              scale: [1.2, 1, 1.2],
              rotate: [0, -45, 0],
            }}
            transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
            className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-indigo-100/40 rounded-full blur-3xl" 
          />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            <motion.div variants={itemVariants} className="inline-flex items-center gap-2 px-5 py-2 rounded-full glass border-blue-100/50 text-blue-700 text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl">
              <Calendar size={14} className="text-blue-600" />
              <span>Patient Guidance Since 2016</span>
            </motion.div>
            <motion.h1 
              variants={itemVariants}
              className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-zinc-900"
            >
              Making Tech <br />
              <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">Simple & Safe.</span>
            </motion.h1>
            <motion.p 
              variants={itemVariants}
              className="text-xl md:text-3xl text-zinc-600 max-w-3xl mx-auto leading-relaxed font-medium mb-12"
            >
              Setwise Digital started with a simple belief: technology should make life easier — not more stressful.
            </motion.p>
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row items-center justify-center gap-6">
              <Link href="/pricing" className="shine-effect w-full sm:w-auto px-12 py-6 bg-blue-600 text-white rounded-[2rem] font-black text-2xl hover:shadow-[0_20px_50px_rgba(37,99,235,0.4)] hover:-translate-y-1 transition-all flex items-center justify-center">
                Browse Packages
              </Link>
              <Link href="/contact" className="w-full sm:w-auto px-12 py-6 bg-white/80 backdrop-blur-sm text-zinc-900 border-2 border-white rounded-[2rem] font-black text-2xl hover:bg-white transition-all flex items-center justify-center">
                Contact Us
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </header>

      {/* The Story Section */}
      <section className="py-32 relative bg-white overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2"
            >
              <div className="inline-block px-4 py-1 rounded-lg bg-blue-50 text-blue-700 text-sm font-bold mb-6">OUR STORY</div>
              <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-8 leading-tight text-zinc-900">
                Our Journey Began With a <span className="text-blue-600">Single Moment</span>
              </h2>
              <div className="space-y-6 text-lg md:text-xl text-zinc-600 leading-relaxed">
                <p>
                  Back in 2016, we noticed something across homes, seniors, families, and small businesses: People were buying printers, GPS devices, cameras, and smart home systems… but instead of feeling confident, they felt <span className="text-zinc-900 font-bold italic underline decoration-blue-500/30 underline-offset-4">stuck, overwhelmed, and worried</span> they might “break” something.
                </p>
                
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  className="p-10 glass border-blue-100 rounded-[2.5rem] relative italic text-zinc-800 shadow-xl shadow-blue-500/5 group"
                >
                  <div className="absolute -top-6 -left-6 w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center text-white text-4xl font-serif shadow-lg group-hover:rotate-6 transition-transform">“</div>
                  <p className="text-2xl font-bold leading-tight">
                    “We bought this printer to print our medical forms… but we still go to the library because we’re scared we’ll mess it up.”
                  </p>
                  <footer className="mt-6 text-blue-600 font-bold not-italic flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-blue-600"></span>
                    A senior couple who shaped our mission forever.
                  </footer>
                </motion.div>

                <p className="font-medium">
                  That’s when Setwise Digital decided: We won’t just “fix technology.” We will teach people — patiently, clearly, and kindly. No complicated tech talk. No pressure. No scare tactics. Just step-by-step guidance that builds confidence.
                </p>
              </div>
            </motion.div>

            <motion.div 
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="lg:w-1/2 relative"
            >
              <div className="relative rounded-[4rem] overflow-hidden shadow-2xl shadow-blue-500/10 group aspect-square bg-zinc-900 flex items-center justify-center">
                {/* Custom SVG Graphic instead of external image */}
                <div className="absolute inset-0 opacity-20 bg-[url('/grid.svg')]" />
                <motion.div 
                  animate={{ 
                    scale: [1, 1.1, 1],
                    rotate: [0, -2, 0]
                  }}
                  transition={{ duration: 12, repeat: Infinity, ease: "easeInOut" }}
                  className="relative z-10 w-full h-full flex items-center justify-center p-16"
                >
                  <svg viewBox="0 0 800 800" className="w-full h-full text-blue-400/30" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M400 100C234.315 100 100 234.315 100 400C100 565.685 234.315 700 400 700C565.685 700 700 565.685 700 400" stroke="currentColor" strokeWidth="2" strokeDasharray="20 20" />
                    <circle cx="400" cy="400" r="150" stroke="currentColor" strokeWidth="4" />
                    <motion.circle 
                      animate={{ r: [150, 180, 150], opacity: [0.2, 0.5, 0.2] }}
                      transition={{ duration: 4, repeat: Infinity }}
                      cx="400" cy="400" r="150" stroke="currentColor" strokeWidth="2" 
                    />
                    <path d="M400 300V500M300 400H500" stroke="currentColor" strokeWidth="8" strokeLinecap="round" />
                    <rect x="350" y="350" width="100" height="100" rx="20" fill="currentColor" fillOpacity="0.2" />
                  </svg>
                </motion.div>

                <div className="absolute inset-0 bg-gradient-to-t from-blue-600/40 via-transparent to-transparent" />
                
                {/* Floating Stats over Image */}
                <div className="absolute bottom-8 left-8 right-8 grid grid-cols-2 gap-4">
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="glass p-6 rounded-3xl text-center border-white/20 shadow-2xl"
                  >
                    <div className="text-3xl font-black text-white tracking-tighter">2016</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/80">Founded</div>
                  </motion.div>
                  <motion.div 
                    whileHover={{ y: -5 }}
                    className="bg-blue-600 p-6 rounded-3xl text-center shadow-xl border border-blue-400/50"
                  >
                    <div className="text-3xl font-black text-white tracking-tighter">USA</div>
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/80">Nationwide</div>
                  </motion.div>
                </div>
              </div>

              {/* Floating Icon Decoration */}
              <motion.div 
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute -top-10 -right-10 w-32 h-32 opacity-10 pointer-events-none"
              >
                <Globe size={128} className="text-blue-600" />
              </motion.div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Nationwide Section */}
      <section className="py-32 bg-zinc-50/50 overflow-hidden relative">
        {/* Abstract Background */}
        <div className="absolute inset-0 -z-0">
          <div className="absolute top-0 right-0 w-1/2 h-full bg-blue-50/50 rounded-l-[100px] blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            <div className="inline-block px-4 py-1 rounded-lg bg-blue-100 text-blue-700 text-sm font-bold mb-6">EXPANDING OUR REACH</div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-8 text-zinc-900">Growing From Local Support <br/><span className="text-blue-600">— To Nationwide Learning</span></h2>
            <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto mb-20 font-medium leading-relaxed">
              For years, we quietly helped people one-on-one. Today, Setwise Digital is launching nationwide — so anyone across the United States can learn technology at their own pace.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {[
                { 
                  icon: <BookOpen className="text-blue-600" />, 
                  title: "Self-Paced Learning",
                  text: "Learn technology comfortably without feeling rushed or judged." 
                },
                { 
                  icon: <MessageSquare className="text-blue-600" />, 
                  title: "Patient Support",
                  text: "Get clear answers in plain English whenever you need a helping hand." 
                },
                { 
                  icon: <UserCheck className="text-blue-600" />, 
                  title: "Build Confidence",
                  text: "Feel truly confident using the devices you already own and love." 
                }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  whileHover={{ y: -10 }}
                  className="bg-white p-12 rounded-[3rem] shadow-xl shadow-zinc-200/50 flex flex-col items-center gap-6 border border-zinc-100 group"
                >
                  <div className="w-20 h-20 rounded-[2rem] bg-blue-50 flex items-center justify-center group-hover:bg-blue-600 group-hover:scale-110 transition-all duration-500">
                    {item.icon}
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-black tracking-tight">{item.title}</h3>
                    <p className="text-lg font-medium text-zinc-500 leading-relaxed">{item.text}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] -z-0 pointer-events-none">
          <Globe size={1000} />
        </div>
      </section>

      {/* What We Help With */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-24">
            <div className="inline-block px-4 py-1 rounded-lg bg-indigo-50 text-indigo-700 text-sm font-bold mb-6 uppercase tracking-wider">Our Expertise</div>
            <h2 className="text-5xl md:text-7xl font-black tracking-tighter mb-8">What We Help With</h2>
            <p className="text-xl md:text-2xl text-zinc-600 max-w-3xl mx-auto font-medium">We focus on real-life technology needs — especially for seniors, families, and non-technical users.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[
              { 
                icon: <Printer className="text-blue-600" size={32} />, 
                title: "Printer Help & Setup", 
                features: ["Wi-Fi and network printer setup", "Secure document printing", "Troubleshooting paper jams & offline errors", "Step-by-step printer guides"],
                gradient: "from-blue-50 to-indigo-50"
              },
              { 
                icon: <Navigation className="text-blue-600" size={32} />, 
                title: "GPS & Map Updates", 
                features: ["GPS software and map updates", "Trip planning help", "Simple instructions anyone can follow", "Voice navigation setup"],
                gradient: "from-indigo-50 to-blue-50"
              },
              { 
                icon: <Camera className="text-blue-600" size={32} />, 
                title: "Camera & Firmware Guidance", 
                features: ["Camera updates and feature unlocks", "Performance improvements", "Friendly tutorials without the tech jargon", "Digital photo backup help"],
                gradient: "from-blue-50 to-indigo-50"
              },
              { 
                icon: <HomeIcon className="text-blue-600" size={32} />, 
                title: "Smart Home & Everyday Devices", 
                features: ["Smart device setup and connection", "Voice controls made easy", "Safer, simpler smart home learning", "Security camera basics"],
                gradient: "from-indigo-50 to-blue-50"
              }
            ].map((service, i) => (
              <motion.div 
                key={i}
                whileHover={{ y: -5 }}
                className="p-10 rounded-[3rem] bg-zinc-50 border border-zinc-100 group"
              >
                <div className="flex items-center gap-6 mb-8">
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-colors duration-300">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-extrabold">{service.title}</h3>
                </div>
                <ul className="space-y-4">
                  {service.features.map((feat, j) => (
                    <li key={j} className="flex items-start gap-3 text-zinc-600 font-medium">
                      <CheckCircle2 size={20} className="text-blue-600 mt-1 flex-shrink-0" />
                      {feat}
                    </li>
                  ))}
                </ul>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Differentiator Section: TechBridge */}
      <section className="py-32 bg-zinc-900 text-white overflow-hidden relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">What Makes Us Different</h2>
            <p className="text-xl text-zinc-400 max-w-3xl mx-auto">Working with users since 2016 taught us something: People don’t just want help once, they want tools they can come back to — anytime.</p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col">
              <BookOpen className="text-blue-400 mb-8" size={48} />
              <h3 className="text-2xl font-bold mb-4">Step-by-Step PDFs</h3>
              <p className="text-zinc-400 mb-10 flex-grow font-medium">Keep them. Re-read them. Learn anytime. Our guides are built for real life.</p>
              <Link href="/pricing" className="flex items-center gap-2 text-blue-400 font-bold group">
                Get free tech PDFs <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="p-10 rounded-[3rem] bg-blue-600 flex flex-col">
              <Zap className="text-white mb-8" size={48} />
              <h3 className="text-2xl font-bold mb-4">TechBridge Lessons</h3>
              <p className="text-blue-100 mb-10 flex-grow font-medium">Interactive lessons that explain, show, and guide — like a friendly tutor by your side.</p>
              <Link href="/techbridge" className="flex items-center gap-2 text-white font-bold group">
                Open TechBridge <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            <div className="p-10 rounded-[3rem] bg-white/5 border border-white/10 flex flex-col">
              <UserCheck className="text-blue-400 mb-8" size={48} />
              <h3 className="text-2xl font-bold mb-4">Real Consultants</h3>
              <p className="text-zinc-400 mb-10 flex-grow font-medium">When you need human support, our consultants listen first, explain clearly, and stay until you feel confident.</p>
              <Link href="/contact" className="flex items-center gap-2 text-blue-400 font-bold group">
                Talk to a Consultant <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Locations Section */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-20">
            <div className="lg:w-1/2">
              <h2 className="text-4xl font-extrabold mb-8">Where We Operate</h2>
              <p className="text-xl text-zinc-600 mb-12 font-medium">
                We proudly operate from physical hubs in Colorado and New Jersey, serving users across the entire United States with online learning and support.
              </p>
              <div className="space-y-6">
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <MapPin className="text-blue-600" size={24} />
                  <div>
                    <div className="font-bold text-lg">Colorado & New Jersey</div>
                    <div className="text-zinc-500 font-medium">Regional Support Hubs</div>
                  </div>
                </div>
                <div className="flex items-center gap-4 p-6 rounded-2xl bg-blue-600 text-white">
                  <Globe className="text-white" size={24} />
                  <div>
                    <div className="font-bold text-lg">Nationwide Support</div>
                    <div className="text-blue-100 font-medium">Serving the entire United States</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="lg:w-1/2 relative h-[400px] w-full bg-zinc-100 rounded-[3rem] overflow-hidden">
               <div className="absolute inset-0 flex items-center justify-center">
                  <MapPin size={120} className="text-blue-600 opacity-20" />
               </div>
               {/* Map Placeholder Graphic */}
               <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-transparent pointer-events-none" />
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-32 bg-zinc-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-extrabold mb-6">Our Values</h2>
            <p className="text-xl text-zinc-600 max-w-2xl mx-auto font-medium">We don’t judge. We don’t rush. We love hearing: “Wow — now I finally understand!”</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: <Heart className="text-red-500" />, title: "Respectful", desc: "We value your experience and treat every question with care." },
              { icon: <CheckCircle2 className="text-blue-600" />, title: "Simple", desc: "No tech jargon. Just plain English instructions that work." },
              { icon: <ShieldCheck className="text-green-600" />, title: "Pressure-Free", desc: "No upselling. No scare tactics. Just honest learning." },
              { icon: <Target className="text-purple-600" />, title: "Focused", desc: "Everything we do is built around your specific learning goals." }
            ].map((value, i) => (
              <div key={i} className="bg-white p-10 rounded-[2.5rem] shadow-sm text-center flex flex-col items-center gap-4 border border-zinc-100">
                <div className="w-16 h-16 rounded-2xl bg-zinc-50 flex items-center justify-center mb-4">
                  {value.icon}
                </div>
                <h3 className="text-xl font-bold">{value.title}</h3>
                <p className="text-zinc-500 font-medium">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Vision Section */}
      <section className="py-32 bg-white">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="bg-blue-600 rounded-[4rem] p-16 md:p-24 text-white relative overflow-hidden"
          >
            <div className="relative z-10">
              <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight">Our Vision</h2>
              <p className="text-xl md:text-2xl text-blue-100 mb-12 max-w-3xl mx-auto leading-relaxed font-medium">
                Technology will always change. Our mission will not: Help people feel safe, independent, and confident with everyday technology — anywhere in the nation.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                <Link href="/pricing" className="w-full sm:w-auto px-10 py-5 bg-white text-blue-600 rounded-2xl font-bold text-xl hover:shadow-2xl transition-all flex items-center justify-center">
                  Browse Packages
                </Link>
                <Link href="/contact" className="w-full sm:w-auto px-10 py-5 bg-blue-500 text-white rounded-2xl font-bold text-xl border-2 border-white/20 hover:bg-blue-400 transition-all flex items-center justify-center">
                  Contact Us
                </Link>
              </div>
            </div>
            {/* Abstract Background Decoration */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-48 h-48 bg-black/5 rounded-full translate-y-1/2 -translate-x-1/2" />
          </motion.div>
          <p className="mt-12 text-zinc-400 font-medium italic">Confidence is the real upgrade. We’re still improving — one learner, one family, one moment at a time.</p>
        </div>
      </section>

      <Footer />
    </div>
  );
}
