import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getQuiz,
} from "../controllers/quizController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, getQuiz);
router.post("/create", auth, createQuiz);
router.delete("/delete/:id", auth, deleteQuiz);

export default router;
