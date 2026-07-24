import { useEffect, useState } from "react";
import api from "../../api/axios.js";

export function useProsumerCertificates() {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalCO2SavedKg: 0, totalCreditsIssued: 0 });
  const [showMintModal, setShowMintModal] = useState(false);
  const [mintVolume, setMintVolume] = useState("");
  const [minting, setMinting] = useState(false);

  const loadData = () => {
    setLoading(true);
    api.get("/certificates").then((res) => setCerts(res.data)).catch(() => {});
    api.get("/certificates/stats").then((res) => setStats(res.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleMintCertificate = async (e) => {
    e.preventDefault();
    if (!mintVolume || Number(mintVolume) <= 0) return;
    setMinting(true);
    try {
      await api.post("/certificates/generate", { kwhSold: Number(mintVolume) });
      setShowMintModal(false);
      setMintVolume("");
      loadData();
      alert("Certificate generated successfully!");
    } catch (err) {
      alert(err.response?.data?.message || "Could not generate certificate");
    } finally {
      setMinting(false);
    }
  };

  const handleTradeCertificate = async (id) => {
    try {
      const res = await api.post(`/certificates/${id}/trade`);
      alert(res.data.message);
    } catch (err) {
      alert(err.response?.data?.message || "Could not list certificate for trading");
    }
  };

  return { certs, loading, stats, showMintModal, setShowMintModal, mintVolume, setMintVolume, minting, loadData, handleMintCertificate, handleTradeCertificate };
}
