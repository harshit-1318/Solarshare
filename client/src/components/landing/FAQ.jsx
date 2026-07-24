import { useState } from "react";
import { HelpCircle, Search, MessageSquare } from "lucide-react";
import FaqAccordionList from "./FaqAccordionList.jsx";

export default function FAQ() {
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <section id="faq" className="py-20 lg:py-28 bg-white relative">
      <div className="mx-auto max-w-4xl px-6 sm:px-8">
        <div className="text-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold uppercase tracking-widest mb-4">
            <HelpCircle size={14} /> Got Questions?
          </div>
          <h2 className="font-heading text-3xl font-extrabold tracking-tight text-slate-900 sm:text-4xl lg:text-5xl">
            Frequently Asked <span className="text-emerald-600">Questions</span>
          </h2>
          <p className="mt-4 text-base text-slate-600">
            Everything you need to know about peer-to-peer solar energy trading.
          </p>

          <div className="mt-8 relative max-w-md mx-auto">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search questions (e.g. pricing, smart meter)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-11 pr-4 py-3 rounded-2xl border border-slate-200 bg-slate-50 text-sm text-slate-900 placeholder:text-slate-400 focus:bg-white focus:border-emerald-500 focus:ring-4 focus:ring-emerald-100 transition duration-300"
            />
          </div>
        </div>

        <FaqAccordionList searchQuery={searchQuery} />

        <div className="mt-12 p-6 rounded-3xl bg-slate-900 text-white flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xl">
          <div className="flex items-center gap-4 text-center sm:text-left">
            <div className="h-12 w-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center shrink-0">
              <MessageSquare size={24} />
            </div>
            <div>
              <h4 className="font-heading text-base font-bold">Have a custom question?</h4>
              <p className="text-xs text-slate-400 mt-0.5">Our clean energy advisors are available 24/7 to guide you.</p>
            </div>
          </div>
          <a
            href="mailto:support@solarshare.io"
            className="px-6 py-3 rounded-xl bg-emerald-600 text-xs font-bold text-white hover:bg-emerald-700 transition shrink-0"
          >
            Contact Support
          </a>
        </div>
      </div>
    </section>
  );
}
