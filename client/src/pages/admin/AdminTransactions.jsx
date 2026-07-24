import { useEffect, useState } from "react";
import { Wallet, TrendingUp, CircleDollarSign, CheckCircle2 } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import AdminLedgerTable from "../../components/admin/AdminLedgerTable.jsx";

export default function AdminTransactions() {
  const [data, setData] = useState(null);
  const [search, setSearch] = useState("");
  const [filterType, setFilterType] = useState("all");

  useEffect(() => {
    api.get("/admin/transactions/ledger")
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  const transactionsList = data?.transactions || [];
  const filteredTransactions = transactionsList.filter((tx) => {
    const matchesSearch = tx.txnId.toLowerCase().includes(search.toLowerCase()) ||
      tx.buyerParty.toLowerCase().includes(search.toLowerCase());
    const matchesType = filterType === "all" || tx.type.toLowerCase() === filterType.toLowerCase();
    return matchesSearch && matchesType;
  });

  const summary = data?.settlementSummary || { grossRevenue: 0, platformFee: 0, tax: 0, netSettlement: 0 };

  return (
    <DashboardLayout
      title="Transactions & Settlement Ledger"
      subtitle="Complete history of your energy trades and settlements."
    >
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Wallet size={20} />
          </span>
          <div>
            <h4 className="font-heading text-2xl font-black text-slate-900">
              ₹{(data?.walletBalance || 0).toLocaleString("en-IN")}
            </h4>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Wallet Balance</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <TrendingUp size={20} />
          </span>
          <div>
            <h4 className="font-heading text-2xl font-black text-slate-900">
              ₹{(data?.totalEarned || 0).toLocaleString("en-IN")}
            </h4>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Total Earned</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-amber-50 text-amber-600">
            <CircleDollarSign size={20} />
          </span>
          <div>
            <h4 className="font-heading text-2xl font-black text-slate-900">
              ₹{(data?.platformFee || 0).toLocaleString("en-IN")}
            </h4>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Platform Fee</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <CheckCircle2 size={20} />
          </span>
          <div>
            <h4 className="font-heading text-2xl font-black text-slate-900">
              ₹{(data?.settled || 0).toLocaleString("en-IN")}
            </h4>
            <p className="text-xs font-semibold text-slate-500 mt-0.5">Settled</p>
          </div>
        </div>
      </div>

      <AdminLedgerTable
        summary={summary}
        filteredTransactions={filteredTransactions}
        search={search}
        setSearch={setSearch}
        filterType={filterType}
        setFilterType={setFilterType}
      />
    </DashboardLayout>
  );
}
