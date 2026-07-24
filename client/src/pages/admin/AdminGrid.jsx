import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import AdminGridMonitoring from "../../components/admin/AdminGridMonitoring.jsx";

export default function AdminGrid() {
  const [chartData, setChartData] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    api.get("/admin/grid-monitoring")
      .then((res) => setChartData(res.data.chartData || []))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DashboardLayout
      title="Grid Dashboard"
      subtitle="System-wide energy monitoring, live load indices and system diagnostics."
    >
      <div className="mt-6 flex justify-end">
        <button
          onClick={loadData}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh Live Data
        </button>
      </div>

      <AdminGridMonitoring displayChartData={chartData} />
    </DashboardLayout>
  );
}
