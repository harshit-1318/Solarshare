import React from "react";
import { Zap } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeroMockupHeaderBar() {
  const { theme } = useTheme();

  return (
    <div className={`p-3 border-b flex items-center justify-between gap-3 text-xs rounded-t-2xl transition-colors ${
      theme === "dark" ? "border-slate-800 bg-slate-950/80" : "border-slate-200/90 bg-slate-50/90"
    }`}>
      {/* Left Node Info */}
      <div className="flex items-center gap-2.5 min-w-0">
        <div className={`h-8 w-8 shrink-0 rounded-xl border flex items-center justify-center font-bold shadow-sm ${
          theme === "dark"
            ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400"
            : "bg-emerald-100 border-emerald-300 text-emerald-700"
        }`}>
          <Zap size={15} className="text-amber-500 animate-pulse shrink-0" />
        </div>
        <div className="min-w-0">
          <h4 className={`font-bold font-heading text-xs sm:text-sm whitespace-nowrap truncate leading-tight ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}>
            BESCOM Smart Substation Hub
          </h4>
          <p className={`text-[10px] font-mono whitespace-nowrap truncate mt-0.5 ${
            theme === "dark" ? "text-slate-400" : "text-slate-500"
          }`}>
            Discom Grid Node #KA-8802
          </p>
        </div>
      </div>

      {/* Right Live Status Badge */}
      <div className="shrink-0">
        <span className={`inline-flex items-center gap-1.5 text-[10px] font-mono font-bold whitespace-nowrap px-2.5 py-1 rounded-full border shadow-sm ${
          theme === "dark"
            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/25"
            : "text-emerald-800 bg-emerald-100/90 border-emerald-300"
        }`}>
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          Synchronized
        </span>
      </div>
    </div>
  );
}
