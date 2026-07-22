import express from "express";

import {
  getCommunities,
  createCommunity,
  joinCommunity
}
from "../controllers/communityController.js";

const router =
  express.Router();

router.get(
  "/",
  getCommunities
);

router.post(
  "/",
  createCommunity
);

router.post(
  "/join",
  joinCommunity
);

export default router;