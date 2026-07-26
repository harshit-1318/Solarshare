import React, { useState, useEffect } from "react";
import { ChevronDown } from "lucide-react";
import HeroLeftContent from "./HeroLeftContent.jsx";
import HeroMockupCard from "./HeroMockupCard.jsx";
import api from "../../../api/axios.js";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function Hero() {
  const { theme } = useTheme();
  const [stats, setStats] = useState({
    totalProsumers: 0,
    totalTradesSettled: 0,
    totalKwhTraded: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await api.get("/public/landing-stats");
        if (res.data) {
          setStats({
            totalProsumers: res.data.totalProsumers || 0,
            totalTradesSettled: res.data.totalTradesSettled || 0,
            totalKwhTraded: res.data.totalKwhTraded || 0,
          });
        }
      } catch (err) {
        console.error("Error loading Hero landing stats:", err);
      }
    };
    fetchStats();
  }, []);

  return (
    <section id="top" className={`relative overflow-hidden py-6 sm:py-8 min-h-[calc(100vh-73px)] flex items-center justify-center border-b transition-colors duration-300 ${
      theme === "dark"
        ? "bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 text-white border-slate-800"
        : "bg-gradient-to-b from-white via-slate-50/50 to-white text-slate-900 border-slate-200/80"
    }`}>
      {/* Background Mesh Glow Effects */}
      <div className={`absolute right-0 top-0 -z-10 h-[500px] w-[500px] rounded-full blur-[160px] pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/15" : "bg-emerald-200/40"
      }`} />
      <div className={`absolute left-10 top-1/3 -z-10 h-[400px] w-[400px] rounded-full blur-[160px] pointer-events-none ${
        theme === "dark" ? "bg-teal-500/15" : "bg-teal-200/40"
      }`} />
      <div className={`absolute bottom-0 right-1/3 -z-10 h-[300px] w-[300px] rounded-full blur-[160px] pointer-events-none ${
        theme === "dark" ? "bg-cyan-500/10" : "bg-cyan-200/30"
      }`} />

      {/* Grid pattern overlay */}
      <div className={`absolute inset-0 bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none ${
        theme === "dark"
          ? "bg-[linear-gradient(to_right,#1e293b15_1px,transparent_1px),linear-gradient(to_bottom,#1e293b15_1px,transparent_1px)]"
          : "bg-[linear-gradient(to_right,#e2e8f080_1px,transparent_1px),linear-gradient(to_bottom,#e2e8f080_1px,transparent_1px)]"
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-6">
          <HeroLeftContent stats={stats} />
          <HeroMockupCard />
        </div>
      </div>

      {/* Connected Energy Pulse Connector to Features */}
      <a
        href="#features"
        aria-label="Scroll to Features"
        className="absolute bottom-2.5 left-1/2 -translate-x-1/2 z-20 group flex flex-col items-center gap-0.5 transition-transform duration-300 hover:scale-110 cursor-pointer"
      >
        <span className={`text-[10px] font-extrabold uppercase tracking-widest transition-colors ${
          theme === "dark" ? "text-emerald-400/80 group-hover:text-emerald-300" : "text-emerald-700/80 group-hover:text-emerald-600"
        }`}>
          Features
        </span>
        <div className={`p-1 rounded-full border shadow-lg transition-all duration-300 ${
          theme === "dark"
            ? "bg-slate-900/90 border-emerald-500/40 text-emerald-400 group-hover:border-emerald-400 group-hover:bg-emerald-500/10 shadow-emerald-950/50"
            : "bg-white/90 border-emerald-300 text-emerald-600 group-hover:border-emerald-500 group-hover:bg-emerald-50 shadow-emerald-200/50"
        }`}>
          <ChevronDown size={14} className="animate-bounce" />
        </div>
      </a>
    </section>
  );
}

