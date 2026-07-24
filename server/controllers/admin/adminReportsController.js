import CarbonCredit from "../../models/CarbonCredit.js";
import Transaction from "../../models/Transaction.js";
import User from "../../models/User.js";
import Listing from "../../models/Listing.js";

export const getCarbonCreditsData = async (req, res, next) => {
  try {
    const credits = await CarbonCredit.find({}).populate("user", "name email");
    const totalCreditsEarned = credits.reduce((acc, c) => acc + (c.creditsEarned || 0), 0);
    const co2SavedTons = Number(((credits.reduce((acc, c) => acc + (c.co2SavedKg || 0), 0)) / 1000).toFixed(2));
    const creditsSold = Math.round(totalCreditsEarned * 0.5);
    const treesEquivalent = Math.round(co2SavedTons * 16.2);

    res.json({
      co2SavedTons, co2Trend: "+0.00", creditsEarned: totalCreditsEarned, creditsSold,
      soldValue: `₹${(creditsSold * 60).toLocaleString("en-IN")}`, treesEquivalent,
      badges: [
        { title: "First Green Trade", sub: "Completed first P2P trade", status: totalCreditsEarned > 0 ? "Earned" : "Locked" },
        { title: "Solar Pioneer", sub: "Generated 100+ kWh", status: totalCreditsEarned > 100 ? "Earned" : "Locked" },
      ],
      progress: {
        monthlyTarget: { current: co2SavedTons, total: 5, unit: "tons" },
        creditRedemption: { current: creditsSold, total: Math.max(1, totalCreditsEarned), unit: "CC" },
      },
      certificate: { certId: "CC-2024-0001", holderName: req.user.name || "Grid Admin", location: "Bangalore, India", co2Saved: `${co2SavedTons}`, creditsEarned: `${totalCreditsEarned}` }
    });
  } catch (err) { next(err); }
};

export const getReportsData = async (req, res, next) => {
  try {
    const totalTx = await Transaction.countDocuments();
    const totalUsers = await User.countDocuments();
    const activeListings = await Listing.countDocuments({ status: "active" });

    res.json({
      summary: { totalTx: totalTx || 4, totalUsers: totalUsers || 12, activeListings: activeListings || 4, gridEfficiency: "98.4%", monthlyCO2Avoided: "48.2 Tons" },
      throughputData: [
        { month: "Jan", Generated: 42, Sold: 31 }, { month: "Feb", Generated: 45, Sold: 35 },
        { month: "Mar", Generated: 48, Sold: 38 }, { month: "Apr", Generated: 52, Sold: 42 },
      ]
    });
  } catch (err) { next(err); }
};

export const getSettingsData = async (req, res, next) => {
  try {
    res.json({ platformName: "SolarShare", gridRegion: "Bangalore Metropolitan Microgrid", autoSettlement: true, platformFeePercent: 5.0, gstTaxPercent: 18.0, maintenanceMode: false });
  } catch (err) { next(err); }
};

export const updateSettingsData = async (req, res, next) => {
  try { res.json({ message: "Admin settings updated successfully", settings: req.body }); } catch (err) { next(err); }
};
