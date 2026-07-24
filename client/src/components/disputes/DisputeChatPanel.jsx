import { Send, Lock } from "lucide-react";

export default function DisputeChatPanel({
  activeDispute,
  newMessage,
  setNewMessage,
  handleSendMessage,
  user
}) {
  if (!activeDispute) {
    return (
      <div className="flex h-full items-center justify-center p-12 text-center text-xs text-slate-400 font-semibold">
        Select or raise a dispute to open live audit thread.
      </div>
    );
  }

  return (
    <div className="flex h-[520px] flex-col justify-between p-6">
      <div className="border-b border-slate-100 pb-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-extrabold uppercase tracking-wider text-slate-400">
              Claim #{activeDispute.disputeCode || activeDispute._id}
            </span>
            <h3 className="font-heading text-lg font-bold text-slate-900 mt-0.5">
              {activeDispute.reason}
            </h3>
          </div>
          <span
            className={`rounded-full px-3 py-1 text-xs font-bold capitalize ${
              activeDispute.status === "resolved"
                ? "bg-emerald-100 text-emerald-800 border border-emerald-200"
                : "bg-amber-100 text-amber-800 border border-amber-200"
            }`}
          >
            {activeDispute.status || "open"}
          </span>
        </div>
      </div>

      <div className="my-4 flex-1 overflow-y-auto space-y-3.5 pr-2 custom-scrollbar">
        {(activeDispute.messages || []).map((msg, idx) => {
          const isMe = msg.senderRole === "consumer" || msg.senderName === user?.name;
          const isAdmin = msg.senderRole === "admin";

          return (
            <div key={idx} className={`flex flex-col ${isMe ? "items-end" : "items-start"}`}>
              <div className="flex items-center gap-2 mb-1">
                <span className="text-[10px] font-bold text-slate-500">{msg.senderName}</span>
                <span className="text-[9px] text-slate-400">
                  {new Date(msg.createdAt).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                </span>
              </div>
              <div
                className={`max-w-[80%] rounded-2xl p-3.5 text-xs font-medium leading-relaxed ${
                  isMe
                    ? "bg-emerald-600 text-white shadow-md shadow-emerald-600/10"
                    : isAdmin
                    ? "bg-slate-900 text-white shadow-md"
                    : "bg-slate-100 text-slate-800 border border-slate-200/80"
                }`}
              >
                {msg.message}
              </div>
            </div>
          );
        })}
      </div>

      {activeDispute.status === "resolved" ? (
        <div className="rounded-2xl border border-emerald-200 bg-emerald-50/80 p-4 text-center text-xs font-bold text-emerald-900 flex items-center justify-center gap-2">
          <Lock size={15} /> This dispute has been resolved by Grid Admin. Resolution: "{activeDispute.resolution || "Claim Approved & Refund Issued"}"
        </div>
      ) : (
        <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t border-slate-100">
          <input
            type="text"
            placeholder="Type message or upload meter evidence details..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            className="flex-1 rounded-2xl border border-slate-200 bg-slate-50 py-3 px-4 text-xs font-semibold text-slate-900 focus:bg-white focus:border-emerald-500 focus:outline-none"
          />
          <button
            type="submit"
            className="rounded-2xl bg-emerald-600 px-5 py-3 text-xs font-bold text-white shadow-md hover:bg-emerald-700 transition flex items-center gap-1.5"
          >
            <Send size={14} /> Send
          </button>
        </form>
      )}
    </div>
  );
}
