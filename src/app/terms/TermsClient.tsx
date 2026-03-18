"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Scale, Mail, Globe, MapPin, FileText, ShieldAlert, CheckCircle2 } from "lucide-react";

export default function TermsPage() {
  const sections = [
    {
      title: "1. About Setwise Digital",
      icon: <FileText className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p>Setwise Digital provides educational, step-by-step guides to help users better understand technology. Our content includes skill-building lessons, plain-English explanations, tutorials, AI-powered learning tools, and optional live video lesson sessions with educators.</p>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <ShieldAlert size={20} />
              Educational Only — Not Official Technical Support
            </h4>
            <p className="text-blue-900/80 font-medium">Our content is for learning and informational purposes only. We do not act as manufacturer or brand support, guarantee results, take responsibility for device damage/data loss, or provide remote repairs.</p>
          </div>
          <p className="font-bold text-zinc-900">Always double-check instructions and back up data before applying changes.</p>
        </div>
      )
    },
    {
      title: "2. Eligibility",
      icon: <CheckCircle2 className="text-blue-600" />,
      content: <p>You may use the site only if you are 18 years or older and can legally agree to these Terms.</p>
    },
    {
      title: "3. Limited License",
      icon: <Scale className="text-blue-600" />,
      content: (
        <div className="space-y-2">
          <p>We grant a limited, non-exclusive license for personal, non-commercial use. You may not:</p>
          <ul className="list-disc pl-5 space-y-1 text-zinc-600">
            <li>Copy or republish content</li>
            <li>Misrepresent Setwise Digital</li>
            <li>Interfere with site security</li>
            <li>Attempt to exploit our tools</li>
          </ul>
        </div>
      )
    },
    {
      title: "4. AI Tools & Human Consultants",
      icon: <Globe className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p>AI suggestions may sometimes be incomplete or inaccurate. They are intended only to assist learning.</p>
          <p>Our educators conduct live video lesson sessions only. They do not log in to accounts, collect passwords, access devices remotely, or provide repair services.</p>
        </div>
      )
    },
    {
      title: "6. Advertising Disclosure",
      icon: <ShieldAlert className="text-blue-600" />,
      content: (
        <div className="space-y-2 text-zinc-600">
          <p>Our site may display ads, including Google Ads. We maintain clear ad labeling, functional landing pages, and non-deceptive content.</p>
          <p>Any interaction with ads is strictly between you and the advertiser.</p>
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
            <h1 className="text-4xl md:text-6xl font-extrabold mb-6">Terms & Conditions</h1>
            <p className="text-xl text-zinc-600 leading-relaxed max-w-2xl mx-auto">
              Welcome to Setwise Digital. These terms govern your access to our website, tools, and educational resources.
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
                11. Contact Us
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
