import { Sun, CheckCircle2, ShoppingBag } from "lucide-react";

export default function MarketplaceTable({ filteredListings, buyingId, handleBuy }) {
  return (
    <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4">Prosumer Seller</th>
              <th className="px-6 py-4">Location Grid</th>
              <th className="px-6 py-4">Energy Offered</th>
              <th className="px-6 py-4">Price per kWh</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Instant Trade</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredListings.length > 0 ? (
              filteredListings.map((item) => (
                <tr key={item._id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-slate-900">
                    <div className="flex items-center gap-3">
                      <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60 shrink-0">
                        <Sun size={17} />
                      </span>
                      <div>
                        <p className="font-heading font-extrabold text-slate-900 leading-tight">{item.seller?.name || "Solar Prosumer"}</p>
                        <p className="text-[11px] font-semibold text-slate-400 mt-0.5">{item.seller?.email || "verified@solarshare.com"}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-600">{item.location?.city || "Bangalore"} Zone</td>
                  <td className="px-6 py-4 font-black text-slate-900">{item.availableKwh} kWh</td>
                  <td className="px-6 py-4">
                    <span className="font-black text-emerald-600 text-base">₹{Number(item.pricePerKwh || 5.5).toFixed(2)}</span>
                    <span className="text-[10px] text-slate-400 font-semibold block">/ unit</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-700">
                      <CheckCircle2 size={12} /> Active
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button
                      onClick={() => handleBuy(item)}
                      disabled={buyingId === item._id}
                      className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition disabled:opacity-50"
                    >
                      <ShoppingBag size={14} />
                      {buyingId === item._id ? "Processing..." : "Buy Power"}
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-12 text-center text-xs font-semibold text-slate-400">
                  No matching energy listings found in this grid zone.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
