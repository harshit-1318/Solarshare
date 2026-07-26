export const LANDING_SECTION_IDS = {
  TOP: "top",
  FEATURES: "features",
  GRID_FLOW: "grid-flow",
  CALCULATOR: "calculator",
  HOW_IT_WORKS: "how-it-works",
  IMPACT: "impact",
  FAQ: "faq",
};

export const LANDING_CONFIG = {
  VERSION: "2.0.0-Enhanced",
  THEME: "Glassmorphic Dark/Light Hybrid",
  CERC_COMPLIANCE: "Verified P2P Guidelines",
  DISCOM_SYNC_LATENCY: "< 1.2s",
  DEFAULT_SOLAR_TARIFF: 5.5,
  DEFAULT_GRID_TARIFF: 8.5,
  P2P_PROSUMER_REVENUE_ADVANTAGE: "+96%",
  P2P_BUYER_SAVINGS_ADVANTAGE: "Up to 30%",
};

export const FEATURE_CATEGORIES = [
  { id: "all", name: "All Features" },
  { id: "prosumer", name: "Solar Prosumers" },
  { id: "consumer", name: "Energy Buyers" },
  { id: "security", name: "Security & Ledger" },
];

export const SUPPORTED_DISCOMS = [
  { code: "BESCOM", region: "Karnataka", status: "100% Ready", apiLatencyMs: 1800 },
  { code: "MSEDCL", region: "Maharashtra", status: "100% Ready", apiLatencyMs: 1900 },
  { code: "TATA_POWER", region: "MH / DL / OR", status: "100% Ready", apiLatencyMs: 950 },
  { code: "BSES", region: "Delhi NCR", status: "100% Ready", apiLatencyMs: 850 },
  { code: "TSSPDCL", region: "Telangana", status: "100% Ready", apiLatencyMs: 2100 },
  { code: "TANGEDCO", region: "Tamil Nadu", status: "100% Ready", apiLatencyMs: 1950 },
];
