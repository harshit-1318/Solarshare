import { useState } from "react";
import { Search, ChevronDown, ChevronUp } from "lucide-react";

const faqs = [
  { q: "How do P2P energy settlements work?", a: "SolarShare matches your rooftop solar surplus with local consumers. Payments are automatically processed via net-metered DISCOM balance and credited to your wallet." },
  { q: "What happens if a prosumer generation drops?", a: "The grid automatically fails over to regular DISCOM power backup, ensuring 100% uninterrupted electricity for consumers." },
  { q: "How are Carbon Credits calculated?", a: "1 Carbon Credit is minted for every 1,000 kWh of clean solar energy generated and traded on the SolarShare ledger." },
  { q: "Can I withdraw my wallet earnings to Bank/UPI?", a: "Yes, wallet balances can be instantly withdrawn to any linked Indian bank account or UPI ID with zero withdrawal fees." },
];

export default function SupportFaqSection() {
  const [search, setSearch] = useState("");
  const [openFaq, setOpenFaq] = useState(0);

  const filteredFaqs = faqs.filter(
    (item) => item.q.toLowerCase().includes(search.toLowerCase()) || item.a.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft">
      <h3 className="font-heading text-lg font-bold text-slate-900 border-b border-slate-100 pb-4">Frequently Asked Questions</h3>

      <div className="relative mt-5">
        <Search size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          placeholder="Search support topics..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full rounded-2xl border border-slate-200 bg-slate-50/50 py-2.5 pl-10 pr-4 text-xs font-semibold text-slate-900 focus:bg-white focus:outline-none"
        />
      </div>

      <div className="mt-5 space-y-3">
        {filteredFaqs.length > 0 ? (
          filteredFaqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div key={idx} className="rounded-2xl border border-slate-200/80 bg-slate-50/50 overflow-hidden transition">
                <button
                  type="button"
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 text-left font-heading text-sm font-bold text-slate-900 flex items-center justify-between gap-4"
                >
                  <span>{faq.q}</span>
                  {isOpen ? <ChevronUp size={18} className="text-emerald-600 shrink-0" /> : <ChevronDown size={18} className="text-slate-400 shrink-0" />}
                </button>
                {isOpen && (
                  <div className="px-4 pb-4 text-xs leading-relaxed text-slate-600 border-t border-slate-200/60 pt-3">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })
        ) : (
          <div className="text-center py-6 text-xs text-slate-400 font-semibold">No matching questions found.</div>
        )}
      </div>
    </div>
  );
}
