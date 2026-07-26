import React, { useState } from "react";
import { HelpCircle, MessageSquare, ArrowRight } from "lucide-react";
import FaqAccordionList from "./FaqAccordionList.jsx";
import FaqSearchFilters from "./FaqSearchFilters.jsx";
import { faqList } from "./FaqData.js";
import { Link } from "react-router-dom";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function FAQ() {
  const [search, setSearch] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const { theme } = useTheme();

  const filteredFaqs = faqList.filter((faq) => {
    const matchesSearch =
      faq.question.toLowerCase().includes(search.toLowerCase()) ||
      faq.answer.toLowerCase().includes(search.toLowerCase());
    const matchesCategory = selectedCategory === "all" || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <section id="faq" className={`relative overflow-hidden pt-2 sm:pt-3 pb-2 h-[calc(100vh-73px)] max-h-[calc(100vh-73px)] flex flex-col justify-between border-b scroll-mt-[72px] transition-colors duration-300 ${
      theme === "dark" ? "bg-slate-900 text-white border-slate-800" : "bg-white text-slate-900 border-slate-200"
    }`}>
      <div className={`absolute top-1/3 left-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
        theme === "dark" ? "bg-emerald-500/10" : "bg-emerald-100/60"
      }`} />
      <div className={`absolute bottom-10 right-10 w-96 h-96 rounded-full blur-[140px] pointer-events-none ${
        theme === "dark" ? "bg-teal-500/10" : "bg-teal-100/60"
      }`} />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 relative z-10 w-full flex flex-col justify-between space-y-2 h-full">
        <FaqSearchFilters
          search={search}
          setSearch={setSearch}
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />

        <div className="max-w-4xl mx-auto w-full">
          {filteredFaqs.length > 0 ? (
            <FaqAccordionList faqs={filteredFaqs} />
          ) : (
            <div className={`text-center py-6 rounded-xl border ${
              theme === "dark" ? "bg-slate-800/40 border-slate-800 text-slate-300" : "bg-slate-50 border-slate-200 text-slate-700"
            }`}>
              <HelpCircle size={28} className="mx-auto text-slate-400 mb-1.5" />
              <p className="font-extrabold text-xs sm:text-sm">No questions matched your search query.</p>
              <p className="text-xs text-slate-400 mt-0.5">Try searching for terms like "net meter", "rates", or "DISCOM".</p>
            </div>
          )}
        </div>

        <div className={`max-w-4xl mx-auto w-full border rounded-xl p-2.5 sm:p-3 flex flex-col sm:flex-row items-center justify-between gap-2.5 transition-colors ${
          theme === "dark" ? "bg-slate-800/80 border-slate-700/80" : "bg-slate-50 border-slate-200 shadow-sm"
        }`}>
          <div className="flex items-center gap-2.5">
            <div className="h-8 w-8 rounded-lg bg-emerald-500/20 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0 font-bold">
              <MessageSquare size={16} />
            </div>
            <div>
              <h4 className={`font-heading text-xs sm:text-sm font-extrabold ${theme === "dark" ? "text-white" : "text-slate-900"}`}>
                Have More Technical Questions?
              </h4>
              <p className={`text-[11px] ${theme === "dark" ? "text-slate-400" : "text-slate-600"}`}>
                Our grid engineers are available 24/7 to assist with DISCOM setup and tariff integration.
              </p>
            </div>
          </div>

          <Link
            to="/support"
            className="shrink-0 bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-extrabold text-xs sm:text-sm px-5 py-2 rounded-full transition shadow-md shadow-emerald-500/20 inline-flex items-center justify-center gap-1.5 whitespace-nowrap"
          >
            Contact Grid Support <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}


