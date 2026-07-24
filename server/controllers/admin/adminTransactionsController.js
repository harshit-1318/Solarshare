import Transaction from "../../models/Transaction.js";
import User from "../../models/User.js";

export const getAllTransactions = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({})
      .populate("buyer", "name email")
      .populate("seller", "name email")
      .sort({ createdAt: -1 })
      .limit(200);
    res.json({ transactions });
  } catch (err) { next(err); }
};

export const getTransactionsLedger = async (req, res, next) => {
  try {
    const transactions = await Transaction.find({})
      .populate("buyer", "name email")
      .populate("seller", "name email")
      .sort({ createdAt: -1 });

    const totalEarned = transactions.reduce((acc, tx) => acc + (tx.totalAmount || 0), 0);
    const platformFee = Math.round(totalEarned * 0.05);
    const grossRevenue = totalEarned;
    const taxGst = Number((grossRevenue * 0.09).toFixed(1));
    const netSettlement = Number((grossRevenue - platformFee - taxGst).toFixed(1));
    
    const adminUser = await User.findById(req.user._id);
    const walletBalance = adminUser?.walletBalance || 0;
    const settled = transactions.filter(t => t.status === "completed").reduce((acc, tx) => acc + (tx.totalAmount || 0), 0);

    res.json({
      walletBalance, totalEarned, platformFee, settled,
      settlementSummary: { grossRevenue, platformFee, tax: taxGst, netSettlement: Math.max(0, netSettlement) },
      transactions: transactions.map((t, index) => ({
        id: t._id, txnId: `TXN${String(index + 1).padStart(3, "0")}`,
        type: t.status === "completed" ? "Sale" : "Settlement",
        buyerParty: t.buyer?.name || t.seller?.name || "Platform",
        energy: `${t.kwh || 0} kWh`, amount: `+₹${(t.totalAmount || 0).toFixed(2)}`,
        date: new Date(t.createdAt).toISOString().split("T")[0],
        status: t.status === "completed" ? "Completed" : "Pending",
      }))
    });
  } catch (err) { next(err); }
};

export const resolveDispute = async (req, res, next) => {
  try {
    const tx = await Transaction.findById(req.params.id);
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    tx.status = req.body.resolution || "completed";
    tx.settledAt = new Date();
    await tx.save();
    res.json({ message: "Dispute resolved", transaction: tx });
  } catch (err) { next(err); }
};
