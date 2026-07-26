import React from "react";
import { CheckCircle2 } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HowItWorksStepList({ steps, selectedStepIndex, setSelectedStepIndex }) {
  const { theme } = useTheme();

  return (
    <div className="lg:col-span-7 space-y-2">
      {steps.map((item, idx) => {
        const isSelected = selectedStepIndex === idx;
        const StepIcon = item.icon;
        return (
          <div
            key={item.step}
            onClick={() => setSelectedStepIndex(idx)}
            className={`cursor-pointer rounded-xl p-2.5 sm:p-3 border transition-all duration-300 ${
              isSelected
                ? theme === "dark"
                  ? "bg-slate-800/90 border-emerald-500/80 shadow-md shadow-emerald-500/10"
                  : "bg-emerald-50/80 border-emerald-500/80 shadow-md text-slate-900"
                : theme === "dark"
                ? "bg-slate-800/40 border-slate-700/50 hover:bg-slate-800/70"
                : "bg-white border-slate-200 hover:bg-slate-50 text-slate-800 shadow-sm"
            }`}
          >
            <div className="flex items-start gap-2.5 sm:gap-3">
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-lg font-mono text-xs font-black ${
                isSelected
                  ? "bg-emerald-500 text-slate-950 shadow-sm"
                  : theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
              }`}>
                {item.step}
              </span>

              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className={`font-heading text-xs sm:text-sm font-bold ${
                    isSelected
                      ? theme === "dark" ? "text-emerald-400" : "text-emerald-700"
                      : theme === "dark" ? "text-white" : "text-slate-900"
                  }`}>
                    {item.title}
                  </h3>
                  <StepIcon size={16} className={isSelected ? (theme === "dark" ? "text-emerald-400" : "text-emerald-600") : "text-slate-400"} />
                </div>

                <p className={`mt-0.5 text-xs leading-snug font-normal ${
                  theme === "dark" ? "text-slate-300" : "text-slate-600"
                }`}>
                  {item.desc}
                </p>

                {isSelected && (
                  <div className={`mt-1 pt-1 border-t text-[10px] sm:text-[11px] font-semibold flex items-center gap-1.5 animate-fadeIn ${
                    theme === "dark" ? "border-slate-700/60 text-emerald-300" : "border-emerald-200 text-emerald-800"
                  }`}>
                    <CheckCircle2 size={12} className={theme === "dark" ? "text-emerald-400 shrink-0" : "text-emerald-600 shrink-0"} />
                    <span>{item.detail}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
