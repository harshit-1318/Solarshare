import { useState } from "react";
import { Settings, Zap, CheckCircle2, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";

export default function ConsumerSettings() {
  const [autoPurchase, setAutoPurchase] = useState(true);
  const [maxRate, setMaxRate] = useState("6.5");
  const [notice, setNotice] = useState("");

  const handleSave = (e) => {
    e.preventDefault();
    setNotice("Consumer preferences saved!");
    setTimeout(() => setNotice(""), 3000);
  };

  return (
    <DashboardLayout
      title="Consumer Settings & Auto-Purchase Rules ⚙"
      subtitle="Set price caps, autonomous buying rules, and smart grid notification preferences."
    >
      {notice && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-900">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{notice}</span>
        </div>
      )}

      <div className="mt-7 max-w-3xl space-y-6">
        <section className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
          <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
            <Zap size={18} className="text-emerald-600" />
            <h3 className="font-heading text-base font-bold text-slate-900">Auto-Purchase Strategy & Tariff Cap</h3>
          </div>

          <form onSubmit={handleSave} className="mt-5 space-y-5 text-xs font-bold text-slate-700">
            <div className="flex items-center justify-between p-4 rounded-2xl bg-slate-50 border border-slate-200/60">
              <div>
                <span className="block text-slate-900 font-bold">Autonomous Auto-Purchase</span>
                <span className="block text-slate-400 font-normal mt-0.5 text-[11px]">
                  Automatically match and buy nearby prosumer solar energy when prices drop below your cap.
                </span>
              </div>
              <input
                type="checkbox"
                checked={autoPurchase}
                onChange={(e) => setAutoPurchase(e.target.checked)}
                className="h-5 w-5 rounded text-emerald-600 focus:ring-emerald-500 border-slate-300 accent-emerald-600 cursor-pointer"
              />
            </div>

            <div>
              <label className="block mb-1 uppercase tracking-wider">Maximum Purchase Price Cap (₹ / kWh)</label>
              <input
                type="number"
                step="0.1"
                value={maxRate}
                onChange={(e) => setMaxRate(e.target.value)}
                className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
              />
              <p className="text-[11px] text-slate-400 font-normal mt-1">DISCOM Grid Backup tariff is ₹8.50/kWh. Setting ₹6.5 guarantees &gt; 23% savings.</p>
            </div>

            <button
              type="submit"
              className="rounded-2xl bg-emerald-600 px-6 py-3.5 text-xs font-bold text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition"
            >
              Save Consumer Preferences
            </button>
          </form>
        </section>
      </div>
    </DashboardLayout>
  );
}
