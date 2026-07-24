import { User, Mail, ShieldCheck, MapPin, CheckCircle2, Lock } from "lucide-react";

export default function PersonalInfoSection({ profile, setProfile, isEditing, handleSaveProfile, saving, updatedNotice }) {
  return (
    <section className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
      <div className="flex items-center justify-between border-b border-slate-100 pb-5">
        <div>
          <h3 className="font-heading text-lg font-bold text-slate-900">Personal & Account Info</h3>
          <p className="text-xs text-slate-500 mt-0.5">Your official SolarShare profile details.</p>
        </div>
        {updatedNotice && (
          <span className="flex items-center gap-1.5 rounded-full bg-emerald-50 border border-emerald-200 px-3.5 py-1 text-xs font-bold text-emerald-800">
            <CheckCircle2 size={14} className="text-emerald-600" /> Saved
          </span>
        )}
      </div>

      <div className="mt-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Full Name</label>
          <div className="relative">
            <User size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" disabled={!isEditing} value={profile.name} onChange={(e) => setProfile({ ...profile, name: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none disabled:bg-slate-100/70 disabled:text-slate-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Email Address</label>
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" disabled value={profile.email} className="w-full rounded-2xl border border-slate-200 bg-slate-100/70 py-3 pl-11 pr-10 text-xs font-bold text-slate-500" />
            <Lock size={15} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Primary City / Grid Node</label>
          <div className="relative">
            <MapPin size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="text" disabled={!isEditing} value={profile.city} onChange={(e) => setProfile({ ...profile, city: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-11 pr-4 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none disabled:bg-slate-100/70 disabled:text-slate-500" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Registered Role</label>
          <div className="relative">
            <ShieldCheck size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-emerald-600" />
            <input type="text" disabled value={profile.role?.toUpperCase() || "CONSUMER"} className="w-full rounded-2xl border border-emerald-200 bg-emerald-50/40 py-3 pl-11 pr-4 text-xs font-bold text-emerald-900" />
          </div>
        </div>
      </div>

      {isEditing && (
        <div className="mt-7 flex justify-end">
          <button onClick={handleSaveProfile} disabled={saving} className="inline-flex items-center gap-2 rounded-2xl bg-emerald-600 px-6 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition">
            {saving ? "Saving..." : "Save Profile Changes"}
          </button>
        </div>
      )}
    </section>
  );
}
