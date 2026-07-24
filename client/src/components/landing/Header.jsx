import { Link } from "react-router-dom";
import { Sun, Menu, X, ArrowRight } from "lucide-react";
import { NAV_ITEMS, useHeaderState } from "./useHeaderState.js";

export default function Header() {
  const { mobileMenuOpen, setMobileMenuOpen, scrolled, activeItem, handleNavClick } = useHeaderState();

  return (
    <header
      id="top"
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        scrolled
          ? "bg-white/90 backdrop-blur-xl border-b border-slate-200/80 shadow-sm py-2.5"
          : "bg-slate-50/80 backdrop-blur-md py-3.5"
      }`}
    >
      <div className="mx-auto flex max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link to="/" onClick={(e) => handleNavClick(e, { label: "HOME", href: "#top" })} className="flex items-center gap-2.5 group shrink-0">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 border border-slate-200 shadow-sm text-emerald-600 group-hover:scale-105 group-hover:bg-emerald-50 transition duration-300">
            <Sun size={19} className="fill-emerald-600 animate-spin-slow" />
          </div>
          <span className="font-heading text-lg font-black tracking-tight text-slate-900">
            Solar<span className="text-emerald-600">Share</span>
          </span>
        </Link>

        <nav className="hidden xl:flex items-center p-1 rounded-full bg-slate-100/90 border border-slate-200/80 backdrop-blur-md shadow-inner text-[11px] font-bold tracking-wider text-slate-500">
          {NAV_ITEMS.map((item) => {
            const isActive = activeItem === item.label;

            if (item.isRoute) {
              return (
                <Link
                  key={item.label}
                  to={item.to}
                  onClick={(e) => handleNavClick(e, item)}
                  className={`px-3.5 py-1.5 rounded-full transition-all duration-300 flex items-center gap-1 ${
                    isActive ? "bg-white text-slate-900 shadow-sm font-extrabold" : "hover:text-slate-900 hover:bg-slate-200/50"
                  }`}
                >
                  {item.label}
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                </Link>
              );
            }

            return (
              <a
                key={item.label}
                href={item.href}
                onClick={(e) => handleNavClick(e, item)}
                className={`px-3.5 py-1.5 rounded-full transition-all duration-300 ${
                  isActive ? "bg-white text-slate-900 shadow-sm font-extrabold" : "hover:text-slate-900 hover:bg-slate-200/50"
                }`}
              >
                {item.label}
              </a>
            );
          })}
        </nav>

        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link to="/login" className="text-xs font-semibold text-slate-700 hover:text-emerald-600 transition-colors px-3 py-2">
            Sign In
          </Link>
          <Link to="/register" className="inline-flex items-center gap-1.5 rounded-full bg-emerald-600 px-5 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-emerald-700 transition duration-200">
            Get Started <ArrowRight size={14} />
          </Link>
        </div>

        <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="flex p-2 text-slate-700 hover:text-slate-900 xl:hidden focus:outline-none">
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileMenuOpen && (
        <div className="border-t border-slate-200 bg-white px-6 py-5 xl:hidden flex flex-col gap-3 shadow-xl">
          <div className="p-1.5 rounded-2xl bg-slate-100/90 border border-slate-200 flex flex-col gap-1 text-xs font-bold tracking-wider">
            {NAV_ITEMS.map((item) => {
              const isActive = activeItem === item.label;
              return item.isRoute ? (
                <Link key={item.label} to={item.to} onClick={(e) => handleNavClick(e, item)} className={`px-4 py-2.5 rounded-xl transition ${isActive ? "bg-white text-slate-900 shadow-sm font-extrabold" : "text-slate-600 hover:text-slate-900"}`}>{item.label}</Link>
              ) : (
                <a key={item.label} href={item.href} onClick={(e) => handleNavClick(e, item)} className={`px-4 py-2.5 rounded-xl transition ${isActive ? "bg-white text-slate-900 shadow-sm font-extrabold" : "text-slate-600 hover:text-slate-900"}`}>{item.label}</a>
              );
            })}
          </div>
          <div className="flex flex-col gap-2.5 mt-2">
            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex justify-center text-xs font-semibold text-slate-700 py-3 rounded-full border border-slate-200">Sign In</Link>
            <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex justify-center items-center gap-1.5 rounded-full bg-emerald-600 py-3 text-xs font-semibold text-white shadow-sm">Get Started <ArrowRight size={14} /></Link>
          </div>
        </div>
      )}
    </header>
  );
}
