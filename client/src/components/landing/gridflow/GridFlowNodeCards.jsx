import React from "react";
import { Sun, Home, Cpu } from "lucide-react";
import GridFlowNodeCardItem from "./GridFlowNodeCardItem.jsx";

export default function GridFlowNodeCards({ selectedNode, setSelectedNode }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-3.5 relative z-10 items-stretch">
      <GridFlowNodeCardItem
        nodeKey="nodeA"
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        icon={Sun}
        iconBg="bg-amber-500/20 border-amber-500/30"
        iconColor="text-amber-500"
        badge="Node A • Solar Generator"
        badgeDark="text-emerald-400 bg-emerald-500/10 border-emerald-500/20"
        badgeLight="text-emerald-800 bg-emerald-100 border-emerald-200"
        title="Rooftop Solar Array (8 kW)"
        subtitle="Generating 6.4 kWh Surplus Peak"
        stat1Label="Tariff Rate"
        stat1Value="₹5.20 / unit"
        stat2Label="Smart Meter API"
        stat2Value="BESCOM Verified"
        activeBorderColor="border-emerald-500"
      />

      <GridFlowNodeCardItem
        nodeKey="hub"
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        icon={Cpu}
        iconBg="bg-cyan-500/20 border-cyan-500/30"
        iconColor="text-cyan-500"
        badge="Matching Hub • Protocol"
        badgeDark="text-cyan-400 bg-cyan-500/10 border-cyan-500/20"
        badgeLight="text-cyan-800 bg-cyan-100 border-cyan-200"
        title="DISCOM Smart Meter Hub"
        subtitle="Wheeling Charge Auto-Deducted"
        stat1Label="API Sync Speed"
        stat1Value="< 1.2s Latency"
        stat2Label="Security Protocol"
        stat2Value="256-bit Encrypted"
        activeBorderColor="border-cyan-500"
      />

      <GridFlowNodeCardItem
        nodeKey="nodeB"
        selectedNode={selectedNode}
        setSelectedNode={setSelectedNode}
        icon={Home}
        iconBg="bg-teal-500/20 border-teal-500/30"
        iconColor="text-teal-500"
        badge="Node B • Energy Buyer"
        badgeDark="text-teal-400 bg-teal-500/10 border-teal-500/20"
        badgeLight="text-teal-800 bg-teal-100 border-teal-200"
        title="Residential Buyer"
        subtitle="Consuming Green Solar Power"
        stat1Label="Bill Savings"
        stat1Value="30% vs Grid Tariff"
        stat2Label="Green Offset"
        stat2Value="100% Zero Emission"
        activeBorderColor="border-teal-500"
      />
    </div>
  );
}
