import { WalletCards, ShieldCheck } from "lucide-react";

const number = (value) => Number(value || 0);

export default function WalletCard({ wallet }) {
  return (
    <section className="relative overflow-hidden rounded-3xl bg-slate-950 p-8 text-white shadow-2xl border border-slate-800 flex flex-col justify-between">
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-emerald-500/15 rounded-full blur-[100px] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-teal-500/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="relative z-10 flex items-center justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-lg shadow-emerald-500/30">
          <WalletCards size={24} />
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3.5 py-1 text-xs font-semibold text-emerald-400">
          <ShieldCheck size={14} /> ISO 27001 Secured Wallet
        </span>
      </div>

      <div className="relative z-10 my-8">
        <p className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Available Balance</p>
        <p className="mt-2 font-heading text-4xl sm:text-5xl font-black text-white tracking-tight">
          ₹{number(wallet?.balance).toLocaleString("en-IN", { minimumFractionDigits: 2 })}
        </p>
        <p className="mt-3 text-xs text-slate-400 leading-relaxed max-w-sm">
          Use your balance for peer energy purchases. Seller earnings are credited instantly after energy delivery.
        </p>
      </div>

      <div className="relative z-10 pt-4 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-400 font-medium">
        <span>Instant UPI Withdrawal Ready</span>
        <span className="text-emerald-400 font-bold">100% Escrow Backed</span>
      </div>
    </section>
  );
}
