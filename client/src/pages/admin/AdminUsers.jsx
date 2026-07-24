import { useEffect, useState, useCallback } from "react";
import { Users, RefreshCw, Search, X } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import AdminUsersTable from "../../components/admin/AdminUsersTable.jsx";

function ConfirmModal({ message, onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm">
      <div className="w-full max-w-sm rounded-2xl bg-white p-7 shadow-xl">
        <p className="text-sm font-semibold text-slate-800">{message}</p>
        <div className="mt-6 flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-xl border border-slate-200 py-2.5 text-sm font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          <button onClick={onConfirm} className="flex-1 rounded-xl bg-red-600 py-2.5 text-sm font-bold text-white hover:bg-red-700 transition">Confirm</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.get("/admin/users").then((r) => setUsers(r.data.users)).finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const doBlock = async (id) => {
    await api.patch(`/admin/users/${id}/block`);
    setUsers((prev) => prev.map((u) => u._id === id ? { ...u, isBlocked: !u.isBlocked } : u));
  };
  const doDelete = async (id) => {
    await api.delete(`/admin/users/${id}`);
    setUsers((prev) => prev.filter((u) => u._id !== id));
  };

  const filtered = users.filter((u) =>
    u.name.toLowerCase().includes(search.toLowerCase()) ||
    u.email.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <DashboardLayout title="Users" subtitle="Manage all registered platform users.">
      {confirm && (
        <ConfirmModal
          message={confirm.type === "delete"
            ? `Delete "${confirm.name}"? This cannot be undone.`
            : `${confirm.isBlocked ? "Unblock" : "Block"} "${confirm.name}"?`}
          onCancel={() => setConfirm(null)}
          onConfirm={() => {
            if (confirm.type === "delete") doDelete(confirm.id);
            else doBlock(confirm.id);
            setConfirm(null);
          }}
        />
      )}

      <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <Users size={16} className="text-slate-400" />
          <span className="text-sm font-semibold text-slate-500">{filtered.length} users</span>
        </div>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-[11px] text-slate-400 pointer-events-none" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by name or email…" className="rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-8 text-sm text-slate-900 placeholder:text-slate-400 focus:border-emerald-500 focus:outline-none w-full sm:w-64" />
          </div>
          <button onClick={load} className="flex items-center gap-1.5 rounded-xl border border-slate-200 px-3 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">
            <RefreshCw size={13} /> Refresh
          </button>
        </div>
      </div>

      <AdminUsersTable filtered={filtered} setConfirm={setConfirm} />
    </DashboardLayout>
  );
}
