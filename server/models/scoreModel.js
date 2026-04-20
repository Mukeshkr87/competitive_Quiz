import mongoose from "mongoose";

const questionReviewSchema = new mongoose.Schema(
  {
    questionId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    options: {
      type: [String],
      required: true,
    },
    selectedOption: {
      type: String,
      default: null,
    },
    correctOption: {
      type: String,
      required: true,
    },
    isCorrect: {
      type: Boolean,
      required: true,
    },
    scoreAwarded: {
      type: Number,
      default: 0,
    },
    timeRemaining: {
      type: Number,
      default: 0,
    },
  },
  { _id: false }
);

const scoreSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  quizId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Quiz",
  },
  roomCode: {
    type: String,
    required: true,
  },
  quizTitle: {
    type: String,
    required: true,
  },
  score: {
    required: true,
    type: Number,
  },
  username: {
    type: String,
    required: true,
  },
  totalQuestions: {
    type: Number,
    required: true,
  },
  correctAnswers: {
    type: Number,
    required: true,
  },
  questionReviews: {
    type: [questionReviewSchema],
    default: [],
  },
});

export const Score = mongoose.model("Score", scoreSchema);
