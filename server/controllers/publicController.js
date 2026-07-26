import User from "../models/User.js";
import Transaction from "../models/Transaction.js";
import Listing from "../models/Listing.js";
import MeterReading from "../models/MeterReading.js";

/**
 * Public Landing Page Aggregated Metrics & Live Data Stream
 * GET /api/public/landing-stats
 */
export const getLandingStats = async (req, res, next) => {
  try {
    const { state } = req.query;

    let prosumerFilter = { role: "prosumer" };
    let consumerFilter = { role: "consumer" };

    if (state && state !== "all") {
      const stateMap = {
        KA: "Karnataka",
        MH: "Maharashtra",
        DL: "Delhi",
        TN: "Tamil Nadu",
      };
      const searchState = stateMap[state] || state;
      const stateRegex = new RegExp(searchState, "i");
      prosumerFilter["address.state"] = stateRegex;
      consumerFilter["address.state"] = stateRegex;
    }

    const [
      totalProsumersCount,
      totalConsumersCount,
      completedTradesCount,
      activeListingsCount,
      tradeTotalsAgg,
      recentTransactions,
      recentListings,
      recentMeterReadings
    ] = await Promise.all([
      User.countDocuments(prosumerFilter),
      User.countDocuments(consumerFilter),
      Transaction.countDocuments({ status: "completed" }),
      Listing.countDocuments({ status: "active" }),
      Transaction.aggregate([
        { $match: { status: "completed" } },
        {
          $group: {
            _id: null,
            totalKwh: { $sum: "$kwh" },
            totalValue: { $sum: "$totalAmount" },
          },
        },
      ]),
      Transaction.find({ status: "completed" })
        .populate("buyer", "name address")
        .populate("seller", "name address")
        .sort({ createdAt: -1 })
        .limit(10),
      Listing.find({ status: "active" })
        .populate("seller", "name address solarPanel")
        .sort({ createdAt: -1 })
        .limit(10),
      MeterReading.find({ role: "prosumer" })
        .sort({ recordedAt: -1 })
        .limit(20),
    ]);

    const totalKwhTraded = tradeTotalsAgg[0]?.totalKwh || 0;
    const totalSettledAmount = tradeTotalsAgg[0]?.totalValue || 0;

    // Calculate real environmental metrics
    const co2AvoidedKg = totalKwhTraded * 0.85; // 0.85 kg CO2 saved per kWh solar vs grid
    const co2AvoidedTons = (co2AvoidedKg / 1000).toFixed(2);
    const treesEquivalent = Math.round(co2AvoidedKg / 20); // ~20kg CO2 per tree/yr

    // Format recent trades for live stream preview
    const formattedTrades = recentTransactions.map((t) => ({
      id: t._id,
      sellerName: t.seller?.name || "Solar Prosumer",
      buyerName: t.buyer?.name || "Energy Consumer",
      location: t.seller?.address?.city
        ? `${t.seller.address.city}${t.seller.address.state ? ", " + t.seller.address.state : ""}`
        : "India",
      energyAmountKwh: t.kwh,
      pricePerKwh: t.pricePerKwh,
      totalAmount: t.totalAmount,
      createdAt: t.createdAt,
    }));

    // Format active listings for live marketplace preview
    const formattedListings = recentListings.map((l) => ({
      id: l._id,
      sellerName: l.seller?.name || "Solar Generator",
      city: l.seller?.address?.city || "India",
      availableKwh: l.availableKwh,
      pricePerKwh: l.pricePerKwh,
      capacityKw: l.seller?.solarPanel?.capacityKw || 5,
      createdAt: l.createdAt,
    }));

    // Latest power output calculation from telemetry
    const latestGenerationSum = recentMeterReadings.reduce(
      (acc, r) => acc + (r.generationKwh || 0),
      0
    );
    const avgPeakPowerKw = recentMeterReadings.length
      ? (latestGenerationSum / recentMeterReadings.length).toFixed(1)
      : "0.0";

    res.json({
      totalProsumers: totalProsumersCount,
      totalConsumers: totalConsumersCount,
      totalTradesSettled: completedTradesCount,
      activeListingsCount: activeListingsCount,
      totalKwhTraded: Math.round(totalKwhTraded * 10) / 10,
      totalSettledAmount: Math.round(totalSettledAmount),
      co2AvoidedKg: Math.round(co2AvoidedKg),
      co2AvoidedTons: parseFloat(co2AvoidedTons),
      treesEquivalent,
      avgPeakPowerKw: parseFloat(avgPeakPowerKw),
      recentTrades: formattedTrades,
      recentListings: formattedListings,
    });
  } catch (err) {
    next(err);
  }
};
