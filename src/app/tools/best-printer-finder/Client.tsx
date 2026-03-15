"use client";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ScrollToTop from "@/components/ScrollToTop";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
// Full implementation coming next session
export default function Client() {
  return (
    <div className="min-h-screen bg-[#0d1117] text-white font-sans">
      <Navbar /><ScrollToTop />
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center max-w-lg mx-auto px-4">
          <div className="text-6xl mb-6">🚧</div>
          <h1 className="text-4xl font-black text-white mb-4">Almost Ready!</h1>
          <p className="text-zinc-400 text-xl mb-8">This tool is being finalized. Try our live tools while you wait.</p>
          <Link href="/tools" className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-black px-8 py-5 rounded-2xl text-lg">See All Tools <ArrowRight size={20}/></Link>
        </div>
      </div>
      <Footer/>
    </div>
  );
}
