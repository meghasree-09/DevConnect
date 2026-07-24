import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  getCommunities,
  createCommunity,
  joinCommunity,
  getCommunityById,
  updateCommunity,     
} from "../controllers/communityController.js";

const router = express.Router();

router.get("/",protect, getCommunities);

router.get("/:id",protect, getCommunityById);

router.post("/",protect, createCommunity);

router.post("/join",protect, joinCommunity);

router.put("/:id",protect, updateCommunity);

export default router;