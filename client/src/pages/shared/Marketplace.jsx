import { CircleAlert, ShoppingBag, Zap, Tag, Filter } from "lucide-react";
import DashboardLayout from "../../components/DashboardLayout.jsx";
import StatCard from "../../components/StatCard.jsx";
import { useAuth } from "../../context/AuthContext.jsx";
import { useMarketplace } from "../../components/marketplace/useMarketplace.js";
import MarketplaceTable from "../../components/marketplace/MarketplaceTable.jsx";

export default function Marketplace() {
  const { user } = useAuth();
  const m = useMarketplace(user);

  return (
    <DashboardLayout
      title="Peer-to-Peer Energy Marketplace ⚡"
      subtitle="Buy verified surplus solar energy directly from rooftop owners in your community."
    >
      {m.notice && (
        <div
          className={`mt-6 flex items-start gap-3 rounded-2xl border p-4 text-xs font-semibold ${
            m.notice.toLowerCase().includes("complete")
              ? "border-emerald-200 bg-emerald-50 text-emerald-900"
              : "border-amber-200 bg-amber-50 text-amber-900"
          }`}
        >
          <CircleAlert size={18} className="mt-0.5 shrink-0" />
          <span>{m.notice}</span>
        </div>
      )}

      <div className="mt-7 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <StatCard
          label="Active Solar Offers"
          value={m.listings.length.toString()}
          sublabel="Real-time P2P listings"
          icon={ShoppingBag}
          accent="green"
        />
        <StatCard
          label="Best Available Price"
          value={m.cheapestPrice === null ? "—" : `₹${m.cheapestPrice.toFixed(2)}/kWh`}
          sublabel="Direct seller tariff"
          icon={Tag}
          accent="blue"
          trend="Lowest Tariff"
        />
        <StatCard
          label="Smart Meter Settlement"
          value="Instant UPI"
          sublabel="Automated wallet transfer"
          icon={Zap}
          accent="amber"
        />
      </div>

      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-4 rounded-3xl border border-slate-200/80 bg-white p-5 shadow-soft">
        <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-slate-700">
          <Filter size={16} className="text-emerald-600" /> Filter Listings:
        </div>
        <div className="flex items-center gap-3 w-full sm:w-auto">
          <select
            value={m.filterCity}
            onChange={(e) => m.setFilterCity(e.target.value)}
            className="rounded-2xl border border-slate-200 bg-slate-50 py-2.5 px-4 text-xs font-semibold text-slate-700 focus:bg-white focus:border-emerald-500 focus:outline-none cursor-pointer"
          >
            <option value="all">All Cities & Grid Zones</option>
            {m.cities.map((city) => (
              <option key={city} value={city}>
                {city}
              </option>
            ))}
          </select>
        </div>
      </div>

      <MarketplaceTable
        filteredListings={m.filteredListings}
        user={user}
        quantity={m.quantity}
        setQuantity={m.setQuantity}
        buy={m.buy}
        purchasing={m.purchasing}
      />
    </DashboardLayout>
  );
}
