"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { UserCheck, Mail, MessageSquare, Clock, CheckCircle2, Loader2, AlertCircle, Star, Phone, Calendar } from "lucide-react";

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

export default function ExpertConsultantSection({
  topic,
  emailjsServiceId = "service_dtucjcw",
  emailjsContactTemplateId = "template_uls5p3p",
  emailjsPublicKey = "XRCYl5c7gwzK67hbD",

}: ExpertConsultantSectionProps) {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    device: "",
    issue: "",
    availability: "",
    contactMethod: "Email",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState("");

  const isValid = form.name && form.email && form.issue && form.email.includes("@");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const sendToDiscord = async () => {
    await fetch("/api/contact", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: form.name,
        email: form.email,
        phone: form.phone,
        topic,
        device: form.device,
        issue: form.issue,
        availability: form.availability,
        contactMethod: form.contactMethod,
      }),
    });
  };

  const sendEmailJS = async () => {
    const emailjs = await import("@emailjs/browser");
    await emailjs.send(
      emailjsServiceId,
      emailjsContactTemplateId,
      {
        to_name: "Setwise Digital Team",
        from_name: form.name,
        from_email: form.email,
        phone: form.phone || "Not provided",
        topic: topic,
        device: form.device || "Not specified",
        issue: form.issue,
        availability: form.availability || "Not specified",
        contact_method: form.contactMethod,
        reply_to: form.email,
      },
      emailjsPublicKey
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus("loading");

    try {
      // Send to both EmailJS and Discord in parallel
      await Promise.allSettled([
        sendEmailJS().catch(e => console.warn("EmailJS:", e)),
        sendToDiscord(),
      ]);
      setStatus("success");
    } catch (err) {
      console.error("Submission error:", err);
      setErrorMsg("Something went wrong. Please email us directly at support@setwisedigital.com");
      setStatus("error");
    }
  };

  return (
    <section id="expert-consultant" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: Benefits */}
          <div className="lg:w-5/12">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-indigo-100 text-indigo-700 text-xs font-black uppercase tracking-widest mb-8">
              <UserCheck size={14} />
              Expert Consultant
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
              Talk to a {topic} Expert
            </h2>
            <p className="text-lg text-zinc-500 font-medium mb-10 leading-relaxed">
              Sometimes you need a real person who listens, explains clearly, and stays patient until you feel confident. That's exactly what our consultants do.
            </p>

            {/* What to expect */}
            <div className="space-y-4 mb-10">
              {[
                { icon: <MessageSquare size={20} className="text-blue-600" />, title: "We listen first", desc: "Tell us your situation in your own words — no judgement." },
                { icon: <Star size={20} className="text-blue-600" />, title: "Step-by-step guidance", desc: "We walk through every step together at your pace." },
                { icon: <Clock size={20} className="text-blue-600" />, title: "We stay until it's done", desc: "No rushing. We don't leave until you feel confident." },
                { icon: <CheckCircle2 size={20} className="text-blue-600" />, title: "Follow-up support", desc: "Got stuck later? Reach back out — we remember you." },
              ].map((item, i) => (
                <div key={i} className="flex gap-4 p-5 rounded-2xl bg-zinc-50 border border-zinc-100">
                  <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center shadow-sm shrink-0">
                    {item.icon}
                  </div>
                  <div>
                    <div className="font-black text-zinc-900 text-sm">{item.title}</div>
                    <div className="text-zinc-500 font-medium text-sm">{item.desc}</div>
                  </div>
                </div>
              ))}
            </div>

            {/* Contact info */}
            <div className="bg-zinc-900 rounded-2xl p-6 text-white">
              <div className="text-xs font-black uppercase tracking-widest text-zinc-400 mb-3">Direct contact</div>
              <a href="mailto:support@setwisedigital.com" className="flex items-center gap-3 text-blue-400 font-bold hover:text-blue-300 transition-colors mb-2">
                <Mail size={16} />
                support@setwisedigital.com
              </a>
              <a href="https://www.setwisedigital.com" className="text-zinc-400 font-medium text-sm hover:text-white transition-colors">
                www.setwisedigital.com
              </a>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-7/12 w-full">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-[2rem] border border-blue-100 shadow-xl p-12 text-center"
                >
                  <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-6 shadow-xl shadow-blue-500/30">
                    <CheckCircle2 size={40} className="text-white" />
                  </div>
                  <h3 className="text-3xl font-black text-zinc-900 mb-4">Request Received!</h3>
                  <p className="text-zinc-600 font-medium mb-2">
                    Thanks <span className="font-black text-zinc-900">{form.name}</span>! Our team has been notified.
                  </p>
                  <p className="text-zinc-500 font-medium text-sm mb-6">
                    We'll reach out to <span className="font-bold text-zinc-700">{form.email}</span> within 1 business day to schedule your session.
                  </p>
                  <p className="text-xs text-zinc-400">
                    Questions? Email us at{" "}
                    <a href="mailto:support@setwisedigital.com" className="text-blue-600 font-bold">
                      support@setwisedigital.com
                    </a>
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  onSubmit={handleSubmit}
                  className="bg-white rounded-[2rem] border border-zinc-100 shadow-xl p-8 md:p-10 space-y-6"
                >
                  <div>
                    <h3 className="text-2xl font-black text-zinc-900 mb-1">Book a Consultation</h3>
                    <p className="text-zinc-400 font-medium text-sm">Fill in your details and we'll be in touch to arrange your session.</p>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Full Name *</label>
                      <input name="name" value={form.name} onChange={handleChange} type="text" placeholder="e.g. Mary Johnson" required
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-zinc-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Email Address *</label>
                      <input name="email" value={form.email} onChange={handleChange} type="email" placeholder="name@email.com" required
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-zinc-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Phone (optional)</label>
                      <input name="phone" value={form.phone} onChange={handleChange} type="tel" placeholder="+1 (555) 000-0000"
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-zinc-900" />
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Device / Model</label>
                      <input name="device" value={form.device} onChange={handleChange} type="text" placeholder={`e.g. HP OfficeJet Pro 9015`}
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-zinc-900" />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">Describe Your Issue *</label>
                    <textarea name="issue" value={form.issue} onChange={handleChange} rows={4} required
                      placeholder={`Tell us what's happening with your ${topic.toLowerCase()} — as much detail as you like. No technical knowledge needed!`}
                      className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-zinc-900 resize-none" />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div>
                      <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">
                        <Calendar size={12} className="inline mr-1" />
                        Availability
                      </label>
                      <select name="availability" value={form.availability} onChange={handleChange}
                        className="w-full px-5 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-zinc-900 appearance-none">
                        <option value="">Select a time...</option>
                        {AVAILABILITY.map((a) => <option key={a} value={a}>{a}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">
                        <Phone size={12} className="inline mr-1" />
                        Preferred Contact
                      </label>
                      <div className="flex gap-2">
                        {CONTACT_METHODS.map((m) => (
                          <button key={m} type="button" onClick={() => setForm((f) => ({ ...f, contactMethod: m }))}
                            className={`flex-1 py-4 rounded-2xl text-xs font-black border transition-all ${
                              form.contactMethod === m
                                ? "bg-blue-600 text-white border-blue-600 shadow-lg shadow-blue-500/20"
                                : "bg-zinc-50 text-zinc-500 border-zinc-200 hover:border-blue-300"
                            }`}>
                            {m}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {status === "error" && (
                    <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                      <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                      <p className="text-sm text-red-600 font-medium">{errorMsg}</p>
                    </div>
                  )}

                  <button type="submit" disabled={!isValid || status === "loading"}
                    className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                      isValid && status !== "loading"
                        ? "bg-zinc-900 text-white hover:bg-blue-600 hover:shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5"
                        : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                    }`}>
                    {status === "loading" ? (
                      <><Loader2 size={20} className="animate-spin" />Submitting...</>
                    ) : (
                      <><UserCheck size={20} />Book My Consultation</>
                    )}
                  </button>

                  <p className="text-center text-xs text-zinc-400 font-medium">
                    We respond within 1 business day • support@setwisedigital.com
                  </p>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
