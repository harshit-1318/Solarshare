import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import { ShieldCheck } from "lucide-react";

const number = (val) => Number(val) || 0;

export default function TelemetryGraph({ history, range, setRange }) {
  const chartData = useMemo(() => {
    if (history.length > 0) {
      return history.map((item) => ({
        time: item.timestamp ? new Date(item.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }) : "12:00",
        generation: number(item.generationKwh),
        consumption: number(item.consumptionKwh),
        surplus: number(item.surplusKwh),
      }));
    }
    return [
      { time: "06:00", generation: 0.8, consumption: 0.5, surplus: 0.3 },
      { time: "09:00", generation: 3.2, consumption: 1.2, surplus: 2.0 },
      { time: "12:00", generation: 6.4, consumption: 1.8, surplus: 4.6 },
      { time: "15:00", generation: 5.1, consumption: 1.5, surplus: 3.6 },
      { time: "18:00", generation: 1.5, consumption: 2.2, surplus: 0 },
    ];
  }, [history]);

  return (
    <div className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
        <div>
          <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Telemetry Log</span>
          <h3 className="font-heading text-lg font-bold text-slate-900 mt-1 flex items-center gap-2">
            <ShieldCheck size={18} className="text-emerald-600" /> Power Flow Telemetry (kW)
          </h3>
        </div>

        <div className="flex rounded-2xl bg-slate-100 p-1 text-xs font-bold">
          {["today", "week", "month"].map((r) => (
            <button key={r} onClick={() => setRange(r)} className={`rounded-xl px-4 py-1.5 transition capitalize ${range === r ? "bg-white text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-900"}`}>{r}</button>
          ))}
        </div>
      </div>

      <div className="mt-6 h-72 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={chartData}>
            <defs>
              <linearGradient id="genGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#10b981" stopOpacity={0.4} /><stop offset="95%" stopColor="#10b981" stopOpacity={0} /></linearGradient>
              <linearGradient id="surpGrad" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#f59e0b" stopOpacity={0.4} /><stop offset="95%" stopColor="#f59e0b" stopOpacity={0} /></linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
            <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "16px", border: "none", color: "#fff", fontSize: "12px" }} />
            <Area type="monotone" dataKey="generation" stroke="#10b981" strokeWidth={3} fill="url(#genGrad)" name="Solar Output (kW)" />
            <Area type="monotone" dataKey="surplus" stroke="#f59e0b" strokeWidth={2} fill="url(#surpGrad)" name="Surplus Export (kW)" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
