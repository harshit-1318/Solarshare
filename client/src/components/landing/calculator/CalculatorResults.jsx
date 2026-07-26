import React from "react";
import { TrendingUp, Leaf, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function CalculatorResults({
  role,
  monthlyP2PRevenue,
  monthlySavings,
  annualBonusP2PEarning,
  annualSavings,
  monthlyGenKwh,
  estimatedUnits,
  annualCo2OffsetTons,
  treesEquivalent,
}) {
  const { theme } = useTheme();

  return (
    <div className={`rounded-xl p-4 sm:p-5 flex flex-col justify-between relative overflow-hidden shadow-inner h-full border transition-colors ${
      theme === "dark"
        ? "bg-slate-900/80 border-slate-700/80"
        : "bg-gradient-to-br from-slate-800 via-slate-900 to-slate-950 border-slate-700/50 shadow-xl"
    }`}>
      <div className="absolute top-0 right-0 p-4 opacity-10 pointer-events-none">
        <TrendingUp size={100} className="text-emerald-400" />
      </div>

      <div>
        <p className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-slate-400">
          {role === "prosumer" ? "Estimated Direct P2P Earnings" : "Estimated Monthly Energy Savings"}
        </p>

        <div className="mt-1.5 flex items-baseline gap-2">
          <span className="text-5xl sm:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-emerald-200 font-mono">
            ₹{role === "prosumer" ? monthlyP2PRevenue.toLocaleString() : monthlySavings.toLocaleString()}
          </span>
          <span className="text-slate-400 text-base sm:text-lg font-semibold">/ month</span>
        </div>

        <p className="mt-1 text-xs text-emerald-400/90 font-medium flex items-center gap-1.5">
          <TrendingUp size={13} />
          {role === "prosumer"
            ? `₹${annualBonusP2PEarning.toLocaleString()} extra/yr vs DISCOM grid net-metering`
            : `Save ~₹${annualSavings.toLocaleString()} every year on electricity bills`}
        </p>

        <div className="mt-3 grid grid-cols-2 gap-3">
          <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-3.5">
            <p className="text-xs uppercase font-bold text-slate-400">
              {role === "prosumer" ? "Monthly Generation" : "Clean Solar Power"}
            </p>
            <p className="text-2xl font-black font-mono text-white mt-1">
              {role === "prosumer" ? `${monthlyGenKwh} kWh` : `${estimatedUnits} kWh`}
            </p>
            <span className="text-xs font-semibold text-emerald-400 mt-0.5 block">100% Peer Verified</span>
          </div>

          <div className="bg-slate-800/70 border border-slate-700/50 rounded-xl p-3.5">
            <p className="text-xs uppercase font-bold text-slate-400">Environmental CO₂ Offset</p>
            <p className="text-2xl font-black font-mono text-teal-300 mt-1 flex items-center gap-1.5">
              <Leaf size={18} className="text-emerald-400 shrink-0" />
              {role === "prosumer" ? `${annualCo2OffsetTons} Tons/yr` : `${treesEquivalent} Trees/yr`}
            </p>
            <span className="text-xs font-semibold text-slate-400 mt-0.5 block">Green Carbon Credit</span>
          </div>
        </div>
      </div>

      <div className="mt-3 pt-2.5 border-t border-slate-700/60 flex flex-col sm:flex-row items-center justify-between gap-2.5">
        <div className="text-xs sm:text-sm text-slate-400 text-center sm:text-left">
          <span className="font-bold text-white">Instant UPI Settlement</span> • No Lock-in Contracts
        </div>
        <Link
          to="/register"
          className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-5 py-2.5 text-xs sm:text-sm font-extrabold text-slate-950 hover:bg-emerald-400 transition duration-200 shadow-lg shadow-emerald-500/20"
        >
          {role === "prosumer" ? "List Your Solar Surplus" : "Start Buying Solar Energy"}
          <ArrowRight size={15} />
        </Link>
      </div>
    </div>
  );
}
