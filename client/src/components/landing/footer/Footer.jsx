import React from "react";
import FooterBrandOverview from "./FooterBrandOverview.jsx";
import FooterLinksNav from "./FooterLinksNav.jsx";
import FooterNewsletterCard from "./FooterNewsletterCard.jsx";
import FooterBottomBar from "./FooterBottomBar.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function Footer() {
  const { theme } = useTheme();

  return (
    <footer className={`relative overflow-hidden border-t py-8 sm:py-12 transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-950 text-white border-slate-800/80" : "bg-white text-slate-900 border-slate-200"
    }`}>
      {/* Background Mesh Glow Effects */}
      <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-100/60"
      }`} />
      <div className={`absolute top-0 left-10 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none ${
        theme === "dark" ? "bg-teal-500/10" : "bg-teal-100/50"
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-between space-y-6">
        {/* Top Grid: Brand Overview & Newsletter Card */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-5 pb-3 border-b ${
          theme === "dark" ? "border-slate-800/80" : "border-slate-200/90"
        }`}>
          <FooterBrandOverview />
          <FooterNewsletterCard />
        </div>

        {/* Middle Navigation Columns */}
        <div className={`py-2 border-b ${theme === "dark" ? "border-slate-800/80" : "border-slate-200/90"}`}>
          <FooterLinksNav />
        </div>

        {/* Bottom Legal & Country Badge */}
        <FooterBottomBar />
      </div>
    </footer>
  );
}
