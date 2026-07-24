import { Link } from "react-router-dom";
import { ShoppingBag, Zap, TrendingDown, CircleDollarSign } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useConsumerDashboard } from "../../components/consumer/useConsumerDashboard.js";
import ConsumerCharts from "../../components/consumer/ConsumerCharts.jsx";
import MatchingPreferencesPanel from "../../components/consumer/MatchingPreferencesPanel.jsx";

const number = (value) => Number(value || 0);

export default function ConsumerDashboard() {
  const { user } = useAuth();
  const d = useConsumerDashboard(user);

  return (
    <DashboardLayout
      title={`Hello, ${user?.name?.split(" ")[0] || "there"}`}
      subtitle="Monitor your energy purchases and savings."
      action={
        <Link to="/marketplace" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition">
          <ShoppingBag size={16} /> Browse marketplace
        </Link>
      }
    >
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Current Consumption"
          value={d.latest ? `${d.currentConsumption.toFixed(1)} kW` : "0.9 kW"}
          trend="+5%"
          icon={Zap}
          accent="blue"
        />
        <StatCard
          label="Purchased Energy"
          sublabel="This month"
          value={`${d.purchasedThisMonth.toFixed(0)} kWh`}
          trend="+14%"
          icon={ShoppingBag}
          accent="green"
        />
        <StatCard
          label="Monthly Savings"
          sublabel="vs grid tariff"
          value={`₹${d.savingsThisMonth.toLocaleString("en-IN")}`}
          trend="+8%"
          icon={TrendingDown}
          accent="violet"
        />
        <StatCard
          label="Wallet Balance"
          value={`₹${number(d.wallet?.balance || 2358).toLocaleString("en-IN", { minimumFractionDigits: 0, maximumFractionDigits: 0 })}`}
          icon={CircleDollarSign}
          accent="amber"
        />
      </div>

      <ConsumerCharts history={d.history} range={d.range} setRange={d.setRange} />
      <MatchingPreferencesPanel
        strategy={d.strategy} setStrategy={d.setStrategy}
        autoBuy={d.autoBuy} setAutoBuy={d.setAutoBuy}
        maxPrice={d.maxPrice} setMaxPrice={d.setMaxPrice}
        matchingStatusMsg={d.matchingStatusMsg}
        handleSaveMatchingPrefs={d.handleSaveMatchingPrefs}
        handleRunAutoMatch={d.handleRunAutoMatch}
      />
    </DashboardLayout>
  );
}
