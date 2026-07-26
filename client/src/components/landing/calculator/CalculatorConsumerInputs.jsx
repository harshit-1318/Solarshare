import React from "react";
import { Zap, HelpCircle } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function CalculatorConsumerInputs({ consumerUsage, setConsumerUsage }) {
  const { theme } = useTheme();

  return (
    <div className={`p-3.5 rounded-2xl border transition ${
      theme === "dark" ? "bg-slate-900/80 border-slate-800" : "bg-slate-50 border-slate-200"
    }`}>
      <div className="flex items-center justify-between">
        <label className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
          <Zap size={15} className="text-teal-400" /> Monthly Electricity Consumption
        </label>
        <span className="text-xs sm:text-sm font-extrabold font-mono text-teal-400 bg-teal-500/10 px-2.5 py-0.5 rounded-lg border border-teal-500/20">
          {consumerUsage} kWh / mo
        </span>
      </div>

      <input
        type="range"
        min="100"
        max="1500"
        step="25"
        value={consumerUsage}
        onChange={(e) => setConsumerUsage(Number(e.target.value))}
        className="w-full mt-3 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-teal-400"
      />

      <div className="mt-2 flex justify-between text-xs text-slate-400 font-medium">
        <span>100 kWh (Apartment)</span>
        <span>750 kWh</span>
        <span>1500 kWh (Villa / EV)</span>
      </div>

      <div className={`mt-3 p-3 rounded-xl border text-xs flex items-center justify-between ${
        theme === "dark" ? "bg-slate-950 border-slate-800 text-slate-300" : "bg-white border-slate-200 text-slate-700"
      }`}>
        <span className="text-slate-400 flex items-center gap-1.5 font-medium">
          <HelpCircle size={13} /> Standard DISCOM Slab Rate:
        </span>
        <span className="font-mono font-extrabold text-emerald-400">₹8.50 / unit</span>
      </div>
    </div>
  );
}
