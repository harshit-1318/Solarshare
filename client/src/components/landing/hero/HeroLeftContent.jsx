import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, ShieldCheck, Zap, Award, Sparkles } from "lucide-react";
import HeroMetrics from "./HeroMetrics.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeroLeftContent({ stats }) {
  const { theme } = useTheme();

  return (
    <div className="text-left lg:col-span-7 space-y-3.5 lg:space-y-4">
      {/* Top Live Badge */}
      <div className={`inline-flex items-center gap-2 rounded-full border px-3.5 py-1 text-xs font-semibold shadow-sm backdrop-blur-md transition-colors ${
        theme === "dark" ? "bg-emerald-500/10 border-emerald-500/30 text-emerald-400" : "bg-emerald-100/90 border-emerald-200/90 text-emerald-800"
      }`}>
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
        </span>
        <Sparkles size={13} className={theme === "dark" ? "text-emerald-400" : "text-emerald-600"} />
        <span>India's #1 P2P Solar Energy Trading Infrastructure</span>
      </div>

      {/* Headline */}
      <h1 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight leading-[1.1] ${
        theme === "dark" ? "text-white" : "text-slate-900"
      }`}>
        Trade Clean <br />
        Energy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500">with Your Community</span>
      </h1>

      {/* Subtitle */}
      <p className={`max-w-xl text-xs sm:text-sm lg:text-base leading-relaxed font-normal ${
        theme === "dark" ? "text-slate-300" : "text-slate-600"
      }`}>
        SolarShare connects rooftop solar owners directly with local energy buyers. Monetize your surplus solar power at fair market rates while buyers save up to 30% on electricity bills with zero middleman fee.
      </p>

      {/* Call to Actions */}
      <div className="pt-1 flex flex-col sm:flex-row items-stretch sm:items-center gap-3">
        <Link
          to="/register"
          className="inline-flex items-center gap-2 rounded-xl bg-emerald-500 px-5 sm:px-6 py-2.5 text-sm sm:text-base font-bold text-slate-950 shadow-lg shadow-emerald-500/25 hover:bg-emerald-400 hover:scale-[1.02] active:scale-[0.98] transition duration-200"
        >
          Get Started Free <ArrowRight size={17} />
        </Link>
        <Link
          to="/marketplace"
          className={`inline-flex items-center gap-2 rounded-xl border backdrop-blur-md px-5 py-2.5 text-sm sm:text-base font-semibold transition duration-200 shadow-md ${
            theme === "dark"
              ? "border-slate-700 bg-slate-800/80 text-slate-200 hover:bg-slate-800 hover:border-slate-600"
              : "border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400"
          }`}
        >
          <ShoppingCart size={17} className={theme === "dark" ? "text-emerald-400" : "text-emerald-600"} /> Explore Live Marketplace
        </Link>
      </div>

      {/* Key Trust Highlights Line */}
      <div className={`pt-0.5 flex flex-wrap items-center gap-x-4 gap-y-1 text-xs font-semibold ${
        theme === "dark" ? "text-slate-400" : "text-slate-600"
      }`}>
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={15} className="text-emerald-500 shrink-0" />
          <span>DISCOM Net-Meter Ready</span>
        </span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <Zap size={15} className="text-amber-500 shrink-0" />
          <span>Instant Daily UPI Payouts</span>
        </span>
        <span className="hidden sm:inline text-slate-300">•</span>
        <span className="flex items-center gap-1.5">
          <Award size={15} className="text-cyan-500 shrink-0" />
          <span>CERC Compliant</span>
        </span>
      </div>

      {/* Live Platform Key Metrics */}
      <HeroMetrics stats={stats} />
    </div>
  );
}
