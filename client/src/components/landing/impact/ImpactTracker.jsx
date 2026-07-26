import React, { useState, useEffect } from "react";
import { Leaf, ArrowRight, Globe } from "lucide-react";
import { Link } from "react-router-dom";
import ImpactMetricsGrid from "./ImpactMetricsGrid.jsx";
import ImpactHeader from "./ImpactHeader.jsx";
import ImpactDetailSpecs from "./ImpactDetailSpecs.jsx";
import api from "../../../api/axios.js";
import { useTheme } from "../../../context/ThemeContext.jsx";
import { formatRealStats } from "./impactMetricsData.js";

export default function ImpactTracker() {
  const [selectedState, setSelectedState] = useState("all");
  const { theme } = useTheme();
  const [realDbStats, setRealDbStats] = useState(null);

  useEffect(() => {
    const fetchImpactData = async () => {
      try {
        const query = selectedState !== "all" ? `?state=${selectedState}` : "";
        const res = await api.get(`/public/landing-stats${query}`);
        if (res.data) {
          setRealDbStats(res.data);
        }
      } catch (err) {
        console.error("Error fetching ImpactTracker data:", err);
      }
    };
    fetchImpactData();
  }, [selectedState]);

  const currentStats = formatRealStats(realDbStats, selectedState);

  return (
    <section id="impact" className={`relative overflow-hidden py-2.5 sm:py-3.5 h-[calc(100vh-73px)] max-h-[calc(100vh-73px)] flex flex-col justify-center border-b scroll-mt-[72px] transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-900 border-slate-200"
    }`}>
      <div className={`absolute top-0 left-1/3 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-100/60"
      }`} />
      <div className={`absolute bottom-0 right-10 w-[400px] h-[400px] rounded-full blur-[140px] pointer-events-none ${
        theme === "dark" ? "bg-teal-500/10" : "bg-teal-100/60"
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-between space-y-2">
        <ImpactHeader
          selectedState={selectedState}
          setSelectedState={setSelectedState}
        />

        <div className={`w-fit mx-auto border rounded-full px-4 py-1.5 text-xs sm:text-sm flex items-center justify-center gap-3 transition-colors shadow-sm ${
          theme === "dark" ? "bg-slate-800/90 border-slate-700 text-slate-200" : "bg-slate-50 border-slate-200 text-slate-800"
        }`}>
          <span className={`font-extrabold flex items-center gap-1.5 whitespace-nowrap ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            <Globe size={15} className="text-emerald-500 shrink-0" /> {currentStats.stateName}
          </span>
          <span className="text-emerald-500 font-extrabold bg-emerald-500/10 px-3 py-0.5 rounded-full border border-emerald-500/20 text-xs shrink-0 whitespace-nowrap">
            {currentStats.leadingRegion}
          </span>
        </div>

        <ImpactMetricsGrid currentStats={currentStats} />

        <ImpactDetailSpecs />

        <div className={`border rounded-xl p-3 sm:p-3.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 transition-colors ${
          theme === "dark" ? "bg-slate-800/80 border-slate-700/80" : "bg-slate-50 border-slate-200"
        }`}>
          <div className="flex items-center gap-3">
            <div className="h-9 w-9 rounded-xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 flex items-center justify-center font-bold shrink-0">
              <Leaf size={18} />
            </div>
            <div>
              <h4 className={`font-heading text-xs sm:text-sm font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Are You A Rooftop Solar Generator?
              </h4>
              <p className={`text-xs ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Claim your verified green carbon offset certificate and earn extra income today.
              </p>
            </div>
          </div>

          <Link
            to="/register"
            className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm px-6 py-2.5 rounded-full transition shadow-md shadow-emerald-500/20 inline-flex items-center justify-center gap-2 whitespace-nowrap"
          >
            Claim Green Certificate <ArrowRight size={15} />
          </Link>
        </div>
      </div>
    </section>
  );
}





