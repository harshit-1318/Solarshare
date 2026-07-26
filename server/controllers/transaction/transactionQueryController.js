import Transaction from "../../models/Transaction.js";

export const getMyTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ buyer: req.user._id }, { seller: req.user._id }],
    }).populate("buyer", "name").populate("seller", "name").sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) { next(err); }
};

export const getTransactionById = async (req, res, next) => {
  try {
    const tx = await Transaction.findById(req.params.id).populate("buyer", "name email").populate("seller", "name email");
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    if (String(tx.buyer._id) !== String(req.user._id) && String(tx.seller._id) !== String(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(tx);
  } catch (err) { next(err); }
};

export const exportStatement = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({
      $or: [{ buyer: req.user._id }, { seller: req.user._id }],
    }).sort({ createdAt: -1 });

    res.setHeader("Content-Type", "application/json");
    res.setHeader("Content-Disposition", "attachment; filename=solarshare-statement.json");
    res.json({ exportedAt: new Date(), user: req.user.name, totalCount: transactions.length, ledger: transactions });
  } catch (err) { next(err); }
};

export const getTransactionStats = async (req, res, next) => {
  try {
    const totalTraded = await Transaction.aggregate([
      { $match: { $or: [{ buyer: req.user._id }, { seller: req.user._id }], status: "completed" } },
      { $group: { _id: null, totalKwh: { $sum: "$kwh" }, totalValue: { $sum: "$totalAmount" } } }
    ]);
    res.json({
      totalKwhTraded: totalTraded[0]?.totalKwh || 0,
      totalSettlementsAmount: totalTraded[0]?.totalValue || 0
    });
  } catch (err) { next(err); }
};

export const getPublicRecentTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({ status: "completed" })
      .populate("buyer", "name address")
      .populate("seller", "name address")
      .sort({ createdAt: -1 })
      .limit(10);

    const formatted = transactions.map((t) => ({
      _id: t._id,
      sellerName: t.seller?.name || "Solar Prosumer",
      buyerName: t.buyer?.name || "Energy Consumer",
      location: t.seller?.address?.city ? `${t.seller.address.city}${t.seller.address.state ? ", " + t.seller.address.state : ""}` : "India",
      energyAmountKwh: t.kwh,
      pricePerKwh: t.pricePerKwh,
      totalAmount: t.totalAmount,
      createdAt: t.createdAt,
    }));

    res.json(formatted);
  } catch (err) { next(err); }
};

