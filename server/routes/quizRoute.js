import express from "express";
import {
  createQuiz,
  deleteQuiz,
  getQuiz,
} from "../controllers/quizController.js";

const router = express.Router();

router.get("/", getQuiz);
router.post("/create", createQuiz);
router.delete("/delete/:id", deleteQuiz);

export default router;
