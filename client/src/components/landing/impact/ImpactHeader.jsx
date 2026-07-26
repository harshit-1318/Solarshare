import React from "react";
import { Leaf } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function ImpactHeader({ selectedState, setSelectedState }) {
  const { theme } = useTheme();

  return (
    <div className="text-center max-w-3xl mx-auto mb-1">
      <div className={`inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full border text-xs font-bold uppercase tracking-widest mb-1 ${
        theme === "dark" ? "bg-emerald-500/10 border-emerald-500/20 text-emerald-400" : "bg-emerald-100 border-emerald-200 text-emerald-800"
      }`}>
        <Leaf size={14} className={theme === "dark" ? "text-emerald-400" : "text-emerald-600"} /> Environmental Sustainability Report
      </div>

      <h2 className={`font-heading text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
        Real Impact On Our <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-300">Planet's Future</span>
      </h2>

      <p className={`mt-0.5 text-xs sm:text-sm max-w-xl mx-auto font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
        Real-time sustainability metrics generated from P2P solar trading across India's DISCOM grids.
      </p>

      {/* State Filter Pills */}
      <div className="mt-2 flex flex-wrap items-center justify-center gap-2">
        {[
          { id: "all", label: "National Total (India)" },
          { id: "KA", label: "Karnataka" },
          { id: "MH", label: "Maharashtra" },
          { id: "DL", label: "Delhi NCR" },
          { id: "TN", label: "Tamil Nadu" },
        ].map((st) => (
          <button
            key={st.id}
            onClick={() => setSelectedState(st.id)}
            className={`px-3.5 py-1.5 rounded-xl text-xs sm:text-sm font-extrabold transition duration-200 ${
              selectedState === st.id
                ? "bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20 scale-105"
                : theme === "dark"
                ? "bg-slate-800/90 text-slate-300 hover:text-white border border-slate-700/80"
                : "bg-slate-100 text-slate-700 hover:text-slate-900 border border-slate-200"
            }`}
          >
            {st.label}
          </button>
        ))}
      </div>
    </div>
  );
}





