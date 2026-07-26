import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeroMockupRevenueView() {
  const { theme } = useTheme();

  return (
    <div className={`rounded-2xl p-4 space-y-3.5 border transition-colors ${
      theme === "dark"
        ? "bg-slate-950/90 border-emerald-500/30 text-white"
        : "bg-slate-50 border-emerald-500/30 text-slate-900 shadow-sm"
    }`}>
      <div className="flex items-center justify-between gap-2">
        <h5 className={`font-bold text-xs ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Monthly Revenue Multiplier Comparison
        </h5>
        <span className={`text-[10px] font-mono font-bold px-2 py-0.5 rounded border ${
          theme === "dark"
            ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
            : "text-emerald-700 bg-emerald-100 border-emerald-300"
        }`}>
          500 kWh Surplus
        </span>
      </div>

      <div className="space-y-3 text-xs font-semibold">
        <div>
          <div className={`flex justify-between mb-1 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            <span>Traditional DISCOM Net-Metering</span>
            <span className={`font-mono ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>₹1,400 / mo</span>
          </div>
          <div className={`w-full rounded-full h-2.5 ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}>
            <div className="bg-slate-400 h-2.5 rounded-full w-[35%]" />
          </div>
        </div>

        <div>
          <div className={`flex justify-between mb-1 ${theme === "dark" ? "text-emerald-400" : "text-emerald-600"}`}>
            <span className="flex items-center gap-1 font-bold">
              <CheckCircle2 size={14} /> SolarShare P2P Protocol
            </span>
            <span className="font-mono font-bold">₹2,750 / mo (+96%)</span>
          </div>
          <div className={`w-full rounded-full h-2.5 ${theme === "dark" ? "bg-slate-800" : "bg-slate-200"}`}>
            <div className="bg-emerald-500 h-2.5 rounded-full w-[96%] animate-pulse" />
          </div>
        </div>
      </div>
    </div>
  );
}
