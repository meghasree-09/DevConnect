import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  sendMessage,
  getProjectMessages,
} from "../controllers/messageController.js";

const router = express.Router();

router.post("/",protect, sendMessage);

router.get("/:projectId",protect, getProjectMessages);

export default router;