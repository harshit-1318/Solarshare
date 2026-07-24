import { Download } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

export default function ThroughputReportChart({ throughputData, handleExportCSV }) {
  return (
    <section className="mt-8 rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-slate-100 pb-4">
        <div>
          <h3 className="font-heading text-base font-bold text-slate-900">
            Microgrid Energy Generation vs Consumption Throughput (MWh)
          </h3>
          <p className="text-xs text-slate-500 mt-0.5">Bi-directional monthly solar generation vs grid sales</p>
        </div>

        <button
          onClick={handleExportCSV}
          className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition"
        >
          <Download size={14} /> Export CSV Report
        </button>
      </div>

      <div className="h-80 mt-7">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={throughputData} margin={{ top: 10, right: 10, left: -10, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f1f5f9" vertical={false} />
            <XAxis dataKey="month" stroke="#94a3b8" fontSize={11} tickLine={false} />
            <YAxis stroke="#94a3b8" fontSize={11} tickLine={false} domain={[0, "auto"]} />
            <Tooltip
              contentStyle={{
                borderRadius: "16px",
                border: "1px solid #e2e8f0",
                boxShadow: "0 10px 25px -5px rgba(0,0,0,0.1)",
                fontWeight: "bold",
                fontSize: "12px",
              }}
            />
            <Legend iconType="circle" wrapperStyle={{ paddingTop: "14px", fontSize: "12px" }} />
            <Bar dataKey="Generated" name="Energy Generated (MWh)" fill="#10b981" radius={[8, 8, 0, 0]} maxBarSize={28} />
            <Bar dataKey="Sold" name="Energy Sold (MWh)" fill="#3b82f6" radius={[8, 8, 0, 0]} maxBarSize={28} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </section>
  );
}
