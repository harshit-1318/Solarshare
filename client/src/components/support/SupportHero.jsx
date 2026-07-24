import { LifeBuoy, Search } from "lucide-react";

export default function SupportHero({ searchQuery, setSearchQuery }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 sm:p-14 text-white shadow-2xl border border-slate-800">
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-3xl">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">
          <LifeBuoy size={14} className="text-emerald-400" /> 24/7 Dedicated Support Center
        </div>

        <h1 className="font-heading text-3xl sm:text-5xl font-black tracking-tight text-white leading-tight">
          How Can We Help You <br className="hidden sm:inline" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Power Your Journey?
          </span>
        </h1>

        <p className="mt-4 text-base text-slate-300 leading-relaxed max-w-xl">
          Search our knowledge base, connect with a clean energy advisor, or file a high-priority grid ticket.
        </p>

        <div className="mt-8 relative max-w-2xl">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search topics (e.g., smart meter sync, payout delay, carbon credits)..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full rounded-2xl border border-slate-700 bg-slate-900/90 py-4 pl-12 pr-4 text-sm text-white placeholder:text-slate-500 focus:bg-slate-900 focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/20 focus:outline-none transition duration-200"
          />
        </div>
      </div>
    </div>
  );
}
