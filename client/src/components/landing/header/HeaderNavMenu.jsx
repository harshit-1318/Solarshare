import React, { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { NAV_ITEMS } from "./useHeaderState.js";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeaderNavMenu({ activeItem, handleNavClick }) {
  const { theme } = useTheme();
  const [pillStyle, setPillStyle] = useState({ left: 0, width: 0, opacity: 0 });
  const itemRefs = useRef({});

  useEffect(() => {
    const activeEl = itemRefs.current[activeItem];
    if (activeEl) {
      setPillStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
        opacity: 1,
      });
    } else {
      setPillStyle((prev) => ({ ...prev, opacity: 0 }));
    }
  }, [activeItem]);

  return (
    <nav className={`relative hidden xl:flex items-center p-1.5 rounded-full border backdrop-blur-md shadow-inner text-[11px] font-bold tracking-wider transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-800/90 border-slate-700/80 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-600"
    }`}>
      {/* Sliding Active Pill Background */}
      <div
        className="absolute top-1.5 bottom-1.5 rounded-full bg-emerald-500 transition-all duration-300 ease-out shadow-md shadow-emerald-500/30 pointer-events-none"
        style={{
          left: `${pillStyle.left}px`,
          width: `${pillStyle.width}px`,
          opacity: pillStyle.opacity,
        }}
      />

      {NAV_ITEMS.map((item) => {
        const isActive = activeItem === item.label;

        if (item.isRoute) {
          return (
            <Link
              key={item.label}
              ref={(el) => (itemRefs.current[item.label] = el)}
              to={item.to}
              onClick={(e) => handleNavClick(e, item)}
              className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 flex items-center gap-1.5 ${
                isActive
                  ? "text-slate-950 font-extrabold"
                  : theme === "dark"
                  ? "hover:text-white hover:bg-slate-700/30"
                  : "hover:text-slate-900 hover:bg-slate-200/50"
              }`}
            >
              {item.label}
              <span className={`h-1.5 w-1.5 rounded-full animate-pulse ${isActive ? "bg-slate-950" : "bg-emerald-400"}`} />
            </Link>
          );
        }

        return (
          <a
            key={item.label}
            ref={(el) => (itemRefs.current[item.label] = el)}
            href={item.href}
            onClick={(e) => handleNavClick(e, item)}
            className={`relative z-10 px-4 py-2 rounded-full transition-colors duration-300 ${
              isActive
                ? "text-slate-950 font-extrabold"
                : theme === "dark"
                ? "hover:text-white hover:bg-slate-700/30"
                : "hover:text-slate-900 hover:bg-slate-200/50"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}

