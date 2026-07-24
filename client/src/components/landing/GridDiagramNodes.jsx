import { Sun, Home, Cpu, ShieldCheck } from "lucide-react";

export default function GridDiagramNodes() {
  return (
    <div className="mt-12 bg-slate-950/70 border border-slate-800 rounded-3xl p-6 sm:p-10 shadow-2xl relative">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-center relative z-10">
        <div className="bg-slate-900/90 border border-emerald-500/30 rounded-2xl p-6 relative group hover:border-emerald-500/60 transition duration-300">
          <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-[11px] font-bold">
            1. Clean Solar Producer
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="h-14 w-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center text-amber-400 shadow-inner">
              <Sun size={30} className="animate-spin-slow" />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Prosumer Rooftop</h3>
              <p className="text-xs text-slate-400">Rooftop Solar Array • 5 kW</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>Current Output:</span>
              <span className="text-emerald-400 font-bold">4.8 kW</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Self Consumed:</span>
              <span className="text-white font-medium">1.2 kW</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Surplus Exported:</span>
              <span className="text-amber-400 font-bold">3.6 kW</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col items-center justify-center text-center relative py-4 lg:py-0">
          <div className="hidden lg:block absolute left-0 right-0 top-1/2 -translate-y-1/2 h-1 bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-500 opacity-30 -z-10" />

          <div className="h-20 w-20 rounded-3xl bg-gradient-to-br from-emerald-600 to-teal-700 p-0.5 shadow-2xl shadow-emerald-500/20 animate-pulse">
            <div className="h-full w-full bg-slate-900 rounded-[22px] flex flex-col items-center justify-center p-2">
              <Cpu size={28} className="text-emerald-400" />
              <span className="text-[10px] font-extrabold tracking-wider text-emerald-300 mt-1 uppercase">Smart Grid</span>
            </div>
          </div>

          <h4 className="mt-4 font-heading text-sm font-bold text-white">SolarShare Smart Ledger</h4>
          <p className="text-xs text-slate-400 mt-1 max-w-[220px]">
            Instant Smart Contract matching, DISCOM net-meter balancing, & UPI settlements.
          </p>

          <div className="mt-3 inline-flex items-center gap-1.5 text-[11px] font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1 rounded-full border border-emerald-500/20">
            <ShieldCheck size={13} /> 100% Automated Matching
          </div>
        </div>

        <div className="bg-slate-900/90 border border-teal-500/30 rounded-2xl p-6 relative group hover:border-teal-500/60 transition duration-300">
          <div className="absolute -top-3 left-6 px-3 py-0.5 rounded-full bg-teal-500/20 border border-teal-500/30 text-teal-300 text-[11px] font-bold">
            2. Neighborhood Consumer
          </div>

          <div className="flex items-center gap-4 mt-2">
            <div className="h-14 w-14 rounded-2xl bg-teal-500/10 border border-teal-500/20 flex items-center justify-center text-teal-300 shadow-inner">
              <Home size={28} />
            </div>
            <div>
              <h3 className="font-heading text-lg font-bold text-white">Clean Energy Buyer</h3>
              <p className="text-xs text-slate-400">Residential & EV Owners</p>
            </div>
          </div>

          <div className="mt-6 pt-4 border-t border-slate-800 space-y-2 text-xs">
            <div className="flex justify-between text-slate-400">
              <span>DISCOM Rate:</span>
              <span className="text-slate-400 line-through">₹7.80/unit</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>P2P Solar Rate:</span>
              <span className="text-emerald-400 font-bold">₹5.20/unit</span>
            </div>
            <div className="flex justify-between text-slate-400">
              <span>Direct Savings:</span>
              <span className="text-teal-300 font-bold">33% Discount</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
