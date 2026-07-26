import React from "react";
import { Link } from "react-router-dom";
import { ShieldCheck, Heart, Zap, Github, Twitter, Linkedin, MessageCircle } from "lucide-react";
import FooterLinksNav from "./FooterLinksNav.jsx";
import FooterNewsletterCard from "./FooterNewsletterCard.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function Footer() {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`relative overflow-hidden border-t h-[calc(100vh-73px)] max-h-[calc(100vh-73px)] flex flex-col justify-between py-2.5 sm:py-3.5 transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-950 text-white border-slate-800/80" : "bg-white text-slate-900 border-slate-200"
    }`}>
      {/* Background Mesh Glow Effects */}
      <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-100/60"
      }`} />
      <div className={`absolute top-0 left-10 w-[400px] h-[400px] rounded-full blur-[160px] pointer-events-none ${
        theme === "dark" ? "bg-teal-500/10" : "bg-teal-100/50"
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-between space-y-2">
        {/* Top Grid: Brand Overview & Newsletter Card */}
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-5 pb-3 border-b ${
          theme === "dark" ? "border-slate-800/80" : "border-slate-200/90"
        }`}>
          {/* Left Column: Platform Overview & Live Badges */}
          <div className="lg:col-span-5 space-y-2">
            <div className="space-y-1">
              <h3 className={`font-heading text-xl sm:text-2xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Decentralized <span className="text-emerald-500">P2P Solar Network</span>
              </h3>
              <p className="text-xs sm:text-[13px] font-extrabold text-emerald-500 uppercase tracking-wider">
                India's Next-Gen Clean Energy Infrastructure
              </p>
            </div>

            <p className={`text-xs sm:text-sm leading-relaxed max-w-md font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
              India's premier decentralized solar energy marketplace. Enabling rooftop prosumers to sell surplus green power directly to local consumers at fair market rates.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold border ${
                theme === "dark"
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400 shadow-sm shadow-emerald-950/40"
                  : "bg-emerald-100/90 border-emerald-200 text-emerald-800 shadow-sm"
              }`}>
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                All 5 DISCOM Smart Grids Operational
              </span>
              <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-[11px] font-bold border ${
                theme === "dark"
                  ? "bg-teal-500/10 border-teal-500/20 text-teal-300"
                  : "bg-teal-100/80 border-teal-200 text-teal-800"
              }`}>
                <ShieldCheck size={13} className="text-teal-400" /> CERC Grid Compliant
              </span>
            </div>

            {/* Social Links */}
            <div className="flex items-center gap-2 pt-1">
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-slate-400 mr-1">Connect:</span>
              {[
                { icon: Github, href: "https://github.com", label: "GitHub" },
                { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
                { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
                { icon: MessageCircle, href: "https://discord.com", label: "Discord" },
              ].map((s, i) => {
                const Icon = s.icon;
                return (
                  <a
                    key={i}
                    href={s.href}
                    target="_blank"
                    rel="noreferrer"
                    title={s.label}
                    className={`h-7.5 w-7.5 rounded-xl border flex items-center justify-center transition duration-200 hover:scale-110 active:scale-95 ${
                      theme === "dark"
                        ? "bg-slate-900/90 border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40 hover:bg-emerald-500/10"
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-300 hover:bg-emerald-50"
                    }`}
                  >
                    <Icon size={14} />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterNewsletterCard />
        </div>

        {/* Middle Navigation Columns */}
        <div className={`py-2 border-b ${theme === "dark" ? "border-slate-800/80" : "border-slate-200/90"}`}>
          <FooterLinksNav />
        </div>

        {/* Bottom Legal & Country Badge */}
        <div className={`pt-1 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-semibold ${
          theme === "dark" ? "text-slate-400" : "text-slate-600"
        }`}>
          <p>© {new Date().getFullYear()} SolarShare Technologies Pvt. Ltd. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-3.5 text-[11px]">
            <a href="#faq" className="hover:text-emerald-500 transition">Terms of Service</a>
            <span>•</span>
            <a href="#faq" className="hover:text-emerald-500 transition">Privacy Policy</a>
            <span>•</span>
            <a href="#faq" className="hover:text-emerald-500 transition">CERC Guidelines</a>
            <span>•</span>
            <span className={`flex items-center gap-1.5 font-bold ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
              <span>🇮🇳</span> Empowering Clean Energy in India <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse ml-0.5" />
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}



