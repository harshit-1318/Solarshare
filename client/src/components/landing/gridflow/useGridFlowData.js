import { useState, useEffect } from "react";
import api from "../../../api/axios.js";

export function useGridFlowData() {
  const [tradesList, setTradesList] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [fade, setFade] = useState(false);
  const [tradeCount, setTradeCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLandingData = async () => {
      try {
        const res = await api.get("/public/landing-stats");
        if (res.data) {
          setTradeCount(res.data.totalTradesSettled || 0);
          if (res.data.recentTrades && res.data.recentTrades.length > 0) {
            setTradesList(res.data.recentTrades);
          } else if (res.data.recentListings && res.data.recentListings.length > 0) {
            setTradesList(
              res.data.recentListings.map((l) => ({
                id: l.id,
                sellerName: l.sellerName,
                buyerName: "Available for Buyer",
                location: l.city,
                energyAmountKwh: l.availableKwh,
                pricePerKwh: l.pricePerKwh,
                createdAt: l.createdAt,
              }))
            );
          } else {
            setTradesList([]);
          }
        }
      } catch (err) {
        console.error("Error fetching landing stats:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchLandingData();
    const refreshInterval = setInterval(fetchLandingData, 10000);
    return () => clearInterval(refreshInterval);
  }, []);

  useEffect(() => {
    if (tradesList.length <= 1) return;

    const timer = setInterval(() => {
      setFade(true);
      setTimeout(() => {
        setCurrentIndex((prev) => (prev + 1) % tradesList.length);
        setFade(false);
      }, 250);
    }, 4000);

    return () => clearInterval(timer);
  }, [tradesList.length]);

  const activeTrade = tradesList[currentIndex] || {
    sellerName: "Green Solar Prosumer",
    buyerName: "Local Household",
    location: "Bengaluru, KA",
    energyAmountKwh: 12.5,
    pricePerKwh: 5.5,
  };

  return { tradeCount, activeTrade, fade, loading };
}
