import { useEffect, useMemo, useState } from "react";
import { CircleAlert, Tag, ShieldCheck } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import api from "../../api/axios.js";
import CreateListingForm from "../../components/prosumer/CreateListingForm.jsx";
import ListingsHistoryTable from "../../components/prosumer/ListingsHistoryTable.jsx";

const number = (value) => Number(value || 0);

export default function ListingsPage() {
  const [listings, setListings] = useState([]);
  const [notice, setNotice] = useState("");
  const [saving, setSaving] = useState(false);
  const [form, setForm] = useState({ availableKwh: "5", pricePerKwh: "5.5", city: "" });

  const load = () => api.get("/listings/mine").then(({ data }) => setListings(data));
  useEffect(() => { load().catch(() => setNotice("Could not load your listings.")); }, []);

  const submit = async (event) => {
    event.preventDefault();
    setSaving(true);
    setNotice("");
    try {
      await api.post("/listings", { availableKwh: Number(form.availableKwh), pricePerKwh: Number(form.pricePerKwh), location: { city: form.city } });
      setNotice("Your solar energy listing is now live!");
      setForm({ availableKwh: "5", pricePerKwh: "5.5", city: "" });
      load();
    } catch (err) {
      setNotice(err.response?.data?.message || "Could not create listing.");
    } finally {
      setSaving(false);
    }
  };

  const active = useMemo(() => listings.filter((item) => item.status === "active"), [listings]);
  const totalSurplusKwh = useMemo(() => active.reduce((total, item) => total + number(item.availableKwh), 0), [active]);

  return (
    <DashboardLayout title="My Solar Energy Listings ☀️" subtitle="Publish rooftop solar surplus for neighborhood buyers.">
      {notice && (
        <div className={`mt-6 flex items-center gap-3 rounded-2xl border p-4 text-xs font-semibold ${notice.includes("live") ? "border-emerald-200 bg-emerald-50 text-emerald-900" : "border-amber-200 bg-amber-50 text-amber-900"}`}>
          <CircleAlert size={18} className="shrink-0 text-emerald-600" />
          <span>{notice}</span>
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[1.1fr_0.9fr]">
        <CreateListingForm form={form} setForm={setForm} submit={submit} saving={saving} />
        
        <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-2xl border border-slate-800 flex flex-col justify-between">
          <div className="relative z-10 flex items-center justify-between">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/20 border border-emerald-500/30 text-emerald-400"><Tag size={24} /></div>
            <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-400"><ShieldCheck size={14} /> Auto-Sync</span>
          </div>
          <div className="relative z-10 my-8">
            <p className="text-xs font-bold uppercase text-slate-400">Active Live Listings</p>
            <p className="mt-2 font-heading text-4xl sm:text-5xl font-black text-white tracking-tight">{active.length} <span className="text-xl font-bold text-emerald-400">Offers</span></p>
            <p className="mt-3 text-xs text-slate-300">{active.length ? `${totalSurplusKwh.toFixed(1)} kWh published.` : "Publish your first listing."}</p>
          </div>
          <div className="relative z-10 pt-4 border-t border-slate-800/80 text-xs text-slate-400 font-medium flex justify-between"><span>Automated Escrow Settlement</span><span className="text-emerald-400 font-bold">100% P2P</span></div>
        </section>
      </div>

      <ListingsHistoryTable listings={listings} />
    </DashboardLayout>
  );
}
