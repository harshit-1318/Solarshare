import { ShoppingBag, Zap, Clock } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useConsumerOrders } from "../../components/consumer/useConsumerOrders.js";
import OrderListTable from "../../components/consumer/OrderListTable.jsx";

export default function ConsumerOrders() {
  const { user } = useAuth();
  const o = useConsumerOrders(user);

  return (
    <DashboardLayout
      title="My Energy Orders 📦"
      subtitle={`Track active, completed, and processed electricity purchases for ${user?.name || "Consumer"}.`}
    >
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Total Orders"
          value={o.orders.length.toString()}
          sublabel="All time market purchases"
          icon={ShoppingBag}
          accent="green"
        />
        <StatCard
          label="Active Deliveries"
          value={o.orders.filter((item) => item.status === "completed").length.toString()}
          sublabel="Settled & delivered"
          icon={Zap}
          accent="blue"
        />
        <StatCard
          label="Orders In Progress"
          value={o.orders.filter((item) => item.status === "pending").length.toString()}
          sublabel="Smart meter queue"
          icon={Clock}
          accent="amber"
        />
      </div>

      <OrderListTable
        filteredOrders={o.filteredOrders}
        tab={o.tab}
        setTab={o.setTab}
      />
    </DashboardLayout>
  );
}
