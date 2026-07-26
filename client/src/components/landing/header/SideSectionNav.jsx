import React from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { useSideSectionNav } from "./useSideSectionNav.js";

export default function SideSectionNav() {
  const { theme } = useTheme();
  const { SECTIONS, activeSectionId, hideInFooter, handleNavClick, currentIndex, prevSection, nextSection } = useSideSectionNav();

  return (
    <aside
      aria-label="Section navigation"
      className={`hidden xl:flex fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex-col items-center gap-1.5 p-2 rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
        hideInFooter ? "opacity-0 pointer-events-none scale-90 translate-x-4" : "opacity-100 scale-100 translate-x-0"
      } ${
        theme === "dark"
          ? "bg-slate-900/90 border-slate-700/90 shadow-slate-950/90 text-white"
          : "bg-white/95 border-slate-300/90 shadow-slate-400/40 text-slate-800"
      }`}
    >
      {/* Up Arrow Link */}
      <a
        href={prevSection.href}
        onClick={(e) => handleNavClick(e, prevSection.id)}
        title={`Previous: ${prevSection.label}`}
        aria-label="Previous section"
        className={`p-1.5 rounded-full border transition-all duration-200 ${
          currentIndex <= 0
            ? "opacity-30 pointer-events-none border-transparent text-slate-500"
            : theme === "dark"
            ? "border-slate-700 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-emerald-400"
            : "border-slate-200 hover:bg-emerald-50 hover:border-emerald-400 text-emerald-600 shadow-sm"
        }`}
      >
        <ChevronUp size={15} />
      </a>

      <div className="w-3 h-[1px] bg-slate-700/30 my-0.5" />

      {/* Section Dots */}
      <div className="flex flex-col items-center gap-2.5 py-1">
        {SECTIONS.map((sec) => {
          const isActive = activeSectionId === sec.id;
          return (
            <a
              key={sec.id}
              href={sec.href}
              onClick={(e) => handleNavClick(e, sec.id)}
              className="relative group flex items-center justify-center p-1 focus:outline-none"
              title={sec.label}
              aria-label={sec.label}
            >
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3.5 h-3.5 bg-emerald-500 shadow-lg shadow-emerald-500/70 ring-4 ring-emerald-500/25 scale-110"
                    : theme === "dark"
                    ? "w-2 h-2 bg-slate-600 group-hover:bg-slate-200 group-hover:scale-125"
                    : "w-2 h-2 bg-slate-400 group-hover:bg-slate-700 group-hover:scale-125"
                }`}
              />
              <span
                className={`absolute right-full mr-3.5 px-3 py-1 rounded-full text-[10px] font-extrabold uppercase tracking-widest whitespace-nowrap opacity-0 group-hover:opacity-100 transition-all duration-200 shadow-xl pointer-events-none border ${
                  theme === "dark"
                    ? "bg-slate-900 border-slate-700 text-emerald-400 shadow-slate-950"
                    : "bg-white border-slate-200 text-emerald-700 shadow-slate-300"
                }`}
              >
                {sec.label}
              </span>
            </a>
          );
        })}
      </div>

      <div className="w-3 h-[1px] bg-slate-700/30 my-0.5" />

      {/* Down Arrow Link */}
      <a
        href={nextSection.href}
        onClick={(e) => handleNavClick(e, nextSection.id)}
        title={`Next: ${nextSection.label}`}
        aria-label="Next section"
        className={`p-1.5 rounded-full border transition-all duration-200 ${
          currentIndex >= SECTIONS.length - 1
            ? "opacity-30 pointer-events-none border-transparent text-slate-500"
            : theme === "dark"
            ? "border-slate-700 hover:bg-emerald-500/20 hover:border-emerald-500/50 text-emerald-400"
            : "border-slate-200 hover:bg-emerald-50 hover:border-emerald-400 text-emerald-600 shadow-sm"
        }`}
      >
        <ChevronDown size={15} />
      </a>
    </aside>
  );
}
