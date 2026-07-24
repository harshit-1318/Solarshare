import { Save } from "lucide-react";

export default function AdminSettingsForm({
  settings,
  setSettings,
  handleSave,
  saving,
  msg
}) {
  return (
    <form onSubmit={handleSave} className="mt-6 max-w-3xl space-y-6">
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-heading text-base font-bold text-slate-900">Platform Configuration</h3>
          {msg && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-lg">{msg}</span>}
        </div>

        <div className="mt-5 space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Platform Name</label>
            <input
              type="text"
              value={settings.platformName}
              onChange={(e) => setSettings({ ...settings, platformName: e.target.value })}
              className="w-full text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Grid Operating Region</label>
            <input
              type="text"
              value={settings.gridRegion}
              onChange={(e) => setSettings({ ...settings, gridRegion: e.target.value })}
              className="w-full text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="font-heading text-base font-bold text-slate-900 border-b border-slate-100 pb-3">
          Financial & Tax Rules
        </h3>

        <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">Platform Fee (%)</label>
            <input
              type="number"
              step="0.5"
              value={settings.platformFeePercent}
              onChange={(e) => setSettings({ ...settings, platformFeePercent: Number(e.target.value) })}
              className="w-full text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-400">GST Tax (%)</label>
            <input
              type="number"
              step="1"
              value={settings.gstTaxPercent}
              onChange={(e) => setSettings({ ...settings, gstTaxPercent: Number(e.target.value) })}
              className="w-full text-xs font-semibold text-slate-700 rounded-xl border border-slate-200 p-2.5 bg-white focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>
        </div>

        <div className="mt-5 flex items-center justify-between border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs font-bold text-slate-900">Automatic Wallet Settlement</p>
            <p className="text-[11px] text-slate-400">Automatically settle prosumer payouts upon trade completion.</p>
          </div>
          <input
            type="checkbox"
            checked={settings.autoSettlement}
            onChange={(e) => setSettings({ ...settings, autoSettlement: e.target.checked })}
            className="h-5 w-5 accent-emerald-600 rounded"
          />
        </div>
      </section>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={saving}
          className="flex items-center gap-2 rounded-xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white hover:bg-emerald-700 shadow-md shadow-emerald-600/10 transition"
        >
          <Save size={15} /> {saving ? "Saving Preferences..." : "Save Settings"}
        </button>
      </div>
    </form>
  );
}
