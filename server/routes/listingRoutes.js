import express from "express";
import {
  createListing,
  getListings,
  getMyListings,
  getListingById,
  updateListing,
  cancelListing,
  getListingsSummary
} from "../controllers/listingController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.get("/",                 getListings);
router.get("/summary/stats",    protect, getListingsSummary);
router.get("/mine",             protect, authorize("prosumer"), getMyListings);
router.post("/",                protect, authorize("prosumer"), createListing);
router.get("/:id",              protect, getListingById);
router.put("/:id",              protect, authorize("prosumer"), updateListing);
router.delete("/:id",           protect, authorize("prosumer"), cancelListing);

export default router;

