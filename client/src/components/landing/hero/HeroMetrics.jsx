import React from "react";
import { Sun, TrendingUp, Activity } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeroMetrics({ stats }) {
  const { theme } = useTheme();

  return (
    <div className={`pt-3 mt-1.5 border-t grid grid-cols-3 gap-1.5 sm:gap-3 max-w-lg ${
      theme === "dark" ? "border-slate-800/80" : "border-slate-200"
    }`}>
      <div>
        <p className={`text-base sm:text-2xl font-black font-mono tracking-tight ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}>
          {stats.totalProsumers.toLocaleString()}
        </p>
        <p className={`text-[10px] sm:text-[11px] font-bold mt-0.5 uppercase tracking-wider flex items-center gap-1 ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}>
          <Sun size={11} className="text-amber-500 shrink-0" />
          <span>
            <span className="sm:hidden">Prosumers</span>
            <span className="hidden sm:inline">Active Prosumers</span>
          </span>
        </p>
      </div>

      <div className={`pl-1.5 sm:pl-3 border-l ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
        <p className={`text-base sm:text-2xl font-black font-mono tracking-tight ${
          theme === "dark" ? "text-emerald-400" : "text-emerald-600"
        }`}>
          {stats.totalTradesSettled.toLocaleString()}
        </p>
        <p className={`text-[10px] sm:text-[11px] font-bold mt-0.5 uppercase tracking-wider flex items-center gap-1 ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}>
          <TrendingUp size={11} className="text-emerald-500 shrink-0" />
          <span>
            <span className="sm:hidden">Trades</span>
            <span className="hidden sm:inline">Trades Settled</span>
          </span>
        </p>
      </div>

      <div className={`pl-1.5 sm:pl-3 border-l ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
        <p className={`text-base sm:text-2xl font-black font-mono tracking-tight ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}>
          {stats.totalKwhTraded.toLocaleString()} <span className="text-[9px] sm:text-xs font-sans text-emerald-500 font-bold">kWh</span>
        </p>
        <p className={`text-[10px] sm:text-[11px] font-bold mt-0.5 uppercase tracking-wider flex items-center gap-1 ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}>
          <Activity size={11} className="text-teal-500 shrink-0" />
          <span>
            <span className="sm:hidden">Energy</span>
            <span className="hidden sm:inline">Clean Energy</span>
          </span>
        </p>
      </div>
    </div>
  );
}
