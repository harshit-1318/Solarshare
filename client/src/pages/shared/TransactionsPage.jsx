import { CircleAlert, FileDown, Zap, TrendingUp, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import TransactionTable from "../../components/transactions/TransactionTable.jsx";
import DisputeModal from "../../components/transactions/DisputeModal.jsx";
import { useTransactions } from "../../components/transactions/useTransactions.js";

export default function TransactionsPage() {
  const { user } = useAuth();
  const tx = useTransactions(user);

  return (
    <DashboardLayout
      title="Peer-to-Peer Transactions Ledger 📑"
      subtitle="A complete, transparent record of every solar energy trade & smart meter settlement."
      action={
        <button
          onClick={tx.handleExportJson}
          disabled={tx.exporting || tx.items.length === 0}
          className="inline-flex items-center gap-2 rounded-2xl border border-slate-200 bg-white px-5 py-3 text-xs font-bold text-slate-700 hover:bg-slate-50 transition disabled:opacity-50 shadow-sm"
        >
          <FileDown size={16} /> {tx.exporting ? "Exporting..." : "Export Statement"}
        </button>
      }
    >
      {tx.error && (
        <div className="mt-6 flex items-start gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4 text-xs font-semibold text-amber-900">
          <CircleAlert size={18} className="mt-0.5 shrink-0 text-amber-600" />
          <span>{tx.error}</span>
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Energy Traded"
          value={`${tx.totals.energy.toFixed(1)} kWh`}
          sublabel="Audited smart meter volume"
          icon={Zap}
          accent="green"
        />
        <StatCard
          label="Marketplace Value"
          value={`₹${tx.totals.value.toFixed(2)}`}
          sublabel="Total wallet settlements"
          icon={TrendingUp}
          accent="blue"
        />
        <StatCard
          label="Activity Breakdown"
          value={user?.role === "prosumer" ? `${tx.totals.sales} Sales` : `${tx.totals.purchases} Purchases`}
          sublabel="Completed grid trades"
          icon={ShieldCheck}
          accent="violet"
        />
      </div>

      <TransactionTable items={tx.items} user={user} handleOpenDispute={tx.handleOpenDispute} />
      <DisputeModal
        disputeTx={tx.disputeTx}
        setDisputeTx={tx.setDisputeTx}
        disputeReason={tx.disputeReason}
        setDisputeReason={tx.setDisputeReason}
        handleSubmitDispute={tx.handleSubmitDispute}
        submittingDispute={tx.submittingDispute}
      />
    </DashboardLayout>
  );
}
