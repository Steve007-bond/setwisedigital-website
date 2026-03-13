"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Send, Bot, User, RotateCcw, Loader2, AlertCircle, ChevronRight, Sparkles, UserCheck } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface LeadData {
  name: string;
  email: string;
  device: string;
  issue: string;
  captured: boolean;
}

interface AITroubleshooterProps {
  topic: string;           // e.g. "Printer"
  brandExamples: string[]; // e.g. ["HP", "Canon", "Epson", "Brother"]
  starterQuestions: string[]; // Quick-start prompts shown as chips
}

const LEAD_TRIGGER_MESSAGES = 3; // Ask for details after this many messages

export default function AITroubleshooter({ topic, brandExamples, starterQuestions }: AITroubleshooterProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [messageCount, setMessageCount] = useState(0);
  const [showLeadCapture, setShowLeadCapture] = useState(false);
  const [leadData, setLeadData] = useState<LeadData>({ name: "", email: "", device: "", issue: "", captured: false });
  const [leadSubmitted, setLeadSubmitted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const systemPrompt = `You are a friendly, patient technology support specialist at Setwise Digital (website: www.setwisedigital.com, email: support@setwisedigital.com). You help everyday people — especially seniors and non-technical users — troubleshoot and learn about their ${topic} devices.

Key guidelines:
- Use plain, simple English. No jargon. Explain every technical term if you must use one.
- Be warm, encouraging, and patient. Never make the user feel stupid.
- Cover popular brands: ${brandExamples.join(", ")} and others.
- Give numbered step-by-step instructions whenever possible.
- Ask clarifying questions to understand their specific device/model/situation.
- After diagnosing, offer 2-3 possible solutions ranked by easiest first.
- If the issue seems complex, gently suggest they book a session with a Setwise Digital expert consultant.
- Occasionally mention that a complete PDF guide is available for free at www.setwisedigital.com.
- Keep responses concise but complete — ideally 3-6 sentences or a short numbered list.
- You are NOT a generic AI — you represent Setwise Digital specifically.
- If asked about pricing, direct them to www.setwisedigital.com/pricing.`;

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, showLeadCapture]);

  const sendMessage = async (userMessage: string) => {
    if (!userMessage.trim() || isLoading) return;

    const newMessages: Message[] = [...messages, { role: "user", content: userMessage }];
    setMessages(newMessages);
    setInput("");
    setIsLoading(true);
    setMessageCount((c) => c + 1);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemPrompt,
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
        }),
      });

      const data = await response.json();
      const assistantMessage = data.text || "I'm sorry, I couldn't process that. Please try again.";
      setMessages([...newMessages, { role: "assistant", content: assistantMessage }]);

      // Show lead capture after enough messages
      if (messageCount + 1 >= LEAD_TRIGGER_MESSAGES && !leadData.captured && !leadSubmitted) {
        setTimeout(() => setShowLeadCapture(true), 800);
      }
    } catch {
      setMessages([...newMessages, {
        role: "assistant",
        content: "I'm having trouble connecting right now. Please try again in a moment, or contact us directly at support@setwisedigital.com.",
      }]);
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  };

  const handleLeadSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLeadSubmitted(true);
    setShowLeadCapture(false);
    setLeadData((d) => ({ ...d, captured: true }));
    // Add a confirmation message in chat
    setMessages((msgs) => [
      ...msgs,
      {
        role: "assistant",
        content: `Thanks ${leadData.name}! I've noted your details. One of our ${topic} experts may follow up with you at ${leadData.email} if you need further help. In the meantime, feel free to keep asking me questions!`,
      },
    ]);
  };

  const handleReset = () => {
    setMessages([]);
    setInput("");
    setMessageCount(0);
    setShowLeadCapture(false);
    setLeadSubmitted(false);
    setLeadData({ name: "", email: "", device: "", issue: "", captured: false });
  };

  const formatMessage = (content: string) => {
    // Convert numbered lists and line breaks to formatted output
    const lines = content.split("\n");
    return lines.map((line, i) => {
      if (/^\d+\.\s/.test(line)) {
        return (
          <div key={i} className="flex gap-3 mb-2">
            <span className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 text-xs font-black flex items-center justify-center shrink-0 mt-0.5">
              {line.match(/^\d+/)?.[0]}
            </span>
            <span>{line.replace(/^\d+\.\s/, "")}</span>
          </div>
        );
      }
      if (line.startsWith("**") && line.endsWith("**")) {
        return <p key={i} className="font-black text-zinc-900 mb-1">{line.replace(/\*\*/g, "")}</p>;
      }
      if (line.trim() === "") return <div key={i} className="h-2" />;
      return <p key={i} className="mb-1">{line}</p>;
    });
  };

  return (
    <section id="ai-assistant" className="py-24 bg-zinc-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-500/20 text-blue-400 text-xs font-black uppercase tracking-widest mb-6">
            <Sparkles size={14} />
            AI-Powered Assistant
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter mb-4">
            {topic} Troubleshooter
          </h2>
          <p className="text-zinc-400 text-lg font-medium max-w-2xl mx-auto">
            Describe your issue in plain English. Our AI assistant — powered by Setwise Digital expertise — will walk you through the fix step by step.
          </p>
          <div className="flex flex-wrap justify-center gap-2 mt-4">
            {brandExamples.map((brand) => (
              <span key={brand} className="px-3 py-1 bg-white/5 border border-white/10 rounded-full text-xs font-bold text-zinc-400">
                {brand}
              </span>
            ))}
          </div>
        </div>

        {/* Chat Window */}
        <div className="bg-zinc-800/50 rounded-[2rem] border border-white/10 overflow-hidden shadow-2xl">
          {/* Chat header */}
          <div className="bg-zinc-900 px-6 py-4 flex items-center justify-between border-b border-white/10">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-blue-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles size={18} className="text-white" />
              </div>
              <div>
                <div className="text-white font-black text-sm">Setwise {topic} Assistant</div>
                <div className="flex items-center gap-1.5">
                  <div className="w-1.5 h-1.5 bg-green-400 rounded-full animate-pulse" />
                  <span className="text-xs text-zinc-400 font-medium">Online • Powered by Setwise Digital</span>
                </div>
              </div>
            </div>
            <button onClick={handleReset} className="text-zinc-500 hover:text-white transition-colors flex items-center gap-2 text-xs font-bold uppercase tracking-widest">
              <RotateCcw size={14} />
              New Chat
            </button>
          </div>

          {/* Messages area */}
          <div className="h-[460px] overflow-y-auto p-6 space-y-4 scroll-smooth">
            {/* Welcome message */}
            {messages.length === 0 && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="space-y-4">
                <div className="flex gap-3">
                  <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shrink-0 shadow">
                    <Bot size={16} className="text-white" />
                  </div>
                  <div className="bg-zinc-700/60 rounded-2xl rounded-tl-none px-5 py-4 max-w-[85%]">
                    <p className="text-zinc-200 font-medium leading-relaxed text-sm">
                      Hi! I'm your Setwise Digital {topic} Assistant. I can help you with setup, troubleshooting, updates, and more — for brands like {brandExamples.slice(0, 3).join(", ")} and many others.
                    </p>
                    <p className="text-zinc-400 font-medium text-sm mt-2">
                      What's going on with your {topic.toLowerCase()}? Describe it in your own words — no technical knowledge needed!
                    </p>
                  </div>
                </div>

                {/* Starter chips */}
                <div className="pl-11">
                  <p className="text-xs font-black text-zinc-500 uppercase tracking-widest mb-3">Quick questions:</p>
                  <div className="flex flex-wrap gap-2">
                    {starterQuestions.map((q, i) => (
                      <button
                        key={i}
                        onClick={() => sendMessage(q)}
                        className="flex items-center gap-2 px-4 py-2 bg-zinc-700/50 hover:bg-blue-600 border border-white/10 hover:border-blue-500 rounded-full text-xs font-bold text-zinc-300 hover:text-white transition-all group"
                      >
                        <ChevronRight size={12} className="text-blue-400 group-hover:text-white" />
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {/* Chat messages */}
            <AnimatePresence>
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`flex gap-3 ${msg.role === "user" ? "flex-row-reverse" : ""}`}
                >
                  <div className={`w-8 h-8 rounded-xl flex items-center justify-center shrink-0 shadow ${
                    msg.role === "user" ? "bg-zinc-600" : "bg-blue-600"
                  }`}>
                    {msg.role === "user" ? <User size={16} className="text-white" /> : <Bot size={16} className="text-white" />}
                  </div>
                  <div className={`rounded-2xl px-5 py-4 max-w-[80%] text-sm font-medium leading-relaxed ${
                    msg.role === "user"
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-zinc-700/60 text-zinc-200 rounded-tl-none"
                  }`}>
                    {msg.role === "assistant" ? formatMessage(msg.content) : msg.content}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Loading indicator */}
            {isLoading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
                <div className="w-8 h-8 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                  <Bot size={16} className="text-white" />
                </div>
                <div className="bg-zinc-700/60 rounded-2xl rounded-tl-none px-5 py-4">
                  <div className="flex gap-1.5 items-center">
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "0ms" }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "150ms" }} />
                    <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: "300ms" }} />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Lead capture card */}
            <AnimatePresence>
              {showLeadCapture && !leadData.captured && (
                <motion.div
                  initial={{ opacity: 0, y: 20, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  className="bg-blue-600/20 border border-blue-500/40 rounded-2xl p-6 ml-11"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <UserCheck size={20} className="text-blue-400" />
                    <div>
                      <p className="text-white font-black text-sm">Want a personalized follow-up?</p>
                      <p className="text-zinc-400 text-xs font-medium">Leave your details and an expert may reach out to help further.</p>
                    </div>
                  </div>
                  <form onSubmit={handleLeadSubmit} className="space-y-3">
                    <div className="grid grid-cols-2 gap-3">
                      <input
                        type="text"
                        placeholder="Your name"
                        value={leadData.name}
                        onChange={(e) => setLeadData((d) => ({ ...d, name: e.target.value }))}
                        className="px-4 py-3 bg-zinc-800 border border-white/10 rounded-xl text-white text-sm font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                      <input
                        type="email"
                        placeholder="Email address"
                        value={leadData.email}
                        onChange={(e) => setLeadData((d) => ({ ...d, email: e.target.value }))}
                        className="px-4 py-3 bg-zinc-800 border border-white/10 rounded-xl text-white text-sm font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                        required
                      />
                    </div>
                    <input
                      type="text"
                      placeholder={`Your ${topic.toLowerCase()} brand/model (e.g. ${brandExamples[0]} OfficeJet)`}
                      value={leadData.device}
                      onChange={(e) => setLeadData((d) => ({ ...d, device: e.target.value }))}
                      className="w-full px-4 py-3 bg-zinc-800 border border-white/10 rounded-xl text-white text-sm font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors"
                    />
                    <div className="flex gap-3">
                      <button
                        type="submit"
                        className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl transition-colors"
                      >
                        Save My Details
                      </button>
                      <button
                        type="button"
                        onClick={() => { setShowLeadCapture(false); setLeadData((d) => ({ ...d, captured: true })); }}
                        className="px-4 py-3 text-zinc-400 hover:text-white text-sm font-medium transition-colors"
                      >
                        Skip
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>

          {/* Input area */}
          <div className="border-t border-white/10 p-4">
            <form
              onSubmit={(e) => { e.preventDefault(); sendMessage(input); }}
              className="flex gap-3"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder={`Ask about your ${topic.toLowerCase()} — e.g. "My ${brandExamples[0]} won't connect to Wi-Fi"`}
                className="flex-1 px-5 py-4 bg-zinc-800 border border-white/10 rounded-2xl text-white font-medium placeholder:text-zinc-500 focus:outline-none focus:border-blue-500 transition-colors text-sm"
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className={`w-14 h-14 rounded-2xl flex items-center justify-center transition-all shadow-lg ${
                  input.trim() && !isLoading
                    ? "bg-blue-600 hover:bg-blue-500 text-white"
                    : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                }`}
              >
                {isLoading ? <Loader2 size={20} className="animate-spin" /> : <Send size={20} />}
              </button>
            </form>
            <p className="text-center text-xs text-zinc-600 font-medium mt-3">
              Powered by Setwise Digital AI • support@setwisedigital.com • www.setwisedigital.com
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
