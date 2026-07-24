import { useState, useEffect } from "react";
import { Bell, Zap, CheckCircle2, ShieldCheck, Tag, CircleAlert, Trash2 } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";

const initialProsumerNotifications = [
  { id: 1, title: "P2P Trade Settled!", desc: "5.5 kWh solar power delivered to Priya Patel. ₹30.25 credited to your wallet.", time: "10 mins ago", type: "success" },
  { id: 2, title: "Smart Meter Telemetry Active", desc: "DISCOM Gateway SM-2023-04821 synchronized automatically.", time: "1 hour ago", type: "info" },
  { id: 3, title: "Carbon Credit Issued", desc: "0.12 Tons CO2 offset verified. +12 CC awarded to your environmental wallet.", time: "4 hours ago", type: "success" },
];

export default function ProsumerNotifications() {
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    const roleKey = "solarshare_notifications_prosumer";
    const saved = localStorage.getItem(roleKey);
    let list = [];
    if (saved) {
      try {
        list = JSON.parse(saved);
      } catch (e) {}
    }
    // Filter out any dispute notifications from prosumer view
    list = list.filter((n) => n.type !== "dispute" && !n.title?.toLowerCase().includes("dispute"));

    if (list.length === 0) {
      list = initialProsumerNotifications;
      localStorage.setItem(roleKey, JSON.stringify(list));
    }
    setNotifications(list);
  }, []);

  const clearAll = () => {
    setNotifications([]);
    localStorage.setItem("solarshare_notifications_prosumer", JSON.stringify([]));
  };

  return (
    <DashboardLayout
      title="Prosumer Notifications & Grid Alerts 🔔"
      subtitle="Real-time alerts for live trade executions, wallet payouts, & DISCOM net-metering status."
      action={
        notifications.length > 0 && (
          <button
            onClick={clearAll}
            className="rounded-2xl border border-slate-200 bg-white px-4 py-2 text-xs font-bold text-slate-700 hover:bg-slate-50 transition"
          >
            Clear All
          </button>
        )
      }
    >
      <div className="mt-7 max-w-3xl space-y-4">
        {notifications.map((n) => (
          <div
            key={n.id || n._id}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft flex items-start gap-4"
          >
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
              <Bell size={20} />
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h4 className="font-heading text-sm font-bold text-slate-900">{n.title}</h4>
                <span className="text-[11px] text-slate-400 font-semibold">{n.time || "Just now"}</span>
              </div>
              <p className="text-xs text-slate-600 mt-1 leading-relaxed">{n.desc || n.message}</p>
            </div>
          </div>
        ))}

        {notifications.length === 0 && (
          <div className="rounded-3xl border border-dashed border-slate-200 bg-white p-12 text-center">
            <Bell size={36} className="text-slate-300 mx-auto" />
            <h4 className="font-bold text-slate-800 mt-3">All Caught Up!</h4>
            <p className="text-xs text-slate-500 mt-1">You have no unread notifications.</p>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
}
