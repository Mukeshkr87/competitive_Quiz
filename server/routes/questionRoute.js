import express from "express";
import {
  createQuestion,
  deleteQuestion,
  getQuestion,
} from "../controllers/questionController.js";

const router = express.Router();

router.get("/", getQuestion);
router.post("/create", createQuestion);
router.delete("/delete/:id", deleteQuestion);

export default router;
