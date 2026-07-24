import Dispute from "../../models/Dispute.js";
import Transaction from "../../models/Transaction.js";

export const raiseDispute = async (req, res, next) => {
  try {
    const { transactionId, reason, priority = "medium" } = req.body;
    if (!reason) return res.status(400).json({ message: "Dispute reason is required" });

    let validTxId = null;
    if (transactionId && typeof transactionId === "string" && transactionId.match(/^[0-9a-fA-F]{24}$/)) {
      const tx = await Transaction.findById(transactionId);
      if (tx) {
        tx.status = "disputed";
        await tx.save();
        validTxId = tx._id;
      }
    }

    const count = await Dispute.countDocuments();
    const disputeCode = `DIS${String(count + 1).padStart(3, "0")}`;

    const dispute = await Dispute.create({
      disputeCode, transaction: validTxId, raisedBy: req.user._id, reason, priority, status: "open",
      messages: [{ sender: req.user._id, senderName: req.user.name || "User", senderRole: req.user.role || "consumer", message: reason, createdAt: new Date() }],
    });

    res.status(201).json(dispute);
  } catch (err) { next(err); }
};

export const getDisputes = async (req, res, next) => {
  try {
    const query = req.user.role !== "admin" ? { raisedBy: req.user._id } : {};
    const disputes = await Dispute.find(query).populate("transaction").populate("raisedBy", "name email role").sort({ createdAt: -1 });
    res.json(disputes);
  } catch (err) { next(err); }
};

export const getDisputeById = async (req, res, next) => {
  try {
    const dispute = await Dispute.findById(req.params.id).populate("transaction").populate("raisedBy", "name email role");
    if (!dispute) return res.status(404).json({ message: "Dispute not found" });
    if (req.user.role !== "admin" && String(dispute.raisedBy._id) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }
    res.json(dispute);
  } catch (err) { next(err); }
};
