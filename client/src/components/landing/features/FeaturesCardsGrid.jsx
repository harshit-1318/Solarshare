import React, { useState } from "react";
import { ArrowRight, Info } from "lucide-react";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext.jsx";
import FeaturesSpecsModal from "./FeaturesSpecsModal.jsx";

export default function FeaturesCardsGrid({ filteredFeatures }) {
  const [activeModalFeature, setActiveModalFeature] = useState(null);
  const { theme } = useTheme();

  return (
    <div className="mt-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4">
        {filteredFeatures.map((feature, idx) => {
          const Icon = feature.icon;
          return (
            <div
              key={idx}
              className={`group relative rounded-2xl border p-3.5 sm:p-4 shadow-md transition-all duration-300 flex flex-col justify-between ${
                theme === "dark"
                  ? "border-slate-800 bg-slate-900/90 text-white hover:border-emerald-500/50 hover:shadow-emerald-500/10"
                  : "border-slate-200/90 bg-white text-slate-900 hover:border-emerald-500/50 hover:shadow-emerald-500/10"
              }`}
            >
              <div>
                <div className="flex items-center justify-between">
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${feature.iconBg} shadow-sm group-hover:scale-105 transition duration-300`}>
                    <Icon size={18} />
                  </div>
                  <span className={`text-[9px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full border ${
                    theme === "dark"
                      ? "bg-slate-800 text-slate-300 border-slate-700"
                      : "bg-slate-100 text-slate-600 border-slate-200"
                  }`}>
                    {feature.category === "prosumer" ? "Solar Owner" : feature.category === "consumer" ? "Power Buyer" : "Security"}
                  </span>
                </div>

                <h3 className={`mt-2.5 font-heading text-sm sm:text-base font-bold transition ${
                  theme === "dark" ? "text-white group-hover:text-emerald-400" : "text-slate-900 group-hover:text-emerald-600"
                }`}>
                  {feature.title}
                </h3>

                <p className={`mt-1 text-xs leading-relaxed font-normal line-clamp-2 ${
                  theme === "dark" ? "text-slate-400" : "text-slate-600"
                }`}>
                  {feature.desc}
                </p>
              </div>

              <div className={`mt-3.5 pt-2.5 border-t flex items-center justify-between text-xs font-semibold ${
                theme === "dark" ? "border-slate-800" : "border-slate-100"
              }`}>
                <button
                  onClick={() => setActiveModalFeature(feature)}
                  className={`flex items-center gap-1 transition ${
                    theme === "dark" ? "text-slate-400 hover:text-emerald-400" : "text-slate-600 hover:text-emerald-600"
                  }`}
                >
                  <Info size={13} /> Learn Specs
                </button>

                <Link
                  to="/register"
                  className={`inline-flex items-center gap-1 font-bold group-hover:translate-x-1 transition duration-200 ${
                    theme === "dark" ? "text-emerald-400" : "text-emerald-600"
                  }`}
                >
                  Try Feature <ArrowRight size={13} />
                </Link>
              </div>
            </div>
          );
        })}
      </div>

      <FeaturesSpecsModal
        activeModalFeature={activeModalFeature}
        setActiveModalFeature={setActiveModalFeature}
      />
    </div>
  );
}
