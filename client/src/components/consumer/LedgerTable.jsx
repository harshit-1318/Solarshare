import { ReceiptText } from "lucide-react";

const number = (val) => Number(val) || 0;

const formatOrderDate = (dateVal) => {
  if (!dateVal) return new Date().toLocaleString("en-IN");
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return new Date().toLocaleString("en-IN");
  return d.toLocaleString("en-IN");
};

export default function LedgerTable({ txs, aggregates, handleExportStatement }) {
  return (
    <>
      <section className="rounded-3xl border border-slate-200/80 bg-white mt-6 p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <h3 className="font-heading text-base font-bold text-slate-900">Audited Settlement Ledger</h3>
            <p className="text-xs text-slate-500 mt-0.5">Itemized statement breakdown</p>
          </div>
          <button
            onClick={handleExportStatement}
            className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm"
          >
            Export Ledger Statement
          </button>
        </div>

        <div className="mt-6 overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="px-5 py-3.5">Gross Purchases</th>
                <th className="px-5 py-3.5">Platform Fee (2%)</th>
                <th className="px-5 py-3.5">GST Tax (5%)</th>
                <th className="px-5 py-3.5">Net Settlement Total</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 font-medium text-slate-800">
              <tr className="hover:bg-slate-50/50">
                <td className="px-5 py-4 font-bold text-slate-900">₹{aggregates.totalSpent.toFixed(2)}</td>
                <td className="px-5 py-4 font-semibold text-red-600">-₹{aggregates.platformFee.toFixed(2)}</td>
                <td className="px-5 py-4 font-semibold text-red-600">-₹{aggregates.tax.toFixed(2)}</td>
                <td className="px-5 py-4 text-emerald-600 font-black">₹{aggregates.netSettled.toFixed(2)}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white mt-6 p-6 shadow-soft">
        <div className="flex items-center gap-2 mb-4 border-b border-slate-100 pb-3">
          <ReceiptText size={18} className="text-emerald-600" />
          <h3 className="font-heading text-base font-bold text-slate-900">Itemized Purchase Invoices</h3>
        </div>
        
        <div className="space-y-3">
          {txs.map((tx) => (
            <div key={tx._id} className="flex justify-between items-center p-4 bg-slate-50/70 border border-slate-200/60 rounded-2xl text-xs hover:bg-white hover:border-slate-300 transition duration-200">
              <div className="space-y-1">
                <p className="font-bold text-slate-900 flex items-center gap-2">
                  Purchase Invoice #{String(tx._id).substring(String(tx._id).length - 8).toUpperCase()}
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                </p>
                <p className="text-[11px] text-slate-500">
                  Seller: {tx.seller?.name || "Rooftop Prosumer"} • {number(tx.kwh).toFixed(1)} kWh @ ₹{number(tx.pricePerKwh).toFixed(2)}/kWh
                </p>
              </div>
              <div className="text-right">
                <p className="font-extrabold text-emerald-600">₹{number(tx.totalAmount).toFixed(2)}</p>
                <p className="text-[10px] text-slate-400 font-medium">{formatOrderDate(tx.createdAt)}</p>
              </div>
            </div>
          ))}

          {txs.length === 0 && (
            <p className="text-center text-xs font-bold text-slate-400 py-8">
              No settlement invoices recorded yet.
            </p>
          )}
        </div>
      </section>
    </>
  );
}
