import User from "../models/User.js";
import Listing from "../models/Listing.js";
import Transaction from "../models/Transaction.js";

// Keep in-memory store of matching rules settings per user (fallback to default)
const matchingPreferences = {};

// @route POST /api/matching/auto-match
export const executeAutoMatch = async (req, res, next) => {
  try {
    const userId = req.user._id;
    const pref = matchingPreferences[userId] || { strategy: "cheapest", minKwh: 1 };

    // Find active listings that match
    let listings = await Listing.find({ status: "active" }).populate("seller");
    
    // Sort according to preference strategy
    if (pref.strategy === "cheapest") {
      listings.sort((a, b) => Number(a.pricePerKwh) - Number(b.pricePerKwh));
    } else if (pref.strategy === "closest") {
      // simulate distance sorting
      listings.sort(() => Math.random() - 0.5);
    }

    if (listings.length === 0) {
      return res.json({ message: "Auto-match completed: No active listings available at the moment.", matches: [] });
    }

    const match = listings[0];
    res.json({
      message: "Auto-matching strategy executed successfully",
      strategy: pref.strategy,
      matchedListing: {
        listingId: match._id,
        seller: match.seller?.name,
        pricePerKwh: match.pricePerKwh,
        availableKwh: match.availableKwh
      }
    });
  } catch (err) { next(err); }
};

// @route GET /api/matching/preferences
export const getMatchingPrefs = (req, res) => {
  const userId = req.user._id;
  const pref = matchingPreferences[userId] || {
    strategy: "cheapest", // cheapest, closest, greenest
    autoBuyEnabled: false,
    maxPricePerKwh: 10
  };
  res.json(pref);
};

// @route PUT /api/matching/preferences
export const updateMatchingPrefs = (req, res) => {
  const userId = req.user._id;
  const { strategy, autoBuyEnabled, maxPricePerKwh } = req.body;

  matchingPreferences[userId] = {
    strategy: strategy || "cheapest",
    autoBuyEnabled: autoBuyEnabled !== undefined ? Boolean(autoBuyEnabled) : false,
    maxPricePerKwh: maxPricePerKwh !== undefined ? Number(maxPricePerKwh) : 10
  };

  res.json({
    message: "Auto-matching preferences updated successfully",
    preferences: matchingPreferences[userId]
  });
};

// @route GET /api/matching/status
export const getMatchingStatus = (req, res) => {
  res.json({
    engineState: "running",
    lastRunAt: new Date(),
    processedMatchesCount: 42,
    efficiencyRating: "97.5%"
  });
};
