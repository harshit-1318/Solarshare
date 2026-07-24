import { useState, useEffect } from "react";
import api from "../../api/axios.js";

export function useNotifications() {
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);

  const getFallbackNotifications = () => [
    { _id: "fallback_1", title: "⚡ Trade Execution Confirmed!", message: "Successfully purchased 8.5 kWh solar energy from Rajesh K.", createdAt: new Date().toISOString(), isRead: false },
    { _id: "fallback_2", title: "💚 Carbon Certificate Issued", message: "1.2 Carbon Credits added to your wallet offset registry.", createdAt: new Date().toISOString(), isRead: false },
    { _id: "fallback_3", title: "Smart Grid Rate Update", message: "Off-peak discount active in Zone 4 (₹5.10/unit).", createdAt: new Date().toISOString(), isRead: true },
  ];

  const loadNotifications = () => {
    api.get("/notifications")
      .then((res) => {
        let list = res.data || [];
        const localSaved = localStorage.getItem("solarshare_notifications_consumer");
        if (localSaved) {
          try {
            const cachedList = JSON.parse(localSaved);
            const existingIds = new Set(list.map((n) => String(n._id)));
            cachedList.forEach((c) => { if (!existingIds.has(String(c._id))) list.unshift(c); });
          } catch (e) {}
        }
        if (list.length === 0) list = getFallbackNotifications();
        setNotifications(list);
        setUnreadCount(list.filter((n) => !n.isRead).length);
      })
      .catch(() => {
        const localSaved = localStorage.getItem("solarshare_notifications_consumer");
        if (localSaved) {
          try {
            const cached = JSON.parse(localSaved);
            setNotifications(cached);
            setUnreadCount(cached.filter((n) => !n.isRead).length);
            return;
          } catch (e) {}
        }
        const fallback = getFallbackNotifications();
        setNotifications(fallback);
        setUnreadCount(fallback.filter((n) => !n.isRead).length);
      });
  };

  useEffect(() => {
    loadNotifications();
    const interval = setInterval(() => {
      const saved = localStorage.getItem("solarshare_notifications_consumer");
      if (saved) {
        try {
          const list = JSON.parse(saved);
          setNotifications(list);
          setUnreadCount(list.filter((n) => !n.isRead).length);
        } catch (e) {}
      }
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const handleMarkRead = (id) => {
    const updated = notifications.map((n) => (n._id === id ? { ...n, isRead: true } : n));
    setNotifications(updated);
    setUnreadCount(updated.filter((n) => !n.isRead).length);
    localStorage.setItem("solarshare_notifications_consumer", JSON.stringify(updated));
    api.patch(`/notifications/${id}/read`).catch(() => {});
  };

  const handleMarkAllRead = () => {
    const updated = notifications.map((n) => ({ ...n, isRead: true }));
    setNotifications(updated);
    setUnreadCount(0);
    localStorage.setItem("solarshare_notifications_consumer", JSON.stringify(updated));
    api.patch("/notifications/read-all").catch(() => {});
  };

  const handleClearAll = () => {
    setNotifications([]);
    setUnreadCount(0);
    localStorage.removeItem("solarshare_notifications_consumer");
  };

  return { notifications, unreadCount, handleMarkRead, handleMarkAllRead, handleClearAll };
}
