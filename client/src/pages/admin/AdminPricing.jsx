import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import PricingEngineCharts from "../../components/admin/PricingEngineCharts.jsx";

export default function AdminPricing() {
  const [pricingData, setPricingData] = useState(null);
  const [minPrice, setMinPrice] = useState(3.0);
  const [maxPrice, setMaxPrice] = useState(6.5);
  const [multiplier, setMultiplier] = useState(1.2);
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  const loadData = () => {
    api.get("/admin/pricing-engine")
      .then((res) => {
        setPricingData(res.data);
        if (res.data.minPrice) setMinPrice(res.data.minPrice);
        if (res.data.maxPrice) setMaxPrice(res.data.maxPrice);
        if (res.data.dynamicMultiplier) setMultiplier(res.data.dynamicMultiplier);
      })
      .catch(() => {});
  };

  useEffect(() => { loadData(); }, []);

  const handleApplyRules = async () => {
    setSaving(true);
    setMsg("");
    try {
      await api.put("/admin/pricing-engine", { minPrice, maxPrice, dynamicMultiplier: multiplier });
      setMsg("Pricing rules applied!");
      setTimeout(() => setMsg(""), 3000);
      loadData();
    } catch (err) {
      setMsg("Failed to save pricing rules.");
    } finally {
      setSaving(false);
    }
  };

  const currentPrice = pricingData?.currentPrice || 4.80;
  const defaultPriceTrends = [{ name: "00:00", Price: 4.1 }, { name: "12:00", Price: 4.4 }, { name: "20:00", Price: 5.7 }];
  const defaultDemandSupply = [{ name: "00:00", Supply: 100, Demand: 0 }, { name: "12:00", Supply: 480, Demand: 0 }];

  const trends = pricingData?.priceTrends || defaultPriceTrends;
  const demandSupply = pricingData?.demandVsSupply || defaultDemandSupply;

  return (
    <DashboardLayout title="Dynamic Pricing Engine" subtitle="Real-time energy pricing based on demand and supply.">
      <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-2">
        <PricingEngineCharts currentPrice={currentPrice} minPrice={minPrice} maxPrice={maxPrice} trends={trends} demandSupply={demandSupply} />

        <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-3">
              <h3 className="font-heading text-base font-bold text-slate-900">Admin Controls</h3>
              {msg && <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">{msg}</span>}
            </div>

            <div className="mt-5 space-y-6">
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2"><span>Minimum Price (₹/kWh)</span><span className="font-bold text-slate-900">x{minPrice.toFixed(1)}</span></div>
                <input type="range" min="1" max="5" step="0.1" value={minPrice} onChange={(e) => setMinPrice(Number(e.target.value))} className="w-full accent-emerald-600" />
              </div>
              <div>
                <div className="flex justify-between text-xs font-semibold text-slate-600 mb-2"><span>Maximum Price (₹/kWh)</span><span className="font-bold text-slate-900">x{maxPrice.toFixed(1)}</span></div>
                <input type="range" min="5" max="12" step="0.1" value={maxPrice} onChange={(e) => setMaxPrice(Number(e.target.value))} className="w-full accent-emerald-600" />
              </div>
            </div>
          </div>

          <button onClick={handleApplyRules} disabled={saving} className="mt-6 w-full rounded-xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition">
            {saving ? "Saving Rules..." : "Apply Pricing Rules"}
          </button>
        </section>
      </div>
    </DashboardLayout>
  );
}
