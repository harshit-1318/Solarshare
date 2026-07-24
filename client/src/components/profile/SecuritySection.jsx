import { Lock } from "lucide-react";

export default function SecuritySection({
  setManagingPassword,
  twoFactorValue,
  setManaging2FA
}) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
      <div className="border-b border-slate-100 pb-4">
        <h3 className="font-heading text-base font-extrabold text-slate-900 flex items-center gap-2">
          <Lock size={18} className="text-teal-600" /> Security Settings
        </h3>
      </div>

      <div className="mt-6 space-y-4">
        <div className="flex items-center justify-between py-2 border-b border-slate-100">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Change Password</h4>
            <p className="text-xs text-slate-400 mt-0.5">Last changed 30 days ago</p>
          </div>
          <button
            type="button"
            onClick={() => setManagingPassword(true)}
            className="text-xs font-bold text-slate-700 hover:text-emerald-600 border border-slate-200 px-4 py-2 rounded-2xl hover:bg-slate-50 transition"
          >
            Change Password
          </button>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <h4 className="text-sm font-bold text-slate-900">Two-Factor Authentication</h4>
            <p className="text-xs text-slate-400 mt-0.5">
              {twoFactorValue ? "Enabled for extra security" : "Disabled"}
            </p>
          </div>
          <button
            type="button"
            onClick={() => setManaging2FA(true)}
            className="text-xs font-bold text-slate-700 hover:text-emerald-600 border border-slate-200 px-4 py-2 rounded-2xl hover:bg-slate-50 transition"
          >
            Configure 2FA
          </button>
        </div>
      </div>
    </section>
  );
}
