import { ArrowDownLeft, ArrowUpRight, WalletCards } from "lucide-react";

const number = (value) => Number(value || 0);

export default function WalletHistoryTable({ wallet }) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-slate-900">Wallet Activity & Transactions</h3>
        <p className="text-xs text-slate-500">Real-time ledger of credits, top-ups, and energy purchases</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Transaction Type</th>
                <th className="px-6 py-4">Reason / Details</th>
                <th className="px-6 py-4">Amount</th>
                <th className="px-6 py-4">Timestamp</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {wallet?.history?.length ? (
                [...wallet.history].reverse().map((item, index) => (
                  <tr className="transition hover:bg-slate-50/80" key={index}>
                    <td className="px-6 py-4">
                      <span
                        className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold ${
                          item.type === "credit"
                            ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                            : "bg-slate-100 text-slate-700"
                        }`}
                      >
                        {item.type === "credit" ? <ArrowDownLeft size={13} /> : <ArrowUpRight size={13} />}
                        {item.type.toUpperCase()}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold capitalize text-slate-800">
                      {item.reason?.replaceAll("_", " ")}
                    </td>
                    <td
                      className={`px-6 py-4 font-extrabold ${
                        item.type === "credit" ? "text-emerald-600" : "text-slate-900"
                      }`}
                    >
                      {item.type === "credit" ? "+" : "−"}₹{number(item.amount).toFixed(2)}
                    </td>
                    <td className="px-6 py-4 text-xs text-slate-500 font-medium">
                      {new Date(item.createdAt).toLocaleString("en-IN")}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-xs font-bold text-slate-400">
                    <WalletCards size={32} className="mx-auto text-slate-300 mb-2" />
                    No wallet activity logged yet. Top up balance or complete P2P energy trades to populate transactions.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
