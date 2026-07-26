import React from "react";
import { ChevronDown, CheckCircle2, ExternalLink } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function FaqItem({ faq, index, isOpen, toggleAccordion, feedback, handleHelpful }) {
  const { theme } = useTheme();

  return (
    <div className={`rounded-xl border transition-all duration-300 overflow-hidden ${
      isOpen
        ? theme === "dark"
          ? "border-emerald-500/60 bg-slate-800/90 shadow-lg text-white"
          : "border-emerald-500/60 bg-emerald-50/70 shadow-md text-slate-900"
        : theme === "dark"
        ? "border-slate-800 bg-slate-800/40 hover:bg-slate-800/60 text-white"
        : "border-slate-200 bg-white hover:bg-slate-50 text-slate-900 shadow-sm"
    }`}>
      <button onClick={() => toggleAccordion(index)} className="w-full px-4 py-3 text-left flex items-center justify-between gap-3 focus:outline-none">
        <div className="flex items-center gap-2.5">
          <span className={`flex h-6 w-6 shrink-0 items-center justify-center rounded-lg text-xs font-black font-mono ${
            isOpen ? "bg-emerald-500 text-slate-950 shadow-md" : theme === "dark" ? "bg-slate-700 text-slate-300" : "bg-slate-200 text-slate-700"
          }`}>
            Q{index + 1}
          </span>
          <h3 className={`font-heading text-xs sm:text-sm lg:text-base font-extrabold ${
            isOpen
              ? theme === "dark" ? "text-emerald-400" : "text-emerald-800"
              : theme === "dark" ? "text-white" : "text-slate-900"
          }`}>
            {faq.question}
          </h3>
        </div>
        <div className={`p-1 rounded-lg transition duration-300 shrink-0 ${isOpen ? "bg-emerald-500/20 text-emerald-500 rotate-180" : "text-slate-400"}`}>
          <ChevronDown size={18} />
        </div>
      </button>

      {isOpen && (
        <div className={`px-4 pb-3.5 pt-0 text-xs sm:text-sm leading-relaxed border-t animate-fadeIn space-y-2 ${
          theme === "dark" ? "border-slate-700/60 text-slate-300" : "border-slate-200/80 text-slate-700"
        }`}>
          <p className="mt-2.5 font-medium text-xs sm:text-sm">{faq.answer}</p>
          {faq.detail && (
            <div className={`p-2.5 rounded-xl border text-xs sm:text-sm font-semibold flex items-center gap-2 ${
              theme === "dark" ? "bg-slate-900/80 border-slate-700/60 text-emerald-300" : "bg-emerald-100/60 border-emerald-200 text-emerald-950"
            }`}>
              <CheckCircle2 size={15} className={theme === "dark" ? "text-emerald-400 shrink-0" : "text-emerald-600 shrink-0"} />
              <span>{faq.detail}</span>
            </div>
          )}
          <div className={`pt-2 flex flex-wrap items-center justify-between gap-2.5 text-xs border-t ${
            theme === "dark" ? "text-slate-400 border-slate-800" : "text-slate-600 border-slate-200"
          }`}>
            <div className="flex items-center gap-2">
              <span className="font-semibold">Was this answer helpful?</span>
              {feedback ? (
                <span className="text-emerald-500 font-extrabold">Thank you for your feedback!</span>
              ) : (
                <div className="flex items-center gap-1">
                  <button
                    onClick={() => handleHelpful(index, "yes")}
                    className={`px-2.5 py-0.5 rounded-lg font-bold transition ${
                      theme === "dark"
                        ? "bg-slate-700/60 hover:bg-emerald-500/20 hover:text-emerald-400"
                        : "bg-slate-100 hover:bg-emerald-100 hover:text-emerald-800 text-slate-700"
                    }`}
                  >
                    👍 Yes
                  </button>
                  <button
                    onClick={() => handleHelpful(index, "no")}
                    className={`px-2.5 py-0.5 rounded-lg font-bold transition ${
                      theme === "dark"
                        ? "bg-slate-700/60 hover:bg-slate-700"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-700"
                    }`}
                  >
                    👎 No
                  </button>
                </div>
              )}
            </div>
            <Link to="/support" className="text-emerald-500 hover:text-emerald-400 flex items-center gap-1 font-extrabold">
              Need further help? Ask Support <ExternalLink size={12} />
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

