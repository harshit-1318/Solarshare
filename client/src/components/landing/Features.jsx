import { useState } from "react";
import { Zap, Shield, Leaf, Cpu, Globe, TrendingUp, Sun } from "lucide-react";
import FeatureCardsGrid from "./FeatureCardsGrid.jsx";

const allFeatures = [
  { category: "prosumer", icon: Zap, iconBg: "bg-amber-50 text-amber-500", title: "Real-Time P2P Trading", desc: "Instant peer-to-peer energy matching with automated smart contract discovery and zero manual hassle." },
  { category: "security", icon: Shield, iconBg: "bg-blue-50 text-blue-600", title: "Bank-Grade Ledger Security", desc: "Every trade is secured with 256-bit encryption and immutable transaction logs for 100% dispute protection." },
  { category: "prosumer", icon: Leaf, iconBg: "bg-emerald-50 text-emerald-600", title: "Automated Carbon Credits", desc: "Earn and trade verified carbon offset credits for every kilowatt-hour of clean solar energy generated." },
  { category: "prosumer", icon: TrendingUp, iconBg: "bg-purple-50 text-purple-600", title: "AI Dynamic Pricing Engine", desc: "Smart pricing algorithm optimizes your selling rates based on real-time neighborhood demand spikes." },
  { category: "consumer", icon: Cpu, iconBg: "bg-teal-50 text-teal-600", title: "Smart Meter Direct Sync", desc: "Seamless integration with DISCOM smart meters for automatic meter reading and live billing balances." },
  { category: "consumer", icon: Globe, iconBg: "bg-indigo-50 text-indigo-600", title: "Neighborhood Clean Grid", desc: "Buy 100% locally produced clean solar power from neighbors in your pincode at up to 30% discount." },
];

export default function Features() {
  const [filter, setFilter] = useState("all");

  const filteredFeatures = filter === "all" ? allFeatures : allFeatures.filter((f) => f.category === filter);

  return (
    <section id="features" className="py-20 lg:py-28 bg-white relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-widest mb-4">
            <Sun size={14} /> Built For Modern Energy Networks
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Why Choose <span className="text-emerald-600">SolarShare?</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            The most complete, transparent, and user-friendly peer-to-peer solar trading platform.
          </p>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            <button onClick={() => setFilter("all")} className={`px-5 py-2.5 rounded-full text-xs font-bold transition duration-300 ${filter === "all" ? "bg-slate-900 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              All Features
            </button>
            <button onClick={() => setFilter("prosumer")} className={`px-5 py-2.5 rounded-full text-xs font-bold transition duration-300 ${filter === "prosumer" ? "bg-emerald-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              For Solar Owners (Prosumers)
            </button>
            <button onClick={() => setFilter("consumer")} className={`px-5 py-2.5 rounded-full text-xs font-bold transition duration-300 ${filter === "consumer" ? "bg-emerald-600 text-white shadow-md" : "bg-slate-100 text-slate-600 hover:bg-slate-200"}`}>
              For Power Buyers (Consumers)
            </button>
          </div>
        </div>

        <FeatureCardsGrid filteredFeatures={filteredFeatures} />
      </div>
    </section>
  );
}
