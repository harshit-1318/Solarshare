import CarbonCredit from "../models/CarbonCredit.js";
import User from "../models/User.js";

// @route GET /api/certificates
export const getMyCertificates = async (req, res, next) => {
  try {
    const certs = await CarbonCredit.find({ user: req.user._id }).sort({ issuedAt: -1 });
    res.json(certs);
  } catch (err) { next(err); }
};

// @route POST /api/certificates/generate
export const generateCertificate = async (req, res, next) => {
  try {
    const { kwhSold } = req.body;
    if (!kwhSold || Number(kwhSold) <= 0) {
      return res.status(400).json({ message: "Valid energy volume (kwhSold) is required" });
    }

    const co2SavedKg = Number(kwhSold) * 0.8; // 0.8kg CO2 per kWh solar
    const creditsEarned = co2SavedKg / 10; // 1 credit per 10kg CO2 saved

    // Check user's current carbon credit balance or just deduct/assign
    const user = await User.findById(req.user._id);
    user.carbonCreditsTotal += creditsEarned;
    await user.save();

    const cert = await CarbonCredit.create({
      user: req.user._id,
      kwhSold: Number(kwhSold),
      co2SavedKg,
      creditsEarned,
      certificateUrl: `https://solarshare-certificates.s3.amazonaws.com/cert-${Date.now()}.pdf`
    });

    res.status(201).json(cert);
  } catch (err) { next(err); }
};

// @route GET /api/certificates/:id
export const getCertificateById = async (req, res, next) => {
  try {
    const cert = await CarbonCredit.findById(req.params.id).populate("user", "name email");
    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    // Allow user or admin to view
    if (req.user.role !== "admin" && String(cert.user._id) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(cert);
  } catch (err) { next(err); }
};

// @route GET /api/certificates/stats
export const getCertificateStats = async (req, res, next) => {
  try {
    const stats = await CarbonCredit.aggregate([
      { $group: { _id: null, totalCO2SavedKg: { $sum: "$co2SavedKg" }, totalCredits: { $sum: "$creditsEarned" } } }
    ]);
    res.json({
      totalCO2SavedKg: stats[0]?.totalCO2SavedKg || 0,
      totalCreditsIssued: stats[0]?.totalCredits || 0
    });
  } catch (err) { next(err); }
};

// @route POST /api/certificates/:id/trade
export const tradeCertificate = async (req, res, next) => {
  try {
    const cert = await CarbonCredit.findOne({ _id: req.params.id, user: req.user._id });
    if (!cert) return res.status(404).json({ message: "Certificate not found" });

    // Simulate listing certificate for trading
    res.json({ message: "Certificate listed for trading in the carbon credits market", certificate: cert });
  } catch (err) { next(err); }
};
