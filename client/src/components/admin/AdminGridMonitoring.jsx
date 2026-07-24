import { Activity, ShieldAlert } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function AdminGridMonitoring({ displayChartData }) {
  const healthMetrics = [
    { name: "Grid Stability", value: 94, color: "bg-emerald-500" },
    { name: "Smart Meter Uptime", value: 98, color: "bg-blue-500" },
    { name: "Payment Gateway", value: 99, color: "bg-emerald-500" },
    { name: "API Response Time", value: 87, color: "bg-amber-500" },
  ];

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1.4fr_0.8fr]">
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <div className="flex items-center gap-2">
          <Activity size={18} className="text-slate-400" />
          <h3 className="font-heading text-base font-bold text-slate-900">
            Live Grid Monitoring
          </h3>
        </div>

        <div className="h-64 mt-6">
          {displayChartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={displayChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis yAxisId="left" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <YAxis yAxisId="right" orientation="right" stroke="#94a3b8" fontSize={11} tickLine={false} />
                <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #f1f5f9" }} />
                <Legend iconType="circle" fontSize={11} />
                <Line yAxisId="left" type="monotone" dataKey="Production" name="Production (kW)" stroke="#10b981" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line yAxisId="left" type="monotone" dataKey="Consumption" name="Consumption (kW)" stroke="#3b82f6" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
                <Line yAxisId="right" type="monotone" dataKey="Price" name="Price (₹/kWh)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 3 }} activeDot={{ r: 5 }} />
              </LineChart>
            </ResponsiveContainer>
          ) : (
            <div className="h-full grid place-items-center text-xs text-slate-400">
              No grid monitoring data available yet.
            </div>
          )}
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
        <div className="flex items-center gap-2">
          <ShieldAlert size={18} className="text-slate-400" />
          <h3 className="font-heading text-base font-bold text-slate-900">
            System Health
          </h3>
        </div>

        <div className="mt-6 flex-1 space-y-5">
          {healthMetrics.map((m) => (
            <div key={m.name} className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-semibold text-slate-600">
                <span>{m.name}</span>
                <span className="font-bold text-slate-900">{m.value}%</span>
              </div>
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
                <div className={`h-full ${m.color}`} style={{ width: `${m.value}%` }} />
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
