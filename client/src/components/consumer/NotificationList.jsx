import { CheckCircle, Info, AlertTriangle, Trash2, Bell } from "lucide-react";

export default function NotificationList({
  items,
  loading,
  handleMarkRead,
  handleDeleteNotif
}) {
  const getIcon = (type) => {
    switch (type) {
      case "transaction":
        return <CheckCircle className="text-emerald-500" size={17} />;
      case "system":
      case "dispute":
        return <AlertTriangle className="text-amber-500" size={17} />;
      default:
        return <Info className="text-blue-500" size={17} />;
    }
  };

  const getIconBg = (type) => {
    switch (type) {
      case "transaction":
        return "bg-emerald-50";
      case "system":
      case "dispute":
        return "bg-amber-50";
      default:
        return "bg-blue-50";
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center text-xs text-slate-400 font-semibold">
        Loading recent notification feeds...
      </div>
    );
  }

  return (
    <div className="mt-6 space-y-3.5">
      {items.map((n) => {
        const itemKey = n._id || n.id;

        return (
          <div
            key={itemKey}
            className={`group p-5 rounded-3xl border transition-all flex items-center justify-between gap-4 ${
              n.isRead ? "bg-white border-slate-200/80 text-slate-500" : "bg-emerald-50/20 border-emerald-300 text-slate-900 font-semibold shadow-sm"
            }`}
          >
            <div className="flex items-center gap-4 flex-1">
              <span className={`grid h-11 w-11 shrink-0 place-items-center rounded-2xl ${getIconBg(n.type)}`}>
                {getIcon(n.type)}
              </span>
              <div>
                <h4 className="text-sm font-bold text-slate-900 flex items-center gap-2">
                  {n.title}
                  {!n.isRead && <span className="h-2 w-2 rounded-full bg-emerald-500" />}
                </h4>
                <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.message || n.desc}</p>
                <p className="text-[10px] text-slate-400 font-medium mt-1.5">
                  {n.createdAt ? new Date(n.createdAt).toLocaleString("en-IN", { dateStyle: "medium", timeStyle: "short" }) : "Just now"}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {!n.isRead && (
                <button
                  onClick={() => handleMarkRead(itemKey)}
                  className="text-xs font-bold text-emerald-600 hover:text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 transition"
                >
                  Mark Read
                </button>
              )}
              <button
                onClick={() => handleDeleteNotif(itemKey)}
                className="text-slate-400 hover:text-red-500 p-2 rounded-xl hover:bg-red-50 transition"
                title="Delete alert"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        );
      })}

      {items.length === 0 && (
        <div className="py-16 text-center text-xs font-bold text-slate-400">
          <Bell size={32} className="mx-auto text-slate-300 mb-2" />
          No notifications recorded yet.
        </div>
      )}
    </div>
  );
}
