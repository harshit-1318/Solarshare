import { Link } from "react-router-dom";
import { Sun, Sparkles, CheckCircle2, Leaf } from "lucide-react";

export default function RegisterHero() {
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
          <Sparkles size={13} /> Instant Activation
        </div>

        <h2 className="font-heading text-3xl sm:text-4xl font-extrabold tracking-tight text-white leading-tight">
          Join 10,000+ Clean <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">
            Energy Traders
          </span>
        </h2>

        <p className="mt-4 text-sm text-slate-400 leading-relaxed max-w-md">
          Create your account in under 2 minutes. Start selling surplus rooftop power or buy clean electricity with zero equipment installation.
        </p>

        <div className="mt-8 space-y-3.5">
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 size={16} />
            </div>
            <span>No hardware installation or upfront fees required</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <CheckCircle2 size={16} />
            </div>
            <span>Automated DISCOM smart meter sync & net-metering</span>
          </div>
          <div className="flex items-center gap-3 text-xs font-semibold text-slate-300">
            <div className="flex h-7 w-7 items-center justify-center rounded-xl bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
              <Leaf size={16} />
            </div>
            <span>UN-Compliant Carbon Credit Certificates awarded automatically</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 pt-6 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
        <span>Trusted across 12 Major Cities</span>
        <span>100% Free Signup</span>
      </div>
    </section>
  );
}
