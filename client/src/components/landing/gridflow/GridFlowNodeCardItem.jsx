import React from "react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function GridFlowNodeCardItem({ nodeKey, selectedNode, setSelectedNode, icon: Icon, iconBg, iconColor, badge, title, subtitle, stat1Label, stat1Value, stat2Label, stat2Value, activeBorderColor, badgeDark, badgeLight }) {
  const { theme } = useTheme();
  const isSelected = selectedNode === nodeKey;

  return (
    <div
      onClick={() => setSelectedNode(nodeKey)}
      className={`cursor-pointer rounded-2xl p-3.5 sm:p-4 text-center border transition-all duration-300 ${
        theme === "dark" ? "bg-slate-900/90 text-white" : "bg-slate-50/90 text-slate-900"
      } ${
        isSelected
          ? `${activeBorderColor} shadow-lg scale-[1.01]`
          : theme === "dark" ? "border-slate-800 hover:border-slate-700" : "border-slate-200 hover:border-slate-300"
      }`}
    >
      <div className={`mx-auto h-10 w-10 rounded-xl ${iconBg} border flex items-center justify-center ${iconColor} mb-2 shadow-sm`}>
        <Icon size={20} />
      </div>

      <span className={`text-[10px] sm:text-[11px] font-extrabold uppercase tracking-wider px-2.5 py-0.5 rounded-full border ${
        theme === "dark" ? badgeDark : badgeLight
      }`}>
        {badge}
      </span>

      <h4 className={`font-bold text-base sm:text-lg mt-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{title}</h4>
      <p className={`text-xs sm:text-sm mt-0.5 font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>{subtitle}</p>

      <div className={`mt-3 pt-2.5 border-t space-y-1.5 text-left text-xs sm:text-sm ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
        <div className="flex justify-between items-center">
          <span className={theme === "dark" ? "text-slate-400" : "text-slate-600 font-semibold"}>{stat1Label}:</span>
          <span className="font-mono font-extrabold text-emerald-500">{stat1Value}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className={theme === "dark" ? "text-slate-400" : "text-slate-600 font-semibold"}>{stat2Label}:</span>
          <span className={`font-mono font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>{stat2Value}</span>
        </div>
      </div>
    </div>
  );
}
