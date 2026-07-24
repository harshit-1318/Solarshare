import express from "express";
import {
  getLatestReading,
  getReadingHistory,
  ingestMeterReading,
  getAllUserReadings,
  startSimulation,
  stopSimulation
} from "../controllers/meterController.js";
import { protect } from "../middleware/auth.js";

const router = express.Router();

router.get("/latest",           protect, getLatestReading);
router.get("/history",          protect, getReadingHistory);
router.post("/ingest",          protect, ingestMeterReading);
router.get("/all-readings",     protect, getAllUserReadings);
router.post("/simulation/start", protect, startSimulation);
router.post("/simulation/stop",  protect, stopSimulation);

export default router;

