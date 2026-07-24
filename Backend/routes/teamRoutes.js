import express from "express";

import {
  getTeamMembers,
  updateMemberRole,
  removeMember,
} from "../controllers/teamController.js";

import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Get all team members
router.get(
  "/:projectId",
  protect,
  getTeamMembers
);

// Update member role
router.put(
  "/role/:projectId/:memberId",
  protect,
  updateMemberRole
);

// Remove member
router.delete(
  "/:projectId/:memberId",
  protect,
  removeMember
);

export default router;