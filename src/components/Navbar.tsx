"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="fixed top-0 w-full z-[100] border-b border-zinc-200/50 glass transition-all duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <span className="text-white font-black text-xl">S</span>
          </div>
          <span className="font-extrabold text-2xl tracking-tighter text-zinc-900 group-hover:text-blue-600 transition-colors">Setwise Digital</span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold text-zinc-500">
          <Link href="/about" className="hover:text-blue-600 transition-all hover:translate-y-[-1px]">About Us</Link>
          <Link href="/techbridge" className="hover:text-blue-600 transition-all hover:translate-y-[-1px]">TechBridge</Link>
          <Link href="/pricing" className="hover:text-blue-600 transition-all hover:translate-y-[-1px]">Pricing</Link>
          <Link href="/contact" className="hover:text-blue-600 transition-all hover:translate-y-[-1px]">Contact</Link>
          <Link href="/pricing" className="bg-zinc-900 text-white px-6 py-2.5 rounded-xl hover:bg-blue-600 transition-all shadow-md hover:shadow-blue-500/25 active:scale-95">
            Browse Packages
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button 
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden p-2 text-zinc-900 hover:text-blue-600 transition-colors"
        >
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <motion.div 
        initial={false}
        animate={isOpen ? { height: 'auto', opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden bg-white border-b border-zinc-100 overflow-hidden"
      >
        <div className="flex flex-col p-6 gap-6 font-bold text-lg text-zinc-600">
          <Link href="/about" onClick={() => setIsOpen(false)} className="hover:text-blue-600">About Us</Link>
          <Link href="/techbridge" onClick={() => setIsOpen(false)} className="hover:text-blue-600">TechBridge</Link>
          <Link href="/pricing" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Pricing</Link>
          <Link href="/contact" onClick={() => setIsOpen(false)} className="hover:text-blue-600">Contact</Link>
          <Link 
            href="/pricing" 
            onClick={() => setIsOpen(false)}
            className="bg-blue-600 text-white p-4 rounded-2xl text-center shadow-lg shadow-blue-500/20"
          >
            Browse Packages
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}
