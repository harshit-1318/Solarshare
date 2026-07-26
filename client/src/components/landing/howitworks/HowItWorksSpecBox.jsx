import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ChevronRight, Sparkles } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HowItWorksSpecBox({ currentStep, onNextStep }) {
  const { theme } = useTheme();

  return (
    <div
      onClick={onNextStep}
      className={`group cursor-pointer rounded-2xl p-3 sm:p-3.5 border shadow-xl relative overflow-hidden backdrop-blur-xl transition-all duration-300 ${
        theme === "dark"
          ? "bg-slate-800/90 border-slate-700 hover:border-emerald-500/60 text-white"
          : "bg-white border-slate-200 hover:border-emerald-500/60 text-slate-900 shadow-slate-200/60"
      }`}
    >
      {/* Top Header line */}
      <div className={`flex items-center justify-between pb-2 border-b ${
        theme === "dark" ? "border-slate-700/60" : "border-slate-200"
      }`}>
        <span className="text-[10px] sm:text-xs font-bold uppercase tracking-wider text-emerald-500 flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Step {currentStep.step} Interactive Specs
        </span>
        <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full border ${
          theme === "dark" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-emerald-100 border-emerald-200 text-emerald-800"
        }`}>
          {currentStep.badge}
        </span>
      </div>

      {/* Main Body */}
      <div className="py-2.5 space-y-2.5">
        <div className="flex items-center justify-between">
          <div className={`h-9 w-9 rounded-lg border flex items-center justify-center shadow-sm ${
            theme === "dark" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-emerald-100 border-emerald-200 text-emerald-700"
          }`}>
            {React.createElement(currentStep.icon, { size: 18 })}
          </div>
          <span className="text-[10px] font-bold text-slate-400 group-hover:text-emerald-500 transition flex items-center gap-1">
            Click next step <ChevronRight size={13} className="group-hover:translate-x-1 transition-transform" />
          </span>
        </div>

        <div>
          <h4 className={`font-heading text-sm sm:text-base font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            {currentStep.title}
          </h4>
          <p className={`mt-0.5 text-xs leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
            {currentStep.desc}
          </p>
        </div>

        {/* Dynamic Specs List */}
        <div className={`rounded-xl p-2.5 border space-y-1.5 text-xs transition-colors ${
          theme === "dark" ? "bg-slate-900/90 border-slate-700/80" : "bg-slate-50 border-slate-200"
        }`}>
          {currentStep.specs?.map((item, idx) => (
            <div key={idx} className="flex justify-between items-center gap-2">
              <span className={theme === "dark" ? "text-slate-400" : "text-slate-600 font-medium"}>
                {item.label}:
              </span>
              <span className={`font-mono font-bold text-right ${
                item.highlight
                  ? "text-emerald-500"
                  : theme === "dark" ? "text-slate-200" : "text-slate-900"
              }`}>
                {item.value}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Footer CTA */}
      <div className={`pt-2 border-t flex items-center justify-between ${
        theme === "dark" ? "border-slate-700/60" : "border-slate-200"
      }`}>
        <span className={`text-[11px] font-semibold flex items-center gap-1 ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
          <Sparkles size={12} className="text-emerald-500" /> Automated Protocol
        </span>
        <Link
          to="/register"
          onClick={(e) => e.stopPropagation()}
          className="inline-flex items-center gap-1 bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold px-3.5 py-1.5 rounded-lg transition shadow-md shadow-emerald-500/20"
        >
          Start Now <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
