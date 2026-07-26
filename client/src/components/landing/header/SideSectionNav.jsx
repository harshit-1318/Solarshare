import React, { useState, useEffect } from "react";
import { ChevronUp, ChevronDown } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

const SECTIONS = [
  { id: "top", label: "Home", href: "#top" },
  { id: "features", label: "Features", href: "#features" },
  { id: "how-it-works", label: "How It Works", href: "#how-it-works" },
  { id: "grid-flow", label: "Live Grid", href: "#grid-flow" },
  { id: "calculator", label: "Calculator", href: "#calculator" },
  { id: "impact", label: "Impact", href: "#impact" },
  { id: "faq", label: "FAQ", href: "#faq" },
];

export default function SideSectionNav() {
  const { theme } = useTheme();
  const [activeSectionId, setActiveSectionId] = useState("top");
  const [hideInFooter, setHideInFooter] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const docHeight = document.documentElement.scrollHeight;

      // Auto-hide when user scrolls down to the Footer
      if (scrollY + windowHeight >= docHeight - 380) {
        setHideInFooter(true);
      } else {
        setHideInFooter(false);
      }

      if (scrollY < 120) {
        setActiveSectionId("top");
        return;
      }

      const checkPoint = scrollY + 250;
      let matchedId = "top";

      for (let i = SECTIONS.length - 1; i >= 0; i--) {
        const sec = SECTIONS[i];
        if (sec.id === "top") continue;
        const el = document.getElementById(sec.id);
        if (el) {
          const offsetTop = el.offsetTop;
          if (offsetTop <= checkPoint) {
            matchedId = sec.id;
            break;
          }
        }
      }

      setActiveSectionId(matchedId);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleNavClick = (e, id) => {
    if (e) e.preventDefault();
    setActiveSectionId(id);
    if (id === "top") {
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }
    const el = document.getElementById(id);
    if (el) {
      const offsetTop = el.getBoundingClientRect().top + window.pageYOffset - 72;
      window.scrollTo({ top: Math.max(0, offsetTop), behavior: "smooth" });
    }
  };

  const currentIndex = SECTIONS.findIndex((s) => s.id === activeSectionId);
  const prevSection = SECTIONS[Math.max(0, currentIndex - 1)];
  const nextSection = SECTIONS[Math.min(SECTIONS.length - 1, currentIndex + 1)];

  return (
    <aside
      aria-label="Section navigation"
      className={`fixed right-3 sm:right-5 top-1/2 -translate-y-1/2 z-50 flex flex-col items-center gap-1.5 p-2 rounded-full border backdrop-blur-xl shadow-2xl transition-all duration-300 ${
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
              {/* Dot */}
              <span
                className={`block rounded-full transition-all duration-300 ${
                  isActive
                    ? "w-3.5 h-3.5 bg-emerald-500 shadow-lg shadow-emerald-500/70 ring-4 ring-emerald-500/25 scale-110"
                    : theme === "dark"
                    ? "w-2 h-2 bg-slate-600 group-hover:bg-slate-200 group-hover:scale-125"
                    : "w-2 h-2 bg-slate-400 group-hover:bg-slate-700 group-hover:scale-125"
                }`}
              />

              {/* Hover Tooltip Popup (Opens Left) */}
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


