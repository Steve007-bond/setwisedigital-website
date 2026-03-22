"use client";

import { motion } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/* ═══════════════════════════════════════════════════════════════
   STORY SIMULATOR — Reusable 1-minute animated story component
   Used across Homepage, About, Pricing, TechBridge
   ═══════════════════════════════════════════════════════════════ */

export interface SimScene {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  duration: number;
  color: string;
  visual?: "svg" | "emoji";
  svgContent?: React.ReactNode;
  subEmojis?: string[];
  mood?: "neutral" | "sad" | "happy" | "excited" | "thinking" | "proud";
}

interface StorySimulatorProps {
  title: string;
  subtitle: string;
  scenes: SimScene[];
  windowTitle?: string;
  theme?: "dark" | "light";
  autoPlayOnView?: boolean;
}

export default function StorySimulator({
  title,
  subtitle,
  scenes,
  windowTitle,
  autoPlayOnView = false,
}: StorySimulatorProps) {
  const [sceneIdx, setSceneIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [timeInScene, setTimeInScene] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const scene = scenes[sceneIdx];
  const progress = ((sceneIdx + 1) / scenes.length) * 100;
  const sceneProgress = (timeInScene / scene.duration) * 100;

  // Auto-advance scenes
  useEffect(() => {
    if (!isPlaying) return;
    setTimeInScene(0);
    const interval = setInterval(() => {
      setTimeInScene(t => {
        if (t + 100 >= scene.duration) {
          if (sceneIdx < scenes.length - 1) {
            setSceneIdx(s => s + 1);
            return 0;
          } else {
            setIsPlaying(false);
            return scene.duration;
          }
        }
        return t + 100;
      });
    }, 100);
    return () => clearInterval(interval);
  }, [sceneIdx, isPlaying, scene.duration, scenes.length]);

  // Elapsed time
  const totalDuration = scenes.reduce((sum, s) => sum + s.duration, 0);
  const elapsed = scenes.slice(0, sceneIdx).reduce((sum, s) => sum + s.duration, 0) + timeInScene;
  const formatTime = (ms: number) => {
    const s = Math.floor(ms / 1000);
    const m = Math.floor(s / 60);
    return `${m}:${String(s % 60).padStart(2, "0")}`;
  };

  const handlePlay = () => {
    setSceneIdx(0);
    setTimeInScene(0);
    setIsPlaying(true);
    setHasStarted(true);
  };

  // Character faces based on mood
  const faces: Record<string, React.ReactNode> = {
    neutral: (
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
        <circle cx="40" cy="40" r="38" fill={`${scene.color}20`} stroke={scene.color} strokeWidth="2" />
        <circle cx="28" cy="34" r="4" fill={scene.color} />
        <circle cx="52" cy="34" r="4" fill={scene.color} />
        <path d="M 26 50 Q 40 56 54 50" fill="none" stroke={scene.color} strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    sad: (
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
        <circle cx="40" cy="40" r="38" fill="#ef444420" stroke="#ef4444" strokeWidth="2" />
        <circle cx="28" cy="34" r="4" fill="#ef4444" />
        <circle cx="52" cy="34" r="4" fill="#ef4444" />
        <path d="M 26 54 Q 40 46 54 54" fill="none" stroke="#ef4444" strokeWidth="2.5" strokeLinecap="round" />
        <motion.path d="M 24 26 L 32 30" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"
          animate={{ y: [0, -1, 0] }} transition={{ duration: 2, repeat: Infinity }} />
        <motion.path d="M 56 26 L 48 30" stroke="#ef4444" strokeWidth="2" strokeLinecap="round"
          animate={{ y: [0, -1, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 0.3 }} />
      </svg>
    ),
    thinking: (
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
        <circle cx="40" cy="40" r="38" fill={`${scene.color}20`} stroke={scene.color} strokeWidth="2" />
        <circle cx="28" cy="34" r="4" fill={scene.color} />
        <circle cx="52" cy="34" r="4" fill={scene.color} />
        <path d="M 30 52 L 50 52" fill="none" stroke={scene.color} strokeWidth="2.5" strokeLinecap="round" />
        <motion.text x="62" y="22" fontSize="14" fill={scene.color}
          animate={{ opacity: [0, 1, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>?</motion.text>
      </svg>
    ),
    happy: (
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
        <circle cx="40" cy="40" r="38" fill="#22c55e20" stroke="#22c55e" strokeWidth="2" />
        <circle cx="28" cy="34" r="4" fill="#22c55e" />
        <circle cx="52" cy="34" r="4" fill="#22c55e" />
        <path d="M 24 48 Q 40 60 56 48" fill="none" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
      </svg>
    ),
    excited: (
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
        <motion.circle cx="40" cy="40" r="38" fill="#f59e0b20" stroke="#f59e0b" strokeWidth="2"
          animate={{ scale: [1, 1.03, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
          style={{ transformOrigin: "40px 40px" }} />
        <circle cx="28" cy="32" r="5" fill="#f59e0b" />
        <circle cx="52" cy="32" r="5" fill="#f59e0b" />
        <ellipse cx="40" cy="52" rx="12" ry="8" fill="#f59e0b30" stroke="#f59e0b" strokeWidth="2" />
        <motion.text x="60" y="16" fontSize="12" fill="#f59e0b"
          animate={{ rotate: [0, 15, -15, 0], y: [0, -3, 0] }} transition={{ duration: 1, repeat: Infinity }}>⭐</motion.text>
      </svg>
    ),
    proud: (
      <svg viewBox="0 0 80 80" className="w-16 h-16 md:w-20 md:h-20">
        <circle cx="40" cy="40" r="38" fill="#8b5cf620" stroke="#8b5cf6" strokeWidth="2" />
        <motion.path d="M 24 34 Q 28 28 32 34" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
        <motion.path d="M 48 34 Q 52 28 56 34" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
        <path d="M 26 48 Q 40 58 54 48" fill="none" stroke="#8b5cf6" strokeWidth="2.5" strokeLinecap="round" />
        <motion.text x="58" y="18" fontSize="14"
          animate={{ y: [0, -4, 0] }} transition={{ duration: 1.5, repeat: Infinity }}>💪</motion.text>
      </svg>
    ),
  };

  return (
    <section ref={containerRef} className="py-20 bg-zinc-950 overflow-hidden border-y border-zinc-800/50">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-white">{title}</h2>
          <p className="text-zinc-400 text-lg">{subtitle}</p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] rounded-full blur-[100px]"
            style={{ backgroundColor: `${scene.color}15`, transition: "background-color 1s" }}
          />

          <div className="relative bg-zinc-900/80 border border-zinc-800 rounded-3xl p-6 md:p-10 backdrop-blur-sm">
            {/* Window bar */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-zinc-500 font-bold">{windowTitle || title}</span>
              </div>
              <div className="text-xs text-zinc-600 font-mono">
                {formatTime(elapsed)} / {formatTime(totalDuration)}
              </div>
            </div>

            {/* Global progress bar */}
            <div className="w-full h-1 bg-zinc-800 rounded-full mb-2 overflow-hidden">
              <motion.div
                className="h-full rounded-full"
                style={{ backgroundColor: scene.color, transition: "background-color 0.5s" }}
                animate={{ width: `${(elapsed / totalDuration) * 100}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* Scene progress */}
            <div className="w-full h-0.5 bg-zinc-800/50 rounded-full mb-8 overflow-hidden">
              <motion.div
                className="h-full rounded-full opacity-50"
                style={{ backgroundColor: scene.color }}
                animate={{ width: `${sceneProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </div>

            {/* ── Main animation stage ── */}
            <div className="relative min-h-[280px] md:min-h-[320px] mb-8 flex flex-col items-center justify-center">
              {/* Character face */}
              <motion.div
                key={`face-${sceneIdx}`}
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.5, type: "spring" }}
                className="mb-6"
              >
                <motion.div
                  animate={{ y: [0, -6, 0] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                >
                  {faces[scene.mood || "neutral"]}
                </motion.div>
              </motion.div>

              {/* Floating sub-emojis around character */}
              {(scene.subEmojis || []).map((e, i) => (
                <motion.div
                  key={`sub-${sceneIdx}-${i}`}
                  className="absolute text-xl md:text-2xl pointer-events-none"
                  style={{
                    left: `${20 + (i * 15) % 60}%`,
                    top: `${10 + (i * 20) % 50}%`,
                  }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{
                    opacity: [0, 0.8, 0.5, 0],
                    scale: [0.5, 1.2, 1, 0.5],
                    y: [10, -20 - i * 8, -40, -60],
                    x: [0, (i % 2 === 0 ? 12 : -12), 0],
                  }}
                  transition={{ duration: 3, delay: i * 0.4, ease: "easeOut" }}
                >
                  {e}
                </motion.div>
              ))}

              {/* Scene title with emoji */}
              <motion.div
                key={`title-${sceneIdx}`}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="text-center"
              >
                <div className="flex items-center justify-center gap-3 mb-4">
                  <motion.span
                    className="text-4xl md:text-5xl"
                    animate={{ scale: [1, 1.15, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    {scene.emoji}
                  </motion.span>
                </div>
                <h3
                  className="text-2xl md:text-3xl font-black mb-3"
                  style={{ color: scene.color, transition: "color 0.5s" }}
                >
                  {scene.title}
                </h3>
                <motion.p
                  key={`desc-${sceneIdx}`}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="text-zinc-400 text-base md:text-lg max-w-lg mx-auto leading-relaxed"
                >
                  {scene.desc}
                </motion.p>
              </motion.div>

              {/* Decorative particles */}
              {isPlaying && [0, 1, 2, 3, 4, 5].map(i => (
                <motion.div
                  key={`p-${sceneIdx}-${i}`}
                  className="absolute w-1.5 h-1.5 rounded-full"
                  style={{
                    backgroundColor: scene.color,
                    left: `${10 + Math.random() * 80}%`,
                    top: `${10 + Math.random() * 80}%`,
                  }}
                  animate={{
                    opacity: [0, 0.6, 0],
                    scale: [0, 1.5, 0],
                    y: [0, -30],
                  }}
                  transition={{
                    duration: 2,
                    delay: i * 0.3,
                    repeat: Infinity,
                  }}
                />
              ))}
            </div>

            {/* Scene number indicators */}
            <div className="flex justify-center items-center gap-1.5 mb-6">
              {scenes.map((s, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setSceneIdx(i);
                    setHasStarted(true);
                    setIsPlaying(false);
                    setTimeInScene(0);
                  }}
                  className="h-1.5 rounded-full transition-all duration-500 cursor-pointer"
                  style={{
                    width: i === sceneIdx ? "28px" : "8px",
                    backgroundColor:
                      i === sceneIdx
                        ? scene.color
                        : i < sceneIdx
                        ? `${scene.color}60`
                        : "rgba(255,255,255,0.1)",
                  }}
                />
              ))}
            </div>

            {/* Step label */}
            <div className="text-center mb-6">
              <span className="text-xs font-bold text-zinc-600 uppercase tracking-wider">
                Scene {sceneIdx + 1} of {scenes.length}
              </span>
            </div>

            {/* Controls */}
            <div className="flex justify-center gap-3 flex-wrap">
              {!hasStarted ? (
                <button
                  onClick={handlePlay}
                  className="px-8 py-3.5 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105 text-lg"
                  style={{ backgroundColor: scene.color }}
                >
                  ▶ Watch the Story
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsPlaying(!isPlaying)}
                    className="px-6 py-3 rounded-xl font-bold text-white flex items-center gap-2 transition-all hover:scale-105"
                    style={{ backgroundColor: scene.color }}
                  >
                    {isPlaying ? "⏸ Pause" : "▶ Resume"}
                  </button>
                  <button
                    onClick={() => {
                      setSceneIdx(0);
                      setTimeInScene(0);
                      setIsPlaying(true);
                    }}
                    className="px-6 py-3 rounded-xl font-bold text-white bg-white/10 border border-white/10 flex items-center gap-2 hover:scale-105 hover:bg-white/15"
                  >
                    🔄 Replay
                  </button>
                  {sceneIdx < scenes.length - 1 && (
                    <button
                      onClick={() => {
                        setSceneIdx((s) => Math.min(s + 1, scenes.length - 1));
                        setTimeInScene(0);
                      }}
                      className="px-6 py-3 rounded-xl font-bold text-white bg-white/10 border border-white/10 flex items-center gap-2 hover:scale-105 hover:bg-white/15"
                    >
                      Skip →
                    </button>
                  )}
                </>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
