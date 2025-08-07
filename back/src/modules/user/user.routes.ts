import { Router } from "express";
import {
  getUserController,
  getUsersController,
  createUserController,
  updateUserController,
  deleteUserController,
  loginUserController,
  verifyCodeController,
  updateUserStreakController,
  getUserStatsController,
  updateUserXaviCoinsController,
  assignMissionsToUserController,
  updateUserStatusController
} from "./user.controller";
import { body } from "express-validator";
import { validateRequest } from "../../middlewares/validateRequest";

const router = Router();

// GET routes
router.get("/", getUsersController);
router.get("/:id", getUserController);
router.get("/:id/stats", getUserStatsController);

// POST routes
router.post("/", createUserController);
router.post("/login", loginUserController);
router.post("/verify-code", verifyCodeController);
router.post("/:id/missions", assignMissionsToUserController);

// PUT routes
router.put("/:id", updateUserController);

// PATCH routes
router.patch("/:id/streak", updateUserStreakController);
router.patch("/:id/xavicoins", updateUserXaviCoinsController);
router.patch("/:id/status", updateUserStatusController);

// DELETE routes
router.delete("/:id", deleteUserController);

export default router;

