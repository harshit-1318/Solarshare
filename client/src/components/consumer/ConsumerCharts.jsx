import { useMemo } from "react";
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar, Legend } from "recharts";

const number = (value) => Number(value || 0);

export default function ConsumerCharts({ history, range, setRange }) {
  const consumptionChartData = useMemo(() => {
    if (!history || history.length === 0) {
      return [
        { name: "6AM", Consumption: 1.1 },
        { name: "8AM", Consumption: 1.4 },
        { name: "10AM", Consumption: 1.7 },
        { name: "12PM", Consumption: 2.0 },
        { name: "2PM", Consumption: 2.3 },
        { name: "4PM", Consumption: 2.6 },
        { name: "6PM", Consumption: 2.9 },
        { name: "8PM", Consumption: 3.0 },
      ];
    }
    return history.map((r) => ({
      name: new Date(r.recordedAt).toLocaleTimeString("en-IN", { hour: "numeric", hour12: true }),
      Consumption: number(r.consumptionKwh),
    }));
  }, [history]);

  const costChartData = useMemo(() => {
    const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun"];
    const monthlyCons = { Jan: 120, Feb: 150, Mar: 180, Apr: 160, May: 220, Jun: 240 };
    return months.map((m) => {
      const kwh = monthlyCons[m];
      return { name: m, SolarShareCost: Math.round(kwh * 4.5), GridCost: Math.round(kwh * 8.5) };
    });
  }, []);

  return (
    <div className="mt-6 grid grid-cols-1 gap-6 xl:grid-cols-[1fr_1fr]">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-slate-900">Consumption Analytics</h3>
          <select
            value={range}
            onChange={(e) => setRange(e.target.value)}
            className="rounded-xl border border-slate-200 bg-slate-50 py-1.5 px-3 text-xs font-semibold text-slate-700 focus:border-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
          </select>
        </div>
        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={consumptionChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorCons" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.25} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "16px", border: "1px solid #e2e8f0", boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)" }} />
              <Area type="monotone" dataKey="Consumption" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorCons)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft flex flex-col justify-between">
        <h3 className="font-heading text-base font-bold text-slate-900">SolarShare vs Grid Cost (₹)</h3>
        <div className="h-64 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={costChartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "16px", border: "1px solid #e2e8f0" }} />
              <Legend wrapperStyle={{ fontSize: "11px", paddingTop: "8px" }} />
              <Bar dataKey="SolarShareCost" name="SolarShare P2P" fill="#10b981" radius={[6, 6, 0, 0]} />
              <Bar dataKey="GridCost" name="Utility DISCOM" fill="#94a3b8" radius={[6, 6, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
