const StatCard = ({ label, value, sublabel, icon: Icon, accent = "green", trend, loading = false }) => {
  const accents = {
    green: "bg-emerald-50 text-emerald-600 border border-emerald-200/60 ring-4 ring-emerald-500/10",
    blue: "bg-blue-50 text-blue-600 border border-blue-200/60 ring-4 ring-blue-500/10",
    amber: "bg-amber-50 text-amber-600 border border-amber-200/60 ring-4 ring-amber-500/10",
    violet: "bg-violet-50 text-violet-600 border border-violet-200/60 ring-4 ring-violet-500/10",
  };

  return (
    <div className="rounded-2xl border border-slate-200/80 bg-white p-5 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 relative flex items-center justify-between">
      <div className="flex items-center gap-4">
        {Icon && (
          <span className={`flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl ${accents[accent] || accents.green}`}>
            <Icon size={22} strokeWidth={2.2} />
          </span>
        )}
        <div>
          <p className="font-heading text-2xl font-black text-slate-900 tracking-tight">
            {loading ? "—" : value}
          </p>
          <p className="text-xs font-bold uppercase tracking-wider text-slate-400 mt-0.5">{label}</p>
          {sublabel && <p className="text-[11px] font-medium text-slate-500 mt-0.5">{sublabel}</p>}
        </div>
      </div>
      {trend && (
        <span className="text-xs font-extrabold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full border border-emerald-200/60">
          {trend}
        </span>
      )}
    </div>
  );
};

export default StatCard;
