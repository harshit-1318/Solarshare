import { Trash2 } from "lucide-react";

const STATUS_COLORS = {
  active: "bg-emerald-100 text-emerald-700",
  sold_out: "bg-slate-100 text-slate-600",
  expired: "bg-amber-100 text-amber-700",
  cancelled: "bg-red-100 text-red-600",
};

const fmtDate = (d) => (d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—");

function Badge({ label, colorClass }) {
  return <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${colorClass}`}>{label}</span>;
}

export default function AdminListingsTable({ filtered, setConfirm }) {
  return (
    <div className="mt-5 overflow-x-auto rounded-3xl border border-slate-200/80 bg-white shadow-soft">
      <table className="w-full text-xs">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50/70 text-left text-[11px] font-extrabold uppercase tracking-wider text-slate-400">
            <th className="px-6 py-4">Seller Prosumer</th>
            <th className="px-6 py-4">Available kWh</th>
            <th className="px-6 py-4">Tariff Price</th>
            <th className="px-6 py-4">Microgrid Node / City</th>
            <th className="px-6 py-4">Status</th>
            <th className="px-6 py-4">Listed Date</th>
            <th className="px-6 py-4 text-right">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-100">
          {filtered.map((l) => (
            <tr key={l._id} className="hover:bg-slate-50/60 transition-colors">
              <td className="px-6 py-4">
                <p className="font-bold text-slate-900 text-xs">{l.seller?.name || "Prosumer Member"}</p>
                <p className="text-[10px] text-slate-400 font-medium">{l.seller?.email || "verified@solarshare.com"}</p>
              </td>
              <td className="px-6 py-4 font-black text-slate-900">{l.availableKwh} kWh</td>
              <td className="px-6 py-4 font-extrabold text-emerald-600">₹{l.pricePerKwh}/kWh</td>
              <td className="px-6 py-4 font-semibold text-slate-600">{l.location?.city || l.seller?.address?.city || "Bangalore"}</td>
              <td className="px-6 py-4">
                <Badge label={l.status} colorClass={STATUS_COLORS[l.status] || "bg-slate-100 text-slate-600"} />
              </td>
              <td className="px-6 py-4 text-slate-400 text-[11px] font-medium">{fmtDate(l.createdAt)}</td>
              <td className="px-6 py-4 text-right">
                <button onClick={() => setConfirm(l._id)} className="inline-flex items-center gap-1.5 rounded-2xl bg-red-50 text-red-600 border border-red-200 px-3 py-1.5 text-xs font-bold hover:bg-red-100 transition">
                  <Trash2 size={13} /> Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
