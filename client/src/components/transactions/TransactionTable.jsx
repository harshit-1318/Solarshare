import { CheckCircle2 } from "lucide-react";

export default function TransactionTable({ filteredTxns }) {
  return (
    <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft">
      <div className="overflow-x-auto">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
              <th className="px-6 py-4">Transaction ID</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Counterparty</th>
              <th className="px-6 py-4">Energy (kWh)</th>
              <th className="px-6 py-4">Total Value (₹)</th>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredTxns.length > 0 ? (
              filteredTxns.map((item) => (
                <tr key={item._id || item.txnId} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-mono text-xs font-bold text-slate-400">#{item.txnId || item._id}</td>
                  <td className="px-6 py-4">
                    <span className={`inline-flex items-center rounded-full px-2.5 py-1 text-[10px] font-extrabold uppercase ${item.type === "sell" || item.type === "Sale" ? "bg-emerald-100 text-emerald-800" : "bg-blue-100 text-blue-800"}`}>{item.type || "P2P Trade"}</span>
                  </td>
                  <td className="px-6 py-4 font-bold text-slate-900">{item.counterparty || item.sellerName || "Rajesh K."}</td>
                  <td className="px-6 py-4 font-extrabold text-slate-900">{item.kwh} kWh</td>
                  <td className="px-6 py-4 font-black text-emerald-600">₹{Number(item.totalPrice || item.amount || 0).toFixed(2)}</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-500">{new Date(item.createdAt || item.date || Date.now()).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" })}</td>
                  <td className="px-6 py-4">
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 border border-emerald-200 px-3 py-1 text-[11px] font-bold text-emerald-700"><CheckCircle2 size={12} /> Settlement Completed</span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" className="px-6 py-12 text-center text-xs font-semibold text-slate-400">No transactions match your search filter.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
