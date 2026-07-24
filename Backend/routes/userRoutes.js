import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  forgotPassword,
}
from "../controllers/userController.js";

const router =
  express.Router();
// Public Routes
router.post("/", addUser);          // Register
router.post("/login", loginUser);   // Login
router.put("/forgot-password", forgotPassword); // Forgot Password

// Protected Routes
router.get("/", protect, getUsers);
router.get("/:id", protect, getUserById);
router.put("/:id", protect, updateUser);
router.delete("/:id", protect, deleteUser);
export default router;