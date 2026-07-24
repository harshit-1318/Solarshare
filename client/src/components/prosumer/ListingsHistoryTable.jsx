import { Leaf } from "lucide-react";

const number = (value) => Number(value || 0);

export default function ListingsHistoryTable({ listings }) {
  return (
    <section className="mt-8">
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-slate-900">Your Published Listings History</h3>
        <p className="text-xs text-slate-500">Track current status and historical solar listings</p>
      </div>

      <div className="overflow-hidden rounded-3xl border border-slate-200/80 bg-white shadow-soft">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200/80 bg-slate-50/80 text-[11px] font-extrabold uppercase tracking-wider text-slate-500">
                <th className="px-6 py-4">Available Energy</th>
                <th className="px-6 py-4">Tariff Price</th>
                <th className="px-6 py-4">Listing Status</th>
                <th className="px-6 py-4">Published Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {listings.map((item) => (
                <tr className="transition hover:bg-slate-50/80" key={item._id}>
                  <td className="px-6 py-4 font-extrabold text-slate-900">
                    {number(item.availableKwh).toFixed(1)} kWh
                  </td>
                  <td className="px-6 py-4 font-bold text-emerald-600">
                    ₹{number(item.pricePerKwh).toFixed(2)}
                    <span className="font-normal text-slate-400 text-xs">/kWh</span>
                  </td>
                  <td className="px-6 py-4">
                    <span
                      className={`inline-flex items-center gap-1 rounded-full px-3 py-1 text-xs font-bold capitalize ${
                        item.status === "active"
                          ? "bg-emerald-50 text-emerald-700 border border-emerald-200"
                          : "bg-slate-100 text-slate-600"
                      }`}
                    >
                      {item.status?.replace("_", " ")}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-xs font-medium text-slate-500">
                    {new Date(item.createdAt).toLocaleDateString("en-IN")}
                  </td>
                </tr>
              ))}

              {!listings.length && (
                <tr>
                  <td colSpan={4} className="p-12 text-center text-xs font-bold text-slate-400">
                    <Leaf size={32} className="mx-auto text-slate-300 mb-2" />
                    No listings published yet. Use the form above to create your first solar listing.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
