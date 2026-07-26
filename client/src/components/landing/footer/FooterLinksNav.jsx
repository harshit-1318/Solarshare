import React from "react";
import { Zap, ShieldCheck, Building2, HelpCircle } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";
import FooterNavColumn from "./FooterNavColumn.jsx";

export default function FooterLinksNav() {
  const { theme } = useTheme();

  const platformItems = [
    { label: "P2P Energy Trading Engine", href: "#features" },
    { label: "Solar Yield & ROI Calculator", href: "#calculator" },
    { label: "Live Smart Grid Telemetry", href: "#grid-flow" },
    { label: "Peer Energy Marketplace", to: "/marketplace", isRoute: true, hasExternalIcon: true, className: "font-extrabold text-emerald-500" },
    { label: "Environmental Impact Report", href: "#impact" },
  ];

  const discoms = [
    { name: "BESCOM (Karnataka)" },
    { name: "MSEDCL (Maharashtra)" },
    { name: "Tata Power (MH / DL)" },
    { name: "BSES Rajdhani / Yamuna" },
    { name: "TSSPDCL / TANGEDCO" },
  ];

  const regulatoryItems = [
    { label: "CERC P2P Energy Regulations", href: "#faq" },
    { label: "Verified Carbon Credit Offset", href: "#impact" },
    { label: "Bi-Directional Net-Meter API", href: "#features" },
    { label: "Instant UPI Direct Settlement", href: "#how-it-works" },
    { label: "Direct Grid Power Buyback", href: "#calculator" },
  ];

  const supportItems = [
    { label: "Prosumer & Buyer Sign In", to: "/login", isRoute: true, className: "font-semibold" },
    { label: "Register Solar Rooftop", to: "/register", isRoute: true, className: "font-bold text-emerald-500" },
    { label: "24/7 Grid Support Desk", to: "/support", isRoute: true, hasExternalIcon: true, className: "text-emerald-500 font-extrabold" },
    { label: "Knowledge Base FAQ", href: "#faq" },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8 lg:gap-12">
      <FooterNavColumn title="Platform Features" icon={Zap} titleColor="text-emerald-500" items={platformItems} />

      <div>
        <h4 className="text-xs sm:text-sm font-black uppercase tracking-wider text-teal-500 mb-2.5 flex items-center gap-1.5">
          <Building2 size={15} /> DISCOM Net-Metering
        </h4>
        <ul className={`space-y-1.5 sm:space-y-2 text-xs sm:text-[13px] font-semibold ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
          {discoms.map((d, i) => (
            <li key={i} className="flex items-center justify-between">
              <span className={theme === "dark" ? "text-slate-300 font-semibold" : "text-slate-700 font-semibold"}>{d.name}</span>
              <span className={`text-[10px] px-2 py-0.5 rounded-full font-mono font-extrabold inline-flex items-center gap-1 border ${
                theme === "dark"
                  ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30"
                  : "bg-emerald-100 text-emerald-800 border-emerald-300"
              }`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                Active
              </span>
            </li>
          ))}
        </ul>
      </div>

      <FooterNavColumn title="Regulatory Standards" icon={ShieldCheck} titleColor="text-cyan-500" items={regulatoryItems} />
      <FooterNavColumn title="Account & Support" icon={HelpCircle} titleColor="text-amber-500" items={supportItems} />
    </div>
  );
}

