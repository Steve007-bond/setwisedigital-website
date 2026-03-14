"use client";

import { motion, useScroll, useMotionValueEvent } from "framer-motion";
import Link from "next/link";
import { Menu, X, Zap } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = usePathname();
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 20);
  });

  const navLinks = [
    { href: "/about", label: "About Us" },
    { href: "/techbridge", label: "TechBridge" },
    { href: "/pricing", label: "Pricing" },
    { href: "/contact", label: "Contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-[100] transition-all duration-500 ${
      scrolled
        ? "bg-white/95 backdrop-blur-xl shadow-lg shadow-zinc-900/5 border-b border-zinc-200/60"
        : "bg-transparent border-b border-transparent"
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-all duration-300">
            <span className="text-white font-black text-xl">S</span>
          </div>
          <span className={`font-extrabold text-2xl tracking-tighter transition-colors group-hover:text-blue-600 ${scrolled ? "text-zinc-900" : "text-white"}`}>
            Setwise Digital
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-8 text-sm font-bold">
          {navLinks.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(link.href + "/");
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`relative transition-all hover:translate-y-[-1px] group ${
                  scrolled
                    ? isActive ? "text-blue-600" : "text-zinc-500 hover:text-blue-600"
                    : isActive ? "text-white" : "text-white/70 hover:text-white"
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-0.5 bg-blue-500 rounded-full transition-all duration-300 ${isActive ? "w-full" : "w-0 group-hover:w-full"}`} />
              </Link>
            );
          })}
          <Link
            href="/pricing"
            className="flex items-center gap-2 bg-blue-600 text-white px-6 py-2.5 rounded-xl hover:bg-blue-700 transition-all shadow-md hover:shadow-blue-500/30 active:scale-95 group"
          >
            <Zap size={14} className="group-hover:rotate-12 transition-transform" />
            Browse Packages
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className={`lg:hidden p-2 transition-colors ${scrolled ? "text-zinc-900 hover:text-blue-600" : "text-white hover:text-blue-300"}`}
          aria-label="Toggle menu"
        >
          <motion.div animate={{ rotate: isOpen ? 90 : 0 }} transition={{ duration: 0.2 }}>
            {isOpen ? <X size={28} /> : <Menu size={28} />}
          </motion.div>
        </button>
      </div>

      {/* Mobile Nav Overlay */}
      <motion.div
        initial={false}
        animate={isOpen ? { height: "auto", opacity: 1 } : { height: 0, opacity: 0 }}
        className="lg:hidden bg-white border-b border-zinc-100 overflow-hidden shadow-xl"
      >
        <div className="flex flex-col p-6 gap-4 font-bold text-lg text-zinc-600">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setIsOpen(false)}
                className={`flex items-center gap-2 py-2 px-4 rounded-xl transition-all ${
                  isActive ? "bg-blue-50 text-blue-600" : "hover:bg-zinc-50 hover:text-blue-600"
                }`}
              >
                {isActive && <span className="w-1.5 h-1.5 rounded-full bg-blue-600" />}
                {link.label}
              </Link>
            );
          })}
          <Link
            href="/pricing"
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center gap-2 bg-blue-600 text-white p-4 rounded-2xl text-center shadow-lg shadow-blue-500/20 hover:bg-blue-700 transition-colors"
          >
            <Zap size={16} />
            Browse Packages
          </Link>
        </div>
      </motion.div>
    </nav>
  );
}
