import { Link } from "react-router-dom";
import { ArrowRight, ShoppingCart, ShieldCheck, Zap } from "lucide-react";
import HeroMockupCard from "./HeroMockupCard.jsx";

export default function Hero() {
  return (
    <section className="relative overflow-hidden pt-8 lg:pt-16 pb-16 bg-gradient-to-b from-slate-50 via-white to-slate-50">
      <div className="absolute right-0 top-0 -z-10 h-[650px] w-[650px] rounded-full bg-emerald-200/40 blur-3xl" />
      <div className="absolute left-10 top-1/3 -z-10 h-[450px] w-[450px] rounded-full bg-teal-100/40 blur-3xl" />
      <div className="absolute bottom-0 right-1/3 -z-10 h-[350px] w-[350px] rounded-full bg-blue-100/30 blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid items-center gap-12 lg:grid-cols-12 lg:gap-8">
          <div className="text-left lg:col-span-7">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-50 border border-emerald-200/80 px-4 py-1.5 text-xs font-semibold text-emerald-800 shadow-sm">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
              </span>
              India's Premier P2P Solar Energy Trading Platform
            </div>

            <h1 className="mt-6 font-heading text-4xl font-extrabold tracking-tight text-slate-900 sm:text-5xl lg:text-6xl leading-[1.1]">
              Trade Clean <br /> Energy <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-500">with Your <br /> Community</span>
            </h1>

            <p className="mt-6 max-w-xl text-base sm:text-lg text-slate-600 leading-relaxed font-normal">
              SolarShare connects rooftop solar owners directly with local consumers. Monetize your surplus power at fair peer prices while buyers save up to 30% on electricity bills.
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                to="/register"
                className="inline-flex items-center gap-2 rounded-full bg-emerald-600 px-7 py-3.5 text-sm font-semibold text-white shadow-md shadow-emerald-600/10 hover:bg-emerald-700 hover:shadow-lg transition duration-200"
              >
                Get Started Free <ArrowRight size={17} />
              </Link>
              <Link
                to="/marketplace"
                className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-white px-7 py-3.5 text-sm font-semibold text-slate-700 hover:bg-slate-50 transition duration-200 shadow-sm"
              >
                <ShoppingCart size={16} className="text-slate-600" /> Explore Marketplace
              </Link>
            </div>

            <div className="mt-8 flex items-center gap-6 text-xs text-slate-500 font-medium">
              <span className="flex items-center gap-1.5">
                <ShieldCheck size={16} className="text-emerald-600" /> DISCOM Net-Meter Ready
              </span>
              <span className="flex items-center gap-1.5">
                <Zap size={16} className="text-amber-500" /> Instant UPI Payouts
              </span>
            </div>

            <div className="mt-10 grid grid-cols-3 gap-6 border-t border-slate-200/80 pt-8 max-w-lg">
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">10K+</p>
                <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Active Prosumers</p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-emerald-600">50K+</p>
                <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Trades Settled</p>
              </div>
              <div>
                <p className="font-heading text-2xl sm:text-3xl font-extrabold text-slate-900">2M+ kWh</p>
                <p className="text-xs font-semibold text-slate-500 mt-1 uppercase tracking-wider">Clean Power</p>
              </div>
            </div>
          </div>

          <HeroMockupCard />
        </div>
      </div>
    </section>
  );
}
