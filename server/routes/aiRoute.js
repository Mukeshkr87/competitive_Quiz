import express from "express";
import { aiController, generateQuestionsFromTopic } from "../controllers/aiController.js";

const router = express.Router();

router.post("/", aiController);
router.post("/generateQuestions", generateQuestionsFromTopic);

export default router;
