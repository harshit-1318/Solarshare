import React from "react";
import { Activity, TrendingUp } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeroMockupTabSwitcher({ activeTab, setActiveTab }) {
  const { theme } = useTheme();

  return (
    <div className={`flex items-center gap-1.5 p-1 rounded-xl text-[11px] font-bold border transition ${
      theme === "dark" ? "bg-slate-950/70 border-slate-800" : "bg-slate-100 border-slate-200"
    }`}>
      <button
        onClick={() => setActiveTab("live")}
        className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
          activeTab === "live"
            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold"
            : theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <Activity size={13} /> Live Power Curve
      </button>

      <button
        onClick={() => setActiveTab("revenue")}
        className={`flex-1 py-1.5 px-3 rounded-lg transition-all flex items-center justify-center gap-1.5 ${
          activeTab === "revenue"
            ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 font-bold"
            : theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
        }`}
      >
        <TrendingUp size={13} /> Revenue Advantage
      </button>
    </div>
  );
}
