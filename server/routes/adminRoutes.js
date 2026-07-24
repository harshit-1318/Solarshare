import express from "express";
import { protect, authorize } from "../middleware/auth.js";
import {
  getOverview,
  getAllUsers,
  toggleBlockUser,
  deleteUser,
  getAllListings,
  deleteListing,
  getAllTransactions,
  getTransactionsLedger,
  resolveDispute,
  getAllMeterReadings,
  getGridMonitoring,
  getPricingEngineData,
  updatePricingEngineData,
  getCarbonCreditsData,
  getReportsData,
  getSettingsData,
  updateSettingsData
} from "../controllers/adminController.js";

const router = express.Router();

// All routes require admin auth
router.use(protect, authorize("admin"));

router.get("/overview",             getOverview);
router.get("/users",                getAllUsers);
router.patch("/users/:id/block",    toggleBlockUser);
router.delete("/users/:id",         deleteUser);
router.get("/listings",             getAllListings);
router.delete("/listings/:id",      deleteListing);
router.get("/transactions",         getAllTransactions);
router.get("/transactions/ledger",  getTransactionsLedger);
router.patch("/transactions/:id/resolve", resolveDispute);
router.get("/meters",               getAllMeterReadings);
router.get("/grid-monitoring",      getGridMonitoring);

router.get("/pricing-engine",       getPricingEngineData);
router.put("/pricing-engine",       updatePricingEngineData);
router.get("/carbon-credits",       getCarbonCreditsData);
router.get("/reports",              getReportsData);
router.get("/settings",             getSettingsData);
router.put("/settings",             updateSettingsData);

export default router;
