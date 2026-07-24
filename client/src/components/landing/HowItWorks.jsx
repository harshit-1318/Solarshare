import { UserPlus, Cpu, ShoppingCart, DollarSign, CheckCircle2, ArrowRight } from "lucide-react";

const steps = [
  {
    step: "01",
    icon: UserPlus,
    title: "Instant Onboarding",
    sub: "Sign up as Prosumer or Consumer",
    desc: "Complete basic identity & smart meter profile in under 2 minutes with instant verification.",
  },
  {
    step: "02",
    icon: Cpu,
    title: "Connect Smart Meter",
    sub: "Automated DISCOM Sync",
    desc: "Link your existing smart meter to track real-time solar generation or energy consumption.",
  },
  {
    step: "03",
    icon: ShoppingCart,
    title: "List or Buy Energy",
    sub: "Set Rates or Auto-Buy",
    desc: "Prosumers list surplus energy at custom prices. Buyers automatically receive discounted clean power.",
  },
  {
    step: "04",
    icon: DollarSign,
    title: "Instant Payout & Credits",
    sub: "Automated Wallet Settlement",
    desc: "Earnings credit directly to your UPI/bank wallet with verified carbon certificates.",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 lg:py-28 bg-slate-50 relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        
        <div className="text-center max-w-3xl mx-auto">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-100 border border-emerald-200 text-emerald-800 text-xs font-semibold uppercase tracking-widest mb-4">
            Simple 4-Step Process
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            How SolarShare <span className="text-emerald-600">Works</span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-600 leading-relaxed">
            Start earning from your solar panels or saving on clean electricity in 4 effortless steps.
          </p>
        </div>

        {/* Steps Grid */}
        <div className="mt-16 relative">
          {/* Connector Line for Desktop */}
          <div className="hidden lg:block absolute top-[56px] left-[15%] right-[15%] h-[3px] bg-gradient-to-r from-emerald-500 via-teal-400 to-emerald-600 rounded-full opacity-20" />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 relative z-10">
            {steps.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft hover:shadow-xl hover:-translate-y-1.5 transition duration-300 flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between">
                      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-lg shadow-emerald-600/20 group-hover:scale-110 transition duration-300">
                        <Icon size={24} />
                      </div>
                      <span className="font-heading text-2xl font-black text-slate-200 group-hover:text-emerald-500 transition">
                        {item.step}
                      </span>
                    </div>

                    <h3 className="mt-6 font-heading text-lg font-bold text-slate-900">
                      {item.title}
                    </h3>
                    <p className="text-xs font-semibold text-emerald-600 mt-1 uppercase tracking-wider">
                      {item.sub}
                    </p>
                    <p className="mt-3 text-xs leading-relaxed text-slate-500 font-normal">
                      {item.desc}
                    </p>
                  </div>

                  <div className="mt-6 pt-4 border-t border-slate-100 flex items-center gap-1.5 text-[11px] font-semibold text-slate-400">
                    <CheckCircle2 size={13} className="text-emerald-500" /> Fully Automated Step
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
