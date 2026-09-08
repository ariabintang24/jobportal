import express from "express";
import {
  updateProfile,
  getPublicProfile,
  deleteResume,
} from "../controllers/userController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Protected Routes
router.put("/profile", protect, updateProfile);
router.delete("/resume", protect, deleteResume);

// Public Routes
router.get("/:id", getPublicProfile);

export default router;
