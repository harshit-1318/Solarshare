import { ArrowUpRight } from "lucide-react";

export default function FeatureCardsGrid({ filteredFeatures }) {
  return (
    <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
      {filteredFeatures.map((feat, idx) => {
        const Icon = feat.icon;
        return (
          <div
            key={idx}
            className="group rounded-3xl border border-slate-200/80 bg-white p-8 shadow-soft hover:shadow-xl hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between"
          >
            <div>
              <span className={`flex h-14 w-14 items-center justify-center rounded-2xl ${feat.iconBg} shadow-inner`}>
                <Icon size={26} />
              </span>
              <h3 className="mt-6 font-heading text-xl font-bold text-slate-900 group-hover:text-emerald-600 transition">
                {feat.title}
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-slate-600 font-normal">
                {feat.desc}
              </p>
            </div>

            <div className="mt-8 pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-emerald-600 opacity-0 group-hover:opacity-100 transition duration-300">
              <span>Learn details</span>
              <ArrowUpRight size={16} />
            </div>
          </div>
        );
      })}
    </div>
  );
}
