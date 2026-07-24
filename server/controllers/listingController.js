import Listing from "../models/Listing.js";

// @route POST /api/listings   (prosumer)
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
    const listing = await Listing.create({
      seller: req.user._id,
      availableKwh: kwh,
      pricePerKwh: price,
      availableUntil,
      location,
    });
    res.status(201).json(listing);
  } catch (err) {
    res.status(500).json({ message: "Could not create listing", error: err.message });
  }
};

// @route GET /api/listings   (marketplace browse - supports ?minPrice&maxPrice&city&sort)
export const getListings = async (req, res) => {
  try {
    const { minPrice, maxPrice, city, sort } = req.query;
    const filter = { status: "active" };
    if (minPrice || maxPrice) {
      filter.pricePerKwh = {};
      if (minPrice) filter.pricePerKwh.$gte = Number(minPrice);
      if (maxPrice) filter.pricePerKwh.$lte = Number(maxPrice);
    }
    if (city) filter["location.city"] = city;

    let query = Listing.find(filter).populate("seller", "name address.city");
    if (sort === "price_asc") query = query.sort({ pricePerKwh: 1 });
    if (sort === "price_desc") query = query.sort({ pricePerKwh: -1 });
    if (sort === "newest") query = query.sort({ createdAt: -1 });

    const listings = await query;
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch listings", error: err.message });
  }
};

// @route GET /api/listings/mine   (prosumer's own listings)
export const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (err) {
    res.status(500).json({ message: "Could not fetch your listings", error: err.message });
  }
};

// @route GET /api/listings/:id
export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("seller", "name email");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) { next(err); }
};

// @route PUT /api/listings/:id
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

// @route DELETE /api/listings/:id
export const cancelListing = async (req, res, next) => {
  try {
    const listing = await Listing.findOne({ _id: req.params.id, seller: req.user._id });
    if (!listing) return res.status(404).json({ message: "Listing not found or access denied" });

    listing.status = "cancelled";
    await listing.save();
    res.json({ message: "Listing cancelled successfully", listing });
  } catch (err) { next(err); }
};

// @route GET /api/listings/summary/stats
export const getListingsSummary = async (req, res, next) => {
  try {
    const stats = await Listing.aggregate([
      { $match: { status: "active" } },
      { $group: { _id: null, avgPrice: { $sum: "$pricePerKwh" }, count: { $sum: 1 } } }
    ]);
    res.json({
      averagePricePerKwh: stats[0] ? Number((stats[0].avgPrice / stats[0].count).toFixed(2)) : 0,
      totalActiveOffers: stats[0]?.count || 0
    });
  } catch (err) { next(err); }
};

