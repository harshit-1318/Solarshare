import React from "react";
import { ShieldCheck, Award, Info } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function ImpactDetailSpecs() {
  const { theme } = useTheme();

  return (
    <div className={`border rounded-xl p-3 sm:p-3.5 grid grid-cols-1 md:grid-cols-3 gap-3 text-xs transition-colors ${
      theme === "dark"
        ? "bg-slate-950/90 border-slate-800 text-white"
        : "bg-slate-50 border-slate-200 text-slate-900 shadow-sm"
    }`}>
      <div className="flex items-start gap-2.5">
        <ShieldCheck size={17} className="text-emerald-500 shrink-0 mt-0.5" />
        <div>
          <h5 className={`font-extrabold text-xs sm:text-sm ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            CERC Compliance Standard
          </h5>
          <p className={`mt-0.5 text-xs leading-normal font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            Calculated following Central Electricity Regulatory Commission peer net-metering formulas.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <Award size={17} className="text-teal-500 shrink-0 mt-0.5" />
        <div>
          <h5 className={`font-extrabold text-xs sm:text-sm ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Verified Carbon Token Offset
          </h5>
          <p className={`mt-0.5 text-xs leading-normal font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            100% auditable carbon credit tokens issued directly to registered solar prosumers.
          </p>
        </div>
      </div>

      <div className="flex items-start gap-2.5">
        <Info size={17} className="text-cyan-500 shrink-0 mt-0.5" />
        <div>
          <h5 className={`font-extrabold text-xs sm:text-sm ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
            Zero Line Transmission Loss
          </h5>
          <p className={`mt-0.5 text-xs leading-normal font-medium ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
            Direct local consumption eliminates up to 14% high-voltage grid transmission energy loss.
          </p>
        </div>
      </div>
    </div>
  );
}



