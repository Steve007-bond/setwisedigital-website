"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

export interface HeroFrame {
  headline: string;         // dynamic H1 headline shown on the left
  visualLabel: string;      // label inside the visual card
  visualSub: string;        // sub-label inside the visual card  
  emoji: string;            // large emoji in the visual
  color: string;            // hex accent color
  particles: string[];      // floating emoji particles
  svgType: "printer" | "gps" | "shield" | "home" | "camera" | "mic";
}

// ── SVG devices ──────────────────────────────────────────────────────────────

function PrinterDevice({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 180" className="w-full h-full">
      {/* Paper tray */}
      <motion.rect x="50" y="105" width="100" height="55" rx="6" fill="#1e293b" stroke="#334155" strokeWidth="1.5"
        animate={{ y: [105, 100, 105] }} transition={{ duration: 3, repeat: Infinity }} />
      {/* Printer body */}
      <rect x="30" y="60" width="140" height="60" rx="8" fill="#0f172a" stroke="#1e40af" strokeWidth="1.5" />
      {/* Paper slot */}
      <rect x="45" y="95" width="110" height="8" rx="3" fill="#1e3a5f" />
      {/* Paper coming out */}
      <motion.rect x="65" y="80" width="70" height="3" rx="1.5" fill="white" opacity="0.9"
        initial={{ y: 85, opacity: 0 }} animate={{ y: [85, 65, 50], opacity: [0, 1, 0] }}
        transition={{ duration: 2, repeat: Infinity, delay: 0.5 }} />
      {/* Status light */}
      <motion.circle cx="155" cy="80" r="5" fill={color}
        animate={{ opacity: [0.4, 1, 0.4] }} transition={{ duration: 1.5, repeat: Infinity }} />
      {/* Wi-Fi rings */}
      {[10, 18, 26].map((r, i) => (
        <motion.circle key={i} cx="100" cy="45" r={r} fill="none" stroke={color} strokeWidth="1.2"
          animate={{ opacity: [0, 0.7, 0], scale: [0.7, 1.3, 1.8] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }}
          style={{ transformOrigin: "100px 45px" }} />
      ))}
      {/* Ink dots */}
      {[{ c: "#06b6d4", x: 70 }, { c: "#ec4899", x: 85 }, { c: "#eab308", x: 100 }, { c: "#374151", x: 115 }].map((d, i) => (
        <motion.circle key={i} cx={d.x} cy={20} r="4" fill={d.c}
          animate={{ cy: [20, 48, 20], opacity: [0, 1, 0] }}
          transition={{ duration: 1.6, repeat: Infinity, delay: i * 0.25, type: "spring", stiffness: 300 }} />
      ))}
      {/* Connecting arc */}
      <motion.path d="M 75 45 Q 100 25 125 45" fill="none" stroke={color} strokeWidth="1.5" strokeDasharray="40"
        animate={{ strokeDashoffset: [40, 0, -40] }} transition={{ duration: 2, repeat: Infinity }} />
    </svg>
  );
}

function GPSDevice({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Device body */}
      <rect x="60" y="20" width="80" height="130" rx="12" fill="#0d1117" stroke="#1e3a5f" strokeWidth="2" />
      <rect x="68" y="30" width="64" height="95" rx="6" fill="#0a1628" />
      {/* Road on screen */}
      <line x1="100" y1="35" x2="100" y2="120" stroke="#1e40af" strokeWidth="6" strokeLinecap="round" />
      <motion.line x1="100" y1="60" x2="100" y2="80" stroke="white" strokeWidth="2" strokeDasharray="8 8"
        animate={{ strokeDashoffset: [0, -32] }} transition={{ duration: 0.8, repeat: Infinity, ease: "linear" }} />
      {/* Map pin bounce */}
      <motion.g animate={{ y: [0, -6, 0] }} transition={{ duration: 2, repeat: Infinity }}>
        <circle cx="100" cy="80" r="8" fill={color} />
        <circle cx="100" cy="80" r="4" fill="white" />
        {[1, 2].map(i => (
          <motion.circle key={i} cx="100" cy="80" r={i * 12} fill="none" stroke={color} strokeWidth="1.2"
            animate={{ opacity: [0.8, 0], scale: [0.5, 1.5] }}
            transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.35 }} />
        ))}
      </motion.g>
      {/* Route drawing */}
      <motion.path d="M 80 110 Q 100 88 120 70" fill="none" stroke={color} strokeWidth="2" strokeDasharray="80"
        animate={{ strokeDashoffset: [80, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }} />
      {/* Mount arm */}
      <rect x="92" y="150" width="16" height="28" rx="3" fill="#1e293b" />
      <rect x="80" y="174" width="40" height="7" rx="3.5" fill="#1e293b" />
      {/* Side buttons */}
      <circle cx="62" cy="100" r="5" fill="#1e3a5f" />
      <circle cx="138" cy="100" r="5" fill="#1e3a5f" />
      {/* Satellite signal */}
      {[1, 2, 3].map(i => (
        <motion.line key={i} x1="100" y1="20" x2={100 + (i-2)*30} y2={-5 + i*5} stroke={color} strokeWidth="1"
          animate={{ opacity: [0, 0.8, 0] }} transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.3 }} />
      ))}
    </svg>
  );
}

