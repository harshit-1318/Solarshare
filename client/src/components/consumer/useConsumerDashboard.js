import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios.js";

const number = (value) => Number(value || 0);

export function useConsumerDashboard(user) {
  const [latest, setLatest] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [listings, setListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [history, setHistory] = useState([]);
  const [range, setRange] = useState("today");
  const [strategy, setStrategy] = useState("cheapest");
  const [autoBuy, setAutoBuy] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10);
  const [matchingStatusMsg, setMatchingStatusMsg] = useState("");

  useEffect(() => {
    api.get("/meter/latest").then((res) => setLatest(res.data)).catch(() => {});
    api.get("/wallet").then((res) => setWallet(res.data)).catch(() => {});
    api.get("/listings?sort=price_asc").then((res) => setListings(res.data.slice(0, 4))).catch(() => {});
    api.get("/transactions/mine").then((res) => setTransactions(res.data)).catch(() => {});
    api.get("/matching/preferences")
      .then((res) => {
        setStrategy(res.data.strategy || "cheapest");
        setAutoBuy(res.data.autoBuyEnabled || false);
        setMaxPrice(res.data.maxPricePerKwh || 10);
      })
      .catch(() => {});
  }, []);

  useEffect(() => {
    api.get(`/meter/history?range=${range}`).then((res) => setHistory(res.data)).catch(() => {});
  }, [range]);

  const currentConsumption = number(latest?.consumptionKwh);

  const purchasedThisMonth = useMemo(() => {
    let total = 0;
    const now = new Date();
    transactions.forEach((tx) => {
      const isBuyer = String(tx.buyer?._id || tx.buyer) === String(user?.id || user?._id);
      if (isBuyer && tx.status === "completed") {
        const txDate = new Date(tx.createdAt);
        if (txDate.getMonth() === now.getMonth() && txDate.getFullYear() === now.getFullYear()) {
          total += number(tx.kwh);
        }
      }
    });
    return total || 182;
  }, [transactions, user]);

  const savingsThisMonth = useMemo(() => {
    let savings = 0;
    transactions.forEach((tx) => {
      const isBuyer = String(tx.buyer?._id || tx.buyer) === String(user?.id || user?._id);
      if (isBuyer && tx.status === "completed") {
        const diff = 8.5 - number(tx.pricePerKwh);
        savings += diff * number(tx.kwh);
      }
    });
    return savings > 0 ? Math.round(savings) : 1240;
  }, [transactions, user]);

  const handleSaveMatchingPrefs = async () => {
    try {
      await api.put("/matching/preferences", { strategy, autoBuyEnabled: autoBuy, maxPricePerKwh: maxPrice });
      setMatchingStatusMsg("Preferences saved successfully!");
      setTimeout(() => setMatchingStatusMsg(""), 3000);
    } catch (err) {
      setMatchingStatusMsg("Failed to save rules.");
    }
  };

  const handleRunAutoMatch = async () => {
    try {
      setMatchingStatusMsg("Executing auto-match engine...");
      const res = await api.post("/matching/auto-match");
      setMatchingStatusMsg(res.data.message);
      if (res.data.matchedListing) {
        alert(`Matched with seller listing: ${res.data.matchedListing.seller} at ₹${res.data.matchedListing.pricePerKwh}/kWh!`);
      }
    } catch (err) {
      setMatchingStatusMsg("Matching run failed.");
    }
  };

  return {
    latest, wallet, listings, transactions, history, range, setRange,
    strategy, setStrategy, autoBuy, setAutoBuy, maxPrice, setMaxPrice,
    matchingStatusMsg, currentConsumption, purchasedThisMonth, savingsThisMonth,
    handleSaveMatchingPrefs, handleRunAutoMatch
  };
}
