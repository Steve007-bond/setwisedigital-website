"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Send, Bot, User, RotateCcw, Loader2, Sparkles,
  ChevronRight, Lightbulb, Star, Phone, Mail, Gift, Shield
} from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
  tip?: string;        // inline upsell tip shown under message
  action?: ActionCard; // optional card rendered after message
}

interface ActionCard {
  type: "lead" | "upgrade" | "book" | "guide";
  title: string;
  description: string;
}

interface LeadProfile {
  name: string;
  email: string;
  phone: string;
  age: string;
  purpose: string;
  device: string;
  interests: string[];
  captured: boolean;
}

interface AITroubleshooterProps {
  topic: string;
  brandExamples: string[];
  starterQuestions: string[];
}

const SYSTEM_PROMPT = (topic: string, brands: string[]) => `
You are Alex, a warm and knowledgeable technology advisor at Setwise Digital. You are NOT just a troubleshooter — you are a trusted guide who helps people get MORE value from their technology.

YOUR PERSONALITY:
- Warm, patient, encouraging — like a helpful neighbour who happens to know tech
- You celebrate small wins ("Great job trying that!")
- You make people feel capable, not helpless
- You're genuinely curious about people's lives and how tech fits in

YOUR MISSION (3 layers):
1. SOLVE their immediate problem with clear, numbered steps
2. DISCOVER hidden value — after solving, always share 1-2 things they didn't know their device could do
3. PITCH naturally — weave in learning opportunities that feel helpful, not salesy

BRANDS YOU COVER: ${brands.join(", ")} and all major brands.

HOW TO RESPOND:
- Always start by understanding their exact situation
- Use their name if they've shared it
- After giving a solution, add a "💡 Did you know?" section with a genuinely useful feature tip specific to their device/model if mentioned
- After 2-3 messages, naturally ask: "By the way, what do you mainly use your ${topic.toLowerCase()} for?" — this helps you personalise advice AND qualifies the lead
- After they share their purpose, say something like: "That's actually a great use case — a lot of people doing [their purpose] don't realise they can also [cool feature]. Would you like me to walk you through that too?"
- Suggest the PDF guide, expert session, or learning package at natural moments — NOT every message
- Keep responses SHORT and scannable — max 5 lines or a numbered list of 4 steps

LEAD CAPTURE TRIGGERS (mention naturally when relevant):
- "I can send you a personalised tip sheet for your exact model if you share your email"
- "Our expert consultants do 1-on-1 sessions — would that help for something like this?"
- "We have a free guide covering exactly this — want me to arrange that for you?"

NEVER:
- Sound like a salesperson
- Repeat the same pitch twice
- Make the user feel like they are being sold to
- Give more than 5 steps at once
`;

const DISCOVERY_FEATURES: Record<string, string[]> = {
  Printer: [
    "Print directly from your phone without a computer using Wi-Fi Direct",
    "Schedule automatic ink level alerts so you never run out mid-print",
    "Scan documents straight to your email with one button press",
    "Use Quiet Mode for printing at night without disturbing anyone",
    "Print from cloud storage like Google Drive or Dropbox",
  ],
  GPS: [
    "Save your home and work addresses for one-tap navigation",
    "Use Trip Planner to add multiple stops before you leave",
    "Enable lane guidance so you never miss a highway exit",
    "Download offline maps so GPS works without mobile data",
    "Set speed alerts to stay within limits automatically",
  ],
  "Smart Home": [
    "Create a Good Morning routine that turns on lights and reads your calendar",
    "Use Guard Mode on Alexa to listen for smoke alarms when you're away",
    "Control your thermostat by voice — 'Alexa, set temperature to 72'",
    "Set up routines that run automatically at sunset",
    "Use Drop-In to instantly connect to another Echo in your home",
  ],
  Alexa: [
    "Ask Alexa to read your Kindle books aloud while you do chores",
    "Set up medication reminders that announce on all your Echo devices",
    "Use Alexa Guard to detect glass breaking or smoke when you're out",
    "Create a Shopping List that syncs to the Alexa app on your phone",
    "Enable Whisper Mode — Alexa whispers back when you whisper",
  ],
  Camera: [
    "Use Interval Shooting to automatically take photos every few seconds",
    "Connect to your phone via Bluetooth for instant photo transfer",
    "Use the self-timer with multiple shots for group photos without rushing",
    "Enable highlight warnings to prevent overexposed photos",
    "Use Picture Profiles to get the exact colour tone you prefer",
  ],
  Security: [
    "Set up Two-Factor Authentication on all accounts in under 5 minutes",
    "Use a Password Manager to generate and store strong unique passwords",
    "Enable automatic backups so your files are always safe",
    "Set up login notifications to know when someone accesses your accounts",
    "Use Guest Wi-Fi for visitors so your main network stays protected",
  ],
};

