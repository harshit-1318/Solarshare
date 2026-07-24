import { useState, useEffect } from "react";
import { Sun, Activity, MapPin } from "lucide-react";
import GridDiagramNodes from "./GridDiagramNodes.jsx";

const liveTradesMock = [
  { id: 1, seller: "Rajesh K.", location: "Bengaluru, KA", buyer: "Ananya M.", amount: "12.4 kWh", rate: "₹5.20", time: "Just now" },
  { id: 2, seller: "Suresh P.", location: "Pune, MH", buyer: "GreenEV Hub", amount: "25.0 kWh", rate: "₹5.80", time: "4s ago" },
  { id: 3, seller: "Vikram S.", location: "Hyderabad, TS", buyer: "Rohan G.", amount: "7.5 kWh", rate: "₹4.90", time: "8s ago" },
  { id: 4, seller: "Meera R.", location: "Chennai, TN", buyer: "Kavita D.", amount: "15.2 kWh", rate: "₹5.40", time: "12s ago" },
  { id: 5, seller: "Amitabh C.", location: "Noida, UP", buyer: "EcoTech Labs", amount: "40.0 kWh", rate: "₹6.10", time: "16s ago" },
];

export default function GridFlowPreview() {
  const [activeTradeIndex, setActiveTradeIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setActiveTradeIndex((prev) => (prev + 1) % liveTradesMock.length);
    }, 3500);
    return () => clearInterval(timer);
  }, []);

  const currentTrade = liveTradesMock[activeTradeIndex];

  return (
    <section id="grid-flow" className="py-20 bg-slate-900 text-white relative overflow-hidden border-t border-b border-slate-800">
      <div className="absolute top-1/2 left-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-blue-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10 relative z-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-4">
            <Activity size={14} className="animate-pulse" /> Live Smart Grid Architecture
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight sm:text-4xl lg:text-5xl text-white">
            Peer-to-Peer <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Energy Network</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-400">
            How excess clean solar power travels dynamically from rooftop solar panels to local neighbors with zero middleman markup.
          </p>
        </div>

        <div className="mt-10 mx-auto max-w-4xl bg-slate-800/80 border border-slate-700/60 backdrop-blur-lg rounded-2xl p-4 shadow-xl flex items-center justify-between gap-4 overflow-hidden">
          <div className="flex items-center gap-3 shrink-0">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-emerald-500"></span>
            </span>
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">Live P2P Stream</span>
          </div>

          <div className="flex items-center gap-4 text-xs sm:text-sm font-medium text-slate-200 truncate animate-fadeIn">
            <span className="font-bold text-white flex items-center gap-1.5">
              <Sun size={14} className="text-amber-400" /> {currentTrade.seller}
            </span>
            <span className="text-slate-500">➔</span>
            <span className="text-emerald-400 font-semibold">{currentTrade.amount} @ {currentTrade.rate}/unit</span>
            <span className="text-slate-500">➔</span>
            <span className="font-bold text-white">{currentTrade.buyer}</span>
            <span className="text-[11px] text-slate-400 bg-slate-700/50 px-2 py-0.5 rounded-full flex items-center gap-1">
              <MapPin size={10} /> {currentTrade.location}
            </span>
          </div>

          <span className="text-[11px] text-emerald-400/80 font-mono shrink-0 hidden sm:inline-block">
            {currentTrade.time}
          </span>
        </div>

        <GridDiagramNodes />
      </div>
    </section>
  );
}
