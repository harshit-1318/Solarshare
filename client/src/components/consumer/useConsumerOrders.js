import { useEffect, useState } from "react";
import api from "../../api/axios.js";

export function useConsumerOrders(user) {
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("all");
  const [loading, setLoading] = useState(true);

  const getCacheKey = () => `solarshare_consumer_orders_${user?._id || user?.id || user?.email || "user"}`;

  const loadOrders = () => {
    setLoading(true);
    const cacheKey = getCacheKey();

    api.get("/transactions/mine")
      .then((res) => {
        let serverOrders = res.data || [];
        let consumerOnlyOrders = serverOrders.filter((o) => {
          if (!o.buyer) return false;
          const buyerId = typeof o.buyer === "object" ? String(o.buyer._id) : String(o.buyer);
          const buyerEmail = typeof o.buyer === "object" ? o.buyer.email : null;
          const buyerName = typeof o.buyer === "object" ? o.buyer.name : null;
          const currentUserId = user?._id || user?.id;

          if (currentUserId && buyerId && String(buyerId) === String(currentUserId)) return true;
          if (user?.email && buyerEmail && buyerEmail.toLowerCase() === user.email.toLowerCase()) return true;
          if (user?.name && buyerName && buyerName.toLowerCase() === user.name.toLowerCase()) return true;
          return false;
        });

        const saved = localStorage.getItem(cacheKey);
        if (saved) {
          try {
            const cachedList = JSON.parse(saved);
            const existingIds = new Set(consumerOnlyOrders.map((o) => String(o._id)));
            cachedList.forEach((c) => {
              if (!existingIds.has(String(c._id))) consumerOnlyOrders.unshift(c);
            });
          } catch (e) {}
        }
        setOrders(consumerOnlyOrders);
      })
      .catch(() => {
        const saved = localStorage.getItem(cacheKey);
        if (saved) {
          try {
            setOrders(JSON.parse(saved));
            return;
          } catch (e) {}
        }
        setOrders([]);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    if (user) loadOrders();
  }, [user]);

  const filteredOrders = orders.filter((o) => {
    if (tab === "all") return true;
    if (tab === "active" || tab === "pending") return o.status === "pending" || o.status === "processing";
    if (tab === "completed") return o.status === "completed";
    if (tab === "cancelled") return o.status === "cancelled" || o.status === "disputed";
    return true;
  });

  return { orders, tab, setTab, loading, filteredOrders };
}
