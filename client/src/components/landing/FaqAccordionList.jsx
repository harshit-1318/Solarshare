import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";

export const FAQS_DATA = [
  {
    category: "General",
    question: "What is SolarShare?",
    answer: "SolarShare is India's leading peer-to-peer (P2P) solar energy trading platform. It allows homeowners with rooftop solar panels (prosumers) to sell excess clean electricity directly to nearby neighbors and businesses (consumers) through smart grid matching.",
  },
  {
    category: "Pricing & Billing",
    question: "How is energy pricing determined?",
    answer: "Prosumers can set their own fixed selling price per kWh, or use our AI dynamic pricing engine which automatically adjusts rates based on local solar supply and peak grid demand, offering consumers up to a 30% discount vs regular DISCOM tariffs.",
  },
  {
    category: "Technical",
    question: "Do I need new hardware or wiring installed?",
    answer: "No! SolarShare utilizes your existing DISCOM smart meter and local electrical grid infrastructure. Energy transfers are tracked and balanced virtually on our smart ledger without requiring any extra physical wiring.",
  },
  {
    category: "Security",
    question: "Are transactions and payments secure?",
    answer: "Yes, all trading transactions are locked in smart contracts backed by 256-bit bank-grade encryption. Earnings are automatically credited to your linked UPI/Bank wallet within 24 hours.",
  },
  {
    category: "Carbon Credits",
    question: "How do I earn and claim Carbon Credits?",
    answer: "For every kWh of solar energy you produce and trade, our UN-compliant accounting engine automatically logs your avoided carbon emissions. These are converted to Carbon Credit certificates exportable directly from your dashboard.",
  },
];

export default function FaqAccordionList({ searchQuery }) {
  const [openIndex, setOpenIndex] = useState(0);

  const toggle = (i) => setOpenIndex(openIndex === i ? null : i);

  const filteredFaqs = FAQS_DATA.filter(
    (faq) =>
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="mt-12 space-y-4">
      {filteredFaqs.length > 0 ? (
        filteredFaqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <div
              key={i}
              className={`rounded-2xl border transition duration-300 ${
                isOpen ? "border-emerald-500/40 bg-emerald-50/20 shadow-md" : "border-slate-200/80 bg-slate-50/50 hover:bg-slate-50"
              }`}
            >
              <button
                onClick={() => toggle(i)}
                className="flex w-full items-center justify-between px-6 py-5 text-left focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-3">
                  <span className="text-xs font-bold uppercase tracking-wider text-emerald-600 bg-emerald-100 px-2.5 py-0.5 rounded-full hidden sm:inline-block">
                    {faq.category}
                  </span>
                  <span className="font-heading text-base font-bold text-slate-900">
                    {faq.question}
                  </span>
                </div>
                <span className="ml-4 shrink-0 text-slate-500">
                  {isOpen ? <ChevronUp size={20} className="text-emerald-600" /> : <ChevronDown size={20} />}
                </span>
              </button>
              {isOpen && (
                <div className="px-6 pb-6 pt-1 border-t border-slate-100 text-sm leading-relaxed text-slate-600 font-normal">
                  {faq.answer}
                </div>
              )}
            </div>
          );
        })
      ) : (
        <div className="text-center py-10 text-slate-500 text-sm">
          No matching questions found. Contact our 24/7 support.
        </div>
      )}
    </div>
  );
}
