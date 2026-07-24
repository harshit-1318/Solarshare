import User from "../../models/User.js";

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find({}).select("-password").sort({ createdAt: -1 });
    res.json({ users });
  } catch (err) { next(err); }
};

export const toggleBlockUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin") return res.status(403).json({ message: "Cannot block an admin" });
    user.isBlocked = !user.isBlocked;
    await user.save();
    res.json({ message: `User ${user.isBlocked ? "blocked" : "unblocked"} successfully`, isBlocked: user.isBlocked });
  } catch (err) { next(err); }
};

export const deleteUser = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ message: "User not found" });
    if (user.role === "admin") return res.status(403).json({ message: "Cannot delete an admin" });
    await user.deleteOne();
    res.json({ message: "User deleted successfully" });
  } catch (err) { next(err); }
};
