import Link from "next/link";
import { ArrowLeft, Home, Search } from "lucide-react";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-white flex items-center justify-center px-4">
      <div className="text-center max-w-lg">
        <div className="text-[10rem] font-black text-zinc-100 leading-none select-none">
          404
        </div>
        <div className="-mt-8 relative z-10">
          <h1 className="text-4xl font-black text-zinc-900 mb-4 tracking-tight">
            Page not found
          </h1>
          <p className="text-lg text-zinc-500 font-medium mb-10 leading-relaxed">
            The page you're looking for doesn't exist or may have moved. Let's get you back on track.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-blue-600 text-white rounded-2xl font-black hover:bg-blue-700 transition-all shadow-lg shadow-blue-500/20"
            >
              <Home size={18} />
              Go Home
            </Link>
            <Link
              href="/techbridge"
              className="flex items-center justify-center gap-2 px-8 py-4 bg-zinc-100 text-zinc-900 rounded-2xl font-black hover:bg-zinc-200 transition-all"
            >
              <Search size={18} />
              Browse Topics
            </Link>
          </div>
          <Link
            href="javascript:history.back()"
            className="inline-flex items-center gap-2 mt-8 text-sm font-bold text-zinc-400 hover:text-blue-600 transition-colors"
          >
            <ArrowLeft size={14} />
            Go back
          </Link>
        </div>
      </div>
    </div>
  );
}
