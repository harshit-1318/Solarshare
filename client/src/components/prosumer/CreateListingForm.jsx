import { Plus, MapPin, Leaf } from "lucide-react";

export default function CreateListingForm({
  form,
  setForm,
  submit,
  saving
}) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
      <div className="flex items-center gap-3 border-b border-slate-100 pb-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
          <Plus size={20} />
        </div>
        <div>
          <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
            Peer Market Offer
          </span>
          <h3 className="font-heading text-lg font-bold text-slate-900 mt-1">Publish Surplus Solar Power</h3>
        </div>
      </div>

      <form onSubmit={submit} className="mt-6 space-y-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Energy Volume (kWh)
            </label>
            <input
              required
              type="number"
              min="0.1"
              step="0.1"
              value={form.availableKwh}
              onChange={(event) => setForm({ ...form, availableKwh: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 px-4 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
              placeholder="e.g. 5.5"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
              Your Selling Price (₹ / kWh)
            </label>
            <input
              required
              type="number"
              min="0.01"
              step="0.01"
              value={form.pricePerKwh}
              onChange={(event) => setForm({ ...form, pricePerKwh: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 px-4 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
              placeholder="e.g. 5.50"
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">
            City / Grid Sub-station <span className="font-normal text-slate-400 text-xs">(optional)</span>
          </label>
          <div className="relative">
            <MapPin size={17} className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              value={form.city}
              onChange={(event) => setForm({ ...form, city: event.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-11 pr-4 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
              placeholder="e.g. Bangalore Zone 4"
            />
          </div>
        </div>

        <button
          disabled={saving}
          className="w-full inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 py-4 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition disabled:opacity-50 mt-2"
        >
          {saving ? "Publishing Offer..." : <><Leaf size={16} /> Publish Solar Listing to Marketplace</>}
        </button>
      </form>
    </section>
  );
}
