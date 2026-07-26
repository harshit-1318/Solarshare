import { useState, useEffect } from "react";
import api from "../../../api/axios.js";

export function useToastLiveTrades() {
  const [currentTrade, setCurrentTrade] = useState(null);
  const [visible, setVisible] = useState(false);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    let index = 0;

    const fetchRealTrades = async () => {
      try {
        const res = await api.get("/transactions/public-recent", { timeout: 3000 });
        if (res.data && res.data.length > 0) {
          const trades = res.data;
          const t = trades[index % trades.length];
          index++;

          setAnimating(true);
          setTimeout(() => {
            setCurrentTrade({
              id: t._id,
              seller: t.sellerName || "Solar Generator",
              buyer: t.buyerName || "Energy Buyer",
              city: t.location || "India",
              amount: `${t.energyAmountKwh} kWh`,
              rate: `₹${t.pricePerKwh}`,
              revenue: `₹${t.totalAmount}`,
              time: "Just now",
            });
            setVisible(true);
            setAnimating(false);
          }, 300);
        } else {
          setVisible(false);
          setCurrentTrade(null);
        }
      } catch (err) {
        setVisible(false);
        setCurrentTrade(null);
      }
    };

    fetchRealTrades();
    const interval = setInterval(fetchRealTrades, 7000);
    return () => clearInterval(interval);
  }, []);

  return { currentTrade, visible, setVisible, animating };
}
