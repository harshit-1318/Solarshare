import mongoose from "mongoose";

const pricingSettingSchema = new mongoose.Schema(
  {
    baseTariff: { type: Number, default: 4.8 },
    minPrice: { type: Number, default: 3.0 },
    maxPrice: { type: Number, default: 6.5 },
    dynamicMultiplier: { type: Number, default: 1.2 },
    lastUpdatedBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" }
  },
  { timestamps: true }
);

export default mongoose.model("PricingSetting", pricingSettingSchema);
