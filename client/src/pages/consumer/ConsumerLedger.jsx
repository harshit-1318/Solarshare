import { WalletCards, ArrowRightLeft, FileText, ArrowDownLeft } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useConsumerLedger } from "../../components/consumer/useConsumerLedger.js";
import LedgerTable from "../../components/consumer/LedgerTable.jsx";

export default function ConsumerLedger() {
  const { user } = useAuth();
  const { txs, aggregates, handleExportStatement } = useConsumerLedger(user);

  return (
    <DashboardLayout
      title="Settlement Ledger & Invoices 🧾"
      subtitle={`Complete financial breakdown of energy acquisitions and trade receipts for ${user?.name || "Consumer"}.`}
    >
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Wallet Balance"
          value={`₹${aggregates.walletBal.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
          sublabel="Available cash for purchases"
          icon={WalletCards}
          accent="green"
        />
        <StatCard
          label="Cumulative Spent"
          value={`₹${aggregates.totalSpent.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
          sublabel="Energy acquisitions to date"
          icon={ArrowRightLeft}
          accent="blue"
        />
        <StatCard
          label="Platform Brokerage"
          value={`₹${aggregates.platformFee.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
          sublabel="2% platform tariff fee"
          icon={FileText}
          accent="amber"
        />
        <StatCard
          label="Settled Purchases"
          value={`₹${aggregates.netSettled.toLocaleString("en-IN", { minimumFractionDigits: 2 })}`}
          sublabel={`${aggregates.completedCount} completed settlements`}
          icon={ArrowDownLeft}
          accent="violet"
        />
      </div>

      <LedgerTable txs={txs} aggregates={aggregates} handleExportStatement={handleExportStatement} />
    </DashboardLayout>
  );
}
