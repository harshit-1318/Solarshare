import express from "express";
import { protect } from "../middleware/auth.js";
import {
  executeAutoMatch,
  getMatchingPrefs,
  updateMatchingPrefs,
  getMatchingStatus
} from "../controllers/matchingController.js";

const router = express.Router();

router.use(protect);

router.post("/auto-match",  executeAutoMatch);
router.get("/preferences",  getMatchingPrefs);
router.put("/preferences",  updateMatchingPrefs);
router.get("/status",       getMatchingStatus);

export default router;
