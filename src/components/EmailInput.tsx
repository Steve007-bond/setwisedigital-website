"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, AlertCircle, Mail } from "lucide-react";
import { validateEmail } from "@/lib/validation";

interface EmailInputProps {
  value: string;
  onChange: (value: string) => void;
  error?: string;
  theme?: "dark" | "light";
  placeholder?: string;
  required?: boolean;
}

export default function EmailInput({
  value,
  onChange,
  error,
  theme = "light",
  placeholder = "name@email.com",
  required = true,
}: EmailInputProps) {
  const [touched, setTouched] = useState(false);

  const validation = touched ? validateEmail(value) : null;
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
      <div className="relative">
        <Mail
          size={16}
          className={`absolute left-4 top-1/2 -translate-y-1/2 ${isDark ? "text-zinc-500" : "text-zinc-400"}`}
        />
        <input
          type="email"
          value={value}
          required={required}
          placeholder={placeholder}
          onBlur={() => setTouched(true)}
          onChange={(e) => {
            onChange(e.target.value);
            if (!touched && e.target.value.includes("@")) setTouched(true);
          }}
          className={`w-full pl-11 pr-10 py-4 rounded-2xl border font-medium text-base transition-all focus:outline-none ${inputBase} ${borderOverride}`}
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
