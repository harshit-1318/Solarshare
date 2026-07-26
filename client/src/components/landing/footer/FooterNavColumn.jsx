import React from "react";
import { Link } from "react-router-dom";
import { ExternalLink } from "lucide-react";
import { useTheme } from "../../../context/ThemeContext.jsx";

export default function FooterNavColumn({ title, icon: Icon, titleColor, items }) {
  const { theme } = useTheme();

  return (
    <div>
      <h4 className={`text-xs font-extrabold uppercase tracking-wider ${titleColor} mb-2 flex items-center gap-1.5`}>
        {Icon && <Icon size={14} />} {title}
      </h4>
      <ul className={`space-y-1.5 text-xs font-medium ${theme === "dark" ? "text-slate-300" : "text-slate-600"}`}>
        {items.map((item, idx) => (
          <li key={idx} className="group">
            {item.isRoute ? (
              <Link to={item.to} className={`hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 ${item.className || ""}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
                {item.label}
                {item.hasExternalIcon && <ExternalLink size={12} className="text-emerald-500 shrink-0" />}
              </Link>
            ) : item.href ? (
              <a href={item.href} className={`hover:text-emerald-500 group-hover:translate-x-1 transition-all duration-200 inline-flex items-center gap-1.5 ${item.className || ""}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 opacity-0 group-hover:opacity-100 transition-opacity duration-200 shrink-0" />
                {item.label}
              </a>
            ) : (
              <span className={`inline-flex items-center gap-1.5 ${theme === "dark" ? "text-slate-300" : "text-slate-700"}`}>
                <span className="w-1.5 h-1.5 rounded-full bg-slate-500 opacity-40 shrink-0" />
                {item.label}
              </span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}



