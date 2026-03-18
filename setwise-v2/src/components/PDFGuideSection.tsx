"use client";

import React from "react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, CheckCircle2, AlertCircle, Loader2, Download, Shield, ChevronDown, ChevronUp, User } from "lucide-react";
import EmailInput from "@/components/EmailInput";
import PhoneInput from "@/components/PhoneInput";
import { validateEmail, validatePhone } from "@/lib/validation";

interface PDFGuideSectionProps {
  topic: string;
  pdfTitle: string;
  pdfDescription: string;
  highlights: string[];
  // EmailJS props kept for compatibility but no longer required
  emailjsServiceId?: string;
  emailjsTemplateId?: string;
  emailjsPublicKey?: string;
}

export default function PDFGuideSection({
  topic,
  pdfTitle,
  pdfDescription,
  highlights,
}: PDFGuideSectionProps) {
  const [firstName, setFirstName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [countryCode, setCountryCode] = useState("+1");
  const [agreed, setAgreed] = useState(false);
  const [showTerms, setShowTerms] = useState(false);
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const isValid =
    firstName.trim() !== "" &&
    validateEmail(email).valid &&
    validatePhone(phone).valid &&
    agreed;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValid) return;
    setStatus("loading");

    try {
      const res = await fetch("/api/pdf-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstName, email, phone: `${countryCode} ${phone}`, topic, pdfTitle }),
      });

      if (!res.ok) throw new Error("Server error");
      setStatus("success");
    } catch (err) {
      console.error("PDF request error:", err);
      setStatus("error");
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-zinc-50 to-blue-50/30">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row gap-16 items-start">

          {/* Left: What's inside */}
          <div className="lg:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest mb-8">
              <FileText size={14} />
              Free PDF Guide
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-6 leading-tight">
              {pdfTitle}
            </h2>
            <p className="text-lg text-zinc-500 font-medium mb-10 leading-relaxed">
              {pdfDescription}
            </p>

            <div className="bg-white rounded-[2rem] border border-zinc-100 shadow-xl p-8 mb-8">
              <div className="flex items-center gap-4 mb-6">
                <div className="w-14 h-14 bg-blue-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <FileText size={28} className="text-white" />
                </div>
                <div>
                  <div className="font-black text-zinc-900">{pdfTitle}</div>
                  <div className="text-sm text-zinc-400 font-bold">Setwise Digital • www.setwisedigital.com</div>
                </div>
              </div>
              <div className="text-xs font-black text-zinc-400 uppercase tracking-widest mb-4">What's inside:</div>
              <ul className="space-y-3">
                {highlights.map((h, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle2 size={16} className="text-blue-600 mt-0.5 shrink-0" />
                    <span className="text-sm font-bold text-zinc-700">{h}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-6 pt-6 border-t border-zinc-100 flex items-center gap-2 text-xs text-zinc-400 font-bold">
                <Shield size={14} className="text-green-500" />
                Sent directly to your inbox • No spam ever
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="lg:w-1/2 w-full">
            <AnimatePresence mode="wait">
              {status === "success" ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white rounded-[2rem] border border-green-100 shadow-xl p-12 text-center"
                >
                  <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                    <CheckCircle2 size={40} className="text-green-600" />
                  </div>
                  <h3 className="text-3xl font-black text-zinc-900 mb-4">Request Received! 🎉</h3>
                  <p className="text-zinc-500 font-medium mb-3">
                    Thanks <span className="font-black text-zinc-900">{firstName}</span>! Our team has been notified.
                  </p>
                  <p className="text-zinc-500 font-medium mb-6">
                    We'll email your <span className="font-bold text-zinc-800">{topic} guide</span> to{" "}
                    <span className="font-black text-zinc-900">{email}</span> shortly.
                  </p>
                  <p className="text-sm text-zinc-400">
                    Questions? Email us at{" "}
                    <a href="mailto:support@setwisedigital.com" className="text-blue-600 font-bold">
                      support@setwisedigital.com
                    </a>
                  </p>
                </motion.div>
              ) : (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="bg-white rounded-[2rem] border border-zinc-100 shadow-xl p-8 md:p-10"
                >
                  <h3 className="text-2xl font-black text-zinc-900 mb-2">Get Your Free Guide</h3>
                  <p className="text-zinc-400 font-medium mb-8 text-sm">
                    Enter your details and we'll send it straight to your inbox.
                  </p>

                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">
                        First Name *
                      </label>
                      <div className="relative">
                        <User size={16} className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-400" />
                        <input
                          type="text"
                          value={firstName}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => setFirstName(e.target.value)}
                          placeholder="e.g. Mary"
                          className="w-full pl-11 pr-4 py-4 bg-zinc-50 border border-zinc-200 rounded-2xl focus:outline-none focus:border-blue-500 focus:bg-white transition-all font-medium text-zinc-900"
                          required
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">
                        Email Address *
                      </label>
                      <EmailInput
                        value={email}
                        onChange={setEmail}
                        theme="light"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-black text-zinc-500 uppercase tracking-widest mb-2">
                        Phone Number *
                      </label>
                      <PhoneInput
                        value={phone}
                        countryCode={countryCode}
                        onChange={(val, cc) => { setPhone(val); setCountryCode(cc); }}
                        theme="light"
                      />
                    </div>

                    {/* T&C Checkbox */}
                    <div className="bg-zinc-50 rounded-2xl p-5 border border-zinc-200">
                      <label className="flex items-start gap-4 cursor-pointer">
                        <div
                          onClick={() => setAgreed(!agreed)}
                          className={`w-6 h-6 rounded-md border-2 flex items-center justify-center shrink-0 mt-0.5 transition-all cursor-pointer ${
                            agreed ? "bg-blue-600 border-blue-600" : "bg-white border-zinc-300"
                          }`}
                        >
                          {agreed && <CheckCircle2 size={14} className="text-white" />}
                        </div>
                        <span className="text-sm text-zinc-600 font-medium leading-relaxed">
                          I agree that Setwise Digital may send me this guide and use my email for{" "}
                          <span className="font-bold text-zinc-900">marketing updates and newsletters</span>.
                          I can unsubscribe at any time.{" "}
                          <button
                            type="button"
                            onClick={() => setShowTerms(!showTerms)}
                            className="text-blue-600 font-bold underline underline-offset-2 inline-flex items-center gap-1"
                          >
                            View full terms
                            {showTerms ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
                          </button>
                        </span>
                      </label>

                      <AnimatePresence>
                        {showTerms && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 pt-4 border-t border-zinc-200 text-xs text-zinc-500 leading-relaxed space-y-2">
                              <p><strong>Terms of consent:</strong> By submitting this form, you agree to receive the requested PDF guide and occasional emails from Setwise Digital including product updates, tips, and promotional offers.</p>
                              <p>We will never sell or share your information with third parties. You may unsubscribe at any time.</p>
                              <p>Company: Setwise Digital | Email: support@setwisedigital.com | Website: www.setwisedigital.com</p>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>

                    {status === "error" && (
                      <div className="flex items-start gap-3 p-4 bg-red-50 border border-red-100 rounded-2xl">
                        <AlertCircle size={18} className="text-red-500 shrink-0 mt-0.5" />
                        <p className="text-sm text-red-600 font-medium">
                          Something went wrong. Please email us directly at{" "}
                          <a href="mailto:support@setwisedigital.com" className="font-bold underline">
                            support@setwisedigital.com
                          </a>{" "}
                          and we will send your guide manually.
                        </p>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={!isValid || status === "loading"}
                      className={`w-full py-5 rounded-2xl font-black text-lg flex items-center justify-center gap-3 transition-all shadow-lg ${
                        isValid && status !== "loading"
                          ? "bg-blue-600 text-white hover:bg-blue-700 hover:shadow-blue-500/30 hover:shadow-xl hover:-translate-y-0.5"
                          : "bg-zinc-200 text-zinc-400 cursor-not-allowed"
                      }`}
                    >
                      {status === "loading" ? (
                        <>
                          <Loader2 size={20} className="animate-spin" />
                          Sending Request...
                        </>
                      ) : (
                        <>
                          <Download size={20} />
                          Send Me the Free Guide
                        </>
                      )}
                    </button>

                    <p className="text-center text-xs text-zinc-400 font-medium">
                      🔒 Your email is safe with us. Unsubscribe anytime.
                    </p>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
