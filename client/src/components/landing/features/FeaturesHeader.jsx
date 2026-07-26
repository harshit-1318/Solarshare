import React from "react";
import { Sparkles } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function FeaturesHeader({ filter, setFilter }) {
  const { theme } = useTheme();

  return (
    <div className="text-center max-w-3xl mx-auto">
      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest mb-1.5 transition-colors ${
        theme === "dark" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-emerald-100/90 border-emerald-200/90 text-emerald-800"
      }`}>
        <Sparkles size={13} className={theme === "dark" ? "text-emerald-400" : "text-emerald-600"} /> Next-Gen Energy Trading Protocol
      </div>
      
      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
        Why Thousands Choose <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">SolarShare</span>
      </h2>
      
      <p className={`mt-1 text-xs sm:text-sm leading-relaxed font-normal max-w-2xl mx-auto ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
        SolarShare provides the most robust, compliant, and intuitive platform for decentralized community solar trading in India.
      </p>

      <div className="mt-2.5 flex flex-wrap items-center justify-center gap-1.5 sm:gap-2">
        {[
          { id: "all", label: "All Features (6)" },
          { id: "prosumer", label: "☀️ Solar Owners" },
          { id: "consumer", label: "⚡ Power Buyers" },
          { id: "security", label: "🔒 Security & Audit" },
        ].map((btn) => (
          <button
            key={btn.id}
            onClick={() => setFilter(btn.id)}
            className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all duration-200 ${
              filter === btn.id
                ? "bg-emerald-500 text-slate-950 font-bold shadow-md shadow-emerald-500/20"
                : theme === "dark"
                  ? "bg-slate-800 text-slate-400 hover:text-white border border-slate-700"
                  : "bg-slate-100 text-slate-600 hover:text-slate-900 border border-slate-300 hover:border-slate-400"
            }`}
          >
            {btn.label}
          </button>
        ))}
      </div>
    </div>
  );
}
