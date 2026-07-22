import express from "express";

import {
  getUsers,
  getUserById,
  addUser,
  updateUser,
  deleteUser,
  loginUser,
  forgotPassword,
}
from "../controllers/userController.js";

const router =
  express.Router();

router.get(
  "/",
  getUsers
);

router.get(
  "/:id",
  getUserById
);

router.put(
  "/:id",
  updateUser
);

router.delete(
  "/:id",
  deleteUser
);

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