import express from "express";
import { protect } from "../middleware/auth.js";
import {
  getMyNotifications,
  createNotification,
  markAsRead,
  markAllAsRead,
  deleteNotification,
  updateNotificationSettings
} from "../controllers/notificationController.js";

const router = express.Router();

router.use(protect);

router.get("/",           getMyNotifications);
router.post("/",          createNotification);
router.patch("/read-all", markAllAsRead);
router.patch("/:id/read", markAsRead);
router.delete("/:id",    deleteNotification);
router.post("/settings",  updateNotificationSettings);

export default router;
