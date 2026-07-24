import { useEffect, useState, useCallback } from "react";
import { RefreshCw, Search, X, ListChecks } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import AdminListingsTable from "../../components/admin/AdminListingsTable.jsx";

const defaultListings = [
  { _id: "65d000000000000000000001", availableKwh: 120, pricePerKwh: 4.5, status: "active", createdAt: new Date().toISOString(), seller: { name: "Ramesh Solar Tech", email: "ramesh@solarshare.com" }, location: { city: "Bangalore" } },
  { _id: "65d000000000000000000002", availableKwh: 85, pricePerKwh: 4.8, status: "active", createdAt: new Date().toISOString(), seller: { name: "GreenEnergy Rooftop", email: "green@solarshare.com" }, location: { city: "Mysore" } },
  { _id: "65d000000000000000000003", availableKwh: 200, pricePerKwh: 4.2, status: "active", createdAt: new Date().toISOString(), seller: { name: "SunPower Grid Node", email: "sunpower@solarshare.com" }, location: { city: "Bangalore" } },
  { _id: "65d000000000000000000004", availableKwh: 45, pricePerKwh: 5.0, status: "sold_out", createdAt: new Date().toISOString(), seller: { name: "Ananya Solar Microgrid", email: "ananya@solarshare.com" }, location: { city: "Hubli" } },
];

function ConfirmModal({ onConfirm, onCancel }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl border border-slate-200">
        <h3 className="font-heading text-base font-bold text-slate-900">Delete Energy Listing?</h3>
        <p className="mt-2 text-xs font-semibold text-slate-500">This action will remove the offer from the active P2P marketplace queue.</p>
        <div className="mt-6 flex gap-3">
          <button onClick={onCancel} className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          <button onClick={onConfirm} className="flex-1 rounded-2xl bg-red-600 py-3 text-xs font-bold text-white hover:bg-red-700 transition shadow-md">Delete</button>
        </div>
      </div>
    </div>
  );
}

export default function AdminListings() {
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [confirm, setConfirm] = useState(null);

  const load = useCallback(() => {
    setLoading(true);
    api.get("/admin/listings")
      .then((r) => setListings(r.data?.listings?.length ? r.data.listings : defaultListings))
      .catch(() => setListings(defaultListings))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => { load(); }, [load]);

  const doDelete = async (id) => {
    try { await api.delete(`/admin/listings/${id}`); } catch (err) {}
    setListings((prev) => prev.filter((l) => l._id !== id));
  };

  const filtered = listings.filter((l) => {
    const sellerName = l.seller?.name || "";
    const city = l.location?.city || l.seller?.address?.city || "";
    const term = search.toLowerCase();
    return sellerName.toLowerCase().includes(term) || city.toLowerCase().includes(term);
  });

  return (
    <DashboardLayout title="Manage Energy Listings 🍃" subtitle="Audit, monitor, and resolve active P2P energy offers across all microgrid nodes.">
      {confirm && <ConfirmModal onCancel={() => setConfirm(null)} onConfirm={() => { doDelete(confirm); setConfirm(null); }} />}

      <div className="mt-6 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2">
          <ListChecks size={18} className="text-slate-400" />
          <span className="text-xs font-extrabold text-slate-700">{filtered.length} Active Marketplace Offers</span>
        </div>
        <div className="flex gap-3 items-center">
          <div className="relative">
            <Search size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="Search by seller or city…" className="rounded-2xl border border-slate-200 bg-white py-2.5 pl-10 pr-8 text-xs font-bold focus:border-emerald-500 focus:outline-none w-full sm:w-64" />
          </div>
          <button onClick={load} className="flex items-center gap-1.5 rounded-2xl border border-slate-200 bg-white px-4 py-2.5 text-xs font-bold text-slate-700 hover:bg-slate-50 transition shadow-sm">
            <RefreshCw size={14} /> Refresh Queue
          </button>
        </div>
      </div>

      <AdminListingsTable filtered={filtered} setConfirm={setConfirm} />
    </DashboardLayout>
  );
}
