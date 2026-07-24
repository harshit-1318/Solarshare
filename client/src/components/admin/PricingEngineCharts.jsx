import { TrendingUp } from "lucide-react";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function PricingEngineCharts({ currentPrice, minPrice, maxPrice, trends, demandSupply }) {
  return (
    <>
      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm flex flex-col justify-between">
        <div>
          <p className="text-xs font-semibold text-slate-400 text-center">Current Energy Price</p>
          <h2 className="font-heading text-5xl font-black text-emerald-600 text-center mt-3">
            ₹{currentPrice.toFixed(2)}
          </h2>
          <p className="text-xs font-bold text-slate-400 text-center mt-1">per kWh</p>
          <p className="text-xs font-bold text-emerald-600 text-center mt-3 flex items-center justify-center gap-1">
            <TrendingUp size={14} /> +12% from last hour
          </p>
        </div>

        <div className="mt-8 space-y-2">
          <div className="h-2 w-full overflow-hidden rounded-full bg-slate-100 relative">
            <div className="h-full bg-amber-400 rounded-full" style={{ width: "65%" }} />
          </div>
          <div className="flex justify-between text-xs font-bold text-slate-400">
            <span>₹{minPrice}</span>
            <span>₹{maxPrice}</span>
          </div>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="font-heading text-base font-bold text-slate-900">Price Trends</h3>
        <div className="h-56 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={trends} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} domain={[0, 8]} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #f1f5f9" }} />
              <Line type="monotone" dataKey="Price" name="Price (₹/kWh)" stroke="#f59e0b" strokeWidth={2.5} dot={{ r: 4, fill: "#f59e0b" }} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </section>

      <section className="rounded-2xl border border-slate-100 bg-white p-6 shadow-sm">
        <h3 className="font-heading text-base font-bold text-slate-900">Demand vs Supply</h3>
        <div className="h-56 mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={demandSupply} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" />
              <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
              <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
              <Tooltip contentStyle={{ borderRadius: "12px", border: "1px solid #f1f5f9" }} />
              <Legend iconType="square" fontSize={11} />
              <Bar dataKey="Supply" name="Supply (kW)" fill="#854d0e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="Demand" name="Demand (kW)" fill="#f87171" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </section>
    </>
  );
}
