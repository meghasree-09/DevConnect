import express from "express";
import { protect } from "../middleware/authMiddleware.js";
import {
  createPost,
  getCommunityPosts,
  likePost,
  commentPost,
  deletePost,
} from "../controllers/postController.js";

const router = express.Router();

// Create a new post
router.post("/",protect, createPost);

// Get all posts of a community
router.get("/community/:communityId",protect, getCommunityPosts);

// Like / Unlike a post
router.put("/:id/like",protect, likePost);

// Add comment
router.post("/:id/comment",protect, commentPost);

// Delete a post
router.delete("/:id",protect, deletePost);

export default router;