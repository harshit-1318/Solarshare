import { FileText, ShieldCheck } from "lucide-react";

export default function KycSection() {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-100 pb-4">
        <h3 className="font-heading text-base font-extrabold text-slate-900 flex items-center gap-2">
          <FileText size={18} className="text-indigo-500" /> KYC & Verification
        </h3>
      </div>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-y-5 gap-x-8">
        <div>
          <span className="block text-xs font-semibold text-slate-400">Aadhaar Verification</span>
          <span className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1">
            Verified <ShieldCheck size={16} />
          </span>
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-400">PAN Verification</span>
          <span className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1">
            Verified <ShieldCheck size={16} />
          </span>
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-400">DISCOM Net-Meter</span>
          <span className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1">
            Connected & Active <ShieldCheck size={16} />
          </span>
        </div>
        <div>
          <span className="block text-xs font-semibold text-slate-400">Linked Bank Account</span>
          <span className="text-sm font-bold text-emerald-600 mt-1 flex items-center gap-1">
            Linked & Verified <ShieldCheck size={16} />
          </span>
        </div>
      </div>
    </section>
  );
}
