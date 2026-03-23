"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import Navbar from "@/components/Navbar";

/* ═══════════════════════════════════════════════════════════════
   /learning-hub — Technology Learning Hub
   
   After any form submission → user lands here
   Also accessible from navbar
   
   Flow:
   1. User sees 6 topic cards
   2. Picks a topic → walks through 5-6 diagnostic questions
   3. At the end → creates a Discord thread with their info + answers
   4. Shows confirmation with next steps
   ═══════════════════════════════════════════════════════════════ */

interface Question {
  id: string;
  text: string;
  options: string[];
  allowCustom?: boolean;
}

interface TopicFlow {
  id: string;
  label: string;
  emoji: string;
  color: string;
  description: string;
  questions: Question[];
}

const TOPICS: TopicFlow[] = [
  {
    id: "printers",
    label: "Printers & Scanners",
    emoji: "🖨️",
    color: "#2563eb",
    description: "Wi-Fi setup, paper jams, ink, offline errors",
    questions: [
      { id: "p1", text: "What printer brand do you have?", options: ["HP", "Canon", "Epson", "Brother", "Other / Not sure"] },
      { id: "p2", text: "How is your printer connected?", options: ["Wi-Fi / Wireless", "USB cable", "Bluetooth", "Not connected yet", "Not sure"] },
      { id: "p3", text: "What is the main issue you are experiencing?", options: ["Printer shows offline", "Paper jam", "Won't print from phone", "Ink or toner problem", "New printer setup", "Print quality is poor"] },
      { id: "p4", text: "What device are you printing from?", options: ["Windows PC / Laptop", "Mac", "iPhone / iPad", "Android phone / tablet", "Chromebook"] },
      { id: "p5", text: "How would you describe your comfort level with technology?", options: ["Complete beginner — need step by step", "I can follow instructions with some help", "I am somewhat comfortable", "I just need a quick answer"] },
    ],
  },
  {
    id: "gps",
    label: "GPS & Navigation",
    emoji: "📍",
    color: "#16a34a",
    description: "Map updates, route planning, device setup",
    questions: [
      { id: "g1", text: "What GPS device or app do you use?", options: ["Garmin", "TomTom", "Google Maps on phone", "Apple Maps", "Waze", "Built-in car GPS", "Other / Not sure"] },
      { id: "g2", text: "What is the main issue?", options: ["Maps are outdated", "GPS gives wrong directions", "Device won't turn on", "Can't connect to car", "Need to update maps", "Trouble with new device setup"] },
      { id: "g3", text: "Is this a standalone GPS device or a phone app?", options: ["Standalone GPS device (Garmin, TomTom)", "Phone app (Google Maps, Apple Maps, Waze)", "Car built-in navigation", "Not sure"] },
      { id: "g4", text: "How old is your device or app?", options: ["Brand new / Less than 6 months", "6 months to 2 years", "2 to 5 years", "Over 5 years", "Not sure"] },
      { id: "g5", text: "How would you describe your comfort level with technology?", options: ["Complete beginner — need step by step", "I can follow instructions with some help", "I am somewhat comfortable", "I just need a quick answer"] },
    ],
  },
  {
    id: "smarthome",
    label: "Smart Home",
    emoji: "🏠",
    color: "#f59e0b",
    description: "Voice control, smart plugs, cameras, routines",
    questions: [
      { id: "s1", text: "What smart home ecosystem do you use?", options: ["Amazon Alexa / Echo", "Google Home / Nest", "Apple HomeKit", "Samsung SmartThings", "Mix of different brands", "Just getting started"] },
      { id: "s2", text: "What type of device needs help?", options: ["Smart speaker (Echo, Google Home)", "Smart plug or switch", "Smart light bulbs", "Smart camera or doorbell", "Smart thermostat", "Smart TV", "Other"] },
      { id: "s3", text: "What is the main issue?", options: ["Device won't connect to Wi-Fi", "Voice commands not working", "Setting up a new device", "Creating automations or routines", "Devices not responding", "Multiple devices not syncing"] },
      { id: "s4", text: "How many smart devices do you currently have?", options: ["None yet — just starting", "1 to 3 devices", "4 to 10 devices", "More than 10 devices"] },
      { id: "s5", text: "How would you describe your comfort level with technology?", options: ["Complete beginner — need step by step", "I can follow instructions with some help", "I am somewhat comfortable", "I just need a quick answer"] },
    ],
  },
  {
    id: "alexa",
    label: "Alexa & Echo",
    emoji: "🔊",
    color: "#06b6d4",
    description: "Commands, routines, skills, music, understanding",
    questions: [
      { id: "a1", text: "Which Echo device do you have?", options: ["Echo Dot", "Echo (standard)", "Echo Show (with screen)", "Echo Pop", "Echo Studio", "Fire TV with Alexa", "Other / Not sure"] },
      { id: "a2", text: "What do you need help with?", options: ["Setting up for the first time", "Alexa not responding to voice", "Playing music or audiobooks", "Creating routines and automations", "Connecting smart home devices", "Making calls or messaging"] },
      { id: "a3", text: "Is your Echo connected to Wi-Fi?", options: ["Yes, it is connected and working", "It was connected but keeps disconnecting", "I cannot get it to connect", "Not sure how to check"] },
      { id: "a4", text: "Do you use the Alexa phone app?", options: ["Yes, I use it regularly", "I have it but rarely use it", "I do not have it installed", "I did not know there was an app"] },
      { id: "a5", text: "How would you describe your comfort level with technology?", options: ["Complete beginner — need step by step", "I can follow instructions with some help", "I am somewhat comfortable", "I just need a quick answer"] },
      { id: "a6", text: "Is there anyone at home who can help if needed?", options: ["Yes, I have someone who can assist", "No, I am doing this on my own", "I would prefer a video call lesson"] },
    ],
  },
  {
    id: "cameras",
    label: "Cameras",
    emoji: "📷",
    color: "#9333ea",
    description: "Firmware, settings, photo transfers, understanding",
    questions: [
      { id: "c1", text: "What type of camera do you need help with?", options: ["Digital camera (Canon, Nikon, Sony)", "Phone camera (iPhone or Android)", "Security camera (Ring, Wyze, Blink)", "Webcam for video calls", "GoPro or action camera", "Other"] },
      { id: "c2", text: "What is the main issue?", options: ["Transferring photos to computer or phone", "Camera settings or quality", "Firmware or software update", "Camera won't connect to Wi-Fi", "Blurry or dark photos", "Storage is full", "New camera setup"] },
      { id: "c3", text: "Where do you want your photos to go?", options: ["Computer (Windows or Mac)", "Phone or tablet", "Cloud storage (Google Photos, iCloud)", "USB drive or memory card", "I want to print them", "Not sure"] },
      { id: "c4", text: "What computer or phone do you use?", options: ["Windows PC / Laptop", "Mac", "iPhone / iPad", "Android phone / tablet", "Chromebook", "I don't have a computer"] },
      { id: "c5", text: "How would you describe your comfort level with technology?", options: ["Complete beginner — need step by step", "I can follow instructions with some help", "I am somewhat comfortable", "I just need a quick answer"] },
    ],
  },
  {
    id: "security",
    label: "Online Security",
    emoji: "🔒",
    color: "#ef4444",
    description: "Passwords, scams, antivirus, safe browsing, 2FA",
    questions: [
      { id: "x1", text: "What is your biggest concern right now?", options: ["I want to learn about online safety", "I need help managing passwords", "I want to set up antivirus protection", "I received a suspicious email or call", "I want to learn about safe browsing", "I need to set up two-factor authentication"] },
      { id: "x2", text: "What device do you use most for the internet?", options: ["Windows PC / Laptop", "Mac", "iPhone / iPad", "Android phone / tablet", "Chromebook", "Multiple devices"] },
      { id: "x3", text: "Do you currently use any security software?", options: ["Yes — I have antivirus installed", "I think so but not sure", "No — I do not have any", "I use the built-in Windows Defender / Mac security"] },
      { id: "x4", text: "How do you currently manage your passwords?", options: ["I use the same password for everything", "I write them down on paper", "I use a password manager app", "I try to remember them all", "My browser saves them for me"] },
      { id: "x5", text: "Have you ever been a victim of a scam or data breach?", options: ["Yes, recently", "Yes, in the past", "I am not sure", "No, never", "I want to check"] },
      { id: "x6", text: "How would you describe your comfort level with technology?", options: ["Complete beginner — need step by step", "I can follow instructions with some help", "I am somewhat comfortable", "I just need a quick answer"] },
    ],
  },
];

