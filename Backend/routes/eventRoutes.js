import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createEvent,
  getEvents,
  registerEvent,
  deleteEvent,
} from "../controllers/eventController.js";

const router = express.Router();

router.post("/",protect, createEvent);

router.get("/:communityId",protect, getEvents);

router.put("/register/:id",protect, registerEvent);

router.delete("/:id",protect, deleteEvent);

export default router;