import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createRequest,
  getRequests,
  updateRequest
}
from "../controllers/teamRequestController.js";

const router =
  express.Router();

router.post(
  "/",protect,
  createRequest
);

router.get("/:userId",protect, getRequests);
router.put("/:id",protect, updateRequest);

export default router;