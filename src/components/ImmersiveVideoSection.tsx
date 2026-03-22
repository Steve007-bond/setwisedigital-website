"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   IMMERSIVE VIDEO SECTION v3
   - NO text overlay on video (clean playback)
   - Colour-shifting background + headline ABOVE video
   - Bright video (brightness-110, no dark overlays)
   - Fully responsive (mobile/tablet/desktop)
   ═══════════════════════════════════════════════════════════════ */

interface VideoScene {
  time: number;
  headline: string;
  sub?: string;
  color: string;
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasStarted) {
          const video = videoRef.current;
          if (video) {
            video.muted = true;
            video.play().then(() => { setIsPlaying(true); setHasStarted(true); }).catch(() => {});
          }
        }
      },
      { threshold: 0.3 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [hasStarted]);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const onTime = () => {
      const t = video.currentTime;
      setCurrentTime(t);
      setProgress((t / video.duration) * 100);
      for (let i = scenes.length - 1; i >= 0; i--) {
        if (t >= scenes[i].time) { setCurrentScene(i); break; }
      }
    };
    const onMeta = () => setDuration(video.duration);
    const onEnd = () => { setIsPlaying(false); setShowEndScreen(true); };
    video.addEventListener("timeupdate", onTime);
    video.addEventListener("loadedmetadata", onMeta);
    video.addEventListener("ended", onEnd);
    return () => { video.removeEventListener("timeupdate", onTime); video.removeEventListener("loadedmetadata", onMeta); video.removeEventListener("ended", onEnd); };
  }, [scenes]);

  const togglePlay = () => {
    const v = videoRef.current;
    if (!v) return;
    if (isPlaying) { v.pause(); setIsPlaying(false); }
    else { v.play(); setIsPlaying(true); setHasStarted(true); setShowEndScreen(false); }
  };
  const toggleMute = () => { const v = videoRef.current; if (!v) return; v.muted = !v.muted; setIsMuted(v.muted); };
  const replay = () => { const v = videoRef.current; if (!v) return; v.currentTime = 0; v.play(); setIsPlaying(true); setShowEndScreen(false); setCurrentScene(0); };
  const seek = (e: React.MouseEvent<HTMLDivElement>) => { const v = videoRef.current; if (!v) return; const r = e.currentTarget.getBoundingClientRect(); v.currentTime = ((e.clientX - r.left) / r.width) * v.duration; };
  const fmt = (s: number) => `${Math.floor(s / 60)}:${String(Math.floor(s % 60)).padStart(2, "0")}`;

  return (
    <section ref={sectionRef} className="relative overflow-hidden" style={{ backgroundColor: bgColor }}>

      {/* ══════ COLOUR-SHIFTING BACKGROUND ══════ */}
      <div className="absolute inset-0 pointer-events-none">
        <motion.div className="absolute inset-0" key={`grad-${currentScene}`}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
          style={{ background: `radial-gradient(ellipse 80% 60% at 20% 20%, ${scene.color}20 0%, transparent 70%), radial-gradient(ellipse 60% 50% at 80% 30%, ${scene.color}12 0%, transparent 60%), radial-gradient(ellipse 70% 40% at 50% 80%, ${scene.color}08 0%, transparent 60%)` }} />

        {Array.from({ length: 10 }).map((_, i) => {
          const bx = 5 + (i % 5) * 20 + ((Math.floor(i / 5) % 2) * 10);
          const by = 5 + Math.floor(i / 5) * 35;
          return (
            <motion.div key={`n-${i}`} className="absolute pointer-events-none"
              style={{ left: `${bx}%`, top: `${by}%` }}
              animate={{ x: [0, 12 * Math.sin(i * 0.8), -8 * Math.cos(i * 0.6), 0], y: [0, -10 * Math.cos(i * 0.7), 6 * Math.sin(i * 0.9), 0], opacity: [0.08, 0.22, 0.1, 0.08] }}
              transition={{ duration: 10 + i * 1.8, repeat: Infinity, ease: "easeInOut", delay: i * 0.5 }}>
              <div className="w-2 h-2 sm:w-2.5 sm:h-2.5 rotate-45 rounded-sm"
                style={{ background: `${scene.color}50`, boxShadow: `0 0 10px ${scene.color}35`, transition: "all 1.2s" }} />
              <motion.div className="absolute inset-[-8px] rounded-full border"
                style={{ borderColor: `${scene.color}15` }}
                animate={{ scale: [1, 2.5, 1], opacity: [0.25, 0, 0.25] }}
                transition={{ duration: 4 + i * 0.4, repeat: Infinity, delay: i * 0.3 }} />
            </motion.div>
          );
        })}

        <motion.div className="absolute w-[120px] sm:w-[180px] h-[150vh] -top-[25vh] pointer-events-none"
          style={{ background: `linear-gradient(90deg, transparent, ${scene.color}06, transparent)`, transform: "rotate(15deg)", transition: "background 1.2s" }}
          animate={{ x: ["-200px", "120vw"] }} transition={{ duration: 14, repeat: Infinity, ease: "easeInOut", repeatDelay: 5 }} />

        <div className="absolute inset-0 opacity-[0.02] pointer-events-none"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "36px 36px" }} />
      </div>

      {/* ══════ CONTENT ══════ */}
      <div className="relative z-10 px-4 sm:px-6 lg:px-8 py-10 sm:py-14 lg:py-20 max-w-6xl mx-auto">

        {sectionTitle && (
          <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} className="text-center mb-3 sm:mb-5">
            <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-[10px] sm:text-xs font-black uppercase tracking-[0.14em]"
              style={{ backgroundColor: `${scene.color}10`, borderColor: `${scene.color}30`, color: scene.color, transition: "all 1s" }}>
              {sectionTitle}
            </motion.div>
          </motion.div>
        )}

        {/* ── Animated headline ABOVE video ── */}
        <div className="text-center mb-5 sm:mb-7 min-h-[70px] sm:min-h-[90px] flex flex-col items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div key={`h-${currentScene}`}
              initial={{ opacity: 0, y: 14, filter: "blur(4px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              exit={{ opacity: 0, y: -8, filter: "blur(3px)" }}
              transition={{ duration: 0.5 }}
              className="text-center">
              <h2 className="text-lg sm:text-2xl md:text-3xl lg:text-4xl font-black tracking-tight leading-tight"
                style={{ color: scene.color, transition: "color 0.6s", textShadow: `0 0 40px ${scene.color}20` }}>
                {scene.headline}
              </h2>
              {scene.sub && <p className="text-xs sm:text-sm md:text-base text-zinc-400 mt-1 max-w-lg mx-auto">{scene.sub}</p>}
            </motion.div>
          </AnimatePresence>
          <div className="flex gap-1 sm:gap-1.5 mt-3">
            {scenes.map((_, i) => (
              <div key={i} className="h-1 rounded-full transition-all duration-700"
                style={{ width: i === currentScene ? 18 : 5, backgroundColor: i === currentScene ? scene.color : "rgba(255,255,255,0.12)" }} />
            ))}
          </div>
        </div>

        {/* ══════ VIDEO — clean, bright, NO text overlay ══════ */}
        <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative rounded-lg sm:rounded-xl lg:rounded-2xl overflow-hidden"
          style={{ boxShadow: `0 0 60px ${scene.color}10, 0 8px 32px rgba(0,0,0,0.4)`, transition: "box-shadow 1.5s" }}>

          <div className="absolute inset-0 rounded-lg sm:rounded-xl lg:rounded-2xl border transition-colors duration-1000 pointer-events-none z-20"
            style={{ borderColor: `${scene.color}18` }} />

          <div className="relative aspect-video bg-black">
            <video ref={videoRef} src={videoSrc} className="w-full h-full object-cover brightness-110 contrast-105" playsInline preload="metadata" muted />

            {!hasStarted && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 flex items-center justify-center bg-black/25 cursor-pointer z-20" onClick={togglePlay}>
                <motion.div whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                  className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 rounded-full flex items-center justify-center backdrop-blur-sm shadow-2xl"
                  style={{ backgroundColor: `${scene.color}dd` }}>
                  <svg className="w-4 h-4 sm:w-5 sm:h-5 md:w-7 md:h-7 ml-0.5" viewBox="0 0 28 32" fill="none"><path d="M4 2L26 16L4 30V2Z" fill="white" /></svg>
                </motion.div>
              </motion.div>
            )}

            {hasStarted && !showEndScreen && (
              <div className="absolute inset-0 cursor-pointer z-10" onClick={togglePlay}>
                <AnimatePresence>
                  {!isPlaying && (
                    <motion.div initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.8 }}
                      className="absolute inset-0 flex items-center justify-center bg-black/15">
                      <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-full flex items-center justify-center backdrop-blur-sm"
                        style={{ backgroundColor: `${scene.color}aa` }}>
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 ml-0.5" viewBox="0 0 28 32" fill="none"><path d="M4 2L26 16L4 30V2Z" fill="white" /></svg>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            )}

            {showEndScreen && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
                className="absolute inset-0 bg-black/85 backdrop-blur-sm flex flex-col items-center justify-center z-20 p-4 sm:p-6">
                <p className="text-white font-bold text-base sm:text-xl md:text-2xl mb-1">Ready to get started?</p>
                <p className="text-zinc-400 text-[11px] sm:text-sm mb-3 sm:mb-5">Choose where you want to begin</p>
                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-2xl">
                  {ctaButtons.map((btn, i) => (
                    <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 + i * 0.08 }}>
                      <Link href={btn.href}
                        className="px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-bold text-[11px] sm:text-sm transition-all hover:scale-105 inline-block"
                        style={{ color: btn.color, border: `1px solid ${btn.color}50`, backgroundColor: `${btn.color}12` }}>
                        {btn.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>
                <button onClick={replay} className="mt-3 sm:mt-4 text-zinc-500 text-[11px] sm:text-sm hover:text-white transition-colors flex items-center gap-1.5">
                  <svg width="12" height="12" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 7a6 6 0 1 1 1 3.5" strokeLinecap="round" /><path d="M1 2v4h4" strokeLinecap="round" strokeLinejoin="round" /></svg>
                  Watch again
                </button>
              </motion.div>
            )}
          </div>

          {/* Controls */}
          <div className="px-2.5 sm:px-4 py-1.5 sm:py-2.5 flex items-center gap-2 sm:gap-3" style={{ backgroundColor: `${bgColor}f5` }}>
            <button onClick={togglePlay} className="text-white/60 hover:text-white transition-colors shrink-0">
              {isPlaying ? (
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 16 16" fill="currentColor"><rect x="2" y="1" width="4" height="14" rx="1" /><rect x="10" y="1" width="4" height="14" rx="1" /></svg>
              ) : (
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 16 16" fill="currentColor"><path d="M3 1.5L14 8L3 14.5V1.5Z" /></svg>
              )}
            </button>
            <span className="text-[9px] sm:text-[11px] text-zinc-500 font-mono min-w-[24px] sm:min-w-[32px]">{fmt(currentTime)}</span>
            <div className="flex-1 h-1 bg-white/[0.06] rounded-full cursor-pointer" onClick={seek}>
              <div className="h-full rounded-full transition-all duration-150"
                style={{ width: `${progress}%`, background: `linear-gradient(90deg, ${scene.color}, ${scene.color}aa)`, transition: "background 1s, width 0.15s" }} />
            </div>
            <span className="text-[9px] sm:text-[11px] text-zinc-500 font-mono min-w-[24px] sm:min-w-[32px]">{fmt(duration)}</span>
            <button onClick={toggleMute} className="text-white/40 hover:text-white transition-colors shrink-0">
              {isMuted ? (
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><line x1="23" y1="9" x2="17" y2="15" /><line x1="17" y1="9" x2="23" y2="15" /></svg>
              ) : (
                <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M11 5L6 9H2v6h4l5 4V5z" /><path d="M19.07 4.93a10 10 0 0 1 0 14.14M15.54 8.46a5 5 0 0 1 0 7.07" /></svg>
              )}
            </button>
            <button onClick={replay} className="text-white/40 hover:text-white transition-colors shrink-0 hidden sm:block">
              <svg className="w-3 h-3" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M1 7a6 6 0 1 1 1 3.5" strokeLinecap="round" /><path d="M1 2v4h4" strokeLinecap="round" strokeLinejoin="round" /></svg>
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
