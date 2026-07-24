import { Sun, Plus, ShieldCheck, CheckCircle2, Zap } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import PanelListTable from "../../components/prosumer/PanelListTable.jsx";
import AddPanelModal from "../../components/prosumer/AddPanelModal.jsx";
import { useProsumerPanels } from "../../components/prosumer/useProsumerPanels.js";

export default function ProsumerSolarPanels() {
  const p = useProsumerPanels();

  return (
    <DashboardLayout
      title="My Solar Arrays & Hardware ☀"
      subtitle="Manage your rooftop solar panel installations, capacity specifications, and array health."
      action={
        <button
          onClick={() => p.setShowAddModal(true)}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition"
        >
          <Plus size={16} /> Add Solar Array
        </button>
      }
    >
      {p.notice && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-900">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{p.notice}</span>
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total System Capacity" value={`${p.totalCapacity.toFixed(1)} kW`} sublabel="Combined array output" icon={Sun} accent="amber" />
        <StatCard label="Total Installed Modules" value={`${p.totalPanelsCount} Panels`} sublabel="Monocrystalline cells" icon={Zap} accent="blue" />
        <StatCard label="System Health Score" value="98% Optimal" sublabel="DISCOM smart meter sync" icon={ShieldCheck} accent="green" />
      </div>

      <PanelListTable panels={p.panels} handleDeletePanel={p.handleDeletePanel} />
      <AddPanelModal showAddModal={p.showAddModal} setShowAddModal={p.setShowAddModal} form={p.form} setForm={p.setForm} handleAddPanel={p.handleAddPanel} />
    </DashboardLayout>
  );
}
