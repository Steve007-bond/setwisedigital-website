"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   IMMERSIVE VIDEO SECTION — Full-fold autoplay with colour-shifting
   Replaces old StorySimulator & CinematicVideoPlayer on all 4 pages
   ═══════════════════════════════════════════════════════════════ */

interface VideoScene {
  time: number;          // seconds when this scene starts
  headline: string;
  sub?: string;
  color: string;         // hex accent colour
}

interface CTAButton {
  label: string;
  href: string;
  color: string;
}

interface ImmersiveVideoProps {
  videoSrc: string;
  scenes: VideoScene[];
  ctaButtons: CTAButton[];
  sectionTitle?: string;
  bgColor?: string;
}

export default function ImmersiveVideoSection({
  videoSrc,
  scenes,
  ctaButtons,
  sectionTitle,
  bgColor = "#080808",
}: ImmersiveVideoProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const [currentScene, setCurrentScene] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [showEndScreen, setShowEndScreen] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(true);

  const scene = scenes[currentScene] || scenes[0];

  // Autoplay when scrolled into view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          const video = videoRef.current;
          if (video) {
            video.muted = true;
            video.play().then(() => {
              setIsPlaying(true);
              setHasStarted(true);
            }).catch(() => {});
          }
        }
      },
      { threshold: 0.4 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  // Track time → update scene
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      const t = video.currentTime;
      setCurrentTime(t);
      setProgress((t / video.duration) * 100);

      // Find which scene we're in
      for (let i = scenes.length - 1; i >= 0; i--) {
        if (t >= scenes[i].time) {
          setCurrentScene(i);
          break;
        }
      }
    };
    const onMeta = () => setDuration(video.duration);
    const onEnd = () => { setIsPlaying(false); setShowEndScreen(true); };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("ended", onEnd);
    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onMeta);
      video.removeEventListener("ended", onEnd);
    };
  }, [scenes]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) { v.pause(); setIsPlaying(false); }
    else {
      if (!hasStarted) { v.muted = true; setIsMuted(true); }
      v.play(); setIsPlaying(true); setHasStarted(true); setShowEndScreen(false);
    }
  };

  const toggleMute = () => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    setIsMuted(v.muted);
  };

  const replay = () => {
    const v = videoRef.current;
    if (!v) return;
    v.currentTime = 0; v.play();
    setIsPlaying(true); setShowEndScreen(false); setCurrentScene(0);
  };

  const seek = (e: React.MouseEvent<HTMLDivElement>) => {
    const v = videoRef.current;
    if (!v) return;
    const r = e.currentTarget.getBoundingClientRect();
    v.currentTime = ((e.clientX - r.left) / r.width) * v.duration;
  };

  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden"
      style={{ backgroundColor: bgColor }}
    >
      {/* ── Colour-shifting background ── */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div
          className="absolute inset-0"
          key={`bg-${currentScene}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.5 }}
          style={{
            background: `radial-gradient(ellipse at 25% 30%, ${scene.color}15 0%, transparent 55%),
                         radial-gradient(ellipse at 75% 70%, ${scene.color}10 0%, transparent 55%)`
          }}
        />

        {/* Constellation nodes */}
        {Array.from({ length: 8 }).map((_, i) => {
          const bx = 5 + (i % 4) * 25 + ((Math.floor(i / 4) % 2) * 12);
          const by = 8 + Math.floor(i / 4) * 40;
          return (
            <motion.div key={`n-${i}`} className="absolute pointer-events-none"
              style={{ left: `${bx}%`, top: `${by}%` }}
              animate={{
                x: [0, 10 * Math.sin(i * 0.9), -6, 0],
                y: [0, -8 * Math.cos(i * 0.7), 5, 0],
                opacity: [0.1, 0.25, 0.12, 0.1],
              }}
              transition={{ duration: 10 + i * 2, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
              <div className="w-2 h-2 rotate-45 rounded-sm"
                style={{ background: `${scene.color}50`, boxShadow: `0 0 8px ${scene.color}30`, transition: "all 1.2s" }} />
              <motion.div className="absolute inset-[-6px] rounded-full border"
                style={{ borderColor: `${scene.color}15` }}
                animate={{ scale: [1, 2.2, 1], opacity: [0.2, 0, 0.2] }}
                transition={{ duration: 4 + i * 0.3, repeat: Infinity, delay: i * 0.4 }} />
            </motion.div>
          );
        })}

        {/* Sweeping beam */}
        <motion.div className="absolute w-[160px] h-[150vh] -top-[25vh] pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${scene.color}05, transparent)`, transform: "rotate(15deg)", transition: "background 1.2s" }}
          animate={{ x: ["-200px", "120vw"] }}
          transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }} />

        {/* Dot grid */}
        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      {/* ── Main content ── */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">

        {/* Section title (optional) */}
        {sectionTitle && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-6"
          >
            <motion.div
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full border text-xs font-black uppercase tracking-[0.15em] mb-6"
              style={{ backgroundColor: `${scene.color}12`, borderColor: `${scene.color}35`, color: scene.color, transition: "all 1s" }}
            >
              {sectionTitle}
            </motion.div>
          </motion.div>
        )}

        {/* ── Full-width video + animated headline overlay ── */}
        <div className="relative rounded-2xl overflow-hidden border border-white/[0.06]">

          {/* Video */}
          <div className="relative aspect-video bg-black">
            <video
              ref={videoRef}
              src={videoSrc}
              className="w-full h-full object-cover"
              playsInline
              preload="metadata"
              muted
            />

            {/* Gradient overlay on bottom for text readability */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent pointer-events-none" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-transparent pointer-events-none" />

            {/* ── Animated headline overlay (bottom-left) ── */}
            <div className="absolute bottom-16 left-6 sm:left-10 right-6 sm:right-20 z-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={`scene-${currentScene}`}
                  initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
                  animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -10, filter: "blur(4px)" }}
                  transition={{ duration: 0.6 }}
                >
                  <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-black tracking-tight leading-tight mb-2"
                    style={{ color: scene.color, transition: "color 0.8s", textShadow: `0 2px 20px ${scene.color}40` }}>
                    {scene.headline}
                  </h2>
                  {scene.sub && (
                    <p className="text-sm sm:text-base text-zinc-300 max-w-xl" style={{ textShadow: "0 1px 8px rgba(0,0,0,0.8)" }}>
                      {scene.sub}
                    </p>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Scene dots */}
              <div className="flex gap-1.5 mt-4">
                {scenes.map((_, i) => (
                  <div key={i} className="h-1 rounded-full transition-all duration-700"
                    style={{
                      width: i === currentScene ? 24 : 6,
                      backgroundColor: i === currentScene ? scene.color : "rgba(255,255,255,0.2)",
                    }} />
                ))}
              </div>
            </div>

            {/* Play button overlay (before autoplay starts) */}
            {!hasStarted && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer z-20"
                onClick={togglePlay}
              >
                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                  className="w-20 h-20 rounded-full flex items-center justify-center backdrop-blur-sm"
                  style={{ backgroundColor: `${scene.color}cc` }}
                >
                  <svg width="28" height="32" viewBox="0 0 28 32" fill="none">
                    <path d="M4 2L26 16L4 30V2Z" fill="white" />
                  </svg>
                </motion.div>
              </motion.div>
            )}

            {/* Click to pause/play */}
            {hasStarted && !showEndScreen && (
              <div className="absolute inset-0 cursor-pointer z-10" onClick={togglePlay}>
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/30"
                    >
                      <div className="w-16 h-16 rounded-full flex items-center justify-center backdrop-blur-sm"
                        style={{ backgroundColor: `${scene.color}aa` }}>
                        <svg width="22" height="26" viewBox="0 0 28 32" fill="none">
                          <path d="M4 2L26 16L4 30V2Z" fill="white" />
                        </svg>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* End screen */}
            {showEndScreen && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center z-20 p-6"
              >
                <p className="text-white font-bold text-xl sm:text-2xl mb-2">Ready to get started?</p>
                <p className="text-zinc-400 text-sm mb-6">Choose where you want to begin</p>
                <div className="flex flex-wrap justify-center gap-3 max-w-2xl">
                  {ctaButtons.map((btn, i) => (
                    <motion.div key={i}
                      initial={{ opacity: 0, y: 12 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.1 + i * 0.08 }}>
                      <Link href={btn.href}
                        className="px-5 py-2.5 rounded-xl font-bold text-sm transition-all hover:scale-105 inline-block"
                        style={{
                          color: btn.color,
                          border: `1px solid ${btn.color}50`,
                          backgroundColor: `${btn.color}12`,
                        }}>
                        {btn.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <button onClick={replay} className="mt-5 text-zinc-500 text-sm hover:text-white transition-colors flex items-center gap-2">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 7a6 6 0 1 1 1 3.5" strokeLinecap="round" />
                    <path d="M1 2v4h4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                  Watch again
                </button>
              </motion.div>
            )}
          </div>

          {/* ── Controls bar ── */}
          <div className="px-4 py-2.5 flex items-center gap-3" style={{ backgroundColor: `${bgColor}f0` }}>
            <button onClick={togglePlay} className="text-white/60 hover:text-white transition-colors shrink-0">
              {isPlaying ? (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="1" width="4" height="14" rx="1" /><rect x="10" y="1" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 16 16" fill="currentColor"><path d="M3 1.5L14 8L3 14.5V1.5Z" /></svg>
              )}
            </button>

            <span className="text-[11px] text-zinc-500 font-mono min-w-[32px]">{fmt(currentTime)}</span>

            <div className="flex-1 h-1 bg-white/[0.06] rounded-full cursor-pointer group" onClick={seek}>
              <div className="h-full rounded-full transition-all duration-150"
                style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${scene.color}, ${scene.color}aa)` }} />
            </div>

            <span className="text-[11px] text-zinc-500 font-mono min-w-[32px]">{fmt(duration)}</span>

            <button onClick={toggleMute} className="text-white/40 hover:text-white transition-colors shrink-0" title={isMuted ? "Unmute" : "Mute"}>
              {isMuted ? (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" />
                </svg>
              ) : (
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
                  <path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" />
                </svg>
              )}
            </button>

            <button onClick={replay} className="text-white/40 hover:text-white transition-colors shrink-0" title="Replay">
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M1 7a6 6 0 1 1 1 3.5" strokeLinecap="round" />
                <path d="M1 2v4h4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
