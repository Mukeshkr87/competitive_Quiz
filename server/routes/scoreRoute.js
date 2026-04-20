import express from "express";
import { handleFetchScore } from "../controllers/scoreController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

router.get("/", auth, handleFetchScore);

export default router;
