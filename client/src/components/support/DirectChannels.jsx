import { MessageSquare, PhoneCall, Mail, MapPin, ArrowRight } from "lucide-react";

export default function DirectChannels() {
  return (
    <div className="rounded-3xl border border-slate-200/80 bg-white p-7 shadow-soft space-y-4">
      <h3 className="font-heading text-xl font-bold text-slate-900">Direct Support Channels</h3>
      <p className="text-xs text-slate-500">Get in touch through your preferred channel</p>

      {/* Live Chat */}
      <div className="p-4 rounded-2xl bg-emerald-50/70 border border-emerald-200/80 flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-emerald-600 text-white shrink-0 shadow-md">
          <MessageSquare size={20} />
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h4 className="text-sm font-bold text-slate-900">24/7 Live Web Chat</h4>
            <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
          </div>
          <p className="text-xs text-slate-600 mt-0.5">Average response time: &lt; 2 minutes</p>
          <button
            type="button"
            onClick={() => alert("Connecting to SolarShare Live Energy Agent...")}
            className="mt-2.5 inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 hover:text-emerald-800"
          >
            Start Chat Now <ArrowRight size={13} />
          </button>
        </div>
      </div>

      {/* Phone Hotline */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shrink-0">
          <PhoneCall size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">Toll-Free Grid Hotline</h4>
          <p className="text-xs font-semibold text-emerald-600 mt-0.5">1800-SOLAR-SHARE (76527)</p>
          <p className="text-[11px] text-slate-500 mt-0.5">Mon - Sat: 8:00 AM - 10:00 PM IST</p>
        </div>
      </div>

      {/* Email */}
      <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex items-start gap-4">
        <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-slate-900 text-white shrink-0">
          <Mail size={20} />
        </div>
        <div>
          <h4 className="text-sm font-bold text-slate-900">Email Support</h4>
          <p className="text-xs font-semibold text-slate-700 mt-0.5">support@solarshare.energy</p>
        </div>
      </div>
    </div>
  );
}
