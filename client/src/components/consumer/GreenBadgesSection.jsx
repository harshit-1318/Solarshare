import { CheckCircle, Lock } from "lucide-react";

export default function GreenBadgesSection() {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white mt-6 p-6 shadow-soft">
      <h3 className="font-heading text-base font-bold text-slate-900">
        Green Achievement Badges
      </h3>
      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="flex flex-col items-center justify-center border border-emerald-200 bg-emerald-50/50 p-5 rounded-2xl text-center shadow-sm">
          <span className="text-3xl">🌱</span>
          <h4 className="text-xs font-bold text-slate-900 mt-3">First Green Trade</h4>
          <p className="text-[10px] text-slate-500 mt-1">Completed first P2P solar purchase</p>
          <span className="mt-3 text-[9px] font-extrabold uppercase text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={11} /> Unlocked
          </span>
        </div>

        <div className="flex flex-col items-center justify-center border border-emerald-200 bg-emerald-50/50 p-5 rounded-2xl text-center shadow-sm">
          <span className="text-3xl">☀️</span>
          <h4 className="text-xs font-bold text-slate-900 mt-3">Solar Pioneer</h4>
          <p className="text-[10px] text-slate-500 mt-1">Traded 100+ kWh clean energy</p>
          <span className="mt-3 text-[9px] font-extrabold uppercase text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={11} /> Unlocked
          </span>
        </div>

        <div className="flex flex-col items-center justify-center border border-emerald-200 bg-emerald-50/50 p-5 rounded-2xl text-center shadow-sm">
          <span className="text-3xl">🌍</span>
          <h4 className="text-xs font-bold text-slate-900 mt-3">CO₂ Champion</h4>
          <p className="text-[10px] text-slate-500 mt-1">Saved 1 Ton of carbon dioxide</p>
          <span className="mt-3 text-[9px] font-extrabold uppercase text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <CheckCircle size={11} /> Unlocked
          </span>
        </div>

        <div className="flex flex-col items-center justify-center border border-slate-200 bg-slate-50 p-5 rounded-2xl text-center opacity-70">
          <span className="text-3xl">⚡</span>
          <h4 className="text-xs font-bold text-slate-900 mt-3">Power Trader</h4>
          <p className="text-[10px] text-slate-500 mt-1">100+ trades completed</p>
          <span className="mt-3 text-[9px] font-extrabold uppercase text-slate-500 bg-slate-200 px-2.5 py-0.5 rounded-full flex items-center gap-1">
            <Lock size={11} /> Locked
          </span>
        </div>
      </div>
    </section>
  );
}
