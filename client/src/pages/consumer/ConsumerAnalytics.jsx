import { TrendingDown, Zap, DollarSign } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import AnalyticsCharts from "../../components/consumer/AnalyticsCharts.jsx";

export default function ConsumerAnalytics() {
  return (
    <DashboardLayout
      title="Energy Usage & Cost Analytics 📊"
      subtitle="Deep-dive into your daily electricity consumption, peak hours, and P2P savings."
    >
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Clean Energy Purchased"
          value="1,250 kWh"
          sublabel="100% P2P Solar Energy"
          icon={Zap}
          accent="green"
          trend="+18% YoY"
        />
        <StatCard
          label="Total Electricity Savings"
          value="₹3,750"
          sublabel="Compared to DISCOM grid tariff"
          icon={TrendingDown}
          accent="blue"
        />
        <StatCard
          label="Average P2P Tariff"
          value="₹4.80 / kWh"
          sublabel="DISCOM Tariff: ₹8.50 / kWh"
          icon={DollarSign}
          accent="amber"
          trend="Save 43%"
        />
      </div>

      <AnalyticsCharts />
    </DashboardLayout>
  );
}
