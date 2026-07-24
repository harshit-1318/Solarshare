import { Sun, Zap, Wallet, ShieldCheck, ArrowRight } from "lucide-react";

export const TOPIC_CATEGORIES = [
  {
    id: "prosumer",
    icon: Sun,
    color: "bg-amber-500/10 text-amber-500 border-amber-500/20",
    title: "Prosumer & Solar Listings",
    desc: "Help with rooftop solar capacity, surplus export rates, and listing setup.",
  },
  {
    id: "consumer",
    icon: Zap,
    color: "bg-emerald-500/10 text-emerald-500 border-emerald-500/20",
    title: "Consumer Energy Purchases",
    desc: "Help with buying neighborhood clean energy, tariffs, and DISCOM bills.",
  },
  {
    id: "wallet",
    icon: Wallet,
    color: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    title: "Wallet & Instant Payouts",
    desc: "UPI settlements, withdrawal processing, and transaction logs.",
  },
  {
    id: "grid",
    icon: ShieldCheck,
    color: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    title: "Smart Meter & Net-Metering",
    desc: "DISCOM smart meter syncing, reading delays, and grid compliance.",
  },
];

export default function SupportCategories({ selectedCategory, setSelectedCategory }) {
  return (
    <div>
      <div className="text-center max-w-2xl mx-auto mb-10">
        <h2 className="font-heading text-2xl sm:text-3xl font-bold text-slate-900">
          Browse Support Topics
        </h2>
        <p className="text-sm text-slate-500 mt-1">Select a category to get specialized assistance</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {TOPIC_CATEGORIES.map((cat) => {
          const Icon = cat.icon;
          const isSelected = selectedCategory === cat.id;
          return (
            <button
              key={cat.id}
              type="button"
              onClick={() => setSelectedCategory(cat.id)}
              className={`rounded-3xl border p-6 text-left transition duration-300 flex flex-col justify-between ${
                isSelected
                  ? "border-emerald-500 bg-emerald-50/50 shadow-lg ring-2 ring-emerald-500/20"
                  : "border-slate-200 bg-white hover:border-slate-300 hover:shadow-md"
              }`}
            >
              <div>
                <div className={`flex h-12 w-12 items-center justify-center rounded-2xl border ${cat.color} mb-4`}>
                  <Icon size={24} />
                </div>
                <h3 className="font-heading text-base font-bold text-slate-900">{cat.title}</h3>
                <p className="text-xs text-slate-500 mt-2 leading-relaxed font-normal">{cat.desc}</p>
              </div>

              <div className="mt-6 pt-3 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600">
                <span>Explore Guides</span>
                <ArrowRight size={14} />
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
}
