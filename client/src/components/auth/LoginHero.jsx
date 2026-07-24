import { Link } from "react-router-dom";
import { Sun, Sparkles, TrendingUp, Zap, CheckCircle2, Leaf, ShieldCheck } from "lucide-react";

export default function LoginHero() {
  return (
    <section className="relative hidden overflow-hidden bg-slate-950 p-12 lg:col-span-5 lg:flex lg:flex-col lg:justify-between text-white border-r border-slate-800">
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/15 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10">
        <Link to="/" className="inline-flex items-center gap-3 group">
          <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-teal-600 text-white shadow-xl shadow-emerald-500/25 ring-4 ring-emerald-500/20 group-hover:scale-105 transition duration-300">
            <Sun size={24} className="fill-white animate-spin-slow" />
          </div>
          <span className="font-heading text-2xl font-black tracking-tight text-white">
            Solar<span className="text-emerald-400">Share</span>
          </span>
        </Link>
      </div>

      <div className="relative z-10 my-auto py-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-6">
          <Sparkles size={13} /> Clean Energy Exchange
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Powering Communities <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            With Peer Energy
          </span>
        </h2>

        <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-md">
          Monetize your rooftop solar panels or buy green energy from local sellers at fair peer-to-peer tariffs.
        </p>

        <div className="mt-10 grid grid-cols-2 gap-4">
          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between text-emerald-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Trades Settled</span>
              <TrendingUp size={16} />
            </div>
            <p className="font-heading text-2xl font-extrabold text-white">50,000+</p>
            <p className="text-[11px] text-slate-500 mt-1">100% Automated</p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between text-teal-300 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Clean Power</span>
              <Zap size={16} />
            </div>
            <p className="font-heading text-2xl font-extrabold text-white">2M+ kWh</p>
            <p className="text-[11px] text-slate-500 mt-1">Traded across India</p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between text-emerald-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Prosumer Revenue</span>
              <CheckCircle2 size={16} />
            </div>
            <p className="font-heading text-2xl font-extrabold text-emerald-400">₹2 Cr+</p>
            <p className="text-[11px] text-slate-500 mt-1">Direct Bank Payouts</p>
          </div>

          <div className="rounded-2xl bg-slate-900/80 border border-slate-800 p-4 backdrop-blur-md shadow-xl">
            <div className="flex items-center justify-between text-indigo-400 mb-1">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-400">CO₂ Avoided</span>
              <Leaf size={16} />
            </div>
            <p className="font-heading text-2xl font-extrabold text-indigo-400">500+ Tons</p>
            <p className="text-[11px] text-slate-500 mt-1">UN Verified Credits</p>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span className="flex items-center gap-1.5">
          <ShieldCheck size={16} className="text-emerald-400" /> DISCOM Net-Metering Compliant
        </span>
        <span>ISO 27001 Secured</span>
      </div>
    </section>
  );
}
