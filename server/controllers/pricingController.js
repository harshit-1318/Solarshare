import MeterReading from "../models/MeterReading.js";

// Simulated/Adjustable admin pricing parameters
let baseTariff = 4.5; // ₹4.5 base price per kWh
let loadMultiplier = 1.2; // rate factor for supply-demand imbalance

// @route GET /api/pricing/dynamic-rate
export const getLiveDynamicRate = async (req, res, next) => {
  try {
    // Determine dynamic rate by comparing recent grid generation vs consumption
    const since = new Date();
    since.setHours(since.getHours() - 1);
    
    const readings = await MeterReading.find({ recordedAt: { $gte: since } });
    let totalGen = 0;
    let totalCons = 0;

    readings.forEach((r) => {
      totalGen += Number(r.generationKwh || 0);
      totalCons += Number(r.consumptionKwh || 0);
    });

    let currentRate = baseTariff;
    if (totalCons > totalGen && totalGen > 0) {
      // Consumption exceed generation -> High demand -> Increase price
      currentRate = baseTariff * loadMultiplier;
    } else if (totalGen > totalCons && totalCons > 0) {
      // Surplus solar -> Drop price to encourage usage
      currentRate = baseTariff / loadMultiplier;
    }

    res.json({
      baseTariff,
      loadMultiplier,
      currentRate: Number(currentRate.toFixed(2)),
      unit: "INR/kWh",
      loadImbalance: totalGen > 0 ? (totalCons / totalGen).toFixed(2) : 1.0
    });
  } catch (err) { next(err); }
};

// @route GET /api/pricing/tariffs
export const getTariffBrackets = (req, res) => {
  res.json({
    brackets: [
      { name: "Off-Peak (Surplus Gen)", multiplier: 0.8, description: "Applicable during high solar generation hours" },
      { name: "Normal", multiplier: 1.0, description: "Standard utility baseline rate" },
      { name: "Peak-Demand (High Grid Load)", multiplier: 1.25, description: "Applicable during peak evening consumption times" },
    ]
  });
};

// @route PUT /api/pricing/parameters
export const updatePricingParams = (req, res) => {
  const { newBaseTariff, newLoadMultiplier } = req.body;
  if (newBaseTariff !== undefined) baseTariff = Number(newBaseTariff);
  if (newLoadMultiplier !== undefined) loadMultiplier = Number(newLoadMultiplier);

  res.json({
    message: "Admin pricing settings modified",
    baseTariff,
    loadMultiplier
  });
};

// @route GET /api/pricing/forecast
export const getPricingForecast = (req, res) => {
  const forecast = [
    { hour: "08:00", rate: Number((baseTariff * 0.9).toFixed(2)) },
    { hour: "12:00", rate: Number((baseTariff * 0.85).toFixed(2)) }, // sunlight peak
    { hour: "16:00", rate: Number((baseTariff * 1.1).toFixed(2)) },
    { hour: "20:00", rate: Number((baseTariff * 1.35).toFixed(2)) }, // peak consumption
    { hour: "00:00", rate: Number(baseTariff.toFixed(2)) },
  ];
  res.json(forecast);
};

// @route GET /api/pricing/history
export const getPricingHistory = (req, res) => {
  const history = [
    { date: "Yesterday 08:00", rate: 4.1 },
    { date: "Yesterday 12:00", rate: 3.8 },
    { date: "Yesterday 16:00", rate: 4.8 },
    { date: "Yesterday 20:00", rate: 5.4 },
  ];
  res.json(history);
};
