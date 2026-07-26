import React from "react";
import { Link } from "react-router-dom";
import { NAV_ITEMS } from "./useHeaderState.js";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeaderNavMenu({ activeItem, handleNavClick }) {
  const { theme } = useTheme();

  return (
    <nav className={`hidden xl:flex items-center p-1.5 rounded-full border backdrop-blur-md shadow-inner text-[11px] font-bold tracking-wider ${
      theme === "dark" ? "bg-slate-800/90 border-slate-700/80 text-slate-300" : "bg-slate-100 border-slate-200 text-slate-600"
    }`}>
      {NAV_ITEMS.map((item) => {
        const isActive = activeItem === item.label;

        if (item.isRoute) {
          return (
            <Link
              key={item.label}
              to={item.to}
              onClick={(e) => handleNavClick(e, item)}
              className={`px-4 py-2 rounded-full transition-all duration-300 flex items-center gap-1.5 ${
                isActive
                  ? "bg-emerald-500 text-slate-950 shadow-md font-extrabold"
                  : theme === "dark"
                  ? "hover:text-white hover:bg-slate-700/50"
                  : "hover:text-slate-900 hover:bg-slate-200/60"
              }`}
            >
              {item.label}
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            </Link>
          );
        }

        return (
          <a
            key={item.label}
            href={item.href}
            onClick={(e) => handleNavClick(e, item)}
            className={`px-4 py-2 rounded-full transition-all duration-300 ${
              isActive
                ? "bg-emerald-500 text-slate-950 shadow-md font-extrabold"
                : theme === "dark"
                ? "hover:text-white hover:bg-slate-700/50"
                : "hover:text-slate-900 hover:bg-slate-200/60"
            }`}
          >
            {item.label}
          </a>
        );
      })}
    </nav>
  );
}
