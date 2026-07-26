import { Sun, DollarSign, Activity, CheckCircle2 } from "lucide-react";

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
