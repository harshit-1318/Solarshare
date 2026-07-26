import React from "react";
import { Link } from "react-router-dom";
import { Sun, Moon, Menu, X, ArrowRight } from "lucide-react";
import { NAV_ITEMS, useHeaderState } from "./useHeaderState.js";
import { useTheme } from "../../../context/ThemeContext.jsx";
import HeaderBrandLogo from "./HeaderBrandLogo.jsx";
import HeaderMobileMenu from "./HeaderMobileMenu.jsx";
import HeaderNavMenu from "./HeaderNavMenu.jsx";

export default function Header() {
  const { mobileMenuOpen, setMobileMenuOpen, scrolled, activeItem, scrollProgress, handleNavClick } = useHeaderState();
  const { theme, toggleTheme } = useTheme();

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 relative ${
        scrolled
          ? theme === "dark"
            ? "bg-slate-900/90 backdrop-blur-xl border-b border-slate-800/90 shadow-xl py-3 text-white"
            : "bg-white/90 backdrop-blur-xl border-b border-slate-200 shadow-sm py-3 text-slate-800"
          : theme === "dark"
          ? "bg-slate-900/80 backdrop-blur-md py-4 text-white border-b border-slate-800/40"
          : "bg-white/80 backdrop-blur-md py-4 text-slate-800 border-b border-slate-200/50"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <HeaderBrandLogo handleNavClick={handleNavClick} />

        <HeaderNavMenu activeItem={activeItem} handleNavClick={handleNavClick} />

        {/* Right CTA Buttons & Theme Switcher */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={toggleTheme}
            title={theme === "dark" ? "Switch to Light Mode" : "Switch to Dark Mode"}
            className={`p-2 rounded-full border transition-all duration-300 flex items-center justify-center ${
              theme === "dark"
                ? "bg-slate-800 border-slate-700 text-amber-400 hover:bg-slate-700 hover:scale-110"
                : "bg-slate-100 border-slate-200 text-amber-500 hover:bg-slate-200 hover:scale-110"
            }`}
          >
            {theme === "dark" ? <Sun size={18} className="fill-amber-400" /> : <Moon size={18} className="text-slate-700" />}
          </button>

          <Link to="/login" className={`text-xs font-semibold px-3 py-2 transition-colors ${
            theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-600 hover:text-slate-900"
          }`}>
            Sign In
          </Link>
          <Link
            to="/register"
            className="inline-flex items-center gap-2 rounded-full bg-emerald-500 px-5 py-2 text-xs font-bold text-slate-950 shadow-lg shadow-emerald-500/20 hover:bg-emerald-400 transition duration-200"
          >
            Get Started <ArrowRight size={14} />
          </Link>
        </div>

        {/* Mobile menu toggle & Theme button */}
        <div className="flex items-center gap-2 xl:hidden">
          <button
            onClick={toggleTheme}
            className={`p-2 rounded-full border transition ${
              theme === "dark" ? "bg-slate-800 border-slate-700 text-amber-400" : "bg-slate-100 border-slate-200 text-slate-700"
            }`}
          >
            {theme === "dark" ? <Sun size={18} className="fill-amber-400" /> : <Moon size={18} />}
          </button>

          <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className={`p-2 focus:outline-none ${theme === "dark" ? "text-slate-300 hover:text-white" : "text-slate-700 hover:text-slate-900"}`}>
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {mobileMenuOpen && (
        <HeaderMobileMenu
          activeItem={activeItem}
          handleNavClick={handleNavClick}
          setMobileMenuOpen={setMobileMenuOpen}
        />
      )}

      {/* Top Scroll Progress Indicator */}
      <div
        className="absolute bottom-0 left-0 h-[2px] bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 transition-all duration-150 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </header>
  );
}