function ShieldDevice({ color }: { color: string }) {
  const [scanLine, setScanLine] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setScanLine(s => (s + 1) % 100), 20);
    return () => clearInterval(t);
  }, []);
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full">
      {/* Shield */}
      <motion.path d="M100 15 L165 45 L165 100 Q165 155 100 185 Q35 155 35 100 L35 45 Z"
        fill="#1a0000" stroke={color} strokeWidth="2.5"
        animate={{ filter: [`drop-shadow(0 0 6px ${color}40)`, `drop-shadow(0 0 18px ${color}70)`, `drop-shadow(0 0 6px ${color}40)`] }}
        transition={{ duration: 2, repeat: Infinity }} />
      {/* Scan line effect */}
      <clipPath id="shieldClip">
        <path d="M100 15 L165 45 L165 100 Q165 155 100 185 Q35 155 35 100 L35 45 Z" />
      </clipPath>
      <motion.rect x="35" y={35 + scanLine * 1.5} width="130" height="3" fill={color} opacity="0.15" clipPath="url(#shieldClip)"
        animate={{ opacity: [0.1, 0.25, 0.1] }} transition={{ duration: 0.1 }} />
      {/* Lock */}
      <rect x="80" y="95" width="40" height="32" rx="5" fill={color} opacity="0.9" />
      <path d="M88 95 L88 83 Q88 70 100 70 Q112 70 112 83 L112 95" fill="none" stroke={color} strokeWidth="6" strokeLinecap="round" />
      <circle cx="100" cy="110" r="5" fill="#1a0000" />
      <rect x="97" y="113" width="6" height="8" rx="2" fill="#1a0000" />
      {/* Pulse rings */}
      {[1, 2, 3].map(i => (
        <motion.path key={i} d="M100 15 L165 45 L165 100 Q165 155 100 185 Q35 155 35 100 L35 45 Z"
          fill="none" stroke={color} strokeWidth="1"
          animate={{ opacity: [0, 0.4, 0], scale: [0.85, 1.25] }}
          transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }}
          style={{ transformOrigin: "100px 100px" }} />
      ))}
    </svg>
  );
}

