import React from "react";
import { Search, HelpCircle } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function FaqSearchFilters({ search, setSearch, selectedCategory, setSelectedCategory }) {
  const { theme } = useTheme();

  return (
    <div className="text-center max-w-3xl mx-auto mb-1">
      <div className={`inline-flex items-center gap-1.5 px-3 py-0.5 rounded-full border text-[11px] font-bold uppercase tracking-widest mb-1 ${
        theme === "dark" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-emerald-100 border-emerald-200 text-emerald-800"
      }`}>
        <HelpCircle size={12} className={theme === "dark" ? "text-emerald-400" : "text-emerald-600"} /> Knowledge Hub & FAQ
      </div>

      <h2 className={`font-heading text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}>
        Frequently Asked <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300">Questions</span>
      </h2>

      <p className={`mt-0.5 text-xs sm:text-sm max-w-xl mx-auto font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
        Everything you need to know about peer-to-peer solar trading, smart net-metering, and daily payouts.
      </p>

      {/* Search & Category Filter */}
      <div className="mt-2 max-w-xl mx-auto space-y-1.5">
        <div className="relative">
          <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            placeholder="Search questions (e.g. net meter, pricing, DISCOM)..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className={`w-full rounded-xl pl-9 pr-4 py-1.5 text-xs sm:text-sm font-medium border focus:border-emerald-500 focus:outline-none transition shadow-sm ${
              theme === "dark"
                ? "bg-slate-800/80 border-slate-700 text-white placeholder-slate-400"
                : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-slate-200/50"
            }`}
          />
        </div>

        <div className="flex flex-wrap justify-center gap-1.5">
          {[
            { id: "all", label: "All Questions" },
            { id: "prosumers", label: "Solar Owners" },
            { id: "consumers", label: "Energy Buyers" },
            { id: "pricing", label: "Pricing & UPI" },
            { id: "billing", label: "DISCOM Net Meter" },
          ].map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3 py-0.5 rounded-full text-xs font-extrabold transition duration-200 ${
                selectedCategory === cat.id
                  ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
                  : theme === "dark"
                  ? "bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700/80"
                  : "bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}


