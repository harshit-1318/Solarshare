import { AlertTriangle, X } from "lucide-react";

export default function RaiseDisputeModal({
  showRaiseModal,
  setShowRaiseModal,
  form,
  setForm,
  handleRaiseDispute
}) {
  if (!showRaiseModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-lg rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500" /> Raise Smart Meter Audit Claim
          </h3>
          <button onClick={() => setShowRaiseModal(false)} className="rounded-full p-1 text-slate-400 hover:bg-slate-100">
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleRaiseDispute} className="mt-4 space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Transaction ID (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. TX-984210"
              value={form.transactionId}
              onChange={(e) => setForm({ ...form, transactionId: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Claim Category
            </label>
            <select
              value={form.reason}
              onChange={(e) => setForm({ ...form, reason: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            >
              <option>Smart Meter Reading Mismatch</option>
              <option>Payment Debited but Energy Not Credited</option>
              <option>DISCOM Net-Metering Discrepancy</option>
              <option>Tariff Overcharge Claim</option>
            </select>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-500 mb-1">
              Evidence & Details
            </label>
            <textarea
              required
              rows={4}
              placeholder="Provide exact meter reading timestamps or transaction reference numbers..."
              value={form.evidenceNotes}
              onChange={(e) => setForm({ ...form, evidenceNotes: e.target.value })}
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-4 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowRaiseModal(false)}
              className="rounded-2xl border border-slate-200 py-3 px-5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="rounded-2xl bg-red-600 py-3 px-6 text-xs font-bold text-white shadow-md hover:bg-red-700 transition"
            >
              Submit Complaint
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
