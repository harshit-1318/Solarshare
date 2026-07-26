import React from "react";
import { Zap, X } from "lucide-react";
import { useToastLiveTrades } from "./useToastLiveTrades.js";

export default function ToastLiveTrade() {
  const { currentTrade, visible, setVisible, animating } = useToastLiveTrades();

  if (!visible || !currentTrade) return null;

  return (
    <div className="fixed bottom-6 left-6 z-50 max-w-sm w-[calc(100vw-3rem)] sm:w-auto transition-all duration-300">
      <div
        className={`bg-slate-900/95 border border-emerald-500/50 backdrop-blur-xl rounded-2xl p-4 shadow-2xl shadow-emerald-950/60 text-white flex items-center gap-3 transition-opacity duration-300 ${
          animating ? "opacity-30 scale-95" : "opacity-100 scale-100 animate-in fade-in slide-in-from-bottom-3"
        }`}
      >
        <div className="h-10 w-10 rounded-xl bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center shrink-0 text-emerald-400">
          <Zap size={20} className="animate-pulse text-amber-300" />
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between gap-2">
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 flex items-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping inline-block" /> Live P2P Trade Settled
            </span>
            <span className="text-[10px] text-slate-400 font-mono">{currentTrade.time}</span>
          </div>

          <p className="text-xs font-semibold text-slate-200 mt-0.5 truncate">
            <span className="text-white font-bold">{currentTrade.seller}</span> ({currentTrade.city}) ➔{" "}
            <span className="text-emerald-400 font-mono font-bold">{currentTrade.amount}</span> ({currentTrade.revenue})
          </p>

          <p className="text-[11px] text-slate-400 truncate flex items-center gap-1">
            <span>Bought by <strong className="text-slate-300">{currentTrade.buyer}</strong></span>
            <span className="text-slate-600">•</span>
            <span className="text-emerald-400/90 font-medium">UPI Direct Settled</span>
          </p>
        </div>

        <button
          onClick={() => setVisible(false)}
          className="text-slate-400 hover:text-white p-1 rounded-lg hover:bg-slate-800 transition"
          title="Dismiss notification"
        >
          <X size={14} />
        </button>
      </div>
    </div>
  );
}
