import React from "react";
import { Zap, Shield, TrendingUp, Cpu } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeroMockupMetricsGrid({ settledAmount, nodeStats }) {
  const { theme } = useTheme();

  return (
    <div className="grid grid-cols-2 gap-2.5">
      {/* Live P2P Rate */}
      <div className={`p-3.5 rounded-xl border transition ${
        theme === "dark" ? "bg-slate-950/80 border-slate-800" : "bg-slate-50 border-slate-200/90 shadow-sm"
      }`}>
        <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
          theme === "dark" ? "text-slate-400" : "text-slate-600"
        }`}>
          <Zap size={13} className="text-amber-500 shrink-0" />
          <span>Live P2P Rate</span>
        </div>
        <div className={`font-mono text-base sm:text-lg font-extrabold mt-1 ${
          theme === "dark" ? "text-emerald-400" : "text-emerald-600"
        }`}>
          ₹5.50 / kWh
        </div>
        <div className={`text-[10px] font-medium mt-0.5 ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}>
          vs Grid Buyback ₹2.80
        </div>
      </div>

      {/* Total Settlements */}
      <div className={`p-3.5 rounded-xl border transition ${
        theme === "dark" ? "bg-slate-950/80 border-slate-800" : "bg-slate-50 border-slate-200/90 shadow-sm"
      }`}>
        <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
          theme === "dark" ? "text-slate-400" : "text-slate-600"
        }`}>
          <TrendingUp size={13} className="text-emerald-500 shrink-0" />
          <span>Total Settled</span>
        </div>
        <div className={`font-mono text-base sm:text-lg font-extrabold mt-1 ${
          theme === "dark" ? "text-white" : "text-slate-900"
        }`}>
          ₹{settledAmount ? settledAmount.toLocaleString("en-IN") : "0"}
        </div>
        <div className={`text-[10px] font-bold mt-0.5 ${
          theme === "dark" ? "text-emerald-400" : "text-emerald-600"
        }`}>
          Real Database Trades
        </div>
      </div>

      {/* DISCOM Nodes */}
      <div className={`p-3.5 rounded-xl border transition ${
        theme === "dark" ? "bg-slate-950/80 border-slate-800" : "bg-slate-50 border-slate-200/90 shadow-sm"
      }`}>
        <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
          theme === "dark" ? "text-slate-400" : "text-slate-600"
        }`}>
          <Cpu size={13} className="text-cyan-500 shrink-0" />
          <span>Active Nodes</span>
        </div>
        <div className={`font-mono text-sm sm:text-base font-bold mt-1 ${
          theme === "dark" ? "text-slate-200" : "text-slate-900"
        }`}>
          {(nodeStats?.totalProsumers || 0) + (nodeStats?.totalConsumers || 0)} Units
        </div>
        <div className={`text-[10px] font-medium mt-0.5 ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}>
          Smart Meter Synced
        </div>
      </div>

      {/* Ledger Security */}
      <div className={`p-3.5 rounded-xl border transition ${
        theme === "dark" ? "bg-slate-950/80 border-slate-800" : "bg-slate-50 border-slate-200/90 shadow-sm"
      }`}>
        <div className={`flex items-center gap-1.5 text-[11px] font-semibold ${
          theme === "dark" ? "text-slate-400" : "text-slate-600"
        }`}>
          <Shield size={13} className="text-indigo-500 shrink-0" />
          <span>Ledger Security</span>
        </div>
        <div className={`font-mono text-sm sm:text-base font-bold mt-1 ${
          theme === "dark" ? "text-slate-200" : "text-slate-900"
        }`}>
          256-bit AES
        </div>
        <div className={`text-[10px] font-medium mt-0.5 ${
          theme === "dark" ? "text-slate-400" : "text-slate-500"
        }`}>
          CERC Compliant
        </div>
      </div>
    </div>
  );
}

