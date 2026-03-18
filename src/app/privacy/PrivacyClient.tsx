"use client";

import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Mail, ShieldCheck, Globe, MapPin, Search, Lock, UserCheck, ShieldAlert, Eye, Database, Settings } from "lucide-react";

export default function PrivacyPage() {
  const sections = [
    {
      title: "1. Who We Are",
      icon: <ShieldCheck className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600">Setwise Digital is an independent technology education platform operated from Denver, Colorado, USA. We provide self-paced online courses, free learning guides, and live video lesson sessions to help everyday users understand their home technology devices.</p>
          <p className="text-zinc-600">We are not a technical support or repair service. We do not access your devices remotely. We are an educational company.</p>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <p className="text-blue-900 font-bold text-sm">Setwise Digital · 110 16th Street, Suite 1460 · Denver, CO 80202, USA · support@setwisedigital.com</p>
          </div>
        </div>
      )
    },
    {
      title: "2. Information We Collect",
      icon: <Search className="text-blue-600" />,
      content: (
        <div className="space-y-6">
          <div>
            <h4 className="font-bold text-zinc-900 mb-2">2.1 Information you give us</h4>
            <p className="text-zinc-600">When you request a free guide, book a lesson, or contact us, we collect your name, email address, and optionally your phone number and device type. We use this only to send you the resource you requested and to follow up about your lesson booking.</p>
          </div>
          <div>
            <h4 className="font-bold text-zinc-900 mb-2">2.2 Automatically collected data</h4>
            <p className="text-zinc-600">We automatically collect standard web data: your IP address (anonymised where possible), browser and device type, pages visited, session duration, and approximate location (city/state level only). This data is used for analytics and site improvement only.</p>
          </div>
          <div className="bg-blue-50 p-6 rounded-2xl border border-blue-100">
            <h4 className="font-bold text-blue-800 mb-2 flex items-center gap-2">
              <ShieldAlert size={20} />
              We never collect or store:
            </h4>
            <p className="text-blue-900/80 font-medium">Passwords, payment card details, bank information, government ID, or any sensitive personal data. Please never share these with us.</p>
          </div>
        </div>
      )
    },
    {
      title: "3. How We Use Your Information",
      icon: <Database className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600">We use your information only to:</p>
          <ul className="space-y-2 text-zinc-600 list-none">
            {[
              "Deliver the free guide or course materials you requested",
              "Confirm and schedule your lesson sessions",
              "Send educational newsletters if you opted in (you can unsubscribe anytime)",
              "Improve our website and content based on aggregate usage data",
              "Show relevant ads via Google Ads (see section 5)",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="text-zinc-600 font-medium">We never sell, rent, or share your personal data with third parties for their own marketing.</p>
        </div>
      )
    },
    {
      title: "4. Cookies & Tracking",
      icon: <Lock className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600">We use cookies and similar tracking technologies. By using our site, you consent to cookies as described below. You can withdraw consent at any time via the cookie settings link in our footer.</p>
          <div className="space-y-3">
            {[
              { type: "Essential cookies", desc: "Required for the site to function. Cannot be disabled. No personal data stored.", required: true },
              { type: "Analytics cookies", desc: "Help us understand how visitors use the site (Google Analytics). Data is anonymised and aggregated.", required: false },
              { type: "Advertising cookies", desc: "Used by Google Ads to show relevant educational content ads. You can opt out at adssettings.google.com.", required: false },
            ].map((item, i) => (
              <div key={i} className="flex gap-4 p-4 bg-zinc-50 rounded-xl border border-zinc-100">
                <div className={`text-xs font-black px-2 py-1 rounded-full self-start whitespace-nowrap ${item.required ? "bg-zinc-200 text-zinc-700" : "bg-blue-100 text-blue-700"}`}>
                  {item.required ? "Required" : "Optional"}
                </div>
                <div>
                  <div className="font-bold text-zinc-900 text-sm">{item.type}</div>
                  <div className="text-zinc-600 text-sm">{item.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "5. Google Ads & Analytics",
      icon: <ShieldCheck className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600">We use Google Analytics to understand site usage and Google Ads to advertise our educational courses to relevant audiences. Google may use cookies to show you our ads on other websites based on your prior visits to our site.</p>
          <p className="text-zinc-600">You can opt out of Google&apos;s use of cookies for advertising by visiting <a href="https://adssettings.google.com" className="text-blue-600 font-bold hover:underline" target="_blank" rel="noopener noreferrer">adssettings.google.com</a>. You can also opt out of Google Analytics by installing the <a href="https://tools.google.com/dlpage/gaoptout" className="text-blue-600 font-bold hover:underline" target="_blank" rel="noopener noreferrer">Google Analytics Opt-out Browser Add-on</a>.</p>
          <p className="text-zinc-600">Setwise Digital advertises as a technology education platform. Our ads promote educational courses and learning resources, not technical support or repair services.</p>
        </div>
      )
    },
    {
      title: "6. Data Retention",
      icon: <Database className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600">We retain your personal data only for as long as necessary to provide you with our educational services or as required by law. Specifically:</p>
          <ul className="space-y-2 text-zinc-600">
            {[
              "Email subscribers: until you unsubscribe",
              "Lesson booking enquiries: 12 months after your last lesson",
              "Analytics data: 26 months (Google Analytics default)",
              "You may request deletion of your data at any time (see section 8)",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
        </div>
      )
    },
    {
      title: "7. Third-Party Services",
      icon: <Globe className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600">We use the following third-party services, each with their own privacy policies:</p>
          <div className="space-y-2">
            {[
              { name: "Google Analytics", purpose: "Website usage analytics", link: "https://policies.google.com/privacy" },
              { name: "Google Ads", purpose: "Advertising our educational courses", link: "https://policies.google.com/privacy" },
              { name: "Vercel", purpose: "Website hosting", link: "https://vercel.com/legal/privacy-policy" },
              { name: "Discord (internal)", purpose: "Internal notification system for lesson bookings — your data is not shared publicly", link: null },
            ].map((item, i) => (
              <div key={i} className="flex items-start gap-3 p-4 bg-zinc-50 rounded-xl border border-zinc-100 text-sm">
                <div className="font-bold text-zinc-900 min-w-[140px]">{item.name}</div>
                <div className="text-zinc-600 flex-1">{item.purpose}</div>
              </div>
            ))}
          </div>
        </div>
      )
    },
    {
      title: "8. Your Rights",
      icon: <UserCheck className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600">Depending on your location, you may have the following rights regarding your personal data:</p>
          <ul className="space-y-2 text-zinc-600">
            {[
              "Access: Request a copy of the personal data we hold about you",
              "Correction: Ask us to correct inaccurate data",
              "Deletion: Request we delete your personal data",
              "Opt-out of marketing: Unsubscribe from emails at any time",
              "Cookie withdrawal: Change your cookie preferences at any time",
              "Data portability: Request your data in a portable format",
            ].map((item, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="text-blue-600 mt-1">•</span>
                {item}
              </li>
            ))}
          </ul>
          <p className="font-bold text-zinc-900">To exercise any of these rights, email us at <a href="mailto:support@setwisedigital.com" className="text-blue-600 hover:underline">support@setwisedigital.com</a>. We respond within 30 days.</p>
        </div>
      )
    },
    {
      title: "9. Children's Privacy",
      icon: <ShieldAlert className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600">Our services are intended for adults aged 18 and over. We do not knowingly collect personal data from children under 13. If you believe a child has provided us with personal data, please contact us immediately at support@setwisedigital.com and we will delete it promptly.</p>
        </div>
      )
    },
    {
      title: "10. Changes to This Policy",
      icon: <Settings className="text-blue-600" />,
      content: (
        <div className="space-y-4">
          <p className="text-zinc-600">We may update this Privacy Policy from time to time. When we do, we will update the &ldquo;Last Updated&rdquo; date at the top of this page. We encourage you to review this policy periodically. Continued use of our site after changes constitutes acceptance of the updated policy.</p>
          <p className="text-zinc-600 font-bold">Last updated: March 2026</p>
        </div>
      )
    },
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
              This policy explains how Setwise Digital collects, uses, and protects your information when you use our educational platform.
            </p>
            <p className="text-sm text-zinc-400 mt-4 font-medium">Last updated: March 2026 · Applies to setwisedigital.com</p>
          </motion.div>

          <div className="space-y-8">
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
              <p className="text-zinc-400 mb-8 font-medium">For any privacy-related questions, data requests, or to exercise your rights under this policy:</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 font-medium">
                <div className="space-y-4">
                  <p className="flex items-start gap-3">
                    <MapPin className="text-blue-400 mt-1 flex-shrink-0" />
                    <span>Setwise Digital<br />
                    110 16th Street, Suite 1460<br />
                    Denver, CO 80202, United States</span>
                  </p>
                </div>
                <div className="space-y-4">
                  <p className="flex items-center gap-3">
                    <Mail className="text-blue-400" />
                    <a href="mailto:support@setwisedigital.com" className="text-blue-400 hover:text-blue-300 transition-colors">support@setwisedigital.com</a>
                  </p>
                  <p className="flex items-center gap-3">
                    <Globe className="text-blue-400" />
                    www.setwisedigital.com
                  </p>
                  <p className="text-zinc-500 text-sm">We aim to respond to all privacy requests within 30 days.</p>
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
