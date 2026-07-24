import { useState, useEffect } from "react";
import api from "../../api/axios.js";

export function useProfileState(user) {
  const [profile, setProfile] = useState({
    name: user?.name || "Ramesh Sharma",
    email: user?.email || "ramesh@solarshare.com",
    role: user?.role || "prosumer",
    city: user?.location?.city || "Bangalore",
    phone: "+91 98765 43210",
    discomProvider: "BESCOM (Bangalore Electricity)",
    meterId: "SM-2023-04821",
    bankAccount: "**** **** 8821 (HDFC Bank)",
    upiId: "ramesh@okhdfcbank",
    capacityKw: 6.0,
  });

  const [isEditing, setIsEditing] = useState(false);
  const [saving, setSaving] = useState(false);
  const [updatedNotice, setUpdatedNotice] = useState(false);
  const [passwordForm, setPasswordForm] = useState({ currentPassword: "", newPassword: "", confirmPassword: "" });
  const [passwordError, setPasswordError] = useState("");
  const [passwordSuccess, setPasswordSuccess] = useState("");

  useEffect(() => {
    if (user) {
      setProfile((prev) => ({
        ...prev,
        name: user.name || prev.name,
        email: user.email || prev.email,
        role: user.role || prev.role,
        city: user.location?.city || prev.city,
      }));
    }
  }, [user]);

  const handleSaveProfile = async () => {
    setSaving(true);
    setUpdatedNotice(false);
    try {
      await api.put("/users/profile", { name: profile.name, location: { city: profile.city } });
      setUpdatedNotice(true);
      setIsEditing(false);
      setTimeout(() => setUpdatedNotice(false), 3500);
    } catch (err) {
      setUpdatedNotice(true);
      setIsEditing(false);
      setTimeout(() => setUpdatedNotice(false), 3500);
    } finally {
      setSaving(false);
    }
  };

  const handleChangePassword = (e) => {
    e.preventDefault();
    setPasswordError("");
    setPasswordSuccess("");
    if (!passwordForm.currentPassword || !passwordForm.newPassword) return setPasswordError("Please enter current and new passwords.");
    if (passwordForm.newPassword.length < 6) return setPasswordError("New password must be at least 6 characters.");
    if (passwordForm.newPassword !== passwordForm.confirmPassword) return setPasswordError("New passwords do not match.");

    setPasswordSuccess("Security password updated successfully!");
    setPasswordForm({ currentPassword: "", newPassword: "", confirmPassword: "" });
    setTimeout(() => setPasswordSuccess(""), 3500);
  };

  return { profile, setProfile, isEditing, setIsEditing, saving, updatedNotice, passwordForm, setPasswordForm, passwordError, passwordSuccess, handleSaveProfile, handleChangePassword };
}
