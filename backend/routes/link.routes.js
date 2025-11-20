import express from "express";
import {
  getMyLinks,
  createLink,
  updateLink,
  deleteLink,
  reorderLinks,
} from "../controllers/link.controller.js";
import protect from "../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/", protect, getMyLinks);
router.post("/", protect, createLink);

router.put("/reorder", protect, reorderLinks);

router.put("/:id", protect, updateLink);
router.delete("/:id", protect, deleteLink);

export default router;
