import { Search } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useAdminDisputes } from "../../components/admin/useAdminDisputes.js";
import AdminDisputeDetail from "../../components/admin/AdminDisputeDetail.jsx";

export default function AdminDisputes() {
  const { user } = useAuth();
  const d = useAdminDisputes(user);

  return (
    <DashboardLayout
      title="Grid Admin Disputes Resolution ⚠"
      subtitle="Audit consumer trade claims, hold/release escrow funds, and message buyers."
    >
      <div className="mt-7 grid grid-cols-1 gap-6 lg:grid-cols-[0.8fr_1.2fr]">
        <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="font-heading text-base font-bold text-slate-900">
              Active Claims ({d.disputes.length})
            </h3>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200">
              Live Escrow Queue
            </span>
          </div>

          <div className="relative mt-4">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search by code, user, or reason..."
              value={d.search}
              onChange={(e) => d.setSearch(e.target.value)}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-2.5 pl-10 pr-4 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="mt-4 space-y-3 max-h-[550px] overflow-y-auto pr-1">
            {d.filteredDisputes.map((item) => {
              const isActive = item._id === d.activeDisputeId || item.disputeCode === d.activeDisputeId;
              const isOpen = item.status === "open";

              return (
                <div
                  key={item._id}
                  onClick={() => d.setActiveDisputeId(item._id)}
                  className={`p-4 rounded-2xl border cursor-pointer transition ${
                    isActive ? "border-emerald-500 bg-emerald-50/20 shadow-sm" : "border-slate-200/80 hover:bg-slate-50"
                  }`}
                >
                  <div className="flex justify-between text-[11px] font-bold">
                    <span className="font-mono text-slate-900">#{item.disputeCode || item._id}</span>
                    <span className={isOpen ? "text-amber-600" : "text-emerald-600"}>
                      {item.status.toUpperCase()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-700 font-semibold mt-1 truncate">{item.reason}</p>
                </div>
              );
            })}
          </div>
        </section>

        <section className="rounded-3xl border border-slate-200/80 bg-white shadow-soft">
          <AdminDisputeDetail
            activeDispute={d.activeDispute}
            newMessage={d.newMessage}
            setNewMessage={d.setNewMessage}
            handleSendMessage={d.handleSendMessage}
            handleResolveDispute={d.handleResolveDispute}
            handleDeleteDispute={d.handleDeleteDispute}
            user={user}
          />
        </section>
      </div>
    </DashboardLayout>
  );
}
