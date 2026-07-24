import { useEffect, useState } from "react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import AdminSettingsForm from "../../components/admin/AdminSettingsForm.jsx";

export default function AdminSettings() {
  const [settings, setSettings] = useState({
    platformName: "SolarShare",
    gridRegion: "Bangalore Metropolitan Microgrid",
    autoSettlement: true,
    platformFeePercent: 5.0,
    gstTaxPercent: 18.0,
    maintenanceMode: false
  });
  const [saving, setSaving] = useState(false);
  const [msg, setMsg] = useState("");

  useEffect(() => {
    api.get("/admin/settings")
      .then((res) => setSettings(res.data))
      .catch(() => {});
  }, []);

  const handleSave = async (e) => {
    e.preventDefault();
    setSaving(true);
    setMsg("");
    try {
      await api.put("/admin/settings", settings);
      setMsg("Settings saved successfully!");
      setTimeout(() => setMsg(""), 3000);
    } catch (err) {
      setMsg("Failed to save settings.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <DashboardLayout
      title="Admin Settings & System Preferences"
      subtitle="Configure platform parameters, financial settlement rules, and grid modes."
    >
      <AdminSettingsForm
        settings={settings}
        setSettings={setSettings}
        handleSave={handleSave}
        saving={saving}
        msg={msg}
      />
    </DashboardLayout>
  );
}
