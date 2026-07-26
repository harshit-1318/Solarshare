import { Zap, Shield, Leaf, Cpu, Globe, TrendingUp } from "lucide-react";

export const allFeatures = [
  {
    category: "prosumer",
    icon: Zap,
    iconBg: "bg-amber-500/10 text-amber-400 border border-amber-500/20",
    title: "Real-Time P2P Energy Trading",
    desc: "Automated peer-to-peer matching pairs rooftop solar sellers directly with neighboring consumers based on live grid distance and tariff bids."
  },
  {
    category: "security",
    icon: Shield,
    iconBg: "bg-blue-500/10 text-blue-400 border border-blue-500/20",
    title: "Bank-Grade Ledger Security",
    desc: "Every transaction is timestamped and secured using 256-bit cryptographic encryption, guaranteeing 100% transparent audit trails for DISCOMs."
  },
  {
    category: "prosumer",
    icon: Leaf,
    iconBg: "bg-emerald-500/10 text-emerald-400 border border-emerald-500/20",
    title: "Automated Carbon Credits",
    desc: "Automatically mint verified green carbon tokens for every kilowatt-hour of clean solar power generated and sell them to corporate ESG buyers."
  },
  {
    category: "prosumer",
    icon: TrendingUp,
    iconBg: "bg-purple-500/10 text-purple-400 border border-purple-500/20",
    title: "AI Dynamic Tariff Pricing Engine",
    desc: "Smart algorithmic pricing dynamically adjusts your selling rate during neighborhood power demand surges to maximize solar revenue."
  },
  {
    category: "consumer",
    icon: Cpu,
    iconBg: "bg-teal-500/10 text-teal-400 border border-teal-500/20",
    title: "Smart Meter Bi-Directional Sync",
    desc: "Seamless integration with state electricity DISCOM smart meters for automated meter reading, net settlement, and zero paperwork."
  },
  {
    category: "consumer",
    icon: Globe,
    iconBg: "bg-indigo-500/10 text-indigo-400 border border-indigo-500/20",
    title: "Hyper-Local Clean Microgrid",
    desc: "Source 100% locally generated solar energy from rooftop owners in your immediate pincode at up to 30% discount off standard grid tariffs."
  },
];
