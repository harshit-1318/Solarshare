import React from "react";
import { Sun, TrendingUp, Activity } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeroMetrics({ stats }) {
  const { theme } = useTheme();

  return (
    <div className={`pt-3 mt-1.5 border-t grid grid-cols-3 gap-3 max-w-lg ${
      theme === "dark" ? "border-slate-800/80" : "border-slate-200"
    }`}>
      <div>
        <p className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}>
          {stats.totalProsumers.toLocaleString()}
        </p>
        <p className={`text-[10px] sm:text-[11px] font-bold mt-0.5 uppercase tracking-wider flex items-center gap-1 ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}>
          <Sun size={12} className="text-amber-500 shrink-0" /> Active Prosumers
        </p>
      </div>

      <div className={`pl-3 border-l ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
        <p className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${
          theme === "dark" ? "text-emerald-400" : "text-emerald-600"
        }`}>
          {stats.totalTradesSettled.toLocaleString()}
        </p>
        <p className={`text-[10px] sm:text-[11px] font-bold mt-0.5 uppercase tracking-wider flex items-center gap-1 ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}>
          <TrendingUp size={12} className="text-emerald-500 shrink-0" /> Trades Settled
        </p>
      </div>

      <div className={`pl-3 border-l ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
        <p className={`text-xl sm:text-2xl font-black font-mono tracking-tight ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}>
          {stats.totalKwhTraded.toLocaleString()} <span className="text-xs font-sans text-emerald-500 font-bold">kWh</span>
        </p>
        <p className={`text-[10px] sm:text-[11px] font-bold mt-0.5 uppercase tracking-wider flex items-center gap-1 ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}>
          <Activity size={12} className="text-teal-500 shrink-0" /> Clean Energy
        </p>
      </div>
    </div>
  );
}
