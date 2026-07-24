import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createNotification,
  getUserNotifications,
  markAsRead,
  deleteNotification,
} from "../controllers/notificationController.js";

const router = express.Router();

router.post("/",protect, createNotification);

router.get("/:userId",protect, getUserNotifications);

router.put("/:id",protect, markAsRead);

router.delete("/:id", protect,deleteNotification);

export default router;