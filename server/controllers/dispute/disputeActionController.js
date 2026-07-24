import Dispute from "../../models/Dispute.js";
import Transaction from "../../models/Transaction.js";

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
  } catch (err) { next(err); }
};

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
  } catch (err) { next(err); }
};
