import express from "express";
import multer from "multer";
import { aiController, generateQuestionsFromTopic, generateQuestionsFromPDF } from "../controllers/aiController.js";
import { auth } from "../middleware/auth.js";

const router = express.Router();

// Configure multer for PDF uploads
const upload = multer({
  dest: 'uploads/',
  fileFilter: (req, file, cb) => {
    if (file.mimetype === 'application/pdf') {
      cb(null, true);
    } else {
      cb(new Error('Only PDF files are allowed'), false);
    }
  },
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit
  }
});

router.post("/", auth, aiController);
router.post("/generateQuestions", auth, generateQuestionsFromTopic);
router.post("/generateFromPDF", upload.single('pdf'), auth, generateQuestionsFromPDF);

export default router;
