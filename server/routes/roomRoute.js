import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  joinRoom,
} from "../controllers/roomController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getRoom);
router.post("/create", auth, createRoom);
router.delete("/delete/:id", auth, deleteRoom);
router.post("/joinRoom", joinRoom);

export default router;
