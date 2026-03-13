"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, ShieldAlert, Globe, MapPin, Search, BookOpen, Scale, Zap } from "lucide-react";

export default function DisclaimerPage() {
  const sections = [
    {
      title: "1. Educational Purposes Only",
      icon: <BookOpen className="text-blue-600" />,
      content: (
        <div className="space-y-6">
          <p>All content on this Site — including articles, guides, web apps, AI suggestions, chat responses, downloads, and emails — is provided for informational and educational purposes only.</p>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <ShieldAlert size={20} />
              We do not provide:
            </h4>
            <p className="text-blue-900/80 font-medium">Official manufacturer support, certified repair services, professional IT consulting, or legal/financial/medical advice. You are responsible for how you choose to use the information.</p>
          </div>
          <div className="space-y-2">
            <p className="font-bold text-zinc-900">Always:</p>
            <ul className="list-disc pl-5 space-y-1 text-zinc-600">
              <li>Back up important data</li>
              <li>Read manufacturer instructions</li>
              <li>Proceed carefully before changing settings or installing software</li>
            </ul>
          </div>
        </div>
      )
    },
    {
      title: "2. AI-Generated Content & Human Consultants",
      icon: <Zap className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p>Some guidance may come from AI-powered tools and suggestions may be incomplete or inaccurate. Human consultants are available only to clarify instructions and explain educational content.</p>
          <p>They do not request passwords, access personal accounts, or remotely control devices.</p>
        </div>
      )
    },
    {
      title: "3. No Affiliation With Brands",
      icon: <Scale className="text-blue-600" />,
      content: (
        <div className="space-y-4 text-zinc-600">
          <p>Setwise Digital is not affiliated, sponsored, or endorsed by printer companies, computer brands, GPS companies, or software vendors.</p>
          <p>All trademarks, logos, and brand names belong to their respective owners and are used for identification purposes only.</p>
        </div>
      )
    },
    {
      title: "4. Advertising & Monetization",
      icon: <ShieldAlert className="text-blue-600" />,
      content: (
        <div className="space-y-4 text-zinc-600">
          <p>Our Site may display advertisements or include affiliate links to help support the website. We do not control the content of ads and do not guarantee any advertised products or services.</p>
          <p>Any interaction with ads is strictly between you and the third-party provider.</p>
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
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Disclaimer</h1>
            <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto">
              Setwise Digital provides information to help users learn technology through simple, step-by-step educational guides.
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
                10. Contact Us
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
