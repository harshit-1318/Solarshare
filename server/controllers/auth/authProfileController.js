import User from "../../models/User.js";

export const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};

export const updateProfile = async (req, res, next) => {
  try {
    const { name, phone, city, capacityKw, aadhaarNumber, panNumber, bankDetails, twoFactorEnabled, profilePictureUrl } = req.body;
    const user = req.user;

    if (name !== undefined) user.name = String(name).trim();
    if (phone !== undefined) user.phone = String(phone).trim();
    if (city !== undefined) {
      user.address = user.address || {};
      user.address.city = String(city).trim();
    }
    if (capacityKw !== undefined && user.role === "prosumer") {
      const value = Number(capacityKw);
      if (!Number.isFinite(value) || value <= 0) return res.status(400).json({ message: "Solar capacity must be greater than zero" });
      user.solarPanel = user.solarPanel || {};
      user.solarPanel.capacityKw = value;
    }
    if (aadhaarNumber !== undefined) user.aadhaarNumber = String(aadhaarNumber).trim();
    if (panNumber !== undefined) user.panNumber = String(panNumber).trim();
    if (bankDetails !== undefined) {
      user.bankDetails = user.bankDetails || {};
      if (bankDetails.accountNo !== undefined) user.bankDetails.accountNo = String(bankDetails.accountNo).trim();
      if (bankDetails.bankName !== undefined) user.bankDetails.bankName = String(bankDetails.bankName).trim();
      if (bankDetails.ifsc !== undefined) user.bankDetails.ifsc = String(bankDetails.ifsc).trim();
    }
    if (twoFactorEnabled !== undefined) user.twoFactorEnabled = Boolean(twoFactorEnabled);
    if (profilePictureUrl !== undefined) user.profilePictureUrl = String(profilePictureUrl).trim();

    await user.save();
    res.json({ user });
  } catch (err) { next(err); }
};

export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) return res.status(400).json({ message: "Current and new passwords are required" });
    if (newPassword.length < 6) return res.status(400).json({ message: "New password must be at least 6 characters" });

    const user = await User.findById(req.user._id).select("+password");
    if (!(await user.matchPassword(currentPassword))) return res.status(401).json({ message: "Incorrect current password" });

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) { next(err); }
};
