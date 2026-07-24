import { Leaf, Award, ShieldCheck } from "lucide-react";
import ImpactMetricsGrid from "./ImpactMetricsGrid.jsx";

export default function ImpactTracker() {
  return (
    <section id="impact" className="py-20 lg:py-28 bg-slate-50 relative overflow-hidden">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-widest mb-4">
              <Leaf size={14} className="text-emerald-600" /> Sustainability Impact
            </div>

            <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl leading-tight">
              Real Impact for a <span className="text-emerald-600">Cleaner Planet</span>
            </h2>

            <p className="mt-4 text-base text-slate-600 leading-relaxed">
              Every kilowatt-hour traded on SolarShare directly displaces fossil fuels from local power grids. We automatically calculate and verify your carbon reduction.
            </p>

            <div className="mt-8 space-y-4">
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <ShieldCheck size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-800">UN SDG-Compliant Carbon Accounting</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-8 w-8 items-center justify-center rounded-full bg-emerald-100 text-emerald-700">
                  <Award size={18} />
                </div>
                <span className="text-sm font-semibold text-slate-800">Downloadable Verifiable Carbon Certificates</span>
              </div>
            </div>
          </div>

          <ImpactMetricsGrid />
        </div>
      </div>
    </section>
  );
}
