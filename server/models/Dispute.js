import mongoose from "mongoose";

const disputeSchema = new mongoose.Schema(
  {
    disputeCode: { type: String, required: true, unique: true },
    transaction: { type: mongoose.Schema.Types.ObjectId, ref: "Transaction" },
    raisedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    reason: { type: String, required: true },
    priority: {
      type: String,
      enum: ["high", "medium", "low"],
      default: "medium"
    },
    status: {
      type: String,
      enum: ["open", "in_review", "resolved", "rejected"],
      default: "open"
    },
    messages: [
      {
        sender: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
        senderName: { type: String, required: true },
        senderRole: { type: String, default: "consumer" },
        message: { type: String, required: true },
        createdAt: { type: Date, default: Date.now }
      }
    ],
    resolution: { type: String, default: "" }
  },
  { timestamps: true }
);

export default mongoose.model("Dispute", disputeSchema);

