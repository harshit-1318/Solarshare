import { useEffect, useState, useMemo } from "react";
import api from "../../api/axios.js";

const number = (val) => Number(val) || 0;

export function useConsumerLedger(user) {
  const [txs, setTxs] = useState([]);
  const [wallet, setWallet] = useState(null);
  const [loading, setLoading] = useState(true);

  const getCacheKey = () => `solarshare_consumer_orders_${user?._id || user?.id || user?.email || "user"}`;

  const loadData = () => {
    setLoading(true);
    const cacheKey = getCacheKey();

    api.get("/transactions/mine")
      .then((res) => {
        let serverTxs = res.data || [];
        let consumerPurchasesOnly = serverTxs.filter((t) => {
          if (!t.buyer) return false;
          const buyerId = typeof t.buyer === "object" ? String(t.buyer._id) : String(t.buyer);
          const buyerEmail = typeof t.buyer === "object" ? t.buyer.email : null;
          const buyerName = typeof t.buyer === "object" ? t.buyer.name : null;
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
            const existingIds = new Set(consumerPurchasesOnly.map((t) => String(t._id)));
            cachedList.forEach((c) => {
              if (!existingIds.has(String(c._id))) consumerPurchasesOnly.unshift(c);
            });
          } catch (e) {}
        }
        setTxs(consumerPurchasesOnly);
      })
      .catch(() => {
        const saved = localStorage.getItem(cacheKey);
        if (saved) {
          try {
            setTxs(JSON.parse(saved));
            return;
          } catch (e) {}
        }
        setTxs([]);
      })
      .finally(() => setLoading(false));

    api.get("/wallet").then((res) => setWallet(res.data)).catch(() => {});
  };

  useEffect(() => {
    if (user) loadData();
  }, [user]);

  const aggregates = useMemo(() => {
    let walletBal = number(wallet?.balance);
    let totalSpent = 0;
    let platformFee = 0;
    let tax = 0;
    let completedCount = 0;

    txs.forEach((t) => {
      if (t.status === "completed") {
        totalSpent += number(t.totalAmount);
        platformFee += number(t.platformFee);
        tax += number(t.tax);
        completedCount++;
      }
    });

    const netSettled = totalSpent - platformFee - tax;
    return { walletBal, totalSpent, platformFee, tax, netSettled, completedCount };
  }, [txs, wallet]);

  const handleExportStatement = () => {
    api.get("/transactions/export/pdf", { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", "solarshare-settlement-statement.json");
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(() => alert("Export failed"));
  };

  return { txs, wallet, loading, aggregates, handleExportStatement };
}
