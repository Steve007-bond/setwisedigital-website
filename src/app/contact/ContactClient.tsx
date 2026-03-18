"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Mail, MapPin, CheckCircle2, BookOpen, ShieldCheck, UserCheck,
  MessageSquare, Globe, Clock, ArrowUpRight, ChevronRight,
  Search, Loader2, AlertCircle, Send,
} from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import EmailInput from "@/components/EmailInput";
import PhoneInput from "@/components/PhoneInput";
import { validateEmail, validatePhone } from "@/lib/validation";
import Link from "next/link";
import React, { useState } from "react";

export default function ContactPage() {
  const [activeFaq, setActiveFaq] = useState<number | null>(null);
  const [form, setForm] = useState({ name: "", email: "", phone: "", countryCode: "+1", message: "" });
  const [formStatus, setFormStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [formError, setFormError] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  };

  const isValid =
    form.name.trim() !== "" &&
    validateEmail(form.email).valid &&
    validatePhone(form.phone).valid &&
    form.message.trim() !== "";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setFormStatus("loading");
    setFormError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          phone: `${form.countryCode} ${form.phone}`,
          issue: form.message,
          topic: "General Enquiry",
          contactMethod: "Email",
        }),
      });
      if (!res.ok) throw new Error("Network error");
      setFormStatus("success");
    } catch {
      setFormError("Something went wrong. Please email us directly at support@setwisedigital.com");
      setFormStatus("error");
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100 selection:text-blue-900">
      <Navbar />
      <ScrollToTop />

      <main className="pt-44 pb-32 mesh-gradient">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-start">

            {/* Left Side */}
            <motion.div initial={{ opacity: 0, x: -50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }} className="space-y-12">
              <div>
                <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
                  className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/50 backdrop-blur-sm text-blue-700 text-xs font-black uppercase tracking-[0.2em] mb-10 shadow-xl border border-white/50">
                  <Mail size={14} className="text-blue-600" />
                  <span>Get In Touch Anytime</span>
                </motion.div>
                <h1 className="text-6xl md:text-9xl font-black tracking-tighter mb-8 leading-[0.9] text-zinc-900">
                  Tech Made <br /><span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-600 bg-[length:200%_auto] animate-gradient bg-clip-text text-transparent">Easier.</span>
                </h1>
                <p className="text-xl md:text-3xl text-zinc-600 leading-relaxed font-medium">
                  Whether you&apos;re learning on your own or looking for guidance, our team is happy to help.
                </p>
              </div>

              <div className="space-y-6">
                {[
                  { icon: <Mail size={32} />, title: "Email Support", desc: "Send us a message anytime.", link: "support@setwisedigital.com", href: "mailto:support@setwisedigital.com" },
                  { icon: <MapPin size={32} />, title: "Our Locations", desc: "We serve customers nationwide.", tags: ["Colorado", "New Jersey"] }
                ].map((item, i) => (
                  <motion.div key={i} whileHover={{ x: 15, scale: 1.02 }}
                    className="flex items-start gap-8 p-10 rounded-[3rem] bg-white/80 backdrop-blur-md border border-white shadow-xl hover:shadow-2xl transition-all group">
                    <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500 shadow-lg">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="font-black text-3xl mb-2 tracking-tight">{item.title}</h4>
                      <p className="text-zinc-500 font-bold mb-4 text-lg">{item.desc}</p>
                      {item.link ? (
                        <a href={item.href} className="text-blue-600 font-black text-2xl hover:underline underline-offset-8 decoration-4">{item.link}</a>
                      ) : (
                        <div className="flex gap-4">
                          {item.tags?.map((tag, j) => (
                            <span key={j} className="flex items-center gap-2 px-5 py-2 bg-zinc-100 rounded-xl border border-zinc-200 font-black text-zinc-800">{tag}</span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

              <div className="p-12 rounded-[4rem] bg-zinc-900 text-white space-y-12 relative overflow-hidden shadow-2xl">
                <motion.div animate={{ scale: [1, 1.5, 1], rotate: [0, 180, 0] }}
                  transition={{ duration: 20, repeat: Infinity }}
                  className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]" />
                <h3 className="text-4xl font-black tracking-tight relative z-10">Why People Trust Us</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-10 relative z-10">
                  {[
                    { icon: <ShieldCheck className="text-blue-400" size={32} />, text: "Since 2016" },
                    { icon: <BookOpen className="text-blue-400" size={32} />, text: "Patient Teaching" },
                    { icon: <UserCheck className="text-blue-400" size={32} />, text: "Non-Technical" },
                    { icon: <Globe className="text-blue-400" size={32} />, text: "Transparent" }
                  ].map((item, i) => (
                    <motion.div key={i} whileHover={{ scale: 1.1, x: 5 }}
                      className="flex items-center gap-5 p-5 dark-glass border-white/10 rounded-2xl">
                      {item.icon}
                      <span className="font-black text-base uppercase tracking-widest">{item.text}</span>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>

            {/* Right Side: Form */}
            <motion.div initial={{ opacity: 0, x: 50 }} animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="bg-white/90 backdrop-blur-xl p-12 md:p-16 rounded-[4rem] border border-white shadow-2xl relative group overflow-hidden">
              <div className="absolute -inset-1 bg-gradient-to-br from-blue-600/30 to-indigo-600/30 rounded-[4.25rem] blur opacity-0 group-hover:opacity-100 transition-opacity duration-700 -z-10" />

              <AnimatePresence mode="wait">
                {formStatus === "success" ? (
                  <motion.div key="success" initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="text-center py-12">
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}
                      transition={{ type: "spring", stiffness: 300, delay: 0.1 }}
                      className="w-24 h-24 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-xl shadow-green-500/30">
                      <CheckCircle2 size={48} className="text-white" />
                    </motion.div>
                    <h3 className="text-4xl font-black text-zinc-900 mb-4 tracking-tight">Message Sent!</h3>
                    <p className="text-zinc-500 font-medium text-lg mb-2">
                      Thanks <span className="font-black text-zinc-900">{form.name}</span>! We&apos;ve received your message.
                    </p>
                    <p className="text-zinc-400 font-medium">
                      We&apos;ll reply to <span className="font-bold text-zinc-700">{form.email}</span> within 24 hours.
                    </p>
                    <button
                      onClick={() => { setFormStatus("idle"); setForm({ name: "", email: "", phone: "", countryCode: "+1", message: "" }); }}
                      className="mt-10 px-8 py-4 bg-zinc-100 text-zinc-700 rounded-2xl font-black hover:bg-zinc-200 transition-colors">
                      Send Another Message
                    </button>
                  </motion.div>
                ) : (
                  <motion.div key="form" initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
                    <h3 className="text-5xl font-black tracking-tighter mb-10 text-zinc-900 leading-none">Get In <br /><span className="text-blue-600">Touch.</span></h3>
                    <form onSubmit={handleSubmit} className="space-y-7" noValidate>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                        <div className="space-y-2">
                          <label className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em] ml-1">Your Name *</label>
                          <input type="text" name="name" value={form.name} onChange={handleChange} placeholder="John Doe" required
                            className="w-full px-6 py-4 bg-zinc-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-base shadow-inner" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em] ml-1">Email Address *</label>
                          <EmailInput value={form.email} onChange={(val) => setForm((f) => ({ ...f, email: val }))} theme="light" placeholder="john@example.com" />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em] ml-1">Phone Number *</label>
                        <PhoneInput value={form.phone} countryCode={form.countryCode}
                          onChange={(val, cc) => setForm((f) => ({ ...f, phone: val, countryCode: cc }))}
                          theme="light" placeholder="555 000 0000" />
                      </div>
                      <div className="space-y-2">
                        <label className="text-xs font-black text-zinc-400 uppercase tracking-[0.3em] ml-1">How can we help? *</label>
                        <textarea name="message" value={form.message} onChange={handleChange} rows={4} required
                          placeholder="I need help with my printer..."
                          className="w-full px-6 py-4 bg-zinc-50 border-2 border-transparent rounded-2xl focus:outline-none focus:border-blue-600 focus:bg-white transition-all font-bold text-base resize-none shadow-inner" />
                      </div>

                      {formStatus === "error" && (
                        <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                          <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                          <p className="text-red-600 font-medium text-sm">{formError}</p>
                        </div>
                      )}

                      <button type="submit" disabled={!isValid || formStatus === "loading"}
                        className={`shine-effect w-full py-6 rounded-[2rem] font-black text-2xl flex items-center justify-center gap-3 transition-all active:scale-[0.98] ${
                          isValid && formStatus !== "loading"
                            ? "bg-blue-600 text-white hover:bg-blue-700 hover:scale-[1.02] shadow-[0_20px_50px_rgba(37,99,235,0.4)]"
                            : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                        }`}>
                        {formStatus === "loading" ? <><Loader2 size={24} className="animate-spin" />Sending...</> : <><Send size={22} />Submit Request</>}
                      </button>

                      <div className="flex items-center justify-center gap-4 text-zinc-400 font-black text-sm uppercase tracking-[0.3em]">
                        <Clock size={18} className="text-blue-500" />
                        Reply within 24 hours
                      </div>
                    </form>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          </div>

          {/* Process Section */}
          <div className="mt-32 pt-24 border-t border-zinc-100">
            <h2 className="text-4xl font-extrabold text-center mb-16">What Happens After You Contact Us?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { title: "Review", desc: "We review your message carefully.", icon: <Search size={24} /> },
                { title: "Clarify", desc: "We ask simple questions if needed.", icon: <MessageSquare size={24} /> },
                { title: "Options", desc: "We recommend the right course or lesson for your goal.", icon: <BookOpen size={24} /> },
                { title: "Decide", desc: "You decide what feels right.", icon: <CheckCircle2 size={24} /> }
              ].map((step, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }} transition={{ delay: i * 0.1 }}
                  className="text-center space-y-4 group">
                  <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto shadow-sm group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                    {step.icon}
                  </div>
                  <div className="text-xs font-black text-zinc-400 uppercase tracking-widest">Step {i + 1}</div>
                  <h4 className="font-extrabold text-xl">{step.title}</h4>
                  <p className="text-zinc-500 font-medium leading-relaxed">{step.desc}</p>
                </motion.div>
              ))}
            </div>
            <div className="mt-16 text-center">
              <p className="text-xl text-zinc-600 font-bold italic">No commitments. No pressure. Just support.</p>
            </div>
          </div>

          {/* FAQ */}
          <div className="mt-32 max-w-4xl mx-auto">
            <h2 className="text-4xl font-extrabold text-center mb-16">Frequently Asked Questions</h2>
            <div className="space-y-4">
              {[
                { q: "Do you provide official manufacturer support?", a: "No — we focus on education and learning guidance. We help you understand and use the devices you already own." },
                { q: "Do I need to pay to contact you?", a: "No. Asking questions and accessing learning tools does not require payment." },
                { q: "Do you offer remote fixes?", a: "We don't provide remote repairs. Our sessions are structured educational lessons — we teach concepts, not perform fixes." },
                { q: "Who is Setwise Digital best for?", a: "Seniors, families, and anyone who prefers simple, patient explanations." }
              ].map((faq, i) => (
                <div key={i} className={`border rounded-3xl transition-all duration-300 ${activeFaq === i ? "border-blue-600 bg-blue-50/30" : "border-zinc-200 hover:border-blue-200"}`}>
                  <button onClick={() => setActiveFaq(activeFaq === i ? null : i)}
                    className="w-full px-8 py-6 text-left flex items-center justify-between gap-4">
                    <span className="text-lg font-bold text-zinc-800">{faq.q}</span>
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 transition-all ${activeFaq === i ? "bg-blue-600 text-white rotate-180" : "bg-zinc-100 text-zinc-500"}`}>
                      <ChevronRight size={18} className="rotate-90" />
                    </div>
                  </button>
                  <div className={`overflow-hidden transition-all duration-300 ${activeFaq === i ? "max-h-60" : "max-h-0"}`}>
                    <div className="px-8 pb-6 text-zinc-600 leading-relaxed font-medium">{faq.a}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Links */}
          <div className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { href: "/about", title: "About Us", desc: "Learn our story" },
              { href: "/pricing", title: "Pricing & Plans", desc: "Review options" },
              { href: "/", title: "Go Back Home", desc: "Return home" },
            ].map((item, i) => (
              <Link key={i} href={item.href} className="p-8 bg-zinc-50 rounded-3xl group border border-zinc-100 hover:bg-white hover:shadow-xl transition-all">
                <h4 className="font-extrabold text-xl mb-2 group-hover:text-blue-600">{item.title}</h4>
                <p className="text-zinc-500 font-bold flex items-center gap-2 text-sm uppercase tracking-widest">
                  {item.desc} <ArrowUpRight size={16} />
                </p>
              </Link>
            ))}
          </div>

          <div className="mt-32 text-center p-12 bg-blue-50 rounded-[3rem] border border-blue-100">
            <p className="text-lg text-blue-900 font-bold italic leading-relaxed max-w-4xl mx-auto">
              &quot;Setwise Digital provides technology learning and educational guidance. We are not affiliated with or endorsed by printer, GPS, camera, or smart home brands.&quot;
            </p>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
}
