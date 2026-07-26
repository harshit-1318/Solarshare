import { Leaf, Zap, Award, Globe } from "lucide-react";

export function formatRealStats(realStats, selectedState = "all") {
  const stateNames = {
    all: "National Solar Grid",
    KA: "Karnataka (BESCOM / HESCOM)",
    MH: "Maharashtra (MSEDCL)",
    DL: "Delhi NCR (TPDDL / BRPL)",
    TN: "Tamil Nadu (TANGEDCO)",
  };

  const leadingRegions = {
    all: "National Grid",
    KA: "Karnataka Grid",
    MH: "Maharashtra Grid",
    DL: "Delhi NCR Grid",
    TN: "Tamil Nadu Grid",
  };

  const kwh = Number(realStats?.totalKwhTraded) || 0;
  const co2Tons = Number(realStats?.co2AvoidedTons) || 0;
  const prosumers = Number(realStats?.totalProsumers) || 0;
  const trees = Number(realStats?.treesEquivalent) || Math.round((kwh * 0.85) / 20);
  const savingsRupees = Number(realStats?.utilitySavingsRupees) || Math.round(kwh * 3.0);

  // Format utility savings
  let savingsFormatted = "₹0";
  let savingsUnit = "";
  if (savingsRupees >= 100000) {
    savingsFormatted = `₹${(savingsRupees / 100000).toFixed(2)}`;
    savingsUnit = "Lakhs";
  } else {
    savingsFormatted = `₹${savingsRupees.toLocaleString()}`;
    savingsUnit = "";
  }

  // Format clean energy traded (kWh, MWh, GWh)
  let powerValue = "0";
  let powerUnit = "kWh";
  if (kwh >= 1000000) {
    powerValue = (kwh / 1000000).toFixed(2);
    powerUnit = "GWh";
  } else if (kwh >= 1000) {
    powerValue = (kwh / 1000).toFixed(1);
    powerUnit = "MWh";
  } else {
    powerValue = kwh.toLocaleString();
    powerUnit = "kWh";
  }

  return {
    stateName: stateNames[selectedState] || "National Solar Grid",
    leadingRegion: leadingRegions[selectedState] || "National Grid",
    co2Tons: co2Tons.toLocaleString(),
    treesPlanted: trees.toLocaleString(),
    powerValue,
    powerUnit,
    savingsFormatted,
    savingsUnit,
    prosumers: prosumers.toLocaleString(),
  };
}

export const getImpactMetrics = (formattedStats) => [
  {
    id: "co2-offset",
    icon: Leaf,
    title: "Carbon Offset",
    value: formattedStats?.co2Tons || "0",
    unit: "Tons",
    subtext: "CO2 Emissions Saved",
    badge: "Verified Credits",
    badgeColor: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    detail: `Equivalent to planting ~${formattedStats?.treesPlanted || "0"} mature trees based on real database trading.`,
    highlightCard: true,
  },
  {
    id: "green-power",
    icon: Zap,
    title: "Green Power Traded",
    value: formattedStats?.powerValue || "0",
    unit: formattedStats?.powerUnit || "kWh",
    subtext: "P2P Solar Energy Delivered",
    badge: "Zero Loss Grid",
    badgeColor: "bg-amber-500/10 text-amber-400 border-amber-500/20",
    detail: `Directly peer-traded over ${formattedStats?.stateName || "DISCOM"} distribution grids with 0 transmission loss.`,
  },
  {
    id: "community-savings",
    icon: Award,
    title: "Community Savings",
    value: formattedStats?.savingsFormatted || "₹0",
    unit: formattedStats?.savingsUnit || "",
    subtext: "Electricity Costs Saved",
    badge: "30% Cheaper Tariff",
    badgeColor: "bg-teal-500/10 text-teal-400 border-teal-500/20",
    detail: "Direct monetary savings retained by energy consumers compared to standard DISCOM retail tariffs.",
  },
  {
    id: "connected-prosumers",
    icon: Globe,
    title: "Connected Prosumers",
    value: formattedStats?.prosumers || "0",
    unit: "Nodes",
    subtext: "Active Rooftop Solar Arrays",
    badge: "100% DISCOM Compliant",
    badgeColor: "bg-indigo-500/10 text-indigo-400 border-indigo-500/20",
    detail: `Registered solar prosumer users currently active in database for ${formattedStats?.stateName || "India"}.`,
  },
];

