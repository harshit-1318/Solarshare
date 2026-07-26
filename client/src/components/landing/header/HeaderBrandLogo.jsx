import React from "react";
import { Link } from "react-router-dom";
import { Sun } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeaderBrandLogo({ handleNavClick }) {
  const { theme } = useTheme();

  return (
    <Link to="/" onClick={(e) => handleNavClick(e, { label: "HOME", href: "#top" })} className="flex items-center gap-3 group shrink-0">
      <div className={`flex h-10 w-10 items-center justify-center rounded-2xl border shadow-md group-hover:scale-105 transition duration-300 ${
        theme === "dark" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-emerald-100 border-emerald-200 text-emerald-600"
      }`}>
        <Sun size={22} className="fill-amber-400 animate-spin-slow" />
      </div>
      <div>
        <span className={`font-heading text-xl font-black tracking-tight block leading-none ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          Solar<span className="text-emerald-500">Share</span>
        </span>
        <span className={`text-[10px] font-mono tracking-widest uppercase block mt-0.5 ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>P2P Energy Grid</span>
      </div>
    </Link>
  );
}
