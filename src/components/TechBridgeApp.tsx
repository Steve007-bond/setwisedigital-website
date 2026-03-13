"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronRight, ArrowLeft, RotateCcw, CheckCircle2, AlertCircle, Info, Mail } from "lucide-react";
import Link from "next/link";

export type Step = {
  id: string;
  question: string;
  options: {
    label: string;
    nextStepId?: string;
    isFinal?: boolean;
    result?: string;
    instructions?: string[];
  }[];
};

type TechBridgeAppProps = {
  title: string;
  steps: Step[];
  onComplete?: () => void;
};

export default function TechBridgeApp({ title, steps }: TechBridgeAppProps) {
  const [currentStepId, setCurrentStepId] = useState<string>(steps[0].id);
  const [history, setHistory] = useState<string[]>([]);
  const [showResult, setShowResult] = useState(false);
  const [currentResult, setCurrentResult] = useState<{
    title: string;
    instructions?: string[];
  } | null>(null);

  const totalSteps = steps.length;
  const currentStepIndex = steps.findIndex((s) => s.id === currentStepId);
  const progress = showResult ? 100 : ((currentStepIndex + 1) / totalSteps) * 100;

  const currentStep = steps.find((s) => s.id === currentStepId);

  const handleOptionClick = (option: any) => {
    if (option.isFinal) {
      setCurrentResult({
        title: option.label,
        instructions: option.instructions
      });
      setShowResult(true);
    } else if (option.nextStepId) {
      setHistory([...history, currentStepId]);
      setCurrentStepId(option.nextStepId);
    }
  };

  const handleBack = () => {
    if (history.length > 0) {
      const prevStepId = history[history.length - 1];
      setCurrentStepId(prevStepId);
      setHistory(history.slice(0, -1));
      setShowResult(false);
    }
  };

  const handleReset = () => {
    setCurrentStepId(steps[0].id);
    setHistory([]);
    setShowResult(false);
    setCurrentResult(null);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-white rounded-[3rem] border border-zinc-100 shadow-2xl overflow-hidden min-h-[500px] flex flex-col">
      {/* App Header */}
      <div className="bg-zinc-900 p-6 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <span className="text-white font-bold">S</span>
          </div>
          <span className="text-white font-bold">{title}</span>
        </div>
        <button 
          onClick={handleReset}
          className="text-zinc-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-bold uppercase tracking-widest"
        >
          <RotateCcw size={16} />
          Reset
        </button>
      </div>

      {/* Progress Bar */}
      <div className="w-full h-1.5 bg-zinc-800">
        <motion.div 
          initial={{ width: 0 }}
          animate={{ width: `${progress}%` }}
          className="h-full bg-blue-600 shadow-[0_0_15px_rgba(37,99,235,0.5)]"
        />
      </div>

      {/* App Content */}
      <div className="flex-grow p-8 md:p-12 relative flex flex-col">
        <AnimatePresence mode="wait">
          {!showResult ? (
            <motion.div
              key={currentStepId}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-8 flex-grow"
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  {history.length > 0 ? (
                    <button 
                      onClick={handleBack}
                      className="flex items-center gap-2 text-blue-600 font-black text-sm uppercase tracking-widest hover:gap-3 transition-all"
                    >
                      <ArrowLeft size={18} />
                      Back
                    </button>
                  ) : <div />}
                  <span className="text-zinc-400 font-black text-xs uppercase tracking-[0.2em]">
                    Step {currentStepIndex + 1} of {totalSteps}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl font-black text-zinc-900 leading-[1.1] tracking-tighter">
                  {currentStep?.question}
                </h3>
              </div>

              <div className="grid grid-cols-1 gap-4">
                {currentStep?.options.map((option, i) => (
                  <button
                    key={i}
                    onClick={() => handleOptionClick(option)}
                    className="group p-8 text-left bg-zinc-50 border border-zinc-100 rounded-3xl hover:bg-blue-600 hover:border-blue-600 transition-all flex items-center justify-between shadow-sm hover:shadow-2xl hover:shadow-blue-500/20 hover:-translate-y-1"
                  >
                    <span className="text-xl font-black text-zinc-800 group-hover:text-white transition-colors">
                      {option.label}
                    </span>
                    <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center text-zinc-400 group-hover:bg-white group-hover:text-blue-600 group-hover:translate-x-1 transition-all">
                      <ChevronRight size={20} />
                    </div>
                  </button>
                ))}
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="result"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="space-y-8 flex-grow"
            >
              <div className="p-10 bg-blue-50 rounded-[3rem] border border-blue-100 shadow-inner">
                <div className="flex items-center gap-6 mb-10">
                  <div className="w-16 h-16 bg-blue-600 rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shadow-blue-500/30">
                    <CheckCircle2 size={32} />
                  </div>
                  <h3 className="text-3xl font-black text-blue-900 tracking-tighter">
                    {currentResult?.title}
                  </h3>
                </div>
                
                {currentResult?.instructions && (
                  <div className="space-y-8">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-blue-100 text-blue-700 text-xs font-black uppercase tracking-widest">
                      <Info size={14} />
                      Step-by-Step Instructions
                    </div>
                    <ul className="space-y-4">
                      {currentResult.instructions.map((step, i) => (
                        <motion.li 
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          key={i} 
                          className="flex gap-5 items-start bg-white p-6 rounded-2xl shadow-sm border border-blue-50 group hover:border-blue-200 transition-all"
                        >
                          <span className="w-10 h-10 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center font-black shrink-0 group-hover:bg-blue-600 group-hover:text-white transition-colors">
                            {i + 1}
                          </span>
                          <span className="text-lg text-zinc-700 font-bold leading-relaxed">
                            {step}
                          </span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <button 
                  onClick={handleReset}
                  className="flex-grow py-6 bg-zinc-900 text-white rounded-[2rem] font-black text-xl hover:bg-zinc-800 transition-all flex items-center justify-center gap-3 shadow-xl"
                >
                  <RotateCcw size={24} />
                  New Guide
                </button>
                <Link 
                  href="/contact"
                  className="flex-grow py-6 bg-blue-600 text-white rounded-[2rem] font-black text-xl hover:bg-blue-700 transition-all flex items-center justify-center gap-3 shadow-xl shadow-blue-500/20"
                >
                  <Mail size={24} />
                  Talk to Expert
                </Link>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* App Footer Info */}
      <div className="bg-zinc-50 border-t border-zinc-100 p-6 flex items-center gap-3">
        <Info size={18} className="text-blue-600" />
        <p className="text-sm font-bold text-zinc-500 uppercase tracking-widest">
          Step-by-step guidance designed for non-technical users.
        </p>
      </div>
    </div>
  );
}
