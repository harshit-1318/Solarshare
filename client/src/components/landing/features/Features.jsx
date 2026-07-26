import React, { useState } from "react";
import FeaturesCardsGrid from "./FeaturesCardsGrid.jsx";
import FeaturesHeader from "./FeaturesHeader.jsx";
import { allFeatures } from "./FeaturesData.js";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function Features() {
  const [filter, setFilter] = useState("all");
  const { theme } = useTheme();

  const filteredFeatures = filter === "all" ? allFeatures : allFeatures.filter((f) => f.category === filter);

  return (
    <section id="features" className={`relative overflow-hidden py-6 sm:py-8 min-h-[calc(100vh-73px)] flex flex-col justify-center border-t border-b scroll-mt-[72px] transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-900 border-slate-200"
    }`}>
      <div className={`absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-60 pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-100"
      }`} />
      <div className={`absolute bottom-0 left-0 w-96 h-96 rounded-full blur-3xl opacity-60 pointer-events-none ${
        theme === "dark" ? "bg-teal-500/10" : "bg-teal-100"
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full">
        <FeaturesHeader filter={filter} setFilter={setFilter} />

        <FeaturesCardsGrid filteredFeatures={filteredFeatures} />
      </div>
    </section>
  );
}
