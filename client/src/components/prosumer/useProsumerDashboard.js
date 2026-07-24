import { useEffect, useMemo, useState } from "react";
import api from "../../api/axios.js";

const number = (value) => Number(value || 0);

export function useProsumerDashboard(user) {
  const [latest, setLatest] = useState(null);
  const [wallet, setWallet] = useState(null);
  const [listings, setListings] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [history, setHistory] = useState([]);
  const [range, setRange] = useState("today");

  useEffect(() => {
    api.get("/meter/latest").then((res) => setLatest(res.data)).catch(() => {});
    api.get("/wallet").then((res) => setWallet(res.data)).catch(() => {});
    api.get("/listings/mine").then((res) => setListings(res.data)).catch(() => {});
    api.get("/transactions/mine").then((res) => setTransactions(res.data)).catch(() => {});
  }, []);

  useEffect(() => {
    api.get(`/meter/history?range=${range}`).then((res) => setHistory(res.data)).catch(() => {});
  }, [range]);

  const activeListings = useMemo(() => listings.filter((l) => l.status === "active"), [listings]);

  const generation = number(latest?.generationKwh);
  const consumption = number(latest?.consumptionKwh);
  const surplus = number(latest?.surplusKwh);

  return {
    latest, wallet, listings, transactions, history, range, setRange,
    activeListings, generation, consumption, surplus
  };
}
