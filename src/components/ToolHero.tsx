"use client";

import { motion } from "framer-motion";
import HeaderBackgroundSlider from "@/components/HeaderBackgroundSlider";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { useState } from "react";

interface ToolHeroProps {
  badge: string;
  badgeIcon: string;
  title: string;
  titleAccent: string;
  accentGradient: string;
  description: string;
  trustSignals: { icon: string; text: string }[];
  backgrounds: { url: string; type: "image" | "video"; theme: "dark" | "light" }[];
  breadcrumb: { label: string; href: string }[];
}

export default function ToolHero({
  badge, badgeIcon, title, titleAccent, accentGradient,
  description, trustSignals, backgrounds, breadcrumb,
}: ToolHeroProps) {
  const [, setTheme] = useState<"dark" | "light">("dark");

  return (
    <header className="relative pt-44 pb-32 overflow-hidden">
      {/* Background slider — exact same pattern as About/Homepage */}
      <HeaderBackgroundSlider items={backgrounds} interval={8000} onThemeChange={setTheme} />

      {/* Extra dark overlay for readability */}
      <div className="absolute inset-0 -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-base text-zinc-400 font-medium mb-8">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <ChevronRight size={16} />
          <Link href="/tools" className="hover:text-white transition-colors">Free Tools</Link>
          {breadcrumb.map((crumb) => (
            <span key={crumb.href} className="flex items-center gap-2">
              <ChevronRight size={16} />
              <span className="text-zinc-200">{crumb.label}</span>
            </span>
          ))}
        </nav>

        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.1 }}
          className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-white/10 border border-white/20 text-white text-sm font-black uppercase tracking-widest mb-8"
        >
          <span>{badgeIcon}</span> {badge}
        </motion.div>

        {/* Headline */}
        <div className="max-w-4xl">
          <h1 className="text-5xl md:text-7xl font-black leading-none tracking-tighter mb-6 text-white">
            {["", title].map((_, i) =>
              i === 0 ? null : (
                <motion.span
                  key={i}
                  className="block"
                  initial={{ opacity: 0, filter: "blur(8px)" }}
                  animate={{ opacity: 1, filter: "blur(0px)" }}
                  transition={{ delay: 0.2, duration: 0.8 }}
                >
                  {title}
                </motion.span>
              )
            )}
            <motion.span
              className={`block bg-gradient-to-r ${accentGradient} bg-clip-text text-transparent italic`}
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.35, duration: 0.8 }}
            >
              {titleAccent}
            </motion.span>
          </h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-xl md:text-2xl text-zinc-300 font-medium leading-relaxed mb-8 max-w-2xl"
          >
            {description}
          </motion.p>

          {/* Trust signals */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="flex flex-wrap gap-6"
          >
            {trustSignals.map((item) => (
              <div key={item.text} className="flex items-center gap-2 text-base font-semibold text-zinc-300">
                <span>{item.icon}</span>{item.text}
              </div>
            ))}
          </motion.div>
        </div>
      </div>

      {/* Bottom fade into dark body */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-[#0d1117] to-transparent" />
    </header>
  );
}
