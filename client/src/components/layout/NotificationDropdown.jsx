import { Bell, CheckCheck, Trash2, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function NotificationDropdown({
  showNotifMenu,
  setShowNotifMenu,
  unreadCount,
  notifications,
  handleMarkRead,
  handleMarkAllRead,
  handleClearAll,
}) {
  if (!showNotifMenu) return null;

  return (
    <div className="absolute right-0 top-12 z-50 w-80 sm:w-96 rounded-3xl border border-slate-200/80 bg-white p-4 shadow-2xl animate-in fade-in slide-in-from-top-2 duration-200">
      <div className="flex items-center justify-between border-b border-slate-100 pb-3 px-2">
        <div className="flex items-center gap-2">
          <span className="font-heading text-sm font-extrabold text-slate-900">Notifications</span>
          {unreadCount > 0 && <span className="rounded-full bg-emerald-500 px-2 py-0.5 text-[10px] font-bold text-white">{unreadCount} new</span>}
        </div>
        <div className="flex items-center gap-2 text-xs">
          {unreadCount > 0 && <button onClick={handleMarkAllRead} className="flex items-center gap-1 font-bold text-emerald-600 hover:text-emerald-700"><CheckCheck size={14} /> Read all</button>}
          <button onClick={handleClearAll} className="p-1 text-slate-400 hover:text-red-500"><Trash2 size={14} /></button>
        </div>
      </div>

      <div className="my-2 max-h-80 overflow-y-auto space-y-2 pr-1 custom-scrollbar">
        {notifications.length > 0 ? (
          notifications.map((n) => (
            <div key={n._id} onClick={() => handleMarkRead(n._id)} className={`group rounded-2xl p-3 text-xs transition cursor-pointer border ${n.isRead ? "bg-white border-slate-100 hover:bg-slate-50" : "bg-emerald-50/40 border-emerald-200/80 shadow-sm"}`}>
              <div className="flex items-start justify-between gap-2">
                <h4 className={`font-bold ${n.isRead ? "text-slate-800" : "text-slate-900"}`}>{n.title}</h4>
                <span className="text-[10px] text-slate-400 shrink-0">{new Date(n.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <p className="mt-1 text-slate-600 line-clamp-2">{n.message}</p>
            </div>
          ))
        ) : (
          <div className="py-8 text-center text-xs text-slate-400">No new notifications.</div>
        )}
      </div>

      <div className="pt-2 border-t border-slate-100 text-center">
        <Link to="/consumer/notifications" onClick={() => setShowNotifMenu(false)} className="inline-flex items-center justify-center gap-1.5 text-xs font-bold text-emerald-600 hover:text-emerald-700 py-1">
          View All Notifications <ArrowRight size={13} />
        </Link>
      </div>
    </div>
  );
}
