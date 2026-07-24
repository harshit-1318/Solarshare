import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getMyCertificates,
  generateCertificate,
  getCertificateById,
  getCertificateStats,
  tradeCertificate
} from "../controllers/certificateController.js";

const router = express.Router();

router.use(protect);

router.get("/",           getMyCertificates);
router.post("/generate",  generateCertificate);
router.get("/stats",      getCertificateStats);
router.get("/:id",        getCertificateById);
router.post("/:id/trade", tradeCertificate);

export default router;
