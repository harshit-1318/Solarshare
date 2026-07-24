import User from "../models/User.js";
import Wallet from "../models/Wallet.js";
import generateToken from "../utils/generateToken.js";

const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

const publicUser = (user) => ({
  id: user._id,
  name: user.name,
  email: user.email,
  role: user.role,
  address: user.address,
  solarPanel: user.solarPanel,
  carbonCreditsTotal: user.carbonCreditsTotal,
});

// @route POST /api/auth/register
export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, city, capacityKw, adminCode } = req.body;

    if (!name || !email || !password || !role) {
      return res.status(400).json({ message: "Name, email, password and role are required" });
    }
    if (!["prosumer", "consumer", "admin"].includes(role)) {
      return res.status(400).json({ message: "Invalid role" });
    }
    if (role === "admin" && (!process.env.ADMIN_REGISTRATION_CODE || adminCode !== process.env.ADMIN_REGISTRATION_CODE)) {
      return res.status(403).json({ message: "A valid admin registration code is required" });
    }

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(409).json({ message: "An account with this email already exists" });
    }

    const user = await User.create({
      name,
      email,
      password,
      role,
      phone,
      address: { city: city?.trim() },
      solarPanel: { capacityKw: role === "prosumer" ? Number(capacityKw) || 3 : 0 },
    });
    // Demo wallet: users can immediately test the complete marketplace flow.
    await Wallet.create({ user: user._id, balance: role === "consumer" ? 2500 : 0 });
    const token = generateToken(user._id, user.role);

    res
      .cookie("token", token, cookieOptions)
      .status(201)
      .json({
        user: publicUser(user),
        token,
      });
  } catch (err) {
    res.status(500).json({ message: "Registration failed", error: err.message });
  }
};

// @route POST /api/auth/login
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const token = generateToken(user._id, user.role);

    res
      .cookie("token", token, cookieOptions)
      .status(200)
      .json({
        user: publicUser(user),
        token,
      });
  } catch (err) {
    res.status(500).json({ message: "Login failed", error: err.message });
  }
};

// @route POST /api/auth/logout
export const logoutUser = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logged out" });
};

// @route GET /api/auth/me
export const getMe = async (req, res) => {
  res.status(200).json({ user: req.user });
};

// @route PATCH /api/auth/profile
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
      if (!Number.isFinite(value) || value <= 0) {
        return res.status(400).json({ message: "Solar capacity must be greater than zero" });
      }
      user.solarPanel = user.solarPanel || {};
      user.solarPanel.capacityKw = value;
    }
    
    // KYC Updates
    if (aadhaarNumber !== undefined) user.aadhaarNumber = String(aadhaarNumber).trim();
    if (panNumber !== undefined) user.panNumber = String(panNumber).trim();
    
    // Bank details updates
    if (bankDetails !== undefined) {
      user.bankDetails = user.bankDetails || {};
      if (bankDetails.accountNo !== undefined) user.bankDetails.accountNo = String(bankDetails.accountNo).trim();
      if (bankDetails.bankName !== undefined) user.bankDetails.bankName = String(bankDetails.bankName).trim();
      if (bankDetails.ifsc !== undefined) user.bankDetails.ifsc = String(bankDetails.ifsc).trim();
    }

    // 2FA Security updates
    if (twoFactorEnabled !== undefined) user.twoFactorEnabled = Boolean(twoFactorEnabled);

    // Profile photo update
    if (profilePictureUrl !== undefined) user.profilePictureUrl = String(profilePictureUrl).trim();

    await user.save();
    res.json({ user });
  } catch (err) {
    next(err);
  }
};


// @route PUT /api/auth/change-password
export const changePassword = async (req, res, next) => {
  try {
    const { currentPassword, newPassword } = req.body;
    if (!currentPassword || !newPassword) {
      return res.status(400).json({ message: "Current and new passwords are required" });
    }
    if (newPassword.length < 6) {
      return res.status(400).json({ message: "New password must be at least 6 characters" });
    }

    const user = await User.findById(req.user._id).select("+password");
    if (!(await user.matchPassword(currentPassword))) {
      return res.status(401).json({ message: "Incorrect current password" });
    }

    user.password = newPassword;
    await user.save();
    res.json({ message: "Password updated successfully" });
  } catch (err) {
    next(err);
  }
};

