import { useState } from "react";
import { Sun, ShieldCheck, Zap, Search, CheckCircle2 } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";

const gridArrays = [
  { id: 1, prosumer: "Ramesh Sharma", city: "Bangalore", capacityKw: 6.0, panelsCount: 16, brand: "Tata Power Solar", status: "Active (100% Health)" },
  { id: 2, prosumer: "Priya Patel", city: "Ahmedabad", capacityKw: 5.5, panelsCount: 14, brand: "Adani Solar", status: "Active (98% Health)" },
  { id: 3, prosumer: "Anuj Verma", city: "Delhi NCR", capacityKw: 8.0, panelsCount: 20, brand: "Waaree Energies", status: "Active (99% Health)" },
  { id: 4, prosumer: "Sanjay Gupta", city: "Indore", capacityKw: 4.5, panelsCount: 12, brand: "Vikram Solar", status: "Active (95% Health)" },
];

export default function AdminPanels() {
  const [query, setQuery] = useState("");
  const filtered = gridArrays.filter((i) => i.prosumer.toLowerCase().includes(query.toLowerCase()) || i.city.toLowerCase().includes(query.toLowerCase()));

  return (
    <DashboardLayout title="Grid Solar Panel System Audit ☀️" subtitle="Monitor all rooftop prosumer solar panel installations.">
      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Grid Capacity" value="24.0 kW" sublabel="Audited solar arrays" icon={Sun} accent="amber" />
        <StatCard label="Total Solar Modules" value="62 Panels" sublabel="Smart meter connected" icon={Zap} accent="green" />
        <StatCard label="Hardware Compliance" value="98.5% Optimal" sublabel="Zero inverter faults" icon={ShieldCheck} accent="blue" />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft">
        <div className="relative w-full sm:w-80">
          <Search size={17} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
          <input type="text" placeholder="Search by prosumer or city..." value={query} onChange={(e) => setQuery(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-11 pr-4 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none" />
        </div>
        <span className="text-xs font-bold text-slate-500">Showing {filtered.length} Prosumer Arrays</span>
      </div>

      <div className="mt-6 overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-extrabold uppercase text-slate-500">
                <th className="px-6 py-4">Prosumer Owner</th>
                <th className="px-6 py-4">Grid Location</th>
                <th className="px-6 py-4">System Capacity</th>
                <th className="px-6 py-4">Module Brand</th>
                <th className="px-6 py-4">Health Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filtered.map((item) => (
                <tr key={item.id} className="transition hover:bg-slate-50/80">
                  <td className="px-6 py-4 font-bold text-slate-900">{item.prosumer}</td>
                  <td className="px-6 py-4 text-slate-600 font-medium">{item.city}</td>
                  <td className="px-6 py-4 font-extrabold text-emerald-600">{item.capacityKw} kW ({item.panelsCount} Panels)</td>
                  <td className="px-6 py-4 text-xs font-semibold text-slate-700">{item.brand}</td>
                  <td className="px-6 py-4"><span className="inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold bg-emerald-50 text-emerald-700 border border-emerald-200"><CheckCircle2 size={13} /> {item.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </DashboardLayout>
  );
}
