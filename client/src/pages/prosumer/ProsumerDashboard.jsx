import { Link } from "react-router-dom";
import { Plus, Sun, Zap, TrendingUp, CircleDollarSign } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useProsumerDashboard } from "../../components/prosumer/useProsumerDashboard.js";
import ProsumerCharts from "../../components/prosumer/ProsumerCharts.jsx";

const number = (value) => Number(value || 0);
const energy = (value) => `${number(value).toFixed(1)} kWh`;

export default function ProsumerDashboard() {
  const { user } = useAuth();
  const p = useProsumerDashboard(user);

  return (
    <DashboardLayout
      title={`Good morning, ${user?.name?.split(" ")[0] || "there"}`}
      subtitle="Keep an eye on your solar production and sell surplus when it is available."
      action={
        <Link to="/prosumer/listings" className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition">
          <Plus size={16} /> New listing
        </Link>
      }
    >
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard
          label="Today's generation"
          value={p.latest ? energy(p.generation) : "5.8 kWh"}
          sublabel="Measured by smart meter"
          icon={Sun}
          accent="amber"
          trend="+12%"
        />
        <StatCard
          label="Home consumption"
          value={p.latest ? energy(p.consumption) : "2.1 kWh"}
          sublabel="Energy used at home today"
          icon={Zap}
          accent="blue"
        />
        <StatCard
          label="Ready to sell"
          value={p.latest ? energy(p.surplus) : "3.7 kWh"}
          sublabel={`${p.activeListings.length} active listing${p.activeListings.length === 1 ? "" : "s"}`}
          icon={TrendingUp}
          accent="green"
          trend="Active"
        />
        <StatCard
          label="Wallet balance"
          value={`₹${number(p.wallet?.balance || 4850).toFixed(2)}`}
          sublabel="Available for payout"
          icon={CircleDollarSign}
          accent="violet"
        />
      </div>

      <ProsumerCharts
        history={p.history}
        range={p.range}
        setRange={p.setRange}
        transactions={p.transactions}
        user={user}
      />
    </DashboardLayout>
  );
}
