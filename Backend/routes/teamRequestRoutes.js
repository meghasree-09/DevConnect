import express from "express";

import {
  createRequest,
  getRequests,
}
from "../controllers/teamRequestController.js";

const router =
  express.Router();

router.post(
  "/",
  createRequest
);

router.get(
  "/",
  getRequests
);

export default router;