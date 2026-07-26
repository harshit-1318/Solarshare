import express from "express";
import { protect } from "../middleware/auth.js";
import {
  purchaseEnergy,
  getMyTransactions,
  getTransactionById,
  exportStatement,
  getTransactionStats,
  getPublicRecentTransactions,
  initiateRefund
} from "../controllers/transactionController.js";

const router = express.Router();

// Public route for landing page live trades (no auth required)
router.get("/public-recent", getPublicRecentTransactions);

// Protected routes
router.use(protect);

router.post("/purchase",    purchaseEnergy);
router.get("/mine",         getMyTransactions);
router.get("/summary/stats", getTransactionStats);
router.get("/export/pdf",   exportStatement);
router.post("/refund",      initiateRefund);
router.get("/:id",          getTransactionById);

export default router;


