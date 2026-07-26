import express from "express";
import { getLandingStats } from "../controllers/publicController.js";

const router = express.Router();

// GET /api/public/landing-stats
router.get("/landing-stats", getLandingStats);

export default router;
