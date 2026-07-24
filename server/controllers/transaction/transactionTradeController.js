import Listing from "../../models/Listing.js";
import Transaction from "../../models/Transaction.js";
import CarbonCredit from "../../models/CarbonCredit.js";
import Wallet from "../../models/Wallet.js";
import { applyWalletEntry } from "../walletController.js";

const PLATFORM_FEE_RATE = 0.02;
const TAX_RATE = 0.05;
const CO2_PER_KWH = 0.82;
const CREDITS_PER_KG_CO2 = 0.01;

export const purchaseEnergy = async (req, res, next) => {
  try {
    const { listingId } = req.body;
    const kwh = Number(req.body.kwh);
    if (!Number.isFinite(kwh) || kwh <= 0) return res.status(400).json({ message: "Purchase quantity must be a positive number" });

    const listing = await Listing.findById(listingId);
    if (!listing || listing.status !== "active") return res.status(400).json({ message: "Listing not available" });
    if (kwh > listing.availableKwh) return res.status(400).json({ message: "Requested kWh exceeds availability" });
    if (String(listing.seller) === String(req.user._id)) return res.status(400).json({ message: "You cannot buy your own listing" });

    const subtotal = kwh * listing.pricePerKwh;
    const platformFee = +(subtotal * PLATFORM_FEE_RATE).toFixed(2);
    const tax = +(subtotal * TAX_RATE).toFixed(2);
    const totalAmount = +(subtotal + platformFee + tax).toFixed(2);

    let buyerWallet = await Wallet.findOne({ user: req.user._id });
    if (!buyerWallet) buyerWallet = await Wallet.create({ user: req.user._id, balance: 0 });
    if (buyerWallet.balance < totalAmount) {
      return res.status(400).json({ message: "Insufficient wallet balance. Add demo funds and try again." });
    }

    const sellerWallet = await Wallet.findOne({ user: listing.seller });
    if (!sellerWallet) await Wallet.create({ user: listing.seller, balance: 0 });

    const transaction = await Transaction.create({
      buyer: req.user._id, seller: listing.seller, listing: listing._id,
      kwh, pricePerKwh: listing.pricePerKwh, platformFee, tax, totalAmount, status: "completed", settledAt: new Date(),
    });

    listing.availableKwh -= kwh;
    if (listing.availableKwh <= 0) listing.status = "sold_out";
    await listing.save();

    await applyWalletEntry(req.user._id, "debit", totalAmount, "energy_purchase", transaction._id);
    await applyWalletEntry(listing.seller, "credit", subtotal, "energy_sale", transaction._id);

    const co2SavedKg = +(kwh * CO2_PER_KWH).toFixed(2);
    const creditsEarned = +(co2SavedKg * CREDITS_PER_KG_CO2).toFixed(3);
    await CarbonCredit.create({ user: listing.seller, kwhSold: kwh, co2SavedKg, creditsEarned, transaction: transaction._id });

    const io = req.app.get("io");
    if (io) io.to(String(listing.seller)).emit("notification", { type: "listing_sold", message: `${kwh} kWh sold from your listing` });

    res.status(201).json(transaction);
  } catch (err) { next(err); }
};

export const initiateRefund = async (req, res, next) => {
  try {
    const { transactionId } = req.body;
    const tx = await Transaction.findById(transactionId);
    if (!tx) return res.status(404).json({ message: "Transaction not found" });
    if (String(tx.buyer) !== String(req.user._id) && req.user.role !== "admin") {
      return res.status(403).json({ message: "Not authorized to request refund" });
    }

    tx.status = "failed";
    await tx.save();
    await applyWalletEntry(tx.buyer, "credit", tx.totalAmount, "refund", tx._id);
    await applyWalletEntry(tx.seller, "debit", tx.totalAmount - tx.platformFee - tx.tax, "refund", tx._id);

    res.json({ message: "Transaction refunded successfully", transaction: tx });
  } catch (err) { next(err); }
};
