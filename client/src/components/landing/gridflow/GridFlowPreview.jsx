import React from "react";
import { Activity } from "lucide-react";
import GridFlowDiagramNodes from "./GridFlowDiagramNodes.jsx";
import GridFlowLiveTicker from "./GridFlowLiveTicker.jsx";
import { useGridFlowData } from "./useGridFlowData.js";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function GridFlowPreview() {
  const { tradeCount, activeTrade, fade, loading } = useGridFlowData();
  const { theme } = useTheme();

  return (
    <section id="grid-flow" className={`py-6 sm:py-8 min-h-[calc(100vh-73px)] flex flex-col justify-center relative overflow-hidden border-b scroll-mt-[72px] transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-900 border-slate-200"
    }`}>
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="text-center max-w-3xl mx-auto">
          <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest mb-1.5 transition-colors ${
            theme === "dark" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-emerald-100/90 border-emerald-200/90 text-emerald-800"
          }`}>
            <Activity size={13} className="animate-spin-slow" /> Live Smart Grid Architecture
          </div>
          
          <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
            theme === "dark" ? "text-white" : "text-slate-900"
          }`}>
            Peer-to-Peer <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">Energy Network</span>
          </h2>
          
          <p className={`mt-1 text-xs sm:text-sm lg:text-base max-w-xl mx-auto leading-normal ${
            theme === "dark" ? "text-slate-300" : "text-slate-600"
          }`}>
            How excess clean solar power travels dynamically from rooftop solar panels to local neighbors with zero middleman markup.
          </p>
        </div>

        <GridFlowLiveTicker
          tradeCount={tradeCount}
          activeTrade={activeTrade}
          fade={fade}
          loading={loading}
        />

        <GridFlowDiagramNodes />
      </div>
    </section>
  );
}
