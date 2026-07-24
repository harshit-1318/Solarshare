import { Zap, ShoppingBag } from "lucide-react";

const number = (val) => Number(val) || 0;

const formatOrderDate = (dateVal) => {
  if (!dateVal) return new Date().toLocaleString("en-IN");
  const d = new Date(dateVal);
  if (isNaN(d.getTime())) return new Date().toLocaleString("en-IN");
  return d.toLocaleString("en-IN");
};

export default function OrderListTable({ filteredOrders, tab, setTab }) {
  return (
    <>
      <div className="mt-8 flex rounded-2xl bg-white border border-slate-200/80 p-1.5 shadow-soft max-w-md text-xs font-bold">
        {["all", "completed", "pending", "cancelled"].map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`flex-1 py-2.5 rounded-xl capitalize text-center transition ${
              tab === t ? "bg-emerald-600 text-white shadow-sm" : "text-slate-600 hover:text-slate-900"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-4">
        {filteredOrders.map((o) => (
          <div
            key={o._id}
            className="rounded-3xl border border-slate-200/80 bg-white p-6 shadow-soft flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:border-slate-300 transition duration-200"
          >
            <div className="flex items-center gap-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 border border-emerald-200/60 shrink-0">
                <Zap size={22} />
              </div>

              <div>
                <div className="flex items-center gap-2">
                  <h4 className="font-heading text-base font-bold text-slate-900">
                    Order #{String(o._id).substring(String(o._id).length - 8).toUpperCase()}
                  </h4>
                  <span
                    className={`inline-flex items-center gap-1 rounded-full px-2.5 py-0.5 text-[10px] font-extrabold uppercase ${
                      o.status === "completed"
                        ? "bg-emerald-100 text-emerald-800"
                        : o.status === "pending"
                        ? "bg-amber-100 text-amber-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {o.status}
                  </span>
                </div>
                <p className="text-xs font-semibold text-slate-600 mt-1">
                  Purchased Energy: <span className="text-slate-900 font-bold">{number(o.kwh).toFixed(1)} kWh</span> @ ₹{number(o.pricePerKwh).toFixed(2)}/kWh
                </p>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Ordered on {formatOrderDate(o.createdAt)}
                </p>
              </div>
            </div>

            <div className="text-right sm:self-center w-full sm:w-auto flex sm:flex-col justify-between items-center sm:items-end border-t sm:border-0 pt-3 sm:pt-0 border-slate-100">
              <span className="font-heading text-lg font-black text-emerald-600">
                ₹{number(o.totalAmount).toFixed(2)}
              </span>
            </div>
          </div>
        ))}

        {filteredOrders.length === 0 && (
          <div className="py-16 text-center text-xs font-bold text-slate-400">
            <ShoppingBag size={32} className="mx-auto text-slate-300 mb-2" />
            No orders found in this status category.
          </div>
        )}
      </div>
    </>
  );
}
