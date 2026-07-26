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
