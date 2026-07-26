import React from "react";
import { Heart } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function FooterBottomBar() {
  const { theme } = useTheme();

  return (
    <div className={`pt-1 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-semibold ${
      theme === "dark" ? "text-slate-400" : "text-slate-600"
    }`}>
      <p>© {new Date().getFullYear()} SolarShare Technologies Pvt. Ltd. All rights reserved.</p>

      <div className="flex flex-wrap items-center gap-3.5 text-[11px]">
        <a href="#faq" className="hover:text-emerald-500 transition">Terms of Service</a>
        <span>•</span>
        <a href="#faq" className="hover:text-emerald-500 transition">Privacy Policy</a>
        <span>•</span>
        <a href="#faq" className="hover:text-emerald-500 transition">CERC Guidelines</a>
        <span>•</span>
        <span className={`flex items-center gap-1.5 font-bold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
          <span>🇮🇳</span> Empowering Clean Energy in India <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse ml-0.5" />
        </span>
      </div>
    </div>
  );
}
