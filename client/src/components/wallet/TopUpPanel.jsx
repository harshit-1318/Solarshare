import { Plus, CircleDollarSign, CheckCircle2 } from "lucide-react";

export default function TopUpPanel({
  amount,
  setAmount,
  topUp,
  loading,
  notice
}) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft flex flex-col justify-between">
      <div>
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60">
            <Plus size={20} />
          </div>
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
              Testing Environment
            </span>
            <h3 className="font-heading text-lg font-bold text-slate-900 mt-1">Add Demo Funds</h3>
          </div>
        </div>

        <p className="mt-4 text-xs leading-relaxed text-slate-500 font-normal">
          Simulate payment gateway top-up to test local energy purchasing and live trade settlements.
        </p>

        <div className="mt-5 flex flex-wrap gap-2">
          {["500", "1000", "2500", "5000"].map((preset) => (
            <button
              key={preset}
              type="button"
              onClick={() => setAmount(preset)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
                amount === preset
                  ? "bg-emerald-600 text-white shadow-sm"
                  : "bg-slate-100 text-slate-700 hover:bg-slate-200"
              }`}
            >
              +₹{preset}
            </button>
          ))}
        </div>

        <form onSubmit={topUp} className="mt-5 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-sm font-bold text-slate-400">
              ₹
            </span>
            <input
              aria-label="Top up amount"
              value={amount}
              onChange={(event) => setAmount(event.target.value)}
              type="number"
              min="1"
              max="10000"
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3.5 pl-9 pr-4 text-sm font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-500/10 focus:outline-none transition"
            />
          </div>
          <button
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3.5 text-xs font-bold text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700 transition disabled:opacity-50"
          >
            {loading ? "Adding..." : <><CircleDollarSign size={16} /> Add Funds</>}
          </button>
        </form>

        {notice && (
          <div
            className={`mt-4 flex items-center gap-2 rounded-2xl p-3.5 text-xs font-semibold ${
              notice.toLowerCase().includes("success") || notice.toLowerCase().includes("added")
                ? "bg-emerald-50 text-emerald-900 border border-emerald-200"
                : "bg-amber-50 text-amber-900 border border-amber-200"
            }`}
          >
            <CheckCircle2 size={16} className="shrink-0 text-emerald-600" />
            <span>{notice}</span>
          </div>
        )}
      </div>
    </section>
  );
}
