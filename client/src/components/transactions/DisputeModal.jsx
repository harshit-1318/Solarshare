import { AlertTriangle, X } from "lucide-react";

const number = (val) => Number(val) || 0;

export default function DisputeModal({
  disputeTx,
  setDisputeTx,
  disputeReason,
  setDisputeReason,
  handleSubmitDispute,
  submittingDispute
}) {
  if (!disputeTx) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/40 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-7 shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 pb-3">
          <h3 className="font-heading text-lg font-bold text-slate-900 flex items-center gap-2">
            <AlertTriangle size={18} className="text-red-500" /> Raise Dispute Claim
          </h3>
          <button
            onClick={() => setDisputeTx(null)}
            className="rounded-full p-1 text-slate-400 hover:bg-slate-100 transition"
          >
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmitDispute} className="mt-4 space-y-4">
          <p className="text-xs font-medium text-slate-600 leading-relaxed">
            Filing claim for transaction ID: <strong className="text-slate-900">{disputeTx._id}</strong> ({number(disputeTx.kwh).toFixed(1)} kWh @ ₹{number(disputeTx.totalAmount).toFixed(2)})
          </p>

          <div>
            <label className="block text-xs font-bold uppercase text-slate-500 mb-1">
              Reason for Complaint
            </label>
            <textarea
              required
              rows={3}
              value={disputeReason}
              onChange={(e) => setDisputeReason(e.target.value)}
              placeholder="Describe smart meter reading mismatch or payment discrepancy..."
              className="w-full rounded-2xl border border-slate-200 bg-slate-50 p-3.5 text-xs text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setDisputeTx(null)}
              className="rounded-2xl border border-slate-200 py-2.5 px-4 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={submittingDispute}
              className="rounded-2xl bg-red-600 py-2.5 px-4 text-xs font-bold text-white hover:bg-red-700 transition"
            >
              {submittingDispute ? "Submitting..." : "File Dispute"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
