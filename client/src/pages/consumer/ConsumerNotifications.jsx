import DashboardLayout from "../../components/DashboardLayout.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useConsumerNotifications } from "../../components/consumer/useConsumerNotifications.js";
import NotificationList from "../../components/consumer/NotificationList.jsx";

export default function ConsumerNotifications() {
  const { user } = useAuth();
  const n = useConsumerNotifications(user);

  return (
    <DashboardLayout
      title="Consumer Notifications & Grid Alerts 🔔"
      subtitle="Stay updated with your energy trading activity, trade settlements, & admin dispute responses."
      action={
        n.unreadCount > 0 && (
          <button
            onClick={n.handleMarkAllRead}
            className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition"
          >
            Mark all as read
          </button>
        )
      }
    >
      <div className="mt-7 flex gap-2">
        <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-red-50 text-red-600 border border-red-200">
          {n.unreadCount} Unread Alerts
        </span>
        <span className="text-[10px] font-extrabold uppercase px-3 py-1 rounded-full bg-slate-100 text-slate-600 border border-slate-200">
          {n.items.length} Total
        </span>
      </div>

      <NotificationList
        items={n.items}
        loading={n.loading}
        handleMarkRead={n.handleMarkRead}
        handleDeleteNotif={n.handleDeleteNotif}
      />
    </DashboardLayout>
  );
}
