import { Sun, ShoppingCart, ShieldCheck } from "lucide-react";

export default function RegisterStep2({ form, setForm, setStep, handleSubmit, submitting }) {
  return (
    <div className="space-y-5">
      <div>
        <h2 className="font-heading text-2xl font-extrabold text-slate-900">Select Your Account Type ⚡</h2>
        <p className="text-xs text-slate-500 mt-1">Choose how you wish to participate on the SolarShare grid.</p>
      </div>

      <div className="space-y-3">
        <div onClick={() => setForm({ ...form, role: "prosumer" })} className={`p-4 rounded-2xl border-2 cursor-pointer transition ${form.role === "prosumer" ? "border-emerald-500 bg-emerald-50/40" : "border-slate-200 bg-white hover:border-slate-300"}`}>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-amber-50 text-amber-600"><Sun size={20} /></span>
            <div>
              <h4 className="font-heading text-sm font-bold text-slate-900">Rooftop Solar Owner (Prosumer)</h4>
              <p className="text-[11px] text-slate-500">I have solar panels and want to sell surplus clean energy.</p>
            </div>
          </div>
        </div>

        <div onClick={() => setForm({ ...form, role: "consumer" })} className={`p-4 rounded-2xl border-2 cursor-pointer transition ${form.role === "consumer" ? "border-emerald-500 bg-emerald-50/40" : "border-slate-200 bg-white hover:border-slate-300"}`}>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-blue-50 text-blue-600"><ShoppingCart size={20} /></span>
            <div>
              <h4 className="font-heading text-sm font-bold text-slate-900">Electricity Consumer (Buyer)</h4>
              <p className="text-[11px] text-slate-500">I want to buy local solar power at up to 30% discount.</p>
            </div>
          </div>
        </div>

        <div onClick={() => setForm({ ...form, role: "admin" })} className={`p-4 rounded-2xl border-2 cursor-pointer transition ${form.role === "admin" ? "border-emerald-500 bg-emerald-50/40" : "border-slate-200 bg-white hover:border-slate-300"}`}>
          <div className="flex items-center gap-3">
            <span className="p-2.5 rounded-xl bg-violet-50 text-violet-600"><ShieldCheck size={20} /></span>
            <div>
              <h4 className="font-heading text-sm font-bold text-slate-900">Grid Administrator</h4>
              <p className="text-[11px] text-slate-500">I am an authorized grid supervisor with an admin access key.</p>
            </div>
          </div>
        </div>
      </div>

      {form.role === "admin" && (
        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Grid Admin Passcode</label>
          <input type="password" required placeholder="Enter Secret Admin Passcode" value={form.adminCode} onChange={(e) => setForm({ ...form, adminCode: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-bold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none" />
        </div>
      )}

      <div className="flex gap-3 pt-2">
        <button type="button" onClick={() => setStep(1)} className="flex-1 rounded-2xl border border-slate-200 py-3 text-xs font-bold text-slate-600 hover:bg-slate-50 transition">Back</button>
        <button type="button" onClick={handleSubmit} disabled={submitting} className="flex-1 rounded-2xl bg-emerald-600 py-3 text-xs font-bold text-white shadow-lg shadow-emerald-600/20 hover:bg-emerald-700 transition">
          {submitting ? "Creating Account..." : "Complete Registration"}
        </button>
      </div>
    </div>
  );
}
