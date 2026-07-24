import { Send } from "lucide-react";

export default function TicketForm({ form, setForm, submitting, handleSubmit }) {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
      <h3 className="font-heading text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Create New Support Ticket</h3>
      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Subject / Issue Summary</label>
          <input type="text" required placeholder="e.g. Wallet payout pending for TX-9281" value={form.subject} onChange={(e) => setForm({ ...form, subject: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none" />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Category</label>
            <select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none">
              <option value="billing">Wallet & Payouts</option>
              <option value="technical">Smart Meter & Integration</option>
              <option value="carbon">Carbon Certificates</option>
              <option value="general">General Inquiry</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Priority</label>
            <select value={form.priority} onChange={(e) => setForm({ ...form, priority: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-xs font-bold text-slate-900 focus:bg-white focus:outline-none">
              <option value="low">Low Priority</option>
              <option value="medium">Medium Priority</option>
              <option value="high">High (Urgent Grid Issue)</option>
            </select>
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold uppercase text-slate-600 mb-1">Detailed Description</label>
          <textarea rows={4} required placeholder="Please describe the issue in detail..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-3 px-4 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none" />
        </div>

        <button type="submit" disabled={submitting} className="w-full rounded-2xl bg-emerald-600 py-3.5 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition flex items-center justify-center gap-2">
          <Send size={15} /> {submitting ? "Submitting Ticket..." : "Submit Support Ticket"}
        </button>
      </form>
    </div>
  );
}
