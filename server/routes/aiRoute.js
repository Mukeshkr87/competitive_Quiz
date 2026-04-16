import express from "express";
import { aiController } from "../controllers/aiController.js";

const router = express.Router();

router.post("/", aiController);

export default router;
