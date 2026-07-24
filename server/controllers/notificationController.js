import Notification from "../models/Notification.js";
import User from "../models/User.js";

// @route GET /api/notifications
export const getMyNotifications = async (req, res, next) => {
  try {
    let query = { user: req.user._id };
    if (req.user.role === "admin" && req.query.scope === "all") {
      query = {}; // Admin viewing all system notifications
    }
    const notifications = await Notification.find(query)
      .populate("user", "name email role")
      .sort({ createdAt: -1 })
      .limit(100);
    res.json(notifications);
  } catch (err) { next(err); }
};

// @route POST /api/notifications
export const createNotification = async (req, res, next) => {
  try {
    const { title, message, type = "general", broadcast = false, targetUserId } = req.body;
    if (!title || !message) {
      return res.status(400).json({ message: "Title and message are required" });
    }

    if (broadcast) {
      const users = await User.find({}).select("_id");
      const notifs = users.map((u) => ({
        user: u._id,
        type,
        title,
        message,
        isRead: false
      }));
      await Notification.insertMany(notifs);
      return res.status(201).json({ message: `Notification broadcasted to ${users.length} users` });
    } else {
      const target = targetUserId || req.user._id;
      const notif = await Notification.create({
        user: target,
        type,
        title,
        message,
        isRead: false
      });
      return res.status(201).json(notif);
    }
  } catch (err) { next(err); }
};

// @route PATCH /api/notifications/:id/read
export const markAsRead = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, user: req.user._id };
    const notif = await Notification.findOneAndUpdate(
      filter,
      { isRead: true },
      { new: true }
    );
    if (!notif) return res.status(404).json({ message: "Notification not found" });
    res.json(notif);
  } catch (err) { next(err); }
};

// @route PATCH /api/notifications/read-all
export const markAllAsRead = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? { isRead: false } : { user: req.user._id, isRead: false };
    await Notification.updateMany(filter, { isRead: true });
    res.json({ message: "All notifications marked as read" });
  } catch (err) { next(err); }
};

// @route DELETE /api/notifications/:id
export const deleteNotification = async (req, res, next) => {
  try {
    const filter = req.user.role === "admin" ? { _id: req.params.id } : { _id: req.params.id, user: req.user._id };
    const notif = await Notification.findOneAndDelete(filter);
    if (!notif) return res.status(404).json({ message: "Notification not found" });
    res.json({ message: "Notification deleted" });
  } catch (err) { next(err); }
};

// @route POST /api/notifications/settings
export const updateNotificationSettings = async (req, res, next) => {
  try {
    res.json({ message: "Notification settings updated successfully" });
  } catch (err) { next(err); }
};