function HomeDevice({ color }: { color: string }) {
  const [lit, setLit] = useState([0, 2]);
  useEffect(() => {
    const rooms = [0, 1, 2, 3];
    const t = setInterval(() => {
      const r = rooms[Math.floor(Math.random() * rooms.length)];
      setLit(prev => prev.includes(r) ? prev.filter(x => x !== r) : [...prev, r]);
    }, 1200);
    return () => clearInterval(t);
  }, []);
  const rooms = [
    { x: 10, y: 10, w: 85, h: 85, col: color, label: "Living" },
    { x: 105, y: 10, w: 85, h: 85, col: "#06b6d4", label: "Bedroom" },
    { x: 10, y: 105, w: 85, h: 85, col: "#16a34a", label: "Kitchen" },
    { x: 105, y: 105, w: 85, h: 85, col: "#8b5cf6", label: "Entry" },
  ];
  return (
    <svg viewBox="0 0 200 200" className="w-full h-full cursor-pointer">
      <rect x="5" y="5" width="190" height="190" rx="8" fill="none" stroke="#1e293b" strokeWidth="1.5" />
      {rooms.map((room, i) => (
        <g key={i} onClick={() => setLit(prev => prev.includes(i) ? prev.filter(x => x !== i) : [...prev, i])}>
          <motion.rect x={room.x} y={room.y} width={room.w} height={room.h} rx="4"
            animate={{ fill: lit.includes(i) ? room.col + "28" : "#0f172a" }} transition={{ duration: 0.3 }} />
          <rect x={room.x} y={room.y} width={room.w} height={room.h} rx="4" fill="none"
            stroke={lit.includes(i) ? room.col : "#1e293b"} strokeWidth="1.5" />
          {lit.includes(i) && (
            <>
              <motion.circle cx={room.x + room.w / 2} cy={room.y + 18} r="7" fill={room.col}
                animate={{ opacity: [0.6, 1, 0.6] }} transition={{ duration: 1.5, repeat: Infinity }} />
              {[1, 2].map(j => (
                <motion.circle key={j} cx={room.x + room.w / 2} cy={room.y + 18} r={j * 14} fill="none"
                  stroke={room.col} strokeWidth="0.7"
                  animate={{ opacity: [0.3, 0], scale: [0.7, 1.5] }}
                  transition={{ duration: 1.5, repeat: Infinity, delay: j * 0.3 }} />
              ))}
            </>
          )}
          <text x={room.x + room.w / 2} y={room.y + room.h - 8} fill={lit.includes(i) ? room.col : "#475569"}
            fontSize="8" textAnchor="middle" fontWeight="bold">{room.label}</text>
        </g>
      ))}
      <line x1="100" y1="5" x2="100" y2="195" stroke="#1e293b" strokeWidth="1.5" />
      <line x1="5" y1="100" x2="195" y2="100" stroke="#1e293b" strokeWidth="1.5" />
      {/* Router centre */}
      <rect x="88" y="88" width="24" height="24" rx="5" fill="#2563eb" />
      {[1, 2].map(i => (
        <motion.circle key={i} cx="100" cy="100" r={i * 14} fill="none" stroke="#2563eb" strokeWidth="0.8"
          animate={{ opacity: [0.5, 0] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.5 }} />
      ))}
    </svg>
  );
}

function CameraDevice({ color }: { color: string }) {
  return (
    <svg viewBox="0 0 220 180" className="w-full h-full">
      {/* Body */}
      <rect x="20" y="45" width="180" height="115" rx="14" fill="#1e1b4b" stroke="#4c1d95" strokeWidth="2" />
      {/* Top bump */}
      <rect x="65" y="28" width="90" height="26" rx="7" fill="#1e1b4b" stroke="#4c1d95" strokeWidth="1.5" />
      {/* Lens stack */}
      <circle cx="105" cy="105" r="46" fill="#0f0a1e" stroke="#4c1d95" strokeWidth="2.5" />
      <circle cx="105" cy="105" r="35" fill="#080512" stroke="#7c3aed" strokeWidth="1.5" />
      <circle cx="105" cy="105" r="24" fill="#040210" stroke="#8b5cf6" strokeWidth="1.5" />
      <circle cx="105" cy="105" r="10" fill="#020108" />
      {/* Lens glint */}
      <circle cx="96" cy="96" r="6" fill="#4c1d95" opacity="0.7" />
      <circle cx="93" cy="93" r="3" fill="white" opacity="0.35" />
      {/* Rotating aperture */}
      {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, i) => (
        <motion.line key={i} x1="105" y1="105"
          x2={105 + Math.cos(angle * Math.PI / 180) * 18}
          y2={105 + Math.sin(angle * Math.PI / 180) * 18}
          stroke="#7c3aed" strokeWidth="1" opacity="0.4"
          animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
          style={{ transformOrigin: "105px 105px" }} />
      ))}
      {/* Flash */}
      <rect x="170" y="55" width="22" height="16" rx="4" fill="#312e81" />
      <motion.rect x="170" y="55" width="22" height="16" rx="4" fill="white" opacity="0"
        animate={{ opacity: [0, 0.9, 0] }} transition={{ duration: 3.5, repeat: Infinity, delay: 2 }} />
      {/* Shutter button */}
      <circle cx="86" cy="36" r="7" fill={color} opacity="0.8" />
      <motion.circle cx="86" cy="36" r="7" fill={color}
        animate={{ opacity: [0.5, 1, 0.5] }} transition={{ duration: 2, repeat: Infinity }} />
      {/* Outer rings */}
      {[1, 2, 3].map(i => (
        <motion.circle key={i} cx="105" cy="105" r={i * 16 + 24} fill="none" stroke={color} strokeWidth="0.4" opacity="0.2"
          animate={{ opacity: [0.05, 0.25, 0.05] }} transition={{ duration: 2, repeat: Infinity, delay: i * 0.4 }} />
      ))}
    </svg>
  );
}

