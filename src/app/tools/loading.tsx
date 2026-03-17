// Shared loading skeleton for all tool pages
// Shows instantly while the "use client" component hydrates
export default function Loading() {
  return (
    <div className="min-h-screen bg-[#0d1117] flex flex-col">
      {/* Nav skeleton */}
      <div className="h-16 bg-zinc-900/50 border-b border-zinc-800 animate-pulse" />
      {/* Hero skeleton */}
      <div className="flex-1 flex items-end pb-20 pt-40 px-8 min-h-[70vh] bg-zinc-950 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-zinc-900 to-zinc-950 animate-pulse" />
        <div className="relative z-10 w-full max-w-7xl mx-auto space-y-4">
          <div className="h-4 w-32 bg-zinc-800 rounded-full animate-pulse" />
          <div className="h-12 w-2/3 bg-zinc-800 rounded-xl animate-pulse" />
          <div className="h-12 w-1/2 bg-zinc-700 rounded-xl animate-pulse" />
          <div className="h-6 w-3/4 bg-zinc-800 rounded-lg animate-pulse mt-4" />
        </div>
      </div>
      {/* Content skeleton */}
      <div className="max-w-4xl mx-auto px-8 py-16 w-full space-y-4">
        <div className="h-48 bg-zinc-900 border border-zinc-800 rounded-3xl animate-pulse" />
        <div className="h-48 bg-zinc-900 border border-zinc-800 rounded-3xl animate-pulse" />
      </div>
    </div>
  );
}
