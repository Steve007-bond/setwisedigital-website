"use client";

import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Link from "next/link";

/* ═══════════════════════════════════════════════════════════════
   CINEMATIC VIDEO PLAYER — Replaces the old StorySimulator
   Used on Homepage, About, Pricing, TechBridge
   
   HOSTING: Upload videos to Hostinger at public/videos/
   Files needed:
   - /videos/homepage-story.mp4 
   - /videos/about-story.mp4
   - /videos/techbridge-overview.mp4
   - /videos/pricing-overview.mp4
   ═══════════════════════════════════════════════════════════════ */

interface CTAButton {
  label: string;
  href: string;
  color: string;
}

interface CinematicVideoProps {
  title: string;
  subtitle: string;
  videoSrc: string;
  posterFrame?: string;
  ctaButtons?: CTAButton[];
  accentColor?: string;
}

export default function CinematicVideoPlayer({
  title,
  subtitle,
  videoSrc,
  posterFrame,
  ctaButtons,
  accentColor = "#3b82f6",
}: CinematicVideoProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const isInView = useInView(containerRef, { once: true, margin: "-100px" });
  const [isPlaying, setIsPlaying] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [showEndScreen, setShowEndScreen] = useState(false);

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60);
    const sec = Math.floor(s % 60);
    return `${m}:${sec.toString().padStart(2, "0")}`;
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onTimeUpdate = () => {
      setCurrentTime(video.currentTime);
      setProgress((video.currentTime / video.duration) * 100);
    };
    const onLoadedMetadata = () => setDuration(video.duration);
    const onEnded = () => {
      setIsPlaying(false);
      setShowEndScreen(true);
    };

    video.addEventListener("timeupdate", onTimeUpdate);
    video.addEventListener("loadedmetadata", onLoadedMetadata);
    video.addEventListener("ended", onEnded);

    return () => {
      video.removeEventListener("timeupdate", onTimeUpdate);
      video.removeEventListener("loadedmetadata", onLoadedMetadata);
      video.removeEventListener("ended", onEnded);
    };
  }, []);

  const handlePlay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.play();
    setIsPlaying(true);
    setHasStarted(true);
    setShowEndScreen(false);
  };

  const handlePause = () => {
    videoRef.current?.pause();
    setIsPlaying(false);
  };

  const handleReplay = () => {
    const video = videoRef.current;
    if (!video) return;
    video.currentTime = 0;
    video.play();
    setIsPlaying(true);
    setShowEndScreen(false);
  };

  const handleSeek = (e: React.MouseEvent<HTMLDivElement>) => {
    const video = videoRef.current;
    if (!video) return;
    const rect = e.currentTarget.getBoundingClientRect();
    const pct = (e.clientX - rect.left) / rect.width;
    video.currentTime = pct * video.duration;
  };

  return (
    <section
      ref={containerRef}
      className="py-20 bg-zinc-950 overflow-hidden border-y border-zinc-800/50"
    >
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl md:text-4xl font-black tracking-tight mb-3 text-white">
            {title}
          </h2>
          <p className="text-zinc-400 text-lg">{subtitle}</p>
        </motion.div>

        {/* Video player */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8 }}
          className="relative max-w-4xl mx-auto"
        >
          {/* Glow behind */}
          <div
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[85%] h-[70%] rounded-full blur-[100px] -z-10"
            style={{ backgroundColor: `${accentColor}10` }}
          />

          <div className="relative bg-zinc-900/90 border border-zinc-800 rounded-2xl overflow-hidden backdrop-blur-sm">
            {/* Video element */}
            <div className="relative aspect-video bg-black">
              <video
                ref={videoRef}
                src={videoSrc}
                poster={posterFrame}
                className="w-full h-full object-cover"
                playsInline
                preload="metadata"
              />

              {/* Play overlay (before started) */}
              {!hasStarted && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 flex items-center justify-center bg-black/40 cursor-pointer"
                  onClick={handlePlay}
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-20 h-20 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: accentColor }}
                  >
                    <svg
                      width="28"
                      height="32"
                      viewBox="0 0 28 32"
                      fill="none"
                    >
                      <path d="M4 2L26 16L4 30V2Z" fill="white" />
                    </svg>
                  </motion.div>
                </motion.div>
              )}

              {/* Pause overlay (click to pause/resume) */}
              {hasStarted && !showEndScreen && (
                <div
                  className="absolute inset-0 cursor-pointer"
                  onClick={isPlaying ? handlePause : handlePlay}
                />
              )}

              {/* End screen with CTAs */}
              {showEndScreen && ctaButtons && ctaButtons.length > 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="absolute inset-0 bg-zinc-950/90 flex flex-col items-center justify-center p-6"
                >
                  <p className="text-white font-bold text-xl mb-6">
                    Ready to get started?
                  </p>
                  <div className="flex flex-wrap justify-center gap-3 max-w-lg">
                    {ctaButtons.map((btn, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.1 }}
                      >
                        <Link
                          href={btn.href}
                          className="px-5 py-2.5 rounded-xl font-bold text-sm text-white border transition-all hover:scale-105"
                          style={{
                            borderColor: btn.color,
                            backgroundColor: `${btn.color}15`,
                          }}
                        >
                          {btn.label}
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                  <button
                    onClick={handleReplay}
                    className="mt-5 text-zinc-500 text-sm hover:text-white transition-colors"
                  >
                    Watch again
                  </button>
                </motion.div>
              )}
            </div>

            {/* Controls bar */}
            <div className="px-4 py-3 flex items-center gap-3 bg-zinc-900/95">
              {/* Play/Pause button */}
              <button
                onClick={isPlaying ? handlePause : hasStarted ? handlePlay : handlePlay}
                className="text-white hover:text-zinc-300 transition-colors shrink-0"
              >
                {isPlaying ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <rect x="2" y="1" width="4" height="14" rx="1" />
                    <rect x="10" y="1" width="4" height="14" rx="1" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
                    <path d="M3 1.5L14 8L3 14.5V1.5Z" />
                  </svg>
                )}
              </button>

              {/* Time */}
              <span className="text-xs text-zinc-500 font-mono min-w-[36px]">
                {formatTime(currentTime)}
              </span>

              {/* Progress bar */}
              <div
                className="flex-1 h-1.5 bg-zinc-800 rounded-full cursor-pointer group relative"
                onClick={handleSeek}
              >
                <div
                  className="h-full rounded-full transition-all"
                  style={{
                    width: `${progress}%`,
                    backgroundColor: accentColor,
                  }}
                />
                <div
                  className="absolute top-1/2 -translate-y-1/2 w-3 h-3 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
                  style={{
                    left: `${progress}%`,
                    backgroundColor: accentColor,
                    transform: `translateX(-50%) translateY(-50%)`,
                  }}
                />
              </div>

              {/* Duration */}
              <span className="text-xs text-zinc-500 font-mono min-w-[36px]">
                {formatTime(duration)}
              </span>

              {/* Replay */}
              {hasStarted && (
                <button
                  onClick={handleReplay}
                  className="text-zinc-500 hover:text-white transition-colors shrink-0"
                  title="Replay"
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.5">
                    <path d="M1 7a6 6 0 1 1 1 3.5" strokeLinecap="round" />
                    <path d="M1 2v4h4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
