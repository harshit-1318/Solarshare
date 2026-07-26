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
    <div className={`lg:col-span-7 rounded-2xl p-4 sm:p-5 relative overflow-hidden backdrop-blur-xl border transition-all duration-300 shadow-md ${
      theme === "dark"
        ? "bg-slate-900/90 border-slate-800 text-white shadow-emerald-950/20"
        : "bg-slate-50/90 border-slate-200 text-slate-900 shadow-slate-200/80"
    }`}>
      <div className={`absolute top-0 right-0 w-48 h-48 rounded-full blur-3xl pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-200/40"
      }`} />

      <div className="relative z-10">
        <div className="flex items-center gap-2 mb-1">
          <span className="px-2.5 py-0.5 rounded-full bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 text-[10px] font-extrabold flex items-center gap-1 uppercase tracking-wider">
            <Sparkles size={11} /> Grid Updates
          </span>
        </div>

        <h4 className={`font-heading text-base sm:text-lg font-black flex items-center gap-2 ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
          <Mail size={18} className="text-emerald-500" /> Subscribe to Solar Energy Tariff Insights
        </h4>

        <p className={`text-xs mt-0.5 max-w-xl font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
          Get weekly CERC regulatory updates, state DISCOM net-metering news, and real P2P tariff rates delivered to your inbox.
        </p>

        {subscribed ? (
          <div className="mt-3 bg-emerald-500/15 border border-emerald-500/30 text-emerald-500 p-2.5 rounded-xl text-xs font-bold flex items-center gap-2 shadow-sm animate-fadeIn">
            <CheckCircle2 size={16} className="shrink-0 text-emerald-400" />
            <span>Thank you! You are now subscribed to SolarShare Tariff Insights.</span>
          </div>
        ) : (
          <form onSubmit={handleNewsletter} className="mt-3 flex flex-col sm:flex-row gap-2">
            <input
              type="email"
              required
              placeholder="Enter your email address (e.g. user@gmail.com)..."
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`flex-1 rounded-xl px-3.5 py-2 text-xs font-medium border focus:border-emerald-500 focus:outline-none transition ${
                theme === "dark"
                  ? "bg-slate-950/80 border-slate-700 text-white placeholder-slate-400 focus:ring-1 focus:ring-emerald-500"
                  : "bg-white border-slate-300 text-slate-900 placeholder-slate-400 shadow-sm focus:ring-1 focus:ring-emerald-500"
              }`}
            />
            <button
              type="submit"
              className="bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs px-5 py-2 rounded-xl transition duration-200 shadow-md shadow-emerald-500/25 flex items-center justify-center gap-1.5 shrink-0 active:scale-95"
            >
              Subscribe <Send size={13} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}


