import React from "react";
import { Sun, Zap } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function CalculatorProsumerInputs({ systemCapacity, setSystemCapacity, surplusExport, setSurplusExport }) {
  const { theme } = useTheme();

  return (
    <div className="space-y-3">
      {/* System Capacity Slider */}
      <div className={`p-3.5 rounded-2xl border transition ${
        theme === "dark" ? "bg-slate-900/80 border-slate-800" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="flex items-center justify-between">
          <label className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
            <Sun size={15} className="text-amber-400" /> Rooftop Solar Capacity
          </label>
          <span className="text-xs sm:text-sm font-extrabold font-mono text-amber-400 bg-amber-500/10 px-2.5 py-0.5 rounded-lg border border-amber-500/20">
            {systemCapacity} kW System
          </span>
        </div>

        <input
          type="range"
          min="1"
          max="25"
          step="0.5"
          value={systemCapacity}
          onChange={(e) => setSystemCapacity(Number(e.target.value))}
          className="w-full mt-3 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-amber-400"
        />

        <div className="mt-2 flex justify-between text-xs text-slate-400 font-medium">
          <span>1 kW (Home)</span>
          <span>12.5 kW</span>
          <span>25 kW (Commercial)</span>
        </div>
      </div>

      {/* Monthly Surplus Slider */}
      <div className={`p-3.5 rounded-2xl border transition ${
        theme === "dark" ? "bg-slate-900/80 border-slate-800" : "bg-slate-50 border-slate-200"
      }`}>
        <div className="flex items-center justify-between">
          <label className={`text-xs sm:text-sm font-bold flex items-center gap-1.5 ${theme === "dark" ? "text-slate-200" : "text-slate-800"}`}>
            <Zap size={15} className="text-emerald-400" /> Monthly Surplus Units Exported
          </label>
          <span className="text-xs sm:text-sm font-extrabold font-mono text-emerald-400 bg-emerald-500/10 px-2.5 py-0.5 rounded-lg border border-emerald-500/20">
            {surplusExport} kWh / mo
          </span>
        </div>

        <input
          type="range"
          min="50"
          max="2500"
          step="50"
          value={surplusExport}
          onChange={(e) => setSurplusExport(Number(e.target.value))}
          className="w-full mt-3 h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer accent-emerald-400"
        />

        <div className="mt-2 flex justify-between text-xs text-slate-400 font-medium">
          <span>50 kWh</span>
          <span>1250 kWh</span>
          <span>2500 kWh</span>
        </div>
      </div>
    </div>
  );
}
