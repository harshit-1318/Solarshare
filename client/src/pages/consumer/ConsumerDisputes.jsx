import { AlertTriangle, Search, CheckCircle2, Clock, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useConsumerDisputes } from "../../components/disputes/useConsumerDisputes.js";
import DisputeChatPanel from "../../components/disputes/DisputeChatPanel.jsx";
import RaiseDisputeModal from "../../components/disputes/RaiseDisputeModal.jsx";

export default function ConsumerDisputes() {
  const { user } = useAuth();
  const d = useConsumerDisputes(user);

  return (
    <DashboardLayout
      title="Disputes & Meter Audit Claims ⚠"
      subtitle="File complaints regarding trade settlements, meter mismatches, & chat live with Grid Admin."
      action={
        <button onClick={() => d.setShowRaiseModal(true)} className="inline-flex items-center gap-2 rounded-2xl bg-red-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-red-700 transition">
          <AlertTriangle size={16} /> File New Complaint
        </button>
      }
    >
      {d.notice && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-900">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{d.notice}</span>
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard label="Total Disputes Raised" value={d.disputes.length.toString()} sublabel="All time complaints" icon={AlertTriangle} accent="amber" />
        <StatCard label="Open Investigations" value={d.disputes.filter((i) => i.status === "open").length.toString()} sublabel="Under Admin review" icon={Clock} accent="red" />
        <StatCard label="Resolved Claims" value={d.disputes.filter((i) => i.status === "resolved").length.toString()} sublabel="Escrow refunded / closed" icon={ShieldCheck} accent="green" />
      </div>

      <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="lg:col-span-5 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft">
          <div className="relative mb-4">
            <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" placeholder="Search disputes..." value={d.search} onChange={(e) => d.setSearch(e.target.value)} className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-9 pr-3 text-xs text-slate-900 focus:bg-white focus:outline-none" />
          </div>

          <div className="space-y-2.5 max-h-[440px] overflow-y-auto pr-1">
            {d.filteredDisputes.map((item) => {
              const isSelected = item._id === d.activeDisputeId || item.disputeCode === d.activeDisputeId;
              return (
                <button key={item._id} onClick={() => d.setActiveDisputeId(item._id)} className={`w-full p-4 rounded-2xl border text-left transition ${isSelected ? "border-emerald-500 bg-emerald-50/60 ring-2 ring-emerald-500/20" : "border-slate-200 bg-white hover:bg-slate-50"}`}>
                  <div className="flex items-center justify-between">
                    <span className="text-[11px] font-extrabold text-slate-900">#{item.disputeCode || item._id}</span>
                    <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full capitalize ${item.status === "resolved" ? "bg-emerald-100 text-emerald-800" : "bg-amber-100 text-amber-800"}`}>{item.status || "open"}</span>
                  </div>
                  <p className="text-xs font-semibold text-slate-700 mt-1 line-clamp-1">{item.reason}</p>
                </button>
              );
            })}
          </div>
        </div>

        <div className="lg:col-span-7 rounded-3xl border border-slate-200/80 bg-white shadow-soft">
          <DisputeChatPanel activeDispute={d.activeDispute} newMessage={d.newMessage} setNewMessage={d.setNewMessage} handleSendMessage={d.handleSendMessage} user={user} />
        </div>
      </div>

      <RaiseDisputeModal showRaiseModal={d.showRaiseModal} setShowRaiseModal={d.setShowRaiseModal} form={d.form} setForm={d.setForm} handleRaiseDispute={d.handleRaiseDispute} />
    </DashboardLayout>
  );
}
