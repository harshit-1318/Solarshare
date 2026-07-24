import { User, Mail, Lock, MapPin, Eye, EyeOff, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function RegisterStep1({ form, setForm, showPassword, setShowPassword, handleContinueToRole }) {
  return (
    <form onSubmit={handleContinueToRole} className="space-y-4">
      <div>
        <h2 className="font-heading text-2xl font-extrabold text-slate-900">Create Your Account ☀️</h2>
        <p className="text-xs text-slate-500 mt-1">Join India's P2P solar trading network in 2 quick steps.</p>
      </div>

      <div className="space-y-4 mt-6">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Full Name</label>
          <div className="relative">
            <User size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input required placeholder="e.g. Ramesh Sharma" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Email Address</label>
          <div className="relative">
            <Mail size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type="email" required placeholder="ramesh@example.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1">City / Region</label>
          <div className="relative">
            <MapPin size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input required placeholder="e.g. Bangalore" value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-4 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Password</label>
          <div className="relative">
            <Lock size={17} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
            <input type={showPassword ? "text" : "password"} required placeholder="At least 6 characters" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 pl-10 pr-10 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400">
              {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
            </button>
          </div>
        </div>
      </div>

      <button type="submit" className="w-full rounded-2xl bg-emerald-600 py-3.5 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition flex items-center justify-center gap-2 mt-4">
        Continue to Select Role <ArrowRight size={16} />
      </button>

      <p className="text-center text-xs text-slate-500 mt-4">
        Already registered? <Link to="/login" className="font-bold text-emerald-600 hover:underline">Sign In Here</Link>
      </p>
    </form>
  );
}
