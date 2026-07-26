import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Sun, Info, ArrowRight } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import GridFlowNodeCards from "./GridFlowNodeCards.jsx";

export default function GridFlowDiagramNodes() {
  const [selectedNode, setSelectedNode] = useState("nodeA");
  const { theme } = useTheme();

  return (
    <div className={`mt-2.5 relative rounded-2xl border p-3 sm:p-4 shadow-xl overflow-hidden backdrop-blur-xl transition-colors duration-300 ${
      theme === "dark"
        ? "bg-slate-950/90 border-slate-800 text-white"
        : "bg-white border-slate-200 text-slate-900 shadow-slate-200/60"
    }`}>
      <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
        <Sun size={170} className="text-emerald-500" />
      </div>

      <div className="text-center mb-2.5">
        <span className={`text-[10px] sm:text-xs font-mono font-bold uppercase tracking-widest px-3 py-0.5 rounded-full border ${
          theme === "dark" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-emerald-100 border-emerald-200 text-emerald-800"
        }`}>
          Smart Meter Interconnection Protocol
        </span>
        <h3 className={`text-base sm:text-xl font-extrabold font-heading mt-1 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Bi-Directional P2P Power Flow Architecture
        </h3>
        <p className={`text-xs sm:text-sm mt-0.5 max-w-xl mx-auto ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
          Peer nodes synchronize via DISCOM smart meter telemetry APIs to verify bi-directional current flow in real time.
        </p>
      </div>

      <GridFlowNodeCards selectedNode={selectedNode} setSelectedNode={setSelectedNode} />

      <div className={`mt-2.5 pt-2 border-t flex flex-col sm:flex-row items-center justify-between gap-2 text-xs font-semibold ${
        theme === "dark" ? "border-slate-800/80 text-slate-400" : "border-slate-200 text-slate-600"
      }`}>
        <div className="flex items-center gap-1.5">
          <Info size={14} className="text-emerald-500 shrink-0" />
          <span>Click any node to inspect telemetry specs.</span>
        </div>
        <div className="flex items-center gap-3">
          <span className={`font-mono font-bold px-2.5 py-0.5 rounded-full border text-xs ${
            theme === "dark" ? "text-emerald-400 bg-emerald-500/10 border-emerald-500/20" : "text-emerald-800 bg-emerald-100 border-emerald-200"
          }`}>
            Loss Rate: 0.00%
          </span>
          <Link to="/marketplace" className="text-emerald-500 font-extrabold hover:underline inline-flex items-center gap-1 text-xs sm:text-sm">
            Join Trading <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </div>
  );
}
