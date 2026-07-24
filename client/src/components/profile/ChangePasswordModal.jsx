import { X } from "lucide-react";

export default function ChangePasswordModal({
  managingPassword,
  setManagingPassword,
  passwordForm,
  setPasswordForm,
  handlePasswordChange,
  loading
}) {
  if (!managingPassword) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 backdrop-blur-sm p-4">
      <form onSubmit={handlePasswordChange} className="w-full max-w-md rounded-3xl bg-white p-7 shadow-2xl border border-slate-200">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-heading text-lg font-bold text-slate-900">Change Password</h3>
          <button type="button" onClick={() => setManagingPassword(false)} className="text-slate-400 hover:text-slate-600">
            <X size={18} />
          </button>
        </div>
        <div className="mt-4 space-y-4">
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase">Current Password</span>
            <input
              type="password"
              required
              placeholder="Enter current password"
              value={passwordForm.currentPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, currentPassword: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase">New Password</span>
            <input
              type="password"
              required
              minLength={6}
              placeholder="At least 6 characters"
              value={passwordForm.newPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, newPassword: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </label>
          <label className="block">
            <span className="text-xs font-bold text-slate-500 uppercase">Confirm New Password</span>
            <input
              type="password"
              required
              placeholder="Confirm new password"
              value={passwordForm.confirmPassword}
              onChange={(e) => setPasswordForm({ ...passwordForm, confirmPassword: e.target.value })}
              className="mt-2 w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </label>
        </div>
        <div className="mt-6 flex gap-3">
          <button type="button" onClick={() => setManagingPassword(false)} className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Cancel</button>
          <button type="submit" disabled={loading} className="flex-1 rounded-2xl bg-emerald-600 py-3 text-xs font-bold text-white hover:bg-emerald-700 transition">Update Password</button>
        </div>
      </form>
    </div>
  );
}
