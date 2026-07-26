import React from "react";
import { ShieldCheck, Github, Twitter, Linkedin, MessageCircle } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

const SOCIAL_LINKS = [
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: MessageCircle, href: "https://discord.com", label: "Discord" },
];

export default function FooterBrandOverview() {
  const { theme } = useTheme();

  return (
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
        {SOCIAL_LINKS.map((s, i) => {
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
  );
}
