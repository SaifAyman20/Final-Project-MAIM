import express from "express";
import { registerUser, loginUser } from "../controllers/userController.js";
import protect from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Protected example
router.get("/profile", protect, (req, res) => {
  // req.user is attached by protect()
  res.json(req.user);
});

export default router;
