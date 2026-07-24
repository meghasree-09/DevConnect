import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getMessages,
  deleteMessage,
} from "../controllers/chatController.js";

const router = express.Router();

// Send a message
router.post("/",protect, sendMessage);

// Get all messages of a community
router.get("/community/:communityId",protect, getMessages);

// Delete a message
router.delete("/:id", protect,deleteMessage);

export default router;