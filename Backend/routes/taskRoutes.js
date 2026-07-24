import express from "express";
import {
  createTask,
  getProjectTasks,
  getMyTasks,
  updateTaskStatus,
  deleteTask,
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";
const router = express.Router();

// Create a new task
router.post("/",protect, createTask);

// Get all tasks of a project
router.get("/project/:projectId",protect, getProjectTasks);

// Get tasks assigned to a user
router.get("/user/:userId",protect, getMyTasks);

// Update task status
router.put("/:id",protect, updateTaskStatus);

// Delete task
router.delete("/:id",protect, deleteTask);

export default router;