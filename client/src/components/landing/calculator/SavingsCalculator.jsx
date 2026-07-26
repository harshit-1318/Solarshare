import React, { useState } from "react";
import CalculatorHeader from "./CalculatorHeader.jsx";
import CalculatorProsumerInputs from "./CalculatorProsumerInputs.jsx";
import CalculatorConsumerInputs from "./CalculatorConsumerInputs.jsx";
import CalculatorResults from "./CalculatorResults.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function SavingsCalculator() {
  const [role, setRole] = useState("prosumer");

  // Prosumer state — match exactly what CalculatorProsumerInputs expects
  const [systemCapacity, setSystemCapacity] = useState(5);
  const [surplusExport, setSurplusExport] = useState(550);

  // Consumer state — match exactly what CalculatorConsumerInputs expects
  const [consumerUsage, setConsumerUsage] = useState(400);

  const { theme } = useTheme();

  // Prosumer calculations
  const p2pRate = 5.5;
  const gridNetMeterRate = 2.8;
  const monthlyGenKwh = surplusExport;
  const monthlyP2PRevenue = Math.round(monthlyGenKwh * p2pRate);
  const monthlyGridRevenue = Math.round(monthlyGenKwh * gridNetMeterRate);
  const annualBonusP2PEarning = Math.round((monthlyP2PRevenue - monthlyGridRevenue) * 12);
  const annualCo2OffsetTons = ((monthlyGenKwh * 12 * 0.85) / 1000).toFixed(1);

  // Consumer calculations
  const discomAvgRate = 8.5;
  const p2pBuyRate = 5.6;
  const estimatedUnits = consumerUsage;
  const monthlyP2PBill = Math.round(estimatedUnits * p2pBuyRate);
  const monthlyDiscomBill = Math.round(estimatedUnits * discomAvgRate);
  const monthlySavings = Math.max(0, monthlyDiscomBill - monthlyP2PBill);
  const annualSavings = monthlySavings * 12;
  const treesEquivalent = Math.round((estimatedUnits * 12 * 0.85) / 20);

  return (
    <section id="calculator" className={`relative overflow-hidden py-6 sm:py-8 min-h-[calc(100vh-73px)] flex flex-col justify-center border-b scroll-mt-[72px] transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-900 border-slate-200"
    }`}>
      <div className={`absolute top-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-100/50"
      }`} />
      <div className={`absolute bottom-0 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] pointer-events-none ${
        theme === "dark" ? "bg-teal-500/10" : "bg-teal-100/50"
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <CalculatorHeader role={role} setRole={setRole} />

        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-4 items-stretch border backdrop-blur-xl rounded-2xl p-3 sm:p-4 shadow-xl ${
          theme === "dark" ? "bg-slate-800/60 border-slate-700/60" : "bg-slate-50/90 border-slate-200/90 shadow-slate-200/50"
        }`}>
          {/* Inputs — 5 columns */}
          <div className="lg:col-span-5">
            {role === "prosumer" ? (
              <CalculatorProsumerInputs
                systemCapacity={systemCapacity}
                setSystemCapacity={setSystemCapacity}
                surplusExport={surplusExport}
                setSurplusExport={setSurplusExport}
              />
            ) : (
              <CalculatorConsumerInputs
                consumerUsage={consumerUsage}
                setConsumerUsage={setConsumerUsage}
              />
            )}
          </div>

          {/* Results — 7 columns */}
          <div className="lg:col-span-7">
            <CalculatorResults
              role={role}
              monthlyP2PRevenue={monthlyP2PRevenue}
              monthlySavings={monthlySavings}
              annualBonusP2PEarning={annualBonusP2PEarning}
              annualSavings={annualSavings}
              monthlyGenKwh={monthlyGenKwh}
              estimatedUnits={estimatedUnits}
              annualCo2OffsetTons={annualCo2OffsetTons}
              treesEquivalent={treesEquivalent}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
