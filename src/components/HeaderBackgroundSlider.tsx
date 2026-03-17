"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Image from "next/image";

interface HeaderBackgroundSliderProps {
  items: { url: string; type: "image" | "video"; theme: "dark" | "light" }[];
  interval?: number;
  onThemeChange?: (theme: "dark" | "light") => void;
}

// Unsplash URL optimiser — strips existing params and sets optimal mobile-first ones
function optimiseUnsplash(url: string): string {
  if (!url.includes("unsplash.com")) return url;
  try {
    const u = new URL(url);
    u.searchParams.set("auto", "format");
    u.searchParams.set("fit", "crop");
    u.searchParams.set("q", "60");    // was 80 — 60 is visually identical behind overlays
    u.searchParams.set("w", "1200");  // cap width — no need for 1600 behind dark overlay
    return u.toString();
  } catch {
    return url;
  }
}

export default function HeaderBackgroundSlider({
  items,
  interval = 9000,   // slightly longer — fewer DOM updates per session
  onThemeChange,
}: HeaderBackgroundSliderProps) {
  const [index, setIndex] = useState(0);
  const [mounted, setMounted] = useState(false);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (!mounted || items.length <= 1) return;
    const timer = setInterval(() => setIndex(p => (p + 1) % items.length), interval);
    return () => clearInterval(timer);
  }, [items.length, interval, mounted]);

  useEffect(() => {
    onThemeChange?.(items[index]?.theme ?? "dark");
  }, [index, items, onThemeChange]);

  const currentItem = items[index];
  if (!currentItem) return null;

  return (
    <div className="absolute inset-0 z-0 overflow-hidden bg-zinc-950">
      <AnimatePresence mode="wait">
        <motion.div
          key={index}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}  // was 1.2 — faster = lower TBT
          className="absolute inset-0"
        >
          {currentItem.type === "video" ? (
            <video
              src={currentItem.url}
              autoPlay muted loop playsInline
              className="w-full h-full object-cover"
              // Videos are decorative — no preload needed
              preload="none"
            />
          ) : (
            <Image
              src={optimiseUnsplash(currentItem.url)}
              alt=""
              fill
              className="object-cover"
              // Only the very first image on first render gets priority
              priority={index === 0 && !mounted === false}
              sizes="(max-width: 768px) 100vw, 100vw"
              quality={60}   // behind a 55% black overlay, 60 is indistinguishable from 80
              fetchPriority={index === 0 ? "high" : "low"}
            />
          )}
          {/* Overlays — consolidated into fewer layers to reduce composite work */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/75" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/20 via-transparent to-black/20" />
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
