import Dispute from "../models/Dispute.js";
import Transaction from "../models/Transaction.js";

// @route POST /api/disputes
export const raiseDispute = async (req, res, next) => {
  try {
    const { transactionId, reason, priority = "medium" } = req.body;
    if (!reason) {
      return res.status(400).json({ message: "Dispute reason is required" });
    }

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
      disputeCode,
      transaction: validTxId,
      raisedBy: req.user._id,
      reason,
      priority,
      status: "open",
      messages: [
        {
          sender: req.user._id,
          senderName: req.user.name || "User",
          senderRole: req.user.role || "consumer",
          message: reason,
          createdAt: new Date(),
        },
      ],
    });

    res.status(201).json(dispute);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/disputes
export const getDisputes = async (req, res, next) => {
  try {
    let query = {};
    if (req.user.role !== "admin") {
      query = { raisedBy: req.user._id };
    }

    const disputes = await Dispute.find(query)
      .populate("transaction")
      .populate("raisedBy", "name email role")
      .sort({ createdAt: -1 });

    res.json(disputes);
  } catch (err) {
    next(err);
  }
};

// @route GET /api/disputes/:id
export const getDisputeById = async (req, res, next) => {
  try {
    const dispute = await Dispute.findById(req.params.id)
      .populate("transaction")
      .populate("raisedBy", "name email role");

    if (!dispute) return res.status(404).json({ message: "Dispute not found" });

    if (req.user.role !== "admin" && String(dispute.raisedBy._id) !== String(req.user._id)) {
      return res.status(403).json({ message: "Access denied" });
    }

    res.json(dispute);
  } catch (err) {
    next(err);
  }
};

// @route POST /api/disputes/:id/messages
export const addDisputeMessage = async (req, res, next) => {
  try {
    const { message } = req.body;
    if (!message) return res.status(400).json({ message: "Message content required" });

    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) return res.status(404).json({ message: "Dispute not found" });

    dispute.messages.push({
      sender: req.user._id,
      senderName: req.user.name || (req.user.role === "admin" ? "Admin" : "User"),
      senderRole: req.user.role,
      message,
      createdAt: new Date(),
    });

    await dispute.save();
    res.json(dispute);
  } catch (err) {
    next(err);
  }
};

// @route PATCH /api/disputes/:id/status
export const updateDisputeStatus = async (req, res, next) => {
  try {
    const { status, resolution } = req.body;
    const dispute = await Dispute.findById(req.params.id);
    if (!dispute) return res.status(404).json({ message: "Dispute not found" });

    if (status) dispute.status = status;
    if (resolution !== undefined) dispute.resolution = resolution;

    if (dispute.transaction && status === "resolved") {
      await Transaction.findByIdAndUpdate(dispute.transaction, { status: "completed", settledAt: new Date() });
    }

    await dispute.save();
    res.json(dispute);
  } catch (err) {
    next(err);
  }
};