function MicDevice({ color }: { color: string }) {
  const [listening, setListening] = useState(false);
  useEffect(() => {
    const t = setInterval(() => setListening(l => !l), 3000);
    return () => clearInterval(t);
  }, []);
  return (
    <svg viewBox="0 0 200 220" className="w-full h-full">
      {/* Echo cylinder */}
      <motion.rect x="75" y="30" width="50" height="130" rx="25"
        fill="url(#echoGrad)"
        animate={{ scale: listening ? 1.03 : 1 }} transition={{ type: "spring", stiffness: 300 }}>
      </motion.rect>
      <defs>
        <linearGradient id="echoGrad" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#1e293b" />
          <stop offset="100%" stopColor="#0f172a" />
        </linearGradient>
      </defs>
      {/* Ring light */}
      <motion.rect x="75" y="30" width="50" height="12" rx="6"
        fill={listening ? color : "#1e3a5f"}
        animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: listening ? 0.8 : 3, repeat: Infinity }} />
      {/* Texture lines */}
      {[0,1,2,3,4,5,6,7].map(i => (
        <line key={i} x1="75" y1={50 + i*14} x2="125" y2={50 + i*14} stroke="white" strokeWidth="0.5" opacity="0.06" />
      ))}
      {/* Base */}
      <ellipse cx="100" cy="160" rx="30" ry="8" fill="#0f172a" stroke="#1e293b" strokeWidth="1" />
      {/* Sound waveform */}
      <g transform="translate(100, 185)">
        {[...Array(28)].map((_, i) => {
          const amp = listening ? 1 : 0.25;
          const h = (Math.sin(i * 0.6) * 16 + 18) * amp;
          return (
            <motion.rect key={i} x={i * 4 - 56} y={-h / 2} width="3" height={h} rx="1.5" fill={color}
              animate={{ height: [(Math.sin(i * 0.6) * 16 + 18) * amp, (Math.sin(i * 0.6 + 1) * 18 + 20) * amp, (Math.sin(i * 0.6) * 16 + 18) * amp] }}
              transition={{ duration: 0.7, repeat: Infinity, delay: i * 0.02 }} />
          );
        })}
      </g>
      {/* Radiating rings when listening */}
      {listening && [1, 2, 3].map(i => (
        <motion.ellipse key={i} cx="100" cy="95" rx={i * 30} ry={i * 38} fill="none" stroke={color} strokeWidth="0.8"
          initial={{ opacity: 0, scale: 0.5 }} animate={{ opacity: [0.5, 0], scale: [0.7, 1.4] }}
          transition={{ duration: 1.5, repeat: Infinity, delay: i * 0.35 }} />
      ))}
    </svg>
  );
}

// ── Floating keyword chip ─────────────────────────────────────────────────────
function Chip({ text, x, y, delay, color }: { text: string; x: number; y: number; delay: number; color: string }) {
  return (
    <motion.div
      className="absolute text-xs font-black px-3 py-1.5 rounded-full border whitespace-nowrap pointer-events-none"
      style={{ left: `${x}%`, top: `${y}%`, backgroundColor: color + "18", borderColor: color + "40", color }}
      initial={{ opacity: 0, scale: 0.7 }}
      animate={{ opacity: [0, 0.9, 0.7, 0], y: [-8, -16, -24, -32], scale: [0.7, 1, 1, 0.8] }}
      transition={{ duration: 4, repeat: Infinity, delay, ease: "easeOut" }}
    >
      {text}
    </motion.div>
  );
}

// ── Main export ───────────────────────────────────────────────────────────────
interface Props {
  frames: HeroFrame[];
  currentFrame: number;
  onFrameChange?: (i: number) => void;
}