type Step = "topics" | "questions" | "submitting" | "done";

export default function LearningHubClient() {
  const searchParams = useSearchParams();
  const [step, setStep] = useState<Step>("topics");
  const [selectedTopic, setSelectedTopic] = useState<TopicFlow | null>(null);
  const [currentQ, setCurrentQ] = useState(0);
  const [answers, setAnswers] = useState<{ question: string; answer: string }[]>([]);
  const [userName, setUserName] = useState("");
  const [userEmail, setUserEmail] = useState("");
  const [threadName, setThreadName] = useState("");
  const [error, setError] = useState("");

  // Pre-fill from form redirect query params
  useEffect(() => {
    const name = searchParams.get("name");
    const email = searchParams.get("email");
    const topic = searchParams.get("topic");
    if (name) setUserName(name);
    if (email) setUserEmail(email);
    if (topic) {
      const found = TOPICS.find(t => t.id === topic || t.label.toLowerCase().includes(topic.toLowerCase()));
      if (found) { setSelectedTopic(found); setStep("questions"); }
    }
  }, [searchParams]);

  const handleSelectTopic = (topic: TopicFlow) => {
    setSelectedTopic(topic);
    setCurrentQ(0);
    setAnswers([]);
    setStep("questions");
  };

  const handleAnswer = (answer: string) => {
    if (!selectedTopic) return;
    const q = selectedTopic.questions[currentQ];
    const newAnswers = [...answers, { question: q.text, answer }];
    setAnswers(newAnswers);

    if (currentQ + 1 < selectedTopic.questions.length) {
      setCurrentQ(currentQ + 1);
    } else {
      submitToDiscord(newAnswers);
    }
  };

  const submitToDiscord = async (finalAnswers: { question: string; answer: string }[]) => {
    setStep("submitting");
    setError("");

    try {
      const res = await fetch("/api/discord-thread", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          topic: selectedTopic?.id,
          userName: userName || "Website Visitor",
          userEmail: userEmail || "Not provided",
          answers: finalAnswers,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setThreadName(data.threadName || "Learning Session");
        setStep("done");
      } else {
        setError(data.error || "Something went wrong. Please try again.");
        setStep("questions");
      }
    } catch {
      setError("Connection error. Please try again.");
      setStep("questions");
    }
  };

  const restart = () => {
    setStep("topics");
    setSelectedTopic(null);
    setCurrentQ(0);
    setAnswers([]);
    setError("");
  };

  const accentColor = selectedTopic?.color || "#3b82f6";

  return (
    <div className="min-h-screen text-white font-sans" style={{ backgroundColor: "#080810" }}>
      <Navbar />

      {/* Background */}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div className="absolute inset-0" key={accentColor}
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 1.5 }}
          style={{ background: `radial-gradient(ellipse 70% 50% at 30% 25%, ${accentColor}15 0%, transparent 70%), radial-gradient(ellipse 50% 40% at 75% 65%, ${accentColor}08 0%, transparent 60%)` }} />
        {Array.from({ length: 6 }).map((_, i) => (
          <motion.div key={i} className="absolute w-1.5 h-1.5 rotate-45 rounded-sm pointer-events-none"
            style={{ left: `${10 + i * 16}%`, top: `${15 + (i % 3) * 25}%`, background: `${accentColor}30`, boxShadow: `0 0 8px ${accentColor}20`, transition: "all 1s" }}
            animate={{ y: [0, -8, 4, 0], opacity: [0.1, 0.2, 0.08, 0.1] }}
            transition={{ duration: 8 + i, repeat: Infinity, delay: i * 0.8 }} />
        ))}
        <div className="absolute inset-0 opacity-[0.015]"
          style={{ backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.7) 1px, transparent 1px)", backgroundSize: "40px 40px" }} />
      </div>

      <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 pt-28 sm:pt-32 pb-20">

        <AnimatePresence mode="wait">

          {/* ══════ STEP 1: Topic selection ══════ */}
          {step === "topics" && (
            <motion.div key="topics" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <div className="text-center mb-10">
                <motion.div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-xs font-black uppercase tracking-widest mb-4"
                  style={{ borderColor: "#3b82f640", color: "#3b82f6", backgroundColor: "#3b82f610" }}>
                  🎓 Learning Hub
                </motion.div>
                <h1 className="text-2xl sm:text-3xl md:text-4xl font-black tracking-tight mb-3">What do you need help with?</h1>
                <p className="text-zinc-400 text-sm sm:text-base max-w-lg mx-auto">Choose a topic and answer a few quick questions. Our team will create a personalized learning session just for you.</p>
              </div>

              {/* Name/Email if not pre-filled */}
              {(!userName || !userEmail) && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-lg mx-auto">
                  <input type="text" placeholder="Your name" value={userName} onChange={e => setUserName(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors" />
                  <input type="email" placeholder="Your email" value={userEmail} onChange={e => setUserEmail(e.target.value)}
                    className="bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-blue-500/50 transition-colors" />
                </div>
              )}

              {/* 6 Topic cards */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
                {TOPICS.map((topic, i) => (
                  <motion.button key={topic.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.08 }}
                    onClick={() => handleSelectTopic(topic)}
                    className="group text-left p-5 rounded-xl border transition-all duration-300 hover:scale-[1.02]"
                    style={{ borderColor: `${topic.color}20`, backgroundColor: `${topic.color}06` }}
                    onMouseEnter={e => { e.currentTarget.style.borderColor = `${topic.color}50`; e.currentTarget.style.backgroundColor = `${topic.color}12`; e.currentTarget.style.boxShadow = `0 0 30px ${topic.color}15`; }}
                    onMouseLeave={e => { e.currentTarget.style.borderColor = `${topic.color}20`; e.currentTarget.style.backgroundColor = `${topic.color}06`; e.currentTarget.style.boxShadow = "none"; }}
                  >
                    <div className="text-2xl mb-2">{topic.emoji}</div>
                    <h3 className="font-bold text-sm sm:text-base mb-1" style={{ color: topic.color }}>{topic.label}</h3>
                    <p className="text-zinc-500 text-xs leading-relaxed">{topic.description}</p>
                    <div className="mt-3 text-[11px] font-bold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: topic.color }}>
                      Start →
                    </div>
                  </motion.button>
                ))}
              </div>

              <p className="text-center text-zinc-600 text-xs mt-8">
                Free diagnostic • No payment required • Our team responds within hours
              </p>
            </motion.div>
          )}

          {/* ══════ STEP 2: Questions flow ══════ */}
          {step === "questions" && selectedTopic && (
            <motion.div key="questions" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {/* Back button */}
              <button onClick={restart} className="flex items-center gap-2 text-zinc-500 text-sm hover:text-white transition-colors mb-6">
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M10 3L5 8L10 13" strokeLinecap="round" strokeLinejoin="round" /></svg>
                Back to topics
              </button>

              {/* Topic header */}
              <div className="flex items-center gap-3 mb-2">
                <div className="text-3xl">{selectedTopic.emoji}</div>
                <div>
                  <h2 className="text-xl sm:text-2xl font-black" style={{ color: selectedTopic.color }}>{selectedTopic.label}</h2>
                  <p className="text-zinc-500 text-xs">Question {currentQ + 1} of {selectedTopic.questions.length}</p>
                </div>
              </div>

              {/* Progress bar */}
              <div className="h-1 bg-white/5 rounded-full mb-8 overflow-hidden">
                <motion.div className="h-full rounded-full"
                  style={{ backgroundColor: selectedTopic.color }}
                  animate={{ width: `${((currentQ + 1) / selectedTopic.questions.length) * 100}%` }}
                  transition={{ duration: 0.4 }} />
              </div>

              {/* Question */}
              <AnimatePresence mode="wait">
                <motion.div key={`q-${currentQ}`}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.3 }}>
                  <h3 className="text-lg sm:text-xl font-bold mb-6 text-white">
                    {selectedTopic.questions[currentQ].text}
                  </h3>

                  <div className="flex flex-col gap-2.5">
                    {selectedTopic.questions[currentQ].options.map((option, i) => (
                      <motion.button key={option}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: i * 0.05 }}
                        onClick={() => handleAnswer(option)}
                        className="w-full text-left px-5 py-3.5 rounded-xl border text-sm transition-all duration-200 hover:scale-[1.01]"
                        style={{ borderColor: `${selectedTopic.color}20`, backgroundColor: `${selectedTopic.color}05` }}
                        onMouseEnter={e => { e.currentTarget.style.borderColor = `${selectedTopic.color}50`; e.currentTarget.style.backgroundColor = `${selectedTopic.color}15`; }}
                        onMouseLeave={e => { e.currentTarget.style.borderColor = `${selectedTopic.color}20`; e.currentTarget.style.backgroundColor = `${selectedTopic.color}05`; }}
                      >
                        <span className="text-zinc-300">{option}</span>
                      </motion.button>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Error */}
              {error && (
                <div className="mt-4 p-3 rounded-lg bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                  {error}
                </div>
              )}

              {/* Answered so far */}
              {answers.length > 0 && (
                <div className="mt-8 pt-6 border-t border-white/5">
                  <p className="text-zinc-600 text-xs uppercase tracking-wider mb-3">Your answers so far</p>
                  {answers.map((a, i) => (
                    <div key={i} className="text-xs text-zinc-500 mb-1.5">
                      <span className="text-zinc-600">{a.question}</span> → <span className="text-zinc-400">{a.answer}</span>
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          )}

          {/* ══════ STEP 3: Submitting ══════ */}
          {step === "submitting" && (
            <motion.div key="submitting" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-20">
              <motion.div className="w-12 h-12 rounded-full border-2 border-t-transparent mx-auto mb-4"
                style={{ borderColor: `${accentColor}60`, borderTopColor: "transparent" }}
                animate={{ rotate: 360 }} transition={{ duration: 1, repeat: Infinity, ease: "linear" }} />
              <p className="text-zinc-400">Creating your learning session...</p>
            </motion.div>
          )}

          {/* ══════ STEP 4: Done ══════ */}
          {step === "done" && (
            <motion.div key="done" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-12">
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 200 }}
                className="w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6"
                style={{ backgroundColor: `${accentColor}20` }}>
                <svg className="w-10 h-10" viewBox="0 0 24 24" fill="none" stroke={accentColor} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M20 6L9 17l-5-5" />
                </svg>
              </motion.div>

              <h2 className="text-2xl sm:text-3xl font-black mb-2">You are all set!</h2>
              <p className="text-zinc-400 text-sm sm:text-base max-w-md mx-auto mb-2">
                Your learning session has been created. Our learning team will review your answers and respond shortly.
              </p>
              <p className="text-zinc-500 text-xs mb-8">Thread: {threadName}</p>

              {/* What happens next */}
              <div className="max-w-lg mx-auto text-left mb-8">
                <h3 className="text-sm font-bold text-zinc-300 mb-4 text-center">What happens next?</h3>
                <div className="space-y-3">
                  {[
                    { icon: "📋", text: "Our team reviews your diagnostic answers", time: "Within 1 hour" },
                    { icon: "💬", text: "We match you with the right educator", time: "Within 4 hours" },
                    { icon: "📧", text: "You will receive an email with next steps", time: "Same day" },
                    { icon: "🎓", text: "Your personalized lesson is scheduled", time: "Within 24 hours" },
                  ].map((item, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
                      className="flex items-center gap-3 p-3 rounded-lg bg-white/[0.03] border border-white/[0.05]">
                      <span className="text-lg">{item.icon}</span>
                      <div className="flex-1">
                        <p className="text-sm text-zinc-300">{item.text}</p>
                      </div>
                      <span className="text-[11px] text-zinc-600">{item.time}</span>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-wrap justify-center gap-3">
                <Link href="/techbridge" className="px-5 py-2.5 rounded-xl font-bold text-sm border transition-all hover:scale-105"
                  style={{ color: "#3b82f6", borderColor: "#3b82f640", backgroundColor: "#3b82f610" }}>
                  Browse Free Tools
                </Link>
                <Link href="/pricing" className="px-5 py-2.5 rounded-xl font-bold text-sm border transition-all hover:scale-105"
                  style={{ color: "#8b5cf6", borderColor: "#8b5cf640", backgroundColor: "#8b5cf610" }}>
                  View Pricing
                </Link>
                <button onClick={restart} className="px-5 py-2.5 rounded-xl font-bold text-sm border border-white/10 text-zinc-400 hover:text-white transition-all hover:scale-105">
                  Start Another Topic
                </button>
              </div>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </div>
  );
}
