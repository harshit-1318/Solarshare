import { Send } from "lucide-react";

export default function BroadcastModal({
  showBroadcastModal,
  setShowBroadcastModal,
  title,
  setTitle,
  message,
  setMessage,
  type,
  setType,
  handleCreateNotification,
  sending
}) {
  if (!showBroadcastModal) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 backdrop-blur-sm p-4">
      <div className="w-full max-w-md rounded-3xl border border-slate-100 bg-white p-7 shadow-2xl">
        <h3 className="font-heading text-lg font-bold text-slate-900">Send System Announcement</h3>
        <p className="text-xs text-slate-500 mt-1">Broadcast an instant alert or update to all users.</p>

        <form onSubmit={handleCreateNotification} className="mt-5 space-y-4">
          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Title</label>
            <input
              type="text"
              required
              placeholder="e.g. Scheduled Grid Maintenance"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full text-xs font-bold text-slate-900 rounded-2xl border border-slate-200 p-3.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Message</label>
            <textarea
              required
              rows={3}
              placeholder="Details of the announcement..."
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              className="w-full text-xs font-bold text-slate-900 rounded-2xl border border-slate-200 p-3.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
            />
          </div>

          <div>
            <label className="text-[10px] font-bold uppercase tracking-wider text-slate-500">Category</label>
            <select
              value={type}
              onChange={(e) => setType(e.target.value)}
              className="w-full text-xs font-bold text-slate-900 rounded-2xl border border-slate-200 p-3.5 bg-slate-50 focus:bg-white focus:outline-none focus:border-emerald-500"
            >
              <option value="system">System</option>
              <option value="dispute">Dispute</option>
              <option value="transaction">Transaction</option>
              <option value="credit">Credit</option>
            </select>
          </div>

          <div className="mt-6 flex justify-end gap-3">
            <button
              type="button"
              onClick={() => setShowBroadcastModal(false)}
              className="rounded-2xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-slate-600 hover:bg-slate-50 transition"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={sending}
              className="rounded-2xl bg-emerald-600 px-5 py-2.5 text-xs font-bold text-white hover:bg-emerald-700 transition flex items-center gap-1.5"
            >
              <Send size={13} /> {sending ? "Dispatching..." : "Send Announcement"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
