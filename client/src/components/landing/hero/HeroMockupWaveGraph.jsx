import React from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeroMockupWaveGraph({ peakPowerKw }) {
  const { theme } = useTheme();

  return (
    <div className={`border rounded-2xl p-3 relative overflow-hidden transition-colors ${
      theme === "dark"
        ? "bg-slate-950/90 border-slate-800/80"
        : "bg-slate-900 border-slate-800 text-white shadow-md"
    }`}>
      <div className="flex items-center justify-between text-xs mb-1.5">
        <span className="font-bold text-slate-200 flex items-center gap-1.5 text-[11px]">
          <span className="h-2 w-2 rounded-full bg-amber-400 animate-ping inline-block" /> Live Generation vs P2P Demand
        </span>
        <span className="font-mono text-emerald-400 text-[10px] sm:text-[11px] bg-emerald-500/15 px-2 py-0.5 rounded border border-emerald-500/30 font-bold">
          Peak {peakPowerKw > 0 ? peakPowerKw.toFixed(1) : "0.0"} kW
        </span>
      </div>

      <div className="h-24 w-full relative flex items-end justify-between gap-1 pt-3 px-1">
        <svg className="absolute inset-0 h-full w-full overflow-visible" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <linearGradient id="solarGlow" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#10b981" stopOpacity="0.4" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.0" />
            </linearGradient>
          </defs>
          <path
            d="M 0,80 Q 25,20 50,40 T 100,70 L 100,100 L 0,100 Z"
            fill="url(#solarGlow)"
          />
          <path
            d="M 0,80 Q 25,20 50,40 T 100,70"
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            className="animate-pulse"
          />
        </svg>

        <div className="w-full flex items-end justify-between z-10 opacity-75">
          <div className="h-6 w-2 bg-emerald-500/40 rounded-t" />
          <div className="h-12 w-2 bg-emerald-500/50 rounded-t" />
          <div className="h-16 w-2 bg-emerald-500/80 rounded-t" />
          <div className="h-20 w-2 bg-emerald-400 rounded-t" />
          <div className="h-14 w-2 bg-emerald-500/70 rounded-t" />
          <div className="h-8 w-2 bg-emerald-500/40 rounded-t" />
        </div>
      </div>

      <div className="flex justify-between text-[9px] font-mono text-slate-400 pt-1.5 border-t border-slate-800/80 mt-1">
        <span>06:00 (Sunrise)</span>
        <span className="text-emerald-400 font-bold">12:30 (Peak Surplus)</span>
        <span>18:00 (Sunset)</span>
      </div>
    </div>
  );
}
