import { useEffect, useState } from "react";
import { Bell, Plus, CheckCircle, Trash2 } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import BroadcastModal from "../../components/admin/BroadcastModal.jsx";

export default function AdminNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [filterType, setFilterType] = useState("all");
  const [showBroadcastModal, setShowBroadcastModal] = useState(false);
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [type, setType] = useState("system");
  const [sending, setSending] = useState(false);

  const getFallbackAdminNotifs = () => [
    { _id: "admin_notif_1", title: "🚨 New Dispute Filed", message: "Claim DIS-84920 filed.", type: "dispute", createdAt: new Date().toISOString(), isRead: false },
    { _id: "admin_notif_2", title: "Grid Peak Warning", message: "Substation load 89%.", type: "system", createdAt: new Date().toISOString(), isRead: true },
  ];

  const loadNotifications = () => {
    api.get("/notifications?scope=all")
      .then((res) => {
        let list = res.data || [];
        if (list.length === 0) list = getFallbackAdminNotifs();
        setNotifications(list);
      })
      .catch(() => setNotifications(getFallbackAdminNotifs()));
  };

  useEffect(() => { loadNotifications(); }, []);

  const handleMarkRead = async (id) => {
    setNotifications((prev) => prev.map((n) => (n._id === id ? { ...n, isRead: true } : n)));
    try { await api.patch(`/notifications/${id}/read`); } catch (err) {}
  };

  const handleMarkAllRead = async () => {
    setNotifications((prev) => prev.map((n) => ({ ...n, isRead: true })));
    try { await api.patch("/notifications/read-all"); } catch (err) {}
  };

  const handleDeleteNotif = async (id) => {
    setNotifications((prev) => prev.filter((n) => n._id !== id));
    try { await api.delete(`/notifications/${id}`); } catch (err) {}
  };

  const handleCreateNotification = async (e) => {
    e.preventDefault();
    if (!title || !message) return;
    setSending(true);
    const newBroadcast = { _id: `notif_${Date.now()}`, title, message, type, createdAt: new Date().toISOString(), isRead: false };
    setNotifications([newBroadcast, ...notifications]);
    try { await api.post("/notifications", { title, message, type, broadcast: true }); } catch (err) {}
    finally { setTitle(""); setMessage(""); setShowBroadcastModal(false); setSending(false); }
  };

  const filteredNotifications = notifications.filter((n) => filterType === "all" || n.type === filterType);

  return (
    <DashboardLayout
      title="Notifications & System Announcements 🔔"
      subtitle="View consumer dispute alerts & broadcast grid alerts."
      action={
        <div className="flex items-center gap-3">
          <button onClick={handleMarkAllRead} className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition">Mark All Read</button>
          <button onClick={() => setShowBroadcastModal(true)} className="flex items-center gap-2 rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"><Plus size={15} /> Send Announcement</button>
        </div>
      }
    >
      <div className="mt-7 flex flex-wrap items-center gap-2 border-b border-slate-200/80 pb-4">
        {["all", "dispute", "system", "transaction", "credit"].map((cat) => (
          <button key={cat} onClick={() => setFilterType(cat)} className={`rounded-2xl px-4 py-2 text-xs font-bold capitalize transition ${filterType === cat ? "bg-slate-900 text-white shadow-sm" : "bg-white text-slate-600 border border-slate-200/80"}`}>{cat}</button>
        ))}
      </div>

      <div className="mt-6 space-y-3.5">
        {filteredNotifications.map((n) => (
          <div key={n._id} className={`rounded-3xl border p-5 transition flex items-center justify-between gap-4 ${n.isRead ? "bg-white border-slate-200/80" : "bg-emerald-50/20 border-emerald-300 shadow-sm"}`}>
            <div className="flex items-start gap-4">
              <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600"><Bell size={20} /></span>
              <div>
                <h4 className="font-heading text-sm font-bold text-slate-900">{n.title}</h4>
                <p className="text-xs text-slate-600 mt-1">{n.message}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!n.isRead && <button onClick={() => handleMarkRead(n._id)} className="rounded-xl border border-slate-200 p-2 text-slate-500 hover:text-emerald-600"><CheckCircle size={16} /></button>}
              <button onClick={() => handleDeleteNotif(n._id)} className="rounded-xl border border-slate-200 p-2 text-slate-400 hover:text-red-500"><Trash2 size={16} /></button>
            </div>
          </div>
        ))}
      </div>

      <BroadcastModal showBroadcastModal={showBroadcastModal} setShowBroadcastModal={setShowBroadcastModal} title={title} setTitle={setTitle} message={message} setMessage={setMessage} type={type} setType={setType} handleCreateNotification={handleCreateNotification} sending={sending} />
    </DashboardLayout>
  );
}
