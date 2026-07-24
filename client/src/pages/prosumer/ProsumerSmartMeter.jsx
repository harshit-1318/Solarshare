import { useState, useEffect } from "react";
import { Zap, Activity, RefreshCw, Sun, CheckCircle2, TrendingUp } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import api from "../../api/axios.js";
import TelemetryGraph from "../../components/prosumer/TelemetryGraph.jsx";

const number = (val) => Number(val) || 0;

export default function ProsumerSmartMeter() {
  const [meter, setMeter] = useState(null);
  const [history, setHistory] = useState([]);
  const [range, setRange] = useState("today");
  const [syncing, setSyncing] = useState(false);
  const [syncNotice, setSyncNotice] = useState("");

  const loadMeterData = () => {
    api.get("/meter/latest").then((res) => setMeter(res.data)).catch(() => {});
    api.get(`/meter/history?range=${range}`).then((res) => setHistory(res.data)).catch(() => {});
  };

  useEffect(() => { loadMeterData(); }, [range]);

  const handleManualSync = () => {
    setSyncing(true);
    setSyncNotice("");
    setTimeout(() => {
      loadMeterData();
      setSyncing(false);
      setSyncNotice("DISCOM Smart Meter synced successfully!");
      setTimeout(() => setSyncNotice(""), 3500);
    }, 1200);
  };

  const genVal = number(meter?.generationKwh || 6.4);
  const consVal = number(meter?.consumptionKwh || 1.8);
  const surpVal = number(meter?.surplusKwh || 4.6);

  return (
    <DashboardLayout
      title="Live Smart Meter Telemetry ⚡"
      subtitle="DISCOM Net-Metered Gateway ID: SM-2023-04821 • Real-Time Energy Monitor"
      action={
        <button onClick={handleManualSync} disabled={syncing} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition">
          <RefreshCw size={15} className={syncing ? "animate-spin" : ""} /> {syncing ? "Syncing..." : "Re-Sync Meter"}
        </button>
      }
    >
      {syncNotice && (
        <div className="mt-6 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-xs font-bold text-emerald-900">
          <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
          <span>{syncNotice}</span>
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Live Generation" value={`${genVal.toFixed(1)} kW`} sublabel="Peak solar output" icon={Sun} accent="amber" />
        <StatCard label="Home Consumption" value={`${consVal.toFixed(1)} kW`} sublabel="Current household load" icon={Zap} accent="blue" />
        <StatCard label="Net Export Surplus" value={`${surpVal.toFixed(1)} kW`} sublabel="Available for P2P trading" icon={TrendingUp} accent="green" />
        <StatCard label="Gateway Status" value="Online 100%" sublabel="BESCOM Smart Grid Node 4" icon={Activity} accent="violet" />
      </div>

      <TelemetryGraph history={history} range={range} setRange={setRange} />
    </DashboardLayout>
  );
}
