import { Mail, Lock, Eye, EyeOff, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function LoginForm({ form, setForm, showPassword, setShowPassword, error, submitting, handleSubmit, handleQuickFill }) {
  return (
    <div>
      <div className="mt-6 p-3 rounded-2xl bg-slate-50 border border-slate-200/80">
        <p className="text-[11px] font-bold uppercase tracking-wider text-slate-400 mb-2">⚡ Quick Demo Fillers:</p>
        <div className="flex flex-wrap gap-2 text-xs">
          <button type="button" onClick={() => handleQuickFill("prosumer")} className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:text-emerald-600 transition shadow-sm">Solar Seller (Prosumer)</button>
          <button type="button" onClick={() => handleQuickFill("consumer")} className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:text-emerald-600 transition shadow-sm">Power Buyer (Consumer)</button>
          <button type="button" onClick={() => handleQuickFill("admin")} className="px-3 py-1 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold hover:text-emerald-600 transition shadow-sm">Grid Admin</button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-5">
        <div>
          <label className="block text-xs font-bold uppercase tracking-wider text-slate-600 mb-2">Email Address</label>
          <div className="relative">
            <Mail size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input type="email" required placeholder="name@solarshare.com" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-4 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none" />
          </div>
        </div>

        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-600">Password</label>
            <a href="#forgot" className="text-xs font-bold text-emerald-600 hover:text-emerald-700 transition">Forgot password?</a>
          </div>
          <div className="relative">
            <Lock size={18} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
            <input type={showPassword ? "text" : "password"} required placeholder="••••••••••••" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3.5 pl-11 pr-11 text-sm text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none" />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>
        </div>

        {error && <div className="rounded-2xl border border-red-200 bg-red-50 p-4 text-xs font-semibold text-red-700 flex items-start gap-2.5"><span>⚠️</span><span>{error}</span></div>}

        <div className="flex items-center justify-between pt-1">
          <label className="flex items-center gap-2.5 cursor-pointer select-none">
            <input type="checkbox" defaultChecked className="h-4 w-4 rounded-md border-slate-300 text-emerald-600 accent-emerald-600" />
            <span className="text-xs font-semibold text-slate-600">Keep me signed in</span>
          </label>
        </div>

        <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-emerald-600 py-4 text-sm font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition flex items-center justify-center gap-2">
          <Sparkles size={16} /> {submitting ? "Signing in..." : "Sign In to Dashboard"}
        </button>
      </form>

      <p className="mt-8 text-center text-xs text-slate-500">
        Don't have an account yet? <Link to="/register" className="font-bold text-emerald-600 hover:underline">Create Free Account</Link>
      </p>
    </div>
  );
}
