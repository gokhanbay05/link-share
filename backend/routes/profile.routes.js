import express from "express";
import {
  getPublicProfile,
  updateMyProfile,
  updateAvatar,
  getMe,
} from "../controllers/profile.controller.js";
import protect from "../middlewares/auth.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/me", protect, getMe);

router.put("/me", protect, updateMyProfile);

router.put("/avatar", protect, upload.single("avatar"), updateAvatar);

router.get("/:username", getPublicProfile);

export default router;
