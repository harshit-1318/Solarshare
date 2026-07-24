import { Sun, Trash2, CheckCircle2 } from "lucide-react";

export default function PanelListTable({ panels, handleDeletePanel }) {
  return (
    <div className="mt-8">
      <div className="mb-4">
        <h3 className="font-heading text-lg font-bold text-slate-900">Installed Solar Panel Arrays</h3>
        <p className="text-xs text-slate-500">Manage individual rooftop strings and invertor outputs</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {panels.map((p) => (
          <div
            key={p.id}
            className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft flex flex-col justify-between hover:border-slate-300 transition duration-200"
          >
            <div>
              <div className="flex items-center justify-between border-b border-slate-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-amber-50 text-amber-600 border border-amber-200/60">
                    <Sun size={22} />
                  </div>
                  <div>
                    <h4 className="font-heading text-base font-bold text-slate-900">{p.name}</h4>
                    <p className="text-xs text-slate-500 font-medium">{p.brand}</p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    onClick={() => handleDeletePanel(p.id)}
                    className="p-2 rounded-xl text-slate-400 hover:text-red-600 hover:bg-red-50 transition"
                    title="Delete array"
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
              </div>

              <div className="mt-6 grid grid-cols-2 gap-4 text-xs font-semibold text-slate-700">
                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Capacity</span>
                  <span className="text-emerald-600 font-heading text-lg font-black mt-0.5 block">
                    {p.capacityKw} kW
                  </span>
                </div>

                <div className="p-3.5 rounded-2xl bg-slate-50 border border-slate-200/60">
                  <span className="text-slate-400 block text-[10px] uppercase font-bold">Module Count</span>
                  <span className="text-slate-900 font-heading text-lg font-black mt-0.5 block">
                    {p.panelsCount} Panels
                  </span>
                </div>
              </div>

              <div className="mt-4 space-y-2 text-xs font-medium text-slate-600">
                <div className="flex justify-between">
                  <span className="text-slate-400">Installation Date</span>
                  <span className="text-slate-900 font-bold">{p.installDate}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Operational Status</span>
                  <span className="text-emerald-600 font-bold flex items-center gap-1">
                    <CheckCircle2 size={13} /> {p.status}
                  </span>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
              <span>Inverter: Micro-inverter Enphase IQ8</span>
              <span className="font-mono font-bold text-slate-700">Grid Connected</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
