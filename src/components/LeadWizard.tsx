"use client";

import { useState, useEffect, useRef } from "react";
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

const SLIDE = {
  enter: (dir: number) => ({ x: dir > 0 ? 300 : -300, opacity: 0 }),
  center: { x: 0, opacity: 1 },
  exit: (dir: number) => ({ x: dir > 0 ? -300 : 300, opacity: 0 }),
};

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

  const go = (n: number) => {
    setDir(n > step ? 1 : -1);
    setStep(n);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (step === 2) {
      if (!name.trim()) e.name = "Please enter your name";
      if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const startProcessing = async () => {
    setDir(1); setStep(4);
    setProgress(0); setMsgIdx(0);
    const interval = setInterval(() => setProgress(p => Math.min(p + 2, 100)), 50);
    config.processingMessages.forEach((_, i) => {
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
    setTimeout(() => { setDone(true); onComplete?.({ name, email, phone, brand, issue, source: config.source }); }, 3200);
  };

  useEffect(() => () => { if (timerRef.current) clearTimeout(timerRef.current); }, []);

  const accent = config.accentColor;

  if (done) return (
    <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
      className="text-center py-12 px-6">
      <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
        className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-green-500/30">
        <CheckCircle2 size={40} className="text-white" />
      </motion.div>
      <h3 className="text-3xl font-black text-white mb-3">
        You're all set{name ? `, ${name}` : ""}! 🎉
      </h3>
      <p className="text-zinc-400 font-medium mb-8">
        Our team has been notified and will reach out to <span className="text-white font-bold">{email}</span> shortly.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {[
          { icon: <Mail size={18} />, label: "Get PDF Guide", desc: "Sent to your email" },
          { icon: <Phone size={18} />, label: "Book 1-on-1", desc: "Talk to an expert" },
          { icon: <Star size={18} />, label: "Next Lesson", desc: "Keep learning" },
        ].map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            className="p-4 bg-white/5 border border-white/10 rounded-2xl hover:border-white/20 transition-all cursor-pointer group">
            <div className={`w-10 h-10 rounded-xl bg-gradient-to-br ${accent} flex items-center justify-center mb-3 group-hover:scale-110 transition-transform`}>
              <span className="text-white">{card.icon}</span>
            </div>
            <div className="font-black text-white text-sm">{card.label}</div>
            <div className="text-zinc-500 text-xs font-medium">{card.desc}</div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );

  return (
    <div className="relative overflow-hidden">
      {/* Progress dots */}
      <div className="flex items-center justify-center gap-2 mb-6">
        {Array.from({ length: totalSteps }).map((_, i) => (
          <motion.div key={i} animate={{ scale: i === step ? 1.3 : 1, opacity: i <= step ? 1 : 0.3 }}
            className={`rounded-full transition-all ${i < step ? "w-4 h-4 bg-green-500 shadow-lg shadow-green-500/50" : i === step ? `w-5 h-5 bg-gradient-to-r ${accent} shadow-lg` : "w-2.5 h-2.5 bg-zinc-700"}`} />
        ))}
      </div>

      <div className="relative min-h-[420px]">
        <AnimatePresence custom={dir} mode="wait">
          <motion.div key={step} custom={dir} variants={SLIDE}
            initial="enter" animate="center" exit="exit"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="absolute inset-0">

            {/* STEP 0 — Issue picker */}
            {step === 0 && (
              <div className="space-y-5">
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">{config.step1Title}</h3>
                  <p className="text-zinc-500 text-sm font-medium">Select the one that fits best</p>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  {config.step1Options.map((opt, i) => (
                    <motion.button key={i} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}
                      onClick={() => { setIssue(opt.label); }}
                      className={`relative p-5 rounded-2xl border-2 text-left transition-all ${
                        issue === opt.label
                          ? `border-blue-500 bg-blue-500/10`
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      }`}>
                      {opt.popular && (
                        <span className="absolute -top-2 -right-2 px-2 py-0.5 bg-blue-600 text-white text-xs font-black rounded-full">Popular</span>
                      )}
                      <div className="text-3xl mb-3">{opt.icon}</div>
                      <div className="font-black text-white text-base">{opt.label}</div>
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
                    <motion.button initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                      onClick={() => go(1)}
                      className={`w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r ${accent} flex items-center justify-center gap-2`}>
                      Continue <ChevronRight size={18} />
                    </motion.button>
                  )}
                </AnimatePresence>
              </div>
            )}

            {/* STEP 1 — Brand + Goal */}
            {step === 1 && (
              <div className="space-y-5">
                <button onClick={() => go(0)} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">{config.step2Title}</h3>
                  <p className="text-zinc-500 text-sm font-medium">Choose your brand</p>
                </div>
                <div className="flex flex-wrap gap-2">
                  {config.brandOptions.map((b, i) => (
                    <motion.button key={i} whileTap={{ scale: 0.95 }}
                      onClick={() => setBrand(b.label)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 font-bold text-sm transition-all ${
                        brand === b.label ? `border-blue-500 bg-blue-500/20 text-white` : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
                      }`}>
                      <span>{b.icon}</span> {b.label}
                    </motion.button>
                  ))}
                </div>
                <p className="text-zinc-500 text-sm font-medium pt-2">What do you want help with?</p>
                <div className="flex flex-wrap gap-2">
                  {config.step2Options.map((opt, i) => (
                    <motion.button key={i} whileTap={{ scale: 0.95 }}
                      onClick={() => setGoal(opt.label)}
                      className={`flex items-center gap-2 px-4 py-2.5 rounded-full border-2 font-bold text-sm transition-all ${
                        goal === opt.label ? `border-blue-500 bg-blue-500/20 text-white` : "border-white/10 bg-white/5 text-zinc-400 hover:border-white/20"
                      }`}>
                      <span>{opt.icon}</span> {opt.label}
                    </motion.button>
                  ))}
                </div>
                <button onClick={() => go(2)}
                  className={`w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r ${accent} flex items-center justify-center gap-2`}>
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 2 — Name + Email */}
            {step === 2 && (
              <div className="space-y-5">
                <button onClick={() => go(1)} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">
                    {name ? `Hi ${name}! Almost there` : "Tell us about yourself"}
                  </h3>
                  <p className="text-zinc-500 text-sm font-medium">We'll send your personalised guide here</p>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-2">First Name *</label>
                    <div className="relative">
                      <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input type="text" value={name} onChange={e => setName(e.target.value)} placeholder="e.g. Mary"
                        className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600" />
                    </div>
                    {errors.name && <p className="text-red-400 text-xs mt-1 font-medium">{errors.name}</p>}
                  </div>
                  <div>
                    <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-2">Email Address *</label>
                    <div className="relative">
                      <Mail size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                      <input type="email" value={email} onChange={e => setEmail(e.target.value)} placeholder="name@email.com"
                        className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600" />
                      {email.includes("@") && (
                        <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                          className="absolute right-4 top-1/2 -translate-y-1/2">
                          <CheckCircle2 size={18} className="text-green-500" />
                        </motion.div>
                      )}
                    </div>
                    {errors.email && <p className="text-red-400 text-xs mt-1 font-medium">{errors.email}</p>}
                  </div>
                </div>
                <button onClick={() => { if (validate()) go(3); }}
                  className={`w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r ${accent} flex items-center justify-center gap-2`}>
                  Continue <ChevronRight size={18} />
                </button>
              </div>
            )}

            {/* STEP 3 — Phone (optional) */}
            {step === 3 && (
              <div className="space-y-5">
                <button onClick={() => go(2)} className="flex items-center gap-2 text-zinc-400 hover:text-white text-sm font-bold transition-colors">
                  <ArrowLeft size={16} /> Back
                </button>
                <div>
                  <h3 className="text-2xl font-black text-white mb-1">One last thing, {name}</h3>
                  <p className="text-zinc-500 text-sm font-medium">Phone is optional — but helps us call if email isn't convenient</p>
                </div>
                <div>
                  <label className="text-xs font-black text-zinc-500 uppercase tracking-widest block mb-2">Phone Number (optional)</label>
                  <div className="relative">
                    <Phone size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input type="tel" value={phone} onChange={e => setPhone(e.target.value)} placeholder="+1 555 000 0000"
                      className="w-full pl-10 pr-4 py-4 bg-white/5 border border-white/10 rounded-2xl text-white font-medium focus:outline-none focus:border-blue-500 transition-colors placeholder:text-zinc-600" />
                  </div>
                </div>
                <div className="p-4 bg-blue-500/10 border border-blue-500/20 rounded-2xl">
                  <div className="flex items-start gap-3">
                    <Zap size={18} className="text-blue-400 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-white font-black text-sm mb-1">You're getting:</div>
                      <ul className="text-zinc-400 text-sm space-y-1 font-medium">
                        <li>✅ Personalised step-by-step guide</li>
                        <li>✅ Tips specific to your {brand || "device"}</li>
                        <li>✅ Expert follow-up if needed</li>
                      </ul>
                    </div>
                  </div>
                </div>
                <button onClick={startProcessing} disabled={loading}
                  className={`w-full py-4 rounded-2xl font-black text-white bg-gradient-to-r ${accent} flex items-center justify-center gap-2`}>
                  {loading ? <Loader2 size={20} className="animate-spin" /> : <><Star size={18} /> Get My Free Guide</>}
                </button>
                <p className="text-center text-xs text-zinc-600">🔒 Your info is safe — we never spam or share</p>
              </div>
            )}

            {/* STEP 4 — Processing */}
            {step === 4 && (
              <div className="space-y-6 text-center py-4">
                <motion.div animate={{ rotate: 360 }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                  className={`w-16 h-16 rounded-full bg-gradient-to-r ${accent} flex items-center justify-center mx-auto`}>
                  <Loader2 size={28} className="text-white" />
                </motion.div>
                <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                  <motion.div animate={{ width: `${progress}%` }} className={`h-full bg-gradient-to-r ${accent} rounded-full`} />
                </div>
                <AnimatePresence mode="wait">
                  <motion.p key={msgIdx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}
                    className="text-white font-black text-lg">
                    {config.processingMessages[msgIdx]?.replace("[name]", name).replace("[brand]", brand || "device")}
                  </motion.p>
                </AnimatePresence>
                <div className="space-y-2">
                  {config.processingMessages.slice(0, msgIdx + 1).map((msg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
                      className="flex items-center gap-3 text-left">
                      <CheckCircle2 size={16} className="text-green-500 shrink-0" />
                      <span className="text-zinc-400 text-sm font-medium">{msg.replace("[name]", name).replace("[brand]", brand || "device")}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}

          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
