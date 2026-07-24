import { Link } from "react-router-dom";
import { Sun, Twitter, Linkedin, Github, Instagram, ShieldCheck } from "lucide-react";
import FooterLinksNav from "./FooterLinksNav.jsx";

const socials = [
  { icon: Twitter, href: "https://twitter.com", label: "Twitter" },
  { icon: Linkedin, href: "https://linkedin.com", label: "LinkedIn" },
  { icon: Github, href: "https://github.com", label: "GitHub" },
  { icon: Instagram, href: "https://instagram.com", label: "Instagram" },
];

export default function Footer() {
  return (
    <footer id="about" className="bg-slate-950 text-slate-400 pt-16 pb-8 border-t border-slate-800 relative">
      <div className="mx-auto max-w-7xl px-6 sm:px-8 lg:px-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10">
          <div className="md:col-span-5 flex flex-col gap-6">
            <Link to="/" className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-600 text-white shadow-md shadow-emerald-600/20">
                <Sun size={20} className="fill-white" />
              </div>
              <span className="font-heading text-2xl font-black tracking-tight text-white">
                Solar<span className="text-emerald-500">Share</span>
              </span>
            </Link>

            <p className="text-sm leading-relaxed text-slate-400 max-w-sm font-normal">
              Empowering homeowners and businesses to trade surplus solar energy peer-to-peer. Building a sustainable, decentralized power grid for India.
            </p>

            <div className="flex items-center gap-3">
              {socials.map(({ icon: Icon, href, label }) => (
                <a
                  key={label}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={label}
                  className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:bg-slate-800 hover:text-white hover:border-emerald-500/40 transition duration-300"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          <FooterLinksNav />
        </div>

        <div className="mt-16 pt-8 border-t border-slate-800/80 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-slate-400">&copy; {new Date().getFullYear()} SolarShare Technologies Pvt. Ltd. All rights reserved.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="flex items-center gap-1">
              <ShieldCheck size={14} className="text-emerald-500" /> ISO 27001 Certified
            </span>
            <span>•</span>
            <span>Made with 💚 for a greener planet</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
