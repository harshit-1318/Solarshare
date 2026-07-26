import React from "react";
import { CheckCircle } from "lucide-react";

export default function FeaturesSpecsModal({ activeModalFeature, setActiveModalFeature }) {
  if (!activeModalFeature) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/80 backdrop-blur-sm p-4">
      <div className="bg-slate-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-800 animate-in fade-in zoom-in duration-200 text-white">
        <div className="flex items-center justify-between pb-4 border-b border-slate-800">
          <div className="flex items-center gap-3">
            <div className={`p-2.5 rounded-xl ${activeModalFeature.iconBg}`}>
              {React.createElement(activeModalFeature.icon, { size: 20 })}
            </div>
            <h4 className="font-heading text-lg font-bold text-white">{activeModalFeature.title}</h4>
          </div>
          <button
            onClick={() => setActiveModalFeature(null)}
            className="text-slate-400 hover:text-white text-sm font-bold p-1"
          >
            ✕
          </button>
        </div>

        <div className="py-4 space-y-3 text-xs text-slate-300">
          <p className="text-sm font-normal text-slate-300">{activeModalFeature.desc}</p>
          
          <div className="bg-slate-800/80 rounded-2xl p-4 space-y-2 border border-slate-700/60">
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <CheckCircle size={14} className="text-emerald-400" /> API Latency: &lt; 250ms
            </div>
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <CheckCircle size={14} className="text-emerald-400" /> Regulatory Compliance: CERC P2P Guidelines
            </div>
            <div className="flex items-center gap-2 text-slate-200 font-semibold">
              <CheckCircle size={14} className="text-emerald-400" /> Discom Compatibility: 100% Net-Meter Ready
            </div>
          </div>
        </div>

        <div className="pt-4 flex justify-end">
          <button
            onClick={() => setActiveModalFeature(null)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-5 py-2.5 rounded-xl transition shadow-md shadow-emerald-500/20"
          >
            Close Specs
          </button>
        </div>
      </div>
    </div>
  );
}
