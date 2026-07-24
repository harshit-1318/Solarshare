import { AreaChart, Area, BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from "recharts";
import { Sun, DollarSign } from "lucide-react";

export default function ProsumerCharts({ liveData, monthlyEarnings }) {
  return (
    <div className="mt-8 grid grid-cols-1 gap-6 xl:grid-cols-2">
      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-amber-500 bg-amber-50 px-2.5 py-1 rounded-full">Telemetry Feed</span>
            <h3 className="font-heading text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
              <Sun size={17} className="text-amber-500" /> Today's Generation Curve (kW)
            </h3>
          </div>
          <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 border border-emerald-200 px-3 py-1 rounded-full">Peak 6.4 kW</span>
        </div>
        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={liveData}>
              <defs>
                <linearGradient id="solarGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.4} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="time" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "16px", border: "none", color: "#fff", fontSize: "12px" }} />
              <Area type="monotone" dataKey="gen" stroke="#10b981" strokeWidth={3} fill="url(#solarGrad)" name="Solar Gen (kW)" />
              <Area type="monotone" dataKey="cons" stroke="#64748b" strokeWidth={2} strokeDasharray="4 4" fill="none" name="Home Load (kW)" />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft">
        <div className="flex items-center justify-between border-b border-slate-100 pb-4">
          <div>
            <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full">Monetization</span>
            <h3 className="font-heading text-base font-bold text-slate-900 mt-1 flex items-center gap-2">
              <DollarSign size={17} className="text-emerald-600" /> Monthly Revenue (₹)
            </h3>
          </div>
          <span className="text-xs font-bold text-slate-500">2024 YTD</span>
        </div>
        <div className="mt-6 h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={monthlyEarnings}>
              <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
              <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip contentStyle={{ backgroundColor: "#0f172a", borderRadius: "16px", border: "none", color: "#fff", fontSize: "12px" }} />
              <Bar dataKey="earn" fill="#059669" radius={[8, 8, 0, 0]} name="P2P Earnings (₹)" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </div>
  );
}
