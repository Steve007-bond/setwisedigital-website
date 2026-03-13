"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileText, Bot, UserCheck, ChevronRight } from "lucide-react";
import PDFGuideSection from "./PDFGuideSection";
import AITroubleshooter from "./AITroubleshooter";
import ExpertConsultantSection from "./ExpertConsultantSection";

export interface TechBridgeLearnConfig {
  topic: string;
  // PDF Guide
  pdfTitle: string;
  pdfDescription: string;
  pdfHighlights: string[];
  // AI Troubleshooter
  brandExamples: string[];
  starterQuestions: string[];
  // Credentials (filled once you have them)
  emailjsServiceId?: string;
  emailjsPdfTemplateId?: string;
  emailjsContactTemplateId?: string;
  emailjsPublicKey?: string;
  discordBotToken?: string;
  discordChannelId?: string;
}

const TABS = [
  {
    id: "pdf",
    label: "PDF Guide",
    sublabel: "Learn at your own pace",
    icon: FileText,
    color: "blue",
  },
  {
    id: "ai",
    label: "AI Assistant",
    sublabel: "Instant troubleshooting",
    icon: Bot,
    color: "indigo",
  },
  {
    id: "expert",
    label: "Expert Consultant",
    sublabel: "One-on-one guidance",
    icon: UserCheck,
    color: "violet",
  },
] as const;

type TabId = (typeof TABS)[number]["id"];

export default function TechBridgeLearnLayout({
  config,
}: {
  config: TechBridgeLearnConfig;
}) {
  const [activeTab, setActiveTab] = useState<TabId>("pdf");

  return (
    <div id="learn" className="scroll-mt-20">
      {/* Section intro */}
      <div className="bg-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-700 font-black text-xs uppercase tracking-[0.2em] mb-6">
            3 Ways to Learn
          </div>
          <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">
            Choose How You Learn
          </h2>
          <p className="text-xl text-zinc-500 max-w-2xl mx-auto font-medium mb-16">
            Everyone learns differently. Pick the option that works best for you — or try all three.
          </p>

          {/* Tab switcher */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {TABS.map((tab) => {
              const Icon = tab.icon;
              const isActive = activeTab === tab.id;
              return (
                <motion.button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.97 }}
                  className={`relative p-6 rounded-[2rem] border-2 text-left transition-all duration-300 group ${
                    isActive
                      ? "bg-zinc-900 border-zinc-900 shadow-2xl shadow-zinc-900/20"
                      : "bg-white border-zinc-100 hover:border-zinc-300 shadow-sm"
                  }`}
                >
                  <div className={`w-12 h-12 rounded-xl flex items-center justify-center mb-4 transition-colors ${
                    isActive ? "bg-blue-600" : "bg-zinc-100 group-hover:bg-blue-50"
                  }`}>
                    <Icon size={22} className={isActive ? "text-white" : "text-zinc-500 group-hover:text-blue-600"} />
                  </div>
                  <div className={`font-black text-xl mb-1 ${isActive ? "text-white" : "text-zinc-900"}`}>
                    {tab.label}
                  </div>
                  <div className={`text-sm font-medium mb-3 ${isActive ? "text-zinc-400" : "text-zinc-500"}`}>
                    {tab.sublabel}
                  </div>
                  <div className={`flex items-center gap-1 text-xs font-black uppercase tracking-widest transition-colors ${
                    isActive ? "text-blue-400" : "text-zinc-400 group-hover:text-blue-600"
                  }`}>
                    {isActive ? "Currently selected" : "Select this"}
                    <ChevronRight size={12} />
                  </div>

                  {/* Active indicator dot */}
                  {isActive && (
                    <motion.div
                      layoutId="activeTab"
                      className="absolute top-4 right-4 w-3 h-3 bg-blue-500 rounded-full"
                    />
                  )}
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Tab content */}
      <AnimatePresence mode="wait">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
        >
          {activeTab === "pdf" && (
            <PDFGuideSection
              topic={config.topic}
              pdfTitle={config.pdfTitle}
              pdfDescription={config.pdfDescription}
              highlights={config.pdfHighlights}
              emailjsServiceId={config.emailjsServiceId}
              emailjsTemplateId={config.emailjsPdfTemplateId}
              emailjsPublicKey={config.emailjsPublicKey}
            />
          )}
          {activeTab === "ai" && (
            <AITroubleshooter
              topic={config.topic}
              brandExamples={config.brandExamples}
              starterQuestions={config.starterQuestions}
            />
          )}
          {activeTab === "expert" && (
            <ExpertConsultantSection
              topic={config.topic}
              emailjsServiceId={config.emailjsServiceId}
              emailjsContactTemplateId={config.emailjsContactTemplateId}
              emailjsPublicKey={config.emailjsPublicKey}
              discordBotToken={config.discordBotToken}
              discordChannelId={config.discordChannelId}
            />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
