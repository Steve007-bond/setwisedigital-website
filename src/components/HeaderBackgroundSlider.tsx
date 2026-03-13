"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface HeaderBackgroundSliderProps {
  items: { url: string; type: 'image' | 'video'; theme: 'dark' | 'light' }[];
  interval?: number;
  onThemeChange?: (theme: 'dark' | 'light') => void;
}

export default function HeaderBackgroundSlider({ items, interval = 8000, onThemeChange }: HeaderBackgroundSliderProps) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, interval);
    return () => clearInterval(timer);
  }, [items.length, interval]);

  useEffect(() => {
    if (onThemeChange) {
      onThemeChange(items[index].theme);
    }
  }, [index, items, onThemeChange]);

  const currentItem = items[index];

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0, scale: 1.1 }}
          animate={{ opacity: 0.8, scale: 1.05 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 2, ease: "easeInOut" }}
          className="absolute inset-0"
        >
          {currentItem.type === 'video' ? (
            <video
              src={currentItem.url}
              autoPlay
              muted
              loop
              playsInline
              className="w-full h-full object-cover"
            />
          ) : (
            <Image
              src={currentItem.url}
              alt="Background"
              fill
              className="object-cover"
              priority
              unoptimized
            />
          )}
          {/* Subtle Overlay to ensure text readability */}
          <div className={`absolute inset-0 ${currentItem.theme === 'dark' ? 'bg-black/40' : 'bg-white/20'}`} />
          <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-zinc-950/20" />
        </motion.div>
      </AnimatePresence>
      
      {/* Mesh Gradient Overlay for consistent branding - lowered opacity */}
      <div className="absolute inset-0 mesh-gradient opacity-10 mix-blend-overlay" />
    </div>
  );
}

