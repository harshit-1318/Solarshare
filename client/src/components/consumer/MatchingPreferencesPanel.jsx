import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function MatchingPreferencesPanel({
  strategy, setStrategy,
  autoBuy, setAutoBuy,
  maxPrice, setMaxPrice,
  matchingStatusMsg,
  handleSaveMatchingPrefs,
  handleRunAutoMatch
}) {
  return (
    <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
            <Sparkles size={18} className="text-emerald-600" /> Automated Smart Matching Rules
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Configure algorithm to auto-match cheapest rooftop solar tariffs.</p>
        </div>
        <button
          type="button"
          onClick={handleRunAutoMatch}
          className="rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition flex items-center gap-1.5"
        >
          Run Auto Match Engine <ArrowRight size={14} />
        </button>
      </div>

      {matchingStatusMsg && (
        <div className="mt-4 rounded-2xl bg-emerald-50 border border-emerald-200 p-3 text-xs font-bold text-emerald-900 flex items-center gap-2">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{matchingStatusMsg}</span>
        </div>
      )}

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Matching Strategy</label>
          <select
            value={strategy}
            onChange={(e) => setStrategy(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
          >
            <option value="cheapest">Cheapest Available Tariff</option>
            <option value="closest">Closest Neighborhood Zone</option>
            <option value="greenest">Highest Clean Energy Rating</option>
          </select>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-2">Max Price Cap (₹/kWh)</label>
          <input
            type="number"
            min="1"
            max="20"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
        </div>

        <div className="flex flex-col justify-end">
          <label className="flex items-center gap-3 p-3 rounded-2xl border border-slate-200 bg-slate-50 cursor-pointer">
            <input
              type="checkbox"
              checked={autoBuy}
              onChange={(e) => setAutoBuy(e.target.checked)}
              className="h-4 w-4 rounded accent-emerald-600"
            />
            <span className="text-xs font-bold text-slate-800">Enable Auto-Buy on Surplus</span>
          </label>
        </div>
      </div>

      <div className="mt-5 flex justify-end">
        <button
          type="button"
          onClick={handleSaveMatchingPrefs}
          className="rounded-2xl border border-slate-200 py-2.5 px-5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
        >
          Save Preferences
        </button>
      </div>
    </section>
  );
}
