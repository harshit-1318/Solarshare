import { Lock } from "lucide-react";

export default function TwoFactorModal({
  managing2FA,
  setManaging2FA,
  twoFactorValue,
  handleToggle2FA,
  loading
}) {
  if (!managing2FA) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-sm rounded-3xl bg-white p-7 shadow-2xl border border-slate-200 text-center">
        <span className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-50 text-emerald-600 mb-4 border border-emerald-200">
          <Lock size={28} />
        </span>
        <h3 className="font-heading text-lg font-bold text-slate-900">
          {twoFactorValue ? "Disable 2FA?" : "Enable 2-Factor Authentication?"}
        </h3>
        <p className="text-xs text-slate-500 mt-2 leading-relaxed">
          {twoFactorValue 
            ? "This will remove the secondary verification prompt on login." 
            : "Add an extra layer of protection to your wallet and trade execution."}
        </p>
        <div className="mt-6 flex gap-3">
          <button onClick={() => setManaging2FA(false)} className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          <button onClick={handleToggle2FA} disabled={loading} className={`flex-1 rounded-2xl py-3 text-xs font-bold text-white transition ${twoFactorValue ? "bg-red-600 hover:bg-red-700" : "bg-emerald-600 hover:bg-emerald-700"}`}>
            {twoFactorValue ? "Disable" : "Enable 2FA"}
          </button>
        </div>
      </div>
    </div>
  );
}
