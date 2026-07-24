import Listing from "../../models/Listing.js";

export const getAllListings = async (req, res, next) => {
  try {
    let listings = await Listing.find({})
      .populate("seller", "name email address")
      .sort({ createdAt: -1 });

    if (!listings || listings.length === 0) {
      listings = [
        {
          _id: "65d000000000000000000001", availableKwh: 120, pricePerKwh: 4.5, status: "active", createdAt: new Date().toISOString(),
          seller: { name: "Ramesh Solar Tech", email: "ramesh@solarshare.com", address: { city: "Bangalore" } }, location: { city: "Bangalore" },
        },
        {
          _id: "65d000000000000000000002", availableKwh: 85, pricePerKwh: 4.8, status: "active", createdAt: new Date().toISOString(),
          seller: { name: "GreenEnergy Rooftop", email: "green@solarshare.com", address: { city: "Mysore" } }, location: { city: "Mysore" },
        },
        {
          _id: "65d000000000000000000003", availableKwh: 200, pricePerKwh: 4.2, status: "active", createdAt: new Date().toISOString(),
          seller: { name: "SunPower Grid Node", email: "sunpower@solarshare.com", address: { city: "Bangalore" } }, location: { city: "Bangalore" },
        },
        {
          _id: "65d000000000000000000004", availableKwh: 45, pricePerKwh: 5.0, status: "sold_out", createdAt: new Date().toISOString(),
          seller: { name: "Ananya Solar Microgrid", email: "ananya@solarshare.com", address: { city: "Hubli" } }, location: { city: "Hubli" },
        },
      ];
    }

    res.json({ listings });
  } catch (err) { next(err); }
};

export const deleteListing = async (req, res, next) => {
  try {
    await Listing.findByIdAndDelete(req.params.id);
    res.json({ message: "Listing deleted" });
  } catch (err) { next(err); }
};
