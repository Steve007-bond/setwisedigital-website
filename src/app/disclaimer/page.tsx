"use client";
import { motion } from "framer-motion";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function DisclaimerPage() {
  return (
    <div className="min-h-screen bg-white text-zinc-900">
      <Navbar />
      <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-32">
        <motion.div initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
          <div className="inline-block px-4 py-1 rounded-full bg-blue-50 text-blue-700 font-black text-xs uppercase tracking-[0.2em] mb-6">Legal</div>
          <h1 className="text-5xl font-black tracking-tighter mb-4">Disclaimer</h1>
          <p className="text-zinc-500 font-medium mb-12">Last updated: January 2026</p>

          <div className="prose prose-zinc max-w-none space-y-10">

            <div className="p-6 bg-blue-50 border border-blue-200 rounded-2xl">
              <h2 className="text-xl font-black text-blue-900 mb-3">Independent Educational Platform</h2>
              <p className="text-blue-800 font-medium leading-relaxed">
                Setwise Digital is an independent educational technology literacy platform. We provide self-paced learning guides, tutorials, and educational courses to help individuals develop confidence and competency with everyday consumer technology devices.
              </p>
            </div>

            <section>
              <h2 className="text-2xl font-black mb-4">No Affiliation with Manufacturers</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                Setwise Digital is not affiliated with, endorsed by, authorised by, or in any way officially connected with any device manufacturer, software developer, or technology company referenced on this website. This includes but is not limited to:
              </p>
              <ul className="mt-4 space-y-2 text-zinc-600 font-medium">
                {["HP Inc. / Hewlett-Packard", "Canon Inc.", "Epson America Inc.", "Brother Industries Ltd.", "Lexmark International", "Garmin Ltd.", "TomTom International BV", "Amazon.com Inc. (Alexa / Echo)", "Google LLC (Google Home / Nest)", "Apple Inc. (Siri / HomePod)", "Samsung Electronics", "Ring LLC", "Arlo Technologies"].map(brand => (
                  <li key={brand} className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full shrink-0" />
                    {brand}
                  </li>
                ))}
              </ul>
              <p className="text-zinc-600 leading-relaxed font-medium mt-4">
                All brand names, product names, logos, and trademarks mentioned on this website are the property of their respective owners and are referenced solely for educational identification purposes under nominative fair use principles.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Educational Purpose Only</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                All content on Setwise Digital — including guides, lessons, tutorials, and interactive learning tools — is provided for general educational and informational purposes only. Our courses teach tech literacy and digital competency skills.
              </p>
              <p className="text-zinc-600 leading-relaxed font-medium mt-3">
                Setwise Digital does not provide: remote device access, official manufacturer warranties, authorised product servicing, or any form of certified technical repair. We are an education company, not a device service company.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Accuracy of Educational Content</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                While we strive to keep our educational content accurate and up to date, technology changes rapidly. Device interfaces, software versions, and menu structures may differ from what is described in our guides. Always refer to your device manufacturer&apos;s official documentation for the most current instructions.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">No Warranty</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                Educational content is provided &quot;as is&quot; without warranties of any kind, express or implied. Setwise Digital shall not be liable for any loss or damage arising from your use of our learning materials or your application of skills learned through our platform.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-black mb-4">Contact</h2>
              <p className="text-zinc-600 leading-relaxed font-medium">
                For questions about this disclaimer or our educational platform, please contact us at{" "}
                <a href="mailto:support@setwisedigital.com" className="text-blue-600 font-bold hover:underline">
                  support@setwisedigital.com
                </a>
              </p>
            </section>

          </div>
        </motion.div>
      </main>
      <Footer />
    </div>
  );
}
