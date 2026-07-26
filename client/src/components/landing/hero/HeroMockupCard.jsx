import React, { useState, useEffect } from "react";
import api from "../../../api/axios.js";
import HeroMockupHeaderBar from "./HeroMockupHeaderBar.jsx";
import HeroMockupTabSwitcher from "./HeroMockupTabSwitcher.jsx";
import HeroMockupWaveGraph from "./HeroMockupWaveGraph.jsx";
import HeroMockupMetricsGrid from "./HeroMockupMetricsGrid.jsx";
import HeroMockupRevenueView from "./HeroMockupRevenueView.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function HeroMockupCard() {
  const { theme } = useTheme();
  const [activeTab, setActiveTab] = useState("live");
  const [nodeStats, setNodeStats] = useState({
    peakPowerKw: 0,
    settledAmount: 0,
    co2AvoidedKg: 0,
    totalConsumers: 0,
    totalProsumers: 0,
  });

  useEffect(() => {
    const fetchNodeStats = async () => {
      try {
        const res = await api.get("/public/landing-stats");
        if (res.data) {
          setNodeStats({
            peakPowerKw: res.data.avgPeakPowerKw || 0,
            settledAmount: res.data.totalSettledAmount || 0,
            co2AvoidedKg: res.data.co2AvoidedKg || 0,
            totalConsumers: res.data.totalConsumers || 0,
            totalProsumers: res.data.totalProsumers || 0,
          });
        }
      } catch (err) {
        console.error("Error fetching HeroMockupCard stats:", err);
      }
    };
    fetchNodeStats();
  }, []);

  return (
    <div className="relative mt-2 lg:mt-0 lg:col-span-5 flex justify-center">
      <div className={`absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 blur-xl animate-pulse ${
        theme === "dark" ? "opacity-20" : "opacity-15"
      }`} />

      <div className={`relative w-full max-w-[420px] rounded-2xl p-3.5 sm:p-4 shadow-xl border backdrop-blur-xl transition-colors duration-300 ${
        theme === "dark"
          ? "bg-slate-900/90 text-slate-300 border-slate-700/80"
          : "bg-white/95 text-slate-800 border-slate-200/90 shadow-slate-200/60"
      }`}>
        <HeroMockupHeaderBar />

        <div className="p-3 space-y-2.5">
          <HeroMockupTabSwitcher activeTab={activeTab} setActiveTab={setActiveTab} />

          {activeTab === "live" ? (
            <>
              <HeroMockupWaveGraph peakPowerKw={nodeStats.peakPowerKw} />
              <HeroMockupMetricsGrid settledAmount={nodeStats.settledAmount} nodeStats={nodeStats} />
            </>
          ) : (
            <HeroMockupRevenueView />
          )}
        </div>
      </div>
    </div>
  );
}
