"use client";

import { motion } from "framer-motion";
import Image from "next/image";

/* ═══════════════════════════════════════════════════════════════════════════
   HERO CHARACTER — Reusable animated wrapper for 3D character images
   
   Usage:
   <HeroCharacter
     src="/Images/hero-printers.jpeg"
     alt="Printer setup character"
     accentColor="#2563eb"
     glowColor="#2563eb"
     floatingIcons={["🖨️", "📄", "📶", "💧"]}
     speechBubble="Let's fix your printer!"
   />
   ═══════════════════════════════════════════════════════════════════════════ */

interface HeroCharacterProps {
  /** Path to the 3D character image */
  src: string;
  /** Alt text for accessibility */
  alt: string;
  /** Primary accent color hex (e.g. "#2563eb") */
  accentColor: string;
  /** Glow color hex — usually same as accent (e.g. "#2563eb") */
  glowColor?: string;
  /** 4 floating emoji icons around the character */
  floatingIcons?: string[];
  /** Optional speech bubble text */
  speechBubble?: string;
  /** Optional secondary accent for orbital rings */
  ringColor?: string;
  /** Size variant */
  size?: "default" | "large" | "compact";
}

export default function HeroCharacter({
  src,
  alt,
  accentColor,
  glowColor,
  floatingIcons = [],
  speechBubble,
  ringColor,
  size = "default",
}: HeroCharacterProps) {
  const glow = glowColor || accentColor;
  const ring = ringColor || accentColor;

  const sizeClasses = {
    compact: "max-w-[380px]",
    default: "max-w-[480px]",
    large: "max-w-[560px]",
  };

  return (
    <div className={`relative ${sizeClasses[size]} mx-auto w-full`}>
      {/* ── Ambient glow behind everything ── */}
      <div
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[80%] rounded-full blur-[80px] pointer-events-none"
        style={{ backgroundColor: `${glow}18` }}
      />

      {/* ── Orbital rings ── */}
      <div className="absolute inset-0 pointer-events-none">
        {[
          { size: "70%", dur: 25, dir: 1, opacity: 0.08 },
          { size: "85%", dur: 35, dir: -1, opacity: 0.06 },
          { size: "100%", dur: 45, dir: 1, opacity: 0.04 },
        ].map((r, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full border"
            style={{
              width: r.size,
              height: r.size,
              top: `calc(50% - ${parseInt(r.size) / 2}%)`,
              left: `calc(50% - ${parseInt(r.size) / 2}%)`,
              borderColor: `${ring}${Math.round(r.opacity * 255)
                .toString(16)
                .padStart(2, "0")}`,
            }}
            animate={{ rotate: r.dir * 360 }}
            transition={{
              duration: r.dur,
              repeat: Infinity,
              ease: "linear",
            }}
          />
        ))}
      </div>

      {/* ── Floating emoji icons ── */}
      {floatingIcons.slice(0, 4).map((emoji, i) => {
        const tops = ["5%", "8%", undefined, undefined];
        const bottoms = [undefined, undefined, "15%", "10%"];
        const lefts = ["0%", undefined, "2%", undefined];
        const rights = [undefined, "2%", undefined, "0%"];
        const delays = [0, 0.6, 1.2, 0.9];
        return (
          <motion.div
            key={i}
            className="absolute z-20 pointer-events-none"
            style={{
              top: tops[i],
              bottom: bottoms[i],
              left: lefts[i],
              right: rights[i],
            }}
            animate={{
              y: [0, -14, 0],
              rotate: [0, i % 2 === 0 ? 8 : -8, 0],
            }}
            transition={{
              duration: 3.5 + i * 0.5,
              repeat: Infinity,
              ease: "easeInOut",
              delay: delays[i],
            }}
          >
            <div
              className="w-11 h-11 md:w-13 md:h-13 rounded-2xl backdrop-blur-md border flex items-center justify-center text-lg md:text-xl shadow-lg"
              style={{
                backgroundColor: `${accentColor}12`,
                borderColor: `${accentColor}25`,
              }}
            >
              {emoji}
            </div>
          </motion.div>
        );
      })}

      {/* ── Floating particles ── */}
      {[...Array(8)].map((_, i) => (
        <motion.div
          key={`p-${i}`}
          className="absolute rounded-full pointer-events-none"
          style={{
            width: `${3 + (i % 3) * 2}px`,
            height: `${3 + (i % 3) * 2}px`,
            left: `${(i * 23 + 10) % 90}%`,
            top: `${(i * 29 + 5) % 85}%`,
            backgroundColor: accentColor,
          }}
          animate={{
            opacity: [0, 0.6, 0],
            y: [-6, 8, -6],
            scale: [0.8, 1.2, 0.8],
          }}
          transition={{
            duration: 3 + (i % 3) * 1.5,
            repeat: Infinity,
            delay: i * 0.5,
          }}
        />
      ))}

      {/* ── Speech bubble ── */}
      {speechBubble && (
        <motion.div
          className="absolute top-2 left-2 md:top-4 md:left-4 z-30"
          animate={{ y: [0, -6, 0], opacity: [0.9, 1, 0.9] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div
            className="px-4 py-2.5 rounded-2xl rounded-bl-sm text-xs md:text-sm font-bold text-white shadow-xl max-w-[180px]"
            style={{
              background: `linear-gradient(135deg, ${accentColor}, ${accentColor}cc)`,
              boxShadow: `0 8px 32px ${accentColor}40`,
            }}
          >
            {speechBubble}
          </div>
          {/* Bubble tail */}
          <div
            className="w-3 h-3 ml-4 -mt-1 rotate-45"
            style={{ backgroundColor: `${accentColor}cc` }}
          />
        </motion.div>
      )}

      {/* ── Main character image ── */}
      <motion.div
        className="relative z-10"
        animate={{ y: [0, -8, 0] }}
        transition={{
          duration: 5,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        {/* Glow ring behind image */}
        <div
          className="absolute inset-0 rounded-3xl blur-2xl pointer-events-none"
          style={{
            background: `radial-gradient(circle, ${glow}15 0%, transparent 70%)`,
          }}
        />

        {/* The actual image */}
        <div className="relative rounded-2xl md:rounded-3xl overflow-hidden">
          <Image
            src={src}
            alt={alt}
            width={960}
            height={540}
            className="w-full h-auto object-contain"
            priority
            quality={90}
          />

          {/* Bottom fade for seamless blend */}
          <div
            className="absolute bottom-0 left-0 right-0 h-16 pointer-events-none"
            style={{
              background: `linear-gradient(to top, var(--hero-bg, transparent), transparent)`,
            }}
          />
        </div>
      </motion.div>

      {/* ── Accent glow dots on the image edges ── */}
      <motion.div
        className="absolute top-1/4 -left-2 w-2 h-2 rounded-full z-20"
        style={{ backgroundColor: accentColor }}
        animate={{ opacity: [0.3, 0.8, 0.3], scale: [0.8, 1.3, 0.8] }}
        transition={{ duration: 2, repeat: Infinity }}
      />
      <motion.div
        className="absolute top-1/3 -right-2 w-1.5 h-1.5 rounded-full z-20"
        style={{ backgroundColor: accentColor }}
        animate={{ opacity: [0.2, 0.7, 0.2], scale: [0.8, 1.4, 0.8] }}
        transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
      />
      <motion.div
        className="absolute bottom-1/4 -left-1 w-1 h-1 rounded-full z-20"
        style={{ backgroundColor: accentColor }}
        animate={{ opacity: [0.4, 0.9, 0.4] }}
        transition={{ duration: 1.8, repeat: Infinity, delay: 1 }}
      />
    </div>
  );
}
