import { useState, useEffect } from "react";
import api from "../../api/axios.js";

const fallbackDisputes = [
  {
    _id: "65d000000000000000000088", disputeCode: "DIS-84920", reason: "Smart meter reading discrepancy for transaction TX-9281.", status: "open", priority: "high", createdAt: new Date().toISOString(), raisedBy: { name: "Harshit (Consumer)", email: "harshit@solarshare.com" },
    messages: [{ senderName: "Harshit (Consumer)", senderRole: "consumer", message: "Smart meter reading discrepancy for transaction TX-9281.", createdAt: new Date().toISOString() }],
  },
];

export function useAdminDisputes(user) {
  const [disputes, setDisputes] = useState([]);
  const [activeDisputeId, setActiveDisputeId] = useState(null);
  const [search, setSearch] = useState("");
  const [newMessage, setNewMessage] = useState("");

  const loadDisputes = () => {
    api.get("/disputes").then((res) => {
      let serverDisputes = res.data || [];
      const localSaved = localStorage.getItem("solarshare_disputes_cache");
      if (localSaved) {
        try {
          const cachedList = JSON.parse(localSaved);
          const existingIds = new Set(serverDisputes.map((d) => String(d._id)));
          cachedList.forEach((c) => { if (!existingIds.has(String(c._id))) serverDisputes.unshift(c); });
        } catch (e) {}
      }
      if (serverDisputes.length === 0) serverDisputes = fallbackDisputes;
      setDisputes(serverDisputes);
      if (serverDisputes.length > 0 && !activeDisputeId) setActiveDisputeId(serverDisputes[0]._id);
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
  }, []);

  const activeDispute = disputes.find((d) => d._id === activeDisputeId || d.disputeCode === activeDisputeId) || disputes[0];

  const pushConsumerNotif = (title, message) => {
    const existing = JSON.parse(localStorage.getItem("solarshare_notifications_consumer") || "[]");
    localStorage.setItem("solarshare_notifications_consumer", JSON.stringify([{ _id: `notif_${Date.now()}`, title, message, type: "system", createdAt: new Date().toISOString(), isRead: false }, ...existing]));
  };

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!newMessage.trim() || !activeDispute || activeDispute.status === "resolved") return;
    const msgObj = { senderName: user?.name || "Anjana (Grid Admin)", senderRole: "admin", message: newMessage.trim(), createdAt: new Date().toISOString() };
    const updatedDispute = { ...activeDispute, messages: [...(activeDispute.messages || []), msgObj] };
    const updatedList = disputes.map((d) => d._id === activeDispute._id || d.disputeCode === activeDispute.disputeCode ? updatedDispute : d);
    setDisputes(updatedList);
    localStorage.setItem("solarshare_disputes_cache", JSON.stringify(updatedList));
    pushConsumerNotif(`💬 Grid Admin Message on Dispute #${activeDispute.disputeCode || activeDispute._id}`, `Grid Admin sent: "${newMessage.trim()}"`);
    setNewMessage("");
    api.post(`/disputes/${activeDispute._id}/messages`, { message: newMessage.trim() }).catch(() => {});
  };

  const handleResolveDispute = async () => {
    if (!activeDispute) return;
    const updatedDispute = { ...activeDispute, status: "resolved", resolution: "Resolved & Refunded by Grid Admin" };
    const updatedList = disputes.map((d) => d._id === activeDispute._id || d.disputeCode === activeDispute.disputeCode ? updatedDispute : d);
    setDisputes(updatedList);
    localStorage.setItem("solarshare_disputes_cache", JSON.stringify(updatedList));
    pushConsumerNotif(`✅ Dispute #${activeDispute.disputeCode || activeDispute._id} Resolved!`, "Grid Admin resolved claim & refunded wallet.");
    api.patch(`/disputes/${activeDispute._id}/status`, { status: "resolved", resolution: "Resolved & Refunded by Grid Admin" }).catch(() => {});
  };

  const handleDeleteDispute = async (idToDelete) => {
    if (!confirm("Delete this resolved dispute record?")) return;
    const updatedList = disputes.filter((d) => d._id !== idToDelete && d.disputeCode !== activeDispute?.disputeCode);
    setDisputes(updatedList);
    localStorage.setItem("solarshare_disputes_cache", JSON.stringify(updatedList));
    if (activeDisputeId === idToDelete) setActiveDisputeId(updatedList.length > 0 ? updatedList[0]._id : null);
    api.delete(`/disputes/${idToDelete}`).catch(() => {});
  };

  const filteredDisputes = disputes.filter((d) => (d.disputeCode || "").toLowerCase().includes(search.toLowerCase()) || (d.reason || "").toLowerCase().includes(search.toLowerCase()));

  return { disputes, activeDisputeId, setActiveDisputeId, search, setSearch, newMessage, setNewMessage, activeDispute, handleSendMessage, handleResolveDispute, handleDeleteDispute, filteredDisputes };
}
