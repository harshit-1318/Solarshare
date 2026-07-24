import { Trees, Car, Flame, Award, ArrowUpRight } from "lucide-react";

export default function ImpactMetricsGrid() {
  return (
    <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft hover:shadow-xl hover:-translate-y-1 transition duration-300">
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Trees size={24} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">
            Tree Equiv.
          </span>
        </div>
        <h3 className="mt-6 font-heading text-3xl font-extrabold text-slate-900">22,450+</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Trees Planted Equivalent</p>
        <p className="mt-3 text-xs text-slate-500 leading-relaxed">
          Absorbs the same amount of CO₂ as a 100-acre mature forest per year.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft hover:shadow-xl hover:-translate-y-1 transition duration-300">
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <Car size={24} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
            EV Miles
          </span>
        </div>
        <h3 className="mt-6 font-heading text-3xl font-extrabold text-slate-900">1.8M km</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Zero-Emission EV Distance</p>
        <p className="mt-3 text-xs text-slate-500 leading-relaxed">
          Clean solar power traded enough to drive an EV around Earth 45 times.
        </p>
      </div>

      <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft hover:shadow-xl hover:-translate-y-1 transition duration-300">
        <div className="flex items-center justify-between">
          <span className="flex h-12 w-12 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <Flame size={24} />
          </span>
          <span className="text-xs font-bold uppercase tracking-wider text-amber-600 bg-amber-50 px-2.5 py-1 rounded-full">
            Fossil Free
          </span>
        </div>
        <h3 className="mt-6 font-heading text-3xl font-extrabold text-slate-900">450 Tons</h3>
        <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-slate-400">Coal Burning Prevented</p>
        <p className="mt-3 text-xs text-slate-500 leading-relaxed">
          Kept thermal power plants from burning hundreds of tons of high-emission coal.
        </p>
      </div>

      <div className="rounded-3xl border border-emerald-500/30 bg-gradient-to-br from-emerald-900 to-slate-900 p-7 text-white shadow-xl flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between">
            <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Award size={20} />
            </span>
            <span className="text-[10px] font-extrabold uppercase tracking-widest text-emerald-400 bg-emerald-500/20 px-2 py-0.5 rounded">
              Verified CC
            </span>
          </div>
          <h4 className="mt-4 font-heading text-lg font-bold text-white">Carbon Credit Wallet</h4>
          <p className="mt-1 text-xs text-slate-300">
            Trade or export your verified carbon offset certificates directly from your profile.
          </p>
        </div>

        <div className="mt-6 pt-4 border-t border-slate-800 flex items-center justify-between text-xs text-emerald-400 font-semibold">
          <span>100% Audited Certificate</span>
          <ArrowUpRight size={16} />
        </div>
      </div>
    </div>
  );
}
