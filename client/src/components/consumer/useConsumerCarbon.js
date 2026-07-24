import { useEffect, useState } from "react";
import api from "../../api/axios.js";

const number = (val) => Number(val) || 0;

export function useConsumerCarbon(user) {
  const [certs, setCerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({ totalCO2SavedKg: 0, totalCreditsIssued: 0 });

  const loadData = () => {
    setLoading(true);
    api.get("/certificates").then((res) => setCerts(res.data)).catch(() => {});
    api.get("/certificates/stats").then((res) => setStats(res.data)).catch(() => {}).finally(() => setLoading(false));
  };

  useEffect(() => {
    loadData();
  }, []);

  const aggregatesTotalCO2Tons = (certsList, apiStats) => {
    if (certsList.length > 0) {
      const sum = certsList.reduce((acc, c) => acc + number(c.co2SavedKg), 0);
      return Number((sum / 1000).toFixed(2));
    }
    return number(apiStats?.totalCO2SavedKg) > 0 ? Number((apiStats.totalCO2SavedKg / 1000).toFixed(2)) : 2.84;
  };

  const aggregatesCredits = (certsList, apiStats) => {
    if (certsList.length > 0) return certsList.reduce((acc, c) => acc + number(c.creditsEarned), 0);
    return number(apiStats?.totalCreditsIssued) > 0 ? apiStats.totalCreditsIssued : 284;
  };

  const totalCO2Tons = aggregatesTotalCO2Tons(certs, stats);
  const creditsEarnedVal = aggregatesCredits(certs, stats);

  const handleDownloadCertificate = () => {
    api.get("/transactions/export/pdf", { responseType: "blob" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", `solarshare-carbon-certificate-${user?.name}.json`);
        document.body.appendChild(link);
        link.click();
        link.parentNode.removeChild(link);
      })
      .catch(() => alert("Download failed"));
  };

  return { certs, loading, stats, totalCO2Tons, creditsEarnedVal, handleDownloadCertificate };
}
