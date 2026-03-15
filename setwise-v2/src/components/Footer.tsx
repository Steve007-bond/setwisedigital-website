"use client";

import { Mail, BookOpen, ChevronRight, ArrowRight, Heart } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-white pt-32 pb-16 relative overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blue-500/50 to-transparent" />
      <motion.div 
        animate={{ 
          scale: [1, 1.2, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{ duration: 10, repeat: Infinity }}
        className="absolute bottom-[-10%] right-[-5%] w-[500px] h-[500px] bg-blue-600/20 rounded-full blur-[120px]" 
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-16 mb-24">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-3 group">
              <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center group-hover:rotate-6 transition-transform">
                <span className="font-black text-xl">S</span>
              </div>
              <span className="font-extrabold text-2xl tracking-tighter">Setwise Digital</span>
            </Link>
            <p className="text-zinc-400 font-medium leading-relaxed text-lg">
              Patient technology guidance for real life. Since 2016, we’ve been helping families and seniors master their devices with confidence.
            </p>
            <div className="flex gap-4">
              <motion.div whileHover={{ scale: 1.1 }} className="w-12 h-12 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-blue-600 transition-colors">
                <Mail size={20} />
              </motion.div>
            </div>
          </div>

          <div>
            <h4 className="font-black text-xl mb-8 tracking-tight">Quick Links</h4>
            <ul className="space-y-4 font-bold text-zinc-400">
              {['About Us', 'TechBridge', 'Pricing', 'Contact'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().replace(' ', '')}`} className="hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <ChevronRight size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="font-black text-xl mb-8 tracking-tight">Resources</h4>
            <ul className="space-y-4 font-bold text-zinc-400">
              {['Privacy Policy', 'Terms of Service', 'Disclaimer'].map((item) => (
                <li key={item}>
                  <Link href={`/${item.toLowerCase().split(' ')[0]}`} className="hover:text-white hover:translate-x-2 transition-all flex items-center gap-2 group">
                    <ChevronRight size={16} className="text-blue-500 opacity-0 group-hover:opacity-100 transition-all" />
                    {item}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="bg-white/5 p-8 rounded-[2.5rem] border border-white/10">
            <h4 className="font-black text-xl mb-6 tracking-tight">Ready to Learn?</h4>
            <p className="text-zinc-400 font-bold mb-8 text-sm leading-relaxed">Discover plain-English tech courses and free learning guides.</p>
            <Link href="/pricing" className="shine-effect flex items-center justify-center gap-2 bg-blue-600 text-white px-6 py-4 rounded-2xl font-black text-sm uppercase tracking-widest hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20">
              Browse Courses <ArrowRight size={16} />
            </Link>
          </div>
        </div>

        {/* Compliance Disclaimer */}
        <div className="pt-12 border-t border-white/5">
          <div className="bg-white/3 border border-white/10 rounded-2xl p-6 mb-8">
            <p className="text-zinc-500 text-xs font-medium leading-relaxed text-center">
              <span className="text-zinc-400 font-bold">Independent Educational Platform.</span>{" "}
              Setwise Digital is an independent tech literacy and education platform. We are not affiliated with, endorsed by, or representing any device manufacturer including HP, Canon, Epson, Brother, Garmin, TomTom, Amazon, Google, or Apple. All brand names and product names are trademarks of their respective owners and are referenced solely for educational identification purposes.
            </p>
          </div>
          <div className="flex flex-col md:flex-row justify-between items-center gap-8">
            <p className="text-zinc-500 font-bold">© 2026 Setwise Digital. All rights reserved.</p>
            <div className="flex items-center gap-2 text-zinc-500 font-bold">
              Built with <Heart size={16} className="text-red-500 fill-red-500" /> for lifelong learners
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