export default function AITroubleshooter({ topic, brandExamples, starterQuestions }: AITroubleshooterProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [msgCount, setMsgCount] = useState(0);
  const [profile, setProfile] = useState<LeadProfile>({
    name: "", email: "", phone: "", age: "", purpose: "",
    device: "", interests: [], captured: false,
  });
  const [showLeadForm, setShowLeadForm] = useState(false);
  const [leadSent, setLeadSent] = useState(false);
  const [tipIndex, setTipIndex] = useState(0);
  const [stepsCompleted, setStepsCompleted] = useState(0);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const features = DISCOVERY_FEATURES[topic] || DISCOVERY_FEATURES["Printer"];

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showLeadForm]);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;
    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    const newCount = msgCount + 1;
    setMsgCount(newCount);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt: SYSTEM_PROMPT(topic, brandExamples),
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const text = data.text || "I'm having trouble right now — please try again.";

      // Rotate feature tips
      const tip = newCount % 3 === 0 ? features[tipIndex % features.length] : undefined;
      if (newCount % 3 === 0) setTipIndex((i) => i + 1);

      // Show lead form naturally after 3 messages
      const shouldShowLead = newCount === 3 && !profile.captured;

      setMessages([...newMessages, {
        role: "assistant",
        content: text,
        tip,
        action: shouldShowLead ? {
          type: "lead",
          title: "Get personalised tips for your device",
          description: "Share a few details and I'll tailor everything specifically to your setup.",
        } : undefined,
      }]);

      setStepsCompleted((s) => Math.min(s + 1, 15));
      if (shouldShowLead) setTimeout(() => setShowLeadForm(true), 600);
    } catch {
      setMessages([...newMessages, {
        role: "assistant",
        content: "Something went wrong — please try again or contact support@setwisedigital.com",
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const submitLead = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSent(true);
    setShowLeadForm(false);
    setProfile((p) => ({ ...p, captured: true }));

    // Send to Discord
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
          phone: profile.phone,
          topic,
          device: profile.device,
          issue: `Age: ${profile.age} | Purpose: ${profile.purpose} | Interests: ${profile.interests.join(", ")}`,
          availability: "Via AI chat lead capture",
          contactMethod: "Email",
        }),
      });
    } catch {}

    setMessages((msgs) => [...msgs, {
      role: "assistant",
      content: `Thanks ${profile.name}! 🎉 I've noted your details. ${profile.purpose ? `Since you mainly use your ${topic.toLowerCase()} for ${profile.purpose}, let me give you some tips specifically for that...` : "Let me personalise your experience from here."} You can keep asking me anything — I'm here to help!`,
    }]);
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
    setMsgCount(0);
    setShowLeadForm(false);
    setLeadSent(false);
    setTipIndex(0);
    setProfile({ name: "", email: "", phone: "", age: "", purpose: "", device: "", interests: [], captured: false });
    setStepsCompleted(0);
  };

  const formatMessage = (content: string) => {
    return content.split("\n").map((line, i) => {
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={i} className="flex gap-3 mb-2 items-start">
            <span className="w-5 h-5 rounded-full bg-blue-500/20 text-blue-300 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
              {line.match(/^\d+/)?.[0]}
            </span>
            <span className="text-sm leading-relaxed">{line.replace(/^\d+\.\s/, "")}</span>
          </div>
        );
      }
      if (line.startsWith("💡")) {
        return (
          <div key={i} className="mt-3 p-3 bg-yellow-500/10 border border-yellow-500/20 rounded-xl text-xs text-yellow-300 font-medium">
            {line}
          </div>
        );
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="text-sm leading-relaxed mb-1">{line}</p>;
    });
  };

  return (
    <div id="ai-assistant">
      <div className="max-w-4xl mx-auto px-2">
        {/* Header */}
        <div className="text-center mb-10">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            AI Sales & Support Agent
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            {topic} Expert Assistant
          </h2>
          <p className="text-zinc-400 text-lg font-medium max-w-2xl mx-auto">
            Get instant help, discover hidden features, and learn how to get more from your {topic.toLowerCase()} — all in plain English.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {brandExamples.map((b) => (
              <span key={b} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-zinc-400">{b}</span>
            ))}
          </div>
        </div>

        {/* Feature tips strip */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-6">
          {features.slice(0, 3).map((f, i) => (
            <div key={i} className="flex items-start gap-3 p-3 bg-white/5 border border-white/10 rounded-2xl">
              <Lightbulb size={14} className="text-yellow-400 shrink-0 mt-0.5" />
              <span className="text-xs text-zinc-400 font-medium leading-relaxed">{f}</span>
            </div>
          ))}
        </div>

        {/* Chat Window */}
        <div className="bg-zinc-800/50 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          {/* Header bar */}
          <div className="bg-zinc-900 px-6 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles size={16} className="text-white" />
              </div>
              <div>
                <div className="text-white font-black text-sm">Alex — Setwise {topic} Advisor</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-zinc-400 font-medium">Online • Solves problems + discovers hidden value</span>
                </div>
              </div>
            </div>
            <button onClick={handleReset} className="text-zinc-500 hover:text-white transition-colors flex items-center gap-1 text-xs font-bold uppercase tracking-widest">
              <RotateCcw size={12} /> Reset
            </button>
          </div>
          {/* 15-step progress bar */}
          <div className="bg-zinc-900/80 px-6 py-3 border-b border-white/5 flex items-center gap-3">
            <span className="text-zinc-500 text-xs font-black shrink-0">STEP {stepsCompleted}/15</span>
            <div className="flex-1 flex gap-1">
              {Array.from({ length: 15 }).map((_, i) => (
                <div key={i} className="flex-1 h-1.5 rounded-full overflow-hidden bg-zinc-800">
                  <motion.div
                    className="h-full bg-gradient-to-r from-violet-500 to-blue-500 rounded-full"
                    initial={{ width: 0 }}
                    animate={{ width: i < stepsCompleted ? "100%" : "0%" }}
                    transition={{ duration: 0.4, delay: i * 0.03 }}
                  />
                </div>
              ))}
            </div>
            {stepsCompleted === 15 && (
              <motion.span initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }}
                className="text-xs font-black text-green-400 shrink-0">✓ Complete</motion.span>
            )}
          </div>

          {/* Messages */}
          <div className="h-[500px] overflow-y-auto p-6 space-y-4 scroll-smooth">
            {messages.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                    <Bot size={14} className="text-white" />
                  </div>
                  <div className="bg-zinc-700/60 rounded-2xl rounded-tl-none px-5 py-4 max-w-[85%]">
                    <p className="text-zinc-200 font-medium text-sm leading-relaxed">
                      Hi! I'm Alex, your Setwise Digital {topic} advisor. 👋
                    </p>
                    <p className="text-zinc-400 text-sm mt-2 leading-relaxed">
                      I can fix your issue <span className="text-white font-bold">and</span> show you features you probably didn't know you had. What's going on with your {topic.toLowerCase()} today?
                    </p>
                  </div>
                </div>
                <div className="pl-11">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Common questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {starterQuestions.map((q, i) => (
                      <button key={i} onClick={() => sendMessage(q)}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-700/50 hover:bg-blue-600 border border-white/10 hover:border-blue-500 rounded-full text-xs font-bold text-zinc-300 hover:text-white transition-all group">
                        <ChevronRight size={10} className="text-blue-400 group-hover:text-white" />
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-2">
                  <div className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}>
                    <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow ${
                      msg.role === "user" ? "bg-zinc-600" : "bg-gradient-to-br from-blue-500 to-indigo-600"
                    }`}>
                      {msg.role === "user" ? <User size={14} className="text-white" /> : <Bot size={14} className="text-white" />}
                    </div>
                    <div className={`rounded-2xl px-5 py-4 max-w-[80%] text-sm font-medium leading-relaxed ${
                      msg.role === "user"
                        ? "bg-blue-600 text-white rounded-tr-none"
                        : "bg-zinc-700/60 text-zinc-200 rounded-tl-none"
                    }`}>
                      {msg.role === "assistant" ? formatMessage(msg.content) : msg.content}
                    </div>
                  </div>

                  {/* Feature tip bubble */}
                  {msg.tip && msg.role === "assistant" && (
                    <motion.div initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: 0.3 }}
                      className="ml-11 flex items-start gap-3 p-4 bg-gradient-to-r from-yellow-500/10 to-amber-500/10 border border-yellow-500/20 rounded-2xl">
                      <Lightbulb size={16} className="text-yellow-400 shrink-0 mt-0.5" />
                      <div>
                        <div className="text-yellow-300 font-black text-xs uppercase tracking-widest mb-1">Did you know?</div>
                        <div className="text-zinc-300 text-xs font-medium leading-relaxed">{msg.tip}</div>
                        <button onClick={() => sendMessage(`Tell me more about: ${msg.tip}`)}
                          className="mt-2 text-xs text-yellow-400 font-bold hover:text-yellow-300 flex items-center gap-1">
                          Tell me more <ChevronRight size={10} />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>

            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shrink-0">
                  <Bot size={14} className="text-white" />
                </div>
                <div className="bg-zinc-700/60 rounded-2xl rounded-tl-none px-5 py-4">
                  <div className="flex gap-1.5 items-center">
                    {[0, 150, 300].map((d) => (
                      <div key={d} className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: `${d}ms` }} />
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Lead capture form — inline in chat */}
            <AnimatePresence>
              {showLeadForm && !profile.captured && (
                <motion.div initial={{ opacity: 0, y: 20, scale: 0.95 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0 }}
                  className="ml-11 bg-gradient-to-br from-blue-600/20 to-indigo-600/20 border border-blue-500/30 rounded-2xl p-5">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center">
                      <Gift size={18} className="text-white" />
                    </div>
                    <div>
                      <div className="text-white font-black text-sm">Personalise your experience</div>
                      <div className="text-zinc-400 text-xs font-medium">Takes 30 seconds — unlocks tailored advice</div>
                    </div>
                  </div>

                  <form onSubmit={submitLead} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input type="text" placeholder="Your first name *" value={profile.name}
                        onChange={(e) => setProfile((p) => ({ ...p, name: e.target.value }))}
                        className="px-3 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white text-xs font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors" required />
                      <input type="number" placeholder="Your age (optional)" value={profile.age}
                        onChange={(e) => setProfile((p) => ({ ...p, age: e.target.value }))}
                        className="px-3 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white text-xs font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <input type="email" placeholder="Email address *" value={profile.email}
                        onChange={(e) => setProfile((p) => ({ ...p, email: e.target.value }))}
                        className="px-3 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white text-xs font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors" required />
                      <input type="tel" placeholder="Phone (optional)" value={profile.phone}
                        onChange={(e) => setProfile((p) => ({ ...p, phone: e.target.value }))}
                        className="px-3 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white text-xs font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors" />
                    </div>
                    <input type="text" placeholder={`What do you mainly use your ${topic.toLowerCase()} for? *`}
                      value={profile.purpose}
                      onChange={(e) => setProfile((p) => ({ ...p, purpose: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white text-xs font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors" required />
                    <input type="text" placeholder="Your device brand/model (e.g. HP OfficeJet 8015)"
                      value={profile.device}
                      onChange={(e) => setProfile((p) => ({ ...p, device: e.target.value }))}
                      className="w-full px-3 py-2.5 bg-zinc-800 border border-white/10 rounded-xl text-white text-xs font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors" />

                    {/* Interest chips */}
                    <div>
                      <div className="text-xs text-zinc-500 font-bold mb-2">What would help you most? (tap to select)</div>
                      <div className="flex flex-wrap gap-2">
                        {["Step-by-step guides", "Hidden features", "Money-saving tips", "Expert 1-on-1 help", "Free PDF guides", "Video tutorials"].map((interest) => (
                          <button key={interest} type="button"
                            onClick={() => setProfile((p) => ({
                              ...p,
                              interests: p.interests.includes(interest)
                                ? p.interests.filter((i) => i !== interest)
                                : [...p.interests, interest]
                            }))}
                            className={`px-3 py-1.5 rounded-full text-xs font-bold border transition-all ${
                              profile.interests.includes(interest)
                                ? "bg-blue-600 border-blue-500 text-white"
                                : "bg-zinc-800 border-white/10 text-zinc-400 hover:border-blue-500"
                            }`}>
                            {interest}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="flex gap-2 pt-1">
                      <button type="submit"
                        className="flex-1 py-2.5 bg-blue-600 hover:bg-blue-500 text-white font-black text-xs rounded-xl transition-colors flex items-center justify-center gap-2">
                        <Star size={14} /> Personalise My Experience
                      </button>
                      <button type="button" onClick={() => { setShowLeadForm(false); setProfile((p) => ({ ...p, captured: true })); }}
                        className="px-4 py-2.5 text-zinc-500 hover:text-zinc-300 text-xs font-medium transition-colors">
                        Skip
                      </button>
                    </div>
                    <p className="text-center text-xs text-zinc-600">🔒 Your info is safe — we never spam</p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Post-lead upsell cards */}
            {leadSent && !showLeadForm && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                className="ml-11 grid grid-cols-1 sm:grid-cols-3 gap-3 mt-2">
                {[
                  { icon: <Mail size={16} />, title: "Free PDF Guide", desc: "Get the complete guide emailed to you", color: "border-blue-500/30 bg-blue-500/10" },
                  { icon: <Phone size={16} />, title: "Book Expert Session", desc: "1-on-1 help from a real consultant", color: "border-indigo-500/30 bg-indigo-500/10" },
                  { icon: <Shield size={16} />, title: "Learning Package", desc: "Master your device at your own pace", color: "border-violet-500/30 bg-violet-500/10" },
                ].map((card, i) => (
                  <button key={i} onClick={() => sendMessage(`Tell me more about the ${card.title}`)}
                    className={`p-3 rounded-2xl border ${card.color} text-left hover:scale-105 transition-all`}>
                    <div className="text-blue-400 mb-2">{card.icon}</div>
                    <div className="text-white font-black text-xs mb-1">{card.title}</div>
                    <div className="text-zinc-500 text-xs">{card.desc}</div>
                  </button>
                ))}
              </motion.div>
            )}

            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/10 p-4">
            <form onSubmit={(e) => { e.preventDefault(); sendMessage(input); }} className="flex gap-3">
              <input ref={inputRef} type="text" value={input} onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask Alex anything about your ${topic.toLowerCase()}...`}
                className="flex-1 px-5 py-4 bg-zinc-800 border border-white/10 rounded-2xl text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                disabled={isLoading} />
              <button type="submit" disabled={!input.trim() || isLoading}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                  input.trim() && !isLoading ? "bg-blue-600 hover:bg-blue-500 text-white" : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                }`}>
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </form>
            <p className="text-center text-xs text-zinc-600 mt-3">
              Alex is powered by Setwise Digital AI • support@setwisedigital.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
