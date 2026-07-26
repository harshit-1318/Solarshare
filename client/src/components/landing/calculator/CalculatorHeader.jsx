import React from "react";
import { Calculator, Sun, Zap } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function CalculatorHeader({ role, setRole }) {
  const { theme } = useTheme();

  return (
    <div className="text-center max-w-3xl mx-auto mb-2.5 sm:mb-3">
      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest mb-1 transition-colors ${
        theme === "dark" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-emerald-100/90 border-emerald-200/90 text-emerald-800"
      }`}>
        <Calculator size={13} /> Solar Yield & ROI Calculator
      </div>
      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}>
        Calculate Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">Financial Impact</span>
      </h2>
      <p className={`mt-1 text-xs sm:text-sm max-w-xl mx-auto leading-normal ${
        theme === "dark" ? "text-slate-300" : "text-slate-600"
      }`}>
        See how much extra income rooftop solar owners earn or how much buyers save on electricity every month.
      </p>

      <div className={`mt-2.5 inline-flex p-1 rounded-xl border backdrop-blur-md shadow-inner ${
        theme === "dark" ? "bg-slate-800/90 border-slate-700/80" : "bg-slate-100 border-slate-200"
      }`}>
        <button
          onClick={() => setRole("prosumer")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
            role === "prosumer"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sun size={15} /> I Have Solar Panels (Prosumer)
        </button>
        <button
          onClick={() => setRole("consumer")}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg text-xs sm:text-sm font-bold transition-all duration-200 ${
            role === "consumer"
              ? "bg-emerald-500 text-slate-950 shadow-md"
              : theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Zap size={15} /> I Want Cheap Power (Consumer)
        </button>
      </div>
    </div>
  );
}
