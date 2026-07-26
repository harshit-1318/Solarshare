import React from "react";
import { Link } from "react-router-dom";
import { Sun, ShieldCheck, Heart, Zap, Github, Twitter, Linkedin, MessageCircle } from "lucide-react";
import FooterLinksNav from "./FooterLinksNav.jsx";
import FooterNewsletterCard from "./FooterNewsletterCard.jsx";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function Footer() {
  const { theme } = useTheme();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <footer className={`relative overflow-hidden border-t h-[calc(100vh-73px)] max-h-[calc(100vh-73px)] flex flex-col justify-between py-3 sm:py-4 transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-950 text-white border-slate-800" : "bg-white text-slate-900 border-slate-200"
    }`}>
      {/* Background Radial Glow */}
      <div className={`absolute bottom-0 right-1/4 w-[500px] h-[500px] rounded-full blur-[160px] pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-100/50"
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full h-full flex flex-col justify-between space-y-2">
        <div className={`grid grid-cols-1 lg:grid-cols-12 gap-6 pb-3.5 border-b ${
          theme === "dark" ? "border-slate-800" : "border-slate-200"
        }`}>
          <div className="lg:col-span-5 space-y-2">
            <Link to="/" onClick={scrollToTop} className="flex items-center gap-2.5 group shrink-0">
              <div className={`flex h-9 w-9 items-center justify-center rounded-xl border shadow-md ${
                theme === "dark" ? "bg-emerald-500/20 border-emerald-500/30 text-emerald-400" : "bg-emerald-100 border-emerald-200 text-emerald-700"
              }`}>
                <Sun size={20} className="fill-amber-400 animate-spin-slow" />
              </div>
              <span className={`font-heading text-xl sm:text-2xl font-black tracking-tight ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Solar<span className="text-emerald-500">Share</span>
              </span>
            </Link>

            <p className={`text-xs leading-relaxed max-w-md font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
              India's premier peer-to-peer solar energy trading platform. Enabling rooftop solar owners to sell clean power directly to local consumers at fair prices.
            </p>

            <div className="flex flex-wrap items-center gap-2 pt-0.5">
              <span className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                theme === "dark"
                  ? "bg-emerald-500/15 border-emerald-500/30 text-emerald-400"
                  : "bg-emerald-100 border-emerald-200 text-emerald-800"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-ping" />
                All 5 DISCOM Smart Grids Operational
              </span>
              <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
                theme === "dark"
                  ? "bg-teal-500/10 border-teal-500/20 text-teal-300"
                  : "bg-teal-100 border-teal-200 text-teal-800"
              }`}>
                <ShieldCheck size={12} /> CERC Grid Compliant
              </span>
            </div>

            {/* Social Icons */}
            <div className="flex items-center gap-2 pt-1">
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
                    className={`h-7 w-7 rounded-lg border flex items-center justify-center transition duration-200 hover:scale-110 ${
                      theme === "dark"
                        ? "bg-slate-900 border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/40"
                        : "bg-slate-100 border-slate-200 text-slate-600 hover:text-emerald-600 hover:border-emerald-300"
                    }`}
                  >
                    <Icon size={13} />
                  </a>
                );
              })}
            </div>
          </div>

          <FooterNewsletterCard />
        </div>

        <div className={`py-2.5 border-b ${theme === "dark" ? "border-slate-800" : "border-slate-200"}`}>
          <FooterLinksNav />
        </div>

        <div className={`pt-1.5 flex flex-col sm:flex-row items-center justify-between gap-2.5 text-xs font-semibold ${
          theme === "dark" ? "text-slate-400" : "text-slate-600"
        }`}>
          <p>© {new Date().getFullYear()} SolarShare Technologies Pvt. Ltd. All rights reserved.</p>

          <div className="flex flex-wrap items-center gap-4 text-[11px]">
            <a href="#faq" className="hover:text-emerald-500 transition">Terms of Service</a>
            <span>•</span>
            <a href="#faq" className="hover:text-emerald-500 transition">Privacy Policy</a>
            <span>•</span>
            <a href="#faq" className="hover:text-emerald-500 transition">CERC Guidelines</a>
            <span>•</span>
            <span className={`flex items-center gap-1 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
              Made with <Heart size={12} className="text-rose-500 fill-rose-500 animate-pulse" /> for Clean Energy in India
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}



