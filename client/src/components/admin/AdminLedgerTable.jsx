import { Search, Download, FileText, Printer } from "lucide-react";

export default function AdminLedgerTable({ summary, filteredTransactions, search, setSearch, filterType, setFilterType }) {
  return (
    <>
      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
          <h3 className="font-heading text-base font-bold text-slate-900">Settlement Summary</h3>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"><FileText size={14} /> Invoice</button>
            <button className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3.5 py-1.5 text-xs font-semibold text-slate-600 hover:bg-slate-50"><Printer size={14} /> PDF</button>
            <button className="flex items-center gap-1.5 rounded-xl bg-emerald-600 px-4 py-1.5 text-xs font-bold text-white hover:bg-emerald-700 shadow-sm"><Download size={14} /> Export</button>
          </div>
        </div>

        <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-[11px] font-semibold text-slate-400">Gross Revenue</p><p className="font-heading text-xl font-bold text-slate-900 mt-1">₹{summary.grossRevenue.toLocaleString("en-IN")}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-[11px] font-semibold text-slate-400">Platform Fee (5%)</p><p className="font-heading text-xl font-bold text-red-500 mt-1">-₹{summary.platformFee.toLocaleString("en-IN")}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-[11px] font-semibold text-slate-400">Tax (GST 18%)</p><p className="font-heading text-xl font-bold text-red-500 mt-1">-₹{summary.tax.toLocaleString("en-IN")}</p></div>
          <div className="rounded-xl bg-slate-50 p-4"><p className="text-[11px] font-semibold text-slate-400">Net Settlement</p><p className="font-heading text-xl font-bold text-emerald-600 mt-1">₹{summary.netSettlement.toLocaleString("en-IN")}</p></div>
        </div>
      </section>

      <section className="mt-6 rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <h3 className="font-heading text-base font-bold text-slate-900">Transaction History</h3>
          <div className="flex items-center gap-3">
            <div className="relative w-64">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full rounded-xl border border-slate-200 bg-slate-50 py-1.5 pl-8 pr-3 text-xs text-slate-700 focus:bg-white focus:outline-none" />
            </div>
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 px-3 text-xs font-semibold text-slate-600 focus:outline-none">
              <option value="all">All Types</option>
              <option value="sale">Sale</option>
              <option value="settlement">Settlement</option>
            </select>
          </div>
        </div>

        <div className="mt-5 overflow-x-auto">
          {filteredTransactions.length > 0 ? (
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-slate-100 text-[11px] uppercase tracking-wider text-slate-400 font-bold">
                  <th className="pb-3">TXN ID</th>
                  <th className="pb-3">TYPE</th>
                  <th className="pb-3">BUYER/PARTY</th>
                  <th className="pb-3">ENERGY</th>
                  <th className="pb-3">AMOUNT</th>
                  <th className="pb-3">DATE</th>
                  <th className="pb-3">STATUS</th>
                  <th className="pb-3">ACTION</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {filteredTransactions.map((tx) => (
                  <tr key={tx.id} className="hover:bg-slate-50/60 transition">
                    <td className="py-3 font-semibold text-slate-400">{tx.txnId}</td>
                    <td className="py-3"><span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tx.type === "Sale" ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>{tx.type}</span></td>
                    <td className="py-3 font-bold text-slate-900">{tx.buyerParty}</td>
                    <td className="py-3 text-slate-600">{tx.energy}</td>
                    <td className="py-3 font-bold text-emerald-600">{tx.amount}</td>
                    <td className="py-3 text-slate-500">{tx.date}</td>
                    <td className="py-3"><span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold ${tx.status === "Completed" ? "bg-emerald-100/70 text-emerald-700" : "bg-amber-100/70 text-amber-700"}`}>{tx.status}</span></td>
                    <td className="py-3"><button className="flex items-center gap-1 text-[11px] font-bold text-slate-500 hover:text-emerald-600"><Download size={12} /> Invoice</button></td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <div className="py-8 text-center text-xs text-slate-400">No transactions match your search.</div>
          )}
        </div>
      </section>
    </>
  );
}
