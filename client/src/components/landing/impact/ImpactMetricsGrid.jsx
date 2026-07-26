import React, { useState } from "react";
import { TrendingUp, ShieldCheck, Info } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { getImpactMetrics } from "./impactMetricsData.js";

export default function ImpactMetricsGrid({ currentStats }) {
  const [activeTooltip, setActiveTooltip] = useState(null);
  const { theme } = useTheme();

  const metrics = getImpactMetrics(currentStats);

  return (
    <div className="space-y-2">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5">
        {metrics.map((m) => {
          const Icon = m.icon;
          const isHighlight = m.highlightCard;

          return (
            <div
              key={m.id}
              onClick={() => setActiveTooltip(activeTooltip === m.id ? null : m.id)}
              className={`cursor-pointer rounded-2xl p-4 sm:p-4.5 shadow-lg transition-all duration-300 flex flex-col justify-between relative overflow-hidden group border ${
                isHighlight
                  ? "bg-emerald-600 text-white border-emerald-500 shadow-emerald-600/25 hover:bg-emerald-700"
                  : theme === "dark"
                  ? "bg-slate-900 text-white border-slate-800 hover:border-slate-700 shadow-slate-950/40"
                  : "bg-white text-slate-900 border-slate-200 hover:border-slate-300 shadow-slate-200/60"
              }`}
            >
              <div className="absolute top-0 right-0 p-3 opacity-10 group-hover:scale-110 transition duration-300 pointer-events-none">
                <Icon size={72} className={isHighlight ? "text-white" : "text-emerald-500"} />
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <span className={`text-xs font-extrabold uppercase tracking-widest ${
                    isHighlight ? "text-emerald-100" : theme === "dark" ? "text-emerald-400" : "text-emerald-700"
                  }`}>
                    {m.title}
                  </span>
                  <Info size={14} className={isHighlight ? "text-emerald-200 opacity-80" : "text-slate-400 opacity-80"} />
                </div>

                <h3 className={`mt-2 text-3xl sm:text-4xl lg:text-5xl font-black font-mono flex items-baseline gap-1.5 ${
                  isHighlight ? "text-white" : theme === "dark" ? "text-white" : "text-slate-900"
                }`}>
                  {m.value}
                  {m.unit && (
                    <span className={`text-sm sm:text-base font-sans font-extrabold ${
                      isHighlight ? "text-emerald-200" : theme === "dark" ? "text-slate-400" : "text-slate-500"
                    }`}>
                      {m.unit}
                    </span>
                  )}
                </h3>

                <p className={`mt-1 text-xs sm:text-sm font-bold ${
                  isHighlight ? "text-emerald-100" : theme === "dark" ? "text-slate-300" : "text-slate-600"
                }`}>
                  {m.subtext}
                </p>
              </div>

              <div className={`mt-2.5 pt-2 border-t ${
                isHighlight ? "border-emerald-500/50" : theme === "dark" ? "border-slate-800/80" : "border-slate-100"
              }`}>
                <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-xs font-extrabold border ${m.badgeColor}`}>
                  <TrendingUp size={12} /> {m.badge}
                </span>
              </div>
            </div>
          );
        })}
      </div>

      {activeTooltip && (
        <div className={`border rounded-xl p-3 text-xs sm:text-sm flex items-center justify-between gap-3 shadow-xl animate-fadeIn ${
          theme === "dark"
            ? "bg-slate-800/95 border-slate-700 text-slate-200"
            : "bg-slate-900 text-white border-slate-800"
        }`}>
          <div className="flex items-center gap-3">
            <ShieldCheck size={20} className="text-emerald-400 shrink-0" />
            <span className="leading-snug">
              <strong className="text-emerald-400 font-extrabold">{metrics.find((m) => m.id === activeTooltip)?.title}:</strong>{" "}
              {metrics.find((m) => m.id === activeTooltip)?.detail}
            </span>
          </div>
          <button
            onClick={() => setActiveTooltip(null)}
            className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs shrink-0 px-3.5 py-1.5 rounded-xl transition shadow-md"
          >
            Dismiss
          </button>
        </div>
      )}
    </div>
  );
}




