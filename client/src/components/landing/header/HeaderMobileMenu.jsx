import React from "react";
import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import { NAV_ITEMS } from "./useHeaderState.js";

export default function HeaderMobileMenu({ activeItem, handleNavClick, setMobileMenuOpen }) {
  return (
    <div className="border-t border-slate-800 bg-slate-900 px-6 py-6 xl:hidden flex flex-col gap-4 shadow-2xl">
      <div className="p-2 rounded-2xl bg-slate-800/90 border border-slate-700 flex flex-col gap-1 text-xs font-bold tracking-wider">
        {NAV_ITEMS.map((item) => {
          const isActive = activeItem === item.label;
          return item.isRoute ? (
            <Link key={item.label} to={item.to} onClick={(e) => handleNavClick(e, item)} className={`px-4 py-3 rounded-xl transition ${isActive ? "bg-emerald-500 text-slate-950 font-extrabold" : "text-slate-300 hover:text-white"}`}>{item.label}</Link>
          ) : (
            <a key={item.label} href={item.href} onClick={(e) => handleNavClick(e, item)} className={`px-4 py-3 rounded-xl transition ${isActive ? "bg-emerald-500 text-slate-950 font-extrabold" : "text-slate-300 hover:text-white"}`}>{item.label}</a>
          );
        })}
      </div>
      <div className="flex flex-col gap-3 mt-2">
        <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="flex justify-center text-xs font-bold text-white py-3 rounded-xl border border-slate-700 bg-slate-800">Sign In</Link>
        <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="flex justify-center items-center gap-2 rounded-xl bg-emerald-500 py-3 text-xs font-bold text-slate-950 shadow-md">Get Started <ArrowRight size={15} /></Link>
      </div>
    </div>
  );
}
