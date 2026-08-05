import express from "express";
import { protect } from "../middleware/authMiddleware.js";

import {
  createBugReport,
  getBugReports,
  updateBugStatus,
} from "../controllers/bugReportController.js";

const router = express.Router();

// User submits bug report
router.post("/", protect, createBugReport);

// Admin views all bug reports
router.get("/", protect, getBugReports);

// Admin updates status
router.put("/:id", protect, updateBugStatus);

export default router;