export default function AddPanelModal({
  showAddModal,
  setShowAddModal,
  form,
  setForm,
  handleAddPanel
}) {
  if (!showAddModal) return null;

  return (
    <div className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <form onSubmit={handleAddPanel} className="bg-white rounded-3xl max-w-md w-full p-7 shadow-2xl border border-slate-200">
        <h3 className="font-heading text-lg font-bold text-slate-900 border-b border-slate-100 pb-3">
          Add Solar Array Installation
        </h3>

        <div className="mt-5 space-y-4 text-xs font-bold text-slate-600">
          <div>
            <label className="block mb-1 uppercase tracking-wider">Array Name</label>
            <input
              required
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
              placeholder="e.g. South Roof Array C"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block mb-1 uppercase tracking-wider">Manufacturer & Model</label>
            <select
              value={form.brand}
              onChange={(e) => setForm({ ...form, brand: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            >
              <option value="Tata Power Solar Monocrystalline">Tata Power Solar Monocrystalline</option>
              <option value="Adani Solar Bifacial">Adani Solar Bifacial</option>
              <option value="Waaree Energies High Efficiency">Waaree Energies High Efficiency</option>
              <option value="Vikram Solar PERC Module">Vikram Solar PERC Module</option>
            </select>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block mb-1 uppercase tracking-wider">Capacity (kW)</label>
              <input
                type="number"
                step="0.5"
                min="0.5"
                required
                value={form.capacityKw}
                onChange={(e) => setForm({ ...form, capacityKw: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">Panel Count</label>
              <input
                type="number"
                min="1"
                required
                value={form.panelsCount}
                onChange={(e) => setForm({ ...form, panelsCount: e.target.value })}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-end gap-3 pt-2 border-t border-slate-100">
          <button
            type="button"
            onClick={() => setShowAddModal(false)}
            className="rounded-2xl border border-slate-200 py-2.5 px-4 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="rounded-2xl bg-emerald-600 py-2.5 px-5 text-xs font-bold text-white hover:bg-emerald-700 transition"
          >
            Save Installation
          </button>
        </div>
      </form>
    </div>
  );
}
