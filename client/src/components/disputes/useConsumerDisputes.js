import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const fallbackDisputes = [
  {
    _id: "65d000000000000000000088", disputeCode: "DIS-84920", reason: "Smart meter reading discrepancy for transaction TX-9281.", status: "open", priority: "high", createdAt: new Date().toISOString(),
    messages: [{ senderName: "Harshit (Consumer)", senderRole: "consumer", message: "Smart meter reading discrepancy for transaction TX-9281. 5.5 kWh was billed but DISCOM logged 3.2 kWh.", createdAt: new Date().toISOString() }],
  },
];

export function useConsumerDisputes(user) {
  const [disputes, setDisputes] = useState([]);
  const [activeDisputeId, setActiveDisputeId] = useState(null);
  const [search, setSearch] = useState("");
  const [showRaiseModal, setShowRaiseModal] = useState(false);
  const [form, setForm] = useState({ reason: "", txId: "", description: "" });
  const [newMessage, setNewMessage] = useState("");
  const [notice, setNotice] = useState("");

  const loadDisputes = () => {
    if (!user) return;
    api.get("/disputes/mine").then((res) => {
      let serverList = res.data || [];
      const localSaved = localStorage.getItem("solarshare_disputes_cache");
      if (localSaved) {
        try {
          const cachedList = JSON.parse(localSaved);
          const existingIds = new Set(serverList.map((d) => String(d._id)));
          cachedList.forEach((c) => { if (!existingIds.has(String(c._id))) serverList.unshift(c); });
        } catch (e) {}
      }
      if (serverList.length === 0) serverList = fallbackDisputes;
      setDisputes(serverList);
      if (serverList.length > 0 && !activeDisputeId) setActiveDisputeId(serverList[0]._id);
    }).catch(() => {
      const saved = localStorage.getItem("solarshare_disputes_cache");
      const list = saved ? JSON.parse(saved) : fallbackDisputes;
      setDisputes(list);
      if (!activeDisputeId && list.length) setActiveDisputeId(list[0]._id);
    });
  };

  useEffect(() => {
    loadDisputes();
    const timer = setInterval(() => {
      const saved = localStorage.getItem("solarshare_disputes_cache");
      if (saved) { try { setDisputes(JSON.parse(saved)); } catch (e) {} }
    }, 1500);
    return () => clearInterval(timer);
  }, [user]);

  const activeDispute = disputes.find((d) => d._id === activeDisputeId || d.disputeCode === activeDisputeId) || disputes[0];

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeDispute || activeDispute.status === "resolved") return;
    const msgObj = { senderName: user?.name || "Consumer", senderRole: "consumer", message: newMessage.trim(), createdAt: new Date().toISOString() };
    const updatedDispute = { ...activeDispute, messages: [...(activeDispute.messages || []), msgObj] };
    const updatedList = disputes.map((d) => d._id === activeDispute._id || d.disputeCode === activeDispute.disputeCode ? updatedDispute : d);
    setDisputes(updatedList);
    localStorage.setItem("solarshare_disputes_cache", JSON.stringify(updatedList));
    setNewMessage("");
    api.post(`/disputes/${activeDispute._id}/messages`, { message: newMessage.trim() }).catch(() => {});
  };

  const handleRaiseDispute = async (e) => {
    e.preventDefault();
    if (!form.reason.trim()) return;
    const code = `DIS-${Math.floor(10000 + Math.random() * 90000)}`;
    const newDispute = {
      _id: `disp_${Date.now()}`, disputeCode: code, reason: form.reason, status: "open", priority: "medium", createdAt: new Date().toISOString(),
      raisedBy: { name: user?.name || "Consumer", email: user?.email || "consumer@solarshare.com" },
      messages: [{ senderName: user?.name || "Consumer", senderRole: "consumer", message: form.description || form.reason, createdAt: new Date().toISOString() }],
    };
    const updatedList = [newDispute, ...disputes];
    setDisputes(updatedList);
    localStorage.setItem("solarshare_disputes_cache", JSON.stringify(updatedList));
    setActiveDisputeId(newDispute._id);
    setShowRaiseModal(false);
    setNotice(`Claim #${code} submitted! Grid Admin has been notified.`);
    setTimeout(() => setNotice(""), 4000);
    setForm({ reason: "", txId: "", description: "" });
    api.post("/disputes", { reason: form.reason, transaction: form.txId || undefined, details: form.description }).catch(() => {});
  };

  const filteredDisputes = disputes.filter((d) => (d.disputeCode || "").toLowerCase().includes(search.toLowerCase()) || (d.reason || "").toLowerCase().includes(search.toLowerCase()));

  return { disputes, activeDisputeId, setActiveDisputeId, search, setSearch, showRaiseModal, setShowRaiseModal, form, setForm, newMessage, setNewMessage, notice, activeDispute, handleSendMessage, handleRaiseDispute, filteredDisputes };
}
