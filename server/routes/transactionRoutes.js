import express from "express";
import { protect } from "../middleware/auth.js";
import {
  purchaseEnergy,
  getMyTransactions,
  getTransactionById,
  exportStatement,
  getTransactionStats,
  initiateRefund
} from "../controllers/transactionController.js";

const router = express.Router();

router.use(protect);

router.post("/purchase",    purchaseEnergy);
router.get("/mine",         getMyTransactions);
router.get("/summary/stats", getTransactionStats);
router.get("/export/pdf",   exportStatement);
router.post("/refund",      initiateRefund);
router.get("/:id",          getTransactionById);

export default router;

