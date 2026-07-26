import React, { useState, useEffect } from "react";
import {
  Header,
  SideSectionNav,
  Hero,
  Features,
  GridFlowPreview,
  SavingsCalculator,
  HowItWorks,
  ImpactTracker,
  FAQ,
  Footer,
  LiveTradeToast
} from "../components/landing";
import { useTheme } from "../context/ThemeContext.jsx";
import { ArrowUp } from "lucide-react";

export default function Landing() {
  const { theme } = useTheme();
  const [showScrollTop, setShowScrollTop] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className={`min-h-screen font-body antialiased selection:bg-emerald-500 selection:text-white relative transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-950 text-slate-100" : "bg-white text-slate-900"
    }`}>
      <Header />
      <SideSectionNav />
      <main>
        <Hero />
        <Features />
        <HowItWorks />
        <GridFlowPreview />
        <SavingsCalculator />
        <ImpactTracker />
        <FAQ />
      </main>
      <Footer />
      <LiveTradeToast />

      {/* Floating Smooth Scroll-to-Top Button */}
      {showScrollTop && (
        <button
          onClick={scrollToTop}
          aria-label="Scroll to top"
          className={`fixed bottom-6 right-6 z-40 p-3 rounded-full border shadow-xl transition-all duration-300 transform hover:scale-110 active:scale-95 animate-fadeIn ${
            theme === "dark"
              ? "bg-slate-900/90 border-slate-700 text-emerald-400 hover:bg-emerald-500 hover:text-slate-950 shadow-emerald-950/40"
              : "bg-white/90 border-slate-200 text-emerald-600 hover:bg-emerald-500 hover:text-white shadow-slate-300/80"
          }`}
        >
          <ArrowUp size={20} className="font-bold" />
        </button>
      )}
    </div>
  );
}


