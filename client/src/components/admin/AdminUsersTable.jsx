import { CheckCircle, Ban, Trash2 } from "lucide-react";

const ROLE_COLORS = {
  prosumer: "bg-emerald-100 text-emerald-700",
  consumer: "bg-blue-100 text-blue-700",
  admin: "bg-violet-100 text-violet-700",
};

const fmtDate = (d) => d ? new Date(d).toLocaleDateString("en-IN", { day: "2-digit", month: "short", year: "numeric" }) : "—";

function Badge({ label, colorClass }) {
  return (
    <span className={`inline-block rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${colorClass}`}>
      {label}
    </span>
  );
}

export default function AdminUsersTable({ filtered, setConfirm }) {
  return (
    <div className="mt-4 overflow-x-auto rounded-2xl border border-slate-100 bg-white shadow-sm">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-slate-100 bg-slate-50 text-left text-xs font-bold uppercase tracking-wider text-slate-400">
            <th className="px-5 py-3.5">Name</th>
            <th className="px-5 py-3.5">Email</th>
            <th className="px-5 py-3.5">Role</th>
            <th className="px-5 py-3.5">City</th>
            <th className="px-5 py-3.5">Status</th>
            <th className="px-5 py-3.5">Joined</th>
            <th className="px-5 py-3.5">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-slate-50">
          {filtered.map((u) => (
            <tr key={u._id} className="hover:bg-slate-50/50 transition-colors">
              <td className="px-5 py-3.5 font-semibold text-slate-900">{u.name}</td>
              <td className="px-5 py-3.5 text-slate-500">{u.email}</td>
              <td className="px-5 py-3.5"><Badge label={u.role} colorClass={ROLE_COLORS[u.role]} /></td>
              <td className="px-5 py-3.5 text-slate-500">{u.address?.city || "—"}</td>
              <td className="px-5 py-3.5">
                <Badge label={u.isBlocked ? "Blocked" : "Active"}
                  colorClass={u.isBlocked ? "bg-red-100 text-red-600" : "bg-emerald-100 text-emerald-700"} />
              </td>
              <td className="px-5 py-3.5 text-slate-400 text-xs">{fmtDate(u.createdAt)}</td>
              <td className="px-5 py-3.5">
                {u.role !== "admin" && (
                  <div className="flex gap-2">
                    <button onClick={() => setConfirm({ type: "block", id: u._id, name: u.name, isBlocked: u.isBlocked })}
                      className={`flex items-center gap-1 rounded-lg px-2.5 py-1.5 text-xs font-bold transition ${u.isBlocked ? "bg-emerald-50 text-emerald-700 hover:bg-emerald-100" : "bg-amber-50 text-amber-700 hover:bg-amber-100"}`}>
                      {u.isBlocked ? <><CheckCircle size={12} /> Unblock</> : <><Ban size={12} /> Block</>}
                    </button>
                    <button onClick={() => setConfirm({ type: "delete", id: u._id, name: u.name })}
                      className="flex items-center gap-1 rounded-lg bg-red-50 px-2.5 py-1.5 text-xs font-bold text-red-600 hover:bg-red-100 transition">
                      <Trash2 size={12} /> Delete
                    </button>
                  </div>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
