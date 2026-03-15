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
      setIndex((prev: number) => (prev + 1) % items.length);
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
          initial={{ opacity: 0, scale: 1.08 }}
          animate={{ opacity: 1, scale: 1.03 }}
          exit={{ opacity: 0, scale: 1 }}
          transition={{ duration: 1.8, ease: "easeInOut" }}
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

          {/* Strong consistent dark overlay — always ensures white text is readable */}
          <div className="absolute inset-0 bg-black/55" />

          {/* Extra gradient from bottom for depth */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/30" />

          {/* Side vignette for focus */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/30 via-transparent to-black/30" />
        </motion.div>
      </AnimatePresence>

      {/* Subtle brand mesh overlay */}
      <div className="absolute inset-0 mesh-gradient opacity-8 mix-blend-overlay pointer-events-none" />
    </div>
  );
}
