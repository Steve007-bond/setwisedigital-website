"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { User, Mail, Phone, Loader2, CheckCircle2, Zap } from "lucide-react";

interface LeadCaptureBlockProps {
  source: string;         // e.g. "garmin-express-setup"
  accentColor?: string;   // tailwind gradient e.g. "from-blue-600 to-cyan-500"
  accentHex?: string;     // hex for inline styles
  headline?: string;
  subline?: string;
  points?: string[];
  ctaText?: string;
}

export default function LeadCaptureBlock({
  source,
  accentColor = "from-blue-600 to-cyan-500",
  accentHex = "#2563eb",
  headline = "Still need help?",
  subline = "Enter your details and we'll send you a personalised guide — plus a free follow-up if you're still stuck.",
  points = [
    "📧 Free personalised guide delivered to your inbox",
    "📞 Optional free help call — no pressure",
    "✅ Plain English · No tech knowledge needed",
  ],
  ctaText = "Get My Free Guide",
}: LeadCaptureBlockProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<"idle" | "loading" | "done" | "error">("idle");

  const validate = () => {
    const e: Record<string, string> = {};
    if (!name.trim()) e.name = "Please enter your name";
    if (!email.trim() || !email.includes("@")) e.email = "Please enter a valid email";
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const submit = async () => {
    if (!validate()) return;
    setStatus("loading");
    try {
      const res = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          issue: `${source} — free guide request`,
          source,
        }),
      });
      if (!res.ok) throw new Error("Request failed");
      setStatus("done");
    } catch {
      setStatus("error");
    }
  };

  if (status === "done") {
    return (
      <section className="py-20 border-t border-zinc-800/50 bg-zinc-950/40">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}>
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
              className="w-20 h-20 bg-gradient-to-br from-green-500 to-emerald-400 rounded-full flex items-center justify-center mx-auto mb-6 shadow-2xl shadow-green-500/30"
            >
              <CheckCircle2 size={36} className="text-white" />
            </motion.div>
            <h3 className="text-3xl font-black text-white mb-3">You're all set, {name}!</h3>
            <p className="text-zinc-400 text-lg font-medium">
              We'll be in touch within 24 hours with your personalised guide.
            </p>
          </motion.div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-20 border-t border-zinc-800/50 relative overflow-hidden">
      {/* Ambient glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: `radial-gradient(ellipse at 30% 50%, ${accentHex}12 0%, transparent 60%)`,
        }}
      />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-center">
          {/* Left — benefits */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full border text-sm font-black uppercase tracking-widest mb-6"
              style={{ backgroundColor: accentHex + "15", borderColor: accentHex + "40", color: accentHex }}
            >
              <Zap size={13} /> Free Guide
            </div>
            <h2 className="text-3xl md:text-4xl font-black text-white mb-5 leading-tight tracking-tight">
              {headline}
            </h2>
            <p className="text-zinc-300 text-lg leading-relaxed mb-8">{subline}</p>
            <div className="space-y-4">
              {points.map((pt, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -16 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="text-zinc-300 text-base leading-relaxed"
                >
                  {pt}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <div className="bg-zinc-900 border border-zinc-800 rounded-[2rem] p-8 shadow-2xl">
              <h3 className="text-2xl font-black text-white mb-1">Get Instant Access</h3>
              <p className="text-zinc-400 font-medium mb-7">Free · No credit card · No commitments</p>

              <div className="space-y-4">
                {/* Name */}
                <div>
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">
                    Your Name *
                  </label>
                  <div className="relative">
                    <User size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="text"
                      value={name}
                      onChange={e => setName(e.target.value)}
                      placeholder="e.g. Margaret"
                      className="w-full pl-10 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-white text-base placeholder:text-zinc-600 font-medium outline-none transition-colors"
                      style={{ borderColor: errors.name ? "#ef4444" : undefined }}
                    />
                  </div>
                  {errors.name && (
                    <p className="text-red-400 text-xs mt-1.5 font-semibold ml-1">{errors.name}</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">
                    Email Address *
                  </label>
                  <div className="relative">
                    <Mail size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="email"
                      value={email}
                      onChange={e => setEmail(e.target.value)}
                      placeholder="your@email.com"
                      className="w-full pl-10 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-white text-base placeholder:text-zinc-600 font-medium outline-none transition-colors"
                      style={{ borderColor: errors.email ? "#ef4444" : undefined }}
                    />
                  </div>
                  {errors.email && (
                    <p className="text-red-400 text-xs mt-1.5 font-semibold ml-1">{errors.email}</p>
                  )}
                </div>

                {/* Phone */}
                <div>
                  <label className="text-xs font-black text-zinc-400 uppercase tracking-widest block mb-2 ml-1">
                    Phone{" "}
                    <span className="text-zinc-600 normal-case font-normal">(optional — for a free help call)</span>
                  </label>
                  <div className="relative">
                    <Phone size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-500" />
                    <input
                      type="tel"
                      value={phone}
                      onChange={e => setPhone(e.target.value)}
                      placeholder="(555) 000-0000"
                      className="w-full pl-10 pr-4 py-4 bg-zinc-800 border border-zinc-700 hover:border-zinc-600 rounded-2xl text-white text-base placeholder:text-zinc-600 font-medium outline-none transition-colors"
                    />
                  </div>
                </div>

                {/* Submit */}
                <motion.button
                  onClick={submit}
                  disabled={status === "loading"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className={`w-full py-4 bg-gradient-to-r ${accentColor} text-white font-black text-lg rounded-2xl flex items-center justify-center gap-3 shadow-xl mt-2`}
                >
                  {status === "loading" ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <>
                      <Zap size={18} /> {ctaText}
                    </>
                  )}
                </motion.button>

                {status === "error" && (
                  <p className="text-center text-red-400 text-sm font-medium">
                    Something went wrong. Please try again or email{" "}
                    <a href="mailto:support@setwisedigital.com" className="underline">
                      support@setwisedigital.com
                    </a>
                  </p>
                )}

                <p className="text-center text-zinc-600 text-xs font-medium pt-1">
                  No spam · Unsubscribe anytime · 100% free
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
