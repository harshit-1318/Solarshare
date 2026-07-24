import PricingSetting from "../../models/PricingSetting.js";

export const getPricingEngineData = async (req, res, next) => {
  try {
    let settings = await PricingSetting.findOne();
    if (!settings) {
      settings = await PricingSetting.create({
        baseTariff: 4.8, minPrice: 3.0, maxPrice: 6.5, dynamicMultiplier: 1.2
      });
    }

    const priceTrends = [
      { name: "00:00", Price: settings.minPrice + 1.1 }, { name: "04:00", Price: settings.minPrice + 0.8 },
      { name: "08:00", Price: settings.minPrice + 1.8 }, { name: "12:00", Price: settings.minPrice + 1.4 },
      { name: "16:00", Price: settings.minPrice + 1.6 }, { name: "20:00", Price: settings.minPrice + 2.7 },
    ];

    const demandVsSupply = [
      { name: "00:00", Supply: 100, Demand: 120 }, { name: "04:00", Supply: 80, Demand: 90 },
      { name: "08:00", Supply: 220, Demand: 180 }, { name: "12:00", Supply: 480, Demand: 400 },
      { name: "16:00", Supply: 450, Demand: 430 }, { name: "20:00", Supply: 160, Demand: 210 },
    ];

    res.json({
      currentPrice: settings.baseTariff, changeTrend: "+12% from last hour",
      minPrice: settings.minPrice, maxPrice: settings.maxPrice,
      dynamicMultiplier: settings.dynamicMultiplier, priceTrends, demandVsSupply
    });
  } catch (err) { next(err); }
};

export const updatePricingEngineData = async (req, res, next) => {
  try {
    const { minPrice, maxPrice, dynamicMultiplier, currentPrice } = req.body;
    let settings = await PricingSetting.findOne() || new PricingSetting();

    if (minPrice !== undefined) settings.minPrice = Number(minPrice);
    if (maxPrice !== undefined) settings.maxPrice = Number(maxPrice);
    if (dynamicMultiplier !== undefined) settings.dynamicMultiplier = Number(dynamicMultiplier);
    if (currentPrice !== undefined) settings.baseTariff = Number(currentPrice);

    settings.lastUpdatedBy = req.user._id;
    await settings.save();
    res.json({ message: "Pricing rules updated successfully", settings });
  } catch (err) { next(err); }
};
