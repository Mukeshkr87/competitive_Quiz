import express from "express";
import { handleFetchScore } from "../controllers/scoreController.js";

const router = express.Router();

router.get("/", handleFetchScore);

export default router;
