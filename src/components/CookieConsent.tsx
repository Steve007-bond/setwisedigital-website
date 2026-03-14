"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Cookie, X, ChevronDown, ChevronUp, ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function CookieConsent() {
  const [visible, setVisible] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [prefs, setPrefs] = useState({ analytics: true, advertising: true });

  useEffect(() => {
    const consent = localStorage.getItem("sw_cookie_consent");
    if (!consent) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const acceptAll = () => {
    localStorage.setItem("sw_cookie_consent", JSON.stringify({ analytics: true, advertising: true, ts: Date.now() }));
    setVisible(false);
  };

  const acceptSelected = () => {
    localStorage.setItem("sw_cookie_consent", JSON.stringify({ ...prefs, ts: Date.now() }));
    setVisible(false);
  };

  const declineAll = () => {
    localStorage.setItem("sw_cookie_consent", JSON.stringify({ analytics: false, advertising: false, ts: Date.now() }));
    setVisible(false);
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
          className="fixed bottom-0 left-0 right-0 z-[9999] p-4 md:p-6"
        >
          <div className="max-w-5xl mx-auto bg-zinc-900 border border-white/10 rounded-[2rem] shadow-2xl shadow-black/40 overflow-hidden">
            <div className="p-6 md:p-8">
              {/* Header row */}
              <div className="flex items-start justify-between gap-4 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-600 rounded-xl flex items-center justify-center shrink-0">
                    <Cookie size={20} className="text-white" />
                  </div>
                  <div>
                    <h3 className="text-white font-black text-lg leading-tight">We use cookies</h3>
                    <p className="text-zinc-400 text-sm font-medium">To improve your learning experience</p>
                  </div>
                </div>
                <button onClick={declineAll} className="text-zinc-500 hover:text-white transition-colors p-1 shrink-0">
                  <X size={20} />
                </button>
              </div>

              {/* Description */}
              <p className="text-zinc-400 text-sm font-medium mb-4 leading-relaxed">
                We use essential cookies to run this site, and optional cookies for analytics and to show relevant ads for our educational courses on other sites. 
                {" "}<Link href="/privacy" className="text-blue-400 hover:text-blue-300 underline">Read our Privacy Policy</Link>
              </p>

              {/* Optional: show details toggle */}
              <button
                onClick={() => setShowDetails(!showDetails)}
                className="flex items-center gap-2 text-zinc-400 hover:text-white text-xs font-bold uppercase tracking-widest transition-colors mb-4"
              >
                {showDetails ? <ChevronUp size={14} /> : <ChevronDown size={14} />}
                {showDetails ? "Hide" : "Customise"} preferences
              </button>

              <AnimatePresence>
                {showDetails && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    className="overflow-hidden mb-4"
                  >
                    <div className="space-y-3 py-2">
                      {/* Essential - always on */}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <div className="text-white font-bold text-sm">Essential cookies</div>
                          <div className="text-zinc-500 text-xs">Required for the site to work. Cannot be disabled.</div>
                        </div>
                        <div className="text-xs font-black text-zinc-500 uppercase tracking-widest bg-zinc-800 px-3 py-1 rounded-full">Always on</div>
                      </div>
                      {/* Analytics */}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <div className="text-white font-bold text-sm">Analytics cookies</div>
                          <div className="text-zinc-500 text-xs">Help us improve our courses and content (Google Analytics).</div>
                        </div>
                        <button
                          onClick={() => setPrefs(p => ({ ...p, analytics: !p.analytics }))}
                          className={`relative w-12 h-6 rounded-full transition-colors ${prefs.analytics ? "bg-blue-600" : "bg-zinc-700"}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${prefs.analytics ? "translate-x-7" : "translate-x-1"}`} />
                        </button>
                      </div>
                      {/* Advertising */}
                      <div className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/10">
                        <div>
                          <div className="text-white font-bold text-sm">Advertising cookies</div>
                          <div className="text-zinc-500 text-xs">Allow Google Ads to show our course ads on other sites.</div>
                        </div>
                        <button
                          onClick={() => setPrefs(p => ({ ...p, advertising: !p.advertising }))}
                          className={`relative w-12 h-6 rounded-full transition-colors ${prefs.advertising ? "bg-blue-600" : "bg-zinc-700"}`}
                        >
                          <span className={`absolute top-1 w-4 h-4 bg-white rounded-full transition-transform ${prefs.advertising ? "translate-x-7" : "translate-x-1"}`} />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3">
                <button
                  onClick={acceptAll}
                  className="flex-1 py-3 bg-blue-600 hover:bg-blue-500 text-white font-black text-sm rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
                >
                  <ShieldCheck size={16} />
                  Accept all cookies
                </button>
                {showDetails ? (
                  <button
                    onClick={acceptSelected}
                    className="flex-1 py-3 bg-white/10 hover:bg-white/20 text-white font-black text-sm rounded-xl transition-all border border-white/10"
                  >
                    Save my preferences
                  </button>
                ) : (
                  <button
                    onClick={declineAll}
                    className="flex-1 py-3 bg-white/5 hover:bg-white/10 text-zinc-400 hover:text-white font-black text-sm rounded-xl transition-all border border-white/10"
                  >
                    Essential only
                  </button>
                )}
              </div>

              <p className="text-zinc-600 text-xs text-center mt-4 font-medium">
                You can change your preferences at any time via our{" "}
                <Link href="/privacy" className="text-zinc-500 hover:text-zinc-300 underline">Privacy Policy</Link>
              </p>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
