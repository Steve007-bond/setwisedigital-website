"use client";

import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, ArrowLeft, ChevronRight, Loader2, Star, Phone, Mail, User, Zap } from "lucide-react";

export interface WizardConfig {
  source: string;
  accentColor: string;
  accentHex: string;
  step1Title: string;
  step1Options: { label: string; icon: string; popular?: boolean }[];
  step2Title: string;
  step2Options: { label: string; icon: string }[];
  brandOptions: { label: string; icon: string }[];
  processingMessages: string[];
}

interface LeadWizardProps {
  config: WizardConfig;
  onComplete?: (data: LeadData) => void;
}

interface LeadData {
  name: string;
  email: string;
  phone: string;
  brand: string;
  issue: string;
  source: string;
}

export default function LeadWizard({ config, onComplete }: LeadWizardProps) {
  const [step, setStep] = useState(0);
  const [dir, setDir] = useState(1);
  const [issue, setIssue] = useState("");
  const [goal, setGoal] = useState("");
  const [brand, setBrand] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [msgIdx, setMsgIdx] = useState(0);
  const [progress, setProgress] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const totalSteps = 5;

  const go = (n: number) => { setDir(n > step ? 1 : -1); setStep(n); };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    if (!phone.trim()) e.phone = "Phone number is required";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const validateStep2 = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const startProcessing = async () => {
    if (!validate()) return;
    setDir(1); setStep(4);
    setProgress(0); setMsgIdx(0);
    const interval = setInterval(() => setProgress((p: number) => Math.min(p + 2, 100)), 50);
    config.processingMessages.forEach((_: string, i: number) => {
      timerRef.current = setTimeout(() => setMsgIdx(i), i * 800);
    });
    setTimeout(() => { clearInterval(interval); setProgress(100); }, 2600);
    try {
      await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, email, phone, brand, issue: `${issue} / ${goal}`, source: config.source }),
      });
    } catch {}
    setTimeout(async () => {
      setDone(true);
      onComplete?.({ name, email, phone, brand, issue, source: config.source });
      try {
        const topicName = config.source.replace("-page", "").replace("-", " ");
        const res = await fetch("/api/generate-pdf", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email, phone, brand, issue, topic: topicName }),
        });
        if (res.ok) {
          const blob = await res.blob();
          const url = URL.createObjectURL(blob);
          const a = document.createElement("a");
          a.href = url;
          a.download = `setwise-${topicName.replace(/\s+/g, "-")}-guide.html`;
          a.click();
          URL.revokeObjectURL(url);
        }
      } catch {}
    }, 3200);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const accent = config.accentColor;

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12 px-6">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
        <CheckCircle2 size={40} className="text-white" />
      </motion.div>
      <h3 className="text-3xl font-black text-white mb-3">You&apos;re all set{name ? `, ${name}` : ""}! 🎉</h3>
      <p className="text-zinc-400 font-medium mb-6">
        Check your <span className="text-white font-bold">downloads folder</span> for your guide — and our team will follow up at <span className="text-white font-bold">{email}</span>.
      </p>
      <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.4 }}
        onClick={async () => {
          try {
            const topicName = config.source.replace("-page", "").replace("-", " ");
            const res = await fetch("/api/generate-pdf", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ name, email, phone, brand, issue, topic: topicName }) });
            if (res.ok) { const blob = await res.blob(); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = `setwise-guide.html`; a.click(); URL.revokeObjectURL(url); }
          } catch {}
        }}
        className={`w-full py-4 mb-6 rounded-2xl font-black text-white bg-gradient-to-r ${accent} flex items-center justify-center gap-3 shadow-lg`}>
        <Mail size={20} /> Download Your Guide Again
      </motion.button>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <Mail size={18} />, label: "Guide Downloaded", desc: "Check your downloads folder" },
          { icon: <Phone size={18} />, label: "We\'ll Call You", desc: `At ${phone || "your number"}` },
          { icon: <Star size={18} />, label: "More Guides", desc: "Visit setwisedigital.com" },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3 + i * 0.1 }}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl group">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-3`}>
              <span className="text-white">{card.icon}</span>
            </div>
            <div className="font-black text-white text-sm">{card.label}</div>
            <div className="text-zinc-500 text-xs font-medium">{card.desc}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  // ─── Render each step directly (NO absolute positioning) ───────────────────
  const renderStep = () => {
    // STEP 0 — Issue picker
    if (step === 0) return (
      <div className="space-y-6">
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{config.step1Title}</h3>
          <p className="text-zinc-500 text-sm font-medium">Select the one that fits best</p>
        </div>
        <div className="grid grid-cols-2 gap-3">
          {config.step1Options.map((opt, i) => (
            <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
              onClick={() => setIssue(opt.label)}
              className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                issue === opt.label ? "border-blue-500 bg-blue-500/10" : "border-white/10 bg-white/5 hover:border-white/20"
              }`}>
              {opt.popular && (
                <span className="absolute -top-2.5 -right-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-black rounded-full">Popular</span>
              )}
              <div className="text-3xl mb-3">{opt.icon}</div>
              <div className="font-black text-white text-sm md:text-base">{opt.label}</div>
              {issue === opt.label && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                  className="absolute top-2 right-2 w-5 h-5 bg-blue-500 rounded-full flex items-center justify-center">
                  <CheckCircle2 size={12} className="text-white" />
                </motion.div>
              )}
            </motion.button>
          ))}
        </div>
        <AnimatePresence>
          {issue && (
            <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
              onClick={() => go(1)}
              className={`w-full py-5 rounded-2xl font-black text-white text-lg bg-gradient-to-r ${accent} flex items-center justify-center gap-2 shadow-lg`}>
              Continue <ChevronRight size={20} />
            </motion.button>
          )}
        </AnimatePresence>
      </div>
    );

    // STEP 1 — Brand + Goal
    if (step === 1) return (
      <div className="space-y-6">
        <button onClick={() => go(0)} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-1">{config.step2Title}</h3>
          <p className="text-zinc-500 text-sm font-medium">Pick your brand</p>
        </div>
        <div className="flex flex-wrap gap-2">
          {config.brandOptions.map((b, i) => (
            <motion.button key={i} whileTap={{ scale: 0.95 }} onClick={() => setBrand(b.label)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full border-2 font-bold text-sm transition-all ${
                brand === b.label ? "border-blue-500 bg-blue-500/20 text-white" : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
              }`}>
              <span className="text-base">{b.icon}</span> {b.label}
            </motion.button>
          ))}
        </div>
        <p className="text-zinc-500 text-sm font-medium">What do you want help with?</p>
        <div className="flex flex-wrap gap-2">
          {config.step2Options.map((opt, i) => (
            <motion.button key={i} whileTap={{ scale: 0.95 }} onClick={() => setGoal(opt.label)}
              className={`flex items-center gap-2 px-4 py-3 rounded-full border-2 font-bold text-sm transition-all ${
                goal === opt.label ? "border-blue-500 bg-blue-500/20 text-white" : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
              }`}>
              <span className="text-base">{opt.icon}</span> {opt.label}
            </motion.button>
          ))}
        </div>
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }} onClick={() => go(2)}
          className={`w-full py-5 rounded-2xl font-black text-white text-lg bg-gradient-to-r ${accent} flex items-center justify-center gap-2 shadow-lg`}>
          Continue <ChevronRight size={20} />
        </motion.button>
      </div>
    );

    // STEP 2 — Name + Email
    if (step === 2) return (
      <div className="space-y-6">
        <button onClick={() => go(1)} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-1">
            {name ? `Hi ${name}! Almost there` : "Tell us about yourself"}
          </h3>
          <p className="text-zinc-500 text-sm font-medium">We&apos;ll send your personalised guide here</p>
        </div>
        <div className="space-y-4">
          <div>
            <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2">First Name *</label>
            <div className="relative">
              <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="text" value={name} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setName(e.target.value)}
                placeholder="e.g. Mary"
                className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-base font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600" />
            </div>
            {errors.name && <p className="text-red-400 text-xs mt-1.5 font-bold">{errors.name}</p>}
          </div>
          <div>
            <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2">Email Address *</label>
            <div className="relative">
              <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
              <input type="email" value={email} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                placeholder="name@email.com"
                className="w-full pl-11 pr-10 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-base font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600" />
              {email.includes("@") && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                  <CheckCircle2 size={18} className="text-green-500" />
                </motion.div>
              )}
            </div>
            {errors.email && <p className="text-red-400 text-xs mt-1.5 font-bold">{errors.email}</p>}
          </div>
        </div>
        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
          onClick={() => { if (validateStep2()) go(3); }}
          className={`w-full py-5 rounded-2xl font-black text-white text-lg bg-gradient-to-r ${accent} flex items-center justify-center gap-2 shadow-lg`}>
          Continue <ChevronRight size={20} />
        </motion.button>
      </div>
    );

    // STEP 3 — Phone (MANDATORY) + summary
    if (step === 3) return (
      <div className="space-y-6">
        <button onClick={() => go(2)} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors">
          <ArrowLeft size={16} /> Back
        </button>
        <div>
          <h3 className="text-2xl md:text-3xl font-black text-white mb-1">One last thing, {name} 👋</h3>
          <p className="text-zinc-500 text-sm font-medium">Phone number lets our expert call you directly</p>
        </div>
        <div>
          <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2">Phone Number *</label>
          <div className="relative">
            <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
            <input type="tel" value={phone} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPhone(e.target.value)}
              placeholder="+1 555 000 0000"
              className="w-full pl-11 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white text-base font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600" />
            {phone.length >= 8 && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute right-4 top-1/2 -translate-y-1/2">
                <CheckCircle2 size={18} className="text-green-500" />
              </motion.div>
            )}
          </div>
          {errors.phone && <p className="text-red-400 text-xs mt-1.5 font-bold">{errors.phone}</p>}
        </div>

        {/* Summary card */}
        <div className="p-5 bg-gradient-to-br from-blue-500/10 to-indigo-500/5 border border-blue-500/20 rounded-2xl space-y-3">
          <div className="flex items-center gap-2 mb-1">
            <Zap size={16} className="text-blue-400" />
            <span className="text-white font-black text-sm">You&apos;re getting:</span>
          </div>
          <div className="grid grid-cols-1 gap-2">
            {[
              `📋 Personalised guide for: ${issue || "your issue"}`,
              `🏷️ Tips specific to: ${brand || "your device"}`,
              "📧 Sent directly to your email",
              "📞 Expert follow-up call from our team",
            ].map((item, i) => (
              <div key={i} className="flex items-center gap-2 text-zinc-300 text-sm font-medium">
                <CheckCircle2 size={14} className="text-green-400 shrink-0" />
                {item}
              </div>
            ))}
          </div>
        </div>

        <motion.button whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.98 }}
          onClick={startProcessing} disabled={loading}
          className={`w-full py-5 rounded-2xl font-black text-white text-lg bg-gradient-to-r ${accent} flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20`}>
          {loading ? <Loader2 size={22} className="animate-spin" /> : <><Star size={20} /> Get My Free Guide</>}
        </motion.button>
        <p className="text-center text-xs text-zinc-600">🔒 Your info is safe — we never spam or sell your details</p>
      </div>
    );

    // STEP 4 — Processing
    if (step === 4) return (
      <div className="space-y-8 text-center py-6">
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className={`w-20 h-20 rounded-full bg-gradient-to-r ${accent} flex items-center justify-center mx-auto shadow-2xl`}>
          <Loader2 size={32} className="text-white" />
        </motion.div>
        <div className="h-3 bg-white/10 rounded-full overflow-hidden mx-4">
          <motion.div animate={{ width: `${progress}%` }} className={`h-full bg-gradient-to-r ${accent} rounded-full`} />
        </div>
        <AnimatePresence mode="wait">
          <motion.p key={msgIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
            className="text-white font-black text-xl px-4">
            {config.processingMessages[msgIdx]?.replace("[name]", name).replace("[brand]", brand || "device")}
          </motion.p>
        </AnimatePresence>
        <div className="space-y-3 text-left px-4">
          {config.processingMessages.slice(0, msgIdx + 1).map((msg, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              className="flex items-center gap-3">
              <CheckCircle2 size={16} className="text-green-500 shrink-0" />
              <span className="text-zinc-400 text-sm font-medium">{msg.replace("[name]", name).replace("[brand]", brand || "device")}</span>
            </motion.div>
          ))}
        </div>
      </div>
    );

    return null;
  };

  return (
    <div className="w-full">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-8">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <motion.div key={i}
            animate={{ scale: i === step ? 1.3 : 1, opacity: i <= step ? 1 : 0.3 }}
            className={`rounded-full transition-all ${
              i < step ? "w-4 h-4 bg-green-500 shadow-lg shadow-green-500/50"
              : i === step ? `w-5 h-5 bg-gradient-to-r ${accent} shadow-lg`
              : "w-2.5 h-2.5 bg-zinc-700"
            }`} />
        ))}
      </div>

      {/* Step content — NO absolute positioning, expands naturally */}
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={step}
          custom={dir}
          initial={{ opacity: 0, x: dir > 0 ? 60 : -60 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir > 0 ? -60 : 60 }}
          transition={{ type: "spring", stiffness: 400, damping: 35 }}
        >
          {renderStep()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
