import express from "express";
import { protect } from "../middleware/auth.js";
import {
  raiseDispute,
  getDisputes,
  getDisputeById,
  addDisputeMessage,
  updateDisputeStatus
} from "../controllers/disputeController.js";

const router = express.Router();

router.use(protect);

router.post("/",                  raiseDispute);
router.get("/",                   getDisputes);
router.get("/:id",                getDisputeById);
router.post("/:id/messages",      addDisputeMessage);
router.patch("/:id/status",       updateDisputeStatus);

export default router;
