import { Sparkles, Download } from "lucide-react";

export default function CarbonProgressCertificate({
  user,
  totalCO2Tons,
  creditsEarnedVal,
  handleDownloadCertificate
}) {
  return (
    <div className="mt-6 grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft flex flex-col justify-between">
        <h3 className="font-heading text-base font-bold text-slate-900">Environmental Progress Tracker</h3>
        <div className="mt-6 flex-1 space-y-6">
          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Monthly CO₂ Offset Target</span>
              <span className="text-emerald-600 font-extrabold">2 / {totalCO2Tons} Tons</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/60">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style={{ width: "70%" }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Credit Redemption Rate</span>
              <span className="text-emerald-600 font-extrabold">{(creditsEarnedVal / 2).toFixed(0)} / {creditsEarnedVal.toFixed(0)} CC</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/60">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style={{ width: "50%" }} />
            </div>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs font-bold text-slate-700">
              <span>Equivalent Forest Planting Impact</span>
              <span className="text-emerald-600 font-extrabold">{Math.round(totalCO2Tons * 16)} / 54 Trees</span>
            </div>
            <div className="h-3 w-full rounded-full bg-slate-100 overflow-hidden p-0.5 border border-slate-200/60">
              <div className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400 transition-all duration-500" style={{ width: "85%" }} />
            </div>
          </div>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft flex flex-col justify-between">
        <h3 className="font-heading text-base font-bold text-slate-900">Official Green Certificate</h3>
        <div className="mt-4 border border-emerald-200 bg-emerald-50/40 p-6 rounded-3xl relative text-center shadow-sm">
          <span className="inline-flex items-center gap-1 text-[10px] font-extrabold text-emerald-700 tracking-widest uppercase bg-emerald-100 px-3 py-0.5 rounded-full">
            <Sparkles size={11} /> Verified Carbon Certificate
          </span>
          <h4 className="font-mono text-xs font-bold text-slate-800 mt-2">CC-2026-0094</h4>
          <p className="text-base font-extrabold text-slate-900 mt-3">{user?.name || "SolarShare Member"}</p>
          <p className="text-xs text-slate-500 font-medium">{user?.address?.city || "Bangalore"}, India</p>

          <div className="mt-4 flex justify-center gap-8 border-t border-emerald-200/60 pt-4">
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">CO₂ Avoided</p>
              <p className="text-sm font-extrabold text-emerald-600 mt-0.5">{totalCO2Tons} Tons</p>
            </div>
            <div>
              <p className="text-[10px] uppercase font-bold text-slate-400">Credits Accrued</p>
              <p className="text-sm font-extrabold text-slate-900 mt-0.5">{creditsEarnedVal.toFixed(0)} CC</p>
            </div>
          </div>

          <button
            onClick={handleDownloadCertificate}
            className="mt-5 w-full rounded-2xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition flex items-center justify-center gap-2 shadow-md"
          >
            <Download size={14} /> Download PDF Certificate
          </button>
        </div>
      </section>
    </div>
  );
}
