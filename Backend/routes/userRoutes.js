import express from "express";

import {
  addUser,
  loginUser,
  forgotPassword,
} from "../controllers/userController.js";

const router =
  express.Router();

router.post(
  "/",
  addUser
);

router.post(
  "/login",
  loginUser
);

router.put(
  "/forgot-password",
  forgotPassword
);

export default router;