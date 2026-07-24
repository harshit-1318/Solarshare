import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend, AreaChart, Area } from "recharts";

export const MONTHLY_USAGE_DATA = [
  { month: "Jan", P2PUsage: 140, GridUsage: 60, Saved: 420 },
  { month: "Feb", P2PUsage: 180, GridUsage: 40, Saved: 540 },
  { month: "Mar", P2PUsage: 210, GridUsage: 50, Saved: 630 },
  { month: "Apr", P2PUsage: 190, GridUsage: 45, Saved: 570 },
  { month: "May", P2PUsage: 250, GridUsage: 30, Saved: 750 },
  { month: "Jun", P2PUsage: 280, GridUsage: 20, Saved: 840 },
];

export default function AnalyticsCharts() {
  return (
    <div className="mt-8 grid grid-cols-1 xl:grid-cols-[1.2fr_0.8fr] gap-6">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft flex flex-col justify-between">
        <div className="flex items-center justify-between">
          <h3 className="font-heading text-base font-bold text-slate-900">
            P2P Solar vs Grid Energy Mix (kWh)
          </h3>
          <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200">
            82% P2P Green Mix
          </span>
        </div>

        <div className="h-72 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={MONTHLY_USAGE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "16px", border: "1px solid #e2e8f0" }} />
              <Legend iconType="circle" wrapperStyle={{ paddingTop: "10px", fontSize: "12px" }} />
              <Bar name="SolarShare P2P Power" dataKey="P2PUsage" fill="#10b981" radius={[6, 6, 0, 0]} maxBarSize={30} />
              <Bar name="DISCOM Grid Backup" dataKey="GridUsage" fill="#94a3b8" radius={[6, 6, 0, 0]} maxBarSize={30} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft flex flex-col justify-between">
        <h3 className="font-heading text-base font-bold text-slate-900">
          Cumulative Cost Savings Trend (₹)
        </h3>

        <div className="h-72 mt-6">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={MONTHLY_USAGE_DATA} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="colorSaved" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0.0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "16px", border: "1px solid #e2e8f0" }} />
              <Area type="monotone" dataKey="Saved" stroke="#10b981" strokeWidth={2.5} fill="url(#colorSaved)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
