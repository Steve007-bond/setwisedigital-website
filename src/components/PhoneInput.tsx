"use client";

import React, { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, ChevronDown } from "lucide-react";
import { COUNTRY_CODES, validatePhone } from "@/lib/validation";

interface PhoneInputProps {
  value: string;
  countryCode: string;
  onChange: (value: string, countryCode: string) => void;
  error?: string;
  /** "dark" = white text on dark bg (LeadWizard), "light" = dark text on white bg (PDFGuideSection etc.) */
  theme?: "dark" | "light";
  placeholder?: string;
  required?: boolean;
}

export default function PhoneInput({
  value,
  countryCode,
  onChange,
  error,
  theme = "light",
  placeholder = "e.g. 555 000 0000",
  required = true,
}: PhoneInputProps) {
  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [touched, setTouched] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selected = COUNTRY_CODES.find((c) => c.code === countryCode) ?? COUNTRY_CODES[0];
  const filtered = COUNTRY_CODES.filter(
    (c) =>
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      c.code.includes(search)
  );

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
        setSearch("");
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const validation = touched ? validatePhone(value) : null;
  const showError = touched && !validation?.valid;
  const showSuccess = touched && validation?.valid;

  const isDark = theme === "dark";

  const inputBase = isDark
    ? "bg-white/5 border-white/10 text-white placeholder:text-zinc-600 focus:border-blue-500"
    : "bg-zinc-50 border-zinc-200 text-zinc-900 placeholder:text-zinc-400 focus:border-blue-500 focus:bg-white";

  const borderOverride = showError
    ? "border-red-500"
    : showSuccess
    ? "border-green-500"
    : "";

  return (
    <div className="space-y-1.5">
      <div className="flex gap-2" ref={dropdownRef}>
        {/* Country Code Dropdown */}
        <div className="relative shrink-0">
          <button
            type="button"
            onClick={() => setOpen(!open)}
            className={`flex items-center gap-1.5 px-3 py-4 rounded-2xl border font-bold text-sm transition-all h-full ${inputBase} ${borderOverride}`}
          >
            <span className="text-lg leading-none">{selected.flag}</span>
            <span className={isDark ? "text-white" : "text-zinc-700"}>{selected.code}</span>
            <ChevronDown
              size={14}
              className={`transition-transform ${open ? "rotate-180" : ""} ${isDark ? "text-zinc-400" : "text-zinc-500"}`}
            />
          </button>

          <AnimatePresence>
            {open && (
              <motion.div
                initial={{ opacity: 0, y: -8, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -8, scale: 0.97 }}
                transition={{ duration: 0.15 }}
                className="absolute left-0 top-full mt-1 z-50 w-64 rounded-2xl border border-zinc-200 bg-white shadow-2xl overflow-hidden"
              >
                <div className="p-2 border-b border-zinc-100">
                  <input
                    autoFocus
                    type="text"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                    placeholder="Search country..."
                    className="w-full px-3 py-2 text-sm rounded-xl border border-zinc-200 focus:outline-none focus:border-blue-500 text-zinc-900"
                  />
                </div>
                <div className="max-h-52 overflow-y-auto">
                  {filtered.length === 0 ? (
                    <div className="px-4 py-3 text-sm text-zinc-400">No results</div>
                  ) : (
                    filtered.map((c) => (
                      <button
                        key={c.code}
                        type="button"
                        onClick={() => {
                          onChange(value, c.code);
                          setOpen(false);
                          setSearch("");
                        }}
                        className={`w-full flex items-center gap-3 px-4 py-2.5 text-sm hover:bg-blue-50 transition-colors text-left ${
                          c.code === countryCode ? "bg-blue-50 font-bold text-blue-700" : "text-zinc-700"
                        }`}
                      >
                        <span className="text-base">{c.flag}</span>
                        <span className="flex-1 font-medium">{c.name}</span>
                        <span className="text-zinc-400 text-xs font-bold">{c.code}</span>
                      </button>
                    ))
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Phone number input */}
        <div className="relative flex-1">
          <input
            type="tel"
            value={value}
            required={required}
            placeholder={placeholder}
            onBlur={() => setTouched(true)}
            onChange={(e) => {
              // Allow only digits, spaces, hyphens, parentheses
              const cleaned = e.target.value.replace(/[^\d\s\-().]/g, "");
              onChange(cleaned, countryCode);
              if (!touched && cleaned.length > 3) setTouched(true);
            }}
            className={`w-full px-4 py-4 rounded-2xl border font-medium text-base transition-all focus:outline-none pr-10 ${inputBase} ${borderOverride}`}
          />
          <AnimatePresence>
            {showSuccess && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute right-4 top-1/2 -translate-y-1/2">
                <CheckCircle2 size={18} className="text-green-500" />
              </motion.div>
            )}
            {showError && (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} exit={{ scale: 0 }}
                className="absolute right-4 top-1/2 -translate-y-1/2">
                <AlertCircle size={18} className="text-red-500" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Error / hint messages */}
      <AnimatePresence>
        {showError && (
          <motion.p initial={{ opacity: 0, y: -4 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            className="text-red-500 text-xs font-bold ml-1">
            {error || validation?.message}
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
