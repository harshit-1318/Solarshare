import React from "react";
import { RefreshCw, Sun, Zap } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HowItWorksHeader({ activeTab, setActiveTab, setSelectedStepIndex }) {
  const { theme } = useTheme();

  return (
    <div className="text-center max-w-3xl mx-auto mb-2 lg:mb-3">
      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-semibold uppercase tracking-widest mb-1 transition-colors ${
        theme === "dark" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-emerald-100/90 border-emerald-200/90 text-emerald-800"
      }`}>
        <RefreshCw size={12} className="animate-spin-slow" /> Seamless 4-Step Process
      </div>

      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}>
        How <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">SolarShare Works</span>
      </h2>

      <p className={`mt-0.5 text-xs sm:text-sm max-w-xl mx-auto leading-normal ${
        theme === "dark" ? "text-slate-300" : "text-slate-600"
      }`}>
        Whether you generate solar power on your roof or want to buy clean energy for your home, getting started takes under 3 minutes.
      </p>

      {/* Role Switcher Tabs */}
      <div className={`mt-2 inline-flex p-1 rounded-xl border backdrop-blur-md transition-colors shadow-sm ${
        theme === "dark" ? "bg-slate-800/90 border-slate-700" : "bg-slate-100 border-slate-200"
      }`}>
        <button
          onClick={() => { setActiveTab("prosumer"); setSelectedStepIndex(0); }}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 ${
            activeTab === "prosumer"
              ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
              : theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Sun size={14} /> I Own Solar Panels (Prosumer)
        </button>

        <button
          onClick={() => { setActiveTab("consumer"); setSelectedStepIndex(0); }}
          className={`flex items-center gap-1.5 px-4 sm:px-5 py-1.5 rounded-lg text-xs font-extrabold transition-all duration-200 ${
            activeTab === "consumer"
              ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20"
              : theme === "dark" ? "text-slate-400 hover:text-white" : "text-slate-600 hover:text-slate-900"
          }`}
        >
          <Zap size={14} /> I Want Energy Savings (Consumer)
        </button>
      </div>
    </div>
  );
}
