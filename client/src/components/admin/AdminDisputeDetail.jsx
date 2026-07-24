import { Send, CheckCircle, Trash2, Lock } from "lucide-react";

export default function AdminDisputeDetail({
  activeDispute,
  newMessage,
  setNewMessage,
  handleSendMessage,
  handleResolveDispute,
  handleDeleteDispute,
}) {
  if (!activeDispute) {
    return <div className="flex h-full items-center justify-center p-12 text-center text-xs font-semibold text-slate-400">Select an active claim from the left queue.</div>;
  }

  const isResolved = activeDispute.status === "resolved";

  return (
    <div className="flex h-[600px] flex-col justify-between p-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase text-slate-400">Dispute ID: #{activeDispute.disputeCode || activeDispute._id}</span>
            <h3 className="font-heading text-lg font-bold text-slate-900 mt-0.5">{activeDispute.reason}</h3>
            <p className="text-xs text-slate-500 mt-1">Raised by: <strong className="text-slate-900">{activeDispute.raisedBy?.name || "Consumer"}</strong></p>
          </div>

          <div className="flex items-center gap-2">
            {!isResolved ? (
              <button onClick={handleResolveDispute} className="inline-flex items-center gap-1.5 rounded-2xl bg-emerald-600 px-4 py-2 text-xs font-bold text-white hover:bg-emerald-700 transition"><CheckCircle size={14} /> Resolve & Refund</button>
            ) : (
              <button onClick={() => handleDeleteDispute(activeDispute._id)} className="inline-flex items-center gap-1.5 rounded-2xl border border-red-200 bg-red-50 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-100 transition"><Trash2 size={14} /> Delete Record</button>
            )}
          </div>
        </div>
      </div>

      <div className="my-4 flex-1 overflow-y-auto space-y-3.5 pr-2">
        {(activeDispute.messages || []).map((msg, idx) => {
          const isAdmin = msg.senderRole === "admin" || msg.senderName?.includes("Admin");
          return (
            <div key={idx} className={`flex flex-col ${isAdmin ? "items-end" : "items-start"}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-500">{msg.senderName}</span>
                <span className="text-[9px] text-slate-400">{new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}</span>
              </div>
              <div className={`max-w-[80%] rounded-2xl p-3.5 text-xs font-medium leading-relaxed ${isAdmin ? "bg-slate-900 text-white" : "bg-emerald-50 text-slate-900 border border-emerald-200/80 font-bold"}`}>
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      {isResolved ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50 p-4 text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-2">
          <Lock size={15} /> Case Closed: {activeDispute.resolution || "Resolved & Refunded"}
        </div>
      ) : (
        <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-100">
          <input type="text" placeholder="Type message to consumer..." value={newMessage} onChange={(e) => setNewMessage(e.target.value)} className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none" />
          <button type="submit" className="rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition flex items-center gap-1.5"><Send size={14} /> Reply</button>
        </form>
      )}
    </div>
  );
}
