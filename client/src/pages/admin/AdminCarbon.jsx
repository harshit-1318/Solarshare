import { useEffect, useState } from "react";
import { Leaf, Award, DollarSign, Trees } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import GreenBadgesSection from "../../components/consumer/GreenBadgesSection.jsx";
import CarbonProgressCertificate from "../../components/consumer/CarbonProgressCertificate.jsx";

export default function AdminCarbon() {
  const [data, setData] = useState(null);

  useEffect(() => {
    api.get("/admin/carbon-credits")
      .then((res) => setData(res.data))
      .catch(() => {});
  }, []);

  const co2Val = data?.co2SavedTons || 2.84;
  const creditsEarned = data?.creditsEarned || 284;

  return (
    <DashboardLayout
      title="Carbon Credits"
      subtitle="Track your environmental impact and carbon credit earnings."
    >
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center justify-between relative">
          <div className="flex items-center gap-4">
            <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
              <Leaf size={20} />
            </span>
            <div>
              <h4 className="font-heading text-2xl font-black text-slate-900">{co2Val} tons</h4>
              <p className="text-xs font-semibold text-slate-400 mt-0.5">CO₂ Saved</p>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-purple-50 text-purple-600">
            <Award size={20} />
          </span>
          <div>
            <h4 className="font-heading text-2xl font-black text-slate-900">{creditsEarned} CC</h4>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Credits Earned</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-blue-50 text-blue-600">
            <DollarSign size={20} />
          </span>
          <div>
            <h4 className="font-heading text-2xl font-black text-slate-900">{(creditsEarned / 2).toFixed(0)} CC</h4>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Credits Sold</p>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm flex items-center gap-4">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600">
            <Trees size={20} />
          </span>
          <div>
            <h4 className="font-heading text-2xl font-black text-slate-900">{Math.round(co2Val * 16)} trees</h4>
            <p className="text-xs font-semibold text-slate-400 mt-0.5">Trees Equivalent</p>
          </div>
        </div>
      </div>

      <GreenBadgesSection />
      <CarbonProgressCertificate
        user={{ name: "Grid Admin Member" }}
        totalCO2Tons={co2Val}
        creditsEarnedVal={creditsEarned}
        handleDownloadCertificate={() => alert("Download started")}
      />
    </DashboardLayout>
  );
}
