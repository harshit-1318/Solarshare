import { useEffect, useState } from "react";
import { RefreshCw } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import CertificateGrid from "../../components/consumer/CertificateGrid.jsx";

export default function ConsumerCertificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);

  const loadData = () => {
    setLoading(true);
    api.get("/certificates")
      .then((res) => setCerts(res.data))
      .catch(() => {})
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <DashboardLayout
      title="Issued Certificates"
      subtitle="View and download your carbon credit certificates for verification."
    >
      <div className="mt-6 flex justify-end">
        <button
          onClick={loadData}
          className="flex items-center gap-1.5 rounded-xl border border-slate-200 bg-white px-3 py-2 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
        >
          <RefreshCw size={13} className={loading ? "animate-spin" : ""} /> Refresh
        </button>
      </div>

      <CertificateGrid certs={certs} />
    </DashboardLayout>
  );
}
