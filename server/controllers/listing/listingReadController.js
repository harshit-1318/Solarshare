import Listing from "../../models/Listing.js";

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
  } catch (err) { res.status(500).json({ message: "Could not fetch listings", error: err.message }); }
};

export const getMyListings = async (req, res) => {
  try {
    const listings = await Listing.find({ seller: req.user._id }).sort({ createdAt: -1 });
    res.status(200).json(listings);
  } catch (err) { res.status(500).json({ message: "Could not fetch your listings", error: err.message }); }
};

export const getListingById = async (req, res, next) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("seller", "name email");
    if (!listing) return res.status(404).json({ message: "Listing not found" });
    res.json(listing);
  } catch (err) { next(err); }
};

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
