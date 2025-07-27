const express = require("express");
const router = express.Router();
const path = require("path");
const fs = require("fs");
const multer = require("multer");
const bcrypt = require("bcryptjs");
const User = require("../models/User");
const Scan = require("../models/Scan");
const { authenticateToken } = require("../middleware/auth");

// Serve uploaded profile pictures
router.use("/uploads/profile-pics", express.static(path.join(__dirname, "../uploads")));

// Multer config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dir = path.join(__dirname, "../uploads/profile-pics");
    fs.mkdirSync(dir, { recursive: true });
    cb(null, dir);
  },
  filename: function (req, file, cb) {
    const ext = path.extname(file.originalname);
    cb(null, `${req.user.userId}-${Date.now()}${ext}`);
  },
});
const upload = multer({ storage });

// ✅ Get logged-in user's profile (NEW ENDPOINT)
router.get("/me", authenticateToken, async (req, res) => {
  try {
    const user = await User.findById(req.user.userId)
      .select("-password")
      .lean();

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json(user);
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Server error" });
  }
});

// ✅ Update user profile
router.put("/me", authenticateToken, async (req, res) => {
  try {
    const allowedFields = [
      "firstName",
      "lastName",
      "email",
      "phone",
      "title",
      "profilePic",
    ];

    const updates = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) updates[key] = req.body[key];
    }

    // Validation
    const requiredFields = ["firstName", "lastName", "email"];
    for (const field of requiredFields) {
      if (updates[field] === "") {
        return res.status(400).json({ error: `${field} is required` });
      }
    }

    const updatedUser = await User.findByIdAndUpdate(req.user.userId, updates, {
      new: true,
      runValidators: true,
    }).select("-password");

    res.json(updatedUser);
  } catch (err) {
    console.error("Profile update error:", err);
    res.status(500).json({ error: "Failed to update profile" });
  }
});

// ✅ Upload profile picture
router.post("/uploadProfilePic", authenticateToken, upload.single("profilePic"), async (req, res) => {
  try {
    const imagePath = `/uploads/profile-pics/${req.file.filename}`;
    await User.findByIdAndUpdate(req.user.userId, { profilePic: imagePath });
    res.json({ message: "Upload successful", url: imagePath });
  } catch (err) {
    console.error("Upload error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ Get scan count for logged-in user
router.get("/my-scan-count", authenticateToken, async (req, res) => {
  try {
    const scanCount = await Scan.countDocuments({ userId: req.user.userId });
    res.json({ count: scanCount });
  } catch (err) {
    console.error("Error fetching scan count:", err);
    res.status(500).json({ error: "Failed to get scan count" });
  }
});

// ✅ Change password
router.post("/change-password", authenticateToken, async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;
    const user = await User.findById(req.user.userId);
    if (!user) return res.status(404).json({ error: "User not found" });

    const isMatch = await bcrypt.compare(currentPassword, user.password);
    if (!isMatch) return res.status(401).json({ error: "Incorrect current password" });

    user.password = await bcrypt.hash(newPassword.trim(), 12);
    await user.save();

    res.json({ message: "Password updated successfully" });
  } catch (error) {
    console.error("Change password error:", error);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;