import express from "express";
import upload from "../middleware/upload.js";

import {
  uploadResource,
  getResources,
  deleteResource,
} from "../controllers/resourceController.js";

const router = express.Router();

import { protect } from "../middleware/authMiddleware.js";

router.post(
  "/",
  protect,
  upload.single("file"),
  uploadResource
);

router.get("/:communityId", protect,getResources);

router.delete("/:id",protect, deleteResource);

export default router;