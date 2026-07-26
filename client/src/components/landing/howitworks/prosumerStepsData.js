import { Zap, Shield, Cpu, ArrowUpRight } from "lucide-react";

export const prosumerSteps = [
  {
    step: "01",
    title: "Connect DISCOM Smart Meter",
    desc: "Register your rooftop solar array or home utility meter in under 60 seconds with your DISCOM consumer number.",
    icon: Cpu,
    badge: "API Synced",
    detail: "Supports BESCOM, MSEDCL, Tata, BSES & 6 State Grids",
    specs: [
      { label: "Sync Latency", value: "< 1.2s Realtime Telemetry", highlight: true },
      { label: "Meter Protocol", value: "REST / MQTT Smart Meter", highlight: false },
      { label: "Supported Grids", value: "BESCOM, MSEDCL, TATA + 6 Grids", highlight: false }
    ]
  },
  {
    step: "02",
    title: "Set Custom Solar Tariff",
    desc: "Prosumers define minimum export prices (e.g. ₹5.50/kWh) and enable peak surge auto-matching rules.",
    icon: Zap,
    badge: "AI Tariff Control",
    detail: "Earn up to 96% more than traditional DISCOM net-meter buyback",
    specs: [
      { label: "Export Price Range", value: "₹4.50 - ₹7.50 / kWh", highlight: true },
      { label: "Auto-Match Algo", value: "Proximity & High-Bid Priority", highlight: false },
      { label: "Surge Premium", value: "Dynamic Peak Hours (+30%)", highlight: false }
    ]
  },
  {
    step: "03",
    title: "Peer-to-Peer Grid Feed",
    desc: "SolarShare protocol automatically routes surplus solar units to nearby buyers on your substation node.",
    icon: ArrowUpRight,
    badge: "Instant P2P Match",
    detail: "Microgrid transmission with zero wheeling loss",
    specs: [
      { label: "Matching Speed", value: "< 250ms Contract Execution", highlight: true },
      { label: "Line Loss Rate", value: "0.00% Local Substation Node", highlight: false },
      { label: "State SERC Fee", value: "Automated Micro-Deduction", highlight: false }
    ]
  },
  {
    step: "04",
    title: "Automated Daily UPI Payout",
    desc: "Daily trade totals are verified against smart meters and funds deposit directly to your UPI wallet every evening at 18:00.",
    icon: Shield,
    badge: "Daily Payout",
    detail: "100% CERC P2P Guideline compliant with 256-bit AES encryption",
    specs: [
      { label: "Payout Schedule", value: "Daily 18:00 IST Direct UPI", highlight: true },
      { label: "Ledger Security", value: "256-bit AES Cryptographic Proof", highlight: false },
      { label: "Regulatory Compliance", value: "100% CERC P2P Compliant", highlight: false }
    ]
  },
];
