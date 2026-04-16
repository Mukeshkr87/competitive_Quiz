import express from "express";
import {
  createRoom,
  deleteRoom,
  getRoom,
  joinRoom,
} from "../controllers/roomController.js";

const router = express.Router();

router.get("/", getRoom);
router.post("/create", createRoom);
router.delete("/delete/:id", deleteRoom);
router.post("/joinRoom", joinRoom);

export default router;
