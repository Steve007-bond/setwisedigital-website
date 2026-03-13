"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, ShieldCheck, Globe, MapPin, Search, Lock, UserCheck, ShieldAlert } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Information We Collect",
      icon: <Search className="text-blue-600" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-zinc-900 mb-2">1.1 Automatically Collected</h4>
            <p className="text-zinc-600">IP address, browser + device type, pages viewed, session duration, and general location (city/state level, where available). Used for analytics and site improvement only.</p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-2">1.2 Information You Provide</h4>
            <p className="text-zinc-600">Name, email address, phone (optional), and tech questions. We collect this only to contact you for educational help or learning guidance.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <ShieldAlert size={20} />
              We do NOT request or store:
            </h4>
            <p className="text-blue-900/80 font-medium">Passwords, bank or card information, or sensitive personal data. Please do not share sensitive information.</p>
          </div>
        </div>
      )
    },
    {
      title: "2. Cookies & Tracking",
      icon: <Lock className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p>We use cookies for website functionality, analytics, and ad personalization (where legally allowed). Some cookies may be placed by Google Ads or Analytics.</p>
          <p>Users can manage preferences via their browser settings.</p>
        </div>
      )
    },
    {
      title: "4. Google Ads & Analytics Disclosure",
      icon: <ShieldCheck className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p>We may use Google Analytics and Google Ads to show relevant ads. Google may collect or receive data to show relevant ads.</p>
          <p>Users can manage ad preferences via Google Ads Settings: adssettings.google.com</p>
        </div>
      )
    },
    {
      title: "8. Your Rights",
      icon: <UserCheck className="text-blue-600" />,
      content: (
        <div className="space-y-2">
          <p>You may request deletion of your data, access, opt-out of cookies, or unsubscribe from communications.</p>
          <p className="font-bold text-zinc-900">Email us at support@setwisedigital.com.</p>
        </div>
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#FDFDFD] text-zinc-900 font-sans selection:bg-blue-100">
      <Navbar />
      
      <main className="pt-44 pb-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="mb-16 text-center"
          >
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Privacy Policy</h1>
            <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto">
              This policy explains how Setwise Digital collects, uses, and protects your information when you use our website.
            </p>
          </motion.div>

          <div className="space-y-12">
            {sections.map((section, i) => (
              <motion.section 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="p-8 md:p-10 bg-white rounded-[2.5rem] border border-zinc-100 shadow-sm"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 flex items-center justify-center">
                    {section.icon}
                  </div>
                  <h2 className="text-2xl font-bold">{section.title}</h2>
                </div>
                <div className="text-lg text-zinc-600 leading-relaxed font-medium">
                  {section.content}
                </div>
              </motion.section>
            ))}

            {/* Contact Section */}
            <motion.section 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="p-8 md:p-10 bg-zinc-900 text-white rounded-[2.5rem]"
            >
              <h2 className="text-2xl font-bold mb-8 flex items-center gap-3">
                <Mail className="text-blue-400" />
                11. Contact
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-medium">
                <div className="space-y-4">
                  <p className="flex items-start gap-3">
                    <MapPin className="text-blue-400 mt-1 flex-shrink-0" />
                    Setwise Digital<br />
                    110 16th Street, Suite 1460<br />
                    Denver, CO 80202, United States
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <Mail className="text-blue-400" />
                    support@setwisedigital.com
                  </p>
                  <p className="flex items-center gap-3">
                    <Globe className="text-blue-400" />
                    www.setwisedigital.com
                  </p>
                </div>
              </div>
            </motion.section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
