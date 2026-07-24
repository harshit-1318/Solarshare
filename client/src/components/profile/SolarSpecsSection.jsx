import { Sun, Edit2 } from "lucide-react";

export default function SolarSpecsSection({ user, editingSolar, setEditingSolar }) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="font-heading text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Sun size={18} className="text-amber-500" /> Solar Panel & Smart Meter Specs
        </h3>
        {!editingSolar && user?.role === "prosumer" && (
          <button
            onClick={() => setEditingSolar(true)}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 flex items-center gap-1"
          >
            <Edit2 size={13} /> Edit
          </button>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
        <div>
          <span className="block text-xs font-semibold text-slate-400">Array Brand</span>
          <span className="block text-sm font-bold text-slate-900 mt-1">Tata Power Solar Monocrystalline</span>
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-400">Array Capacity</span>
          <span className="block text-sm font-bold text-emerald-600 mt-1">
            {user?.solarPanel?.capacityKw || 6} kW
          </span>
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-400">Installation Date</span>
          <span className="block text-sm font-bold text-slate-900 mt-1">September 2023</span>
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-400">Smart Meter ID</span>
          <span className="block text-sm font-bold text-slate-900 mt-1 font-mono">SM-2023-04821</span>
        </div>
      </div>
    </section>
  );
}
