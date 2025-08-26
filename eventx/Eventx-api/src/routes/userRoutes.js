import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";
import User from "../models/User.js"; // تأكد من استيراد نموذج User

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// إضافة endpoint للحصول على بيانات المستخدم الحالي
router.get("/profile", protect, async (req, res) => {
  try {
    // req.user تم تعيينه بواسطة middleware protect
    const user = await User.findById(req.user._id).select("-password");
    
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      role: user.role,
      gender: user.gender,
      location: user.location,
      birthYear: user.birthYear
    });
  } catch (error) {
    console.error("Profile error:", error);
    res.status(500).json({ message: "Server error" });
  }
});

export default router;