export default function TechBridgeHeroVisual({ frames, currentFrame, onFrameChange }: Props) {
  const frame = frames[currentFrame];

  type DeviceComponent = (props: { color: string }) => React.ReactElement | null;
  const SVGMap: Record<string, DeviceComponent> = {
    printer: PrinterDevice,
    gps: GPSDevice,
    shield: ShieldDevice,
    home: HomeDevice,
    camera: CameraDevice,
    mic: MicDevice,
  };
  const SVGComponent = SVGMap[frame.svgType];

  return (
    <div className="relative rounded-3xl overflow-hidden border border-zinc-800 h-[500px] select-none"
      style={{ background: `radial-gradient(ellipse at 40% 40%, ${frame.color}12 0%, #080808 70%)` }}>

      {/* Animated ambient glow */}
      <motion.div className="absolute inset-0 pointer-events-none"
        animate={{ background: [
          `radial-gradient(ellipse at 30% 30%, ${frame.color}18 0%, transparent 60%)`,
          `radial-gradient(ellipse at 70% 70%, ${frame.color}12 0%, transparent 60%)`,
        ]}}
        transition={{ duration: 4, repeat: Infinity, repeatType: "reverse" }}
      />

      {/* Floating particles */}
      {frame.particles.map((p, i) => (
        <motion.div key={`${currentFrame}-${i}`} className="absolute text-2xl pointer-events-none"
          style={{ left: `${10 + (i * 23) % 80}%`, top: `${15 + (i * 17) % 65}%` }}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: [0, 0.5, 0], y: [20, -10, -30] }}
          transition={{ duration: 3.5, repeat: Infinity, delay: i * 0.5 }}>
          {p}
        </motion.div>
      ))}

      {/* Dynamic keyword chips from search intent */}
      {[
        { text: "Plain English", x: 5, y: 8, delay: 0 },
        { text: "Free guide", x: 55, y: 5, delay: 1.2 },
        { text: "Adults 45+", x: 5, y: 78, delay: 0.6 },
        { text: "No jargon", x: 60, y: 75, delay: 1.8 },
      ].map((c, i) => <Chip key={i} text={c.text} x={c.x} y={c.y} delay={c.delay} color={frame.color} />)}

      {/* Central SVG device */}
      <AnimatePresence mode="wait">
        <motion.div key={`svg-${currentFrame}`}
          initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          exit={{ opacity: 0, scale: 0.9, rotate: 3 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="absolute inset-0 flex items-center justify-center p-12">
          <div className="w-full max-w-[220px] h-[220px]">
            <SVGComponent color={frame.color} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Label card */}
      <AnimatePresence mode="wait">
        <motion.div key={`label-${currentFrame}`}
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="absolute bottom-14 left-6 right-6 bg-black/60 backdrop-blur-md border border-zinc-700/60 rounded-2xl px-5 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl flex items-center justify-center text-xl flex-shrink-0"
              style={{ backgroundColor: frame.color + "25", border: `1px solid ${frame.color}50` }}>
              {frame.emoji}
            </div>
            <div>
              <div className="text-white font-black text-base leading-tight">{frame.visualLabel}</div>
              <div className="text-zinc-400 text-sm font-medium mt-0.5">{frame.visualSub}</div>
            </div>
            <motion.div className="ml-auto w-2 h-2 rounded-full flex-shrink-0"
              style={{ backgroundColor: frame.color }}
              animate={{ scale: [1, 1.5, 1], opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 1.5, repeat: Infinity }} />
          </div>
        </motion.div>
      </AnimatePresence>

      {/* Progress dots */}
      {frames.length > 1 && (
        <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
          {frames.map((_, i) => (
            <motion.button key={i} onClick={() => onFrameChange?.(i)}
              aria-label={`Frame ${i + 1}`}
              className="rounded-full transition-all"
              animate={{ width: i === currentFrame ? 20 : 6, height: 6, backgroundColor: i === currentFrame ? frame.color : "#3f3f46" }}
            />
          ))}
        </div>
      )}

      {/* SEO caption */}
      <div className="absolute top-4 right-4">
        <motion.div className="text-xs font-black px-3 py-1.5 rounded-full"
          style={{ backgroundColor: frame.color + "18", color: frame.color, border: `1px solid ${frame.color}35` }}
          animate={{ opacity: [0.7, 1, 0.7] }} transition={{ duration: 2, repeat: Infinity }}>
          Free · Plain English · Adults 45+
        </motion.div>
      </div>
    </div>
  );
}
