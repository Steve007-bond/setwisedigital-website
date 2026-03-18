"use client";

import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, Mail, MessageSquare, Clock, CheckCircle2, Loader2, AlertCircle, Star, Phone, Calendar } from "lucide-react";
import EmailInput from "@/components/EmailInput";
import PhoneInput from "@/components/PhoneInput";
import { validateEmail, validatePhone } from "@/lib/validation";

interface ExpertConsultantSectionProps {
  topic: string;
  emailjsServiceId?: string;
  emailjsContactTemplateId?: string;
  emailjsPublicKey?: string;
}

const AVAILABILITY = [
  "Morning (9am – 12pm)",
  "Afternoon (12pm – 5pm)",
  "Evening (5pm – 8pm)",
  "Flexible / Any time",
];

const CONTACT_METHODS = ["Email", "Phone Call", "Video Call"];

export default function ExpertConsultantSection({ topic }: ExpertConsultantSectionProps) {
  const [form, setForm] = useState({
    name: "", email: "", phone: "", countryCode: "+1",
    device: "", issue: "", availability: "", contactMethod: "Email",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValid =
    form.name.trim() !== "" &&
    validateEmail(form.email).valid &&
    validatePhone(form.phone).valid &&
    form.issue.trim() !== "";

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus("loading");
    try {
      await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name, email: form.email,
          phone: `${form.countryCode} ${form.phone}`,
          topic, device: form.device, issue: form.issue,
          availability: form.availability, contactMethod: form.contactMethod,
        }),
      });
      setStatus("success");
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("Something went wrong. Please email us directly at support@setwisedigital.com");
      setStatus("error");
    }
  };

  return (
    <div id="expert-consultant">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left */}
          <div className="lg:w-5/12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-500/20 text-indigo-400 border border-indigo-500/30 text-xs font-black uppercase tracking-widest mb-8">
              <UserCheck size={14} /> Live Lesson
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight text-white">
              Book a Live {topic} Lesson
            </h2>
            <p className="text-lg text-zinc-400 font-medium mb-10 leading-relaxed">
              Sometimes the fastest way to learn is with a real instructor by your side. Our educators walk you through concepts clearly, at your pace, via a scheduled video lesson.
            </p>
            <div className="space-y-4 mb-10">
              {[
                { icon: <MessageSquare size={20} className="text-blue-600" />, title: "We start with your goals", desc: "Tell us what you want to learn — no technical knowledge needed." },
                { icon: <Star size={20} className="text-blue-600" />, title: "Clear, structured lessons", desc: "Every lesson follows a clear structure so you always know where you are." },
                { icon: <Clock size={20} className="text-blue-600" />, title: "We go at your pace", desc: "No rushing. We move at whatever speed feels comfortable for you." },
                { icon: <CheckCircle2 size={20} className="text-blue-600" />, title: "Lesson recap included", desc: "After every lesson, we send a summary of what you covered to keep." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-white/5 border border-white/10">
                  <div className="w-10 h-10 bg-white/10 rounded-xl flex items-center justify-center shrink-0">{item.icon}</div>
                  <div>
                    <div className="font-black text-white text-sm">{item.title}</div>
                    <div className="text-zinc-500 font-medium text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="bg-black/30 rounded-2xl p-6 text-white border border-white/10">
              <div className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">Direct contact</div>
              <a href="mailto:support@setwisedigital.com" className="flex items-center gap-3 text-blue-400 font-bold hover:text-blue-300 transition-colors mb-2">
                <Mail size={16} /> support@setwisedigital.com
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-7/12 w-full">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div key="success" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 rounded-[2rem] border border-blue-500/20 shadow-xl p-12 text-center">
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-white mb-4">Request Received!</h3>
                  <p className="text-zinc-300 font-medium mb-2">Thanks <span className="font-black text-white">{form.name}</span>! Our team has been notified.</p>
                  <p className="text-zinc-400 font-medium text-sm mb-6">We&apos;ll confirm your lesson time with <span className="font-bold text-zinc-300">{form.email}</span> within 1 business day.</p>
                </motion.div>
              ) : (
                <motion.form key="form" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-zinc-800/80 rounded-[2rem] border border-white/10 shadow-xl p-8 md:p-10 space-y-6">
                  <div>
                    <h3 className="text-2xl font-black text-white mb-1">Schedule Your Lesson</h3>
                    <p className="text-zinc-400 font-medium text-sm">Fill in your details and we&apos;ll confirm within 1 business day.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="e.g. Mary Johnson" required
                        className="w-full px-5 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl focus:outline-none focus:border-blue-500 transition-all font-medium text-white" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Email Address *</label>
                      <EmailInput value={form.email} onChange={(val) => setForm((f) => ({ ...f, email: val }))} theme="dark" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Phone Number *</label>
                    <PhoneInput
                      value={form.phone} countryCode={form.countryCode}
                      onChange={(val, cc) => setForm((f) => ({ ...f, phone: val, countryCode: cc }))}
                      theme="dark"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">Device / Model</label>
                    <input name="device" value={form.device} onChange={handleChange} type="text" placeholder={`e.g. HP OfficeJet Pro 9015`}
                      className="w-full px-5 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl focus:outline-none focus:border-blue-500 transition-all font-medium text-white" />
                  </div>

                  <div>
                    <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">What would you like to learn? *</label>
                    <textarea name="issue" value={form.issue} onChange={handleChange} rows={4} required
                      placeholder={`Tell us what you'd like to learn about your ${topic.toLowerCase()} — no technical knowledge needed.`}
                      className="w-full px-5 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl focus:outline-none focus:border-blue-500 transition-all font-medium text-white resize-none" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                        <Calendar size={12} className="inline mr-1" /> Availability
                      </label>
                      <select name="availability" value={form.availability} onChange={handleChange}
                        className="w-full px-5 py-4 bg-zinc-900 border border-zinc-700 rounded-2xl focus:outline-none focus:border-blue-500 transition-all font-medium text-white appearance-none">
                        <option value="">Select a time...</option>
                        {AVAILABILITY.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-400 uppercase tracking-widest mb-2">
                        <Phone size={12} className="inline mr-1" /> Preferred Contact
                      </label>
                      <div className="flex gap-2">
                        {CONTACT_METHODS.map((m) => (
                          <button key={m} type="button" onClick={() => setForm((f) => ({ ...f, contactMethod: m }))}
                            className={`flex-1 py-4 rounded-2xl text-xs font-black border transition-all ${
                              form.contactMethod === m ? "bg-blue-600 text-white border-blue-600" : "bg-zinc-900 text-zinc-400 border-zinc-700 hover:border-blue-400"
                            }`}>{m}</button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-3 p-4 bg-red-900/30 border border-red-500/30 rounded-2xl">
                      <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-400 font-medium">{errorMsg}</p>
                    </div>
                  )}

                  <button type="submit" disabled={!isValid || status === "loading"}
                    className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                      isValid && status !== "loading"
                        ? "bg-blue-600 text-white hover:bg-blue-500 hover:-translate-y-0.5"
                        : "bg-zinc-700 text-zinc-500 cursor-not-allowed"
                    }`}>
                    {status === "loading" ? <><Loader2 size={20} className="animate-spin" />Submitting...</> : <><UserCheck size={20} />Book My Lesson</>}
                  </button>
                  <p className="text-center text-xs text-zinc-500 font-medium">We respond within 1 business day • support@setwisedigital.com</p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
}
