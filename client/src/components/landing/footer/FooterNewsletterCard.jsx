import React, { useState } from "react";
import { Mail, Send, CheckCircle2, Sparkles } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function FooterNewsletterCard() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);
  const { theme } = useTheme();

  const handleNewsletter = (e) => {
    e.preventDefault();
    if (email && email.includes("@")) {
      setSubscribed(true);
      try {
        localStorage.setItem("solarshare_newsletter_sub", email);
      } catch (err) {
        console.error("Storage error:", err);
      }
      setEmail("");
    }
  };

  return (
    <div className={`lg:col-span-7 rounded-2xl p-4 sm:p-5 relative overflow-hidden backdrop-blur-xl border transition-all duration-300 shadow-xl ${
      theme === "dark"
        ? "bg-gradient-to-br from-slate-900/90 via-slate-900/80 to-slate-950/90 border-slate-800 text-white shadow-emerald-950/30"
        : "bg-gradient-to-br from-slate-50 via-white to-emerald-50/30 border-slate-200/90 text-slate-900 shadow-slate-200/90"
    }`}>
      {/* Background Mesh Glow Effects */}
      <div className={`absolute top-0 right-0 w-56 h-56 rounded-full blur-3xl pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/15" : "bg-emerald-200/50"
      }`} />
      <div className={`absolute bottom-0 left-10 w-40 h-40 rounded-full blur-3xl pointer-events-none ${
        theme === "dark" ? "bg-teal-500/10" : "bg-teal-200/40"
      }`} />

      <div className="relative z-10">
        <div className="flex items-center justify-between gap-2 mb-1.5 flex-wrap">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 text-[10px] font-extrabold flex items-center gap-1 uppercase tracking-wider">
            <Sparkles size={11} className="text-emerald-400" /> Weekly Tariff Intelligence
          </span>
          <span className={`text-[11px] font-extrabold ${theme === "dark" ? "text-slate-400" : "text-slate-500"}`}>
            ⚡ Join 12,400+ Active Subscribers
          </span>
        </div>

        <h4 className={`font-heading text-lg sm:text-xl font-black flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          <Mail size={20} className="text-emerald-500 shrink-0" /> Subscribe to Solar Energy Tariff Insights
        </h4>

        <p className={`text-xs sm:text-sm mt-1 max-w-xl font-medium leading-relaxed ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
          Get weekly CERC regulatory updates, state DISCOM net-metering news, and real-time P2P tariff rates delivered directly to your inbox.
        </p>

        {subscribed ? (
          <div className="mt-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-400 p-3 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fadeIn">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <span>Thank you! You are now subscribed to SolarShare Tariff Insights.</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletter} className="mt-3.5 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address (e.g. user@gmail.com)..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-1 rounded-xl px-4 py-2.5 text-xs font-medium border focus:border-emerald-500 focus:outline-none transition ${
                theme === "dark"
                  ? "bg-slate-950/90 border-slate-700/80 text-white placeholder-slate-400 focus:ring-2 focus:ring-emerald-500/30"
                  : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-2 focus:ring-emerald-500/30"
              }`}
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-6 py-2.5 rounded-xl transition duration-200 shadow-lg shadow-emerald-500/25 flex items-center justify-center gap-1.5 shrink-0 active:scale-95 cursor-pointer"
            >
              Subscribe Free <Send size={13} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


