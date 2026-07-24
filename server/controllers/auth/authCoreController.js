import User from "../../models/User.js";
import Wallet from "../../models/Wallet.js";
import generateToken from "../../utils/generateToken.js";

export const cookieOptions = {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
  maxAge: 7 * 24 * 60 * 60 * 1000,
};

export const publicUser = (user) => ({
  id: user._id, name: user.name, email: user.email, role: user.role,
  address: user.address, solarPanel: user.solarPanel, carbonCreditsTotal: user.carbonCreditsTotal,
});

export const registerUser = async (req, res) => {
  try {
    const { name, email, password, role, phone, city, capacityKw, adminCode } = req.body;
    if (!name || !email || !password || !role) return res.status(400).json({ message: "Name, email, password and role are required" });
    if (!["prosumer", "consumer", "admin"].includes(role)) return res.status(400).json({ message: "Invalid role" });
    if (role === "admin" && (!process.env.ADMIN_REGISTRATION_CODE || adminCode !== process.env.ADMIN_REGISTRATION_CODE)) {
      return res.status(403).json({ message: "A valid admin registration code is required" });
    }
    if (await User.findOne({ email })) return res.status(409).json({ message: "An account with this email already exists" });

    const user = await User.create({
      name, email, password, role, phone, address: { city: city?.trim() },
      solarPanel: { capacityKw: role === "prosumer" ? Number(capacityKw) || 3 : 0 },
    });
    await Wallet.create({ user: user._id, balance: role === "consumer" ? 2500 : 0 });
    const token = generateToken(user._id, user.role);

    res.cookie("token", token, cookieOptions).status(201).json({ user: publicUser(user), token });
  } catch (err) { res.status(500).json({ message: "Registration failed", error: err.message }); }
};

export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) return res.status(400).json({ message: "Email and password are required" });
    const user = await User.findOne({ email }).select("+password");
    if (!user || !(await user.matchPassword(password))) return res.status(401).json({ message: "Invalid email or password" });

    const token = generateToken(user._id, user.role);
    res.cookie("token", token, cookieOptions).status(200).json({ user: publicUser(user), token });
  } catch (err) { res.status(500).json({ message: "Login failed", error: err.message }); }
};

export const logoutUser = (req, res) => {
  res.clearCookie("token", cookieOptions);
  res.status(200).json({ message: "Logged out" });
};
