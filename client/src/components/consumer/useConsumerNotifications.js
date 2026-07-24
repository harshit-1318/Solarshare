import { useEffect, useState } from "react";
import api from "../../api/axios.js";

export function useConsumerNotifications(user) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const getCacheKey = () => {
    const userId = user?._id || user?.id || user?.email || "user";
    return `solarshare_notifications_consumer_${userId}`;
  };

  const loadNotifications = () => {
    if (!user) return;
    setLoading(true);
    const roleKey = getCacheKey();

    api.get("/notifications")
      .then((res) => {
        let serverList = res.data || [];
        let userList = serverList.filter((n) => {
          if (!n.recipient) return true;
          const recId = typeof n.recipient === "object" ? String(n.recipient._id) : String(n.recipient);
          const currentUserId = user?._id || user?.id;
          return currentUserId && recId ? recId === String(currentUserId) : true;
        });

        const local = JSON.parse(localStorage.getItem(roleKey) || "[]");
        const existingIds = new Set(userList.map((n) => String(n._id || n.id)));
        local.forEach((n) => {
          const nid = String(n._id || n.id);
          if (!existingIds.has(nid)) userList.unshift(n);
        });

        setItems(userList);
        localStorage.setItem(roleKey, JSON.stringify(userList));
      })
      .catch(() => {
        const local = JSON.parse(localStorage.getItem(roleKey) || "[]");
        setItems(local);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) loadNotifications();
  }, [user]);

  const handleMarkRead = async (id) => {
    const roleKey = getCacheKey();
    const updated = items.map((n) => {
      const nid = n._id || n.id;
      return nid === id || String(nid) === String(id) ? { ...n, isRead: true } : n;
    });
    setItems(updated);
    localStorage.setItem(roleKey, JSON.stringify(updated));
    try {
      await api.patch(`/notifications/${id}/read`);
    } catch (err) {}
  };

  const handleMarkAllRead = async () => {
    const roleKey = getCacheKey();
    const updated = items.map((n) => ({ ...n, isRead: true }));
    setItems(updated);
    localStorage.setItem(roleKey, JSON.stringify(updated));
    try {
      await api.patch("/notifications/read-all");
    } catch (err) {}
  };

  const handleDeleteNotif = async (id) => {
    const roleKey = getCacheKey();
    const updated = items.filter((n) => {
      const nid = n._id || n.id;
      return nid !== id && String(nid) !== String(id);
    });
    setItems(updated);
    localStorage.setItem(roleKey, JSON.stringify(updated));
    try {
      await api.delete(`/notifications/${id}`);
    } catch (err) {}
  };

  const unreadCount = items.filter((n) => !n.isRead).length;

  return { items, loading, unreadCount, handleMarkRead, handleMarkAllRead, handleDeleteNotif };
}
