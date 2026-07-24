import Listing from "../../models/Listing.js";

export const createListing = async (req, res) => {
  try {
    const { availableKwh, pricePerKwh, availableUntil, location } = req.body;
    const kwh = Number(availableKwh);
    const price = Number(pricePerKwh);

    if (!Number.isFinite(kwh) || kwh <= 0 || !Number.isFinite(price) || price <= 0) {
      return res.status(400).json({ message: "Available energy and price must be positive numbers" });
    }
    if (availableUntil && new Date(availableUntil) <= new Date()) {
      return res.status(400).json({ message: "Listing expiry must be in the future" });
    }

    const listing = await Listing.create({ seller: req.user._id, availableKwh: kwh, pricePerKwh: price, availableUntil, location });
    res.status(201).json(listing);
  } catch (err) { res.status(500).json({ message: "Could not create listing", error: err.message }); }
};

export const updateListing = async (req, res, next) => {
  try {
    const { availableKwh, pricePerKwh, status } = req.body;
    const listing = await Listing.findOne({ _id: req.params.id, seller: req.user._id });
    if (!listing) return res.status(404).json({ message: "Listing not found or access denied" });

    if (availableKwh !== undefined) listing.availableKwh = Number(availableKwh);
    if (pricePerKwh !== undefined) listing.pricePerKwh = Number(pricePerKwh);
    if (status !== undefined) listing.status = String(status);

    await listing.save();
    res.json(listing);
  } catch (err) { next(err); }
};

export const cancelListing = async (req, res, next) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.id, seller: req.user._id });
    if (!listing) return res.status(404).json({ message: "Listing not found or access denied" });

    listing.status = "cancelled";
    await listing.save();
    res.json({ message: "Listing cancelled successfully", listing });
  } catch (err) { next(err); }
};
