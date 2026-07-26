import React from "react";
import { Sun, MapPin } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function GridFlowLiveTicker({ tradeCount, activeTrade, fade, loading }) {
  const { theme } = useTheme();

  return (
    <div className={`mt-2.5 mx-auto max-w-4xl border backdrop-blur-lg rounded-xl p-2.5 sm:p-3 shadow-lg flex items-center justify-between gap-3 overflow-hidden transition-colors ${
      theme === "dark" ? "bg-slate-800/80 border-slate-700/80" : "bg-slate-50 border-slate-200/90"
    }`}>
      <div className="flex items-center gap-2.5 shrink-0">
        <span className="relative flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
        </span>
        <span className="text-xs sm:text-sm font-extrabold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
          Live P2P Stream <span className={`text-xs font-mono font-bold ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>#{tradeCount}</span>
        </span>
      </div>

      {activeTrade ? (
        <div className={`flex items-center gap-3 sm:gap-4 text-xs sm:text-sm font-semibold truncate transition-opacity duration-200 ${
          theme === "dark" ? "text-slate-200" : "text-slate-800"
        } ${fade ? "opacity-20" : "opacity-100"}`}>
          <span className={`font-extrabold flex items-center gap-1.5 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            <Sun size={15} className="text-amber-500 shrink-0" /> {activeTrade.sellerName || activeTrade.seller}
          </span>
          <span className="text-slate-400">➔</span>
          <span className="text-emerald-500 font-extrabold font-mono">
            {activeTrade.energyAmountKwh || activeTrade.amount} kWh @ ₹{activeTrade.pricePerKwh || activeTrade.rate}/unit
          </span>
          <span className="text-slate-400">➔</span>
          <span className={`font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{activeTrade.buyerName || activeTrade.buyer}</span>
          <span className={`text-xs px-2.5 py-0.5 rounded-full flex items-center gap-1 border font-medium ${
            theme === "dark" ? "text-slate-300 bg-slate-700/60 border-slate-600" : "text-slate-700 bg-white border-slate-300 shadow-sm"
          }`}>
            <MapPin size={11} className="text-emerald-500 shrink-0" /> {activeTrade.location || "India"}
          </span>
        </div>
      ) : (
        <div className={`text-xs sm:text-sm font-semibold ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
          {loading ? "Synchronizing smart meter stream..." : "Awaiting live P2P community trade..."}
        </div>
      )}
    </div>
  );
}
