import { useState } from "react";
import { Sun, Check, TrendingUp, Leaf } from "lucide-react";

export default function HeroMockupCard() {
  const [activeTab, setActiveTab] = useState("live");

  return (
    <div className="relative mt-6 lg:mt-0 lg:col-span-5 flex justify-center">
      <div className="absolute -inset-2 rounded-3xl bg-gradient-to-r from-emerald-500 to-teal-400 opacity-20 blur-xl animate-pulse" />

      <div className="relative w-full max-w-[440px] rounded-3xl bg-[#0f172a] p-6 sm:p-7 shadow-2xl text-slate-300 border border-slate-800">
        <div className="flex items-center justify-between border-b border-slate-800 pb-4">
          <div className="flex items-center gap-3">
            <span className="flex h-8 w-8 items-center justify-center rounded-xl bg-emerald-600 text-white shadow-md">
              <Sun size={18} className="fill-white animate-spin-slow" />
            </span>
            <div>
              <span className="font-heading text-sm font-bold text-white block">Live P2P Node</span>
              <span className="text-[10px] text-slate-400">Bangalore Smart Grid Zone 4</span>
            </div>
          </div>

          <div className="flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-semibold text-emerald-400 border border-emerald-500/20">
            <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" /> Live Trading
          </div>
        </div>

        <div className="mt-4 flex rounded-xl bg-slate-800/60 p-1 text-xs font-semibold">
          <button onClick={() => setActiveTab("live")} className={`flex-1 py-1.5 rounded-lg text-center transition ${activeTab === "live" ? "bg-emerald-600 text-white shadow" : "text-slate-400"}`}>Generation Graph</button>
          <button onClick={() => setActiveTab("stats")} className={`flex-1 py-1.5 rounded-lg text-center transition ${activeTab === "stats" ? "bg-emerald-600 text-white shadow" : "text-slate-400"}`}>Live Earnings</button>
        </div>

        {activeTab === "live" ? (
          <>
            <div className="relative my-6 flex h-28 items-end justify-center">
              <svg className="absolute bottom-0 w-full h-full" viewBox="0 0 300 90" fill="none">
                <path d="M0,80 C60,80 90,15 150,15 C210,15 240,80 300,80" stroke="#10B981" strokeWidth="3.5" strokeLinecap="round" fill="none" />
                <path d="M0,80 C60,80 90,15 150,15 C210,15 240,80 300,80 L300,90 L0,90 Z" fill="url(#waveGradient)" opacity="0.15" />
                <defs><linearGradient id="waveGradient" x1="0" y1="0" x2="0" y2="1"><stop offset="0%" stopColor="#10B981" /><stop offset="100%" stopColor="#10B981" stopOpacity="0" /></linearGradient></defs>
              </svg>
              <div className="absolute top-[8px] left-[143px] flex flex-col items-center">
                <div className="h-3 w-3 rounded-full bg-emerald-400 ring-4 ring-emerald-500/30 animate-pulse" />
                <span className="mt-1 bg-slate-900/90 text-emerald-400 text-[10px] font-bold px-2 py-0.5 rounded border border-emerald-500/30">Peak: 6.4 kW</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3.5">
              <div className="rounded-2xl bg-slate-800/40 border border-slate-800 p-3.5"><p className="text-[10px] uppercase text-slate-400">Solar Output</p><p className="mt-1 font-heading text-lg font-bold text-white">5.8 kW</p></div>
              <div className="rounded-2xl bg-slate-800/40 border border-slate-800 p-3.5"><p className="text-[10px] uppercase text-slate-400">Revenue Today</p><p className="mt-1 font-heading text-lg font-bold text-emerald-400">₹945.00</p></div>
              <div className="rounded-2xl bg-slate-800/40 border border-slate-800 p-3.5"><p className="text-[10px] uppercase text-slate-400">CO₂ Avoided</p><p className="mt-1 font-heading text-lg font-bold text-indigo-400">3.2 kg</p></div>
              <div className="rounded-2xl bg-slate-800/40 border border-slate-800 p-3.5"><p className="text-[10px] uppercase text-slate-400">Active Buyers</p><p className="mt-1 font-heading text-lg font-bold text-white">4 Nearby</p></div>
            </div>
          </>
        ) : (
          <div className="my-6 space-y-3">
            <div className="rounded-2xl bg-slate-800/50 p-4 border border-slate-700/60 flex items-center justify-between">
              <div><p className="text-xs text-slate-400">Total Month Earning</p><p className="text-2xl font-bold text-emerald-400">₹12,450.00</p></div>
              <TrendingUp size={28} className="text-emerald-400" />
            </div>
            <div className="rounded-2xl bg-slate-800/50 p-3 border border-slate-700/60 flex justify-between text-xs"><span className="text-slate-400">Carbon Credits</span><span className="text-emerald-400 font-bold">+18.5 CC (₹1,850)</span></div>
          </div>
        )}

        <div className="absolute -right-5 -top-5 hidden sm:flex items-center gap-3 rounded-2xl bg-white p-3.5 shadow-2xl border border-slate-100">
          <span className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700"><Check size={16} /></span>
          <div><p className="text-xs font-bold text-slate-900">P2P Trade Completed!</p><p className="text-[10px] font-semibold text-emerald-600">+₹285.00 Instant Credit</p></div>
        </div>
      </div>
    </div>
  );
}
