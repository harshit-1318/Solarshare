import { useEffect, useState } from "react";
import { Users, Sun, ShoppingCart, Box, Zap, TrendingUp, CircleDollarSign, AlertTriangle } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import AdminGridMonitoring from "../../components/admin/AdminGridMonitoring.jsx";

function AdminStatCard({ label, value, sublabel, icon: Icon, iconBg, iconColor }) {
  return (
    <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center justify-between relative">
      <div className="flex items-center gap-4">
        <span className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl ${iconBg} ${iconColor}`}>
          <Icon size={20} />
        </span>
        <div>
          <h4 className="font-heading text-2xl font-black text-slate-900">{value}</h4>
          <p className="text-xs font-semibold text-slate-600 mt-0.5">{label}</p>
          {sublabel && <p className="text-[10px] text-slate-400 mt-0.5">{sublabel}</p>}
        </div>
      </div>
    </div>
  );
}

export default function AdminDashboard() {
  const [overview, setOverview] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    Promise.all([
      api.get("/admin/overview"),
      api.get("/admin/grid-monitoring")
    ])
      .then(([resOverview, resGrid]) => {
        setOverview(resOverview.data);
        setChartData(resGrid.data.chartData || []);
      })
      .catch(() => {});
  }, []);

  const usersVal = overview?.totalUsers !== undefined ? overview.totalUsers.toLocaleString("en-IN") : "0";
  const prosumersVal = overview?.totalProsumers !== undefined ? overview.totalProsumers.toLocaleString("en-IN") : "0";
  const consumersVal = overview?.totalConsumers !== undefined ? overview.totalConsumers.toLocaleString("en-IN") : "0";
  const listingsVal = overview?.activeListings !== undefined ? overview.activeListings.toLocaleString("en-IN") : "0";
  const generatedMwhVal = `${(overview?.energyGeneratedMwh || 0).toFixed(1)} MWh`;
  const soldMwhVal = `${(overview?.energySoldMwh || 0).toFixed(1)} MWh`;
  const revenueVal = `₹${(overview?.platformVolume || 0).toLocaleString("en-IN")}`;
  const pendingDisputesVal = `${overview?.pendingDisputes || 0}`;

  return (
    <DashboardLayout title="Grid Admin Dashboard" subtitle="System-wide energy monitoring and management.">
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Total Users" sublabel="Registered users" value={usersVal} icon={Users} iconBg="bg-blue-50" iconColor="text-blue-500" />
        <AdminStatCard label="Total Prosumers" value={prosumersVal} icon={Sun} iconBg="bg-emerald-50" iconColor="text-emerald-500" />
        <AdminStatCard label="Total Consumers" value={consumersVal} icon={ShoppingCart} iconBg="bg-purple-50" iconColor="text-purple-500" />
        <AdminStatCard label="Active Listings" value={listingsVal} icon={Box} iconBg="bg-amber-50" iconColor="text-amber-500" />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <AdminStatCard label="Energy Generated" value={generatedMwhVal} icon={Zap} iconBg="bg-emerald-50" iconColor="text-emerald-500" />
        <AdminStatCard label="Energy Sold" value={soldMwhVal} icon={TrendingUp} iconBg="bg-blue-50" iconColor="text-blue-500" />
        <AdminStatCard label="Platform Revenue" value={revenueVal} icon={CircleDollarSign} iconBg="bg-amber-50" iconColor="text-amber-500" />
        <AdminStatCard label="Pending Disputes" value={pendingDisputesVal} icon={AlertTriangle} iconBg="bg-red-50" iconColor="text-red-500" />
      </div>

      <AdminGridMonitoring displayChartData={chartData} />
    </DashboardLayout>
  );
}
