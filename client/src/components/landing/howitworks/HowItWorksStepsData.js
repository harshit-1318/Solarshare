import { Zap, Shield, Cpu, ArrowUpRight, Sun, DollarSign, Activity, CheckCircle2 } from "lucide-react";

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

export const consumerSteps = [
  {
    step: "01",
    title: "Link Home Energy Meter",
    desc: "Connect your home utility meter in under 60 seconds to access cheap, clean solar power from your neighbors.",
    icon: Sun,
    badge: "Instant Link",
    detail: "Zero physical hardware or rewiring needed at home",
    specs: [
      { label: "Meter Sync Speed", value: "Instant DISCOM Integration", highlight: true },
      { label: "Energy Source", value: "100% Local Rooftop Solar", highlight: false },
      { label: "Hardware Cost", value: "₹0 (Zero Rewiring Required)", highlight: false }
    ]
  },
  {
    step: "02",
    title: "Set Max Buying Rate",
    desc: "Set the max price you're willing to pay or activate AI Green Auto-Buy for maximum discount matching.",
    icon: DollarSign,
    badge: "Smart Savings",
    detail: "Save up to 30% on peak grid electricity tariff rates",
    specs: [
      { label: "Tariff Ceiling", value: "Max ₹5.50 / kWh Cap", highlight: true },
      { label: "Discount Advantage", value: "Up to 30% vs Grid Rates", highlight: false },
      { label: "AI Bidding Mode", value: "Lowest Price Auto-Lock", highlight: false }
    ]
  },
  {
    step: "03",
    title: "Auto-Match Local Solar",
    desc: "SolarShare protocol matches your consumption live with the closest solar generator on your transformer node.",
    icon: Activity,
    badge: "Substation Sync",
    detail: "Priority allocation from local neighborhood prosumers",
    specs: [
      { label: "Node Latency", value: "< 200ms Match Execution", highlight: true },
      { label: "Carbon Offset", value: "100% Certified Green Energy", highlight: false },
      { label: "Grid Priority", value: "Substation Transformer Level", highlight: false }
    ]
  },
  {
    step: "04",
    title: "Automated Monthly Savings",
    desc: "Your energy savings are automatically deducted from your DISCOM electricity bill with verified reports.",
    icon: CheckCircle2,
    badge: "Verified Savings",
    detail: "Seamless DISCOM bill adjustment & monthly savings report",
    specs: [
      { label: "Bill Adjustment", value: "Automated DISCOM Credit", highlight: true },
      { label: "Avg Monthly Saving", value: "₹1,350 / Month Average", highlight: false },
      { label: "Audit Certificate", value: "CERC Green Energy Credit", highlight: false }
    ]
  },
];
