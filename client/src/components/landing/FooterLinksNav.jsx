import { Link } from "react-router-dom";

export const FOOTER_LINKS = [
  {
    heading: "Platform",
    items: [
      { label: "Energy Marketplace", to: "/marketplace", isRoute: true },
      { label: "How It Works", href: "#how-it-works" },
      { label: "Live Grid Status", href: "#grid-flow" },
    ],
  },
  {
    heading: "Solutions",
    items: [
      { label: "For Rooftop Prosumers", href: "#features" },
      { label: "For Residential Buyers", href: "#features" },
      { label: "Carbon Credit Exchange", href: "#impact" },
    ],
  },
  {
    heading: "Company",
    items: [
      { label: "About SolarShare", href: "#top" },
      { label: "Frequently Asked Questions", href: "#faq" },
      { label: "Privacy Policy", href: "#top" },
    ],
  },
];

export default function FooterLinksNav() {
  return (
    <div className="md:col-span-7 grid grid-cols-3 gap-6">
      {FOOTER_LINKS.map((col) => (
        <div key={col.heading} className="flex flex-col gap-4">
          <h4 className="text-xs font-bold uppercase tracking-wider text-slate-200">
            {col.heading}
          </h4>
          <ul className="flex flex-col gap-3 text-sm">
            {col.items.map((item) => (
              <li key={item.label}>
                {item.isRoute ? (
                  <Link to={item.to} className="hover:text-emerald-400 transition-colors">
                    {item.label}
                  </Link>
                ) : (
                  <a href={item.href} className="hover:text-emerald-400 transition-colors">
                    {item.label}
                  </a>
                )}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}
