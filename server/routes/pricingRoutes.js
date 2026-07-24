import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getLiveDynamicRate,
  getTariffBrackets,
  updatePricingParams,
  getPricingForecast,
  getPricingHistory
} from "../controllers/pricingController.js";

const router = express.Router();

router.use(protect);

router.get("/dynamic-rate", getLiveDynamicRate);
router.get("/tariffs",      getTariffBrackets);
router.put("/parameters",   updatePricingParams);
router.get("/forecast",     getPricingForecast);
router.get("/history",      getPricingHistory);

export default router;
